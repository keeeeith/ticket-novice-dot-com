export const client = {
  // returns a list of rows, ordered by row number
  fetchRows: async function () {
    return {
      seats: [
        [
          { seatId: 1, booked: true },
          { seatId: 2, booked: true },
          { seatId: 3, booked: true },
        ],
        [
          { seatId: 4, booked: false },
          { seatId: 5, booked: false },
        ],
        [
          { seatId: 6, booked: true },
          { seatId: 7, booked: true },
          { seatId: 8, booked: false },
        ],
      ],
    };
  },
  //   books a seat. throws Error if seat fails to book.
  //   else returns a boolean (true)
  //   book: async function (seatId) {
  //     if (seatId === 2) {
  //       throw new Error("Oops the seat is booked already");
  //     } else {
  //       return true;
  //     }
  //   },

  book: async function (seat) {
    if (seat.booked) {
      return "Oops the seat is booked already";
    } else {
      return true;
    }
  },
};
