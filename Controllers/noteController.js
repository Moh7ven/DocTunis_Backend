import Notes from "../Models/Notes.js";
import Films from "../Models/Films.js";
import MembreJurys from "../Models/MembreJurys.js";

export const addNote = async (req, res) => {
  const { note, filmId } = req.body;
  const { userId } = req.auth;

  try {
    if (!note || !filmId) {
      return res.status(400).json({
        message: "Veuillez renseigner tous les champs",
        status: false,
      });
    }

    const membreJury = await MembreJurys.findById(userId);
    if (!membreJury) {
      return res.status(404).json({
        message: "Membre du jury introuvable",
        status: false,
      });
    }

    const film = await Films.findById(filmId);
    if (!film) {
      return res.status(404).json({
        message: "Film introuvable",
        status: false,
      });
    }

    const newNote = new Notes({
      note,
      date: new Date(),
      membreJurys: userId,
      films: filmId,
    });

    await newNote.save();

    film.note = newNote._id;
    await film.save();

    res.status(201).json({
      status: true,
      message: "Note ajoutée avec succès",
      data: newNote,
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
