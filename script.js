// script.js (updated for vocab-only quiz + mixed difficulty + cumulative rank thresholds)

// ---------- CONFIG ----------
const TOTAL_PER_ROUND = 25; // จำนวนคำต่อรอบ (ปรับได้)
const STORAGE_KEY = 'ev_players'; // localStorage key
// Rank thresholds are based on cumulative totalCorrect
const RANKS = [
  { name: 'Novice', min: 0 },
  { name: 'Beginner', min: 10 },
  { name: 'Intermediate', min: 30 },
  { name: 'Advanced', min: 60 },
  { name: 'Expert', min: 100 } // ต้องมี totalCorrect >= 100 ถึงจะได้ Expert
];

const WORDS = [
  { en: "apple", th: "แอปเปิล; ผลไม้" },
  { en: "book", th: "หนังสือ" },
  { en: "cat", th: "แมว" },
  { en: "dog", th: "สุนัข" },
  { en: "food", th: "อาหาร" },
  { en: "water", th: "น้ำ" },
  { en: "house", th: "บ้าน" },
  { en: "car", th: "รถยนต์" },
  { en: "school", th: "โรงเรียน" },
  { en: "teacher", th: "ครู" },
  { en: "student", th: "นักเรียน" },
  { en: "table", th: "โต๊ะ" },
  { en: "chair", th: "เก้าอี้" },
  { en: "pen", th: "ปากกา" },
  { en: "pencil", th: "ดินสอ" },
  { en: "door", th: "ประตู" },
  { en: "window", th: "หน้าต่าง" },
  { en: "computer", th: "คอมพิวเตอร์" },
  { en: "phone", th: "โทรศัพท์" },
  { en: "music", th: "ดนตรี" },
  { en: "movie", th: "ภาพยนตร์" },
  { en: "city", th: "เมือง" },
  { en: "country", th: "ประเทศ" },
  { en: "job", th: "งาน" },
  { en: "money", th: "เงิน" },
  { en: "family", th: "ครอบครัว" },
  { en: "friend", th: "เพื่อน" },
  { en: "love", th: "ความรัก" },
  { en: "happy", th: "มีความสุข" },
  { en: "sad", th: "เศร้า" },
  { en: "fast", th: "เร็ว" },
  { en: "slow", th: "ช้า" },
  { en: "big", th: "ใหญ่" },
  { en: "small", th: "เล็ก" },
  { en: "close", th: "ปิด" },      
  { en: "open", th: "เปิด" },
  { en: "clean", th: "สะอาด" },
  { en: "dirty", th: "สกปรก" },
  { en: "strong", th: "แข็งแรง" },
  { en: "weak", th: "อ่อนแอ" },
  { en: "hot", th: "ร้อน" },
  { en: "cold", th: "เย็น" },
  { en: "beautiful", th: "สวยงาม" },
  { en: "ugly", th: "น่าเกลียด" },
  { en: "easy", th: "ง่าย" },
  { en: "difficult", th: "ยาก" },
  { en: "morning", th: "เช้า" },
  { en: "evening", th: "เย็น" },
  { en: "night", th: "กลางคืน" },
  { en: "day", th: "วัน" },
  { en: "rain", th: "ฝน" }
  { en: "algorithm", th: "อัลกอริทึม; กระบวนการคำนวณ" },
  { en: "analysis", th: "การวิเคราะห์" },
  { en: "architecture", th: "สถาปัตยกรรม" },
  { en: "biotechnology", th: "เทคโนโลยีชีวภาพ" },
  { en: "chemistry", th: "เคมี" },
  { en: "component", th: "ส่วนประกอบ" },
  { en: "computation", th: "การคำนวณ" },
  { en: "diagnosis", th: "การวินิจฉัย" },
  { en: "ecosystem", th: "ระบบนิเวศ" },
  { en: "efficiency", th: "ประสิทธิภาพ" },
  { en: "experiment", th: "การทดลอง" },
  { en: "hypothesis", th: "สมมติฐาน" },
  { en: "innovation", th: "นวัตกรรม" },
  { en: "infrastructure", th: "โครงสร้างพื้นฐาน" },
  { en: "integration", th: "การรวมเข้าด้วยกัน" },
  { en: "laboratory", th: "ห้องปฏิบัติการ" },
  { en: "mechanism", th: "กลไก" },
  { en: "parameter", th: "พารามิเตอร์" },
  { en: "phenomenon", th: "ปรากฏการณ์" },
  { en: "protocol", th: "โปรโตคอล; ระเบียบการสื่อสาร" },
  { en: "quantitative", th: "เชิงปริมาณ" },
  { en: "qualitative", th: "เชิงคุณภาพ" },
  { en: "radiation", th: "รังสี" },
  { en: "simulation", th: "การจำลอง" },
  { en: "spectrum", th: "สเปกตรัม; ช่วงคลื่น" },
  { en: "specimen", th: "ตัวอย่าง (สำหรับทดลอง)" },
  { en: "statistic", th: "สถิติ" },
  { en: "substance", th: "สาร" },
  { en: "symptom", th: "อาการ" },
  { en: "technology", th: "เทคโนโลยี" },
  { en: "theorem", th: "ทฤษฎีบท" },
  { en: "transmission", th: "การส่งผ่าน" },
  { en: "variable", th: "ตัวแปร" },
  { en: "velocity", th: "ความเร็ว" },
  { en: "voltage", th: "แรงดันไฟฟ้า" },
  { en: "architecture", th: "โครงสร้างระบบ" },
  { en: "database", th: "ฐานข้อมูล" },
  { en: "encryption", th: "การเข้ารหัส" },
  { en: "neuron", th: "เซลล์ประสาท" },
  { en: "diagnostic", th: "การวินิจฉัยโรค" },
  { en: "microscope", th: "กล้องจุลทรรศน์" },
  { en: "molecule", th: "โมเลกุล" },
  { en: "conservation", th: "การอนุรักษ์" },
  { en: "optimization", th: "การทำให้เหมาะสมที่สุด" },
  { en: "criterion", th: "เกณฑ์การประเมิน" },
  { en: "sustainability", th: "ความยั่งยืน" },
  { en: "ecosystem", th: "ระบบนิเวศ" },
  { en: "inference", th: "การอนุมาน" },
  { en: "derivation", th: "การได้มาจาก" },
  { en: "iteration", th: "การวนซ้ำ" }
  { en: "acknowledge", th: "รับทราบ" },
  { en: "allocate", th: "จัดสรร" },
  { en: "amendment", th: "การแก้ไขเพิ่มเติม (กฎหมายหรือเอกสาร)" },
  { en: "applicant", th: "ผู้สมัคร" },
  { en: "authorize", th: "อนุมัติ / ให้อำนาจ" },
  { en: "collaborate", th: "ร่วมมือ" },
  { en: "committee", th: "คณะกรรมการ" },
  { en: "confidential", th: "เป็นความลับ" },
  { en: "consensus", th: "ความเห็นพ้อง" },
  { en: "consultation", th: "การปรึกษา" },
  { en: "contractor", th: "ผู้รับเหมา" },
  { en: "criteria", th: "เกณฑ์" },
  { en: "delegate", th: "มอบหมาย" },
  { en: "document", th: "เอกสาร" },
  { en: "eligible", th: "มีสิทธิ์" },
  { en: "enforce", th: "บังคับใช้" },
  { en: "evaluation", th: "การประเมิน" },
  { en: "executive", th: "ผู้บริหาร" },
  { en: "facilitate", th: "อำนวยความสะดวก" },
  { en: "implement", th: "ดำเนินการ" },
  { en: "inspection", th: "การตรวจสอบ" },
  { en: "instruct", th: "สั่ง / แนะนำ" },
  { en: "legislation", th: "กฎหมาย" },
  { en: "liability", th: "ความรับผิดชอบ" },
  { en: "mandatory", th: "บังคับ" },
  { en: "negotiation", th: "การเจรจา" },
  { en: "objective", th: "เป้าหมาย" },
  { en: "obligation", th: "ข้อผูกพัน" },
  { en: "policy", th: "นโยบาย" },
  { en: "proposal", th: "ข้อเสนอ" },
  { en: "recommendation", th: "คำแนะนำ" },
  { en: "reimbursement", th: "การชำระเงินคืน" },
  { en: "regulation", th: "ระเบียบข้อบังคับ" },
  { en: "representative", th: "ผู้แทน" },
  { en: "requirement", th: "ข้อกำหนด" },
  { en: "resolution", th: "มติ / การแก้ไขปัญหา" },
  { en: "responsibility", th: "ความรับผิดชอบ" },
  { en: "supervisor", th: "หัวหน้างาน" },
  { en: "terminate", th: "สิ้นสุด / ยกเลิก" },
  { en: "transparency", th: "ความโปร่งใส" },
  { en: "validation", th: "การตรวจสอบความถูกต้อง" },
  { en: "violation", th: "การละเมิด" },
  { en: "withdrawal", th: "การถอน / ยกเลิก" },
  { en: "attendance", th: "การเข้าร่วม" },
  { en: "clarification", th: "การชี้แจง" },
  { en: "coordination", th: "การประสานงาน" },
  { en: "funding", th: "การจัดหาเงินทุน" },
  { en: "justification", th: "เหตุผลที่อธิบายสนับสนุน" },
  { en: "partnership", th: "ความร่วมมือ" },
  { en: "submission", th: "การส่งเอกสาร" }
];
// ---------- Utilities ----------
const $ = id => document.getElementById(id);
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }

