/// <reference types="cypress" />

import { testTrips } from "../../src/components/api";

describe("App Tests with Cypress", () => {
  beforeEach(() => {
    // Visit the app
    cy.visit("/");
    // Mock the fetch response before each test
    cy.intercept("GET", "http://localhost:3001/trips", {
      body: testTrips,
    }).as("getTrips");
  });

  it("intercepts api successfully", () => {
    cy.wait("@getTrips").then((interception) => {
      // Log the full interception object
      console.log("Intercepted Request:", interception);

      // Log specific parts of the interception
      console.log("Request Body:", interception.request.body);
      console.log("Response Body:", interception.response.body);

      // Perform assertions
      expect(interception.response.body).to.deep.equal(testTrips);
    });
  });


  it("renders without crashing", () => {
    // Confirm that the app has loaded
    cy.get("body").should("exist");
  });

  it("renders a heading & footer", () => {
    // Check for the heading
    cy.findByRole("heading", {
      name: /Welcome to biztrips Happy new Year-react - 2024/i,
    }).should("exist");

    // Check for the footer
    cy.findByTestId("footer").should(
        "contain.text",
        "This site is created for demonstrative purposes only and does not offer any real products or services."
    );
  });

  it("renders API Content", () => {
    // Wait for the trips API response
    cy.wait("@getTrips");

    // Check for the trip description
    cy.findAllByTestId("tripDescription")
        .contains("San Francisco World Trade Center on new Server/IOT/Client002")
        .should("exist");


    // Check for the empty wishlist message
    cy.findByTestId("emptyWishlist").should("contain.text", "Wishlist is empty");
  });


  it("correctly receives data", () => {
    // Wait for the trips API response
    cy.wait("@getTrips");

    // Assert that the mocked data is displayed
    cy.contains("San Francisco World Trade Center on new Server/IOT/Client").should("exist");
  });

  it("adds a trip to the wishlist", () => {
    // Verify the trip list is displayed
    cy.contains("BT01").should("exist");

    // Add the trip to the wishlist
    cy.contains("Add to Wishlist").click();

    // Verify the trip is added to the wishlist
    cy.get("[data-testid='wishlist-item-1']").should("exist");

    // Verify the wishlist reflects the correct trip details
    cy.get("[data-testid='wishlist-item-1']")
        .should("contain.text", "BT01")
        .and("contain.text", "San Francisco World Trade Center on new Server/IOT/Client002");
  });
});

  describe("Wishlist Heart Item Test", () => {
    beforeEach(() => {
      // Mock the API response
      cy.intercept("GET", "http://localhost:3001/trips", {
        body: [
          {
            id: 1,
            title: "BT01",
            description: "San Francisco World Trade Center on new Server/IOT/Client002",
            startTrip: [2021, 2, 13, 0, 0],
            endTrip: [2021, 2, 15, 16, 56],
            hearted: false,
          },
        ],
      }).as("getTrips");

      // Visit the app
      cy.visit("/");
      cy.wait("@getTrips");
    });

    it("adds an item to the wishlist and toggles its heart state", () => {
      // Add item to the wishlist
      cy.contains("Add to Wishlist").click();

      // Verify the item is in the wishlist
      cy.get("[data-testid='wishlist-item-1']").should("exist");

      // Heart the item
      cy.get("[data-testid='wishlist-item-1']")
          .find("button")
          .contains("heart Item")
          .click();

      // Verify the item is hearted
      cy.get("[data-testid='wishlist-item-1']")
          .find("svg")
          .should("have.attr", "fill", "#FF0000"); // Ensures the red heart icon is displayed

      // Verify the button text changes to "unheart Item"
      cy.get("[data-testid='wishlist-item-1']")
          .find("button")
          .contains("unheart Item");

      // Unheart the item
      cy.get("[data-testid='wishlist-item-1']")
          .find("button")
          .contains("unheart Item")
          .click();

      // Verify the item is unhearted
      cy.get("[data-testid='wishlist-item-1']")
          .find("svg")
          .should("have.attr", "fill", "none"); // Ensures the outlined heart icon is displayed

      // Verify the button text changes back to "heart Item"
      cy.get("[data-testid='wishlist-item-1']")
          .find("button")
          .contains("heart Item");
    });

    it("removes an item from the wishlist", () => {
      // Add item to the wishlist
      cy.contains("Add to Wishlist").click();

      // Verify the item is in the wishlist
      cy.get("[data-testid='wishlist-item-1']").should("exist");

      // Click the remove button
      cy.get("[data-testid='wishlist-item-1']")
          .find("button")
          .contains("delete Item")
          .click();

      // Verify the item is no longer in the wishlist
      cy.get("[data-testid='wishlist-item-1']").should("not.exist");

      // Verify the empty wishlist message is displayed
      cy.get("[data-testid='emptyWishlist']").should("exist");
    });
  });

