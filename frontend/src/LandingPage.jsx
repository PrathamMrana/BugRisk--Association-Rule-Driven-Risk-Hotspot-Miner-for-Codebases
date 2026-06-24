import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Terminal, ArrowRight, Database, Network, Target, Shield, Zap, Cpu, Hexagon, Fingerprint, Lock, Code2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Symbol-style Data Rain (NO NUMBERS)
const DataRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*'.split('');
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)'; // Amber text
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />;
};

const IntelligenceBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#030303] overflow-hidden pointer-events-none perspective-[2000px]">
    <DataRain />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
    
    {/* Massive Radar Rings */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-500/10 rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-amber-500/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
    
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[200px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>
  </div>
);

const HexagonGrid = () => (
  <div className="absolute right-0 top-1/4 w-[400px] h-full pointer-events-none flex flex-wrap gap-2 opacity-10">
    {Array.from({ length: 50 }).map((_, i) => (
      <Hexagon key={i} className={`w-12 h-12 ${Math.random() > 0.8 ? 'text-amber-500 animate-pulse' : 'text-slate-700'}`} />
    ))}
  </div>
);

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
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#030303]/90 backdrop-blur-2xl border-amber-500/20 shadow-[0_10px_40px_rgba(245,158,11,0.1)] py-4' : 'bg-transparent border-transparent py-8'}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={onLogin}>
            <div className="relative flex h-14 w-14 items-center justify-center rounded bg-[#0A0A0A] border-2 border-amber-500/50 group-hover:border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Fingerprint className="h-8 w-8 text-amber-500 relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white tracking-tighter uppercase group-hover:text-amber-500 transition-colors duration-500 leading-none">BugRisk</span>
              <span className="text-[10px] text-amber-500 font-mono tracking-[0.3em] uppercase opacity-70">Intelligence_Engine</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 bg-[#050505]/90 p-1 rounded border border-amber-500/20 backdrop-blur-xl">
            {[
              { icon: Network, label: 'Topology Map' },
              { icon: Database, label: 'Rules Engine' },
              { icon: Activity, label: 'Analytics' }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={onLogin} 
                className="flex items-center gap-3 px-6 py-3 text-[11px] font-bold text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-all uppercase rounded-sm group relative overflow-hidden"
              >
                <item.icon className="w-4 h-4 text-slate-600 group-hover:text-amber-500 transition-colors" /> 
                <span className="tracking-[0.15em]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono">
          <div className="hidden md:flex flex-col items-end mr-6 text-[10px] tracking-widest text-slate-500">
            <span>SYS_STATUS: <span className="text-amber-500 font-bold animate-pulse">OPTIMAL</span></span>
            <span>NODE_STREAM: <span className="text-white">ACTIVE</span></span>
          </div>
          <button 
            onClick={onLogin}
            className="group relative px-10 py-4 bg-amber-500 text-[#030303] font-black text-xs uppercase tracking-[0.3em] overflow-hidden rounded shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all"
          >
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3">
              {isLoggedIn ? 'Access Core' : 'Deploy Protocol'} <Lock className="w-4 h-4"/>
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const generateMockData = () => {
  return Array.from({ length: 50 }).map((_, i) => ({
    time: i,
    val: Math.random() * 100 + 50 + (Math.sin(i / 5) * 40)
  }));
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
  const mockData = generateMockData();

  return (
    <section id="engine" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-40 pb-20 z-10 overflow-hidden">
      <HexagonGrid />
      
      <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col items-center mt-10 relative z-20">
        
        {/* HUD Targeting Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 relative p-4 flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>
          <div className="px-8 py-2 bg-amber-500/10 backdrop-blur-md font-mono text-xs text-amber-500 uppercase tracking-[0.4em] flex items-center gap-3 font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Target className="w-4 h-4 animate-spin-slow" />
            Classified Intelligence Protocol
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.85] mb-12 uppercase text-center w-full"
        >
          <span className="text-white drop-shadow-2xl">Defect</span><br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 filter drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
            <GlitchText text="Intelligence." />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-3xl text-slate-400 max-w-5xl font-mono leading-relaxed mb-16 tracking-tight text-center border-l-4 border-r-4 border-amber-500/30 px-8"
        >
          Ingest raw telemetry. Extract critical failure vectors. <br className="hidden md:block"/>
          Powered by hyper-scaled <strong className="text-amber-500 font-black">FP-Growth</strong> architecture.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-8 w-full justify-center font-mono"
        >
          <button 
            onClick={onLogin}
            className="group relative w-full sm:w-auto px-16 py-6 bg-amber-500 text-[#030303] font-black text-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:shadow-[0_0_80px_rgba(245,158,11,0.8)] hover:-translate-y-1 transition-all rounded overflow-hidden"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center gap-4">
              {isLoggedIn ? 'Initialize Protocol' : 'Initialize Protocol'}
              <Zap className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Holographic 3D Floating Palantir Terminal - No Numbers */}
      <motion.div 
        initial={{ opacity: 0, rotateX: 45, y: 200, scale: 0.8 }}
        animate={{ opacity: 1, rotateX: 10, y: 0, scale: 1 }}
        transition={{ duration: 2, delay: 0.8, type: "spring", bounce: 0.4 }}
        style={{ perspective: 2000 }}
        className="mt-32 w-full max-w-[1500px] px-6 relative z-30"
      >
        <div className="absolute -inset-10 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative border-2 border-amber-500/50 bg-[#050505]/95 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)] rounded-lg overflow-hidden transform-gpu hover:rotateX-0 transition-transform duration-1000">
          
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b-2 border-amber-500/30 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]"></div>
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-amber-500/30 animate-pulse"></div>
                <div className="w-3 h-3 bg-amber-500/50 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-amber-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <div className="font-mono text-xs text-amber-500 tracking-[0.4em] uppercase font-bold">NODE_COMMAND_CENTER // DRI_MONITOR</div>
            </div>
            <div className="flex items-center gap-4 text-amber-500 font-mono text-[10px] px-4 py-2 border border-amber-500/50 bg-amber-500/10 tracking-widest font-black uppercase shadow-[inset_0_0_10px_rgba(245,158,11,0.2)]">
              <Activity className="w-4 h-4 animate-pulse" />
              Real-Time Feed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[450px]">
            
            {/* Massive DRI Display & Recharts Live Graph (Numbers Removed) */}
            <div className="md:col-span-4 border-r-2 border-amber-500/20 bg-[#050505] p-8 flex flex-col relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
               
               <div className="relative z-10 flex flex-col items-center justify-center h-1/2 border-b border-amber-500/20 pb-8">
                 <Shield className="w-16 h-16 text-amber-500/50 mb-6 group-hover:text-amber-500 transition-colors duration-500" />
                 <div className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-2 font-bold">System DRI Index</div>
                 <div className="text-6xl font-mono font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] tracking-tighter uppercase">MAX</div>
                 <div className="text-[10px] text-[#050505] bg-amber-500 px-3 py-1 mt-4 font-black tracking-widest uppercase animate-pulse">CRITICAL_THREAT_LVL</div>
               </div>

               <div className="relative z-10 h-1/2 pt-8 flex flex-col">
                 <div className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] mb-4 font-bold flex justify-between items-center">
                   <span>Anomaly Volatility</span>
                   <span className="text-white border border-amber-500/50 px-2 bg-amber-500/10">ELEVATED</span>
                 </div>
                 <div className="flex-1 w-full h-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                        <YAxis hide domain={['dataMin', 'dataMax']} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </div>
            </div>

            {/* Dense Data Stream Grid (Numbers Removed) */}
            <div className="md:col-span-8 bg-[#030303] p-8 relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-end mb-8 border-b-2 border-amber-500/30 pb-4">
                <div>
                  <h3 className="text-lg font-mono text-white font-black uppercase tracking-widest mb-1">Jaccard Inference Engine</h3>
                  <p className="text-[10px] font-mono text-slate-500 tracking-[0.3em]">PROCESSING NODE STREAM</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-[10px] font-bold">FP-GROWTH</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 font-mono text-[10px]">APRIORI</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 font-mono text-xs overflow-y-auto pr-4 custom-scrollbar">
                {[
                  { m: "AUTH_MICROSERVICE", t: "SEC_LAYER, JWT", risk: "CRITICAL", c: "CONFIRMED", rules: "SCANNED", lift: "EXTREME" },
                  { m: "PAYMENT_GATEWAY", t: "STRIPE, NODEJS", risk: "HIGH", c: "LIKELY", rules: "SCANNED", lift: "ELEVATED" },
                  { m: "REDIS_SESSION_STORE", t: "CACHE, MEMORY", risk: "WARNING", c: "POSSIBLE", rules: "SCANNED", lift: "NOTABLE" },
                  { m: "USER_GRAPH_DB", t: "NEO4J, QUERY", risk: "WARNING", c: "POSSIBLE", rules: "SCANNED", lift: "NOTABLE" },
                  { m: "NOTIFICATION_KAFKA", t: "STREAM, EVENTS", risk: "INFO", c: "MONITORING", rules: "SCANNED", lift: "BASELINE" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#080808] border border-slate-800 hover:border-amber-500 p-4 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-1.5 h-8 bg-slate-800 group-hover:bg-amber-500 transition-colors"></div>
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-black tracking-widest text-sm">{row.m}</span>
                        <span className="text-[9px] text-slate-500 tracking-[0.2em]">{row.t}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden xl:flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 tracking-widest">RULES</span>
                        <span className="text-white font-bold">{row.rules}</span>
                      </div>
                      <div className="hidden lg:flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 tracking-widest">LIFT</span>
                        <span className="text-white font-bold">{row.lift}</span>
                      </div>
                      <div className="flex flex-col items-end w-28">
                        <span className="text-[9px] text-slate-500 tracking-widest">CONFIDENCE</span>
                        <span className="text-amber-500 font-black text-sm drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">{row.c}</span>
                      </div>
                      <span className={`px-4 py-2 text-[10px] border-2 tracking-[0.2em] font-black uppercase w-32 text-center
                        ${row.risk === 'CRITICAL' ? 'border-rose-500 text-rose-500 shadow-[inset_0_0_15px_rgba(243,24,70,0.2)]' : 
                          row.risk === 'HIGH' ? 'border-amber-500 text-amber-500 shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]' : 
                          row.risk === 'WARNING' ? 'border-yellow-500 text-yellow-500' : 'border-slate-600 text-slate-500'}`}>
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

// Dense Data Architecture Section (Numbers Removed)
const AdvancedFeatures = () => {
  return (
    <section id="features" className="relative w-full py-40 z-10 bg-[#030303] border-y-4 border-amber-500/20">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">Engine<br/><span className="text-amber-500">Architecture</span></h2>
            <p className="text-xl text-slate-400 font-mono leading-relaxed tracking-tight border-l-4 border-amber-500 pl-6">
              BugRisk is engineered with enterprise-grade machine learning algorithms to map the entire DNA of your codebase and preemptively isolate failure vectors.
            </p>
          </div>
          <div className="text-right font-mono hidden md:block">
            <div className="text-[100px] font-black text-slate-800 leading-none tracking-tighter"><Shield className="w-24 h-24 inline-block text-amber-500/20"/></div>
            <div className="text-amber-500 font-bold tracking-[0.4em] uppercase mt-4">Predictive Accuracy</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
          
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex-1 border-2 border-slate-800 bg-[#050505] p-10 hover:border-amber-500 transition-colors group relative overflow-hidden">
              <Network className="w-12 h-12 text-amber-500 mb-8 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">FP-Growth & Apriori</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Advanced association rule mining extracting deep correlation patterns across telemetry events to find hidden failure vectors.
              </p>
            </div>
            <div className="flex-1 border-2 border-slate-800 bg-[#050505] p-10 hover:border-amber-500 transition-colors group relative overflow-hidden">
              <Database className="w-12 h-12 text-amber-500 mb-8 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">Jaccard Deduplication</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk anomalies.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 border-2 border-slate-800 bg-[#050505] flex flex-col hover:border-amber-500/50 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
            
            <div className="p-10 border-b-2 border-slate-800 bg-[#080808] relative z-10 flex justify-between items-center">
               <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500 text-[#030303] text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                    <span className="w-2 h-2 bg-[#030303] animate-pulse"></span>
                    Multi-Stage Pipeline
                  </div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-widest">Real-Time Event Stream</h3>
               </div>
               <Activity className="w-16 h-16 text-amber-500/20" />
            </div>
            
            <div className="p-10 bg-[#030303] text-sm text-slate-400 font-mono flex-1 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">T_MINUS_SYNC</span>
                  <span className="text-amber-500">&gt; [SYS] Establishing secure connection to FastAPI ML Service...</span>
                  <span className="bg-amber-500 text-[#030303] px-2 font-bold">OK</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">STAGE_INGEST</span>
                  <span>&gt; [STG_I] Ingesting enterprise telemetry records...</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">STAGE_PROFILE</span>
                  <span>&gt; [STG_P] Profiling dataset schema... Quality Score: OPTIMAL</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">STAGE_ALGO</span>
                  <span>&gt; [STG_A] Initializing FP-Growth Engine (Support: AUTO, Confidence: HIGH)</span>
                </div>
                <div className="flex items-center gap-4 text-amber-500 font-bold border-l-2 border-amber-500 pl-4 py-2 bg-amber-500/5">
                  <span className="text-amber-500/50">STAGE_MINE</span>
                  <span className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">&gt; [MINER] Generated raw association rules...</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-600">STAGE_DEDUP</span>
                  <span>&gt; [STG_D] Executing Jaccard Deduplication Pass...</span>
                </div>
                <div className="flex items-center gap-4 text-amber-500 font-bold border-l-2 border-amber-500 pl-4 py-2 bg-amber-500/5">
                  <span className="text-amber-500/50">STAGE_ANALYZE</span>
                  <span className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">&gt; [MINER] Retained high-confidence risk hotspots</span>
                </div>
                <div className="flex items-center gap-4 text-white font-black mt-8">
                  <span className="text-slate-600 font-normal">STAGE_STREAM</span>
                  <span>&gt; [STG_S] Syncing to Redis & Streaming payload...</span>
                  <span className="text-amber-500 animate-pulse border border-amber-500 px-2 py-0.5 shadow-[0_0_10px_rgba(245,158,11,0.4)]">ACTIVE</span>
                </div>
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
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-amber-500/40 selection:text-white font-sans overflow-x-hidden">
      <IntelligenceBackground />
      <Navbar onLogin={onLogin} isLoggedIn={isLoggedIn} />
      <HeroSection onLogin={onLogin} isLoggedIn={isLoggedIn} />
      <AdvancedFeatures />
    </div>
  );
}
