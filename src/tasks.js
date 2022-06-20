import greenCheckmarkImage from './images/icons/green-checkmark.png';
import trashBinImage from './images/icons/trash-bin.png';
import lowPriorityImage from './images/icons/low.png';
import medPriorityImage from './images/icons/medium.png';
import highPriorityImage from './images/icons/high.png';

import { compareAsc, isSameMonth, isSameWeek } from 'date-fns';
import { addProjectToTaskForm, displayProjectsList } from './projects';
import { userClicks } from './index.js';

const tasksContainer = document.createElement('div');
tasksContainer.setAttribute('id', 'tasks-card-container');
const taskDeleteIcons = document.querySelectorAll('input[type="image"]');


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
}

export let taskList = [];
let numAllTasks = 0;


export function saveTask() {
    let taskName = document.getElementById('task-name').value;
    let taskDate = document.getElementById('task-date').value;
    let taskDesc = document.getElementById('task-desc').value;
    let taskPriority = document.getElementById('task-priority').value;
    let taskProject = document.getElementById('task-project').value;
    
    createTask();

    function createTask() {
        const displayNumAllTasks = document.getElementById('num-all-tasks');

        if (taskName === "" || taskDate === "") {
            alert("You must enter a name and due date for the task.")
        } else {
            let task = new Task(taskName, taskDate, taskDesc, taskPriority, taskProject);
            taskList.push(task);
            console.log(taskList);
            displaySuccessfulAlert();
            let addTasks = ++numAllTasks;
            displayNumAllTasks.textContent = addTasks;
            displayTasks(task);
            clearForm();
            setTimeout(closeSuccessfulAlert, 1500);
        }
    };
};

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
};

export function closeSuccessfulAlert() {
    const modal = document.getElementById('modal-container');
    modal.parentElement.removeChild(modal);
};

export function clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = "";
    })
};

let numDueToday = 0;
let numDueThisWeek = 0;
let numDueThisMonth = 0;

function displayTasks(taskInput) {
    console.log(taskInput);

    const displayNumDueToday = document.getElementById('num-due-today');
    const displayNumDueThisWeek = document.getElementById('num-due-this-week');
    const displayNumDueThisMonth = document.getElementById('num-due-this-month');

    let today = new Date();
    let taskDate = taskInput.dueDate;
    let newTaskDate = taskDate.split('-');
    let dueDay = +newTaskDate[2];
    let dueMonth = newTaskDate[1]-1;
    let dueYear = +newTaskDate[0];
    let todayDay = +today.getDate();
    let todayMonth = +today.getMonth();
    let todayYear = +today.getFullYear();
    today = new Date(todayYear, todayMonth, todayDay);
    taskDate = new Date(dueYear, dueMonth, dueDay);
            
    addToTodayList(today, taskDate, displayNumDueToday, taskInput);
    addToThisWeekList(today, taskDate, displayNumDueThisWeek, taskInput);
    addToThisMonthList(today, taskDate, displayNumDueThisMonth, taskInput);
};

let todayList = [];
let thisWeekList = [];
let thisMonthList = [];

function addToTodayList(dateA, dateB, display, taskInput) {
    if (compareAsc(dateA, dateB) === 0) {
        let addToday = ++numDueToday;
        display.textContent = addToday;
        todayList.push(taskInput)
        console.log(todayList);
    } 
};

export function displayTodayList() {
    createTaskTable(todayList);
};

function addToThisWeekList(dateA, dateB, display, taskInput) {
    if (isSameWeek(dateA, dateB)) {
        let addWeek = ++numDueThisWeek;
        display.textContent = addWeek;
        thisWeekList.push(taskInput);
        console.log(thisWeekList);
    }
};

export function displayThisWeekList() {
    createTaskTable(thisWeekList);
};

function addToThisMonthList(dateA, dateB, display, taskInput) {
    if (isSameMonth(dateA, dateB)) {
        let addMonth = ++numDueThisMonth;
        display.textContent = addMonth;
        thisMonthList.push(taskInput);
        console.log(thisMonthList);
    }
};

export function displayThisMonthList() {
    createTaskTable(thisMonthList);
};

export function displayAllTasksList() {
    createTaskTable(taskList);
};

export function displayTaskTableByProjectName(a) {
    createTaskTable(a);
}

export function displayTasksbyProjectName(project) {
    let projectTasks = taskList.filter(forThisProject);

    function forThisProject() {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].projName === project) {
                console.log(taskList[i]);
            }
        }
    }
};

