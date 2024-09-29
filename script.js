document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    //display tasks
    let tasks = [];

    // Add Task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const priority = document.getElementById('task-priority').value;

        const task = {
            title,
            description,
            priority,
            completed: false
        };

        tasks.push(task);
        displayTasks();
        taskForm.reset();
    });

    // Display Tasks
    function displayTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task) => {
            const taskItem = document.createElement('li');
            taskItem.className = `priority-${task.priority} ${task.completed ? 'completed' : ''}`;

            //options displayed at below current tasks
            taskItem.innerHTML = `
                <div>
                    <b>${task.title}</b>
                    <p>${task.description}</p>
                    <p>${task.priority} priority</p>
                </div>
                <div class="task-actions">
                    <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;

            // Mark task as completed/undo, will line through when completed
            taskItem.querySelector('.complete').addEventListener('click', () => toggleComplete(task.id));

            // Edit task
            taskItem.querySelector('.edit').addEventListener('click', () => editTask(task.id));

            // Delete task
            taskItem.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(taskItem);
        });
    }

    // Toggle complete and undo
    function toggleComplete(id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        displayTasks();
        alert("Successfully changed status!");
    }

    // Edit task
    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('task-priority').value = task.priority;
        deleteTask(id);  // Delete old task to replace new
    }

    // Delete task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    }
});