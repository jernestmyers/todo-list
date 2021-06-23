import { format } from 'date-fns'
import { getObjectArrays, instantiateNewTask, instantiateNewProject, finalizeTaskEdits, finalizeProjectEdits, deleteTaskObject, deleteProjectObject } from './objectDataManagement.js'

// sets the default date in the addTask and addProject modals to today's date
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

// ------ this section contains functions to open, close and submit addTask and addProject form modals ------- //
const addTaskButton = document.querySelector(`#addTaskButton`);
const addProjectButton = document.querySelector(`#addProjectButton`);
addTaskButton.addEventListener(`click`, openNewObjectModal);
addProjectButton.addEventListener(`click`, openNewObjectModal);

const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
const taskUserInput = document.querySelectorAll(`.taskUserInputs`);

function openNewObjectModal(e) {
    e.stopPropagation();
    const addObjectModal = document.querySelectorAll(`.modal`);
    if (e.target.id === `addTaskButton`) {
        document.querySelector('#new-task-dateDue').value = new Date().toDateInputValue();
        addObjectModal[0].style.display = `block`;
    } else {
        document.querySelector('#new-project-dateDue').value = new Date().toDateInputValue();
        addObjectModal[2].style.display = `block`;
    }
}

const submitProjectButton = document.querySelector(`#addProjectSubmitButton`);
const submitTaskButton = document.querySelector(`#addTaskSubmitButton`);
const cancelProjectButton = document.querySelector(`#cancelProject`);
const cancelTaskButton = document.querySelector(`#cancelTask`);

cancelProjectButton.addEventListener(`click`, (e) => closeNewObjectModal(e.target.id));
cancelTaskButton.addEventListener(`click`, (e) => closeNewObjectModal(e.target.id));

submitProjectButton.addEventListener(`click`, (e) => {
    if (checkFormValidation(projectUserInput)) {
        instantiateNewProject(projectUserInput);
        submitNewObjectForm(e);
    }
})

submitTaskButton.addEventListener(`click`, (e) => {
    if (checkFormValidation(taskUserInput)) {
        instantiateNewTask(taskUserInput);
        submitNewObjectForm(e);
    }
})

function submitNewObjectForm(event) {
    event.preventDefault();
    closeNewObjectModal(event.target.id);
}

function closeNewObjectModal(buttonID) {
    const modalToClose = document.querySelectorAll(`.modal`);
    const formToReset = document.querySelectorAll(`.formField`);
    if (buttonID === `addProjectSubmitButton` || buttonID === `cancelProject`) {
        modalToClose[2].style.display = `none`;
        formToReset[2].reset();
    } else {
        modalToClose[0].style.display = `none`;
        formToReset[0].reset();
    }
}
// ---- END of section for addTask and addProject modals ---- //

// <---- this section contains functions to open, close and submit editTask and editProject form modals ----> //
const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    e.stopPropagation();
    let currentPage = mainContainer.firstChild.firstChild.textContent;
    if (currentPage !== `overview` && currentPage !== `tasks due today` && currentPage !== `tasks due this week` && currentPage !== `tasks past due`) {
        currentPage = mainContainer.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.textContent;
    }
    if (e.target.className === `edit-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        openEditTaskModal(taskSelectedIndex, currentPage);
    } else if (e.target.className === `delete-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        deleteTaskObject(taskSelectedIndex, currentPage);
    } else if (e.target.className === `edit-project-btn`) {
        const projectSelectedTitle = e.target.parentNode.firstChild.lastChild.textContent;
        const projectSelectedIndex = e.target.parentElement.parentElement.parentElement.dataset.indexNumber;
        openEditProjectModal(projectSelectedTitle, projectSelectedIndex);
    } else if (e.target.className === `delete-project-btn`) {
        const projectSelectedTitle = e.target.parentNode.firstChild.lastChild.textContent;
        const projectSelectedIndex = e.target.parentElement.parentElement.parentElement.dataset.indexNumber;
        openDeleteProjectModal(projectSelectedTitle, projectSelectedIndex);
    }
});

