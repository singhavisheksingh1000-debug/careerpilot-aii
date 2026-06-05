const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
$('.nav-toggle')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
const store=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const get=(key,fallback)=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
const cats=s=>s>=8?'Job Ready':s>=5?'Improving':'Beginner';
const quizTips={Beginner:'Start with the linked guide, take notes, and retry after one focused practice session.',Improving:'You have a solid base. Review the questions you missed and practise two real examples.', 'Job Ready':'Great work. Keep your momentum with a mock interview and share your score.'};
$$('[data-quiz]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const total=$$('.quiz-question',form).length;let score=0;for(let i=1;i<=total;i++){const answer=form.querySelector(`[name="q${i}"]:checked`);if(answer?.value==='1')score++}const category=cats(score);const title=form.dataset.quiz;store(`careerpilot-${form.dataset.slug}`,{score,total,category,date:new Date().toISOString()});const box=$('.result',form);box.hidden=false;box.innerHTML=`<h3>${category}: ${score}/${total}</h3><p>${quizTips[category]}</p><p><strong>Share your result:</strong> I scored ${score}/${total} (${category}) on the ${title} at CareerPilot AI. Try it free!</p><button type="button" class="btn btn-small" data-copy>Copy result</button> <button type="reset" class="btn btn-outline btn-small">Try Again</button>`;box.scrollIntoView({behavior:'smooth'});$('[data-copy]',box).onclick=()=>navigator.clipboard?.writeText(`I scored ${score}/${total} (${category}) on the ${title} at CareerPilot AI. Try it free!`);box.querySelector('[type=reset]').onclick=()=>{box.hidden=true;localStorage.removeItem(`careerpilot-${form.dataset.slug}`)}}));
const calc=(id,fn)=>$(`#${id}`)?.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));$('[data-output]',e.target).innerHTML=fn(data);$('[data-output]',e.target).hidden=false});
calc('experience',d=>{const start=new Date(d.start),end=new Date(d.end||Date.now());if(end<start)return'Please choose a valid date range.';let months=(end.getFullYear()-start.getFullYear())*12+end.getMonth()-start.getMonth();return`Your professional experience is <strong>${Math.floor(months/12)} years and ${months%12} months</strong>.`});
calc('salary',d=>{const old=+d.old,newPay=+d.new;if(!old||!newPay)return'Enter valid salary values.';return`Your salary hike is <strong>${(((newPay-old)/old)*100).toFixed(1)}%</strong>. New annual salary: <strong>₹${newPay.toLocaleString('en-IN')}</strong>.`});
calc('interview',d=>{const avg=['communication','confidence','knowledge','examples','questions'].reduce((s,k)=>s+(+d[k]||0),0);return`Your interview score is <strong>${avg}/50 (${cats(Math.round(avg/5))})</strong>. Focus next on your lowest-rated area.`});
calc('notice',d=>{const start=new Date(d.start);start.setDate(start.getDate()+(+d.days||0));return`Your estimated last working day is <strong>${start.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong>.`});
const checklist=$('#resume-checklist');if(checklist){const checks=$$('input[type=checkbox]',checklist), update=()=>{const done=checks.filter(c=>c.checked).length;store('careerpilot-resume-checklist',checks.map(c=>c.checked));$('[data-output]',checklist).innerHTML=`Resume checklist progress: <strong>${done}/${checks.length}</strong> completed.`};get('careerpilot-resume-checklist',[]).forEach((v,i)=>{if(checks[i])checks[i].checked=v});checks.forEach(c=>c.addEventListener('change',update));update()}
$$('[data-word]').forEach(el=>{const letters='INTERVIEWEXCELSKILLSCAREERRESUMEJOBSALARYHRDATA'.repeat(3);el.innerHTML=[...letters.slice(0,100)].map(c=>`<span>${c}</span>`).join('')});

