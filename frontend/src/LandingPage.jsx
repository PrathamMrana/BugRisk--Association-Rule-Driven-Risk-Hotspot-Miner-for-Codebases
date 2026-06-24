import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Database, Activity, ShieldAlert, ChevronRight, ExternalLink, BarChart2, Zap, GitMerge, Search, LayoutDashboard, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, X, Lock, User, Eye, EyeOff } from 'lucide-react';

/* ─── Background ─── */
const Background = () => (
  <div className="fixed inset-0 z-0 bg-[#030303] overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
    <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-amber-500/8 via-transparent to-transparent blur-[120px]" />
  </div>
);

/* ─── Animated Graph Preview ─── */
const NODES = [
  { id: 'auth',     x: 50, y: 48, label: 'auth',     risk: 'CRITICAL', color: '#ef4444', r: 9 },
  { id: 'database', x: 74, y: 28, label: 'database',  risk: 'CRITICAL', color: '#ef4444', r: 10 },
  { id: 'payment',  x: 28, y: 68, label: 'payment',   risk: 'HIGH',     color: '#f97316', r: 8 },
  { id: 'gateway',  x: 66, y: 70, label: 'gateway',   risk: 'HIGH',     color: '#f97316', r: 7 },
  { id: 'analytics',x: 18, y: 38, label: 'analytics', risk: 'MEDIUM',   color: '#f59e0b', r: 6 },
  { id: 'cache',    x: 83, y: 52, label: 'cache',     risk: 'MEDIUM',   color: '#f59e0b', r: 6 },
  { id: 'notif',    x: 44, y: 18, label: 'notif',     risk: 'LOW',      color: '#22c55e', r: 5 },
  { id: 'search',   x: 14, y: 60, label: 'search',    risk: 'LOW',      color: '#22c55e', r: 5 },
];
const EDGES = [['auth','database'],['auth','payment'],['database','cache'],['payment','gateway'],['gateway','analytics'],['analytics','search'],['auth','notif'],['cache','gateway'],['database','payment'],['notif','analytics']];

