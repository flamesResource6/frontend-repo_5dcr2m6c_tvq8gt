import React, { useEffect, useRef, useState, useCallback } from 'react';
import FloatingNav from './FloatingNav.jsx';

export default function ScrollManager({ children, sectionCount, getSectionWidth }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const speedRef = useRef(0);
  const rafRef = useRef(0);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const width = getSectionWidth();
    const sectionW = width / sectionCount;
    const clamped = ((index % sectionCount) + sectionCount) % sectionCount;
    posRef.current = clamped * sectionW;
    speedRef.current = 0; // stop momentum for precise snap
  }, [getSectionWidth, sectionCount]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const contentWidth = () => track.scrollWidth / 2; // duplicated

    const onWheel = (e) => {
      // If user is interacting with a marked content area, allow normal vertical scrolling
      const withinContent = e.target && typeof e.target.closest === 'function' && e.target.closest('[data-stop-hscroll]');
      if (withinContent) return; // let default happen (no preventDefault)

      e.preventDefault();
      speedRef.current += e.deltaY * 0.6;
    };

    let startX = 0;
    let dragging = false;

    const onPointerDown = (e) => {
      dragging = true;
      startX = e.clientX;
      container.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = startX - e.clientX;
      startX = e.clientX;
      speedRef.current += dx * 1.2;
    };
    const onPointerUp = (e) => {
      dragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch {}
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToIndex(active + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToIndex(active - 1);
      }
    };

    const tick = () => {
      // friction and bounds
      speedRef.current *= 0.92;
      posRef.current += speedRef.current;
      const width = contentWidth();
      if (posRef.current >= width) posRef.current -= width;
      if (posRef.current < 0) posRef.current += width;

      const x = -posRef.current;
      track.style.transform = `translate3d(${x}px,0,0)`;

      // active section index
      const sectionW = width / sectionCount;
      const index = Math.round(posRef.current / sectionW) % sectionCount;
      setActive((index + sectionCount) % sectionCount);

      rafRef.current = requestAnimationFrame(tick);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('keydown', onKeyDown);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [sectionCount, scrollToIndex, active]);

  return (
    <section id="reel" className="relative w-full h-[140vh] bg-gradient-to-b from-black via-zinc-950 to-black" aria-label="Cinematic horizontal reel">
      <FloatingNav
        active={active}
        total={sectionCount}
        onSelect={(idx) => scrollToIndex(idx)}
        onBackToHero={() => {
          const hero = document.querySelector('section');
          if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(1000px_600px_at_20%_20%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(800px_500px_at_80%_60%,rgba(34,197,94,0.18),transparent_60%),radial-gradient(900px_700px_at_50%_120%,rgba(236,72,153,0.15),transparent_60%)]" />
      <div ref={containerRef} className="relative h-full overflow-hidden">
        <div ref={trackRef} className="will-change-transform flex h-full" style={{ transform: 'translate3d(0,0,0)' }}>
          {children}
        </div>
      </div>
    </section>
  );
}
