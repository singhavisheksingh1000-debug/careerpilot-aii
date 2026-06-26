const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
$('.nav-toggle')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));

const homeSlider=$('[data-home-slider]');
if(homeSlider){
  const slides=$$('[data-slider-slide]',homeSlider), dots=$$('[data-slider-dot]',homeSlider);
  let current=0, timer;
  const show=index=>{
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
    dots.forEach((dot,i)=>dot.classList.toggle('is-active',i===current));
  };
  const stop=()=>{if(timer)clearInterval(timer)};
  const start=()=>{stop();timer=setInterval(()=>show(current+1),4000)};
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start()}));
  homeSlider.addEventListener('mouseenter',stop);
  homeSlider.addEventListener('mouseleave',start);
  homeSlider.addEventListener('touchstart',stop,{passive:true});
  homeSlider.addEventListener('touchend',start,{passive:true});
  start();
}
const store=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const get=(key,fallback)=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
const cats=s=>s>=8?'Job Ready':s>=5?'Improving':'Beginner';
const toolkitCta=(title='Want to improve your resume score?')=>`<div class="cta-card"><h3>Want to improve your job search faster?</h3><p>Get ready-to-use templates, AI prompts, interview answers, and a 30-day job plan.</p><div class="actions"><a class="btn" href="https://payhip.com/b/X48ki" target="_blank" rel="noopener">Get ₹99 Starter Toolkit</a><a class="btn btn-outline" href="/#choose-toolkit">Get ₹199 Complete Toolkit</a></div></div>`;

