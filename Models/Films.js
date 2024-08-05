import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const FilmsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  titre: { type: String, required: true },
  date: { type: String, required: true },
  sujet: { type: String, required: true },
  genre: { type: String, required: true },
  realisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Realisateurs",
    required: true,
  },
  producteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producteurs",
    required: true,
  },
  note: { type: mongoose.Schema.Types.ObjectId, ref: "Notes", required: false },
});

FilmsSchema.plugin(uniqueValidator);

const Films = mongoose.model("Films", FilmsSchema);

export default Films;
