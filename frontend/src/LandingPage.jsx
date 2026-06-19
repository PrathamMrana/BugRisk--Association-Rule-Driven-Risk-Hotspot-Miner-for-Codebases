import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Code2, Database, ShieldAlert, GitBranch, Terminal, Zap, CheckCircle2, ChevronRight, Layers, ArrowRight, Sparkles } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Advanced Ambient Background
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none">
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    
    {/* Glowing Orbs */}
    <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[120px] mix-blend-screen"></div>
  </div>
);

// Glassmorphic Nav
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">BugRisk</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Platform</a>
            <a href="#solutions" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Solutions</a>
            <a href="#customers" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Customers</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hidden md:flex text-sm font-medium text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <button 
            onClick={onLogin}
            className="group relative px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Start Predicting
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

// Next-Gen Hero
const HeroSection = ({ onLogin }) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-gray-300">BugRisk Intelligence Engine 2.0 is live</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter leading-[0.9] mb-8"
        >
          Stop Reacting.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500">
            Start Predicting.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed mb-12"
        >
          The only telemetry platform that mines association rules to expose defect hotspots <span className="text-white font-medium">before production failures happen.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <button 
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Initialize Platform
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-xl">
            <Terminal className="w-5 h-5" />
            Book Demo
          </button>
        </motion.div>
      </div>

      {/* Floating Dashboard Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="mt-20 w-full max-w-[1200px] px-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 top-1/2"></div>
        <div className="relative rounded-t-3xl border border-white/20 bg-[#0A0A0A]/80 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.2)]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs font-mono text-gray-400 flex-1 text-center pr-12">bugrisk-intelligence-dashboard</div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mock Dashboard Element 1 */}
            <div className="col-span-2 rounded-2xl border border-white/10 bg-black/50 p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-semibold text-white">Live Prediction Matrix</div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">STREAMING</div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                  <span>module=auth</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">critical</span>
                </div>
                <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                  <span>tech_stack=jwt</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">critical</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>language=java</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">warning</span>
                </div>
              </div>
            </div>

            {/* Mock Dashboard Element 2 */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-violet-900/20 to-black/50 p-6 flex flex-col justify-center items-center text-center">
               <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">94%</div>
               <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Model Confidence</div>
               <div className="mt-4 w-full bg-white/10 rounded-full h-1">
                 <div className="bg-violet-500 h-1 rounded-full w-[94%] shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Social Proof
const SocialProof = () => (
  <div className="w-full py-10 border-y border-white/5 bg-white/[0.02] z-10 relative">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center">
      <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">Trusted by elite engineering teams</p>
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="text-xl font-black tracking-tighter">Acme Corp</div>
        <div className="text-xl font-bold font-serif italic">GlobalTech</div>
        <div className="text-xl font-black uppercase">Nexus</div>
        <div className="text-xl font-bold tracking-widest">AETHER</div>
        <div className="text-xl font-medium tracking-tight">Quantum</div>
      </div>
    </div>
  </div>
);

// Bento Grid Features
const BentoFeatures = () => {
  return (
    <section className="relative w-full py-32 z-10 bg-black">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Unprecedented Clarity</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            We don't just find bugs. We map the entire DNA of your codebase to predict where the next fracture will occur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {/* Card 1: Large */}
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] group-hover:bg-violet-600/40 transition-colors duration-700"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Database className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Rule Mining Engine</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Leveraging FP-Growth & Apriori association rule mining to extract hidden correlation patterns across millions of telemetry events in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Tall */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-cyan-900/20 to-transparent p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] group-hover:bg-cyan-600/40 transition-colors duration-700"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">ML Pattern Analysis</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                FastAPI microservice computing continuous Jaccard deduplication and Defect Risk Index (DRI) scoring for proactive triage.
              </p>
              <div className="mt-auto flex-1 rounded-xl bg-black/50 border border-white/5 p-4 flex flex-col justify-end">
                <div className="w-full h-2 bg-white/10 rounded-full mb-3"><div className="w-[80%] h-full bg-cyan-500 rounded-full"></div></div>
                <div className="w-full h-2 bg-white/10 rounded-full mb-3"><div className="w-[60%] h-full bg-cyan-500/50 rounded-full"></div></div>
                <div className="w-full h-2 bg-white/10 rounded-full"><div className="w-[40%] h-full bg-cyan-500/30 rounded-full"></div></div>
              </div>
            </div>
          </div>

          {/* Card 3: Wide */}
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-900/20 to-transparent p-10 relative overflow-hidden group">
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] group-hover:bg-fuchsia-600/40 transition-colors duration-700"></div>
             <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                    <Layers className="w-6 h-6 text-fuchsia-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Explainability Layer</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Translating complex statistical probabilities into human-readable critical hotspots with 8-stage SSE pipeline streaming.
                  </p>
                </div>
                <div className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="text-fuchsia-400 mb-2">SSE STREAM // ACTIVE</div>
                  <div>&gt; receiving block 4509...</div>
                  <div>&gt; parsing telemetry...</div>
                  <div className="text-white">&gt; 18 hotspots identified</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Huge Stats
const StatsSection = () => (
  <section className="relative w-full py-32 z-10 bg-[#030305] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
        {[
          { value: "2400+", label: "Rules Mined", color: "from-white to-gray-500" },
          { value: "92%", label: "Confidence", color: "from-cyan-400 to-blue-600" },
          { value: "5.54x", label: "Lift Ratio", color: "from-violet-400 to-fuchsia-600" },
          { value: "18", label: "Critical Hotspots", color: "from-amber-400 to-red-600" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b ${stat.color} mb-4`}>
              {stat.value}
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Massive CTA
const CTASection = ({ onLogin }) => (
  <section className="relative w-full py-40 z-10 bg-black overflow-hidden flex items-center justify-center border-t border-white/10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
    
    <div className="relative z-10 text-center max-w-4xl px-6">
      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
        Ship with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Certainty.</span>
      </h2>
      <p className="text-2xl text-gray-400 font-light mb-12">
        Join the best engineering teams using BugRisk to secure their pipelines.
      </p>
      
      <button 
        onClick={onLogin}
        className="px-12 py-6 rounded-full bg-white text-black font-extrabold text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)] flex items-center gap-3 mx-auto"
      >
        Start your free trial
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-12 border-t border-white/10 bg-black z-10 relative">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3 text-white font-bold text-xl">
        <Activity className="w-6 h-6 text-violet-500" />
        BugRisk
      </div>
      <div className="flex gap-8 text-sm font-medium text-gray-500">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href={GITHUB_URL} className="hover:text-white transition-colors">GitHub</a>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/40 selection:text-white font-sans overflow-x-hidden">
      <AmbientBackground />
      <Navbar onLogin={onLogin} />
      <main>
        <HeroSection onLogin={onLogin} />
        <SocialProof />
        <BentoFeatures />
        <StatsSection />
        <CTASection onLogin={onLogin} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
