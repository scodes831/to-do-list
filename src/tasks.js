import greenCheckmarkImage from './images/icons/green-checkmark.png';
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
export let taskList;
const displayNumAllTasks = document.getElementById('num-all-tasks');
let numAllTasks = 0;
let numDueToday = 0;
let numDueThisWeek = 0;
let numDueThisMonth = 0;
let todayList = [];
let thisWeekList = [];
let thisMonthList = [];


function getLocalStorageTasks() {
    const savedInLocalStorage = localStorage.getItem('taskList');
    if (savedInLocalStorage) {
        taskList = JSON.parse(savedInLocalStorage);
        return taskList;
    } else {
        return;
    }
}

export function loadLocalStorageTasks() {
    const savedInLocalStorage = localStorage.getItem('taskList');
    if (savedInLocalStorage) {
        taskList = JSON.parse(savedInLocalStorage);
        console.log("here is the tasklist from JSON file");
        console.log(taskList);
        updateAllTasksFromStorage(taskList);
    } else {
        taskList = [];
    }
}

export function saveTask() {
    let taskName = document.getElementById('task-name').value;
    let taskDate = document.getElementById('task-date').value;
    let taskDesc = document.getElementById('task-desc').value;
    let taskPriority = document.getElementById('task-priority').value;
    let taskProject = document.getElementById('task-project').value;
    let error = false;
    let taskNumber = 0;
    
    createTask();

    function createTask() {
        const errorName = document.getElementById('error-name');
        const errorDate = document.getElementById('error-date');

        if (taskName === "") {
            errorName.style.display = "block";
            errorName.textContent = "You must enter a task name.";            
        } else {
            errorName.style.display = "none";
        }
        if (taskDate === "") {
            errorDate.style.display = "block";
            errorDate.textContent = "You must enter a due date.";
        } else {
            errorDate.style.display = "none";
        }

        const errorNameStatus = window.getComputedStyle(errorName).display;
        const errorDateStatus = window.getComputedStyle(errorDate).display;

        if (errorNameStatus === 'none' && errorDateStatus === 'none') {
            console.log("there isn't an error");
            submitTask();
        }

        function submitTask() {
            let task = new Task(taskName, taskDate, taskDesc, taskPriority, taskProject);
            taskList.push(task);
            localStorage.setItem('taskList', JSON.stringify(taskList));
            console.log(taskList);
            displaySuccessfulAlert();
            let addTasks = ++numAllTasks;
            displayNumAllTasks.textContent = addTasks;
            displayTasks(task);
            clearForm();
            setTimeout(closeSuccessfulAlert, 1500);
        }
    }                
};

