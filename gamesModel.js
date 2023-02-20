const db = require("./db/connection");

exports.fetchCategories = () => {
	return db.query(`SELECT * FROM categories;`).then((result) => {
		return result.rows;
	});
};
















exports.fetchReviewByID = (review_id) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = %L`, review_id)
}