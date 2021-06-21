/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataModalHandler.js":
/*!*********************************!*\
  !*** ./src/dataModalHandler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectDataManagement.js */ "./src/objectDataManagement.js");


// sets the default date in the addTask and addProject modals to today's date
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

// this section contains functions to open, close and submit addTask and addProject form modals
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
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.instantiateNewProject)(projectUserInput);
        submitNewObjectForm(e);
    }
})

submitTaskButton.addEventListener(`click`, (e) => {
    if (checkFormValidation(taskUserInput)) {
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.instantiateNewTask)(taskUserInput);
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

// this section contains functions to open, close and submit editTask and editProject form modals
const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    e.stopPropagation();
    let currentPage = mainContainer.firstChild.firstChild.textContent;
    if (currentPage !== `overview`) {
        currentPage = mainContainer.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.textContent;
    }
    if (e.target.className === `edit-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        openEditTaskModal(taskSelectedIndex, currentPage);
    } else if (e.target.className === `delete-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteTaskObject)(taskSelectedIndex, currentPage);
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
    
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.getObjectArrays)();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    editTaskModal.style.display = `block`;
    
    // <------- pre-populate the editModal inputs with existing data -------------->
    const editTaskInputs = document.querySelectorAll(`.editTaskInputs`);
    const prepopulateProjectInModal = document.querySelector(`#existing-project`);
    const prepopulatePriorityInModal = document.querySelector(`#existing-status`);
    editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    editTaskInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
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
    confirmTaskEdits.addEventListener(`click`, confirmTaskEditsHandler)
    
    function confirmTaskEditsHandler(e) {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editTaskInputs)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeTaskEdits)(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        }
    }

    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
    cancelTaskEdits.addEventListener(`click`, (e) => {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editTaskModal);
    });
}

function openEditProjectModal(projectToEditTitle, projectToEditIndex) {
    
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.getObjectArrays)();

    const editProjectModal = document.querySelector(`#editProjectModal`);
    editProjectModal.style.display = `block`;
    
    // pre-populate the edit form with existing data
    const editProjectInputs = document.querySelectorAll(`.editProjectInputs`);
    editProjectInputs[0].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectTitle}`);
    editProjectInputs[1].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDateDue}`);
    editProjectInputs[2].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDescription}`);
    editProjectInputs[2].textContent = currentObjectArray.projects[projectToEditIndex].projectDescription;
    
    const confirmProjectEdits = document.querySelector(`#editProjectSubmitButton`);
    confirmProjectEdits.addEventListener(`click`, confirmProjectEditsHandler)
    
    function confirmProjectEditsHandler(e) {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editProjectInputs)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeProjectEdits)(editProjectInputs, projectToEditIndex, projectToEditTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        }
    }
    
    const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
    cancelProjectEdits.addEventListener(`click`, (e) => {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editProjectModal);
    })
    
}

