import NewsletterForm from './components/NewsletterForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION: The Mission */}
      <header className="max-w-3xl mx-auto px-6 py-20 text-center">
        {/* LOGO ADDED HERE */}
        <div className="flex justify-center mb-8 opacity-80">
          <Image
              src="/icon.png"    // Make sure this matches your filename in 'public'
              alt="TheHelpfulDev Logo"
              width={80}
              height={80}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
          Truly <span className="text-blue-600">helpful</span> tools <br />
          for everyday problems.
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Simple apps that help the community.
          <br />
          No ads, no tracking, just useful code.
          <br />
          Open source and supported by people like you.
        </p>
        <NewsletterForm />
      </header>
      {/* 2. THE DIRECTORY: Your Apps */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4 border-slate-200">The Toolbox</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* App 1: Fasting Tracker (LIVE) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
               <img src="/f-icon.png" alt="Panda" className="w-8 h-8 object-contain" />
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Intermittent Fasting Tracker</h3>
            <p className="text-slate-600 mb-6 h-12">
              A simple, distraction-free timer to track your fasting windows. No login required.
            </p>
           <a 
			  href="https://fasting.thehelpfuldev.com/"
			  target="_blank" 
			  rel="noopener noreferrer"
			  className="block text-center w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
			>
			  Launch App &rarr;
			</a>
          </div>

         {/* App 2: Potty Panda (LIVE) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <img src="/pp-icon.png" alt="Panda" className="w-8 h-8 object-contain" />
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Potty Panda</h3>
            <p className="text-slate-600 mb-6 h-12">
              Logging and timer tools to help parents through the potty training journey.
            </p>
            <a 
              href="https://pottypanda.thehelpfuldev.com/"
              target="_blank" 
              className="block text-center w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Launch App &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* 3. FOOTER: The Monetization */}
      <footer className="text-center py-12 px-6 border-t border-slate-200 mt-12 bg-white">
        <a 
          href="https://ko-fi.com/robogirl96" 
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-300 text-white font-bold rounded-full hover:bg-slate-600 transition-colors shadow-sm"
        >
          ☕ Buy me a coffee
        </a>
        <br/>
        <br/>
        {/* LOGO ADDED HERE */}
        <div className="flex justify-center mb-4 opacity-80">
          <Image
              src="/icon.png"    // Make sure this matches your filename in 'public'
              alt="TheHelpfulDev Logo"
              width={48}         // Adjust size (48px is a nice icon size)
              height={48}
          />
        </div>
      </footer>

    </main>
  );
}