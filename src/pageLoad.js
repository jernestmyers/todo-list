import { getObjectArrays, instantiateNewTask, instantiateNewProject, finalizeTaskEdits, deleteTaskObject, deleteProjectObject } from './taskCreation.js'

// module contains functions to open, close and submit addTask and addProject form modals
const newObjectModalModule = (function() {

    const addTaskContainer = document.querySelector(`#add-task-container`);
    addTaskContainer.addEventListener(`click`, openNewObjectModal);
    
    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);
    
    function openNewObjectModal(e) {
        const addObjectModal = document.querySelectorAll(`.modal`);
        if (e.target.id === `addTaskButton`) {
            addObjectModal[0].style.display = `block`;
        } else {
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
})();

const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    const currentPage = mainContainer.firstChild.firstChild.textContent;
    if (e.target.className === `edit-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        openEditTaskModal(taskSelectedIndex, currentPage);
    } else if (e.target.className === `delete-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        deleteTaskObject(taskSelectedIndex, currentPage);
    } else if (e.target.id === `edit-project-btn`) {
        const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
    } else if (e.target.id === `delete-project-btn`) {
        const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
        const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
        openDeleteProjectModal(projectSelectedTitle, projectSelectedIndex);
    }
});

function openEditTaskModal(taskToEditIndex, pageDisplayedTitle) {
    
    const currentObjectArray = getObjectArrays();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    editTaskModal.style.display = `block`;

    const editFormInputs = document.querySelectorAll(`.editTaskInputs`);
    // const statusOption = document.querySelector(`#existing-status`);
    // const projectSelector = document.querySelector(`#edit-project-associated`);
    // const projectOption = document.createElement(`option`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    editFormInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
    editFormInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
    
    // statusOption.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus}`);
    // statusOption.textContent = `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus} priority`;
    // if (currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated === `default`) {
    //     projectOption.setAttribute(`value`, `default`);
    //     projectOption.textContent = `overview (${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated})`;
    //     projectSelector.appendChild(projectOption);
    // } else {
    //     projectOption.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated}`);
    //     projectOption.setAttribute(`selected`, ``);
    //     projectOption.textContent = currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated;
    //     projectSelector.appendChild(projectOption);
    // }
    
    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkFormValidation(editFormInputs)) {
            finalizeTaskEdits(editFormInputs, taskToEditIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        }
    });
    
    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
    cancelTaskEdits.addEventListener(`click`, (e) => {
        e.preventDefault();
        closeEditOrDeleteModal(editTaskModal);
    })
    
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

function openDeleteProjectModal(projectToDeleteTitle, projectToDeleteIndex) {
    console.log(projectToDeleteIndex);
    
    const deleteProjectModal = document.querySelector(`#confirmDeleteProject`)
    const deleteProjectMessage = document.querySelector(`#confirm-delete-text`);
    deleteProjectMessage.textContent = `Are you sure you want to delete the project "${projectToDeleteTitle}" and all of its tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    
    confirmDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
        deleteProjectObject(projectToDeleteTitle, projectToDeleteIndex);
    })
    
    cancelDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
    })
    
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

function checkFormValidation(inputNodeList) {
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
}

export {
    newObjectModalModule,
    closeEditOrDeleteModal,
    checkFormValidation,
}