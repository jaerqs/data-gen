module.exports = ({INTEGER, STRING}) => ({
  name: "student",
  columns: {
    class_standing: { type: STRING(10) },
    student_id: { type: INTEGER, primaryKey: true },
    first_name: { type: STRING(16) },
    last_name: { type: STRING(16) },
    credit_hours: { type: INTEGER },
  },
});