function openDeleteProjectModal(projectToDeleteTitle, projectToDeleteIndex) {
    
    const deleteProjectModal = document.querySelector(`#confirmDeleteProject`)
    const deleteProjectMessage = document.querySelector(`#confirm-delete-text`);
    deleteProjectMessage.textContent = `Are you sure you want to delete this project and all of its associated tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    
    confirmDeleteButton.addEventListener( `click`, confirmProjectDeleteHandler)
    
    function confirmProjectDeleteHandler(e) {
        confirmDeleteButton.removeEventListener(`click`, confirmProjectDeleteHandler);
        e.stopPropagation();
        closeEditOrDeleteModal(deleteProjectModal);
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteProjectObject)(projectToDeleteTitle, projectToDeleteIndex);
    }
    
    cancelDeleteButton.addEventListener( `click`, (e) => {
        confirmDeleteButton.removeEventListener(`click`, confirmProjectDeleteHandler);
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

/***/ }),

/***/ "./src/objectDataManagement.js":
/*!*************************************!*\
  !*** ./src/objectDataManagement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getObjectArrays": () => (/* binding */ getObjectArrays),
/* harmony export */   "instantiateNewTask": () => (/* binding */ instantiateNewTask),
/* harmony export */   "instantiateNewProject": () => (/* binding */ instantiateNewProject),
/* harmony export */   "finalizeTaskEdits": () => (/* binding */ finalizeTaskEdits),
/* harmony export */   "finalizeProjectEdits": () => (/* binding */ finalizeProjectEdits),
/* harmony export */   "deleteTaskObject": () => (/* binding */ deleteTaskObject),
/* harmony export */   "deleteProjectObject": () => (/* binding */ deleteProjectObject)
/* harmony export */ });
/* harmony import */ var _pageLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageLoader.js */ "./src/pageLoader.js");


let projectsCreated = [
    {
        projectTitle: `todo list`,
        projectDateDue: `2021-06-20`,
        projectDescription: `this is a project for the odin project`,
        projectIndex: 0,
    },
    {
        projectTitle: `keep grinding`,
        projectDateDue: `2021-06-20`,
        projectDescription: `this is a test project for my buggy todo list app`,
        projectIndex: 1,
    },
];

let tasksCreated = [
    {
        taskTitle: `refactor code`,
        taskDateDue: `2021-06-20`,
        taskDescription: `clean it up, make logic more linear`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 0,
    },
    {
        taskTitle: `make progress`,
        taskDateDue: `2021-06-12`,
        taskDescription: `keep at it and stay positive`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 1,
    },
    {
        taskTitle: `do more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `do what you can, when you can`,
        taskPriorityStatus: `medium`,
        taskProjectAssociated: `default`,
        taskIndex: 2,
    },
    {
        taskTitle: `do even more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `carve out more time, if possible`,
        taskPriorityStatus: `low`,
        taskProjectAssociated: `keep grinding`,
        taskIndex: 3,
    }
];

function updateLocalStorage(objectType) {
    if (objectType === `task`) {
        window.localStorage.removeItem(`tasksCreated`);
        window.localStorage.setItem(`tasksCreated`, JSON.stringify(tasksCreated));
    } else {
        window.localStorage.removeItem(`projectsCreated`);
        window.localStorage.setItem(`projectsCreated`, JSON.stringify(projectsCreated));
    }
}

function getObjectArrays() {
    if (!window.localStorage.length) {
        window.localStorage.setItem(`projectsCreated`, JSON.stringify(projectsCreated));
        window.localStorage.setItem(`tasksCreated`, JSON.stringify(tasksCreated));
    }
    const taskArrays = {
        projects: JSON.parse(window.localStorage.getItem(`projectsCreated`)),
        tasks: JSON.parse(window.localStorage.getItem(`tasksCreated`)),
    }
    console.log(taskArrays.projects);
    console.log(taskArrays.tasks);
    return taskArrays
}

class Project {
    constructor(projectTitle, projectDateDue, projectDescription, projectIndex) {
        this.projectTitle = projectTitle;
        this.projectDateDue = projectDateDue;
        this.projectDescription = projectDescription;
        this.projectIndex = projectIndex;
    }
}

class Task {
    constructor(taskTitle, taskDateDue, taskDescription, taskPriorityStatus, taskProjectAssociated, taskIndex) {
        this.taskTitle = taskTitle;
        this.taskDateDue = taskDateDue;
        this.taskDescription = taskDescription;
        this.taskPriorityStatus = taskPriorityStatus;
        this.taskProjectAssociated = taskProjectAssociated;
        this.taskIndex = taskIndex;
    }
}

function instantiateNewTask(newTaskModalInputs, pageToRefresh) {
    
    const newTaskInputArray = Array.from(newTaskModalInputs);
    const newTaskTitle = newTaskInputArray[0].value;
    const newTaskDateDue = newTaskInputArray[1].value;
    const newTaskDescription = newTaskInputArray[2].value;
    const newTaskPriorityStatus = newTaskInputArray[3].value;
    const newTaskProjectAssociated = newTaskInputArray[4].value;
    const newTaskIndex = tasksCreated.length;
    
    const newTask = new Task(newTaskTitle, newTaskDateDue, newTaskDescription, newTaskPriorityStatus, newTaskProjectAssociated, newTaskIndex);
    tasksCreated.push(newTask);

    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === newTaskProjectAssociated);
    const tasksToLoad = taskFilter(newTaskProjectAssociated);
    
    updateLocalStorage(`task`);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}
        
function instantiateNewProject(newProjectModalInputs) {
    let isDisplayed = false;

    const newProjectInputArray = Array.from(newProjectModalInputs);
    const newProjectTitle = newProjectInputArray[0].value;
    const newProjectDateDue = newProjectInputArray[1].value;
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);

    updateLocalStorage(`project`);
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, newProject, null, isDisplayed);
}

function finalizeTaskEdits(editModalInputs, targetIndex, currentPageDisplayed) {
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = editModalInputs[1].value;
    const editedTaskDescription = editModalInputs[2].value;
    const editedTaskPriorityStatus = editModalInputs[3].value;
    const editedTaskProjectAssociated = editModalInputs[4].value;

    tasksCreated[targetIndex].taskTitle = editedTaskTitle;
    tasksCreated[targetIndex].taskDateDue = editedTaskDateDue;
    tasksCreated[targetIndex].taskDescription = editedTaskDescription;
    tasksCreated[targetIndex].taskPriorityStatus = editedTaskPriorityStatus;
    tasksCreated[targetIndex].taskProjectAssociated = editedTaskProjectAssociated;

    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

    updateLocalStorage(`task`);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}

function deleteTaskObject(indexOfTaskToDelete, currentPageDisplayed) {
    tasksCreated.splice(indexOfTaskToDelete, 1);
    updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed);
}

function updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed) {
    for (let i = indexOfTaskToDelete; i < tasksCreated.length; i++) {
        tasksCreated[i].taskIndex = i;
    }
    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

    updateLocalStorage(`task`);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}

function finalizeProjectEdits(editProjectModalInputs, targetProjectIndex, existingProjectTitle) {

    let tasksToLoad = null;
    const editedProjectTitle = editProjectModalInputs[0].value;
    const editedProjectDateDue = editProjectModalInputs[1].value;
    const editedProjectDescription = editProjectModalInputs[2].value;

    projectsCreated[targetProjectIndex].projectTitle = editedProjectTitle;
    projectsCreated[targetProjectIndex].projectDateDue = editedProjectDateDue;
    projectsCreated[targetProjectIndex].projectDescription = editedProjectDescription

    // if a project's title changes, this updates all associated tasks' taskProjectAssociated data to the new project title 
    if (editedProjectTitle !== existingProjectTitle) {
        tasksToLoad = taskFilter(existingProjectTitle);
        tasksToLoad.forEach( taskObject => {
            taskObject.taskProjectAssociated = editedProjectTitle;
        })
        updateLocalStorage(`task`);
    } else {
        tasksToLoad = taskFilter(existingProjectTitle);
    }

    updateLocalStorage(`project`);
    loadContentHelper(projectsCreated[targetProjectIndex], tasksToLoad);
}

function deleteProjectObject(projectToDeleteTitle, projectToDeleteIndex) {
    let taskIndexForDeletion = [];
    tasksCreated.filter( (object, index) => {
        if (object.taskProjectAssociated === projectToDeleteTitle) {
            taskIndexForDeletion.push(index);
        }
    })
    
    // deletes the tasks associated with the deleted project and updates the remaining task indices
    for (let i = taskIndexForDeletion.length; i >= 1; i--) {
        tasksCreated.splice(taskIndexForDeletion[i-1], 1);
        for (let j = i - 1; j < tasksCreated.length; j++) {
            tasksCreated[j].taskIndex = j;
        }
    }

    projectsCreated.splice(projectToDeleteIndex, 1);

    updateProjectIndex(projectToDeleteIndex);
}

function updateProjectIndex(indexOfDeletedProject) {
    for (let i = indexOfDeletedProject; i < projectsCreated.length; i++) {
        projectsCreated[i].projectIndex = i;
    }

    updateLocalStorage(`task`);
    updateLocalStorage(`project`);
    loadContentHelper(null, tasksCreated);
}

function taskFilter(projectAssociatedTitle) {
    let tasksAssociated = [];
    tasksCreated.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectAssociatedTitle) {
            tasksAssociated.push(taskObject);
        }
    })
    return tasksAssociated
}

function loadContentHelper(projectObjectToLoad, tasksArrayToLoad) {
    if (!projectObjectToLoad) {
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, null, tasksCreated, `overview`);
    } else {
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, projectObjectToLoad, tasksArrayToLoad, projectObjectToLoad.projectTitle);
    }
}



/***/ }),

/***/ "./src/pageLoader.js":
/*!***************************!*\
  !*** ./src/pageLoader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadMainContent": () => (/* binding */ loadMainContent)
/* harmony export */ });
const mainContainer = document.querySelector(`#main-content`);

function loadMainContent(projectsArray, projectToLoad, tasksArray, pageToDisplay) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild)
    }
    if (pageToDisplay === `overview`) {
        const containerToDisplay = displayTasksOverview(tasksArray);
        mainContainer.appendChild(containerToDisplay);
    } else if (!pageToDisplay) {
        const containerToDisplay = displayProject(projectToLoad)
        mainContainer.appendChild(containerToDisplay);
    } else {
        const containerToDisplay = displayExistingProject(projectToLoad, tasksArray)
        mainContainer.appendChild(containerToDisplay);
    }
    projectButtonsAndSelectorsHandler(projectsArray)
}

function displayTasksOverview(arrayOfTaskObjects) {
    const overviewContainer = document.createElement(`div`);
    const overviewTitle = document.createElement(`h2`);
    overviewTitle.textContent = `overview`;
    overviewTitle.setAttribute(`id`, `overview-header`);
    overviewContainer.classList.add(`project-container`);
    overviewContainer.appendChild(overviewTitle);
    
    const tasksToDisplay = displayTasks(arrayOfTaskObjects, overviewContainer, true)
    
    return tasksToDisplay
}

