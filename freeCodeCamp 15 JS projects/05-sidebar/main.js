const sidebarToggleBtn = document.querySelector(".sidebar-toggle-btn");
const sidebar = document.querySelector(".sidebar");
const closeSidebarBtn = document.querySelector(".close-sidebar-btn");

function toggleSidebar() {
  sidebar.classList.toggle("active");  
}

closeSidebarBtn.addEventListener("click", toggleSidebar);
sidebarToggleBtn.addEventListener("click", toggleSidebar);