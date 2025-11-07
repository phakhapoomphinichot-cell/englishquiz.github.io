const WORDS = [
  { en: "apple", th: "แอปเปิล" },
  { en: "book", th: "หนังสือ" },
  { en: "cat", th: "แมว" },
  { en: "dog", th: "สุนัข" },
  { en: "car", th: "รถยนต์" },
  { en: "computer", th: "คอมพิวเตอร์" },
  { en: "teacher", th: "ครู" },
  { en: "school", th: "โรงเรียน" },
  { en: "music", th: "ดนตรี" },
  { en: "phone", th: "โทรศัพท์" },
  { en: "water", th: "น้ำ" },
  { en: "food", th: "อาหาร" },
  { en: "house", th: "บ้าน" },
  { en: "love", th: "ความรัก" },
  { en: "friend", th: "เพื่อน" },
  { en: "sun", th: "ดวงอาทิตย์" },
  { en: "rain", th: "ฝน" },
  { en: "money", th: "เงิน" },
  { en: "family", th: "ครอบครัว" },
  { en: "time", th: "เวลา" },
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
  { en: "inference", th: "การอนุมาน" },
  { en: "derivation", th: "การได้มาจาก" },
  { en: "iteration", th: "การวนซ้ำ" },
  { en: "mechanical", th: "เชิงกล" },
  { en: "hypothesis", th: "สมมติฐาน" },
  { en: "automation", th: "ระบบอัตโนมัติ" },
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
  { en: "submission", th: "การส่งเอกสาร" },
  { en: "petrichor", th: "กลิ่นของดินหลังฝนตก" },
  { en: "serendipity", th: "การพบสิ่งดีๆ โดยบังเอิญ" },
  { en: "ephemeral", th: "สิ่งที่อยู่ชั่วคราว; ไม่ยั่งยืน" },
  {en:"acquire", th:"ได้มา; เข้าครอบครอง"},
  {en:"allocate", th:"จัดสรร; แบ่งส่วน"},
  {en:"amend", th:"แก้ไข; ปรับปรุง"},
  {en:"assess", th:"ประเมิน; ตรวจสอบ"},
  {en:"attain", th:"บรรลุ; ได้รับ"},
  {en:"authorize", th:"อนุมัติ; ให้อำนาจ"},
  {en:"commence", th:"เริ่มต้น; เปิดฉาก"},
  {en:"confer", th:"ปรึกษา; มอบ (รางวัล, ปริญญา)"},
  {en:"comply", th:"ปฏิบัติตาม; เชื่อฟัง"},
  {en:"constitute", th:"ประกอบขึ้น; ตั้งเป็น"},
  {en:"contribute", th:"บริจาค; สนับสนุน"},
  {en:"convene", th:"จัดประชุม; เรียกประชุม"},
  {en:"correspond", th:"สอดคล้องกัน; ตรงกัน"},
  {en:"derive", th:"ได้มาจาก; สืบเนื่องจาก"},
  {en:"designate", th:"แต่งตั้ง; กำหนด"},
  {en:"evaluate", th:"ประเมินผล; ตัดสิน"},
  {en:"facilitate", th:"อำนวยความสะดวก"},
  {en:"implement", th:"ดำเนินการ; ใช้งาน"},
  {en:"indicate", th:"แสดงให้เห็น; บ่งบอก"},
  {en:"maintain", th:"รักษาไว้; ดำรงไว้"},
  {en:"obtain", th:"ได้รับ; ครอบครอง"},
  {en:"proceed", th:"ดำเนินต่อ; ก้าวต่อไป"},
  {en:"restrict", th:"จำกัด; ควบคุม"},
  {en:"specify", th:"ระบุ; กำหนด"},
  {en:"subsequent", th:"ภายหลัง; ตามมา"},
  {en:"anomaly", th:"ความผิดปกติ; สิ่งที่แตกต่าง"},
  {en:"conundrum", th:"ปัญหาซับซ้อน; ปริศนา"},
  {en:"dichotomy", th:"การแบ่งออกเป็นสองส่วนที่ต่างกัน"},
  {en:"paradigm", th:"แบบจำลอง; กรอบความคิด"},
  {en:"ubiquitous", th:"มีอยู่ทั่วไป; พบเห็นได้ทุกที่"},
  {en:"lucid", th:"ชัดเจน; เข้าใจง่าย"},
  {en:"myriad", th:"จำนวนมหาศาล"},
  {en:"nostalgia", th:"ความคิดถึงอดีต"},
  {en:"oblivion", th:"การหลงลืม; การสูญหาย"},
  {en:"omnipotent", th:"ทรงพลังที่สุด; มีอำนาจไม่จำกัด"},
  {en:"quintessential", th:"ตัวอย่างที่สมบูรณ์แบบ; แก่นแท้"},
  {en:"resilient", th:"ฟื้นตัวได้เร็ว; ยืดหยุ่น"},
  {en:"sublime", th:"ประเสริฐ; งดงาม"},
  {en:"tenacious", th:"ไม่ยอมแพ้; ยึดมั่น"},
  {en:"vicarious", th:"รู้สึกแทน; ประสบแทน"},
  {en:"melancholy", th:"เศร้าลึก; เหงา"},
  {en:"eloquent", th:"พูดเก่ง; มีวาทศิลป์"},
  {en:"meticulous", th:"ละเอียดรอบคอบ"},
  {en:"altruism", th:"ความไม่เห็นแก่ตัว; เอื้อเฟื้อผู้อื่น"},
  {en:"catalyst", th:"ตัวเร่ง; สิ่งกระตุ้นให้เกิดการเปลี่ยนแปลง"},
  {en:"ephemeral", th:"ชั่วคราว; ไม่ยั่งยืน"},
  {en:"serendipity", th:"การบังเอิญพบสิ่งดี ๆ"},
  {en:"solitude", th:"ความโดดเดี่ยว; การอยู่ลำพังอย่างสงบ"},
  {en:"zenith", th:"จุดสูงสุด; ขีดสุด"},
  {en:"obscure", th:"ไม่ชัดเจน; คลุมเครือ"}
];

