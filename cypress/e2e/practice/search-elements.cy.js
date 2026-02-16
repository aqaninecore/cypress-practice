/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/");
});

describe("Search elements", () => {
  it("cy.get", () => {
    cy.get("h1");
  });

  it("cy.contains", () => {
    cy.contains("Do more");
    cy.contains("button", "About");
  });

  it("cy.find", () => {
    cy.get("header").find("button");
  });

  it("cy.children", () => {
    // cy.get('.header_nav').children('button');
    cy.get(".header_nav>button");
  });

  it("cy.parent", () => {
    cy.get('[appscrollto="aboutSection"]').parent();
  });

  it("cy.parents", () => {
    cy.get('[appscrollto="aboutSection"]').parents("div.container");
  });

  it.only("within", () => {
    cy.get(".header_signin").click();
    cy.get(".modal-content").within(() => {
      cy.get(".btn-primary");
      cy.get("button");
      cy.root().parent().parent().parent().parent().parent().find("h1");
    });
  });

  it.only("cy.closest", () => {
    cy.get('[appscrollto="aboutSection"]').closest("div.container");
  });

  context("Multiple elements", () => {
    it.only("first, last, eq", () => {
      cy.get(".social_icon").first();
      cy.get(".social_icon").last();
      cy.get(".social_icon").eq(2);
    });
  });

  it.only("filter", () => {
    it.only("first, last, eq", () => {
      cy.get(".social_icon").first(".icon_instagram");
      cy.get(".social_icon").not(".icon_instagram");
    });
  });
});

context("Advanced", () => {
  it("invoke", () => {
    cy.get("h1").invoke("hide");
    cy.wait(3000);
    cy.get("h1").invoke("show");

    cy.get("h1").invoke("attr", "class").should("contain", "descriptor_title");
  });

  it("then", () => {
    cy.get("h1")
      .invoke("text")
      .then((text) => {
        cy.log(text);
        cy.log("TEST TEST");
      });
  });

  it.only("wrap", () => {
    const message = "new message";
    cy.wrap(message).should("eq", "new message");

    // cy.get("h1")
    //   .invoke("text")
    //   .then((text) => {
    //     const textUpperCase = text.toUpperCase();
    //     cy.wrap(textUpperCase).should("have.text", "Do more");
    //   });
  });

  it.only("its", () => {
    const array = [10, 20, 30];
    const person = {
      name: "John",
      age: 30,
    };

    cy.wrap(array).its("length").should("equal", 3);
    cy.wrap(person).its("name").should("equal", "John");
  });

  it.only("each", () => {
    cy.get(".btn-primary").click();
    cy.get("input").each(($input) => {
      cy.wrap($input).type("HelloInput");
    });
  });

  it("alias", () => {
    // WRONG APPROACH
    // const button = cy.get(".header_signin");
    // button.click();

    cy.get(".header_signin").as("signInButton");
    cy.get("@signInButton").click();
  });
});
