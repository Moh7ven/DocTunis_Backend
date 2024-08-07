import express from "express";
import multer from "multer";
import {
  createFilm,
  getFilmById,
  getAllFilms,
} from "../Controllers/filmsController.js";
import authUsers from "../Middlewares/authUsers.js";
const upload = multer();
const router = express.Router();

router.post("/create-film", upload.any(), authUsers, createFilm);

router.get("/get-film-by-id/:filmId", upload.any(), getFilmById);

router.get("/get-all-films", upload.any(), authUsers, getAllFilms);

export default router;
