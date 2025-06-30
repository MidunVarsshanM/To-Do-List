document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDateInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function init() {
    renderTasks();
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    // If no due date provided, use today's date
    if (!dueDate) {
      const today = new Date();
      dueDate = today.toISOString().split('T')[0]; // yyyy-mm-dd format
    }

    tasks.push({
      id: Date.now(),
      text: taskText,
      dueDate: dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    });

    saveTasks();
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    taskInput.focus();
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
      emptyState.style.display = 'block';
      taskList.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    taskList.style.display = 'block';

    // Sort tasks: incomplete first, then by due date
    tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.dataset.id = task.id;

      const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });

      li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
          <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
          <span class="due-date ${task.completed ? 'completed' : ''}">Due: ${formattedDate}</span>
        </div>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;

      li.querySelector('.task-checkbox').addEventListener('change', e => {
        task.completed = e.target.checked;
        saveTasks();
        renderTasks();
      });

      li.querySelector('.delete-btn').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  }

  init();
});
