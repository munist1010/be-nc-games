const { fetchCategories, getReviews, getReviewByID } = require("./gamesModel");

exports.getCategories = (req, res, next) => {
	fetchCategories()
		.then((categories) => {
			res.status(200).send(categories);
		})
		.catch(next);
};

exports.getReviews = (req, res, next) => {};

exports.getReviewByID = (req, res, next) => {
	const { review_id } = req.params;
	fetchReviewByID(review_id).then((review) => {});
};
