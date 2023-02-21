const {
	fetchCategories,
	fetchReviews,
	fetchReviewByID,
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

exports.getReviewByID = (req, res, next) => {
	const { review_id } = req.params;
	fetchReviewByID(review_id).then((review) => {});
};