// load/save players
function loadPlayers(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch(e) { return {}; }
}
function savePlayers(obj){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }

// rank calc by cumulative totalCorrect
function calcRank(totalCorrect){
  // find highest rank whose min <= totalCorrect
  let last = RANKS[0].name;
  for(let i=0;i<RANKS.length;i++){
    if(totalCorrect >= RANKS[i].min) last = RANKS[i].name;
  }
  return last;
}

// difficulty split helper
function splitByDifficulty(words){
  // Assume WORDS length >= 500; map index ranges to difficulty:
  // easy: first 200, medium: next 200, hard: last 100
  const easy = [], medium = [], hard = [];
  const N = words.length;
  const eCut = Math.floor(N * 0.4);   // ~40% easiest
  const mCut = Math.floor(N * 0.8);   // next 40%
  for(let i=0;i<N;i++){
    if(i < eCut) easy.push(words[i]);
    else if(i < mCut) medium.push(words[i]);
    else hard.push(words[i]);
  }
  return { easy, medium, hard };
}

// pick distractor translations (thai) distinct from correct
function pickThaiDistractors(correctEn, count=3){
  const pool = WORDS.filter(w => w.en !== correctEn);
  const picked = shuffle(pool).slice(0, count);
  return picked.map(p => p.th);
}

