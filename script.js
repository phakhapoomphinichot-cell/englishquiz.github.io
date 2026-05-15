// ── ELEMENT DATA ──────────────────────────────────────────────────────────────
const ELEMENTS = [
  {n:1,  sym:"H",  name:"Hydrogen",     cat:"nonmetal",   row:1, col:1},
  {n:2,  sym:"He", name:"Helium",       cat:"noble",      row:1, col:18},
  {n:3,  sym:"Li", name:"Lithium",      cat:"alkali",     row:2, col:1},
  {n:4,  sym:"Be", name:"Beryllium",    cat:"alkaline",   row:2, col:2},
  {n:5,  sym:"B",  name:"Boron",        cat:"metalloid",  row:2, col:13},
  {n:6,  sym:"C",  name:"Carbon",       cat:"nonmetal",   row:2, col:14},
  {n:7,  sym:"N",  name:"Nitrogen",     cat:"nonmetal",   row:2, col:15},
  {n:8,  sym:"O",  name:"Oxygen",       cat:"nonmetal",   row:2, col:16},
  {n:9,  sym:"F",  name:"Fluorine",     cat:"halogen",    row:2, col:17},
  {n:10, sym:"Ne", name:"Neon",         cat:"noble",      row:2, col:18},
  {n:11, sym:"Na", name:"Sodium",       cat:"alkali",     row:3, col:1},
  {n:12, sym:"Mg", name:"Magnesium",    cat:"alkaline",   row:3, col:2},
  {n:13, sym:"Al", name:"Aluminium",    cat:"post",       row:3, col:13},
  {n:14, sym:"Si", name:"Silicon",      cat:"metalloid",  row:3, col:14},
  {n:15, sym:"P",  name:"Phosphorus",   cat:"nonmetal",   row:3, col:15},
  {n:16, sym:"S",  name:"Sulfur",       cat:"nonmetal",   row:3, col:16},
  {n:17, sym:"Cl", name:"Chlorine",     cat:"halogen",    row:3, col:17},
  {n:18, sym:"Ar", name:"Argon",        cat:"noble",      row:3, col:18},
  {n:19, sym:"K",  name:"Potassium",    cat:"alkali",     row:4, col:1},
  {n:20, sym:"Ca", name:"Calcium",      cat:"alkaline",   row:4, col:2},
  {n:21, sym:"Sc", name:"Scandium",     cat:"transition", row:4, col:3},
  {n:22, sym:"Ti", name:"Titanium",     cat:"transition", row:4, col:4},
  {n:23, sym:"V",  name:"Vanadium",     cat:"transition", row:4, col:5},
  {n:24, sym:"Cr", name:"Chromium",     cat:"transition", row:4, col:6},
  {n:25, sym:"Mn", name:"Manganese",    cat:"transition", row:4, col:7},
  {n:26, sym:"Fe", name:"Iron",         cat:"transition", row:4, col:8},
  {n:27, sym:"Co", name:"Cobalt",       cat:"transition", row:4, col:9},
  {n:28, sym:"Ni", name:"Nickel",       cat:"transition", row:4, col:10},
  {n:29, sym:"Cu", name:"Copper",       cat:"transition", row:4, col:11},
  {n:30, sym:"Zn", name:"Zinc",         cat:"transition", row:4, col:12},
  {n:31, sym:"Ga", name:"Gallium",      cat:"post",       row:4, col:13},
  {n:32, sym:"Ge", name:"Germanium",    cat:"metalloid",  row:4, col:14},
  {n:33, sym:"As", name:"Arsenic",      cat:"metalloid",  row:4, col:15},
  {n:34, sym:"Se", name:"Selenium",     cat:"nonmetal",   row:4, col:16},
  {n:35, sym:"Br", name:"Bromine",      cat:"halogen",    row:4, col:17},
  {n:36, sym:"Kr", name:"Krypton",      cat:"noble",      row:4, col:18},
  {n:37, sym:"Rb", name:"Rubidium",     cat:"alkali",     row:5, col:1},
  {n:38, sym:"Sr", name:"Strontium",    cat:"alkaline",   row:5, col:2},
  {n:39, sym:"Y",  name:"Yttrium",      cat:"transition", row:5, col:3},
  {n:40, sym:"Zr", name:"Zirconium",    cat:"transition", row:5, col:4},
  {n:41, sym:"Nb", name:"Niobium",      cat:"transition", row:5, col:5},
  {n:42, sym:"Mo", name:"Molybdenum",   cat:"transition", row:5, col:6},
  {n:43, sym:"Tc", name:"Technetium",   cat:"transition", row:5, col:7},
  {n:44, sym:"Ru", name:"Ruthenium",    cat:"transition", row:5, col:8},
  {n:45, sym:"Rh", name:"Rhodium",      cat:"transition", row:5, col:9},
  {n:46, sym:"Pd", name:"Palladium",    cat:"transition", row:5, col:10},
  {n:47, sym:"Ag", name:"Silver",       cat:"transition", row:5, col:11},
  {n:48, sym:"Cd", name:"Cadmium",      cat:"transition", row:5, col:12},
  {n:49, sym:"In", name:"Indium",       cat:"post",       row:5, col:13},
  {n:50, sym:"Sn", name:"Tin",          cat:"post",       row:5, col:14},
  {n:51, sym:"Sb", name:"Antimony",     cat:"metalloid",  row:5, col:15},
  {n:52, sym:"Te", name:"Tellurium",    cat:"metalloid",  row:5, col:16},
  {n:53, sym:"I",  name:"Iodine",       cat:"halogen",    row:5, col:17},
  {n:54, sym:"Xe", name:"Xenon",        cat:"noble",      row:5, col:18},
  {n:55, sym:"Cs", name:"Caesium",      cat:"alkali",     row:6, col:1},
  {n:56, sym:"Ba", name:"Barium",       cat:"alkaline",   row:6, col:2},
  {n:57, sym:"La", name:"Lanthanum",    cat:"lanthanide", row:8, col:3},
  {n:58, sym:"Ce", name:"Cerium",       cat:"lanthanide", row:8, col:4},
  {n:59, sym:"Pr", name:"Praseodymium", cat:"lanthanide", row:8, col:5},
  {n:60, sym:"Nd", name:"Neodymium",    cat:"lanthanide", row:8, col:6},
  {n:61, sym:"Pm", name:"Promethium",   cat:"lanthanide", row:8, col:7},
  {n:62, sym:"Sm", name:"Samarium",     cat:"lanthanide", row:8, col:8},
  {n:63, sym:"Eu", name:"Europium",     cat:"lanthanide", row:8, col:9},
  {n:64, sym:"Gd", name:"Gadolinium",   cat:"lanthanide", row:8, col:10},
  {n:65, sym:"Tb", name:"Terbium",      cat:"lanthanide", row:8, col:11},
  {n:66, sym:"Dy", name:"Dysprosium",   cat:"lanthanide", row:8, col:12},
  {n:67, sym:"Ho", name:"Holmium",      cat:"lanthanide", row:8, col:13},
  {n:68, sym:"Er", name:"Erbium",       cat:"lanthanide", row:8, col:14},
  {n:69, sym:"Tm", name:"Thulium",      cat:"lanthanide", row:8, col:15},
  {n:70, sym:"Yb", name:"Ytterbium",    cat:"lanthanide", row:8, col:16},
  {n:71, sym:"Lu", name:"Lutetium",     cat:"lanthanide", row:8, col:17},
  {n:72, sym:"Hf", name:"Hafnium",      cat:"transition", row:6, col:4},
  {n:73, sym:"Ta", name:"Tantalum",     cat:"transition", row:6, col:5},
  {n:74, sym:"W",  name:"Tungsten",     cat:"transition", row:6, col:6},
  {n:75, sym:"Re", name:"Rhenium",      cat:"transition", row:6, col:7},
  {n:76, sym:"Os", name:"Osmium",       cat:"transition", row:6, col:8},
  {n:77, sym:"Ir", name:"Iridium",      cat:"transition", row:6, col:9},
  {n:78, sym:"Pt", name:"Platinum",     cat:"transition", row:6, col:10},
  {n:79, sym:"Au", name:"Gold",         cat:"transition", row:6, col:11},
  {n:80, sym:"Hg", name:"Mercury",      cat:"transition", row:6, col:12},
  {n:81, sym:"Tl", name:"Thallium",     cat:"post",       row:6, col:13},
  {n:82, sym:"Pb", name:"Lead",         cat:"post",       row:6, col:14},
  {n:83, sym:"Bi", name:"Bismuth",      cat:"post",       row:6, col:15},
  {n:84, sym:"Po", name:"Polonium",     cat:"post",       row:6, col:16},
  {n:85, sym:"At", name:"Astatine",     cat:"halogen",    row:6, col:17},
  {n:86, sym:"Rn", name:"Radon",        cat:"noble",      row:6, col:18},
  {n:87, sym:"Fr", name:"Francium",     cat:"alkali",     row:7, col:1},
  {n:88, sym:"Ra", name:"Radium",       cat:"alkaline",   row:7, col:2},
  {n:89, sym:"Ac", name:"Actinium",     cat:"actinide",   row:9, col:3},
  {n:90, sym:"Th", name:"Thorium",      cat:"actinide",   row:9, col:4},
  {n:91, sym:"Pa", name:"Protactinium", cat:"actinide",   row:9, col:5},
  {n:92, sym:"U",  name:"Uranium",      cat:"actinide",   row:9, col:6},
  {n:93, sym:"Np", name:"Neptunium",    cat:"actinide",   row:9, col:7},
  {n:94, sym:"Pu", name:"Plutonium",    cat:"actinide",   row:9, col:8},
  {n:95, sym:"Am", name:"Americium",    cat:"actinide",   row:9, col:9},
  {n:96, sym:"Cm", name:"Curium",       cat:"actinide",   row:9, col:10},
  {n:97, sym:"Bk", name:"Berkelium",    cat:"actinide",   row:9, col:11},
  {n:98, sym:"Cf", name:"Californium",  cat:"actinide",   row:9, col:12},
  {n:99, sym:"Es", name:"Einsteinium",  cat:"actinide",   row:9, col:13},
  {n:100,sym:"Fm", name:"Fermium",      cat:"actinide",   row:9, col:14},
  {n:101,sym:"Md", name:"Mendelevium",  cat:"actinide",   row:9, col:15},
  {n:102,sym:"No", name:"Nobelium",     cat:"actinide",   row:9, col:16},
  {n:103,sym:"Lr", name:"Lawrencium",   cat:"actinide",   row:9, col:17},
  {n:104,sym:"Rf", name:"Rutherfordium",cat:"transition", row:7, col:4},
  {n:105,sym:"Db", name:"Dubnium",      cat:"transition", row:7, col:5},
  {n:106,sym:"Sg", name:"Seaborgium",   cat:"transition", row:7, col:6},
  {n:107,sym:"Bh", name:"Bohrium",      cat:"transition", row:7, col:7},
  {n:108,sym:"Hs", name:"Hassium",      cat:"transition", row:7, col:8},
  {n:109,sym:"Mt", name:"Meitnerium",   cat:"transition", row:7, col:9},
  {n:110,sym:"Ds", name:"Darmstadtium", cat:"transition", row:7, col:10},
  {n:111,sym:"Rg", name:"Roentgenium",  cat:"transition", row:7, col:11},
  {n:112,sym:"Cn", name:"Copernicium",  cat:"transition", row:7, col:12},
  {n:113,sym:"Nh", name:"Nihonium",     cat:"post",       row:7, col:13},
  {n:114,sym:"Fl", name:"Flerovium",    cat:"post",       row:7, col:14},
  {n:115,sym:"Mc", name:"Moscovium",    cat:"post",       row:7, col:15},
  {n:116,sym:"Lv", name:"Livermorium",  cat:"post",       row:7, col:16},
  {n:117,sym:"Ts", name:"Tennessine",   cat:"halogen",    row:7, col:17},
  {n:118,sym:"Og", name:"Oganesson",    cat:"noble",      row:7, col:18},
];

