import Planning from "../Models/Plannings.js";
import Users from "../Models/Users.js";

export const createPlanning = async (req, res) => {
  const { jour, heure, lieu, film } = req.body;
  const { userId } = req.auth;

  try {
    // Validation des champs requis
    if (!jour || !heure || !lieu || !film) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    // Vérification de l'utilisateur
    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }

    // Vérification des autorisations
    if (verifUser.role !== "RespProduction" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    // Création du planning
    const planning = new Planning({ jour, heure, lieu, film });
    await planning.save();

    // Population des champs référencés
    await planning.populate({
      path: "film",
      populate: [
        { path: "producteur", model: "Producteurs" },
        { path: "realisateur", model: "Realisateurs" },
        { path: "note", model: "Notes" },
      ],
    });

    res.status(201).json({
      status: true,
      message: "Planning créé avec succès",
      data: planning,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Une erreur est survenue",
      error: error.message,
    });
  }
};

export const getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find().populate({
      path: "film",
      populate: [
        { path: "producteur", model: "Producteurs" },
        { path: "realisateur", model: "Realisateurs" },
        { path: "note", model: "Notes" },
      ],
    });

    res.status(200).json({
      status: true,
      data: plannings,
      message: "Plannings récupérés avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: false,
      error: error,
      message: "une erreur est survenue",
    });
  }
};

export const getPlanningById = async (req, res) => {
  const { id } = req.params;
  try {
    const planning = await Planning.findById(id).populate({
      path: "film",
      populate: [
        { path: "producteur", model: "Producteurs" },
        { path: "realisateur", model: "Realisateurs" },
        { path: "note", model: "Notes" },
      ],
    });
    if (!planning) {
      return res.status(404).json({
        status: false,
        message: "Planning introuvable",
      });
    }
    res.status(200).json({
      status: true,
      data: planning,
      message: "Planning récupéré avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: false,
      error: error.message,
      message: "une erreur est survenue",
    });
  }
};

export const updatePlanning = async (req, res) => {
  const { id } = req.params;
  const { jour, heure, lieu, film } = req.body;
  const { userId } = req.auth;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Veuillez renseigner le planning a mettre à jour",
        status: false,
      });
    }
    // Validation des champs requis
    if (!jour || !heure || !lieu || !film) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    const planning = await Planning.findById(id);
    if (!planning) {
      return res.status(404).json({
        status: false,
        message: "Planning introuvable",
      });
    }

    // Vérification des autorisations
    const verifUser = await Users.findById(userId);
    if (verifUser.role !== "RespProduction" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    const updatePlanning = await Planning.findByIdAndUpdate(
      id,
      { jour, heure, lieu, film },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Planning mis à jour avec succès",
      data: updatePlanning,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Une erreur est survenue",
      error: error.message,
    });
  }
};

export const deletePlanning = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.auth;
  try {
    const planning = await Planning.findById(id);
    if (!planning) {
      return res.status(404).json({
        status: false,
        message: "Planning introuvable",
      });
    }
    const verifUser = await Users.findById(userId);
    if (verifUser.role !== "RespProduction" && verifUser.role !== "Admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    await Planning.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Planning supprimé avec succès",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Une erreur est survenue",
      error: error.message,
    });
  }
};
