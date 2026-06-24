import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Activity, ShieldAlert, ChevronRight, ExternalLink, BarChart2 } from 'lucide-react';

const IntelligenceBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden pointer-events-none">
    {/* Subtle grid and gradient matching Vercel/Linear dark mode */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-50 blur-[100px]" />
  </div>
);

const Navbar = ({ onNavigate, isLoggedIn, onLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onLogin}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
              <ShieldAlert className="h-4 w-4 text-indigo-400" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">BugRisk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Graph Explorer', tab: 'graph' },
              { label: 'Rules Explorer', tab: 'rules' },
              { label: 'Module Hotspots', tab: 'dashboard' },
              { label: 'ML Analytics', tab: 'analytics' }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(item.tab)} 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-slate-200 transition-colors shadow-sm"
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Launch Demo'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ onNavigate }) => (
  <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8"
    >
      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
      FP-Growth & Apriori Engines Active
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-6"
    >
      Predict Software Risk <br className="hidden md:block"/> Before Production
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
    >
      Association Rule–Driven Defect Intelligence Platform. Discover hidden relationships in your codebase and identify risk hotspots instantly.
    </motion.p>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex items-center gap-4"
    >
      <button 
        onClick={() => onNavigate('dashboard')}
        className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-slate-200 transition-colors shadow-lg flex items-center gap-2"
      >
        Launch Demo <ChevronRight className="w-4 h-4" />
      </button>
      <button 
        onClick={() => window.open('https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases', '_blank')}
        className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-md hover:bg-white/10 transition-colors flex items-center gap-2"
      >
        View Architecture
      </button>
    </motion.div>
  </section>
);

const TechStack = () => (
  <section className="relative z-10 py-10 border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Trusted Technology Stack</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-400 font-medium">
        <span>React</span>
        <span>Spring Boot</span>
        <span>FastAPI</span>
        <span>PostgreSQL</span>
        <span>Redis</span>
        <span>Docker</span>
      </div>
    </div>
  </section>
);

const CoreCapabilities = () => (
  <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Core Capabilities</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">Powerful data mining engines backing a dense, interactive dashboard.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
          <Database className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Dataset Intelligence</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Validate telemetry datasets and measure data quality automatically before mining begins.
        </p>
      </div>
      
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
          <ShieldAlert className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Risk Hotspot Detection</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Identify modules with recurring defect patterns and compute dynamic risk scores instantly.
        </p>
      </div>
      
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6">
          <Network className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Association Rule Mining</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Discover hidden relationships using highly optimized FP-Growth and Apriori algorithms.
        </p>
      </div>
    </div>
  </section>
);

const ProductPreview = () => (
  <section className="relative z-10 pb-32 px-6 max-w-7xl mx-auto">
    <div className="bg-[#111] border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl overflow-hidden">
      <div className="aspect-[16/9] w-full bg-[#0A0A0A] rounded-xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
        <BarChart2 className="w-16 h-16 text-slate-800 mb-4" />
        <p className="text-slate-500 font-medium">Interactive Dashboard Preview</p>
        <p className="text-slate-600 text-sm">Sign in to access live visualizers</p>
        {/* Mock UI Overlay to make it look somewhat like the app */}
        <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/5 flex items-center px-4 gap-4 opacity-50">
           <div className="w-3 h-3 rounded-full bg-slate-800" />
           <div className="w-3 h-3 rounded-full bg-slate-800" />
           <div className="w-3 h-3 rounded-full bg-slate-800" />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative z-10 border-t border-white/10 bg-[#0A0A0A] py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-indigo-400" />
        <span className="font-semibold text-white">BugRisk</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Documentation</a>
        <a href="#" className="hover:text-white transition-colors">Live Demo</a>
        <a href="https://github.com/PrathamMrana" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Developer <ExternalLink className="w-3 h-3" /></a>
      </div>
    </div>
  </footer>
);

export default function LandingPage({ onLogin, isLoggedIn, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 selection:bg-indigo-500/30 selection:text-white font-sans overflow-x-hidden">
      <IntelligenceBackground />
      <Navbar onLogin={onLogin} isLoggedIn={isLoggedIn} onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <TechStack />
      <CoreCapabilities />
      <ProductPreview />
      <Footer />
    </div>
  );
}
