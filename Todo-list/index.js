// imports
import { format } from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

const projectDialog = document.getElementById("project-dialog");
const addProjectOpenBtn = document.getElementById("add-project-btn");

const taskDialog = document.getElementById("task-dialog");
const addProjectBtn = document.querySelector(".project-confirm-btn");
const addTaskBtn = document.querySelector(".task-confirm-btn");

const projectContainer = document.querySelector("#projects-container");
const projectInput = document.getElementById("project-name");

// task inputs
const taskNameInput = document.getElementById("task-name");
const taskDescriptionInput = document.getElementById("task-description");
const taskDueDateInput = document.getElementById("task-due-date");
const taskPriorityInput = document.getElementById("task-priority");

let projects = [];
let currentProjectId = null;
let editingTaskId = null;

// ==== LocalStorage Persistence ====
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const stored = localStorage.getItem("projects");
  if (stored) {
    projects = JSON.parse(stored);
    projects.forEach(renderProjectWithTasks);
  }
}

function renderProjectWithTasks(project) {
  renderProject(project);
  project.tasks.forEach((task) => renderTask(project.projectId, task));
}

// ==== Models ====
function Project(name) {
  const projectId = crypto.randomUUID();
  return { projectId, name, tasks: [] };
}

function Task(taskName, description, dueDate, priority) {
  const taskId = crypto.randomUUID();
  return { taskId, taskName, description, completed: false, dueDate, priority };
}

// ==== Add Project ====
function addProject(name) {
  if (!name.trim()) return;
  const newProject = Project(name);
  projects.push(newProject);
  renderProject(newProject);
  saveProjects();
}

// ==== Add Task ====
function addTask(projectId, taskName, description, dueDate, priority) {
  if (!taskName.trim()) return;
  const project = projects.find((p) => p.projectId === projectId);
  if (!project) return;
  const newTask = Task(taskName, description, dueDate, priority);
  project.tasks.push(newTask);
  renderTask(projectId, newTask);
  saveProjects();
}

// ==== Update Task ====
function updateTask(projectId, taskId, updatedData) {
  const project = projects.find((p) => p.projectId === projectId);
  if (!project) return;
  const task = project.tasks.find((t) => t.taskId === taskId);
  if (!task) return;

  Object.assign(task, updatedData);

  // re-render
  const oldTaskElement = document.querySelector(`[data-id="${taskId}"]`);
  oldTaskElement?.remove();
  renderTask(projectId, task);

  saveProjects();
}

// ==== Render Project ====
function renderProject(newProject) {
  const projectElement = document.createElement("div");
  projectElement.dataset.id = newProject.projectId;
  projectElement.classList.add("project-wrapper");

  projectElement.innerHTML = `
    <div class="project">
      <div class="project-header">
        <h2>${newProject.name}</h2>
        <div class="project-actions">
          <button class="add-task-btn">+ Add Task</button>
          <button class="delete-project-btn">🗑️</button>
        </div>
      </div>
      <ul class="task-list"></ul>
    </div>
  `;

  // Add Task button
  projectElement
    .querySelector(".add-task-btn")
    .addEventListener("click", () => openTaskDialog(newProject.projectId));

  // Delete Project button
  projectElement
    .querySelector(".delete-project-btn")
    .addEventListener("click", () => deleteProject(newProject.projectId));

  projectContainer.appendChild(projectElement);
}

// ==== Render Task ====
function renderTask(projectId, task) {
  const projectElement = document.querySelector(`[data-id="${projectId}"]`);
  if (!projectElement) return;

  const taskList = projectElement.querySelector(".task-list");

  const taskElement = document.createElement("li");
  taskElement.dataset.id = task.taskId;
  taskElement.classList.add("task-item");

  // Format date
  let formattedDate = "";
  try {
    formattedDate = format(new Date(task.dueDate), "MMM dd, yyyy");
  } catch {
    formattedDate = task.dueDate;
  }

  taskElement.innerHTML = `
    <div class="task-content">
      <div class="task-header">
        <span class="task-title">${task.taskName}</span>
        <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
      </div>
      <p class="task-desc">${task.description}</p>
      <div class="task-footer">
        <span class="task-date">📅 ${formattedDate}</span>
        <div class="task-actions">
          <button class="edit-task-btn">✏️ Edit</button>
          <button class="delete-task-btn">🗑️ Delete</button>
        </div>
      </div>
    </div>
    <hr>
  `;

  // Edit button
  taskElement.querySelector(".edit-task-btn").addEventListener("click", () => {
    editingTaskId = task.taskId;
    currentProjectId = projectId;

    taskNameInput.value = task.taskName;
    taskDescriptionInput.value = task.description;
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;

    taskDialog.showModal();
  });

  // Delete button
  taskElement
    .querySelector(".delete-task-btn")
    .addEventListener("click", () => deleteTask(projectId, task.taskId));

  taskList.appendChild(taskElement);
}

// ==== Delete Functions ====
function deleteProject(projectId) {
  projects = projects.filter((p) => p.projectId !== projectId);
  document.querySelector(`[data-id="${projectId}"]`)?.remove();
  saveProjects();
}

function deleteTask(projectId, taskId) {
  const project = projects.find((p) => p.projectId === projectId);
  if (!project) return;
  project.tasks = project.tasks.filter((t) => t.taskId !== taskId);
  document.querySelector(`[data-id="${taskId}"]`)?.remove();
  saveProjects();
}

// ==== Dialog ====
function openProjectDialog() {
  projectDialog.showModal();
}
function openTaskDialog(projectId) {
  currentProjectId = projectId;
  editingTaskId = null;
  taskDialog.showModal();
}

// ==== Event Listeners ====
addProjectOpenBtn.addEventListener("click", openProjectDialog);

addProjectBtn.addEventListener("click", () => {
  addProject(projectInput.value);
  projectInput.value = "";
  projectDialog.close();
});

addTaskBtn.addEventListener("click", () => {
  if (!currentProjectId) return;

  if (editingTaskId) {
    updateTask(currentProjectId, editingTaskId, {
      taskName: taskNameInput.value,
      description: taskDescriptionInput.value,
      dueDate: taskDueDateInput.value,
      priority: taskPriorityInput.value,
    });
  } else {
    addTask(
      currentProjectId,
      taskNameInput.value,
      taskDescriptionInput.value,
      taskDueDateInput.value,
      taskPriorityInput.value
    );
  }

  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  taskDueDateInput.value = "";
  taskPriorityInput.value = "low";
  editingTaskId = null;

  taskDialog.close();
});

// ==== Init ====
loadProjects();
