import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

/* ─── Animated Counter ────────────────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const isFloat = target % 1 !== 0;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Interactive Hero Canvas (Magnetic Particle Network) ─────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: null, y: null, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      glow: Math.random() > 0.7,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Draw grid pattern in background
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Magnet attraction
        if (mouse.active && mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += dx * 0.02;
            p.y += dy * 0.02;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.glow ? 'rgba(167, 139, 250, 0.6)' : 'rgba(59, 130, 246, 0.3)';
        ctx.fill();
      });

      // Connect lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Brighten line if close to mouse
            let isHovered = false;
            if (mouse.active && mouse.x !== null) {
              const mxA = mouse.x - particles[i].x;
              const myA = mouse.y - particles[i].y;
              const distMouse = Math.sqrt(mxA * mxA + myA * myA);
              if (distMouse < 100) isHovered = true;
            }

            ctx.strokeStyle = isHovered 
              ? `rgba(139, 92, 246, ${0.25 * (1 - dist / 130)})`
              : `rgba(255, 255, 255, ${0.05 * (1 - dist / 130)})`;
            ctx.lineWidth = isHovered ? 1.2 : 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
      }}
      onMouseLeave={() => setMouse({ x: null, y: null, active: false })}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
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
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(7, 10, 19, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: 'white',
          }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: 'white', letterSpacing: '-0.5px' }}>BugRisk</span>
        </div>
        {/* Center Links */}
        <div style={{ display: 'flex', gap: 32 }}>
          {['Architecture', 'Showcase', 'Metrics', 'Timeline'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
            >
              {l}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#fff')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
          >
            GitHub
          </a>
        </div>
        {/* Launch Button */}
        <div>
          <button
            onClick={onLogin}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#fff';
            }}
          >
            Launch App
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: 80,
    }}>
      <HeroCanvas />
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 48,
        alignItems: 'center',
      }}>
        {/* Left Side: Statement */}
        <div style={{ textAlign: 'left' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(124, 58, 237, 0.07)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              padding: '4px 12px',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 600,
              color: '#a78bfa',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', display: 'inline-block' }} />
            Association Rule Mining Engine
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(44px, 6vw, 76px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-2px',
              marginBottom: 24,
              color: '#fff',
            }}
          >
            STOP REACTING.<br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #3b82f6 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>START PREDICTING.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: 540,
            }}
          >
            BugRisk discovers hidden defect patterns in your commit histories using association rule mining, isolating risk hotspots before they reach production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 16 }}
          >
            <button
              onClick={onLogin}
              style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Launch Demo
            </button>
            <a
              href="#architecture"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Architecture
            </a>
          </motion.div>
        </div>

        {/* Right Side: Subtle floating code structure / rule preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: 16,
            padding: 24,
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>ASSOCIATION_RULE_MINING</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Antecedent Set</div>
              <code style={{ fontSize: 13, color: '#a78bfa' }}>module=auth, language=Java, tech_stack=JWT</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>↓</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Consequent Outcome</div>
              <code style={{ fontSize: 13, color: '#f87171' }}>bug_type=security, severity=critical</code>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 4 }}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Support</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>0.08</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Confidence</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>92%</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: 8, borderRadius: 6 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Lift</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>5.54x</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Interactive Architecture Flow ─────────────────────────────────────── */
function Architecture() {
  const steps = [
    { id: 'upload', label: 'CSV Upload', desc: 'Defect telemetry ingestion', color: '#06B6D4' },
    { id: 'gateway', label: 'Spring Boot', desc: 'Secure gateway controller', color: '#10B981' },
    { id: 'fastapi', label: 'FastAPI ML', desc: 'Mining orchestration agent', color: '#7C3AED' },
    { id: 'fpgrowth', label: 'FP-Growth', desc: 'Frequent-pattern rule miner', color: '#EF4444' },
    { id: 'dbs', label: 'Postgres + Redis', desc: 'Transactional & cached layer', color: '#F59E0B' },
    { id: 'dashboards', label: 'Dashboards', desc: 'Interactive prediction UI', color: '#3B82F6' },
  ];
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section id="architecture" style={{ padding: '120px 24px', background: '#070A13' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Data Pipeline Flow</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: 12, letterSpacing: '-1px' }}>Platform Architecture Topology</h2>
        </div>

        {/* Animated Pipeline Nodes */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          flexWrap: 'wrap',
          gap: 24,
          padding: '40px 0',
        }}>
          {steps.map((step, idx) => {
            const isHovered = hoveredNode === step.id;
            return (
              <React.Fragment key={step.id}>
                {/* Node */}
                <div
                  onMouseEnter={() => setHoveredNode(step.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'relative',
                    background: 'rgba(255,255,255,0.01)',
                    border: `1px solid ${isHovered ? step.color : 'rgba(255, 255, 255, 0.06)'}`,
                    borderRadius: 14,
                    padding: '24px 20px',
                    width: 175,
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isHovered ? `0 0 30px ${step.color}15` : 'none',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    color: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    margin: '0 auto 12px',
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{step.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4, lineHeight: 1.3 }}>{step.desc}</div>
                </div>

                {/* Connection Arrow with pulse line */}
                {idx < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                    minWidth: 40,
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'linear',
                      }}
                      style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        background: `linear-gradient(to right, transparent, ${isHovered ? step.color : '#7C3AED'}, transparent)`,
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

/* ─── MacBook/Browser Screenshots Showcase ──────────────────────────────── */
function Showcase() {
  const screenshots = [
    {
      id: 'command_center',
      label: 'AI Command Center',
      desc: 'Real-time telemetry diagnostics tracking rules count, lift, and auto-generated explanation briefs.',
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
    <section id="showcase" style={{ padding: '120px 24px', background: '#090D1A' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Showcase</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: 12, letterSpacing: '-1px' }}>Product Demonstration Interface</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left Panel: Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {screenshots.map((s) => {
              const isActive = activeTab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    borderRadius: 10,
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, lineHeight: 1.4 }}
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
            background: '#070a13',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Browser Header */}
            <div style={{
              background: '#0b0f19',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 6,
                padding: '4px 20px',
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                margin: '0 auto',
                width: 250,
                textAlign: 'center',
              }}>
                bugrisk.vercel.app/dashboard
              </div>
            </div>

            {/* Screen */}
            <div style={{ position: 'relative', height: 460, overflow: 'hidden', background: '#000' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={activeItem.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
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

/* ─── Engineering Metrics ────────────────────────────────────────────────── */
function Metrics() {
  const items = [
    { value: 2400, suffix: '+', label: 'Rules Mined' },
    { value: 87, suffix: '%', label: 'Confidence' },
    { value: 5.5, suffix: 'x', label: 'Lift Metric' },
    { value: 8, suffix: '', label: 'Pipeline Stages' },
    { value: 5, suffix: '', label: 'Microservices' },
  ];

  return (
    <section id="metrics" style={{ padding: '80px 24px', background: '#070A13', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 32,
        }}>
          {items.map((item) => (
            <div key={item.label} style={{ textAlign: 'center', flex: 1, minWidth: 140 }}>
              <div style={{
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: '-2px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(124, 58, 237, 0.2)',
              }}>
                <Counter target={item.value} suffix={item.suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, fontWeight: 500 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Code Intelligence Section ──────────────────────────────────────────── */
function CodeIntelligence() {
  return (
    <section style={{ padding: '120px 24px', background: '#090D1A' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* Left Side: Explanation */}
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Technical Paradigm</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: 12, letterSpacing: '-1px', marginBottom: 20 }}>
            Structured Pattern Intelligence
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 24 }}>
            BugRisk translates transaction logs into formal, mathematical association rules. Below is a mined rule representation of a common defect pathway.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Rule Lift</span>
              <strong style={{ color: '#fff', fontSize: 14 }}>5.54x (Strong Association)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Rule Confidence</span>
              <strong style={{ color: '#fff', fontSize: 14 }}>92.0% (Highly Predictable)</strong>
            </div>
          </div>
        </div>

        {/* Right Side: Code Editor Mockup */}
        <div style={{
          background: '#070a13',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 14,
          overflow: 'hidden',
          fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
          fontSize: 13,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          {/* Header */}
          <div style={{
            background: '#0c0f19',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>rules_engine.py</span>
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </div>

          {/* Code Body */}
          <pre style={{ margin: 0, padding: 24, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#F472B6' }}>import</span> ml_miner <span style={{ color: '#F472B6' }}>as</span> miner{"\n\n"}
            rule_context = miner.AssociationRule({"\n"}
            {"  "}antecedents=[<span style={{ color: '#38BDF8' }}>"module=auth"</span>, <span style={{ color: '#38BDF8' }}>"language=java"</span>],{"\n"}
            {"  "}consequents=[<span style={{ color: '#38BDF8' }}>"severity=critical"</span>]{"\n"}
            ){"\n\n"}
            <span style={{ color: '#6B7280' }}># Mined values extraction parameters</span>{"\n"}
            rule_metrics = {"\n"}
            {"  "}<span style={{ color: '#10B981' }}>"support"</span>: <span style={{ color: '#F59E0B' }}>0.08</span>,{"\n"}
            {"  "}<span style={{ color: '#10B981' }}>"confidence"</span>: <span style={{ color: '#F59E0B' }}>0.92</span>,{"\n"}
            {"  "}<span style={{ color: '#10B981' }}>"lift"</span>: <span style={{ color: '#F59E0B' }}>5.54</span>{"\n"}
            {"}"}
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ─── Roadmap Timeline ───────────────────────────────────────────────────── */
function Timeline() {
  const items = [
    { title: 'v1.0 Release', desc: 'Frequent-pattern mining algorithm & Spring/FastAPI orchestration core.', status: 'done' },
    { title: 'v1.5 Update', desc: 'System Graph Explorer network mapping visualizer built with React Flow.', status: 'done' },
    { title: 'v2.0 Milestone', desc: 'Natural language root-cause explanation engine integration.', status: 'planned' },
    { title: 'v2.5 Milestone', desc: 'Git repository webhooks triggers for automatic push scanning.', status: 'planned' },
    { title: 'v3.0 Target', desc: 'Continuous deployment (CI/CD) pipelines quality gates integration.', status: 'planned' },
  ];

  return (
    <section id="timeline" style={{ padding: '120px 24px', background: '#070A13' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Product Roadmap</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: 12, letterSpacing: '-1px' }}>Timeline & Milestones</h2>
        </div>

        {/* Timeline Line */}
        <div style={{ position: 'relative', paddingLeft: 40 }}>
          <div style={{
            position: 'absolute',
            left: 19,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, #7C3AED 0%, rgba(255,255,255,0.05) 100%)',
          }} />

          {items.map((item, idx) => (
            <div key={item.title} style={{ position: 'relative', marginBottom: 48 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: -31,
                top: 4,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: item.status === 'done' ? '#7C3AED' : '#070A13',
                border: `2px solid ${item.status === 'done' ? '#7C3AED' : 'rgba(255, 255, 255, 0.15)'}`,
                boxShadow: item.status === 'done' ? '0 0 15px rgba(124, 58, 237, 0.5)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 10,
              }}>
                {item.status === 'done' ? '✓' : ''}
              </div>
              {/* Title & Desc */}
              <div>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: item.status === 'done' ? '#fff' : 'rgba(255,255,255,0.5)',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: item.status === 'done' ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)',
                  marginTop: 6,
                  lineHeight: 1.5,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */
function Footer({ onLogin }) {
  return (
    <section style={{
      padding: '140px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#090D1A',
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center 60%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 60px)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '-2px',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Ready to understand your codebase<br />
          before it breaks?
        </h2>
        <p style={{
          fontSize: 17,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 40,
          maxWidth: 500,
          margin: '0 auto 40px',
        }}>
          Upload your commits database, run FP-Growth algorithms, and map risks in under 60 seconds.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button
            onClick={onLogin}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '12px 32px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => (e.target.style.boxShadow = '0 0 30px rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.target.style.boxShadow = 'none')}
          >
            Launch BugRisk
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.08)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.03)')}
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
      background: '#070a13',
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      color: '#fff',
      overflowX: 'hidden',
    }}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #070a13; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 3px; }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <Architecture />
      <Showcase />
      <Metrics />
      <CodeIntelligence />
      <Timeline />
      <Footer onLogin={onLogin} />
    </div>
  );
}
