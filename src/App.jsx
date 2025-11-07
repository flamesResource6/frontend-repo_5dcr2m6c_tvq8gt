import React from 'react';
import HeroCover from './components/HeroCover.jsx';
import EnterReveal from './components/EnterReveal.jsx';
import HorizontalReel from './components/HorizontalReel.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroCover />
      <EnterReveal />
      <HorizontalReel />
    </div>
  );
}
