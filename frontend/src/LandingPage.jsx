import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, GitBranch, Terminal, Layers, ArrowRight, Database, Network, Workflow, ChevronRight } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Dynamic Ambient Background with Glowing Orbs
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#05050A] overflow-hidden pointer-events-none">
    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30"></div>
    
    {/* Glowing Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
    <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
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
    <div className="absolute top-28 left-6 flex flex-col gap-2 font-mono text-xs z-50">
      <div className="text-slate-400 mb-1 tracking-widest uppercase font-bold">System Status</div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
        <span className="text-slate-300 w-24">Frontend:</span>
        <span className="text-emerald-400 font-bold">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse ${status.backend === 'Online' ? 'bg-emerald-400' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'}`}></span>
        <span className="text-slate-300 w-24">Backend:</span>
        <span className={`font-bold ${status.backend === 'Online' ? 'text-emerald-400' : 'text-amber-400'}`}>
          {status.backend || 'Warming Up'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse ${status.mlService === 'Online' ? 'bg-emerald-400' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'}`}></span>
        <span className="text-slate-300 w-24">ML Service:</span>
        <span className={`font-bold ${status.mlService === 'Online' ? 'text-emerald-400' : 'text-amber-400'}`}>
          {status.mlService || 'Warming Up'}
        </span>
      </div>
    </div>
  );
};

// Premium Glassmorphism Nav
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#05050A]/70 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogin}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-[0_0_20px_rgba(52,211,153,0.3)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">BugRisk</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Network className="w-4 h-4 text-emerald-400" /> Topology Map
            </button>
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Database className="w-4 h-4 text-cyan-400" /> Rules Engine
            </button>
            <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Activity className="w-4 h-4 text-purple-400" /> Analytics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-sm text-slate-400 hover:text-white transition-colors">
            GitHub
          </a>
          <button 
            onClick={onLogin}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full text-white font-semibold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] flex items-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
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
      
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center mt-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-sm text-emerald-300 font-medium shadow-[0_0_20px_rgba(52,211,153,0.15)]"
        >
          <span className="relative flex h-2.5 w-2.5 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Engineering Intelligence Platform v2.0
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[85px] font-black tracking-tight leading-[1.05] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400"
        >
          Predictive Risk <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">Analytics.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-light"
        >
          Deploy the ultimate ML pattern analysis tool. Mine association rules across telemetry using <strong className="text-white font-semibold">FP-Growth & Apriori</strong> to expose defect hotspots before your CI/CD pipeline breaks.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <button 
            onClick={onLogin}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-base hover:from-emerald-400 hover:to-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)] transform hover:-translate-y-1"
          >
            Initialize Platform
            <ArrowRight className="w-5 h-5" />
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <Terminal className="w-5 h-5" />
            Explore Documentation
          </a>
        </motion.div>
      </div>

      {/* Premium Glassmorphic App Feature Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-24 w-full max-w-[1300px] px-6 relative"
      >
        <div className="relative rounded-2xl border border-white/10 bg-[#0A0B10]/80 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <div className="ml-4 font-mono text-[10px] text-slate-400 tracking-widest uppercase">BUGRISK_ENGINE_TERMINAL // DRI_ACTIVE</div>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              LIVE DATA STREAM
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gradient-to-br from-white/[0.02] to-transparent">
            
            {/* Defect Risk Index Panel */}
            <div className="md:col-span-1 rounded-xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-6 relative z-10">Defect Risk Index (DRI)</div>
               <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 relative z-10">90</div>
               <div className="text-[10px] text-slate-500 font-mono relative z-10">QUALITY_IDX</div>
            </div>

            {/* Pattern Analysis Streaming */}
            <div className="md:col-span-3 rounded-xl border border-white/5 bg-white/[0.02] p-8 shadow-inner">
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-semibold text-slate-200 flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  Jaccard Rule Deduplication Stream
                </div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                {[
                  { m: "auth_module", t: "jwt, java", risk: "CRITICAL", c: "94.3%", d: "0.89 DRI" },
                  { m: "payment_gateway", t: "stripe, node", risk: "HIGH", c: "88.1%", d: "0.75 DRI" },
                  { m: "user_session", t: "redis, cache", risk: "WARNING", c: "64.2%", d: "0.45 DRI" }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 hover:bg-white/[0.02] px-4 -mx-4 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-6">
                      <span className="text-slate-200 w-36 truncate font-medium">{row.m}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                      <span className="text-slate-400 hidden sm:block">{row.t}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-slate-500 hidden md:block">lift: {(Math.random() * 5 + 1).toFixed(2)}x</span>
                      <span className="text-cyan-400 font-semibold">{row.c}</span>
                      <span className={`px-3 py-1 text-[10px] rounded-full font-bold tracking-wider ${row.risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : row.risk === 'HIGH' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-300'}`}>
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

const AdvancedFeatures = () => {
  return (
    <section id="features" className="relative w-full py-32 z-10 bg-[#05050A] border-y border-white/5">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">System Architecture</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            BugRisk is engineered with machine learning algorithms to map the entire DNA of your codebase and isolate failure vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Network className="text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">FP-Growth & Apriori</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Advanced association rule mining extracting deep correlation patterns across millions of telemetry events to find hidden failure vectors.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Activity className="text-purple-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Defect Risk Index (DRI)</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Automated ingestion profiling that computes schema validation, completeness scoring, and a dynamic Quality Score Index instantly.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors group lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Database className="text-cyan-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Jaccard Deduplication</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk anomalies.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:col-span-3 flex flex-col md:flex-row gap-12 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                REAL-TIME
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">8-Stage SSE Pipeline</h3>
              <p className="text-slate-400 leading-relaxed text-base font-light">
                A Server-Sent Events (SSE) architecture powered by Spring Boot 3 & Redis Cache to stream millions of processed metrics to your dashboard in milliseconds.
              </p>
            </div>
            <div className="flex-1 w-full rounded-xl border border-white/10 bg-[#020205] p-6 text-xs text-slate-500 shadow-inner relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="font-bold text-slate-300 flex items-center gap-2"><Terminal className="w-4 h-4"/> PIPELINE_REPLAY.LOG</span>
                <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">SSE_STREAM_ACTIVE</span>
              </div>
              <div className="space-y-3 font-mono">
                <div className="text-slate-400">&gt; [INFO] Connecting to FastAPI ML Service... <span className="text-emerald-400">OK</span></div>
                <div>&gt; [STAGE 1] Ingesting 15,482 telemetry records...</div>
                <div>&gt; [STAGE 2] Profiling dataset... Quality Score: <span className="text-cyan-400">98.4%</span></div>
                <div>&gt; [STAGE 3] Executing FP-Growth Algorithm (minSupport=0.15, minConfidence=0.7)</div>
                <div className="text-emerald-400">&gt; [MINER] Generated 2,403 raw association rules in 0.43s</div>
                <div>&gt; [STAGE 4] Applying Jaccard Deduplication (threshold=0.85)...</div>
                <div className="text-emerald-400">&gt; [MINER] Retained 18 high-confidence risk hotspots</div>
                <div className="text-cyan-400 font-semibold">&gt; [STAGE 8] Syncing to Redis & Streaming to Dashboard... ACTIVE</div>
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
    <div className="min-h-screen bg-[#05050A] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans">
      <AmbientBackground />
      <Navbar onLogin={onLogin} />
      <HeroSection onLogin={onLogin} />
      <AdvancedFeatures />
    </div>
  );
}
