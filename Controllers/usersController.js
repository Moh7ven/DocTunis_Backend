import Users from "../Models/Users.js";
import Plannings from "../Models/Plannings.js";
import Realisateurs from "../Models/Realisateurs.js";
import Films from "../Models/Films.js";
import Notes from "../Models/Notes.js";
import MembreJurys from "../Models/MembreJurys.js";
import Producteurs from "../Models/Producteurs.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
  try {
    const { nom, prenom, code, password } = req.body;

    if ((!nom || !prenom || !code, !password)) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.findOne({ code });
    if (user) {
      return res.status(400).json({
        message: "Code d'utilisateur existe deja",
        status: false,
      });
    }

    const admin = new Users({
      nom,
      prenom,
      code,
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    res
      .status(201)
      .json({ data: admin, message: "Admin cree avec succes", status: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite", status: false });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nom, prenom, code, password, role } = req.body;

    if ((!nom || !prenom || !code, !password, !role)) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.findOne({ code });
    if (user) {
      return res.status(400).json({
        message: "Code d'utilisateur existe deja",
        status: false,
      });
    }

    const users = new Users({
      nom,
      prenom,
      code,
      password: hashedPassword,
      role,
    });
    await users.save();
    res
      .status(201)
      .json({ data: users, message: `${role} crée avec succes`, status: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite", status: false });
  }
};

export const login = async (req, res) => {
  try {
    const { code, password } = req.body;
    if (!code || !password) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }
    const user = await Users.findOne({ code });
    if (!user) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Mot de passe invalide",
        status: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    res
      .status(200)
      .json({ data: user, token, message: "Connexion reussie", status: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite", status: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res
      .status(200)
      .json({ data: users, status: true, message: "Recuperation reussie" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite", status: false });
  }
};
