const express = require("express");
const { getCategories, getReviews } = require("./gamesController");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./errorHandlingControllers");

const app = express();

app.get("/api/", (req, res) => {
	res.status(200).send({ msg: "all good!" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
