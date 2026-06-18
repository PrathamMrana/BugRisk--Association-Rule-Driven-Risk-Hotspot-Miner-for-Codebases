import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GITHUB_URL = 'https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases';

/* ─── Sticky Navbar ──────────────────────────────────────────────────────── */
function Navbar({ onLogin }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 24px',
        background: 'rgba(2, 3, 8, 0.9)',
        borderBottom: '1px solid rgba(217, 164, 65, 0.15)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Side Logo & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 20, height: 20,
              background: '#D9A441',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 900, color: '#020308',
            }}>B</div>
            <span style={{ fontWeight: 900, fontSize: 15, color: '#F5F5F5', letterSpacing: '0.05em', fontFamily: 'monospace' }}>BUGRISK // SECURE_CORE</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 28 }}>
            <button
              onClick={() => handleScrollTo('clarity')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ Clarity ]
            </button>
            <button
              onClick={() => handleScrollTo('topology')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ Topology ]
            </button>
            <button
              onClick={() => handleScrollTo('architecture')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ Architecture ]
            </button>
            <button
              onClick={() => handleScrollTo('terminal')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ Terminal ]
            </button>
          </div>
        </div>

        {/* Right CTA */}
        <button
          onClick={onLogin}
          style={{
            background: 'transparent',
            border: '1px solid #D9A441',
            color: '#D9A441',
            padding: '6px 14px',
            borderRadius: 0,
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#D9A441';
            e.target.style.color = '#020308';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#D9A441';
          }}
        >
          INITIALIZE PLATFORM
        </button>
      </div>
    </motion.nav>
  );
}

/* ─── HUD Corner Ticks Component ────────────────────────────────────────── */
function HudCorners() {
  return (
    <>
      <div style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: '2px solid #D9A441', borderLeft: '2px solid #D9A441', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: '2px solid #D9A441', borderRight: '2px solid #D9A441', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: '2px solid #D9A441', borderLeft: '2px solid #D9A441', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: '2px solid #D9A441', borderRight: '2px solid #D9A441', pointerEvents: 'none' }} />
    </>
  );
}

/* ─── HUD Card Component ────────────────────────────────────────────────── */
function HudCard({ title, subtitle, desc, sysCode }) {
  return (
    <div style={{
      position: 'relative',
      border: '1px solid rgba(217, 164, 65, 0.15)',
      background: 'rgba(217, 164, 65, 0.01)',
      padding: '28px',
      height: '320px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <HudCorners />
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontSize: 9, color: '#D9A441', fontWeight: 'bold', letterSpacing: '0.15em', fontFamily: 'monospace' }}>{sysCode}</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#47E38C', boxShadow: '0 0 6px #47E38C' }} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#F5F5F5', marginBottom: 14, textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '-0.5px' }}>{title}</h3>
        <p style={{ fontSize: 13, color: '#7E8A9A', lineHeight: 1.5, fontFamily: 'monospace' }}>{desc}</p>
      </div>

      <div style={{ fontSize: 9, color: '#7E8A9A', fontFamily: 'monospace', borderTop: '1px solid rgba(217, 164, 65, 0.05)', paddingTop: 14, letterSpacing: '0.05em' }}>
        SECURE_CORE // TELEMETRY_ACTIVE
      </div>
    </div>
  );
}

