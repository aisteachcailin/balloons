document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".dropdown-item.active").forEach(e=>{e.closest(".dropdown-menu").previousElementSibling.innerText=e.innerText})});