function displayTasks(arrayOfTaskObjects, container, toDisplayProjectAssociation) {
    const allTasksContainer = document.createElement(`div`);
    allTasksContainer.classList.add(`project-tasks-container`);

    const taskHeader = document.createElement(`div`);
    taskHeader.setAttribute(`id`, `task-header`);
    const headerTitleLabel = document.createElement(`h5`);
    const headerDueDateLabel = document.createElement(`h5`);
    const headerDescriptionLabel = document.createElement(`h5`);
    const headerPriorityLabel = document.createElement(`h5`);
    const headerProjectAssociatedLabel = document.createElement(`h5`);
    headerTitleLabel.textContent = `task`;
    headerDueDateLabel.textContent = `due date`;
    headerDescriptionLabel.textContent = `description`;
    headerPriorityLabel.textContent = `priority`;
    headerProjectAssociatedLabel.textContent = `associated project`;

    taskHeader.appendChild(headerTitleLabel);
    taskHeader.appendChild(headerDueDateLabel);
    taskHeader.appendChild(headerDescriptionLabel);
    taskHeader.appendChild(headerPriorityLabel);
    if (toDisplayProjectAssociation) {
        taskHeader.setAttribute(`id`, `overview-task-header`);
        taskHeader.appendChild(headerProjectAssociatedLabel);
    }

    allTasksContainer.appendChild(taskHeader);
    
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const newTaskContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h4`);
        const taskDueDate = document.createElement(`p`);
        const taskDescription = document.createElement(`p`);
        const taskPriorityStatus = document.createElement(`p`);
        const taskProjectAssociated = document.createElement(`p`);
        const taskEditButton = document.createElement(`button`);
        const taskDeleteButton = document.createElement(`button`);
        
        newTaskContainer.classList.add(`task-container`);
        newTaskContainer.setAttribute(`data-index-number`, `${arrayOfTaskObjects[i].taskIndex}`);
        taskTitle.textContent = arrayOfTaskObjects[i].taskTitle;
        taskDueDate.textContent = arrayOfTaskObjects[i].taskDateDue;
        taskDescription.textContent = arrayOfTaskObjects[i].taskDescription;
        taskPriorityStatus.textContent = arrayOfTaskObjects[i].taskPriorityStatus;
        taskProjectAssociated.textContent = arrayOfTaskObjects[i].taskProjectAssociated;
        taskEditButton.textContent = `edit`;
        taskEditButton.classList.add(`edit-task-btn`);
        taskDeleteButton.textContent = `delete`;
        taskDeleteButton.classList.add(`delete-task-btn`);

        newTaskContainer.appendChild(taskTitle);
        newTaskContainer.appendChild(taskDueDate);
        newTaskContainer.appendChild(taskDescription);
        newTaskContainer.appendChild(taskPriorityStatus);
        if (toDisplayProjectAssociation) {
            newTaskContainer.setAttribute(`id`, `overview-task-container`);
            newTaskContainer.appendChild(taskProjectAssociated);
        }
        newTaskContainer.appendChild(taskEditButton);
        newTaskContainer.appendChild(taskDeleteButton);

        allTasksContainer.appendChild(newTaskContainer);
    }
    
    container.appendChild(allTasksContainer);
    return container
}

function displayProject(projectObject) {
    const projectContainer = document.createElement(`div`);
    const projectInfoContainer = document.createElement(`div`);
    const projectInfoHeader = document.createElement(`div`);
    const projectTitleLabel = document.createElement(`label`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectInfoContainer.classList.add(`project-info-container`);
    projectInfoHeader.classList.add(`project-info-header`);
    projectTitleLabel.classList.add(`project-title-header`);
    projectDueDate.classList.add(`project-date-due`);
    projectDescription.classList.add(`project-description`);
    projectContainer.setAttribute(`data-index-number`, `${projectObject.projectIndex}`);
    projectTitleLabel.textContent = `project:`;
    projectTitle.textContent = projectObject.projectTitle;
    projectDueDate.textContent = `due: ${projectObject.projectDateDue}`;
    projectDescription.textContent = `description: ${projectObject.projectDescription}`;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.classList.add(`edit-project-btn`);
    projectDeleteButton.classList.add(`delete-project-btn`);

    projectTitleLabel.appendChild(projectTitle);

    projectInfoHeader.appendChild(projectTitleLabel);
    projectInfoHeader.appendChild(projectDueDate);
    projectInfoHeader.appendChild(projectEditButton);
    projectInfoHeader.appendChild(projectDeleteButton);

    projectInfoContainer.appendChild(projectInfoHeader);
    projectInfoContainer.appendChild(projectDescription);

    projectContainer.appendChild(projectInfoContainer);

    return projectContainer
}

function displayExistingProject(projectToDisplayObject, projectTasksArray) {
    const projectContainerDisplayed = displayProject(projectToDisplayObject);
    const projectTasks = displayTasks(projectTasksArray, projectContainerDisplayed, false);
    return projectTasks
}

// this "module" re-loads the buttons and selectors every pageLoad with updated projectsCreated data
function projectButtonsAndSelectorsHandler(projectsCreatedArray) {
    const projectListHead = document.querySelector(`#project-list`);
    const addTaskProjectSelector = document.querySelector(`#project-associated`);
    const editTaskProjectSelector = document.querySelector(`#edit-project-associated`);
    const projectsArray = projectsCreatedArray;

    function removeExistingElements(projectList, addSelector, editSelector) {
        const arrayOfContainers = [projectList, addSelector, editSelector];

        arrayOfContainers.forEach( (container) => {
            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }
        })
    }

    function appendProjectButtonsToProjectList() {

        projectsArray.forEach( (projectObject) => {
            const newProjectButton = document.createElement(`button`);
            newProjectButton.textContent = projectObject.projectTitle;
            newProjectButton.setAttribute(`id`, projectObject.projectTitle);
            newProjectButton.setAttribute(`data-index-number`, projectObject.projectIndex);
            newProjectButton.classList.add(`projectListButton`);
            
            projectListHead.appendChild(newProjectButton);
        })
    }

    function appendProjectsToSelectors() {
        const defaultProjectForAddTaskSelector = document.createElement(`option`);
        defaultProjectForAddTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForAddTaskSelector.textContent = `overview (default)`;
        addTaskProjectSelector.appendChild(defaultProjectForAddTaskSelector);
        
        const currentProjectAssociatedInEditModal = document.createElement(`option`);
        currentProjectAssociatedInEditModal.setAttribute(`id`, `existing-project`);
        const defaultProjectForEditTaskSelector = document.createElement(`option`);
        defaultProjectForEditTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForEditTaskSelector.textContent = `overview (default)`;

        editTaskProjectSelector.appendChild(currentProjectAssociatedInEditModal);
        editTaskProjectSelector.appendChild(defaultProjectForEditTaskSelector);
        
        projectsArray.forEach( (projectObject) => {
            const projectForAddTaskSelector = document.createElement(`option`);
            projectForAddTaskSelector.setAttribute(`value`, projectObject.projectTitle);
            projectForAddTaskSelector.textContent = projectObject.projectTitle;
            
            const projectForEditTaskSelector = document.createElement(`option`);
            projectForEditTaskSelector.setAttribute(`value`, projectObject.projectTitle);
            projectForEditTaskSelector.textContent = projectObject.projectTitle;
        
            addTaskProjectSelector.appendChild(projectForAddTaskSelector);
            editTaskProjectSelector.appendChild(projectForEditTaskSelector);
        })
    }
    removeExistingElements(projectListHead, addTaskProjectSelector, editTaskProjectSelector);
    appendProjectButtonsToProjectList();
    appendProjectsToSelectors();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataModalHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataModalHandler.js */ "./src/dataModalHandler.js");
/* harmony import */ var _objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectDataManagement.js */ "./src/objectDataManagement.js");
/* harmony import */ var _pageLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageLoader.js */ "./src/pageLoader.js");




const navContainer = document.querySelector(`#nav-container`);
const projectButton = document.querySelector(`#project-button`);
const projectListContainer = document.querySelector(`#project-list`);

navContainer.addEventListener(`click`, pageSelector);
projectButton.addEventListener(`click`, (e) => console.log(e.target.textContent));
projectListContainer.addEventListener(`click`, (e) => {
    if (e.target.className === `projectListButton`) {
        projectSelector(e)
    }
});

// window.localStorage.removeItem(`projectsCreated`);
// window.localStorage.removeItem(`tasksCreated`);

