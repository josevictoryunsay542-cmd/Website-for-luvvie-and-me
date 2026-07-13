
const questions = [
    "What's your favorite memory with me?",
    "What made you smile today?",
    "What's one thing you're grateful for today?",
    "What's something you appreciate about yourself?",
    "What's one song that reminds you of us?",
    "What's your comfort food?",
    "If today had a title, what would it be?",
    "What's something you hope we do together this year?"
];

function showDailyQuestion() {

    const questionElement = document.getElementById("question");

    if (!questionElement) return;

    const today = new Date();

    const dateString =
        today.getFullYear() + "-" +
        (today.getMonth() + 1) + "-" +
        today.getDate();

    let hash = 0;

    for (let i = 0; i < dateString.length; i++) {
        hash += dateString.charCodeAt(i);
    }

    const index = hash % questions.length;

    questionElement.textContent = questions[index];

}

function resetJournal() {

    if (!confirm("Delete all journal entries?")) return;

    localStorage.removeItem("journalArchive");

    archive = [];
    currentEntry = null;

    loadArchive();

    document.getElementById("journal").value = "";

}

