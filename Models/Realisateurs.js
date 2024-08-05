import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const RealisateurSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  dateNaissance: {
    type: String,
    required: true,
  },
});

RealisateurSchema.plugin(uniqueValidator);

const Realisateurs = mongoose.model("Realisateurs", RealisateurSchema);

export default Realisateurs;
