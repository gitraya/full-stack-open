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

  const urls = response.body.map((r) => r.url);
  expect(urls).toContain(helper.initialBlogs[0].url);
});

test("every blogs must have an id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((b) => expect(b.id).toBeDefined());
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "How to Find Your First Job in Tech? (in 2022)",
    author: "Cem Eygi",
    url: "https://medium.com/thedevproject/how-to-find-your-first-job-in-tech-in-2022-43e8a18725b5",
    likes: 9,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const urls = blogsAtEnd.map((n) => n.url);
  expect(urls).toContain(newBlog.url);
});

test("a blog without likes is set to 0", async () => {
  const newBlog = {
    title: "How to Find Your First Job in Tech? (in 2022)",
    author: "Cem Eygi",
    url: "https://medium.com/thedevproject/how-to-find-your-first-job-in-tech-in-2022-43e8a18725b5",
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
})

afterAll(() => mongoose.connection.close());
