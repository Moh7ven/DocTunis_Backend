import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  membreJurys: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MembreJurys",
    required: true,
  },
  films: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Films",
    required: true,
  },
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
