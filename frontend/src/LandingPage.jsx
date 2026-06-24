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
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-200 tracking-tighter uppercase group-hover:from-amber-400 group-hover:to-amber-600 transition-colors duration-500 leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">BugRisk</span>
              <span className="text-[10px] text-amber-500 font-mono tracking-[0.4em] uppercase opacity-90 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]">Intelligence_Core</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 bg-[#050505]/90 p-1.5 rounded border border-amber-500/20 backdrop-blur-xl shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            {[
              { icon: Network, label: 'Neural_Topology' },
              { icon: Database, label: 'Logic_Matrix' },
              { icon: Activity, label: 'Deep_Analytics' }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={onLogin} 
                className="flex items-center gap-3 px-6 py-2.5 text-[11px] font-bold text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all uppercase rounded-sm group relative overflow-hidden"
              >
                <item.icon className="w-4 h-4 text-slate-600 group-hover:text-amber-500 transition-colors drop-shadow-[0_0_5px_rgba(245,158,11,0)] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" /> 
                <span className="tracking-[0.2em]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono">
          <div className="hidden md:flex flex-col items-end mr-6 text-[10px] tracking-widest text-slate-500">
            <span>NETWORK_STATE: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-bold animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">OPTIMAL</span></span>
            <span>NODE_STREAM: <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">ACTIVE</span></span>
          </div>
          <button 
            onClick={onLogin}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-[#030303] font-black text-xs uppercase tracking-[0.4em] overflow-hidden rounded shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.8)] transition-all"
          >
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
              {isLoggedIn ? 'Access_Core_Systems' : 'Execute_Protocol'} <Lock className="w-4 h-4"/>
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
      <span className="absolute top-0 left-[3px] -z-10 text-amber-500 opacity-0 group-hover:opacity-80 group-hover:translate-x-[3px] transition-all duration-75 mix-blend-screen drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">{text}</span>
      <span className="absolute top-0 -left-[3px] -z-10 text-rose-500 opacity-0 group-hover:opacity-80 group-hover:-translate-x-[3px] transition-all duration-75 mix-blend-screen drop-shadow-[0_0_10px_rgba(243,24,70,0.8)]">{text}</span>
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
          className="mb-14 relative p-5 flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
          <div className="px-10 py-3 bg-amber-500/10 backdrop-blur-xl font-mono text-sm text-amber-500 uppercase tracking-[0.5em] flex items-center gap-4 font-black shadow-[inset_0_0_30px_rgba(245,158,11,0.2)] border border-amber-500/20">
            <Target className="w-5 h-5 animate-spin-slow drop-shadow-[0_0_8px_rgba(245,158,11,1)]" />
            Classified_Intelligence_Matrix
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 uppercase text-center w-full"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)] block mb-2">Predictive</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 filter drop-shadow-[0_0_40px_rgba(245,158,11,0.6)]">
            <GlitchText text="Anomalies." />
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-4xl font-mono leading-relaxed mb-12 tracking-tight text-center border-x-4 border-amber-500/40 px-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        >
          <span className="font-light">Synthesize raw streams.</span> <strong className="font-black text-white tracking-widest">ISOLATE THREAT VECTORS.</strong> <br className="hidden md:block"/>
          Powered by hyper-scaled <strong className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-black drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">Neural Association</strong> architectures.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-8 w-full justify-center font-mono"
        >
          <button 
            onClick={onLogin}
            className="group relative w-full sm:w-auto px-16 py-7 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-[#030303] font-black text-sm uppercase tracking-[0.4em] shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:shadow-[0_0_100px_rgba(245,158,11,0.9)] hover:-translate-y-1 transition-all rounded overflow-hidden"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.3)_10px,rgba(255,255,255,0.3)_20px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center gap-4 drop-shadow-lg">
              {isLoggedIn ? 'Initialize_Sequence' : 'Initialize_Sequence'}
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
        className="mt-40 w-full max-w-[1500px] px-6 relative z-30"
      >
        <div className="absolute -inset-10 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative border-2 border-amber-500/60 bg-[#050505]/95 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,1),0_0_60px_rgba(245,158,11,0.3)] rounded-lg overflow-hidden transform-gpu hover:rotateX-0 transition-transform duration-1000">
          
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b-2 border-amber-500/40 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_rgba(245,158,11,1)]"></div>
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-amber-500/30 animate-pulse rounded-full"></div>
                <div className="w-4 h-4 bg-amber-500/50 animate-pulse rounded-full" style={{animationDelay: '0.2s'}}></div>
                <div className="w-4 h-4 bg-amber-500 animate-pulse rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{animationDelay: '0.4s'}}></div>
              </div>
              <div className="font-mono text-sm text-amber-500 tracking-[0.5em] uppercase font-black drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">[ DRI_MONITOR_TERMINAL ]</div>
            </div>
            <div className="flex items-center gap-4 text-amber-500 font-mono text-xs px-5 py-2.5 border-2 border-amber-500/50 bg-amber-500/10 tracking-[0.3em] font-black uppercase shadow-[inset_0_0_15px_rgba(245,158,11,0.3)]">
              <Activity className="w-4 h-4 animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,1)]" />
              LIVE_FEED
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[450px]">
            
            {/* Massive DRI Display & Recharts Live Graph (Numbers Removed) */}
            <div className="md:col-span-4 border-r-2 border-amber-500/30 bg-[#050505] p-8 flex flex-col relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(245,158,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.08)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               
               <div className="relative z-10 flex flex-col items-center justify-center h-1/2 border-b border-amber-500/30 pb-8">
                 <Shield className="w-16 h-16 text-amber-500/50 mb-6 group-hover:text-amber-500 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
                 <div className="text-xs font-mono text-amber-500 uppercase tracking-[0.4em] mb-4 font-black">Risk_Index_Threshold</div>
                 <div className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] tracking-tighter uppercase">MAX_CAP</div>
                 <div className="text-xs text-[#050505] bg-amber-500 px-4 py-1.5 mt-6 font-black tracking-[0.3em] uppercase animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.8)]">CRITICAL_OVERRIDE</div>
               </div>

               <div className="relative z-10 h-1/2 pt-8 flex flex-col">
                 <div className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-4 font-black flex justify-between items-center">
                   <span>VOLATILITY_MATRIX</span>
                   <span className="text-white border-2 border-amber-500/50 px-3 py-1 bg-amber-500/10 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">SURGING</span>
                 </div>
                 <div className="flex-1 w-full h-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                        <YAxis hide domain={['dataMin', 'dataMax']} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </div>
            </div>

            {/* Dense Data Stream Grid (Numbers Removed) */}
            <div className="md:col-span-8 bg-[#030303] p-8 relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-end mb-8 border-b-2 border-amber-500/40 pb-5">
                <div>
                  <h3 className="text-lg font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-black uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">JACCARD_INFERENCE_ENGINE</h3>
                  <p className="text-[11px] font-mono text-slate-400 tracking-[0.4em] font-bold">PROCESSING NODE TOPOLOGY STREAM</p>
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 bg-amber-500/10 border-2 border-amber-500/50 text-amber-500 font-mono text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]">FP-GROWTH</span>
                  <span className="px-4 py-1.5 bg-slate-800 text-slate-300 font-mono text-xs font-bold border-2 border-slate-700">APRIORI_NET</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 font-mono text-sm overflow-y-auto pr-4 custom-scrollbar">
                {[
                  { m: "AUTH_MATRIX_LAYER", t: "SEC_PROTOCOL, JWT", risk: "CRITICAL", c: "CONFIRMED", rules: "SCANNED", lift: "EXTREME" },
                  { m: "PAYMENT_ROUTING", t: "STRIPE_API, NODEJS", risk: "HIGH", c: "LIKELY", rules: "SCANNED", lift: "ELEVATED" },
                  { m: "REDIS_MEMORY_POOL", t: "CACHE_LAYER, RAM", risk: "WARNING", c: "POSSIBLE", rules: "SCANNED", lift: "NOTABLE" },
                  { m: "USER_GRAPH_DB", t: "NEO4J, QUERY_ENGINE", risk: "WARNING", c: "POSSIBLE", rules: "SCANNED", lift: "NOTABLE" },
                  { m: "EVENT_KAFKA_BUS", t: "STREAM, MESSAGING", risk: "INFO", c: "MONITORING", rules: "SCANNED", lift: "BASELINE" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#080808] border-2 border-slate-800 hover:border-amber-500/80 p-5 transition-all duration-300 cursor-pointer group shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-6">
                      <div className="w-2 h-10 bg-slate-800 group-hover:bg-amber-500 transition-colors shadow-[0_0_10px_rgba(245,158,11,0)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.8)]"></div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-white font-black tracking-[0.15em] text-base drop-shadow-md">{row.m}</span>
                        <span className="text-[10px] text-slate-400 tracking-[0.3em] font-bold">{row.t}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden xl:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 tracking-[0.2em] font-bold">RULES</span>
                        <span className="text-white font-black tracking-widest">{row.rules}</span>
                      </div>
                      <div className="hidden lg:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 tracking-[0.2em] font-bold">LIFT_RATIO</span>
                        <span className="text-white font-black tracking-widest">{row.lift}</span>
                      </div>
                      <div className="flex flex-col items-end w-36">
                        <span className="text-[10px] text-slate-500 tracking-[0.2em] font-bold">CONFIDENCE</span>
                        <span className="text-amber-500 font-black text-base drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] tracking-widest">{row.c}</span>
                      </div>
                      <span className={`px-5 py-2.5 text-xs border-2 tracking-[0.3em] font-black uppercase w-40 text-center
                        ${row.risk === 'CRITICAL' ? 'border-rose-500 text-rose-500 shadow-[inset_0_0_20px_rgba(243,24,70,0.3)] bg-rose-500/5' : 
                          row.risk === 'HIGH' ? 'border-amber-500 text-amber-500 shadow-[inset_0_0_20px_rgba(245,158,11,0.3)] bg-amber-500/5' : 
                          row.risk === 'WARNING' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/5' : 'border-slate-600 text-slate-400'}`}>
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
    <section id="features" className="relative w-full py-48 z-10 bg-[#030303] border-y-4 border-amber-500/30">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div className="max-w-5xl">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter mb-8 leading-[0.9]">Deep<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 filter drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">Architecture.</span></h2>
            <p className="text-lg md:text-xl text-slate-300 font-mono leading-relaxed tracking-tight border-l-8 border-amber-500 pl-8 drop-shadow-md">
              BugRisk is engineered with enterprise-grade machine learning algorithms to map the entire neural DNA of your codebase and preemptively isolate critical failure vectors.
            </p>
          </div>
          <div className="text-right font-mono hidden md:block">
            <div className="text-8xl font-black text-slate-800 leading-none tracking-tighter drop-shadow-xl"><Shield className="w-24 h-24 inline-block text-amber-500/20 drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]"/></div>
            <div className="text-amber-500 font-black tracking-[0.5em] uppercase mt-6 text-xs">PREDICTIVE_CERTAINTY</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 font-mono">
          
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="flex-1 border-4 border-slate-800 bg-[#050505] p-12 hover:border-amber-500/80 transition-all duration-500 group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <Network className="w-16 h-16 text-amber-500 mb-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              <h3 className="text-xl font-black text-white mb-6 uppercase tracking-[0.2em] drop-shadow-md">ASSOCIATION_NET</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-bold">
                Advanced rule mining extracting hyper-dimensional correlation patterns across telemetry events to find hidden failure vectors.
              </p>
            </div>
            <div className="flex-1 border-4 border-slate-800 bg-[#050505] p-12 hover:border-amber-500/80 transition-all duration-500 group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <Database className="w-16 h-16 text-amber-500 mb-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              <h3 className="text-xl font-black text-white mb-6 uppercase tracking-[0.2em] drop-shadow-md">JACCARD_INDEX</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-bold">
                Continuous Jaccard indexing running in a FastAPI microservice to deduplicate and isolate the highest-risk structural anomalies.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 border-4 border-slate-800 bg-[#050505] flex flex-col hover:border-amber-500/60 transition-all duration-500 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08]"></div>
            
            <div className="p-12 border-b-4 border-slate-800 bg-[#080808] relative z-10 flex justify-between items-center">
               <div>
                  <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-amber-500 text-[#030303] text-xs font-black tracking-[0.4em] uppercase mb-8 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    <span className="w-2.5 h-2.5 bg-[#030303] animate-pulse rounded-full"></span>
                    SSE_PIPELINE_ACTIVE
                  </div>
                  <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-[0.2em] drop-shadow-lg">SYNCHRONIZED_EVENT_STREAM</h3>
               </div>
               <Activity className="w-20 h-20 text-amber-500/30 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
            </div>
            
            <div className="p-12 bg-[#030303] text-base text-slate-300 font-mono flex-1 relative z-10">
              <div className="space-y-6 font-bold">
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 tracking-widest text-sm w-36">T_MINUS_SYNC</span>
                  <span className="text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">&gt; [SYS] Establishing secure connection to FastAPI ML Core...</span>
                  <span className="bg-amber-500 text-[#030303] px-3 py-0.5 font-black uppercase tracking-widest">OK</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 tracking-widest text-sm w-36">STAGE_INGEST</span>
                  <span>&gt; [STG_I] Ingesting multi-dimensional enterprise telemetry...</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 tracking-widest text-sm w-36">STAGE_PROFILE</span>
                  <span>&gt; [STG_P] Profiling dataset schema... Quality Matrix: <span className="text-amber-500 font-black">OPTIMAL</span></span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 tracking-widest text-sm w-36">STAGE_ALGO</span>
                  <span>&gt; [STG_A] Initializing FP-Growth Neural Engine (Mode: <span className="text-white">AUTO</span>)</span>
                </div>
                <div className="flex items-center gap-6 text-amber-500 font-black border-l-4 border-amber-500 pl-6 py-4 bg-amber-500/10 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)] my-4">
                  <span className="text-amber-500/60 tracking-widest text-sm w-32">STAGE_MINE</span>
                  <span className="drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] tracking-wide text-lg">&gt; [MINER] Generating raw association rule matrices...</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 tracking-widest text-sm w-36">STAGE_DEDUP</span>
                  <span>&gt; [STG_D] Executing deep Jaccard Deduplication inference...</span>
                </div>
                <div className="flex items-center gap-6 text-amber-500 font-black border-l-4 border-amber-500 pl-6 py-4 bg-amber-500/10 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)] my-4">
                  <span className="text-amber-500/60 tracking-widest text-sm w-32">STAGE_ANALYZE</span>
                  <span className="drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] tracking-wide text-lg">&gt; [MINER] Retaining high-confidence risk vectors...</span>
                </div>
                <div className="flex items-center gap-6 text-white font-black mt-12 pt-8 border-t-2 border-slate-800">
                  <span className="text-slate-500 tracking-widest text-sm w-36">STAGE_STREAM</span>
                  <span className="text-xl">&gt; [STG_S] Syncing cache & streaming intelligence payload...</span>
                  <span className="text-amber-500 animate-pulse border-2 border-amber-500 px-4 py-1.5 shadow-[0_0_20px_rgba(245,158,11,0.6)] uppercase tracking-[0.3em] text-sm">ACTIVE</span>
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
