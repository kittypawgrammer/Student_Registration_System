
//  Student Registration System 
let editIndex = -1;

document.getElementById("studentForm").addEventListener("submit", submitForm);

// Checks if a student already exists in local storage

function isDuplicate(studentId, email) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    for (let i = 0; i < students.length; i++) {
        if (i === editIndex) continue;

        let student = students[i];

        if (student.studentId && student.studentId.toLowerCase() === studentId.toLowerCase()) {
            return `Student ID "${studentId}" already exists`;
        }

        if (student.email && student.email.toLowerCase() === email.toLowerCase()) {
            return `Email "${email}" already exists`;
        }
    }
    return null;
}

//  Handles form submission and saves student data to local storage

function submitForm(e) {
    let form = document.getElementById("studentForm");
    e.preventDefault();

    let newStudent = Object.fromEntries(new FormData(form));

    let duplicateError = isDuplicate(newStudent.studentId, newStudent.email);
    if (duplicateError) {
        alert(duplicateError);
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (editIndex === -1) {
        students.push(newStudent);
    } else {
        students[editIndex] = newStudent;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    console.log("get All Students:", students);

    displayStudents();

    form.reset();

}


//  Displays all students from local storage in the table

function displayStudents() {
    let tableData = document.getElementById("studentTable");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    tableData.innerHTML = "";

    if (students.length === 0) {
        tableData.innerHTML = `<tr><td colspan="5">No students registered</td></tr>`;
        return;
    }

    students.forEach((student, index) => {
        tableData.innerHTML += `
        <tr>
            <td class="px-2 text-center">${student.name}</td>
            <td class="px-2 text-center">${student.studentId}</td>
            <td class="px-2 text-center">${student.email}</td>
            <td class="px-2 text-center">${student.contact}</td>
            <td class="flex gap-2 justify-center">
            <button 
                class="bg-amber-300 text-black px-4 py-2  my-3 rounded-lg shadow-md hover:bg-amber-500 hover:shadow-lg transition-all duration-300 font-medium"
                onclick="editStudent(${index})">
                Edit
            </button>

            <button 
                class="bg-red-500 text-black px-4 py-2  my-3 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 font-medium"
                onclick="deleteStudent(${index})">
                Delete
            </button>
        </td>
        </tr>`;
    });

    // Scrollbar logic
    if (students.length > 4) {
        document.getElementById("tableContainer").style.height = "300px";
        document.getElementById("tableContainer").style.overflowY = "scroll";
    } else {
        document.getElementById("tableContainer").style.height = "auto";
        document.getElementById("tableContainer").style.overflowY = "hidden";
    }
}


// Show students when page loads

displayStudents();


// Deletes a student from local storage by index

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}


// Populates the form with student data for editing

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = students[index];

    document.querySelector('[name="name"]').value = student.name;
    document.querySelector('[name="studentId"]').value = student.studentId;
    document.querySelector('[name="email"]').value = student.email;
    document.querySelector('[name="contact"]').value = student.contact;

    editIndex = index;

    displayStudents(index);
}



