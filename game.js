//   VARIABLE CREATION 
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Load questions from a JSON file
fetch("https://opentdb.com/api.php?amount=30&category=9&difficulty=medium&type=multiple")
.then(res => {
    return res.json();
})
.then(loadedQuestions =>{
    questions = loadedQuestions.results.map(loadedQuestions =>{
        const formattedQuestion = {
            question: loadedQuestions.question
        };
    console.log(formattedQuestion);
        const answerChoices = [...loadedQuestions.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) +1;
        answerChoices.splice(
          formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer
        );
        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });
     return formattedQuestion;
    });
 startGame();
}).catch(err =>{
    console.error(err);
});

//  FUNCTIONS FOR APP
startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS){
        //Go to end page
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    
    // Update progress bar
    progressBarFull.style.width = ((100/MAX_QUESTIONS) * questionCounter) + "%";
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", function(e){
        if (!acceptingAnswers){
        return;}
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer){
            classToApply = "correct";
        }

        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    })
});

incrementScore = num =>{
    score+=num;
    scoreText.innerText = score;
}