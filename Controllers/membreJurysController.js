import MembreJurys from "../Models/MembreJurys.js";
import Users from "../Models/Users.js";
import jwt from "jsonwebtoken";

export const createMembreJurys = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { code, nom, prenom, dateNaissance } = req.body;
    const membreJurys = new MembreJurys({ code, nom, prenom, dateNaissance });
    const verifUser = await Users.findById(userId);

    if (!code || !nom || !prenom || !dateNaissance) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }

    if (verifUser.role !== "admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    const verifCode = await MembreJurys.findOne({ code });
    if (verifCode) {
      return res.status(400).json({
        message: "Code de membre existant",
        status: false,
      });
    }

    const createdMembreJurys = await membreJurys.save();
    res.status(201).json({
      data: createdMembreJurys,
      status: true,
      message: "Membre Jury créé avec succes",
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue",
      error: error.message,
      status: false,
    });
  }
};

export const loginMembreJurys = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    const membreJurys = await MembreJurys.findOne({ code });
    if (!membreJurys) {
      return res.status(404).json({
        message: "Membre non existant",
        status: false,
      });
    }

    const token = jwt.sign(
      { userId: membreJurys._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ data: membreJurys, token: token, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, status: false });
  }
};

export const getAllMembreJurys = async (req, res) => {
  try {
    const { userId } = req.auth;
    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    if (verifUser.role !== "admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    const membreJurys = await MembreJurys.find();
    res.status(200).json({
      data: membreJurys,
      status: true,
      message: "Membre Jurys recupérés avec succes",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, status: false });
  }
};

export const getOneMembreJurys = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.auth;
    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    if (
      verifUser.role !== "admin" &&
      verifUser.role !== "RespInspection" &&
      verifUser.role !== "RespProduction"
    ) {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    const membreJurys = await MembreJurys.findById(id);
    if (!membreJurys) {
      return res.status(404).json({
        message: "Membre non existant",
        status: false,
      });
    }
    res.status(200).json({
      data: membreJurys,
      message: "Membre recupéré avec succes",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

export const getMembreJuryConnected = async (req, res) => {
  try {
    const { userId } = req.auth;

    const membreJurys = await MembreJurys.findOne({ _id: userId });
    if (!membreJurys) {
      return res.status(404).json({
        message: "Membre non existant",
        status: false,
      });
    }
    res.status(200).json({
      data: membreJurys,
      message: "Membre recupéré avec succes",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue",
      error: error.message,
      status: false,
    });
  }
};
