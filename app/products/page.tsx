import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Toolkit Products: Resume Templates & Interview Kits',
  description: 'Shop affordable HR fresher digital products including the ₹99 starter toolkit, interview prep kit, and career roadmap.',
  openGraph: {
    title: 'HR Toolkit Products: Resume Templates & Interview Kits',
    description: 'Explore priced HR fresher products with instant digital delivery and checkout links.'
  },
  alternates: {
    canonical: '/products'
  }
};

const products = [
  {
    name: '₹99 HR Starter Toolkit',
    price: '₹99',
    description: 'Resume templates + cover letter pack + profile headlines.',
    buyText: 'Buy on Gumroad',
    buyLink: 'https://gumroad.com/l/hr-starter-toolkit-placeholder'
  },
  {
    name: 'Interview Preparation Kit',
    price: '₹299',
    description: 'Top fresher HR interview questions, sample answers, and scripts.',
    buyText: 'Buy on Razorpay',
    buyLink: 'https://rzp.io/l/hr-interview-kit-placeholder'
  },
  {
    name: 'HR Fresher Roadmap',
    price: '₹199',
    description: '30-day roadmap with daily action plan and tracking sheets.',
    buyText: 'Buy on Gumroad',
    buyLink: 'https://gumroad.com/l/hr-fresher-roadmap-placeholder'
  }
];

export default function ProductsPage() {
  return (
    <div className="container-main py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Products</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Choose your toolkit and start building your HR career with structured, affordable digital resources.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="mt-2 text-2xl font-bold text-brand-700">{product.price}</p>
            <p className="mt-3 text-slate-600">{product.description}</p>
            <a href={product.buyLink} className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
              {product.buyText}
            </a>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-brand-100 bg-brand-50 p-8">
        <h2 className="text-2xl font-semibold">Get the free HR fresher checklist</h2>
        <p className="mt-2 text-slate-700">Enter your email and get a free PDF checklist to improve your resume before your next application.</p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email" className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3" />
          <button className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">Get Free Checklist</button>
        </form>
      </section>
    </div>
  );
}
