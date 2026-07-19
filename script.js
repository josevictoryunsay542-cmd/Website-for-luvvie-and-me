
const questions = [

    // Memories
    "What's your favorite memory with me?",
    "When did you first realize you liked me?",
    "What's a moment with me that you'll never forget?",
    "What's a memory you wish we could relive?",

    // Daily Reflection
    "What made you smile today?",
    "How was your day, really?",
    "What challenged you today?",
    "What are you most grateful for today?",
    "What's one thing you're proud of today?",
    "If today had a title, what would it be?",

    // About Each Other
    "What's one thing you admire about me?",
    "What's something you think I'm really good at?",
    "What's your favorite habit of mine?",
    "What's something you'd like us to do together someday?",

    // Fun
    "If we won the lottery tomorrow, what's the first thing we'd do?",
    "What's our dream vacation?",
    "If we could swap lives for a day, what would you do first?",
    "If we had matching pets, what would we name them?",
    "What's the funniest thing we've ever done together?",

    // Random
    "What's your comfort food?",
    "What's your comfort movie?",
    "What's your favorite season and why?",
    "What's one hobby you'd love to try?",
    "What's your current favorite song?",

    // Future
    "Where do you see us a year from now?",
    "What's one goal you hope we accomplish together?",
    "What's something you're excited to experience with me?",
    "What's one tradition you'd like us to start?",

    // Love
    "When do you feel most loved?",
    "What's your favorite thing I do for you?",
    "What's something I do that always makes you smile?",
    "How can I support you better?",
    "What's one thing you appreciate about our relationship?",

    // Deep
    "What's one fear you've overcome?",
    "What's something you're still working on?",
    "What's one lesson life has taught you recently?",
    "If you could tell your younger self one thing, what would it be?",
    "What's something you've always wanted to say but never have?",

    // Cute
    "If our relationship were a movie, what would its title be?",
    "What's one emoji that describes us today?",
    "What's your favorite nickname for me?",
    "If we baked cookies together, what kind would we make?",
    "What's something small that reminds you of me?",

    // Just Because
    "Describe me using only three words.",
    "What's something you're looking forward to this week?",
    "What's something that made you laugh recently?",
    "If today had a soundtrack, what song would be playing?",
    "What's one question you've always wanted to ask me?"

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

