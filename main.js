/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayNewItems.js":
/*!********************************!*\
  !*** ./src/displayNewItems.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayTasksOverview\": () => (/* binding */ displayTasksOverview),\n/* harmony export */   \"displayNewProject\": () => (/* binding */ displayNewProject),\n/* harmony export */   \"displayExistingProject\": () => (/* binding */ displayExistingProject),\n/* harmony export */   \"appendProjectToProjectList\": () => (/* binding */ appendProjectToProjectList)\n/* harmony export */ });\n/* harmony import */ var _taskCreation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskCreation.js */ \"./src/taskCreation.js\");\n\n\nfunction displayTasksOverview(arrayOfTaskObjects) {\n    const overviewContainer = document.createElement(`div`);\n    const overviewTitle = document.createElement(`h2`);\n    overviewTitle.textContent = `overview`;\n    overviewContainer.classList.add(`project-container`);\n    overviewContainer.appendChild(overviewTitle);\n    \n    const tasksToDisplay = displayTasks(arrayOfTaskObjects, overviewContainer)\n    \n    return tasksToDisplay\n}\n\nfunction displayTasks(arrayOfTaskObjects, container) {\n    const allTasksContainer = document.createElement(`div`);\n    allTasksContainer.classList.add(`project-tasks-container`);\n    allTasksContainer.addEventListener(`click`, (e) => {\n        if (e.target.tagName === `BUTTON` && e.target.textContent === `edit`) {\n            const taskToEditTitle = e.target.parentNode.firstChild.textContent;\n            const taskToEditProjectAssociated = e.target.previousSibling.textContent;\n            const titleOfPageDisplayed = e.target.parentNode.parentNode.parentNode.firstChild.textContent;\n            (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_0__.editTaskObject)(taskToEditTitle, taskToEditProjectAssociated, titleOfPageDisplayed);\n        } else if (e.target.tagName === `BUTTON` && e.target.textContent === `delete`) {\n            const taskToDeleteTitle = e.target.parentNode.firstChild.textContent;\n            const taskToDeleteProjectAssociated = e.target.previousSibling.previousSibling.textContent;\n            const titleOfPageDisplayed = e.target.parentNode.parentNode.parentNode.firstChild.textContent;\n            console.log(taskToDeleteTitle)\n            console.log(taskToDeleteProjectAssociated)\n            console.log(titleOfPageDisplayed)\n            ;(0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_0__.deleteTaskObject)(taskToDeleteTitle, taskToDeleteProjectAssociated, titleOfPageDisplayed);\n        }\n    });\n    for (let i = 0; i < arrayOfTaskObjects.length; i++) {\n        const newTaskContainer = document.createElement(`div`);\n        const taskTitle = document.createElement(`h3`);\n        const taskDueDate = document.createElement(`p`);\n        const taskDescription = document.createElement(`p`);\n        const taskPriorityStatus = document.createElement(`p`);\n        const taskProjectAssociated = document.createElement(`p`);\n        const taskEditButton = document.createElement(`button`);\n        const taskDeleteButton = document.createElement(`button`);\n        \n        newTaskContainer.classList.add(`task-container`);\n        taskTitle.textContent = arrayOfTaskObjects[i].title;\n        taskDueDate.textContent = arrayOfTaskObjects[i].dateDue;\n        taskDescription.textContent = arrayOfTaskObjects[i].description;\n        taskPriorityStatus.textContent = arrayOfTaskObjects[i].priorityStatus;\n        taskProjectAssociated.textContent = arrayOfTaskObjects[i].projectAssociated;\n        taskEditButton.textContent = `edit`;\n        taskDeleteButton.textContent = `delete`;\n\n        newTaskContainer.appendChild(taskTitle);\n        newTaskContainer.appendChild(taskDueDate);\n        newTaskContainer.appendChild(taskDescription);\n        newTaskContainer.appendChild(taskPriorityStatus);\n        newTaskContainer.appendChild(taskProjectAssociated);\n        newTaskContainer.appendChild(taskEditButton);\n        newTaskContainer.appendChild(taskDeleteButton);\n\n        allTasksContainer.appendChild(newTaskContainer);\n    }\n    \n    container.appendChild(allTasksContainer);\n    return container\n}\n\nfunction displayNewProject(newProjectObject) {\n    const projectContainer = document.createElement(`div`);\n    const projectTitle = document.createElement(`h2`);\n    const projectDueDate = document.createElement(`p`);\n    const projectDescription = document.createElement(`p`);\n    const projectEditButton = document.createElement(`button`);\n    const projectDeleteButton = document.createElement(`button`);\n    \n    projectContainer.classList.add(`project-container`);\n    projectTitle.textContent = newProjectObject.title;\n    projectDueDate.textContent = newProjectObject.dateDue;\n    projectDescription.textContent = newProjectObject.description;\n    projectEditButton.textContent = `edit project`;\n    projectDeleteButton.textContent = `delete project`;\n    projectEditButton.classList.add(`project-display-button`);\n    projectDeleteButton.classList.add(`project-display-button`);\n\n    projectEditButton.addEventListener(`click`, (e) => {\n        if (e.target.tagName === `BUTTON` && e.target.textContent === `edit project`) {\n            const buttonStored = e.target.textContent;\n            const projectToEditTitle = e.target.parentNode.firstChild.textContent;\n            const projectToEditDescription = e.target.previousSibling.textContent;\n            (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_0__.editProjectObject)(projectToEditTitle, projectToEditDescription);\n        }\n    });\n\n    projectContainer.appendChild(projectTitle);\n    projectContainer.appendChild(projectDueDate);\n    projectContainer.appendChild(projectDescription);\n    projectContainer.appendChild(projectEditButton);\n    projectContainer.appendChild(projectDeleteButton);\n\n    return projectContainer\n}\n\nfunction displayExistingProject(projectObject, taskObject) {\n    const projectContainerDisplayed = displayNewProject(projectObject);\n    const projectTasks = displayTasks(taskObject, projectContainerDisplayed);\n    return projectTasks\n}\n\nfunction appendProjectToProjectList(projectTitle) {\n    const projectListHead = document.querySelector(`#project-list`);\n    const newProjectTitle = document.createElement(`button`);\n    newProjectTitle.textContent = projectTitle;\n\n    projectListHead.appendChild(newProjectTitle);\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/displayNewItems.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"regenerateProjectTasks\": () => (/* binding */ regenerateProjectTasks)\n/* harmony export */ });\n/* harmony import */ var _pageLoad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageLoad.js */ \"./src/pageLoad.js\");\n/* harmony import */ var _taskCreation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskCreation.js */ \"./src/taskCreation.js\");\n/* harmony import */ var _displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayNewItems.js */ \"./src/displayNewItems.js\");\n\n\n\n\nconst addTaskContainer = document.querySelector(`#add-task-container`);\nconst navContainer = document.querySelector(`#nav-container`);\nconst projectButton = document.querySelector(`#project-button`);\nconst projectListContainer = document.querySelector(`#project-list`);\nconst mainContainer = document.querySelector(`#main-content`);\n\naddTaskContainer.addEventListener(`click`, _pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.openModal);\nnavContainer.addEventListener(`click`, pageSelector);\nprojectButton.addEventListener(`click`, (e) => console.log(e.target.textContent));\nprojectListContainer.addEventListener(`click`, projectSelector);\n\nlet currentObjectArray = (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();\n(0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayTasksOverview)(currentObjectArray.tasks));\n\nfunction pageSelector(e) {\n    if (e.target.textContent === `overview`) {\n        currentObjectArray = (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();\n        (0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayTasksOverview)(currentObjectArray.tasks));\n    }\n}\n\nfunction projectSelector(e) {\n    const projectSelected = e.target.textContent;\n    regenerateProjectTasks(projectSelected);\n}\n\nfunction regenerateProjectTasks(pageTitle) {\n    currentObjectArray = (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();\n    if (pageTitle === `overview`) {\n        (0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayTasksOverview)(currentObjectArray.tasks));\n    } else {\n        const projectDisplayedObject = currentObjectArray.projects.filter( object => {\n            if (object.title === pageTitle) {\n                return object;\n            }\n        })\n        const filterTasks = currentObjectArray.tasks.filter( object => {\n            if (object.projectAssociated === pageTitle) {\n                return object\n            }\n        })\n        ;(0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayExistingProject)(projectDisplayedObject[0], filterTasks));\n    }\n}\n\nconst createTaskAndProjectModule = (function() {\n\n    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);\n    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);\n\n    function checkFormValidation(inputNodeList) {\n        let isValid = true;\n        inputNodeList.forEach( inputField => {\n            if (inputField.validity.valueMissing) {\n                isValid = false;\n            }\n        })\n        return isValid\n    }\n\n    function instantiateNewProject() {\n        const projectInputArray = Array.from(projectUserInput);\n        (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.createNewProject)(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value);\n        currentObjectArray = (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();\n        let projectIndex = currentObjectArray.projects.length - 1;\n        (0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayNewProject)(currentObjectArray.projects[projectIndex]));\n        appendNewProjectToSelector(projectInputArray[0].value);\n        attachDataToProjectButton(projectIndex);\n    }\n\n    function attachDataToProjectButton(indexNumber) {\n        const newProjectButton = projectListContainer.lastChild;\n        newProjectButton.setAttribute(`data-index-number`, indexNumber);\n    }\n\n    function appendNewProjectToSelector(newProjectTitle) {\n        const addTaskProjectSelector = document.querySelector(`#project-associated`);\n        const editTaskProjectSelector = document.querySelector(`#edit-project-associated`);\n        \n        const projectForAddTaskSelector = document.createElement(`option`);\n        projectForAddTaskSelector.setAttribute(`value`, newProjectTitle);\n        projectForAddTaskSelector.textContent = newProjectTitle;\n        \n        const projectForEditTaskSelector = document.createElement(`option`);\n        projectForEditTaskSelector.setAttribute(`value`, newProjectTitle);\n        projectForEditTaskSelector.textContent = newProjectTitle;\n\n        addTaskProjectSelector.appendChild(projectForAddTaskSelector);\n        editTaskProjectSelector.appendChild(projectForEditTaskSelector);\n    }\n\n    function instantiateNewTask() {\n        const taskInputArray = Array.from(taskUserInput);\n        const currentPageDisplayed = mainContainer.firstChild.firstChild.textContent;\n        (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.createNewTask)(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value, taskInputArray[4].value);\n        currentObjectArray = (0,_taskCreation_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();\n        let newTaskIndex = currentObjectArray.tasks.length - 1;\n        if (currentPageDisplayed === `overview`) {\n            (0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(mainContainer, (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_2__.displayTasksOverview)(currentObjectArray.tasks));\n        } else if (currentPageDisplayed === currentObjectArray.tasks[newTaskIndex].projectAssociated) {\n            regenerateProjectTasks(currentPageDisplayed);\n        }\n    }\n\n    const submitProjectButton = document.querySelector(`#addProjectSubmitButton`);\n    const submitTaskButton = document.querySelector(`#addTaskSubmitButton`);\n    const cancelProjectButton = document.querySelector(`#cancelProject`);\n    const cancelTaskButton = document.querySelector(`#cancelTask`);\n\n    cancelProjectButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));\n    cancelTaskButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));\n\n    submitProjectButton.addEventListener(`click`, (e) => {\n        if (checkFormValidation(projectUserInput)) {\n            instantiateNewProject();\n            submitForm(e);\n        }\n    })\n\n    submitTaskButton.addEventListener(`click`, (e) => {\n        if (checkFormValidation(taskUserInput)) {\n            instantiateNewTask();\n            submitForm(e);\n        }\n    })\n\n    function submitForm(event) {\n        event.preventDefault();\n        closeFormModal(event.target.id);\n    }\n\n    function closeFormModal(buttonID) {\n        const modalToClose = document.querySelectorAll(`.modal`);\n        const formToReset = document.querySelectorAll(`.formField`);\n        if (buttonID === `addProjectSubmitButton` || buttonID === `cancelProject`) {\n            modalToClose[2].style.display = `none`;\n            formToReset[2].reset();\n        } else {\n            modalToClose[0].style.display = `none`;\n            formToReset[0].reset();\n        }\n    }\n})();\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/pageLoad.js":
