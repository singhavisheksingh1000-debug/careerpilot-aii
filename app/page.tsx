import type { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = {
  title: '₹99 HR Toolkit for Freshers: Resume Templates & Interview Prep',
  description:
    'Buy the ₹99 HR toolkit with ATS resume templates, interview preparation kits, and a free HR fresher checklist lead magnet.',
  openGraph: {
    title: '₹99 HR Toolkit for Freshers: Resume Templates & Interview Prep',
    description:
      'Conversion-focused HR career toolkit for freshers: resume templates, interview prep, roadmap, and free checklist.'
  },
  alternates: { canonical: '/' }
};
const products = [
  {
    title: '₹99 HR Starter Toolkit',
    price: '₹99',
    desc: 'ATS-friendly resume templates, cover letter formats, and recruiter-ready LinkedIn copy.',
    points: ['10 resume templates', '5 cover letter samples', 'LinkedIn headline bank'],
    buyHref: 'https://gumroad.com/l/hr-starter-toolkit-placeholder'
  },
  {
    title: 'Interview Preparation Kit',
    price: '₹299',
    desc: 'Top HR fresher interview questions, model answers, and confidence scripts for virtual rounds.',
    points: ['100+ interview Q&As', 'Mock answer framework', 'HR role-wise prep sheets'],
    buyHref: 'https://rzp.io/l/hr-interview-kit-placeholder'
  },
  {
    title: 'HR Fresher Roadmap',
    price: '₹199',
    desc: 'A practical 30-day plan to build your profile, network smartly, and apply with consistency.',
    points: ['Daily action tracker', 'Portfolio checklist', 'Job application planner'],
    buyHref: 'https://gumroad.com/l/hr-fresher-roadmap-placeholder'
  }
];

const faqs = [
  ['Is this toolkit beginner friendly?', 'Yes. It is built for students and first-time HR job seekers with step-by-step instructions.'],
  ['Why is the starter toolkit just ₹99?', 'We keep the entry product affordable so more freshers can begin with quality, practical resources.'],
  ['How will I receive the products?', 'After payment, you get an instant download link via the checkout platform and confirmation email.']
];

export default function HomePage() {
  return (
    <div className="container-main space-y-20 py-12 md:py-16">
      <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-6">
          <p className="inline-block rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">AI HR Career Toolkit</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Land your first HR role faster with a premium ₹99 toolkit.</h1>
          <p className="max-w-xl text-lg text-slate-600">Professional resume templates, interview prep kits, and a clear fresher roadmap designed to improve your conversion from application to interview call.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-200 transition hover:-translate-y-0.5 hover:bg-brand-700">Buy Now</Link>
            <Link href="#free-checklist" className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700">Get Free Checklist</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold text-brand-700">Trusted by freshers</p>
          <p className="mt-2 text-4xl font-bold">10,000+</p>
          <p className="mt-3 text-slate-600">Actionable, recruiter-aligned resources crafted to help freshers build confidence and stand out.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <h2 className="text-2xl font-semibold">Why most HR freshers don’t get interview calls</h2>
        <p className="mt-3 text-slate-600">Weak resumes, generic applications, and no interview strategy. This toolkit solves those gaps with templates, scripts, and a proven execution roadmap.</p>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Best-selling digital products</h2>
          <Link href="/products" className="hidden text-sm font-semibold text-brand-700 hover:text-brand-800 md:block">View all products →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-sm font-medium text-slate-500">Digital Product</p>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-2xl font-bold text-brand-700">{p.price}</p>
              <p className="mt-3 text-slate-600">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {p.points.map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
              <a href={p.buyHref} className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-700">
                Buy Now
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {['Premium, recruiter-ready templates', 'Interview-ready response structure', 'Step-by-step HR career roadmap', 'Affordable pricing for freshers'].map((b) => (
          <div key={b} className="rounded-2xl border border-brand-100 bg-brand-50 p-5 font-medium text-brand-700">{b}</div>
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-slate-300 p-8 text-center md:p-10">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <p className="mt-3 text-slate-600">Student success stories and placement wins will be showcased here.</p>
      </section>

      <section id="free-checklist" className="rounded-3xl border border-brand-100 bg-brand-50 p-8 md:p-10">
        <h2 className="text-2xl font-semibold">Free lead magnet: HR Fresher Checklist</h2>
        <p className="mt-2 text-slate-700">Get the exact 12-point checklist to fix your resume, profile, and applications before you apply.</p>
        <form className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email" className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-slate-900" />
          <button className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700">Send Me the Free Checklist</button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
        <h2 className="text-2xl font-semibold">Get weekly HR job tips in your inbox</h2>
        <p className="mt-2 text-slate-300">Actionable career strategies, job updates, and exclusive offers.</p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email" className="w-full rounded-xl border border-slate-600 bg-white px-4 py-3 text-slate-900" />
          <button className="rounded-xl bg-brand-600 px-5 py-3 font-semibold transition hover:bg-brand-500">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
