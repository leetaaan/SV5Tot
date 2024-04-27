import Exception from "../exceptions/Exception.js";
import { Student } from "../Schema/Student.js";
import { faker } from "@faker-js/faker";
import { print } from "../helpers/print.js";

const getAllStudents = async ({ page, size, searchString }) => {
  // aggregate data for all students
  page = parseInt(page);
  size = parseInt(size);
  // searchString? name, email, address contains searchString
  debugger;
  let filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return filteredStudents;
};

// languages: ["english", "spanish", "vietnamese"]
const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  //   console.log("insert student");
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validation
      throw new Exception("Input error", exception.errors);
    }
    debugger;
  }
  debugger;
};

async function generateFakeStudents() {
  let fakeStudents = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement([
          "English",
          "Korean",
          "Vietnamese",
          "Japanese",
        ]),
        faker.helpers.arrayElement([
          "English",
          "Korean",
          "Vietnamese",
          "Japanese",
        ]),
        faker.helpers.arrayElement([
          "English",
          "Korean",
          "Vietnamese",
          "Japanese",
        ]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  debugger;
  await Student.insertMany(fakeStudents);
}

const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Cannot find student with id " + studentId);
  }
  return student ?? {}; // default value
};

const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  //   console.log("insert student");
  const student = await Student.findById(id);
  debugger;
  student.name = name ?? student.name;
  student.email = email ?? student.email;
  student.languages = languages ?? student.languages;
  student.gender = gender ?? student.gender;
  student.phoneNumber = phoneNumber ?? student.phoneNumber;
  student.address = address ?? student.address;
  await student.save()
  return student;
};

export default {
  getAllStudents,
  insertStudent,
  generateFakeStudents,
  getStudentById,
  updateStudent,
};