function GraphPreview() {
  const [tick, setTick] = useState(0);
  const [hov, setHov] = useState(null);
  useEffect(() => { const t = setInterval(() => setTick(n => n+1), 50); return ()=>clearInterval(t); }, []);
  const off = useMemo(() => NODES.map((_,i)=>({ dx: Math.sin(i*1.3), dy: Math.cos(i*0.9), s: 0.4+i*0.07 })),[]);
  const pos = (n,i) => ({ x: n.x + off[i].dx*Math.sin(tick*0.011*off[i].s)*2.5, y: n.y + off[i].dy*Math.cos(tick*0.013*off[i].s)*2.5 });
  const pm = Object.fromEntries(NODES.map((n,i)=>[n.id, pos(n,i)]));

  return (
    <div className="w-full h-full relative bg-[#040404] rounded-2xl overflow-hidden border border-amber-500/15">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          <span className="text-green-400/80">LIVE</span>
          <span className="text-slate-600 ml-2">8 modules · 10 risk edges</span>
        </div>
        <div className="flex gap-3 text-[10px] font-bold">
          {[['CRITICAL','#ef4444'],['HIGH','#f97316'],['MEDIUM','#f59e0b'],['LOW','#22c55e']].map(([l,c])=>(
            <span key={l} className="flex items-center gap-1" style={{color:c}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background:c}}/>
              {l}
            </span>
          ))}
        </div>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
        <defs>
          {NODES.map(n=>(
            <radialGradient key={n.id} id={`rg-${n.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={n.color} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>
        {EDGES.map(([a,b],i)=>{ const pa=pm[a],pb=pm[b]; if(!pa||!pb) return null; const hi=hov===a||hov===b;
          return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={hi?'#f59e0b':'rgba(255,255,255,0.07)'} strokeWidth={hi?0.5:0.2} strokeDasharray={hi?'':'0.7 1.3'} style={{transition:'all 0.3s'}}/>;
        })}
        {NODES.map((n,i)=>{ const p=pm[n.id]; const hi=hov===n.id; const pulse=1+0.05*Math.sin(tick*0.06+i); const r=(n.r/11)*pulse*(hi?1.3:1);
          return (
            <g key={n.id} style={{cursor:'pointer'}} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)}>
              <circle cx={p.x} cy={p.y} r={n.r*0.32*(hi?2:1)} fill={`url(#rg-${n.id})`} style={{transition:'r 0.4s'}}/>
              <circle cx={p.x} cy={p.y} r={r+0.9} fill="none" stroke={n.color} strokeWidth={0.35} strokeOpacity={hi?1:0.45} style={{transition:'all 0.3s'}}/>
              <circle cx={p.x} cy={p.y} r={r} fill={n.color} fillOpacity={hi?0.95:0.7} style={{transition:'all 0.3s'}}/>
              <text x={p.x} y={p.y+r+1.8} textAnchor="middle" fontSize="1.6" fontWeight="700" fill={hi?'#fff':'#64748b'} style={{fontFamily:'monospace',transition:'fill 0.2s'}}>{n.label}</text>
              {hi&&<text x={p.x} y={p.y+0.65} textAnchor="middle" fontSize="1.4" fontWeight="900" fill="#fff" style={{fontFamily:'monospace'}}>{n.risk}</text>}
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <span className="text-[10px] text-slate-600 font-mono bg-black/60 px-3 py-1 rounded-full border border-white/5">Hover nodes to inspect risk connections</span>
      </div>
    </div>
  );
}

/* ─── Rules Explorer Preview ─── */
const RULES = [
  { antecedent: 'auth + database', consequent: 'severity=CRITICAL', conf: 0.94, lift: 8.2, sup: 0.31 },
  { antecedent: 'payment + gateway', consequent: 'severity=HIGH', conf: 0.87, lift: 6.5, sup: 0.24 },
  { antecedent: 'auth + cache', consequent: 'bug_type=NPE', conf: 0.81, lift: 5.9, sup: 0.19 },
  { antecedent: 'analytics + search', consequent: 'severity=MEDIUM', conf: 0.76, lift: 4.3, sup: 0.17 },
  { antecedent: 'database + cache', consequent: 'bug_type=TIMEOUT', conf: 0.73, lift: 4.1, sup: 0.15 },
  { antecedent: 'gateway + notif', consequent: 'severity=HIGH', conf: 0.68, lift: 3.8, sup: 0.13 },
];
function RulesPreview() {
  const [visible, setVisible] = useState(0);
  useEffect(()=>{ const t = setInterval(()=>setVisible(v=>Math.min(v+1,RULES.length)),400); return ()=>clearInterval(t); },[]);
  return (
    <div className="w-full h-full bg-[#040404] rounded-2xl border border-amber-500/15 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/50 flex-shrink-0">
        <span className="text-xs font-mono text-amber-400/80">MINED ASSOCIATION RULES</span>
        <span className="text-[10px] font-bold text-slate-500 font-mono">{RULES.length} rules · FP-Growth</span>
      </div>
      <div className="grid grid-cols-5 gap-0 text-[9px] font-bold text-slate-600 uppercase tracking-wider px-4 py-2 border-b border-white/5 flex-shrink-0">
        <span className="col-span-2">Antecedent → Consequent</span>
        <span className="text-center">Confidence</span>
        <span className="text-center">Lift</span>
        <span className="text-center">Support</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-0 px-2 py-2">
        {RULES.slice(0, visible).map((r, i) => {
          const riskColor = r.consequent.includes('CRITICAL') ? '#ef4444' : r.consequent.includes('HIGH') ? '#f97316' : r.consequent.includes('MEDIUM') ? '#f59e0b' : '#22c55e';
          return (
            <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{duration:0.3}}
              className="grid grid-cols-5 gap-0 py-2.5 px-2 rounded-lg hover:bg-white/3 transition-colors border-b border-white/3 last:border-0 group">
              <div className="col-span-2 flex items-center gap-1.5 font-mono text-[10px]">
                <span className="text-slate-400">{r.antecedent}</span>
                <ArrowRight className="w-2.5 h-2.5 text-amber-500/50 flex-shrink-0"/>
                <span className="font-bold" style={{color:riskColor}}>{r.consequent.split('=')[1]}</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{background:riskColor}}
                    initial={{width:0}} animate={{width:`${r.conf*100}%`}} transition={{duration:0.8,delay:i*0.1}}/>
                </div>
                <span className="ml-1.5 text-[9px] font-bold text-slate-400">{(r.conf*100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-center text-[10px] font-bold text-amber-400">{r.lift}x</div>
              <div className="flex items-center justify-center text-[10px] text-slate-500">{(r.sup*100).toFixed(0)}%</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Module Hotspots Preview ─── */
const MODULES = [
  { name: 'auth_service', score: 97, bugs: 42, severity: 'CRITICAL', trend: '+12' },
  { name: 'database_orm', score: 91, bugs: 38, severity: 'CRITICAL', trend: '+8' },
  { name: 'payment_gateway', score: 78, bugs: 29, severity: 'HIGH', trend: '+5' },
  { name: 'api_gateway', score: 71, bugs: 24, severity: 'HIGH', trend: '+3' },
  { name: 'cache_service', score: 55, bugs: 18, severity: 'MEDIUM', trend: '+1' },
  { name: 'analytics_worker', score: 43, bugs: 13, severity: 'MEDIUM', trend: '0' },
  { name: 'notif_service', score: 22, bugs: 6, severity: 'LOW', trend: '0' },
];
function HotspotsPreview() {
  const [animated, setAnimated] = useState(false);
  useEffect(()=>{ const t = setTimeout(()=>setAnimated(true), 200); return ()=>clearTimeout(t); },[]);
  const color = s => s==='CRITICAL'?'#ef4444':s==='HIGH'?'#f97316':s==='MEDIUM'?'#f59e0b':'#22c55e';
  const bg = s => s==='CRITICAL'?'bg-red-500/10 border-red-500/20 text-red-400':s==='HIGH'?'bg-orange-500/10 border-orange-500/20 text-orange-400':s==='MEDIUM'?'bg-amber-500/10 border-amber-500/20 text-amber-400':'bg-green-500/10 border-green-500/20 text-green-400';
  return (
    <div className="w-full h-full bg-[#040404] rounded-2xl border border-amber-500/15 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/50 flex-shrink-0">
        <span className="text-xs font-mono text-amber-400/80">MODULE RISK HOTSPOTS</span>
        <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold">
          <AlertTriangle className="w-3 h-3"/>5 above threshold
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-1.5 p-3">
        {MODULES.map((m,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.4,delay:i*0.08}}
            className="flex items-center gap-3 group hover:bg-white/3 rounded-lg px-2 py-1.5 transition-colors">
            <div className="w-6 text-[10px] font-bold text-slate-600 text-right flex-shrink-0">#{i+1}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-semibold text-slate-300 truncate">{m.name}</span>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${bg(m.severity)}`}>{m.severity}</span>
                  <span className="text-[10px] font-bold" style={{color:color(m.severity)}}>{m.score}</span>
                </div>
              </div>
              <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 rounded-full"
                  style={{background:color(m.severity)}}
                  initial={{width:0}} animate={{width:animated?`${m.score}%`:0}} transition={{duration:1,delay:i*0.1,ease:'easeOut'}}/>
              </div>
            </div>
            <div className="text-[9px] font-mono text-slate-600 w-10 text-right flex-shrink-0">{m.bugs} bugs</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── ML Analytics Preview ─── */
const BAR_DATA = [
  { label: 'auth', val: 94, color: '#ef4444' },
  { label: 'db', val: 87, color: '#ef4444' },
  { label: 'pay', val: 71, color: '#f97316' },
  { label: 'gw', val: 65, color: '#f97316' },
  { label: 'cache', val: 52, color: '#f59e0b' },
  { label: 'search', val: 38, color: '#f59e0b' },
  { label: 'notif', val: 22, color: '#22c55e' },
];
const LINE_POINTS = [20,35,28,55,42,68,51,75,62,80,70,85];

function useCounter(target, duration=1200, delay=0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t0);
  }, [target]);
  return val;
}

const BAR_H = 110;

function AnalyticsPreview() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }, []);

  const avgRisk     = Math.round(BAR_DATA.reduce((s,b) => s+b.val, 0) / BAR_DATA.length);
  const maxRisk     = Math.max(...BAR_DATA.map(b => b.val));
  const critCount   = BAR_DATA.filter(b => b.val >= 80).length;
  const highCount   = BAR_DATA.filter(b => b.val >= 60 && b.val < 80).length;

  const avgC  = useCounter(show ? avgRisk   : 0, 1200, 500);
  const maxC  = useCounter(show ? maxRisk   : 0, 1000, 300);
  const critC = useCounter(show ? critCount : 0,  800, 700);
  const highC = useCounter(show ? highCount : 0,  800, 800);

  const svgW = 200, svgH = 60;
  const pts  = LINE_POINTS.map((v,i) => ({ x: (i/(LINE_POINTS.length-1))*svgW, y: svgH - v*(svgH/100) }));
  const pathD = pts.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L${svgW},${svgH} L0,${svgH} Z`;

  return (
    <div className="w-full h-full bg-[#040404] rounded-2xl border border-amber-500/15 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/50 flex-shrink-0">
        <span className="text-xs font-mono text-amber-400/80">ML ANALYTICS ENGINE</span>
        <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
          <CheckCircle className="w-3 h-3"/>Live Risk Analysis
        </div>
      </div>

      {/* Charts */}
      <div className="flex-1 grid grid-cols-2 gap-0 p-3 overflow-hidden min-h-0">
        {/* Line chart */}
        <div className="flex flex-col gap-2 pr-3 border-r border-white/5 min-h-0">
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider flex-shrink-0">Risk Score Trend</span>
          <div className="flex-1 relative min-h-0">
            <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg-area2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                </linearGradient>
                <clipPath id="clip-line2">
                  <motion.rect x="0" y="0" height={svgH}
                    initial={{width:0}} animate={{width: show ? svgW : 0}}
                    transition={{duration:2, ease:'easeInOut'}}/>
                </clipPath>
              </defs>
              <path d={areaD} fill="url(#lg-area2)" clipPath="url(#clip-line2)"/>
              <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#clip-line2)"/>
              {pts.map((p,i) => (
                <motion.circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#f59e0b"
                  initial={{opacity:0, scale:0}}
                  animate={{opacity: show?1:0, scale: show?1:0}}
                  transition={{delay: 1.5+i*0.1, duration:0.3}}/>
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[9px] text-slate-600 font-mono flex-shrink-0">
            <span>Sprint 1</span><span>Sprint 6</span><span>Sprint 12</span>
          </div>
        </div>

        {/* Bar chart — fixed pixel height for reliable rendering */}
        <div className="flex flex-col gap-2 pl-3 min-h-0">
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider flex-shrink-0">Module Risk Scores</span>
          <div className="flex-1 flex flex-col justify-end min-h-0">
            <div className="flex items-end gap-1" style={{height: BAR_H}}>
              {BAR_DATA.map((b, i) => {
                const px = show ? Math.round((b.val / 100) * BAR_H) : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5" style={{height: BAR_H}}>
                    <div className="flex-1 flex items-end w-full">
                      <motion.div
                        className="w-full rounded-t"
                        style={{background: b.color, opacity: 0.78}}
                        initial={{height: 0}}
                        animate={{height: px}}
                        transition={{duration: 0.9, delay: 0.15 + i*0.1, ease:'easeOut'}}
                      />
                    </div>
                    <span className="text-[8px] font-mono text-slate-600">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics — derived from BAR_DATA, animated counters */}
      <div className="grid grid-cols-4 border-t border-white/5 flex-shrink-0">
        {[
          [avgC,  'Avg Risk Score'],
          [maxC,  'Peak Risk Score'],
          [critC, 'Critical Modules'],
          [highC, 'High Risk Modules'],
        ].map(([v, l]) => (
          <div key={l} className="flex flex-col items-center py-2.5 border-r border-white/5 last:border-0">
            <span className="text-sm font-bold text-amber-400">{v}</span>
            <span className="text-[9px] text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab Definitions ─── */
const TABS = [
  { id: 'graph',     label: 'Graph Explorer',  icon: GitMerge,      color: '#ef4444', desc: 'Interactive force-weighted network topology of your entire codebase. Hover any module to inspect all risk connections and severity chains in real time.', Preview: GraphPreview },
  { id: 'rules',     label: 'Rules Explorer',  icon: Search,        color: '#f97316', desc: 'Browse every mined association rule with confidence, lift, and support scores. Instantly filter by severity to find your most dangerous defect patterns.', Preview: RulesPreview },
  { id: 'hotspots',  label: 'Module Hotspots', icon: LayoutDashboard, color: '#f59e0b', desc: 'Ranked list of your riskiest modules with animated risk bars. See exactly which files are accumulating defects and how fast they\'re growing.', Preview: HotspotsPreview },
  { id: 'analytics', label: 'ML Analytics',    icon: Zap,           color: '#22c55e', desc: 'Live charts powered by FP-Growth and Apriori engines — risk trend lines, module score histograms, and model accuracy metrics at a glance.', Preview: AnalyticsPreview },
];

/* ─── Feature Showcase Section ─── */
function FeatureShowcase({ activePreview, onNavigate }) {
  const tab = TABS.find(t => t.id === activePreview) || TABS[0];
  const { Preview } = tab;
  return (
    <section id="features" className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left: description + launch */}
        <div className="lg:w-80 flex-shrink-0 flex flex-col gap-6 lg:pt-4">
          <motion.div key={tab.id+'d'} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.4}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{background:tab.color+'15', borderColor:tab.color+'30'}}>
                <tab.icon className="w-5 h-5" style={{color:tab.color}}/>
              </div>
              <h3 className="text-xl font-bold text-white">{tab.label}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{tab.desc}</p>
            <button
              onClick={() => onNavigate(tab.id)}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-black transition-all shadow-lg"
              style={{background:tab.color}}
            >
              Explore Live
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
          </motion.div>

          {/* Tab switchers */}
          <div className="flex flex-col gap-2 mt-4">
            {TABS.map(t => (
              <button key={t.id} onClick={() => document.dispatchEvent(new CustomEvent('setPreview', {detail:t.id}))}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${activePreview===t.id?'bg-white/8 text-white':'text-slate-500 hover:text-slate-300'}`}>
                <t.icon className="w-3.5 h-3.5 flex-shrink-0" style={{color: activePreview===t.id?t.color:'inherit'}}/>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex-1 min-w-0" style={{height: 480}}>
          <AnimatePresence mode="wait">
            <motion.div key={tab.id} className="w-full h-full"
              initial={{opacity:0,scale:0.97,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.97,y:-10}} transition={{duration:0.35}}>
              <Preview/>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Navbar ─── */
const Navbar = ({ onNavigate, onLogin, activePreview, setActivePreview }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleTabClick = (tab) => {
    setActivePreview(tab);
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled?'bg-[#030303]/90 backdrop-blur-2xl border-amber-500/20 shadow-[0_10px_40px_rgba(245,158,11,0.08)] py-3':'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogin}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] border border-amber-500/30 group-hover:border-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <ShieldAlert className="h-5 w-5 text-amber-500"/>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">BugRisk</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-[#0A0A0A]/60 border border-white/8 p-1.5 rounded-xl">
            {TABS.map((t,i) => (
              <button key={i} onClick={() => handleTabClick(t.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all overflow-hidden ${activePreview===t.id?'bg-white/8 text-white':'text-slate-500 hover:text-slate-300'}`}>
                {activePreview===t.id && <motion.div layoutId="pill" className="absolute inset-0 rounded-lg border border-amber-500/20 bg-amber-500/5" transition={{type:'spring',bounce:0.3}}/>}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:`${t.color}08`}}/>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" style={{backgroundImage:`linear-gradient(to right,transparent,${t.color},transparent)`}}/>
                <t.icon className="w-4 h-4 z-10 transition-colors" style={{color:activePreview===t.id?t.color:'inherit'}}/>
                <span className="z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={onLogin}
          className="group relative px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#030303] text-sm font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
          <span className="relative z-10">Login</span>
        </button>
      </div>
    </nav>
  );
};

/* ─── Hero ─── */
const Hero = ({ onNavigate }) => (
  <section className="relative z-10 pt-36 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-8">
      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>
      FP-Growth &amp; Apriori Engines Active
    </motion.div>
    <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.1}}
      className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-6">
      Predict Software Risk<br className="hidden md:block"/> Before Production
    </motion.h1>
    <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.2}}
      className="text-lg text-slate-400 max-w-2xl mb-10">
      Association Rule–Driven Defect Intelligence Platform. Discover hidden relationships in your codebase and identify risk hotspots instantly.
    </motion.p>
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.3}} className="flex items-center gap-4">
      <button onClick={() => onNavigate('dashboard')}
        className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#030303] font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center gap-2 overflow-hidden">
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
        <span className="relative z-10 flex items-center gap-2">Launch Demo <ChevronRight className="w-4 h-4"/></span>
      </button>
      <button onClick={() => window.open('https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases','_blank')}
        className="px-6 py-3 bg-[#0A0A0A] border border-amber-500/20 text-white font-medium rounded-lg hover:border-amber-500/40 hover:bg-amber-500/5 transition-all flex items-center gap-2">
        View on GitHub <ExternalLink className="w-4 h-4"/>
      </button>
    </motion.div>
  </section>
);

/* ─── Tech Stack ─── */
const TechStack = () => (
  <section className="relative z-10 py-8 border-y border-amber-500/10 bg-[#0A0A0A]/50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-bold text-amber-500/50 uppercase tracking-widest mb-5">Trusted Technology Stack</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-slate-400 font-medium">
        {['React','Spring Boot','FastAPI','PostgreSQL','Redis','Docker'].map(t=>(
          <span key={t} className="hover:text-amber-400 transition-colors cursor-default">{t}</span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Login Modal ─── */
function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('bugrisk_session', JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}/>

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
        >
          <div className="bg-[#0d0d0d] border border-amber-500/20 rounded-2xl p-8 shadow-[0_0_80px_rgba(245,158,11,0.15)]">
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition">
              <X className="w-4 h-4"/>
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                <ShieldAlert className="w-7 h-7 text-amber-400"/>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to access the BugRisk platform</p>
            </div>

            {/* Credentials hint */}
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 mb-6 text-xs font-mono">
              <p className="text-amber-400 font-bold mb-1">Demo credentials</p>
              <p className="text-slate-400">Admin: <span className="text-white">admin / admin123</span></p>
              <p className="text-slate-400">Engineer: <span className="text-white">engineer / engineer123</span></p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50"/>
                <input
                  type="text" required placeholder="Username"
                  value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50"/>
                <input
                  type={showPwd ? 'text' : 'password'} required placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition text-sm"
                />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition">
                  {showPwd ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0"/>{error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"/>Signing in...</>
                ) : 'Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Footer ─── */
const Footer = () => (
  <footer className="relative z-10 border-t border-amber-500/10 bg-[#030303] py-10 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-amber-500"/>
        <span className="font-bold text-white">BugRisk</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">GitHub</a>
        <a href="#" className="hover:text-amber-400 transition-colors">Documentation</a>
        <a href="https://github.com/PrathamMrana" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">Developer <ExternalLink className="w-3 h-3"/></a>
      </div>
    </div>
  </footer>
);

/* ─── Main Export ─── */
export default function LandingPage({ onLogin, isLoggedIn, onNavigate }) {
  const [activePreview, setActivePreview] = useState('graph');
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const h = (e) => setActivePreview(e.detail);
    document.addEventListener('setPreview', h);
    return () => document.removeEventListener('setPreview', h);
  }, []);

  const handleLoginSuccess = (data) => {
    setShowLoginModal(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 font-sans overflow-x-hidden">
      <Background/>
      <Navbar
        onLogin={() => setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
        onNavigate={onNavigate}
        activePreview={activePreview}
        setActivePreview={(id) => {
          setActivePreview(id);
          const el = document.getElementById('features');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <Hero onNavigate={onNavigate}/>
      <TechStack/>
      <FeatureShowcase activePreview={activePreview} onNavigate={onNavigate}/>
      <Footer/>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
        />
      )}
    </div>
  );
}
