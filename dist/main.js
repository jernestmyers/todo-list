(()=>{"use strict";function t(t){const e=document.querySelectorAll(".modal");"addTaskButton"===t.target.id?e[0].style.display="block":e[1].style.display="block"}const e=[],n=[];class o{constructor(t,e,n){this.title=t,this.dateDue=e,this.description=n}}class c{constructor(t,e,n,o){this.title=t,this.dateDue=e,this.description=n,this.priorityStatus=o}}const d=document.querySelector("#page-header"),a=document.querySelector("#left-container"),l=document.querySelector("#main-content");!function(t){const e=document.createElement("h1");e.textContent="done.",t.appendChild(e)}(d),function(e){const n=document.createElement("div");n.setAttribute("id","add-task-container");const o=document.createElement("button");o.textContent="+ add task",o.classList.add("buttonToAddItem"),o.setAttribute("id","addTaskButton"),o.addEventListener("click",t),n.appendChild(o);const c=document.createElement("button");c.textContent="+ add project",c.classList.add("buttonToAddItem"),c.setAttribute("id","addProjectButton"),c.addEventListener("click",t),n.appendChild(c),e.appendChild(n);const d=document.createElement("div");d.setAttribute("id","nav-container"),d.addEventListener("click",(t=>console.log(t.target.textContent)));const a=document.createElement("button");a.textContent="overview",d.appendChild(a);const l=document.createElement("button");l.textContent="today",d.appendChild(l);const s=document.createElement("button");s.textContent="this week",d.appendChild(s);const i=document.createElement("button");i.textContent="past due",d.appendChild(i);const r=document.createElement("button");r.textContent="projects",d.appendChild(r),e.appendChild(d)}(a),function(t){const e=document.createElement("p");e.textContent="blah blah test blah test blah test test",t.appendChild(e)}(l),function(){const t=document.querySelectorAll(".projectUserInputs"),d=document.querySelectorAll(".taskUserInputs");function a(t){let e=!0;return t.forEach((t=>{t.validity.valueMissing&&(e=!1)})),e}const l=document.querySelector("#addProjectSubmitButton"),s=document.querySelector("#addTaskSubmitButton"),i=document.querySelector("#cancelProject"),r=document.querySelector("#cancelTask");function u(t){t.preventDefault(),m(t.target.id)}function m(t){const e=document.querySelectorAll(".modal"),n=document.querySelectorAll(".formField");"addProjectSubmitButton"===t||"cancelProject"===t?(e[1].style.display="none",n[1].reset()):(e[0].style.display="none",n[0].reset())}i.addEventListener("click",(t=>m(t.target.id))),r.addEventListener("click",(t=>m(t.target.id))),l.addEventListener("click",(n=>{a(t)&&(function(){const n=Array.from(t);!function(t,n,c){const d=new o(t,n,c);e.push(d),function(t){const e=document.createElement("div");e.classList.add("project-container");const n=document.createElement("h2");n.textContent=t[0].title;const o=document.createElement("p");o.textContent=t[0].dateDue;const c=document.createElement("p");c.textContent=t[0].description;const d=document.createElement("div");d.classList.add("project-tasks-container"),e.appendChild(n),e.appendChild(o),e.appendChild(c),e.appendChild(d),console.log(t),console.log(e)}(e)}(n[0].value,n[1].value,n[2].value)}(),u(n))})),s.addEventListener("click",(t=>{a(d)&&(function(){const t=Array.from(d);!function(t,e,o,d){const a=new c(t,e,o,d);n.push(a)}(t[0].value,t[1].value,t[2].value,t[3].value)}(),u(t))}))}()})();