exports.handlePsqlErrors = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "Invalid input" });
	} else if (err.code === "42P01") {
		res.status(404).send({ msg: "Path Not Found" });
	} else {
		next(err);
	}
};

exports.handleServerErrors = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else next(err);
};
