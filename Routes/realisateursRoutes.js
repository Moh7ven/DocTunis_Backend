import express from "express";
import multer from "multer";
import {
  createRealisateurs,
  deleteRealisateurs,
  getAllRealisateurs,
  getOneRealisateurs,
  updateRealisateurs,
} from "../Controllers/realisateursController.js";
import authUsers from "../Middlewares/authUsers.js";

const router = express.Router();
const upload = multer();

router.post(
  "/create-realisateurs",
  upload.any(),
  authUsers,
  createRealisateurs
);

router.get(
  "/get-all-realisateurs",
  upload.any(),
  authUsers,
  getAllRealisateurs
);

router.get(
  "/get-realisateur-by-id/:realisateurId",
  upload.any(),
  authUsers,
  getOneRealisateurs
);

router.put(
  "/update-realisateurs/:realisateurId",
  upload.any(),
  authUsers,
  updateRealisateurs
);

router.delete(
  "/delete-realisateurs/:realisateurId",
  upload.any(),
  authUsers,
  deleteRealisateurs
);

export default router;
