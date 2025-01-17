/// <reference types="cypress" />

import {testTrips} from "../../src/components/api";


// Integration Tests
describe("Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "http://localhost:3001/trips", {
      body: testTrips,
    }).as("getTrips");
  });

  it("intercepts API successfully", () => {
    cy.wait("@getTrips").then((interception) => {
      expect(interception.response.body).to.deep.equal(testTrips);
    });
  });

  it("renders the API content on the page", () => {
    cy.wait("@getTrips");
    cy.findAllByTestId("tripDescription")
        .contains("San Francisco World Trade Center on new Server/IOT/Client002")
        .should("exist");
  });

  it("renders an empty wishlist message", () => {
    cy.wait("@getTrips");
    cy.findByTestId("emptyWishlist").should("contain.text", "Wishlist is empty");
  });

  it("adds a trip to the wishlist", () => {
    cy.contains("Add to Wishlist").click();
    cy.get("[data-testid='wishlist-item-1']")
        .should("exist")
        .and("contain.text", "BT01")
        .and("contain.text", "San Francisco World Trade Center on new Server/IOT/Client002");
  });
});

// End-to-End (E2E) Tests
describe("End-to-End (E2E) Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "http://localhost:3001/trips", {
      body: testTrips,
    }).as("getTrips");
  });

  it("adds and hearts an item in the wishlist", () => {
    cy.wait("@getTrips");
    cy.contains("Add to Wishlist").click();
    cy.get("[data-testid='wishlist-item-1']").should("exist");

    cy.get("[data-testid='wishlist-item-1']")
        .find("button")
        .contains("heart Item")
        .click();
    cy.get("[data-testid='wishlist-item-1']")
        .find("svg")
        .should("have.attr", "fill", "#FF0000");
  });

  it("removes an item from the wishlist", () => {
    cy.wait("@getTrips");
    cy.contains("Add to Wishlist").click();
    cy.get("[data-testid='wishlist-item-1']")
        .find("button")
        .contains("delete Item")
        .click();
    cy.get("[data-testid='wishlist-item-1']").should("not.exist");
  });
});
