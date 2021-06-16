import { getObjectArrays, instantiateNewTask, finalizeTaskEdits, deleteTaskObject } from './taskCreation.js'

// module contains functions to open, close and submit addTask and addProject form modals
const newObjectModalModule = (function() {

    const addTaskContainer = document.querySelector(`#add-task-container`);
    addTaskContainer.addEventListener(`click`, openNewObjectModal);

    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);

    function openNewObjectModal(e) {
        const editTaskModal = document.querySelectorAll(`.modal`);
        if (e.target.id === `addTaskButton`) {
            editTaskModal[0].style.display = `block`;
        } else {
            editTaskModal[2].style.display = `block`;
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

// function instantiateNewProject(newProjectModalInputs) {
//     const projectInputArray = Array.from(projectUserInput);
//     createNewProject(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value);
//     currentObjectArray = getObjectArrays();
//     let projectIndex = currentObjectArray.projects.length - 1;
//     loadMainContent(mainContainer, displayNewProject(currentObjectArray.projects[projectIndex]));
//     appendNewProjectToSelector(projectInputArray[0].value);
//     attachDataToProjectButton(projectIndex);
// }

// function attachDataToProjectButton(indexNumber) {
//     const newProjectButton = projectListContainer.lastChild;
//     newProjectButton.setAttribute(`data-index-number`, indexNumber);
// }

// function appendNewProjectToSelector(newProjectTitle) {
//     const addTaskProjectSelector = document.querySelector(`#project-associated`);
//     const editTaskProjectSelector = document.querySelector(`#edit-project-associated`);
    
//     const projectForAddTaskSelector = document.createElement(`option`);
//     projectForAddTaskSelector.setAttribute(`value`, newProjectTitle);
//     projectForAddTaskSelector.textContent = newProjectTitle;
    
//     const projectForEditTaskSelector = document.createElement(`option`);
//     projectForEditTaskSelector.setAttribute(`value`, newProjectTitle);
//     projectForEditTaskSelector.textContent = newProjectTitle;

//     addTaskProjectSelector.appendChild(projectForAddTaskSelector);
//     editTaskProjectSelector.appendChild(projectForEditTaskSelector);
// }

// function instantiateNewTask(newTaskModalInputs) {
//     const taskInputArray = Array.from(taskUserInput);
//     const currentPageDisplayed = mainContainer.firstChild.firstChild.textContent;
//     createNewTask(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value, taskInputArray[4].value);
//     currentObjectArray = getObjectArrays();
//     let newTaskIndex = currentObjectArray.tasks.length - 1;
//     if (currentPageDisplayed === `overview`) {
//         loadMainContent(mainContainer, displayTasksOverview(currentObjectArray.tasks));
//     } else if (currentPageDisplayed === currentObjectArray.tasks[newTaskIndex].projectAssociated) {
//         regenerateProjectTasks(currentPageDisplayed);
//     }
// }

const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    if (e.target.className === `edit-task-btn`) {
        openEditTaskModal(e.target.dataset.indexNumber, `overview`);
        console.log(e.target.dataset.indexNumber);
    }
    else if (e.target.className === `delete-task-btn`) {
        deleteTaskObject(e.target.dataset.indexNumber, `overview`);
        console.log(e.target.dataset.indexNumber);
    }
});

function openEditTaskModal(taskToEditIndex, pageDisplayedTitle) {

    const currentObjectArray = getObjectArrays();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    const editFormInputs = document.querySelectorAll(`.editTaskInputs`);
    const statusOption = document.querySelector(`#existing-status`);
    const projectOption = document.querySelector(`#existing-project`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    editFormInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
    editFormInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
    statusOption.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus}`);
    statusOption.textContent = `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus} priority`;
    if (currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated === `default`) {
        projectOption.setAttribute(`value`, `default`);
        projectOption.textContent = `overview (${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated})`;
    } else {
        projectOption.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated}`);
        projectOption.textContent = currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated;
    }
    
    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkFormValidation(editFormInputs)) {
            finalizeTaskEdits(editFormInputs, taskToEditIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
            // regenerateProjectTasks(pageTitle);
        }
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
    // openNewObjectModal,
    newObjectModalModule,
    closeEditOrDeleteModal,
    checkFormValidation,
}