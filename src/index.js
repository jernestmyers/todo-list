import './dataModalHandler.js'
import { getObjectArrays } from './objectDataManagement.js'
import { loadMainContent } from './pageLoader.js'

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
    const currentObjectArray = getObjectArrays();
    loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = getObjectArrays();
        // console.log(currentObjectArray);
        loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
    const currentObjectArray = getObjectArrays();
    // console.log(currentObjectArray);
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