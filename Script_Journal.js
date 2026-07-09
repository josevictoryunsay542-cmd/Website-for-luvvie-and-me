const supabaseUrl = "https://egfqxcbhoiylnzlvlwhn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZnF4Y2Job2l5bG56bHZsd2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDQ1NTMsImV4cCI6MjA5OTEyMDU1M30.DDRSbsrVqtiteW0tAbZM8S-XxZhtOrN59WMrc9gGmMM";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


async function saveJournal() {

    const journal = document.getElementById("journal").value;

    if (journal.trim() === "") {
        alert("Write something first!");
        return;
    }

    const { error } = await supabase
        .from("journal_entries")
        .insert([
            {
                author: "Victor",
                entry: journal
            }
        ]);

    if (error) {
        console.log(error);
        alert("Couldn't save.");
        return;
    }

    document.getElementById("journal").value = "";

    loadArchive();
}

async function loadArchive() {

    const archive = document.getElementById("archive");

    archive.innerHTML = "<h2>Archive</h2>";

    const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    data.forEach(entry => {

        const button = document.createElement("button");

        const date = new Date(entry.created_at);

        button.textContent =
            date.toLocaleDateString() +
            " - " +
            entry.author;

        button.className = "archiveButton";

        button.onclick = function () {
            openEntry(entry);
        };

        archive.appendChild(button);

    });

}

function openEntry(entry) {

    const viewer = document.getElementById("viewer");

    viewer.innerHTML = `
        <h2>${entry.author}</h2>

        <small>
            ${new Date(entry.created_at).toLocaleString()}
        </small>

        <hr>

        <p style="white-space:pre-wrap;">
            ${entry.entry}
        </p>

}

window.onload = function () {

    loadArchive();

};