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
		it("200 - GET: should respond with an array of categories", () => {
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
		it("404 - NOT FOUND: should respond with a 404 Not Found error if passed a route that does not exist", () => {
			return request(app)
				.get("/api/notARoute")
				.expect(404)
				.then((response) => {
					expect(response.notFound).toBe(true);
				});
		});
	});
	describe("/api/reviews", () => {
		it("200 - GET: should return an array of reviews", () => {
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
		it("404 - NOT FOUND: should return an error 404 if path does not exist", () => {
			return request(app)
				.get("/api/review")
				.expect(404)
				.then((response) => {
					expect(response.notFound).toBe(true);
				});
		});
		it("200 - GET: should return the array of reviews in descending date order", () => {
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
	describe("/api/review/:review_id", () => {
		it("200 - GET: should return a single review by id", () => {
			return request(app)
				.get("/api/reviews/1")
				.expect(200)
				.then((response) => {
					expect(response.body).toMatchObject({
						review_id: expect.any(Number),
						title: expect.any(String),
						category: expect.any(String),
						designer: expect.any(String),
						owner: expect.any(String),
						review_body: expect.any(String),
						review_img_url: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
					});
				});
		});
		it("404 - NOT FOUND: should return an error when trying to GET an id which does not exist", () => {
			return request(app)
				.get("/api/reviews/1000")
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toBe("review_id not found");
				});
		});
		it("400 - BAD REQUEST: should return an error when trying to GET an id which is not a number", () => {
			return request(app)
				.get("/api/reviews/banana")
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).toBe("Invalid input");
				});
		});
	});
	describe("/api/reviews/:review_id/comments", () => {
		it("should return an array for comments for a specific review_id", () => {
			return request(app)
				.get("/api/reviews/1/comments")
				.expect(200)
				.then((response) => {
					expect(Array.isArray(response.body)).toBe(true);
				});
		});
		it("should return the array of comments sorted by date", () => {
			return request(app)
				.get("/api/reviews/4/comments")
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
