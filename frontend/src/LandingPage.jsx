import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, Database, ShieldAlert, GitBranch, Terminal, Zap, ChevronRight, Layers, ArrowRight, Sparkles } from 'lucide-react';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

// Ultra-minimalist Ambient Background (Linear/Vercel style)
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none">
    {/* Very subtle noise/grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    
    {/* Monochromatic Orbs */}
    <div className="absolute top-[-20%] left-[20%] w-[40%] h-[50%] rounded-full bg-white/5 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
    <div className="absolute top-[10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>
  </div>
);

// Minimal Nav
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
              <Activity className="h-5 w-5" />
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
            className="px-6 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
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
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <Sparkles className="w-3 h-3 text-gray-400" />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">BugRisk Intelligence Engine 2.0</span>
          <ChevronRight className="w-3 h-3 text-gray-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-[0.9] mb-8"
        >
          Stop Reacting.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-600">
            Start Predicting.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed mb-12"
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            Initialize Platform
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-xl">
            <Terminal className="w-4 h-4" />
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
        <div className="relative rounded-t-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="ml-4 text-xs font-mono text-gray-500 flex-1 text-center pr-12">bugrisk-intelligence-dashboard</div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mock Dashboard Element 1 */}
            <div className="col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-medium text-white">Live Prediction Matrix</div>
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  Streaming
                </div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                  <span>module=auth</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-white font-medium bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">critical</span>
                </div>
                <div className="flex items-center justify-between text-gray-400 border-b border-white/5 pb-2">
                  <span>tech_stack=jwt</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-white font-medium bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">critical</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>language=java</span>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <span className="text-white font-medium bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs">warning</span>
                </div>
              </div>
            </div>

            {/* Mock Dashboard Element 2 */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-center items-center text-center">
               <div className="text-5xl font-bold text-white mb-2">94%</div>
               <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">Model Confidence</div>
               <div className="mt-6 w-full bg-white/5 rounded-full h-1">
                 <div className="bg-blue-500 h-1 rounded-full w-[94%]"></div>
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
  <div className="w-full py-12 border-y border-white/5 bg-black z-10 relative">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center">
      <p className="text-xs font-medium text-gray-600 mb-8 uppercase tracking-[0.2em]">Trusted by engineering leaders</p>
      <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
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
    <section className="relative w-full py-32 z-10 bg-[#000000]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Unprecedented Clarity</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            We don't just find bugs. We map the entire DNA of your codebase to predict where the next fracture will occur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {/* Card 1: Large */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[80px] group-hover:bg-white/[0.04] transition-colors duration-700"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  <Database className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Rule Mining Engine</h3>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Leveraging FP-Growth & Apriori association rule mining to extract hidden correlation patterns across millions of telemetry events in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Tall */}
          <div className="md:col-span-1 md:row-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Zap className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">ML Pattern Analysis</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                FastAPI microservice computing continuous Jaccard deduplication and Defect Risk Index (DRI) scoring for proactive triage.
              </p>
              <div className="mt-auto flex-1 rounded-xl bg-black/40 border border-white/5 p-4 flex flex-col justify-end">
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-3"><div className="w-[80%] h-full bg-white/80 rounded-full"></div></div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-3"><div className="w-[60%] h-full bg-white/50 rounded-full"></div></div>
                <div className="w-full h-1.5 bg-white/10 rounded-full"><div className="w-[40%] h-full bg-white/30 rounded-full"></div></div>
              </div>
            </div>
          </div>

          {/* Card 3: Wide */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-10 relative overflow-hidden group">
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[80px] group-hover:bg-white/[0.04] transition-colors duration-700"></div>
             <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <Layers className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Explainability Layer</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Translating complex statistical probabilities into human-readable critical hotspots with 8-stage SSE pipeline streaming.
                  </p>
                </div>
                <div className="flex-1 w-full bg-[#050505] border border-white/10 rounded-xl p-6 font-mono text-xs text-gray-500">
                  <div className="text-blue-400 mb-4 tracking-wider uppercase">SSE Stream Active</div>
                  <div className="space-y-2">
                    <div>&gt; receiving block 4509...</div>
                    <div>&gt; parsing telemetry...</div>
                    <div className="text-gray-300">&gt; 18 hotspots identified</div>
                  </div>
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
  <section className="relative w-full py-32 z-10 bg-black border-t border-white/5">
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
        {[
          { value: "2400+", label: "Rules Mined" },
          { value: "92%", label: "Confidence" },
          { value: "5.54x", label: "Lift Ratio" },
          { value: "18", label: "Critical Hotspots" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
              {stat.value}
            </div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Massive CTA
const CTASection = ({ onLogin }) => (
  <section className="relative w-full py-40 z-10 bg-[#000000] flex items-center justify-center border-t border-white/5">
    
    <div className="relative z-10 text-center max-w-4xl px-6">
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
        Ship with <span className="text-gray-500">Certainty.</span>
      </h2>
      <p className="text-xl text-gray-400 font-light mb-12">
        Join the best engineering teams using BugRisk to secure their pipelines.
      </p>
      
      <button 
        onClick={onLogin}
        className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
      >
        Start your free trial
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-12 border-t border-white/10 bg-black z-10 relative">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 text-white font-bold">
        <Activity className="w-5 h-5" />
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
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
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
