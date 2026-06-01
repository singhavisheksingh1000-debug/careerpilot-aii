const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

$('[data-year]')?.replaceChildren(String(new Date().getFullYear()));
$('.menu-btn')?.addEventListener('click', (event) => {
  const nav = $('header nav');
  nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(nav.classList.contains('open')));
});

const quizData = {
  'hr-interview-readiness': ['I can introduce myself in under 90 seconds.','I know why I want this specific role.','I have examples for my strengths and weaknesses.','I can explain a difficult situation calmly.','I researched the company before the interview.','I prepared questions to ask the interviewer.','I can discuss my salary expectations professionally.','I know the key details in my resume.','I practice answers aloud before an interview.','I send a professional follow-up after an interview.'],
  'resume-ats-score': ['My resume uses a simple one-column layout.','My contact details are easy to find.','My resume includes keywords from the job description.','My experience bullets start with action verbs.','I include measurable results where possible.','My resume has standard section headings.','I avoid tables, graphics, and excessive icons.','My resume is free from spelling mistakes.','My resume is tailored for each role.','My file name is clear and professional.'],
  'data-analyst-beginner': ['I understand the purpose of data cleaning.','I can use filters and sorting in Excel.','I know when to use a pivot table.','I understand the difference between rows and columns.','I can explain what SQL is used for.','I understand averages, percentages, and trends.','I can make a clear chart for a simple dataset.','I check data before presenting insights.','I can explain an insight in plain language.','I am building at least one portfolio project.'],
  'career-fit': ['I know which tasks give me energy.','I can name three skills I want to use at work.','I researched the daily work in my target career.','I understand my preferred work environment.','I spoke to someone in a role that interests me.','I know which skills I need to improve.','I have compared at least two career options.','I can explain why my target role suits me.','I have a small project or course to test my interest.','I set a clear next action for this week.'],
  'salary-negotiation-readiness': ['I researched a realistic market salary range.','I know my preferred salary and minimum acceptable salary.','I can explain the value I bring to the role.','I avoid discussing salary before understanding the role.','I can ask about the full compensation package.','I practice my salary response before the call.','I stay polite when an offer is below my expectation.','I consider benefits, flexibility, and growth.','I ask for time to review an offer carefully.','I confirm the final offer details in writing.']
};

function resultCategory(score) {
  if (score >= 80) return ['Job Ready','Excellent foundation. Keep practicing your examples and tailor your preparation for each opportunity.'];
  if (score >= 50) return ['Improving','You are on the right track. Focus on the items you marked “Not yet” and practice one each day.'];
  return ['Beginner','Start small and build consistency. Choose three basics from this result and improve them this week.'];
}

