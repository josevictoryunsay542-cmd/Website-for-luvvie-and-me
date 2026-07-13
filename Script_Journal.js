let archive = [];
let currentEntry = null;

// ==========================
// Load entries from database
// ==========================

async function loadDatabaseArchive() {

    const { data, error } = await supabaseClient
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        alert("Couldn't load journal entries.");

        return;

    }

    archive = data.map(row => ({

        id: row.id,

        title: row.title,

        text: row.entry

    }));

}

// ==========================
// Display Archive
// ==========================

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

//=====================================
//Save Journal
//=====================================

async function saveJournal() {

    if (currentEntry === null) {

        alert("Create a new entry first.");

        return;

    }

    const journal =
        document.getElementById("journal");

    archive[currentEntry].text =
        journal.value;

    const { error } = await supabaseClient

        .from("journal_entries")

        .update({

            entry: journal.value

        })

        .eq("id", archive[currentEntry].id);

    if (error) {

        console.error(error);

        alert("Couldn't save.");

        return;

    }

    loadArchive();

}

// ==========================
// New Entry
// ==========================

async function createNewEntry() {

    const today = new Date();

    const { data, error } = await supabaseClient

        .from("journal_entries")

        .insert({

            title: today.toLocaleDateString(),

            entry: ""

        })

        .select()

        .single();

    if (error) {

        console.error(error);

        alert("Couldn't create entry.");

        return;

    }

    archive.unshift({

        id: data.id,

        title: data.title,

        text: data.entry

    });

    loadArchive();

    currentEntry = 0;

    document.getElementById("journal").value = "";

    const first =
        document.querySelector(".archive-item");

    if (first) {

        first.classList.add("selected");

    }

    document.getElementById("journal").focus();

}

// ==========================
// Page Loaded
// ==========================

window.addEventListener("DOMContentLoaded", async () => {

    await loadDatabaseArchive();

    loadArchive();

    const newEntryBtn =
        document.getElementById("newEntryBtn");

    if (newEntryBtn) {

        newEntryBtn.addEventListener(

            "click",

            createNewEntry

        );

    }

});

// ==========================
// Reset Journal
// ==========================

async function resetJournal() {

    if (!confirm("Delete ALL journal entries?"))
        return;

    const { error } = await supabaseClient

        .from("journal_entries")

        .delete()

        .neq("id", 0);

    if (error) {

        console.error(error);

        return;

    }

    archive = [];

    currentEntry = null;

    document.getElementById("journal").value = "";

    loadArchive();

}