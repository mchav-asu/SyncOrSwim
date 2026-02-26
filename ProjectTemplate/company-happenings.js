const likertChoices = [
    "Agree",
    "Neutral",
    "Disagree"
    ];

const questions = [
    {
        id: 1,
        text: "I enjoy the work I do on a day to day basis?",
        choices: likertChoices 
        
    },
    {
        id: 2,
        text: "I can complete my work without excess delays?",
        choices: likertChoices 
        
    },
    {
        id: 3,
        text: "I have the tools I need to perform effectively?",
        choices: likertChoices 
        
    }
];

let currentIndex = 0;
const answers = {};

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");
const errorEl = document.getElementById("error");
const nextBtn = document.getElementById("nextBtn");

function renderQuestion() {
    const q = questions[currentIndex];

    progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    questionEl.textContent = q.text;
    choicesEl.innerHTML = "";
    errorEl.style.display = "none";

    q.choices.forEach((choice, index) => {
        const label = document.createElement("label");
        label.className = "choice";
        label.innerHTML = `
            <input type="radio" name="choice" value="${index}">
            ${choice}
        `;
        choicesEl.appendChild(label);
    });

    nextBtn.textContent =
        currentIndex === questions.length - 1 ? "Finish" : "Next";
}

nextBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="choice"]:checked');

    if (!selected) {
        errorEl.style.display = "block";
        return;
    }

    answers[questions[currentIndex].id] = selected.value;

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        showCompletion();
    }
});

function showCompletion() {
    window.location.href = "thank-you.html";
}

renderQuestion();
