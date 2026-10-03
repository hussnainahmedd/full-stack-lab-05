# Full Stack Lab 05

ES6 features, JavaScript modules, callbacks, promises and async/await — Lab 05 of CS-301L Full Stack Web Development.

## Files

- `index.html` — the Lab 05 webpage with all four task sections
- `lab05.js` — main script, loaded as an ES module
- `studentUtils.js` — shared student utility module used by `lab05.js`

## Tasks

1. **University Course Enrollment Manager** — spread operator, rest parameters, default parameters and template literals used to manage courses and enrollments.
2. **Student Utility Module** — a module with named exports, a default export and an aliased import, used to calculate totals, averages, grades and pass/fail status.
3. **Online Examination Workflow** — ordered steps with `setTimeout` and nested callbacks, plus an error-first callback version that stops the workflow when the roll number is empty.
4. **University Result Portal** — promise-based `findStudent` and `calculateResult`, a `.then()` chain, an `async/await` search form, and `Promise.all` to load every student's result together.

## How to run

Open the project folder in VS Code and run `index.html` with **Live Server**. Modules do not load from `file://`, so Live Server (or any local server) is required.
