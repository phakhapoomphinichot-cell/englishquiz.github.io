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
  {en:"apple", th:"แอปเปิล"},
  {en:"book", th:"หนังสือ"},
  {en:"cat", th:"แมว"},
  {en:"dog", th:"สุนัข"},
  {en:"food", th:"อาหาร"},
  {en:"water", th:"น้ำ"},
  {en:"house", th:"บ้าน"},
  {en:"car", th:"รถยนต์"},
  {en:"school", th:"โรงเรียน"},
  {en:"teacher", th:"ครู"},
  {en:"student", th:"นักเรียน"},
  {en:"table", th:"โต๊ะ"},
  {en:"chair", th:"เก้าอี้"},
  {en:"pen", th:"ปากกา"},
  {en:"pencil", th:"ดินสอ"},
  {en:"banana", th:"กล้วย"},
  {en:"orange", th:"ส้ม"},
  {en:"grape", th:"องุ่น"},
  {en:"milk", th:"นม"},
  {en:"juice", th:"น้ำผลไม้"},
  {en:"coffee", th:"กาแฟ"},
  {en:"tea", th:"ชา"},
  {en:"bread", th:"ขนมปัง"},
  {en:"rice", th:"ข้าว"},
  {en:"egg", th:"ไข่"},
  {en:"chicken", th:"ไก่"},
  {en:"beef", th:"เนื้อวัว"},
  {en:"pork", th:"หมู"},
  {en:"fish", th:"ปลา"},
  {en:"carrot", th:"แครอท"},
  {en:"tomato", th:"มะเขือเทศ"},
  {en:"potato", th:"มันฝรั่ง"},
  {en:"lettuce", th:"ผักกาด"},
  {en:"sun", th:"ดวงอาทิตย์"},
  {en:"moon", th:"ดวงจันทร์"},
  {en:"star", th:"ดาว"},
  {en:"cloud", th:"เมฆ"},
  {en:"rain", th:"ฝน"},
  {en:"snow", th:"หิมะ"},
  {en:"wind", th:"ลม"},
  {en:"sunshine", th:"แดด"},
  {en:"red", th:"แดง"},
  {en:"blue", th:"น้ำเงิน"},
  {en:"green", th:"เขียว"},
  {en:"yellow", th:"เหลือง"},
  {en:"black", th:"ดำ"},
  {en:"white", th:"ขาว"},
  {en:"hot", th:"ร้อน"},
  {en:"cold", th:"หนาว"},
  {en:"big", th:"ใหญ่"},
  {en:"small", th:"เล็ก"},
  {en:"long", th:"ยาว"},
  {en:"short", th:"สั้น"},
  {en:"happy", th:"มีความสุข"},
  {en:"sad", th:"เศร้า"},
  {en:"angry", th:"โกรธ"},
  {en:"afraid", th:"กลัว"},
  {en:"monday", th:"วันจันทร์"},
  {en:"tuesday", th:"วันอังคาร"},
  {en:"wednesday", th:"วันพุธ"},
  {en:"thursday", th:"วันพฤหัส"},
  {en:"friday", th:"วันศุกร์"},
  {en:"saturday", th:"วันเสาร์"},
  {en:"sunday", th:"วันอาทิตย์"},
  {en:"friend", th:"เพื่อน"},
  {en:"family", th:"ครอบครัว"},
  {en:"father", th:"พ่อ"},
  {en:"mother", th:"แม่"},
  {en:"brother", th:"พี่ชาย/น้องชาย"},
  {en:"sister", th:"พี่สาว/น้องสาว"},
  {en:"baby", th:"เด็กทารก"},
  {en:"man", th:"ผู้ชาย"},
  {en:"woman", th:"ผู้หญิง"},
  {en:"child", th:"เด็ก"},
  {en:"doctor", th:"แพทย์"},
  {en:"nurse", th:"พยาบาล"},
  {en:"police", th:"ตำรวจ"},
  {en:"firefighter", th:"นักผจญเพลิง"},
  {en:"shop", th:"ร้านค้า"},
  {en:"market", th:"ตลาด"},
  {en:"supermarket", th:"ซูเปอร์มาร์เก็ต"},
  {en:"hospital", th:"โรงพยาบาล"},
  {en:"bank", th:"ธนาคาร"},
  {en:"post office", th:"ที่ทำการไปรษณีย์"},
  {en:"library", th:"ห้องสมุด"},
  {en:"park", th:"สวนสาธารณะ"},
  {en:"bus", th:"รถประจำทาง"},
  {en:"train", th:"รถไฟ"},
  {en:"plane", th:"เครื่องบิน"},
  {en:"boat", th:"เรือ"},
  {en:"bicycle", th:"จักรยาน"},
  {en:"motorbike", th:"มอเตอร์ไซค์"},
  {en:"road", th:"ถนน"},
  {en:"street", th:"ถนน"},
  {en:"bridge", th:"สะพาน"},
  {en:"river", th:"แม่น้ำ"},
  {en:"mountain", th:"ภูเขา"},
  {en:"sea", th:"ทะเล"},
  {en:"lake", th:"ทะเลสาบ"},
  {en:"tree", th:"ต้นไม้"},
  {en:"flower", th:"ดอกไม้"},
  {en:"grass", th:"หญ้า"},
  {en:"leaf", th:"ใบไม้"},
  {en:"sky", th:"ท้องฟ้า"},
  {en:"earth", th:"โลก"},
  {en:"storm", th:"พายุ"},
  {en:"ice", th:"น้ำแข็ง"},
  {en:"fruit", th:"ผลไม้"},
  {en:"vegetable", th:"ผัก"},
  {en:"meat", th:"เนื้อสัตว์"},
  {en:"noodle", th:"ก๋วยเตี๋ยว"},
  {en:"soup", th:"ซุป"},
  {en:"cake", th:"เค้ก"},
  {en:"cookie", th:"คุกกี้"},
  {en:"chocolate", th:"ช็อกโกแลต"},
  {en:"ice cream", th:"ไอศกรีม"},
  {en:"drink", th:"เครื่องดื่ม"},
  {en:"shirt", th:"เสื้อ"},
  {en:"pants", th:"กางเกง"},
  {en:"skirt", th:"กระโปรง"},
  {en:"dress", th:"ชุดเดรส"},
  {en:"shoe", th:"รองเท้า"},
  {en:"sock", th:"ถุงเท้า"},
  {en:"hat", th:"หมวก"},
  {en:"glove", th:"ถุงมือ"},
  {en:"bag", th:"กระเป๋า"},
  {en:"wallet", th:"กระเป๋าสตางค์"},
  {en:"belt", th:"เข็มขัด"},
  {en:"watch", th:"นาฬิกา"},
  {en:"ring", th:"แหวน"},
  {en:"necklace", th:"สร้อยคอ"},
  {en:"earring", th:"ต่างหู"},
  {en:"phone", th:"โทรศัพท์"},
  {en:"computer", th:"คอมพิวเตอร์"},
  {en:"laptop", th:"แล็ปท็อป"},
  {en:"tablet", th:"แท็บเล็ต"},
  {en:"camera", th:"กล้อง"},
  {en:"television", th:"โทรทัศน์"},
  {en:"radio", th:"วิทยุ"},
  {en:"music", th:"ดนตรี"},
  {en:"song", th:"เพลง"},
  {en:"movie", th:"ภาพยนตร์"},
  {en:"game", th:"เกม"},
  {en:"sport", th:"กีฬา"},
  {en:"football", th:"ฟุตบอล"},
  {en:"basketball", th:"บาสเกตบอล"},
  {en:"tennis", th:"เทนนิส"},
  {en:"swim", th:"ว่ายน้ำ"},
  {en:"run", th:"วิ่ง"},
  {en:"walk", th:"เดิน"},
  {en:"jump", th:"กระโดด"},
  {en:"dance", th:"เต้นรำ"},
  {en:"sing", th:"ร้องเพลง"},
  {en:"read", th:"อ่าน"},
  {en:"write", th:"เขียน"},
  {en:"listen", th:"ฟัง"},
  {en:"speak", th:"พูด"},
  {en:"sleep", th:"นอน"},
  {en:"wake", th:"ตื่น"},
  {en:"sit", th:"นั่ง"},
  {en:"stand", th:"ยืน"},
  {en:"open", th:"เปิด"},
  {en:"close", th:"ปิด"},
  {en:"buy", th:"ซื้อ"},
  {en:"sell", th:"ขาย"},
  {en:"pay", th:"จ่าย"},
  {en:"eat", th:"กิน"},
  {en:"cook", th:"ทำอาหาร"},
  {en:"clean", th:"ทำความสะอาด"},
  {en:"wash", th:"ล้าง"},
  {en:"cut", th:"ตัด"},
  {en:"build", th:"สร้าง"},
  {en:"draw", th:"วาด"},
  {en:"paint", th:"ระบายสี"},
  {en:"drive", th:"ขับรถ"},
  {en:"fly", th:"บิน"},
  {en:"ride", th:"ขี่"},
  {en:"climb", th:"ปีน"},
  {en:"move", th:"ย้าย"},
  {en:"stop", th:"หยุด"},
  {en:"go", th:"ไป"},
  {en:"come", th:"มา"},
  {en:"bring", th:"นำมา"},
  {en:"take", th:"เอาไป"},
  {en:"give", th:"ให้"},
  {en:"want", th:"ต้องการ"},
  {en:"need", th:"จำเป็นต้องมี"},
  {en:"like", th:"ชอบ"},
  {en:"love", th:"รัก"},
  {en:"hate", th:"เกลียด"},
  {en:"think", th:"คิด"},
  {en:"know", th:"รู้"},
  {en:"understand", th:"เข้าใจ"},
  {en:"remember", th:"จำ"},
  {en:"forget", th:"ลืม"},
  {en:"help", th:"ช่วย"},
  {en:"ask", th:"ถาม"},
  {en:"answer", th:"ตอบ"},
  {en:"call", th:"โทร"},
  {en:"send", th:"ส่ง"},
  {en:"receive", th:"รับ"},
  {en:"wait", th:"รอ"},
  {en:"start", th:"เริ่ม"},
  {en:"finish", th:"จบ"},
  {en:"play", th:"เล่น"},
  {en:"work", th:"ทำงาน"},
  {en:"study", th:"ศึกษา"},
  {en:"teach", th:"สอน"},
  {en:"watch", th:"ดู"},
  {en:"look", th:"มอง"},
  {en:"see", th:"เห็น"},
  {en:"hear", th:"ได้ยิน"},
  {en:"smell", th:"ได้กลิ่น"},
  {en:"touch", th:"สัมผัส"},
  {en:"taste", th:"ชิม"},
  {en:"feel", th:"รู้สึก"},
  {en:"grow", th:"เติบโต"},
  {en:"change", th:"เปลี่ยน"},
  {en:"open", th:"เปิด"},
  {en:"close", th:"ปิด"}
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
