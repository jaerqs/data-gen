module.exports = ({INTEGER}) => ({
  name: "student_course",
  columns: {
    student_id: { type: INTEGER, primaryKey: true },
    course_id: { type: INTEGER, primaryKey: true },
  },
});
