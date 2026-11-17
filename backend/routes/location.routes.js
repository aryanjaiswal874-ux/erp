import express from "express";
import {
    createLocation,
    bulkCreateLocations,
    getLocations,
    updateLocation,
    deleteLocation,
    getStates,
    getDistrictsByState,
    getPostOfficesByPincode
} from "../controllers/locationController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(getLocations)
    .post(protect, adminOnly, createLocation);

router.post("/bulk", protect, adminOnly, bulkCreateLocations);

router.route("/:id")
    .put(protect, adminOnly, updateLocation)
    .delete(protect, adminOnly, deleteLocation);

router.get("/states", getStates);
router.get("/districts/:state", getDistrictsByState);
router.get("/pincode/:pincode", getPostOfficesByPincode);

export default router;
