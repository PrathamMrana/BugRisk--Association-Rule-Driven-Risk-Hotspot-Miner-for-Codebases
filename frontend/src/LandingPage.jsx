import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

/* ─── Hero Intelligence Canvas ───────────────────────────────────────────── */
function IntelligenceCanvas() {
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
        height: '460px',
        background: 'rgba(10, 14, 25, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Mouse Follow Radial Glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        left: mousePos.x - 150,
        top: mousePos.y - 150,
        pointerEvents: 'none',
        transition: 'transform 0.1s ease-out',
      }} />

      {/* Floating Particle Flow background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {/* Connection paths */}
        <motion.path
          d="M 60,110 L 220,220"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        <motion.path
          d="M 60,220 L 220,220"
          stroke="rgba(124, 58, 237, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        <motion.path
          d="M 60,330 L 220,220"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        <motion.path
          d="M 220,220 L 380,220"
          stroke="rgba(239, 68, 68, 0.25)"
          strokeWidth="2"
          fill="none"
        />

        {/* Animated Particles flowing along paths */}
        <motion.circle r="3" fill="#6366F1">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 60,110 L 220,220" />
        </motion.circle>
        <motion.circle r="3" fill="#7C3AED">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 60,220 L 220,220" />
        </motion.circle>
        <motion.circle r="3" fill="#38BDF8">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 60,330 L 220,220" />
        </motion.circle>
        <motion.circle r="4" fill="#EF4444">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 220,220 L 380,220" />
        </motion.circle>
      </svg>

      {/* Nodes overlays */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
        {/* Antecedents */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '30px', top: '90px',
            background: 'rgba(10,14,25,0.8)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 10, padding: '10px 16px', color: '#9CA3AF', fontSize: 13,
            fontFamily: 'monospace', backdropFilter: 'blur(20px)',
          }}
        >
          <span style={{ color: '#6366F1' }}>module</span>=auth
        </motion.div>

        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '30px', top: '200px',
            background: 'rgba(10,14,25,0.8)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 10, padding: '10px 16px', color: '#9CA3AF', fontSize: 13,
            fontFamily: 'monospace', backdropFilter: 'blur(20px)',
          }}
        >
          <span style={{ color: '#7C3AED' }}>language</span>=Java
        </motion.div>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '30px', top: '310px',
            background: 'rgba(10,14,25,0.8)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 10, padding: '10px 16px', color: '#9CA3AF', fontSize: 13,
            fontFamily: 'monospace', backdropFilter: 'blur(20px)',
          }}
        >
          <span style={{ color: '#38BDF8' }}>tech_stack</span>=JWT
        </motion.div>

        {/* Aggregator Hub */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '205px', top: '205px',
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.15)', border: '2px solid #7C3AED',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED' }} />
        </motion.div>

        {/* Consequent Outcome */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '360px', top: '200px',
            background: 'rgba(10,14,25,0.8)', border: '1px solid rgba(239, 68, 68, 0.15)',
            borderRadius: 10, padding: '10px 16px', color: '#fff', fontSize: 13,
            fontFamily: 'monospace', backdropFilter: 'blur(20px)',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.05)',
          }}
        >
          <span style={{ color: '#EF4444' }}>severity</span>=critical
        </motion.div>

        {/* Floating Metrics Overlay */}
        <div style={{
          position: 'absolute', right: '24px', bottom: '24px',
          background: 'rgba(10, 14, 25, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 12, padding: '14px 20px', display: 'flex', gap: 20,
          fontFamily: 'monospace', fontSize: 11,
        }}>
          <div>
            <div style={{ color: '#6B7280' }}>support</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, marginTop: 2 }}>0.08</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div>
            <div style={{ color: '#6B7280' }}>confidence</div>
            <div style={{ color: '#10B981', fontWeight: 'bold', fontSize: 13, marginTop: 2 }}>92%</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div>
            <div style={{ color: '#6B7280' }}>lift</div>
            <div style={{ color: '#38BDF8', fontWeight: 'bold', fontSize: 13, marginTop: 2 }}>5.54x</div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 80,
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* Left Headline */}
        <div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            STOP REACTING.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>START PREDICTING.</span>
          </h1>

          <p style={{
            fontSize: 16,
            color: '#9CA3AF',
            lineHeight: 1.6,
            marginBottom: 36,
            maxWidth: 480,
          }}>
            BugRisk discovers hidden defect patterns using association rule mining, surfacing hotspots before they trigger production failure.
          </p>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={onLogin}
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #6366F1, #38BDF8)',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 50px rgba(124, 58, 237, 0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.target.style.transform = 'none')}
            >
              Launch Demo
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
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.06)')}
              onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.02)')}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Right Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <IntelligenceCanvas />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Product Showcase Experience ───────────────────────────────────────── */
