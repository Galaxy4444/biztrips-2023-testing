import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import App from '../App';

describe('Wishlist Functionality', () => {
    it('should add a trip to wishlist only once', () => {
        render(<App/>);

        const addButtons = screen.queryAllByText('Add to Wishlist');

        // Ensure we have buttons to test
        expect(addButtons.length).toBeGreaterThan(0);

        fireEvent.click(addButtons[0]);
    });

    it('should not add duplicate trips to wishlist', () => {
        render(<App/>);

        const addButtons = screen.queryAllByText('Add to Wishlist');
        expect(addButtons.length).toBeGreaterThan(0);

        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[0]);
    });
});

describe('Wishlist Clearing Functionality', () => {
    it('should clear all trips from wishlist when "empty wishlist" button is clicked', () => {
        render(<App/>);

        // Find all "Add to Wishlist" buttons
        const addButtons = screen.getAllByText('Add to Wishlist');

        // Add multiple trips to the wishlist
        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[1]);

        // Verify trips were added to wishlist
        const wishlistRows = screen.getAllByRole('row', {name: /delete Item/i});
        expect(wishlistRows.length).toBeGreaterThan(0);

        // Find and click the "empty wishlist" button
        const emptyWishlistButton = screen.getByText(/empty wishlist/i);
        fireEvent.click(emptyWishlistButton);

        // Verify wishlist is now empty
        const emptyMessage = screen.getByText(/Wishlist is empty/i);
        expect(emptyMessage).toBeInTheDocument();
    });

    it('should disable "empty wishlist" button when wishlist is empty', () => {
        render(<App/>);

        // Find the "empty wishlist" button
        const emptyWishlistButton = screen.getByText(/empty wishlist/i);

        // Verify button is disabled
        expect(emptyWishlistButton).toBeDisabled();
    });
});

describe('Wishlist Item Removal Functionality', () => {
    it('should remove a single trip from wishlist when "delete Item" button is clicked', () => {
        // Render the App component
        render(<App/>);

        // Find all "Add to Wishlist" buttons
        const addButtons = screen.getAllByText('Add to Wishlist');

        // Ensure we have at least two trips to test with
        expect(addButtons.length).toBeGreaterThan(1);

        // Add two trips to the wishlist
        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[1]);

        // Verify trips were added to wishlist
        const initialWishlistItems = screen.getAllByText('delete Item');
        const initialItemCount = initialWishlistItems.length;
        expect(initialItemCount).toBeGreaterThan(0);

        // Find and click the first "delete Item" button
        const deleteButtons = screen.getAllByText('delete Item');
        fireEvent.click(deleteButtons[0]);

        // Verify one item was removed
        const remainingWishlistItems = screen.queryAllByText('delete Item');
        expect(remainingWishlistItems.length).toBe(initialItemCount - 1);
    });

});


