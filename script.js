//declare variables
let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('nextbtn');
const prevBtn = document.getElementById('prevbtn');

const answers = {
    q1: "Gravity",
    q2: "The Sun",
    q3: "Hydrogen and Oxygen",
    q4: "Sunlight, Water and carbon dioxide",
    q5: "Copper",
     q6: "Mars",
    q7: " Oxygen",
    q8: "Charles Babbage",
    q9: "Paris",
    q10: "Blue Whale",
     q11: "Roots",
    q12: "Africa",
    q13: "Cheetah",
    q14: " Pacific Ocean",
    q15: "Yen"
};

let userAnswers = {};

// Show one question at a time
function showQuestion(index) {
    questions.forEach((q, i) => {
        q.style.display = i === index ? 'block' : 'none';
    });

    prevBtn.disabled = index === 0;
    nextBtn.innerText = index === questions.length - 1 ? 'Finish' : 'Next';
}

nextBtn.addEventListener('click', () => {
    saveUserAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        calculateScore();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

function saveUserAnswer() {
    const selectedOption = document.querySelector(`.question:nth-child(${currentQuestion + 1}) input[type="radio"]:checked`);
    if (selectedOption) {
        userAnswers[`q${currentQuestion + 1}`] = selectedOption.value;
    }
}

function calculateScore() {
    let score = 0;
    let resultMessage = "<h2>Quiz Results</h2>";

    for (let key in answers) {
        const userAnswer = (userAnswers[key] || "No Answer").trim().toLowerCase();
        const correctAnswer = answers[key].trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
            resultMessage += `<p>${key}:  Correct (${answers[key]})</p>`;
        } else {
            resultMessage += `<p>${key}:  Incorrect (Your Answer: ${userAnswers[key] || "No Answer"}, Correct: ${answers[key]})</p>`;
        }
    }

    resultMessage += `<h3>Your Final Score: ${score} / ${Object.keys(answers).length}</h3>`;

    // Add Quit and Restart buttons
    resultMessage += `
        <div style="margin-top: 20px;">
            <button id="restartbtn" class="btn">Restart Quiz</button>
            <button id="quitbtn" class="btn">Quit</button>
        </div>
    `;

    // Display the results and buttons
    document.querySelector(".quiz-container").innerHTML = resultMessage;

    // Add event listeners for the new buttons
    document.getElementById('quitbtn').addEventListener('click', () => {
        const confirmQuit = confirm('Are you sure you want to quit?');
        if (confirmQuit) {
            window.location.href = 'index.html'; // Redirect to the home page
        }
    });

    document.getElementById('restartbtn').addEventListener('click', () => {
        window.location.reload(); // Reload the page to restart the quiz
    });
}

let timeLeft = 300;
let timerInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startCountdown() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            calculateScore(); // Automatically submit the quiz
        } else {
            document.getElementById("timer").innerText = formatTime(timeLeft);
            timeLeft--;
        }
    }, 1000);
}

showQuestion(currentQuestion);
startCountdown(); // Start the timer