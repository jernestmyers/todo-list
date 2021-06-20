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
    
    // pre-populate the text inputs with existing data
    const editTaskInputs = document.querySelectorAll(`.editTaskInputs`);
    editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    editTaskInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
    editTaskInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
    editTaskInputs[2].textContent = currentObjectArray.tasks[taskToEditIndex].taskDescription;
    
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
    deleteProjectMessage.textContent = `Are you sure you want to delete the project "${projectToDeleteTitle}" and all of its tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    
    confirmDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteProjectObject)(projectToDeleteTitle, projectToDeleteIndex);
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
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 0,
    },
    {
        taskTitle: `make progress`,
        taskDateDue: `2021-06-12`,
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 1,
    },
    {
        taskTitle: `do more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `default`,
        taskIndex: 2,
    }
];

function getObjectArrays() {
    const taskArrays = {
        projects: projectsCreated,
        tasks: tasksCreated
    }
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
    
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}
        
function instantiateNewProject(newProjectModalInputs) {
    const newProjectInputArray = Array.from(newProjectModalInputs);
    const newProjectTitle = newProjectInputArray[0].value;
    const newProjectDateDue = newProjectInputArray[1].value;
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);

    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, newProject, null, `new project`);
}

function finalizeTaskEdits(editModalInputs, targetIndex, currentPageDisplayed) {
    console.log(editModalInputs[0].value);
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = editModalInputs[1].value;
    const editedTaskDescription = editModalInputs[2].value;
    const editedTaskPriorityStatus = editModalInputs[3].value;
    const editedTaskProjectAssocaited = editModalInputs[4].value;

    tasksCreated[targetIndex].taskTitle = editedTaskTitle;
    tasksCreated[targetIndex].taskDateDue = editedTaskDateDue;
    tasksCreated[targetIndex].taskDescription = editedTaskDescription;
    tasksCreated[targetIndex].taskPriorityStatus = editedTaskPriorityStatus;
    tasksCreated[targetIndex].taskProjectAssociated = editedTaskProjectAssocaited;

    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

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
    } else {
        tasksToLoad = taskFilter(existingProjectTitle);
    }

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
    } else if (pageToDisplay === `new project`) {
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
        
        const defaultProjectForEditTaskSelector = document.createElement(`option`);
        defaultProjectForEditTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForEditTaskSelector.textContent = `overview (default)`;
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

const loadPage = (function() {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksK0VBQXFCO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxZQUFZLDRFQUFrQjtBQUM5QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsMEVBQWdCO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDN01BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDcUI7QUFDVjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUMsSUFBSSwrREFBZTtBQUNuQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5RUFBZTtBQUNsRCxRQUFRLCtEQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLGdFQUFlO0FBQ25CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE9iamVjdEFycmF5cywgaW5zdGFudGlhdGVOZXdUYXNrLCBpbnN0YW50aWF0ZU5ld1Byb2plY3QsIGZpbmFsaXplVGFza0VkaXRzLCBmaW5hbGl6ZVByb2plY3RFZGl0cywgZGVsZXRlVGFza09iamVjdCwgZGVsZXRlUHJvamVjdE9iamVjdCB9IGZyb20gJy4vb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMnXG5cbi8vIHRoaXMgc2VjdGlvbiBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBhZGRUYXNrIGFuZCBhZGRQcm9qZWN0IGZvcm0gbW9kYWxzXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRUYXNrQnV0dG9uYCk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRQcm9qZWN0QnV0dG9uYCk7XG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9wZW5OZXdPYmplY3RNb2RhbCk7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9wZW5OZXdPYmplY3RNb2RhbCk7XG4gICAgXG4gICAgY29uc3QgcHJvamVjdFVzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9qZWN0VXNlcklucHV0c2ApO1xuICAgIGNvbnN0IHRhc2tVc2VySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAudGFza1VzZXJJbnB1dHNgKTtcbiAgICBcbiAgICBmdW5jdGlvbiBvcGVuTmV3T2JqZWN0TW9kYWwoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBhZGRPYmplY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tb2RhbGApO1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IGBhZGRUYXNrQnV0dG9uYCkge1xuICAgICAgICAgICAgYWRkT2JqZWN0TW9kYWxbMF0uc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRPYmplY3RNb2RhbFsyXS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFByb2plY3RTdWJtaXRCdXR0b25gKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tTdWJtaXRCdXR0b25gKTtcbiAgICBjb25zdCBjYW5jZWxQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3RgKTtcbiAgICBjb25zdCBjYW5jZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tgKTtcbiAgICBcbiAgICBjYW5jZWxQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNsb3NlTmV3T2JqZWN0TW9kYWwoZS50YXJnZXQuaWQpKTtcbiAgICBjYW5jZWxUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNsb3NlTmV3T2JqZWN0TW9kYWwoZS50YXJnZXQuaWQpKTtcbiAgICBcbiAgICBzdWJtaXRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24ocHJvamVjdFVzZXJJbnB1dCkpIHtcbiAgICAgICAgICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdChwcm9qZWN0VXNlcklucHV0KTtcbiAgICAgICAgICAgIHN1Ym1pdE5ld09iamVjdEZvcm0oZSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIHN1Ym1pdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbih0YXNrVXNlcklucHV0KSkge1xuICAgICAgICAgICAgaW5zdGFudGlhdGVOZXdUYXNrKHRhc2tVc2VySW5wdXQpO1xuICAgICAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgZnVuY3Rpb24gc3VibWl0TmV3T2JqZWN0Rm9ybShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZU5ld09iamVjdE1vZGFsKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNsb3NlTmV3T2JqZWN0TW9kYWwoYnV0dG9uSUQpIHtcbiAgICAgICAgY29uc3QgbW9kYWxUb0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1vZGFsYCk7XG4gICAgICAgIGNvbnN0IGZvcm1Ub1Jlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmZvcm1GaWVsZGApO1xuICAgICAgICBpZiAoYnV0dG9uSUQgPT09IGBhZGRQcm9qZWN0U3VibWl0QnV0dG9uYCB8fCBidXR0b25JRCA9PT0gYGNhbmNlbFByb2plY3RgKSB7XG4gICAgICAgICAgICBtb2RhbFRvQ2xvc2VbMl0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzJdLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbFRvQ2xvc2VbMF0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzBdLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbi8vIHRoaXMgc2VjdGlvbiBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBlZGl0VGFzayBhbmQgZWRpdFByb2plY3QgZm9ybSBtb2RhbHNcbmNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG5tYWluQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgIGlmIChjdXJyZW50UGFnZSAhPT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLm5leHRTaWJsaW5nLnRleHRDb250ZW50O1xuICAgIH1cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZWRpdC10YXNrLWJ0bmApIHtcbiAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIG9wZW5FZGl0VGFza01vZGFsKHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBkZWxldGUtdGFzay1idG5gKSB7XG4gICAgICAgIGNvbnN0IHRhc2tTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICBkZWxldGVUYXNrT2JqZWN0KHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBlZGl0LXByb2plY3QtYnRuYCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZC5sYXN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkVkaXRQcm9qZWN0TW9kYWwocHJvamVjdFNlbGVjdGVkVGl0bGUsIHByb2plY3RTZWxlY3RlZEluZGV4KTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGRlbGV0ZS1wcm9qZWN0LWJ0bmApIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQubGFzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFNlbGVjdGVkVGl0bGUsIHByb2plY3RTZWxlY3RlZEluZGV4KTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gb3BlbkVkaXRUYXNrTW9kYWwodGFza1RvRWRpdEluZGV4LCBwYWdlRGlzcGxheWVkVGl0bGUpIHtcbiAgICBcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICBcbiAgICBjb25zdCBlZGl0VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrTW9kYWxgKTtcbiAgICBlZGl0VGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIFxuICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgdGV4dCBpbnB1dHMgd2l0aCBleGlzdGluZyBkYXRhXG4gICAgY29uc3QgZWRpdFRhc2tJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZWRpdFRhc2tJbnB1dHNgKTtcbiAgICBlZGl0VGFza0lucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1RpdGxlfWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGF0ZUR1ZX1gKTtcbiAgICBlZGl0VGFza0lucHV0c1syXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza0Rlc2NyaXB0aW9ufWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzJdLnRleHRDb250ZW50ID0gY3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza0Rlc2NyaXB0aW9uO1xuICAgIFxuICAgIGNvbnN0IGNvbmZpcm1UYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRhc2tTdWJtaXRCdXR0b25gKTtcbiAgICBjb25maXJtVGFza0VkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpXG4gICAgXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2tFZGl0c0hhbmRsZXIoZSkge1xuICAgICAgICBjb25maXJtVGFza0VkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbihlZGl0VGFza0lucHV0cykpIHtcbiAgICAgICAgICAgIGZpbmFsaXplVGFza0VkaXRzKGVkaXRUYXNrSW5wdXRzLCB0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRUYXNrTW9kYWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNhbmNlbFRhc2tFZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxUYXNrRWRpdGApO1xuICAgIGNhbmNlbFRhc2tFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGNvbmZpcm1UYXNrRWRpdHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtVGFza0VkaXRzSGFuZGxlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0VGFza01vZGFsKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBvcGVuRWRpdFByb2plY3RNb2RhbChwcm9qZWN0VG9FZGl0VGl0bGUsIHByb2plY3RUb0VkaXRJbmRleCkge1xuICAgIFxuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuXG4gICAgY29uc3QgZWRpdFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0UHJvamVjdE1vZGFsYCk7XG4gICAgZWRpdFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICBcbiAgICAvLyBwcmUtcG9wdWxhdGUgdGhlIGVkaXQgZm9ybSB3aXRoIGV4aXN0aW5nIGRhdGFcbiAgICBjb25zdCBlZGl0UHJvamVjdElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0UHJvamVjdElucHV0c2ApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0VGl0bGV9YCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMV0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3REYXRlRHVlfWApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb259YCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb247XG4gICAgXG4gICAgY29uc3QgY29uZmlybVByb2plY3RFZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0UHJvamVjdFN1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcilcbiAgICBcbiAgICBmdW5jdGlvbiBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcihlKSB7XG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcik7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRQcm9qZWN0SW5wdXRzKSkge1xuICAgICAgICAgICAgZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RJbnB1dHMsIHByb2plY3RUb0VkaXRJbmRleCwgcHJvamVjdFRvRWRpdFRpdGxlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3RFZGl0YCk7XG4gICAgY2FuY2VsUHJvamVjdEVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY29uZmlybVByb2plY3RFZGl0cy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RWRpdHNIYW5kbGVyKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRQcm9qZWN0TW9kYWwpO1xuICAgIH0pXG4gICAgXG59XG5cbmZ1bmN0aW9uIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm1EZWxldGVQcm9qZWN0YClcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtLWRlbGV0ZS10ZXh0YCk7XG4gICAgZGVsZXRlUHJvamVjdE1lc3NhZ2UudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgcHJvamVjdCBcIiR7cHJvamVjdFRvRGVsZXRlVGl0bGV9XCIgYW5kIGFsbCBvZiBpdHMgdGFza3M/YDtcbiAgICBcbiAgICBjb25zdCBjb25maXJtRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm1Qcm9qZWN0RGVsZXRlYCk7XG4gICAgY29uc3QgY2FuY2VsRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3REZWxldGVgKTtcbiAgICBcbiAgICBjb25maXJtRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoIGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdE9iamVjdChwcm9qZWN0VG9EZWxldGVUaXRsZSwgcHJvamVjdFRvRGVsZXRlSW5kZXgpO1xuICAgIH0pXG4gICAgXG4gICAgY2FuY2VsRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoIGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICB9KVxuICAgIFxuICAgIGRlbGV0ZVByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbn1cblxuZnVuY3Rpb24gY2xvc2VFZGl0T3JEZWxldGVNb2RhbChtb2RhbFRvQ2xvc2UpIHtcbiAgICBjb25zdCBmb3JtVG9SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5mb3JtRmllbGRgKTtcbiAgICBtb2RhbFRvQ2xvc2Uuc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICBpZiAobW9kYWxUb0Nsb3NlID09PSBlZGl0VGFza01vZGFsKSB7XG4gICAgICAgIGZvcm1Ub1Jlc2V0WzFdLnJlc2V0KCk7XG4gICAgfSBlbHNlIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRQcm9qZWN0TW9kYWwpIHtcbiAgICAgICAgZm9ybVRvUmVzZXRbM10ucmVzZXQoKTtcbiAgICB9XG59XG5cbi8vIHRoaXMgZnVuY3Rpb24gdmFsaWRhdGVzIGJvdGggdHlwZXMgb2YgbW9kYWxzOiBhZGQgYW5kIGVkaXRcbmZ1bmN0aW9uIGNoZWNrRm9ybVZhbGlkYXRpb24oaW5wdXROb2RlTGlzdCkge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICBpbnB1dE5vZGVMaXN0LmZvckVhY2goIGlucHV0RmllbGQgPT4ge1xuICAgICAgICBpZiAoaW5wdXRGaWVsZC52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzVmFsaWRcbn0iLCJpbXBvcnQgeyBsb2FkTWFpbkNvbnRlbnQgfSBmcm9tICcuL3BhZ2VMb2FkZXIuanMnXG5cbmxldCBwcm9qZWN0c0NyZWF0ZWQgPSBbXG4gICAge1xuICAgICAgICBwcm9qZWN0VGl0bGU6IGB0b2RvIGxpc3RgLFxuICAgICAgICBwcm9qZWN0RGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb246IGB0aGlzIGlzIGEgcHJvamVjdCBmb3IgdGhlIG9kaW4gcHJvamVjdGAsXG4gICAgICAgIHByb2plY3RJbmRleDogMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcHJvamVjdFRpdGxlOiBga2VlcCBncmluZGluZ2AsXG4gICAgICAgIHByb2plY3REYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0IHByb2plY3QgZm9yIG15IGJ1Z2d5IHRvZG8gbGlzdCBhcHBgLFxuICAgICAgICBwcm9qZWN0SW5kZXg6IDEsXG4gICAgfSxcbl07XG5cbmxldCB0YXNrc0NyZWF0ZWQgPSBbXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGByZWZhY3RvciBjb2RlYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHRlc3RgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBoaWdoYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgdGFza0luZGV4OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGBtYWtlIHByb2dyZXNzYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTEyYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHRlc3RgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBoaWdoYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgdGFza0luZGV4OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGBkbyBtb3JlYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTEzYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHRlc3RgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBoaWdoYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgZGVmYXVsdGAsXG4gICAgICAgIHRhc2tJbmRleDogMixcbiAgICB9XG5dO1xuXG5mdW5jdGlvbiBnZXRPYmplY3RBcnJheXMoKSB7XG4gICAgY29uc3QgdGFza0FycmF5cyA9IHtcbiAgICAgICAgcHJvamVjdHM6IHByb2plY3RzQ3JlYXRlZCxcbiAgICAgICAgdGFza3M6IHRhc2tzQ3JlYXRlZFxuICAgIH1cbiAgICByZXR1cm4gdGFza0FycmF5c1xufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0VGl0bGUsIHByb2plY3REYXRlRHVlLCBwcm9qZWN0RGVzY3JpcHRpb24sIHByb2plY3RJbmRleCkge1xuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGF0ZUR1ZSA9IHByb2plY3REYXRlRHVlO1xuICAgICAgICB0aGlzLnByb2plY3REZXNjcmlwdGlvbiA9IHByb2plY3REZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgfVxufVxuXG5jbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrVGl0bGUsIHRhc2tEYXRlRHVlLCB0YXNrRGVzY3JpcHRpb24sIHRhc2tQcmlvcml0eVN0YXR1cywgdGFza1Byb2plY3RBc3NvY2lhdGVkLCB0YXNrSW5kZXgpIHtcbiAgICAgICAgdGhpcy50YXNrVGl0bGUgPSB0YXNrVGl0bGU7XG4gICAgICAgIHRoaXMudGFza0RhdGVEdWUgPSB0YXNrRGF0ZUR1ZTtcbiAgICAgICAgdGhpcy50YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMudGFza1ByaW9yaXR5U3RhdHVzID0gdGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0aGlzLnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IHRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICAgICAgdGhpcy50YXNrSW5kZXggPSB0YXNrSW5kZXg7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Rhc2sobmV3VGFza01vZGFsSW5wdXRzLCBwYWdlVG9SZWZyZXNoKSB7XG4gICAgXG4gICAgY29uc3QgbmV3VGFza0lucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Rhc2tNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3VGFza1RpdGxlID0gbmV3VGFza0lucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0RhdGVEdWUgPSBuZXdUYXNrSW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrRGVzY3JpcHRpb24gPSBuZXdUYXNrSW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMgPSBuZXdUYXNrSW5wdXRBcnJheVszXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQgPSBuZXdUYXNrSW5wdXRBcnJheVs0XS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrSW5kZXggPSB0YXNrc0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhuZXdUYXNrVGl0bGUsIG5ld1Rhc2tEYXRlRHVlLCBuZXdUYXNrRGVzY3JpcHRpb24sIG5ld1Rhc2tQcmlvcml0eVN0YXR1cywgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkLCBuZXdUYXNrSW5kZXgpO1xuICAgIHRhc2tzQ3JlYXRlZC5wdXNoKG5ld1Rhc2spO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIobmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuICAgICAgICBcbmZ1bmN0aW9uIGluc3RhbnRpYXRlTmV3UHJvamVjdChuZXdQcm9qZWN0TW9kYWxJbnB1dHMpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0SW5wdXRBcnJheSA9IEFycmF5LmZyb20obmV3UHJvamVjdE1vZGFsSW5wdXRzKTtcbiAgICBjb25zdCBuZXdQcm9qZWN0VGl0bGUgPSBuZXdQcm9qZWN0SW5wdXRBcnJheVswXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGF0ZUR1ZSA9IG5ld1Byb2plY3RJbnB1dEFycmF5WzFdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3REZXNjcmlwdGlvbiA9IG5ld1Byb2plY3RJbnB1dEFycmF5WzJdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3RJbmRleCA9IHByb2plY3RzQ3JlYXRlZC5sZW5ndGg7XG4gICAgXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KG5ld1Byb2plY3RUaXRsZSwgbmV3UHJvamVjdERhdGVEdWUsIG5ld1Byb2plY3REZXNjcmlwdGlvbiwgbmV3UHJvamVjdEluZGV4KTtcbiAgICBwcm9qZWN0c0NyZWF0ZWQucHVzaChuZXdQcm9qZWN0KTtcblxuICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIG5ld1Byb2plY3QsIG51bGwsIGBuZXcgcHJvamVjdGApO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVRhc2tFZGl0cyhlZGl0TW9kYWxJbnB1dHMsIHRhcmdldEluZGV4LCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIGNvbnNvbGUubG9nKGVkaXRNb2RhbElucHV0c1swXS52YWx1ZSk7XG4gICAgY29uc3QgZWRpdGVkVGFza1RpdGxlID0gZWRpdE1vZGFsSW5wdXRzWzBdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEYXRlRHVlID0gZWRpdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEZXNjcmlwdGlvbiA9IGVkaXRNb2RhbElucHV0c1syXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrUHJpb3JpdHlTdGF0dXMgPSBlZGl0TW9kYWxJbnB1dHNbM10udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza1Byb2plY3RBc3NvY2FpdGVkID0gZWRpdE1vZGFsSW5wdXRzWzRdLnZhbHVlO1xuXG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrVGl0bGUgPSBlZGl0ZWRUYXNrVGl0bGU7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrRGF0ZUR1ZSA9IGVkaXRlZFRhc2tEYXRlRHVlO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza0Rlc2NyaXB0aW9uID0gZWRpdGVkVGFza0Rlc2NyaXB0aW9uO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1ByaW9yaXR5U3RhdHVzID0gZWRpdGVkVGFza1ByaW9yaXR5U3RhdHVzO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdGVkVGFza1Byb2plY3RBc3NvY2FpdGVkO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrT2JqZWN0KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgdGFza3NDcmVhdGVkLnNwbGljZShpbmRleE9mVGFza1RvRGVsZXRlLCAxKTtcbiAgICB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhPZlRhc2tUb0RlbGV0ZTsgaSA8IHRhc2tzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXNrc0NyZWF0ZWRbaV0udGFza0luZGV4ID0gaTtcbiAgICB9XG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVByb2plY3RFZGl0cyhlZGl0UHJvamVjdE1vZGFsSW5wdXRzLCB0YXJnZXRQcm9qZWN0SW5kZXgsIGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG5cbiAgICBsZXQgdGFza3NUb0xvYWQgPSBudWxsO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3RUaXRsZSA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMF0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdERhdGVEdWUgPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3REZXNjcmlwdGlvbiA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMl0udmFsdWU7XG5cbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0VGl0bGUgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdERhdGVEdWUgPSBlZGl0ZWRQcm9qZWN0RGF0ZUR1ZTtcbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb24gPSBlZGl0ZWRQcm9qZWN0RGVzY3JpcHRpb25cblxuICAgIC8vIGlmIGEgcHJvamVjdCdzIHRpdGxlIGNoYW5nZXMsIHRoaXMgdXBkYXRlcyBhbGwgYXNzb2NpYXRlZCB0YXNrcycgdGFza1Byb2plY3RBc3NvY2lhdGVkIGRhdGEgdG8gdGhlIG5ldyBwcm9qZWN0IHRpdGxlIFxuICAgIGlmIChlZGl0ZWRQcm9qZWN0VGl0bGUgIT09IGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihleGlzdGluZ1Byb2plY3RUaXRsZSk7XG4gICAgICAgIHRhc2tzVG9Mb2FkLmZvckVhY2goIHRhc2tPYmplY3QgPT4ge1xuICAgICAgICAgICAgdGFza09iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGV4aXN0aW5nUHJvamVjdFRpdGxlKTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XSwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T2JqZWN0KHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCkge1xuICAgIGxldCB0YXNrSW5kZXhGb3JEZWxldGlvbiA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoIChvYmplY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChvYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0VG9EZWxldGVUaXRsZSkge1xuICAgICAgICAgICAgdGFza0luZGV4Rm9yRGVsZXRpb24ucHVzaChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIC8vIGRlbGV0ZXMgdGhlIHRhc2tzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZGVsZXRlZCBwcm9qZWN0IGFuZCB1cGRhdGVzIHRoZSByZW1haW5pbmcgdGFzayBpbmRpY2VzXG4gICAgZm9yIChsZXQgaSA9IHRhc2tJbmRleEZvckRlbGV0aW9uLmxlbmd0aDsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgdGFza3NDcmVhdGVkLnNwbGljZSh0YXNrSW5kZXhGb3JEZWxldGlvbltpLTFdLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqIDwgdGFza3NDcmVhdGVkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB0YXNrc0NyZWF0ZWRbal0udGFza0luZGV4ID0gajtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2plY3RzQ3JlYXRlZC5zcGxpY2UocHJvamVjdFRvRGVsZXRlSW5kZXgsIDEpO1xuXG4gICAgdXBkYXRlUHJvamVjdEluZGV4KHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdEluZGV4KGluZGV4T2ZEZWxldGVkUHJvamVjdCkge1xuICAgIGZvciAobGV0IGkgPSBpbmRleE9mRGVsZXRlZFByb2plY3Q7IGkgPCBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvamVjdHNDcmVhdGVkW2ldLnByb2plY3RJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgbG9hZENvbnRlbnRIZWxwZXIobnVsbCwgdGFza3NDcmVhdGVkKTtcbn1cblxuZnVuY3Rpb24gdGFza0ZpbHRlcihwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgbGV0IHRhc2tzQXNzb2NpYXRlZCA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdEFzc29jaWF0ZWRUaXRsZSkge1xuICAgICAgICAgICAgdGFza3NBc3NvY2lhdGVkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0YXNrc0Fzc29jaWF0ZWRcbn1cblxuZnVuY3Rpb24gbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCkge1xuICAgIGlmICghcHJvamVjdE9iamVjdFRvTG9hZCkge1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBudWxsLCB0YXNrc0NyZWF0ZWQsIGBvdmVydmlld2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIHByb2plY3RPYmplY3RUb0xvYWQsIHRhc2tzQXJyYXlUb0xvYWQsIHByb2plY3RPYmplY3RUb0xvYWQucHJvamVjdFRpdGxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgZ2V0T2JqZWN0QXJyYXlzLFxuICAgIGluc3RhbnRpYXRlTmV3VGFzayxcbiAgICBpbnN0YW50aWF0ZU5ld1Byb2plY3QsXG4gICAgZmluYWxpemVUYXNrRWRpdHMsXG4gICAgZmluYWxpemVQcm9qZWN0RWRpdHMsXG4gICAgZGVsZXRlVGFza09iamVjdCxcbiAgICBkZWxldGVQcm9qZWN0T2JqZWN0LFxufSIsImNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG5cbmZ1bmN0aW9uIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0FycmF5LCBwcm9qZWN0VG9Mb2FkLCB0YXNrc0FycmF5LCBwYWdlVG9EaXNwbGF5KSB7XG4gICAgd2hpbGUgKG1haW5Db250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluQ29udGFpbmVyLnJlbW92ZUNoaWxkKG1haW5Db250YWluZXIuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgaWYgKHBhZ2VUb0Rpc3BsYXkgPT09IGBvdmVydmlld2ApIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVRhc2tzT3ZlcnZpZXcodGFza3NBcnJheSk7XG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9IGVsc2UgaWYgKHBhZ2VUb0Rpc3BsYXkgPT09IGBuZXcgcHJvamVjdGApIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVByb2plY3QocHJvamVjdFRvTG9hZClcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlFeGlzdGluZ1Byb2plY3QocHJvamVjdFRvTG9hZCwgdGFza3NBcnJheSlcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH1cbiAgICBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNBcnJheSlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzT3ZlcnZpZXcoYXJyYXlPZlRhc2tPYmplY3RzKSB7XG4gICAgY29uc3Qgb3ZlcnZpZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBvdmVydmlld1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDJgKTtcbiAgICBvdmVydmlld1RpdGxlLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3YDtcbiAgICBvdmVydmlld1RpdGxlLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctaGVhZGVyYCk7XG4gICAgb3ZlcnZpZXdDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1jb250YWluZXJgKTtcbiAgICBvdmVydmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZChvdmVydmlld1RpdGxlKTtcbiAgICBcbiAgICBjb25zdCB0YXNrc1RvRGlzcGxheSA9IGRpc3BsYXlUYXNrcyhhcnJheU9mVGFza09iamVjdHMsIG92ZXJ2aWV3Q29udGFpbmVyLCB0cnVlKVxuICAgIFxuICAgIHJldHVybiB0YXNrc1RvRGlzcGxheVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGFza3MoYXJyYXlPZlRhc2tPYmplY3RzLCBjb250YWluZXIsIHRvRGlzcGxheVByb2plY3RBc3NvY2lhdGlvbikge1xuICAgIGNvbnN0IGFsbFRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgYWxsVGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC10YXNrcy1jb250YWluZXJgKTtcblxuICAgIGNvbnN0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICB0YXNrSGVhZGVyLnNldEF0dHJpYnV0ZShgaWRgLCBgdGFzay1oZWFkZXJgKTtcbiAgICBjb25zdCBoZWFkZXJUaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJEdWVEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlckRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlclByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlclByb2plY3RBc3NvY2lhdGVkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGhlYWRlclRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSBgdGFza2A7XG4gICAgaGVhZGVyRHVlRGF0ZUxhYmVsLnRleHRDb250ZW50ID0gYGR1ZSBkYXRlYDtcbiAgICBoZWFkZXJEZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gYGRlc2NyaXB0aW9uYDtcbiAgICBoZWFkZXJQcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gYHByaW9yaXR5YDtcbiAgICBoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsLnRleHRDb250ZW50ID0gYGFzc29jaWF0ZWQgcHJvamVjdGA7XG5cbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRpdGxlTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyRHVlRGF0ZUxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlckRlc2NyaXB0aW9uTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJpb3JpdHlMYWJlbCk7XG4gICAgaWYgKHRvRGlzcGxheVByb2plY3RBc3NvY2lhdGlvbikge1xuICAgICAgICB0YXNrSGVhZGVyLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctdGFzay1oZWFkZXJgKTtcbiAgICAgICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsKTtcbiAgICB9XG5cbiAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5T2ZUYXNrT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg0YCk7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza1Byb2plY3RBc3NvY2lhdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIFxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHRhc2stY29udGFpbmVyYCk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke2FycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrSW5kZXh9YCk7XG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrVGl0bGU7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEYXRlRHVlO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXMudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0YDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC10YXNrLWJ0bmApO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZWA7XG4gICAgICAgIHRhc2tEZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXRhc2stYnRuYCk7XG5cbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eVN0YXR1cyk7XG4gICAgICAgIGlmICh0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICAgICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBpZGAsIGBvdmVydmlldy10YXNrLWNvbnRhaW5lcmApO1xuICAgICAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdXR0b24pO1xuXG4gICAgICAgIGFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Rhc2tDb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWxsVGFza3NDb250YWluZXIpO1xuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdE9iamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RJbmZvSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsYWJlbGApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgY29uc3QgcHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgIGNvbnN0IHByb2plY3RFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgIFxuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1jb250YWluZXJgKTtcbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWluZm8tY29udGFpbmVyYCk7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1pbmZvLWhlYWRlcmApO1xuICAgIHByb2plY3RUaXRsZUxhYmVsLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtdGl0bGUtaGVhZGVyYCk7XG4gICAgcHJvamVjdER1ZURhdGUuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kYXRlLWR1ZWApO1xuICAgIHByb2plY3REZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWRlc2NyaXB0aW9uYCk7XG4gICAgcHJvamVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgYCR7cHJvamVjdE9iamVjdC5wcm9qZWN0SW5kZXh9YCk7XG4gICAgcHJvamVjdFRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSBgcHJvamVjdDpgO1xuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgIHByb2plY3REdWVEYXRlLnRleHRDb250ZW50ID0gYGR1ZTogJHtwcm9qZWN0T2JqZWN0LnByb2plY3REYXRlRHVlfWA7XG4gICAgcHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYGRlc2NyaXB0aW9uOiAke3Byb2plY3RPYmplY3QucHJvamVjdERlc2NyaXB0aW9ufWA7XG4gICAgcHJvamVjdEVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBgZWRpdCBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZSBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBlZGl0LXByb2plY3QtYnRuYCk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBkZWxldGUtcHJvamVjdC1idG5gKTtcblxuICAgIHByb2plY3RUaXRsZUxhYmVsLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG5cbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVMYWJlbCk7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RFZGl0QnV0dG9uKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RGVsZXRlQnV0dG9uKTtcblxuICAgIHByb2plY3RJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJbmZvSGVhZGVyKTtcbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SW5mb0NvbnRhaW5lcik7XG5cbiAgICByZXR1cm4gcHJvamVjdENvbnRhaW5lclxufVxuXG5mdW5jdGlvbiBkaXNwbGF5RXhpc3RpbmdQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QsIHByb2plY3RUYXNrc0FycmF5KSB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QpO1xuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IGRpc3BsYXlUYXNrcyhwcm9qZWN0VGFza3NBcnJheSwgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCwgZmFsc2UpO1xuICAgIHJldHVybiBwcm9qZWN0VGFza3Ncbn1cblxuLy8gdGhpcyBcIm1vZHVsZVwiIHJlLWxvYWRzIHRoZSBidXR0b25zIGFuZCBzZWxlY3RvcnMgZXZlcnkgcGFnZUxvYWQgd2l0aCB1cGRhdGVkIHByb2plY3RzQ3JlYXRlZCBkYXRhXG5mdW5jdGlvbiBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNDcmVhdGVkQXJyYXkpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdEhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1saXN0YCk7XG4gICAgY29uc3QgYWRkVGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWFzc29jaWF0ZWRgKTtcbiAgICBjb25zdCBlZGl0VGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LXByb2plY3QtYXNzb2NpYXRlZGApO1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBwcm9qZWN0c0NyZWF0ZWRBcnJheTtcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgYXJyYXlPZkNvbnRhaW5lcnMgPSBbcHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3JdO1xuXG4gICAgICAgIGFycmF5T2ZDb250YWluZXJzLmZvckVhY2goIChjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjb250YWluZXIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qZWN0QnV0dG9uc1RvUHJvamVjdExpc3QoKSB7XG5cbiAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKCAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGlkYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0SW5kZXgpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0TGlzdEJ1dHRvbmApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0TGlzdEhlYWQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGBkZWZhdWx0YCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3IChkZWZhdWx0KWA7XG4gICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYGRlZmF1bHRgKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3IChkZWZhdWx0KWA7XG4gICAgICAgIGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgXG4gICAgICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0SGVhZCwgYWRkVGFza1Byb2plY3RTZWxlY3RvciwgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IpO1xuICAgIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpO1xuICAgIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgICBsb2FkTWFpbkNvbnRlbnQsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge30gZnJvbSAnLi9kYXRhTW9kYWxIYW5kbGVyLmpzJ1xuaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzIH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcbmltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI25hdi1jb250YWluZXJgKTtcbmNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1idXR0b25gKTtcbmNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBwYWdlU2VsZWN0b3IpO1xucHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjb25zb2xlLmxvZyhlLnRhcmdldC50ZXh0Q29udGVudCkpO1xucHJvamVjdExpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBwcm9qZWN0TGlzdEJ1dHRvbmApIHtcbiAgICAgICAgcHJvamVjdFNlbGVjdG9yKGUpXG4gICAgfVxufSk7XG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGxvYWRNYWluQ29udGVudChjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHMsIG51bGwsIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcywgYG92ZXJ2aWV3YCk7XG59KSgpO1xuXG5mdW5jdGlvbiBwYWdlU2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IHBhZ2VTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgaWYgKHBhZ2VTZWxlY3RlZFRpdGxlID09PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIHBhZ2VTZWxlY3RlZFRpdGxlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2plY3RTZWxlY3RvcihlKSB7XG4gICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=