function createTaskTable(a) {
    const container = document.getElementById('content-container');
    const tasksTableContainer = document.createElement('div');
    tasksTableContainer.setAttribute('id', 'new-task-container');
    tasksTableContainer.classList.add('active');
    container.appendChild(tasksTableContainer);

    const tasksTable = document.createElement('table');
    tasksTable.setAttribute('id', 'tasks-table');
    tasksTableContainer.appendChild(tasksTable);

    const tableHead = document.createElement('thead');
    tasksTable.appendChild(tableHead);

    const headRow = document.createElement('tr');
    tableHead.appendChild(headRow);

    const completedHeading = document.createElement('th');
    headRow.appendChild(completedHeading);

    const dateHeading = document.createElement('th');
    dateHeading.classList.add('heading');
    dateHeading.textContent = "Due Date";
    headRow.appendChild(dateHeading);

    const nameHeading = document.createElement('th');
    nameHeading.classList.add('heading');
    nameHeading.textContent = "Task Name";
    headRow.appendChild(nameHeading);

    const descHeading = document.createElement('th');
    descHeading.classList.add('heading');   
    descHeading.textContent = "Description";
    headRow.appendChild(descHeading);

    const priorityHeading = document.createElement('th');
    priorityHeading.classList.add('heading');
    priorityHeading.textContent = "Priority";
    headRow.appendChild(priorityHeading);

    const projHeading = document.createElement('th');
    projHeading.classList.add('heading');
    projHeading.textContent = "Associated Project";
    headRow.appendChild(projHeading);

    const deleteHeading = document.createElement('th');
    headRow.appendChild(deleteHeading);

    const tableBody = document.createElement('tbody');
    tasksTable.appendChild(tableBody);

    for (let i = 0; i < a.length; i++) {        
        let newRow = document.createElement('tr');
        tableBody.appendChild(newRow);

        let markCompletedCell = document.createElement('td');
        newRow.appendChild(markCompletedCell);

        let markCompletedInput = document.createElement('input');
        markCompletedInput.setAttribute('type', 'checkbox');
        markCompletedInput.classList.add('complete-checkbox');
        markCompletedCell.appendChild(markCompletedInput);

        let dateCell = document.createElement('td');
        dateCell.textContent = a[i].dueDate;
        newRow.appendChild(dateCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = a[i].name;
        newRow.appendChild(nameCell);

        let descCell = document.createElement('td');
        descCell.textContent = a[i].desc;
        newRow.appendChild(descCell);

        let priorityCell = document.createElement('td');
        newRow.appendChild(priorityCell);

        let priorityCellIcon = document.createElement('img');
        priorityCellIcon.classList.add('priority-icon');
        let priorityValue = a[i].priority;

        if (priorityValue === "high") {
            priorityCellIcon.src = highPriorityImage;
            priorityCellIcon.alt = "high priority";
            priorityCellIcon.classList.add('high');
        } else if (priorityValue === "medium") {
            priorityCellIcon.src = medPriorityImage;
            priorityCellIcon.alt = "medium priority";
            priorityCellIcon.classList.add('medium');
        } else if (priorityValue === "low") {
            priorityCellIcon.src = lowPriorityImage;
            priorityCellIcon.alt = "low priority";
            priorityCellIcon.classList.add('low');
        }
        priorityCell.appendChild(priorityCellIcon);
        
        let projCell = document.createElement('td');
        projCell.textContent = a[i].assocProj;
        newRow.appendChild(projCell);

        let deleteIconCell = document.createElement('td');
        newRow.appendChild(deleteIconCell);

        let deleteButton = document.createElement('input');
        deleteButton.setAttribute('type', 'image');
        deleteButton.setAttribute('name', 'delete-button');
        deleteButton.classList.add('delete-task');
        deleteButton.src = trashBinImage;
        deleteButton.alt = "delete";
        deleteIconCell.appendChild(deleteButton);

        markTaskCompleted();
        editExistingTask();
    }

};

function markCompleted() {
    const checkboxes = document.querySelectorAll('.complete-checkbox');
    console.log("the checkboxes are " + checkboxes);
    checkboxes.forEach(checkbox => console.log(checkbox));
};

taskDeleteIcons.forEach(icon => {
    icon.addEventListener('click', e => {
        console.log("the task is deleted");
    })
});

export function removeTaskTable() {
    const taskTable = document.getElementById('new-task-container');
    taskTable.remove();
};

function markTaskCompleted() {
    const completedCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < completedCheckboxes.length; i++) {
        completedCheckboxes[i].addEventListener('change', e => {
            if(e.target.checked) {
                console.log("the checkbox is checked");
                let parent = e.target.parentElement; // td
                console.log(parent);
                //get the value of the task name
                //search the arrays for the task name
                //remove the task from the arrays (all)
            }
        })
    }
}