function updateAllTasksFromStorage(arr) {
    for (let i = 0; i < arr.length; i++) {
        let addTasks = ++numAllTasks;
        displayNumAllTasks.textContent = addTasks;
        displayTasks(arr[i]);
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

function isItDueToday(dateA, dateB) {
    return (compareAsc(dateA, dateB) === 0);
};

function addToTodayList(dateA, dateB, display, taskInput) {
    if (isItDueToday(dateA, dateB) === true) {
        let addToday = ++numDueToday;
        display.textContent = addToday;
        todayList.push(taskInput)
        console.log(todayList);
    } 
};

function removeFromAllTasks(selectedTaskName) {
    const indexOfSelected = taskList.findIndex(function(x, index) {
        return x.name === selectedTaskName;
    })

    const displayNumAllTasks = document.getElementById('num-all-tasks');
    let updated = --numAllTasks;
    console.log("the new task count is " + updated);
    displayNumAllTasks.textContent = updated;
    taskList.splice(indexOfSelected, 1);
};

function removeFromTodayList(selectedTaskName) {
    const indexOfSelected = todayList.findIndex(function(x, index) {
        return x.name === selectedTaskName
    })

    const displayNumDueToday = document.getElementById('num-due-today');
    let updated = --numDueToday;
    displayNumDueToday.textContent = updated;
    todayList.splice(indexOfSelected, 1);
};

function removeFromThisWeekList(selectedTaskName) {
    const indexOfSelected = thisWeekList.findIndex(function(x, index) {
        return x.name === selectedTaskName
    })

    const displayNumDueThisWeek = document.getElementById('num-due-this-week');
    let updated = --numDueThisWeek;
    displayNumDueThisWeek.textContent = updated;
    thisWeekList.splice(indexOfSelected, 1);
};

function removeFromThisMonthList(selectedTaskName) {
    const indexOfSelected = thisMonthList.findIndex(function(x, index) {
        return x.name === selectedTaskName
    })

    const displayNumDueThisMonth = document.getElementById('num-due-this-month');
    let updated = --numDueThisMonth;
    displayNumDueThisMonth.textContent = updated;
    thisMonthList.splice(indexOfSelected, 1);
};

export function displayTodayList() {
    createTaskTable(todayList);
};

function isItDueThisWeek(dateA, dateB) {
    return (isSameWeek(dateA, dateB));
};

function addToThisWeekList(dateA, dateB, display, taskInput) {
    if (isItDueThisWeek(dateA, dateB) === true) {
        let addWeek = ++numDueThisWeek;
        display.textContent = addWeek;
        thisWeekList.push(taskInput);
        console.log(thisWeekList);
    }
};

export function displayThisWeekList() {
    createTaskTable(thisWeekList);
};

function isItDueThisMonth(dateA, dateB) {
    return (isSameMonth(dateA, dateB));
};

function addToThisMonthList(dateA, dateB, display, taskInput) {
    if (isItDueThisMonth(dateA, dateB) === true) {
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
};

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

    const tableBody = document.createElement('tbody');
    tasksTable.appendChild(tableBody);

    for (let i = 0; i < a.length; i++) {        
        let newRow = document.createElement('tr');
        tableBody.appendChild(newRow);

        let markCompletedCell = document.createElement('td');
        newRow.appendChild(markCompletedCell);

        let markCompleteBtn = document.createElement('button');
        markCompleteBtn.classList.add('complete-button');
        markCompletedCell.appendChild(markCompleteBtn);
        markCompleteBtn.textContent = "▢";
        markCompleteBtn.style.backgroundColor = "rgba(0,0,0,0)";

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

        markTaskCompleted();
        editExistingTask();
    }
};

export function removeTaskTable() {
    const taskTable = document.getElementById('new-task-container');
    taskTable.remove();
};

function markTaskCompleted() {
    const completeBtns = document.querySelectorAll('.complete-button');
    let today = new Date();
    let todayDay = +today.getDate();
    let todayMonth = +today.getMonth();
    let todayYear = +today.getFullYear();
    today = new Date(todayYear, todayMonth, todayDay);
    for (let i = 0; i < completeBtns.length; i++) {
        completeBtns[i].addEventListener('click', function(e) {
            e.stopPropagation();
                completeBtns[i].classList.add("clicked");
                let selection = e.target;
                let siblings = selection.parentElement.parentElement.children;
                let row = selection.parentElement.parentElement;
                console.log(`the row is ${row}`);
                let selectedTaskName = siblings[2].textContent;
                row.remove();
                removeFromAllTasks(selectedTaskName);
                let taskDate = siblings[1].textContent;
                let newTaskDate = taskDate.split('-');
                let dueDay = +newTaskDate[2];
                let dueMonth = newTaskDate[1]-1;
                let dueYear = +newTaskDate[0];
                taskDate = new Date(dueYear, dueMonth, dueDay);

                if (isItDueToday(today, taskDate) === true) {
                    removeFromTodayList();
                }

                if (isItDueThisWeek(today, taskDate) === true) {
                    removeFromThisWeekList();
                }

                if (isItDueThisMonth(today, taskDate) === true) {
                    removeFromThisMonthList();
                }
                removeTaskFromLocalStorage(selectedTaskName);
        })
    }
};

function removeTaskFromLocalStorage(tName) {
    const removedT = tName;
    console.log(`the tname is ${removedT}`);
    let tasks = getLocalStorageTasks();
    for (let i = 0; i < taskList.length; i++) {
        if (tasks[i].name === removedT) {
            tasks.splice(i, 1);
            localStorage.setItem('taskList', JSON.stringify(taskList));
            break;
        }
    }
};

function editExistingTask() {
    const tasksTable = document.getElementById('tasks-table');
    const rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener('click', () => {
            let existingTaskDate = rows[i].children[1].textContent;
            let existingTaskName = rows[i].children[2].textContent;
            let existingTaskDesc = rows[i].children[3].textContent;
            let existingTaskPriority = rows[i].children[4].children[0];
            if (existingTaskPriority.classList.contains('low')) {
                existingTaskPriority = "low";
            } else if (existingTaskPriority.classList.contains('medium')) {
                existingTaskPriority = "medium";
            } else if (existingTaskPriority.classList.contains('high')) {
                existingTaskPriority = "high";
            }

            let existingTaskProj = rows[i].children[5].textContent;
            removeTaskTable();
            showOverlay();
            showEditWindow(existingTaskDate, existingTaskName, existingTaskDesc, existingTaskPriority, existingTaskProj);
        })
    }
};

function showOverlay() {
    console.log("i'm adding the overlay!");
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    document.body.appendChild(overlay);
};

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.remove();
};

