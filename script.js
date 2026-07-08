const questions = [
    "What's your favorite memory with me?",
    "What's one place you want us to visit?",
    "What's something you've always wanted to tell me?",
    "What's your favorite food?",
    "What song reminds you of me?"
];

function newQuestion(){

    let random =
    Math.floor(Math.random()*questions.length);

    document.getElementById("question").textContent =
    questions[random];

}