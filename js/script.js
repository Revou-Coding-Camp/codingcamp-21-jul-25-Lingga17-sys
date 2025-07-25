const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskTable = document.getElementById('task-table');
const deleteAllBtn = document.getElementById('delete-all-btn');
const searchBox = document.getElementById('search-box');
const filterBtn = document.getElementById('filter-btn');
const resetFilterBtn = document.getElementById('reset-filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filteredTasks = null) {
  taskTable.innerHTML = '';
  const data = filteredTasks || tasks;

  if (data.length === 0) {
    taskTable.innerHTML = '<tr><td colspan="4">Tidak ada list tugas</td></tr>';
    return;
  }

  data.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td class="${task.completed ? 'status-completed' : 'status-pending'}">
        ${task.completed ? 'Selesai' : 'Belum Selesai'}
      </td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Del</button>
      </td>
    `;
    taskTable.appendChild(tr);
  });
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const date = dateInput.value;
  if (text === '' || date === '') {
    alert('Isi task dan tanggal terlebih dahulu.');
    return;
  }
  tasks.push({ text, date, completed: false });
  saveTasks();
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
});

deleteAllBtn.addEventListener('click', () => {
  if (confirm('Hapus semua task?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

filterBtn.addEventListener('click', () => {
  const keyword = searchBox.value.toLowerCase().trim();
  if (!keyword) {
    renderTasks(); 
    return;
  }
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(keyword));
  renderTasks(filtered);
});

resetFilterBtn.addEventListener('click', () => {
  searchBox.value = '';
  renderTasks();
});

window.toggleStatus = function(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};

window.deleteTask = function(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};


window.editTask = function(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  const newDate = prompt('Edit date (YYYY-MM-DD):', tasks[index].date);
  if (newText && newDate) {
    tasks[index].text = newText;
    tasks[index].date = newDate;
    saveTasks();
    renderTasks();
  }
};

renderTasks();
