require('./style.css');

import { saveProject } from './projects';
import { saveTask, 
        clearForm, 
        removeTaskDiv,
        removeTaskTable,
        displayAllTasksList,
        displayThisMonthList, 
        displayThisWeekList, 
        displayTodayList, } from './tasks';

const addTaskBtn = document.getElementById('add-task');
const addProjectBtn = document.getElementById('add-project');
const container = document.getElementById('content-container');
const newTaskDiv = document.getElementById('new-task');
const newProjectDiv = document.getElementById('new-project');
const navLinks = document.querySelectorAll('.nav-links');
const allTasks = document.getElementById('all-tasks');
const myProjects = document.getElementById('my-projects');
const homeLink = document.querySelector('.home');
const taskFormContainer = document.getElementById('task-form-container');
const projectFormContainer = document.getElementById('project-form-container');
const tasksTableContainer = document.getElementById('new-task-container');
const taskDeleteIcons = document.querySelectorAll('.delete-task');

let userClicks = ["home"];

addTaskBtn.addEventListener('click', () => {
    removeNewDivs();
    addTaskForm();
});

addProjectBtn.addEventListener('click', () => {
    removeNewDivs();
    addProjectForm();
});

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        let nextPage = e.target.id;
        userClicks.push(nextPage);
        let previousPage = userClicks[(userClicks.length-2)];
        console.log("the next page is " + nextPage);
        console.log("the previous page was " + previousPage);
        console.log(userClicks);
        if (previousPage === "home") {
            removeTaskFormContainer();
            removeNewDivs();
        } else if (previousPage === "due-today" || previousPage === "due-this-week" || previousPage === "due-this-month") {
            removeTaskFormContainer();
            removeTaskTable();
        }       

        if (e.target.id === "due-today") {
            console.log("display tasks due today");
            displayTodayList();
        } else if (e.target.id === "due-this-week") {
            console.log("display tasks due this week");
            displayThisWeekList();
        } else if (e.target.id === "due-this-month") {
            console.log("display tasks due this month");
            displayThisMonthList();
        } else if (e.target.id === "all-tasks") {
            displayAllTasksList();
        } else if (e.target.id === "my-projects") {
            displayMyProjectsList();
        } else if (e.target.id === "home") {
            displayNewDivs();
        }
    });
});

taskDeleteIcons.forEach(icon => {
    icon.addEventListener('click', e => {
        console.log("the task is deleted");
    })
});

function removeNewDivs() {
    newTaskDiv.style.display = "none";
    newProjectDiv.style.display = "none";
};

function displayNewDivs() {
    newTaskDiv.style.display = "flex";
    newProjectDiv.style.display = "flex";
};

function removeTaskFormContainer() {
    const taskFormContainer = document.getElementById('task-form-container');
    if (taskFormContainer.classList.contains('active')) {
        taskFormContainer.remove();
        taskFormContainer.classList.remove('active');
    } else {
        return;
    }    
};

function displayTaskFormContainer() {
    taskFormContainer.style.display = "block";
};

function removeProjectFormContainer() {
    projectFormContainer.style.display = "none";
}

function displayProjectFormContainer() {
    projectFormContainer.style.display = "block";

}

