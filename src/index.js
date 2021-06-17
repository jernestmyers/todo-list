import {} from './pageLoad.js'
import { getObjectArrays } from './taskCreation.js'
import { loadMainContent } from './displayNewItems.js'

const navContainer = document.querySelector(`#nav-container`);
const projectButton = document.querySelector(`#project-button`);
const projectListContainer = document.querySelector(`#project-list`);

navContainer.addEventListener(`click`, pageSelector);
projectButton.addEventListener(`click`, (e) => console.log(e.target.textContent));
projectListContainer.addEventListener(`click`, projectSelector);

const loadPage = (function() {
    const currentObjectArray = getObjectArrays();
    loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = getObjectArrays();
        loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
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