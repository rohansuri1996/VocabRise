const adverbs = [
    { german: "schnell", english: "quickly" },
    { german: "langsam", english: "slowly" },
    { german: "leise", english: "quietly" },
    { german: "laut", english: "loudly" },
    { german: "gut", english: "well" },
    { german: "schlecht", english: "badly" },
    { german: "oft", english: "often" },
    { german: "selten", english: "rarely" },
    { german: "immer", english: "always" },
    { german: "nie", english: "never" },
    { german: "bereits", english: "already" },
    { german: "noch", english: "still" },
    { german: "bald", english: "soon" },
    { german: "jetzt", english: "now" },
    { german: "heute", english: "today" },
    { german: "gestern", english: "yesterday" },
    { german: "morgen", english: "tomorrow" },
    { german: "früher", english: "earlier" },
    { german: "später", english: "later" },
    { german: "dringend", english: "urgently" },
    { german: "schnell", english: "quickly" },
    { german: "schön", english: "beautifully" },
    { german: "häufig", english: "frequently" },
    { german: "selbst", english: "personally" },
    { german: "besonders", english: "especially" },
    { german: "etwas", english: "somewhat" },
    { german: "ganz", english: "completely" },
    { german: "wenig", english: "little" },
    { german: "viel", english: "much" },
    { german: "ungefähr", english: "approximately" },
    { german: "sofort", english: "immediately" },
    { german: "vorher", english: "beforehand" },
    { german: "nachher", english: "afterwards" },
    { german: "vielleicht", english: "perhaps" },
    { german: "natürlich", english: "naturally" },
    { german: "glaube", english: "believably" },
    { german: "sicher", english: "certainly" },
    { german: "ungewöhnlich", english: "unusually" },
    { german: "recht", english: "quite" },
    { german: "schließlich", english: "finally" },
    { german: "wieder", english: "again" },
    { german: "besonders", english: "particularly" },
    { german: "wirklich", english: "really" },
    { german: "genau", english: "exactly" },
    { german: "besonders", english: "specially" },
    { german: "selbstverständlich", english: "obviously" },
    { german: "also", english: "thus" },
    { german: "tatsächlich", english: "actually" },
    { german: "nun", english: "now" },
    { german: "eher", english: "rather" },
    { german: "erst", english: "not until" },
    { german: "eigentlich", english: "actually" },
    { german: "selbstverständlich", english: "naturally" },
    { german: "insgesamt", english: "overall" },
    { german: "bevor", english: "before" },
    { german: "damals", english: "back then" },
    { german: "damit", english: "so that" },
    { german: "zuvor", english: "before" },
    { german: "dann", english: "then" }
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
    let randomIndex = Math.floor(Math.random() * adverbs.length);
    return adverbs[randomIndex];
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
