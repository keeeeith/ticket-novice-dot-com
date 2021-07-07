import React, { useState, useEffect } from "react";
import "./App.css";
import { client } from "./TicketService";

function App() {
  const [seating, setSeating] = useState([]);

  function fetchSeating() {
    const response = client.fetchRows();
    return response.then(({ seats }) => setSeating(seats));
  }

  useEffect(() => {
    if (!seating.length) {
      fetchSeating();
    }
  }, [seating]);

  const Row = ({ row }) => (
    <div className="row">
      {row.map((seat) => (
        <Seat key={seat.seatId} seat={seat} />
      ))}
    </div>
  );

  const Seat = ({ seat }) => {
    const { booked, seatId } = seat;

    function bookSeat() {
      client.book(seat).then((response) => {
        if (response === true) {
          // Find the row containing this seat
          const seatRow = seating.filter((row) =>
            row.find((seat) => seat.seatId === seatId)
          );

          // Get the index of the row containing this seat
          const rowIndex = seating.findIndex((row) => row === seatRow[0]);

          // Get the index of the this seat within its row
          const seatIndex = seating[rowIndex].findIndex(
            (seat) => seat.seatId === seatId
          );

          // Make a copy of `seating`
          const newSeating = [...seating];

          // Identify this seat within the copied seating object
          const thisSeat = newSeating[rowIndex][seatIndex];

          // Replace thisSeat in newSeating with updated `booked` value
          newSeating[rowIndex][seatIndex] = {
            ...thisSeat,
            booked: true,
          };

          // Finally update the seating state, triggering re-render
          setSeating(newSeating);
        } else {
          window.alert(response);
        }
      });
    }
    return (
      <div className={`seat ${booked && "seat--booked"}`}>
        <h2>Seat #{seatId}</h2>
        <p>{booked ? "Booked!" : "Available!"}</p>
        <button onClick={bookSeat}>Book Seat</button>
      </div>
    );
  };

  return (
    <div className="seat-grid">
      {seating.map((row, idx) => (
        <Row key={idx} row={row} />
      ))}
    </div>
  );
}

export default App;
