async function loadQuestions() {
  const res = await fetch('questions.json');
  return res.json();
}

let questions = [];
let todayQuestions = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const explanationEl = document.getElementById('explanation');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');

const today = new Date().toLocaleDateString();

async function initQuiz() {
  questions = await loadQuestions();
  const savedDate = localStorage.getItem('quizDate');
  const savedSet = localStorage.getItem('quizSet');
  if (savedDate === today && savedSet) {
    todayQuestions = JSON.parse(savedSet);
  } else {
    todayQuestions = pickTodayQuestions();
    localStorage.setItem('quizDate', today);
    localStorage.setItem('quizSet', JSON.stringify(todayQuestions));
  }
  showQuestion();
}

function pickTodayQuestions() {
  const easy = questions.filter(q => q.level === 'easy').sort(() => 0.5 - Math.random()).slice(0, 4);
  const medium = questions.filter(q => q.level === 'medium').sort(() => 0.5 - Math.random()).slice(0, 3);
  const hard = questions.filter(q => q.level === 'hard').sort(() => 0.5 - Math.random()).slice(0, 3);
  return [...easy, ...medium, ...hard];
}

function showQuestion() {
  const q = todayQuestions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';
  explanationEl.classList.add('hidden');
  explanationEl.innerHTML = '';
  nextBtn.style.display = 'none';

  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice');
    btn.onclick = () => selectAnswer(btn, q);
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, q) {
  const choices = document.querySelectorAll('.choice');
  choices.forEach(b => (b.disabled = true));

  if (selectedBtn.textContent === q.answer) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('wrong');
  }

  explanationEl.innerHTML = `<strong>เฉลย:</strong> ${q.answer}<br>
  <strong>คำอธิบาย:</strong> ${q.explanation}<br>
  <strong>คำแปล:</strong> ${q.translation}`;
  explanationEl.classList.remove('hidden');

  nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < todayQuestions.length) showQuestion();
  else showScore();
};

function showScore() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  document.getElementById('score').textContent = `คุณได้ ${score} คะแนน จาก ${todayQuestions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.classList.remove('hidden');
  scoreContainer.classList.add('hidden');
  showQuestion();
}

initQuiz();
