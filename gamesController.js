const {
	fetchCategories,
	fetchReviews,
	fetchCommentsByReviewID,
	fetchReviewByID,
	insertCommentByReviewID,
	editReviewWithVote,
	doesReviewIDExist,
	fetchUsers,
	removeCommentByID,
	readEndpoints,
} = require("./gamesModel");
exports.getAPI = (req, res, next) => {
	readEndpoints()
		.then((endpoints) => {
			res.status(200).send(endpoints);
		})
		.catch((err) => {
			next(err);
		});
};
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
	const category = req.query.category || "";
	const sort_by = req.query.sort_by || "created_at";
	const order = req.query.order || "DESC";
	fetchReviews(category, sort_by, order)
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
exports.patchReview = (req, res, next) => {
	const { review_id } = req.params;
	const votes = req.body;
	editReviewWithVote(votes, review_id)
		.then((newReview) => {
			res.status(200).send(newReview);
		})
		.catch((err) => {
			next(err);
		});
};
exports.getUsers = (req, res, next) => {
	fetchUsers()
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((err) => {
			next(err);
		});
};

exports.deleteCommentByID = (req, res, next) => {
	const { comment_id } = req.params;
	removeCommentByID(comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch((err) => {
			next(err);
		});
};
