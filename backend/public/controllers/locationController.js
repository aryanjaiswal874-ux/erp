import { Location, sequelize } from "../models/index.js";
import { Op } from "sequelize";

// Create Location
export const createLocation = async (req, res) => {
    try {
        const { state, district, postOffice, pincode } = req.body;
        const location = await Location.create({ state, district, postOffice, pincode });
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Bulk Create Locations (for easy entry)
export const bulkCreateLocations = async (req, res) => {
    try {
        const { locations } = req.body; // Array of {state, district, postOffice, pincode}
        const result = await Location.bulkCreate(locations);
        res.status(201).json({ message: `${result.length} locations added`, count: result.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all locations with pagination and search
export const getLocations = async (req, res) => {
    try {
        const { search, state, district, pincode, page = 1, limit = 20 } = req.query;
        let where = {};

        const offset = (parseInt(page) - 1) * parseInt(limit);

        if (pincode) where.pincode = pincode;
        if (state) where.state = state;
        if (district) where.district = district;

        if (search) {
            where[Op.or] = [
                { state: { [Op.like]: `%${search}%` } },
                { district: { [Op.like]: `%${search}%` } },
                { postOffice: { [Op.like]: `%${search}%` } },
                { pincode: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Location.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: offset,
            order: [['state', 'ASC'], ['district', 'ASC']]
        });

        res.json({
            locations: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Location
export const updateLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });
        await location.update(req.body);
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Location
export const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ message: "Location not found" });
        await location.destroy();
        res.json({ message: "Location deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dependent Dropdown Helpers
export const getStates = async (req, res) => {
    try {
        const states = await Location.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('state')), 'state']],
            order: [['state', 'ASC']]
        });
        res.json(states.map(s => s.state));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDistrictsByState = async (req, res) => {
    try {
        const { state } = req.params;
        const districts = await Location.findAll({
            where: { state },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('district')), 'district']],
            order: [['district', 'ASC']]
        });
        res.json(districts.map(d => d.district));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostOfficesByPincode = async (req, res) => {
    try {
        const { pincode } = req.params;
        let locations = await Location.findAll({ where: { pincode } });

        if (locations.length === 0) {
            // Fetch from external API
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                const data = await response.json();

                if (data && data[0].Status === "Success" && data[0].PostOffice) {
                    const externalLocations = data[0].PostOffice.map(po => ({
                        state: po.State,
                        district: po.District,
                        postOffice: po.Name,
                        pincode: pincode
                    }));

                    // Save unique locations to DB (bulkCreate with ignoreDuplicates if supported or manually check)
                    // Simple bulk create; MySQL might error on duplicates if not handled.
                    // Assuming no constraints preventing duplicates of (pincode, postOffice) or handling gracefully.
                    // Ideally we should check duplicates or use updateOnDuplicate if necessary.
                    // For now, simpler approach: create them.

                    // Filter duplicates within the incoming list just in case
                    const uniqueExternal = externalLocations.filter((v, i, a) => a.findIndex(t => (t.postOffice === v.postOffice && t.district === v.district)) === i);

                    if (uniqueExternal.length > 0) {
                        try {
                            await Location.bulkCreate(uniqueExternal, { ignoreDuplicates: true });
                            // Refetch to include IDs and standard formatting
                            locations = await Location.findAll({ where: { pincode } });
                        } catch (dbError) {
                            console.error("Error saving external pincode data:", dbError);
                            // Even if save fails, return the data to frontend
                            locations = uniqueExternal;
                        }
                    }
                }
            } catch (apiError) {
                console.error("Error fetching from external pincode API:", apiError);
            }
        }

        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