const quizShell = $('[data-quiz]');
if (quizShell) {
  const quizId = quizShell.dataset.quiz;
  const questions = quizData[quizId];
  let current = 0;
  let answers = [];
  const content = $('[data-quiz-content]', quizShell);
  const renderQuestion = () => {
    $('[data-progress-text]', quizShell).textContent = `Question ${current + 1} of ${questions.length}`;
    $('[data-score-preview]', quizShell).textContent = `${answers.filter(Boolean).length} positive answers`;
    $('[data-progress-bar]', quizShell).style.width = `${((current + 1) / questions.length) * 100}%`;
    content.innerHTML = `<p class="eyebrow">Readiness check</p><h2>${questions[current]}</h2><div class="answers"><button class="answer" data-value="1">Yes, I do this consistently</button><button class="answer" data-value="0">Not yet, I need to improve this</button></div><button class="btn" data-next disabled>${current === questions.length - 1 ? 'See my result' : 'Next question'}</button>`;
    $$('.answer', content).forEach((button) => button.addEventListener('click', () => {
      $$('.answer', content).forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      $('[data-next]', content).disabled = false;
      $('[data-next]', content).dataset.value = button.dataset.value;
    }));
    $('[data-next]', content).addEventListener('click', (event) => {
      answers.push(Number(event.currentTarget.dataset.value));
      if (current < questions.length - 1) { current += 1; renderQuestion(); } else renderResult();
    });
  };
  const renderResult = () => {
    const score = answers.reduce((sum, value) => sum + value, 0) * 10;
    const [category, tip] = resultCategory(score);
    const resultText = `I scored ${score}/100 (${category}) on the CareerPilot AI ${quizId.replaceAll('-', ' ')} quiz. Try it free!`;
    localStorage.setItem(`careerpilot-quiz-${quizId}`, JSON.stringify({ score, category, date: new Date().toISOString() }));
    $('[data-progress-text]', quizShell).textContent = 'Quiz completed';
    $('[data-score-preview]', quizShell).textContent = 'Saved on this device';
    $('[data-progress-bar]', quizShell).style.width = '100%';
    content.innerHTML = `<div class="result-box"><p class="eyebrow">Your result</p><strong>${score}/100</strong><h2>${category}</h2><p>${tip}</p><p><b>Personalized tip:</b> Review the questions you answered “Not yet”, choose your top three, and turn them into this week's action list.</p><label for="share-text">Shareable result text</label><input id="share-text" value="${resultText}" readonly><div class="actions" style="margin-top:14px"><button class="btn" data-copy>Copy result</button><button class="btn btn-light" data-retry>Try Again</button></div></div>`;
    $('[data-copy]', content).addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(resultText); $('[data-copy]', content).textContent = 'Copied!'; }
      catch { $('#share-text', content).select(); document.execCommand('copy'); $('[data-copy]', content).textContent = 'Copied!'; }
    });
    $('[data-retry]', content).addEventListener('click', () => { current = 0; answers = []; renderQuestion(); });
  };
  renderQuestion();
}

const toolShell = $('[data-tool]');
if (toolShell) {
  const tool = toolShell.dataset.tool;
  const toolMarkup = {
    'experience-calculator': `<h2>Calculate your total experience</h2><label for="start">Start date</label><input id="start" type="date"><label for="end">End date</label><input id="end" type="date"><button class="btn" data-calculate>Calculate experience</button>`,
    'salary-hike-calculator': `<h2>Calculate your revised salary</h2><label for="salary">Current annual salary (₹)</label><input id="salary" type="number" min="0" placeholder="Example: 500000"><label for="hike">Expected hike (%)</label><input id="hike" type="number" min="0" placeholder="Example: 20"><button class="btn" data-calculate>Calculate new salary</button>`,
    'interview-score-calculator': `<h2>Estimate your interview readiness</h2>${['Communication','Role knowledge','Confidence','Examples and stories','Company research'].map((label, index) => `<label for="score${index}">${label} (1 to 10)</label><input id="score${index}" type="number" min="1" max="10" value="5">`).join('')}<button class="btn" data-calculate>Calculate score</button>`,
    'notice-period-calculator': `<h2>Find your last working day</h2><label for="resign">Resignation date</label><input id="resign" type="date"><label for="notice">Notice period (days)</label><input id="notice" type="number" min="0" value="30"><button class="btn" data-calculate>Calculate date</button>`,
    'resume-checklist-generator': `<h2>Create your resume checklist</h2><p>Select the items already completed. Your personalized improvement checklist will include the remaining tasks.</p>${['Added a clear professional summary','Used keywords from the job description','Included measurable results','Checked spelling and grammar','Used a simple ATS-friendly format','Added phone, email, and LinkedIn','Saved with a professional file name'].map((label, index) => `<label class="check-row"><input type="checkbox" value="${label}" id="check${index}"><span>${label}</span></label>`).join('')}<button class="btn" data-calculate>Generate checklist</button>`
  };
  toolShell.innerHTML = `${toolMarkup[tool]}<div class="tool-result" data-tool-result hidden></div>`;
  $('[data-calculate]', toolShell).addEventListener('click', () => {
    let message = '';
    if (tool === 'experience-calculator') {
      const start = new Date($('#start').value), end = new Date($('#end').value);
      if (!$('#start').value || !$('#end').value || end < start) message = 'Please choose a valid start date and end date.';
      else { const months = Math.floor((end - start) / 2629800000); message = `Your total experience is approximately <b>${Math.floor(months / 12)} years and ${months % 12} months</b>.`; }
    }
    if (tool === 'salary-hike-calculator') { const salary=Number($('#salary').value), hike=Number($('#hike').value); message=salary>0?`Your revised annual salary is <b>₹${Math.round(salary*(1+hike/100)).toLocaleString('en-IN')}</b>. That is approximately ₹${Math.round(salary*hike/1200).toLocaleString('en-IN')} more per month.`:'Please enter your current annual salary.'; }
    if (tool === 'interview-score-calculator') { const values=[0,1,2,3,4].map(i=>Math.min(10,Math.max(1,Number($(`#score${i}`).value)||1))); const score=Math.round(values.reduce((a,b)=>a+b,0)*2); message=`Your interview readiness score is <b>${score}/100</b>. ${resultCategory(score)[1]}`; }
    if (tool === 'notice-period-calculator') { const date=new Date($('#resign').value), days=Number($('#notice').value); if(!$('#resign').value||days<0) message='Please enter a valid resignation date and notice period.'; else { date.setDate(date.getDate()+days); message=`Your expected last working day is <b>${date.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</b>. Confirm the exact date with your employer.`; } }
    if (tool === 'resume-checklist-generator') { const remaining=$$('input[type="checkbox"]:not(:checked)',toolShell).map(x=>x.value); message=remaining.length?`<b>Your improvement checklist:</b><ol>${remaining.map(x=>`<li>${x}</li>`).join('')}</ol>`:'Excellent! You completed every item. Tailor your resume once more for the specific role before applying.'; localStorage.setItem('careerpilot-resume-checklist',JSON.stringify(remaining)); }
    const result = $('[data-tool-result]',toolShell); result.innerHTML=message; result.hidden=false;
  });
}

