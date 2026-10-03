# Full Stack Lab 05 — ES6 Features, Modules & Async JavaScript

A university lab project covering **modern ES6 features, JavaScript modules, callbacks, promises, and async/await**, with four assignment tasks displayed dynamically on a single webpage.

## Tech Stack

- HTML5
- Bootstrap 5.3 (CDN) for cards, buttons, and layout
- Vanilla JavaScript (ES6+) with ES modules (`type="module"`)

## Assignment Tasks

### Task 1 — University Course Enrollment Manager

Manages course lists and a student record using modern ES6 syntax. Core and
elective course arrays are merged with the **spread operator**, a copied array
is modified to prove the original stays unchanged, and a student object is
updated immutably with spread. Enrollment uses a **rest parameter**
(`enrollStudent(name, ...courses)`), average CGPA is computed by an arrow
function with rest parameters, the highest CGPA comes from `Math.max()` with
spread, and a **default parameter** supplies the department. All output is
built with **template literals** and shown in a Bootstrap card.

### Task 2 — Student Utility Module

A reusable module (`studentUtils.js`) exporting helpers shared across the lab:
a named constant (`DEPARTMENT_NAME`), `calculateTotal` with a rest parameter,
`calculateAverage` as an arrow function, `getGrade` (A–F scale), `getStatus`
as an arrow function with a ternary operator, and a **default export**
(`formatStudentResult`). In `lab05.js` these are imported with named, default,
and **aliased** imports (`calculateAverage as findAverage`), then applied to
four student records with `forEach()` and object destructuring. Each student
renders as a separate result card.

### Task 3 — Online Examination Workflow

Simulates a four-step exam process (verify student → load paper → submit
answers → generate result), where each step uses `setTimeout` to simulate
delay and runs only after the previous step finishes. Part A runs the steps
in order with **nested callbacks** (with a note in the code on why this style
is called "callback hell"). Part B rewrites verification as an **error-first
callback**: an empty roll number stops the workflow and displays
"Roll number is required" instead of running the remaining steps. Both the
valid and empty roll-number runs execute live on the page.

### Task 4 — University Result Portal

A small result portal backed by an in-page "database" of five students.
`findStudent` and `calculateResult` return **promises** (resolve after a
simulated 1-second delay, reject with "Student not found"). Part A fetches a
result with a `.then()` / `.catch()` / `.finally()` chain, Part B rewrites
the same flow with **async/await** and `try...catch...finally`, Part C wires
that to a search box and button (result card on success, red error message
otherwise), and Part D uses **Promise.all** with `map()` to calculate every
student's result at once, ending with total / passed / failed statistics.
Total, grade, and status reuse the Task 2 module functions.

## Concepts Covered

| Concept | Where it is used |
| --- | --- |
| Spread operator | Merging/copying course arrays, updating the student object, `Math.max(...cgpas)` |
| Rest parameters | `enrollStudent`, `calculateTotal`, `calculateAverageCGPA` |
| Default parameters | `getStudentInfo(name, department = "Computer Science")` |
| Template literals | All messages and result cards |
| Arrow functions & ternary | Average/status helpers, Pass/Fail status |
| Object destructuring | Student records, `calculateResult`, card rendering |
| ES modules (named, default, aliased imports) | `studentUtils.js` → `lab05.js` |
| Callbacks, nested callbacks, error-first callbacks | Exam workflow steps, empty-roll-number error path |
| Promises (`.then` / `.catch` / `.finally`) | `findStudent`, `calculateResult`, Part A chain |
| Async/await with `try...catch...finally` | `showResult`, `loadAllResults` |
| `Promise.all` with `map()` | Loading all results together in Part D |
| DOM manipulation | Every task renders its output on the page |

## Project Structure

```
full-stack-lab-05/
├── index.html       # Page structure with the four Lab 05 task sections
├── lab05.js         # Main module: Tasks 1, 3 and 4 logic + Task 2 usage
├── studentUtils.js  # Task 2 utility module (named + default exports)
└── README.md
```

## How to Run

ES modules only load over HTTP, so opening `index.html` directly from disk
(`file://`) will leave the page blank with a CORS/module error in the console.

1. Open the project folder in VS Code.
2. Run `index.html` with the **Live Server** extension (or any local static server).
3. Internet access is required for the Bootstrap CDN.

Task 3's workflow and Task 4's searches are asynchronous — give them a few
seconds to complete after the page loads or a button is clicked.

## Author

Hussnain Ahmad — BSCS, Air University, Islamabad