// ── RENDER ────────────────────────────────────────────────────────────────────
const scene   = document.getElementById('scene-content');
const tooltip = document.getElementById('tooltip');
const S = 56; // cell size + gap

function buildElements() {
  ELEMENTS.forEach(el => {
    const btn = document.createElement('button');
    btn.className   = 'element';
    btn.dataset.cat = el.cat;
    btn.dataset.n   = el.n;
    btn.innerHTML   = `
      <div class="element-number">${el.n}</div>
      <div class="element-symbol">${el.sym}</div>
      <div class="element-name">${el.name}</div>`;
    btn.addEventListener('mousemove', e => showTip(e, el));
    btn.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
    scene.appendChild(btn);
  });
}

function showTip(e, el) {
  const color = getComputedStyle(scene.querySelector(`[data-n="${el.n}"]`)).color;
  tooltip.style.color = color;
  tooltip.innerHTML   = `<strong>${el.sym} — ${el.name}</strong><br>#${el.n} · ${el.cat}`;
  tooltip.classList.add('show');
  tooltip.style.left = (e.clientX + 14) + 'px';
  tooltip.style.top  = (e.clientY  - 14) + 'px';
}

// ── LAYOUTS ───────────────────────────────────────────────────────────────────
function layoutTable() {
  const W      = window.innerWidth;
  const cols   = 18;
  const startX = Math.max(4, (W - cols * S) / 2);

  ELEMENTS.forEach(el => {
    const btn = scene.querySelector(`[data-n="${el.n}"]`);
    const r   = el.row <= 7 ? el.row : el.row + 0.6; // gap before lanthanides/actinides
    btn.style.left      = (startX + (el.col - 1) * S) + 'px';
    btn.style.top       = ((r - 1) * S + 10) + 'px';
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1)';
  });
  scene.style.height = (10 * S + 60) + 'px';
}