function addProjectForm() {
    const projectFormContainer = document.createElement('div');
    projectFormContainer.setAttribute('id', 'project-form-container');
    projectFormContainer.classList.add('active');
    container.appendChild(projectFormContainer);

    const projectForm = document.createElement('form');
    projectForm.setAttribute('id', 'project-form');
    projectFormContainer.appendChild(projectForm);

    const projectFormTitle = document.createElement('h2');
    projectFormTitle.classList.add('form-title');
    projectFormTitle.textContent = "Add New Project";
    projectForm.appendChild(projectFormTitle);

    const projectFormNameLabel = document.createElement('label');
    projectFormNameLabel.setAttribute('for', 'project-name');
    projectFormNameLabel.textContent = "Name:";
    projectForm.appendChild(projectFormNameLabel);

    const projectFormNameInput = document.createElement('input');
    projectFormNameInput.setAttribute('id', 'project-name');
    projectFormNameInput.setAttribute('type', 'text');
    projectFormNameInput.setAttribute('name', 'project-name');
    projectForm.appendChild(projectFormNameInput);

    const projectFormDeadlineLabel = document.createElement('label');
    projectFormDeadlineLabel.setAttribute('for', 'project-deadline');
    projectFormDeadlineLabel.textContent = "Project Deadline:";
    projectForm.appendChild(projectFormDeadlineLabel);


    const projectFormDeadlineInput = document.createElement('input');
    projectFormDeadlineInput.setAttribute('id', 'project-deadline');
    projectFormDeadlineInput.setAttribute('type', 'date');
    projectFormDeadlineInput.setAttribute('name', 'project-deadline');
    projectForm.appendChild(projectFormDeadlineInput);

    const projectFormDescLabel = document.createElement('label');
    projectFormDescLabel.setAttribute('for', 'project-desc');
    projectFormDescLabel.textContent = "Description:";
    projectForm.appendChild(projectFormDescLabel);

    const projectFormDescInput = document.createElement('input');
    projectFormDescInput.setAttribute('id', 'project-desc');
    projectFormDescInput.setAttribute('type', 'text');
    projectFormDescInput.setAttribute('name', 'project-desc');
    projectForm.appendChild(projectFormDescInput);

    const projectBtnContainer = document.createElement('div');
    projectBtnContainer.setAttribute('id', 'project-button-container');
    projectForm.appendChild(projectBtnContainer);

    const projectSubmitBtn = document.createElement('button');
    projectSubmitBtn.setAttribute('id', 'submit-project');
    projectSubmitBtn.setAttribute('type', 'button');
    projectSubmitBtn.textContent = "Submit";
    projectBtnContainer.appendChild(projectSubmitBtn);
    projectSubmitBtn.addEventListener('click', () => {
        console.log('submit clicked');
        saveProject();
    });

    const projectCancelBtn = document.createElement('button');
    projectCancelBtn.setAttribute('id', 'cancel-project');
    projectCancelBtn.setAttribute('type', 'button');
    projectCancelBtn.textContent = "Cancel";
    projectBtnContainer.appendChild(projectCancelBtn);
    projectCancelBtn.addEventListener('click', () => {
        removeTaskForm(projectFormContainer);
        displayNewDivs();
    })
}

