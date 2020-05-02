module.exports = ({STRING}) => ({
  name: "college_department_building",
  columns: {
    department_name: { type: STRING(32), primaryKey: true },
    building_name: { type: STRING(32), primaryKey: true },
  },
});
