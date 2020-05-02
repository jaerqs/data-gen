module.exports = ({STRING}) => ({
  name: "professor",
  columns: {
    faculty_id: { type: STRING(4), primaryKey: true },
    first_name: { type: STRING(16)},
    last_name: { type: STRING(16) },
    teaching_assistant: { type: STRING(32) },
  },
});
