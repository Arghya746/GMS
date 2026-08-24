/* =========================================
   PAGE NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");


const pageData = {

    dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back, Admin 👋"
    },

    members: {
        title: "Members",
        subtitle: "Manage your gym members"
    },

    trainers: {
        title: "Trainers",
        subtitle: "Manage your gym trainers"
    },

    memberships: {
        title: "Memberships",
        subtitle: "Manage membership plans"
    },

    attendance: {
        title: "Attendance",
        subtitle: "Track today's attendance"
    },

    payments: {
        title: "Payments",
        subtitle: "Manage gym payments"
    },

    workouts: {
        title: "Workout Plans",
        subtitle: "Manage workout programs"
    },

    settings: {
        title: "Settings",
        subtitle: "Manage system preferences"
    }

};


function showPage(pageName) {

    /* Remove active navigation */

    navItems.forEach((item) => {

        item.classList.remove("active");

        if (
            item.dataset.page === pageName
        ) {
            item.classList.add("active");
        }

    });


    /* Hide all pages */

    pages.forEach((page) => {

        page.classList.remove(
            "active-page"
        );

    });


    /* Show selected page */

    const selectedPage =
        document.getElementById(
            `${pageName}Page`
        );

    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    /* Change title */

    if (pageData[pageName]) {

        pageTitle.textContent =
            pageData[pageName].title;

        pageSubtitle.textContent =
            pageData[pageName].subtitle;

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* Navigation click */

navItems.forEach((item) => {

    item.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const page =
                this.dataset.page;

            showPage(page);

        }
    );

});


/* Dashboard buttons */

document
    .querySelectorAll(
        "[data-page-button]"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.pageButton
                );

            }
        );

    });


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const settingsTheme =
    document.getElementById(
        "settingsTheme"
    );


function updateThemeIcon() {

    const isDark =
        document.body.classList.contains(
            "dark"
        );

    const icon =
        isDark ? "☀️" : "🌙";

    if (themeToggle) {
        themeToggle.textContent = icon;
    }

    if (settingsTheme) {
        settingsTheme.textContent = icon;
    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );

    const isDark =
        document.body.classList.contains(
            "dark"
        );

    localStorage.setItem(
        "monsterGymTheme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon();

}


/* Main theme button */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* Settings theme button */

if (settingsTheme) {

    settingsTheme.addEventListener(
        "click",
        toggleTheme
    );

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem(
        "monsterGymTheme"
    );

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

}

updateThemeIcon();


/* =========================================
   ADD MEMBER MODAL
========================================= */

const addMemberBtn =
    document.getElementById(
        "addMemberBtn"
    );

const membersAddBtn =
    document.getElementById(
        "membersAddBtn"
    );

const memberModal =
    document.getElementById(
        "memberModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const memberForm =
    document.getElementById(
        "memberForm"
    );


function openMemberModal() {

    memberModal.classList.add(
        "show"
    );

}


function closeMemberModal() {

    memberModal.classList.remove(
        "show"
    );

}


if (addMemberBtn) {

    addMemberBtn.addEventListener(
        "click",
        openMemberModal
    );

}


if (membersAddBtn) {

    membersAddBtn.addEventListener(
        "click",
        openMemberModal
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMemberModal
    );

}


/* Click outside modal */

memberModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === memberModal
        ) {

            closeMemberModal();

        }

    }
);


/* =========================================
   ADD MEMBER
========================================= */

memberForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "memberName"
            ).value.trim();


        const phone =
            document.getElementById(
                "memberPhone"
            ).value.trim();


        const plan =
            document.getElementById(
                "memberPlan"
            ).value;


        if (!name ||
            !phone ||
            !plan
        ) {

            return;

        }


        const initials =
            name
            .split(" ")
            .map(
                word =>
                word[0]
            )
            .join("")
            .substring(0, 2)
            .toUpperCase();


        const today =
            new Date();


        const joinDate =
            today.toLocaleDateString(
                "en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        const table =
            document.getElementById(
                "membersTable"
            );


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>

                <div class="table-member">

                    <div class="member-avatar">
                        ${initials}
                    </div>

                    <strong>
                        ${name}
                    </strong>

                </div>

            </td>

            <td>
                ${plan}
            </td>

            <td>
                ${joinDate}
            </td>

            <td>
                —
            </td>

            <td>

                <span class="badge active-badge">
                    Active
                </span>

            </td>

        `;


        table.prepend(row);


        /* Update dashboard member count */

        const totalMembers =
            document.getElementById(
                "totalMembers"
            );


        if (totalMembers) {

            const current =
                parseInt(
                    totalMembers.textContent
                ) || 0;

            totalMembers.textContent =
                current + 1;

        }


        /* Reset */

        memberForm.reset();

        closeMemberModal();


        /* Show success message */

        alert(
            `${name} has been added to Monster Gym!`
        );


        /* Open Members page */

        showPage("members");

    }
);


/* =========================================
   MOBILE MENU
========================================= */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.toggle(
                    "mobile-open"
                );

        }
    );

}


/* =========================================
   CLOSE MOBILE SIDEBAR
========================================= */

navItems.forEach((item) => {

    item.addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.remove(
                    "mobile-open"
                );

        }
    );

});