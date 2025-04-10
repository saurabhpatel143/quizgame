const quizData=[
    {
        question:"What is the capital of Germany",
        options:["A. Berlin","B. Madrid","C. Paris","D. Lisbon"],
        answer:"A. Berlin"
    },
    {
        question:"What is the capital of Spain",
        options:["A. Berlin","B. Madrid","C. Paris","D. Lisbon"],
        answer:"B. Madrid"
    },
    {
        question:"What is the capital of Portugal",
        options:["A. Berlin","B. Madrid","C. Paris","D. Lisbon"],
        answer:"D. Lisbon"
    },
    {
        question:"What is the capital of U.P.",
        options:["A. Berlin","B. Lucknow","C. Paris","D. Lisbon"],
        answer:"B. Lucknow"
    },
    {
        question:"What is the capital of Italy",
        options:["A. Berlin","B. Madrid","C. Rome","D. Lisbon"],
        answer:"C. Rome"
    },
    {
        question:"What is the capital of Italy",
        options:["A. Berlin","B. Madrid","C. Rome","D. Lisbon"],
        answer:"C. Rome"
    },
    {
        question:"What is the capital of France",
        options:[ "A. Berlin","B. Madrid","C. paris","D. Lisbon"],
        answer:"C. paris"
    },
    {
        question:"What is the CEO of Tesla",
        options:["A. Elon Musk","B. jeff bezos","C. Bill Gates","D. Mark zuckerberg"],
        answer:"A. Elon Musk"
    },
    {
        question:"What is the capital of USA",
        options:["A. Berlin","B. Washington DC","C. Paris","D. lisbon"],
        answer:"B. Washington DC"
    },
    {
        question:"what is the capital of India",
        options:["A. Delhi","B. Mumbai","C. Kolkata","D. Chennai"],
        answer:"A. Delhi"
    }
];
   
const questionNumberEl=document.getElementById("question-number");
const questionEl=document.getElementById("question");
const optionEl=document.querySelectorAll(".option");
const timerEl=document.getElementById("timer");
const nextBtn=document.getElementById("next-btn");
const resultEl=document.getElementById("result");
const scoreEl=document.getElementById("score");
const restartBtn=document.getElementById("restart-btn");
const startBtn=document.getElementById("start-btn");

let currentQuestion=0;
let score=0;
let timeLeft=10;
let timer;
let answerSelected=false;

 
function loadQuestion(){
    const { question, options}=quizData[currentQuestion];
    questionNumberEl.textContent=`Question ${currentQuestion +1} of ${quizData.length}`; //string template
   // questionNumberEl.textContent ='Question ${currentQuestion +1} of ${quizData.length}';//string template
    questionEl.textContent=question;
    optionEl.forEach((option, index)=>{
        option.textContent=options[index];
        option.classList.remove("correct","incorrect");
        option.onclick = () => selectoption(option);
    });
    answerSelected=false;
    nextBtn.disabled=true;
    startTimer();

}

function selectoption(option){
    if(!answerSelected){
        answerSelected=true;
        const selectedAnswer=option.textContent;
        const correctAnswer=quizData[currentQuestion].answer;
        if(selectedAnswer===correctAnswer){
            score++;
            option.classList.add("correct");
        }else{
            option.classList.add("incorrect");
            optionEl.forEach(opt =>{
                if(opt.textContent===correctAnswer){
                    opt.classList.add("correct");
                }
            })
        }
        nextBtn.disabled=false;
    }
}

function loadNextQuestion(){
    clearInterval(timer);
    if(currentQuestion < quizData.length-1){
        currentQuestion++;
        loadQuestion();
    }
    else{
        showResult();
    }
}

nextBtn.addEventListener("click",()=>{
    loadNextQuestion();
});

function startTimer(){

    clearInterval(timer);
    timeLeft=10;
    timerEl.textContent=`Time left: ${timeLeft}s`;//string template
    timer=setInterval(()=>{

         timeLeft--;
        timerEl.textContent=`Time left: ${timeLeft}s`; //string template
        if(timeLeft<=0){
            clearInterval(timer);  
            if(!answerSelected){
                loadNextQuestion();
            }
              }
    },1000)
}
function showResult(){
    const QuizEl=document.getElementById("quiz");
    QuizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent=`${score} out of ${quizData.length}`; //string template
}
//Initialize Quiz
loadQuestion();

 