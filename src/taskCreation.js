import { appendProjectToProjectList } from './displayNewItems.js'
import { regenerateProjectTasks } from './index.js'
import { openEditTaskModal } from './pageLoad.js'

const projectsCreated = [];
const tasksCreated = [
    {
        title: `refactor code`,
        dateDue: `today`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `make progress`,
        dateDue: `today`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `do more`,
        dateDue: `today`,
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

// function filterObjects(objectTitle, objectDataToFilter, currentPageTitle, buttonID) {
//     let currentObjectArray = getObjectArrays();
//     let objectIndex = null;
//     let objectToEdit = null;
//     if (buttonID === `edit project`) {
//         objectToEdit = currentObjectArray.projects.filter( (object, index) => {
//             if (object.title === objectTitle && object.description === objectDataToFilter) {
//                 objectIndex = index;
//                 return object
//             }
//         })
//         console.log(objectIndex);
//         console.log(objectToEdit);
//     }
// }

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

function deleteTaskObject(title, projectAssociated, pageTitle) {
    let currentObjectArray = getObjectArrays();
    const objectToDeleteIndex = currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            // objectToDeleteIndex = index;
            return index
        }
    })
    // let objectToDeleteIndex;
    // const objectToDelete = currentObjectArray.tasks.filter( (object, index) => {
    //     if (object.title === title && object.projectAssociated === projectAssociated) {
    //         objectToDeleteIndex = index;
    //         return object
    //     }
    // })
    tasksCreated.splice(objectToDeleteIndex, 1);
    regenerateProjectTasks(pageTitle);
}

function editProjectObject(objectTitle, objectDataToFilter) {
    console.log(`here for edits`);
    // filterObjects(objectTitle, objectDescription, pageTitle, buttonID);
    let currentObjectArray = getObjectArrays();
    let objectIndex = null;
    const objectToEdit = currentObjectArray.projects.filter( (object, index) => {
            if (object.title === objectTitle && object.description === objectDataToFilter) {
                objectIndex = index;
                return object
            }
        });
    console.log(objectIndex);
    console.log(objectToEdit);
}

function finalizeTaskEdits(editInputs, targetObject, targetIndex) {
    tasksCreated[targetIndex].title = editInputs[0].value;
    tasksCreated[targetIndex].dateDue = editInputs[1].value;
    tasksCreated[targetIndex].description = editInputs[2].value;
    tasksCreated[targetIndex].priorityStatus = editInputs[3].value;
    tasksCreated[targetIndex].projectAssociated = editInputs[4].value;
}

export {
    getObjectArrays,
    createNewProject,
    createNewTask,
    editTaskObject,
    editProjectObject,
    deleteTaskObject,
    finalizeTaskEdits,
}