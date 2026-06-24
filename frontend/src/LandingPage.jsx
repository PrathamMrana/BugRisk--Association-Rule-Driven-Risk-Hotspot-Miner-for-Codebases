import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Activity, ShieldAlert, ChevronRight, ExternalLink, BarChart2, Zap, GitMerge, Search, LayoutDashboard } from 'lucide-react';

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
          
          <div className="hidden md:flex items-center gap-2 bg-[#0A0A0A]/50 border border-amber-500/10 p-1.5 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative">
            {[
              { label: 'Graph Explorer', tab: 'graph', icon: GitMerge },
              { label: 'Rules Explorer', tab: 'rules', icon: Search },
              { label: 'Module Hotspots', tab: 'dashboard', icon: LayoutDashboard },
              { label: 'ML Analytics', tab: 'analytics', icon: Zap }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(item.tab)} 
                className="group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Top border highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                <item.icon className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors z-10" />
                <span className="text-slate-400 group-hover:text-white transition-colors z-10 tracking-wide drop-shadow-md">
                  {item.label}
                </span>
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
            <span className="relative z-10">Launch Demo</span>
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

const ProductPreview = () => {
  return (
    <section className="relative z-10 pb-32 px-6 max-w-7xl mx-auto">
      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-amber-500/30 rounded-2xl p-2 md:p-4 shadow-[0_0_60px_rgba(245,158,11,0.15)] overflow-hidden">
        <div className="aspect-[16/9] w-full bg-[#030303] rounded-xl border border-amber-500/20 relative overflow-hidden flex flex-col shadow-inner">
          
          {/* Mock UI Header */}
          <div className="h-12 border-b border-amber-500/20 flex items-center justify-between px-4 bg-[#0A0A0A]/80 relative z-20">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-rose-500/80" />
               <div className="w-3 h-3 rounded-full bg-amber-500/80" />
               <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
             </div>
             <div className="flex items-center gap-4 text-xs font-mono text-amber-500/70">
                <span className="flex items-center gap-1"><Network className="w-3 h-3"/> TOPOLOGY_SYNC: OK</span>
                <span className="flex items-center gap-1"><Database className="w-3 h-3"/> MINER: ACTIVE</span>
             </div>
          </div>

          {/* Mock UI Body */}
          <div className="flex-1 flex relative z-10">
            {/* Sidebar */}
            <div className="w-64 border-r border-amber-500/10 p-4 hidden md:flex flex-col gap-4 bg-[#050505]">
              <div className="text-xs font-bold text-amber-500/50 uppercase tracking-widest mb-2">High Risk Modules</div>
              {[85, 72, 64, 45, 22].map((score, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>auth_service.py</span>
                    <span className={score > 70 ? 'text-rose-400' : 'text-amber-400'}>{score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                      className={`h-full ${score > 70 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 relative overflow-hidden flex flex-col gap-6">
              {/* Top Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Nodes", value: "1,204", icon: Database },
                  { label: "Rules Mined", value: "342", icon: Activity },
                  { label: "System Risk", value: "Critical", icon: ShieldAlert, color: "text-rose-400" }
                ].map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    key={i} 
                    className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-20"><stat.icon className="w-8 h-8 text-amber-500"/></div>
                    <span className="text-[10px] text-amber-500/60 uppercase tracking-wider">{stat.label}</span>
                    <span className={`text-2xl font-bold ${stat.color || 'text-slate-200'}`}>{stat.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Network Graph Visualization */}
              <div className="flex-1 bg-[#0A0A0A]/50 border border-amber-500/10 rounded-lg relative overflow-hidden flex items-center justify-center">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Mock Nodes */}
                <div className="relative w-full h-full max-w-lg max-h-64">
                  {/* Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(245,158,11,0.3)" strokeWidth="2" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }} x1="80%" y1="40%" x2="50%" y2="50%" stroke="rgba(245,158,11,0.3)" strokeWidth="2" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} x1="50%" y1="50%" x2="40%" y2="80%" stroke="rgba(244,63,94,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} x1="50%" y1="50%" x2="70%" y2="70%" stroke="rgba(245,158,11,0.3)" strokeWidth="2" />
                  </svg>
                  
                  {/* Nodes */}
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[30%] left-[20%] w-8 h-8 bg-[#0A0A0A] border-2 border-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"><Network className="w-4 h-4 text-amber-500"/></motion.div>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[40%] left-[80%] w-6 h-6 bg-[#0A0A0A] border-2 border-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)] -translate-x-1/2 -translate-y-1/2" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-[80%] left-[40%] w-10 h-10 bg-[#0A0A0A] border-2 border-rose-500 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.6)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-rose-500"/></motion.div>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute top-[70%] left-[70%] w-6 h-6 bg-[#0A0A0A] border-2 border-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)] -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Central Hub */}
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[50%] left-[50%] w-16 h-16 bg-[#0A0A0A] border-2 border-amber-400 rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.6)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <Database className="w-8 h-8 text-amber-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlay to blur edges slightly */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(3,3,3,1)]"></div>
          
          {/* Call to action overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 z-30">
            <BarChart2 className="w-16 h-16 text-amber-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Interactive Dashboard Preview</h3>
            <p className="text-amber-500/80 mb-6 font-bold tracking-wide">No sign in required. Explore instantly.</p>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-amber-500 text-black font-bold rounded-md hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              Launch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

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
