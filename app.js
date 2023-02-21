const express = require("express");
const {
	getCategories,
	getReviews,
	getCommentsByReviewID,
	getReviewByID,
	postCommentByReviewID,
} = require("./gamesController");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./errorHandlingControllers");

const app = express();

app.use(express.json());

app.get("/api/", (req, res) => {
	res.status(200).send({ msg: "all good!" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