// generate a vocab-only question (ask "What is 'en'?" with Thai options)
function makeVocabQuestion(wordObj){
  const correctTH = wordObj.th;
  const distractors = pickThaiDistractors(wordObj.en, 3);
  const opts = shuffle([correctTH, ...distractors]);
  return {
    type: 'vocab',
    question: wordObj.en,
    options: opts,
    answer: opts.indexOf(correctTH),
    explanation: `${wordObj.en} แปลว่า ${wordObj.th}` // explanation shown after answer
  };
}

// generate a quiz of `total` questions mixing difficulties
function generateQuiz(total){
  // Ensure WORDS exists and is large enough
  if(!Array.isArray(WORDS) || WORDS.length < 50){
    throw new Error('WORDS array is missing or too small — ต้องมี WORDS (500 คำ) ในสคริปต์ก่อนเรียก generateQuiz');
  }

  const { easy, medium, hard } = splitByDifficulty(WORDS);

  // mix ratios (you can tune these)
  const ratio = { easy: 0.5, medium: 0.35, hard: 0.15 };
  const easyCount = Math.round(total * ratio.easy);
  const mediumCount = Math.round(total * ratio.medium);
  let hardCount = total - easyCount - mediumCount;

  // pick samples
  const pick = (arr, n) => shuffle(arr).slice(0, Math.min(n, arr.length));
  const selected = [...pick(easy, easyCount), ...pick(medium, mediumCount), ...pick(hard, hardCount)];
  // if due to rounding we have less than total, fill from full pool
  if(selected.length < total){
    const needed = total - selected.length;
    const extras = shuffle(WORDS.filter(w => !selected.includes(w))).slice(0, needed);
    selected.push(...extras);
  }
  // convert each to vocab question
  return shuffle(selected).map(w => makeVocabQuestion(w));
}

