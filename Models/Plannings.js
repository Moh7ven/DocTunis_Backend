import mongoose from "mongoose";

const planningSchema = new mongoose.Schema({
  Jour: {
    type: String,
    required: true,
  },
  Heure: {
    type: Date,
    required: true,
  },
  Lieu: {
    type: String,
    required: true,
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Films",
    required: true,
  },
});

const Planning = mongoose.model("Plannings", planningSchema);

export default Planning;
