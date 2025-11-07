const TOTAL_PER_DAY = 10;
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
