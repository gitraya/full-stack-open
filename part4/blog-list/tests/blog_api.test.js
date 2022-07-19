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
  await Blog.insertMany(helper.initialBlogs);
  console.log("added blogs");
});

describe("when there is initially some notes saved", () => {
  test("blogs are retuned as json", async () => {
    console.log("entered test");

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const urls = response.body.map((r) => r.url);
    expect(urls).toContain(helper.initialBlogs[0].url);
  });

  test("every blogs must have an id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((b) => expect(b.id).toBeDefined());
  });
});

describe("addition of a new blog", () => {
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
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test("a blog without title and url is not added", async () => {
    const newBlog = { author: "Cem Eygi" };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("editing a blog", () => {
  test("succeeds with status code 200 if blog is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "How to Find Your First Job in Tech? (in 2022)",
      likes: 9,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].title).toEqual(updatedBlog.title);
  });

  test("fails with status code 400 if id is invalid", async () => {
    await api.put("/api/blogs/1").expect(400);
  });

  test("fails with status code 400 if url is invalid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = { url: "invalid url" };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].url).toEqual(blogToUpdate.url);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 400 if id is invalid", async () => {
    await api.delete(`/api/blogs/1`).expect(400);
  });
});

afterAll(() => mongoose.connection.close());
