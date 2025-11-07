let questions = [];
let currentQuestion = 0;
let score = 0;
let playerName = '';
let fontSize = 16;

// โหลดคำถามจาก JSON
fetch('questions_part1.json')
    .then(res => res.json())
    .then(data => { questions = data; });

const startBtn = document.getElementById('start-btn');
const playerInput = document.getElementById('player-name');
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const scoreScreen = document.getElementById('score-screen');
const questionText = document.getElementById('question-text');
const translationText = document.getElementById('translation-text');
const answersDiv = document.getElementById('answers');
const questionImage = document.getElementById('question-image');
const nextBtn = document.getElementById('next-btn');
const playerDisplay = document.getElementById('player-display');
const rankDisplay = document.getElementById('rank-display');
const finalScore = document.getElementById('final-score');
const increaseFont = document.getElementById('increase-font');
const decreaseFont = document.getElementById('decrease-font');
const restartBtn = document.getElementById('restart-btn');

// เริ่มเกม
startBtn.addEventListener('click', () => {
    playerName = playerInput.value || 'Player';
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    playerDisplay.textContent = `Player: ${playerName}`;
    showQuestion();
});

// แสดงคำถาม
function showQuestion() {
    nextBtn.classList.add('hidden');
    answersDiv.innerHTML = '';
    translationText.textContent = '';
    let q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionImage.src = q.image || 'images/default.png';
    questionText.style.fontSize = fontSize + 'px';
    q.options.forEach((opt, idx) => {
        let btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        answersDiv.appendChild(btn);
    });
    updateRank();
}

// ตรวจคำตอบ
function checkAnswer(idx, btn) {
    let q = questions[currentQuestion];
    if (idx === q.answer) {
        score++;
        btn.classList.add('correct');
        translationText.textContent = `ถูก! แปล: ${q.translation}`;
    } else {
        btn.classList.add('wrong');
        translationText.textContent = `ผิด! คำตอบถูกคือ: ${q.options[q.answer]} แปล: ${q.translation}`;
        // ทำให้ปุ่มคำตอบถูกแสดงสีเขียว
        Array.from(answersDiv.children)[q.answer].classList.add('correct');
    }
    // ปิดปุ่มอื่น
    Array.from(answersDiv.children).forEach(b => b.disabled = true);

    currentQuestion++;
    if (currentQuestion < questions.length) nextBtn.classList.remove('hidden');
    else nextBtn.textContent = "Finish";
}

// ต่อไป / สรุปคะแนน
nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// แสดงคะแนน
function showScore() {
    gameScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    finalScore.textContent = `${playerName}, your score: ${score} / ${questions.length}`;
}

// ปรับขนาดตัวอักษร
increaseFont.addEventListener('click', () => {
    fontSize += 2;
    questionText.style.fontSize = fontSize + 'px';
});
decreaseFont.addEventListener('click', () => {
    fontSize = Math.max(12, fontSize - 2);
    questionText.style.fontSize = fontSize + 'px';
});

// เล่นใหม่
restartBtn.addEventListener('click', () => {
    location.reload();
});

// อัปเดตรายการ Rank
function updateRank() {
    let percent = currentQuestion > 0 ? (score / currentQuestion) * 100 : 0;
    let rank = '';
    if (percent < 20) rank = 'Beginner';
    else if (percent < 40) rank = 'Elementary';
    else if (percent < 60) rank = 'Intermediate';
    else if (percent < 80) rank = 'Advanced';
    else rank = 'Expert';
    rankDisplay.textContent = `Rank: ${rank}`;
}
