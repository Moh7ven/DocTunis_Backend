import mongoose from "mongoose";

const planningSchema = new mongoose.Schema({
  jour: {
    type: String,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  lieu: {
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