function showEditWindow(oldDate, oldName, oldDesc, oldPriority, oldProj) {
    console.log("the date is " + oldDate);
    console.log("the name is " + oldName);
    console.log("the desc is " + oldDesc);
    console.log("the priority is " + oldPriority);
    console.log("the proj is " + oldProj);
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
    editFormNameInput.value = oldName;

    const errorName = document.createElement('p');
    errorName.setAttribute('id', 'error-name');
    errorName.classList.add('error');
    taskEditForm.appendChild(errorName);

    const editFormDateLabel = document.createElement('label');
    editFormDateLabel.setAttribute('for', 'task-date');
    editFormDateLabel.textContent = "Due Date:";
    taskEditForm.appendChild(editFormDateLabel);

    const editFormDateInput = document.createElement('input');
    editFormDateInput.setAttribute('id', 'task-date');
    editFormDateInput.setAttribute('type', 'date');
    editFormDateInput.setAttribute('name', 'task-date');
    taskEditForm.appendChild(editFormDateInput);
    editFormDateInput.value = oldDate;

    const errorDate = document.createElement('p');
    errorDate.setAttribute('id', 'error-date');
    errorDate.classList.add('error');
    taskEditForm.appendChild(errorDate);

    const editFormDescLabel = document.createElement('label');
    editFormDescLabel.setAttribute('for', 'task-desc');
    editFormDescLabel.textContent = "Description:";
    taskEditForm.appendChild(editFormDescLabel);

    const editFormDescInput = document.createElement('input');
    editFormDescInput.setAttribute('id', 'task-desc');
    editFormDescInput.setAttribute('type', 'text');
    editFormDescInput.setAttribute('name', 'task-desc');
    taskEditForm.appendChild(editFormDescInput);
    editFormDescInput.value = oldDesc;

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

    editFormPriorityInput.value = oldPriority;

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
    editFormProjectInput.value = oldProj;

    checkUniqueTaskName(editFormNameInput);

    const editBtnContainer = document.createElement('div');
    editBtnContainer.setAttribute('id', 'task-button-container');
    taskEditForm.appendChild(editBtnContainer);

    const taskSubmitBtn = document.createElement('button');
    taskSubmitBtn.setAttribute('id', 'submit-task');
    taskSubmitBtn.setAttribute('type', 'button');
    taskSubmitBtn.textContent = "Save";
    editBtnContainer.appendChild(taskSubmitBtn);
    taskSubmitBtn.addEventListener('click', e => {
        const errorNameStatus = window.getComputedStyle(errorName).display;
        const errorDateStatus = window.getComputedStyle(errorDate).display;
        if (errorNameStatus === 'none' && errorDateStatus === 'none') {
            let oldTask = [oldDate, oldName, oldDesc, oldPriority, oldProj];
            updateTaskInfo(oldTask);
            editWindow.remove();
            hideOverlay();
        } else {
            e.preventDefault();
        }
        
    })
};

