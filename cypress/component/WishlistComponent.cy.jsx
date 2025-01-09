import React from 'react';
import { mount } from '@cypress/react18';
import Wishlist from '../../src/components/Wishlist'; // Ensure this is the correct path

describe('Wishlist Component', () => {
    const wishlist = [
        {
            id: 1,
            title: 'BT01',
            description: 'San Francisco World Trade Center on new Server/IOT/Client002',
            startTrip: '2021-02-13T00:00:00.000Z',
            endTrip: '2021-02-15T16:56:00.000Z',
            hearted: false,
        },
        {
            id: 2,
            title: 'BT02',
            description: 'Another trip description',
            startTrip: '2021-03-01T00:00:00.000Z',
            endTrip: '2021-03-05T00:00:00.000Z',
            hearted: true,
        },
    ];

    let heartItem, removeFromWishlist, clearWishlist;

    beforeEach(() => {
        // Initialize stubs inside a hook
        heartItem = cy.stub().as('heartItem');
        removeFromWishlist = cy.stub().as('removeFromWishlist');
        clearWishlist = cy.stub().as('clearWishlist');
    });

    it('renders Wishlist with correct details', () => {
        mount(
            <Wishlist
                wishlist={wishlist}
                heartItem={heartItem}
                removeFromWishlist={removeFromWishlist}
                clearWishlist={clearWishlist}
            />
        );

        // Check if the Wishlist items are rendered
        cy.contains('BT01').should('exist');
        cy.contains('San Francisco World Trade Center on new Server/IOT/Client002').should('exist');
        cy.contains('BT02').should('exist');
        cy.contains('Another trip description').should('exist');
    });

    it('renders empty message when wishlist is empty', () => {
        mount(
            <Wishlist
                wishlist={[]} // Empty wishlist
                heartItem={heartItem}
                removeFromWishlist={removeFromWishlist}
                clearWishlist={clearWishlist}
            />
        );

        // Check if the empty message is rendered
        cy.get('[data-testid="emptyWishlist"]').should('exist');
        cy.contains('Wishlist is empty').should('exist');
    });

    it('calls the delete function on button click', () => {
        mount(
            <Wishlist
                wishlist={wishlist}
                heartItem={heartItem}
                removeFromWishlist={removeFromWishlist}
                clearWishlist={clearWishlist}
            />
        );

        // Click the delete button for the first item
        cy.get('[data-testid="wishlist-item-1"]').within(() => {
            cy.contains('delete Item').click();
        });

        // Assert that the stub was called
        cy.get('@removeFromWishlist').should('have.been.calledOnce');
    });
});