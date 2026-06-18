import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        background: 'rgba(2, 3, 8, 0.95)',
        borderBottom: '1px solid rgba(217, 164, 65, 0.25)',
        backdropFilter: 'blur(10px)',
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
            <span style={{ fontWeight: 900, fontSize: 14, color: '#F5F5F5', letterSpacing: '0.05em', fontFamily: 'monospace' }}>BUGRISK // SECURE_CORE</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 24 }}>
            <button
              onClick={() => handleScrollTo('clarity')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ CLARITY ]
            </button>
            <button
              onClick={() => handleScrollTo('topology')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ TOPOLOGY ]
            </button>
            <button
              onClick={() => handleScrollTo('architecture')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ PIPELINE ]
            </button>
            <button
              onClick={() => handleScrollTo('terminal')}
              style={{ background: 'none', border: 'none', color: '#7E8A9A', fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'monospace', textTransform: 'uppercase' }}
              onMouseEnter={(e) => (e.target.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.target.style.color = '#7E8A9A')}
            >
              [ TERMINAL ]
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

/* ─── Cinematic Title Component ─────────────────────────────────────────── */
function CinematicTitle({ lines }) {
  return (
    <div style={{
      width: '100%',
      borderTop: '1px solid rgba(217, 164, 65, 0.25)',
      borderBottom: '1px solid rgba(217, 164, 65, 0.25)',
      padding: '24px 0',
      marginBottom: '32px',
    }}>
      {lines.map((line, idx) => (
        <div
          key={idx}
          style={{
            fontSize: '52px',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '0.05em',
            fontFamily: 'monospace',
            color: idx === lines.length - 1 ? '#D9A441' : '#F5F5F5',
            textTransform: 'uppercase',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

/* ─── Telemetry Text Component ──────────────────────────────────────────── */
function TelemetryOverlay({ text }) {
  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '9px',
      color: '#7E8A9A',
      letterSpacing: '0.08em',
      opacity: 0.5,
      marginBottom: 16,
    }}>
      [TELEMETRY_REF: {text}]
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
    { id: 'auth', label: 'module=auth', x: 130, y: 90, color: '#D9A441' },
    { id: 'java', label: 'language=java', x: 110, y: 190, color: '#D9A441' },
    { id: 'jwt', label: 'tech_stack=jwt', x: 140, y: 290, color: '#D9A441' },
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
            <div style={{
              width: isHovered ? 10 : 6,
              height: isHovered ? 10 : 6,
              borderRadius: '50%',
              background: n.color,
              boxShadow: `0 0 10px ${n.color}`,
              transition: 'all 0.2s ease',
            }} />

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

/* ─── Scene 1: Hero Section (100vh) ──────────────────────────────────────── */
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

/* ─── Section 2: Defect Clarity (100vh Command-Center Composition) ──────── */
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
      <div style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left side: Cinematic title & description */}
        <div>
          <CinematicTitle lines={['UNPRECEDENTED', 'DEFECT', 'CLARITY']} />
          <p style={{
            fontSize: '14px',
            color: '#7E8A9A',
            lineHeight: 1.6,
            maxWidth: '460px',
            fontFamily: 'monospace',
          }}>
            BugRisk targets structural codebase patterns instead of raw metrics. By processing log configurations and transactions as transactions, our system isolates critical anomaly paths instantly.
          </p>
          <div style={{ height: '80px' }} />
          <TelemetryOverlay text="SYS_ANALYSIS_VER_2.4" />
        </div>

        {/* Right side: Command center HUD system display */}
        <div style={{
          border: '1px solid rgba(217, 164, 65, 0.2)',
          background: 'rgba(2, 3, 8, 0.85)',
          padding: '36px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}>
          <HudCorners />

          {/* Module 1 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 900, color: '#D9A441' }}>
              [01]
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#F5F5F5', fontFamily: 'monospace', marginBottom: 6, textTransform: 'uppercase' }}>
                Rule Mining Engine
              </h3>
              <p style={{ fontSize: '12px', color: '#7E8A9A', fontFamily: 'monospace', lineHeight: 1.5 }}>
                Processes parallelized transactions in execution dumps to compute confidence levels under 8ms.
              </p>
            </div>
          </div>

          {/* Connective dots */}
          <div style={{ borderLeft: '1px dashed rgba(217, 164, 65, 0.25)', height: 20, marginLeft: 14 }} />

          {/* Module 2 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 900, color: '#D9A441' }}>
              [02]
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#F5F5F5', fontFamily: 'monospace', marginBottom: 6, textTransform: 'uppercase' }}>
                ML Pattern Analysis
              </h3>
              <p style={{ fontSize: '12px', color: '#7E8A9A', fontFamily: 'monospace', lineHeight: 1.5 }}>
                Clusters log contexts using Jaccard matrix coefficients to prevent defect propagation.
              </p>
            </div>
          </div>

          {/* Connective dots */}
          <div style={{ borderLeft: '1px dashed rgba(217, 164, 65, 0.25)', height: 20, marginLeft: 14 }} />

          {/* Module 3 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 900, color: '#D9A441' }}>
              [03]
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#F5F5F5', fontFamily: 'monospace', marginBottom: 6, textTransform: 'uppercase' }}>
                Explainability Layer
              </h3>
              <p style={{ fontSize: '12px', color: '#7E8A9A', fontFamily: 'monospace', lineHeight: 1.5 }}>
                Traces stack context and permission layers, ensuring transparent root-cause diagnostics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Global Codebase Topology (100vh Centralized Graph) ─────── */
function Topology() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: y * 20 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const nodes = [
    { id: 1, x: 340, y: 220, color: '#D9A441', r: 8 }, // Core
    { id: 2, x: 200, y: 120, color: '#D9A441', r: 5 },
    { id: 3, x: 480, y: 110, color: '#D9A441', r: 5 },
    { id: 4, x: 450, y: 320, color: '#FF5A5A', r: 5 }, // Hotspot
    { id: 5, x: 220, y: 310, color: '#D9A441', r: 5 },
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
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left Side: Cinematic Title and Text */}
        <div>
          <CinematicTitle lines={['GLOBAL', 'CODEBASE', 'TOPOLOGY']} />
          <p style={{
            fontSize: '14px',
            color: '#7E8A9A',
            lineHeight: 1.6,
            fontFamily: 'monospace',
            marginBottom: 32,
          }}>
            Active directory scanner overlay mapping file clusters, dependency loops, and high-risk transactional paths across container limits.
          </p>
          <TelemetryOverlay text="SYS_RADAR_RESOLVER_10" />
        </div>

        {/* Right Side: Huge Centralized Network with Corner Statistics */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            border: '1px solid rgba(217, 164, 65, 0.15)',
            background: 'rgba(2, 3, 8, 0.65)',
            overflow: 'hidden',
          }}
        >
          <HudCorners />

          {/* Dotted Radar Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx="340" cy="230" r="80" stroke="rgba(217, 164, 65, 0.08)" strokeDasharray="3 3" fill="none" />
            <circle cx="340" cy="230" r="160" stroke="rgba(217, 164, 65, 0.05)" strokeDasharray="3 3" fill="none" />
            <circle cx="340" cy="230" r="240" stroke="rgba(217, 164, 65, 0.03)" strokeDasharray="3 3" fill="none" />

            {/* Orbiting particles */}
            <circle r="3" fill="#D9A441">
              <animateMotion dur="12s" repeatCount="indefinite" path="M 340,150 A 80,80 0 1,1 340,310 A 80,80 0 1,1 340,150" />
            </circle>
            <circle r="2" fill="#FF5A5A">
              <animateMotion dur="20s" repeatCount="indefinite" path="M 340,70 A 160,160 0 1,1 340,390 A 160,160 0 1,1 340,70" />
            </circle>

            {/* Main Network Group with Parallax */}
            <g style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              transition: 'transform 0.25s ease-out',
            }}>
              {connections.map((c, i) => {
                const f = nodes.find(n => n.id === c.from);
                const t = nodes.find(n => n.id === c.to);
                if (!f || !t) return null;
                return (
                  <g key={i}>
                    <line
                      x1={f.x} y1={f.y + 10} x2={t.x} y2={t.y + 10}
                      stroke="rgba(217, 164, 65, 0.15)"
                      strokeWidth={1.5}
                    />
                    <circle r="2" fill="#D9A441">
                      <animateMotion
                        dur="3.2s"
                        repeatCount="indefinite"
                        path={`M ${f.x},${f.y + 10} L ${t.x},${t.y + 10}`}
                      />
                    </circle>
                  </g>
                );
              })}

              {nodes.map(n => (
                <g key={n.id}>
                  <circle
                    cx={n.x} cy={n.y + 10} r={n.r + 5}
                    fill="transparent"
                    stroke={n.color}
                    strokeWidth={1}
                    style={{ animation: 'pulseGlow 2.5s infinite' }}
                  />
                  <circle
                    cx={n.x} cy={n.y + 10} r={n.r}
                    fill={n.color}
                  />
                </g>
              ))}
            </g>
          </svg>

          {/* Symmetrical Corner Stats Overlay ( Bloomberg HUD style ) */}
          {/* Top Left */}
          <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: 'monospace' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#D9A441' }}>2400+</div>
            <div style={{ fontSize: '8px', color: '#7E8A9A' }}>RULES MINED</div>
          </div>

          {/* Top Right */}
          <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'monospace', textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#D9A441' }}>92%</div>
            <div style={{ fontSize: '8px', color: '#7E8A9A' }}>CONFIDENCE</div>
          </div>

          {/* Bottom Left */}
          <div style={{ position: 'absolute', bottom: 20, left: 20, fontFamily: 'monospace' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#D9A441' }}>5.54x</div>
            <div style={{ fontSize: '8px', color: '#7E8A9A' }}>LIFT LIMIT</div>
          </div>

          {/* Bottom Right */}
          <div style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'monospace', textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#FF5A5A' }}>18</div>
            <div style={{ fontSize: '8px', color: '#7E8A9A' }}>CRITICAL HOTSPOTS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Vertical Architecture Pipeline (100vh) ─────────────────── */
function Architecture() {
  const pipelineSteps = [
    { label: 'CSV', status: 'INGEST', detail: 'Parse execution logs' },
    { label: 'Spring Boot', status: 'ROUTING', detail: 'Route gateway controller' },
    { label: 'FastAPI', status: 'PIPELINE', detail: 'Process transaction patterns' },
    { label: 'FP Growth', status: 'MINING', detail: 'Build trie execution tree' },
    { label: 'Postgres', status: 'STORAGE', detail: 'Write patterns & relations' },
    { label: 'Redis', status: 'CACHE', detail: 'Handle active cache blocks' },
    { label: 'Dashboard', status: 'RENDER', detail: 'Expose explainable diagnostics' }
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
      <div style={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left Column: Title and Description */}
        <div>
          <CinematicTitle lines={['ARCHITECTURE', 'PIPELINE']} />
          <p style={{
            fontSize: '14px',
            color: '#7E8A9A',
            lineHeight: 1.6,
            fontFamily: 'monospace',
          }}>
            Fully containerized data ingestion flow. Moving transaction traces from multi-tenant gateways down to tree mining processes and relational databases.
          </p>
          <div style={{ height: '80px' }} />
          <TelemetryOverlay text="FLOW_SCHEMA_ACTIVE" />
        </div>

        {/* Right Column: Vertical Animated Pipeline (No Boxes) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '20px 0',
          width: '100%',
          maxWidth: '440px',
          margin: '0 auto',
        }}>
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Pipeline Node (Pure Text & status LED) */}
              <div style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                alignItems: 'center',
                gap: 20,
                position: 'relative',
                zIndex: 2,
              }}>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#D9A441',
                  textAlign: 'right',
                  letterSpacing: '0.05em',
                }}>
                  [{step.status}]
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Status Dot */}
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#D9A441',
                    boxShadow: '0 0 6px #F6C453',
                  }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: '#F5F5F5', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                      {step.label}
                    </span>
                    <span style={{ fontSize: '10px', color: '#7E8A9A', fontFamily: 'monospace', marginLeft: 12 }}>
                      // {step.detail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical link connector with flowing beams */}
              {idx < pipelineSteps.length - 1 && (
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '36px',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                }}>
                  <div />
                  <div style={{
                    position: 'relative',
                    borderLeft: '2px dashed rgba(217, 164, 65, 0.25)',
                    marginLeft: '2px', // align with the dot center
                    height: '100%',
                    overflow: 'hidden',
                  }}>
                    {/* Beam pulse */}
                    <div style={{
                      position: 'absolute',
                      width: '2px',
                      height: '12px',
                      left: '-2px',
                      background: '#D9A441',
                      boxShadow: '0 0 8px #F6C453',
                      animation: 'flowBeamVertical 1.6s infinite linear',
                    }} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: AI Command Terminal (100vh Fullscreen Command Console) ─── */
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
      setLogList(prev => [...prev.slice(-15), logStr]);
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
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 64, alignItems: 'center', marginBottom: 40 }}>
          <div>
            <CinematicTitle lines={['AI', 'COMMAND', 'TERMINAL']} />
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#7E8A9A', fontFamily: 'monospace', lineHeight: 1.5 }}>
              CLASSIFIED ENVIRONMENT SECURITY LEVEL 3 // ANOMALY RESOLVER INTERFACE
            </p>
          </div>
        </div>

        {/* Huge Multi-Pane HUD Console spanning full width */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 28,
          alignItems: 'stretch',
        }}>
          {/* Left Console Monitor */}
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

          {/* Right Console Monitor */}
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
              SECURE PROTOCOL LEVEL 3 ACCESS ONLY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA Section (100vh Fullscreen) ──────────────────────────────── */
