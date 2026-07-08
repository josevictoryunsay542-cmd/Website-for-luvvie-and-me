const questions = [
    "What's your favorite memory with me?",
    "What made you smile today?",
    "What's one thing you're grateful for today?",
    "If we could travel anywhere together, where would we go?",
    "What's a dream you haven't told me about yet?",
    "What's something you appreciate about yourself?",
    "What's one song that reminds you of us?",
    "What's your comfort food?",
    "If today had a title, what would it be?",
    "What's something you hope we do together this year?"
];

function showDailyQuestion() {

    const today = new Date();

    // Example: 2026-07-08
    const dateString = today.getFullYear() + "-" +
                       (today.getMonth() + 1) + "-" +
                       today.getDate();

    // Convert the date into a number
    let hash = 0;

    for (let i = 0; i < dateString.length; i++) {
        hash += dateString.charCodeAt(i);
    }

    const index = hash % questions.length;

    document.getElementById("question").textContent =
        questions[index];
}