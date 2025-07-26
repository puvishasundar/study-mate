let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task !== "") {
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

window.onload = renderTasks;