function layoutSphere() {
  const W     = window.innerWidth;
  const cx    = W / 2 - 26;
  const cy    = 320;
  const count = ELEMENTS.length;

  ELEMENTS.forEach((el, i) => {
    const btn   = scene.querySelector(`[data-n="${el.n}"]`);
    const phi   = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r     = 270;
    btn.style.left      = (cx + r * Math.sin(phi) * Math.cos(theta)) + 'px';
    btn.style.top       = (cy + r * Math.cos(phi)) + 'px';
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1)';
  });
  scene.style.height = (cy + 320) + 'px';
}

function layoutHelix() {
  const W     = window.innerWidth;
  const cx    = W / 2 - 26;
  const count = ELEMENTS.length;

  ELEMENTS.forEach((el, i) => {
    const btn = scene.querySelector(`[data-n="${el.n}"]`);
    const t   = (i / (count - 1)) * Math.PI * 5;
    btn.style.left      = (cx + Math.cos(t) * Math.min(cx - 60, 260)) + 'px';
    btn.style.top       = (20 + i * 11) + 'px';
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1)';
  });
  scene.style.height = (count * 11 + 80) + 'px';
}

function layoutGrid() {
  const W      = window.innerWidth;
  const cols   = Math.floor((W - 20) / S);
  const startX = (W - cols * S) / 2;

  ELEMENTS.forEach((el, i) => {
    const btn = scene.querySelector(`[data-n="${el.n}"]`);
    btn.style.left      = (startX + (i % cols) * S) + 'px';
    btn.style.top       = (Math.floor(i / cols) * S + 10) + 'px';
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1)';
  });
  scene.style.height = (Math.ceil(ELEMENTS.length / cols) * S + 40) + 'px';
}

// ── CONTROLS ──────────────────────────────────────────────────────────────────
const layouts = {
  table:  layoutTable,
  sphere: layoutSphere,
  helix:  layoutHelix,
  grid:   layoutGrid,
};
let current = 'table';

function setLayout(name) {
  current = name;
  document.querySelectorAll('.toggle').forEach(b => b.classList.remove('is-active'));
  document.getElementById('btn-' + name).classList.add('is-active');
  layouts[name]();
}

// expose to inline onclick handlers in HTML
window.setLayout = setLayout;

// ── INIT ──────────────────────────────────────────────────────────────────────
buildElements();
layoutTable();

window.addEventListener('resize', () => layouts[current]());