/* ─── Hero Animated Graph ───────────────────────────────────────────────── */
function HeroEngine() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [metrics, setMetrics] = useState({ confidence: 93.4, lift: 5.62, support: 0.082 });
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        confidence: +(92.1 + Math.random() * 3.8).toFixed(1),
        lift: +(5.24 + Math.random() * 0.75).toFixed(2),
        support: +(0.075 + Math.random() * 0.025).toFixed(3)
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const nodes = [
    { id: 'auth', label: 'module=auth', x: 140, y: 90, color: '#D9A441' },
    { id: 'java', label: 'language=java', x: 120, y: 190, color: '#D9A441' },
    { id: 'jwt', label: 'tech_stack=jwt', x: 150, y: 290, color: '#D9A441' },
    { id: 'critical', label: 'severity=critical', x: 380, y: 190, color: '#FF5A5A', isOutcome: true },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '540px',
        height: '385px',
        background: 'rgba(2, 3, 8, 0.85)',
        border: '1px solid rgba(217, 164, 65, 0.15)',
        borderRadius: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      }}
    >
      <HudCorners />

      {/* Screen crosshairs */}
      <div style={{ position: 'absolute', top: mousePos.y, left: 0, right: 0, height: '1px', borderTop: '1px dashed rgba(217, 164, 65, 0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: mousePos.x, top: 0, bottom: 0, width: '1px', borderLeft: '1px dashed rgba(217, 164, 65, 0.04)', pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute',
        top: 12,
        left: 16,
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#7E8A9A',
        letterSpacing: '0.05em',
        pointerEvents: 'none',
      }}>
        GRID_COORD: X {mousePos.x.toFixed(0)} | Y {mousePos.y.toFixed(0)}
      </div>

      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Curved connection lines */}
        {nodes.filter(n => !n.isOutcome).map(n => {
          const isLinkHovered = hoveredNode === n.id || hoveredNode === 'critical';
          return (
            <g key={n.id}>
              <path
                d={`M ${n.x},${n.y} C ${n.x + 80},${n.y} 270,190 ${nodes[3].x},190`}
                stroke={isLinkHovered ? '#F6C453' : 'rgba(217, 164, 65, 0.08)'}
                strokeWidth={isLinkHovered ? 2 : 1}
                fill="none"
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
              <circle r="3" fill="#D9A441" filter="url(#hudGlow)">
                <animateMotion
                  dur={`${1.8 + Math.random() * 1.2}s`}
                  repeatCount="indefinite"
                  path={`M ${n.x},${n.y} C ${n.x + 80},${n.y} 270,190 ${nodes[3].x},190`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Pure Typography Nodes (NO cards/boxes) */}
      {nodes.map(n => {
        const isHovered = hoveredNode === n.id;
        return (
          <div
            key={n.id}
            onMouseEnter={() => setHoveredNode(n.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              position: 'absolute',
              left: n.x,
              top: n.y,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            {/* Minimal glowing point port */}
            <div style={{
              width: isHovered ? 10 : 6,
              height: isHovered ? 10 : 6,
              borderRadius: '50%',
              background: n.color,
              boxShadow: `0 0 10px ${n.color}`,
              transition: 'all 0.2s ease',
            }} />

            {/* Typography Label */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: n.isOutcome ? '16px' : 'auto',
              right: n.isOutcome ? 'auto' : '16px',
              transform: 'translateY(-50%)',
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 700,
              color: isHovered ? '#F5F5F5' : n.isOutcome ? '#FF5A5A' : '#7E8A9A',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}>
              {n.label}
            </div>
          </div>
        );
      })}

      {/* Statistics stream */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        background: 'rgba(2, 3, 8, 0.9)',
        border: '1px solid rgba(217, 164, 65, 0.15)',
        borderRadius: 0,
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: 'monospace',
        fontSize: '9px',
        pointerEvents: 'none',
      }}>
        <div style={{ color: '#7E8A9A', borderBottom: '1px solid rgba(217, 164, 65, 0.08)', paddingBottom: 4, marginBottom: 4 }}>LIVE METRICS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
          <span style={{ color: '#7E8A9A' }}>confidence:</span>
          <span style={{ color: '#47E38C', fontWeight: 700 }}>{metrics.confidence}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
          <span style={{ color: '#7E8A9A' }}>lift:</span>
          <span style={{ color: '#D9A441', fontWeight: 700 }}>{metrics.lift}x</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
          <span style={{ color: '#7E8A9A' }}>support:</span>
          <span style={{ color: '#F5F5F5' }}>{metrics.support}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section (100vh) ──────────────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 64,
        alignItems: 'center',
        zIndex: 2,
      }}>
        {/* Left Side: Headline & Buttons */}
        <div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 800,
            color: '#D9A441',
            letterSpacing: '0.25em',
            marginBottom: 20,
          }}>
            [ ASSOCIATION RULE INTELLIGENCE PLATFORM ]
          </div>
          
          <h1 style={{
            fontSize: '72px',
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: '-2.5px',
            color: '#F5F5F5',
            marginBottom: 24,
            fontFamily: 'monospace',
          }}>
            STOP REACTING.<br />
            <span style={{ color: '#D9A441' }}>START PREDICTING.</span>
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#7E8A9A',
            lineHeight: 1.6,
            marginBottom: 36,
            maxWidth: 480,
            fontFamily: 'monospace',
          }}>
            An institutional risk detection framework. Mining multivariant correlation trees to map codebase anomalies and prevent production defects in runtime logs.
          </p>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={onLogin}
              style={{
                background: '#D9A441',
                color: '#020308',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 0,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#F6C453')}
              onMouseLeave={(e) => (e.target.style.background = '#D9A441')}
            >
              INITIALIZE PLATFORM
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(217, 164, 65, 0.3)',
                color: '#D9A441',
                padding: '12px 28px',
                borderRadius: 0,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                transition: 'border 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.borderColor = 'rgba(217, 164, 65, 0.3)')}
            >
              VIEW GITHUB
            </a>
          </div>
        </div>

        {/* Right Side: Graph Engine */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroEngine />
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Clarity (100vh) ────────────────────────────────────────── */
function Clarity() {
  return (
    <section
      id="clarity"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#F5F5F5',
          letterSpacing: '0.1em',
          marginBottom: 60,
          fontFamily: 'monospace',
          borderBottom: '1px solid rgba(217, 164, 65, 0.15)',
          paddingBottom: 20,
        }}>
          // UNPRECEDENTED DEFECT CLARITY
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          <HudCard
            sysCode="SYS_LOAD // 01"
            title="Rule Mining Engine"
            desc="Runs parallelized FP-Growth tree recursive patterns on execution transaction dumps, computing confidence levels and mathematical lift limits under 8ms."
          />
          <HudCard
            sysCode="SYS_LOAD // 02"
            title="ML Pattern Analysis"
            desc="Identifies outlier frequencies and clusters logs via high-dimensional Jaccard matrices, isolating anomalous sequences before build propagation."
          />
          <HudCard
            sysCode="SYS_LOAD // 03"
            title="Explainability Layer"
            desc="Exposes exact logical links tracking files, stack traces, database states, and authorization contexts. Zero black-box uncertainty."
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Topology (100vh) ───────────────────────────────────────── */
function Topology() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const nodes = [
    { id: 1, x: 250, y: 180, color: '#D9A441', r: 7 }, // Root Codebase
    { id: 2, x: 120, y: 100, color: '#D9A441', r: 5 },
    { id: 3, x: 380, y: 90, color: '#D9A441', r: 5 },
    { id: 4, x: 350, y: 270, color: '#FF5A5A', r: 5 }, // Hotspot
    { id: 5, x: 150, y: 260, color: '#D9A441', r: 5 },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 2 },
  ];

  return (
    <section
      id="topology"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left Side: Stats and HUD indicators */}
        <div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#F5F5F5',
            letterSpacing: '0.1em',
            marginBottom: 40,
            fontFamily: 'monospace',
          }}>
            // GLOBAL CODEBASE TOPOLOGY
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: '#7E8A9A',
            lineHeight: 1.6,
            marginBottom: 48,
            maxWidth: 480,
            fontFamily: 'monospace',
          }}>
            An interactive representation of software transactions. The system builds structural dependency vectors, calculating rule clustering distances in real time.
          </p>

          {/* Grid Stats Block (Bloomberg Terminal Style) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            fontFamily: 'monospace',
          }}>
            {[
              { val: '2400+', label: 'RULES MINED' },
              { val: '92%', label: 'CONFIDENCE' },
              { val: '5.54x', label: 'LIFT' },
              { val: '18', label: 'CRITICAL HOTSPOTS', isDanger: true },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid rgba(217, 164, 65, 0.15)',
                  background: 'rgba(2, 3, 8, 0.9)',
                  padding: '16px 20px',
                  position: 'relative',
                }}
              >
                <HudCorners />
                <div style={{ fontSize: '28px', fontWeight: 900, color: stat.isDanger ? '#FF5A5A' : '#D9A441', marginBottom: 4 }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '9px', color: '#7E8A9A', letterSpacing: '0.1em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Large Interactive Network (Radar HUD style) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            border: '1px solid rgba(217, 164, 65, 0.15)',
            background: 'rgba(2, 3, 8, 0.65)',
            overflow: 'hidden',
          }}
        >
          <HudCorners />

          {/* Concentric radar range lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx="250" cy="210" r="75" stroke="rgba(217, 164, 65, 0.08)" strokeDasharray="3 3" fill="none" />
            <circle cx="250" cy="210" r="140" stroke="rgba(217, 164, 65, 0.05)" strokeDasharray="3 3" fill="none" />
            <circle cx="250" cy="210" r="200" stroke="rgba(217, 164, 65, 0.03)" strokeDasharray="3 3" fill="none" />

            {/* Orbiting Satellite node */}
            <circle r="3" fill="#D9A441">
              <animateMotion dur="14s" repeatCount="indefinite" path="M 250,135 A 75,75 0 1,1 250,285 A 75,75 0 1,1 250,135" />
            </circle>
            <circle r="2" fill="#FF5A5A">
              <animateMotion dur="24s" repeatCount="indefinite" path="M 250,70 A 140,140 0 1,1 250,350 A 140,140 0 1,1 250,70" />
            </circle>

            {/* Topology Graph Group with Mouse Parallax */}
            <g style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}>
              {/* Connection paths */}
              {connections.map((c, i) => {
                const f = nodes.find(n => n.id === c.from);
                const t = nodes.find(n => n.id === c.to);
                if (!f || !t) return null;
                return (
                  <g key={i}>
                    <line
                      x1={f.x} y1={f.y + 30} x2={t.x} y2={t.y + 30}
                      stroke="rgba(217, 164, 65, 0.12)"
                      strokeWidth={1}
                    />
                    <circle r="2" fill="#D9A441">
                      <animateMotion
                        dur="3.5s"
                        repeatCount="indefinite"
                        path={`M ${f.x},${f.y + 30} L ${t.x},${t.y + 30}`}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Node points */}
              {nodes.map(n => (
                <g key={n.id}>
                  <circle
                    cx={n.x} cy={n.y + 30} r={n.r + 4}
                    fill="transparent"
                    stroke={n.color}
                    strokeWidth={1}
                    style={{ animation: 'pulseGlow 2.5s infinite' }}
                  />
                  <circle
                    cx={n.x} cy={n.y + 30} r={n.r}
                    fill={n.color}
                  />
                </g>
              ))}
            </g>
          </svg>

          {/* Compass grid coordinates */}
          <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'monospace', fontSize: '9px', color: '#7E8A9A' }}>
            BEARING // LOCALHOST.MAP
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Architecture Pipeline (100vh) ────────────────────────── */
function Architecture() {
  const steps = [
    { label: 'CSV', detail: 'Ingestion raw log streams', status: 'SYS_ON' },
    { label: 'Spring Boot', detail: 'Validation Gateway Controller', status: 'SYS_ACTIVE' },
    { label: 'FastAPI', detail: 'Background Task Dispatcher', status: 'SYS_ON' },
    { label: 'FP Growth', detail: 'Recursive Miner Algorithm', status: 'SYS_RECUR' },
    { label: 'Postgres', detail: 'Relational Transaction Logs', status: 'SYS_WRITE' },
    { label: 'Redis', detail: 'High performance Eviction Cache', status: 'SYS_HIT' },
    { label: 'Dashboard', detail: 'Telemetry visualizer interface', status: 'SYS_MOUNT' },
  ];

  return (
    <section
      id="architecture"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#F5F5F5',
          letterSpacing: '0.1em',
          marginBottom: 60,
          fontFamily: 'monospace',
          borderBottom: '1px solid rgba(217, 164, 65, 0.15)',
          paddingBottom: 20,
        }}>
          // ARCHITECTURE PIPELINE
        </h2>

        {/* Large Animated Pipeline Layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'stretch',
          position: 'relative',
          width: '100%',
        }}>
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Node Card */}
              <div style={{
                flex: 1,
                minWidth: '150px',
                border: '1px solid rgba(217, 164, 65, 0.15)',
                background: 'rgba(2, 3, 8, 0.95)',
                padding: '20px 16px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <HudCorners />
                <div>
                  <div style={{ fontSize: '10px', color: '#D9A441', fontFamily: 'monospace', marginBottom: 12 }}>
                    {step.status}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 950, color: '#F5F5F5', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 8 }}>
                    {step.label}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#7E8A9A', fontFamily: 'monospace', lineHeight: 1.4 }}>
                    {step.detail}
                  </p>
                </div>
                
                {/* Visual pulse status bar */}
                <div style={{
                  height: '2px',
                  width: '100%',
                  background: 'rgba(217, 164, 65, 0.08)',
                  marginTop: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    height: '100%',
                    width: '30%',
                    background: '#D9A441',
                    boxShadow: '0 0 8px #F6C453',
                    animation: 'flowBeam 1.5s infinite linear',
                  }} />
                </div>
              </div>

              {/* Connecting line between blocks */}
              {idx < steps.length - 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  color: '#D9A441',
                  fontSize: '14px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                }}>
                  ➔
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: AI Command Terminal (100vh) ────────────────────────────── */
function Terminal() {
  const initialLogs = [
    'SYS // SYSTEM INITIALIZATION START',
    'SYS // ESTABLISHING DATABASE CONNECTIVITY (POSTGRESQL)... SUCCESS',
    'SYS // CACHE COMPONENT MOUNTED (REDIS)... SUCCESS',
    'ALGO // RECURSIVE FP-GROWTH INITIALIZED',
    'ALGO // SCANNING TRANSACTIONS FOR ANTECEDENT PATTERNS',
    'SCAN // COMPILING DEPENDENCY TREE...',
    'SCAN // PARSING FILE: /auth/jwt/TokenValidator.java',
    'SCAN // PARSING FILE: /database/ConnectionPool.java',
    'SCAN // PARSING FILE: /gateway/ProxyController.java',
    'SCAN // DETECTED ANTECEDENT: {module=auth, language=Java, tech_stack=JWT}',
    'MINER // INFERRING RULE OUTCOME: {severity=critical}',
    'MINER // RULE DECLARED: SUPPORT=0.082 CONFIDENCE=94.2% LIFT=5.84x',
    'ALERT // RISK HOTSPOT IDENTIFIED: /auth/jwt/TokenValidator.java [DRI: 0.89]',
  ];

  const [logList, setLogList] = useState(initialLogs);

  useEffect(() => {
    const files = [
      '/auth/session/SessionManager.java',
      '/db/query/TransactionRunner.java',
      '/api/v1/endpoints/UserController.java',
      '/config/security/CorsConfig.java',
      '/auth/oauth/ProviderValidator.java',
      '/db/migrations/SchemaUpdate.java',
    ];
    const rules = [
      '{module=db, lang=java} -> {severity=high}',
      '{pkg=security, lang=java} -> {severity=critical}',
      '{module=api, tech=cors} -> {severity=medium}',
    ];

    const interval = setInterval(() => {
      const choice = Math.random();
      let logStr = '';
      if (choice < 0.4) {
        const file = files[Math.floor(Math.random() * files.length)];
        logStr = `SCAN // PARSING FILE: ${file}`;
      } else if (choice < 0.7) {
        const rule = rules[Math.floor(Math.random() * rules.length)];
        logStr = `MINER // MULTIVARIATE RULE FOUND: ${rule} [CONFIDENCE=${(86 + Math.random() * 11).toFixed(1)}%]`;
      } else {
        logStr = `SYS // telemetry buffer flush; active_connections=${Math.floor(10 + Math.random() * 12)}`;
      }
      setLogList(prev => [...prev.slice(-14), logStr]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="terminal"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#F5F5F5',
          letterSpacing: '0.1em',
          marginBottom: 60,
          fontFamily: 'monospace',
          borderBottom: '1px solid rgba(217, 164, 65, 0.15)',
          paddingBottom: 20,
        }}>
          // AI COMMAND TERMINAL
        </h2>

        {/* HUD Terminal Panel Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 28,
          alignItems: 'stretch',
        }}>
          {/* Left Panel: Stream Logs Console */}
          <div style={{
            border: '1px solid rgba(217, 164, 65, 0.2)',
            background: 'rgba(2, 3, 8, 0.95)',
            padding: '24px',
            position: 'relative',
            height: '380px',
            overflow: 'hidden',
          }}>
            <HudCorners />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(217, 164, 65, 0.08)',
              paddingBottom: 8,
              marginBottom: 16,
              fontSize: '10px',
              fontFamily: 'monospace',
              color: '#D9A441',
              letterSpacing: '0.05em',
            }}>
              <span>CONSOLE MONITOR // STREAM_LOGS</span>
              <span style={{ color: '#47E38C' }}>● LIVE_STREAMING</span>
            </div>

            {/* Scrollable logs area */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#7E8A9A',
              lineHeight: 1.7,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              {logList.map((log, i) => {
                const isAlert = log.includes('ALERT') || log.includes('critical');
                const isSuccess = log.includes('SUCCESS');
                return (
                  <div key={i} style={{ color: isAlert ? '#FF5A5A' : isSuccess ? '#47E38C' : '#7E8A9A' }}>
                    ➔ {log}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Rule Database Feed */}
          <div style={{
            border: '1px solid rgba(217, 164, 65, 0.2)',
            background: 'rgba(2, 3, 8, 0.95)',
            padding: '24px',
            position: 'relative',
            height: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <HudCorners />
            <div>
              <div style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#D9A441',
                borderBottom: '1px solid rgba(217, 164, 65, 0.08)',
                paddingBottom: 8,
                marginBottom: 16,
                letterSpacing: '0.05em',
              }}>
                ANOMALY DETECTOR FEED
              </div>

              {/* Table details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'monospace', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(217,164,65,0.05)', paddingBottom: 6 }}>
                  <span style={{ color: '#7E8A9A' }}>HOTSPOT FILE</span>
                  <span style={{ color: '#F5F5F5' }}>/auth/jwt/TokenValidator.java</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(217,164,65,0.05)', paddingBottom: 6 }}>
                  <span style={{ color: '#7E8A9A' }}>DRI INDEX</span>
                  <span style={{ color: '#FF5A5A', fontWeight: 900 }}>0.89 [CRITICAL]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(217,164,65,0.05)', paddingBottom: 6 }}>
                  <span style={{ color: '#7E8A9A' }}>TRIGGERED SEVERITY</span>
                  <span style={{ color: '#FF5A5A' }}>CRITICAL</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(217,164,65,0.05)', paddingBottom: 6 }}>
                  <span style={{ color: '#7E8A9A' }}>ACTIVE CONNECTIONS</span>
                  <span style={{ color: '#47E38C' }}>124 / SEC</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#7E8A9A', fontFamily: 'monospace' }}>
              SECURITY ENVIRONMENT ACCESS PROTOCOL LEVEL 3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA Section (100vh) ─────────────────────────────────────────── */
function FinalCTA({ onLogin }) {
  return (
    <section
      id="cta"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Perspective grid floor background at the very bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-50%',
        right: '-50%',
        height: '400px',
        backgroundImage: `
          linear-gradient(to right, rgba(217, 164, 65, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(217, 164, 65, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(75deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        height: '100%',
      }}>
        {/* Soft Radial Gold Spotlight Behind Heading */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(217, 164, 65, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'blur(30px)',
        }} />

        <h2 style={{
          fontSize: '48px',
          fontWeight: 900,
          color: '#F5F5F5',
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          textAlign: 'center',
          marginBottom: 36,
          fontFamily: 'monospace',
          maxWidth: '820px',
        }}>
          READY TO UNDERSTAND YOUR CODEBASE<br />BEFORE IT BREAKS?
        </h2>

        <div style={{ display: 'flex', gap: 14, marginBottom: 100 }}>
          <button
            onClick={onLogin}
            style={{
              background: '#D9A441',
              color: '#020308',
              border: 'none',
              padding: '12px 32px',
              borderRadius: 0,
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              boxShadow: '0 0 30px rgba(217, 164, 65, 0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#F6C453')}
            onMouseLeave={(e) => (e.target.style.background = '#D9A441')}
          >
            INITIALIZE PLATFORM
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'transparent',
              border: '1px solid rgba(217, 164, 65, 0.3)',
              color: '#D9A441',
              padding: '12px 32px',
              borderRadius: 0,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              transition: 'border 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = '#D9A441')}
            onMouseLeave={(e) => (e.target.style.borderColor = 'rgba(217, 164, 65, 0.3)')}
          >
            VIEW GITHUB
          </a>
        </div>

        {/* Footer info directly below CTA (NO additional spacing) */}
        <div style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          color: '#7E8A9A',
          fontFamily: 'monospace',
          opacity: 0.5,
        }}>
          <span>BUGRISK // PLATFORM SECURITY LEVEL 3</span>
          <span>© 2026 · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page Redesign ─────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  // Generate coordinates for HUD background floating particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${(i * 7 + 5) % 100}%`,
    top: `${(i * 13 + 8) % 100}%`,
    size: ((i * 3) % 3) + 1.5,
    delay: `${(i * 0.4).toFixed(1)}s`,
    duration: `${10 + (i * 2) % 10}s`
  }));

  return (
    <div style={{
      background: '#020308',
      minHeight: '100vh',
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      color: '#F5F5F5',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Subtle Dotted Grid Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(217, 164, 65, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Floating Gold HUD Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#D9A441',
            boxShadow: '0 0 6px #F6C453',
            pointerEvents: 'none',
            opacity: 0.15,
            zIndex: 1,
            animation: `floatParticle ${p.duration} infinite ease-in-out`,
            animationDelay: p.delay,
          }}
        />
      ))}

      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020308; }
        ::-webkit-scrollbar-thumb { background: rgba(217, 164, 65, 0.2); border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(217, 164, 65, 0.4); }
        
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
        }
        @keyframes flowBeam {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(330%); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <Clarity />
      <Topology />
      <Architecture />
      <Terminal />
      <FinalCTA onLogin={onLogin} />
    </div>
  );
}
