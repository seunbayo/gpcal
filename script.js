// GPA Calculator
const gpaForm = document.getElementById("gpa-form");
const courseNameInput = document.getElementById("course-name");
const creditHoursInput = document.getElementById("credit-hours");
const gradeSelect = document.getElementById("grade");
const coursesList = document.getElementById("courses");
const gpaResult = document.getElementById("gpa");

// Store courses in an array
let courses = [];

// Calculate the GPA
const calculateGPA = () => {
  let totalCreditHours = 0;
  let totalGradePoints = 0;

  courses.forEach((course) => {
    totalCreditHours += course.creditHours;
    totalGradePoints += course.creditHours * course.grade;
  });

  const gpa = totalGradePoints / totalCreditHours;
  gpaResult.textContent = gpa.toFixed(2);
};

// Add course to the list
const addCourseToList = (course) => {
  const { name, creditHours, grade } = course;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${name}</span>
    <span>Credit Hours: ${creditHours}</span>
    <span>Grade: ${grade}</span>
    <i class="fas fa-trash-alt icon" data-name="${name}"></i>
  `;
  coursesList.appendChild(li);
};

// Remove course from the list
const removeCourseFromList = (courseName) => {
  courses = courses.filter((course) => course.name !== courseName);
};

// Event: Add a course
gpaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = courseNameInput.value;
  const creditHours = parseInt(creditHoursInput.value);
  const grade = parseFloat(gradeSelect.value);

  if (name === "" || isNaN(creditHours) || isNaN(grade)) {
    return;
  }

  const course = {
    name,
    creditHours,
    grade,
  };

  courses.push(course);
  addCourseToList(course);
  calculateGPA();

  courseNameInput.value = "";
  creditHoursInput.value = "";
  gradeSelect.selectedIndex = 0;
});

// Event: Remove a course
coursesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon")) {
    const courseName = e.target.getAttribute("data-name");
    removeCourseFromList(courseName);
    e.target.parentElement.remove();
    calculateGPA();
  }
});
