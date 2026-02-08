const default_questions = [
    "How satisfied are you with your tasks?",
    "What can we do to improve your experience as an employee?",
    "Anything you would like to report?"
]

let questions = [...default_questions]

const questionList = document.getElementById("questionList")
const questionInput = document.getElementById("questionInput")
const statusMessage = document.getElementById("statusMessage")

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

function addQuestion() {
    const text = questionInput.value.trim()
    if (text == "") {
        statusMessage.textContent = "Error, please type a question to continue..."
        statusMessage.className = "error"
        return
    }

    questions.push(text)
    questionInput.value = ""
    renderQuestions()

    statusMessage.textContent = "Question Added Successfully!"
    statusMessage.className = "success"
}

function deleteQuestion(index) {
    questions.splice(index, 1)
    renderQuestions()

    statusMessage.textContent = "Question Deleted!"
    statusMessage.className = "del"
}

function logout() {
    localStorage.removeItem("IsLoggedIn")
    window.location.href = "login.html"
}

function reset() {
    questions = [...default_questions]
    renderQuestions()

    statusMessage.textContent = "Survey Questions Reset Successfully!"
    statusMessage.className = "success"
}

renderQuestions()