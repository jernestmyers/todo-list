import { displayNewProject } from './displayNewItems.js'

const projectsCreated = [];
const tasksCreated = [];

class Project {
    constructor(title, dateDue, description) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
    }
}

class Task {
    constructor(title, dateDue, description, priorityStatus) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
        this.priorityStatus = priorityStatus;
    }
}

function createNewProject(titleValue, dateDueValue, descriptionValue) {
    const newProject = new Project(titleValue, dateDueValue, descriptionValue);
    projectsCreated.push(newProject);
    // console.log(projectsCreated);
    displayNewProject(projectsCreated);
}

function createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue) {
    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue);
    tasksCreated.push(newTask);
    // console.log(tasksCreated);
}

export {
    createNewProject,
    createNewTask
}

