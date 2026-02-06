// JavaScript source code

//METHOD FOR SURVEY PROMPT QUESTION//
function surveyPrompt() {
    let answer = prompt("Do you have time to provide feedback questions about your work experience? Please answer Y or N: ");

    if (answer && answer.toLowerCase() == "y") {
        console.log("Placeholder for survey");
    } else {
        console.log("We will ask again in one month. Thank you.");
    }

}