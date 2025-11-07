import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function LayerGraphics({ type, yBack, yMid, yFront }) {
  // Background layer
  const Background = (
    <motion.div style={{ y: yBack }} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-35 mix-blend-screen bg-[radial-gradient(600px_300px_at_10%_20%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(800px_400px_at_90%_70%,rgba(255,255,255,0.12),transparent_60%)]" />
    </motion.div>
  );

  // Midground layer per type
  const Mid = (
    <motion.div style={{ y: yMid }} className="absolute inset-0 pointer-events-none">
      {type === 'lettering' && (
        <>
          <div className="absolute left-6 top-10 right-6 h-px bg-white/15" />
          <div className="absolute left-10 top-1/3 right-10 h-px bg-white/10" />
          <div className="absolute left-14 top-2/3 right-14 h-px bg-white/10" />
          <div className="absolute right-16 top-16 h-40 w-40 rounded-2xl rotate-6 bg-white/5 border border-white/10" />
        </>
      )}
      {type === 'isthmus' && (
        <>
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent_45%,rgba(255,255,255,0.06)_50%,transparent_55%),repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_14px)]" />
          <div className="absolute left-24 top-24 h-40 w-40 border border-white/10 rotate-12" />
          <div className="absolute right-24 bottom-16 h-32 w-52 border border-white/10 -rotate-6" />
        </>
      )}
      {type === 'parentmap' && (
        <>
          <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_2px,transparent_2px,transparent_24px)]" />
          <div className="absolute left-16 top-16 h-24 w-36 rounded-xl bg-white/10" />
          <div className="absolute right-24 top-28 h-16 w-28 rounded-lg bg-white/10" />
        </>
      )}
      {type === 'arquedu' && (
        <>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(800px_600px_at_10%_110%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute left-20 bottom-24 h-40 w-72 border border-white/10 rounded-xl" />
          <div className="absolute right-32 top-24 h-32 w-56 border border-white/10 rounded-xl rotate-3" />
        </>
      )}
    </motion.div>
  );

  // Foreground accents per type
  const Fore = (
    <motion.div style={{ y: yFront }} className="absolute inset-0 pointer-events-none">
      {type === 'lettering' && (
        <>
          <div className="absolute -top-8 -left-6 h-24 w-40 rounded-xl bg-white/10 border border-white/10 backdrop-blur rotate-[-8deg]" />
          <div className="absolute -bottom-8 -right-6 h-24 w-40 rounded-xl bg-white/10 border border-white/10 backdrop-blur rotate-[10deg]" />
        </>
      )}
      {type === 'isthmus' && (
        <>
          <div className="absolute left-10 top-10 h-24 w-36 bg-white/10 border border-white/10 rounded-lg" />
          <div className="absolute right-10 bottom-10 h-24 w-36 bg-white/10 border border-white/10 rounded-lg" />
        </>
      )}
      {type === 'parentmap' && (
        <>
          <div className="absolute left-8 bottom-12 h-20 w-32 bg-white/10 border border-white/10 rounded-xl" />
          <div className="absolute right-8 top-12 h-20 w-32 bg-white/10 border border-white/10 rounded-xl" />
        </>
      )}
      {type === 'arquedu' && (
        <>
          <div className="absolute left-8 top-8 h-20 w-32 bg-white/10 border border-white/10 rounded-xl" />
          <div className="absolute right-10 bottom-8 h-20 w-32 bg-white/10 border border-white/10 rounded-xl" />
        </>
      )}
    </motion.div>
  );

  return (
    <>
      {Background}
      {Mid}
      {Fore}
    </>
  );
}

export default function SectionWorld({ world }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '0px 200px -20% 200px', amount: 0.4 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-[85vw] md:w-[95vw] h-full px-6 md:px-12 py-12 md:py-16"
      aria-label={`${world.title} section`}
    >
      <motion.div
        style={{ y: yBack, scale }}
        className={`absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden bg-gradient-to-br ${world.palette.bg}`}
      >
        <div className="absolute inset-0 opacity-30 backdrop-blur-[1px]" />
      </motion.div>

      <LayerGraphics type={world.layers} yBack={yBack} yMid={yMid} yFront={yFront} />

      <motion.div style={{ y: yFront }} className="relative h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 w-full items-stretch">
          <div
            className="md:col-span-6 pr-2 md:pr-4 max-h-[70vh] md:max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40"
            data-stop-hscroll
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-xs uppercase tracking-[0.22em] text-white/60"
            >
              {world.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight"
            >
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${world.palette.accent}`}>
                {world.title}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
              className="mt-3 text-white/85 italic"
            >
              {world.coreLine}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
              className="mt-4 text-white/85 max-w-xl"
            >
              {world.body}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
              className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/90"
            >
              {world.highlights?.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
                  <span>{h}</span>
                </li>
              ))}
            </motion.ul>
            {world.ctas?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="mt-6 flex flex-wrap gap-3"
              >
                {world.ctas.map((c, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white backdrop-blur border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </div>

          <div className="md:col-span-6">
            {/* Key visual stage */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative h-64 md:h-[420px] w-full"
            >
              <div className="absolute inset-0 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className={`absolute inset-0 opacity-80 bg-gradient-to-br ${world.palette.bg}`} />
                <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(300px_300px_at_70%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
              </div>
              <div className="absolute -top-6 -left-6 h-28 w-40 md:h-36 md:w-56 rounded-xl bg-white/10 border border-white/10 backdrop-blur rotate-[-6deg]" />
              <div className="absolute -bottom-6 -right-4 h-28 w-40 md:h-36 md:w-56 rounded-xl bg-white/10 border border-white/10 backdrop-blur rotate-[8deg]" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
