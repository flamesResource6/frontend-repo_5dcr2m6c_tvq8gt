import React from 'react';

export default function AccessibilityHints() {
  return (
    <div className="sr-only" aria-live="polite">
      Use your mouse wheel or trackpad to scroll horizontally through the reel. On touch devices, swipe left or right. Use the navigation dots to jump to a world or the Back to hero button to return to the start.
    </div>
  );
}
