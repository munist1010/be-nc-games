const express = require("express");
const { getCategories } = require("./gamesController");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./errorHandlingControllers");

const app = express();
app.use(express.json());

app.get("/api/", (req, res) => {
	res.status(200).send({ msg: "all good!" }).catch(next);
});

app.get("/api/categories", getCategories);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
