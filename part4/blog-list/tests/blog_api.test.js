const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

jest.setTimeout(10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared blogs");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
  console.log("added blogs");
});

test("blogs are retuned as json", async () => {
  console.log("entered test");

  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are six blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the first blog is about React patterns", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain(helper.initialBlogs[0].title);
});

test("every blogs must have an id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((b) => expect(b.id).toBeDefined());
});

afterAll(() => mongoose.connection.close());
