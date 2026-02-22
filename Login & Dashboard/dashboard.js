const default_questions = [
    "How satisfied are you with your tasks?",
    "What can we do to improve your experience as an employee?",
    "Anything you would like to report?"
]

let questions = [...default_questions]

const questionList = document.getElementById("questionList")
const questionInput = document.getElementById("questionInput")
const statusMessage = document.getElementById("statusMessage")

async function loadQuestions() {
    try {
        const res = await fetch("/api/questions")
        if (!res.ok) throw new Error("Failed to load")
        const data = await res.json()

        if (data && Array.isArray(data.questions)) {
            questions = data.questions
        } else {
            questions = [...default_questions]
        }
    } catch (err) {
        questions = [...default_questions]
    }
}

async function saveQuestions() {
    const res = await fetch("/api/questions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({questions})
    })

    if (!res.ok) {
        throw new Error("Failed to save")
    }
}

function renderQuestions() {
    questionList.innerHTML = ""

    questions.forEach((q, index) => {
        const div = document.createElement("div")
        div.className = "question"

        div.innerHTML = `<div class="question-text">${q}</div>
                         <button class="delete" onclick="deleteQuestion(${index})">Delete</button>`

        questionList.appendChild(div)
    })
}

async function addQuestion() {
    const text = questionInput.value.trim()
    if (text == "") {
        statusMessage.textContent = "Error, please type a question to continue..."
        statusMessage.className = "error"
        return
    }

    questions.push(text)
    questionInput.value = ""
    renderQuestions()

    try {
        await saveQuestions()
        statusMessage.textContent = "Question Added Successfully!"
        statusMessage.className = "success"
    } catch (err) {
        statusMessage.textContent = "Error Saving"
        statusMessage.className = "error"
    }
}

async function deleteQuestion(index) {
    questions.splice(index, 1)
    renderQuestions()

    try {
        await saveQuestions()
        statusMessage.textContent = "Question Deleted!"
        statusMessage.className = "del"
    } catch (err) {
        statusMessage.textContent = "Error Deleting Questions!"
        statusMessage.className = "error"
    }
    
}

function logout() {
    localStorage.removeItem("IsLoggedIn")
    window.location.href = "login.html"
}

async function reset() {
    questions = [...default_questions]
    renderQuestions()

    try {
        await saveQuestions()
        statusMessage.textContent = "Survey Questions Reset Successfully!"
        statusMessage.className = "success"
    } catch (err) {
        statusMessage.textContent = "Error Reseting Questions"
        statusMessage.className = "error"
    }
}

(async function init() {
    await loadQuestions()
    renderQuestions()
})();