import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, GitBranch, Terminal, Layers, ArrowRight, Database, Network, Workflow, ChevronRight } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Strict Grid Background with Advanced Subtlety
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
    {/* Monotone grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
    {/* Subtle amber ambient glow in the center */}
    <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[150px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '8s' }}></div>
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
    <div className="absolute top-24 left-6 flex flex-col gap-2 font-mono text-xs z-50">
      <div className="text-slate-500 mb-1 tracking-widest font-bold">SYSTEM STATUS</div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
        <span className="text-slate-300 w-24">Frontend:</span>
        <span className="text-amber-500 font-bold">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.backend === 'Online' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(243,24,70,0.6)]'}`}></span>
        <span className="text-slate-300 w-24">Backend:</span>
        <span className={`font-bold ${status.backend === 'Online' ? 'text-amber-500' : 'text-rose-500'}`}>
          {status.backend || 'Warming Up'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.mlService === 'Online' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(243,24,70,0.6)]'}`}></span>
        <span className="text-slate-300 w-24">ML Service:</span>
        <span className={`font-bold ${status.mlService === 'Online' ? 'text-amber-500' : 'text-rose-500'}`}>
          {status.mlService || 'Warming Up'}
        </span>
      </div>
    </div>
  );
};

// Strict Monochrome Nav - Made Advanced and Clickable
const Navbar = ({ onLogin }) => {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogin}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all">
              <Activity className="h-5 w-5 text-[#050505]" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight uppercase group-hover:text-amber-500 transition-colors">BugRisk</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 font-mono bg-white/5 px-2 py-1.5 rounded border border-white/5 backdrop-blur-md">
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-[#050505] hover:bg-amber-500 transition-all uppercase rounded group">
              <Network className="w-4 h-4 text-slate-400 group-hover:text-[#050505] transition-colors" /> [ Topology Map ]
            </button>
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-[#050505] hover:bg-amber-500 transition-all uppercase rounded group">
              <Database className="w-4 h-4 text-slate-400 group-hover:text-[#050505] transition-colors" /> [ Rules Engine ]
            </button>
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-[#050505] hover:bg-amber-500 transition-all uppercase rounded group">
              <Activity className="w-4 h-4 text-slate-400 group-hover:text-[#050505] transition-colors" /> [ Analytics ]
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase">
            GitHub
          </a>
          <button 
            onClick={onLogin}
            className="px-6 py-2.5 bg-amber-500 text-[#050505] font-bold text-xs hover:bg-amber-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center gap-2 rounded-sm"
          >
            Deploy Engine <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = ({ onLogin }) => {
  return (
    <section id="engine" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 overflow-hidden">
      <SystemStatus />
      
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-amber-500/30 bg-amber-500/10 backdrop-blur-md font-mono text-xs text-amber-500 uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.1)] rounded-sm"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Engineering Intelligence Platform v2.0
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[1.05] mb-8 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500"
        >
          Predictive Risk <br/><span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">Analytics.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl font-mono leading-relaxed mb-12"
        >
          Deploy the ultimate ML pattern analysis tool. Mine association rules across telemetry using <strong className="text-amber-500">FP-Growth & Apriori</strong> to expose defect hotspots before your CI/CD pipeline breaks.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center font-mono"
        >
          <button 
            onClick={onLogin}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#050505] font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 rounded-sm"
          >
            Initialize Platform
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onLogin} className="w-full sm:w-auto px-10 py-4 border border-slate-700 bg-white/5 backdrop-blur-sm text-slate-300 font-bold text-sm hover:bg-white/10 hover:border-slate-500 transition-all flex items-center justify-center gap-3 uppercase tracking-widest rounded-sm">
            <Terminal className="w-4 h-4 text-amber-500" />
            Explore Documentation
          </button>
        </motion.div>
      </div>

      {/* Austere App Feature Mockup - Upgraded */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-20 w-full max-w-[1300px] px-6 relative"
      >
        <div className="relative border border-slate-800 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl ring-1 ring-white/5 rounded-sm">
          
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-[#050505]/90">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              </div>
              <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase ml-4">BUGRISK_ENGINE_TERMINAL // DRI_ACTIVE</div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] px-3 py-1 border border-amber-500/20 bg-amber-500/10 rounded-sm shadow-[0_0_10px_rgba(245,158,11,0.1)]">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              LIVE DATA STREAM
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
            
            {/* Defect Risk Index Panel */}
            <div className="md:col-span-1 border border-slate-800 bg-[#080808]/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center shadow-inner hover:border-amber-500/30 transition-colors duration-500">
               <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-4 font-bold">Defect Risk Index (DRI)</div>
               <div className="text-6xl font-mono text-white mb-2 drop-shadow-md">90</div>
               <div className="text-[10px] text-slate-500 font-mono">QUALITY_IDX</div>
            </div>

            {/* Pattern Analysis Streaming */}
            <div className="md:col-span-3 border border-slate-800 bg-[#080808]/80 backdrop-blur-sm p-6 shadow-inner hover:border-white/10 transition-colors duration-500">
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div className="text-xs font-mono text-amber-500 flex items-center gap-3 uppercase tracking-widest font-bold">
                  <Database className="w-4 h-4" />
                  Jaccard Rule Deduplication Stream
                </div>
              </div>
              <div className="space-y-4 font-mono text-xs">
                {[
                  { m: "auth_module", t: "jwt, java", risk: "CRITICAL", c: "94.3%", d: "0.89 DRI" },
                  { m: "payment_gateway", t: "stripe, node", risk: "HIGH", c: "88.1%", d: "0.75 DRI" },
                  { m: "user_session", t: "redis, cache", risk: "WARNING", c: "64.2%", d: "0.45 DRI" }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-3 hover:bg-white/[0.02] -mx-4 px-4 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-200 font-semibold w-32 truncate">{row.m}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />
                      <span className="text-slate-500 hidden sm:block">{row.t}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-slate-500 hidden md:block">lift: {(Math.random() * 5 + 1).toFixed(2)}x</span>
                      <span className="text-amber-500 font-bold">{row.c}</span>
                      <span className={`px-3 py-1 text-[10px] border tracking-wider font-bold uppercase rounded-sm ${row.risk === 'CRITICAL' ? 'border-rose-500/50 bg-rose-500/10 text-rose-500' : row.risk === 'HIGH' ? 'border-amber-500/50 bg-amber-500/10 text-amber-500' : 'border-slate-500/50 bg-slate-500/10 text-slate-400'}`}>
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
    <section id="features" className="relative w-full py-32 z-10 bg-[#050505] border-y border-slate-800">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">System Architecture</h2>
          <p className="text-sm text-slate-400 max-w-3xl mx-auto font-mono leading-relaxed">
            BugRisk is engineered with machine learning algorithms to map the entire DNA of your codebase and isolate failure vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          
          <div className="border border-slate-800 bg-[#0A0A0A] p-8 hover:bg-[#0D0D0D] hover:border-slate-700 transition-colors cursor-default">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-3"><Network className="w-5 h-5"/> FP-Growth & Apriori</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Advanced association rule mining extracting deep correlation patterns across millions of telemetry events to find hidden failure vectors.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#0A0A0A] p-8 hover:bg-[#0D0D0D] hover:border-slate-700 transition-colors cursor-default">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-3"><Activity className="w-5 h-5"/> Defect Risk Index</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Automated ingestion profiling that computes schema validation, completeness scoring, and a dynamic Quality Score Index instantly.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#0A0A0A] p-8 lg:col-span-1 hover:bg-[#0D0D0D] hover:border-slate-700 transition-colors cursor-default">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-3"><Database className="w-5 h-5"/> Jaccard Deduplication</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk anomalies.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#0A0A0A] p-8 lg:col-span-3 flex flex-col md:flex-row gap-10 hover:border-amber-500/30 transition-colors">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                8-Stage SSE Pipeline
              </h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                A Server-Sent Events (SSE) architecture powered by Spring Boot 3 & Redis Cache to stream millions of processed metrics to your dashboard in milliseconds.
              </p>
            </div>
            <div className="flex-1 w-full border border-slate-800 bg-[#050505] p-6 text-xs text-slate-500 shadow-inner">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <span className="font-bold text-amber-500">DEMO_PIPELINE_REPLAY.LOG</span>
                <span className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">*Based on real completed scan</span>
              </div>
              <div className="space-y-2 font-mono">
                <div className="text-slate-400">&gt; [INFO] Connecting to FastAPI ML Service... <span className="text-amber-500">OK</span></div>
                <div>&gt; [STAGE 1] Ingesting 15,482 telemetry records...</div>
                <div>&gt; [STAGE 2] Profiling dataset... Quality Score: 98.4%</div>
                <div>&gt; [STAGE 3] Executing FP-Growth Algorithm (minSupport=0.15, minConfidence=0.7)</div>
                <div className="text-amber-500 font-bold">&gt; [MINER] Generated 2,403 raw association rules in 0.43s</div>
                <div>&gt; [STAGE 4] Applying Jaccard Deduplication (threshold=0.85)...</div>
                <div className="text-amber-500 font-bold">&gt; [MINER] Retained 18 high-confidence risk hotspots</div>
                <div className="text-emerald-500 font-bold">&gt; [STAGE 8] Syncing to Redis & Streaming to Dashboard... ACTIVE</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      <AmbientBackground />
      <Navbar onLogin={onLogin} />
      <HeroSection onLogin={onLogin} />
      <AdvancedFeatures />
    </div>
  );
}