/*!*************************!*\
  !*** ./src/pageLoad.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadMainContent\": () => (/* binding */ loadMainContent),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal),\n/* harmony export */   \"openEditTaskModal\": () => (/* binding */ openEditTaskModal),\n/* harmony export */   \"openEditProjectModal\": () => (/* binding */ openEditProjectModal)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _taskCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskCreation */ \"./src/taskCreation.js\");\n\n\n\nfunction loadMainContent(container, functionToInvoke) {\n    while (container.firstChild) {\n        container.removeChild(container.firstChild)\n    }\n    let containerToDisplay = functionToInvoke;\n    container.appendChild(containerToDisplay);\n}\n\nfunction openModal(e) {\n    const editTaskModal = document.querySelectorAll(`.modal`);\n    if (e.target.id === `addTaskButton`) {\n        editTaskModal[0].style.display = `block`;\n    } else {\n        editTaskModal[2].style.display = `block`;\n    }\n}\n\nfunction openEditTaskModal(object, index, pageTitle) {\n    \n    const editTaskModal = document.querySelector(`#editTaskModal`);\n    const editFormInputs = document.querySelectorAll(`.editTaskInputs`);\n    const statusOption = document.querySelector(`#existing-status`);\n    const projectOption = document.querySelector(`#existing-project`);\n    \n    // pre-populate the edit form with existing data\n    editFormInputs[0].setAttribute(`value`, `${object[0].title}`);\n    editFormInputs[1].setAttribute(`value`, `${object[0].dateDue}`);\n    editFormInputs[2].setAttribute(`value`, `${object[0].description}`);\n    statusOption.setAttribute(`value`, `${object[0].priorityStatus}`);\n    statusOption.textContent = `${object[0].priorityStatus} priority`;\n    if (object[0].projectAssociated === `default`) {\n        projectOption.setAttribute(`value`, `default`);\n        projectOption.textContent = `overview (${object[0].projectAssociated})`;\n    } else {\n        projectOption.setAttribute(`value`, `${object[0].projectAssociated}`);\n        projectOption.textContent = object[0].projectAssociated;\n    }\n    \n    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);\n    confirmEdits.addEventListener(`click`, (e) => {\n        if (checkEditFormValidation(editFormInputs)) {\n            (0,_taskCreation__WEBPACK_IMPORTED_MODULE_1__.finalizeTaskEdits)(editFormInputs, index);\n            e.preventDefault();\n            closeEditModal(editTaskModal);\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.regenerateProjectTasks)(pageTitle);\n        }\n    });\n    \n    const cancelEdits = document.querySelector(`#cancelTaskEdit`);\n    cancelEdits.addEventListener(`click`, (e) => {\n        closeEditModal(editTaskModal);\n    })\n    \n    editTaskModal.style.display = `block`;\n}\n\nfunction openEditProjectModal(object, index, existingTitle, existingTaskObjectArray) {\n    \n    const editProjectModal = document.querySelector(`#editProjectModal`);\n    const editFormInputs = document.querySelectorAll(`.editProjectInputs`);\n    \n    // pre-populate the edit form with existing data\n    editFormInputs[0].setAttribute(`value`, `${object[0].title}`);\n    editFormInputs[1].setAttribute(`value`, `${object[0].dateDue}`);\n    editFormInputs[2].setAttribute(`value`, `${object[0].description}`);\n    \n    const confirmEdits = document.querySelector(`#editProjectSubmitButton`);\n    confirmEdits.addEventListener(`click`, (e) => {\n        if (checkEditFormValidation(editFormInputs)) {\n            (0,_taskCreation__WEBPACK_IMPORTED_MODULE_1__.finalizeProjectEdits)(editFormInputs, index, existingTitle, existingTaskObjectArray);\n            e.preventDefault();\n            closeEditModal(editProjectModal);\n        }\n    });\n    \n    // const cancelEdits = document.querySelector(`#cancelTaskEdit`);\n    // cancelEdits.addEventListener(`click`, (e) => {\n    //     closeEditModal(editTaskModal, editFormInputs);\n    // })\n    \n    editProjectModal.style.display = `block`;\n}\n\nfunction checkEditFormValidation(inputNodeList) {\n    let isValid = true;\n    inputNodeList.forEach( inputField => {\n        if (inputField.validity.valueMissing) {\n            isValid = false;\n        }\n    })\n    return isValid\n}\n\nfunction closeEditModal(modalToClose) {\n    const formToReset = document.querySelectorAll(`.formField`);\n    modalToClose.style.display = `none`;\n    if (modalToClose === editTaskModal) {\n        formToReset[1].reset();\n    } else {\n        formToReset[3].reset();\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/pageLoad.js?");

