const db = require("./db/connection");
const format = require("pg-format");
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
	if (typeof parseInt(review_id) !== "number") {
		return Promise.reject("invalid review_id type");
	}
	const queryString = format(
		`SELECT * FROM reviews WHERE review_id = %L;`,
		review_id,
	);
	return db.query(queryString).then((result) => {
		if (result.rowCount === 0) {
			return Promise.reject("review_id not found");
		}
		return result.rows[0];
	});
};

exports.fetchCommentsByReviewID = (review_id) => {
	const queryString = format(
		`SELECT comment_id, votes, created_at, author, body, review_id FROM comments WHERE review_id = %L`,
		review_id,
	);
	return db.query(queryString).then((result) => {
		return result.rows;
	});
};
