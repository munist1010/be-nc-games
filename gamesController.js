const {
	fetchCategories,
	fetchReviews,
	fetchCommentsByReviewID,
	fetchReviewByID,
	insertCommentByReviewID,
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
	fetchReviewByID(review_id)
		.then((review) => {
			res.status(200).send(review);
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

exports.postCommentByReviewID = (req, res, next) => {
	const { review_id } = req.params;
	const comment = req.body;
	insertCommentByReviewID(comment, review_id)
		.then((newComment) => {
			res.status(201).send(newComment);
		})
		.catch((err) => {
			next(err);
		});
};