// ---------- App state & DOM refs ----------
const players = loadPlayers();
let currentPlayer = null;
let questions = [];
let qIndex = 0;
let correct = 0;
let wrongList = [];
let fontSize = 18;

const btnStart = $('btnStart');
const playerNameInput = $('playerName');
const loginSection = $('login');
const gameSection = $('game');
const resultSection = $('result');
const playerDisplay = $('playerDisplay');
const rankDisplay = $('rankDisplay');
const scoreDisplay = $('scoreDisplay');
const qIndexEl = $('qIndex');
const questionText = $('questionText');
const translationHint = $('translationHint');
const choicesEl = $('choices');
const feedbackEl = $('feedback');
const btnNext = $('btnNext');
const btnEnd = $('btnEnd');
const fontInc = $('fontInc');
const fontDec = $('fontDec');
const currentPlayerEl = $('currentPlayer');
const currentRankEl = $('currentRank');
const bestScoreEl = $('bestScore');
const resultSummary = $('resultSummary');
const resultRank = $('resultRank');
const wrongListEl = $('wrongList');
const btnPlayAgain = $('btnPlayAgain');
const btnBackHome = $('btnBackHome');

// update saved UI
function updateSavedUI(){
  currentPlayerEl.textContent = '-';
  currentRankEl.textContent = '-';
  bestScoreEl.textContent = '-';
  const last = localStorage.getItem('ev_last_player');
  if(last && players[last]){
    currentPlayerEl.textContent = last;
    currentRankEl.textContent = players[last].rank || 'Novice';
    bestScoreEl.textContent = (players[last].best===undefined)?'-':players[last].best+'%';
  }
}
updateSavedUI();

// ---------- UI & Flow ----------
btnStart.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if(!name){ alert('กรุณาใส่ชื่อผู้เล่น'); return; }
  currentPlayer = name;
  localStorage.setItem('ev_last_player', name);
  if(!players[name]) players[name] = { best: 0, played: 0, rank: 'Novice', totalCorrect: 0 };
  savePlayers(players);
  startRound();
  updateSavedUI();
});

function startRound(){
  // reset round state
  questions = generateQuiz(TOTAL_PER_ROUND);
  qIndex = 0; correct = 0; wrongList = [];
  playerDisplay.textContent = currentPlayer;
  // show UI
  gameSection.classList.remove('hidden');
  loginSection.classList.add('hidden');
  $('scoreDisplay').textContent = '0';
  $('totalQ').textContent = TOTAL_PER_ROUND;
  renderQuestion();
}

