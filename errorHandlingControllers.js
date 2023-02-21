exports.handlePsqlErrors = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "Invalid input" });
	} else if (err.code === "42P01") {
		res.status(404).send({ msg: "Path Not Found" });
	} else if (err.code === "23503") {
		res.status(400).send({ msg: "Bad user request; no info found" });
	} else {
		next(err);
	}
};

exports.handleServerErrors = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
	if (err === "review_id not found") {
		res.status(404).send({ msg: "review_id not found" });
	} else if (err === "invalid data entry") {
		res.status(400).send({ msg: "invalid data entry" });
	} else next(err);
};
