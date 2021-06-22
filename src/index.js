import './dataModalHandler.js'
import { isPast, isToday, isThisWeek } from 'date-fns'
import { getObjectArrays } from './objectDataManagement.js'
import { loadMainContent } from './pageLoader.js'

const applicationTitle = document.querySelector(`#app-title`);
const mainElement = document.querySelector(`#main-element`);
const leftContainer = document.querySelector(`#left-container`);
const addTaskContainer = document.querySelector(`#add-task-container`);
const openNavMenuButton = document.querySelector(`#open-nav-menu`);
const closeNavMenuButton = document.querySelector(`#close-nav-menu`);
const navContainer = document.querySelector(`#nav-container`);
const projectNavContainer = document.querySelector(`#project-nav-container`);
const projectButton = document.querySelector(`#project-button`);
const projectListContainer = document.querySelector(`#project-list`);
const projectToggleSymbol = document.querySelector(`#toggle-projects`);

openNavMenuButton.addEventListener(`click`, (e) => {
    leftContainer.style.width = `250px`;
    mainElement.style.display = `grid`;
    mainElement.style.gridTemplateColumns = `250px auto`;
    openNavMenuButton.style.display = `none`;
    closeNavMenuButton.style.display = `flex`;
    addTaskContainer.style.display = `flex`;
    navContainer.style.display = `flex`;
    projectNavContainer.style.display = `flex`;
})

closeNavMenuButton.addEventListener(`click`, (e) => {
    leftContainer.style.width = `40px`;
    mainElement.style.display = `grid`;
    mainElement.style.gridTemplateColumns = `40px auto`;
    openNavMenuButton.style.display = `flex`;
    closeNavMenuButton.style.display = `none`;
    addTaskContainer.style.display = `none`;
    navContainer.style.display = `none`;
    projectNavContainer.style.display = `none`;
})

applicationTitle.addEventListener(`click`, pageSelector);
navContainer.addEventListener(`click`, pageSelector);
projectButton.addEventListener(`click`, (e) => {
    if (!projectListContainer.style.display || projectListContainer.style.display === `flex`) {
        projectListContainer.style.display = `none`;
        projectToggleSymbol.textContent = `>`;
    } else {
        projectListContainer.style.display = `flex`;
        projectToggleSymbol.textContent = `v`;
    }
});
projectListContainer.addEventListener(`click`, (e) => {
    if (e.target.className === `projectListButton`) {
        projectSelector(e)
    }
});

// window.localStorage.removeItem(`projectsCreated`);
// window.localStorage.removeItem(`tasksCreated`);

const loadPage = (function() {
    const currentObjectArray = getObjectArrays();
    loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();


function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview` || pageSelectedTitle === `done.`) {
        const currentObjectArray = getObjectArrays();
        loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    } else if (pageSelectedTitle === `today`) {
        const currentObjectArray = getObjectArrays();
        const sortedByDateTaskObjects = filterDueDates(currentObjectArray.tasks, `today`);
        loadMainContent(currentObjectArray.projects, null, sortedByDateTaskObjects, `due today`);
    } else if (pageSelectedTitle === `this week`) {
        const currentObjectArray = getObjectArrays();
        const sortedByDateTaskObjects = filterDueDates(currentObjectArray.tasks, `weekly`);
        loadMainContent(currentObjectArray.projects, null, sortedByDateTaskObjects, `due this week`);
    } else if (pageSelectedTitle === `past due`) {
        const currentObjectArray = getObjectArrays();
        const sortedByDateTaskObjects = filterDueDates(currentObjectArray.tasks, `past due`);
        loadMainContent(currentObjectArray.projects, null, sortedByDateTaskObjects, `past due`);
    }
}


function projectSelector(e) {
    const currentObjectArray = getObjectArrays();
    const projectClickedTitle = e.target.textContent;
    const projectClickedIndex = e.target.dataset.indexNumber;

    let associatedTasksToLoad = [];
    currentObjectArray.tasks.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectClickedTitle) {
            associatedTasksToLoad.push(taskObject);
        }
    })
    loadMainContent(currentObjectArray.projects, currentObjectArray.projects[projectClickedIndex], associatedTasksToLoad, projectClickedTitle);
}


function filterDueDates(arrayOfTasks, sortByType) {
    let sortedByDateTaskObjects = [];
    arrayOfTasks.forEach( object => {
        const month = +object.taskDateDue.slice(0, 2) - 1;
        const day = +object.taskDateDue.slice(3, 5);
        const year = +object.taskDateDue.slice(6);
        if (sortByType === `today`&& isToday(new Date(year, month, day))) {
            sortedByDateTaskObjects.push(object);
        } else if (sortByType === `past due` && !isToday(new Date(year, month, day)) && isPast(new Date(year, month, day))) {
            sortedByDateTaskObjects.push(object);
        } else if (sortByType === `weekly` && isThisWeek(new Date(year, month, day))) {
            sortedByDateTaskObjects.push(object);
        }
    })
    return sortedByDateTaskObjects
}