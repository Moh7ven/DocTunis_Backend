import express from "express";
import multer from "multer";
import authUsers from "../Middlewares/authUsers.js";
import {
  createMembreJurys,
  deleteMembreJurys,
  getAllMembreJurys,
  getMembreJuryConnected,
  getOneMembreJurys,
  loginMembreJurys,
  updateMembreJurys,
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

router.put(
  "/update-membre-jurys/:id",
  upload.any(),
  authUsers,
  updateMembreJurys
);

router.delete(
  "/delete-membre-jurys/:id",
  upload.any(),
  authUsers,
  deleteMembreJurys
);

export default router;
