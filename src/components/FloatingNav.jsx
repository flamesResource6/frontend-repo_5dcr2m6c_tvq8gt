import React from 'react';
import { Home } from 'lucide-react';

export default function FloatingNav({ active, total, onSelect, onBackToHero }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
      <div className="mx-auto max-w-[96rem] px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBackToHero}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur px-3 py-2 text-sm text-white transition"
          aria-label="Back to hero"
        >
          <Home size={16} />
          <span className="hidden sm:inline">Back to hero</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/30 border border-white/10 backdrop-blur px-3 py-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${active === i ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
              aria-label={`Go to world ${i + 1}`}
              aria-current={active === i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