function Showcase() {
  const screenshots = [
    {
      id: 'command_center',
      label: 'AI Command Center',
      desc: 'Real-time telemetry diagnostics tracking rules count, lift, and auto-generated root-cause explanations.',
      src: '/screenshots/command_center.png',
    },
    {
      id: 'graph_explorer',
      label: 'Graph Explorer',
      desc: 'Force-directed mapping connecting codebase assets, tech configurations, and outcome severities.',
      src: '/screenshots/graph_explorer.png',
    },
    {
      id: 'module_hotspots',
      label: 'Module Hotspots',
      desc: 'Normalized Defect Risk Index indicators with radial explainability contribution meters.',
      src: '/screenshots/module_hotspots.png',
    },
    {
      id: 'ml_analytics',
      label: 'ML Analytics',
      desc: 'Aggregated database insights, lift metric distributions, and transaction parameter tracking.',
      src: '/screenshots/ml_analytics.png',
    },
    {
      id: 'algo_playground',
      label: 'Algo Playground',
      desc: 'Side-by-side execution benchmarks comparing FP-Growth tree recursion with candidate generation.',
      src: '/screenshots/pipeline.png',
    },
  ];

  const [activeTab, setActiveTab] = useState('command_center');
  const activeItem = screenshots.find((s) => s.id === activeTab);

  return (
    <section id="showcase" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 50, alignItems: 'center' }}>
          {/* Left Panel: Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {screenshots.map((s) => {
              const isActive = activeTab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    borderRadius: 10,
                    padding: '14px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: isActive ? '#fff' : '#6B7280',
                    fontFamily: '-apple-system, sans-serif',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDesc"
                      style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, lineHeight: 1.3 }}
                    >
                      {s.desc}
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Browser Mockup */}
          <div style={{
            background: 'rgba(10, 14, 25, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Header bar */}
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

            {/* Content screen */}
            <div style={{ position: 'relative', height: 420, overflow: 'hidden', background: '#030712' }}>
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
      </div>
    </section>
  );
}

/* ─── Animated Architecture Pipeline ────────────────────────────────────── */
function Architecture() {
  const nodes = [
    { id: 'csv', label: 'CSV', desc: 'Ingest' },
    { id: 'spring', label: 'Spring Boot', desc: 'Gateway' },
    { id: 'fastapi', label: 'FastAPI', desc: 'Orchestrator' },
    { id: 'fpgrowth', label: 'FP-Growth', desc: 'Mining Engine' },
    { id: 'postgres', label: 'PostgreSQL', desc: 'Durable DB' },
    { id: 'redis', label: 'Redis', desc: 'Telemetry Cache' },
    { id: 'dashboard', label: 'Dashboard', desc: 'Visualization' },
  ];
  
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % nodes.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="architecture" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Microservices Pipeline</h2>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          padding: '40px 0',
        }}>
          {nodes.map((node, idx) => {
            const isActive = activeIdx === idx;
            return (
              <React.Fragment key={node.id}>
                {/* Node */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 110,
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {/* Circle */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'rgba(10, 14, 25, 0.55)',
                      border: `1.5px solid ${isActive ? '#7C3AED' : 'rgba(255, 255, 255, 0.05)'}`,
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive ? '0 0 20px rgba(124, 58, 237, 0.3)' : 'none',
                      transition: 'border 0.3s',
                    }}
                  >
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isActive ? '#7C3AED' : 'rgba(255, 255, 255, 0.15)',
                      transition: 'background 0.3s',
                    }} />
                  </motion.div>

                  <div style={{ color: isActive ? '#fff' : '#6B7280', fontSize: 13, fontWeight: 600, marginTop: 14, textAlign: 'center', transition: 'color 0.3s' }}>
                    {node.label}
                  </div>
                  <div style={{ color: '#6B7280', fontSize: 10, marginTop: 2, textAlign: 'center' }}>
                    {node.desc}
                  </div>
                </div>

                {/* Line connector with flowing light beam */}
                {idx < nodes.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: 1.5,
                    background: 'rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(to right, transparent, #7C3AED, transparent)',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */
function Footer({ onLogin }) {
  return (
    <section style={{
      padding: '160px 24px 120px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Soft Purple Radial Glow */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        bottom: '-300px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '44px',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Ready to understand your codebase<br />before it breaks?
        </h2>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36 }}>
          <button
            onClick={onLogin}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #6366F1, #38BDF8)',
              color: '#fff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: 8,
              fontSize: 14,
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
              padding: '12px 32px',
              borderRadius: 8,
              fontSize: 14,
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

        <div style={{ marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 30 }}>
          <span style={{ fontSize: 11, color: '#6B7280' }}>
            BugRisk Defect Platform · Built for high-fidelity portfolio presentation
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  return (
    <div style={{
      background: '#030712',
      backgroundImage: 'radial-gradient(circle at 50% 0%, #07101F 0%, #050816 50%, #030712 100%)',
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#FFFFFF',
      overflowX: 'hidden',
    }}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <Showcase />
      <Architecture />
      <Footer onLogin={onLogin} />
    </div>
  );
}
