export default function Header() {
  return (
    <header className="px-6 py-5 flex justify-between items-center border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <img src="/assets/images/logo.svg" alt="FX Checker" className="h-6" />
      </div>
      <div className="text-sm text-neutral-200 tracking-wide font-mono">
        <span>55</span> CURRENCIES · EOD · ECB DATA
      </div>
    </header>
  );
}