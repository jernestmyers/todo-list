import { regenerateProjectTasks } from './index.js';
import { finalizeTaskEdits, finalizeProjectEdits, deleteProjectObject } from './taskCreation'

function loadMainContent(container, functionToInvoke) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    let containerToDisplay = functionToInvoke;
    container.appendChild(containerToDisplay);
}

function openModal(e) {
    const editTaskModal = document.querySelectorAll(`.modal`);
    if (e.target.id === `addTaskButton`) {
        editTaskModal[0].style.display = `block`;
    } else {
        editTaskModal[2].style.display = `block`;
    }
}

function openEditTaskModal(object, index, pageTitle) {
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    const editFormInputs = document.querySelectorAll(`.editTaskInputs`);
    const statusOption = document.querySelector(`#existing-status`);
    const projectOption = document.querySelector(`#existing-project`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${object[0].title}`);
    editFormInputs[1].setAttribute(`value`, `${object[0].dateDue}`);
    editFormInputs[2].setAttribute(`value`, `${object[0].description}`);
    statusOption.setAttribute(`value`, `${object[0].priorityStatus}`);
    statusOption.textContent = `${object[0].priorityStatus} priority`;
    if (object[0].projectAssociated === `default`) {
        projectOption.setAttribute(`value`, `default`);
        projectOption.textContent = `overview (${object[0].projectAssociated})`;
    } else {
        projectOption.setAttribute(`value`, `${object[0].projectAssociated}`);
        projectOption.textContent = object[0].projectAssociated;
    }
    
    console.log(`openEdit modal`);
    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkEditFormValidation(editFormInputs)) {
            console.log(`in the if statement eventListener`)
            finalizeTaskEdits(editFormInputs, index);
            closeEditOrDeleteModal(editTaskModal);
            regenerateProjectTasks(pageTitle);
        }
        e.preventDefault();
    });
    
    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
    cancelTaskEdits.addEventListener(`click`, (e) => {
        e.preventDefault();
        closeEditOrDeleteModal(editTaskModal);
    })
    
    editTaskModal.style.display = `block`;
}

function openEditProjectModal(object, index, existingTitle, existingTaskObjectArray) {
    
    const editProjectModal = document.querySelector(`#editProjectModal`);
    const editFormInputs = document.querySelectorAll(`.editProjectInputs`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${object.projectTitle}`);
    editFormInputs[1].setAttribute(`value`, `${object.projectDateDue}`);
    editFormInputs[2].setAttribute(`value`, `${object.projectDescription}`);
    
    const confirmEdits = document.querySelector(`#editProjectSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkEditFormValidation(editFormInputs)) {
            finalizeProjectEdits(editFormInputs, index, existingTitle, existingTaskObjectArray);
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        }
    });
    
    const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
    cancelProjectEdits.addEventListener(`click`, (e) => {
        e.preventDefault();
        closeEditOrDeleteModal(editProjectModal);
    })
    
    editProjectModal.style.display = `block`;
}

function openDeleteProjectModal(projectTitle) {
    console.log(projectTitle);
    
    const deleteProjectModal = document.querySelector(`#confirmDeleteProject`)
    const deleteProjectMessage = document.querySelector(`#confirm-delete-text`);
    deleteProjectMessage.textContent = `Are you sure you want to delete the project "${projectTitle}" and all of its tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    
    confirmDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
        deleteProjectObject(projectTitle);
    })
    
    cancelDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
    })
    
    deleteProjectModal.style.display = `block`;
}

function checkEditFormValidation(inputNodeList) {
    console.log(`check form validation`)
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
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

export { 
    loadMainContent,
    openModal,
    openEditTaskModal,
    openEditProjectModal,
    openDeleteProjectModal,
}