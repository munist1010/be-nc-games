const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const devData = require("../db/data/development-data/index");
const runSeed = require("../db/seeds/run-seed");

describe("app", () => {
	describe("/api/categories", () => {
		it("should respond with an array of categories", () => {
			return request(app)
				.get("/api/categories")
				.expect(200)
				.then(({ body }) => {
					const categories = body;
					console.log(categories);
					expect(Array.isArray(categories)).toBe(true);
				});
		});
	});
});