function editExistingTask() {
    const tasksTable = document.getElementById('tasks-table');
    const rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener('click', () => {
            let taskDate = rows[i].children[1].textContent;
            let taskName = rows[i].children[2].textContent;
            let taskDesc = rows[i].children[3].textContent;
            let taskPriority = rows[i].children[4].children[0];
            if (taskPriority.classList.contains('low')) {
                taskPriority = "low";
            } else if (taskPriority.classList.contains('medium')) {
                taskPriority = "medium";
            } else if (taskPriority.classList.contains('high')) {
                taskPriority = "high";
            }

            let taskProj = rows[i].children[5].textContent;
            // console.log("start 1");
            // console.log("the priority is " + taskPriority);
            // console.log("the proj is " + taskProj);
            removeTaskTable();
            showOverlay();
            showEditWindow(taskDate, taskName, taskDesc, taskPriority, taskProj);
        })
    }
};

function showOverlay() {
    console.log("i'm adding the overlay!");
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    document.body.appendChild(overlay);
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.remove();
}

function showEditWindow(date, name, desc, priority, proj) {
    console.log("the date is " + date);
    console.log("the name is " + name);
    console.log("the desc is " + desc);
    console.log("the priority is " + priority);
    console.log("the proj is " + proj);
    const container = document.getElementById('content-container');
    const editWindow = document.createElement('div');
    editWindow.setAttribute('id', 'task-form-container');
    editWindow.classList.add('edit-window');
    container.appendChild(editWindow);

    const taskEditForm = document.createElement('form');
    taskEditForm.setAttribute('id', 'task-form');
    editWindow.appendChild(taskEditForm);

    const editFormTitle = document.createElement('h2');
    editFormTitle.classList.add('form-title');
    taskEditForm.appendChild(editFormTitle);
    editFormTitle.textContent = "Edit Task";

    const editFormNameLabel = document.createElement('label');
    editFormNameLabel.setAttribute('for', 'task-name');
    editFormNameLabel.textContent = "Name:";
    taskEditForm.appendChild(editFormNameLabel);

    const editFormNameInput = document.createElement('input');
    editFormNameInput.setAttribute('id', 'task-name');
    editFormNameInput.setAttribute('type', 'text');
    editFormNameInput.setAttribute('name', 'task-name');
    taskEditForm.appendChild(editFormNameInput);
    editFormNameInput.value = name;

    const editFormDateLabel = document.createElement('label');
    editFormDateLabel.setAttribute('for', 'task-date');
    editFormDateLabel.textContent = "Due Date:";
    taskEditForm.appendChild(editFormDateLabel);

    const editFormDateInput = document.createElement('input');
    editFormDateInput.setAttribute('id', 'task-date');
    editFormDateInput.setAttribute('type', 'date');
    editFormDateInput.setAttribute('name', 'task-date');
    taskEditForm.appendChild(editFormDateInput);
    editFormDateInput.value = date;

    const editFormDescLabel = document.createElement('label');
    editFormDescLabel.setAttribute('for', 'task-desc');
    editFormDescLabel.textContent = "Description:";
    taskEditForm.appendChild(editFormDescLabel);

    const editFormDescInput = document.createElement('input');
    editFormDescInput.setAttribute('id', 'task-desc');
    editFormDescInput.setAttribute('type', 'text');
    editFormDescInput.setAttribute('name', 'task-desc');
    taskEditForm.appendChild(editFormDescInput);
    editFormDescInput.value = desc;

    const editFormPriorityLabel = document.createElement('label');
    editFormPriorityLabel.setAttribute('for', 'task-priority');
    editFormPriorityLabel.textContent = "Priority:";
    taskEditForm.appendChild(editFormPriorityLabel);

    const editFormPriorityInput = document.createElement('select');
    editFormPriorityInput.setAttribute('id', 'task-priority');
    editFormPriorityInput.setAttribute('name', 'task-priority');
    taskEditForm.appendChild(editFormPriorityInput);

    const editFormPriorityLow = document.createElement('option');
    editFormPriorityLow.setAttribute('value', 'low');
    editFormPriorityLow.textContent = "Low";
    editFormPriorityInput.appendChild(editFormPriorityLow);

    const editFormPriorityMed = document.createElement('option');
    editFormPriorityMed.setAttribute('value', 'medium');
    editFormPriorityMed.textContent = "Medium";
    editFormPriorityInput.appendChild(editFormPriorityMed);

    const editFormPriorityHigh = document.createElement('option');
    editFormPriorityHigh.setAttribute('value', 'high');
    editFormPriorityHigh.textContent = "High";
    editFormPriorityInput.appendChild(editFormPriorityHigh);

    editFormPriorityInput.value = priority;

    const editFormProjectLabel = document.createElement('label');
    editFormProjectLabel.setAttribute('for', 'task-project');
    editFormProjectLabel.textContent = "Associated with Project:";
    taskEditForm.appendChild(editFormProjectLabel);

    const editFormProjectInput = document.createElement('select');
    editFormProjectInput.setAttribute('id', 'task-project');
    editFormProjectInput.setAttribute('name', 'task-project');
    taskEditForm.appendChild(editFormProjectInput);

    addProjectToTaskForm();

    const defaultTaskFormProjectOption = document.createElement('option');
    defaultTaskFormProjectOption.setAttribute('value', 'Tasks');
    defaultTaskFormProjectOption.textContent = "Tasks";
    editFormProjectInput.appendChild(defaultTaskFormProjectOption);

    editFormProjectInput.value = proj;

    const editBtnContainer = document.createElement('div');
    editBtnContainer.setAttribute('id', 'task-button-container');
    taskEditForm.appendChild(editBtnContainer);

    const taskSubmitBtn = document.createElement('button');
    taskSubmitBtn.setAttribute('id', 'submit-task');
    taskSubmitBtn.setAttribute('type', 'button');
    taskSubmitBtn.textContent = "Save";
    editBtnContainer.appendChild(taskSubmitBtn);
    taskSubmitBtn.addEventListener('click', e => {
        let task = [date, name, desc, priority, proj];
        updateTaskInfo(task);
        editWindow.remove();
        hideOverlay();
    })
    
    const taskCancelBtn = document.createElement('button');
    taskCancelBtn.setAttribute('id', 'cancel-task');
    taskCancelBtn.setAttribute('type', 'button');
    taskCancelBtn.textContent = "Cancel";
    editBtnContainer.appendChild(taskCancelBtn);
    taskCancelBtn.addEventListener('click', e => {
        editWindow.remove();
        hideOverlay();
        reloadPreviousPage();
    })
};

