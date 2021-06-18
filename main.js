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


// module contains functions to open, close and submit addTask and addProject form modals
// const newObjectModalModule = (function() {

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
// })();

// module contains functions to open, close and submit editTask and editProject form modals
// const editObjectModalModule = (function() {
    const mainContainer = document.querySelector(`#main-content`);
    mainContainer.addEventListener(`click`, (e) => {
        e.stopPropagation();
        const currentPage = mainContainer.firstChild.firstChild.textContent;
        if (e.target.className === `edit-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditTaskModal(taskSelectedIndex, currentPage);
        } else if (e.target.className === `delete-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteTaskObject)(taskSelectedIndex, currentPage);
        } else if (e.target.id === `edit-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditProjectModal(projectSelectedTitle, projectSelectedIndex);
        } else if (e.target.id === `delete-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
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
        
        const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
        confirmEdits.addEventListener(`click`, (e) => {
            e.stopPropagation();
            if (checkFormValidation(editTaskInputs)) {
                (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeTaskEdits)(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
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

    function openEditProjectModal(projectToEditTitle, projectToEditIndex) {
        
        const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.getObjectArrays)();

        const editProjectModal = document.querySelector(`#editProjectModal`);
        editProjectModal.style.display = `block`;
        
        // pre-populate the edit form with existing data
        const editProjectInputs = document.querySelectorAll(`.editProjectInputs`);
        editProjectInputs[0].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectTitle}`);
        editProjectInputs[1].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDateDue}`);
        editProjectInputs[2].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDescription}`);
        
        const confirmEdits = document.querySelector(`#editProjectSubmitButton`);
        confirmEdits.addEventListener(`click`, (e) => {
            if (checkFormValidation(editProjectInputs)) {
                (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeProjectEdits)(editProjectInputs, projectToEditIndex, projectToEditTitle);
                e.preventDefault();
                closeEditOrDeleteModal(editProjectModal);
            }
        });
        
        const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
        cancelProjectEdits.addEventListener(`click`, (e) => {
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        })
        
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
// })();

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
    overviewContainer.classList.add(`project-container`);
    overviewContainer.appendChild(overviewTitle);
    
    const tasksToDisplay = displayTasks(arrayOfTaskObjects, overviewContainer)
    
    return tasksToDisplay
}

function displayTasks(arrayOfTaskObjects, container) {
    const allTasksContainer = document.createElement(`div`);
    allTasksContainer.classList.add(`project-tasks-container`);
    
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const newTaskContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h3`);
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
        newTaskContainer.appendChild(taskProjectAssociated);
        newTaskContainer.appendChild(taskEditButton);
        newTaskContainer.appendChild(taskDeleteButton);

        allTasksContainer.appendChild(newTaskContainer);
    }
    
    container.appendChild(allTasksContainer);
    return container
}

function displayProject(projectObject) {
    const projectContainer = document.createElement(`div`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectContainer.setAttribute(`data-index-number`, `${projectObject.projectIndex}`);
    projectTitle.textContent = projectObject.projectTitle;
    projectDueDate.textContent = projectObject.projectDateDue;
    projectDescription.textContent = projectObject.projectDescription;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.setAttribute(`id`, `edit-project-btn`);
    projectDeleteButton.setAttribute(`id`, `delete-project-btn`);

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDueDate);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectEditButton);
    projectContainer.appendChild(projectDeleteButton);

    return projectContainer
}

function displayExistingProject(projectToDisplayObject, projectTasksArray) {
    const projectContainerDisplayed = displayProject(projectToDisplayObject);
    const projectTasks = displayTasks(projectTasksArray, projectContainerDisplayed);
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
projectListContainer.addEventListener(`click`, projectSelector);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksK0VBQXFCO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxZQUFZLDRFQUFrQjtBQUM5QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFlBQVksMEVBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBLG1DQUFtQyx5RUFBZTs7QUFFbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELG9EQUFvRDtBQUN2RyxtREFBbUQsc0RBQXNEO0FBQ3pHLG1EQUFtRCwwREFBMEQ7O0FBRTdHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJFQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBLG1DQUFtQyx5RUFBZTs7QUFFbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNELDZEQUE2RDtBQUNuSCxzREFBc0QsK0RBQStEO0FBQ3JILHNEQUFzRCxtRUFBbUU7O0FBRXpIO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4RUFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkZBQTJGLHFCQUFxQjs7QUFFaEg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSw2RUFBbUI7QUFDL0IsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTGlEOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUksK0RBQWU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLHlCQUF5QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyw0QkFBNEI7QUFDbkU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLCtEQUFlO0FBQ3ZCLEtBQUs7QUFDTCxRQUFRLCtEQUFlO0FBQ3ZCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQsZ0NBQWdDO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCwyQkFBMkI7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDaktBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDcUI7QUFDVjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQix5RUFBZTtBQUM5QyxJQUFJLCtEQUFlO0FBQ25CLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHlFQUFlO0FBQ2xELFFBQVEsK0RBQWU7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLCtCQUErQix5RUFBZTtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLElBQUksZ0VBQWU7QUFDbkIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzLCBpbnN0YW50aWF0ZU5ld1Rhc2ssIGluc3RhbnRpYXRlTmV3UHJvamVjdCwgZmluYWxpemVUYXNrRWRpdHMsIGZpbmFsaXplUHJvamVjdEVkaXRzLCBkZWxldGVUYXNrT2JqZWN0LCBkZWxldGVQcm9qZWN0T2JqZWN0IH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcblxuLy8gbW9kdWxlIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGFkZFRhc2sgYW5kIGFkZFByb2plY3QgZm9ybSBtb2RhbHNcbi8vIGNvbnN0IG5ld09iamVjdE1vZGFsTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRUYXNrQnV0dG9uYCk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRQcm9qZWN0QnV0dG9uYCk7XG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9wZW5OZXdPYmplY3RNb2RhbCk7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9wZW5OZXdPYmplY3RNb2RhbCk7XG4gICAgXG4gICAgY29uc3QgcHJvamVjdFVzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9qZWN0VXNlcklucHV0c2ApO1xuICAgIGNvbnN0IHRhc2tVc2VySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAudGFza1VzZXJJbnB1dHNgKTtcbiAgICBcbiAgICBmdW5jdGlvbiBvcGVuTmV3T2JqZWN0TW9kYWwoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBhZGRPYmplY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tb2RhbGApO1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IGBhZGRUYXNrQnV0dG9uYCkge1xuICAgICAgICAgICAgYWRkT2JqZWN0TW9kYWxbMF0uc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRPYmplY3RNb2RhbFsyXS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFByb2plY3RTdWJtaXRCdXR0b25gKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tTdWJtaXRCdXR0b25gKTtcbiAgICBjb25zdCBjYW5jZWxQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3RgKTtcbiAgICBjb25zdCBjYW5jZWxUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tgKTtcbiAgICBcbiAgICBjYW5jZWxQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNsb3NlTmV3T2JqZWN0TW9kYWwoZS50YXJnZXQuaWQpKTtcbiAgICBjYW5jZWxUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNsb3NlTmV3T2JqZWN0TW9kYWwoZS50YXJnZXQuaWQpKTtcbiAgICBcbiAgICBzdWJtaXRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24ocHJvamVjdFVzZXJJbnB1dCkpIHtcbiAgICAgICAgICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdChwcm9qZWN0VXNlcklucHV0KTtcbiAgICAgICAgICAgIHN1Ym1pdE5ld09iamVjdEZvcm0oZSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIHN1Ym1pdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbih0YXNrVXNlcklucHV0KSkge1xuICAgICAgICAgICAgaW5zdGFudGlhdGVOZXdUYXNrKHRhc2tVc2VySW5wdXQpO1xuICAgICAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgZnVuY3Rpb24gc3VibWl0TmV3T2JqZWN0Rm9ybShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZU5ld09iamVjdE1vZGFsKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNsb3NlTmV3T2JqZWN0TW9kYWwoYnV0dG9uSUQpIHtcbiAgICAgICAgY29uc3QgbW9kYWxUb0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1vZGFsYCk7XG4gICAgICAgIGNvbnN0IGZvcm1Ub1Jlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmZvcm1GaWVsZGApO1xuICAgICAgICBpZiAoYnV0dG9uSUQgPT09IGBhZGRQcm9qZWN0U3VibWl0QnV0dG9uYCB8fCBidXR0b25JRCA9PT0gYGNhbmNlbFByb2plY3RgKSB7XG4gICAgICAgICAgICBtb2RhbFRvQ2xvc2VbMl0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzJdLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbFRvQ2xvc2VbMF0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzBdLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4vLyB9KSgpO1xuXG4vLyBtb2R1bGUgY29udGFpbnMgZnVuY3Rpb25zIHRvIG9wZW4sIGNsb3NlIGFuZCBzdWJtaXQgZWRpdFRhc2sgYW5kIGVkaXRQcm9qZWN0IGZvcm0gbW9kYWxzXG4vLyBjb25zdCBlZGl0T2JqZWN0TW9kYWxNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcbiAgICBtYWluQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBtYWluQ29udGFpbmVyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGVkaXQtdGFzay1idG5gKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrU2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5FZGl0VGFza01vZGFsKHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXRhc2stYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgICAgICBkZWxldGVUYXNrT2JqZWN0KHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT09IGBlZGl0LXByb2plY3QtYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RTZWxlY3RlZFRpdGxlLCBwcm9qZWN0U2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT09IGBkZWxldGUtcHJvamVjdC1idG5gKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICAgICAgb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvcGVuRWRpdFRhc2tNb2RhbCh0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrTW9kYWxgKTtcbiAgICAgICAgZWRpdFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgXG4gICAgICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgdGV4dCBpbnB1dHMgd2l0aCBleGlzdGluZyBkYXRhXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmVkaXRUYXNrSW5wdXRzYCk7XG4gICAgICAgIGVkaXRUYXNrSW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrVGl0bGV9YCk7XG4gICAgICAgIGVkaXRUYXNrSW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGF0ZUR1ZX1gKTtcbiAgICAgICAgZWRpdFRhc2tJbnB1dHNbMl0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tEZXNjcmlwdGlvbn1gKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbmZpcm1FZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0VGFza1N1Ym1pdEJ1dHRvbmApO1xuICAgICAgICBjb25maXJtRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRUYXNrSW5wdXRzKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsaXplVGFza0VkaXRzKGVkaXRUYXNrSW5wdXRzLCB0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsVGFza0VkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tFZGl0YCk7XG4gICAgICAgIGNhbmNlbFRhc2tFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRUYXNrTW9kYWwpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RUb0VkaXRUaXRsZSwgcHJvamVjdFRvRWRpdEluZGV4KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcblxuICAgICAgICBjb25zdCBlZGl0UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0TW9kYWxgKTtcbiAgICAgICAgZWRpdFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgXG4gICAgICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgZWRpdCBmb3JtIHdpdGggZXhpc3RpbmcgZGF0YVxuICAgICAgICBjb25zdCBlZGl0UHJvamVjdElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0UHJvamVjdElucHV0c2ApO1xuICAgICAgICBlZGl0UHJvamVjdElucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdFRpdGxlfWApO1xuICAgICAgICBlZGl0UHJvamVjdElucHV0c1sxXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdERhdGVEdWV9YCk7XG4gICAgICAgIGVkaXRQcm9qZWN0SW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb259YCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb25maXJtRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFByb2plY3RTdWJtaXRCdXR0b25gKTtcbiAgICAgICAgY29uZmlybUVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRQcm9qZWN0SW5wdXRzKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsaXplUHJvamVjdEVkaXRzKGVkaXRQcm9qZWN0SW5wdXRzLCBwcm9qZWN0VG9FZGl0SW5kZXgsIHByb2plY3RUb0VkaXRUaXRsZSk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3RFZGl0YCk7XG4gICAgICAgIGNhbmNlbFByb2plY3RFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRQcm9qZWN0TW9kYWwpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuRGVsZXRlUHJvamVjdE1vZGFsKHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCkge1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0VG9EZWxldGVJbmRleCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybURlbGV0ZVByb2plY3RgKVxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtLWRlbGV0ZS10ZXh0YCk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RNZXNzYWdlLnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHByb2plY3QgXCIke3Byb2plY3RUb0RlbGV0ZVRpdGxlfVwiIGFuZCBhbGwgb2YgaXRzIHRhc2tzP2A7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb25maXJtRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm1Qcm9qZWN0RGVsZXRlYCk7XG4gICAgICAgIGNvbnN0IGNhbmNlbERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0RGVsZXRlYCk7XG4gICAgICAgIFxuICAgICAgICBjb25maXJtRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoIGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGRlbGV0ZVByb2plY3RNb2RhbCk7XG4gICAgICAgICAgICBkZWxldGVQcm9qZWN0T2JqZWN0KHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCk7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjYW5jZWxEZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGRlbGV0ZVByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKG1vZGFsVG9DbG9zZSkge1xuICAgICAgICBjb25zdCBmb3JtVG9SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5mb3JtRmllbGRgKTtcbiAgICAgICAgbW9kYWxUb0Nsb3NlLnN0eWxlLmRpc3BsYXkgPSBgbm9uZWA7XG4gICAgICAgIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRUYXNrTW9kYWwpIHtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzFdLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kYWxUb0Nsb3NlID09PSBlZGl0UHJvamVjdE1vZGFsKSB7XG4gICAgICAgICAgICBmb3JtVG9SZXNldFszXS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuLy8gfSkoKTtcblxuZnVuY3Rpb24gY2hlY2tGb3JtVmFsaWRhdGlvbihpbnB1dE5vZGVMaXN0KSB7XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGlucHV0Tm9kZUxpc3QuZm9yRWFjaCggaW5wdXRGaWVsZCA9PiB7XG4gICAgICAgIGlmIChpbnB1dEZpZWxkLnZhbGlkaXR5LnZhbHVlTWlzc2luZykge1xuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaXNWYWxpZFxufSIsImltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxubGV0IHByb2plY3RzQ3JlYXRlZCA9IFtcbiAgICB7XG4gICAgICAgIHByb2plY3RUaXRsZTogYHRvZG8gbGlzdGAsXG4gICAgICAgIHByb2plY3REYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbjogYHRoaXMgaXMgYSBwcm9qZWN0IGZvciB0aGUgb2RpbiBwcm9qZWN0YCxcbiAgICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9qZWN0VGl0bGU6IGBrZWVwIGdyaW5kaW5nYCxcbiAgICAgICAgcHJvamVjdERhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHRlc3QgcHJvamVjdCBmb3IgbXkgYnVnZ3kgdG9kbyBsaXN0IGFwcGAsXG4gICAgICAgIHByb2plY3RJbmRleDogMSxcbiAgICB9LFxuXTtcblxubGV0IHRhc2tzQ3JlYXRlZCA9IFtcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYHJlZmFjdG9yIGNvZGVgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdGAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGhpZ2hgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGB0b2RvIGxpc3RgLFxuICAgICAgICB0YXNrSW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYG1ha2UgcHJvZ3Jlc3NgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMTJgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdGAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGhpZ2hgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGB0b2RvIGxpc3RgLFxuICAgICAgICB0YXNrSW5kZXg6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYGRvIG1vcmVgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMTNgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdGAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGhpZ2hgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGBkZWZhdWx0YCxcbiAgICAgICAgdGFza0luZGV4OiAyLFxuICAgIH1cbl07XG5cbmZ1bmN0aW9uIGdldE9iamVjdEFycmF5cygpIHtcbiAgICBjb25zdCB0YXNrQXJyYXlzID0ge1xuICAgICAgICBwcm9qZWN0czogcHJvamVjdHNDcmVhdGVkLFxuICAgICAgICB0YXNrczogdGFza3NDcmVhdGVkXG4gICAgfVxuICAgIHJldHVybiB0YXNrQXJyYXlzXG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHByb2plY3RUaXRsZSwgcHJvamVjdERhdGVEdWUsIHByb2plY3REZXNjcmlwdGlvbiwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xuICAgICAgICB0aGlzLnByb2plY3REYXRlRHVlID0gcHJvamVjdERhdGVEdWU7XG4gICAgICAgIHRoaXMucHJvamVjdERlc2NyaXB0aW9uID0gcHJvamVjdERlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnByb2plY3RJbmRleCA9IHByb2plY3RJbmRleDtcbiAgICB9XG59XG5cbmNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRhc2tUaXRsZSwgdGFza0RhdGVEdWUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza1ByaW9yaXR5U3RhdHVzLCB0YXNrUHJvamVjdEFzc29jaWF0ZWQsIHRhc2tJbmRleCkge1xuICAgICAgICB0aGlzLnRhc2tUaXRsZSA9IHRhc2tUaXRsZTtcbiAgICAgICAgdGhpcy50YXNrRGF0ZUR1ZSA9IHRhc2tEYXRlRHVlO1xuICAgICAgICB0aGlzLnRhc2tEZXNjcmlwdGlvbiA9IHRhc2tEZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy50YXNrUHJpb3JpdHlTdGF0dXMgPSB0YXNrUHJpb3JpdHlTdGF0dXM7XG4gICAgICAgIHRoaXMudGFza1Byb2plY3RBc3NvY2lhdGVkID0gdGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgICAgICB0aGlzLnRhc2tJbmRleCA9IHRhc2tJbmRleDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlTmV3VGFzayhuZXdUYXNrTW9kYWxJbnB1dHMsIHBhZ2VUb1JlZnJlc2gpIHtcbiAgICBcbiAgICBjb25zdCBuZXdUYXNrSW5wdXRBcnJheSA9IEFycmF5LmZyb20obmV3VGFza01vZGFsSW5wdXRzKTtcbiAgICBjb25zdCBuZXdUYXNrVGl0bGUgPSBuZXdUYXNrSW5wdXRBcnJheVswXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrRGF0ZUR1ZSA9IG5ld1Rhc2tJbnB1dEFycmF5WzFdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tEZXNjcmlwdGlvbiA9IG5ld1Rhc2tJbnB1dEFycmF5WzJdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eVN0YXR1cyA9IG5ld1Rhc2tJbnB1dEFycmF5WzNdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IG5ld1Rhc2tJbnB1dEFycmF5WzRdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tJbmRleCA9IHRhc2tzQ3JlYXRlZC5sZW5ndGg7XG4gICAgXG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKG5ld1Rhc2tUaXRsZSwgbmV3VGFza0RhdGVEdWUsIG5ld1Rhc2tEZXNjcmlwdGlvbiwgbmV3VGFza1ByaW9yaXR5U3RhdHVzLCBuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQsIG5ld1Rhc2tJbmRleCk7XG4gICAgdGFza3NDcmVhdGVkLnB1c2gobmV3VGFzayk7XG5cbiAgICBjb25zdCBwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCA9IHByb2plY3RzQ3JlYXRlZC5maW5kKG9iamVjdCA9PiBvYmplY3QucHJvamVjdFRpdGxlID09PSBuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgIFxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkLCB0YXNrc1RvTG9hZCk7XG59XG4gICAgICAgIFxuZnVuY3Rpb24gaW5zdGFudGlhdGVOZXdQcm9qZWN0KG5ld1Byb2plY3RNb2RhbElucHV0cykge1xuICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdQcm9qZWN0TW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RUaXRsZSA9IG5ld1Byb2plY3RJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3REYXRlRHVlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERlc2NyaXB0aW9uID0gbmV3UHJvamVjdElucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdEluZGV4ID0gcHJvamVjdHNDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QobmV3UHJvamVjdFRpdGxlLCBuZXdQcm9qZWN0RGF0ZUR1ZSwgbmV3UHJvamVjdERlc2NyaXB0aW9uLCBuZXdQcm9qZWN0SW5kZXgpO1xuICAgIHByb2plY3RzQ3JlYXRlZC5wdXNoKG5ld1Byb2plY3QpO1xuXG4gICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgbmV3UHJvamVjdCwgbnVsbCwgYG5ldyBwcm9qZWN0YCk7XG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplVGFza0VkaXRzKGVkaXRNb2RhbElucHV0cywgdGFyZ2V0SW5kZXgsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgY29uc3QgZWRpdGVkVGFza1RpdGxlID0gZWRpdE1vZGFsSW5wdXRzWzBdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEYXRlRHVlID0gZWRpdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEZXNjcmlwdGlvbiA9IGVkaXRNb2RhbElucHV0c1syXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrUHJpb3JpdHlTdGF0dXMgPSBlZGl0TW9kYWxJbnB1dHNbM10udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza1Byb2plY3RBc3NvY2FpdGVkID0gZWRpdE1vZGFsSW5wdXRzWzRdLnZhbHVlO1xuXG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrVGl0bGUgPSBlZGl0ZWRUYXNrVGl0bGU7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrRGF0ZUR1ZSA9IGVkaXRlZFRhc2tEYXRlRHVlO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza0Rlc2NyaXB0aW9uID0gZWRpdGVkVGFza0Rlc2NyaXB0aW9uO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1ByaW9yaXR5U3RhdHVzID0gZWRpdGVkVGFza1ByaW9yaXR5U3RhdHVzO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdGVkVGFza1Byb2plY3RBc3NvY2FpdGVkO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrT2JqZWN0KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgdGFza3NDcmVhdGVkLnNwbGljZShpbmRleE9mVGFza1RvRGVsZXRlLCAxKTtcbiAgICB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhPZlRhc2tUb0RlbGV0ZTsgaSA8IHRhc2tzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXNrc0NyZWF0ZWRbaV0udGFza0luZGV4ID0gaTtcbiAgICB9XG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVByb2plY3RFZGl0cyhlZGl0UHJvamVjdE1vZGFsSW5wdXRzLCB0YXJnZXRQcm9qZWN0SW5kZXgsIGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG5cbiAgICBsZXQgdGFza3NUb0xvYWQgPSBudWxsO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3RUaXRsZSA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMF0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdERhdGVEdWUgPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3REZXNjcmlwdGlvbiA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMl0udmFsdWU7XG5cbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0VGl0bGUgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdERhdGVEdWUgPSBlZGl0ZWRQcm9qZWN0RGF0ZUR1ZTtcbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb24gPSBlZGl0ZWRQcm9qZWN0RGVzY3JpcHRpb25cblxuICAgIGlmIChlZGl0ZWRQcm9qZWN0VGl0bGUgIT09IGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihleGlzdGluZ1Byb2plY3RUaXRsZSk7XG4gICAgICAgIHRhc2tzVG9Mb2FkLmZvckVhY2goIHRhc2tPYmplY3QgPT4ge1xuICAgICAgICAgICAgdGFza09iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGV4aXN0aW5nUHJvamVjdFRpdGxlKTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XSwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T2JqZWN0KHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCkge1xuICAgIGxldCB0YXNrSW5kZXhGb3JEZWxldGlvbiA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoIChvYmplY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChvYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0VG9EZWxldGVUaXRsZSkge1xuICAgICAgICAgICAgdGFza0luZGV4Rm9yRGVsZXRpb24ucHVzaChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGRlbGV0ZXMgdGhlIHRhc2tzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZGVsZXRlZCBwcm9qZWN0IGFuZCB1cGRhdGVzIHRoZSByZW1haW5pbmcgdGFzayBpbmRpY2VzXG4gICAgZm9yIChsZXQgaSA9IHRhc2tJbmRleEZvckRlbGV0aW9uLmxlbmd0aDsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgdGFza3NDcmVhdGVkLnNwbGljZSh0YXNrSW5kZXhGb3JEZWxldGlvbltpLTFdLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqIDwgdGFza3NDcmVhdGVkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB0YXNrc0NyZWF0ZWRbal0udGFza0luZGV4ID0gajtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2plY3RzQ3JlYXRlZC5zcGxpY2UocHJvamVjdFRvRGVsZXRlSW5kZXgsIDEpO1xuXG4gICAgdXBkYXRlUHJvamVjdEluZGV4KHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdEluZGV4KGluZGV4T2ZEZWxldGVkUHJvamVjdCkge1xuICAgIGZvciAobGV0IGkgPSBpbmRleE9mRGVsZXRlZFByb2plY3Q7IGkgPCBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvamVjdHNDcmVhdGVkW2ldLnByb2plY3RJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgbG9hZENvbnRlbnRIZWxwZXIobnVsbCwgdGFza3NDcmVhdGVkKTtcbn1cblxuZnVuY3Rpb24gdGFza0ZpbHRlcihwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgbGV0IHRhc2tzQXNzb2NpYXRlZCA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdEFzc29jaWF0ZWRUaXRsZSkge1xuICAgICAgICAgICAgdGFza3NBc3NvY2lhdGVkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0YXNrc0Fzc29jaWF0ZWRcbn1cblxuZnVuY3Rpb24gbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCkge1xuICAgIGlmICghcHJvamVjdE9iamVjdFRvTG9hZCkge1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBudWxsLCB0YXNrc0NyZWF0ZWQsIGBvdmVydmlld2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIHByb2plY3RPYmplY3RUb0xvYWQsIHRhc2tzQXJyYXlUb0xvYWQsIHByb2plY3RPYmplY3RUb0xvYWQucHJvamVjdFRpdGxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgZ2V0T2JqZWN0QXJyYXlzLFxuICAgIGluc3RhbnRpYXRlTmV3VGFzayxcbiAgICBpbnN0YW50aWF0ZU5ld1Byb2plY3QsXG4gICAgZmluYWxpemVUYXNrRWRpdHMsXG4gICAgZmluYWxpemVQcm9qZWN0RWRpdHMsXG4gICAgZGVsZXRlVGFza09iamVjdCxcbiAgICBkZWxldGVQcm9qZWN0T2JqZWN0LFxufSIsImNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG5cbmZ1bmN0aW9uIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0FycmF5LCBwcm9qZWN0VG9Mb2FkLCB0YXNrc0FycmF5LCBwYWdlVG9EaXNwbGF5KSB7XG4gICAgd2hpbGUgKG1haW5Db250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluQ29udGFpbmVyLnJlbW92ZUNoaWxkKG1haW5Db250YWluZXIuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgaWYgKHBhZ2VUb0Rpc3BsYXkgPT09IGBvdmVydmlld2ApIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVRhc2tzT3ZlcnZpZXcodGFza3NBcnJheSk7XG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9IGVsc2UgaWYgKHBhZ2VUb0Rpc3BsYXkgPT09IGBuZXcgcHJvamVjdGApIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVByb2plY3QocHJvamVjdFRvTG9hZClcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlFeGlzdGluZ1Byb2plY3QocHJvamVjdFRvTG9hZCwgdGFza3NBcnJheSlcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH1cbiAgICBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNBcnJheSlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzT3ZlcnZpZXcoYXJyYXlPZlRhc2tPYmplY3RzKSB7XG4gICAgY29uc3Qgb3ZlcnZpZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBvdmVydmlld1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDJgKTtcbiAgICBvdmVydmlld1RpdGxlLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3YDtcbiAgICBvdmVydmlld0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWNvbnRhaW5lcmApO1xuICAgIG92ZXJ2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJ2aWV3VGl0bGUpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tzVG9EaXNwbGF5ID0gZGlzcGxheVRhc2tzKGFycmF5T2ZUYXNrT2JqZWN0cywgb3ZlcnZpZXdDb250YWluZXIpXG4gICAgXG4gICAgcmV0dXJuIHRhc2tzVG9EaXNwbGF5XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrcyhhcnJheU9mVGFza09iamVjdHMsIGNvbnRhaW5lcikge1xuICAgIGNvbnN0IGFsbFRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgYWxsVGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC10YXNrcy1jb250YWluZXJgKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5T2ZUYXNrT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgzYCk7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza1Byb2plY3RBc3NvY2lhdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIFxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHRhc2stY29udGFpbmVyYCk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke2FycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrSW5kZXh9YCk7XG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrVGl0bGU7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEYXRlRHVlO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXMudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0YDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC10YXNrLWJ0bmApO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZWA7XG4gICAgICAgIHRhc2tEZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXRhc2stYnRuYCk7XG5cbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eVN0YXR1cyk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWRpdEJ1dHRvbik7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0RlbGV0ZUJ1dHRvbik7XG5cbiAgICAgICAgYWxsVGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGFza0NvbnRhaW5lcik7XG4gICAgfVxuICAgIFxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhbGxUYXNrc0NvbnRhaW5lcik7XG4gICAgcmV0dXJuIGNvbnRhaW5lclxufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0T2JqZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgY29uc3QgcHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgIGNvbnN0IHByb2plY3RFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgIFxuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1jb250YWluZXJgKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShgZGF0YS1pbmRleC1udW1iZXJgLCBgJHtwcm9qZWN0T2JqZWN0LnByb2plY3RJbmRleH1gKTtcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICBwcm9qZWN0RHVlRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdERhdGVEdWU7XG4gICAgcHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0RGVzY3JpcHRpb247XG4gICAgcHJvamVjdEVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBgZWRpdCBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZSBwcm9qZWN0YDtcbiAgICBwcm9qZWN0RWRpdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGlkYCwgYGVkaXQtcHJvamVjdC1idG5gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShgaWRgLCBgZGVsZXRlLXByb2plY3QtYnRuYCk7XG5cbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RHVlRGF0ZSk7XG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RGVzY3JpcHRpb24pO1xuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRCdXR0b24pO1xuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdENvbnRhaW5lclxufVxuXG5mdW5jdGlvbiBkaXNwbGF5RXhpc3RpbmdQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QsIHByb2plY3RUYXNrc0FycmF5KSB7XG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3RUb0Rpc3BsYXlPYmplY3QpO1xuICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IGRpc3BsYXlUYXNrcyhwcm9qZWN0VGFza3NBcnJheSwgcHJvamVjdENvbnRhaW5lckRpc3BsYXllZCk7XG4gICAgcmV0dXJuIHByb2plY3RUYXNrc1xufVxuXG4vLyB0aGlzIFwibW9kdWxlXCIgcmUtbG9hZHMgdGhlIGJ1dHRvbnMgYW5kIHNlbGVjdG9ycyBldmVyeSBwYWdlTG9hZCB3aXRoIHVwZGF0ZWQgcHJvamVjdHNDcmVhdGVkIGRhdGFcbmZ1bmN0aW9uIHByb2plY3RCdXR0b25zQW5kU2VsZWN0b3JzSGFuZGxlcihwcm9qZWN0c0NyZWF0ZWRBcnJheSkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0SGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWxpc3RgKTtcbiAgICBjb25zdCBhZGRUYXNrUHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtYXNzb2NpYXRlZGApO1xuICAgIGNvbnN0IGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXQtcHJvamVjdC1hc3NvY2lhdGVkYCk7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IHByb2plY3RzQ3JlYXRlZEFycmF5O1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRXhpc3RpbmdFbGVtZW50cyhwcm9qZWN0TGlzdCwgYWRkU2VsZWN0b3IsIGVkaXRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBhcnJheU9mQ29udGFpbmVycyA9IFtwcm9qZWN0TGlzdCwgYWRkU2VsZWN0b3IsIGVkaXRTZWxlY3Rvcl07XG5cbiAgICAgICAgYXJyYXlPZkNvbnRhaW5lcnMuZm9yRWFjaCggKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpIHtcblxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShgaWRgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShgZGF0YS1pbmRleC1udW1iZXJgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RJbmRleCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHByb2plY3RMaXN0SGVhZC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qZWN0c1RvU2VsZWN0b3JzKCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYG9wdGlvbmApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYGRlZmF1bHRgKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcbiAgICAgICAgYWRkVGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcbiAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaCggKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICBcbiAgICAgICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvcik7XG4gICAgICAgICAgICBlZGl0VGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3RIZWFkLCBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLCBlZGl0VGFza1Byb2plY3RTZWxlY3Rvcik7XG4gICAgYXBwZW5kUHJvamVjdEJ1dHRvbnNUb1Byb2plY3RMaXN0KCk7XG4gICAgYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpO1xufVxuXG5leHBvcnQge1xuICAgIGxvYWRNYWluQ29udGVudCxcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7fSBmcm9tICcuL2RhdGFNb2RhbEhhbmRsZXIuanMnXG5pbXBvcnQgeyBnZXRPYmplY3RBcnJheXMgfSBmcm9tICcuL29iamVjdERhdGFNYW5hZ2VtZW50LmpzJ1xuaW1wb3J0IHsgbG9hZE1haW5Db250ZW50IH0gZnJvbSAnLi9wYWdlTG9hZGVyLmpzJ1xuXG5jb25zdCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbmF2LWNvbnRhaW5lcmApO1xuY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWJ1dHRvbmApO1xuY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1saXN0YCk7XG5cbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHBhZ2VTZWxlY3Rvcik7XG5wcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNvbnNvbGUubG9nKGUudGFyZ2V0LnRleHRDb250ZW50KSk7XG5wcm9qZWN0TGlzdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHByb2plY3RTZWxlY3Rvcik7XG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGxvYWRNYWluQ29udGVudChjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHMsIG51bGwsIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcywgYG92ZXJ2aWV3YCk7XG59KSgpO1xuXG5mdW5jdGlvbiBwYWdlU2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IHBhZ2VTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgaWYgKHBhZ2VTZWxlY3RlZFRpdGxlID09PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIHBhZ2VTZWxlY3RlZFRpdGxlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2plY3RTZWxlY3RvcihlKSB7XG4gICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=