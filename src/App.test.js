import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the app", () => {
  render(<App />);
  const header = screen.getByText("ticketnovice.com");
  expect(header).toBeInTheDocument();
});

// Test 1: That seats appear on screen when passed mock data
// const mockData = { seats: [[{ seatId: 1, booked: false }]] }

// Test 2: Clicking "Book Seat" button on an available seat changes state to booked

// Test 3: Clicking "Book Seat" button on booked seat triggers alert.