const blogSearch=$('[data-blog-search]');
if(blogSearch){
  const input=$('[data-blog-search-input]',blogSearch), cards=$$('[data-post-card]'), count=$('[data-blog-result-count]'), empty=$('[data-blog-no-results]');
  const filter=()=>{const q=(input.value||'').trim().toLowerCase();let shown=0;cards.forEach(card=>{const haystack=[card.dataset.title,card.dataset.category,card.dataset.summary].join(' ');const match=!q||haystack.includes(q);card.hidden=!match;if(match)shown++});if(count)count.textContent=`${shown} guide${shown===1?'':'s'} ${q?'found':'available'}`;if(empty)empty.hidden=shown!==0};
  input.addEventListener('input',filter);filter();
}
const atsForm=$('#ats-resume-checker');
if(atsForm){
  const sectorKeywords={
    HR:['recruitment','onboarding','employee engagement','hr policies','payroll','screening','interview coordination','hr operations','talent acquisition','attendance'],
    Tech:['javascript','python','api','database','git','cloud','testing','debugging','software development','agile'],
    Finance:['financial analysis','accounting','budgeting','forecasting','excel','taxation','audit','variance','reporting','compliance'],
    Banking:['banking','kyc','customer service','loans','credit','risk','compliance','transactions','branch operations','relationship management'],
    'Data Analyst':['excel','sql','power bi','tableau','python','data cleaning','dashboard','statistics','data visualization','reporting'],
    'Business Analyst':['requirements','stakeholder','process mapping','user stories','brd','frd','gap analysis','documentation','uat','business process'],
    'Project Management':['project planning','risk management','stakeholder management','agile','scrum','timeline','budget','coordination','delivery','status reporting']
  };
  const actionVerbs=['achieved','managed','created','developed','implemented','improved','analyzed','coordinated','led','built','designed','optimized','resolved','delivered','prepared','supported'];
  const hasAny=(text,items)=>items.some(item=>text.includes(item));
  const countMatches=(text,items)=>items.filter(item=>text.includes(item));
  atsForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(atsForm)), raw=(data.resume||'').trim(), text=raw.toLowerCase(), sector=data.sector;
    const keywords=sectorKeywords[sector]||[], matched=countMatches(text,keywords), missing=keywords.filter(k=>!matched.includes(k));
    const checks=[
      {name:'Contact details',points:12,ok:/[\w.-]+@[\w.-]+\.\w+/.test(raw)||/\+?\d[\d\s-]{8,}/.test(raw)||text.includes('linkedin')},
      {name:'Professional summary',points:12,ok:hasAny(text,['summary','professional summary','profile','career objective','objective'])},
      {name:'Skills section',points:12,ok:hasAny(text,['skills','technical skills','core skills','key skills','competencies'])},
      {name:'Education',points:10,ok:hasAny(text,['education','degree','bachelor','master','university','college','b.com','b.tech','mba','graduate'])},
      {name:'Experience or projects',points:14,ok:hasAny(text,['experience','internship','project','projects','work history','portfolio','case study'])},
      {name:`${sector} keywords`,points:18,partial:Math.min(1,matched.length/5)},
      {name:'Action verbs',points:12,partial:Math.min(1,countMatches(text,actionVerbs).length/4)},
      {name:'ATS-friendly formatting',points:10,ok:!/[│┌┐└┘◆■●]/.test(raw)&&raw.length>250&&raw.split('\n').every(line=>line.length<140)}
    ];
    const score=Math.round(checks.reduce((sum,check)=>sum+(check.ok?check.points:(check.partial?check.points*check.partial:0)),0));
    const category=score>=80?'Job Ready':score>=60?'Needs Improvement':'Rewrite Recommended';
    const suggestions=[];
    checks.forEach(check=>{const earned=check.ok?check.points:(check.partial?check.points*check.partial:0);if(earned<check.points)suggestions.push(`Improve ${check.name.toLowerCase()} to gain more ATS points.`)});
    if(missing.length)suggestions.push(`Add relevant ${sector} keywords naturally where truthful: ${missing.slice(0,6).join(', ')}.`);
    suggestions.push('Use simple headings, bullet points, measurable achievements, and avoid tables or graphic-heavy layouts.');
    const summaryKeywords=(matched.length?matched:keywords.slice(0,4)).slice(0,4).join(', ');
    const improvedSummary=`Entry-level ${sector} candidate with a strong foundation in ${summaryKeywords || 'role-relevant skills'}, practical project experience, and a willingness to learn quickly. Skilled at using structured problem solving, clear communication, and ATS-friendly documentation to support business goals.`;
    $('[data-output]',atsForm).innerHTML=`<h3>${category}: ${score}/100</h3><p><strong>Privacy:</strong> Your resume text is processed only in your browser and is not saved.</p><h4>Score breakdown</h4><ul>${checks.map(check=>{const earned=Math.round(check.ok?check.points:(check.partial?check.points*check.partial:0));return`<li>${check.name}: ${earned}/${check.points}</li>`}).join('')}</ul><h4>ATS-friendly suggestions</h4><ul>${suggestions.map(s=>`<li>${s}</li>`).join('')}</ul><h4>Missing ${sector} keywords</h4><p>${missing.length?missing.join(', '):'Great job — your resume includes the core sector keywords checked by this tool.'}</p><h4>Improved resume summary</h4><p>${improvedSummary}</p><div class="actions"><a class="btn" href="https://payhip.com/b/X48ki" target="_blank" rel="noopener">Get ₹99 HR Career Toolkit</a><a class="btn btn-outline" href="../../interview-questions/">Practice interview questions</a></div>`;
    $('[data-output]',atsForm).hidden=false;
    $('[data-output]',atsForm).scrollIntoView({behavior:'smooth'});
  });
}