function renderQuestion(){
  const q = questions[qIndex];
  qIndexEl.textContent = `${qIndex+1} / ${questions.length}`;
  questionText.textContent = `What is "${q.question}"?`;
  translationHint.textContent = 'เลือกคำแปลภาษาไทยที่ถูกต้อง';
  choicesEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const b = document.createElement('button');
    b.className = 'choiceBtn';
    b.textContent = opt;
    b.style.fontSize = fontSize + 'px';
    b.onclick = () => handleChoice(b, idx);
    choicesEl.appendChild(b);
  });
  feedbackEl.textContent = '';
  btnNext.classList.add('hidden');
}

function handleChoice(btn, idx){
  const q = questions[qIndex];
  // disable all choices
  Array.from(choicesEl.children).forEach(c => c.disabled = true);
  if(idx === q.answer){
    btn.classList.add('correct');
    correct++;
    feedbackEl.textContent = 'ถูกต้อง! ' + (q.explanation || '');
  } else {
    btn.classList.add('wrong');
    feedbackEl.textContent = `ผิด — คำตอบที่ถูกคือ: ${q.options[q.answer]} — ${q.explanation || ''}`;
    // highlight correct
    Array.from(choicesEl.children)[q.answer].classList.add('correct');
    wrongList.push({ q: q.question, your: q.options[idx], correct: q.options[q.answer] });
  }
  scoreDisplay.textContent = correct;
  btnNext.classList.remove('hidden');
}

btnNext.addEventListener('click', () => {
  qIndex++;
  if(qIndex < questions.length) renderQuestion();
  else finishRound();
});

btnEnd.addEventListener('click', () => {
  if(confirm('ต้องการจบเกมก่อนหรือไม่?')) finishRound();
});

function finishRound(){
  // round pct
  const pct = Math.round((correct / questions.length) * 100);
  // update player cumulative stats
  players[currentPlayer] = players[currentPlayer] || { best:0,played:0,rank:'Novice', totalCorrect:0 };
  players[currentPlayer].played = (players[currentPlayer].played||0) + 1;
  players[currentPlayer].totalCorrect = (players[currentPlayer].totalCorrect||0) + correct; // cumulative
  // update best pct for this round if higher
  if(pct > (players[currentPlayer].best||0)) players[currentPlayer].best = pct;
  // update rank by cumulative totalCorrect (Expert needs >=100)
  players[currentPlayer].rank = calcRank(players[currentPlayer].totalCorrect);
  savePlayers(players);

  // show results
  gameSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  resultSummary.textContent = `${currentPlayer}, คุณได้ ${correct} / ${questions.length} (${pct}%). (สะสมถูกทั้งหมด ${players[currentPlayer].totalCorrect})`;
  resultRank.textContent = players[currentPlayer].rank;

  wrongListEl.innerHTML = '';
  if(wrongList.length === 0){
    wrongListEl.innerHTML = '<li>ไม่มีคำตอบผิด — เยี่ยมมาก!</li>';
  } else {
    wrongList.forEach(w => {
      const li = document.createElement('li');
      li.textContent = `${w.q} — ถูก: ${w.correct} / คุณตอบ: ${w.your}`;
      wrongListEl.appendChild(li);
    });
  }
  updateSavedUI();
}

$('btnPlayAgain').addEventListener('click', () => {
  resultSection.classList.add('hidden');
  startRound();
});

$('btnBackHome').addEventListener('click', () => {
  resultSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  localStorage.setItem('ev_last_player', currentPlayer);
  updateSavedUI();
});

// font controls
fontInc.addEventListener('click', () => {
  fontSize = Math.min(30, fontSize + 2);
  document.querySelectorAll('.choiceBtn').forEach(b => b.style.fontSize = fontSize + 'px');
  questionText.style.fontSize = (fontSize+2) + 'px';
});
fontDec.addEventListener('click', () => {
  fontSize = Math.max(12, fontSize - 2);
  document.querySelectorAll('.choiceBtn').forEach(b => b.style.fontSize = fontSize + 'px');
  questionText.style.fontSize = (fontSize+2) + 'px';
});

// init expose
window.$ = $;
