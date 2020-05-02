module.exports = ({DOUBLE, INTEGER}) => ({
  name: "room",
  columns: {
    room_number: { type: DOUBLE, primaryKey: true },
    seat_occupancy: { type: INTEGER },
  },
});
