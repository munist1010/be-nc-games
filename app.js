const express = require("express");
const {
	getCategories,
	getReviews,
	getCommentsByReviewID,
	getReviewByID,
	postCommentByReviewID,
	patchReview,
	getUsers,
	deleteCommentByID,
	getAPI,
} = require("./gamesController");
const {
	handleCustomErrors,
	handlePsqlErrors,
	handleServerErrors,
} = require("./errorHandlingControllers");

const app = express();

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.patch("/api/reviews/:review_id", patchReview);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteCommentByID);

app.all("/*", (req, res, next) => {
	// console.log("app.all", req.method, req.url);
	res.status(404).send({ msg: "404 from app.all" });
	next();
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
