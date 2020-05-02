const faker = require('faker');

const Rows = function (model, amount) {
  this.model = model;
  this.amount = amount;
  this.instances = [];
}

Rows.prototype.seedData = async function (data) {
  this.instances.push(await this.model.create(data));
}

Rows.prototype.getRandomValue = function (attribute) {
  return faker.random.arrayElement(this.instances)[attribute];
}

module.exports = (models) => async () => {

  try {
  let student = new Rows(models.student, 500);
  for (let i = 0; i <= student.amount; i++) {

    await student.seedData({
      student_id: i,
      class_standing: faker.lorem.word().substring(0, 10),
      first_name: faker.name.firstName().substring(0, 16),
      last_name: faker.name.lastName().substring(0, 16),
      credit_hours: faker.random.number(120)
    });
  }

  let professor = new Rows(models.professor, 250);
  for (let i = 0; i <= professor.amount; i++) {
    await professor.seedData({
      faculty_id: faker.random.alphaNumeric(4),
      first_name: faker.name.firstName().substring(0, 16),
      last_name: faker.name.lastName().substring(0, 16),
      teaching_assistant: faker.name.findName().substring(0, 16),
    });
  }

  const dept = new Rows(models.college_department, 200);
  for (let i = 0; i <= dept.amount; i++) {

    await dept.seedData({
      name: `${faker.name.firstName().substring(0, 10)} ${faker.name.lastName().substring(0, 10)}`,
      budget: faker.finance.amount(10, 99, 2),
      population_size: faker.random.number(3000)
    });
  }
  


  let start_time = faker.random.arrayElement([0900, 1030, 1100, 1200, 1400]);
  let end_time = start_time + 50;
  let course = new Rows(models.course, 300);
  for (let i = 0; i <= course.amount; i++) {

    await course.seedData({
      course_id: i,
      topic: faker.lorem.word().substring(0, 50),
      semester: faker.random.arrayElement(['SPR', 'SMR', 'FAL']),
      status: faker.random.arrayElement(['OPEN', 'CLOSED']),
      start_date: faker.date.recent(30),
      end_date: faker.date.recent(90),
      start_time: start_time.toString(),
      end_time: end_time.toString(),
      faculty_id: faker.random.arrayElement(professor.instances).faculty_id
    });
  }

  const coursePrereq = new Rows(models.course_prerequisite, 200)

  course.instances.forEach(async c => {
    await c.createClass_title( {
      prefix: faker.finance.currencyCode().substring(0,3),
      number: faker.random.number(4559),
      name: faker.name.firstName().substring(0,50),
      level: faker.random.arrayElement([1,2,3,4])
    });

    await coursePrereq.seedData({
      course_id: c.course_id,
      prereq_id: faker.random.arrayElement(course.instances).course_id
    })
  })


  let building = new Rows(models.building, 100);

  for (let i = 0; i <= building.amount; i++) {

    await building.seedData({
      name: faker.company.companyName(0).substring(0, 10) + faker.random.arrayElement([' West', ' North', ' South', ' East'] + i),
      number_of_floors: faker.random.number(15),
    });
    building.instances.forEach(async instance => {
      for (let i = 0; i < 3; i++) {
          await instance.createRoom({
          room_number: faker.finance.amount(10, 9999, 2),
          seat_occupancy: 50,
          building_name: professor.getRandomValue('faculty_id'),
          course_id: course.getRandomValue('course_id')
        });
      }
    });
  }
  


  const collegeDepartmentBuilding = new Rows(models.college_department_building, 10);
  dept.instances.forEach(async dept => {
    await collegeDepartmentBuilding.seedData({
      department_name: dept.name,
      building_name: faker.random.arrayElement(building.instances).name
    });
  });

  const collegeDepartmentCourse = new Rows(models.college_department_course, 10);
  course.instances.forEach(async c => {
    await collegeDepartmentCourse.seedData({
      department_name: (faker.random.arrayElement(dept.instances)).name,
      course_id: c.course_id
    });
  })

  student.instances.forEach(async s => {
    await s.createEnroll({
department_name: faker.random.arrayElement(dept.instances).name,
building_name: faker.random.arrayElement(building.instances).name,
course_id: faker.random.arrayElement(course.instances).course_id,
faculty_id: faker.random.arrayElement(professor.instances).faculty_id,
class_title_prefix: faker.random.arrayElement(course.instances).prefix
    })
  })
} catch (err) {
  console.log(err);
}
};