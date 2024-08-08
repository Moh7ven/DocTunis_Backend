import Users from "../Models/Users.js";
import Plannings from "../Models/Plannings.js";
import Realisateurs from "../Models/Realisateurs.js";
import Films from "../Models/Films.js";
import Notes from "../Models/Notes.js";
import MembreJurys from "../Models/MembreJurys.js";
import Producteurs from "../Models/Producteurs.js";

export const createFilm = async (req, res) => {
  try {
    const { code, titre, date, sujet, realisateur, producteur } = req.body;
    const { userId } = req.auth;

    const newFilm = new Films({
      code,
      titre,
      date,
      sujet,
      realisateur,
      producteur,
      genre: "Documentaire",
    });

    if (!code || !titre || !date || !sujet || !realisateur || !producteur) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs",
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

    if (verifUser.role !== "RespInspection") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    const film = await Films.findOne({ code });
    if (film) {
      return res.status(409).json({
        message: "Un film avec ce code existe deja",
        status: false,
      });
    }

    newFilm.save();
    res.status(201).json({
      data: newFilm,
      message: "Film ajoute avec succes",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: "Une erreur est survenue", status: false });
  }
};
export const getAllFilms = async (req, res) => {
  try {
    const films = await Films.find()
      .populate("realisateur")
      .populate("producteur")
      .populate("note");
    res
      .status(200)
      .json({ data: films, status: true, message: "Liste des films" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { filmId } = req.params;
    const film = await Films.findById(filmId);

    const verifUser = await Users.findById(userId);

    if (!verifUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        status: false,
      });
    }
    if (verifUser.role !== "RespInspection") {
      return res.status(403).json({
        message: "Vous n'avez pas les autorisations requises",
        status: false,
      });
    }

    if (!film) {
      return res.status(404).json({
        message: "Film introuvable",
        status: false,
      });
    }
    res.status(200).json(film);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const searchFilm = async (req, res) => {
  try {
    const { search } = req.params;
    const film = await Films.find({
      code: { $regex: search, $options: "i" },
      titre: { $regex: search, $options: "i" },
    });

    if (!film || film.length === 0) {
      return res.status(404).json({
        message: "Aucun film correspondant",
        status: false,
      });
    }
    res.status(200).json(film);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