const quizTips={Beginner:'Start with the linked guide, take notes, and retry after one focused practice session.',Improving:'You have a solid base. Review the questions you missed and practise two real examples.', 'Job Ready':'Great work. Keep your momentum with a mock interview and share your score.'};
$$('[data-quiz]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const total=$$('.quiz-question',form).length;let score=0;for(let i=1;i<=total;i++){const answer=form.querySelector(`[name="q${i}"]:checked`);if(answer?.value==='1')score++}const category=cats(score);const title=form.dataset.quiz;store(`careerpilot-${form.dataset.slug}`,{score,total,category,date:new Date().toISOString()});const box=$('.result',form);box.hidden=false;box.innerHTML=`<h3>${category}: ${score}/${total}</h3><p>${quizTips[category]}</p><p><strong>Share your result:</strong> I scored ${score}/${total} (${category}) on the ${title} at CareerPilot AI. Try it free!</p><button type="button" class="btn btn-small" data-copy>Copy result</button> <button type="reset" class="btn btn-outline btn-small">Try Again</button>${toolkitCta('Want a complete career score action plan?')}`;box.scrollIntoView({behavior:'smooth'});$('[data-copy]',box).onclick=()=>navigator.clipboard?.writeText(`I scored ${score}/${total} (${category}) on the ${title} at CareerPilot AI. Try it free!`);box.querySelector('[type=reset]').onclick=()=>{box.hidden=true;localStorage.removeItem(`careerpilot-${form.dataset.slug}`)}}));
const calc=(id,fn)=>$(`#${id}`)?.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));$('[data-output]',e.target).innerHTML=fn(data);$('[data-output]',e.target).hidden=false});
calc('experience',d=>{const start=new Date(d.start),end=new Date(d.end||Date.now());if(end<start)return'Please choose a valid date range.';let months=(end.getFullYear()-start.getFullYear())*12+end.getMonth()-start.getMonth();return`Your professional experience is <strong>${Math.floor(months/12)} years and ${months%12} months</strong>.`});
calc('salary',d=>{const old=+d.old,newPay=+d.new;if(!old||!newPay)return'Enter valid salary values.';return`Your salary hike is <strong>${(((newPay-old)/old)*100).toFixed(1)}%</strong>. New annual salary: <strong>₹${newPay.toLocaleString('en-IN')}</strong>.`});
calc('interview',d=>{const avg=['communication','confidence','knowledge','examples','questions'].reduce((s,k)=>s+(+d[k]||0),0);return`Your interview score is <strong>${avg}/50 (${cats(Math.round(avg/5))})</strong>. Focus next on your lowest-rated area.${toolkitCta('Want stronger interview answers?')}`});
calc('notice',d=>{const start=new Date(d.start);start.setDate(start.getDate()+(+d.days||0));return`Your estimated last working day is <strong>${start.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong>.`});
const checklist=$('#resume-checklist');if(checklist){const checks=$$('input[type=checkbox]',checklist), update=()=>{const done=checks.filter(c=>c.checked).length;store('careerpilot-resume-checklist',checks.map(c=>c.checked));$('[data-output]',checklist).innerHTML=`Resume checklist progress: <strong>${done}/${checks.length}</strong> completed.${toolkitCta('Want to improve your resume score?')}`};get('careerpilot-resume-checklist',[]).forEach((v,i)=>{if(checks[i])checks[i].checked=v});checks.forEach(c=>c.addEventListener('change',update));update()}
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
    $('[data-output]',atsForm).innerHTML=`<h3>${category}: ${score}/100</h3><p><strong>Privacy:</strong> Your resume text is processed only in your browser and is not saved.</p><h4>Score breakdown</h4><ul>${checks.map(check=>{const earned=Math.round(check.ok?check.points:(check.partial?check.points*check.partial:0));return`<li>${check.name}: ${earned}/${check.points}</li>`}).join('')}</ul><h4>ATS-friendly suggestions</h4><ul>${suggestions.map(s=>`<li>${s}</li>`).join('')}</ul><h4>Missing ${sector} keywords</h4><p>${missing.length?missing.join(', '):'Great job — your resume includes the core sector keywords checked by this tool.'}</p><h4>Improved resume summary</h4><p>${improvedSummary}</p>${toolkitCta('Want to improve your resume score?')}`;
    $('[data-output]',atsForm).hidden=false;
    $('[data-output]',atsForm).scrollIntoView({behavior:'smooth'});
  });
}
const advancedAtsForm=$('#advanced-ats-checker');
if(advancedAtsForm){
  const advancedKeywords={
    HR:['recruitment','onboarding','employee engagement','payroll','screening','talent acquisition','hr operations','hr policies','interview coordination','performance management'],
    Tech:['javascript','python','api','database','cloud','git','testing','debugging','security','agile'],
    'Software Engineering':['software engineering','javascript','python','java','api','database','git','testing','system design','agile'],
    'Data Analyst':['excel','sql','power bi','tableau','python','data cleaning','dashboard','statistics','data visualization','reporting'],
    'Business Analyst':['requirements','stakeholder','process mapping','user stories','brd','frd','gap analysis','documentation','uat','business process'],
    Finance:['financial analysis','accounting','budgeting','forecasting','excel','taxation','audit','variance','reporting','compliance'],
    Banking:['banking','kyc','customer service','loans','credit','risk','compliance','transactions','branch operations','relationship management'],
    'Project Management':['project planning','risk management','stakeholder management','agile','scrum','timeline','budget','coordination','delivery','status reporting'],
    Marketing:['marketing','campaign','seo','social media','content','brand','analytics','lead generation','email marketing','market research'],
    Sales:['sales','lead generation','crm','pipeline','negotiation','customer relationship','revenue','targets','prospecting','closing']
  };
  const industryKeys=['HR','Tech','Finance','Banking','Data Analyst','Business Analyst'], verbs=['achieved','managed','created','developed','implemented','improved','analyzed','coordinated','led','built','designed','optimized','resolved','delivered','prepared','supported','increased','reduced','launched','automated'];
  const textBox=$('[data-advanced-resume-text]',advancedAtsForm), fileInput=$('[data-advanced-resume-file]',advancedAtsForm), status=$('[data-file-status]',advancedAtsForm);
  const matchList=(text,list)=>list.filter(k=>text.includes(k));
  const pct=(text,key)=>Math.round(Math.min(100,(matchList(text,advancedKeywords[key]||[]).length/5)*100));
  const extractPdf=async file=>{if(!window.pdfjsLib)throw new Error('PDF parser is still loading. Please try again in a moment.');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const doc=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let out='';for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i), content=await page.getTextContent();out+=content.items.map(item=>item.str).join(' ')+'\n'}return out};
  const extractDocx=async file=>{if(!window.mammoth)throw new Error('DOCX parser is still loading. Please try again in a moment.');const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});return result.value};
  fileInput?.addEventListener('change',async()=>{const file=fileInput.files?.[0];if(!file)return;try{status.textContent='Extracting resume text in your browser...';const lower=file.name.toLowerCase();const extracted=lower.endsWith('.pdf')?await extractPdf(file):lower.endsWith('.docx')?await extractDocx(file):await file.text();textBox.value=extracted.trim();status.textContent=`Extracted ${textBox.value.length.toLocaleString('en-IN')} characters from ${file.name}. Files are processed only for analysis and are not stored permanently.`}catch(err){status.textContent=`Could not extract this file automatically: ${err.message}. Please paste your resume text manually.`}});
  advancedAtsForm.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(advancedAtsForm)), raw=(data.resume||'').trim(), text=raw.toLowerCase(), sector=data.sector, keywords=advancedKeywords[sector]||[], matched=matchList(text,keywords), missing=keywords.filter(k=>!matched.includes(k));
    const checks=[['Contact Information',10,/([\w.-]+@[\w.-]+\.\w+)|(\+?\d[\d\s-]{8,})|linkedin/.test(text)],['Professional Summary',10,/summary|professional summary|profile|career objective|objective/.test(text)],['Skills',10,/skills|technical skills|core skills|key skills|competencies/.test(text)],['Education',10,/education|degree|bachelor|master|university|college|b\.com|b\.tech|mba|graduate/.test(text)],['Experience',12,/experience|internship|employment|work history|responsibilities/.test(text)],['Projects',10,/project|projects|portfolio|case study|dashboard|campaign/.test(text)],['Certifications',8,/certification|certified|certificate|course|training/.test(text)],['Keywords',18,Math.min(1,matched.length/6)],['Formatting',12,!/[│┌┐└┘◆■●]/.test(raw)&&raw.length>350&&raw.split('\n').every(line=>line.length<150)]];
    const score=Math.round(checks.reduce((sum,[,points,val])=>sum+(val===true?points:val===false?0:points*val),0)), strengths=checks.filter(([,points,val])=>(val===true?points:val===false?0:points*val)>=points*.75).map(([name])=>name), weak=checks.filter(([,points,val])=>(val===true?points:val===false?0:points*val)<points*.75).map(([name])=>name), formatting=[];
    if(/[│┌┐└┘◆■●]/.test(raw))formatting.push('Remove decorative symbols, icons, and graphic-heavy separators.');if(raw.split('\n').some(line=>line.length>=150))formatting.push('Shorten very long lines and use simple bullet points.');if(raw.length<=350)formatting.push('Add more detail about skills, projects, education, and outcomes.');if(!formatting.length)formatting.push('Formatting looks simple and ATS-friendly.');
    const industry=industryKeys.map(key=>[key,pct(text,key)]).sort((a,b)=>b[1]-a[1]), top=industry[0], roleMap={HR:['HR Associate','Recruitment Coordinator','Talent Acquisition Intern'],Tech:['Technical Support Associate','IT Coordinator','Junior Developer'],Finance:['Finance Associate','Accounts Executive','Financial Analyst Intern'],Banking:['Banking Operations Associate','Relationship Executive','KYC Analyst'],'Data Analyst':['Junior Data Analyst','MIS Executive','Reporting Analyst'],'Business Analyst':['Business Analyst Trainee','Process Analyst','Product Operations Associate']};
    const suggestedSkills=[...new Set([...missing.slice(0,5),'Excel','communication','problem solving'])], certs=sector==='HR'?['HR analytics basics','Recruitment certification','Excel for HR']:sector.includes('Analyst')?['SQL basics','Power BI or Tableau','Excel dashboards']:sector==='Project Management'?['CAPM basics','Scrum fundamentals','Risk management basics']:['Excel certification','LinkedIn learning role-specific course','Communication skills certification'];
    const projects=sector==='HR'?['Create a recruitment tracker and onboarding checklist','Analyze mock employee engagement survey results']:sector==='Data Analyst'?['Build an Excel or Power BI sales dashboard','Clean and analyze a public dataset']:sector==='Business Analyst'?['Write a BRD and process map for a sample app','Create user stories for an e-commerce flow']:['Create a role-specific case study with measurable outcomes','Build a portfolio project that solves a real business problem'];
    const summary=`${data.name} is an entry-level ${sector} candidate with strengths in ${suggestedSkills.slice(0,3).join(', ')} and practical exposure through projects or internships. Brings ATS-friendly documentation, clear communication, and a learning mindset to support business outcomes.`;
    $('[data-output]',advancedAtsForm).innerHTML=`<h3>ATS Score: ${score}/100</h3><p><strong>Lead captured:</strong> ${data.name} (${data.email})</p><p><strong>Privacy:</strong> Files are processed only for analysis and are not stored permanently.</p><h4>Resume Strengths</h4><ul>${(strengths.length?strengths:['Basic resume structure']).map(x=>`<li>${x}</li>`).join('')}</ul><h4>Weak Areas</h4><ul>${(weak.length?weak:['No major weak area detected']).map(x=>`<li>${x}</li>`).join('')}</ul><h4>Missing Keywords</h4><p>${missing.length?missing.join(', '):'No major target-sector keyword gaps found.'}</p><h4>ATS Formatting Issues</h4><ul>${formatting.map(x=>`<li>${x}</li>`).join('')}</ul><h4>Industry Matching</h4><ul>${industry.map(([key,value])=>`<li>${key} Match: ${value}%</li>`).join('')}</ul><h4>AI Resume Suggestions</h4><p><strong>Improved summary:</strong> ${summary}</p><p><strong>Suggested skills:</strong> ${suggestedSkills.join(', ')}</p><p><strong>Suggested certifications:</strong> ${certs.join(', ')}</p><p><strong>Suggested project ideas:</strong> ${projects.join('; ')}</p><p><strong>Suggested action verbs:</strong> ${verbs.slice(0,10).join(', ')}</p><h4>Career Recommendation</h4><p><strong>Best matching job roles:</strong> ${(roleMap[top[0]]||roleMap.Tech).join(', ')}</p><p><strong>Recommended certifications:</strong> ${certs.join(', ')}</p><p><strong>Recommended skills to learn:</strong> ${suggestedSkills.join(', ')}</p>${toolkitCta('Want to improve your resume score?')}`;
    $('[data-output]',advancedAtsForm).hidden=false;$('[data-output]',advancedAtsForm).scrollIntoView({behavior:'smooth'});
  });
}
const jdMatchForm=$('#resume-jd-match-tool');
if(jdMatchForm){
  const resumeBox=$('[data-jd-resume-text]',jdMatchForm), fileInput=$('[data-jd-resume-file]',jdMatchForm), status=$('[data-jd-file-status]',jdMatchForm);
  const stopWords=new Set('and the with for from that this your you are will can into using use our their they have has job role work team across about plus including required preferred responsibilities qualifications experience years ability strong excellent good knowledge skills'.split(' '));
  const extractWords=text=>[...new Set((text.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g)||[]).filter(w=>!stopWords.has(w)).filter(w=>w.length>2))];
  const jdPdf=async file=>{if(!window.pdfjsLib)throw new Error('PDF parser is still loading. Please try again in a moment.');pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';const doc=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let out='';for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i), content=await page.getTextContent();out+=content.items.map(item=>item.str).join(' ')+'\n'}return out};
  const jdDocx=async file=>{if(!window.mammoth)throw new Error('DOCX parser is still loading. Please try again in a moment.');const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});return result.value};
  fileInput?.addEventListener('change',async()=>{const file=fileInput.files?.[0];if(!file)return;try{status.textContent='Extracting resume text in your browser...';const lower=file.name.toLowerCase();const text=lower.endsWith('.pdf')?await jdPdf(file):lower.endsWith('.docx')?await jdDocx(file):await file.text();resumeBox.value=text.trim();status.textContent=`Extracted ${resumeBox.value.length.toLocaleString('en-IN')} characters from ${file.name}. Your resume is analyzed only in your browser and is not stored.`}catch(err){status.textContent=`Could not extract this file automatically: ${err.message}. Please paste your resume text manually.`}});
  jdMatchForm.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(jdMatchForm)), resume=(data.resume||'').toLowerCase(), jd=(data.jobDescription||'').toLowerCase(), jdWords=extractWords(jd).slice(0,60), resumeWords=new Set(extractWords(resume)), matching=jdWords.filter(w=>resumeWords.has(w)), missing=jdWords.filter(w=>!resumeWords.has(w)).slice(0,18), actionVerbs=['achieved','managed','created','developed','implemented','improved','analyzed','coordinated','led','built','designed','optimized','delivered','launched','increased','reduced'], resumeVerbs=actionVerbs.filter(v=>resume.includes(v));
    const score=Math.min(100,Math.round((matching.length/Math.max(jdWords.length,1))*70+(resume.length>500?10:0)+(resumeVerbs.length>=4?10:resumeVerbs.length*2)+(resume.includes('skills')?5:0)+(resume.includes('summary')||resume.includes('profile')?5:0)));
    const skillsGap=missing.filter(w=>!/responsibilities|qualifications|candidate|company/.test(w)).slice(0,10), suggestions=[];
    if(!resume.includes('summary')&&!resume.includes('profile'))suggestions.push('Add a short professional summary tailored to this job description.');
    if(!resume.includes('skills'))suggestions.push('Add a dedicated skills section with job-description keywords.');
    if(resumeVerbs.length<4)suggestions.push('Add stronger action verbs and measurable outcomes to bullet points.');
    if(missing.length)suggestions.push('Add missing keywords naturally where they match your real experience.');
    suggestions.push('Keep formatting simple: clear headings, bullet points, no heavy graphics or tables.');
    const topTerms=(matching.length?matching:jdWords).slice(0,6).join(', '), summary=`Resume summary suggestion: Results-focused candidate aligned with this role through ${topTerms || 'relevant skills'}, practical project experience, and clear communication. Able to support business goals by applying job-specific skills, learning quickly, and documenting outcomes in an ATS-friendly format.`;
    $('[data-output]',jdMatchForm).innerHTML=`<h3>Resume Match Score: ${score}/100</h3><p><strong>Privacy:</strong> Your resume is analyzed only in your browser and is not stored.</p><h4>Matching keywords</h4><p>${matching.length?matching.slice(0,20).join(', '):'No strong keyword overlap found yet.'}</p><h4>Missing keywords</h4><p>${missing.length?missing.join(', '):'Great match — no major keyword gaps detected from the scanned job description.'}</p><h4>Skills gap</h4><p>${skillsGap.length?skillsGap.join(', '):'No major skills gap detected from the top job-description terms.'}</p><h4>ATS improvement suggestions</h4><ul>${suggestions.map(s=>`<li>${s}</li>`).join('')}</ul><h4>Recommended resume summary</h4><p>${summary}</p><h4>Suggested action verbs</h4><p>${actionVerbs.join(', ')}</p>${toolkitCta('Want to improve your resume match score?')}`;
    $('[data-output]',jdMatchForm).hidden=false;$('[data-output]',jdMatchForm).scrollIntoView({behavior:'smooth'});
  });
}

const funnelPaths=['/ats-resume-checker/','/interview-questions/','/blog/linkedin-profile-tips-for-freshers/','/quizzes/career-fit/','/tools/resume-job-description-match/'];
if(funnelPaths.includes(window.location.pathname)){
  const main=document.querySelector('main');
  if(main && !document.querySelector('[data-static-funnel-cta]')){
    const section=document.createElement('section');
    section.className='section static-funnel-section';
    section.dataset.staticFunnelCta='true';
    section.innerHTML=`<div class="container"><div class="cta-card static-funnel-card"><h2>Want to improve your job search faster?</h2><p>Get ready-to-use templates, AI prompts, interview answers, and a 30-day job plan.</p><div class="actions"><a class="btn" href="https://payhip.com/b/X48ki" target="_blank" rel="noopener">Get ₹99 Starter Toolkit</a><a class="btn btn-outline" href="/#choose-toolkit">Get ₹199 Complete Toolkit</a></div></div></div>`;
    main.appendChild(section);
  }
}
