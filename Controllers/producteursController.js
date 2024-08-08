import Producteurs from "../Models/Producteurs.js";
import Users from "../Models/Users.js";

export const createProducteurs = async (req, res) => {
  try {
    const { code, nom, prenom, dateNaissance } = req.body;
    const { userId } = req.auth;
    const producteur = new Producteurs({ code, nom, prenom, dateNaissance });

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

    const prod = await Producteurs.findOne({ code });
    if (prod) {
      return res.status(400).json({
        message: "Code d'utilisateur existe deja",
        status: false,
      });
    }

    const prodSave = await producteur.save();
    res.status(201).json({
      message: "Producteur creer avec succes",
      data: prodSave,
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

export const getAllProducteurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const producteurs = await Producteurs.find();

    const verifUser = await Users.findById(userId);
    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }

    if (verifUser.role !== "RespInspection" && verifUser.role !== "admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    res
      .status(200)
      .json({ producteurs, message: "Producteurs récupérés", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};

export const getOneProducteurs = async (req, res) => {
  try {
    const { producteurId } = req.params;
    const producteur = await Producteurs.findById(producteurId);

    if (!producteur) {
      return res.status(404).json({
        message: "Producteur introuvable",
        status: false,
      });
    }
    res.status(200).json({ data: producteur, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};

export const updateProducteurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { producteurId } = req.params;
    const { code, nom, prenom, dateNaissance } = req.body;
    console.log(producteurId);

    const producteur = await Producteurs.findById(producteurId);

    if (!producteur) {
      return res.status(404).json({
        message: "Producteur introuvable",
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
    if (verifUser.role !== "RespInspection" && verifUser.role !== "admin") {
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

    const reaUpdate = await Producteurs.findByIdAndUpdate(
      producteurId,
      {
        code,
        nom,
        prenom,
        dateNaissance,
      },
      {
        new: true,
      }
    );

    if (!reaUpdate) {
      return res.status(404).json({
        message: "Producteur introuvable",
        status: false,
      });
    }

    res.status(200).json({
      message: "Producteur mis a jour",
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

export const deleteProducteurs = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { producteursId } = req.params;
    const producteurs = await Producteurs.findById(producteursId);
    if (!producteurs) {
      return res.status(404).json({
        message: "Producteur introuvable",
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
    if (verifUser.role !== "RespInspection" && verifUser.role !== "admin") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }
    const reaDelete = await Producteurs.findByIdAndDelete(producteursId);
    res.status(200).json({
      message: "Producteur supprime",
      status: true,
      data: reaDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue", status: false });
  }
};
