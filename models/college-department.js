module.exports = ({INTEGER, STRING, DOUBLE}) => ({
  name: "college_department",
  columns: {
    name: { type: STRING(32), primaryKey: true },
    budget: { type: DOUBLE},
    population_size: { type: INTEGER },
  },
});
