const { fetchCategories } = require("./gamesModel");

exports.getCategories = (req, res, next) => {
	fetchCategories()
		.then((categories) => {
			res.status(200).send(categories);
		})
		.catch(next);
};

exports.getReviews = (req, res, next) => {};
