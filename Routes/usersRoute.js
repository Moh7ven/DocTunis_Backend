import express from "express";
import multer from "multer";
import {
  createAdmin,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../Controllers/usersController.js";

const upload = multer();
const router = express.Router();

router.post("/save-admin", upload.any(), createAdmin);

router.post("/save-user", upload.any(), createUser);

router.get("/get-all-users", upload.any(), getAllUsers);

router.post("/login", upload.any(), login);

router.get("/get-user-by-id/:userId", upload.any(), getUserById);

router.put("/update-user/:userId", upload.any(), updateUser);

router.delete("/delete-user/:userId", upload.any(), deleteUser);

export default router;
