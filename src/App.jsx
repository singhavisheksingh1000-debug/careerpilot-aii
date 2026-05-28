import { useMemo, useState } from 'react'

// Static question bank mapped to each selectable role.
const roleQuestions = {
  'HR Fresher': [
    'Tell me about yourself and why you want to start a career in HR.',
    'What do you understand about the role of HR in an organization?',
    'How would you handle confidential employee information?',
    'What is the difference between recruitment and talent acquisition?',
    'How would you shortlist resumes for an entry-level role?',
    'What HR tools or software have you explored as a fresher?',
    'How do you manage multiple deadlines during hiring drives?',
    'Why should we hire you for this HR fresher role?'
  ],
  'HR Executive': [
    'How do you manage end-to-end recruitment for multiple openings?',
    'How do you resolve employee grievances in a fair way?',
    'What KPIs do you track for HR performance?',
    'How do you ensure compliance with labor policies?',
    'How do you improve employee engagement in your team?',
    'Describe your process for onboarding new hires.',
    'How do you work with managers on workforce planning?',
    'Tell us about a challenging HR case you handled.'
  ],
  Recruiter: [
    'How do you source quality candidates quickly?',
    'What is your strategy for reducing time-to-hire?',
    'How do you assess culture fit during screening calls?',
    'How do you write job descriptions that attract strong talent?',
    'Which recruitment platforms have given you the best results?',
    'How do you keep candidates engaged through long hiring cycles?',
    'How do you measure recruitment funnel performance?',
    'How do you negotiate offers with candidates professionally?'
  ],
  'Data Analyst Fresher': [
    'Walk me through a data analysis project you have completed.',
    'What is the difference between data cleaning and data transformation?',
    'Which tools do you use for analysis and visualization?',
    'How would you explain insights to non-technical stakeholders?',
    'What SQL concepts are most important for freshers?',
    'How do you validate whether your analysis is accurate?',
    'How would you approach analyzing employee attrition data?',
    'Why do you want to start as a data analyst?'
  ]
}

const promptPreview = [
  'Improve my resume for [Job Role], highlight measurable achievements, and add ATS-friendly keywords.',
  'Act as an interview coach and ask me 10 HR interview questions with model answers and feedback tips.',
  'Rewrite my LinkedIn headline and About section to attract HR recruiter attention in 2026.',
  'Create a Boolean search string for finding entry-level HR candidates with strong communication skills.',
  'Write a personalized cover letter for [Company] and [Role] based on my resume details.'
]

const hrKeywords = [
  'recruitment', 'onboarding', 'employee engagement', 'payroll', 'compliance', 'communication', 'excel', 'screening', 'interviewing', 'hrms', 'talent acquisition', 'data analysis'
]

