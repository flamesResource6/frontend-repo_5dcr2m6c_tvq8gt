import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function SectionWorld({ world, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '0px 200px -20% 200px', amount: 0.4 });

  // Parallax: Based on overall page scroll progress
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-0.5, 0.5]);

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-[85vw] md:w-[95vw] h-full px-6 md:px-12 py-12 md:py-16"
      aria-label={`${world.title} section`}
    >
      {/* Background gradient universe */}
      <motion.div
        style={{ y: yBack, scale }}
        className={`absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden bg-gradient-to-br ${world.palette.bg}`}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(600px_300px_at_10%_20%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(800px_400px_at_90%_70%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-30 backdrop-blur-[1px]" />
      </motion.div>

      {/* Midground shapes */}
      <motion.div style={{ y: yMid, rotate }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-64 w-64 md:h-96 md:w-96 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
        <div className="absolute -right-16 bottom-10 h-56 w-56 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-2xl" />
        <div className={`absolute left-1/3 top-1/3 h-40 w-40 md:h-64 md:w-64 rounded-3xl rotate-12 opacity-70 bg-gradient-to-br ${world.accent}`} />
      </motion.div>

      {/* Foreground content */}
      <motion.div style={{ y: yFront }} className="relative h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 w-full items-center">
          <div className="md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
            >
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${world.accent}`}>
                {world.title}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mt-4 text-white/85 max-w-md"
            >
              {world.copy}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="mt-6 flex gap-3"
            >
              <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white backdrop-blur border border-white/10">
                View Project
              </button>
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 transition text-white backdrop-blur border border-white/10">
                Case Study
              </button>
            </motion.div>
          </div>

          <div className="md:col-span-7">
            {/* Key visual mock: layered cards with depth */}
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