const loadPage = (function() {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
        console.log(currentObjectArray);
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    console.log(currentObjectArray);
    const projectClickedTitle = e.target.textContent;
    const projectClickedIndex = e.target.dataset.indexNumber;

    let associatedTasksToLoad = [];
    currentObjectArray.tasks.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectClickedTitle) {
            associatedTasksToLoad.push(taskObject);
        }
    })

    ;(0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, currentObjectArray.projects[projectClickedIndex], associatedTasksToLoad, projectClickedTitle);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLCtFQUFxQjtBQUM3QjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsUUFBUSw0RUFBa0I7QUFDMUI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLDBFQUFnQjtBQUN4QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSwrQkFBK0IseUVBQWU7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msb0RBQW9EO0FBQ25HLCtDQUErQyxzREFBc0Q7QUFDckcsK0NBQStDLDBEQUEwRDtBQUN6RztBQUNBLHdEQUF3RCw2REFBNkQ7QUFDckgsZ0RBQWdELDZEQUE2RDtBQUM3Ryx1REFBdUQsZ0VBQWdFO0FBQ3ZIO0FBQ0EsNkRBQTZELGdFQUFnRTtBQUM3SCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJFQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBLCtCQUErQix5RUFBZTs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELDZEQUE2RDtBQUMvRyxrREFBa0QsK0RBQStEO0FBQ2pILGtEQUFrRCxtRUFBbUU7QUFDckg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOEVBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2RUFBbUI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN05pRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSwrREFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyx5QkFBeUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBLDJCQUEyQix5QkFBeUI7QUFDcEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsNEJBQTRCO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsK0RBQWU7QUFDdkIsS0FBSztBQUNMLFFBQVEsK0RBQWU7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pQQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQThELGdDQUFnQztBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELDJCQUEyQjtBQUNyRjtBQUNBO0FBQ0EseUNBQXlDLDZCQUE2QjtBQUN0RSxxREFBcUQsaUNBQWlDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ2pOQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQzZCO0FBQ1Y7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUMsSUFBSSwrREFBZTtBQUNuQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5RUFBZTtBQUNsRDtBQUNBLFFBQVEsK0RBQWU7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLCtCQUErQix5RUFBZTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxnRUFBZTtBQUNuQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRPYmplY3RBcnJheXMsIGluc3RhbnRpYXRlTmV3VGFzaywgaW5zdGFudGlhdGVOZXdQcm9qZWN0LCBmaW5hbGl6ZVRhc2tFZGl0cywgZmluYWxpemVQcm9qZWN0RWRpdHMsIGRlbGV0ZVRhc2tPYmplY3QsIGRlbGV0ZVByb2plY3RPYmplY3QgfSBmcm9tICcuL29iamVjdERhdGFNYW5hZ2VtZW50LmpzJ1xuXG4vLyBzZXRzIHRoZSBkZWZhdWx0IGRhdGUgaW4gdGhlIGFkZFRhc2sgYW5kIGFkZFByb2plY3QgbW9kYWxzIHRvIHRvZGF5J3MgZGF0ZVxuRGF0ZS5wcm90b3R5cGUudG9EYXRlSW5wdXRWYWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgbG9jYWwgPSBuZXcgRGF0ZSh0aGlzKTtcbiAgICBsb2NhbC5zZXRNaW51dGVzKHRoaXMuZ2V0TWludXRlcygpIC0gdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKTtcbiAgICByZXR1cm4gbG9jYWwudG9KU09OKCkuc2xpY2UoMCwxMCk7XG59KTtcblxuLy8gdGhpcyBzZWN0aW9uIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGFkZFRhc2sgYW5kIGFkZFByb2plY3QgZm9ybSBtb2RhbHNcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkVGFza0J1dHRvbmApO1xuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRQcm9qZWN0QnV0dG9uYCk7XG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBvcGVuTmV3T2JqZWN0TW9kYWwpO1xuXG5jb25zdCBwcm9qZWN0VXNlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnByb2plY3RVc2VySW5wdXRzYCk7XG5jb25zdCB0YXNrVXNlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnRhc2tVc2VySW5wdXRzYCk7XG5cbmZ1bmN0aW9uIG9wZW5OZXdPYmplY3RNb2RhbChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBhZGRPYmplY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tb2RhbGApO1xuICAgIGlmIChlLnRhcmdldC5pZCA9PT0gYGFkZFRhc2tCdXR0b25gKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay1kYXRlRHVlJykudmFsdWUgPSBuZXcgRGF0ZSgpLnRvRGF0ZUlucHV0VmFsdWUoKTsgICAgXG4gICAgICAgIGFkZE9iamVjdE1vZGFsWzBdLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcHJvamVjdC1kYXRlRHVlJykudmFsdWUgPSBuZXcgRGF0ZSgpLnRvRGF0ZUlucHV0VmFsdWUoKTtcbiAgICAgICAgYWRkT2JqZWN0TW9kYWxbMl0uc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgfVxufVxuXG5jb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFByb2plY3RTdWJtaXRCdXR0b25gKTtcbmNvbnN0IHN1Ym1pdFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkVGFza1N1Ym1pdEJ1dHRvbmApO1xuY29uc3QgY2FuY2VsUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0YCk7XG5jb25zdCBjYW5jZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tgKTtcblxuY2FuY2VsUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjbG9zZU5ld09iamVjdE1vZGFsKGUudGFyZ2V0LmlkKSk7XG5jYW5jZWxUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNsb3NlTmV3T2JqZWN0TW9kYWwoZS50YXJnZXQuaWQpKTtcblxuc3VibWl0UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24ocHJvamVjdFVzZXJJbnB1dCkpIHtcbiAgICAgICAgaW5zdGFudGlhdGVOZXdQcm9qZWN0KHByb2plY3RVc2VySW5wdXQpO1xuICAgICAgICBzdWJtaXROZXdPYmplY3RGb3JtKGUpO1xuICAgIH1cbn0pXG5cbnN1Ym1pdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKHRhc2tVc2VySW5wdXQpKSB7XG4gICAgICAgIGluc3RhbnRpYXRlTmV3VGFzayh0YXNrVXNlcklucHV0KTtcbiAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBzdWJtaXROZXdPYmplY3RGb3JtKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbG9zZU5ld09iamVjdE1vZGFsKGV2ZW50LnRhcmdldC5pZCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTmV3T2JqZWN0TW9kYWwoYnV0dG9uSUQpIHtcbiAgICBjb25zdCBtb2RhbFRvQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxgKTtcbiAgICBjb25zdCBmb3JtVG9SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5mb3JtRmllbGRgKTtcbiAgICBpZiAoYnV0dG9uSUQgPT09IGBhZGRQcm9qZWN0U3VibWl0QnV0dG9uYCB8fCBidXR0b25JRCA9PT0gYGNhbmNlbFByb2plY3RgKSB7XG4gICAgICAgIG1vZGFsVG9DbG9zZVsyXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICBmb3JtVG9SZXNldFsyXS5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGFsVG9DbG9zZVswXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICBmb3JtVG9SZXNldFswXS5yZXNldCgpO1xuICAgIH1cbn1cblxuLy8gdGhpcyBzZWN0aW9uIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGVkaXRUYXNrIGFuZCBlZGl0UHJvamVjdCBmb3JtIG1vZGFsc1xuY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcbm1haW5Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gbWFpbkNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgaWYgKGN1cnJlbnRQYWdlICE9PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlID0gbWFpbkNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBlZGl0LXRhc2stYnRuYCkge1xuICAgICAgICBjb25zdCB0YXNrU2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkVkaXRUYXNrTW9kYWwodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGRlbGV0ZS10YXNrLWJ0bmApIHtcbiAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIGRlbGV0ZVRhc2tPYmplY3QodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGVkaXQtcHJvamVjdC1idG5gKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5maXJzdENoaWxkLmxhc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICBvcGVuRWRpdFByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXByb2plY3QtYnRuYCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZC5sYXN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBvcGVuRWRpdFRhc2tNb2RhbCh0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSkge1xuICAgIFxuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIFxuICAgIGNvbnN0IGVkaXRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRhc2tNb2RhbGApO1xuICAgIGVkaXRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgXG4gICAgLy8gPC0tLS0tLS0gcHJlLXBvcHVsYXRlIHRoZSBlZGl0TW9kYWwgaW5wdXRzIHdpdGggZXhpc3RpbmcgZGF0YSAtLS0tLS0tLS0tLS0tLT5cbiAgICBjb25zdCBlZGl0VGFza0lucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0VGFza0lucHV0c2ApO1xuICAgIGNvbnN0IHByZXBvcHVsYXRlUHJvamVjdEluTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXhpc3RpbmctcHJvamVjdGApO1xuICAgIGNvbnN0IHByZXBvcHVsYXRlUHJpb3JpdHlJbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V4aXN0aW5nLXN0YXR1c2ApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrVGl0bGV9YCk7XG4gICAgZWRpdFRhc2tJbnB1dHNbMV0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tEYXRlRHVlfWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb259YCk7XG4gICAgZWRpdFRhc2tJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb247XG4gICAgcHJlcG9wdWxhdGVQcmlvcml0eUluTW9kYWwuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcmlvcml0eVN0YXR1c31gKVxuICAgIHByZXBvcHVsYXRlUHJpb3JpdHlJbk1vZGFsLnRleHRDb250ZW50ID0gYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1ByaW9yaXR5U3RhdHVzfSBwcmlvcml0eWA7XG4gICAgcHJlcG9wdWxhdGVQcm9qZWN0SW5Nb2RhbC5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkfWApO1xuICAgIGlmIChjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IGBkZWZhdWx0YCkge1xuICAgICAgICBwcmVwb3B1bGF0ZVByb2plY3RJbk1vZGFsLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3ICgke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZH0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcmVwb3B1bGF0ZVByb2plY3RJbk1vZGFsLnRleHRDb250ZW50ID0gY3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgIH1cbiAgICAvLyA8LS0tLS0tLSBlbmQgb2YgcHJlLXBvcHVsYXRpbmcgdGhlIGVkaXRNb2RhbCBpbnB1dHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxuXG4gICAgY29uc3QgY29uZmlybVRhc2tFZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0VGFza1N1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbmZpcm1UYXNrRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtVGFza0VkaXRzSGFuZGxlcilcbiAgICBcbiAgICBmdW5jdGlvbiBjb25maXJtVGFza0VkaXRzSGFuZGxlcihlKSB7XG4gICAgICAgIGNvbmZpcm1UYXNrRWRpdHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtVGFza0VkaXRzSGFuZGxlcik7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRUYXNrSW5wdXRzKSkge1xuICAgICAgICAgICAgZmluYWxpemVUYXNrRWRpdHMoZWRpdFRhc2tJbnB1dHMsIHRhc2tUb0VkaXRJbmRleCwgcGFnZURpc3BsYXllZFRpdGxlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYW5jZWxUYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsVGFza0VkaXRgKTtcbiAgICBjYW5jZWxUYXNrRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBjb25maXJtVGFza0VkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RUb0VkaXRUaXRsZSwgcHJvamVjdFRvRWRpdEluZGV4KSB7XG4gICAgXG4gICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG5cbiAgICBjb25zdCBlZGl0UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0TW9kYWxgKTtcbiAgICBlZGl0UHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIFxuICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgZWRpdCBmb3JtIHdpdGggZXhpc3RpbmcgZGF0YVxuICAgIGNvbnN0IGVkaXRQcm9qZWN0SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmVkaXRQcm9qZWN0SW5wdXRzYCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMF0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3RUaXRsZX1gKTtcbiAgICBlZGl0UHJvamVjdElucHV0c1sxXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdERhdGVEdWV9YCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMl0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3REZXNjcmlwdGlvbn1gKTtcbiAgICBlZGl0UHJvamVjdElucHV0c1syXS50ZXh0Q29udGVudCA9IGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3REZXNjcmlwdGlvbjtcbiAgICBcbiAgICBjb25zdCBjb25maXJtUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0U3VibWl0QnV0dG9uYCk7XG4gICAgY29uZmlybVByb2plY3RFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RWRpdHNIYW5kbGVyKVxuICAgIFxuICAgIGZ1bmN0aW9uIGNvbmZpcm1Qcm9qZWN0RWRpdHNIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uZmlybVByb2plY3RFZGl0cy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RWRpdHNIYW5kbGVyKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24oZWRpdFByb2plY3RJbnB1dHMpKSB7XG4gICAgICAgICAgICBmaW5hbGl6ZVByb2plY3RFZGl0cyhlZGl0UHJvamVjdElucHV0cywgcHJvamVjdFRvRWRpdEluZGV4LCBwcm9qZWN0VG9FZGl0VGl0bGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0UHJvamVjdE1vZGFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjYW5jZWxQcm9qZWN0RWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdEVkaXRgKTtcbiAgICBjYW5jZWxQcm9qZWN0RWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBjb25maXJtUHJvamVjdEVkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVByb2plY3RFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgfSlcbiAgICBcbn1cblxuZnVuY3Rpb24gb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0VG9EZWxldGVUaXRsZSwgcHJvamVjdFRvRGVsZXRlSW5kZXgpIHtcbiAgICBcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybURlbGV0ZVByb2plY3RgKVxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm0tZGVsZXRlLXRleHRgKTtcbiAgICBkZWxldGVQcm9qZWN0TWVzc2FnZS50ZXh0Q29udGVudCA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdCBhbmQgYWxsIG9mIGl0cyBhc3NvY2lhdGVkIHRhc2tzP2A7XG4gICAgXG4gICAgY29uc3QgY29uZmlybURlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtUHJvamVjdERlbGV0ZWApO1xuICAgIGNvbnN0IGNhbmNlbERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0RGVsZXRlYCk7XG4gICAgXG4gICAgY29uZmlybURlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCBgY2xpY2tgLCBjb25maXJtUHJvamVjdERlbGV0ZUhhbmRsZXIpXG4gICAgXG4gICAgZnVuY3Rpb24gY29uZmlybVByb2plY3REZWxldGVIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uZmlybURlbGV0ZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RGVsZXRlSGFuZGxlcik7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdE9iamVjdChwcm9qZWN0VG9EZWxldGVUaXRsZSwgcHJvamVjdFRvRGVsZXRlSW5kZXgpO1xuICAgIH1cbiAgICBcbiAgICBjYW5jZWxEZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY29uZmlybURlbGV0ZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RGVsZXRlSGFuZGxlcik7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICB9KVxuICAgIFxuICAgIGRlbGV0ZVByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbn1cblxuZnVuY3Rpb24gY2xvc2VFZGl0T3JEZWxldGVNb2RhbChtb2RhbFRvQ2xvc2UpIHtcbiAgICBjb25zdCBmb3JtVG9SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5mb3JtRmllbGRgKTtcbiAgICBtb2RhbFRvQ2xvc2Uuc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICBpZiAobW9kYWxUb0Nsb3NlID09PSBlZGl0VGFza01vZGFsKSB7XG4gICAgICAgIGZvcm1Ub1Jlc2V0WzFdLnJlc2V0KCk7XG4gICAgfSBlbHNlIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRQcm9qZWN0TW9kYWwpIHtcbiAgICAgICAgZm9ybVRvUmVzZXRbM10ucmVzZXQoKTtcbiAgICB9XG59XG5cbi8vIHRoaXMgZnVuY3Rpb24gdmFsaWRhdGVzIGJvdGggdHlwZXMgb2YgbW9kYWxzOiBhZGQgYW5kIGVkaXRcbmZ1bmN0aW9uIGNoZWNrRm9ybVZhbGlkYXRpb24oaW5wdXROb2RlTGlzdCkge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICBpbnB1dE5vZGVMaXN0LmZvckVhY2goIGlucHV0RmllbGQgPT4ge1xuICAgICAgICBpZiAoaW5wdXRGaWVsZC52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzVmFsaWRcbn0iLCJpbXBvcnQgeyBsb2FkTWFpbkNvbnRlbnQgfSBmcm9tICcuL3BhZ2VMb2FkZXIuanMnXG5cbmxldCBwcm9qZWN0c0NyZWF0ZWQgPSBbXG4gICAge1xuICAgICAgICBwcm9qZWN0VGl0bGU6IGB0b2RvIGxpc3RgLFxuICAgICAgICBwcm9qZWN0RGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb246IGB0aGlzIGlzIGEgcHJvamVjdCBmb3IgdGhlIG9kaW4gcHJvamVjdGAsXG4gICAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvamVjdFRpdGxlOiBga2VlcCBncmluZGluZ2AsXG4gICAgICAgIHByb2plY3REYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0IHByb2plY3QgZm9yIG15IGJ1Z2d5IHRvZG8gbGlzdCBhcHBgLFxuICAgICAgICBwcm9qZWN0SW5kZXg6IDEsXG4gICAgfSxcbl07XG5cbmxldCB0YXNrc0NyZWF0ZWQgPSBbXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGByZWZhY3RvciBjb2RlYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgY2xlYW4gaXQgdXAsIG1ha2UgbG9naWMgbW9yZSBsaW5lYXJgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBoaWdoYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgdGFza0luZGV4OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGBtYWtlIHByb2dyZXNzYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTEyYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBga2VlcCBhdCBpdCBhbmQgc3RheSBwb3NpdGl2ZWAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGhpZ2hgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGB0b2RvIGxpc3RgLFxuICAgICAgICB0YXNrSW5kZXg6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYGRvIG1vcmVgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMTNgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGBkbyB3aGF0IHlvdSBjYW4sIHdoZW4geW91IGNhbmAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYG1lZGl1bWAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYGRlZmF1bHRgLFxuICAgICAgICB0YXNrSW5kZXg6IDIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYGRvIGV2ZW4gbW9yZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xM2AsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYGNhcnZlIG91dCBtb3JlIHRpbWUsIGlmIHBvc3NpYmxlYCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgbG93YCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBga2VlcCBncmluZGluZ2AsXG4gICAgICAgIHRhc2tJbmRleDogMyxcbiAgICB9XG5dO1xuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2Uob2JqZWN0VHlwZSkge1xuICAgIGlmIChvYmplY3RUeXBlID09PSBgdGFza2ApIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGB0YXNrc0NyZWF0ZWRgKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0YXNrc0NyZWF0ZWRgLCBKU09OLnN0cmluZ2lmeSh0YXNrc0NyZWF0ZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHByb2plY3RzQ3JlYXRlZGApO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYHByb2plY3RzQ3JlYXRlZGAsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzQ3JlYXRlZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0QXJyYXlzKCkge1xuICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGgpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0c0NyZWF0ZWRgLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0NyZWF0ZWQpKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0YXNrc0NyZWF0ZWRgLCBKU09OLnN0cmluZ2lmeSh0YXNrc0NyZWF0ZWQpKTtcbiAgICB9XG4gICAgY29uc3QgdGFza0FycmF5cyA9IHtcbiAgICAgICAgcHJvamVjdHM6IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGBwcm9qZWN0c0NyZWF0ZWRgKSksXG4gICAgICAgIHRhc2tzOiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgdGFza3NDcmVhdGVkYCkpLFxuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0YXNrQXJyYXlzLnByb2plY3RzKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrQXJyYXlzLnRhc2tzKTtcbiAgICByZXR1cm4gdGFza0FycmF5c1xufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0VGl0bGUsIHByb2plY3REYXRlRHVlLCBwcm9qZWN0RGVzY3JpcHRpb24sIHByb2plY3RJbmRleCkge1xuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGF0ZUR1ZSA9IHByb2plY3REYXRlRHVlO1xuICAgICAgICB0aGlzLnByb2plY3REZXNjcmlwdGlvbiA9IHByb2plY3REZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgfVxufVxuXG5jbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrVGl0bGUsIHRhc2tEYXRlRHVlLCB0YXNrRGVzY3JpcHRpb24sIHRhc2tQcmlvcml0eVN0YXR1cywgdGFza1Byb2plY3RBc3NvY2lhdGVkLCB0YXNrSW5kZXgpIHtcbiAgICAgICAgdGhpcy50YXNrVGl0bGUgPSB0YXNrVGl0bGU7XG4gICAgICAgIHRoaXMudGFza0RhdGVEdWUgPSB0YXNrRGF0ZUR1ZTtcbiAgICAgICAgdGhpcy50YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMudGFza1ByaW9yaXR5U3RhdHVzID0gdGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0aGlzLnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IHRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICAgICAgdGhpcy50YXNrSW5kZXggPSB0YXNrSW5kZXg7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Rhc2sobmV3VGFza01vZGFsSW5wdXRzLCBwYWdlVG9SZWZyZXNoKSB7XG4gICAgXG4gICAgY29uc3QgbmV3VGFza0lucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Rhc2tNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3VGFza1RpdGxlID0gbmV3VGFza0lucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0RhdGVEdWUgPSBuZXdUYXNrSW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrRGVzY3JpcHRpb24gPSBuZXdUYXNrSW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMgPSBuZXdUYXNrSW5wdXRBcnJheVszXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQgPSBuZXdUYXNrSW5wdXRBcnJheVs0XS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrSW5kZXggPSB0YXNrc0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhuZXdUYXNrVGl0bGUsIG5ld1Rhc2tEYXRlRHVlLCBuZXdUYXNrRGVzY3JpcHRpb24sIG5ld1Rhc2tQcmlvcml0eVN0YXR1cywgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkLCBuZXdUYXNrSW5kZXgpO1xuICAgIHRhc2tzQ3JlYXRlZC5wdXNoKG5ld1Rhc2spO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIobmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuICAgICAgICBcbmZ1bmN0aW9uIGluc3RhbnRpYXRlTmV3UHJvamVjdChuZXdQcm9qZWN0TW9kYWxJbnB1dHMpIHtcbiAgICBsZXQgaXNEaXNwbGF5ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdQcm9qZWN0TW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RUaXRsZSA9IG5ld1Byb2plY3RJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3REYXRlRHVlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERlc2NyaXB0aW9uID0gbmV3UHJvamVjdElucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdEluZGV4ID0gcHJvamVjdHNDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QobmV3UHJvamVjdFRpdGxlLCBuZXdQcm9qZWN0RGF0ZUR1ZSwgbmV3UHJvamVjdERlc2NyaXB0aW9uLCBuZXdQcm9qZWN0SW5kZXgpO1xuICAgIHByb2plY3RzQ3JlYXRlZC5wdXNoKG5ld1Byb2plY3QpO1xuXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBwcm9qZWN0YCk7XG4gICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgbmV3UHJvamVjdCwgbnVsbCwgaXNEaXNwbGF5ZWQpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVRhc2tFZGl0cyhlZGl0TW9kYWxJbnB1dHMsIHRhcmdldEluZGV4LCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIGNvbnN0IGVkaXRlZFRhc2tUaXRsZSA9IGVkaXRNb2RhbElucHV0c1swXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGF0ZUR1ZSA9IGVkaXRNb2RhbElucHV0c1sxXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGVzY3JpcHRpb24gPSBlZGl0TW9kYWxJbnB1dHNbMl0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza1ByaW9yaXR5U3RhdHVzID0gZWRpdE1vZGFsSW5wdXRzWzNdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRNb2RhbElucHV0c1s0XS52YWx1ZTtcblxuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1RpdGxlID0gZWRpdGVkVGFza1RpdGxlO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza0RhdGVEdWUgPSBlZGl0ZWRUYXNrRGF0ZUR1ZTtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tEZXNjcmlwdGlvbiA9IGVkaXRlZFRhc2tEZXNjcmlwdGlvbjtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tQcmlvcml0eVN0YXR1cyA9IGVkaXRlZFRhc2tQcmlvcml0eVN0YXR1cztcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRlZFRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcblxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGB0YXNrYCk7XG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFza09iamVjdChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIHRhc2tzQ3JlYXRlZC5zcGxpY2UoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgMSk7XG4gICAgdXBkYXRlVGFza0luZGV4KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFza0luZGV4KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4T2ZUYXNrVG9EZWxldGU7IGkgPCB0YXNrc0NyZWF0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFza3NDcmVhdGVkW2ldLnRhc2tJbmRleCA9IGk7XG4gICAgfVxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGB0YXNrYCk7XG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cblxuZnVuY3Rpb24gZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RNb2RhbElucHV0cywgdGFyZ2V0UHJvamVjdEluZGV4LCBleGlzdGluZ1Byb2plY3RUaXRsZSkge1xuXG4gICAgbGV0IHRhc2tzVG9Mb2FkID0gbnVsbDtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0VGl0bGUgPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzBdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3REYXRlRHVlID0gZWRpdFByb2plY3RNb2RhbElucHV0c1sxXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0RGVzY3JpcHRpb24gPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzJdLnZhbHVlO1xuXG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdFRpdGxlID0gZWRpdGVkUHJvamVjdFRpdGxlO1xuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3REYXRlRHVlID0gZWRpdGVkUHJvamVjdERhdGVEdWU7XG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdERlc2NyaXB0aW9uID0gZWRpdGVkUHJvamVjdERlc2NyaXB0aW9uXG5cbiAgICAvLyBpZiBhIHByb2plY3QncyB0aXRsZSBjaGFuZ2VzLCB0aGlzIHVwZGF0ZXMgYWxsIGFzc29jaWF0ZWQgdGFza3MnIHRhc2tQcm9qZWN0QXNzb2NpYXRlZCBkYXRhIHRvIHRoZSBuZXcgcHJvamVjdCB0aXRsZSBcbiAgICBpZiAoZWRpdGVkUHJvamVjdFRpdGxlICE9PSBleGlzdGluZ1Byb2plY3RUaXRsZSkge1xuICAgICAgICB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoZXhpc3RpbmdQcm9qZWN0VGl0bGUpO1xuICAgICAgICB0YXNrc1RvTG9hZC5mb3JFYWNoKCB0YXNrT2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHRhc2tPYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdGVkUHJvamVjdFRpdGxlO1xuICAgICAgICB9KVxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoZXhpc3RpbmdQcm9qZWN0VGl0bGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgcHJvamVjdGApO1xuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgbGV0IHRhc2tJbmRleEZvckRlbGV0aW9uID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKG9iamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKG9iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IHByb2plY3RUb0RlbGV0ZVRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrSW5kZXhGb3JEZWxldGlvbi5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgLy8gZGVsZXRlcyB0aGUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHRoZSBkZWxldGVkIHByb2plY3QgYW5kIHVwZGF0ZXMgdGhlIHJlbWFpbmluZyB0YXNrIGluZGljZXNcbiAgICBmb3IgKGxldCBpID0gdGFza0luZGV4Rm9yRGVsZXRpb24ubGVuZ3RoOyBpID49IDE7IGktLSkge1xuICAgICAgICB0YXNrc0NyZWF0ZWQuc3BsaWNlKHRhc2tJbmRleEZvckRlbGV0aW9uW2ktMV0sIDEpO1xuICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPCB0YXNrc0NyZWF0ZWQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRhc2tzQ3JlYXRlZFtqXS50YXNrSW5kZXggPSBqO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvamVjdHNDcmVhdGVkLnNwbGljZShwcm9qZWN0VG9EZWxldGVJbmRleCwgMSk7XG5cbiAgICB1cGRhdGVQcm9qZWN0SW5kZXgocHJvamVjdFRvRGVsZXRlSW5kZXgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0SW5kZXgoaW5kZXhPZkRlbGV0ZWRQcm9qZWN0KSB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4T2ZEZWxldGVkUHJvamVjdDsgaSA8IHByb2plY3RzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9qZWN0c0NyZWF0ZWRbaV0ucHJvamVjdEluZGV4ID0gaTtcbiAgICB9XG5cbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHByb2plY3RgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihudWxsLCB0YXNrc0NyZWF0ZWQpO1xufVxuXG5mdW5jdGlvbiB0YXNrRmlsdGVyKHByb2plY3RBc3NvY2lhdGVkVGl0bGUpIHtcbiAgICBsZXQgdGFza3NBc3NvY2lhdGVkID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKHRhc2tPYmplY3QpID0+IHtcbiAgICAgICAgaWYgKHRhc2tPYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrc0Fzc29jaWF0ZWQucHVzaCh0YXNrT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRhc2tzQXNzb2NpYXRlZFxufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0T2JqZWN0VG9Mb2FkLCB0YXNrc0FycmF5VG9Mb2FkKSB7XG4gICAgaWYgKCFwcm9qZWN0T2JqZWN0VG9Mb2FkKSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIG51bGwsIHRhc2tzQ3JlYXRlZCwgYG92ZXJ2aWV3YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgcHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCwgcHJvamVjdE9iamVjdFRvTG9hZC5wcm9qZWN0VGl0bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBnZXRPYmplY3RBcnJheXMsXG4gICAgaW5zdGFudGlhdGVOZXdUYXNrLFxuICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdCxcbiAgICBmaW5hbGl6ZVRhc2tFZGl0cyxcbiAgICBmaW5hbGl6ZVByb2plY3RFZGl0cyxcbiAgICBkZWxldGVUYXNrT2JqZWN0LFxuICAgIGRlbGV0ZVByb2plY3RPYmplY3QsXG59IiwiY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcblxuZnVuY3Rpb24gbG9hZE1haW5Db250ZW50KHByb2plY3RzQXJyYXksIHByb2plY3RUb0xvYWQsIHRhc2tzQXJyYXksIHBhZ2VUb0Rpc3BsYXkpIHtcbiAgICB3aGlsZSAobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW5Db250YWluZXIucmVtb3ZlQ2hpbGQobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKVxuICAgIH1cbiAgICBpZiAocGFnZVRvRGlzcGxheSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3NPdmVydmlldyh0YXNrc0FycmF5KTtcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSBpZiAoIXBhZ2VUb0Rpc3BsYXkpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVByb2plY3QocHJvamVjdFRvTG9hZClcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlFeGlzdGluZ1Byb2plY3QocHJvamVjdFRvTG9hZCwgdGFza3NBcnJheSlcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH1cbiAgICBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNBcnJheSlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzT3ZlcnZpZXcoYXJyYXlPZlRhc2tPYmplY3RzKSB7XG4gICAgY29uc3Qgb3ZlcnZpZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBvdmVydmlld1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDJgKTtcbiAgICBvdmVydmlld1RpdGxlLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3YDtcbiAgICBvdmVydmlld1RpdGxlLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctaGVhZGVyYCk7XG4gICAgb3ZlcnZpZXdDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1jb250YWluZXJgKTtcbiAgICBvdmVydmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChvdmVydmlld1RpdGxlKTtcbiAgICBcbiAgICBjb25zdCB0YXNrc1RvRGlzcGxheSA9IGRpc3BsYXlUYXNrcyhhcnJheU9mVGFza09iamVjdHMsIG92ZXJ2aWV3Q29udGFpbmVyLCB0cnVlKVxuICAgIFxuICAgIHJldHVybiB0YXNrc1RvRGlzcGxheVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGFza3MoYXJyYXlPZlRhc2tPYmplY3RzLCBjb250YWluZXIsIHRvRGlzcGxheVByb2plY3RBc3NvY2lhdGlvbikge1xuICAgIGNvbnN0IGFsbFRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgYWxsVGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC10YXNrcy1jb250YWluZXJgKTtcblxuICAgIGNvbnN0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICB0YXNrSGVhZGVyLnNldEF0dHJpYnV0ZShgaWRgLCBgdGFzay1oZWFkZXJgKTtcbiAgICBjb25zdCBoZWFkZXJUaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJEdWVEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlckRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlclByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlclByb2plY3RBc3NvY2lhdGVkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGhlYWRlclRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSBgdGFza2A7XG4gICAgaGVhZGVyRHVlRGF0ZUxhYmVsLnRleHRDb250ZW50ID0gYGR1ZSBkYXRlYDtcbiAgICBoZWFkZXJEZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gYGRlc2NyaXB0aW9uYDtcbiAgICBoZWFkZXJQcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gYHByaW9yaXR5YDtcbiAgICBoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsLnRleHRDb250ZW50ID0gYGFzc29jaWF0ZWQgcHJvamVjdGA7XG5cbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRpdGxlTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyRHVlRGF0ZUxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlckRlc2NyaXB0aW9uTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJpb3JpdHlMYWJlbCk7XG4gICAgaWYgKHRvRGlzcGxheVByb2plY3RBc3NvY2lhdGlvbikge1xuICAgICAgICB0YXNrSGVhZGVyLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctdGFzay1oZWFkZXJgKTtcbiAgICAgICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsKTtcbiAgICB9XG5cbiAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5T2ZUYXNrT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg0YCk7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza1Byb2plY3RBc3NvY2lhdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIFxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHRhc2stY29udGFpbmVyYCk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke2FycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrSW5kZXh9YCk7XG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrVGl0bGU7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEYXRlRHVlO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXMudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0YDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC10YXNrLWJ0bmApO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZWA7XG4gICAgICAgIHRhc2tEZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXRhc2stYnRuYCk7XG5cbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eVN0YXR1cyk7XG4gICAgICAgIGlmICh0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICAgICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBpZGAsIGBvdmVydmlldy10YXNrLWNvbnRhaW5lcmApO1xuICAgICAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdXR0b24pO1xuXG4gICAgICAgIGFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Rhc2tDb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWxsVGFza3NDb250YWluZXIpO1xuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdE9iamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RJbmZvSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsYWJlbGApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgY29uc3QgcHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgIGNvbnN0IHByb2plY3RFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgIFxuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1jb250YWluZXJgKTtcbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWluZm8tY29udGFpbmVyYCk7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1pbmZvLWhlYWRlcmApO1xuICAgIHByb2plY3RUaXRsZUxhYmVsLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtdGl0bGUtaGVhZGVyYCk7XG4gICAgcHJvamVjdER1ZURhdGUuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kYXRlLWR1ZWApO1xuICAgIHByb2plY3REZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWRlc2NyaXB0aW9uYCk7XG4gICAgcHJvamVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgYCR7cHJvamVjdE9iamVjdC5wcm9qZWN0SW5kZXh9YCk7XG4gICAgcHJvamVjdFRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSBgcHJvamVjdDpgO1xuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgIHByb2plY3REdWVEYXRlLnRleHRDb250ZW50ID0gYGR1ZTogJHtwcm9qZWN0T2JqZWN0LnByb2plY3REYXRlRHVlfWA7XG4gICAgcHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYGRlc2NyaXB0aW9uOiAke3Byb2plY3RPYmplY3QucHJvamVjdERlc2NyaXB0aW9ufWA7XG4gICAgcHJvamVjdEVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBgZWRpdCBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZSBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBlZGl0LXByb2plY3QtYnRuYCk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBkZWxldGUtcHJvamVjdC1idG5gKTtcblxuICAgIHByb2plY3RUaXRsZUxhYmVsLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG5cbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVMYWJlbCk7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RFZGl0QnV0dG9uKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RGVsZXRlQnV0dG9uKTtcblxuICAgIHByb2plY3RJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJbmZvSGVhZGVyKTtcbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SW5mb0NvbnRhaW5lcik7XG5cbiAgICByZXR1cm4gcHJvamVjdENvbnRhaW5lclxufVxuXG5mdW5jdGlvbiBkaXNwbGF5RXhpc3RpbmdQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QsIHByb2plY3RUYXNrc0FycmF5KSB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QpO1xuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IGRpc3BsYXlUYXNrcyhwcm9qZWN0VGFza3NBcnJheSwgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCwgZmFsc2UpO1xuICAgIHJldHVybiBwcm9qZWN0VGFza3Ncbn1cblxuLy8gdGhpcyBcIm1vZHVsZVwiIHJlLWxvYWRzIHRoZSBidXR0b25zIGFuZCBzZWxlY3RvcnMgZXZlcnkgcGFnZUxvYWQgd2l0aCB1cGRhdGVkIHByb2plY3RzQ3JlYXRlZCBkYXRhXG5mdW5jdGlvbiBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNDcmVhdGVkQXJyYXkpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdEhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1saXN0YCk7XG4gICAgY29uc3QgYWRkVGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWFzc29jaWF0ZWRgKTtcbiAgICBjb25zdCBlZGl0VGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LXByb2plY3QtYXNzb2NpYXRlZGApO1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBwcm9qZWN0c0NyZWF0ZWRBcnJheTtcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgYXJyYXlPZkNvbnRhaW5lcnMgPSBbcHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3JdO1xuXG4gICAgICAgIGFycmF5T2ZDb250YWluZXJzLmZvckVhY2goIChjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjb250YWluZXIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qZWN0QnV0dG9uc1RvUHJvamVjdExpc3QoKSB7XG5cbiAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKCAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGlkYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0SW5kZXgpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0TGlzdEJ1dHRvbmApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0TGlzdEhlYWQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGBkZWZhdWx0YCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3IChkZWZhdWx0KWA7XG4gICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudFByb2plY3RBc3NvY2lhdGVkSW5FZGl0TW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgY3VycmVudFByb2plY3RBc3NvY2lhdGVkSW5FZGl0TW9kYWwuc2V0QXR0cmlidXRlKGBpZGAsIGBleGlzdGluZy1wcm9qZWN0YCk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYG9wdGlvbmApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGBkZWZhdWx0YCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IGBvdmVydmlldyAoZGVmYXVsdClgO1xuXG4gICAgICAgIGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGN1cnJlbnRQcm9qZWN0QXNzb2NpYXRlZEluRWRpdE1vZGFsKTtcbiAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaCggKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICBcbiAgICAgICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvcik7XG4gICAgICAgICAgICBlZGl0VGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3RIZWFkLCBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLCBlZGl0VGFza1Byb2plY3RTZWxlY3Rvcik7XG4gICAgYXBwZW5kUHJvamVjdEJ1dHRvbnNUb1Byb2plY3RMaXN0KCk7XG4gICAgYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpO1xufVxuXG5leHBvcnQge1xuICAgIGxvYWRNYWluQ29udGVudCxcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9kYXRhTW9kYWxIYW5kbGVyLmpzJ1xuaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzIH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcbmltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI25hdi1jb250YWluZXJgKTtcbmNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1idXR0b25gKTtcbmNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBwYWdlU2VsZWN0b3IpO1xucHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjb25zb2xlLmxvZyhlLnRhcmdldC50ZXh0Q29udGVudCkpO1xucHJvamVjdExpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBwcm9qZWN0TGlzdEJ1dHRvbmApIHtcbiAgICAgICAgcHJvamVjdFNlbGVjdG9yKGUpXG4gICAgfVxufSk7XG5cbi8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdHNDcmVhdGVkYCk7XG4vLyB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHRhc2tzQ3JlYXRlZGApO1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIGBvdmVydmlld2ApO1xufSkoKTtcblxuZnVuY3Rpb24gcGFnZVNlbGVjdG9yKGUpIHtcbiAgICBjb25zdCBwYWdlU2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGlmIChwYWdlU2VsZWN0ZWRUaXRsZSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudE9iamVjdEFycmF5KTtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgbnVsbCwgY3VycmVudE9iamVjdEFycmF5LnRhc2tzLCBwYWdlU2VsZWN0ZWRUaXRsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9qZWN0U2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRPYmplY3RBcnJheSk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=