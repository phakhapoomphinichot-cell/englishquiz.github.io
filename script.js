let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let fontSize = 16;

// โหลดคำถามจาก JSON
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
  });

document.getElementById('startBtn').addEventListener('click', () => {
  const nameInput = document.getElementById('playerName').value.trim();
  if(nameInput === '') {
    alert('กรุณาใส่ชื่อผู้เล่น');
    return;
  }
  playerName = nameInput;
  document.querySelector('.player-name').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  showQuestion();
});

function showQuestion() {
  if(currentQuestionIndex >= questions.length){
    alert(`${playerName}, จบเกม! คะแนนของคุณ: ${score}`);
    return;
  }
  const q = questions[currentQuestionIndex];
  document.getElementById('questionText').textContent = q.question;
  document.getElementById('questionImage').src = q.image;
  document.getElementById('explanation').textContent = '';
  
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.style.fontSize = fontSize + 'px';
    btn.addEventListener('click', () => checkAnswer(index));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[currentQuestionIndex];
  if(selected === q.answer){
    score += 1;
  }
  document.getElementById('score').textContent = score;
  document.getElementById('explanation').textContent = q.translation;
  updateRank();
  currentQuestionIndex++;
  setTimeout(showQuestion, 1500);
}

function updateRank(){
  let rank = 'Beginner';
  if(score > 50) rank = 'Intermediate';
  if(score > 150) rank = 'Advanced';
  if(score > 300) rank = 'Expert';
  document.getElementById('rank').textContent = rank;
}

document.getElementById('increaseFont').addEventListener('click', () => {
  fontSize += 2;
  updateFont();
});
document.getElementById('decreaseFont').addEventListener('click', () => {
  fontSize -= 2;
  updateFont();
});

function updateFont(){
  document.getElementById('questionText').style.fontSize = fontSize + 'px';
  document.querySelectorAll('#optionsContainer button').forEach(btn => btn.style.fontSize = fontSize + 'px');
}