function updateTaskInfo(t) {
    console.log("the original task list");
    console.log(taskList);
    
    let date = t[0];
    let name = t[1];
    let desc = t[2];
    let priority = t[3];
    let proj = t[4];

    let newTaskName = document.getElementById('task-name').value;
    let newTaskDate = document.getElementById('task-date').value;
    let newTaskDesc = document.getElementById('task-desc').value;
    let newTaskPriority = document.getElementById('task-priority').value;
    let newTaskProject = document.getElementById('task-project').value;

    const index = taskList.findIndex(function(x, index) {
        return x.name === name;
    })

    // console.log("the index is " + index);

    // console.log(`updated name is ${newTaskName}, old name ${name}`);
    // console.log(`updated date is ${newTaskDate}, old date ${date}`);
    // console.log(`updated desc is ${newTaskDesc}, old desc ${desc}`);
    // console.log(`updated priority is ${newTaskPriority}, old priority ${priority}`);
    // console.log(`updated proj is ${newTaskProject}, old proj ${proj}`);

    if (date !== newTaskDate) {
        // console.log("the date HAS changed");
        taskList[index].dueDate = newTaskDate;
    } 
    if (name !== newTaskName) {
        // console.log("the name HAS changed");
        taskList[index].name = newTaskName;
    } 
    if (desc !== newTaskDesc) {
        // console.log("the desc HAS chagned");
        taskList[index].desc = newTaskDesc;
    } 
    if (priority !== newTaskPriority) {
        // console.log("the priority HAS changed");
        taskList[index].priority = newTaskPriority;
    } 
    if (proj !== newTaskProject) {
        // console.log("the project HAS changed");
        taskList[index].assocProj = newTaskProject;
    } 

    reloadPreviousPage();

};

function reloadPreviousPage() {
    let reload = userClicks[userClicks.length-1];

    if (reload === "due-today") {
        displayTodayList();
    } else if (reload === "due-this-week") {
        displayThisWeekList();
    } else if (reload === "due-this-month") {
        displayThisMonthList();
    } else if (reload === "all-tasks") {
        displayAllTasksList();
    } else if (reload === "my-projects") {
        displayProjectsList();
    }
};







