import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Terminal, ArrowRight, Database, Network, Target, ChevronRight, Zap, Shield } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Deep, Powerful Intelligence Grid with Scanning Effect
const IntelligenceBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#030303] overflow-hidden pointer-events-none">
    {/* Base Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40"></div>
    
    {/* Deep Amber Ambient Glows */}
    <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[180px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '6s' }}></div>
    <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[150px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
    
    {/* Animated Radar/Scan Line */}
    <motion.div 
      animate={{ y: ['-100%', '200%'] }}
      transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      className="absolute top-0 left-0 w-full h-1 bg-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.8)] z-0"
    ></motion.div>
  </div>
);

const SystemStatus = () => {
  const [status, setStatus] = useState({ backend: "Connecting...", mlService: "Connecting..." });
  
  useEffect(() => {
    fetch('https://bugrisk-backend.onrender.com/api/v1/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ backend: "Offline", mlService: "Offline" }));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-28 left-6 flex flex-col gap-3 font-mono text-[10px] sm:text-xs z-50 p-4 bg-[#050505]/80 border border-amber-500/20 backdrop-blur-md rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.05)]"
    >
      <div className="text-amber-500/60 mb-1 tracking-[0.2em] font-bold border-b border-amber-500/20 pb-2 flex items-center gap-2">
        <Target className="w-3 h-3"/> CORE_SYSTEMS_LINK
      </div>
      <div className="flex items-center gap-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
        </span>
        <span className="text-slate-400 w-24 tracking-widest">GATEWAY</span>
        <span className="text-amber-500 font-bold uppercase">Online</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`relative flex h-2.5 w-2.5 ${status.backend === 'Online' ? '' : 'grayscale opacity-50'}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
        </span>
        <span className="text-slate-400 w-24 tracking-widest">ENGINE</span>
        <span className={`font-bold uppercase ${status.backend === 'Online' ? 'text-amber-500' : 'text-slate-500'}`}>
          {status.backend || 'Warming Up'}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`relative flex h-2.5 w-2.5 ${status.mlService === 'Online' ? '' : 'grayscale opacity-50'}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
        </span>
        <span className="text-slate-400 w-24 tracking-widest">ML_CORE</span>
        <span className={`font-bold uppercase ${status.mlService === 'Online' ? 'text-amber-500' : 'text-slate-500'}`}>
          {status.mlService || 'Warming Up'}
        </span>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onLogin, isLoggedIn }) => {
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#030303]/90 backdrop-blur-2xl border-b border-amber-500/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)] py-4' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={onLogin}>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#101010] to-[#050505] border border-amber-500/30 group-hover:border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Activity className="h-6 w-6 text-amber-500 relative z-10" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter uppercase group-hover:text-amber-400 transition-colors duration-500">BugRisk</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 bg-[#050505]/80 p-1.5 rounded-lg border border-amber-500/10 backdrop-blur-xl">
            {[
              { icon: Network, label: 'Topology Map' },
              { icon: Database, label: 'Rules Engine' },
              { icon: Activity, label: 'Analytics' }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={onLogin} 
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-all uppercase rounded-md group relative overflow-hidden"
              >
                <item.icon className="w-4 h-4 text-slate-500 group-hover:text-amber-500 transition-colors" /> 
                <span className="tracking-widest">{item.label}</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
            Source_Code
          </a>
          <button 
            onClick={onLogin}
            className="group relative px-8 py-3.5 bg-amber-500 text-[#030303] font-black text-xs uppercase tracking-[0.2em] overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              {isLoggedIn ? 'Access Platform' : 'Deploy Engine'} <Zap className="w-4 h-4"/>
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-[2px] -z-10 text-amber-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 mix-blend-screen">{text}</span>
      <span className="absolute top-0 -left-[2px] -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 mix-blend-screen">{text}</span>
    </div>
  );
};

const HeroSection = ({ onLogin, isLoggedIn }) => {
  return (
    <section id="engine" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 overflow-hidden">
      <SystemStatus />
      
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center mt-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 border border-amber-500/40 bg-[#050505]/80 backdrop-blur-xl font-mono text-[10px] text-amber-500 uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(245,158,11,0.15)] rounded-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
          <Shield className="w-4 h-4" />
          Defect Intelligence Platform v2.0
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.95] mb-10 uppercase text-white drop-shadow-2xl"
        >
          Predictive <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 filter drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
            <GlitchText text="Analytics." />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-400 max-w-4xl font-mono leading-relaxed mb-16 tracking-tight"
        >
          Ingest. Process. Prevent. <br className="hidden md:block"/>
          Mine association rules across telemetry using <strong className="text-amber-400">FP-Growth & Apriori</strong> algorithms to expose critical defect hotspots before your CI/CD breaks.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center font-mono"
        >
          <button 
            onClick={onLogin}
            className="group relative w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#030303] font-black text-sm hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] hover:-translate-y-1 rounded-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              {isLoggedIn ? 'Initialize Protocol' : 'Initialize Protocol'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button onClick={onLogin} className="w-full sm:w-auto px-12 py-5 border-2 border-slate-800 bg-[#050505]/50 backdrop-blur-md text-slate-300 font-bold text-sm hover:bg-[#0A0A0A] hover:border-amber-500/50 hover:text-white transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] rounded-md group">
            <Terminal className="w-5 h-5 text-amber-500 group-hover:animate-pulse" />
            Read Manual
          </button>
        </motion.div>
      </div>

      {/* Ultra-Powerful High-Tech Terminal Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-32 w-full max-w-[1400px] px-6 relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-xl blur-2xl opacity-50"></div>
        <div className="relative border-2 border-slate-800/80 bg-[#030303]/90 backdrop-blur-3xl overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.9)] rounded-xl ring-1 ring-white/5">
          
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-800/80 bg-[#050505]">
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-800 hover:bg-rose-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-slate-800 hover:bg-amber-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-slate-800 hover:bg-emerald-500 transition-colors"></div>
              </div>
              <div className="font-mono text-[10px] text-slate-400 tracking-[0.3em] uppercase border-l-2 border-slate-800 pl-6">BugRisk_Core // Root_Access</div>
            </div>
            <div className="flex items-center gap-3 text-amber-500 font-mono text-[10px] px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 rounded-md shadow-[0_0_15px_rgba(245,158,11,0.15)] tracking-widest font-bold uppercase">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
              Synchronized
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
            
            {/* DRI Power Panel */}
            <div className="md:col-span-3 border-r-2 border-slate-800/80 bg-[#050505]/50 p-8 flex flex-col justify-center items-center text-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <Activity className="w-12 h-12 text-amber-500/30 mb-6 absolute top-8" />
               <div className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.3em] mb-6 font-bold relative z-10">System DRI</div>
               <div className="text-8xl font-mono font-black text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10 tracking-tighter">90</div>
               <div className="text-[10px] text-slate-500 font-mono tracking-widest relative z-10 bg-slate-900 px-3 py-1 rounded">QUALITY_INDEX_CRITICAL</div>
            </div>

            {/* Live Data Stream */}
            <div className="md:col-span-9 bg-[#030303]/80 p-8 relative">
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-8 border-b-2 border-slate-800/80 pb-6 relative z-10">
                <div className="text-sm font-mono text-amber-500 flex items-center gap-3 uppercase tracking-[0.2em] font-bold">
                  <Network className="w-5 h-5 animate-pulse" />
                  Jaccard Deduplication Engine
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest">THROUGHPUT: 15.4K/S</div>
              </div>
              
              <div className="space-y-5 font-mono text-xs relative z-10">
                {[
                  { m: "auth_module_v2", t: "jwt, java, sec", risk: "CRITICAL", c: "94.3%", d: "0.89 DRI", lift: "5.42x" },
                  { m: "payment_gateway", t: "stripe, node, api", risk: "HIGH", c: "88.1%", d: "0.75 DRI", lift: "4.12x" },
                  { m: "user_session_store", t: "redis, cache, mem", risk: "WARNING", c: "64.2%", d: "0.45 DRI", lift: "2.88x" },
                  { m: "notification_svc", t: "kafka, stream, evt", risk: "INFO", c: "42.8%", d: "0.15 DRI", lift: "1.24x" }
                ].map((row, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
                    key={i} 
                    className="flex items-center justify-between bg-[#050505] border border-slate-800 p-4 rounded-md hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-white font-bold tracking-wider w-40 truncate">{row.m}</span>
                      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-amber-500 transition-colors" />
                      <span className="text-slate-500 hidden sm:block tracking-widest">{row.t}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-slate-600 hidden lg:block tracking-widest">lift:{row.lift}</span>
                      <span className="text-amber-500 font-black text-sm drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">{row.c}</span>
                      <span className={`px-4 py-1.5 text-[10px] border-2 tracking-[0.2em] font-black uppercase rounded-sm w-28 text-center
                        ${row.risk === 'CRITICAL' ? 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-[0_0_15px_rgba(243,24,70,0.2)]' : 
                          row.risk === 'HIGH' ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
                          row.risk === 'WARNING' ? 'border-yellow-500/50 text-yellow-500' : 'border-slate-600 text-slate-500'}`}>
                        {row.risk}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Extremely Powerful Architecture Section
const AdvancedFeatures = () => {
  return (
    <section id="features" className="relative w-full py-40 z-10 bg-[#030303] border-y-2 border-slate-800/80">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">System Architecture</h2>
          <p className="text-base md:text-lg text-slate-400 max-w-4xl mx-auto font-mono leading-relaxed tracking-tight">
            BugRisk is engineered with enterprise-grade machine learning algorithms to map the entire DNA of your codebase and preemptively isolate failure vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
          
          <div className="border-2 border-slate-800/80 bg-[#050505] p-10 hover:bg-[#0A0A0A] hover:border-amber-500/40 transition-all duration-500 group relative overflow-hidden rounded-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            <Network className="w-10 h-10 text-amber-500 mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">FP-Growth & Apriori</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Advanced association rule mining extracting deep correlation patterns across millions of telemetry events to find hidden failure vectors.
            </p>
          </div>

          <div className="border-2 border-slate-800/80 bg-[#050505] p-10 hover:bg-[#0A0A0A] hover:border-amber-500/40 transition-all duration-500 group relative overflow-hidden rounded-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            <Activity className="w-10 h-10 text-amber-500 mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">Defect Risk Index</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Automated ingestion profiling that computes schema validation, completeness scoring, and a dynamic Quality Score Index instantly.
            </p>
          </div>

          <div className="border-2 border-slate-800/80 bg-[#050505] p-10 hover:bg-[#0A0A0A] hover:border-amber-500/40 transition-all duration-500 group relative overflow-hidden rounded-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
            <Database className="w-10 h-10 text-amber-500 mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">Jaccard Deduplication</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk anomalies.
            </p>
          </div>

          <div className="border-2 border-slate-800/80 bg-[#050505] p-10 lg:col-span-3 flex flex-col md:flex-row gap-16 hover:border-amber-500/30 transition-all duration-500 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold tracking-[0.3em] uppercase rounded-sm mb-8 w-max">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Mission Critical
              </div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-widest">8-Stage SSE Pipeline</h3>
              <p className="text-slate-400 leading-relaxed text-base">
                A Server-Sent Events (SSE) architecture powered by Spring Boot 3 & Redis Cache to stream millions of processed metrics to your dashboard in milliseconds. Built to handle massive enterprise scale.
              </p>
            </div>
            
            <div className="flex-1 w-full border-2 border-slate-800 bg-[#030303] p-8 text-xs text-slate-500 shadow-inner relative z-10 rounded-md">
              <div className="flex items-center justify-between mb-6 border-b-2 border-slate-800 pb-4">
                <span className="font-bold text-amber-500 tracking-widest flex items-center gap-3"><Terminal className="w-4 h-4"/> PIPELINE_STREAM.LOG</span>
                <span className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-widest">*Realtime Replay</span>
              </div>
              <div className="space-y-3 font-mono">
                <div className="text-slate-400">&gt; [SYS] Establishing secure connection to FastAPI ML Service... <span className="text-amber-500 font-bold">OK</span></div>
                <div>&gt; [STG_1] Ingesting 15,482 enterprise telemetry records...</div>
                <div>&gt; [STG_2] Profiling dataset schema... Quality Score: 98.4%</div>
                <div>&gt; [STG_3] Initializing FP-Growth Engine (minSupport=0.15, minConfidence=0.7)</div>
                <div className="text-amber-500 font-bold drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">&gt; [MINER] Generated 2,403 raw association rules in 0.43s</div>
                <div>&gt; [STG_4] Executing Jaccard Deduplication Pass (threshold=0.85)...</div>
                <div className="text-amber-500 font-bold drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">&gt; [MINER] Retained 18 high-confidence risk hotspots</div>
                <div className="text-white font-black">&gt; [STG_8] Syncing to Redis & Streaming payload... <span className="text-amber-500 animate-pulse">ACTIVE</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function LandingPage({ onLogin, isLoggedIn }) {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      <IntelligenceBackground />
      <Navbar onLogin={onLogin} isLoggedIn={isLoggedIn} />
      <HeroSection onLogin={onLogin} isLoggedIn={isLoggedIn} />
      <AdvancedFeatures />
    </div>
  );
}
