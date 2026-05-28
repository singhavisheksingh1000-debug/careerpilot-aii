import { useMemo, useState } from 'react';

// Static interview questions by role keep the tool instant (no API required).
const roleQuestions = {
  'HR Fresher': [
    'Can you introduce yourself and tell us why you chose HR as a career?',
    'How would you explain the role of HR in business growth?',
    'What steps would you follow while screening a resume?',
    'How would you handle a candidate who is nervous in an interview?',
    'What HR tools or platforms have you explored so far?',
    'How will you keep employee data confidential?',
    'What is the difference between recruitment and talent acquisition?',
    'How would you onboard a new joiner in a positive way?'
  ],
  'HR Executive': [
    'How do you manage end-to-end recruitment under tight deadlines?',
    'How do you resolve conflict between employees and managers?',
    'What KPIs do you track for hiring and retention?',
    'How do you ensure policy compliance across departments?',
    'How do you design and run an employee engagement plan?',
    'What is your approach to performance review calibration?',
    'How do you handle difficult exit interviews?',
    'How do you partner with leadership for workforce planning?'
  ],
  Recruiter: [
    'How do you source passive candidates effectively?',
    'How do you write a job description that attracts quality applicants?',
    'How do you reduce time-to-hire without lowering quality?',
    'How do you evaluate culture fit in interviews?',
    'How do you keep candidates warm during long hiring cycles?',
    'How do you negotiate compensation with candidates?',
    'How do you track and improve offer acceptance rate?',
    'How do you collaborate with hiring managers who give limited feedback?'
  ],
  'Data Analyst Fresher': [
    'Walk us through a data project you completed as a fresher.',
    'How do you clean messy data before analysis?',
    'What is the difference between correlation and causation?',
    'Which Excel functions do you use most and why?',
    'How would you explain insights to non-technical stakeholders?',
    'What SQL queries are essential for beginner analysts?',
    'How do you validate that your dashboard numbers are accurate?',
    'How would you prioritize analysis requests from multiple teams?'
  ]
};

// Preview prompts for the free teaser section.
const toolkitPrompts = [
  'Improve my resume for an HR Fresher role. Highlight measurable impact and ATS-friendly keywords.',
  'Act as an interviewer and run a mock HR interview with feedback after every answer.',
  'Rewrite my LinkedIn headline and About section for HR recruitment opportunities in 2026.',
  'Create a 7-day hiring pipeline plan for an HR recruiter handling 10 open roles.',
  'Draft a tailored cover letter for an entry-level HR Executive role in a SaaS company.'
];

// Tokenize text into simple keywords for ATS-style matching.
const keywordSplit = (text) =>
  text.toLowerCase().match(/[a-zA-Z]{3,}/g)?.filter((word) => !['with', 'this', 'that', 'from', 'have', 'your', 'will'].includes(word)) || [];

