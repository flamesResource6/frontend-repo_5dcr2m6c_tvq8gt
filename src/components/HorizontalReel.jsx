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
      label: 'LETTERING SCHOOL • BOOKS • SYSTEMS',
      title: 'MyLettering — Turning Letters into a Learning System',
      coreLine:
        'From a visual obsession to a full ecosystem: books, courses, and a method that actually builds skills.',
      body:
        'MyLettering started as ink on paper and grew into a structured path for creatives who want more than pretty quotes. Three volumes of Lettering Sin Límites, workshops and online courses guide students from first strokes to confident compositions with clear frameworks, not guesswork. Every exercise, layout and demo is designed so people understand why something works — and can repeat it without copying.',
      highlights: [
        '30,000+ books sold in Spanish-speaking markets',
        '2,000+ students across 8+ years',
        'Progressive structure: fundamentals → composition → style systems',
        'Built as a replicable method, not a one-off class',
      ],
      ctas: ['Explore MyLettering', 'See the 3-book series'],
      palette: {
        bg: 'from-fuchsia-500/70 via-amber-400/60 to-yellow-300/60',
        accent: 'from-pink-400 via-orange-300 to-amber-200',
      },
      layers: 'lettering',
    },
    {
      id: 'Isthmus',
      label: 'ACADEMIC BACKBONE • 15+ YEARS',
      title: 'Isthmus — Teaching Architects to Think in Systems',
      coreLine:
        'Fifteen years shaping architects in Panama, where presentation, tools and thinking matter as much as form.',
      body:
        "At Isthmus, my work goes beyond software demos. I’ve taught applied AI, intro UI/UX for designers, project presentation, visual communication and Photoshop at the undergraduate level, always pushing one idea: a strong project needs a strong argument. Studios, critiques and workshops are built to make students explain, defend and refine — so they don’t just show beautiful boards, they tell coherent stories.",
      highlights: [
        '15+ years teaching architecture & communication',
        'Courses integrating AI, UI/UX, and narrative into design education',
        'Known for improving briefs, rubrics and critique formats',
        'Bridge between academia, digital tools and real-world expectations',
      ],
      ctas: ['View teaching highlights', 'See studio & workshop formats'],
      palette: {
        bg: 'from-slate-800/80 via-indigo-900/60 to-blue-900/60',
        accent: 'from-sky-300 via-cyan-200 to-emerald-200',
      },
      layers: 'isthmus',
    },
    {
      id: 'ParentMap',
      label: 'HOMESCHOOL • PLANNERS • KIDS’ TOOLS',
      title: 'ParentMap — Order for Real Homeschool Families',
      coreLine: 'Planning tools born on an actual kitchen table, not in a marketing deck.',
      body:
        'ParentMap.co is a homeschool planning system designed for parents who juggle real kids, real schedules and real convictions. HÁBITO brings the year, the week and everyday habits into one clear layout, so you can see what matters without drowning in trackers. Alongside it, ClassicalKid.co offers a focused digital space for kids to practice Classical Conversations®-style content with clean prompts and zero clutter. Together they turn “we should be more consistent” into a calm, repeatable rhythm.',
      highlights: [
        'HÁBITO: structured weekly & yearly views, habit tracking, reflection spaces',
        'Built from lived homeschool experience (2 parents, 2 kids, actual chaos)',
        'ClassicalKid.co: bite-sized review, simple interface, independent practice',
        'Subtle faith-driven coherence without clichés',
      ],
      ctas: ['See the ParentMap system', 'Preview HÁBITO layouts', 'See how ClassicalKid works'],
      palette: {
        bg: 'from-amber-200/30 via-emerald-300/30 to-sky-200/30',
        accent: 'from-amber-300 via-emerald-300 to-sky-300',
      },
      layers: 'parentmap',
    },
    {
      id: 'ArqEdu',
      label: 'ONLINE CONTINUING ED • ARCHITECTS',
      title: 'ArqEdu — Continuing Education with Real Standards',
      coreLine:
        'An independent online campus for architects who want depth, not random YouTube playlists.',
      body:
        'ArqEdu.com is being built as a focused platform for architects and designers who need serious, complementary training. Diploma programs connect BIM, visualization, communication and strategic thinking, anchored in academic rigor and industry practice. It extends what works in the classroom into an online format that respects attention, time and professional goals. This is where universities, studios and individual architects find structured programs instead of fragmented tutorials.',
      highlights: [
        'Independent brand with its own identity',
        'Target: 3 certified diploma programs in year one',
        'Bridges architecture schools and real-world workflows',
        'Designed as a scalable ecosystem, not a one-shot course',
      ],
      ctas: ['Explore the ArqEdu vision', 'View sample curriculum map'],
      palette: {
        bg: 'from-blue-900/70 via-slate-900/70 to-emerald-900/60',
        accent: 'from-teal-300 via-sky-300 to-indigo-300',
      },
      layers: 'arquedu',
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

    let lastX = 0;
    let dragging = false;

    const onTouchStart = (e) => {
      dragging = true;
      lastX = e.touches[0].clientX;
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
    <section id="reel" className="relative w-full h-[140vh] bg-gradient-to-b from-black via-zinc-950 to-black">
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
