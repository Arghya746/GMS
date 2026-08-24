const menuItems = document.querySelectorAll(".sidebar nav a");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    menuItems.forEach((link) => {
      link.classList.remove("active");
    });

    item.classList.add("active");
  });
});