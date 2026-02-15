/// <reference types="cypress" />

describe("Open Homepage", () => {
  it("visits homepage", () => {
    cy.visit("https://quest:welcome2quato.forstudy.space");
  });
});
