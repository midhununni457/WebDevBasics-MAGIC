// Task Form Submission Handler
if (document.getElementById('taskForm')) {
    document.getElementById('taskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Generate random ID
        const taskId = Math.random().toString(36).substr(2, 9);
        
        // Get form values
        const task = {
            id: taskId,
            name: document.getElementById('taskName').value,
            status: document.querySelector('input[name="status"]:checked').value,
            dueDate: document.getElementById('dueDate').value,
            priority: document.getElementById('priority').value,
            notes: document.getElementById('notes').value,
            createdAt: new Date().toISOString()
        };

        // Get existing tasks or initialize empty array
        const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add new task
        existingTasks.push(task);
        
        // Save back to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
        
        // Reset form and show confirmation
        this.reset();
        alert('Task added successfully!');
    });
}

// Task Display and Management Functions
function displayTasks() {
    const taskContainer = document.getElementById('taskContainer');
    if (!taskContainer) return; // Exit if not on the index page
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    taskContainer.innerHTML = '';  // Clear existing content
    
    tasks.forEach(task => {
        const taskElement = `
            <div class="task" data-task-id="${task.id}">
                <b class="task-title">${task.name}</b>  
                <p class="task-status">Status: <i>${task.status}</i></p>
                <p class="task-due">Due: <small>${task.dueDate}</small></p>
                <p class="task-priority">Priority: ${task.priority}</p>
                <button class="btn btn-delete" onclick="deleteTask('${task.id}')">Delete</button>
                ${task.status !== 'Completed' ? 
                    `<button class="btn btn-complete" onclick="markAsComplete('${task.id}')">Mark as Complete</button>` 
                    : ''}
            </div>
        `;
        taskContainer.innerHTML += taskElement;
    });
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function markAsComplete(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = 'Completed';
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
}); 