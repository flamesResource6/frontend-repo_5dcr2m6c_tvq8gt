import React, { useEffect, useRef } from 'react';
import SectionWorld from './SectionWorld.jsx';

// Utility: map vertical wheel/scroll to horizontal container translateX.
// Infinite looping via content duplication and modulo position.
export default function HorizontalReel() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const posRef = useRef(0);
  const speedRef = useRef(0);
  const rafRef = useRef(0);

  const worlds = [
    {
      id: 'MyLettering',
      title: 'MyLettering',
      palette: {
        from: '#ff7bd5',
        via: '#ffb86c',
        to: '#ffd166',
        bg: 'from-fuchsia-500/70 via-amber-400/60 to-yellow-300/60',
      },
      accent: 'from-pink-400 via-orange-300 to-amber-200',
      copy: 'Custom letterforms and typographic experiments with neon gradients and ink textures.',
    },
    {
      id: 'Isthmus',
      title: 'Isthmus',
      palette: {
        from: '#7bd0ff',
        via: '#6cfaff',
        to: '#3cf2b8',
        bg: 'from-sky-500/70 via-cyan-400/60 to-emerald-300/60',
      },
      accent: 'from-sky-300 via-cyan-200 to-emerald-200',
      copy: 'A bridge between ideas—flowing UI, archipelago layouts, and sea-glass hues.',
    },
    {
      id: 'ParentMap',
      title: 'ParentMap',
      palette: {
        from: '#c299ff',
        via: '#8a7dff',
        to: '#5f6cff',
        bg: 'from-violet-500/70 via-indigo-500/60 to-blue-500/60',
      },
      accent: 'from-violet-300 via-indigo-300 to-blue-300',
      copy: 'Guidance through the galaxy—soft gradients, guiding lines, and constellation dots.',
    },
    {
      id: 'ArqEdu',
      title: 'ArqEdu',
      palette: {
        from: '#ff8fb1',
        via: '#ff6f91',
        to: '#ff5d8f',
        bg: 'from-rose-500/70 via-fuchsia-500/60 to-purple-500/60',
      },
      accent: 'from-rose-300 via-fuchsia-300 to-purple-300',
      copy: 'Architecting learning—modular blocks, layered depth, and lush studio lighting.',
    },
  ];

  // Set up wheel->horizontal, touch drag, and RAF momentum with infinite loop.
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const contentWidth = () => track.scrollWidth / 2; // because duplicated

    const onWheel = (e) => {
      e.preventDefault();
      speedRef.current += e.deltaY * 0.6; // amplify vertical scroll
    };

    let touchStartX = 0;
    let lastX = 0;
    let dragging = false;

    const onTouchStart = (e) => {
      dragging = true;
      touchStartX = e.touches[0].clientX;
      lastX = touchStartX;
    };

    const onTouchMove = (e) => {
      if (!dragging) return;
      const x = e.touches[0].clientX;
      const dx = lastX - x;
      lastX = x;
      speedRef.current += dx * 1.2;
    };

    const onTouchEnd = () => {
      dragging = false;
    };

    const tick = () => {
      // Apply friction for smooth stop
      speedRef.current *= 0.92;
      posRef.current += speedRef.current;

      const width = contentWidth();
      // wrap position to keep it bounded
      if (posRef.current >= width) posRef.current -= width;
      if (posRef.current < 0) posRef.current += width;

      const x = -posRef.current;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Duplicate worlds for seamless loop
  const looped = [...worlds, ...worlds];

  return (
    <section className="relative w-full h-[120vh] bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(1000px_600px_at_20%_20%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(800px_500px_at_80%_60%,rgba(34,197,94,0.18),transparent_60%),radial-gradient(900px_700px_at_50%_120%,rgba(236,72,153,0.15),transparent_60%)]" />
      <div ref={containerRef} className="relative h-full overflow-hidden">
        <div ref={trackRef} className="will-change-transform flex h-full" style={{ transform: 'translate3d(0,0,0)' }}>
          {looped.map((w, i) => (
            <SectionWorld key={`${w.id}-${i}`} world={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
