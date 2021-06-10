import { appendProjectToProjectList } from './displayNewItems.js'
import { regenerateProjectTasks } from './index.js'
import { openEditModal } from './pageLoad.js'

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

function editTaskObject(title, projectAssociated, pageTitle) {
    console.log(title);
    console.log(projectAssociated);
    console.log(pageTitle);
    let currentObjectArray = getObjectArrays();
    let objectIndex;
    const objectToEdit = currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            // console.log(index);
            // console.log(object);
            objectIndex = index;
            return object
        }
    })
    // console.log(objectToEdit);
    // console.log(objectIndex);
    // tasksCreated[objectIndex].title = `does this work?`;
    openEditModal(objectToEdit, objectIndex);
    regenerateProjectTasks(pageTitle);
}

export {
    getObjectArrays,
    createNewProject,
    createNewTask,
    editTaskObject,
}

