import { appendProjectToProjectList } from './displayNewItems.js'
import { regenerateProjectTasks } from './index.js'
import { openEditTaskModal, openEditProjectModal } from './pageLoad.js'

const projectsCreated = [];
const tasksCreated = [
    {
        title: `refactor code`,
        dateDue: `2021-06-20`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `make progress`,
        dateDue: `2021-06-12`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `do more`,
        dateDue: `2021-06-13`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `default`,
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
    constructor(title, dateDue, description) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
    }
}

class Task {
    constructor(title, dateDue, description, priorityStatus, projectAssociated) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
        this.priorityStatus = priorityStatus;
        this.projectAssociated = projectAssociated; 
    }
}

function createNewProject(titleValue, dateDueValue, descriptionValue) {
    const newProject = new Project(titleValue, dateDueValue, descriptionValue);
    projectsCreated.push(newProject);
    appendProjectToProjectList(newProject.title);
}

function createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated) {
    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated);
    tasksCreated.push(newTask);
}

function editTaskObject(title, projectAssociated, pageTitle) {
    let currentObjectArray = getObjectArrays();
    let objectIndex;
    const objectToEdit = currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            objectIndex = index;
            return object
        }
    })
    openEditTaskModal(objectToEdit, objectIndex, pageTitle);
}

function finalizeTaskEdits(editInputs, targetIndex) {

    tasksCreated[targetIndex].title = editInputs[0].value;
    tasksCreated[targetIndex].dateDue = editInputs[1].value;
    tasksCreated[targetIndex].description = editInputs[2].value;
    tasksCreated[targetIndex].priorityStatus = editInputs[3].value;
    tasksCreated[targetIndex].projectAssociated = editInputs[4].value;
}

function deleteTaskObject(title, projectAssociated, pageTitle) {
    let currentObjectArray = getObjectArrays();
    console.log(currentObjectArray);
    let objectToDeleteIndex = null;
    currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            objectToDeleteIndex = index;
        }
    })
    console.log(objectToDeleteIndex);
    tasksCreated.splice(objectToDeleteIndex, 1);
    regenerateProjectTasks(pageTitle);
}

function editProjectObject(objectTitle, objectDataToFilter) {
    let currentObjectArray = getObjectArrays();
    let objectIndex = null;
    const objectToEdit = currentObjectArray.projects.filter( (object, index) => {
            if (object.title === objectTitle && object.description === objectDataToFilter) {
                objectIndex = index;
                return object
            }
        });
    openEditProjectModal(objectToEdit, objectIndex, objectTitle, currentObjectArray)
}

function finalizeProjectEdits(editInputs, targetIndex, existingTitle, existingTaskObjectArray) {

    const newProjectTitle = editInputs[0].value;

    projectsCreated[targetIndex].title = editInputs[0].value;
    projectsCreated[targetIndex].dateDue = editInputs[1].value;
    projectsCreated[targetIndex].description = editInputs[2].value;
    
    if (newProjectTitle !== existingTitle) {
        updateProjectListAndProjectSelectors(newProjectTitle, existingTitle);
        updateTasksWithNewProjectTitle(newProjectTitle, existingTitle, existingTaskObjectArray);
    }

    regenerateProjectTasks(newProjectTitle);
}

function updateTasksWithNewProjectTitle(newTitle, oldProjectTitle, oldTaskObjectArray) {
    const tasksToFilterArray = Array.from(oldTaskObjectArray.tasks);
    tasksToFilterArray.filter( (task, index) => {
        if (task.projectAssociated === oldProjectTitle) {
            tasksCreated[index].projectAssociated = newTitle;
        }
    })
}

function deleteProjectObject(projectTitle) {
    let currentObjectArray = getObjectArrays();
    let projectObjectToDeleteIndex = null;
    currentObjectArray.projects.filter( (object, index) => {
        if (object.title === projectTitle) {
            projectObjectToDeleteIndex = index;
        }
    })
    
    let taskIndexForDeletion = [];
    currentObjectArray.tasks.filter( (object, index) => {
        if (object.projectAssociated === projectTitle) {
            taskIndexForDeletion.push(index);
        }
    })
    for (let i = taskIndexForDeletion.length; i >= 1; i--) {
        tasksCreated.splice(taskIndexForDeletion[i-1], 1);
    }
    projectsCreated.splice(projectObjectToDeleteIndex, 1);
    updateProjectListAndProjectSelectors(null, projectTitle);
    regenerateProjectTasks(`overview`);
}

function updateProjectListAndProjectSelectors(newTitle, existingTitle) {
    
    const projectSelectorNewTasks = document.querySelector(`#project-associated`);
    const projectSelectorEditTasks = document.querySelector(`#edit-project-associated`);
    const projectButtonList = document.querySelector(`#project-list`);
    
    // newTask selector and editTask selector will have the same index
    const selectorArrayForNewTask = Array.from(projectSelectorNewTasks.options)
    const projectButtonListArray = Array.from(projectButtonList.children)

    const newTaskSelectorIndex = filterForUpdatesNeeded(selectorArrayForNewTask, existingTitle, `selector`);
    const buttonListIndex = filterForUpdatesNeeded(projectButtonListArray, existingTitle, `button`);

    if (newTitle) {
        projectSelectorNewTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
        projectSelectorNewTasks.options[newTaskSelectorIndex].textContent = newTitle;
        projectSelectorEditTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
        projectSelectorEditTasks.options[newTaskSelectorIndex].textContent = newTitle;
        projectButtonList.children[buttonListIndex].textContent = newTitle;
    } else if (!newTitle) {
        // projectSelectorNewTasks.options[newTaskSelectorIndex].remove();
        // projectSelectorEditTasks.options[newTaskSelectorIndex].remove();
        // projectButtonList.children[buttonListIndex].remove();
        // projectSelectorNewTasks.removeChild(projectSelectorNewTasks.options[newTaskSelectorIndex]);
        // projectSelectorEditTasks.removeChild(projectSelectorEditTasks.options[newTaskSelectorIndex]);
        // projectButtonList.removeChild(projectButtonList.children[buttonListIndex]);
    }
}

// filters for buttons and selectors to update/remove upon projectTitle edits or project deletions
function filterForUpdatesNeeded(arrayToFilter, existingTitle, elementType) {
    let indexToEdit = null;
    arrayToFilter.filter( (option, index) => {
        if (elementType === `selector`) {
            if (option.value === existingTitle) {
                indexToEdit = index;
            }
        } else if (elementType === `button`) {
            if (option.textContent === existingTitle) {
                indexToEdit = index;
            }
        }
    })
    return indexToEdit
}

export {
    getObjectArrays,
    createNewProject,
    createNewTask,
    editTaskObject,
    editProjectObject,
    deleteTaskObject,
    deleteProjectObject,
    finalizeTaskEdits,
    finalizeProjectEdits,
}