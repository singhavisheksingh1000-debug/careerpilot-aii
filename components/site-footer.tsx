export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="container-main flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} HR Toolkit AI. Built for freshers.</p>
        <p>Resume templates · Interview prep · HR career guidance</p>
      </div>
    </footer>
  );
}
