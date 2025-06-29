document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDateInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function init() {
    renderTasks();
    setupEventListeners();
  }

  function setupEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') addTask();
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    if (!dueDate) {
      alert('Please select a due date');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      dueDate: dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    sortTasksByDueDate();
    saveTasks();
    renderTasks();

    taskInput.value = '';
    dueDateInput.value = '';
    taskInput.focus();
  }

  function sortTasksByDueDate() {
    tasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      if (a.completed && b.completed) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  function renderTasks() {
    if (tasks.length === 0) {
      emptyState.style.display = 'block';
      taskList.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    taskList.style.display = 'block';
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.dataset.id = task.id;

      const dueDate = new Date(task.dueDate);
      const formattedDate = dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
          <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
          <span class="due-date ${task.completed ? 'completed' : ''}">Due: ${formattedDate}</span>
        </div>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;

      taskList.appendChild(taskItem);

      const checkbox = taskItem.querySelector('.task-checkbox');
      const deleteBtn = taskItem.querySelector('.delete-btn');

      checkbox.addEventListener('change', function() {
        toggleTaskComplete(task.id, this.checked);
      });

      deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
      });
    });
  }

  function toggleTaskComplete(id, isCompleted) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = isCompleted;
      sortTasksByDueDate();
      saveTasks();
      renderTasks();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  init();
});