function openEditTaskModal(taskToEditIndex, pageDisplayedTitle) {
    
    const currentObjectArray = getObjectArrays();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    editTaskModal.style.display = `block`;
    
    // <------- pre-populate the editModal inputs with existing data -------------->
    const editTaskInputs = document.querySelectorAll(`.editTaskInputs`);
    const prepopulateProjectInModal = document.querySelector(`#existing-project`);
    const prepopulatePriorityInModal = document.querySelector(`#existing-status`);
    editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    const dateToPrepopulate = revertFormatting(currentObjectArray.tasks[taskToEditIndex].taskDateDue);
    editTaskInputs[1].setAttribute(`value`, `${dateToPrepopulate}`);
    editTaskInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
    editTaskInputs[2].textContent = currentObjectArray.tasks[taskToEditIndex].taskDescription;
    prepopulatePriorityInModal.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus}`)
    prepopulatePriorityInModal.textContent = `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus} priority`;
    prepopulateProjectInModal.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated}`);
    if (currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated === `default`) {
        prepopulateProjectInModal.textContent = `overview (${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated})`;
    } else {
        prepopulateProjectInModal.textContent = currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated;
    }
    // <------- end of pre-populating the editModal inputs ------------------------>

    const confirmTaskEdits = document.querySelector(`#editTaskSubmitButton`);
    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
    confirmTaskEdits.addEventListener(`click`, confirmTaskEditsHandler);
    cancelTaskEdits.addEventListener(`click`, cancelTaskEditsHandler);
    
    function confirmTaskEditsHandler(e) {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        cancelTaskEdits.removeEventListener(`click`, cancelTaskEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editTaskInputs)) {
            finalizeTaskEdits(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        }
    }
    
    function cancelTaskEditsHandler(e) {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        cancelTaskEdits.removeEventListener(`click`, cancelTaskEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editTaskModal);
    }
}

function openEditProjectModal(projectToEditTitle, projectToEditIndex) {
    
    const currentObjectArray = getObjectArrays();

    const editProjectModal = document.querySelector(`#editProjectModal`);
    editProjectModal.style.display = `block`;
    
    // pre-populate the edit form with existing data
    const editProjectInputs = document.querySelectorAll(`.editProjectInputs`);
    editProjectInputs[0].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectTitle}`);
    const dateToPrepopulate = revertFormatting(currentObjectArray.projects[projectToEditIndex].projectDateDue);
    editProjectInputs[1].setAttribute(`value`, `${dateToPrepopulate}`);
    editProjectInputs[2].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDescription}`);
    editProjectInputs[2].textContent = currentObjectArray.projects[projectToEditIndex].projectDescription;
    
    const confirmProjectEdits = document.querySelector(`#editProjectSubmitButton`);
    const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
    confirmProjectEdits.addEventListener(`click`, confirmProjectEditsHandler);
    cancelProjectEdits.addEventListener(`click`, cancelProjectEditsHandler);
    
    function confirmProjectEditsHandler(e) {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        cancelProjectEdits.removeEventListener(`click`, cancelProjectEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editProjectInputs)) {
            finalizeProjectEdits(editProjectInputs, projectToEditIndex, projectToEditTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        }
    }
    
    function cancelProjectEditsHandler(e) {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        cancelProjectEdits.removeEventListener(`click`, cancelProjectEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editProjectModal);
    }
}
// ---- END of editTask and editProject modal functionality------- //

function openDeleteProjectModal(projectToDeleteTitle, projectToDeleteIndex) {
    
    const deleteProjectModal = document.querySelector(`#confirmDeleteProject`)
    const deleteProjectMessage = document.querySelector(`#confirm-delete-text`);
    deleteProjectMessage.textContent = `Are you sure you want to delete this project and all of its associated tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    confirmDeleteButton.addEventListener( `click`, confirmProjectDeleteHandler);
    cancelDeleteButton.addEventListener( `click`, cancelProjectDeleteHandler);
    
    function confirmProjectDeleteHandler(e) {
        confirmDeleteButton.removeEventListener(`click`, confirmProjectDeleteHandler);
        cancelDeleteButton.removeEventListener(`click`, cancelProjectDeleteHandler);
        e.stopPropagation();
        closeEditOrDeleteModal(deleteProjectModal);
        deleteProjectObject(projectToDeleteTitle, projectToDeleteIndex);
    }
    
    function cancelProjectDeleteHandler(e) {
        console.log(`cancel project delete check`);
        confirmDeleteButton.removeEventListener(`click`, confirmProjectDeleteHandler);
        cancelDeleteButton.removeEventListener(`click`, cancelProjectDeleteHandler);
        closeEditOrDeleteModal(deleteProjectModal);
    }
    
    deleteProjectModal.style.display = `block`;
}

function closeEditOrDeleteModal(modalToClose) {
    const formToReset = document.querySelectorAll(`.formField`);
    modalToClose.style.display = `none`;
    if (modalToClose === editTaskModal) {
        formToReset[1].reset();
    } else if (modalToClose === editProjectModal) {
        formToReset[3].reset();
    }
}

// this function validates both types of modals: add and edit
function checkFormValidation(inputNodeList) {
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
}

// format editObject date for pre-population
function revertFormatting(dateToRevert) {
    const year = +dateToRevert.slice(6);
    const month = +dateToRevert.slice(0, 2) - 1;
    const day = +dateToRevert.slice(3, 5);
    return format(new Date(year, month, day), "yyyy-MM-dd")
}