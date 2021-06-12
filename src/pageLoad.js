import { regenerateProjectTasks } from './index.js';
import { finalizeTaskEdits, finalizeProjectEdits } from './taskCreation'

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
    
    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkEditFormValidation(editFormInputs)) {
            finalizeTaskEdits(editFormInputs, index);
            e.preventDefault();
            closeEditModal(editTaskModal);
            regenerateProjectTasks(pageTitle);
        }
    });
    
    const cancelEdits = document.querySelector(`#cancelTaskEdit`);
    cancelEdits.addEventListener(`click`, (e) => {
        closeEditModal(editTaskModal);
    })
    
    editTaskModal.style.display = `block`;
}

function openEditProjectModal(object, index, existingTitle, existingTaskObjectArray) {
    
    const editProjectModal = document.querySelector(`#editProjectModal`);
    const editFormInputs = document.querySelectorAll(`.editProjectInputs`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${object[0].title}`);
    editFormInputs[1].setAttribute(`value`, `${object[0].dateDue}`);
    editFormInputs[2].setAttribute(`value`, `${object[0].description}`);
    
    const confirmEdits = document.querySelector(`#editProjectSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkEditFormValidation(editFormInputs)) {
            finalizeProjectEdits(editFormInputs, index, existingTitle, existingTaskObjectArray);
            e.preventDefault();
            closeEditModal(editProjectModal);
        }
    });
    
    // const cancelEdits = document.querySelector(`#cancelTaskEdit`);
    // cancelEdits.addEventListener(`click`, (e) => {
    //     closeEditModal(editTaskModal, editFormInputs);
    // })
    
    editProjectModal.style.display = `block`;
}

function checkEditFormValidation(inputNodeList) {
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
}

function closeEditModal(modalToClose) {
    const formToReset = document.querySelectorAll(`.formField`);
    modalToClose.style.display = `none`;
    if (modalToClose === editTaskModal) {
        formToReset[1].reset();
    } else {
        formToReset[3].reset();
    }
}

export { 
    loadMainContent,
    openModal,
    openEditTaskModal,
    openEditProjectModal,
}