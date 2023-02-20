const express = require("express");
const { getCategories } = require("./gamesController");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

module.exports = app;
