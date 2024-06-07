// script.js
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const finalScoreElement = document.getElementById('final-score');
const finalScoreValueElement = document.getElementById('final-score-value');

let currentQuestionIndex, score, questionTimer, timeLeft, answerSelected;

const questions = [
    {
        question: 'Q1. Which of the following sorting algorithms is the fastest for sorting small arrays?',
        answers: [
            { text: 'Quick sort', correct: false },
            { text: 'Shell sort', correct: false },
            { text: 'Insertion sort', correct: true },
            { text: 'Heap sort', correct: false }
        ]
    },
    {
        question: 'Q2. Which of the following method is used for sorting in merge sort?',
        answers: [
            { text: 'partitioning', correct: false },
            { text: 'merging', correct: true },
            { text: 'exchanging', correct: false },
            { text: 'selection', correct: false }
        ]
    },
    {
        question: 'Q3. Which of the following sorting algorithm does not use recursion?',
        answers: [
            { text: 'bottom up merge sort', correct: true },
            { text: 'merge sort', correct: false },
            { text: 'heap sort', correct: false },
            { text: 'quick sort', correct: false }
        ]
    },
    {
        question: 'Q4. Shell sort algorithm is an example of?',
        answers: [
            { text: 'Bottom-up sorting', correct: false },
            { text: 'In-place sorting', correct: false },
            { text: 'Internal sorting', correct: true },
            { text: 'External sorting', correct: false }
        ]
    },
    {
        question: 'Q5.  What is the average case running time of an insertion sort algorithm?',
        answers: [
            { text: 'O(N)', correct: false },
            { text: 'O(N log N)', correct: false },
            { text: 'O(log N)', correct: false },
            { text: 'O(N2)', correct: true}
        ]
    },
    {
        question: 'Q6. In C, what are the basic loops required to perform an insertion sort?',
        answers: [
            { text: 'do- while', correct: false },
            { text: 'if else', correct: false },
            { text: 'for and while', correct: true },
            { text: 'for and if', correct: false }
        ]
    },
    {
        question: 'Q7. What is the worst case complexity of bubble sort?',
        answers: [
            { text: 'O(nlogn)', correct: false },
            { text: 'O(logn)', correct: false },
            { text: 'O(n)', correct: false },
            { text:  'O(n2)', correct: true }
        ]
    },
    {
        question: 'Q8. Merge sort uses which of the following technique to implement sorting?',
        answers: [
            { text: 'backtracking', correct: false },
            { text: 'greedy algorithm', correct: false },
            { text: 'divide and conquer', correct: true },
            { text: 'dynamic programming', correct: false }
        ]
    },
    {
        question: 'Q9. What is the average case time complexity of merge sort?',
        answers: [
            { text: 'O(n log n)', correct: true },
            { text: 'O(n2)', correct: false },
            { text: 'O(n2 log n)', correct: false },
            { text: 'O(n log n2)', correct: false }
        ]
    },
    {
        question: 'Q10. In the following scenarios, when will you use selection sort?',
        answers: [
            { text: 'The input is already sorted', correct: false },
            { text: 'A large file has to be sorted', correct: false },
            { text: 'Large values need to be sorted with small keys', correct: true },
            { text: 'Small values need to be sorted with large keys', correct: false }
        ]
    },
];

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.innerText = 'Score: ' + score;
    finalScoreElement.classList.add('hide');
    nextButton.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearTimeout(questionTimer);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    answerSelected = false;
}

function selectAnswer(e) {
    if (answerSelected) return;
    answerSelected = true;

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    updateScore(correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Submit';
        nextButton.classList.remove('hide');
    }
    clearTimeout(questionTimer);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateScore(correct) {
    if (correct) {
        score++;
    } else {
        score--;
    }
    scoreElement.innerText = 'Score: ' + score;
}

function startTimer() {
    timeLeft = 40;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    questionTimer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            Array.from(answerButtonsElement.children).forEach(button => {
                button.disabled = true;
            });
            nextButton.classList.remove('hide');
        }
    }, 1000);
}

function showFinalScore() {
    questionContainer.classList.add('hide');
    finalScoreElement.classList.remove('hide');
    finalScoreValueElement.innerText = score;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showFinalScore();
    }
});

startQuiz();
