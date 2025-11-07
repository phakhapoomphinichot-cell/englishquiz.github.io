// script.js (updated for vocab-only quiz + mixed difficulty + cumulative rank thresholds)

// ---------- CONFIG ----------
const TOTAL_PER_ROUND = 20; // จำนวนคำต่อรอบ (ปรับได้)
const STORAGE_KEY = 'ev_players'; // localStorage key
// Rank thresholds are based on cumulative totalCorrect
const RANKS = [
  { name: 'Novice', min: 0 },
  { name: 'Beginner', min: 10 },
  { name: 'Intermediate', min: 30 },
  { name: 'Advanced', min: 60 },
  { name: 'Expert', min: 100 } 
];
const WORDS = [
{en:"apple", th:"แอปเปิล; ผลไม้"},
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
  {en:"phone", th:"โทรศัพท์"},
  {en:"computer", th:"คอมพิวเตอร์"},
  {en:"friend", th:"เพื่อน"},
  {en:"family", th:"ครอบครัว"},
  {en:"baby", th:"ทารก"},
  {en:"mother", th:"แม่"},
  {en:"father", th:"พ่อ"},
  {en:"bread", th:"ขนมปัง"},
  {en:"rice", th:"ข้าว"},
  {en:"egg", th:"ไข่"},
  {en:"milk", th:"นม"},
  {en:"sleep", th:"หลับ"},
  {en:"walk", th:"เดิน"},
  {en:"run", th:"วิ่ง"},
  {en:"eat", th:"กิน"},
  {en:"drink", th:"ดื่ม"},
  {en:"sit", th:"นั่ง"},
  {en:"stand", th:"ยืน"},
  {en:"love", th:"รัก"},
  {en:"happy", th:"มีความสุข"},
  {en:"sad", th:"เศร้า"},
  {en:"hot", th:"ร้อน"},
  {en:"cold", th:"หนาว"},
  {en:"day", th:"วัน"},
  {en:"night", th:"กลางคืน"},
  {en:"sun", th:"พระอาทิตย์"},
  {en:"moon", th:"พระจันทร์"},
  {en:"city", th:"เมือง"},
  {en:"country", th:"ประเทศ"},
  {en:"shop", th:"ร้านค้า"},
  {en:"market", th:"ตลาด"},
  {en:"work", th:"ทำงาน"},
  {en:"play", th:"เล่น"},

  // 51-150 (common everyday)
  {en:"window", th:"หน้าต่าง"},
  {en:"door", th:"ประตู"},
  {en:"floor", th:"พื้น"},
  {en:"ceiling", th:"เพดาน"},
  {en:"kitchen", th:"ห้องครัว"},
  {en:"garden", th:"สวน"},
  {en:"park", th:"สวนสาธารณะ"},
  {en:"bus", th:"รถเมล์"},
  {en:"train", th:"รถไฟ"},
  {en:"plane", th:"เครื่องบิน"},
  {en:"ticket", th:"ตั๋ว"},
  {en:"money", th:"เงิน"},
  {en:"shopper", th:"ผู้ซื้อ"},
  {en:"doctor", th:"แพทย์"},
  {en:"hospital", th:"โรงพยาบาล"},
  {en:"medicine", th:"ยา"},
  {en:"bank", th:"ธนาคาร"},
  {en:"library", th:"ห้องสมุด"},
  {en:"movie", th:"ภาพยนตร์"},
  {en:"music", th:"เพลง"},
  {en:"song", th:"เพลง"},
  {en:"dance", th:"เต้น"},
  {en:"sport", th:"กีฬา"},
  {en:"football", th:"ฟุตบอล"},
  {en:"basketball", th:"บาสเกตบอล"},
  {en:"swim", th:"ว่ายน้ำ"},
  {en:"walkway", th:"ทางเดิน"},
  {en:"road", th:"ถนน"},
  {en:"bridge", th:"สะพาน"},
  {en:"river", th:"แม่น้ำ"},
  {en:"sea", th:"ทะเล"},
  {en:"mountain", th:"ภูเขา"},
  {en:"island", th:"เกาะ"},
  {en:"weather", th:"สภาพอากาศ"},
  {en:"rain", th:"ฝน"},
  {en:"storm", th:"พายุ"},
  {en:"cloud", th:"เมฆ"},
  {en:"wind", th:"ลม"},
  {en:"temperature", th:"อุณหภูมิ"},
  {en:"clock", th:"นาฬิกา"},
  {en:"time", th:"เวลา"},
  {en:"minute", th:"นาที"},
  {en:"hour", th:"ชั่วโมง"},
  {en:"week", th:"สัปดาห์"},
  {en:"month", th:"เดือน"},
  {en:"year", th:"ปี"},
  {en:"holiday", th:"วันหยุด"},
  {en:"festival", th:"เทศกาล"},
  {en:"party", th:"งานเลี้ยง"},
  {en:"gift", th:"ของขวัญ"},
  {en:"present", th:"ของขวัญ"},
  {en:"holiday", th:"วันหยุด (ซ้ำได้เป็นคำอธิบาย)"},
  {en:"ticket", th:"ตั๋ว (ซ้ำ)"},
  {en:"camera", th:"กล้อง"},
  {en:"photo", th:"ภาพถ่าย"},
  {en:"picture", th:"ภาพ"},
  {en:"idea", th:"ความคิด"},
  {en:"problem", th:"ปัญหา"},
  {en:"solution", th:"ทางแก้"},
  {en:"question", th:"คำถาม"},
  {en:"answer", th:"คำตอบ"},
  {en:"information", th:"ข้อมูล"},
  {en:"news", th:"ข่าว"},
  {en:"email", th:"อีเมล"},
  {en:"message", th:"ข้อความ"},
  {en:"letter", th:"จดหมาย"},
  {en:"note", th:"บันทึก"},
  {en:"map", th:"แผนที่"},
  {en:"direction", th:"ทิศทาง"},
  {en:"distance", th:"ระยะทาง"},
  {en:"speed", th:"ความเร็ว"},
  {en:"weight", th:"น้ำหนัก"},
  {en:"size", th:"ขนาด"},
  {en:"height", th:"ความสูง"},
  {en:"width", th:"ความกว้าง"},
  {en:"depth", th:"ความลึก"},
  {en:"color", th:"สี"},
  {en:"shape", th:"รูปร่าง"},
  {en:"texture", th:"พื้นผิว"},
  {en:"material", th:"วัสดุ"},

  // 151-300 (less basic; verbs/nouns/adjectives)
  {en:"accept", th:"ยอมรับ"},
  {en:"achieve", th:"ประสบความสำเร็จ"},
  {en:"act", th:"กระทำ"},
  {en:"add", th:"เพิ่ม"},
  {en:"allow", th:"อนุญาต"},
  {en:"apply", th:"สมัคร / ประยุกต์"},
  {en:"arrive", th:"มาถึง"},
  {en:"ask", th:"ถาม"},
  {en:"believe", th:"เชื่อ"},
  {en:"build", th:"สร้าง"},
  {en:"buy", th:"ซื้อ"},
  {en:"call", th:"โทร / เรียก"},
  {en:"change", th:"เปลี่ยน"},
  {en:"choose", th:"เลือก"},
  {en:"clean", th:"ทำความสะอาด"},
  {en:"close", th:"ปิด"},
  {en:"compare", th:"เปรียบเทียบ"},
  {en:"continue", th:"ต่อเนื่อง"},
  {en:"create", th:"สร้าง"},
  {en:"decide", th:"ตัดสินใจ"},
  {en:"discover", th:"ค้นพบ"},
  {en:"drive", th:"ขับรถ"},
  {en:"enjoy", th:"เพลิดเพลิน"},
  {en:"explain", th:"อธิบาย"},
  {en:"extend", th:"ขยาย"},
  {en:"fix", th:"ซ่อม"},
  {en:"follow", th:"ตาม"},
  {en:"forget", th:"ลืม"},
  {en:"help", th:"ช่วย"},
  {en:"hold", th:"ถือไว้"},
  {en:"include", th:"รวมถึง"},
  {en:"intend", th:"ตั้งใจ"},
  {en:"learn", th:"เรียนรู้"},
  {en:"listen", th:"ฟัง"},
  {en:"lose", th:"เสีย / สูญเสีย"},
  {en:"manage", th:"จัดการ"},
  {en:"move", th:"ย้าย"},
  {en:"open", th:"เปิด"},
  {en:"offer", th:"เสนอ"},
  {en:"organize", th:"จัดระเบียบ"},
  {en:"pay", th:"จ่าย"},
  {en:"perform", th:"แสดง / ปฏิบัติ"},
  {en:"produce", th:"ผลิต"},
  {en:"protect", th:"ปกป้อง"},
  {en:"provide", th:"ให้"},
  {en:"reach", th:"เข้าถึง"},
  {en:"receive", th:"ได้รับ"},
  {en:"reflect", th:"สะท้อน"},
  {en:"remain", th:"ยังคงอยู่"},
  {en:"require", th:"ต้องการ"},
  {en:"respond", th:"ตอบ"},
  {en:"result", th:"ผลลัพธ์"},
  {en:"search", th:"ค้นหา"},
  {en:"sell", th:"ขาย"},
  {en:"share", th:"แบ่งปัน"},
  {en:"support", th:"สนับสนุน"},
  {en:"suggest", th:"แนะนำ"},
  {en:"teach", th:"สอน"},
  {en:"travel", th:"เดินทาง"},
  {en:"understand", th:"เข้าใจ"},
  {en:"visit", th:"เยี่ยมชม"},
  {en:"win", th:"ชนะ"},
  {en:"wish", th:"ปรารถนา"},
  {en:"write", th:"เขียน"},
  {en:"career", th:"อาชีพ"},
  {en:"business", th:"ธุรกิจ"},
  {en:"company", th:"บริษัท"},
  {en:"project", th:"โครงการ"},
  {en:"industry", th:"อุตสาหกรรม"},
  {en:"market", th:"ตลาด (ซ้ำได้)"},
  {en:"customer", th:"ลูกค้า"},
  {en:"service", th:"บริการ"},
  {en:"price", th:"ราคา"},
  {en:"cost", th:"ต้นทุน"},
  {en:"profit", th:"กำไร"},
  {en:"loss", th:"ขาดทุน"},
  {en:"policy", th:"นโยบาย"},
  {en:"strategy", th:"ยุทธศาสตร์"},
  {en:"budget", th:"งบประมาณ"},
  {en:"resource", th:"ทรัพยากร"},
  {en:"skill", th:"ทักษะ"},
  {en:"quality", th:"คุณภาพ"},
  {en:"option", th:"ตัวเลือก"},
  {en:"feature", th:"คุณสมบัติ"},
  {en:"function", th:"ฟังก์ชัน"},

  // 301-400 (more advanced / academic / abstract)
  {en:"abstract", th:"นามธรรม"},
  {en:"analysis", th:"การวิเคราะห์"},
  {en:"approach", th:"แนวทาง"},
  {en:"area", th:"พื้นที่ / บริเวณ"},
  {en:"aspect", th:"ด้าน"},
  {en:"assume", th:"สันนิษฐาน"},
  {en:"authority", th:"อำนาจ"},
  {en:"available", th:"มีให้"},
  {en:"capacity", th:"ความสามารถ / ความจุ"},
  {en:"challenge", th:"ความท้าทาย"},
  {en:"circumstance", th:"สถานการณ์"},
  {en:"component", th:"ส่วนประกอบ"},
  {en:"consequence", th:"ผลที่ตามมา"},
  {en:"construct", th:"ก่อสร้าง / สร้างขึ้น"},
  {en:"context", th:"บริบท"},
  {en:"contract", th:"สัญญา"},
  {en:"create", th:"สร้าง (ซ้ำ)"},
  {en:"data", th:"ข้อมูล"},
  {en:"definition", th:"คำนิยาม"},
  {en:"design", th:"การออกแบบ"},
  {en:"distribution", th:"การกระจาย"},
  {en:"economy", th:"เศรษฐกิจ"},
  {en:"environment", th:"สิ่งแวดล้อม"},
  {en:"establish", th:"สถาปนา / ก่อตั้ง"},
  {en:"evaluate", th:"ประเมิน"},
  {en:"evidence", th:"หลักฐาน"},
  {en:"factor", th:"ปัจจัย"},
  {en:"interpret", th:"ตีความ"},
  {en:"issue", th:"ประเด็น"},
  {en:"method", th:"วิธีการ"},
  {en:"process", th:"กระบวนการ"},
  {en:"range", th:"ช่วง"},
  {en:"role", th:"บทบาท"},
  {en:"sector", th:"ภาคส่วน"},
  {en:"significant", th:"สำคัญ"},
  {en:"source", th:"แหล่ง"},
  {en:"structure", th:"โครงสร้าง"},
  {en:"theory", th:"ทฤษฎี"},
  {en:"variable", th:"ตัวแปร"},
  {en:"volume", th:"ปริมาณ"},
  {en:"version", th:"เวอร์ชัน"},
  {en:"via", th:"ผ่านทาง"},
  {en:"welfare", th:"สวัสดิการ"},
  {en:"whereas", th:"ในขณะที่"},
  {en:"wherever", th:"ทุกที่ที่"},
  {en:"whether", th:"หรือไม่"},
  {en:"where", th:"ที่ไหน"},
  {en:"whenever", th:"เมื่อไรก็ตาม"},
  {en:"whom", th:"ใคร (กรรม)"},
  {en:"whose", th:"ของใคร"},

  // 401-500 (challenging / advanced vocabulary)
  {en:"abundant", th:"อุดมสมบูรณ์"},
  {en:"benevolent", th:"มีเมตตา"},
  {en:"coherent", th:"สอดคล้อง"},
  {en:"detrimental", th:"เป็นอันตราย"},
  {en:"elaborate", th:"ซับซ้อน/อธิบายละเอียด"},
  {en:"feasible", th:"เป็นไปได้"},
  {en:"gregarious", th:"ชอบเข้าสังคม"},
  {en:"heterogeneous", th:"หลากหลาย"},
  {en:"imperative", th:"สำคัญเร่งด่วน"},
  {en:"juxtapose", th:"วางชิดกันเพื่อเปรียบเทียบ"},
  {en:"kinetic", th:"เกี่ยวกับการเคลื่อนไหว"},
  {en:"lucrative", th:"มีกำไร"},
  {en:"meticulous", th:"พิถีพิถัน"},
  {en:"nuance", th:"นัย / ความแตกต่างเล็กน้อย"},
  {en:"obsolete", th:"ล้าสมัย"},
  {en:"plausible", th:"มีความเป็นไปได้"},
  {en:"quintessential", th:"เป็นแบบฉบับที่สำคัญ"},
  {en:"resilient", th:"ยืดหยุ่น, ให้ฟื้นตัวได้ง่าย"},
  {en:"substantiate", th:"พิสูจน์ให้เป็นจริง"},
  {en:"tenacious", th:"แน่วแน่"},
  {en:"ubiquitous", th:"แพร่หลาย"},
  {en:"validate", th:"ตรวจสอบความถูกต้อง"},
  {en:"whimsical", th:"แปลกประหลาด, ชอบเล่นสนุก"},
  {en:"xenophobia", th:"ความกลัวคนต่างชาติ"},
  {en:"yielding", th:"ยอม / ให้ผล"},
  {en:"zealous", th:"กระตือรือร้น"},
  {en:"ambiguous", th:"กำกวม"},
  {en:"bolster", th:"สนับสนุน"},
  {en:"concur", th:"เห็นด้วย"},
  {en:"deleterious", th:"เป็นอันตราย"},
  {en:"exacerbate", th:"ทำให้แย่ลง"},
  {en:"facilitate", th:"อำนวยความสะดวก"},
  {en:"galvanize", th:"กระตุ้น"},
  {en:"harbinger", th:"คำบอกเหตุ / สิ่งบ่งชี้"},
  {en:"impeccable", th:"ไม่มีที่ติ"},
  {en:"jubilant", th:"ชื่นชมยินดี"},
  {en:"kudos", th:"คำชมเชย"},
  {en:"lament", th:"คร่ำครวญ"},
  {en:"malleable", th:"ดัดแปลงได้"},
  {en:"negligible", th:"เล็กน้อยจนมองข้ามได้"},
  {en:"ostentatious", th:"โอ้อวด"},
  {en:"pragmatic", th:"เชิงปฏิบัติ"},
  {en:"quantify", th:"วัดเชิงปริมาณ"},
  {en:"ramification", th:"ผลที่ตามมา"},
  {en:"salient", th:"โดดเด่น"},
  {en:"tantamount", th:"เท่ากับ"},
  {en:"validate", th:"ตรวจสอบ (ซ้ำ)"},
  {en:"wane", th:"ลดลง"},
  {en:"yearn", th:"โหยหา"},
  {en:"zenith", th:"จุดสูงสุด"})

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