// ค่าตัวแปรเกม
let score = 0;
let currentWord = null;
let options = [];
let playerName = "";

const rankLevels = [
  { min: 0, name: "Rookie" },
  { min: 20, name: "Beginner" },
  { min: 50, name: "Intermediate" },
  { min: 80, name: "Advanced" },
  { min: 100, name: "Master" }
];

// เริ่มเกม
document.getElementById("start-btn").addEventListener("click", () => {
  const input = document.getElementById("username");
  playerName = input.value.trim();
  if (playerName === "") return alert("กรุณาใส่ชื่อก่อนเริ่ม!");

  document.getElementById("login-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("player-name").textContent = playerName;

  nextQuestion();
});

function nextQuestion() {
  currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  // สร้างตัวเลือกสุ่ม 4 ตัว (1 ถูก + 3 ผิด)
  options = [currentWord.th];
  while (options.length < 4) {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].th;
    if (!options.includes(randomWord)) options.push(randomWord);
  }
  shuffle(options);

  document.getElementById("question-container").textContent =
    `คำว่า "${currentWord.en}" แปลว่าอะไร?`;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

// ตรวจคำตอบ
function checkAnswer(selected) {
  const feedbackImg = document.getElementById("feedback-img");
  const correct = selected === currentWord.th;

  if (correct) {
    score++;
    feedbackImg.src = "images/correct.png";
  } else {
    feedbackImg.src = "images/wrong.png";
  }

  feedbackImg.style.display = "block";
  document.getElementById("score").textContent = score;
  updateRank();

  setTimeout(() => {
    feedbackImg.style.display = "none";
    nextQuestion();
  }, 1000);
}

function updateRank() {
  const rank = rankLevels
    .slice()
    .reverse()
    .find(r => score >= r.min)?.name || "Rookie";
  document.getElementById("rank").textContent = rank;
}

// ฟังก์ชันสับลำดับ array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
