const container = document.getElementById('content-container');
const newTaskDiv = document.getElementById('new-task');
const newProjectDiv = document.getElementById('new-project');

export function removeNewDivs() {
    newTaskDiv.style.display = "none";
    newProjectDiv.style.display = "none"
}

export function addTaskForm() {
    const taskFormContainer = document.createElement('div');
    taskFormContainer.setAttribute('id', 'task-form-container');
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
    taskFormNameInput.setAttribute('type', 'text');
    taskFormNameInput.setAttribute('name', 'task-name');
    taskForm.appendChild(taskFormNameInput);

    const taskFormDatelabel = document.createElement('label');
    taskFormNameLabel.setAttribute('for', 'task-date');
    taskFormDatelabel.textContent = "Due Date:";
    taskForm.appendChild(taskFormDatelabel);

    const taskFormDateInput = document.createElement('input');
    taskFormDateInput.setAttribute('type', 'date');
    taskFormDateInput.setAttribute('name', 'task-date');
    taskForm.appendChild(taskFormDateInput);

    const taskFormDescLabel = document.createElement('label');
    taskFormDescLabel.setAttribute('for', 'task-desc');
    taskFormDescLabel.textContent = "Description:";
    taskForm.appendChild(taskFormDescLabel);

    const taskFormDescInput = document.createElement('input');
    taskFormDescInput.setAttribute('type', 'text');
    taskFormDescInput.setAttribute('name', 'task-desc');
    taskForm.appendChild(taskFormDescInput);

    const taskFormPriorityLabel = document.createElement('label');
    taskFormPriorityLabel.setAttribute('for', 'task-priority');
    taskFormPriorityLabel.textContent = "Priority:";
    taskForm.appendChild(taskFormPriorityLabel);

    const taskFormPriorityInput = document.createElement('select');
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
    taskSubmitBtn.textContent = "Submit";
    taskBtnContainer.appendChild(taskSubmitBtn);

    const taskCancelBtn = document.createElement('button');
    taskCancelBtn.setAttribute('id', 'cancel-task');
    taskCancelBtn.textContent = "Cancel";
    taskBtnContainer.appendChild(taskCancelBtn);

}

