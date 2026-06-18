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

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        background: scrolled ? 'rgba(2, 6, 23, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Side Logo & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 5,
              background: 'linear-gradient(135deg, #7C3AED, #38BDF8, #EC4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 900, color: 'white',
            }}>B</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#F8FAFC', letterSpacing: '-0.3px' }}>BugRisk</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 24 }}>
            <button
              onClick={() => handleScrollTo('product')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('technology')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
            >
              Technology
            </button>
            <a
              href="https://github.com/PrathamMrana/BugRisk--Association-Rule-Driven-Risk-Hotspot-Miner-for-Codebases/blob/master/README.md"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
            >
              Docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Right CTA */}
        <button
          onClick={onLogin}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#F8FAFC',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#F8FAFC';
            e.target.style.color = '#020617';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            e.target.style.color = '#F8FAFC';
          }}
        >
          Launch App
        </button>
      </div>
    </motion.nav>
  );
}

/* ─── Scene 1: Interactive Live Intelligence Graph ──────────────────────── */
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
    { id: 'auth', label: 'auth', x: 130, y: 90, color: '#7C3AED' },
    { id: 'java', label: 'java', x: 110, y: 190, color: '#38BDF8' },
    { id: 'jwt', label: 'jwt', x: 140, y: 290, color: '#EC4899' },
    { id: 'critical', label: 'critical severity', x: 390, y: 190, color: '#F59E0B', isOutcome: true },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '540px',
        height: '380px',
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.01)',
      }}
    >
      {/* Background Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        pointerEvents: 'none',
      }} />

      {/* Crosshair coordinate guide lines */}
      <div style={{
        position: 'absolute',
        top: mousePos.y,
        left: 0,
        right: 0,
        height: '1px',
        borderTop: '1px dashed rgba(255, 255, 255, 0.03)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        left: mousePos.x,
        top: 0,
        bottom: 0,
        width: '1px',
        borderLeft: '1px dashed rgba(255, 255, 255, 0.03)',
        pointerEvents: 'none',
      }} />

      {/* Coordinate Label */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 16,
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#475569',
        letterSpacing: '0.05em',
        pointerEvents: 'none',
      }}>
        [RULE SCANNER: X {mousePos.x.toFixed(0)} | Y {mousePos.y.toFixed(0)}]
      </div>

      {/* SVG Canvas for Lines and Beams */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Curved connecting lines */}
        {nodes.filter(n => !n.isOutcome).map(n => {
          const isLinkHovered = hoveredNode === n.id || hoveredNode === 'critical';
          return (
            <g key={n.id}>
              <path
                d={`M ${n.x},${n.y} C ${n.x + 100},${n.y} 280,190 ${nodes[3].x},190`}
                stroke={isLinkHovered ? n.color : 'rgba(255, 255, 255, 0.06)'}
                strokeWidth={isLinkHovered ? 2.5 : 1}
                fill="none"
                style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              />
              <circle r="3.5" fill={n.color} filter="url(#svgGlow)">
                <animateMotion
                  dur={`${2 + Math.random() * 1.5}s`}
                  repeatCount="indefinite"
                  path={`M ${n.x},${n.y} C ${n.x + 100},${n.y} 280,190 ${nodes[3].x},190`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Pure Typography Nodes (NO boxes, NO cards) */}
      {nodes.map(n => {
        const isHovered = hoveredNode === n.id;
        const textOffsetLeft = n.isOutcome ? n.x + 16 : n.x - 12;
        
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
            {/* Minimal coordinate connector dot */}
            <div style={{
              width: isHovered ? 12 : 8,
              height: isHovered ? 12 : 8,
              borderRadius: '50%',
              background: n.color,
              boxShadow: `0 0 15px ${n.color}`,
              transition: 'all 0.2s ease',
            }} />

            {/* Typography Label */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: n.isOutcome ? '18px' : 'auto',
              right: n.isOutcome ? 'auto' : '18px',
              transform: 'translateY(-50%)',
              fontFamily: 'monospace',
              fontSize: '13px',
              fontWeight: 700,
              color: isHovered ? '#F8FAFC' : n.isOutcome ? '#F59E0B' : '#94A3B8',
              whiteSpace: 'nowrap',
              textShadow: isHovered ? `0 0 8px ${n.color}50` : 'none',
              transition: 'all 0.2s ease',
            }}>
              {n.label}
            </div>
          </div>
        );
      })}

      {/* Changing Lift & Confidence stats overlay */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        background: 'rgba(10, 15, 30, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontFamily: 'monospace',
        fontSize: '10px',
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ color: '#475569' }}>REALTIME METRIC STREAM</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30 }}>
          <span style={{ color: '#94A3B8' }}>confidence:</span>
          <span style={{ color: '#10B981', fontWeight: 700 }}>{metrics.confidence}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30 }}>
          <span style={{ color: '#94A3B8' }}>lift:</span>
          <span style={{ color: '#38BDF8', fontWeight: 700, textShadow: '0 0 10px rgba(56,189,248,0.2)' }}>{metrics.lift}x</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30 }}>
          <span style={{ color: '#94A3B8' }}>support:</span>
          <span style={{ color: '#EC4899' }}>{metrics.support}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Scene 1: Hero Scene (90vh) ────────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section style={{
      height: '90vh',
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
        {/* Left Side: Headline & CTA */}
        <div>
          <h1 style={{
            fontSize: '72px',
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: '-3px',
            color: '#F8FAFC',
            marginBottom: 24,
          }}>
            STOP REACTING.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #38BDF8 50%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>START PREDICTING.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#94A3B8',
            lineHeight: 1.6,
            marginBottom: 36,
            maxWidth: 480,
          }}>
            BugRisk discovers hidden defect patterns using association rule mining, isolating risk hotspots before they trigger production failures.
          </p>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              onClick={onLogin}
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #38BDF8)',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 50px rgba(124, 58, 237, 0.25)',
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
                border: '1px solid rgba(255, 255, 255, 0.08)',
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
              GitHub
            </a>
          </div>
        </div>

        {/* Right Side: Graph Engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <HeroEngine />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Scene 2: Apple Product Sticky Experience (140vh) ────────────────── */
function ProductShowcase() {
  const features = [
    {
      id: 'command_center',
      title: 'AI Command Center',
      desc: 'Telemetry diagnostics matching rules count, confidence thresholds and auto-generated briefs.',
      src: '/screenshots/command_center.png'
    },
    {
      id: 'graph_explorer',
      title: 'Graph Explorer',
      desc: 'Interactive network mapping connecting codebase files, dependencies and defect clusters.',
      src: '/screenshots/graph_explorer.png'
    },
    {
      id: 'hotspots',
      title: 'Hotspots Analysis',
      desc: 'Normalized Defect Risk Index profiling with radial explainability contribution breakdown.',
      src: '/screenshots/module_hotspots.png'
    },
    {
      id: 'analytics',
      title: 'ML Analytics',
      desc: 'Aggregated analytics tracking rule metrics, lift distributions, and repository stats.',
      src: '/screenshots/ml_analytics.png'
    },
    {
      id: 'algo_playground',
      title: 'Playground',
      desc: 'Execution benchmark comparisons running FP-Growth tree recursion vs Apriori candidate generation.',
      src: '/screenshots/pipeline.png'
    }
  ];

  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive Layout detection
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll mapping logic for Sticky MacBook Pro
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const viewportHeight = window.innerHeight;

      const scrollableRange = sectionHeight - viewportHeight;
      if (scrollableRange <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
      setScrollProgress(progress);
      setActiveIdx(Math.min(4, Math.floor(progress * 5.01)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  const handleStepClick = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const scrollableRange = rect.height - window.innerHeight;
    const targetScroll = absoluteTop + (index / 4.8) * scrollableRange;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  if (!isDesktop) {
    return (
      <section id="product" style={{ padding: '80px 24px', background: '#020617' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
          {/* Simple Tab Selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {features.map((feature, i) => (
              <button
                key={feature.id}
                onClick={() => setActiveIdx(i)}
                style={{
                  background: activeIdx === i ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeIdx === i ? '#7C3AED' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: 8,
                  padding: '8px 16px',
                  color: activeIdx === i ? '#F8FAFC' : '#94A3B8',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {feature.title}
              </button>
            ))}
          </div>

          <p style={{ fontSize: '13px', color: '#94A3B8', textAlign: 'center', maxWidth: '500px', margin: 0, minHeight: 40 }}>
            {features[activeIdx].desc}
          </p>

          {/* Device Mockup */}
          <div style={{ width: '100%', maxWidth: '640px', position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '16/10',
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '8px 8px 14px 8px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}>
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '10px',
                background: '#090d16',
                borderRadius: '0 0 4px 4px',
                zIndex: 20,
              }} />
              <div style={{ width: '100%', height: '100%', background: '#020617', borderRadius: '6px', overflow: 'hidden' }}>
                <img
                  src={features[activeIdx].src}
                  alt={features[activeIdx].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                width: '104%',
                height: '6px',
                background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                borderRadius: '0 0 8px 8px',
                position: 'absolute',
                bottom: '-6px',
                left: '-2%',
              }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="product"
      style={{
        position: 'relative',
        height: '140vh',
        background: 'transparent',
        marginTop: '80px',
        zIndex: 2,
      }}
    >
      <div style={{
        position: 'sticky',
        top: '10vh',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* Left Column: Vertical Interactive Text Stack with visual Progress Bar */}
          <div style={{ display: 'flex', gap: 32 }}>
            {/* Visual vertical progress bar */}
            <div style={{
              width: '2px',
              height: '240px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1px',
              position: 'relative',
              alignSelf: 'center',
            }}>
              <div style={{
                width: '100%',
                height: `${scrollProgress * 100}%`,
                background: 'linear-gradient(to bottom, #7C3AED, #38BDF8)',
                borderRadius: '1px',
                transition: 'height 0.1s ease-out',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
              {features.map((feature, i) => {
                const isActive = activeIdx === i;
                return (
                  <div
                    key={feature.id}
                    onClick={() => handleStepClick(i)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isActive ? 1 : 0.25,
                    }}
                  >
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: isActive ? '#F8FAFC' : '#94A3B8',
                      marginBottom: '4px',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.3px',
                    }}>
                      0{i + 1} {"   "} {feature.title}
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5, margin: 0, maxWidth: '320px' }}
                      >
                        {feature.desc}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium MacBook Pro Bezel with Crossfading Screen */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '680px',
              aspectRatio: '16/10',
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '12px 12px 18px 12px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.05)',
            }}>
              {/* MacBook Notch with status lights */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '110px',
                height: '14px',
                background: '#090d16',
                borderRadius: '0 0 6px 6px',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 4px #10B981' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1e293b' }} />
              </div>

              {/* Screen Content Wrapper */}
              <div style={{
                width: '100%',
                height: '100%',
                background: '#020617',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.03)',
              }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    src={features[activeIdx].src}
                    alt={features[activeIdx].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Bottom keyboard deck base */}
              <div style={{
                width: '106%',
                height: '8px',
                background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                borderRadius: '0 0 10px 10px',
                position: 'absolute',
                bottom: '-8px',
                left: '-3%',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Scene 3: Technology + Topology + Integrated CTA ───────────────────── */
function TechnologyAndCTA({ onLogin }) {
  const [hoveredTechNode, setHoveredTechNode] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const techRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!techRef.current) return;
    const rect = techRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: y * 20 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const techNodes = [
    { id: 'ingestion', label: 'Ingestion Gateway', x: 80, y: 70, color: '#38BDF8', desc: 'CSV stream validation' },
    { id: 'springboot', label: 'Spring Boot Gateway', x: 230, y: 60, color: '#6366F1', desc: 'Secure route handler' },
    { id: 'fastapi', label: 'FastAPI Service', x: 340, y: 150, color: '#7C3AED', desc: 'Python rule engine gateway' },
    { id: 'fpgrowth', label: 'FP-Growth Miner', x: 270, y: 270, color: '#EF4444', desc: 'Trie recursive tree mining' },
    { id: 'postgres', label: 'PostgreSQL Db', x: 100, y: 250, color: '#F59E0B', desc: 'Rule patterns & history store' },
    { id: 'redis', label: 'Redis Cache', x: 190, y: 160, color: '#EC4899', desc: 'High speed transaction caching' },
  ];

  const techConnections = [
    { from: 'ingestion', to: 'springboot' },
    { from: 'springboot', to: 'fastapi' },
    { from: 'fastapi', to: 'fpgrowth' },
    { from: 'fpgrowth', to: 'postgres' },
    { from: 'postgres', to: 'ingestion' },
    { from: 'redis', to: 'ingestion' },
    { from: 'redis', to: 'springboot' },
    { from: 'redis', to: 'fastapi' },
    { from: 'redis', to: 'fpgrowth' },
    { from: 'redis', to: 'postgres' },
  ];

  return (
    <section
      id="technology"
      style={{
        padding: '100px 0',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Grid container for content */}
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 100,
      }}>
        {/* Split View: Badges + Observability Graph */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* Left Side: Headline & Badge Cluster */}
          <div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 850,
              color: '#F8FAFC',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              marginBottom: 20,
            }}>
              Built for scale.<br />
              Designed for explainability.
            </h2>
            <p style={{
              fontSize: 15,
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 440,
            }}>
              BugRisk coordinates multiple container layers to profile CSV logs, mine rules via parallel trees, and evict telemetry cache transactions in microseconds.
            </p>

            {/* Micro badges cluster */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 440 }}>
              {['Spring Boot', 'FastAPI', 'Postgres', 'Redis', 'FP-Growth', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(124, 58, 237, 0.04)',
                    border: '1px solid rgba(124, 58, 237, 0.12)',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#F8FAFC',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Network Topology Observability Panel */}
          <div
            ref={techRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              width: '100%',
              height: '340px',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <svg style={{ width: '100%', height: '100%' }}>
              <defs>
                <filter id="techGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Group for mouse parallax translations */}
              <g style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
              }}>
                {/* Connections */}
                {techConnections.map((conn, idx) => {
                  const fromNode = techNodes.find(n => n.id === conn.from);
                  const toNode = techNodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  const isHighlighted = hoveredTechNode === conn.from || hoveredTechNode === conn.to;
                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isHighlighted ? fromNode.color : 'rgba(255, 255, 255, 0.05)'}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      className={isHighlighted ? 'tech-link-fast' : 'tech-link'}
                      style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                    />
                  );
                })}

                {/* Pure circular topology nodes (NO boxes/labels inside graph) */}
                {techNodes.map(n => {
                  const isHovered = hoveredTechNode === n.id;
                  return (
                    <g
                      key={n.id}
                      onMouseEnter={() => setHoveredTechNode(n.id)}
                      onMouseLeave={() => setHoveredTechNode(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isHovered ? 12 : 8}
                        fill="transparent"
                        stroke={n.color}
                        strokeWidth={1.5}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          animation: 'pulseGlow 2s infinite',
                        }}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isHovered ? 6 : 4}
                        fill={n.color}
                        filter={isHovered ? 'url(#techGlow)' : 'none'}
                        style={{ transition: 'all 0.3s' }}
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Hover details box */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(10, 15, 30, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 8,
              padding: '12px 16px',
              width: '190px',
              fontFamily: 'monospace',
              fontSize: '11px',
              opacity: hoveredTechNode ? 1 : 0.3,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)',
            }}>
              {hoveredTechNode ? (
                <>
                  <div style={{ color: techNodes.find(n => n.id === hoveredTechNode).color, fontWeight: 700, marginBottom: '4px' }}>
                    {techNodes.find(n => n.id === hoveredTechNode).label.toUpperCase()}
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: '10px', lineHeight: 1.4 }}>
                    {techNodes.find(n => n.id === hoveredTechNode).desc}
                  </div>
                </>
              ) : (
                <div style={{ color: '#475569', textAlign: 'center', paddingTop: 8 }}>
                  HOVER NODES TO DIAGNOSE
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Bottom: Integrated Final CTA (100px from tech section, NO separate footer) */}
        <div style={{
          textAlign: 'center',
          paddingTop: 80,
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Blurred Glow Background behind CTA */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '350px',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
            filter: 'blur(50px)',
          }} />

          {/* Floating particle 1 */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '15%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#38BDF8',
            boxShadow: '0 0 10px #38BDF8',
            animation: 'pulseGlow 3s infinite',
          }} />

          {/* Floating particle 2 */}
          <div style={{
            position: 'absolute',
            bottom: '100px',
            right: '15%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#EC4899',
            boxShadow: '0 0 10px #EC4899',
            animation: 'pulseGlow 4s infinite',
          }} />

          <h2 style={{
            fontSize: '44px',
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            marginBottom: 32,
          }}>
            Ready to understand your codebase<br />before it breaks?
          </h2>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 90 }}>
            <button
              onClick={onLogin}
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #38BDF8)',
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
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#fff',
                padding: '12px 32px',
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

          {/* Footer details directly below (NO additional spacing) */}
          <div style={{
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.03)',
            paddingTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#94A3B8',
            fontFamily: 'monospace',
            opacity: 0.4,
          }}>
            <span>BUGRISK PLATFORM</span>
            <span>© 2026 · ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page Redesign ─────────────────────────────────────────── */
export default function LandingPage({ onLogin }) {
  return (
    <div style={{
      background: '#020617',
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#F8FAFC',
      position: 'relative',
    }}>
      {/* Dynamic Background Gradients */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'floatBlob1 25s infinite ease-in-out',
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'floatBlob2 30s infinite ease-in-out',
      }} />
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '30%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'floatBlob1 28s infinite ease-in-out',
      }} />

      {/* Subtle Noise Texture Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.015,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.15); }
        
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, 40px) scale(1.1); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -50px) scale(0.95); }
        }
        @keyframes flowBeam {
          to { stroke-dashoffset: -40; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .tech-link {
          stroke-dasharray: 8 6;
          animation: flowBeam 1.5s linear infinite;
        }
        .tech-link-fast {
          stroke-dasharray: 8 6;
          animation: flowBeam 0.7s linear infinite;
        }
      `}</style>

      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />
      <ProductShowcase />
      <TechnologyAndCTA onLogin={onLogin} />
    </div>
  );
}
