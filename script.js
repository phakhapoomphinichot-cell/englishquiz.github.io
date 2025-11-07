// โหลดคำถามจากไฟล์ questions.json (เราเก็บเป็นตัวแปรภายในเพื่อให้ไฟล์ทำงานออฟไลน์ได้)
// ระบบ: วันละ 10 ข้อ, จำคำถามของวันใน localStorage

const TOTAL_PER_DAY = 10;
const QUESTIONS = window.ALL_QUESTIONS || []; // ถูกเติมด้านล่าง (จาก questions.json)

// Utilities
const $ = (id) => document.getElementById(id);

// Elements
const startBtn = $('start-btn');
const startScreen = $('start-screen');
const quizEl = $('quiz');
const questionEl = $('question');
const choicesEl = $('choices');
const explanationEl = $('explanation');
const nextBtn = $('next-btn');
const progressEl = $('current');
const resultEl = $('result');
const scoreText = $('score-text');
const resultDetail = $('result-detail');
const restartBtn = $('restart-btn');

let todaysSet = []; // 10 questions for today
let currentIndex = 0;
let score = 0;

function formatDate(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function pickTodaysQuestions(allQuestions){
  // Strategy: pick 4 easy, 4 medium, 2 hard (or as available), randomizing selection
  const byLevel = { easy:[], medium:[], hard:[] };
  allQuestions.forEach(q => byLevel[q.level]?.push(q));

  function sample(arr,n){
    const copy = arr.slice();
    const out = [];
    for(let i=0;i<n && copy.length;i++){
      const idx = Math.floor(Math.random()*copy.length);
      out.push(copy.splice(idx,1)[0]);
    }
    return out;
  }

  const need = { easy:4, medium:4, hard:2 };
  let selected = [];
  selected = selected.concat(sample(byLevel.easy, need.easy));
  selected = selected.concat(sample(byLevel.medium, need.medium));
  selected = selected.concat(sample(byLevel.hard, need.hard));

  // if shortage somewhere, fill from other levels
  while(selected.length < TOTAL_PER_DAY){
    const pool = allQuestions.slice().filter(q=>!selected.includes(q));
    if(!pool.length) break;
    selected.push(pool[Math.floor(Math.random()*pool.length)]);
  }

  // shuffle final
  for(let i=selected.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
}

function saveToday(dateStr, set){
  localStorage.setItem('lastQuizDate', dateStr);
  localStorage.setItem('lastQuizSet', JSON.stringify(set));
}

function loadToday(){
  const dateStr = localStorage.getItem('lastQuizDate');
  const set = JSON.parse(localStorage.getItem('lastQuizSet') || 'null');
  return {dateStr, set};
}

function startQuiz(){
  const today = formatDate(new Date());
  const saved = loadToday();
  if(saved.dateStr === today && Array.isArray(saved.set) && saved.set.length===TOTAL_PER_DAY){
    todaysSet = saved.set;
  } else {
    todaysSet = pickTodaysQuestions(QUESTIONS);
    saveToday(today, todaysSet);
  }

  startScreen.classList.add('hidden');
  quizEl.classList.remove('hidden');
  currentIndex = 0; score = 0;
  renderQuestion();
}

function renderQuestion(){
  const q = todaysSet[currentIndex];
  progressEl.textContent = currentIndex+1;
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';
  explanationEl.classList.add('hidden');
  nextBtn.classList.add('hidden');

  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(btn, q);
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(btn, q){
  const all = choicesEl.querySelectorAll('.choice-btn');
  all.forEach(b=>{b.classList.add('disabled'); b.disabled = true});

  if(btn.textContent === q.answer){
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    // highlight correct
    all.forEach(b=>{ if(b.textContent===q.answer) b.classList.add('correct') });
  }

  // show explanation
  explanationEl.innerHTML = `<strong>เฉลย:</strong> ${q.answer}<br><strong>คำอธิบาย:</strong> ${q.explanation}<br><strong>คำแปล:</strong> ${q.translation}`;
  explanationEl.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', ()=>{
  currentIndex++;
  if(currentIndex < TOTAL_PER_DAY){
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz(){
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  scoreText.textContent = `คุณได้ ${score} / ${TOTAL_PER_DAY} คะแนน`;

  // รายละเอียด: แสดงสรุปคำตอบ (optionally keep minimal)
  let html = '<ol>';
  todaysSet.forEach((q,i)=>{
    html += `<li><strong>${q.question}</strong><br>เฉลย: ${q.answer} — ${q.translation}</li>`;
  });
  html += '</ol>';
  resultDetail.innerHTML = html;
}

restartBtn.addEventListener('click', ()=>{
  // clear saved set so user can get a new set (for testing)
  localStorage.removeItem('lastQuizDate');
  localStorage.removeItem('lastQuizSet');
  location.reload();
});

// start button
startBtn.addEventListener('click', startQuiz);

// initial: if QUESTIONS is empty, we abort
if(!QUESTIONS.length){
  // We'll inject questions by including them below before this script executes.
  console.error('No questions loaded. Make sure questions JSON is included as ALL_QUESTIONS variable.');
}
