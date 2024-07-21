const verbs = [
    { german: "sein", english: "to be" },
    { german: "haben", english: "to have" },
    { german: "werden", english: "to become" },
    { german: "können", english: "can" },
    { german: "müssen", english: "must" },
    { german: "wollen", english: "want" },
    { german: "sagen", english: "to say" },
    { german: "machen", english: "to make/do" },
    { german: "geben", english: "to give" },
    { german: "kommen", english: "to come" },
    { german: "gehen", english: "to go" },
    { german: "sehen", english: "to see" },
    { german: "essen", english: "to eat" },
    { german: "trinken", english: "to drink" },
    { german: "schlafen", english: "to sleep" },
    { german: "fahren", english: "to drive/go" },
    { german: "laufen", english: "to run" },
    { german: "lesen", english: "to read" },
    { german: "schreiben", english: "to write" },
    { german: "arbeiten", english: "to work" },
    { german: "finden", english: "to find" },
    { german: "vergessen", english: "to forget" },
    { german: "beginnen", english: "to begin" },
    { german: "enden", english: "to end" },
    { german: "versuchen", english: "to try" },
    { german: "stellen", english: "to place" },
    { german: "nehmen", english: "to take" },
    { german: "bringen", english: "to bring" },
    { german: "erklären", english: "to explain" },
    { german: "kennen", english: "to know" },
    { german: "lernen", english: "to learn" },
    { german: "vergessen", english: "to forget" },
    { german: "erinnern", english: "to remember" },
    { german: "fragen", english: "to ask" },
    { german: "antworten", english: "to answer" },
    { german: "warten", english: "to wait" },
    { german: "kaufen", english: "to buy" },
    { german: "verkaufen", english: "to sell" },
    { german: "benutzen", english: "to use" },
    { german: "empfehlen", english: "to recommend" },
    { german: "erfahren", english: "to experience" },
    { german: "zeigen", english: "to show" },
    { german: "glauben", english: "to believe" },
    { german: "verstehen", english: "to understand" },
    { german: "erlauben", english: "to allow" },
    { german: "verbieten", english: "to forbid" },
    { german: "entscheiden", english: "to decide" },
    { german: "suchen", english: "to search" },
    { german: "finden", english: "to find" },
    { german: "bauen", english: "to build" },
    { german: "beenden", english: "to finish" },
    { german: "verlangen", english: "to demand" },
    { german: "vermissen", english: "to miss" },
    { german: "besuchen", english: "to visit" },
    { german: "schicken", english: "to send" },
    { german: "aussehen", english: "to look" },
    { german: "erleben", english: "to experience" },
    { german: "verstehen", english: "to understand" },
    { german: "auswählen", english: "to choose" },
    { german: "erinnern", english: "to remind" },
    { german: "vergleichen", english: "to compare" },
    { german: "aufhören", english: "to stop" },
    { german: "anfangen", english: "to start" },
    { german: "vermeiden", english: "to avoid" },
    { german: "überlegen", english: "to consider" },
    { german: "entspannen", english: "to relax" },
    { german: "aufgeben", english: "to give up" },
    { german: "einfahren", english: "to arrive" },
    { german: "abholen", english: "to pick up" },
    { german: "verwandeln", english: "to transform" },
    { german: "verarbeiten", english: "to process" },
    { german: "überprüfen", english: "to check" },
    { german: "vorbereiten", english: "to prepare" },
    { german: "zusammenarbeiten", english: "to collaborate" },
    { german: "abstimmen", english: "to vote" },
    { german: "erzeugen", english: "to generate" },
    { german: "überqueren", english: "to cross" },
    { german: "einnehmen", english: "to take (medicine)" },
    { german: "weitergeben", english: "to pass on" },
    { german: "benachrichtigen", english: "to notify" },
    { german: "umarmen", english: "to hug" },
    { german: "anfassen", english: "to touch" },
    { german: "verwalten", english: "to manage" },
    { german: "überwachen", english: "to monitor" },
    { german: "versichern", english: "to insure" },
    { german: "freuen", english: "to be happy" }
];

let score = 0;
let usedWords = [];
const totalQuestions = 25;

function startGame() {
    usedWords = [];
    score = 0;
    document.getElementById('score').innerText = `Score: ${score} / 250`;
    document.getElementById('remaining').innerText = `Remaining: ${totalQuestions}`;
    nextQuestion();
}

function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * verbs.length);
    return verbs[randomIndex];
}

function getOptions(correctWord) {
    let options = [correctWord];
    while (options.length < 4) {
        let word = getRandomWord();
        if (!options.some(opt => opt.german === word.german)) {
            options.push(word);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function nextQuestion() {
    if (usedWords.length >= totalQuestions) {
        alert(`Game over! Your final score is ${score} out of 250.`);
        return;
    }

    let question = getRandomWord();
    while (usedWords.some(word => word.german === question.german)) {
        question = getRandomWord();
    }

    usedWords.push(question);
    let options = getOptions(question);

    document.getElementById('question').innerText = `Translate: ${question.english}`;
    document.getElementById('options').innerHTML = '';
    options.forEach(option => {
        let button = document.createElement('button');
        button.innerText = option.german;
        button.onclick = () => checkAnswer(option, question);
        document.getElementById('options').appendChild(button);
    });
}

function checkAnswer(selectedOption, correctOption) {
    let buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => {
        if (button.innerText === correctOption.german) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    if (selectedOption.german === correctOption.german) {
        score += 10;
    }

    document.getElementById('score').innerText = `Score: ${score} / 250`;
    document.getElementById('remaining').innerText = `Remaining: ${totalQuestions - usedWords.length}`;
    
    setTimeout(nextQuestion, 1000);
}

window.onload = startGame;