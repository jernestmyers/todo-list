(()=>{"use strict";const t=[],e=[{title:"code today",dateDue:"today",description:"this is a test",priorityStatus:"high"}];function n(){return{projects:t,tasks:e}}class o{constructor(t,e,n){this.title=t,this.dateDue=e,this.description=n}}class c{constructor(t,e,n,o){this.title=t,this.dateDue=e,this.description=n,this.priorityStatus=o}}function d(t,e){for(;t.firstChild;)t.removeChild(t.firstChild);let n=function(t){const e=document.createElement("div"),n=document.createElement("h2");e.appendChild(n);for(let o=0;o<t.length;o++){const c=document.createElement("div"),d=document.createElement("h3"),l=document.createElement("p"),i=document.createElement("p"),r=document.createElement("p");e.classList.add("project-container"),n.textContent="overview",c.classList.add("project-tasks-container"),d.textContent=t[o].title,l.textContent=t[o].dateDue,i.textContent=t[o].description,r.textContent=t[o].priorityStatus,c.appendChild(d),c.appendChild(l),c.appendChild(i),c.appendChild(r),e.appendChild(c)}return e}(e);t.appendChild(n)}const l=document.querySelector("#add-task-container"),i=document.querySelector("#nav-container"),r=document.querySelector("#main-content");l.addEventListener("click",(function(t){const e=document.querySelectorAll(".modal");"addTaskButton"===t.target.id?e[0].style.display="block":e[1].style.display="block"})),i.addEventListener("click",(t=>console.log(t.target.textContent)));let a=n();d(r,a.tasks),function(){const l=document.querySelectorAll(".projectUserInputs"),i=document.querySelectorAll(".taskUserInputs");function a(t){let e=!0;return t.forEach((t=>{t.validity.valueMissing&&(e=!1)})),e}const s=document.querySelector("#addProjectSubmitButton"),u=document.querySelector("#addTaskSubmitButton"),p=document.querySelector("#cancelProject"),m=document.querySelector("#cancelTask");function h(t){t.preventDefault(),y(t.target.id)}function y(t){const e=document.querySelectorAll(".modal"),n=document.querySelectorAll(".formField");"addProjectSubmitButton"===t||"cancelProject"===t?(e[1].style.display="none",n[1].reset()):(e[0].style.display="none",n[0].reset())}p.addEventListener("click",(t=>y(t.target.id))),m.addEventListener("click",(t=>y(t.target.id))),s.addEventListener("click",(e=>{a(l)&&(function(){const e=Array.from(l);(function(e,n,c){const d=new o(e,n,c);t.push(d),console.log(t),function(t){const e=document.querySelector("#project-list"),n=document.createElement("button");n.textContent=t,e.appendChild(n)}(d.title),function(t){const e=document.createElement("div"),n=document.createElement("h2"),o=document.createElement("p"),c=document.createElement("p"),d=document.createElement("div");e.classList.add("project-container"),n.textContent=t[0].title,o.textContent=t[0].dateDue,c.textContent=t[0].description,d.classList.add("project-tasks-container"),e.appendChild(n),e.appendChild(o),e.appendChild(c),e.appendChild(d),console.log(t),console.log(e)}(t)})(e[0].value,e[1].value,e[2].value),n()}(),h(e))})),u.addEventListener("click",(t=>{a(i)&&(function(){const t=Array.from(i);!function(t,n,o,d){const l=new c(t,n,o,d);e.push(l),console.log(e)}(t[0].value,t[1].value,t[2].value,t[3].value);let o=n();d(r,o.tasks)}(),h(t))}))}()})();