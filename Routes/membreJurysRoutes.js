import express from "express";
import multer from "multer";
import authUsers from "../Middlewares/authUsers.js";
import {
  createMembreJurys,
  getAllMembreJurys,
  getMembreJuryConnected,
  getOneMembreJurys,
  loginMembreJurys,
} from "../Controllers/membreJurysController.js";

const upload = multer();
const router = express.Router();

router.post("/create-membre-jury", upload.any(), authUsers, createMembreJurys);

router.post("/login-membre-jury", upload.any(), loginMembreJurys);

router.get("/get-all-membre-jurys", upload.any(), authUsers, getAllMembreJurys);

router.get(
  "/get-one-membre-jurys/:id",
  upload.any(),
  authUsers,
  getOneMembreJurys
);

router.get(
  "/get-membre-jurys-connected",
  upload.any(),
  authUsers,
  getMembreJuryConnected
);

export default router;
