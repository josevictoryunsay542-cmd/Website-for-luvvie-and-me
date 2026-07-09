const supabaseUrl = "https://egfqxcbhoiylnzlvlwhn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZnF4Y2Job2l5bG56bHZsd2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDQ1NTMsImV4cCI6MjA5OTEyMDU1M30.DDRSbsrVqtiteW0tAbZM8S-XxZhtOrN59WMrc9gGmMM";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

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

async function saveJournal() {

    const journal = document.getElementById("journal").value;

    const { error } = await supabase
        .from("journal_entries")
        .insert([
            {
                author: "Victor",
                entry: journal
            }
        ]);

    if (error) {
        alert("Couldn't save!");
        console.log(error);
    } else {
        alert("Saved!");
    }
}

async function loadJournal(){

    const { data, error } =
        await supabase
        .from("journal_entries")
        .select("*")
        .eq("author","Victor")
        .order("created_at",{
            ascending:false
        })
        .limit(1);

    if(data.length > 0){

        document.getElementById("journal").value =
            data[0].entry;

    }

}

window.onload = function(){

    loadJournal();

}