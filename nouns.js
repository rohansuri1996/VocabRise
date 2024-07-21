const nouns = [
    { german: "der Apfel", english: "the apple" },
    { german: "die Katze", english: "the cat" },
    { german: "das Buch", english: "the book" },
    { german: "der Hund", english: "the dog" },
    { german: "die Blume", english: "the flower" },
    { german: "das Auto", english: "the car" },
    { german: "der Tisch", english: "the table" },
    { german: "die Lampe", english: "the lamp" },
    { german: "das Haus", english: "the house" },
    { german: "der Stuhl", english: "the chair" },
    { german: "die Schule", english: "the school" },
    { german: "das Fenster", english: "the window" },
    { german: "der Lehrer", english: "the teacher (male)" },
    { german: "die Lehrerin", english: "the teacher (female)" },
    { german: "das Kind", english: "the child" },
    { german: "der Mann", english: "the man" },
    { german: "die Frau", english: "the woman" },
    { german: "das Wasser", english: "the water" },
    { german: "der Kaffee", english: "the coffee" },
    { german: "die Stadt", english: "the city" },
    { german: "das Land", english: "the country" },
    { german: "der Freund", english: "the friend (male)" },
    { german: "die Freundin", english: "the friend (female)" },
    { german: "das Essen", english: "the food" },
    { german: "der Lehrer", english: "the teacher (male)" },
    { german: "die Uhr", english: "the clock" },
    { german: "das Handy", english: "the cell phone" },
    { german: "der Computer", english: "the computer" },
    { german: "die Straße", english: "the street" },
    { german: "das Bild", english: "the picture" },
    { german: "der Zug", english: "the train" },
    { german: "die Reise", english: "the trip" },
    { german: "das Zimmer", english: "the room" },
    { german: "der Park", english: "the park" },
    { german: "die Musik", english: "the music" },
    { german: "das Kleid", english: "the dress" },
    { german: "der Kopf", english: "the head" },
    { german: "die Hand", english: "the hand" },
    { german: "das Bein", english: "the leg" },
    { german: "der Fuß", english: "the foot" },
    { german: "die Augen", english: "the eyes" },
    { german: "das Ohr", english: "the ear" },
    { german: "der Mund", english: "the mouth" },
    { german: "die Nase", english: "the nose" },
    { german: "das Herz", english: "the heart" },
    { german: "der Freund", english: "the friend (male)" },
    { german: "die Freundin", english: "the friend (female)" },
    { german: "das Spiel", english: "the game" },
    { german: "der Tag", english: "the day" },
    { german: "die Nacht", english: "the night" },
    { german: "das Jahr", english: "the year" },
    { german: "der Monat", english: "the month" },
    { german: "die Woche", english: "the week" },
    { german: "das Wochenende", english: "the weekend" },
    { german: "der Morgen", english: "the morning" },
    { german: "die Mittag", english: "the noon" },
    { german: "das Abendessen", english: "the dinner" },
    { german: "der Nachmittag", english: "the afternoon" },
    { german: "die Sonne", english: "the sun" },
    { german: "der Regen", english: "the rain" },
    { german: "das Wetter", english: "the weather" },
    { german: "die Wärme", english: "the warmth" },
    { german: "das Kalt", english: "the cold" },
    { german: "der Schnee", english: "the snow" },
    { german: "die Luft", english: "the air" }
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
    let randomIndex = Math.floor(Math.random() * nouns.length);
    return nouns[randomIndex];
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