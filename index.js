const menuItems = document.querySelectorAll(".nav-item");

menuItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        menuItems.forEach((link) => {
            link.classList.remove("active");
        });

        item.classList.add("active");

    });

});


const addMemberBtn = document.getElementById("addMemberBtn");
const memberModal = document.getElementById("memberModal");
const closeModal = document.getElementById("closeModal");
const memberForm = document.getElementById("memberForm");


addMemberBtn.addEventListener("click", () => {
    memberModal.classList.add("show");
});


closeModal.addEventListener("click", () => {
    memberModal.classList.remove("show");
});


memberModal.addEventListener("click", (event) => {

    if (event.target === memberModal) {
        memberModal.classList.remove("show");
    }

});


memberForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("memberName").value;

    alert(`${name} has been added to Monster Gym!`);

    memberForm.reset();

    memberModal.classList.remove("show");

});