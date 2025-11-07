const questions = [
  {
    question: "She _____ to school every day.",
    choices: ["go", "goes", "going", "gone"],
    answer: "goes",
    explanation: "คำว่า 'She' เป็นประธานเอกพจน์ (บุคคลที่สาม) จึงต้องเติม -s → goes",
    translation: "เธอไปโรงเรียนทุกวัน"
  },
  {
    question: "What is the synonym of 'happy'?",
    choices: ["sad", "angry", "joyful", "bored"],
    answer: "joyful",
    explanation: "'Synonym' หมายถึงคำที่มีความหมายเหมือนกัน 'happy' = 'joyful' (มีความสุข)",
    translation: "joyful = มีความสุข, สนุกสนาน"
  },
  {
    question: "I have lived here _____ five years.",
    choices: ["since", "for", "from", "during"],
    answer: "for",
    explanation: "ใช้ 'for' กับช่วงเวลา (for five years = เป็นเวลา 5 ปี)",
    translation: "ฉันอาศัยอยู่ที่นี่มาเป็นเวลา 5 ปีแล้ว"
  },
  {
    question: "Which word is a noun?",
    choices: ["run", "quickly", "beautiful", "happiness"],
    answer: "happiness",
    explanation: "'Happiness' คือคำนาม (ความสุข) ส่วนคำอื่นเป็นกริยา/คำวิเศษณ์/คำคุณศัพท์",
    translation: "happiness = ความสุข"
  },
  {
    question: "What is the opposite of 'polite'?",
    choices: ["rude", "kind", "friendly", "calm"],
    answer: "rude",
    explanation: "'Opposite' หมายถึงคำตรงข้าม → 'polite' (สุภาพ) ตรงข้ามกับ 'rude' (หยาบคาย)",
    translation: "rude = หยาบคาย, ไม่สุภาพ"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const quizContainer = document.getElementById("quiz-container");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
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

function selectAnswer(selectedBtn, question) {
  const choices = document.querySelectorAll(".choice");
  choices.forEach(btn => (btn.disabled = true));

  if (selectedBtn.textContent === question.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // แสดงเฉลยพร้อมคำแปล
  explanationEl.innerHTML = `
    <strong>เฉลย:</strong> ${question.answer}<br>
    <strong>คำอธิบาย:</strong> ${question.explanation}<br>
    <strong>คำแปล:</strong> ${question.translation}
  `;
  explanationEl.classList.remove("hidden");

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  document.getElementById("score").textContent = `คุณได้ ${score} คะแนน จากทั้งหมด ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  showQuestion();
}

showQuestion();
