import { displayNewProject, appendProjectToProjectList } from './displayNewItems.js'

const projectsCreated = [];
const tasksCreated = [
    {
        title: `code today`,
        dateDue: `today`,
        description: `this is a test`,
        priorityStatus: `high`
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
    // console.log(projectsCreated);
    appendProjectToProjectList(newProject.title);
    // displayNewProject(newProject);
}

function createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated) {
    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated);
    tasksCreated.push(newTask);
    console.log(tasksCreated);
}

export {
    getObjectArrays,
    createNewProject,
    createNewTask
}

