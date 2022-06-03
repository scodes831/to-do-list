import greenCheckmarkImage from './images/icons/green-checkmark.png';
import trashBinImage from './images/icons/trash-bin.png';
import lowPriorityImage from './images/icons/low.png';
import medPriorityImage from './images/icons/medium.png';
import highPriorityImage from './images/icons/high.png';

import { compareAsc, isSameMonth, isSameWeek } from 'date-fns';

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
}

let taskList = [];
let numAllTasks = 0;


export function saveTask() {
    console.log("test test test");

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

export function closeSuccessfulAlert() {
    const modal = document.getElementById('modal-container');
    modal.parentElement.removeChild(modal);
}

export function clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        console.log("cleared");
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
        // console.log("it's due today");
        let addToday = ++numDueToday;
        // console.log("add is currently " + addToday);
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
        // console.log("it's due this week");
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
        // console.log("it's due this month");
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
    console.log("displaying all tasks");
    createTaskTable(taskList);
}

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
        } else if (priorityValue === "medium") {
            priorityCellIcon.src = medPriorityImage;
            priorityCellIcon.alt = "medium priority";
        } else if (priorityValue === "low") {
            priorityCellIcon.src = lowPriorityImage;
            priorityCellIcon.alt = "low priority";
        }
        priorityCell.appendChild(priorityCellIcon);
        

        let projCell = document.createElement('td');
        projCell.textContent = a[i].assocProj;
        newRow.appendChild(projCell);

        let deleteIconCell = document.createElement('td');
        newRow.appendChild(deleteIconCell);

        let deleteIcon = document.createElement('img');
        deleteIcon.classList.add('delete-task')
        deleteIcon.src = trashBinImage;
        deleteIcon.alt = "Remove task";
        deleteIconCell.appendChild(deleteIcon);
    }  
};

export function removeTaskTable() {
    const taskTable = document.getElementById('new-task-container');
    taskTable.remove();
    
}