/***/ }),

/***/ "./src/taskCreation.js":
/*!*****************************!*\
  !*** ./src/taskCreation.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getObjectArrays\": () => (/* binding */ getObjectArrays),\n/* harmony export */   \"createNewProject\": () => (/* binding */ createNewProject),\n/* harmony export */   \"createNewTask\": () => (/* binding */ createNewTask),\n/* harmony export */   \"editTaskObject\": () => (/* binding */ editTaskObject),\n/* harmony export */   \"editProjectObject\": () => (/* binding */ editProjectObject),\n/* harmony export */   \"deleteTaskObject\": () => (/* binding */ deleteTaskObject),\n/* harmony export */   \"finalizeTaskEdits\": () => (/* binding */ finalizeTaskEdits),\n/* harmony export */   \"finalizeProjectEdits\": () => (/* binding */ finalizeProjectEdits)\n/* harmony export */ });\n/* harmony import */ var _displayNewItems_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayNewItems.js */ \"./src/displayNewItems.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _pageLoad_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageLoad.js */ \"./src/pageLoad.js\");\n\n\n\n\nconst projectsCreated = [];\nconst tasksCreated = [\n    {\n        title: `refactor code`,\n        dateDue: `today`,\n        description: `this is a test`,\n        priorityStatus: `high`,\n        projectAssociated: `todo list`,\n    },\n    {\n        title: `make progress`,\n        dateDue: `today`,\n        description: `this is a test`,\n        priorityStatus: `high`,\n        projectAssociated: `todo list`,\n    },\n    {\n        title: `do more`,\n        dateDue: `today`,\n        description: `this is a test`,\n        priorityStatus: `high`,\n        projectAssociated: `default`,\n    }\n];\n\nfunction getObjectArrays() {\n    const taskArrays = {\n        projects: projectsCreated,\n        tasks: tasksCreated\n    }\n    return taskArrays\n}\n\nclass Project {\n    constructor(title, dateDue, description) {\n        this.title = title;\n        this.dateDue = dateDue;\n        this.description = description;\n    }\n}\n\nclass Task {\n    constructor(title, dateDue, description, priorityStatus, projectAssociated) {\n        this.title = title;\n        this.dateDue = dateDue;\n        this.description = description;\n        this.priorityStatus = priorityStatus;\n        this.projectAssociated = projectAssociated; \n    }\n}\n\nfunction createNewProject(titleValue, dateDueValue, descriptionValue) {\n    const newProject = new Project(titleValue, dateDueValue, descriptionValue);\n    projectsCreated.push(newProject);\n    (0,_displayNewItems_js__WEBPACK_IMPORTED_MODULE_0__.appendProjectToProjectList)(newProject.title);\n}\n\nfunction createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated) {\n    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated);\n    tasksCreated.push(newTask);\n}\n\nfunction editTaskObject(title, projectAssociated, pageTitle) {\n    let currentObjectArray = getObjectArrays();\n    let objectIndex;\n    const objectToEdit = currentObjectArray.tasks.filter( (object, index) => {\n        if (object.title === title && object.projectAssociated === projectAssociated) {\n            objectIndex = index;\n            return object\n        }\n    })\n    ;(0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_2__.openEditTaskModal)(objectToEdit, objectIndex, pageTitle);\n}\n\nfunction deleteTaskObject(title, projectAssociated, pageTitle) {\n    let currentObjectArray = getObjectArrays();\n    console.log(currentObjectArray);\n    let objectToDeleteIndex = null;\n    currentObjectArray.tasks.filter( (object, index) => {\n        if (object.title === title && object.projectAssociated === projectAssociated) {\n            objectToDeleteIndex = index;\n        }\n    })\n    console.log(objectToDeleteIndex);\n    tasksCreated.splice(objectToDeleteIndex, 1);\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.regenerateProjectTasks)(pageTitle);\n}\n\nfunction editProjectObject(objectTitle, objectDataToFilter) {\n    let currentObjectArray = getObjectArrays();\n    let objectIndex = null;\n    const objectToEdit = currentObjectArray.projects.filter( (object, index) => {\n            if (object.title === objectTitle && object.description === objectDataToFilter) {\n                objectIndex = index;\n                return object\n            }\n        });\n    (0,_pageLoad_js__WEBPACK_IMPORTED_MODULE_2__.openEditProjectModal)(objectToEdit, objectIndex, objectTitle, currentObjectArray)\n}\n\nfunction finalizeTaskEdits(editInputs, targetIndex) {\n\n    tasksCreated[targetIndex].title = editInputs[0].value;\n    tasksCreated[targetIndex].dateDue = editInputs[1].value;\n    tasksCreated[targetIndex].description = editInputs[2].value;\n    tasksCreated[targetIndex].priorityStatus = editInputs[3].value;\n    tasksCreated[targetIndex].projectAssociated = editInputs[4].value;\n}\n\nfunction finalizeProjectEdits(editInputs, targetIndex, existingTitle, existingTaskObjectArray) {\n\n    const newProjectTitle = editInputs[0].value;\n\n    projectsCreated[targetIndex].title = editInputs[0].value;\n    projectsCreated[targetIndex].dateDue = editInputs[1].value;\n    projectsCreated[targetIndex].description = editInputs[2].value;\n    \n    if (newProjectTitle !== existingTitle) {\n        updateProjecListAndProjectSelectors(newProjectTitle, existingTitle);\n        updateTasksWithNewProjectTitle(newProjectTitle, existingTitle, existingTaskObjectArray);\n    }\n\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.regenerateProjectTasks)(newProjectTitle);\n}\n\nfunction updateProjecListAndProjectSelectors(newTitle, existingTitle) {\n    \n    const projectSelectorNewTasks = document.querySelector(`#project-associated`);\n    const projectSelectorEditTasks = document.querySelector(`#edit-project-associated`);\n    const projectButtonList = document.querySelector(`#project-list`);\n    \n    // newTask selector and editTask selector will have the same index\n    const selectorArrayForNewTask = Array.from(projectSelectorNewTasks.options)\n    const projectButtonListArray = Array.from(projectButtonList.children)\n\n    const newTaskSelectorIndex = filterForUpdatesNeeded(selectorArrayForNewTask, existingTitle, `selector`);\n    const buttonListIndex = filterForUpdatesNeeded(projectButtonListArray, existingTitle, `button`);\n\n    projectSelectorNewTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);\n    projectSelectorNewTasks.options[newTaskSelectorIndex].textContent = newTitle;\n    projectSelectorEditTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);\n    projectSelectorEditTasks.options[newTaskSelectorIndex].textContent = newTitle;\n    projectButtonList.children[buttonListIndex].textContent = newTitle;\n}\n\nfunction updateTasksWithNewProjectTitle(newTitle, oldProjectTitle, oldTaskObjectArray) {\n    const tasksToFilterArray = Array.from(oldTaskObjectArray.tasks);\n    tasksToFilterArray.filter( (task, index) => {\n        if (task.projectAssociated === oldProjectTitle) {\n            tasksCreated[index].projectAssociated = newTitle;\n        }\n    })\n}\n\nfunction filterForUpdatesNeeded(arrayToFilter, existingTitle, elementType) {\n    let indexToEdit = null;\n    arrayToFilter.filter( (option, index) => {\n        if (elementType === `selector`) {\n            if (option.value === existingTitle) {\n                indexToEdit = index;\n            }\n        } else if (elementType === `button`) {\n            if (option.textContent === existingTitle) {\n                indexToEdit = index;\n            }\n        }\n    })\n    return indexToEdit\n}\n\n\n\n//# sourceURL=webpack://todo-list/./src/taskCreation.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;