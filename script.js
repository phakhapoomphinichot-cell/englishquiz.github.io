let allQuestions = [];
let todayQuestions = [];
let currentIndex = 0;
let score = 0;
const today = new Date().toLocaleDateString();

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

async function loadQuestions() {
  const res = await fetch("questions.json");
  allQuestions = await res.json();
  startQuiz();
}

function startQuiz() {
  const savedDate = localStorage.getItem("quizDate");
  const savedSet = localStorage.getItem("quizSet");

  if (savedDate === today && savedSet) {
    todayQuestions = JSON.parse(savedSet);
  } else {
    todayQuestions = pickQuestions();
    localStorage.setItem("quizDate", today);
    localStorage.setItem("quizSet", JSON.stringify(todayQuestions));
  }

  currentIndex = 0;
  score = 0;
  showQuestion();
}

function pickQuestions() {
  const easy = allQuestions.filter(q => q.level === "easy").sort(() => 0.5 - Math.random()).slice(0, 4);
  const medium = allQuestions.filter(q => q.level === "medium").sort(() => 0.5 - Math.random()).slice(0, 3);
  const hard = allQuestions.filter(q => q.level === "hard").sort(() => 0.5 - Math.random()).slice(0, 3);
  return [...easy, ...medium, ...hard];
}

function showQuestion() {
  if (currentIndex >= todayQuestions.length) {
    showScore();
    return;
  }

  const q = todayQuestions[currentIndex];
  questionEl.textContent = `ข้อที่ ${currentIndex + 1}: ${q.question}`;
  choicesEl.innerHTML = "";
  explanationEl.classList.add("hidden");
  explanationEl.innerHTML = "";
  nextBtn.style.display = "none";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.classList.add("choice");
    btn.onclick = () => selectAnswer(btn, q);
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, q) {
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach(b => (b.disabled = true));

  if (selectedBtn.textContent === q.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === q.answer) b.classList.add("correct");
    });
  }

  explanationEl.innerHTML = `
    <strong>เฉลย:</strong> ${q.answer}<br>
    <strong>คำอธิบาย:</strong> ${q.explanation}<br>
    <strong>คำแปล:</strong> ${q.translation}
  `;
  explanationEl.classList.remove("hidden");

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `คุณได้ ${score} คะแนน จาก ${todayQuestions.length} ข้อ`;
}

function restartQuiz() {
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  startQuiz();
}

loadQuestions();
