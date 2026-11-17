import { ERP_LiveLocation, ERP_LocationHistory, ERP_Attendance, User } from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";

// Office location coordinates (from sample)
const OFFICE_LAT = 23.350367;
const OFFICE_LONG = 85.317802;
const OFFICE_RADIUS_METERS = 100;

// Helper function to calculate distance in meters
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}

export const recordLocation = async (req, res) => {
    try {
        const { latitude, longitude, gps_status } = req.body;
        const employee_id = req.user.id;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const status = gps_status === "off" ? "off" : "on";
        const now = new Date();

        // 1. Save to History
        await ERP_LocationHistory.create({
            employee_id,
            latitude: lat,
            longitude: lng,
            gps_status: status,
            recorded_at: now
        });

        // 2. Update Live Location
        await ERP_LiveLocation.upsert({
            employee_id,
            latitude: lat,
            longitude: lng,
            gps_status: status,
            last_update: now
        });

        const response = {
            message: "Location recorded successfully",
            recorded_at: now
        };

        // 3. Optional: Logic for attendance/radius check (from sample)
        const today = moment().format("YYYY-MM-DD");
        const attendance = await ERP_Attendance.findOne({ 
            where: { employee_id, date: today, current_work_status: "start" } 
        });

        if (attendance) {
            const distance = calculateDistance(lat, lng, OFFICE_LAT, OFFICE_LONG);
            response.within_office_radius = distance <= OFFICE_RADIUS_METERS;
            response.distance_meters = Math.round(distance);
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLiveLocations = async (req, res) => {
    try {
        const locations = await ERP_LiveLocation.findAll({
            include: [{ 
                model: User, 
                attributes: ['full_name', 'designation', 'profile_photo', 'mobile'] 
            }],
            order: [['last_update', 'DESC']]
        });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistoryByEmployee = async (req, res) => {
    try {
        const { employee_id, date } = req.params;
        const targetDate = date || moment().format("YYYY-MM-DD");

        const history = await ERP_LocationHistory.findAll({
            where: {
                employee_id,
                recorded_at: {
                    [Op.between]: [
                        moment(targetDate).startOf('day').toDate(),
                        moment(targetDate).endOf('day').toDate()
                    ]
                }
            },
            order: [['recorded_at', 'ASC']]
        });

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