export function checkUniqueTaskName(input) {
    input.addEventListener('input', function(event) {
        const errorName = document.getElementById('error-name');
        console.log(event.target.value);
        let newVal = event.target.value;
        let alreadyExists = taskList.some((task) => task.name === newVal);
        console.log(alreadyExists);
        if(alreadyExists === true) {
            errorName.style.display = "block";
            errorName.textContent = "Task name already exists";
        } else {
            errorName.style.display = "none";
        }
    })
}

function updateTaskInfo(t) {
    console.log("start update task info function");
    console.log(taskList);
    
    let oldTaskDate = t[0];
    let oldTaskName = t[1];
    let oldTaskDesc = t[2];
    let oldTaskPriority = t[3];
    let oldTaskProj = t[4];

    let newTaskName = document.getElementById('task-name').value;
    let newTaskDate = document.getElementById('task-date').value;
    let newTaskDesc = document.getElementById('task-desc').value;
    let newTaskPriority = document.getElementById('task-priority').value;
    let newTaskProject = document.getElementById('task-project').value;
    let error = false;

    console.log(`the new task name is ${newTaskName} and date is ${newTaskDate}`);

    const index = taskList.findIndex(function(x, index) {
        return x.name === oldTaskName;
    })

    if (newTaskName === "") {
        const errorName = document.getElementById('error-name');
        errorName.style.display = "block";
        errorName.textContent = "You must enter a task name.";
        return showEditWindow(oldTaskDate, oldTaskName, oldTaskDesc, oldTaskPriority, oldTaskProj);
        
    }
    if (newTaskDate === "") {
        const errorDate = document.getElementById('error-date');
        errorDate.style.display = "block";
        errorDate.textContent = "You must enter a due date.";
        return showEditWindow(oldTaskDate, oldTaskName, oldTaskDesc, oldTaskPriority, oldTaskProj);
    }

    console.log("stop if blank");

    if (oldTaskDate !== newTaskDate) {
        taskList[index].dueDate = newTaskDate;
        let today = new Date();
        let todayDay = +today.getDate();
        let todayMonth = +today.getMonth();
        let todayYear = +today.getFullYear();
        today = new Date(todayYear, todayMonth, todayDay);
        let newTask = {
            dueDate: newTaskDate,
            name: newTaskName,
            desc: newTaskDesc,
            priority: newTaskPriority,
            proj: newTaskProject
        }
        
        let newDate = oldTaskDate.split('-');
        let dueDay = +newDate[2];
        let dueMonth = newDate[1]-1;
        let dueYear = +newDate[0];
        let taskDate = new Date(dueYear, dueMonth, dueDay);

        if (isItDueToday(today, taskDate) === true) {
            removeFromTodayList();
        }

        if (isItDueThisWeek(today, taskDate) === true) {
            removeFromThisWeekList();
        }

        if (isItDueThisMonth(today, taskDate) === true) {
            removeFromThisMonthList();
        }

        displayTasks(newTask);
    }

    if (oldTaskName !== newTaskName) {
        taskList[index].name = newTaskName;
    } 

    if (oldTaskDesc !== newTaskDesc) {
        taskList[index].desc = newTaskDesc;
    } 
    if (oldTaskPriority !== newTaskPriority) {
        taskList[index].priority = newTaskPriority;
    } 
    if (oldTaskProj !== newTaskProject) {
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







