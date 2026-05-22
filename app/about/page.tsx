import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | HR Toolkit AI',
  description: 'Learn about the AI HR Career Toolkit mission and team.'
};

export default function AboutPage() {
  return (
    <div className="container-main py-12">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-3 text-slate-600">We help HR freshers build confidence and land their first role with practical digital tools.</p>
    </div>
  );
}
