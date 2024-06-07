const questions = [
    {
      question: 'If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:',
      options: ['50 Km', '56 Km', '70 Km', '80 Km'],
      correctAnswer: '50 Km'
    },
    {
      question: 'Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?',
      options: ['9', '10', '12', '20'],
      correctAnswer: '10'
    },

    {
      question: 'A man complete a journey in 10 hours. He travels first half of the journey at the rate of 21 km/hr and second half at the rate of 24 km/hr. Find the total journey in km.',
      options: ['224', '220', '230', '234'],
      correctAnswer: '224'
    },

    {
      question: 'In a flight of 600 km, an aircraft was slowed down due to bad weather. Its average speed for the trip was reduced by 200 km/hr and the time of flight increased by 30 minutes. The duration of the flight is:',
      options: ['1 hour', '2 hours', '3 hours', '4 hours'],
      correctAnswer: '1 hour'
    },
    {
      question: 'The ratio between the speeds of two trains is 7 : 8. If the second train runs 400 km in 4 hours, then the speed of the first train is:',
      options: ['70 km/hr', '75km/hr', '84 km/hr', '87.5 km/hr'],
      correctAnswer: '87.5 km/hr'
    },

    {
      question: 'A man on tour travels first 160 km at 64 km/hr and the next 160 km at 80 km/hr. The average speed for the first 320 km of the tour is:',
      options: ['35.5 km/hr', '36km/hr', '71 km/hr', '71.11 km/hr'],
      correctAnswer: '71.11 km/hr'
    },

    {
      question: 'Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?',
      options: ['9', '10', '12', '20'],
      correctAnswer: '10'
    },

  
    // Add more questions as needed
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  function startQuiz() {
    showQuestion();
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
  
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    timerElement.textContent = '';
  
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(index));
      optionsContainer.appendChild(optionElement);
    });
  
    resultElement.textContent = '';
  
    startTimer();
  }
  
  function startTimer() {
    let timeLeft = 10; // 5 seconds
    const timerElement = document.getElementById('timer');
  
    timer = setInterval(() => {
      timerElement.textContent = `Time left: ${timeLeft} seconds`;
  
      if (timeLeft === 0) {
        
        clearInterval(timer);
        checkAnswer(-1); // -1 indicates that the time is up
        alert("Time is Up");
      }
  
      timeLeft--;
    }, 1000);
  }
  
  function checkAnswer(optionIndex) {
    clearInterval(timer); // Stop the timer
  
    const currentQuestion = questions[currentQuestionIndex];
  
    if (optionIndex !== -1 && currentQuestion.correctAnswer === currentQuestion.options[optionIndex]) {
      score++;
    }
  
    document.getElementById('next-btn').disabled = false;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<div id="result">Your Score: ${score} out of ${questions.length}</div>`;
  }
  
  startQuiz();
  