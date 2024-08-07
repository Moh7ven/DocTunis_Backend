import express from "express";
import authUsers from "../Middlewares/authUsers.js";
import {
  createPlanning,
  deletePlanning,
  getAllPlannings,
  getPlanningById,
  updatePlanning,
} from "../Controllers/planningController.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/create-planning", upload.any(), authUsers, createPlanning);

router.get("/get-all-plannings", upload.any(), getAllPlannings);

router.get("/get-planning-by-id/:id", upload.any(), getPlanningById);

router.put("/update-planning/:id", upload.any(), authUsers, updatePlanning);

router.delete("/delete-planning/:id", upload.any(), authUsers, deletePlanning);

export default router;
