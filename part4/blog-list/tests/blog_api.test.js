const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

jest.setTimeout(10000);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  const initialBlogs = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: user._id,
  }));

  await Blog.insertMany(initialBlogs);
  await user.save();
});

describe("when there is initially some notes saved", () => {
  test("blogs are retuned as json", async () => {
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
  const newBlog = {
    title: "How to Find Your First Job in Tech? (in 2022)",
    author: "Cem Eygi",
    url: "https://medium.com/thedevproject/how-to-find-your-first-job-in-tech-in-2022-43e8a18725b5",
    likes: 9,
  };

  test("a valid blog can be added", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const urls = blogsAtEnd.map((n) => n.url);
    expect(urls).toContain(newBlog.url);
  });

  test("a blog without likes is set to 0", async () => {
    delete newBlog.likes;

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test("a blog without title and url is not added", async () => {
    delete newBlog.title;
    delete newBlog.url;

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .send(newBlog)
      .expect(400);
  });

  test("fails with status code 401 if token is missing", async () => {
    const result = await api.post("/api/blogs").send(newBlog).expect(401);

    expect(result.body.error).toContain("token");
  });
});

describe("editing a blog", () => {
  const updatedBlog = {
    title: "11 Amazing New JavaScript Features in ES13",
    author: "Code Beauty",
    url: "https://medium.com/javascript-in-plain-english/es13-javascript-features-eed7ed2f1497",
    likes: 670,
  };

  test("succeeds with status code 200 if blog is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].title).toEqual(updatedBlog.title);
  });

  test("fails with status code 400 if id is invalid", async () => {
    await api
      .put("/api/blogs/1")
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .expect(400);
  });

  test("fails with status code 400 if url is invalid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = { url: "invalid url" };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .send(updatedBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].url).toEqual(blogToUpdate.url);
  });

  test("fails with status code 401 if token is missing", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(401);

    expect(result.body.error).toContain("token");
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with status code 400 if id is invalid", async () => {
    await api
      .delete(`/api/blogs/1`)
      .set("Authorization", `bearer ${await helper.getToken()}`)
      .expect(400);
  });

  test("fails with status code 401 if token is missing", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401);

    expect(result.body.error).toContain("token");
  });
});

afterAll(() => mongoose.connection.close());
