import formatStudentResult, {
  DEPARTMENT_NAME,
  calculateTotal,
  calculateAverage as findAverage,
  getGrade,
  getStatus
} from "./studentUtils.js";

const coreCourses = ["Web Development", "Database Systems", "Operating Systems"];
const electiveCourses = ["Artificial Intelligence", "Cloud Computing", "Cyber Security"];
const student = {
  name: "Ali",
  rollNumber: "BSCS-001",
  department: "Computer Science",
  semester: 6
};
const cgpaValues = [3.45, 3.12, 3.75, 2.98, 3.3];

const allCourses = [...coreCourses, ...electiveCourses];

const copiedCourses = [...allCourses];
copiedCourses.push("Software Engineering");

const updatedStudent = { ...student, semester: 7, cgpa: 3.45 };

function enrollStudent(name, ...courses) {
  return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
}

const calculateAverageCGPA = (...cgpas) => {
  let sum = 0;
  for (const cgpa of cgpas) {
    sum += cgpa;
  }
  return sum / cgpas.length;
};

const highestCGPA = Math.max(...cgpaValues);

function getStudentInfo(name, department = "Computer Science") {
  return `Student: ${name}, Department: ${department}`;
}

const enrollmentMessage = enrollStudent(
  student.name,
  "Web Development",
  "Database Systems",
  "Artificial Intelligence"
);

document.getElementById("task1Output").innerHTML = `
  <div class="card">
    <div class="card-body">
      <p>Core Courses: ${coreCourses.join(", ")}</p>
      <p>Elective Courses: ${electiveCourses.join(", ")}</p>
      <p>All Courses (${allCourses.length}): ${allCourses.join(", ")}</p>
      <p>Copy after adding a course (${copiedCourses.length}): ${copiedCourses.join(", ")}</p>
      <p>Original still has ${allCourses.length} courses</p>
      <p>Original Student: ${student.name}, Semester ${student.semester}</p>
      <p>Updated Student: ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}</p>
      <p>${enrollmentMessage}</p>
      <p>Average CGPA: ${calculateAverageCGPA(...cgpaValues).toFixed(2)}</p>
      <p>Highest CGPA: ${highestCGPA}</p>
      <p>${getStudentInfo(student.name)}</p>
    </div>
  </div>`;

document.getElementById("departmentName").textContent = `Department: ${DEPARTMENT_NAME}`;

const studentList = [
  { name: "Sara", rollNumber: "BSCS-023", assignment: 28, midterm: 26, finalExam: 29 },
  { name: "Ahmed", rollNumber: "BSCS-002", assignment: 22, midterm: 23, finalExam: 21 },
  { name: "Ayesha", rollNumber: "BSCS-014", assignment: 14, midterm: 16, finalExam: 15 },
  { name: "Hassan", rollNumber: "BSCS-031", assignment: 26, midterm: 25, finalExam: 27 }
];

let task2Cards = "";
studentList.forEach(function (singleStudent) {
  const { name, rollNumber, assignment, midterm, finalExam } = singleStudent;
  const total = calculateTotal(assignment, midterm, finalExam);
  const average = findAverage(assignment, midterm, finalExam);
  const grade = getGrade(total);
  const status = getStatus(total);
  task2Cards += `
    <div class="card mb-3">
      <div class="card-body">
        <h6 class="card-title">${formatStudentResult(name, rollNumber, total)}</h6>
        <p class="card-text">Average: ${average.toFixed(2)}</p>
        <p class="card-text">Grade: ${grade}</p>
        <p class="card-text">Status: ${status}</p>
      </div>
    </div>`;
});
document.getElementById("task2Output").innerHTML = task2Cards;

function verifyStudent(roll, callback) {
  setTimeout(function () {
    if (roll === "") {
      callback("Roll number is required", null);
    } else {
      callback(null, `Student ${roll} verified`);
    }
  }, 1000);
}

function loadExamPaper(callback) {
  setTimeout(function () {
    callback("Exam paper loaded");
  }, 1500);
}

function submitAnswers(callback) {
  setTimeout(function () {
    callback("Answers submitted");
  }, 2000);
}

function generateResult(callback) {
  setTimeout(function () {
    callback("Result generated: 82 marks");
  }, 1000);
}

// This is called callback hell because every next step is written inside the callback of the previous step, so the code keeps nesting deeper to the right like a pyramid and becomes hard to read, change and debug when more steps are added.
function runExamWorkflow(roll, outputId) {
  const output = document.getElementById(outputId);
  output.innerHTML = `<p>Exam workflow started...</p>`;
  verifyStudent(roll, function (error, message) {
    if (error) {
      output.innerHTML += `<p class="text-danger">Error: ${error}</p>`;
      return;
    }
    output.innerHTML += `<p>Step 1: ${message} (after 1 second)</p>`;
    loadExamPaper(function (paperMessage) {
      output.innerHTML += `<p>Step 2: ${paperMessage} (after 2.5 seconds)</p>`;
      submitAnswers(function (submitMessage) {
        output.innerHTML += `<p>Step 3: ${submitMessage} (after 4.5 seconds)</p>`;
        generateResult(function (resultMessage) {
          output.innerHTML += `<p>Step 4: ${resultMessage} (after 5.5 seconds)</p>`;
          output.innerHTML += `<p>Exam completed successfully!</p>`;
        });
      });
    });
  });
}

