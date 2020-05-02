module.exports = (models) => {
  const {
    building,
    room,
    class_title,
    course,
    professor,
    college_department,
    student,
    enroll
  } = models;

  
  building.hasMany(room, {foreignKey: 'building_name'});
  room.belongsTo(building, {foreignKey: 'building_name'});

  class_title.hasMany(course);
  course.belongsTo(class_title);

  professor.hasMany(course, {foreignKey: 'faculty_id'});
  course.belongsTo(professor, {foreignKey: 'faculty_id'});

  course.hasMany(room, {foreignKey: 'course_id'});
  room.belongsTo(course, {foreignKey: 'course_id'});

  student.hasMany(enroll, {foreignKey: 'student_id'});
  enroll.belongsTo(student, {foreignKey: 'student_id'});

  college_department.hasMany(enroll, {foreignKey: 'department_name'});
  enroll.belongsTo(college_department, {foreignKey: 'department_name'});

  building.hasMany(enroll, {foreignKey: 'building_name'});
  enroll.belongsTo(building, {foreignKey: 'building_name'});
  // college_department.belongsToMany(course, {through: enroll});
  // course.belongsToMany(college_department, {through: enroll});

  course.belongsToMany(course, {through: 'course_prerequisite', as:'course', foreignKey: 'course_id'});
  course.belongsToMany(course, {through: 'course_prerequisite', as:'prereq', foreignKey: 'prereq_id'})

  // enroll.belongsTo(college_department);
  course.hasMany(enroll, {foreignKey: 'course_id'});
  enroll.belongsTo(course, {foreignKey: 'course_id'});

  professor.hasMany(enroll, {foreignKey: 'faculty_id'});
  enroll.belongsTo(professor, {foreignKey: 'faculty_id'});

  room.hasMany(enroll, {foreignKey: 'room_number'});
  enroll.belongsTo(room, {foreignKey: 'room_number'});

  class_title.hasMany(enroll);
  enroll.belongsTo(class_title);
};