const puzzleShell = $('[data-puzzle]');
if (puzzleShell) {
  const puzzles = {
    crossword: `<h2>HR crossword mini-puzzle</h2><p>Complete the HR word: A planned meeting to assess a candidate.</p><div class="crossword">${'INTERVIEW'.split('').map((letter,i)=>`<input maxlength="1" aria-label="Letter ${i+1}" data-letter="${letter}">`).join('')}</div><button class="btn" data-check>Check answer</button><div class="tool-result" data-puzzle-result hidden></div>`,
    wordsearch: `<h2>Interview word search</h2><p>Find these interview words: <b>ROLE, SKILL, VALUE</b>. They appear left to right.</p><div class="word-grid">${'ROLEXABCSKILLQWEVALUEZXCVBNMASDFGHJKLPOIUYTR'.slice(0,48).split('').map(x=>`<span>${x}</span>`).join('')}</div><p>Tip: scan one row at a time and say the words when you find them.</p>`,
    excel: `<h2>Excel terms puzzle</h2><p>Unscramble these terms used by analysts.</p><ol><li>VPOIT → <b>?</b></li><li>RETILF → <b>?</b></li><li>MUS → <b>?</b></li></ol><button class="btn" data-reveal>Reveal answers</button><div class="tool-result" data-puzzle-result hidden></div>`
  };
  const renderPuzzle = (name) => {
    puzzleShell.innerHTML=puzzles[name];
    $('[data-check]',puzzleShell)?.addEventListener('click',()=>{const ok=$$('.crossword input',puzzleShell).every(x=>x.value.toUpperCase()===x.dataset.letter); const result=$('[data-puzzle-result]',puzzleShell); result.textContent=ok?'Correct! Great work.':'Not quite. Hint: the answer starts with I and ends with W.'; result.hidden=false;});
    $('[data-reveal]',puzzleShell)?.addEventListener('click',()=>{const result=$('[data-puzzle-result]',puzzleShell);result.innerHTML='<b>Answers:</b> PIVOT, FILTER, SUM';result.hidden=false;});
  };
  renderPuzzle('crossword');
  $$('[data-puzzle-tab]').forEach(button=>button.addEventListener('click',()=>{$$('[data-puzzle-tab]').forEach(x=>x.classList.remove('active'));button.classList.add('active');renderPuzzle(button.dataset.puzzleTab);}));
}