function addTaskForm() {
    const taskFormContainer = document.createElement('div');
    taskFormContainer.setAttribute('id', 'task-form-container');
    taskFormContainer.classList.add('active');
    container.appendChild(taskFormContainer);

    const taskForm = document.createElement('form');
    taskForm.setAttribute('id', 'task-form');
    taskFormContainer.appendChild(taskForm);

    const taskFormTitle = document.createElement('h2');
    taskFormTitle.classList.add('form-title');
    taskForm.appendChild(taskFormTitle);
    taskFormTitle.textContent = "Add New Task";

    const taskFormNameLabel = document.createElement('label');
    taskFormNameLabel.setAttribute('for', 'task-name');
    taskFormNameLabel.textContent = "Name:";
    taskForm.appendChild(taskFormNameLabel);

    const taskFormNameInput = document.createElement('input');
    taskFormNameInput.setAttribute('id', 'task-name');
    taskFormNameInput.setAttribute('type', 'text');
    taskFormNameInput.setAttribute('name', 'task-name');
    taskForm.appendChild(taskFormNameInput);

    const taskFormDatelabel = document.createElement('label');
    taskFormDatelabel.setAttribute('for', 'task-date');
    taskFormDatelabel.textContent = "Due Date:";
    taskForm.appendChild(taskFormDatelabel);

    const taskFormDateInput = document.createElement('input');
    taskFormDateInput.setAttribute('id', 'task-date');
    taskFormDateInput.setAttribute('type', 'date');
    taskFormDateInput.setAttribute('name', 'task-date');
    taskForm.appendChild(taskFormDateInput);

    const taskFormDescLabel = document.createElement('label');
    taskFormDescLabel.setAttribute('for', 'task-desc');
    taskFormDescLabel.textContent = "Description:";
    taskForm.appendChild(taskFormDescLabel);

    const taskFormDescInput = document.createElement('input');
    taskFormDescInput.setAttribute('id', 'task-desc');
    taskFormDescInput.setAttribute('type', 'text');
    taskFormDescInput.setAttribute('name', 'task-desc');
    taskForm.appendChild(taskFormDescInput);

    const taskFormPriorityLabel = document.createElement('label');
    taskFormPriorityLabel.setAttribute('for', 'task-priority');
    taskFormPriorityLabel.textContent = "Priority:";
    taskForm.appendChild(taskFormPriorityLabel);

    const taskFormPriorityInput = document.createElement('select');
    taskFormPriorityInput.setAttribute('id', 'task-priority');
    taskFormPriorityInput.setAttribute('name', 'task-priority');
    taskForm.appendChild(taskFormPriorityInput);

    const taskFormPriorityLow = document.createElement('option');
    taskFormPriorityLow.setAttribute('value', 'low');
    taskFormPriorityLow.textContent = "Low";
    taskFormPriorityInput.appendChild(taskFormPriorityLow);

    const taskFormPriorityMed = document.createElement('option');
    taskFormPriorityMed.setAttribute('value', 'medium');
    taskFormPriorityMed.textContent = "Medium";
    taskFormPriorityInput.appendChild(taskFormPriorityMed);

    const taskFormPriorityHigh = document.createElement('option');
    taskFormPriorityHigh.setAttribute('value', 'high');
    taskFormPriorityHigh.textContent = "High";
    taskFormPriorityInput.appendChild(taskFormPriorityHigh);

    const taskFormProjectLabel = document.createElement('label')
    taskFormProjectLabel.setAttribute('for', 'task-project');
    taskFormProjectLabel.textContent = "Associated with Project:";
    taskForm.appendChild(taskFormProjectLabel);

    const taskFormProjectInput = document.createElement('select');
    taskFormProjectInput.setAttribute('id', 'task-project');
    taskFormProjectInput.setAttribute('name', 'task-project');
    taskForm.appendChild(taskFormProjectInput);

    const taskFormProjectTest = document.createElement('option');
    taskFormProjectTest.setAttribute('value', 'test-project');
    taskFormProjectTest.textContent = "Test Project";
    taskFormProjectInput.appendChild(taskFormProjectTest);

    const taskBtnContainer = document.createElement('div');
    taskBtnContainer.setAttribute('id', 'task-button-container');
    taskForm.appendChild(taskBtnContainer);

    const taskSubmitBtn = document.createElement('button');
    taskSubmitBtn.setAttribute('id', 'submit-task');
    taskSubmitBtn.setAttribute('type', 'button');
    taskSubmitBtn.textContent = "Submit";
    taskBtnContainer.appendChild(taskSubmitBtn);
    taskSubmitBtn.addEventListener('click', () => {
        console.log('submit clicked');
        saveTask();
    });

    const taskCancelBtn = document.createElement('button');
    taskCancelBtn.setAttribute('id', 'cancel-task');
    taskCancelBtn.setAttribute('type', 'button');
    taskCancelBtn.textContent = "Cancel";
    taskBtnContainer.appendChild(taskCancelBtn);
    taskCancelBtn.addEventListener('click', () => {
        removeTaskForm(taskFormContainer);
        displayNewDivs();
        console.log("it worked");
    });
};

function removeTaskForm(container) {
    clearForm();
    container.style.display = "none";
};





