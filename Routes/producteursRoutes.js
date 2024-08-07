import express from "express";
import multer from "multer";
import authUsers from "../Middlewares/authUsers.js";
import {
  createProducteurs,
  deleteProducteurs,
  getAllProducteurs,
  getOneProducteurs,
  updateProducteurs,
} from "../Controllers/producteursController.js";

const router = express.Router();
const upload = multer();

router.post("/create-producteur", upload.any(), authUsers, createProducteurs);

router.get("/get-all-producteurs", upload.any(), authUsers, getAllProducteurs);

router.get(
  "/get-producteur-by-id/:producteurId",
  upload.any(),
  authUsers,
  getOneProducteurs
);

router.put(
  "/update-producteur/:producteurId",
  upload.any(),
  authUsers,
  updateProducteurs
);

router.delete(
  "/delete-producteur/:producteursId",
  upload.any(),
  authUsers,
  deleteProducteurs
);

export default router;
