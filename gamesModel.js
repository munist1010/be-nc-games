const db = require("./db/connection");

exports.fetchCategories = () => {
	return db.query(`SELECT * FROM categories;`).then((result) => {
		return result.rows;
	});
};

exports.fetchReviews = () => {
	return db
		.query(
			`SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;`,
		)
		.then((result) => {
			return result.rows;
		});
};

exports.fetchReviewByID = (review_id) => {
	return db.query(`SELECT * FROM reviews WHERE review_id = %L`, review_id);
};
