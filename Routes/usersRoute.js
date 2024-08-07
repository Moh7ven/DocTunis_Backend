import express from "express";
import multer from "multer";
import {
  createAdmin,
  createUser,
  getAllUsers,
  getUserById,
  login,
} from "../Controllers/usersController.js";

const upload = multer();
const router = express.Router();

router.post("/save-admin", upload.any(), createAdmin);

router.post("/save-user", upload.any(), createUser);

router.get("/get-all-users", upload.any(), getAllUsers);

router.post("/login", upload.any(), login);

router.get("/get-user-by-id/:userId", upload.any(), getUserById);

export default router;
