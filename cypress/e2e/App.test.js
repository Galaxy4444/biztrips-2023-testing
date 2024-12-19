import {render, screen} from "@testing-library/react";
import App from "../../src/App";
import {getAllTrips} from "../../src/services/tripService";
import {testTrips} from "../../src/components/api";

beforeEach(() => {
  global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([testTrips]), // Mock response data
      })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});


it("ret without crashing", () => {
  render(<App />);
});

test('App renders a heading & footer', () => {
  render(<App />)

  screen.getByRole('heading', {
    name: "Welcome to biztrips Happy new Year-react - 2024",
  })

  screen.getByTestId('footer', {
    name: "This site is created for demonstrative purposes only and does not offer\n" +
        "        any real products or services.",
  })

});

test('App renders API Content', () => {
  render(<App />)

  screen.getByTestId('tripDescription', {
    name: "This site is created for demonstrative purposes only and does not offer\n" +
        "        any real products or services.",
  })
  // Checks for empty List since when initializing, it is empty
  screen.getByTestId('emptyWishlist', {
    name: "Wishlist is empty",
  })


});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});

test('the data is received correctly', async () => {
  await expect(fetchData()).resolves.toContain('San Francisco World Trade Center on new Server/IOT/Client');
});


async function fetchData() {
  try {
    const response = await getAllTrips();
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
