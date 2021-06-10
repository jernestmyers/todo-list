import { regenerateProjectTasks } from './index.js';
import { finalizeTaskEdits } from './taskCreation'

function loadMainContent(container, functionToInvoke) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    let containerToDisplay = functionToInvoke;
    container.appendChild(containerToDisplay);
}

function openModal(e) {
    const modalToOpen = document.querySelectorAll(`.modal`);
    if (e.target.id === `addTaskButton`) {
        modalToOpen[0].style.display = `block`;
    } else {
        modalToOpen[2].style.display = `block`;
    }
}

function openEditTaskModal(object, index, pageTitle) {
    
    const modalToOpen = document.querySelector(`#editTaskModal`);
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
            finalizeTaskEdits(editFormInputs, object, index);
            e.preventDefault();
            closeEditModal(modalToOpen, editFormInputs);
            regenerateProjectTasks(pageTitle);
        }
    });
    
    const cancelEdits = document.querySelector(`#cancelTaskEdit`);
    cancelEdits.addEventListener(`click`, (e) => {
        closeEditModal(modalToOpen, editFormInputs);
    })
    
    modalToOpen.style.display = `block`;
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
    formToReset[1].reset();
;}

export { 
    loadMainContent,
    openModal,
    openEditTaskModal,
}