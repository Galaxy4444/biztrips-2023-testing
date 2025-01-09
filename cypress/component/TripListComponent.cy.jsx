import React from 'react';
import { mount } from '@cypress/react18';
import TripList from '../../src/components/TripList'; // Adjust the path as needed
import { testTrips } from '../../src/components/api'; // Import the testTrips array

describe('TripList Component', () => {
    let addToWishlist;

    beforeEach(() => {
        // Initialize the stub inside a hook
        addToWishlist = cy.stub().as('addToWishlist');

        // Mock the getAllTrips function to return testTrips
        cy.stub(require('../../src/services/tripService'), 'getAllTrips').resolves(testTrips);
    });

    it('renders empty message when no trips are available', () => {
        // Mock an empty trip list
        cy.stub(require('../../src/services/tripService'), 'getAllTrips').resolves([]);

        mount(<TripList addToWishlist={addToWishlist} />);

        // Check if the empty message is displayed
        cy.contains('Productlist is empty').should('exist');
    });
});

describe('TripList Component - Filter by February', () => {
    let addToWishlist;

    beforeEach(() => {
        // Initialize the stub inside a hook
        addToWishlist = cy.stub().as('addToWishlist');

        // Mock the getAllTrips function to return testTrips
        cy.stub(require('../../src/services/tripService'), 'getAllTrips').resolves(testTrips);
    });

    it('filters trips by February', () => {
        mount(<TripList addToWishlist={addToWishlist} />);

        // Select February (month value is 2)
        cy.get('#month').select('2');

        // Check if only the filtered trip is displayed
        cy.get('[data-testid="trip-item-1"]').should('exist'); // BT01 should exist (February trip)
        cy.get('[data-testid="trip-item-2"]').should('not.exist'); // BT02 should not exist (June trip)
        cy.get('[data-testid="trip-item-3"]').should('not.exist'); // BT03 should not exist (December trip)

        // Check the filter message
        cy.contains('Found 2 trips for the month of Feb').should('exist');

        // Verify the details of the filtered trip
        cy.get('[data-testid="trip-item-1"]').first().within(() => {
            cy.get('h6.title').should('contain', 'BT01'); // Check title
        });
    });
});