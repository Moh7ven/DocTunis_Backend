import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usersRoutes from "./Routes/usersRoute.js";
import filmsRoutes from "./Routes/filmsRoutes.js";
import realisateursRoutes from "./Routes/realisateursRoutes.js";
import producteursRoutes from "./Routes/producteursRoutes.js";
import planningsRoutes from "./Routes/planningsRoutes.js";
import membreJurysRoutes from "./Routes/membreJurysRoutes.js";
import noteRoutes from "./Routes/noteRoutes.js";

const urlApi = "/api/v1";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(`${urlApi}/users`, usersRoutes);

app.use(`${urlApi}/films`, filmsRoutes);

app.use(`${urlApi}/realisateurs`, realisateursRoutes);

app.use(`${urlApi}/producteurs`, producteursRoutes);

app.use(`${urlApi}/plannings`, planningsRoutes);

app.use(`${urlApi}/membre-jurys`, membreJurysRoutes);

app.use(`${urlApi}/notes`, noteRoutes);

export default app;
