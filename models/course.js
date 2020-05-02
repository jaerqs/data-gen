module.exports = ({INTEGER, STRING, DATE}) => ({
  name: "course",
  columns: {
    course_id: { type: INTEGER, primaryKey: true },
    topic: { type: STRING(128) },
    semester: { type: STRING(3) },
    status: { type: STRING(16)},
    start_date: { type: DATE },
    end_date: { type: DATE },
    start_time: { type: STRING },
    end_time: { type: STRING },
  },
});
