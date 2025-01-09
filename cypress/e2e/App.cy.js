/// <reference types="cypress" />

import { testTrips } from "../../src/components/api";
import React from "react";
import { mount } from "cypress/react";
import WishlistItem from "../../src/components/Wishlist";

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

// Component Tests
describe("Component Tests", () => {
  it("renders WishlistItem with correct details", () => {
    const trip = {
      id: 1,
      title: "BT01",
      description: "San Francisco World Trade Center on new Server/IOT/Client002",
      startTrip: "2021-02-13T00:00:00.000Z",
      endTrip: "2021-02-15T16:56:00.000Z",
      hearted: false
    };

    mount(<WishlistItem item={trip} heartItem={cy.stub()} removeFromWishlist={cy.stub()} />);
    cy.contains("BT01").should("exist");
    cy.contains("San Francisco World Trade Center on new Server/IOT/Client002").should("exist");
  });

  it("calls the delete function on button click", () => {
    const trip = {
      id: 1,
      title: "BT01",
      description: "San Francisco World Trade Center on new Server/IOT/Client002",
      startTrip: "2021-02-13T00:00:00.000Z",
      endTrip: "2021-02-15T16:56:00.000Z",
      hearted: false
    };
    const onDelete = cy.stub();

    mount(<WishlistItem item={trip} heartItem={cy.stub()} removeFromWishlist={onDelete} />);
    cy.contains("delete Item").click();

    // Add a slight delay to ensure the click propagates
    cy.wait(500);

    expect(onDelete).to.have.been.calledOnce;
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
