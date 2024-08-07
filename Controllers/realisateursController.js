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

    if (verifUser.role !== "RespInspection" || verifUser.role !== "Admin") {
      return res.status(403).json({
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
