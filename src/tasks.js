import greenCheckmarkImage from './images/icons/green-checkmark.png';

const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks-card-container');

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

class TaskList {
    constructor() {
        this.taskList = []
    }

    newTask(name, dueDate, desc, priority, assocProj) {
        let task = new Task(name, dueDate, desc, priority, assocProj)
        this.taskList.push(task);
        return task;
    }

    get allTasks() {
        return this.taskList
    }
}

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

    let tasks = new TaskList();
    createTask();

    function createTask() {
        if (taskName === "" || taskDate === "") {
            alert("You must enter a name and due date for the task.")
        } else {
            tasks.newTask(taskName, taskDate, taskDesc, taskPriority, taskProject);
            console.log(tasks.allTasks);
            displaySuccessfulAlert();
            clearForm();
            setTimeout(closeSuccessfulAlert, 1500);
        }
    }
}

function displaySuccessfulAlert() {
    const container = document.getElementById('task-form-container');

    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');
    container.appendChild(modalContainer);

    const modalText = document.createElement('p');
    modalText.classList.add('modal-text');
    modalText.textContent = "Task successfully added!"
    modalContainer.appendChild(modalText);

    const modalIcon = document.createElement('img');
    modalIcon.classList.add('modal-icon');
    modalIcon.src = greenCheckmarkImage;
    modalIcon.alt = "Green check mark icon";
    modalContainer.appendChild(modalIcon);
}

function closeSuccessfulAlert() {
    const modal = document.getElementById('modal-container');
    modal.parentElement.removeChild(modal);
}

export function clearForm() {
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



