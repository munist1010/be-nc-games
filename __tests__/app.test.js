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
				.then((response) => {
					const { body } = response;
					const categories = body;
					expect(Array.isArray(categories)).toBe(true);
					categories.forEach((category) => {
						expect(category).toMatchObject({
							slug: expect.any(String),
							description: expect.any(String),
						});
					});
				});
		});
		it("should respond with a 404 Not Found error if passed a route that does not exist", () => {
			return request(app)
				.get("/api/notARoute")
				.expect(404)
				.then((response) => {
					expect(response.notFound).toBe(true);
				});
		});
	});
});
