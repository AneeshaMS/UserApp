const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", adminSchema);
