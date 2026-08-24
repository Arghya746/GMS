/* =========================================================
   MONSTER GYM — MANAGEMENT SYSTEM
   JavaScript
   ========================================================= */

/* =========================================================
   MONSTER GYM MANAGEMENT SYSTEM
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");

const themeToggle =
    document.getElementById("themeToggle");

const settingsTheme =
    document.getElementById("settingsTheme");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const addMemberBtn =
    document.getElementById("addMemberBtn");

const membersAddBtn =
    document.getElementById("membersAddBtn");

const memberModal =
    document.getElementById("memberModal");

const closeModal =
    document.getElementById("closeModal");

const memberForm =
    document.getElementById("memberForm");

const membersTable =
    document.getElementById("membersTable");

const allMembersTable =
    document.getElementById("allMembersTable");

const totalMembers =
    document.getElementById("totalMembers");

const memberSearch =
    document.getElementById("memberSearch");

const membershipFilter =
    document.getElementById("membershipFilter");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const liveDate =
    document.getElementById("liveDate");


/* =========================================================
   PAGE INFORMATION
========================================================= */

const pageInfo = {

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
        subtitle: "Manage your professional training team"
    },

    memberships: {
        title: "Memberships",
        subtitle: "Manage membership plans and pricing"
    },

    attendance: {
        title: "Attendance",
        subtitle: "Monitor today's gym attendance"
    },

    payments: {
        title: "Payments",
        subtitle: "Track revenue and membership payments"
    },

    workouts: {
        title: "Workout Plans",
        subtitle: "Manage training programs"
    },

    settings: {
        title: "Settings",
        subtitle: "Manage your gym system preferences"
    }

};


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(pageName) {

    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    const selectedPage =
        document.getElementById(
            `${pageName}Page`
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    if (pageInfo[pageName]) {

        pageTitle.textContent =
            pageInfo[pageName].title;

        pageSubtitle.textContent =
            pageInfo[pageName].subtitle;

    }


    sidebar.classList.remove("mobile-open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navItems.forEach(item => {

    item.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const pageName =
                item.dataset.page;

            showPage(pageName);

        }
    );

});


/* =========================================================
   DASHBOARD VIEW BUTTONS
========================================================= */

document
    .querySelectorAll("[data-page-button]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.pageButton
                );

            }
        );

    });


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }
);


/* =========================================================
   THEME
========================================================= */

function updateThemeIcon() {

    const isDark =
        document.body.classList.contains("dark");


    themeToggle.textContent =
        isDark ? "☀️" : "🌙";

    settingsTheme.textContent =
        isDark ? "☀️" : "🌙";

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


themeToggle.addEventListener(
    "click",
    toggleTheme
);


settingsTheme.addEventListener(
    "click",
    toggleTheme
);


/* LOAD THEME */

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


/* =========================================================
   NOTIFICATIONS
========================================================= */

notificationBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        notificationPanel.classList.toggle(
            "show"
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (!notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   MODAL
========================================================= */

function openModal() {

    memberModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(() => {

        document
            .getElementById("memberName")
            ?.focus();

    }, 100);

}


function closeMemberModal() {

    memberModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


addMemberBtn.addEventListener(
    "click",
    openModal
);


membersAddBtn.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeMemberModal
);


memberModal.addEventListener(
    "click",
    event => {

        if (
            event.target === memberModal
        ) {

            closeMemberModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            memberModal.classList.contains("show")
        ) {

            closeMemberModal();

        }

    }
);


/* =========================================================
   MEMBERS
========================================================= */

let members =
    JSON.parse(
        localStorage.getItem(
            "monsterGymMembers"
        )
    ) || [];


function getInitials(name) {

    return name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();

}


function getCurrentDate() {

    const date =
        new Date();

    return date.toLocaleDateString(
        "en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function addMemberToDashboard(member) {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>

            <div class="table-member">

                <div class="member-avatar">
                    ${member.initials}
                </div>

                <strong>
                    ${member.name}
                </strong>

            </div>

        </td>

        <td>
            ${member.plan}
        </td>

        <td>
            ${member.joinDate}
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


    membersTable.prepend(row);

}


function addMemberToAllMembers(member) {

    const row =
        document.createElement("tr");


    row.dataset.name =
        member.name.toLowerCase();

    row.dataset.plan =
        member.plan;


    row.innerHTML = `

        <td>
            ${member.name}
        </td>

        <td>
            ${member.phone}
        </td>

        <td>
            ${member.plan}
        </td>

        <td>
            ${member.joinDate}
        </td>

        <td>

            <span class="badge active-badge">
                Active
            </span>

        </td>

    `;


    allMembersTable.prepend(row);

}


function updateMemberCount() {

    const defaultMembers = 248;

    totalMembers.textContent =
        defaultMembers + members.length;

}


memberForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
            .getElementById("memberName")
            .value
            .trim();


        const phone =
            document
            .getElementById("memberPhone")
            .value
            .trim();


        const plan =
            document
            .getElementById("memberPlan")
            .value;


        const member = {

            id: Date.now(),

            name,

            phone,

            plan,

            initials: getInitials(name),

            joinDate: getCurrentDate()

        };


        members.push(
            member
        );


        localStorage.setItem(
            "monsterGymMembers",
            JSON.stringify(members)
        );


        addMemberToDashboard(
            member
        );


        addMemberToAllMembers(
            member
        );


        updateMemberCount();


        memberForm.reset();

        closeMemberModal();


        showToast(
            `${name} was added successfully.`
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

function filterMembers() {

    const searchValue =
        memberSearch.value
        .toLowerCase()
        .trim();


    const selectedPlan =
        membershipFilter.value;


    const rows =
        allMembersTable.querySelectorAll(
            "tr"
        );


    rows.forEach(row => {

        const rowText =
            row.textContent.toLowerCase();


        const plan =
            row.dataset.plan ||
            rowText;


        const matchesSearch =
            rowText.includes(
                searchValue
            );


        const matchesPlan =
            selectedPlan === "all" ||
            plan.includes(selectedPlan);


        row.style.display =
            matchesSearch &&
            matchesPlan ?
            "" :
            "none";

    });

}


memberSearch.addEventListener(
    "input",
    filterMembers
);


membershipFilter.addEventListener(
    "change",
    filterMembers
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   LIVE DATE
========================================================= */

function updateDate() {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short"
            }
        );


    const time =
        now.toLocaleTimeString(
            "en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    liveDate.innerHTML = `
        <span>📅</span>
        <span>${date} · ${time}</span>
    `;

}


updateDate();


setInterval(
    updateDate,
    30000
);


/* =========================================================
   LOAD STORED MEMBERS
========================================================= */

members.forEach(member => {

    addMemberToDashboard(
        member
    );

    addMemberToAllMembers(
        member
    );

});


updateMemberCount();


/* =========================================================
   INITIAL PAGE
========================================================= */

showPage(
    "dashboard"
);