function App() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [role, setRole] = useState('HR Fresher')
  const [questions, setQuestions] = useState([])
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  // Basic ATS keyword matching logic for resume quality check.
  const analyzeResume = () => {
    const resumeLower = resumeText.toLowerCase()
    const jdLower = jobDescription.toLowerCase()

    if (!resumeLower.trim() || !jdLower.trim()) {
      setResult({ error: 'Please paste both resume and job description.' })
      return
    }

    const jdKeywords = hrKeywords.filter((keyword) => jdLower.includes(keyword))
    const matched = jdKeywords.filter((keyword) => resumeLower.includes(keyword))
    const missing = jdKeywords.filter((keyword) => !resumeLower.includes(keyword))

    // If no known HR keywords exist in JD, give a neutral score.
    const totalPossible = Math.max(1, jdKeywords.length)
    const score = jdKeywords.length === 0 ? 50 : Math.min(100, Math.round((matched.length / totalPossible) * 100))

    setResult({
      score,
      missing,
      strongSkills: matched,
      tips: [
        'Add role-specific keywords from the job description naturally in your experience bullets.',
        'Quantify outcomes (e.g., screened 80+ candidates, reduced time-to-hire by 20%).',
        'Keep your resume concise, clear, and ATS-friendly with simple section headings.'
      ]
    })
  }

  const generateQuestions = () => {
    setQuestions(roleQuestions[role])
  }

  // Validates and stores leads in localStorage without a page reload.
  const handleEmailSubmit = (event) => {
    event.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)

    if (!valid) {
      setEmailMessage('Please enter a valid email address.')
      return
    }

    const leads = JSON.parse(localStorage.getItem('hrCareerHubLeads') || '[]')
    const alreadyExists = leads.some((lead) => lead.email === cleanEmail)

    if (alreadyExists) {
      setEmailMessage('This email is already subscribed. You are all set!')
      return
    }

    leads.push({ email: cleanEmail, date: new Date().toISOString() })
    localStorage.setItem('hrCareerHubLeads', JSON.stringify(leads))
    setEmailMessage('Thanks! You are on the early access list.')
    setEmail('')
  }

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="page">
      <header className="hero">
        <h1>HR Career Hub</h1>
        <p>Premium ₹99 HR Toolkit with resume templates for students, freshers, and job seekers.</p>
        <a className="btn" href="#premium">Explore Toolkit</a>
      </header>

      <section className="card" id="resume-checker">
        <h2>Free Resume Checker</h2>
        <div className="grid-two">
          <textarea placeholder="Paste Resume" value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
          <textarea placeholder="Paste Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <button className="btn" onClick={analyzeResume}>Check Resume</button>
        {result && (
          <div className="result">
            {result.error ? <p>{result.error}</p> : <>
              <p><strong>Match Score:</strong> {result.score}/100</p>
              <p><strong>Missing keywords:</strong> {result.missing.join(', ') || 'None'}</p>
              <p><strong>Strong skills found:</strong> {result.strongSkills.join(', ') || 'None'}</p>
              <ul>{result.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            </>}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Interview Question Generator</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {Object.keys(roleQuestions).map((item) => <option key={item}>{item}</option>)}
        </select>
        <button className="btn" onClick={generateQuestions}>Generate Questions</button>
        <ol>{questions.map((q) => <li key={q}>{q}</li>)}</ol>
      </section>

      <section className="card">
        <h2>AI Prompt Toolkit Preview</h2>
        <ul>{promptPreview.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
        <a className="btn" href="#premium">Get Full Premium Toolkit</a>
      </section>

      <section className="card">
        <h2>Downloadable HR PDF Section</h2>
        <div className="grid-three">
          {['Free Resume Checklist', 'Interview Prep Guide', 'HR Fresher Starter Kit'].map((title) => (
            <article className="small-card" key={title}>
              <h3>{title}</h3>
              <button className="btn ghost" onClick={() => window.alert('PDF download will be added soon.')}>Download</button>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Blog</h2>
        <div className="grid-three">
          {[
            'How Freshers Can Get HR Jobs in 2026',
            'Best Resume Keywords for HR Freshers',
            'How to Prepare for HR Interview Using AI'
          ].map((title) => <article className="small-card" key={title}><h3>{title}</h3><p>Read practical tips and step-by-step actions.</p></article>)}
        </div>
      </section>

      <section className="card">
        <h2>Get Career Updates</h2>
        <form className="email-form" onSubmit={handleEmailSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          <button className="btn" type="submit">Join Free List</button>
        </form>
        {emailMessage && <p>{emailMessage}</p>}
      </section>

      <section className="card premium" id="premium">
        <h2>AI HR Career Premium Toolkit</h2>
        <p className="price">Only ₹99</p>
        <ul>
          <li>30+ AI prompts</li>
          <li>Resume improvement guide</li>
          <li>Interview answer framework</li>
          <li>HR fresher job strategy</li>
          <li>Bonus LinkedIn optimization prompts</li>
          <li>Editable resume templates</li>
        </ul>
        <a className="btn" target="_blank" rel="noreferrer" href="https://avisheksingh3.gumroad.com/l/ojpwo">Buy Premium Toolkit</a>
      </section>

      <footer className="footer">© {year} HR Career Hub • Built for career growth.</footer>
    </div>
  )
}

export default App
