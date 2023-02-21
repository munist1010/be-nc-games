const {
	fetchCategories,
	fetchReviews,
	fetchCommentsByReviewID,
} = require("./gamesModel");

exports.getCategories = (req, res, next) => {
	fetchCategories()
		.then((categories) => {
			res.status(200).send(categories);
		})
		.catch((err) => {
			next(err);
		});
};

exports.getReviews = (req, res, next) => {
	fetchReviews()
		.then((reviews) => {
			res.status(200).send(reviews);
		})
		.catch((err) => {
			next(err);
		});
};

exports.getCommentsByReviewID = (req, res, next) => {
	const { review_id } = req.params;
	fetchCommentsByReviewID(review_id)
		.then((comments) => {
			res.status(200).send(comments);
		})
		.catch((err) => {
			next(err);
		});
};
