const questions = [
    {
        question: "What is HTML?",
        answers: [
            { text:"Document Type", correct: false},
            { text:"Markup language", correct: true},
            { text:"Programming language", correct: false},
            { text:"Script language", correct: false},
        ]
    },
    {
        question: "What does HTML stands for?",
        answers: [
            { text:"Hypertext Machine language", correct: false},
            { text:"Hypertext and links markup language", correct: false},
            { text:"Hypertext Markup Language", correct: true},
            { text:"Hightext machine language", correct: false},
        ]
    },
    {
        question: "Which of the following HTML element is used for creating an unordered list?",
        answers: [
            { text:"i", correct: false},
            { text:"ul", correct: true},
            { text:"ui", correct: false},
            { text:"em", correct: false},
        ]
    },
    {
        question: "Which of the following characters indicate closing of a tag?",
        answers: [
            { text:".", correct: false},
            { text:"/", correct: true},
            { text:"//", correct: false},
            { text:"!", correct: false},
        ]
    },
    {
        question: "How many heading tags are there in HTML5?",
        answers: [
            { text:"2", correct: false},
            { text:"6", correct: true},
            { text:"4", correct: false},
            { text:"5", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn =  e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");          
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handelNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handelNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();