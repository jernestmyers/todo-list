import { loadHeader, loadLeftBar, loadMainContent } from './pageLoad.js'

const headerContainer = document.querySelector(`#page-header`);
const leftContainer = document.querySelector(`#left-container`);
const mainContainer = document.querySelector(`#main-content`);

loadHeader(headerContainer);
loadLeftBar(leftContainer);
loadMainContent(mainContainer);