import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, ShieldAlert, GitBranch, Terminal, Zap, Layers, ArrowRight, Sparkles, Database, Code2, Network, Cpu, Lock, Workflow, ChevronRight, X } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Advanced Cyber-Emerald & Electric Cyan Ambient Background
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
    {/* High-tech hex grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    
    {/* Attractive, advanced glowing orbs */}
    <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[130px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-cyan-600/20 blur-[130px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-indigo-600/20 blur-[130px] mix-blend-screen"></div>
  </div>
);

// Glassmorphic Nav
const Navbar = ({ onLogin, setPreview }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/80 backdrop-blur-2xl border-b border-emerald-500/10 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">BugRisk</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setPreview('/screenshots/03_graph_explorer.png')} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-300 hover:text-white bg-slate-900/50 hover:bg-emerald-500/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group">
              <Network className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400" />
              System Graph
            </button>
            <button onClick={() => setPreview('/screenshots/02_rules_explorer.png')} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-300 hover:text-white bg-slate-900/50 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group">
              <Database className="w-4 h-4 text-cyan-500 group-hover:text-cyan-400" />
              Rules Engine
            </button>
            <button onClick={() => setPreview('/screenshots/05_ml_analytics.png')} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-300 hover:text-white bg-slate-900/50 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group">
              <Activity className="w-4 h-4 text-indigo-500 group-hover:text-indigo-400" />
              ML Analytics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-sm font-bold text-slate-300 hover:text-white transition-colors">
            GitHub
          </a>
          <button 
            onClick={onLogin}
            className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]"
          >
            Deploy Engine
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = ({ onLogin }) => {
  return (
    <section id="engine" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-300 tracking-wide uppercase">Dataset Intelligence Engine v2.0</span>
          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[100px] font-black text-white tracking-tighter leading-[0.9] mb-8"
        >
          Stop Reacting.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Start Predicting.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-400 max-w-4xl font-light leading-relaxed mb-12"
        >
          Deploy the ultimate ML pattern analysis tool. Mine association rules across telemetry using <strong className="text-emerald-400 font-semibold">FP-Growth & Apriori</strong> to expose defect hotspots before your CI/CD pipeline breaks.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center"
        >
          <button 
            onClick={onLogin}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-extrabold text-lg hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            Initialize Platform
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900/50 border border-emerald-500/20 text-emerald-400 font-bold text-lg hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-3 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <Terminal className="w-5 h-5" />
            Explore API Docs
          </button>
        </motion.div>
      </div>

      {/* Advanced App Feature Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="mt-20 w-full max-w-[1300px] px-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 top-1/2"></div>
        <div className="relative rounded-t-3xl border border-cyan-500/20 bg-[#0B1120]/90 backdrop-blur-3xl overflow-hidden shadow-[0_0_120px_rgba(6,182,212,0.15)] ring-1 ring-white/10">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/10 bg-black/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="font-mono text-xs text-cyan-500/70 font-semibold tracking-widest">BUGRISK_ENGINE_TERMINAL // DRI_ACTIVE</div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              8-STAGE SSE LIVE
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Defect Risk Index Panel */}
            <div className="md:col-span-1 rounded-2xl border border-cyan-500/20 bg-black/50 p-6 flex flex-col justify-center items-center text-center shadow-[inset_0_0_30px_rgba(6,182,212,0.05)]">
               <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-4">Defect Risk Index (DRI)</div>
               <div className="relative flex items-center justify-center w-40 h-40">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="8" />
                   <circle cx="80" cy="80" r="70" fill="none" stroke="url(#cyan-grad)" strokeWidth="8" strokeDasharray="440" strokeDashoffset="44" className="animate-[spin_4s_linear_infinite]" />
                   <defs>
                     <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#10b981" />
                       <stop offset="100%" stopColor="#06b6d4" />
                     </linearGradient>
                   </defs>
                 </svg>
                 <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">90</div>
                 <div className="absolute bottom-6 text-[10px] text-emerald-400 font-mono">QUALITY_IDX</div>
               </div>
            </div>

            {/* Pattern Analysis Streaming */}
            <div className="md:col-span-3 rounded-2xl border border-emerald-500/20 bg-black/50 p-6 shadow-[inset_0_0_30px_rgba(16,185,129,0.05)]">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Jaccard Rule Deduplication Stream
                </div>
                <div className="text-xs font-mono text-slate-400">FastAPI // Spring Boot 3</div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { m: "auth_module", t: "jwt, java", risk: "CRITICAL", c: "94.3%", d: "0.89 DRI" },
                  { m: "payment_gateway", t: "stripe, node", risk: "HIGH", c: "88.1%", d: "0.75 DRI" },
                  { m: "user_session", t: "redis, cache", risk: "WARNING", c: "64.2%", d: "0.45 DRI" }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-3 rounded-lg hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-cyan-400 w-32 truncate">{row.m}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                      <span className="text-slate-400 hidden sm:block">{row.t}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-emerald-400 hidden md:block">lift: {(Math.random() * 5 + 1).toFixed(2)}x</span>
                      <span className="text-slate-300 font-semibold">{row.c}</span>
                      <span className={`px-3 py-1 rounded text-xs font-bold ${row.risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : row.risk === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'}`}>
                        {row.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Huge Advanced App Features
const AdvancedFeatures = () => {
  return (
    <section id="features" className="relative w-full py-32 z-10 bg-[#020617] border-y border-emerald-500/10">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Enterprise Intelligence</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            BugRisk is engineered with enterprise-grade machine learning algorithms to map the entire DNA of your codebase and prevent catastrophic failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="rounded-3xl border border-emerald-500/10 bg-slate-900/40 p-8 hover:bg-slate-800/40 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Network className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">FP-Growth & Apriori Mining</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Advanced association rule mining extracting deep correlation patterns across millions of telemetry events to find hidden failure vectors.
            </p>
          </div>

          {/* Feature 2: Dataset Intelligence */}
          <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/40 p-8 hover:bg-slate-800/40 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-all duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Database className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Dataset Intelligence Engine</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Automated ingestion profiling that computes schema validation, completeness scoring, and a dynamic 0-100 Quality Score Index instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl border border-indigo-500/10 bg-slate-900/40 p-8 hover:bg-slate-800/40 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Lock className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Jaccard Rule Deduplication</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the absolute highest-risk telemetry anomalies.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-3xl border border-blue-500/10 bg-slate-900/40 p-8 hover:bg-slate-800/40 transition-colors group relative overflow-hidden lg:col-span-2">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-500"></div>
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Workflow className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">8-Stage SSE Pipeline</h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  A revolutionary Server-Sent Events (SSE) architecture powered by Spring Boot 3 & Redis Cache to stream millions of processed metrics to your dashboard in milliseconds.
                </p>
              </div>
              <div className="flex-1 w-full bg-[#020617] border border-blue-500/20 rounded-xl p-6 font-mono text-xs text-blue-300/80 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-blue-500/20 pb-2">
                  <span className="font-bold text-blue-400">PIPELINE.LOG</span>
                  <span className="text-emerald-400 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>CONNECTED</span>
                </div>
                <div>&gt; [STAGE 1] CSV Ingestion Engine Started...</div>
                <div>&gt; [STAGE 3] Dataset Completeness Score: 98.4%</div>
                <div>&gt; [STAGE 5] FastAPI ML Microservice Triggered...</div>
                <div>&gt; [STAGE 7] Redis Cache Syncing...</div>
                <div className="text-white font-bold">&gt; [STAGE 8] Dashboard Streaming Active</div>
              </div>
            </div>
          </div>

          {/* Feature 5: DRI */}
          <div className="rounded-3xl border border-rose-500/10 bg-slate-900/40 p-8 hover:bg-slate-800/40 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[60px] group-hover:bg-rose-500/20 transition-all duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-8 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
              <Activity className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Defect Risk Index (DRI)</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Calculates a standardized risk index per module utilizing rule frequencies, category contributions, and severity modifiers.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;
      const target = parseFloat(value);
      const duration = 2500;

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(target * easeOutExpo);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Massive Stats
const StatsSection = () => (
  <section className="relative w-full py-32 z-10 bg-[#020617] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]"></div>
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border border-emerald-500/10 rounded-3xl p-12 bg-slate-900/30 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.05)]">
        {[
          { value: 2400, suffix: "+", decimals: 0, label: "Rules Mined", color: "from-emerald-400 to-cyan-400" },
          { value: 100, suffix: "", decimals: 0, label: "Quality Index", color: "from-cyan-400 to-blue-500" },
          { value: 5.54, suffix: "x", decimals: 2, label: "Lift Ratio", color: "from-indigo-400 to-purple-500" },
          { value: 18, suffix: "", decimals: 0, label: "Critical Hotspots", color: "from-rose-400 to-orange-500" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${stat.color} mb-4 drop-shadow-lg`}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Massive CTA
const CTASection = ({ onLogin }) => (
  <section className="relative w-full py-40 z-10 bg-[#020617] flex items-center justify-center border-t border-emerald-500/10 overflow-hidden">
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-600/20 to-cyan-500/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

    <div className="relative z-10 text-center max-w-4xl px-6">
      <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
        Protect your architecture with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Certainty.</span>
      </h2>
      <p className="text-xl text-slate-400 font-light mb-12">
        Deploy the complete BugRisk intelligence suite and eliminate production defects instantly.
      </p>
      
      <button 
        onClick={onLogin}
        className="px-12 py-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-extrabold text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)] hover:shadow-[0_0_80px_rgba(16,185,129,0.5)] flex items-center gap-3 mx-auto"
      >
        Deploy Engine Now
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-12 border-t border-emerald-500/10 bg-[#020617] z-10 relative">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3 text-white font-bold text-2xl">
        <Activity className="w-6 h-6 text-emerald-500" />
        BugRisk
      </div>
      <div className="flex gap-8 text-sm font-semibold text-slate-500">
        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
        <a href={GITHUB_URL} className="hover:text-emerald-400 transition-colors">GitHub</a>
      </div>
    </div>
  </footer>
);

const PreviewModal = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-6 animate-in fade-in duration-300">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-3 rounded-full bg-slate-900/50 text-slate-400 hover:text-white hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/50 transition-all shadow-xl"
      >
        <X className="w-6 h-6" />
      </button>
      <img src={src} alt="Feature Preview" className="max-w-full max-h-full rounded-2xl border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.15)] object-contain" />
    </div>
  );
};

const LandingPage = ({ onLogin }) => {
  const [preview, setPreview] = useState(null);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 selection:text-white font-sans overflow-x-hidden">
      <AmbientBackground />
      <Navbar onLogin={onLogin} setPreview={setPreview} />
      <main>
        <HeroSection onLogin={onLogin} />
        <AdvancedFeatures />
        <StatsSection />
        <CTASection onLogin={onLogin} />
      </main>
      <Footer />
      {preview && <PreviewModal src={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default LandingPage;
