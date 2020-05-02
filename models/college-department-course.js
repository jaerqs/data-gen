module.exports = ({INTEGER, STRING}) => ({
  name: "college_department_course",
  columns: {
    department_name: { type: STRING(32), primaryKey: true },
    course_id: { type: INTEGER, primaryKey: true },
  },
});
