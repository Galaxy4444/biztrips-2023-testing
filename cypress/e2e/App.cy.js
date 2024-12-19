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
});
