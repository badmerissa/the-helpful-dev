import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION: The Mission */}
      <header className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="mb-4 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          TheHelpfulDev
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
          Free, privacy-focused tools <br /> for everyday problems.
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          I build simple apps to help the community. No ads, no tracking, just useful code.
          <br />
          Open source and supported by people like you.
        </p>
        
        {/* Email Capture Placeholder - Connect this to a form service later */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email for updates..." 
            className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none w-full"
            disabled 
          />
          <button className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto">
            Get Updates
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          (Mailing list coming soon — bookmark this page!)
        </p>
      </header>

      {/* 2. THE DIRECTORY: Your Apps */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4 border-slate-200">The Toolbox</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* App 1: Fasting Tracker (LIVE) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">⏳</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Intermittent Fasting Tracker</h3>
            <p className="text-slate-600 mb-6 h-12">
              A simple, distraction-free timer to track your fasting windows. No login required.
            </p>
            {/* REPLACE '#' WITH YOUR ACTUAL VERCEL APP LINK BELOW */}
            <a href="https://fasting-tracker-tau.vercel.app/" target="https://fasting-tracker-tau.vercel.app/" className="block text-center w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Launch App &rarr;
            </a>
          </div>

          {/* App 2: Potty Training (COMING SOON) */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">👶</span>
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">IN PROGRESS</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Potty Panda</h3>
            <p className="text-slate-600 mb-6 h-12">
              Logging and timer tools to help parents through the potty training journey.
            </p>
            <button disabled className="block w-full py-2 bg-slate-200 text-slate-400 rounded-lg font-medium cursor-not-allowed">
              Coming Early 2026
            </button>
          </div>

        </div>
      </section>

      {/* 3. FOOTER: The Monetization */}
      <footer className="text-center py-12 px-6 border-t border-slate-200 mt-12 bg-white">
        <p className="mb-6 text-slate-600">
          Built with 🖤 by TheHelpfulDev.
        </p>
        <a 
          href="https://buymeacoffee.com/YOUR_USERNAME" 
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-sm"
        >
          ☕ Buy me a coffee
        </a>
        <p className="mt-4 text-sm text-slate-400">
          Your support keeps these servers running.
        </p>
      </footer>

    </main>
  );
}