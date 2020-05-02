module.exports = ({INTEGER, STRING}) => ({
  name: "building",
  columns: {
    name: { type: STRING(32), primaryKey: true },
    number_of_floors: { type: INTEGER },
  },
});
