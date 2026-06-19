import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, Database, GitBranch, Cpu, Network, ShieldAlert } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

const Scanlines = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-5">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#E3A62B_1px,transparent_1px),linear-gradient(to_bottom,#E3A62B_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
  </div>
);

const Coordinates = ({ top, left, right, bottom, label }) => (
  <div className={`absolute text-[10px] text-[#E3A62B] opacity-50 font-mono tracking-widest ${top ? 'top-4' : ''} ${bottom ? 'bottom-4' : ''} ${left ? 'left-4' : ''} ${right ? 'right-4' : ''}`}>
    {label || `[SYS.${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 1000)}]`}
  </div>
);

const Navbar = ({ onLogin }) => (
  <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#E3A62B]/20 bg-[#05070B]/90 backdrop-blur-sm">
    <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs tracking-widest text-[#E3A62B]">
      <div className="flex items-center gap-8">
        <div className="font-bold text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#FF5D5D]" />
          BUGRISK
        </div>
        <div className="hidden md:flex gap-6 opacity-70">
          <a href="#product" className="hover:opacity-100 hover:text-white transition-colors">PRODUCT</a>
          <a href="#technology" className="hover:opacity-100 hover:text-white transition-colors">TECHNOLOGY</a>
          <a href="#docs" className="hover:opacity-100 hover:text-white transition-colors">DOCS</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:opacity-100 hover:text-white transition-colors">GITHUB</a>
        </div>
      </div>
      <button 
        onClick={onLogin}
        className="border border-[#E3A62B] text-[#E3A62B] px-4 py-2 hover:bg-[#E3A62B] hover:text-[#05070B] transition-all uppercase"
      >
        Launch App
      </button>
    </div>
  </nav>
);

const HeroSection = ({ onLogin }) => (
  <section className="relative w-full h-screen flex items-center bg-[#05070B] overflow-hidden border-b border-[#E3A62B]/10">
    <GridBackground />
    <Scanlines />
    <Coordinates top left label="COORD_45.992" />
    <Coordinates bottom right label="SYS_ONLINE_TRUE" />
    
    <div className="max-w-[1500px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
      <div className="flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[#E3A62B] text-xs tracking-[0.2em] mb-6 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-[#FF5D5D] animate-pulse"></span>
          INTELLIGENCE ENGINE ACTIVE
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight mb-8"
        >
          STOP REACTING.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3A62B] to-[#FF5D5D]">START PREDICTING.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 font-mono max-w-xl mb-12 leading-relaxed"
        >
          BugRisk mines association rules across telemetry to expose defect hotspots before production failures happen.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 font-mono text-sm"
        >
          <button onClick={onLogin} className="bg-[#E3A62B] text-[#05070B] px-8 py-4 font-bold hover:bg-white transition-colors flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            INITIALIZE PLATFORM
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="border border-gray-600 text-white px-8 py-4 hover:border-[#E3A62B] hover:text-[#E3A62B] transition-colors flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            VIEW GITHUB
          </a>
        </motion.div>
      </div>

      {/* Right Side: Animated Graph */}
      <div className="relative hidden lg:flex items-center justify-center font-mono">
        <div className="absolute inset-0 bg-[#0A0D12] border border-[#E3A62B]/20 rounded-none shadow-[0_0_50px_rgba(227,166,43,0.05)] flex items-center justify-center overflow-hidden">
           
           <svg className="absolute inset-0 w-full h-full" stroke="#E3A62B" strokeOpacity="0.3" strokeWidth="1">
             <path d="M 100 150 Q 200 150 250 250 T 400 350" fill="none" className="animate-[dash_3s_linear_infinite]" strokeDasharray="5,5" />
             <path d="M 100 350 Q 200 350 250 250 T 400 150" fill="none" className="animate-[dash_4s_linear_infinite]" strokeDasharray="5,5" />
             <path d="M 250 250 L 500 250" fill="none" stroke="#FF5D5D" strokeOpacity="0.5" strokeWidth="2" />
           </svg>

           {/* Nodes */}
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-[130px] left-[80px] bg-[#05070B] border border-[#E3A62B] text-[#E3A62B] px-3 py-1 text-xs">module=auth</motion.div>
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[330px] left-[80px] bg-[#05070B] border border-[#E3A62B] text-[#E3A62B] px-3 py-1 text-xs">language=java</motion.div>
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute top-[230px] left-[200px] bg-[#05070B] border border-[#E3A62B] text-[#E3A62B] px-3 py-1 text-xs">tech_stack=jwt</motion.div>
           
           <motion.div 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             transition={{ delay: 0.6 }} 
             className="absolute top-[230px] right-[80px] bg-[#FF5D5D]/10 border border-[#FF5D5D] text-[#FF5D5D] px-4 py-2 text-sm font-bold shadow-[0_0_20px_rgba(255,93,93,0.3)]"
           >
             → severity=critical
           </motion.div>

           {/* Live Metrics */}
           <div className="absolute bottom-6 left-6 text-[10px] text-gray-400 leading-relaxed">
             <div><span className="text-[#E3A62B]">confidence</span> 94.3%</div>
             <div><span className="text-[#E3A62B]">lift</span> 5.79x</div>
             <div><span className="text-[#E3A62B]">support</span> 0.09</div>
           </div>
           
           {/* Radar Sweep */}
           <div className="absolute inset-0 origin-center animate-[spin_4s_linear_infinite] pointer-events-none" style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(227, 166, 43, 0.1) 100%)' }}></div>
        </div>
      </div>
    </div>
  </section>
);

const ClaritySection = () => (
  <section className="relative w-full min-h-screen flex items-center bg-[#0A0D12] overflow-hidden border-b border-[#E3A62B]/10 py-20">
    <GridBackground />
    <Coordinates top right label="MOD_ANALYSIS" />
    <Coordinates bottom left label="SEQ_002" />
    
    <div className="max-w-[1500px] mx-auto px-6 relative z-10 w-full">
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-16 leading-tight tracking-tighter">
        UNPRECEDENTED <br/>
        <span className="text-[#E3A62B]">DEFECT CLARITY</span>
      </h2>
      
      <div className="relative border-l-2 border-[#E3A62B]/20 pl-8 ml-4 space-y-24 font-mono">
        {/* Module 1 */}
        <div className="relative">
          <div className="absolute w-4 h-4 bg-[#E3A62B] -left-[41px] top-2 rotate-45 shadow-[0_0_15px_#E3A62B]"></div>
          <div className="text-[#E3A62B] text-sm tracking-widest mb-2 border-b border-[#E3A62B]/20 pb-2 inline-block">INTEGRATED MODULE 01</div>
          <h3 className="text-3xl text-white font-bold mb-4">RULE MINING ENGINE</h3>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
            Leveraging FP-Growth & Apriori association rule mining to extract hidden correlation patterns across millions of telemetry events in real-time.
          </p>
        </div>

        {/* Module 2 */}
        <div className="relative">
          <div className="absolute w-4 h-4 bg-[#E3A62B] -left-[41px] top-2 rotate-45"></div>
          <div className="text-[#E3A62B] text-sm tracking-widest mb-2 border-b border-[#E3A62B]/20 pb-2 inline-block">INTEGRATED MODULE 02</div>
          <h3 className="text-3xl text-white font-bold mb-4">ML PATTERN ANALYSIS</h3>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
            FastAPI microservice computing continuous Jaccard deduplication and Defect Risk Index (DRI) scoring for proactive triage.
          </p>
        </div>

        {/* Module 3 */}
        <div className="relative">
          <div className="absolute w-4 h-4 bg-[#FF5D5D] -left-[41px] top-2 rotate-45 shadow-[0_0_15px_#FF5D5D]"></div>
          <div className="text-[#FF5D5D] text-sm tracking-widest mb-2 border-b border-[#FF5D5D]/20 pb-2 inline-block">INTEGRATED MODULE 03</div>
          <h3 className="text-3xl text-white font-bold mb-4">EXPLAINABILITY LAYER</h3>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
            Translating complex statistical probabilities into human-readable critical hotspots with 8-stage SSE pipeline streaming.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TopologySection = () => (
  <section className="relative w-full h-screen flex flex-col justify-center bg-[#05070B] overflow-hidden border-b border-[#E3A62B]/10">
    <GridBackground />
    <Coordinates top left label="NET_TOPOLOGY" />
    
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <div className="w-[800px] h-[800px] border border-[#E3A62B]/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute w-[600px] h-[600px] border border-[#E3A62B]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
      <div className="absolute w-[400px] h-[400px] border border-[#E3A62B]/40 rounded-full animate-pulse"></div>
    </div>

    <div className="max-w-[1500px] w-full mx-auto px-6 relative z-10 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tighter">
        GLOBAL CODEBASE <br/><span className="text-[#E3A62B]">TOPOLOGY</span>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full font-mono">
        <div className="border border-[#E3A62B]/20 bg-[#0A0D12]/80 p-8">
          <div className="text-[#E3A62B] text-5xl font-bold mb-2">2400+</div>
          <div className="text-gray-500 text-xs tracking-widest">RULES MINED</div>
        </div>
        <div className="border border-[#E3A62B]/20 bg-[#0A0D12]/80 p-8">
          <div className="text-[#E3A62B] text-5xl font-bold mb-2">92%</div>
          <div className="text-gray-500 text-xs tracking-widest">CONFIDENCE</div>
        </div>
        <div className="border border-[#E3A62B]/20 bg-[#0A0D12]/80 p-8">
          <div className="text-[#E3A62B] text-5xl font-bold mb-2">5.54X</div>
          <div className="text-gray-500 text-xs tracking-widest">LIFT</div>
        </div>
        <div className="border border-[#FF5D5D]/30 bg-[#FF5D5D]/5 p-8 shadow-[inset_0_0_20px_rgba(255,93,93,0.1)]">
          <div className="text-[#FF5D5D] text-5xl font-bold mb-2">18</div>
          <div className="text-[#FF5D5D] text-xs tracking-widest">CRITICAL HOTSPOTS</div>
        </div>
      </div>
    </div>
  </section>
);

const PipelineSection = () => (
  <section className="relative w-full min-h-screen flex items-center bg-[#0A0D12] overflow-hidden border-b border-[#E3A62B]/10 py-20">
    <GridBackground />
    <Coordinates top left label="DATA_PIPELINE" />
    
    <div className="max-w-[1500px] w-full mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
      <div>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
          ARCHITECTURE <br/><span className="text-[#E3A62B]">PIPELINE</span>
        </h2>
        <div className="font-mono text-xs text-gray-500 space-y-2 mb-12">
          <p>[SYS_ON] INITIATING TELEMETRY INGEST</p>
          <p>[SYS_ACTIVE] CACHE LAYER SYNCED</p>
          <p>[SYS_RECUR] ALGORITHM LOOP ENGAGED</p>
          <p>[SYS_WRITE] POSTGRES COMMITTING</p>
          <p>[SYS_HIT] DASHBOARD SSE ESTABLISHED</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center font-mono text-sm relative">
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#E3A62B]/20 -translate-x-1/2"></div>
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#E3A62B] -translate-x-1/2 overflow-hidden">
          <div className="w-full h-20 bg-gradient-to-b from-transparent via-[#FF5D5D] to-transparent animate-[flow_2s_linear_infinite]"></div>
        </div>
        
        {['CSV', 'SPRING BOOT', 'FASTAPI', 'FP-GROWTH', 'POSTGRES', 'REDIS', 'DASHBOARD'].map((node, i) => (
          <div key={node} className="relative z-10 my-6 bg-[#05070B] border border-[#E3A62B] px-8 py-4 text-[#E3A62B] min-w-[200px] text-center uppercase tracking-widest shadow-[0_0_15px_rgba(227,166,43,0.1)]">
            {node}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TerminalSection = () => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const sequence = [
      "MINER FOUND",
      "{pkg=security,lang=java}",
      "→ severity=critical",
      "confidence=94%",
      "telemetry flush",
      "cache eviction",
      "db commit completed",
      "waiting for next block..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, sequence[i % sequence.length]];
        if (next.length > 15) return next.slice(next.length - 15);
        return next;
      });
      i++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col bg-[#05070B] border-b border-[#E3A62B]/10">
      <div className="border-b border-[#E3A62B]/20 bg-[#0A0D12] px-6 py-3 font-mono text-xs text-[#E3A62B] tracking-widest flex justify-between">
        <span>AI COMMAND TERMINAL</span>
        <span className="text-[#FF5D5D] animate-pulse">● LIVE</span>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
        {/* Console */}
        <div className="col-span-2 border-r border-[#E3A62B]/20 p-6 font-mono text-xs overflow-hidden relative">
          <Scanlines />
          <div className="space-y-2 text-gray-400">
            {logs.map((log, index) => (
              <div key={index} className={`${log.includes('critical') ? 'text-[#FF5D5D]' : ''} ${log.includes('MINER') ? 'text-[#E3A62B]' : ''}`}>
                <span className="opacity-50 mr-4">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span>
                {log}
              </div>
            ))}
            <div className="flex items-center">
              <span className="opacity-50 mr-4">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span>
              <span className="w-2 h-4 bg-[#E3A62B] animate-pulse"></span>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="p-6 font-mono bg-[#0A0D12] relative">
          <GridBackground />
          <div className="relative z-10 space-y-12">
            <div>
              <div className="text-gray-500 text-[10px] tracking-widest mb-2 border-b border-gray-800 pb-2">HOTSPOT FILE</div>
              <div className="text-[#E3A62B] text-sm truncate">auth/jwt/TokenValidator.java</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-[10px] tracking-widest mb-2 border-b border-gray-800 pb-2">DRI (DEFECT RISK INDEX)</div>
              <div className="text-white text-5xl font-bold">0.89</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-[10px] tracking-widest mb-2 border-b border-gray-800 pb-2">SEVERITY</div>
              <div className="text-[#FF5D5D] text-2xl font-bold tracking-widest animate-pulse">CRITICAL</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-[10px] tracking-widest mb-2 border-b border-gray-800 pb-2">ACTIVE CONNECTIONS</div>
              <div className="text-white text-xl">124<span className="text-gray-500 text-sm">/sec</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ onLogin }) => (
  <section className="relative w-full h-screen flex items-center justify-center bg-[#05070B] overflow-hidden text-center">
    <GridBackground />
    <Scanlines />
    <Coordinates top right label="SYS_HALT" />
    <Coordinates bottom left label="AUTH_REQ" />
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,166,43,0.05)_0%,transparent_60%)] pointer-events-none"></div>

    <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <ShieldAlert className="w-16 h-16 text-[#FF5D5D] mb-8" />
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight tracking-tighter">
        READY TO UNDERSTAND <br/> YOUR CODEBASE <br/>
        <span className="text-[#FF5D5D]">BEFORE IT BREAKS?</span>
      </h2>
      
      <button 
        onClick={onLogin}
        className="bg-[#E3A62B] text-[#05070B] px-12 py-5 font-bold font-mono text-lg hover:bg-white transition-all mb-16 shadow-[0_0_30px_rgba(227,166,43,0.3)]"
      >
        INITIALIZE PLATFORM
      </button>

      <div className="font-mono text-gray-600 text-xs tracking-[0.3em] flex items-center gap-4">
        <span>BUGRISK // SECURE_CORE</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
        <span>2026</span>
      </div>
    </div>
  </section>
);

const LandingPage = ({ onLogin }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flow {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(800%); }
      }
      @keyframes dash {
        to { stroke-dashoffset: -20; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] text-white selection:bg-[#E3A62B] selection:text-[#05070B]">
      <Navbar onLogin={onLogin} />
      <main>
        <HeroSection onLogin={onLogin} />
        <ClaritySection />
        <TopologySection />
        <PipelineSection />
        <TerminalSection />
        <CTASection onLogin={onLogin} />
      </main>
    </div>
  );
};

export default LandingPage;