function FinalCTA({ onLogin }) {
  return (
    <section
      id="cta"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Perspective Grid Floor */}
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
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(217, 164, 65, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'blur(30px)',
        }} />

        {/* Floating Particles */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '15%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#D9A441',
          boxShadow: '0 0 10px #F6C453',
          animation: 'pulseGlow 3s infinite',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '100px',
          right: '15%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#FF5A5A',
          boxShadow: '0 0 10px #FF5A5A',
          animation: 'pulseGlow 4s infinite',
        }} />

        {/* Massive dividing layout */}
        <div style={{
          width: '100%',
          borderTop: '1px solid rgba(217, 164, 65, 0.25)',
          borderBottom: '1px solid rgba(217, 164, 65, 0.25)',
          padding: '40px 0',
          marginBottom: '48px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.05em', color: '#F5F5F5', fontFamily: 'monospace' }}>
            READY TO UNDERSTAND
          </div>
          <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.05em', color: '#D9A441', fontFamily: 'monospace' }}>
            YOUR CODEBASE
          </div>
          <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.05em', color: '#F5F5F5', fontFamily: 'monospace' }}>
            BEFORE IT BREAKS?
          </div>
        </div>

        <div style={{ marginBottom: 96 }}>
          <button
            onClick={onLogin}
            style={{
              background: '#D9A441',
              color: '#020308',
              border: 'none',
              padding: '14px 40px',
              borderRadius: 0,
              fontSize: 14,
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
            [ INITIALIZE PLATFORM ]
          </button>
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
          <span>BUGRISK // SECURE_CORE</span>
          <span>2026 // ESTABLISHING SCANNER CONNECTIVITY</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page Redesign ─────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 7 + 3) % 100}%`,
    top: `${(i * 13 + 5) % 100}%`,
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

      {/* Subtle Scanlines Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 99,
        pointerEvents: 'none',
        opacity: 0.08,
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
        @keyframes flowBeamVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(330%); }
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
