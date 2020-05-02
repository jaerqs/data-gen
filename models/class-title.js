module.exports = ({INTEGER, STRING}) => ({
  name: "class_title",
  columns: {
    prefix: { type: STRING(4), primaryKey: true },
    number: { type: INTEGER, primaryKey: true },
    name: { type: STRING(80) },
    level: { type: INTEGER },
  },
});
