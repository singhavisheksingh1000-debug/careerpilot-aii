import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '₹99 AI HR Career Toolkit | Resume Templates for Freshers',
  description:
    'A premium ₹99 AI HR Career Toolkit with recruiter-grade resume templates, interview scripts, and a free PDF checklist for HR freshers.',
  openGraph: {
    title: '₹99 AI HR Career Toolkit | Resume Templates for Freshers',
    description:
      'Build a stronger HR profile with templates, scripts, and a guided plan. Includes free PDF lead magnet and instant checkout.'
  },
  alternates: { canonical: '/' }
};

const toolkitHighlights = [
  '10 ATS resume templates (editable)',
  '5 ready-to-use cover letter drafts',
  '30 HR interview answer frameworks',
  'LinkedIn headline + summary bank'
];

const testimonials = [
  {
    quote:
      'I used one template, updated my LinkedIn, and got 3 interview calls in two weeks. The structure is very practical.',
    name: 'Nikita Sharma',
    role: 'HR Intern → HR Executive'
  },
  {
    quote:
      'The toolkit saves so much time. Instead of guessing, I followed the checklist and submitted better applications.',
    name: 'Rahul Verma',
    role: 'MBA Fresher'
  },
  {
    quote:
      'Clean, simple, and actionable. Worth far more than ₹99 if you are serious about your first HR job.',
    name: 'Aishwarya Nair',
    role: 'Talent Acquisition Trainee'
  }
];

const faqs = [
  {
    question: 'Who is this toolkit for?',
    answer:
      'It is designed for HR freshers, final-year students, and career switchers preparing for entry-level HR roles.'
  },
  {
    question: 'Is this a one-time payment?',
    answer: 'Yes. The ₹99 payment is one-time and includes instant access to the full starter toolkit.'
  },
  {
    question: 'How do I get the free PDF?',
    answer:
      'Enter your email in the lead magnet form. You will receive the PDF checklist that helps you optimize your resume and applications.'
  },
  {
    question: 'Where does checkout happen?',
    answer: 'Checkout is handled securely via Gumroad using the buy button below.'
  }
];

export default function HomePage() {
  return (
    <div className="container-main py-10 md:py-14">
      <section className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-7 shadow-sm shadow-blue-100 md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6 animate-fade-up">
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              AI HR Career Toolkit • ₹99 Only
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Get interview-ready for HR roles with a clean, premium toolkit.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              Built for freshers who want faster results: modern resume templates, practical interview prep, and a clear application flow that actually gets responses.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://gumroad.com/l/hr-starter-toolkit-placeholder"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Buy on Gumroad
              </a>
              <Link
                href="#free-pdf"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                Get Free PDF
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 animate-float">
            <p className="text-sm font-semibold text-blue-700">Product Preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Inside the toolkit</h2>
            <ul className="mt-5 space-y-3 text-slate-600">
              {toolkitHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Bonus: HR Application Tracker PDF</p>
              <p className="mt-1">Track applications, follow-ups, and interview outcomes in one place.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="free-pdf" className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/60 p-7 md:p-10 animate-fade-up">
        <h2 className="text-2xl font-semibold text-slate-900">Free PDF Lead Magnet</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Download the <strong>“HR Fresher Resume Fix Checklist”</strong> — a quick guide to avoid the 12 mistakes that block interview calls.
        </p>
        <form className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-slate-900 outline-none ring-blue-300 focus:ring"
          />
          <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">Send My Free PDF</button>
        </form>
      </section>

      <section className="mt-12 animate-fade-up">
        <h2 className="text-2xl font-semibold text-slate-900">What customers are saying</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-slate-600">“{item.quote}”</p>
              <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-blue-700">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 md:p-10 animate-fade-up">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-5 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
