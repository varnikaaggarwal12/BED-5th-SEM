let todoList = document.getElementById('todoList');
let input = document.getElementById('todoInput');

function addTodo() {
  const title = input.value.trim();
  if (title === '') return;

  const li = document.createElement('li');
  li.className = 'todo';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = title;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = function () {
    let newTitle = prompt("Edit your todo:", span.textContent);
    if (newTitle !== null && newTitle.trim() !== '') {
      span.textContent = newTitle.trim();
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.onclick = function () {
    todoList.removeChild(li);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  input.value = '';
}
['Buy Groceries', 'Study Java', 'Build ToDo App', 'Call Mom'].forEach(task => {
  input.value = task;
  addTodo();
});