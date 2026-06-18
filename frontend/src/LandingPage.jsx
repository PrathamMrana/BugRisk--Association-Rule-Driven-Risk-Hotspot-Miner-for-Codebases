import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';
const DEMO_URL = '#login';

/* ─── Reusable animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = (delay = 0.1) => ({
  visible: { transition: { staggerChildren: delay } },
});

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

/* ─── Animated Counter ────────────────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useScrollInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const isFloat = target % 1 !== 0;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Floating Orbs Background ───────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{
        position: 'absolute', width: 600, height: 600,
        borderRadius: '50%', top: '-10%', left: '-5%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        animation: 'pulse-orb 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500,
        borderRadius: '50%', top: '20%', right: '-10%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        animation: 'pulse-orb 10s ease-in-out infinite 2s',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%', bottom: '10%', left: '30%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        animation: 'pulse-orb 12s ease-in-out infinite 4s',
      }} />
    </div>
  );
}

/* ─── Animated Network Background ────────────────────────────────────────── */
function NetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,0.5)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }} />;
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(11,17,32,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 900, color: 'white',
          }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.5px' }}>BugRisk</span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#7C3AED',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            padding: '2px 6px', borderRadius: 4, letterSpacing: '0.05em',
          }}>v2</span>
        </div>
        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'Architecture', 'Screenshots', 'Roadmap'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
              {l}
            </a>
          ))}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
            style={{
              color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <button onClick={onLogin} style={{
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            color: 'white', border: 'none', padding: '8px 20px',
            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}>
            Launch App →
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 80 }}>
      <NetworkCanvas />
      <FloatingOrbs />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            padding: '6px 16px', borderRadius: 100, fontSize: 13, color: '#a78bfa',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Association Rule Mining · FP-Growth · AI Risk Analysis
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-3px', marginBottom: 24, color: 'white' }}>
          <span style={{ display: 'block' }}>Stop Reacting.</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Start Predicting.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 48, maxWidth: 680, margin: '0 auto 48px' }}>
          BugRisk mines your defect history using <strong style={{ color: '#a78bfa' }}>FP-Growth association rules</strong> to surface hidden risk patterns, rank hotspot modules, and explain failures before they reach production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
          <button onClick={onLogin} style={{
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            color: 'white', border: 'none', padding: '14px 32px',
            borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 0 40px rgba(124,58,237,0.4)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 60px rgba(124,58,237,0.6)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 40px rgba(124,58,237,0.4)'; }}>
            🚀 Launch Demo
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'white', padding: '14px 32px', borderRadius: 12,
            fontSize: 16, fontWeight: 600, textDecoration: 'none',
            backdropFilter: 'blur(10px)', transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View Source
          </a>
          <a href="#architecture" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: '1px solid rgba(124,58,237,0.4)',
            color: '#a78bfa', padding: '14px 32px', borderRadius: 12,
            fontSize: 16, fontWeight: 600, textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Architecture ↓
          </a>
        </motion.div>

        {/* Floating stat pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[['202+', 'Rules Mined'], ['85.7%', 'Avg Confidence'], ['5.5×', 'Avg Lift'], ['8', 'Pipeline Stages']].map(([val, label]) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)', borderRadius: 12, padding: '12px 20px',
              textAlign: 'center', minWidth: 100,
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#a78bfa' }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)', animation: 'pulse-orb 2s ease-in-out infinite' }} />
      </motion.div>
    </section>
  );
}

/* ─── Problem / Solution ─────────────────────────────────────────────────── */
function ProblemSolution() {
  const [ref, inView] = useScrollInView();
  return (
    <section style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div ref={ref} variants={stagger(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>The Problem</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Traditional debugging is <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>reactive</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center' }}>
            {/* Problem */}
            <motion.div variants={fadeUp} style={{
              background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 20, padding: 40,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: '0.1em', marginBottom: 24, textTransform: 'uppercase' }}>Traditional Debugging</div>
              {['Reacts after the bug ships', 'Hard to explain to stakeholders', 'Same modules fail repeatedly', 'No pattern awareness', 'Expensive post-mortems'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#ef4444', flexShrink: 0 }}>✕</div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{t}</span>
                </div>
              ))}
            </motion.div>

            {/* Arrow */}
            <motion.div variants={fadeIn} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, boxShadow: '0 0 30px rgba(124,58,237,0.4)',
              }}>→</div>
            </motion.div>

            {/* Solution */}
            <motion.div variants={fadeUp} style={{
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 20, padding: 40,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.1em', marginBottom: 24, textTransform: 'uppercase' }}>BugRisk</div>
              {['Predicts risk before deployment', 'Explainable AI with association rules', 'Detects recurring defect patterns', 'Module-level risk scoring', 'Interactive graph exploration'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#a78bfa', flexShrink: 0 }}>✓</div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, tags, color, delay }) {
  const [ref, inView] = useScrollInView();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20, padding: 32,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: color + '20', border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, marginBottom: 20,
        boxShadow: hovered ? `0 0 20px ${color}30` : 'none',
        transition: 'box-shadow 0.3s',
      }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10, letterSpacing: '-0.3px' }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 600, color: color,
            background: color + '15', border: `1px solid ${color}30`,
            padding: '3px 10px', borderRadius: 6, letterSpacing: '0.03em',
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Features Section ───────────────────────────────────────────────────── */
function Features() {
  const features = [
    { icon: '🔬', title: 'Dataset Intelligence', desc: 'Automatic schema validation, duplicate detection, missing value analysis, and quality scoring with completeness rates per column.', tags: ['Schema Validation', 'Quality Score', 'Completeness'], color: '#06B6D4' },
    { icon: '⛏️', title: 'FP-Growth Mining', desc: 'Efficient frequent-pattern tree mining without candidate generation. Mines hundreds of rules from thousands of defect records in seconds.', tags: ['FP-Growth', 'Apriori', 'Support', 'Confidence', 'Lift'], color: '#7C3AED' },
    { icon: '🎯', title: 'Risk Hotspot Scoring', desc: 'Every module gets a Defect Risk Index (0–100) weighted by rule strength, category contributions, and normalized lift factors.', tags: ['0–100 Score', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], color: '#ef4444' },
    { icon: '🤖', title: 'AI Command Center', desc: 'Executive dashboard with natural-language root cause explanations, telemetry risk rankings, and severity distribution charts.', tags: ['Root Cause', 'Rankings', 'Explainability'], color: '#3B82F6' },
    { icon: '🕸️', title: 'Graph Explorer', desc: 'ReactFlow force-weighted graph mapping associations across modules, tech stacks, languages, and defect severities. 18+ node types.', tags: ['React Flow', 'Interactive', 'Node Drilldowns'], color: '#8B5CF6' },
    { icon: '📡', title: 'Pipeline Streaming', desc: 'Real-time 8-stage scan execution via Server-Sent Events. Watch FP-Growth mine your codebase live with animated progress tracking.', tags: ['SSE', 'Real-time', '8 Stages'], color: '#10B981' },
    { icon: '⏱️', title: 'Risk Time Machine', desc: 'Historical scan analysis across 49+ recorded scans. Runtime trends, rule evolution charts, and dataset hash fingerprinting.', tags: ['Scan History', 'Trends', 'Comparison'], color: '#F59E0B' },
    { icon: '📊', title: 'ML Analytics', desc: 'Mining quality metrics from PostgreSQL: avg confidence, lift distributions, rules-per-module breakdown, and severity outcome analysis.', tags: ['Confidence', 'Lift', 'Distribution'], color: '#EC4899' },
  ];
  return (
    <section id="features" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Platform Features</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Everything you need to<br />
            <span style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              understand your codebase risk
            </span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.05} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Architecture ───────────────────────────────────────────────────────── */
function Architecture() {
  const [ref, inView] = useScrollInView();
  const layers = [
    { label: 'React + Vite Frontend', sublabel: 'ReactFlow · Recharts · Framer Motion · Axios · SSE', color: '#3B82F6', icon: '⚛️' },
    { label: 'Spring Boot Gateway', sublabel: 'JWT Auth · REST API · SseEmitter · WebClient', color: '#10B981', icon: '☕' },
    { label: 'FastAPI ML Service', sublabel: 'FP-Growth · Apriori · Risk Engine · Dataset Profiler', color: '#7C3AED', icon: '🐍' },
    { label: 'PostgreSQL + Redis', sublabel: 'Rules · Module Risks · Scan History · Cache TTL', color: '#F59E0B', icon: '🗄️' },
    { label: 'Docker Compose', sublabel: 'Containerized · Named Volumes · Health Checks', color: '#06B6D4', icon: '🐳' },
  ];
  return (
    <section id="architecture" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Architecture</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px' }}>
            Built for <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>scale</span>
          </h2>
        </motion.div>
        <motion.div ref={ref} variants={stagger(0.12)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {layers.map((layer, i) => (
            <React.Fragment key={layer.label}>
              <motion.div variants={fadeUp} style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${layer.color}30`,
                borderRadius: 16, padding: '20px 28px',
                display: 'flex', alignItems: 'center', gap: 20,
                backdropFilter: 'blur(10px)',
                position: 'relative',
                boxShadow: `0 0 40px ${layer.color}08`,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: layer.color + '15', border: `1px solid ${layer.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>{layer.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 16 }}>{layer.label}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{layer.sublabel}</div>
                </div>
                <div style={{
                  marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: layer.color,
                  background: layer.color + '15', border: `1px solid ${layer.color}30`,
                  padding: '4px 12px', borderRadius: 6,
                }}>Layer {i + 1}</div>
              </motion.div>
              {i < layers.length - 1 && (
                <motion.div variants={fadeIn} style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <div style={{
                    width: 2, height: 32,
                    background: `linear-gradient(to bottom, ${layers[i].color}60, ${layers[i + 1].color}60)`,
                  }} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Screenshots Carousel ───────────────────────────────────────────────── */
function Screenshots() {
  const slides = [
    { src: '/screenshots/command_center.png', label: 'AI Command Center', desc: '202 rules mined · database 100/100 CRITICAL · real-time risk rankings' },
    { src: '/screenshots/rules_explorer.png', label: 'Mined Rules Database', desc: 'Paginated rules with Jaccard clustering · filter by lift, confidence, support' },
    { src: '/screenshots/graph_explorer.png', label: 'System Graph Explorer', desc: '18-node force-weighted graph · animated pathways · node drilldowns' },
    { src: '/screenshots/module_hotspots.png', label: 'Module Hotspots Analyzer', desc: 'Per-module risk scores · contributing rules · AI explainability brief' },
    { src: '/screenshots/ml_analytics.png', label: 'ML Analytics Dashboard', desc: '5.54× avg lift · 85.7% confidence · 49-point scan history trends' },
    { src: '/screenshots/pipeline.png', label: 'Pipeline Streaming', desc: 'Real-time SSE scan · dataset intelligence panel · quality scoring' },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="screenshots" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Screenshots</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px' }}>
            See it in <span style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>action</span>
          </h2>
        </motion.div>

        {/* Main screenshot */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: 24, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
          <AnimatePresence mode="wait">
            <motion.img key={active} src={slides[active].src} alt={slides[active].label}
              initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'cover' }} />
          </AnimatePresence>
          {/* Overlay label */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(11,17,32,0.95), transparent)',
            padding: '60px 32px 28px',
          }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: 'white' }}>{slides[active].label}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{slides[active].desc}</div>
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${slides.length}, 1fr)`, gap: 10 }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              border: `2px solid ${i === active ? '#7C3AED' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: 'none',
              padding: 0, transition: 'all 0.2s', opacity: i === active ? 1 : 0.5,
              transform: i === active ? 'scale(1.03)' : 'scale(1)',
            }}>
              <img src={s.src} alt={s.label} style={{ width: '100%', display: 'block', height: 60, objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics ────────────────────────────────────────────────────────────── */
function Metrics() {
  const stats = [
    { value: 2400, suffix: '+', label: 'Rules Mined', sub: 'across all scans' },
    { value: 87, suffix: '%', label: 'Avg Confidence', sub: 'rule predictability' },
    { value: 5.5, suffix: '×', label: 'Average Lift', sub: 'max 10.74×' },
    { value: 8, suffix: '', label: 'Pipeline Stages', sub: 'SSE streaming' },
    { value: 5, suffix: '', label: 'Microservices', sub: 'Docker Compose' },
    { value: 100, suffix: '%', label: 'Dockerized', sub: 'prod-ready' },
  ];
  return (
    <section style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 50%, rgba(59,130,246,0.05) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>By The Numbers</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px' }}>
            Validated. <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Measured. Real.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '32px 24px', textAlign: 'center',
                backdropFilter: 'blur(10px)',
              }}>
              <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontWeight: 700, color: 'white', fontSize: 15, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack ─────────────────────────────────────────────────────────── */
function TechStack() {
  const techs = [
    { name: 'React 19', icon: '⚛️', color: '#61DAFB' },
    { name: 'Spring Boot', icon: '☕', color: '#6DB33F' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'FP-Growth', icon: '🌲', color: '#FF6B35' },
    { name: 'Apriori', icon: '📐', color: '#FFB347' },
    { name: 'React Flow', icon: '🕸️', color: '#FF0072' },
    { name: 'Recharts', icon: '📊', color: '#3B82F6' },
    { name: 'JWT Auth', icon: '🔐', color: '#000000' },
    { name: 'Framer Motion', icon: '🎞️', color: '#BB4EFF' },
  ];
  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Tech Stack</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px' }}>
            Production-grade <span style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>technologies</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
          {techs.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.06, y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}25`,
                borderRadius: 14, padding: '20px 16px', textAlign: 'center',
                cursor: 'default', transition: 'border-color 0.2s',
              }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Roadmap ────────────────────────────────────────────────────────────── */
function Roadmap() {
  const items = [
    { icon: '🤖', title: 'LLM Root Cause Explanations', desc: 'GPT-4/Gemini integration for natural-language defect briefings per module', status: 'planned' },
    { icon: '🐙', title: 'GitHub Integration', desc: 'Direct repo scanning without CSV export — just connect your GitHub org', status: 'planned' },
    { icon: '🚦', title: 'CI/CD Risk Gates', desc: 'Block PRs when target module risk index exceeds configurable threshold', status: 'planned' },
    { icon: '📈', title: 'Predictive Forecasting', desc: 'LSTM-based time-series on defect trends for forward-looking risk estimates', status: 'planned' },
    { icon: '🔗', title: 'Multi-Repository Analysis', desc: 'Cross-repo defect correlation to find systemic architectural risk patterns', status: 'planned' },
    { icon: '🔔', title: 'Slack / JIRA Integration', desc: 'Push critical hotspot alerts to your team and auto-tag high-risk tickets', status: 'planned' },
  ];
  return (
    <section id="roadmap" style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Roadmap</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px' }}>
            What's <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>coming next</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {items.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '24px 28px', transition: 'all 0.3s',
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, fontSize: 20,
                  background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{item.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>{item.title}</h3>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: '#7C3AED',
                      background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                      padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>PLANNED</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / Footer ───────────────────────────────────────────────────────── */
function Footer({ onLogin }) {
  return (
    <section style={{ padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>Get Started</div>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: 'white', letterSpacing: '-3px', lineHeight: 1.05, marginBottom: 24 }}>
            Ready to mine your<br />
            <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              codebase risk?
            </span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
            Upload your defect dataset, run FP-Growth, and get interactive risk maps in under 60 seconds.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
            <button onClick={onLogin} style={{
              background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
              color: 'white', border: 'none', padding: '16px 40px',
              borderRadius: 14, fontSize: 17, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 0 60px rgba(124,58,237,0.5)', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 80px rgba(124,58,237,0.7)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 60px rgba(124,58,237,0.5)'; }}>
              🚀 Launch BugRisk
            </button>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', padding: '16px 40px', borderRadius: 14,
              fontSize: 17, fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              ⭐ Star on GitHub
            </a>
          </div>
        </motion.div>

        {/* Footer bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: 'white',
              }}>B</div>
              <span style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>BugRisk</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>· Association Rule-Driven Defect Intelligence</span>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Built by <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Pratham Rana</strong></span>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer"
                style={{ fontSize: 13, color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  return (
    <div style={{
      background: '#0B1120',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: 'white',
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes pulse-orb { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0B1120; }
        ::-webkit-scrollbar-thumb { background: #7C3AED40; border-radius: 3px; }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <ProblemSolution />
      <Features />
      <Architecture />
      <Screenshots />
      <Metrics />
      <TechStack />
      <Roadmap />
      <Footer onLogin={onLogin} />
    </div>
  );
}
