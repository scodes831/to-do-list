import greenCheckmarkImage from './images/icons/green-checkmark.png';
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

    makeCard(tName, tDate, tDesc, tPriority, tProj) {

        console.log(tName, tDate, tDesc, tPriority, tProj);
        let card = document.createElement('div');
        card.classList.add('task-card');
        tasksContainer.appendChild(card);

        let name = document.createElement('h2');
        name.classList.add('card-task-name');
        name.textContent = tName;
        card.appendChild(name);

        let dueDate = document.createElement('h2');
        dueDate.classList.add('card-task-date');
        dueDate.textContent = tDate;
        card.appendChild(dueDate);

        let desc = document.createElement('p');
        desc.classList.add('card-task-desc');
        desc.textContent = tDesc;
        card.appendChild(desc);

        let priority = document.createElement('img');
        priority.classList.add('card-task-priority');
        if (tPriority === "low") {
            priority.src = lowPriorityImage;
            priority.alt = "low priority"
        } else if (tPriority === "medium") {
            priority.src = medPriorityImage;
            priority.alt = "medium priority";
        } else if (tPriority === "high") {
            priority.src = highPriorityImage;
            priority.alt = "high priority";
        }
        card.appendChild(priority);

        let assocProj = document.createElement('h3');
        assocProj.classList.add('card-task-project');
        assocProj.textContent = tProj;
        card.appendChild(assocProj);

        let taskCompleteLabel = document.createElement('label');
        taskCompleteLabel.textContent = "Completed:"
        taskCompleteLabel.setAttribute('for', 'task-checkbox');
        taskCompleteLabel.classList.add('task-completed-label');
        card.appendChild(taskCompleteLabel);

        let taskComplete = document.createElement('input');
        taskComplete.setAttribute('type', 'checkbox');
        taskComplete.setAttribute('name', 'task-checkbox');
        taskComplete.classList.add('task-completed-box');
        card.appendChild(taskComplete);

        console.log("task is now displayed");
    }
}

let taskList = [];
let numAllTasks = 0;


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
    // console.log("day due is " + dueDay);
    let dueMonth = newTaskDate[1]-1;
    // console.log("month due is " + dueMonth);
    let dueYear = +newTaskDate[0];
    // console.log("year due is " + dueYear);
    let todayDay = +today.getDate();
    // console.log("day today is " + todayDay);
    let todayMonth = +today.getMonth();
    // console.log("this month is " + todayMonth);
    let todayYear = +today.getFullYear();
    // console.log("this year is " + todayYear);
    today = new Date(todayYear, todayMonth, todayDay);
    taskDate = new Date(dueYear, dueMonth, dueDay);
            
    addToTodayList(today, taskDate, displayNumDueToday, taskInput);
    addToThisWeekList(today, taskDate, displayNumDueThisWeek, taskInput);
    addToThisMonthList(today, taskDate, displayNumDueThisMonth, taskInput);
}

let todayList = [];
let thisWeekList = [];
let thisMonthList = [];

function addToTodayList(dateA, dateB, display, taskInput) {
    if (compareAsc(dateA, dateB) === 0) {
        console.log("it's due today");
        let addToday = ++numDueToday;
        console.log("add is currently " + addToday);
        display.textContent = addToday;
        todayList.push(taskInput)
        console.log(todayList);
    }
};

export function displayTodayList() {
    createTaskDiv();

};

function addToThisWeekList(dateA, dateB, display, taskInput) {
    if (isSameWeek(dateA, dateB)) {
        console.log("it's due this week");
        let addWeek = ++numDueThisWeek;
        display.textContent = addWeek;
        thisWeekList.push(taskInput);
        console.log(thisWeekList);
    }
};

export function displayThisWeekList() {
    createTaskDiv();

};

function addToThisMonthList(dateA, dateB, display, taskInput) {
    if (isSameMonth(dateA, dateB)) {
        console.log("it's due this month");
        let addMonth = ++numDueThisMonth;
        display.textContent = addMonth;
        thisMonthList.push(taskInput);
        console.log(thisMonthList);
    }
};

export function displayThisMonthList() {
    createTaskDiv();

};

function createTaskDiv() {
    const container = document.getElementById('content-container');
    const newTaskContainer = document.createElement('div');
    newTaskContainer.setAttribute('id', 'new-task-container');
    container.appendChild(newTaskContainer);
}



