import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Fresher Blog: Resume, Interview & Job Tips',
  description:
    'Read practical HR fresher blog posts on resume templates, interview questions, and how to get your first HR job in India.',
  openGraph: {
    title: 'HR Fresher Blog: Resume, Interview & Job Tips',
    description:
      'Actionable content for HR freshers: resume guidance, interview prep, and early-career HR growth tips.'
  },
  alternates: {
    canonical: '/blog'
  }
};

const posts = [
  {
    title: 'HR Fresher Resume Format: 7 Recruiter-Approved Sections',
    excerpt:
      'Learn exactly what to include in an HR fresher resume to increase shortlisting chances, with a copy-ready structure.',
    keyword: 'HR fresher resume format'
  },
  {
    title: 'Top 25 HR Interview Questions for Freshers (With Sample Answers)',
    excerpt:
      'Use these high-frequency HR interview questions and answer frameworks to prepare for confidence and clarity.',
    keyword: 'HR interview questions for freshers'
  },
  {
    title: 'How to Get Your First HR Job in 30 Days: Step-by-Step Plan',
    excerpt:
      'A practical weekly system covering profile setup, job applications, networking, and interview follow-up.',
    keyword: 'how to get first HR job'
  }
];

export default function BlogPage() {
  return (
    <div className="container-main py-12 md:py-16">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">HR Fresher Career Blog</h1>
        <p className="mt-3 text-slate-600">Practical posts to help you write stronger resumes, prepare for interviews, and land your first HR role faster.</p>
      </header>

      <section className="mt-10 space-y-5" aria-label="HR fresher blog posts">
        {posts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.excerpt}</p>
            <p className="mt-4 text-sm font-medium text-brand-700">Focus keyword: {post.keyword}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
