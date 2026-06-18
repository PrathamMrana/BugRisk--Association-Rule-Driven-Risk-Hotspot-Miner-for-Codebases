import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

/* ─── Sticky Navbar ──────────────────────────────────────────────────────── */
function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(3, 7, 18, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 5,
            background: 'linear-gradient(135deg, #7C3AED, #6366F1, #38BDF8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 900, color: 'white',
          }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF', letterSpacing: '-0.3px' }}>BugRisk</span>
        </div>

        <div style={{ display: 'flex', gap: 28 }}>
          {['Showcase', 'Architecture'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = '#9CA3AF')}
            >
              {l}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = '#9CA3AF')}
          >
            GitHub
          </a>
        </div>

        <button
          onClick={onLogin}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#fff';
            e.target.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
            e.target.style.color = '#fff';
          }}
        >
          Launch App
        </button>
      </div>
    </motion.nav>
  );
}

/* ─── Moment 1: Hero Intelligence Engine Component ─────────────────────── */
function HeroEngine() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '780px',
        height: '240px',
        background: 'rgba(10, 14, 25, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: 16,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Magnetic Mouse Radial Glow */}
      <div style={{
        position: 'absolute',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
        left: mousePos.x - 120,
        top: mousePos.y - 120,
        pointerEvents: 'none',
        transition: 'transform 0.1s ease-out',
      }} />

      {/* SVG Connection Streams */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <path d="M 60,60 L 220,120" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" fill="none" />
        <path d="M 60,120 L 220,120" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" fill="none" />
        <path d="M 60,180 L 220,120" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" fill="none" />
        <path d="M 220,120 L 380,120" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1.5" fill="none" />

        {/* Floating pulse particles */}
        <motion.circle r="2" fill="#6366F1">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 60,60 L 220,120" />
        </motion.circle>
        <motion.circle r="2" fill="#7C3AED">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 60,120 L 220,120" />
        </motion.circle>
        <motion.circle r="2" fill="#38BDF8">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M 60,180 L 220,120" />
        </motion.circle>
        <motion.circle r="3" fill="#EF4444">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 220,120 L 380,120" />
        </motion.circle>
      </svg>

      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
        {/* Mined Node Items */}
        <div style={{ position: 'absolute', left: '30px', top: '45px', color: '#9CA3AF', fontSize: 11, fontFamily: 'monospace', background: 'rgba(10,14,25,0.7)', border: '1px solid rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: 8 }}>
          <span style={{ color: '#6366F1' }}>module</span>=auth
        </div>
        <div style={{ position: 'absolute', left: '30px', top: '105px', color: '#9CA3AF', fontSize: 11, fontFamily: 'monospace', background: 'rgba(10,14,25,0.7)', border: '1px solid rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: 8 }}>
          <span style={{ color: '#7C3AED' }}>language</span>=Java
        </div>
        <div style={{ position: 'absolute', left: '30px', top: '165px', color: '#9CA3AF', fontSize: 11, fontFamily: 'monospace', background: 'rgba(10,14,25,0.7)', border: '1px solid rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: 8 }}>
          <span style={{ color: '#38BDF8' }}>tech_stack</span>=JWT
        </div>

        {/* Connector Hub */}
        <div style={{
          position: 'absolute', left: '208px', top: '108px', width: 24, height: 24, borderRadius: '50%',
          background: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7C3AED',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px rgba(124, 58, 237, 0.25)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />
        </div>

        {/* Outcome Node */}
        <div style={{
          position: 'absolute', left: '360px', top: '105px', color: '#FFFFFF', fontSize: 11, fontFamily: 'monospace',
          background: 'rgba(10,14,25,0.7)', border: '1px solid rgba(239,68,68,0.1)', padding: '6px 12px', borderRadius: 8,
        }}>
          <span style={{ color: '#EF4444' }}>severity</span>=critical
        </div>

        {/* Metric parameters */}
        <div style={{
          position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace', fontSize: 10,
        }}>
          <div>
            <span style={{ color: '#6B7280' }}>support: </span>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>0.08</span>
          </div>
          <div>
            <span style={{ color: '#6B7280' }}>confidence: </span>
            <span style={{ color: '#10B981', fontWeight: 'bold' }}>92%</span>
          </div>
          <div>
            <span style={{ color: '#6B7280' }}>lift: </span>
            <span style={{ color: '#38BDF8', fontWeight: 'bold' }}>5.54x</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Moment 2: Apple Product Experience Showcase ───────────────────────── */
function Showcase() {
  const screenshots = [
    { id: 'command_center', label: 'AI Command Center', desc: 'Real-time telemetry diagnostics tracking rules count, lift, and auto-generated briefs.', src: '/screenshots/command_center.png' },
    { id: 'graph_explorer', label: 'Graph Explorer', desc: 'Force-directed mapping connecting codebase assets, tech configurations, and outcomes.', src: '/screenshots/graph_explorer.png' },
    { id: 'module_hotspots', label: 'Module Hotspots', desc: 'Normalized Defect Risk Index indicators with radial explainability contribution meters.', src: '/screenshots/module_hotspots.png' },
    { id: 'ml_analytics', label: 'ML Analytics', desc: 'Aggregated database insights, lift metric distributions, and transaction tracking.', src: '/screenshots/ml_analytics.png' },
    { id: 'algo_playground', label: 'Algo Playground', desc: 'Side-by-side execution benchmarks comparing FP-Growth tree recursion with candidate generation.', src: '/screenshots/pipeline.png' },
  ];

  const [activeTab, setActiveTab] = useState('command_center');
  const activeItem = screenshots.find((s) => s.id === activeTab);

  // Auto transition tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = screenshots.findIndex((s) => s.id === prev);
        return screenshots[(idx + 1) % screenshots.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        
        {/* Minimal Tab Bar */}
        <div style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(10, 14, 25, 0.45)',
          border: '1px solid rgba(255,255,255,0.03)',
          borderRadius: 10,
          padding: 4,
          backdropFilter: 'blur(20px)',
        }}>
          {screenshots.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: isActive ? '#fff' : '#6B7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Minimal, single description line */}
        <div style={{ height: 20, textAlign: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeItem.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: 13, color: '#9CA3AF' }}
            >
              {activeItem.desc}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* MacBook Frame Mockup */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          background: 'rgba(10, 14, 25, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 35px 70px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Top Bezel Notch */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
          </div>

          {/* Screen Content */}
          <div style={{ position: 'relative', height: 440, overflow: 'hidden', background: '#020617' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeItem.id}
                src={activeItem.src}
                alt={activeItem.label}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Moment 3: Isometric 3D Infrastructure Experience ───────────────────── */
function Infrastructure() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const layers = [
    { id: 'csv', label: 'CSV Ingestion', desc: 'Telemetry parsing', z: 60, color: '#38BDF8' },
    { id: 'spring', label: 'Spring Gateway', desc: 'Secure request broker', z: 30, color: '#6366F1' },
    { id: 'fastapi', label: 'FastAPI Service', desc: 'Pipeline runtime', z: 0, color: '#7C3AED' },
    { id: 'fpgrowth', label: 'FP-Growth Miner', desc: 'Mining computations', z: -30, color: '#EF4444' },
    { id: 'postgres', label: 'Postgres & Redis', desc: 'Storage & caching', z: -60, color: '#F59E0B' },
  ];

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        padding: '80px 24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '620px',
      }}
    >
      {/* 3D Wrapper */}
      <div style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        width: '100%',
        maxWidth: '900px',
        height: '400px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Isometric Rotated Container */}
        <motion.div
          animate={{
            rotateX: 48 + mouseOffset.y,
            rotateY: mouseOffset.x,
            rotateZ: -28,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
          }}
        >
          {/* Connection Line connecting the floating layers */}
          <div style={{
            position: 'absolute',
            width: '2px',
            background: 'linear-gradient(to bottom, #38BDF8 0%, #7C3AED 50%, #F59E0B 100%)',
            top: '40px',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%) translateZ(0px)',
            transformStyle: 'preserve-3d',
            zIndex: 1,
          }}>
            {/* Beam pulse */}
            <motion.div
              animate={{ y: ['-10%', '110%'] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '40px',
                background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
              }}
            />
          </div>

          {/* Floating layers */}
          {layers.map((layer) => {
            const isHovered = hoveredNode === layer.id;
            return (
              <div
                key={layer.id}
                onMouseEnter={() => setHoveredNode(layer.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  transform: `translateZ(${layer.z + (isHovered ? 15 : 0)}px)`,
                  transformStyle: 'preserve-3d',
                  background: 'rgba(10, 14, 25, 0.6)',
                  border: `1.5px solid ${isHovered ? layer.color : 'rgba(255, 255, 255, 0.04)'}`,
                  borderRadius: 12,
                  padding: '16px 24px',
                  width: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  backdropFilter: 'blur(20px)',
                  boxShadow: isHovered 
                    ? `0 10px 30px ${layer.color}15, 0 0 20px ${layer.color}10` 
                    : '0 5px 15px rgba(0,0,0,0.3)',
                  cursor: 'default',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s, box-shadow 0.3s',
                  zIndex: 2,
                }}
              >
                {/* Visual marker */}
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: layer.color,
                  boxShadow: `0 0 10px ${layer.color}`,
                }} />

                {/* Layer details */}
                <div style={{ transformStyle: 'preserve-3d' }}>
                  <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>{layer.label}</div>
                  <div style={{ color: '#6B7280', fontSize: 10, marginTop: 2 }}>{layer.desc}</div>
                </div>
                
                {/* Value index indicator */}
                <div style={{
                  marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: layer.color,
                  background: `${layer.color}10`, border: `1px solid ${layer.color}25`,
                  padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace',
                }}>
                  {layer.id.toUpperCase()}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Moment 4: Final CTA ────────────────────────────────────────────────── */
function Footer({ onLogin }) {
  return (
    <section style={{
      padding: '80px 24px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Massive radial background glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        bottom: '-250px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          fontSize: '38px',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-1px',
          lineHeight: 1.15,
          marginBottom: 32,
        }}>
          Ready to understand your codebase<br />before it breaks?
        </h2>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button
            onClick={onLogin}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #6366F1, #38BDF8)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 50px rgba(124, 58, 237, 0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'none')}
          >
            Launch BugRisk
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.06)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.02)')}
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  return (
    <div style={{
      background: '#020617',
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#FFFFFF',
      overflowX: 'hidden',
    }}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 3px; }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <Showcase />
      <Infrastructure />
      <Footer onLogin={onLogin} />
    </div>
  );
}