runExamWorkflow("BSCS-001", "task3Valid");
runExamWorkflow("", "task3Error");

const resultDatabase = [
  { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 28, midterm: 26, finalExam: 28 },
  { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 6, assignment: 22, midterm: 23, finalExam: 21 },
  { name: "Sara", rollNumber: "BSCS-023", department: "Computer Science", semester: 6, assignment: 28, midterm: 26, finalExam: 29 },
  { name: "Ayesha", rollNumber: "BSCS-014", department: "Computer Science", semester: 6, assignment: 14, midterm: 16, finalExam: 15 },
  { name: "Hassan", rollNumber: "BSCS-031", department: "Computer Science", semester: 6, assignment: 26, midterm: 25, finalExam: 27 }
];

function findStudent(rollNumber) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let found = null;
      for (const singleStudent of resultDatabase) {
        if (singleStudent.rollNumber === rollNumber) {
          found = singleStudent;
        }
      }
      if (found) {
        resolve(found);
      } else {
        reject("Student not found");
      }
    }, 1000);
  });
}

function calculateResult(singleStudent) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const { assignment, midterm, finalExam } = singleStudent;
      const total = calculateTotal(assignment, midterm, finalExam);
      const result = {
        total: total,
        average: total / 3,
        grade: getGrade(total),
        status: getStatus(total)
      };
      resolve(result);
    }, 1000);
  });
}

function studentCard(singleStudent, result) {
  const { name, rollNumber, department, semester } = singleStudent;
  const { total, average, grade, status } = result;
  return `
    <div class="card mb-3">
      <div class="card-body">
        <h6 class="card-title">Student: ${name}</h6>
        <p class="card-text">Roll No: ${rollNumber}</p>
        <p class="card-text">Department: ${department}</p>
        <p class="card-text">Semester: ${semester}</p>
        <p class="card-text">Total: ${total}</p>
        <p class="card-text">Average: ${average.toFixed(2)}</p>
        <p class="card-text">Grade: ${grade}</p>
        <p class="card-text">Status: ${status}</p>
      </div>
    </div>`;
}

const partAOutput = document.getElementById("partAOutput");
partAOutput.innerHTML = `<p>Searching...</p>`;
let chainStudent = null;
findStudent("BSCS-001")
  .then(function (foundStudent) {
    chainStudent = foundStudent;
    return calculateResult(foundStudent);
  })
  .then(function (result) {
    partAOutput.innerHTML = studentCard(chainStudent, result);
  })
  .catch(function (error) {
    partAOutput.innerHTML = `<p class="text-danger">Error: ${error}</p>`;
  })
  .finally(function () {
    partAOutput.innerHTML += `<p>Search completed</p>`;
  });

async function showResult(rollNumber) {
  const output = document.getElementById("searchOutput");
  output.innerHTML = `<p>Searching...</p>`;
  try {
    const foundStudent = await findStudent(rollNumber);
    const result = await calculateResult(foundStudent);
    output.innerHTML = studentCard(foundStudent, result);
  } catch (error) {
    output.innerHTML = `<p class="text-danger">Error: ${error}</p>`;
  } finally {
    output.innerHTML += `<p>Search completed</p>`;
  }
}

document.getElementById("searchBtn").addEventListener("click", function () {
  const roll = document.getElementById("rollInput").value;
  showResult(roll);
});

async function loadAllResults() {
  const output = document.getElementById("allOutput");
  output.innerHTML = `<p>Loading...</p>`;
  const allResults = await Promise.all(
    resultDatabase.map(function (singleStudent) {
      return calculateResult(singleStudent).then(function (result) {
        return { singleStudent: singleStudent, result: result };
      });
    })
  );
  let cards = "";
  let passedCount = 0;
  let failedCount = 0;
  allResults.forEach(function (item) {
    cards += `
      <div class="card mb-3">
        <div class="card-body">
          <h6 class="card-title">Student: ${item.singleStudent.name}</h6>
          <p class="card-text">Roll No: ${item.singleStudent.rollNumber}</p>
          <p class="card-text">Grade: ${item.result.grade}</p>
          <p class="card-text">Status: ${item.result.status}</p>
        </div>
      </div>`;
    if (item.result.status === "Pass") {
      passedCount++;
    } else {
      failedCount++;
    }
  });
  cards += `
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">Final Statistics</h6>
        <p class="card-text">Total Students: ${resultDatabase.length}</p>
        <p class="card-text">Passed Students: ${passedCount}</p>
        <p class="card-text">Failed Students: ${failedCount}</p>
      </div>
    </div>`;
  output.innerHTML = cards;
}

document.getElementById("loadAllBtn").addEventListener("click", function () {
  loadAllResults();
});