function App() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const [selectedRole, setSelectedRole] = useState('HR Fresher');
  const [questions, setQuestions] = useState([]);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const year = useMemo(() => new Date().getFullYear(), []);

  // Compare resume keywords vs. JD keywords and show actionable feedback.
  const checkResume = () => {
    const resumeWords = keywordSplit(resume);
    const jdWords = [...new Set(keywordSplit(jobDescription))];

    if (!resumeWords.length || !jdWords.length) {
      setAnalysis({
        score: 0,
        missing: [],
        strong: [],
        tips: ['Please paste both resume and job description to generate insights.']
      });
      return;
    }

    const resumeSet = new Set(resumeWords);
    const matched = jdWords.filter((word) => resumeSet.has(word));
    const missing = jdWords.filter((word) => !resumeSet.has(word)).slice(0, 10);
    const strong = [...new Set(resumeWords.filter((w) => ['recruitment', 'communication', 'excel', 'sourcing', 'analytics', 'onboarding', 'screening', 'interview'].includes(w)))];

    const score = Math.min(100, Math.round((matched.length / jdWords.length) * 100));

    const tips = [
      'Add more job-description keywords naturally in your experience bullets.',
      'Use action verbs and include measurable outcomes where possible.',
      'Keep resume format ATS-friendly with clear section headings.'
    ];

    setAnalysis({ score, missing, strong, tips });
  };

  // Generate 8 role-based questions instantly from local data.
  const generateQuestions = () => setQuestions(roleQuestions[selectedRole]);

  // Validate and save lead emails into localStorage without page reload.
  const saveEmail = (e) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
      setEmailMessage('Please enter a valid email address.');
      return;
    }

    const existingEmails = JSON.parse(localStorage.getItem('hrCareerHubLeads') || '[]');
    if (!existingEmails.includes(email.toLowerCase())) {
      existingEmails.push(email.toLowerCase());
    }

    localStorage.setItem('hrCareerHubLeads', JSON.stringify(existingEmails));
    setEmailMessage('Success! Your email has been saved.');
    setEmail('');
  };

  return (
    <div className="page">
      <header className="hero card">
        <h1>HR Career Hub</h1>
        <p>Your ₹99 AI toolkit + free tools to build a stronger HR career in 2026.</p>
        <a className="btn" href="#premium">Explore Premium Toolkit</a>
      </header>

      <section className="card">
        <h2>Free Resume Checker</h2>
        <div className="grid two">
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste Resume" />
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste Job Description" />
        </div>
        <button className="btn" onClick={checkResume}>Check Resume</button>
        {analysis && (
          <div className="result">
            <p><strong>Match Score:</strong> {analysis.score}/100</p>
            <p><strong>Missing Keywords:</strong> {analysis.missing.join(', ') || 'No major gaps found.'}</p>
            <p><strong>Strong Skills Found:</strong> {analysis.strong.join(', ') || 'Add more role-specific skills.'}</p>
            <ul>{analysis.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Interview Question Generator</h2>
        <div className="row">
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            {Object.keys(roleQuestions).map((role) => <option key={role}>{role}</option>)}
          </select>
          <button className="btn" onClick={generateQuestions}>Generate Questions</button>
        </div>
        <ol>{questions.map((question) => <li key={question}>{question}</li>)}</ol>
      </section>

      <section className="card">
        <h2>AI Prompt Toolkit Preview</h2>
        <ul>{toolkitPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
        <a className="btn" href="#premium">Get Full Premium Toolkit</a>
      </section>

      <section className="card">
        <h2>Downloadable HR PDFs</h2>
        <div className="grid three">
          {['Free Resume Checklist', 'Interview Prep Guide', 'HR Fresher Starter Kit'].map((item) => (
            <article className="mini-card" key={item}><h3>{item}</h3><button className="btn secondary" onClick={() => alert('PDF download will be added soon.')}>Download PDF</button></article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Blog</h2>
        <div className="grid three">
          {['How Freshers Can Get HR Jobs in 2026', 'Best Resume Keywords for HR Freshers', 'How to Prepare for HR Interview Using AI'].map((post) => (
            <article className="mini-card" key={post}><h3>{post}</h3><p>Quick practical guide for students and job seekers.</p></article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Get Free HR Career Updates</h2>
        <form onSubmit={saveEmail} className="row">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          <button className="btn" type="submit">Join Free List</button>
        </form>
        {emailMessage && <p>{emailMessage}</p>}
      </section>

      <section id="premium" className="card premium">
        <h2>AI HR Career Premium Toolkit - ₹99</h2>
        <ul>
          <li>30+ AI prompts</li><li>Resume improvement guide</li><li>Interview answer framework</li><li>HR fresher job strategy</li><li>Bonus LinkedIn optimization prompts</li><li>Resume templates for students and freshers</li>
        </ul>
        <a className="btn" href="https://avisheksingh3.gumroad.com/l/ojpwo" target="_blank" rel="noreferrer">Buy Premium Toolkit</a>
      </section>

      <footer className="footer">© {year} HR Career Hub. Built for students, freshers, and job seekers.</footer>
    </div>
  );
}

export default App;
