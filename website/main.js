const durationInput = document.getElementById('durationInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('timeDisplay');
const statusText = document.getElementById('statusText');
const timerRing = document.getElementById('timerRing');
const presetButtons = document.querySelectorAll('.preset-btn');

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const doneCount = document.getElementById('doneCount');

let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerId = null;
let isRunning = false;

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function renderTimer() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 360;
  timerRing.style.background = `conic-gradient(var(--accent-2) ${progress}deg, rgba(255,255,255,0.06) ${progress}deg 360deg)`;

  if (remainingSeconds === 0) {
    statusText.textContent = 'Time to shine!';
    stopTimer();
  }
}

function setDuration(minutes) {
  totalSeconds = Math.max(1, minutes) * 60;
  remainingSeconds = totalSeconds;
  renderTimer();
}

function startTimer() {
  if (isRunning) {
    return;
  }

  isRunning = true;
  statusText.textContent = 'Focus mode';
  timerId = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds -= 1;
    }

    renderTimer();
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  statusText.textContent = 'Ready';
  renderTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
  stopTimer();
  statusText.textContent = 'Paused';
});
resetBtn.addEventListener('click', resetTimer);

durationInput.addEventListener('change', () => {
  const value = Number(durationInput.value);
  if (!Number.isNaN(value) && value > 0) {
    setDuration(value);
  }
});

presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    presetButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    setDuration(Number(button.dataset.minutes));
    durationInput.value = button.dataset.minutes;
    resetTimer();
  });
});

renderTimer();

const tasks = [];

function saveTasks() {
  localStorage.setItem('colorful-focus-tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('colorful-focus-tasks');
  if (!stored) {
    return;
  }

  const parsed = JSON.parse(stored);
  parsed.forEach((task) => tasks.push(task));
}

function renderTasks() {
  taskList.innerHTML = '';

  taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? '' : 's'}`;
  const done = tasks.filter((task) => task.completed).length;
  doneCount.textContent = `${done} done`;

  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, text, deleteBtn);
    taskList.appendChild(item);
  });
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();

  if (!value) {
    return;
  }

  tasks.push({ text: value, completed: false });
  saveTasks();
  taskInput.value = '';
  renderTasks();
});

loadTasks();
renderTasks();
