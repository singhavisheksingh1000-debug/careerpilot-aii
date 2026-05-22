import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-brand-700">HR Toolkit AI</Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-600 transition hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/products" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          Get ₹99 Toolkit
        </Link>
      </div>
    </header>
  );
}
