document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

   
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            const buttons = document.createElement('div'); 

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () {
                task.completed = checkbox.checked;
                updateLocalStorage();
            });
            li.appendChild(checkbox);

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            li.appendChild(taskSpan);

            
            li.appendChild(buttons);


            const updateBtn = document.createElement('button');
            updateBtn.textContent = '✏️';
            updateBtn.classList.add('update-btn');
            updateBtn.addEventListener('click', function () {
                const newText = prompt('Update task:', task.text);
                if (newText !== null && newText.trim() !== '') {
                    task.text = newText.trim();
                    updateLocalStorage();
                    renderTasks();
                }
            });
            buttons.appendChild(updateBtn); 
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function () {
                tasks = tasks.filter(t => t !== task);
                updateLocalStorage();
                renderTasks();
            });
            buttons.appendChild(deleteBtn);


            taskList.appendChild(li);
        });
    }

   
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    renderTasks();

    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();

            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });
});
