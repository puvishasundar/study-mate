// Default weekly plan data from localStorage or fresh
const weeklyPlans = JSON.parse(localStorage.getItem("weeklyPlans")) || {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: []
};

function savePlans() {
  localStorage.setItem("weeklyPlans", JSON.stringify(weeklyPlans));
}

function displayPlanner() {
  const plannerGrid = document.getElementById("plannerGrid");
  plannerGrid.innerHTML = "";

  Object.keys(weeklyPlans).forEach(day => {
    const box = document.createElement("div");
    box.className = "day-box";
    box.innerHTML = `<h4>${day}</h4>`;

    const ul = document.createElement("ul");
    weeklyPlans[day].forEach(task => {
      const li = document.createElement("li");
      li.textContent = task;
      ul.appendChild(li);
    });

    box.appendChild(ul);
    plannerGrid.appendChild(box);
  });
}

function addPlan() {
  const day = document.getElementById("daySelect").value;
  const task = document.getElementById("planInput").value.trim();

  if (day && task) {
    weeklyPlans[day].push(task);
    savePlans();
    displayPlanner();
    document.getElementById("planInput").value = "";
  } else {
    alert("Please select a day and enter a task!");
  }
}

window.onload = displayPlanner;
let planner = JSON.parse(localStorage.getItem("studyPlanner")) || [];

function savePlanner() {
  localStorage.setItem("studyPlanner", JSON.stringify(planner));
}

function addPlan() {
  const subject = document.getElementById("subjectInput").value.trim();
  const day = document.getElementById("dayInput").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  if (subject === "" || start === "" || end === "") {
    alert("Please fill in all fields!");
    return;
  }

  planner.push({ subject, day, start, end });
  savePlanner();
  renderPlanner();
  document.getElementById("subjectInput").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
}

function deleteSlot(index) {
  planner.splice(index, 1);
  savePlanner();
  renderPlanner();
}

function renderPlanner() {
  const tableDiv = document.getElementById("plannerTable");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let tableHTML = "<table><tr><th>Day</th><th>Subject</th><th>Time</th><th>Action</th></tr>";

  planner.forEach((slot, index) => {
    tableHTML += `
      <tr>
        <td>${slot.day}</td>
        <td>${slot.subject}</td>
        <td>${slot.start} - ${slot.end}</td>
        <td><button onclick="deleteSlot(${index})">Delete</button></td>
      </tr>
    `;
  });

  tableHTML += "</table>";
  tableDiv.innerHTML = tableHTML;
}

// Load on page start
renderPlanner();
