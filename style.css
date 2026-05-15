@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

/* ── VARIABLES ──────────────────────────────────────────────────────────────── */
:root {
  --bg: #050a0e;
  --c-nonmetal:   #39ff14;
  --c-noble:      #ff073a;
  --c-alkali:     #ffe600;
  --c-alkaline:   #ff9500;
  --c-transition: #00d4ff;
  --c-post:       #bf5fff;
  --c-metalloid:  #00ffcc;
  --c-halogen:    #ff4da6;
  --c-lanthanide: #ff6b35;
  --c-actinide:   #35a7ff;
  --transition-time: 0.8s;
}

/* ── RESET & BASE ────────────────────────────────────────────────────────────── */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── HEADER ─────────────────────────────────────────────────────────────────── */
header {
  text-align: center;
  padding: 24px 0 10px;
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1rem, 3vw, 2rem);
  letter-spacing: 0.15em;
  color: #00d4ff;
  text-shadow: 0 0 20px #00d4ff, 0 0 60px #00d4ff44;
}

/* ── CONTROLS ───────────────────────────────────────────────────────────────── */
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  flex-wrap: wrap;
}

.toggle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  padding: 7px 22px;
  border: 1px solid #333;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.25s;
  text-transform: uppercase;
}

.toggle:hover {
  color: #fff;
  border-color: #fff;
}

.toggle.is-active {
  background: #00d4ff22;
  border-color: #00d4ff;
  color: #00d4ff;
  box-shadow: 0 0 12px #00d4ff55;
}

/* ── SCENE ──────────────────────────────────────────────────────────────────── */
#scene {
  width: 100%;
  perspective: 900px;
  padding: 10px 0 40px;
}

#scene-content {
  position: relative;
  width: 100%;
  transition: transform var(--transition-time) ease;
}

/* ── ELEMENT BUTTON ─────────────────────────────────────────────────────────── */
.element {
  position: absolute;
  width: 52px;
  height: 52px;
  border: 1px solid currentColor;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition:
    left      var(--transition-time) cubic-bezier(.77,0,.18,1),
    top       var(--transition-time) cubic-bezier(.77,0,.18,1),
    transform var(--transition-time) cubic-bezier(.77,0,.18,1),
    opacity   var(--transition-time) ease,
    box-shadow 0.2s;
  box-shadow: 0 0 6px currentColor44;
  font-family: 'Share Tech Mono', monospace;
  color: inherit;
}

.element:hover {
  box-shadow: 0 0 16px currentColor, 0 0 32px currentColor88;
  z-index: 100;
  transform: scale(1.15) !important;
}

.element-number { font-size: 7px;   line-height: 1;    opacity: 0.7;  }
.element-symbol { font-size: 17px;  font-weight: bold; line-height: 1.1; }
.element-name   { font-size: 5.5px; line-height: 1;    opacity: 0.75; }

/* ── CATEGORY COLORS ────────────────────────────────────────────────────────── */
[data-cat="nonmetal"]   { color: var(--c-nonmetal);   }
[data-cat="noble"]      { color: var(--c-noble);      }
[data-cat="alkali"]     { color: var(--c-alkali);     }
[data-cat="alkaline"]   { color: var(--c-alkaline);   }
[data-cat="transition"] { color: var(--c-transition); }
[data-cat="post"]       { color: var(--c-post);       }
[data-cat="metalloid"]  { color: var(--c-metalloid);  }
[data-cat="halogen"]    { color: var(--c-halogen);    }
[data-cat="lanthanide"] { color: var(--c-lanthanide); }
[data-cat="actinide"]   { color: var(--c-actinide);   }

/* ── TOOLTIP ────────────────────────────────────────────────────────────────── */
.tooltip {
  position: fixed;
  pointer-events: none;
  background: #0d1a22ee;
  border: 1px solid currentColor;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 1.6;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.15s;
  max-width: 160px;
}

.tooltip.show { opacity: 1; }
