(()=>{"use strict";const t=[],e=[{title:"code today",dateDue:"today",description:"this is a test",priorityStatus:"high"}];function n(){return{projects:t,tasks:e}}class o{constructor(t,e,n){this.title=t,this.dateDue=e,this.description=n}}class c{constructor(t,e,n,o){this.title=t,this.dateDue=e,this.description=n,this.priorityStatus=o}}function l(t,e){for(;t.firstChild;)t.removeChild(t.firstChild);let n=function(t){const e=document.createElement("div"),n=document.createElement("h2");e.appendChild(n);for(let o=0;o<t.length;o++){const c=document.createElement("div"),l=document.createElement("h2"),d=document.createElement("p"),r=document.createElement("p"),i=document.createElement("p");e.classList.add("project-container"),n.textContent="overview",c.classList.add("project-tasks-container"),l.textContent=t[o].title,d.textContent=t[o].dateDue,r.textContent=t[o].description,i.textContent=t[o].priorityStatus,c.appendChild(l),c.appendChild(d),c.appendChild(r),c.appendChild(i),e.appendChild(c)}return e}(e);t.appendChild(n)}const d=document.querySelector("#add-task-container"),r=document.querySelector("#nav-container"),i=document.querySelector("#main-content");d.addEventListener("click",(function(t){const e=document.querySelectorAll(".modal");"addTaskButton"===t.target.id?e[0].style.display="block":e[1].style.display="block"})),r.addEventListener("click",(t=>console.log(t.target.textContent)));let s=n();l(i,s.tasks),function(){const d=document.querySelectorAll(".projectUserInputs"),r=document.querySelectorAll(".taskUserInputs");function s(t){let e=!0;return t.forEach((t=>{t.validity.valueMissing&&(e=!1)})),e}const a=document.querySelector("#addProjectSubmitButton"),u=document.querySelector("#addTaskSubmitButton"),p=document.querySelector("#cancelProject"),m=document.querySelector("#cancelTask");function h(t){t.preventDefault(),y(t.target.id)}function y(t){const e=document.querySelectorAll(".modal"),n=document.querySelectorAll(".formField");"addProjectSubmitButton"===t||"cancelProject"===t?(e[1].style.display="none",n[1].reset()):(e[0].style.display="none",n[0].reset())}p.addEventListener("click",(t=>y(t.target.id))),m.addEventListener("click",(t=>y(t.target.id))),a.addEventListener("click",(e=>{s(d)&&(function(){const e=Array.from(d);!function(e,n,c){const l=new o(e,n,c);t.push(l),console.log(t),function(t){const e=document.createElement("div"),n=document.createElement("h2"),o=document.createElement("p"),c=document.createElement("p"),l=document.createElement("div");e.classList.add("project-container"),n.textContent=t[0].title,o.textContent=t[0].dateDue,c.textContent=t[0].description,l.classList.add("project-tasks-container"),e.appendChild(n),e.appendChild(o),e.appendChild(c),e.appendChild(l),console.log(t),console.log(e)}(t)}(e[0].value,e[1].value,e[2].value);let c=n();l(i,c.projects),console.log(c),console.log(c.projects),console.log(c.projects[0]),console.log(c.projects[0].title)}(),h(e))})),u.addEventListener("click",(t=>{s(r)&&(function(){const t=Array.from(r);!function(t,n,o,l){const d=new c(t,n,o,l);e.push(d),console.log(e)}(t[0].value,t[1].value,t[2].value,t[3].value);let o=n();l(i,o.tasks)}(),h(t))}))}()})();