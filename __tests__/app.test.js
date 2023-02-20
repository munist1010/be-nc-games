const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	return db.end();
});

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
	describe("/api/reviews", () => {
		it("should return an array of reviews", () => {
			return request(app)
				.get("/api/reviews")
				.expect(200)
				.then((response) => {
					const reviews = response.body;
					reviews.forEach((review) => {
						expect(review).toMatchObject({
							owner: expect.any(String),
							title: expect.any(String),
							review_id: expect.any(Number),
							category: expect.any(String),
							review_img_url: expect.any(String),
							created_at: expect.any(String),
							votes: expect.any(Number),
							designer: expect.any(String),
							comment_count: expect.any(String),
						});
					});
				});
		});
		it("should return an error 404 if path does not exist", () => {
			return request(app)
				.get("/api/review")
				.expect(404)
				.then((response) => {
					expect(response.notFound).toBe(true);
				});
		});
		it("should return the array of reviews in descending date order", () => {
			return request(app)
				.get("/api/reviews")
				.expect(200)
				.then((response) => {
					expect(response.body).toBeSorted({
						key: "created_at",
						descending: "true",
					});
				});
		});
	});
});
