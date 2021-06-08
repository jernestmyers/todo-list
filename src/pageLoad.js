import { displayNewProject, displayTasksOverview } from './displayNewItems.js'

function loadMainContent(container, array, functionToInvoke) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    // console.log(functionToInvoke);
    let containerToDisplay = functionToInvoke;
    container.appendChild(containerToDisplay);
}

function openModal(e) {
    const modalToOpen = document.querySelectorAll(`.modal`);
    if (e.target.id === `addTaskButton`) {
        modalToOpen[0].style.display = `block`;
    } else {
        modalToOpen[1].style.display = `block`;
    }
}

export { 
    loadMainContent,
    openModal
}