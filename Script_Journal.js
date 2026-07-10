// ===============================
// Journal Archive
// ===============================

let archive = [];
let currentEntry = null;

// Load saved entries from localStorage
function loadLocalArchive() {

    const saved = localStorage.getItem("journalArchive");

    if (saved) {
        archive = JSON.parse(saved);
    }

}

// Save entries to localStorage
function saveLocalArchive() {

    localStorage.setItem(
        "journalArchive",
        JSON.stringify(archive)
    );

}

// Display archive
function loadArchive() {

    const list = document.getElementById("archiveList");

    if (!list) return;

    list.innerHTML = "";

    archive.forEach((entry, index) => {

        const button = document.createElement("button");

        button.className = "archive-item";

        const preview =
            entry.text.length > 30
            ? entry.text.substring(0, 30) + "..."
            : entry.text;

        button.innerHTML = `
            <strong>📖 ${entry.title}</strong><br>
            <small>${preview}</small>
        `;

        button.onclick = () => {

            document.querySelectorAll(".archive-item").forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            document.getElementById("journal").value = entry.text;

            currentEntry = index;

        };

        list.appendChild(button);

    });

}

// Save current entry
function saveJournal() {

    const journal = document.getElementById("journal");

    if (!journal) return;

    if (currentEntry === null) {

        alert("Create a new entry first!");

        return;

    }

    archive[currentEntry].text = journal.value;

    saveLocalArchive();

    loadArchive();

}

// ===============================
// Runs when page loads
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    loadLocalArchive();

    loadArchive();

    const newEntryBtn = document.getElementById("newEntryBtn");

    if (newEntryBtn) {

        newEntryBtn.addEventListener("click", () => {

            const today = new Date();

            archive.unshift({

                title: today.toLocaleDateString(),

                text: ""

            });

            saveLocalArchive();

            loadArchive();

            currentEntry = 0;

            document.getElementById("journal").value = "";

            const firstButton =
                document.querySelector(".archive-item");

            if (firstButton) {

                firstButton.classList.add("selected");

            }

            document.getElementById("journal").focus();

        });

    }

});