import React, { useEffect, useRef } from 'react';

export default function EnterReveal() {
  const layerRef1 = useRef(null);
  const layerRef2 = useRef(null);
  const layerRef3 = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2; // -1..1
      const y = (e.clientY / h - 0.5) * 2;
      if (layerRef1.current) layerRef1.current.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
      if (layerRef2.current) layerRef2.current.style.transform = `translate3d(${x * -20}px, ${y * -16}px, 0)`;
      if (layerRef3.current) layerRef3.current.style.transform = `translate3d(${x * 30}px, ${y * -22}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const goToReel = () => {
    const el = document.getElementById('reel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Parallax gradient layers */}
      <div ref={layerRef1} className="pointer-events-none absolute -inset-10 opacity-60 bg-[radial-gradient(800px_500px_at_20%_30%,rgba(236,72,153,0.25),transparent_60%),radial-gradient(700px_500px_at_80%_70%,rgba(14,165,233,0.25),transparent_60%)]" />
      <div ref={layerRef2} className="pointer-events-none absolute -inset-10 opacity-50 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(34,197,94,0.18),transparent_60%)]" />
      <div ref={layerRef3} className="pointer-events-none absolute -inset-10 opacity-40 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(99,102,241,0.18),transparent_30%,rgba(236,72,153,0.18),transparent_60%)]" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Scroll or tap to enter</p>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-emerald-300">
          Dive into the Reel
        </h2>
        <p className="mt-3 text-white/70 max-w-xl">
          A loop of four worlds. Layers glide at different speeds to create a cinematic feel.
        </p>
        <button onClick={goToReel} className="mt-6 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur text-white transition">
          Enter the Worlds
        </button>
      </div>
    </section>
  );
}
