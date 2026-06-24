import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, GitBranch, Terminal, Layers, ArrowRight, Database, Network, Workflow, ChevronRight } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Strict Grid Background (No Glowing Orbs)
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
    {/* Monotone grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
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
      <div className="text-slate-500 mb-1">SYSTEM STATUS</div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-slate-300 w-24">Frontend:</span>
        <span className="text-emerald-500 font-bold">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.backend === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
        <span className="text-slate-300 w-24">Backend:</span>
        <span className={`font-bold ${status.backend === 'Online' ? 'text-emerald-500' : 'text-amber-500'}`}>
          {status.backend || 'Warming Up (Render Free Tier)'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full animate-pulse ${status.mlService === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
        <span className="text-slate-300 w-24">ML Service:</span>
        <span className={`font-bold ${status.mlService === 'Online' ? 'text-emerald-500' : 'text-amber-500'}`}>
          {status.mlService || 'Warming Up'}
        </span>
      </div>
    </div>
  );
};

// Strict Monochrome Nav
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Activity className="h-5 w-5 text-[#050505]" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight uppercase">BugRisk</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 font-mono">
            <button onClick={() => setPreview('graph')} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors uppercase">
              <Network className="w-4 h-4" /> [ Topology Map ]
            </button>
            <button onClick={() => setPreview('rules')} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors uppercase">
              <Database className="w-4 h-4" /> [ Rules Engine ]
            </button>
            <button onClick={() => setPreview('analytics')} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors uppercase">
              <Activity className="w-4 h-4" /> [ Analytics ]
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase">
            GitHub
          </a>
          <button 
            onClick={onLogin}
            className="px-6 py-2 bg-amber-500 text-[#050505] font-bold text-xs hover:bg-amber-400 transition-colors uppercase tracking-widest"
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
      <SystemStatus />
      
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-amber-500/30 bg-amber-500/5 font-mono text-xs text-amber-500 uppercase tracking-widest"
        >
          <span className="w-2 h-2 bg-amber-500 animate-pulse mr-2"></span>
          Engineering Intelligence Platform v2.0
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[80px] font-black text-white tracking-tighter leading-[1.1] mb-8 uppercase"
        >
          Predictive Risk Analytics.
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
            className="w-full sm:w-auto px-10 py-4 bg-amber-500 text-[#050505] font-bold text-sm hover:bg-amber-400 transition-colors flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            Initialize Platform
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-10 py-4 border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-900 transition-colors flex items-center justify-center gap-3 uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            Explore Documentation
          </button>
        </motion.div>
      </div>

      {/* Austere App Feature Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-20 w-full max-w-[1300px] px-6 relative"
      >
        <div className="relative border border-slate-800 bg-[#0A0A0A] overflow-hidden">
          
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-[#050505]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">BUGRISK_ENGINE_TERMINAL // DRI_ACTIVE</div>
            <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] px-2 py-1 border border-amber-500/20 bg-amber-500/5">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              LIVE DATA STREAM
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
            
            {/* Defect Risk Index Panel */}
            <div className="md:col-span-1 border border-slate-800 bg-[#080808] p-6 flex flex-col justify-center items-center text-center">
               <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-4">Defect Risk Index (DRI)</div>
               <div className="text-6xl font-mono text-white mb-2">90</div>
               <div className="text-[10px] text-slate-500 font-mono">QUALITY_IDX</div>
            </div>

            {/* Pattern Analysis Streaming */}
            <div className="md:col-span-3 border border-slate-800 bg-[#080808] p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-mono text-amber-500 flex items-center gap-2 uppercase tracking-widest">
                  <Database className="w-4 h-4" />
                  Jaccard Rule Deduplication Stream
                </div>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { m: "auth_module", t: "jwt, java", risk: "CRITICAL", c: "94.3%", d: "0.89 DRI" },
                  { m: "payment_gateway", t: "stripe, node", risk: "HIGH", c: "88.1%", d: "0.75 DRI" },
                  { m: "user_session", t: "redis, cache", risk: "WARNING", c: "64.2%", d: "0.45 DRI" }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-4">
                      <span className="text-white w-32 truncate">{row.m}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />
                      <span className="text-slate-500 hidden sm:block">{row.t}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-slate-400 hidden md:block">lift: {(Math.random() * 5 + 1).toFixed(2)}x</span>
                      <span className="text-amber-500">{row.c}</span>
                      <span className={`px-2 py-1 text-[10px] border ${row.risk === 'CRITICAL' ? 'border-rose-500 text-rose-500' : row.risk === 'HIGH' ? 'border-amber-500 text-amber-500' : 'border-slate-500 text-slate-500'}`}>
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
    <section id="features" className="relative w-full py-32 z-10 bg-[#0A0A0A] border-y border-slate-800">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">System Architecture</h2>
          <p className="text-sm text-slate-400 max-w-3xl mx-auto font-mono leading-relaxed">
            BugRisk is engineered with machine learning algorithms to map the entire DNA of your codebase and isolate failure vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          
          <div className="border border-slate-800 bg-[#050505] p-8">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest">FP-Growth & Apriori</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Advanced association rule mining extracting deep correlation patterns across millions of telemetry events to find hidden failure vectors.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#050505] p-8">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest">Defect Risk Index (DRI)</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Automated ingestion profiling that computes schema validation, completeness scoring, and a dynamic Quality Score Index instantly.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#050505] p-8 lg:col-span-1">
            <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest">Jaccard Deduplication</h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk anomalies.
            </p>
          </div>

          <div className="border border-slate-800 bg-[#050505] p-8 lg:col-span-3 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-500 mb-4 uppercase tracking-widest">8-Stage SSE Pipeline</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                A Server-Sent Events (SSE) architecture powered by Spring Boot 3 & Redis Cache to stream millions of processed metrics to your dashboard in milliseconds.
              </p>
            </div>
            <div className="flex-1 w-full border border-slate-800 bg-[#020202] p-6 text-xs text-slate-500">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <span className="font-bold text-amber-500">DEMO_PIPELINE_REPLAY.LOG</span>
                <span className="text-[10px] text-slate-600 bg-slate-900 px-2 py-0.5 rounded">*Based on real completed scan</span>
              </div>
              <div className="space-y-2 font-mono">
                <div className="text-slate-500">&gt; [INFO] Connecting to FastAPI ML Service... OK</div>
                <div>&gt; [STAGE 1] Ingesting 15,482 telemetry records...</div>
                <div>&gt; [STAGE 2] Profiling dataset... Quality Score: 98.4%</div>
                <div>&gt; [STAGE 3] Executing FP-Growth Algorithm (minSupport=0.15, minConfidence=0.7)</div>
                <div className="text-amber-500">&gt; [MINER] Generated 2,403 raw association rules in 0.43s</div>
                <div>&gt; [STAGE 4] Applying Jaccard Deduplication (threshold=0.85)...</div>
                <div className="text-amber-500">&gt; [MINER] Retained 18 high-confidence risk hotspots</div>
                <div className="text-emerald-500">&gt; [STAGE 8] Syncing to Redis & Streaming to Dashboard... ACTIVE</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function LandingPage({ onLogin, setPreview }) {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      <AmbientBackground />
      <Navbar onLogin={onLogin} setPreview={setPreview} />
      <HeroSection onLogin={onLogin} />
      <AdvancedFeatures />
    </div>
  );
}
