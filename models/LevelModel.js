const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  GuildId: String,
  UserId: String,
  UserXP: Number,
  UserLevel: Number,
});

const model = mongoose.model("LevelModel", levelSchema);

module.exports = model;
