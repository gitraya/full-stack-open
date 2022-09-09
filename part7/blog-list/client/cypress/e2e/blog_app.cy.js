describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser({
      name: "Raya",
      username: "gitraya",
      password: "gitraya",
    });
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("input[name=Username]").should("be.visible");
    cy.get("input[name=Password]").should("be.visible");
    cy.get("button[type=submit]").should("contain", "login").and("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();

      cy.get("input[name=Username]").type("gitraya");
      cy.get("input[name=Password]").type("gitraya");
      cy.get("button[type=submit]").should("contain", "login").click();

      cy.get(".success")
        .contains("welcome Raya")
        .should("be.visible")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");

      cy.contains("Raya logged in").contains("logout").should("be.visible");
      cy.contains("create new blog").should("be.visible");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();

      cy.get("input[name=Username]").type("gitraya");
      cy.get("input[name=Password]").type("wrong");
      cy.get("button[type=submit]").should("contain", "login").click();

      cy.get(".error")
        .contains("wrong username or password")
        .should("be.visible")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Raya logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "gitraya", password: "gitraya" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();

      cy.get("input[name=Title]").type("Title");
      cy.get("input[name=Author]").type("Author");
      cy.get("input[name=Url]").type("https://www.test.com");
      cy.get("button[type=submit]").should("contain", "create").click();

      cy.get("[data-testid=blog-card]")
        .should("contain", "Title")
        .and("contain", "Author");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Title",
          author: "Author",
          url: "https://www.test.com",
        });
      });

      it("A blog can be liked", function () {
        cy.contains("Title Author").parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").contains("likes 0");

        cy.get("@blog").contains("like").click();
        cy.get("@blog").contains("likes 1");
      });

      it("A blog can be deleted", function () {
        cy.contains("Title Author").parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").contains("remove").click();

        cy.get("html").should("not.contain", "Title Author");
      });

      it("A blog cannot be deleted by another user", function () {
        cy.createUser({
          name: "Raya",
          username: "gitraya2",
          password: "gitraya2",
        });
        cy.login({ username: "gitraya2", password: "gitraya2" });

        cy.contains("Title Author").parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").should("not.contain", "remove");
      });
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the least likes",
          author: "Author least likes",
          url: "https://www.test.com",
          likes: 1,
        });

        cy.createBlog({
          title: "The title with the most likes",
          author: "Author most likes",
          url: "https://www.test.com",
          likes: 10,
        });
      });

      it("Blogs are sorted by likes", function () {
        cy.get("[data-testid=blog-card]")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get("[data-testid=blog-card]")
          .eq(1)
          .should("contain", "The title with the least likes");
      });
    });
  });
});
