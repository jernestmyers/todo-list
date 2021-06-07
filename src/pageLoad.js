import { displayTasksOverview } from './displayNewItems.js'

function loadHeader(container) {
    const headerTitle = document.createElement(`h1`);
    headerTitle.textContent = `done.`;
    container.appendChild(headerTitle);
}

function loadLeftBar(container) {
    // create the add project and add task buttons
    const addItemsContainer = document.createElement(`div`);
    addItemsContainer.setAttribute(`id`, `add-task-container`);

    const addTask = document.createElement(`button`);
    addTask.textContent = `+ add task`;
    addTask.classList.add(`buttonToAddItem`);
    addTask.setAttribute(`id`, `addTaskButton`);
    addTask.addEventListener(`click`, openModal);
    addItemsContainer.appendChild(addTask);

    const addProject = document.createElement(`button`);
    addProject.textContent = `+ add project`;
    addProject.classList.add(`buttonToAddItem`);
    addProject.setAttribute(`id`, `addProjectButton`);
    addProject.addEventListener(`click`, openModal);
    addItemsContainer.appendChild(addProject);

    container.appendChild(addItemsContainer);

    // create the navigation buttons
    const containerForNavigation = document.createElement(`div`);
    containerForNavigation.setAttribute(`id`, `nav-container`);
    containerForNavigation.addEventListener(`click`, (e) => console.log(e.target.textContent));
    
    const overviewButton = document.createElement(`button`);
    overviewButton.textContent = `overview`;
    containerForNavigation.appendChild(overviewButton);

    const todayButton = document.createElement(`button`);
    todayButton.textContent = `today`;
    containerForNavigation.appendChild(todayButton);

    const weeklyButton = document.createElement(`button`);
    weeklyButton.textContent = `this week`;
    containerForNavigation.appendChild(weeklyButton);

    const overdueButton = document.createElement(`button`);
    overdueButton.textContent = `past due`;
    containerForNavigation.appendChild(overdueButton);

    const projectsButton = document.createElement(`button`);
    projectsButton.textContent = `projects`;
    containerForNavigation.appendChild(projectsButton);

    container.appendChild(containerForNavigation);
}

function loadMainContent(container) {
    const testText = document.createElement(`p`);
    testText.textContent = `blah blah test blah test blah test test`;
    container.appendChild(testText);
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
    loadHeader,
    loadLeftBar,
    loadMainContent
}