import Realisateurs from "../Models/Realisateurs.js";
import Users from "../Models/Users.js";

export const createRealisateurs = async (req, res) => {
  try {
    const { code, nom, prenom, dateNaissance } = req.body;
    const { userId } = req.auth;
    const realisateur = new Realisateurs({ code, nom, prenom, dateNaissance });

    if (!code || !nom || !prenom || !dateNaissance) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }

    if (verifUser.role !== "RespInspection" && verifUser.role !== "Admin") {
      return res.status(403).json({
        data: verifUser.role,
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    const rea = await Realisateurs.findOne({ code });
    if (rea) {
      return res.status(400).json({
        message: "Code d'utilisateur existe deja",
        status: false,
      });
    }

    const reaSave = await realisateur.save();
    res.status(201).json({
      message: "Realisateur creer avec succes",
      data: reaSave,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Une erreur s'est produite",
      status: false,
    });
  }
};

export const getAllRealisateurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const realisateurs = await Realisateurs.find();

    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }

    if (verifUser.role !== "RespInspection" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    res
      .status(200)
      .json({ realisateurs, message: "Realisateurs récupérés", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};

export const getOneRealisateurs = async (req, res) => {
  try {
    const { realisateurId } = req.params;
    const realisateur = await Realisateurs.findById(realisateurId);

    if (!realisateur) {
      return res.status(404).json({
        message: "realisateur introuvable",
        status: false,
      });
    }
    res.status(200).json({ data: realisateur, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};

export const updateRealisateurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { realisateurId } = req.params;
    const { code, nom, prenom, dateNaissance } = req.body;
    console.log(realisateurId);

    const realisateur = await Realisateurs.findById(realisateurId);

    if (!realisateur) {
      return res.status(404).json({
        message: "Realisateur introuvable",
        status: false,
      });
    }
    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    if (verifUser.role !== "RespInspection" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    if (!code || !nom || !prenom || !dateNaissance) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    const reaUpdate = await Realisateurs.findByIdAndUpdate(realisateurId, {
      code,
      nom,
      prenom,
      dateNaissance,
    });

    if (!reaUpdate) {
      return res.status(404).json({
        message: "Realisateur introuvable",
        status: false,
      });
    }

    res.status(200).json({
      message: "Realisateur mis a jour",
      status: true,
      data: reaUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue",
      status: false,
      error: error,
    });
  }
};

export const deleteRealisateurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { realisateurId } = req.params;
    const realisateur = await Realisateurs.findById(realisateurId);
    if (!realisateur) {
      return res.status(404).json({
        message: "Realisateur introuvable",
        status: false,
      });
    }
    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    if (verifUser.role !== "RespInspection" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    const reaDelete = await Realisateurs.findByIdAndDelete(realisateurId);
    res.status(200).json({
      message: "Realisateur supprime",
      status: true,
      data: reaDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};
