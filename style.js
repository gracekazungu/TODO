const getTodos = () => {
    return fetch('https://dummyjson.com/todos/user/17')
        .then(response => response.json())
        .then(response => response)
        .catch(error => error.message);
};

const displayTodos = () => {
    const tableBody = document.querySelector('#todotable ');
    tableBody.innerHTML = '';
    todos.forEach(item => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        const todoCell = document.createElement('td');
        todoCell.textContent = item.todo;
        const completedCell = document.createElement('td');
        completedCell.textContent = item.completed?'completed':'Not completed'
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => editTask(item.id));
        editCell.appendChild(editButton);
        deleteButton.addEventListener('click', () => deleteTask(item.id));
        deleteCell.appendChild(deleteButton);
        row.appendChild(idCell);
        row.appendChild(todoCell);
        row.appendChild(completedCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
    });
};

const addTask = event => {
    event.preventDefault();
    const newTaskTitle = document.getElementById('todoTitle').value;
    const newTask = {
        id: todos.length + 1,
        todo: newTaskTitle,
        completed: false
    };
    todos.push(newTask);
    displayTodos();
    document.getElementById('todoTitle').value = '';
};

const editTask = id => {
    const newTaskTitle = prompt('Enter the edited todo:');
    const taskIndex = todos.findIndex(item => item.id === id);
    if (taskIndex !== -1) {
        todos[taskIndex].todo = newTaskTitle;
        displayTodos();
    }
};

const deleteTask = id => {
    todos = todos.filter(item => item.id !== id);
    displayTodos();
};

document.getElementById('addTodo').addEventListener('submit', addTask);

getTodos()
    .then(response => {
        todos = response.todos;
        displayTodos();
    })
    .catch(error => {
        console.error('An error in fetching the todos:', error);
    });
