import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Activity, ShieldAlert, ChevronRight, ExternalLink, BarChart2 } from 'lucide-react';

const IntelligenceBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#030303] overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent opacity-50 blur-[100px]" />
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#030303]/90 backdrop-blur-2xl border-amber-500/20 shadow-[0_10px_40px_rgba(245,158,11,0.1)] py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogin}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A0A0A] border border-amber-500/30 group-hover:border-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">BugRisk</span>
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
                className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="group relative px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#030303] text-sm font-bold rounded-md hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10">{isLoggedIn ? 'Go to Dashboard' : 'Launch Demo'}</span>
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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-8 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
    >
      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
      FP-Growth & Apriori Engines Active
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-6 drop-shadow-lg"
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
        className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#030303] font-bold rounded-md hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center gap-2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span className="relative z-10 flex items-center gap-2">Launch Demo <ChevronRight className="w-4 h-4" /></span>
      </button>
      <button 
        onClick={() => window.open('https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases', '_blank')}
        className="px-6 py-3 bg-[#0A0A0A] border border-amber-500/20 text-white font-medium rounded-md hover:border-amber-500/50 hover:bg-amber-500/5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.05)] flex items-center gap-2"
      >
        View Architecture
      </button>
    </motion.div>
  </section>
);

const TechStack = () => (
  <section className="relative z-10 py-10 border-y border-amber-500/10 bg-[#0A0A0A]/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-bold text-amber-500/60 uppercase tracking-widest mb-6">Trusted Technology Stack</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-400 font-medium">
        <span className="hover:text-amber-400 transition-colors cursor-default">React</span>
        <span className="hover:text-amber-400 transition-colors cursor-default">Spring Boot</span>
        <span className="hover:text-amber-400 transition-colors cursor-default">FastAPI</span>
        <span className="hover:text-amber-400 transition-colors cursor-default">PostgreSQL</span>
        <span className="hover:text-amber-400 transition-colors cursor-default">Redis</span>
        <span className="hover:text-amber-400 transition-colors cursor-default">Docker</span>
      </div>
    </div>
  </section>
);

const CoreCapabilities = () => (
  <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 drop-shadow-md">Core Capabilities</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">Powerful data mining engines backing a dense, interactive dashboard.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-amber-500/10 p-8 rounded-2xl hover:border-amber-500/30 transition-all shadow-[0_0_20px_rgba(245,158,11,0.02)] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] group">
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Database className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">Dataset Intelligence</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Validate telemetry datasets and measure data quality automatically before mining begins.
        </p>
      </div>
      
      <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-amber-500/10 p-8 rounded-2xl hover:border-amber-500/30 transition-all shadow-[0_0_20px_rgba(245,158,11,0.02)] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] group">
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">Risk Hotspot Detection</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Identify modules with recurring defect patterns and compute dynamic risk scores instantly.
        </p>
      </div>
      
      <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-amber-500/10 p-8 rounded-2xl hover:border-amber-500/30 transition-all shadow-[0_0_20px_rgba(245,158,11,0.02)] hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] group">
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Network className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">Association Rule Mining</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Discover hidden relationships using highly optimized FP-Growth and Apriori algorithms.
        </p>
      </div>
    </div>
  </section>
);

const ProductPreview = () => (
  <section className="relative z-10 pb-32 px-6 max-w-7xl mx-auto">
    <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-2 md:p-4 shadow-[0_0_40px_rgba(245,158,11,0.1)] overflow-hidden">
      <div className="aspect-[16/9] w-full bg-[#030303] rounded-xl border border-amber-500/10 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
        <BarChart2 className="w-16 h-16 text-amber-500/30 mb-4 relative z-10" />
        <p className="text-amber-500/60 font-medium relative z-10 tracking-wide">Interactive Dashboard Preview</p>
        <p className="text-slate-500 text-sm mt-2 relative z-10">Sign in to access live visualizers</p>
        
        {/* Mock UI Overlay to make it look somewhat like the app */}
        <div className="absolute top-0 left-0 right-0 h-12 border-b border-amber-500/10 flex items-center px-4 gap-4 bg-[#0A0A0A]/50">
           <div className="w-3 h-3 rounded-full bg-slate-800" />
           <div className="w-3 h-3 rounded-full bg-slate-800" />
           <div className="w-3 h-3 rounded-full bg-slate-800" />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative z-10 border-t border-amber-500/10 bg-[#030303] py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-amber-500" />
        <span className="font-bold text-white tracking-tight">BugRisk</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">GitHub</a>
        <a href="#" className="hover:text-amber-400 transition-colors">Documentation</a>
        <a href="#" className="hover:text-amber-400 transition-colors">Live Demo</a>
        <a href="https://github.com/PrathamMrana" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">Developer <ExternalLink className="w-3 h-3" /></a>
      </div>
    </div>
  </footer>
);

export default function LandingPage({ onLogin, isLoggedIn, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-amber-500/30 selection:text-white font-sans overflow-x-hidden">
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
