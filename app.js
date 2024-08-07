import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usersRoutes from "./Routes/usersRoute.js";
import filmsRoutes from "./Routes/filmsRoutes.js";

const urlApi = "/api/v1";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(`${urlApi}/users`, usersRoutes);

app.use(`${urlApi}/films`, filmsRoutes);

export default app;
