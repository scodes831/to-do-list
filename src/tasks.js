const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks-card-container');
let taskList = [];

class Task {
    constructor(name, dueDate, desc, priority, assocProj) {
        this.name = name,
        this.dueDate = dueDate,
        this.desc = desc,
        this.priority = priority,
        this.assocProj = assocProj
    }

    showTask() {
        console.log(this.name, this.dueDate, this.desc, this.priority, this.assocProj)
    }

    makeCard() {
        let card = document.createElement('div');
        card.classList.add('task-card');
        tasksContainer.appendChild(card);

        let name = document.createElement('h2');
        name.classList.add('card-task-name');
        card.appendChild(name);

        let dueDate = document.createElement('h2');
        dueDate.classList.add('card-task-date');
        card.appendChild(dueDate);

        let desc = document.createElement('p');
        desc.classList.add('card-task-desc');
        card.appendChild(desc);

        let priority = document.createElement('img');
        priority.classList.add('card-task-priority');
        card.appendChild(priority);

        let assocProj = document.createElement('h3');
        assocProj.classList.add('card-task-project');
        card.appendChild(assocProj);

        let taskCompleteLabel = document.createElement('label');
        taskCompleteLabel.textContent = "Completed:"
        taskCompleteLabel.setAttribute('for', 'task-checkbox');
        taskCompleteLabel.classList.add('task-completed-label');
        card.appendChild(taskComplete);

        let taskComplete = document.createElement('input');
        taskComplete.setAttribute('type', 'checkbox');
        taskComplete.setAttribute('name', 'task-checkbox');
        taskCcomplete.classList.add('task-completed-box');
        card.appendChild(taskComplete);
    }
}

// class TaskList {
//     constructor() {
//         this.taskList = []
//     }

//     newTask(name, dueDate, desc, priority, assocProj) {
//         let task = new Task(name, dueDate, desc, priority, assocProj)
//         this.taskList.push(task);
//         return task;
//     }

//     get allTasks() {
//         return this.taskList
//     }
// }

// let tasks = new TaskList();

export function saveTask() {
    console.log("test test test");

    let taskName = document.getElementById('task-name').value;
    console.log("task name is " + taskName);
    let taskDate = document.getElementById('task-date').value;
    console.log("task date is " + taskDate);
    let taskDesc = document.getElementById('task-desc').value;
    console.log("task desc is " + taskDesc);
    let taskPriority = document.getElementById('task-priority').value;
    console.log("task priority is " + taskPriority);
    let taskProject = document.getElementById('task-project').value;
    console.log("task project is " + taskProject);

    if (taskName === "" || taskDate === "") {
        alert("You must enter a name and due date for the task.")
    } else {
    const addedTask = new Task(taskName, taskDate, taskDesc, taskPriority, taskProject);
    taskList.push(addedTask);
    console.log(taskList);
    setTimeout(displaySuccessfulAlert, 300);
    clearForm();

    }
}

function displaySuccessfulAlert() {
    alert("Your task has been added.")
    //make a custom popup 
}

function closeSuccessfulAlert() {
    //use set timeout method to close the popup
}

function clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        console.log("cleared");
        input.value = "";
    })
}

// function displayTasks() {
//     let tasks = new TaskList();
//     tasks.allTasks.forEach(task => {
//         task.makeCard();
//     })
// }



