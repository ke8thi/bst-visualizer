let taskList = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    taskList = JSON.parse(saved);
    taskList.forEach((task) => renderTask(task));
  }
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = `${task.text} ${task.dueDate ? ` - Due: ${task.dueDate}` : ""}`;
  if (task.completed) li.classList.add("completed");

  // Toggle complete
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Right-click to delete
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    taskList = taskList.filter((t) => t !== task);
    li.remove();
    saveTasks();
  });

  // Double-click to edit
  li.addEventListener("dblclick", () => {
    const newText = prompt("Edit task:", task.text);
    if (newText) {
      task.text = newText;
      li.textContent = `${task.text} ${task.dueDate ? ` - Due: ${task.dueDate}` : ""}`;
      saveTasks();
    }
  });

  document.getElementById("taskList").appendChild(li);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");

  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text,
    dueDate,
    completed: false
  };

  taskList.push(task);
  renderTask(task);
  saveTasks();

  taskInput.value = "";
  dueDateInput.value = "";
}

window.onload = loadTasks;
