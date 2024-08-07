import express from "express";
import authUsers from "../Middlewares/authUsers.js";
import multer from "multer";
import { addNote } from "../Controllers/noteController.js";
const router = express.Router();
const upload = multer();

router.post("/add-note", upload.any(), authUsers, addNote);

export default router;
