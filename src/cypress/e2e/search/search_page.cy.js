/// <reference types="cypress" />

// Setting up initial test suite for search

/*eslint no-undef: "off" */

describe("Ensure pages have search", () => {
  it("should find search input box", () => {
    cy.visit("/");
    cy.get(
      "#search > atomic-search-layout > atomic-layout-section > atomic-search-box"
    )
      .shadow()
      .find("input")
      .click();
  });
});

describe("Visit search page", () => {
  it("search box should exist", () => {
    cy.visit("/search.html");
    cy.get(
      "#search > atomic-search-layout > atomic-layout-section:nth-child(1) > atomic-search-box"
    )
      .shadow()
      .find("input")
      .click();
  });
});

describe("Search for mule runtime from main page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit", () => {
    cy.get(
      "#search > atomic-search-layout > atomic-layout-section:nth-child(1) > atomic-search-box"
    )
      .shadow()
      .find("input")
      .click();
  });

  it("should run a search", () => {
    // Fill the box
    cy.get(
      "#search > atomic-search-layout > atomic-layout-section:nth-child(1) > atomic-search-box"
    )
      .shadow()
      .find("input")
      .type("Mule runtime");

    cy.get(
      "#search > atomic-search-layout > atomic-layout-section:nth-child(1) > atomic-search-box"
    )
      .shadow()
      .find("div > atomic-focus-detector > button")
      .click();
    cy.url().should("include", "search");
    cy.get(
      "#search > atomic-search-layout > atomic-layout-section:nth-child(3) > atomic-layout-section:nth-child(1) > atomic-query-summary"
    )
      .shadow()
      .find("span[part='highlight query']")
      .contains("Mule runtime");
  });
});

// Add assertions for facets
