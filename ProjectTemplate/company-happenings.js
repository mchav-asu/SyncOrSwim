const questions = [
    {
        id: 1,
        text: "?",
        choices: [
        ]
    },
    {
        id: 2,
        text: "?",
        choices: [
        ]
    },
    {
        id: 3,
        text: "?",
        choices: [
        ]
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
    window.location.href = "/project/thank-you.html";
}

renderQuestion();
