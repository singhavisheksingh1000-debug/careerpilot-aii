import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | HR Toolkit AI',
  description: 'Contact HR Toolkit AI for support and career consultation.'
};

export default function ContactPage() {
  return (
    <div className="container-main py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-3 text-slate-600">Email us at hello@hrtoolkitai.com for product support or 1:1 guidance.</p>
    </div>
  );
}
