'use client'
import { useState, useEffect, useRef } from 'react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f1117;--bg2:#161b22;--bg3:#1c2333;--bg4:#21262d;
  --card:#161b22;--card2:#1c2333;
  --border:#30363d;--border2:#484f58;
  --blue:#58a6ff;--blue2:#1f6feb;
  --green:#3fb950;--green2:#238636;
  --purple:#bc8cff;--orange:#f0883e;--red:#f85149;--yellow:#d29922;
  --text:#e6edf3;--text2:#8b949e;--text3:#6e7681;
  --bio:#3fb950;--chem:#bc8cff;--phys:#58a6ff;--math:#f0883e;
  --r:8px;--r2:12px;--r3:16px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;font-size:14px;line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background .2s,color .2s}
.app{display:flex;min-height:100vh}
.page{padding:24px;max-width:1200px}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:18px;transition:border-color .15s,background .2s}
.card:hover{border-color:var(--border2)}
.card-sm{padding:12px;border-radius:var(--r)}
.card-blue{border-color:rgba(88,166,255,.2);background:rgba(88,166,255,.04)}
.card-green{border-color:rgba(63,185,80,.2);background:rgba(63,185,80,.04)}
.card-purple{border-color:rgba(188,140,255,.2);background:rgba(188,140,255,.04)}
.card-orange{border-color:rgba(240,136,62,.2);background:rgba(240,136,62,.04)}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.grid-auto{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:7px 14px;border-radius:var(--r);border:1px solid var(--border);cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;transition:all .15s;outline:none;white-space:nowrap}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn-primary{background:var(--blue2);border-color:var(--blue2);color:#fff;font-weight:600}
.btn-primary:hover:not(:disabled){background:#388bfd;box-shadow:0 0 0 3px rgba(31,111,235,.2)}
.btn-green{background:var(--green2);border-color:var(--green2);color:#fff;font-weight:600}
.btn-secondary{background:var(--bg3);border-color:var(--border);color:var(--text)}
.btn-secondary:hover{background:var(--bg4)}
.btn-outline{background:transparent;color:var(--blue);border-color:rgba(88,166,255,.4)}
.btn-outline:hover{background:rgba(88,166,255,.1)}
.btn-ghost{background:transparent;border-color:transparent;color:var(--text2)}
.btn-ghost:hover{background:var(--bg3);color:var(--text)}
.btn-danger{background:rgba(248,81,73,.1);border-color:rgba(248,81,73,.3);color:var(--red)}
.btn-success{background:rgba(63,185,80,.1);border-color:rgba(63,185,80,.3);color:var(--green)}
.btn-sm{padding:4px 10px;font-size:12px;border-radius:6px}
.btn-lg{padding:10px 20px;font-size:14px;border-radius:var(--r2)}
.badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600}
.badge-bio{background:rgba(63,185,80,.12);color:var(--bio)}
.badge-chem{background:rgba(188,140,255,.12);color:var(--chem)}
.badge-phys{background:rgba(88,166,255,.12);color:var(--phys)}
.badge-math{background:rgba(240,136,62,.12);color:var(--math)}
.badge-neet{background:rgba(88,166,255,.12);color:var(--blue)}
.badge-cet{background:rgba(63,185,80,.12);color:var(--green)}
.badge-easy{background:rgba(63,185,80,.12);color:var(--green)}
.badge-med{background:rgba(210,153,34,.12);color:var(--yellow)}
.badge-hard{background:rgba(248,81,73,.12);color:var(--red)}
.prog{background:var(--bg3);border-radius:100px;overflow:hidden}
.prog-fill{height:100%;border-radius:100px;transition:width .5s ease}
.tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:20px;gap:0;overflow-x:auto}
.tab{padding:9px 16px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text2);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;white-space:nowrap}
.tab:hover{color:var(--text)}
.tab.active{color:var(--blue);border-bottom-color:var(--blue);font-weight:600}
.mcq-opt{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--r2);cursor:pointer;transition:all .15s;margin-bottom:8px;font-size:14px}
.mcq-opt:hover:not(.locked){border-color:var(--blue);background:rgba(88,166,255,.05)}
.mcq-opt.sel{border-color:var(--blue);background:rgba(88,166,255,.08)}
.mcq-opt.ok{border-color:var(--green);background:rgba(63,185,80,.08)}
.mcq-opt.bad{border-color:var(--red);background:rgba(248,81,73,.08)}
.mcq-opt.locked{cursor:default}
.opt-letter{width:28px;height:28px;border-radius:6px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;flex-shrink:0;border:1px solid var(--border)}
.mcq-opt.sel .opt-letter{background:var(--blue2);color:#fff;border-color:var(--blue2)}
.mcq-opt.ok .opt-letter{background:var(--green2);color:#fff;border-color:var(--green2)}
.mcq-opt.bad .opt-letter{background:var(--red);color:#fff;border-color:var(--red)}
.chat-msgs{overflow-y:auto;display:flex;flex-direction:column;gap:14px;flex:1;padding:16px 24px}
.msg{display:flex;gap:10px;max-width:80%;align-items:flex-start}
.msg.user{align-self:flex-end;flex-direction:row-reverse}
.msg-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.msg-ai-av{background:linear-gradient(135deg,#58a6ff,#bc8cff);color:#fff}
.msg-user-av{background:linear-gradient(135deg,#3fb950,#58a6ff);color:#fff}
.msg-bbl{padding:10px 13px;border-radius:12px;font-size:13.5px;line-height:1.7;word-break:break-word}
.msg.ai .msg-bbl{background:var(--card2);border:1px solid var(--border);border-top-left-radius:4px}
.msg.user .msg-bbl{background:var(--blue2);border-top-right-radius:4px;color:#fff}
.msg-bbl pre,.msg-bbl code{display:none}
.msg-bbl strong{color:var(--blue);font-weight:600}
.msg.user .msg-bbl strong{color:#fff}
.msg-time{font-size:10px;color:var(--text3);margin-top:3px}
.msg.user .msg-time{text-align:right}
.chat-input-row{padding:12px 24px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:flex-end;background:var(--bg);flex-shrink:0}
.chat-inp{flex:1;background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:10px 13px;color:var(--text);font-family:inherit;font-size:14px;resize:none;outline:none;min-height:42px;max-height:120px}
.chat-inp:focus{border-color:var(--blue)}
.chip-row{display:flex;flex-wrap:wrap;gap:6px;padding:10px 24px 0;flex-shrink:0}
.chip{padding:5px 12px;border-radius:20px;font-size:12px;font-weight:500;background:var(--bg3);border:1px solid var(--border);cursor:pointer;color:var(--text2);transition:all .15s}
.chip:hover{border-color:var(--blue);color:var(--blue)}
.hm{aspect-ratio:1;border-radius:3px;cursor:pointer;transition:transform .1s}
.hm:hover{transform:scale(1.4)}
.h0{background:var(--bg3)}.h1{background:rgba(63,185,80,.2)}.h2{background:rgba(63,185,80,.45)}.h3{background:rgba(63,185,80,.7)}.h4{background:var(--green)}
.heatmap{display:grid;grid-template-columns:repeat(13,1fr);gap:3px}
.ring-wrap{position:relative;display:inline-block}
.ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.typing-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--blue);animation:blink 1.2s infinite;margin:0 2px}
.typing-dot:nth-child(2){animation-delay:.2s}.typing-dot:nth-child(3){animation-delay:.4s}
@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bg4);border-radius:5px}
.fade-in{animation:fi .25s ease}
@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.result-score{font-family:'Space Grotesk',sans-serif;font-size:58px;font-weight:800;background:linear-gradient(135deg,#58a6ff,#bc8cff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1}
.fc-card{width:100%;min-height:200px;border-radius:var(--r2);position:relative;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.fc-card.flipped{transform:rotateY(180deg)}
.fc-face{position:absolute;inset:0;border-radius:var(--r2);padding:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;backface-visibility:hidden;border:1px solid var(--border)}
.fc-front{background:var(--card)}
.fc-back{background:var(--card2);transform:rotateY(180deg)}
.game-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:18px;cursor:pointer;transition:all .2s;overflow:hidden;position:relative}
.game-card::before{content:'';position:absolute;top:-25px;right:-25px;width:70px;height:70px;border-radius:50%;background:var(--gc,#58a6ff);opacity:.08;transition:transform .3s}
.game-card:hover{border-color:var(--border2);transform:translateY(-2px)}
.game-card:hover::before{transform:scale(2.5)}
.note-item{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:12px;cursor:pointer;transition:all .15s;margin-bottom:8px}
.note-item:hover{border-color:var(--border2)}
.note-item.sel{border-color:var(--blue)}
.toggle{width:42px;height:23px;border-radius:12px;background:var(--bg3);border:1px solid var(--border);position:relative;cursor:pointer;transition:background .2s;flex-shrink:0;outline:none;display:inline-block}
.toggle.on{background:var(--green2);border-color:var(--green2)}
.toggle::after{content:'';position:absolute;width:17px;height:17px;border-radius:50%;background:#fff;top:2px;left:2px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.toggle.on::after{left:21px}
.notif-panel{position:fixed;top:54px;right:12px;width:310px;background:var(--card);border:1px solid var(--border);border-radius:var(--r2);box-shadow:0 8px 32px rgba(0,0,0,.5);z-index:200;max-height:70vh;overflow-y:auto}
.notif-item{padding:11px 14px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;display:flex;gap:9px}
.notif-item:hover{background:var(--bg3)}
.notif-item:last-child{border-bottom:none}
.chapter-row{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r);cursor:pointer;transition:background .15s;border:1px solid transparent}
.chapter-row:hover{background:var(--bg3);border-color:var(--border)}
.task-item{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border)}
.task-item:last-child{border-bottom:none}
.task-check{width:17px;height:17px;border-radius:4px;border:1.5px solid var(--border2);flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.task-check.done{background:var(--green2);border-color:var(--green2)}
.boss-hp{height:18px;background:var(--bg3);border-radius:100px;overflow:hidden;border:1px solid var(--border)}
.boss-hp-fill{height:100%;background:linear-gradient(90deg,var(--red),var(--orange));border-radius:100px;transition:width .4s ease}
.opt-card{width:100%;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--r);background:transparent;cursor:pointer;text-align:left;color:var(--text);font-family:inherit;font-size:13px;display:flex;align-items:center;gap:10px;transition:all .15s;margin-bottom:8px}
.opt-card:hover{border-color:var(--border2);background:var(--bg3)}
.opt-card.sel{border-color:var(--blue);background:rgba(88,166,255,.08)}
.step-dots{display:flex;gap:7px;justify-content:center;margin-bottom:24px}
.step-dot{width:7px;height:7px;border-radius:50%;background:var(--bg3);transition:all .3s}
.step-dot.done{background:var(--green)}.step-dot.active{background:var(--blue);width:22px;border-radius:4px}
@media(max-width:900px){.grid-4{grid-template-columns:repeat(2,1fr)}.grid-3{grid-template-columns:repeat(2,1fr)}.page{padding:14px}}
@media(max-width:640px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}.sidebar{display:none}.main{margin-left:0!important}}
`


// ── DATA ──────────────────────────────────────────────────────────
const SYLLABUS = {
  biology:{label:'Biology',icon:'🧬',color:'var(--bio)',
    11:['The Living World','Biological Classification','Plant Kingdom','Animal Kingdom','Morphology of Flowering Plants','Anatomy of Flowering Plants','Structural Organisation in Animals','Cell: The Unit of Life','Biomolecules','Cell Cycle and Cell Division','Transport in Plants','Mineral Nutrition','Photosynthesis in Higher Plants','Respiration in Plants','Plant Growth and Development','Digestion and Absorption','Breathing and Exchange of Gases','Body Fluids and Circulation','Excretory Products','Locomotion and Movement','Neural Control and Coordination','Chemical Coordination and Integration'],
    12:['Reproduction in Organisms','Sexual Reproduction in Flowering Plants','Human Reproduction','Reproductive Health','Principles of Inheritance and Variation','Molecular Basis of Inheritance','Evolution','Human Health and Disease','Strategies for Enhancement in Food Production','Microbes in Human Welfare','Biotechnology: Principles and Processes','Biotechnology and its Applications','Organisms and Populations','Ecosystem','Biodiversity and Conservation','Environmental Issues']},
  chemistry:{label:'Chemistry',icon:'⚗️',color:'var(--chem)',
    11:['Some Basic Concepts of Chemistry','Structure of Atom','Classification of Elements and Periodicity','Chemical Bonding and Molecular Structure','States of Matter','Thermodynamics','Equilibrium','Redox Reactions','Hydrogen','s-Block Elements','p-Block Elements (11)','Organic Chemistry: Basic Principles','Hydrocarbons','Environmental Chemistry'],
    12:['Solid State','Solutions','Electrochemistry','Chemical Kinetics','Surface Chemistry','General Principles of Metallurgy','p-Block Elements (12)','d and f Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules','Polymers','Chemistry in Everyday Life']},
  physics:{label:'Physics',icon:'⚛️',color:'var(--phys)',
    11:['Physical World','Units and Measurements','Motion in a Straight Line','Motion in a Plane','Laws of Motion','Work, Energy and Power','System of Particles and Rotational Motion','Gravitation','Mechanical Properties of Solids','Mechanical Properties of Fluids','Thermal Properties of Matter','Thermodynamics','Kinetic Theory','Oscillations','Waves'],
    12:['Electric Charges and Fields','Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics and Optical Instruments','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics','Communication Systems']},
  maths:{label:'Maths',icon:'📐',color:'var(--math)',
    11:['Sets','Relations and Functions','Trigonometric Functions','Mathematical Induction','Complex Numbers','Linear Inequalities','Permutations and Combinations','Binomial Theorem','Sequences and Series','Straight Lines','Conic Sections','Introduction to 3D Geometry','Limits and Derivatives','Statistics','Probability (11)'],
    12:['Relations and Functions (12)','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Applications of Derivatives','Integrals','Applications of Integrals','Differential Equations','Vector Algebra','3D Geometry','Linear Programming','Probability (12)']}
}

const CONCEPT_NOTES = {
  "Cell: The Unit of Life":{summary:"The cell is the structural and functional unit of life.",points:["Prokaryotic cells lack membrane-bound nucleus","Eukaryotic cells have membrane-bound organelles","Cell membrane: Fluid Mosaic Model (Singer and Nicolson)","Nucleus: double membrane, nuclear pores, nucleolus"],formula:"Surface Area to Volume ratio determines cell size limit",pyqs:["NEET 2022: Cell theory was proposed by","NEET 2021: Plasma membrane is made of"]},
  "Electrochemistry":{summary:"Study of relationship between electrical energy and chemical reactions.",points:["Faraday First Law: m = ZIt (Z = electrochemical equivalent)","Nernst Equation: E = E0 - (RT/nF)lnQ","At 298K: E = E0 - (0.0592/n)logQ","SHE potential = 0.00 V by convention"],formula:"dG = -nFE  |  E0cell = E0cathode - E0anode",pyqs:["NEET 2023: SHE potential is","MHT-CET 2022: Faraday constant value"]},
  "Laws of Motion":{summary:"Newton laws govern motion of objects.",points:["First Law: Inertia - body at rest stays at rest","Second Law: F = ma (rate of change of momentum)","Third Law: Every action has equal and opposite reaction","Friction: f = uN (us greater than uk)"],formula:"p = mv  |  F = dp/dt  |  Impulse = F times dt = dp",pyqs:["NEET 2022: Min force to move 2kg block with u=0.4","NEET 2020: Newton second law in terms of momentum"]},
  "Molecular Basis of Inheritance":{summary:"DNA structure, replication, transcription and translation.",points:["DNA: double helix, antiparallel strands, B-form (Watson and Crick 1953)","Replication: semi-conservative (Meselson-Stahl experiment)","Okazaki fragments on lagging strand joined by DNA Ligase","Central Dogma: DNA to RNA to Protein"],formula:"Chargaff Rule: [A]=[T], [G]=[C]  |  A+T+G+C = 100%",pyqs:["NEET 2021: Okazaki fragments joined by","NEET 2022: Semi-conservative replication proved by"]}
}

const QUESTIONS = [
  {id:1,sub:"bio",ch:"Cell Cycle and Cell Division",text:"Which phase of mitosis is characterized by separation of chromatids to opposite poles?",opts:["Prophase","Metaphase","Anaphase","Telophase"],correct:2,diff:"easy",exam:"NEET",year:2022,exp:"During Anaphase, centromeres split and sister chromatids are pulled to opposite poles by spindle fibres."},
  {id:2,sub:"chem",ch:"Chemical Kinetics",text:"For a first-order reaction, the half-life is independent of:",opts:["Temperature","Rate constant","Initial concentration","Activation energy"],correct:2,diff:"med",exam:"NEET",year:2023,exp:"Half-life = 0.693/k - depends only on k, not initial concentration. This is a defining property of first-order kinetics."},
  {id:3,sub:"phys",ch:"Laws of Motion",text:"A 2 kg block has coefficient of static friction 0.4. Minimum force to move it (g = 10 m/s2):",opts:["2 N","4 N","8 N","16 N"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"f = us times mg = 0.4 x 2 x 10 = 8 N. Applied force must exceed maximum static friction."},
  {id:4,sub:"bio",ch:"Molecular Basis of Inheritance",text:"Okazaki fragments on the lagging strand are joined by:",opts:["DNA Pol I","DNA Ligase","DNA Pol III","RNA Primase"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"DNA Ligase seals nicks between Okazaki fragments by forming phosphodiester bonds."},
  {id:5,sub:"chem",ch:"Electrochemistry",text:"Standard electrode potential of the Standard Hydrogen Electrode (SHE) is:",opts:["+1.0 V","-1.0 V","0.0 V","+0.5 V"],correct:2,diff:"easy",exam:"MHT",year:2023,exp:"By convention the SHE is assigned exactly 0.00 V - the universal reference electrode."},
  {id:6,sub:"phys",ch:"Wave Optics",text:"In YDSE, if slit separation d is doubled, fringe width changes how?",opts:["Doubles","Halves","Unchanged","4 times"],correct:1,diff:"hard",exam:"NEET",year:2023,exp:"Fringe width = lambda D / d. Doubling d halves fringe width. Inverse proportionality."},
  {id:7,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"P700 is the reaction centre of:",opts:["Photosystem I","Photosystem II","Both PS-I and PS-II","Neither"],correct:0,diff:"med",exam:"NEET",year:2022,exp:"P700 is the reaction centre of PS-I absorbing light at 700 nm. P680 belongs to PS-II."},
  {id:8,sub:"chem",ch:"Coordination Compounds",text:"IUPAC name of [Co(NH3)6]3+ is:",opts:["Cobalt hexamine","Hexaamminecobalt(III)","Hexaaminecobalt(III)","Hexaamminocobalt(III)"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Ligands are named before metal; NH3 = ammine; six = hexa; Co3+ = cobalt(III)."},
  {id:9,sub:"phys",ch:"Current Electricity",text:"Kirchhoff Current Law (KCL) is based on conservation of:",opts:["Energy","Charge","Momentum","Mass"],correct:1,diff:"easy",exam:"MHT",year:2021,exp:"KCL: sum of all currents at a node = 0. Direct consequence of conservation of electric charge."},
  {id:10,sub:"bio",ch:"Principles of Inheritance",text:"Phenotypic ratio in F2 generation of a monohybrid cross:",opts:["1:1","3:1","9:3:3:1","1:2:1"],correct:1,diff:"easy",exam:"NEET",year:2023,exp:"Mendel Law: 3 dominant : 1 recessive phenotype in F2 of monohybrid cross."},
  {id:11,sub:"chem",ch:"Thermodynamics",text:"For a spontaneous process at constant T and P, Gibbs free energy change must be:",opts:["Positive","Zero","Negative","Equal to enthalpy"],correct:2,diff:"med",exam:"NEET",year:2020,exp:"dG = dH - TdS. Spontaneous means dG less than 0. Equilibrium means dG = 0."},
  {id:12,sub:"phys",ch:"Atoms",text:"In Bohr model, radius of the nth orbit is proportional to:",opts:["n","n squared","1/n","1/n squared"],correct:1,diff:"easy",exam:"MHT",year:2023,exp:"radius = n squared times a0/Z. Radius grows as n squared."},
  {id:13,sub:"bio",ch:"Evolution",text:"Hardy-Weinberg equilibrium is disturbed by:",opts:["Large population","Random mating","Natural selection","No migration"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Natural selection is one of the factors that disturbs Hardy-Weinberg equilibrium."},
  {id:14,sub:"chem",ch:"Solutions",text:"Which colligative property is used to determine molar mass of polymers?",opts:["Osmotic pressure","Elevation of boiling point","Depression of freezing point","Relative lowering of vapor pressure"],correct:0,diff:"med",exam:"NEET",year:2022,exp:"Osmotic pressure gives measurably large values even at low concentrations, ideal for polymers."},
  {id:15,sub:"phys",ch:"Electromagnetic Induction",text:"Lenz law is a consequence of conservation of:",opts:["Charge","Mass","Energy","Momentum"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Lenz law: induced EMF opposes change - ensures conservation of energy."},
  {id:16,sub:"bio",ch:"Human Health and Disease",text:"Which is NOT a symptom of AIDS?",opts:["Weight loss","Persistent fever","Hypertension","Opportunistic infections"],correct:2,diff:"easy",exam:"NEET",year:2020,exp:"AIDS causes immune collapse leading to weight loss, fever, diarrhoea. Hypertension is not characteristic."},
  {id:17,sub:"chem",ch:"Chemical Bonding",text:"Shape of PCl5 molecule is:",opts:["Tetrahedral","Square planar","Trigonal bipyramidal","Octahedral"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"PCl5: 5 bond pairs, 0 lone pairs leads to trigonal bipyramidal geometry (VSEPR theory)."},
  {id:18,sub:"phys",ch:"Oscillations",text:"Time period of a simple pendulum of length L is:",opts:["2 pi sqrt(L/g)","2 pi sqrt(g/L)","pi sqrt(L/g)","2 sqrt(L/g)"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"T = 2 pi sqrt(L/g). Period depends on L and g, independent of mass and amplitude for small angles."},
  {id:19,sub:"bio",ch:"Ecosystem",text:"The 10% energy law in ecology was given by:",opts:["Lindeman","Odum","Tansley","Elton"],correct:0,diff:"easy",exam:"NEET",year:2021,exp:"Raymond Lindeman (1942) proposed the 10% Law - only about 10% of energy transfers between trophic levels."},
  {id:20,sub:"chem",ch:"Equilibrium",text:"For an endothermic reaction, increasing temperature:",opts:["Shifts equilibrium left","Shifts equilibrium right","Has no effect","Decreases equilibrium constant"],correct:1,diff:"med",exam:"NEET",year:2020,exp:"Le Chatelier: for endothermic reactions (heat as reactant), increasing T shifts equilibrium to products."},
  {id:21,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"Oxygen evolved during photosynthesis comes from:",opts:["CO2","Water","Glucose","Both CO2 and Water"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Water splitting (photolysis) at PS-II releases O2. Proved by heavy oxygen isotope experiments."},
  {id:22,sub:"bio",ch:"Respiration in Plants",text:"Net gain of ATP in glycolysis is:",opts:["2 ATP","4 ATP","8 ATP","38 ATP"],correct:0,diff:"easy",exam:"NEET",year:2021,exp:"Glycolysis uses 2 ATP and produces 4 ATP. Net gain is 2 ATP per glucose."},
  {id:23,sub:"bio",ch:"Digestion and Absorption",text:"Digestion of starch begins in:",opts:["Stomach","Small intestine","Mouth","Large intestine"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"Salivary amylase in mouth begins starch digestion."},
  {id:24,sub:"bio",ch:"Principles of Inheritance",text:"Genotypic ratio in F2 of monohybrid cross is:",opts:["3:1","1:2:1","9:3:3:1","1:1"],correct:1,diff:"med",exam:"NEET",year:2023,exp:"F2 genotypic ratio is 1 AA : 2 Aa : 1 aa. Phenotypic ratio is 3:1."},
  {id:25,sub:"bio",ch:"Human Reproduction",text:"Hormone that triggers ovulation is:",opts:["FSH","LH","Estrogen","Progesterone"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"LH surge triggers ovulation on day 14 of menstrual cycle."},
  {id:26,sub:"bio",ch:"Biotechnology: Principles",text:"Enzyme used to join DNA fragments is:",opts:["Restriction endonuclease","DNA Ligase","DNA Polymerase","Helicase"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"DNA Ligase joins sticky ends of DNA fragments. Restriction enzymes cut DNA."},
  {id:27,sub:"bio",ch:"Evolution",text:"Analogous organs have:",opts:["Same origin, different function","Different origin, same function","Same origin, same function","Different origin, different function"],correct:1,diff:"hard",exam:"NEET",year:2022,exp:"Analogous organs: different origin, similar function (convergent evolution). E.g. wings of bat and butterfly."},
  {id:28,sub:"chem",ch:"Chemical Bonding",text:"Hybridisation of carbon in benzene is:",opts:["sp3","sp2","sp","sp3d"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"In benzene each carbon is sp2 hybridised. The unhybridised p orbital forms the pi delocalized system."},
  {id:29,sub:"chem",ch:"d and f Block Elements",text:"Transition metal with highest melting point:",opts:["Iron","Copper","Tungsten","Chromium"],correct:2,diff:"med",exam:"NEET",year:2023,exp:"Tungsten has highest melting point around 3422C due to maximum unpaired d-electrons."},
  {id:30,sub:"chem",ch:"Polymers",text:"Nylon-6,6 is an example of:",opts:["Addition polymer","Condensation polymer","Natural polymer","Biopolymer"],correct:1,diff:"easy",exam:"MHT",year:2023,exp:"Nylon-6,6 is condensation polymer from adipic acid plus hexamethylenediamine with water elimination."},
  {id:31,sub:"phys",ch:"Gravitation",text:"Escape velocity from Earth surface is approximately:",opts:["7.9 km/s","11.2 km/s","8.0 km/s","16.0 km/s"],correct:1,diff:"med",exam:"NEET",year:2020,exp:"ve = sqrt(2gR) = 11.2 km/s. Minimum speed to escape Earth gravity."},
  {id:32,sub:"phys",ch:"Ray Optics",text:"Concave mirror with radius 20 cm has focal length:",opts:["20 cm","10 cm","40 cm","5 cm"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"f = R/2 = 20/2 = 10 cm. Focal length is half the radius of curvature."},
  {id:33,sub:"phys",ch:"Semiconductor Electronics",text:"In p-type semiconductor, majority carriers are:",opts:["Electrons","Holes","Both equally","Protons"],correct:1,diff:"easy",exam:"MHT",year:2022,exp:"p-type doped with trivalent impurity (acceptor). Majority carriers are holes."},
  {id:34,sub:"phys",ch:"Nuclei",text:"Half-life is 20 days. Fraction remaining after 60 days:",opts:["1/2","1/4","1/8","1/16"],correct:2,diff:"hard",exam:"NEET",year:2023,exp:"60 days equals 3 half-lives. Remaining = (1/2) cubed = 1/8."},
  {id:35,sub:"phys",ch:"Alternating Current",text:"At resonance in series LCR circuit, impedance is:",opts:["Zero","R only","Maximum","Infinity"],correct:1,diff:"hard",exam:"NEET",year:2023,exp:"At resonance XL = XC so they cancel. Z = R only. Current is maximum."},
  {id:36,sub:"bio",ch:"Plant Growth and Development",text:"The plant hormone responsible for apical dominance is:",opts:["Auxin","Cytokinin","Gibberellin","Ethylene"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"Auxin produced at shoot apex suppresses growth of lateral buds, causing apical dominance."},
  {id:37,sub:"chem",ch:"Organic Chemistry: Basic Principles",text:"Inductive effect is:",opts:["Permanent and operates through pi bonds","Permanent and operates through sigma bonds","Temporary effect","Resonance effect"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Inductive effect is a permanent electron displacement through sigma bonds due to electronegativity difference."},
  {id:38,sub:"phys",ch:"Units and Measurements",text:"Which of these is a dimensionless quantity?",opts:["Velocity","Strain","Force","Pressure"],correct:1,diff:"easy",exam:"MHT",year:2021,exp:"Strain = change in length / original length. Both have same dimension, so strain is dimensionless."},
  {id:39,sub:"bio",ch:"Body Fluids and Circulation",text:"Universal blood donor has blood group:",opts:["A","B","AB","O"],correct:3,diff:"easy",exam:"NEET",year:2020,exp:"O group has no A or B antigens on RBC surface, so it can be donated to any blood group without reaction."},
  {id:40,sub:"chem",ch:"Hydrocarbons",text:"Markovnikov rule is applied to:",opts:["Symmetrical alkenes with HX","Unsymmetrical alkenes with HX","Alkynes only","Alkanes only"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Markovnikov rule: H adds to carbon with more hydrogens already, applies to unsymmetrical alkenes with HX addition."},
]

const FLASHCARDS = [
  {id:1,sub:"bio",front:"Powerhouse of the cell?",back:"Mitochondria - produces ATP via oxidative phosphorylation. Has own circular DNA and 70S ribosomes. Site of Krebs cycle and electron transport chain."},
  {id:2,sub:"chem",front:"Define Activation Energy",back:"Minimum energy reactants must possess to form activated complex and convert to products. Catalysts lower activation energy without being consumed. Unit: kJ/mol."},
  {id:3,sub:"phys",front:"Newton Second Law of Motion",back:"F = dp/dt (rate of change of momentum). For constant mass: F = ma. 1 Newton = 1 kg times m per s squared. Direction of F equals direction of acceleration."},
  {id:4,sub:"bio",front:"Central Dogma of Molecular Biology",back:"DNA to RNA to Protein. Transcription (DNA to mRNA) in nucleus. Translation (mRNA to Protein) on ribosomes. Reverse transcription occurs in retroviruses. Proposed by Francis Crick, 1958."},
  {id:5,sub:"chem",front:"Le Chatelier Principle",back:"When a system at equilibrium is disturbed (change in T, P, or concentration), it shifts to oppose the change and establish a new equilibrium."},
  {id:6,sub:"phys",front:"de Broglie Wavelength",back:"lambda = h/p = h/mv. All matter exhibits wave nature. For electron through V volts: lambda = 12.27/sqrt(V) Angstroms. Higher momentum means shorter wavelength."},
  {id:7,sub:"bio",front:"Mitosis vs Meiosis Key Difference",back:"Mitosis: somatic cells, 1 division, 2 diploid daughter cells, NO crossing over. Meiosis: germ cells, 2 divisions, 4 haploid gametes, crossing over in Prophase I, causes genetic variation."},
  {id:8,sub:"chem",front:"Raoult Law",back:"Partial vapour pressure of solvent equals mole fraction times pure vapour pressure. Valid for ideal solutions. Used to explain boiling point elevation and freezing point depression."},
  {id:9,sub:"phys",front:"Fleming Left-Hand Rule",back:"Forefinger = B (magnetic field direction), Middle finger = I (current direction), Thumb = F (force/motion direction). Used for electric motors."},
  {id:10,sub:"bio",front:"PCR - Polymerase Chain Reaction",back:"Amplifies specific DNA sequences in vitro. Steps: Denaturation (94C) then Annealing (50-65C) then Extension (72C). Uses thermostable Taq polymerase. Invented by Kary Mullis, 1983."},
  {id:11,sub:"chem",front:"Nernst Equation",back:"E = E0 - (RT/nF)ln Q. At 298K: E = E0 - (0.0592/n)log Q. Gives EMF at non-standard conditions. At equilibrium, E = 0."},
  {id:12,sub:"phys",front:"Snell Law of Refraction",back:"n1 sin(theta1) = n2 sin(theta2). When light moves from rarer to denser medium, it bends toward the normal. Critical angle relates to total internal reflection."},
  {id:13,sub:"bio",front:"What are Restriction Enzymes?",back:"Molecular scissors that recognize specific palindromic DNA sequences and cut both strands. Key tools in recombinant DNA technology. EcoRI cuts at GAATTC site."},
  {id:14,sub:"chem",front:"First Law of Thermodynamics",back:"Change in internal energy equals heat absorbed plus work done on system. Energy cannot be created or destroyed, only converted."},
  {id:15,sub:"phys",front:"Bohr Model Key Postulates",back:"1) Electrons orbit in fixed stationary shells with no energy loss. 2) Electrons jump between shells by absorbing or emitting photons. 3) Angular momentum is quantized as nh/2pi."},
]

const MOCK_TESTS = [
  {id:1,title:"NEET 2024 Full Paper",type:"NEET",qs:200,dur:200,year:2024,diff:"hard",done:false},
  {id:2,title:"NEET 2023 Full Paper",type:"NEET",qs:200,dur:200,year:2023,diff:"hard",done:false,score:0},
  {id:3,title:"NEET 2022 Full Paper",type:"NEET",qs:200,dur:200,year:2022,diff:"hard",done:false,score:0},
  {id:4,title:"NEET 2021 Full Paper",type:"NEET",qs:200,dur:200,year:2021,diff:"hard",done:false},
  {id:5,title:"NEET 2020 Full Paper",type:"NEET",qs:180,dur:180,year:2020,diff:"hard",done:false},
  {id:6,title:"MHT-CET PCB 2024",type:"CET-PCB",qs:150,dur:180,year:2024,diff:"med",done:false},
  {id:7,title:"MHT-CET PCB 2023",type:"CET-PCB",qs:150,dur:180,year:2023,diff:"med",done:false},
  {id:8,title:"MHT-CET PCB 2022",type:"CET-PCB",qs:150,dur:180,year:2022,diff:"med",done:false},
  {id:9,title:"MHT-CET PCM 2024",type:"CET-PCM",qs:150,dur:180,year:2024,diff:"med",done:false},
  {id:10,title:"MHT-CET PCM 2023",type:"CET-PCM",qs:150,dur:180,year:2023,diff:"med",done:false},
  {id:11,title:"NEET Biology Sectional",type:"NEET",qs:90,dur:60,year:null,diff:"med",done:false},
  {id:12,title:"NEET Chemistry Sectional",type:"NEET",qs:45,dur:45,year:null,diff:"med",done:false},
  {id:13,title:"NEET Physics Sectional",type:"NEET",qs:45,dur:45,year:null,diff:"med",done:false},
  {id:14,title:"Full NEET Mock #1",type:"NEET",qs:200,dur:200,year:null,diff:"hard",done:false},
]

const REVISION_DATA = [
  {id:1,topic:"Electrochemistry",sub:"chem",acc:0,days:0,urgency:"high",due:"Today"},
  {id:2,topic:"Wave Optics",sub:"phys",acc:0,days:0,urgency:"high",due:"Today"},
  {id:3,topic:"Genetics and Mendelian Laws",sub:"bio",acc:0,days:0,urgency:"high",due:"Today"},
]

const CHAT_STARTERS = [
  "Explain mitosis vs meiosis","How do I balance equations?",
  "I am stressed about NEET","Quiz me on Laws of Motion",
  "Give me a 7-day study plan","Explain Electrochemistry basics",
  "Which chapters have most NEET marks?","How to score 550+ in NEET?",
]


// ── ICONS (emoji-based, no external deps) ──────────────────────────

// ── SHARED COMPONENTS ──────────────────────────────────────────────
const Ring = ({value,size=76,stroke=7,color='var(--blue)'}) => {
  const r=(size-stroke)/2,c=2*Math.PI*r,d=(value/100)*c
  return (
    <div className="ring-wrap" style={{width:size,height:size}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg3)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={d+" "+(c-d)} strokeLinecap="round"
          style={{transition:'stroke-dasharray .7s ease'}}/>
      </svg>
      <div className="ring-center">
        <span style={{fontFamily:'Space Grotesk,sans-serif',fontSize:size/3.5,fontWeight:700,color,lineHeight:1}}>{value}%</span>
        <span style={{fontSize:9,color:'var(--text3)'}}>score</span>
      </div>
    </div>
  )
}

const BarChart = ({data,h=110}) => {
  const mx = Math.max(...data.map(d=>d.v),1)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:8,height:h,padding:'0 2px'}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
          <span style={{fontSize:10,color:'var(--text3)',fontFamily:'JetBrains Mono,monospace'}}>{d.v}%</span>
          <div style={{width:'100%',height:Math.max(2,(d.v/mx)*(h-22)),background:d.c,borderRadius:'4px 4px 0 0',transition:'height .5s',opacity:.8}}/>
          <span style={{fontSize:10,color:'var(--text3)',textAlign:'center',lineHeight:1.2}}>{d.l}</span>
        </div>
      ))}
    </div>
  )
}

function useTimer(init, onExp) {
  const [t,setT] = useState(init)
  const [run,setRun] = useState(false)
  const ref = useRef()
  useEffect(()=>{
    if(run&&t>0){
      ref.current = setInterval(()=>setT(v=>{
        if(v<=1){clearInterval(ref.current);setRun(false);onExp?.();return 0}
        return v-1
      }),1000)
    }
    return()=>clearInterval(ref.current)
  },[run])
  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")
  return{t,run,fmt,start:()=>setRun(true),stop:()=>{setRun(false);clearInterval(ref.current)},reset:()=>{clearInterval(ref.current);setRun(false);setT(init)}}
}

const Toggle = ({on,onClick}) => (
  <button className={"toggle"+(on?" on":"")} onClick={onClick}/>
)

// ── LOGIN SCREEN (Pallavi + Admin) ─────────────────────────────────
const LoginScreen = ({onLogin}) => {
  const [mode,setMode] = useState('select')
  const [pwd,setPwd] = useState('')
  const [err,setErr] = useState('')
  const ADMIN_PWD = 'admin123'
  const PALLAVI_PWD = 'pallavi2025'

  const handleLogin = (who) => {
    setErr('')
    if(who==='pallavi' && pwd===PALLAVI_PWD){ onLogin('pallavi'); return }
    if(who==='admin' && pwd===ADMIN_PWD){ onLogin('admin'); return }
    setErr('Incorrect password. Try again.')
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'Inter,system-ui,sans-serif'}}>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:60,height:60,borderRadius:16,background:'linear-gradient(135deg,#58a6ff,#bc8cff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:900,color:'#fff',margin:'0 auto 14px',fontFamily:'Space Grotesk,sans-serif'}}>N</div>
          <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,color:'var(--text)',marginBottom:4}}>NEET Prep AI</div>
          <div style={{fontSize:13,color:'var(--text3)'}}>NEET 2025 and MHT-CET Preparation Platform</div>
        </div>

        {mode==='select' && (
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:28}}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16,marginBottom:6,textAlign:'center'}}>Who is studying today?</div>
            <div style={{fontSize:13,color:'var(--text3)',textAlign:'center',marginBottom:24}}>Choose your profile to continue</div>
            <button onClick={()=>{setMode('pallavi');setPwd('');setErr('')}}
              style={{width:'100%',padding:'16px 20px',borderRadius:12,border:'1.5px solid var(--border)',background:'var(--bg3)',cursor:'pointer',marginBottom:12,display:'flex',alignItems:'center',gap:14,transition:'all .15s',color:'var(--text)'}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#58a6ff,#bc8cff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:'#fff',flexShrink:0}}>P</div>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:600,fontSize:15,fontFamily:'Space Grotesk,sans-serif'}}>Pallavi</div>
                <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>Student - NEET 2025 and MHT-CET</div>
              </div>
              <span style={{marginLeft:'auto',color:'var(--text3)',fontSize:18}}>{'→'}</span>
            </button>
            <button onClick={()=>{setMode('admin');setPwd('');setErr('')}}
              style={{width:'100%',padding:'16px 20px',borderRadius:12,border:'1.5px solid var(--border)',background:'var(--bg3)',cursor:'pointer',display:'flex',alignItems:'center',gap:14,transition:'all .15s',color:'var(--text)'}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#f0883e,#d29922)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:'#fff',flexShrink:0}}>A</div>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:600,fontSize:15,fontFamily:'Space Grotesk,sans-serif'}}>Admin</div>
                <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>Monitor Pallavi's progress and activity</div>
              </div>
              <span style={{marginLeft:'auto',color:'var(--text3)',fontSize:18}}>{'→'}</span>
            </button>
          </div>
        )}

        {(mode==='pallavi'||mode==='admin') && (
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:28}}>
            <button onClick={()=>setMode('select')} style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:13,marginBottom:16,display:'flex',alignItems:'center',gap:5}}>{'←'} Back</button>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:mode==='pallavi'?'linear-gradient(135deg,#58a6ff,#bc8cff)':'linear-gradient(135deg,#f0883e,#d29922)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:'#fff',flexShrink:0}}>{mode==='pallavi'?'P':'A'}</div>
              <div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16}}>{mode==='pallavi'?'Pallavi':'Admin'}</div>
                <div style={{fontSize:12,color:'var(--text3)'}}>{mode==='pallavi'?'Enter your password to study':'Enter admin password'}</div>
              </div>
            </div>
            {err&&<div style={{background:'rgba(248,81,73,.1)',border:'1px solid rgba(248,81,73,.25)',borderRadius:8,padding:'9px 12px',fontSize:13,color:'var(--red)',marginBottom:14}}>{err}</div>}
            <input type="password" value={pwd} onChange={e=>{setPwd(e.target.value);setErr('')}}
              onKeyDown={e=>e.key==='Enter'&&handleLogin(mode)}
              placeholder="Enter password"
              style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:'11px 14px',color:'var(--text)',fontSize:14,outline:'none',fontFamily:'inherit',marginBottom:14}}/>
            <button className="btn btn-primary btn-lg" style={{width:'100%'}} onClick={()=>handleLogin(mode)} disabled={!pwd}>
              {mode==='pallavi'?'Start Studying →':'View Dashboard →'}
            </button>
            <div style={{textAlign:'center',marginTop:12,fontSize:11,color:'var(--text3)'}}>
              {mode==='pallavi'?'Password hint: pallavi2025':'Password hint: admin123'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── ONBOARDING (one-time for Pallavi) ──────────────────────────────
const Onboarding = ({onDone}) => {
  const [step,setStep] = useState(0)
  const [d,setD] = useState({name:'Pallavi',class:'11',stream:'',targets:[],goal:180})
  const set=(k,v)=>setD(p=>({...p,[k]:v}))
  const tog=(t)=>setD(p=>({...p,targets:p.targets.includes(t)?p.targets.filter(x=>x!==t):[...p.targets,t]}))
  const steps=[
    {title:'Welcome, Pallavi! 🎓',sub:'Let us set up your personalised study plan',
     ok:d.class.length>0,
     body:<div>
       <div style={{textAlign:'center',marginBottom:24}}>
         <div style={{width:56,height:56,borderRadius:16,background:'linear-gradient(135deg,#58a6ff,#bc8cff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:900,color:'#fff',margin:'0 auto 10px',fontFamily:'Space Grotesk,sans-serif'}}>P</div>
         <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.6}}>Complete syllabus coverage, AI mentoring, adaptive quizzes, and performance analytics - built for your NEET and MHT-CET journey.</p>
       </div>
       <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>Current Class</label>
       <div style={{display:'flex',gap:8}}>
         {['11','12'].map(c=>(
           <button key={c} className={"opt-card"+(d.class===c?" sel":"")} style={{flex:1}} onClick={()=>set('class',c)}>
             <span style={{fontSize:20}}>{c==='11'?'📗':'📘'}</span>
             <div><div style={{fontWeight:600,fontSize:14}}>Class {c}</div></div>
             {d.class===c&&<span style={{marginLeft:'auto',color:'var(--blue)'}}>{'✓'}</span>}
           </button>
         ))}
       </div>
     </div>},
    {title:'Which exams are you targeting?',sub:'Select all that apply',
     ok:d.targets.length>0,
     body:<div>
       {[['NEET','🏥','National Medical Entrance Test - 720 marks','neet'],
         ['MHT-CET PCB','🔬','Maharashtra CET Biology stream - 200 marks','cet-pcb'],
         ['MHT-CET PCM','📐','Maharashtra CET Maths stream - 200 marks','cet-pcm']].map(([name,ic,desc,id])=>(
         <button key={id} className={"opt-card"+(d.targets.includes(id)?" sel":"")} onClick={()=>tog(id)}>
           <span style={{fontSize:24}}>{ic}</span>
           <div style={{flex:1}}>
             <div style={{fontWeight:600,fontSize:14}}>{name}</div>
             <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{desc}</div>
           </div>
           {d.targets.includes(id)&&<span style={{color:'var(--blue)',fontSize:16}}>{'✓'}</span>}
         </button>
       ))}
     </div>},
    {title:'Your Subject Stream',sub:'Determines which syllabus to load',
     ok:d.stream.length>0,
     body:<div>
       {[['PCB','🧬','Physics, Chemistry, Biology','For NEET and CET Biology'],
         ['PCM','📐','Physics, Chemistry, Maths','For CET Engineering'],
         ['PCMB','🎓','All four subjects','Preparing for both']].map(([s,ic,subs,desc])=>(
         <button key={s} className={"opt-card"+(d.stream===s?" sel":"")} onClick={()=>set('stream',s)}>
           <span style={{fontSize:28}}>{ic}</span>
           <div style={{flex:1}}>
             <div style={{fontWeight:600,fontSize:14}}>{s} Stream</div>
             <div style={{fontSize:11,color:'var(--text3)',marginTop:1}}>{subs}</div>
             <div style={{fontSize:11,color:'var(--blue)',marginTop:1}}>{desc}</div>
           </div>
           {d.stream===s&&<span style={{color:'var(--blue)',fontSize:16}}>{'✓'}</span>}
         </button>
       ))}
     </div>},
    {title:'Set your daily study goal',sub:'We will build your schedule around this',
     ok:d.goal>0,
     body:<div>
       {[[60,'1 hour','Minimum'],[120,'2 hours','Recommended for beginners'],[180,'3 hours','Ideal pace'],[240,'4+ hours','Intensive prep']].map(([mins,label,desc])=>(
         <button key={mins} className={"opt-card"+(d.goal===mins?" sel":"")} onClick={()=>set('goal',mins)}>
           <span style={{fontSize:22}}>{'⏱️'}</span>
           <div style={{flex:1}}>
             <div style={{fontWeight:600,fontSize:14}}>{label} / day</div>
             <div style={{fontSize:11,color:'var(--text3)',marginTop:1}}>{desc}</div>
           </div>
           {d.goal===mins&&<span style={{color:'var(--blue)',fontSize:16}}>{'✓'}</span>}
         </button>
       ))}
     </div>}
  ]
  const s=steps[step]
  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:20,padding:36,maxWidth:480,width:'100%'}}>
        <div className="step-dots">
          {steps.map((_,i)=><div key={i} className={"step-dot"+(i<step?" done":i===step?" active":"")}/>)}
        </div>
        <div style={{marginBottom:4,fontFamily:'Space Grotesk,sans-serif',fontSize:19,fontWeight:700}}>{s.title}</div>
        <div style={{fontSize:13,color:'var(--text2)',marginBottom:22}}>{s.sub}</div>
        <div style={{marginBottom:24}}>{s.body}</div>
        <div style={{display:'flex',gap:8}}>
          {step>0&&<button className="btn btn-secondary btn-lg" style={{flex:1}} onClick={()=>setStep(p=>p-1)}>{'←'} Back</button>}
          <button className="btn btn-primary btn-lg" style={{flex:2}} onClick={()=>step<steps.length-1?setStep(p=>p+1):onDone(d)} disabled={!s.ok}>
            {step<steps.length-1?'Continue →':'Start Learning 🚀'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── NOTIFICATION PANEL (working clear all + dismiss) ──────────────
const NotifPanel = ({onClose}) => {
  const [items,setItems] = useState([
    {ic:'⏰',col:'rgba(240,136,62,.12)',title:'Daily Reminder',body:'Time for your study session today!',time:'2 min ago',unread:true},
    {ic:'🎯',col:'rgba(88,166,255,.12)',title:'Welcome to NEET Prep AI',body:'Start your first quiz to see your progress here.',time:'Just now',unread:true},
  ])
  const clearAll = () => { setItems([]); setTimeout(onClose, 300) }
  const dismiss = (i) => setItems(it=>it.filter((_,idx)=>idx!==i))
  const markRead = (i) => setItems(it=>it.map((n,idx)=>idx===i?{...n,unread:false}:n))
  return (
    <div className="notif-panel fade-in">
      <div style={{padding:'12px 14px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14}}>
          Notifications {items.filter(n=>n.unread).length>0&&<span style={{background:'var(--red)',color:'#fff',fontSize:10,padding:'1px 6px',borderRadius:10,marginLeft:6}}>{items.filter(n=>n.unread).length}</span>}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={clearAll}>Clear all</button>
      </div>
      {items.length===0&&(
        <div style={{padding:'32px 16px',textAlign:'center',color:'var(--text3)',fontSize:13}}>
          <div style={{fontSize:28,marginBottom:8}}>{'✅'}</div>
          <div>All caught up!</div>
        </div>
      )}
      {items.map((n,i)=>(
        <div key={i} className="notif-item" style={{background:n.unread?'rgba(88,166,255,.03)':'transparent'}} onClick={()=>markRead(i)}>
          <div style={{width:32,height:32,borderRadius:8,background:n.col,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>{n.ic}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
              <span style={{fontWeight:n.unread?600:400,fontSize:13}}>{n.title}</span>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                {n.unread&&<span style={{width:6,height:6,borderRadius:'50%',background:'var(--blue)',flexShrink:0}}/>}
                <span style={{fontSize:16,color:'var(--text3)',cursor:'pointer',lineHeight:1}} onClick={e=>{e.stopPropagation();dismiss(i)}} title="Dismiss">{'×'}</span>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.4}}>{n.body}</div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}


// ── ADMIN DASHBOARD (monitors Pallavi's real activity) ─────────────
const AdminDashboard = ({onLogout, activityLog, totalMinutes, totalQuestions}) => {
  const [tab,setTab] = useState('overview')
  const todayLog = activityLog.filter(a=>a.date==='Today')

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',fontFamily:'Inter,system-ui,sans-serif'}}>
      <div style={{background:'var(--card)',borderBottom:'1px solid var(--border)',padding:'0 24px',height:54,display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:100}}>
        <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#f0883e,#d29922)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'#fff',flexShrink:0}}>A</div>
        <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,flex:1}}>Admin Dashboard</div>
        <div style={{fontSize:12,color:'var(--text3)'}}>Monitoring: <strong style={{color:'var(--blue)'}}>Pallavi</strong></div>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>{'←'} Logout</button>
      </div>

      <div style={{padding:24,maxWidth:1100}}>
        <div style={{marginBottom:20}}>
          <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:20,fontWeight:700,marginBottom:4}}>{'📊'} Pallavi's Progress Overview</h1>
          <p style={{fontSize:13,color:'var(--text2)'}}>Real-time activity monitoring based on actual app usage</p>
        </div>

        <div className="grid-4" style={{marginBottom:20}}>
          {[[totalMinutes+"m",'Total Study Time','var(--blue)','This session'],
            [totalQuestions+"",'Questions Solved','var(--purple)','All time'],
            [activityLog.length+"",'Activities Logged','var(--green)','Since signup'],
            ['0','Day Streak','var(--orange)','Just started']].map(([v,l,c,sub])=>(
            <div key={l} className="card" style={{borderTop:"2px solid "+c}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:24,fontWeight:700,color:c,marginBottom:2}}>{v}</div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{l}</div>
              <div style={{fontSize:11,color:'var(--text3)'}}>{sub}</div>
            </div>
          ))}
        </div>

        <div className="tabs">
          {[['overview','Overview'],['activity','Activity Log']].map(([v,l])=>(
            <div key={v} className={"tab"+(tab===v?" active":"")} onClick={()=>setTab(v)}>{l}</div>
          ))}
        </div>

        {tab==='overview'&&(
          <div className="fade-in">
            <div className="card">
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>{'📅'} Today's Activity</div>
              {todayLog.length===0&&<div style={{textAlign:'center',padding:30,color:'var(--text3)',fontSize:13}}>No activity recorded today yet. Pallavi hasn't started studying.</div>}
              {todayLog.map((a,i)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'9px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:30,height:30,borderRadius:8,background:a.color+"18",display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>{a.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500}}>{a.action}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{a.detail}</div>
                  </div>
                  <div style={{fontSize:11,color:'var(--text3)',flexShrink:0}}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='activity'&&(
          <div className="fade-in card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>{'📋'} Full Activity Log</div>
            {activityLog.length===0&&<div style={{textAlign:'center',padding:30,color:'var(--text3)',fontSize:13}}>No activity yet. Activity will appear here as Pallavi uses the app.</div>}
            {activityLog.map((a,i)=>(
              <div key={i} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:34,height:34,borderRadius:8,background:a.color+"15",border:"1px solid "+a.color+"30",display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500}}>{a.action}</div>
                  <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{a.detail}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontSize:11,color:'var(--text3)'}}>{a.date}</div>
                  <div style={{fontSize:11,color:'var(--text3)'}}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


// ── DASHBOARD (starts from scratch for Pallavi) ────────────────────
const Dashboard = ({setPage,profile,logActivity}) => {
  const [now,setNow] = useState(new Date())
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[])
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const dateStr = days[now.getDay()]+", "+now.getDate()+" "+months[now.getMonth()]+" "+now.getFullYear()
  const neetDate = new Date('2025-08-03')
  const dLeft = Math.max(0,Math.ceil((neetDate-now)/(1000*60*60*24)))

  const plan = [
    {done:false,t:'Start your first chapter',time:'Today',sub:'bio'},
    {done:false,t:'Take a diagnostic quiz',time:'Today',sub:null},
    {done:false,t:'Explore 3D diagrams',time:'Today',sub:null},
  ]

  return (
    <div className="page fade-in">
      <div style={{background:'linear-gradient(135deg,rgba(88,166,255,.08),rgba(188,140,255,.05))',border:'1px solid rgba(88,166,255,.15)',borderRadius:16,padding:'20px 24px',marginBottom:20,display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:14}}>
        <div>
          <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.07em',marginBottom:5}}>{dateStr} {'·'} {dLeft} days to NEET 2025</div>
          <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:24,fontWeight:700,marginBottom:6}}>Welcome, {profile?.name||'Pallavi'}! {'👋'}</h1>
          <p style={{color:'var(--text2)',fontSize:13}}>You are just getting started. Let's build your <span style={{color:'var(--orange)',fontWeight:600}}>first study streak</span> today!</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={()=>{logActivity('Started Quiz Engine','Beginning practice');setPage('quiz')}}>{'⚡'} Take First Quiz</button>
          <button className="btn btn-secondary" onClick={()=>{logActivity('Opened AI Mentor','Asked for guidance');setPage('chat')}}>{'🤖'} Ask AI Mentor</button>
          <button className="btn btn-secondary" onClick={()=>setPage('syllabus')}>{'📚'} Browse Syllabus</button>
        </div>
      </div>

      <div className="grid-4" style={{marginBottom:20}}>
        {[['0','Questions Solved','var(--blue)'],['0','Mock Tests Done','var(--purple)'],['0%','Avg Accuracy','var(--green)'],['0h','Study Hours','var(--orange)']].map(([v,l,c])=>(
          <div key={l} className="card" style={{borderTop:"2px solid "+c,paddingTop:16}}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:26,fontWeight:700,color:c,lineHeight:1,marginBottom:4}}>{v}</div>
            <div style={{fontSize:12,color:'var(--text2)'}}>{l}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:20}}>
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15}}>{'📅'} Getting Started</div>
              <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>0 of {plan.length} tasks done</div>
            </div>
          </div>
          <div className="prog" style={{height:4,marginBottom:16}}><div className="prog-fill" style={{width:'0%',background:'var(--green)'}}/></div>
          {plan.map((p,i)=>(
            <div key={i} className="task-item">
              <div className="task-check" style={{minWidth:17}}/>
              <span style={{flex:1,fontSize:13,fontWeight:500}}>{p.t}</span>
              <span style={{fontSize:11,color:'var(--text3)',flexShrink:0,marginLeft:8}}>{p.time}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,marginBottom:14}}>{'🎯'} Your Journey Starts Here</div>
          <div style={{textAlign:'center',padding:'24px 12px',color:'var(--text3)'}}>
            <div style={{fontSize:36,marginBottom:10}}>{'🌱'}</div>
            <div style={{fontSize:13,lineHeight:1.6}}>Complete quizzes and mock tests to see your subject-wise accuracy chart here.</div>
          </div>
        </div>
      </div>

      <div className="card card-blue">
        <div style={{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'}}>
          <span style={{fontSize:28}}>{'🤖'}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:4}}>New here? Let your AI Mentor guide you!</div>
            <div style={{fontSize:12,color:'var(--text2)'}}>Ask for a study plan, get concept explanations, or just chat about your NEET journey.</div>
          </div>
          <button className="btn btn-primary" onClick={()=>setPage('chat')}>Chat Now {'→'}</button>
        </div>
      </div>
    </div>
  )
}


// ── SYLLABUS PAGE (Practice -> Concept study -> Quiz that chapter) ──
const SyllabusPage = ({setPage, setChapterContext, logActivity}) => {
  const [sub,setSub] = useState('biology')
  const [cls,setCls] = useState('11')
  const [open,setOpen] = useState(null)
  const [bookmarks,setBookmarks] = useState([])
  const [chapterQuiz,setChapterQuiz] = useState(null)
  const s = SYLLABUS[sub]
  const chs = s[parseInt(cls)]
  const done = 0 // Pallavi starts from scratch
  const toggleBookmark = (ch) => setBookmarks(b=>b.includes(ch)?b.filter(x=>x!==ch):[...b,ch])
  const subColor = {biology:'var(--bio)',chemistry:'var(--chem)',physics:'var(--phys)',maths:'var(--math)'}[sub]

  const startChapterQuiz = (ch) => {
    setChapterContext({ch, sub: sub==='biology'?'bio':sub==='chemistry'?'chem':sub==='physics'?'phys':'math'})
    logActivity("Started Quiz: "+ch,"From Syllabus chapter")
    setPage('quiz')
  }

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'📚'} Syllabus</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>NEET (NCERT Class 11-12) + MHT-CET (Maharashtra Board PCB/PCM)</p>
      </div>

      <div className="tabs" style={{marginBottom:0}}>
        {Object.entries(SYLLABUS).map(([k,v])=>(
          <div key={k} className={"tab"+(sub===k?" active":"")} style={sub===k?{color:subColor,borderBottomColor:subColor}:{}} onClick={()=>{setSub(k);setOpen(null)}}>
            {v.icon} {v.label}
          </div>
        ))}
      </div>

      <div className="grid-2" style={{alignItems:'start',marginTop:20}}>
        <div>
          <div style={{display:'flex',gap:8,marginBottom:14}}>
            <div style={{display:'flex',gap:4,background:'var(--bg3)',borderRadius:'var(--r2)',padding:3,flex:1}}>
              <div onClick={()=>setCls('11')} style={{flex:1,padding:'7px 12px',borderRadius:8,fontSize:13,fontWeight:500,cursor:'pointer',textAlign:'center',transition:'all .15s',color:cls==='11'?'var(--text)':'var(--text2)',background:cls==='11'?'var(--card)':'transparent',fontWeight:cls==='11'?600:500}}>Class 11</div>
              <div onClick={()=>setCls('12')} style={{flex:1,padding:'7px 12px',borderRadius:8,fontSize:13,fontWeight:500,cursor:'pointer',textAlign:'center',transition:'all .15s',color:cls==='12'?'var(--text)':'var(--text2)',background:cls==='12'?'var(--card)':'transparent',fontWeight:cls==='12'?600:500}}>Class 12</div>
            </div>
            <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'6px 12px',fontSize:12,color:'var(--text2)',display:'flex',alignItems:'center',gap:5}}>
              {done}/{chs.length} done
            </div>
          </div>

          {chs.map((ch,i)=>{
            const isOpen = open === i
            const note = CONCEPT_NOTES[ch]
            const isBookmarked = bookmarks.includes(ch)
            return (
              <div key={i}>
                <div className="chapter-row" style={{background:isOpen?'var(--bg3)':'transparent',borderColor:isOpen?'var(--border)':'transparent'}} onClick={()=>setOpen(isOpen?null:i)}>
                  <div style={{width:28,height:28,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>
                    <span style={{color:'var(--text3)'}}>{i+1}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:500,fontSize:13,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{ch}</div>
                    <div style={{fontSize:11,color:'var(--text3)',marginTop:1}}>Not started {'·'} {note?'Notes available':'NCERT chapter'}</div>
                  </div>
                  <div style={{display:'flex',gap:5,flexShrink:0}}>
                    <button className="btn btn-ghost btn-sm" style={{padding:'3px 7px',fontSize:14}} onClick={e=>{e.stopPropagation();toggleBookmark(ch)}} title={isBookmarked?'Remove bookmark':'Bookmark'}>
                      {isBookmarked?'🔖':'🏷️'}
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={e=>{e.stopPropagation();setChapterQuiz({ch,sub})}}>Study</button>
                  </div>
                </div>

                {isOpen && note && (
                  <div style={{margin:'0 0 8px 38px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'16px',fontSize:13}}>
                    <div style={{fontWeight:600,marginBottom:8,color:subColor,fontSize:14}}>{'📋'} {ch} - Concept Notes</div>
                    <p style={{color:'var(--text2)',marginBottom:12,lineHeight:1.7,fontSize:13}}>{note.summary}</p>
                    <div style={{marginBottom:12}}>
                      {note.points.map((pt,j)=>(
                        <div key={j} style={{display:'flex',gap:6,marginBottom:8,fontSize:12,color:'var(--text2)',alignItems:'flex-start',padding:'6px 10px',background:'var(--bg4)',borderRadius:6}}>
                          <span style={{color:subColor,flexShrink:0,marginTop:1}}>{'◆'}</span>
                          <span style={{flex:1,lineHeight:1.5}}>{pt}</span>
                          <button className="btn btn-ghost btn-sm" style={{padding:'2px 8px',fontSize:11,flexShrink:0}}
                            onClick={e=>{e.stopPropagation();startChapterQuiz(ch)}}>Quiz this</button>
                        </div>
                      ))}
                    </div>
                    {note.formula&&<div style={{background:'rgba(88,166,255,.08)',border:'1px solid rgba(88,166,255,.2)',borderRadius:6,padding:'10px 12px',fontFamily:'JetBrains Mono,monospace',fontSize:12,color:'var(--blue)',marginBottom:10}}>{'📐'} {note.formula}</div>}
                    <div style={{fontSize:11,color:'var(--text3)',marginBottom:12}}>{'📌'} PYQs: {note.pyqs.join(' · ')}</div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      <button className="btn btn-primary btn-sm" onClick={e=>{e.stopPropagation();startChapterQuiz(ch)}}>{'⚡'} Start Quiz on {ch}</button>
                      <button className="btn btn-secondary btn-sm" onClick={e=>{e.stopPropagation();setPage('notes')}}>{'📝'} Save Notes</button>
                    </div>
                  </div>
                )}
                {isOpen && !note && (
                  <div style={{margin:'0 0 8px 38px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'16px',fontSize:13}}>
                    <div style={{fontWeight:600,marginBottom:10,color:subColor,fontSize:14}}>{'📖'} {ch}</div>
                    {['Definition and scope of '+ch,'Key NCERT terminology and concepts','Important diagrams and structures','NEET/CET frequently tested points','Formulae, reactions and mnemonics'].map((t,j)=>(
                      <div key={j} style={{display:'flex',gap:6,marginBottom:6,fontSize:12,color:'var(--text2)',alignItems:'flex-start'}}>
                        <span style={{color:subColor,flexShrink:0,marginTop:2}}>{'◆'}</span>
                        <span style={{flex:1}}>{t}</span>
                      </div>
                    ))}
                    <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
                      <button className="btn btn-primary btn-sm" onClick={e=>{e.stopPropagation();startChapterQuiz(ch)}}>{'⚡'} Start Quiz on this Chapter</button>
                      <button className="btn btn-secondary btn-sm" onClick={e=>{e.stopPropagation();setPage('notes')}}>{'📝'} Add Notes</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div>
          <div className="card card-blue" style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15}}>{s.label}</div>
                <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>NEET + MHT-CET Coverage</div>
              </div>
              <Ring value={0} color={subColor} size={70} stroke={6}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[["Total Chapters",chs.length],["Completed",0],["Questions",(chs.length*12)+"+"],["PYQs",(chs.length*3)+"+"]].map(([l,v])=>(
                <div key={l} style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:'10px 12px'}}>
                  <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:18,fontWeight:700,color:subColor}}>{v}</div>
                  <div style={{fontSize:11,color:'var(--text3)',marginTop:1}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {bookmarks.length>0&&(
            <div className="card" style={{marginBottom:14}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:10}}>{'🔖'} Bookmarked ({bookmarks.length})</div>
              {bookmarks.slice(0,4).map(b=>(
                <div key={b} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
                  <span style={{color:'var(--text2)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b}</span>
                  <button className="btn btn-ghost btn-sm" style={{padding:'2px 8px',fontSize:11}} onClick={()=>startChapterQuiz(b)}>Quiz</button>
                </div>
              ))}
            </div>
          )}

          <div className="card" style={{background:'rgba(188,140,255,.04)',borderColor:'rgba(188,140,255,.2)'}}>
            <div style={{display:'flex',gap:10}}>
              <span style={{fontSize:22}}>{'🤖'}</span>
              <div>
                <div style={{fontWeight:600,fontSize:13,marginBottom:5}}>AI Mentor Tip</div>
                <div style={{color:'var(--text2)',fontSize:12,lineHeight:1.6}}>You are just starting out! Begin with Class 11 fundamentals before moving to Class 12 topics.</div>
                <button className="btn btn-secondary btn-sm" style={{marginTop:10,width:'100%'}} onClick={()=>setPage('chat')}>Ask AI Mentor {'→'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Study Modal - shows concepts THEN option to quiz, not direct redirect */}
      {chapterQuiz&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={()=>setChapterQuiz(null)}>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:28,maxWidth:520,width:'100%',maxHeight:'85vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:18,marginBottom:6}}>{'📖'} {chapterQuiz.ch}</div>
            <div style={{fontSize:13,color:'var(--text2)',marginBottom:16}}>Study key concepts first, then start a quiz on this exact chapter.</div>

            {CONCEPT_NOTES[chapterQuiz.ch] ? (
              <div style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:14,marginBottom:16}}>
                <p style={{color:'var(--text2)',marginBottom:10,lineHeight:1.6,fontSize:13}}>{CONCEPT_NOTES[chapterQuiz.ch].summary}</p>
                {CONCEPT_NOTES[chapterQuiz.ch].points.map((pt,j)=>(
                  <div key={j} style={{fontSize:12,color:'var(--text2)',marginBottom:6,display:'flex',gap:6}}><span style={{color:'var(--blue)'}}>{'◆'}</span>{pt}</div>
                ))}
              </div>
            ) : (
              <div style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:14,marginBottom:16,fontSize:12,color:'var(--text2)'}}>
                This chapter covers core NCERT concepts. Detailed notes coming soon - for now, jump straight into practice questions to test your understanding.
              </div>
            )}

            <button className="btn btn-primary btn-lg" style={{width:'100%',marginBottom:10}} onClick={()=>{startChapterQuiz(chapterQuiz.ch);setChapterQuiz(null)}}>{'⚡'} Start Quiz Now</button>
            <button className="btn btn-ghost" style={{width:'100%'}} onClick={()=>setChapterQuiz(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}


// ── QUIZ PAGE (fixed: 'med' filter properly matched, chapter context) ──
const QuizPage = ({chapterContext, clearChapterContext, logActivity, addXP}) => {
  const [phase,setPhase] = useState(chapterContext?'question':'setup')
  const [cfg,setCfg] = useState({sub:chapterContext?.sub||'all',diff:'all',count:10,mode:'practice'})
  const [qs,setQs] = useState([])
  const [cur,setCur] = useState(0)
  const [ans,setAns] = useState({})
  const [sel,setSel] = useState(null)
  const [locked,setLocked] = useState(false)
  const [aiFeedback,setAiFeedback] = useState('')
  const timer = useTimer(30,()=>{if(!locked)pick(-1)})

  // If launched from a chapter, auto-start filtered quiz
  useEffect(()=>{
    if(chapterContext){
      const pool = QUESTIONS.filter(q=>q.ch===chapterContext.ch)
      const finalPool = pool.length>0 ? pool : QUESTIONS.filter(q=>q.sub===chapterContext.sub)
      const sh = [...finalPool].sort(()=>Math.random()-.5).slice(0,Math.min(10,finalPool.length))
      if(sh.length>0){
        setQs(sh);setAns({});setCur(0);setSel(null);setLocked(false);setPhase('question')
      } else {
        setPhase('setup')
      }
      clearChapterContext()
    }
  },[])

  const start = () => {
    let pool = cfg.sub==='all'?QUESTIONS:QUESTIONS.filter(q=>q.sub===cfg.sub)
    if(cfg.diff!=='all') pool=pool.filter(q=>q.diff===cfg.diff)
    const actualCount = Math.min(cfg.count, pool.length)
    const sh=[...pool].sort(()=>Math.random()-.5).slice(0,actualCount)
    setQs(sh);setAns({});setCur(0);setSel(null);setLocked(false);setAiFeedback('')
    setPhase('question');if(cfg.mode==='timed'){timer.reset();setTimeout(()=>timer.start(),100)}
    logActivity("Started Quiz",(cfg.sub==="all"?"Mixed subjects":cfg.sub)+" - "+actualCount+" questions")
  }

  const pick = (i) => {
    if(locked) return
    setSel(i);setLocked(true);timer.stop()
    setAns(a=>({...a,[cur]:i}))
    if(qs[cur]?.correct===i && addXP) addXP(4)
  }

  const next = () => {
    if(cur<qs.length-1){setCur(c=>c+1);setSel(null);setLocked(false);if(cfg.mode==='timed'){timer.reset();setTimeout(()=>timer.start(),100)}}
    else {
      setPhase('result')
      const score = Object.entries(ans).filter(([i,a])=>qs[+i]?.correct===a).length + (qs[cur]?.correct===sel?1:0)
      logActivity("Completed Quiz", score+"/"+qs.length+" correct ("+Math.round(score/qs.length*100)+"%)")
    }
  }

  const score=Object.entries(ans).filter(([i,a])=>qs[+i]?.correct===a).length
  const pct=qs.length?Math.round(score/qs.length*100):0
  const marks=score*4-(Object.keys(ans).length-score)

  const getAIFeedback = async () => {
    setAiFeedback('loading')
    try {
      const wrong = qs.filter((q,i)=>ans[i]!==q.correct).map(q=>q.ch).filter((v,i,a)=>a.indexOf(v)===i)
      const res = await fetch('/api/results',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({accuracy:pct,score,totalQuestions:qs.length,wrongTopics:wrong,userClass:11,stream:'PCB'})})
      const data = await res.json()
      setAiFeedback(data.feedback||'Keep practising consistently!')
    } catch { setAiFeedback('Great effort! Review wrong answers and focus on weak chapters daily.') }
  }

  const subBadge = {bio:'badge-bio',chem:'badge-chem',phys:'badge-phys',math:'badge-math'}
  const subLabel = {bio:'Biology',chem:'Chemistry',phys:'Physics',math:'Maths'}

  if(phase==='setup') return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'⚡'} Quiz Engine</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Adaptive quizzes with NEET +4/-1 marking {'·'} {QUESTIONS.length} questions in bank</p>
      </div>
      <div className="grid-2" style={{maxWidth:780}}>
        <div className="card">
          <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>Configure Quiz</div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Subject</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {[['all','All'],['bio','Biology'],['chem','Chemistry'],['phys','Physics']].map(([v,l])=>(
                <button key={v} className={"btn btn-sm"+(cfg.sub===v?" btn-primary":" btn-secondary")} onClick={()=>setCfg(c=>({...c,sub:v}))}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Difficulty</div>
            <div style={{display:'flex',gap:6}}>
              {[['all','All'],['easy','Easy'],['med','Medium'],['hard','Hard']].map(([v,l])=>(
                <button key={v} className={"btn btn-sm"+(cfg.diff===v?" btn-primary":" btn-secondary")} onClick={()=>setCfg(c=>({...c,diff:v}))}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Number of Questions</div>
            <div style={{display:'flex',gap:6}}>
              {[5,10,15,20].map(n=>(
                <button key={n} className={"btn btn-sm"+(cfg.count===n?" btn-primary":" btn-secondary")} onClick={()=>setCfg(c=>({...c,count:n}))}>{n}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Mode</div>
            <div style={{display:'flex',gap:6}}>
              {[['practice','Practice (untimed)'],['timed','Timed (30s/Q)']].map(([v,l])=>(
                <button key={v} className={"btn btn-sm"+(cfg.mode===v?" btn-primary":" btn-secondary")} onClick={()=>setCfg(c=>({...c,mode:v}))}>{l}</button>
              ))}
            </div>
          </div>

          {/* Show how many questions actually match this filter */}
          {(() => {
            let pool = cfg.sub==='all'?QUESTIONS:QUESTIONS.filter(q=>q.sub===cfg.sub)
            if(cfg.diff!=='all') pool=pool.filter(q=>q.diff===cfg.diff)
            const available = pool.length
            const willGet = Math.min(cfg.count, available)
            return (
              <div style={{marginBottom:16,padding:'8px 12px',background: willGet<cfg.count?"rgba(210,153,34,.1)":"var(--bg3)",border:"1px solid "+(willGet<cfg.count?"rgba(210,153,34,.3)":"var(--border)"),borderRadius:'var(--r)',fontSize:12}}>
                {willGet<cfg.count
                  ? <span style={{color:'var(--yellow)'}}>{'\u26a0\ufe0f'} Only {available} questions match this filter. Quiz will have {willGet} question{willGet!==1?'s':''}.</span>
                  : <span style={{color:'var(--text2)'}}>{'✓'} {available} questions available {'\u2014'} quiz will have {willGet} questions.</span>}
              </div>
            )
          })()}

          <button className="btn btn-primary btn-lg" style={{width:'100%'}} onClick={start}>Start Quiz {'→'}</button>
        </div>
        <div className="card">
          <div style={{fontWeight:600,fontSize:14,marginBottom:14}}>Marking Scheme</div>
          {[['Correct answer','+4 marks'],['Wrong answer','-1 mark'],['Skipped / timed out','0 marks'],['Explanation shown','after each answer'],['AI feedback','at end of quiz']].map(([l,v])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
              <span style={{color:'var(--text2)',flex:1}}>{l}</span>
              <span style={{color:'var(--text)',fontWeight:500,fontSize:12}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:14,background:'var(--bg3)',borderRadius:'var(--r)',padding:'10px 12px'}}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:20,color:'var(--blue)'}}>{QUESTIONS.length}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:1}}>Questions in bank {'·'} Growing weekly</div>
          </div>
        </div>
      </div>
    </div>
  )

  if(phase==='result') return (
    <div className="page fade-in" style={{maxWidth:700}}>
      <div className="card" style={{textAlign:'center',padding:'36px 28px',marginBottom:16}}>
        <div style={{fontSize:48,marginBottom:10}}>{pct>=75?'🎉':pct>=50?'👍':'💪'}</div>
        <div className="result-score">{pct}%</div>
        <div style={{color:'var(--text2)',margin:'8px 0 4px',fontSize:15}}>{score} of {qs.length} correct</div>
        <div style={{color:'var(--text3)',fontSize:13,marginBottom:24}}>{pct>=75?'Excellent!':pct>=50?'Good attempt - review the explanations below.':'Revisit NCERT theory and retry!'}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:24}}>
          {[["NEET Marks",Math.max(0,marks)+" pts"],['Correct',score],['Wrong',qs.length-score]].map(([l,v])=>(
            <div key={l} style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:'12px 10px'}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700}}>{v}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {!aiFeedback && <button className="btn btn-secondary btn-lg" style={{width:'100%',marginBottom:12}} onClick={getAIFeedback}>{'🤖'} Get AI Feedback</button>}
        {aiFeedback==='loading' && <div className="card card-blue" style={{textAlign:'left',marginBottom:12}}><div style={{display:'flex',gap:6}}><span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/></div></div>}
        {aiFeedback&&aiFeedback!=='loading' && (
          <div className="card card-purple" style={{textAlign:'left',marginBottom:12}}>
            <div style={{fontWeight:600,fontSize:13,marginBottom:6}}>{'🤖'} AI Feedback</div>
            <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{aiFeedback}</div>
          </div>
        )}

        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <button className="btn btn-primary" onClick={start}>{'🔄'} Retry</button>
          <button className="btn btn-secondary" onClick={()=>setPhase('setup')}>Change Config</button>
        </div>
      </div>

      <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,marginBottom:12}}>{'📋'} Answer Review</div>
      {qs.map((q,i)=>{
        const ua=ans[i],ok=q.correct===ua
        return (
          <div key={i} className="card card-sm" style={{marginBottom:10,borderLeft:"3px solid "+ok?'var(--green)':'var(--red)'}}>
            <div style={{display:'flex',gap:8,marginBottom:6}}><span>{ok?'✅':'❌'}</span><div style={{fontSize:13,fontWeight:500,flex:1}}>{q.text}</div></div>
            <div style={{fontSize:12,marginBottom:5}}>
              <span style={{color:'var(--green)',fontWeight:600}}>{'✓'} {q.opts[q.correct]}</span>
              {!ok&&ua!==-1&&<span style={{color:'var(--red)',marginLeft:12}}>{'✗'} You: {q.opts[ua]}</span>}
              {ua===-1&&<span style={{color:'var(--yellow)',marginLeft:12}}>Time up</span>}
            </div>
            <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.6,background:'var(--bg3)',padding:'7px 10px',borderRadius:6}}>{q.exp}</div>
          </div>
        )
      })}
    </div>
  )

  const q=qs[cur];if(!q)return null
  const tc=cfg.mode==='timed'?(timer.t<=5?'var(--red)':timer.t<=10?'var(--yellow)':'var(--text2)'):'var(--text2)'

  return (
    <div className="page fade-in" style={{maxWidth:720}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
          <span className={"badge "+subBadge[q.sub]}>{subLabel[q.sub]}</span>
          <span className={"badge badge-"+q.diff}>{q.diff}</span>
          <span className={"badge badge-"+(q.exam==="NEET"?"neet":"cet")}>{q.exam}</span>
          {q.year&&<span style={{fontSize:11,color:'var(--text3)'}}>PYQ {q.year}</span>}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:12,color:'var(--text3)'}}>{cur+1}/{qs.length}</span>
          {cfg.mode==='timed'&&(
            <div style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:'5px 10px',border:"1px solid "+(timer.t<=5?"rgba(248,81,73,.4)":"var(--border)"),fontFamily:'JetBrains Mono,monospace',fontWeight:600,fontSize:14,color:tc}}>
              {timer.fmt(timer.t)}
            </div>
          )}
        </div>
      </div>

      <div className="prog" style={{height:3,marginBottom:20}}><div className="prog-fill" style={{width:(cur/qs.length)*100+"%",background:'var(--blue)'}}/></div>

      <div className="card" style={{marginBottom:14}}>
        <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Q{cur+1} {'·'} {q.ch}</div>
        <div style={{fontSize:15,fontWeight:500,lineHeight:1.7,marginBottom:20}}>{q.text}</div>
        {q.opts.map((o,i)=>{
          let cls='mcq-opt'
          if(locked){cls+=' locked';if(i===q.correct)cls+=' ok';else if(i===sel&&i!==q.correct)cls+=' bad'}
          else if(i===sel)cls+=' sel'
          return (
            <div key={i} className={cls} onClick={()=>pick(i)}>
              <div className="opt-letter">{String.fromCharCode(65+i)}</div>
              <span style={{flex:1}}>{o}</span>
              {locked&&i===q.correct&&<span style={{color:'var(--green)',marginLeft:'auto'}}>{'✓'}</span>}
              {locked&&i===sel&&i!==q.correct&&<span style={{color:'var(--red)',marginLeft:'auto'}}>{'✗'}</span>}
            </div>
          )
        })}
      </div>

      {locked&&(
        <>
          <div className="card card-green" style={{marginBottom:14}}>
            <div style={{fontWeight:600,fontSize:12,marginBottom:5,color:'var(--green)'}}>Explanation</div>
            <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{q.exp}</div>
          </div>
          <button className="btn btn-primary btn-lg" style={{width:'100%'}} onClick={next}>{cur<qs.length-1?'Next Question →':'See Results'}</button>
        </>
      )}
    </div>
  )
}


// ── TESTS PAGE ────────────────────────────────────────────────────
const TestsPage = ({setPage, logActivity}) => {
  const [filter,setFilter] = useState('all')
  const [custom,setCustom] = useState({sub:'all',diff:'all',count:45})
  const [showCustom,setShowCustom] = useState(false)
  const filt = filter==='all'?MOCK_TESTS:MOCK_TESTS.filter(t=>t.type===filter)

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'🧪'} Mock Tests and PYQs</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>NEET + MHT-CET {'·'} 10 years of previous year papers {'·'} Negative marking</p>
      </div>
      <div className="tabs">
        {['all','NEET','CET-PCB','CET-PCM'].map(t=><div key={t} className={"tab"+(filter===t?" active":"")} onClick={()=>setFilter(t)}>{t==='all'?'All Tests':t}</div>)}
      </div>
      <div className="grid-auto">
        {filt.map(t=>{
          const typeColor = t.type==='NEET'?'var(--blue)':t.type.includes('PCB')?'var(--green)':'var(--orange)'
          const typeClass = t.type==='NEET'?'badge-neet':t.type.includes('PCB')?'badge-bio':'badge-math'
          return (
            <div key={t.id} className="card" style={{cursor:'pointer',borderLeft:"3px solid "+typeColor}} onClick={()=>{logActivity("Started: "+t.title,"Mock test attempt");setPage('quiz')}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                <span className={"badge "+typeClass}>{t.type}</span>
                <span className={"badge badge-"+t.diff}>{t.diff}</span>
              </div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:3,lineHeight:1.3}}>{t.title}</div>
              {t.year&&<div style={{fontSize:11,color:'var(--text3)',marginBottom:8}}>Previous Year Paper {'·'} {t.year}</div>}
              <div style={{display:'flex',gap:12,marginBottom:12,fontSize:12,color:'var(--text2)'}}>
                <span>{t.qs} Qs</span><span>{t.dur} min</span><span>{t.type==='NEET'?'+4/-1':'+2/0'}</span>
              </div>
              <button className="btn btn-primary btn-sm" style={{width:'100%'}} onClick={e=>{e.stopPropagation();logActivity("Started: "+t.title,"Mock test attempt");setPage('quiz')}}>
                Start Test {'→'}
              </button>
            </div>
          )
        })}
        <div className="card" style={{border:'2px dashed var(--border)',cursor:'pointer'}} onClick={()=>setShowCustom(v=>!v)}>
          <div style={{fontSize:32,marginBottom:10}}>{'✨'}</div>
          <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:5}}>Custom Test Builder</div>
          <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>Pick topics, difficulty, question count</div>
          {showCustom&&(
            <div onClick={e=>e.stopPropagation()}>
              {[['Subject',['all','bio','chem','phys'],'sub'],['Difficulty',['all','easy','med','hard'],'diff']].map(([label,opts,key])=>(
                <div key={key} style={{marginBottom:10}}>
                  <div style={{fontSize:11,color:'var(--text3)',marginBottom:5,fontWeight:600}}>{label}</div>
                  <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{opts.map(o=><button key={o} className={"btn btn-sm"+(custom[key]===o?" btn-primary":" btn-secondary")} onClick={()=>setCustom(c=>({...c,[key]:o}))}>{o}</button>)}</div>
                </div>
              ))}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:11,color:'var(--text3)',marginBottom:5,fontWeight:600}}>Questions: {custom.count}</div>
                <input type="range" min="10" max="200" value={custom.count} onChange={e=>setCustom(c=>({...c,count:+e.target.value}))} style={{width:'100%',accentColor:'#1f6feb'}}/>
              </div>
              <button className="btn btn-primary btn-sm" style={{width:'100%'}} onClick={()=>setPage('quiz')}>Build and Start {'→'}</button>
            </div>
          )}
          {!showCustom&&<button className="btn btn-outline btn-sm" style={{width:'100%'}}>Configure Test</button>}
        </div>
      </div>
    </div>
  )
}

// ── GAMES PAGE (no browser alerts!) ───────────────────────────────
const GamesPage = ({setPage, logActivity, addXP}) => {
  const [activeGame,setActiveGame] = useState(null)
  const [cardIdx,setCardIdx] = useState(0)
  const [flipped,setFlipped] = useState(false)
  const [res,setRes] = useState({knew:0,didnt:0})
  const [comingSoon,setComingSoon] = useState(null)
  const [bossHP,setBossHP] = useState(100)
  const [bossQ,setBossQ] = useState(0)
  const [bossAns,setBossAns] = useState(null)
  const [bossLocked,setBossLocked] = useState(false)
  const [bossScore,setBossScore] = useState(0)

  const GAMES_LIST = [
    {id:'flashcard',icon:'🃏',title:'Flashcard Flip',desc:'Test memory with concept cards. Flip to reveal, mark what you know.',color:'#58a6ff',badge:FLASHCARDS.length+" Cards"},
    {id:'blitz',icon:'⚡',title:'Quiz Blitz',desc:'30 seconds per question! Rapid-fire MCQs across all subjects.',color:'#d29922',badge:'10 Rounds'},
    {id:'boss',icon:'👾',title:'Chapter Boss Battle',desc:'Answer 10 questions to defeat the Boss and earn XP!',color:'#bc8cff',badge:'+500 XP'},
    {id:'recall',icon:'🎯',title:'Speed Recall',desc:'Fastest correct answer wins! Race against time for points.',color:'#3fb950',badge:'Leaderboard'},
    {id:'bio-label',icon:'🔬',title:'Bio Diagram Quiz',desc:'Label biological diagrams - cell, heart, plant anatomy.',color:'#3fb950',badge:'15 Diagrams'},
    {id:'equation',icon:'⚖️',title:'Equation Balancer',desc:'Balance chemical equations before time runs out!',color:'#bc8cff',badge:'Chemistry'},
  ]

  if(activeGame==='flashcard'){
    const card = FLASHCARDS[cardIdx]
    const total = FLASHCARDS.length
    const cardDone = cardIdx>=total
    if(cardDone) return (
      <div className="page fade-in" style={{maxWidth:600,textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:12}}>{'🎉'}</div>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:24,fontWeight:700,marginBottom:8}}>Session Complete!</h2>
        <div style={{fontSize:15,color:'var(--text2)',marginBottom:24}}>You knew {res.knew} out of {total} cards ({Math.round(res.knew/total*100)}%)</div>
        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
          <button className="btn btn-primary btn-lg" onClick={()=>{setCardIdx(0);setFlipped(false);setRes({knew:0,didnt:0})}}>Play Again</button>
          <button className="btn btn-secondary btn-lg" onClick={()=>setActiveGame(null)}>Back</button>
        </div>
      </div>
    )
    return (
      <div className="page fade-in" style={{maxWidth:660}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
          <button className="btn btn-secondary btn-sm" onClick={()=>{setActiveGame(null);setCardIdx(0);setFlipped(false);setRes({knew:0,didnt:0})}}>Back</button>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:18}}>{'🃏'} Flashcard Flip</h2>
          <span style={{marginLeft:'auto',fontSize:12,color:'var(--text3)'}}>{cardIdx+1}/{total}</span>
        </div>
        <div className="prog" style={{height:4,marginBottom:20}}><div className="prog-fill" style={{width:(cardIdx/total)*100+"%",background:'var(--blue)'}}/></div>
        <div style={{perspective:'1000px',marginBottom:16,cursor:'pointer'}} onClick={()=>setFlipped(f=>!f)}>
          <div className={"fc-card"+(flipped?" flipped":"")} style={{minHeight:200}}>
            <div className="fc-face fc-front">
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text3)',marginBottom:12}}>Tap to reveal</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:18,fontWeight:700,textAlign:'center',lineHeight:1.4}}>{card.front}</div>
              <div style={{position:'absolute',bottom:14,left:14}}>
                <span className={"badge badge-"+card.sub}>{card.sub}</span>
              </div>
            </div>
            <div className="fc-face fc-back">
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--blue)',marginBottom:12}}>Answer</div>
              <div style={{fontSize:14,textAlign:'center',lineHeight:1.7,color:'var(--text)'}}>{card.back}</div>
            </div>
          </div>
        </div>
        {flipped?(
          <div style={{display:'flex',gap:10,marginBottom:16}}>
            <button className="btn btn-danger btn-lg" style={{flex:1}} onClick={()=>{setRes(r=>({...r,didnt:r.didnt+1}));setCardIdx(i=>i+1);setFlipped(false)}}>{'✗'} Did not Know</button>
            <button className="btn btn-success btn-lg" style={{flex:1}} onClick={()=>{setRes(r=>({...r,knew:r.knew+1}));setCardIdx(i=>i+1);setFlipped(false);if(addXP)addXP(2)}}>{'✓'} Knew It!</button>
          </div>
        ):<div style={{textAlign:'center',color:'var(--text3)',fontSize:13,padding:'10px 0'}}>Tap card to flip</div>}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[['Knew It',res.knew,'var(--green)'],['Did not Know',res.didnt,'var(--red)']].map(([l,v,c])=>(
            <div key={l} style={{background:'var(--bg3)',border:"1px solid "+c+"30",borderRadius:'var(--r)',padding:'12px',textAlign:'center'}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,color:c}}>{v}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if(activeGame==='boss'){
    const bossQs = QUESTIONS.slice(0,10)
    const bq = bossQs[bossQ]
    const bossOver = bossHP<=0||bossQ>=bossQs.length
    if(bossOver) return (
      <div className="page fade-in" style={{maxWidth:600,textAlign:'center'}}>
        <div style={{fontSize:64,marginBottom:12}}>{bossHP<=0?'🏆':'💥'}</div>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:24,fontWeight:700,marginBottom:8}}>{bossHP<=0?'Boss Defeated!':'Game Over'}</h2>
        <div style={{fontSize:15,color:'var(--text2)',marginBottom:24}}>Score: {bossScore}/10</div>
        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
          <button className="btn btn-primary btn-lg" onClick={()=>{setBossHP(100);setBossQ(0);setBossAns(null);setBossLocked(false);setBossScore(0)}}>Play Again</button>
          <button className="btn btn-secondary btn-lg" onClick={()=>setActiveGame(null)}>Back</button>
        </div>
      </div>
    )
    return (
      <div className="page fade-in" style={{maxWidth:700}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
          <button className="btn btn-secondary btn-sm" onClick={()=>setActiveGame(null)}>Back</button>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:18}}>{'👾'} Chapter Boss Battle</h2>
        </div>
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:13}}>
            <span style={{fontWeight:600,color:'var(--red)'}}>NEET Boss</span>
            <span style={{color:'var(--text3)'}}>Q{bossQ+1}/10 {'·'} Score: {bossScore}</span>
          </div>
          <div className="boss-hp"><div className="boss-hp-fill" style={{width:bossHP+"%"}}/></div>
        </div>
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Q{bossQ+1} {'·'} {bq.ch}</div>
          <div style={{fontSize:15,fontWeight:500,lineHeight:1.7,marginBottom:18}}>{bq.text}</div>
          {bq.opts.map((o,i)=>{
            let cls='mcq-opt'
            if(bossLocked){cls+=' locked';if(i===bq.correct)cls+=' ok';else if(i===bossAns&&i!==bq.correct)cls+=' bad'}
            else if(i===bossAns)cls+=' sel'
            return (
              <div key={i} className={cls} onClick={()=>{
                if(bossLocked)return
                setBossAns(i);setBossLocked(true)
                if(i===bq.correct){setBossHP(h=>Math.max(0,h-10));setBossScore(s=>s+1);if(addXP)addXP(5)}
              }}>
                <div className="opt-letter">{String.fromCharCode(65+i)}</div>
                <span style={{flex:1}}>{o}</span>
              </div>
            )
          })}
        </div>
        {bossLocked&&(
          <>
            <div className="card card-green" style={{marginBottom:12}}>
              <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>{bq.exp}</div>
            </div>
            <button className="btn btn-primary btn-lg" style={{width:'100%'}} onClick={()=>{setBossQ(q=>q+1);setBossAns(null);setBossLocked(false)}}>
              {bossQ<9?'Next Question →':'See Final Result'}
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'🎮'} Learning Games</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Study smarter - earn XP, badges, and beat the leaderboard!</p>
      </div>
      {comingSoon&&(
        <div style={{marginBottom:14,background:'rgba(88,166,255,.1)',border:'1px solid rgba(88,166,255,.25)',borderRadius:'var(--r)',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:13,color:'var(--blue)'}}>{'🚧'} <strong>{comingSoon}</strong> is coming soon! Try Flashcard Flip or Boss Battle for now.</div>
          <button className="btn btn-ghost btn-sm" onClick={()=>setComingSoon(null)}>{'×'}</button>
        </div>
      )}
      <div className="grid-3">
        {GAMES_LIST.map(g=>(
          <div key={g.id} className="game-card" style={{'--gc':g.color}} onClick={()=>{
            if(g.id==='flashcard'){logActivity('Played Flashcard Flip','Card study session');setActiveGame('flashcard')}
            else if(g.id==='blitz'||g.id==='recall')setPage('quiz')
            else if(g.id==='boss'){logActivity('Played Boss Battle','10-question challenge');setActiveGame('boss')}
            else setComingSoon(g.title)
          }}>
            <div style={{fontSize:32,marginBottom:10}}>{g.icon}</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:14,fontWeight:700,marginBottom:5,color:g.color}}>{g.title}</div>
            <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.5,marginBottom:10}}>{g.desc}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span className="badge" style={{background:g.color+"18",color:g.color,fontSize:10}}>{g.badge}</span>
              <span style={{fontSize:12,color:g.color,fontWeight:600}}>Play {'→'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ANALYTICS PAGE ────────────────────────────────────────────────
const AnalyticsPage = () => {
  const [tab,setTab] = useState('overview')
  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'📊'} Performance Analytics</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Your stats will appear here as you study and take quizzes</p>
      </div>
      <div style={{textAlign:'center',padding:60,color:'var(--text3)'}}>
        <div style={{fontSize:48,marginBottom:16}}>{'📊'}</div>
        <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:18,fontWeight:700,marginBottom:8,color:'var(--text)'}}>Start Your Journey</div>
        <div style={{fontSize:13,lineHeight:1.7,maxWidth:400,margin:'0 auto'}}>
          Take your first quiz or mock test to see subject-wise accuracy, heatmaps, and trend charts here.
        </div>
      </div>
    </div>
  )
}

// ── CHAT PAGE ─────────────────────────────────────────────────────
const ChatPage = ({profile, logActivity}) => {
  const [msgs,setMsgs] = useState([{role:'ai',text:"Hey! I am your AI Study Mentor.\n\nI know your full NEET and MHT-CET syllabus and I am here 24/7. What would you like to study today?",time:'Now'}])
  const [inp,setInp] = useState('')
  const [loading,setLoading] = useState(false)
  const ref = useRef()
  useEffect(()=>{ref.current?.scrollIntoView({behavior:'smooth'})},[msgs])

  const send = async(text) => {
    const m = text.trim(); if(!m||loading)return
    setMsgs(ms=>[...ms,{role:'user',text:m,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])
    setInp(''); setLoading(true)
    if(logActivity) logActivity('AI Mentor Chat', m.slice(0,60))
    try {
      const history = msgs.slice(1).map(m=>({role:m.role==='ai'?'assistant':'user',content:m.text}))
      const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[...history,{role:'user',content:m}],
          systemContext:"Student: "+(profile?.name||"Pallavi")+", Class "+(profile?.class||11)+", "+(profile?.stream||"PCB")+" stream, Maharashtra, preparing for NEET and MHT-CET"})})
      const data = await res.json()
      setMsgs(ms=>[...ms,{role:'ai',text:data.content||"Sorry, try again!",time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])
    } catch {
      setMsgs(ms=>[...ms,{role:'ai',text:"Connectivity issue - try again in a moment!",time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])
    }
    setLoading(false)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'calc(100vh - 54px)'}}>
      <div style={{padding:'12px 24px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:12,background:'var(--bg)',flexShrink:0}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{'🤖'}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14}}>NEET AI Mentor</div>
          <div style={{fontSize:11,color:'var(--green)',display:'flex',alignItems:'center',gap:4,marginTop:1}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>
            Online {'·'} Full NEET + MHT-CET knowledge
          </div>
        </div>
      </div>
      {msgs.length<=1&&(
        <>
          <div style={{margin:'8px 24px 0',background:'rgba(88,166,255,.08)',border:'1px solid rgba(88,166,255,.2)',borderRadius:'var(--r)',padding:'10px 14px',fontSize:12,color:'var(--text2)',display:'flex',gap:10,alignItems:'center'}}>
            <span style={{fontSize:18,flexShrink:0}}>{'🔭'}</span>
            <span>For <strong style={{color:'var(--blue)'}}>interactive labeled diagrams</strong> (cell, heart, atom, eye...) use the <strong style={{color:'var(--blue)'}}>3D Diagrams</strong> page in the sidebar. AI Mentor gives text explanations.</span>
          </div>
          <div className="chip-row">
            {CHAT_STARTERS.map((s,i)=><div key={i} className="chip" onClick={()=>send(s)}>{s}</div>)}
          </div>
        </>
      )}
      <div className="chat-msgs">
        {msgs.map((m,i)=>(
          <div key={i} className={"msg "+m.role}>
            <div className={"msg-av "+(m.role==="ai"?"msg-ai-av":"msg-user-av")}>{m.role==='ai'?'🤖':(profile?.name||'P')[0].toUpperCase()}</div>
            <div>
              {(()=>{
                const fmt=(t)=>{
                  t=t.replace(/```[\s\S]*?```/g,'')
                  t=t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
                  t=t.replace(/^- (.+)$/gm,'<div style="display:flex;gap:6px;margin:2px 0"><span style="color:#58a6ff;flex-shrink:0">&#9670;</span><span>$1</span></div>')
                  t=t.replace(/^(\d+)\. (.+)$/gm,'<div style="display:flex;gap:6px;margin:2px 0"><span style="color:#58a6ff;flex-shrink:0;font-weight:700">$1.</span><span>$2</span></div>')
                  t=t.replace(/\n/g,'<br/>')
                  return t
                }
                return <div className="msg-bbl" dangerouslySetInnerHTML={{__html:fmt(m.text)}}/>
              })()}
              <div className="msg-time">{m.time}</div>
            </div>
          </div>
        ))}
        {loading&&(
          <div className="msg ai">
            <div className="msg-av msg-ai-av">{'🤖'}</div>
            <div className="msg-bbl" style={{display:'flex',gap:3,alignItems:'center',padding:'12px 14px'}}>
              <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
            </div>
          </div>
        )}
        <div ref={ref}/>
      </div>
      <div className="chat-input-row">
        <textarea className="chat-inp" value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(inp)}}}
          placeholder="Ask anything - concepts, doubts, quizzes, study plans, motivation..." rows={1}/>
        <button className="btn btn-primary" style={{height:42,padding:'0 16px',flexShrink:0}} onClick={()=>send(inp)} disabled={loading||!inp.trim()}>{'➤'}</button>
      </div>
    </div>
  )
}

// ── PLANNER PAGE (real-time date/time) ────────────────────────────
const PlannerPage = ({logActivity}) => {
  const pom = useTimer(25*60,()=>{})
  const [pomRun,setPomRun] = useState(false)
  const [pomMode,setPomMode] = useState('work')
  const [now,setNow] = useState(new Date())
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t)},[])
  const [tasks,setTasks] = useState([
    {id:1,done:false,t:'Read first chapter of your syllabus',sub:'bio'},
    {id:2,done:false,t:'Take a diagnostic quiz (any subject)',sub:null},
    {id:3,done:false,t:'Chat with AI Mentor about your study plan',sub:null},
    {id:4,done:false,t:'Explore 3D Diagrams for Biology',sub:null},
  ])
  const toggleTask = (id) => setTasks(ts=>ts.map(t=>t.id===id?{...t,done:!t.done}:t))
  const togglePom = () => {if(pomRun){pom.stop();setPomRun(false)}else{pom.start();setPomRun(true)}}
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const fmtTime=(d)=>String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")+":"+String(d.getSeconds()).padStart(2,"0")
  const fmtDate=(d)=>days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()
  const doneCt = tasks.filter(t=>t.done).length

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'📅'} Study Planner</h1>
          <p style={{fontSize:13,color:'var(--text2)'}}>Exam countdown {'·'} Pomodoro timer {'·'} Daily tasks</p>
        </div>
        <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r2)',padding:'10px 18px',textAlign:'right'}}>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:22,fontWeight:700,color:'var(--blue)',letterSpacing:'.02em'}}>{fmtTime(now)}</div>
          <div style={{fontSize:12,color:'var(--text2)',marginTop:2}}>{fmtDate(now)}</div>
        </div>
      </div>

      <div className="grid-3" style={{marginBottom:20}}>
        {[{e:'NEET 2025',d:'August 3, 2025',days:Math.max(0,Math.ceil((new Date('2025-08-03')-now)/(1000*60*60*24))),icon:'🏥',c:'var(--blue)'},
          {e:'MHT-CET PCB',d:'May 2025',days:0,icon:'🔬',c:'var(--bio)',done:true},
          {e:'MHT-CET PCM',d:'May 2025',days:0,icon:'📐',c:'var(--math)',done:true}].map(ex=>(
          <div key={ex.e} className="card" style={{textAlign:'center',borderTop:"2px solid "+ex.c}}>
            <div style={{fontSize:28,marginBottom:6}}>{ex.icon}</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:3}}>{ex.e}</div>
            <div style={{fontSize:11,color:'var(--text3)',marginBottom:8}}>{ex.d}</div>
            {ex.done?<span className="badge badge-easy">Appeared</span>:
              <><div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:38,fontWeight:900,color:ex.c,lineHeight:1}}>{ex.days}</div>
              <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>days remaining</div></>}
          </div>
        ))}
      </div>

      <div className="grid-2" style={{alignItems:'start'}}>
        <div className="card" style={{marginBottom:14}}>
          <div style={{textAlign:'center',marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'.07em',color:pomMode==='work'?'var(--blue)':'var(--green)',marginBottom:6}}>{pomMode==='work'?'Focus Session':'Short Break'}</div>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:52,fontWeight:700,color:pomMode==='work'?'var(--blue)':'var(--green)',lineHeight:1,marginBottom:4}}>{pom.fmt(pom.t)}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>{pomRun?'In progress...':'Ready to focus'}</div>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={togglePom}>{pomRun?'Pause':'Start'}</button>
            <button className="btn btn-secondary" onClick={()=>{pom.reset();setPomRun(false)}}>Reset</button>
            <button className="btn btn-secondary" onClick={()=>{pom.reset();setPomMode(m=>m==='work'?'break':'work');setPomRun(false)}}>Switch</button>
          </div>
        </div>

        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14}}>Today's Tasks</div>
            <span className="badge badge-easy">{doneCt}/{tasks.length}</span>
          </div>
          <div className="prog" style={{height:4,marginBottom:14}}><div className="prog-fill" style={{width:(doneCt/tasks.length*100)+"%",background:'var(--green)'}}/></div>
          {tasks.map(task=>(
            <div key={task.id} className="task-item" style={{opacity:task.done?.6:1}}>
              <div className={"task-check"+(task.done?" done":"")} onClick={()=>toggleTask(task.id)}>
                {task.done&&<span style={{fontSize:9,color:'#fff',fontWeight:700}}>{'✓'}</span>}
              </div>
              <span style={{flex:1,fontSize:13,fontWeight:task.done?400:500,textDecoration:task.done?'line-through':'none',color:task.done?'var(--text3)':'var(--text)'}}>{task.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── NOTES PAGE (with AI generate) ─────────────────────────────────
const NotesPage = ({logActivity}) => {
  const [notes,setNotes] = useState([])
  const [active,setActive] = useState(null)
  const [adding,setAdding] = useState(false)
  const [newNote,setNewNote] = useState({title:'',sub:'bio',content:''})
  const [editContent,setEditContent] = useState('')
  const [generating,setGenerating] = useState(false)
  const subColor = {bio:'var(--bio)',chem:'var(--chem)',phys:'var(--phys)',math:'var(--math)'}
  const subIcon = {bio:'🧬',chem:'⚗️',phys:'⚛️',math:'📐'}
  const subLabel = {bio:'Biology',chem:'Chemistry',phys:'Physics',math:'Maths'}

  const saveNote = () => {
    if(!newNote.title.trim())return
    const n = {id:Date.now(),...newNote,date:'Today'}
    setNotes(ns=>[n,...ns]); setActive(n); setEditContent(n.content); setAdding(false)
    setNewNote({title:'',sub:'bio',content:''})
    if(logActivity) logActivity('Created Note', newNote.title)
  }
  const deleteNote = (id,e) => {e.stopPropagation();setNotes(ns=>ns.filter(n=>n.id!==id));if(active?.id===id)setActive(null)}
  const openNote = (note) => { setActive(note); setEditContent(note.content); setAdding(false) }
  const saveEdit = () => { setNotes(ns=>ns.map(n=>n.id===active.id?{...n,content:editContent}:n)); setActive(a=>({...a,content:editContent})) }

  const generateWithAI = async () => {
    if(!newNote.title.trim())return
    setGenerating(true)
    try {
      const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[{role:'user',content:"Generate concise NEET study notes for: "+newNote.title+" (Subject: "+subLabel[newNote.sub]+"). Include: 1) 4 key bullet points 2) Important formula if applicable 3) 2 NEET PYQ topics. Plain text only, no markdown headers, max 150 words."}]})})
      const data = await res.json()
      setNewNote(n=>({...n,content:data.content||''}))
    } catch { setNewNote(n=>({...n,content:'Could not generate. Please add notes manually.'})) }
    setGenerating(false)
  }

  return (
    <div className="page fade-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div>
          <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'📝'} My Notes</h1>
          <p style={{fontSize:13,color:'var(--text2)'}}>Personal notes, formulae, and concept summaries</p>
        </div>
        <button className="btn btn-primary" onClick={()=>{setAdding(true);setActive(null)}}>+ New Note</button>
      </div>

      {adding&&(
        <div className="card card-blue" style={{marginBottom:16}}>
          <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>New Note</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:8,marginBottom:10}}>
            <input value={newNote.title} onChange={e=>setNewNote(n=>({...n,title:e.target.value}))}
              style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'9px 12px',color:'var(--text)',fontSize:14,outline:'none',fontFamily:'inherit'}}
              placeholder="Note title (e.g. Electrochemistry Formulae, Mitosis steps)"/>
            <select value={newNote.sub} onChange={e=>setNewNote(n=>({...n,sub:e.target.value}))}
              style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'9px 12px',color:'var(--text)',fontSize:13,outline:'none',fontFamily:'inherit',cursor:'pointer'}}>
              <option value="bio">Biology</option>
              <option value="chem">Chemistry</option>
              <option value="phys">Physics</option>
              <option value="math">Maths</option>
            </select>
          </div>
          <textarea value={newNote.content} onChange={e=>setNewNote(n=>({...n,content:e.target.value}))}
            style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'10px 12px',color:'var(--text)',fontFamily:'inherit',fontSize:13,resize:'vertical',outline:'none',minHeight:110,lineHeight:1.65,marginBottom:10}}
            placeholder="Write your notes here, or click Generate with AI to auto-fill..."/>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-sm" onClick={saveNote}>Save Note</button>
            <button className="btn btn-secondary btn-sm" onClick={generateWithAI} disabled={!newNote.title.trim()||generating}>
              {generating?'Generating...':'Generate with AI'}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={()=>setAdding(false)}>Cancel</button>
          </div>
          <div style={{marginTop:8,fontSize:11,color:'var(--text3)'}}>Tip: Enter a topic name and click "Generate with AI" to auto-fill notes!</div>
        </div>
      )}

      {notes.length===0&&!adding&&(
        <div style={{textAlign:'center',padding:60,color:'var(--text3)'}}>
          <div style={{fontSize:36,marginBottom:12}}>{'📝'}</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:6,color:'var(--text2)'}}>No notes yet</div>
          <div style={{fontSize:13}}>Click "+ New Note" to create your first note, or use "Generate with AI" to auto-create notes from any topic.</div>
        </div>
      )}

      {notes.length>0&&(
        <div className="grid-2" style={{alignItems:'start'}}>
          <div>
            {notes.map(n=>(
              <div key={n.id} className={"note-item"+(active?.id===n.id?" sel":"")}
                style={{borderLeft:"3px solid "+subColor[n.sub]}} onClick={()=>openNote(n)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span>{subIcon[n.sub]}</span>
                    <span style={{fontWeight:600,fontSize:13}}>{n.title}</span>
                  </div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:11,color:'var(--text3)'}}>{n.date}</span>
                    <button className="btn btn-ghost btn-sm" style={{padding:'2px 6px',color:'var(--red)',fontSize:11}} onClick={e=>deleteNote(n.id,e)}>Delete</button>
                  </div>
                </div>
                <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.5,overflow:'hidden',maxHeight:40}}>{n.content.slice(0,80)}...</div>
              </div>
            ))}
          </div>
          {active&&(
            <div className="card" style={{position:'sticky',top:70}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14}}>{active.title}</span>
                <button className="btn btn-ghost btn-sm" onClick={()=>setActive(null)}>Close</button>
              </div>
              <textarea value={editContent} onChange={e=>setEditContent(e.target.value)}
                style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'var(--r)',padding:'10px 12px',color:'var(--text)',fontFamily:'JetBrains Mono,monospace',fontSize:12,resize:'vertical',outline:'none',minHeight:200,lineHeight:1.75}}/>
              <button className="btn btn-primary btn-sm" style={{marginTop:10,width:'100%'}} onClick={saveEdit}>Save Changes</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── REVISION PAGE (with topic modal, not redirect) ─────────────────
const RevisionPage = ({setPage}) => {
  const [filter,setFilter] = useState('all')
  const [revTopic,setRevTopic] = useState(null)
  const subColor = {bio:'var(--bio)',chem:'var(--chem)',phys:'var(--phys)'}
  const subIcon  = {bio:'🧬',chem:'⚗️',phys:'⚛️'}
  const subLabel = {bio:'Biology',chem:'Chemistry',phys:'Physics'}
  const filtered = filter==='all'?REVISION_DATA:REVISION_DATA.filter(r=>r.urgency===filter)

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'🔄'} Revision Scheduler</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Topics scheduled based on Ebbinghaus forgetting curve</p>
      </div>

      <div className="tabs">
        {[['all','All Topics'],['high','Urgent'],['med','This Week'],['low','On Track']].map(([v,l])=>(
          <div key={v} className={"tab"+(filter===v?" active":"")} onClick={()=>setFilter(v)}>{l}</div>
        ))}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map(r=>(
          <div key={r.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:'var(--card)',border:'1px solid var(--border)',borderLeft:"4px solid "+r.urgency==='high'?'var(--red)':r.urgency==='med'?'var(--yellow)':'var(--green)',borderRadius:'var(--r)',cursor:'pointer',transition:'background .15s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--bg3)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--card)'}}>
            <div style={{width:38,height:38,borderRadius:8,background:subColor[r.sub]+"15",border:"1px solid "+subColor[r.sub]+"30",display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{subIcon[r.sub]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{r.topic}</div>
              <div style={{fontSize:11,color:'var(--text3)',display:'flex',gap:10}}>
                <span>Last studied {r.days} days ago</span>
                <span style={{color:subColor[r.sub]}}>{subLabel[r.sub]}</span>
              </div>
            </div>
            <div style={{textAlign:'right',flexShrink:0,marginRight:10}}>
              <div style={{fontSize:12,fontWeight:700,color:r.urgency==='high'?'var(--red)':r.urgency==='med'?'var(--yellow)':'var(--green)',marginBottom:2}}>{r.due}</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:800,fontSize:20,lineHeight:1,color:r.acc<60?'var(--red)':'var(--yellow)'}}>{r.acc}%</div>
              <div style={{fontSize:10,color:'var(--text3)'}}>accuracy</div>
            </div>
            <button onClick={()=>setRevTopic(r)}
              style={{flexShrink:0,padding:'7px 14px',borderRadius:'var(--r)',border:'1.5px solid var(--blue)',background:'transparent',color:'var(--blue)',fontWeight:600,fontSize:12,cursor:'pointer',transition:'all .15s',fontFamily:'inherit'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--blue)';e.currentTarget.style.color='#fff'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--blue)'}}>
              Revise {'→'}
            </button>
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:'center',padding:40,color:'var(--text3)',fontSize:13}}>All caught up!</div>}
      </div>

      {revTopic&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={()=>setRevTopic(null)}>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:28,maxWidth:500,width:'100%'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:18,marginBottom:6}}>{revTopic.topic}</div>
            <div style={{fontSize:13,color:'var(--text2)',marginBottom:16}}>Accuracy: <span style={{color:'var(--red)',fontWeight:600}}>{revTopic.acc}%</span> {'·'} Due: <span style={{color:'var(--yellow)',fontWeight:600}}>{revTopic.due}</span></div>
            <div style={{background:'var(--bg3)',borderRadius:'var(--r)',padding:'12px 14px',marginBottom:16,fontSize:13,color:'var(--text2)',lineHeight:1.6}}>
              {revTopic.urgency==='high'?'This topic is overdue. A focused quiz will help identify gaps.':'Scheduled revision to reinforce your understanding.'}
            </div>
            <button className="btn btn-primary btn-lg" style={{width:'100%',marginBottom:10}} onClick={()=>{setPage('quiz');setRevTopic(null)}}>
              Start Revision Quiz on "{revTopic.topic}"
            </button>
            <button className="btn btn-secondary" style={{width:'100%',marginBottom:8}} onClick={()=>{setPage('chat');setRevTopic(null)}}>
              Ask AI Mentor about this topic
            </button>
            <button className="btn btn-ghost btn-sm" style={{width:'100%'}} onClick={()=>setRevTopic(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── PREDICTION PAGE ───────────────────────────────────────────────
const PredictionPage = () => {
  const [inp,setInp] = useState({bio:50,chem:50,phys:50,speed:50,rev:50})
  const set=(k,v)=>setInp(i=>({...i,[k]:+v}))
  const neet = Math.round((inp.bio*.36+inp.chem*.32+inp.phys*.32)*7.2)
  const cet  = Math.round((inp.bio*.33+inp.chem*.33+inp.phys*.34)*2.0)

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'🎯'} Score Predictor</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Adjust sliders to see projected NEET and MHT-CET scores</p>
      </div>
      <div className="grid-2" style={{alignItems:'start'}}>
        <div className="card">
          <div style={{fontWeight:600,fontSize:14,marginBottom:16}}>Your Current Accuracy</div>
          {[['bio','Biology','var(--bio)'],['chem','Chemistry','var(--chem)'],['phys','Physics','var(--phys)'],['speed','Speed (time mgmt)','var(--orange)'],['rev','Revision consistency','var(--purple)']].map(([k,l,c])=>(
            <div key={k} style={{marginBottom:18}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:500}}>{l}</span>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:13,fontWeight:700,color:c}}>{inp[k]}%</span>
              </div>
              <input type="range" min="0" max="100" value={inp[k]} onChange={e=>set(k,e.target.value)} style={{width:'100%',accentColor:'#1f6feb',cursor:'pointer'}}/>
            </div>
          ))}
        </div>
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
            <div className="card card-blue" style={{textAlign:'center'}}>
              <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>NEET 2025</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:44,fontWeight:800,color:'var(--blue)',lineHeight:1}}>{neet}</div>
              <div style={{fontSize:11,color:'var(--text3)',margin:'3px 0 10px'}}>out of 720</div>
              <div className="prog" style={{height:6,marginBottom:8}}><div className="prog-fill" style={{width:(neet/720*100)+"%",background:'var(--blue)'}}/></div>
            </div>
            <div className="card card-green" style={{textAlign:'center'}}>
              <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>MHT-CET PCB</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:44,fontWeight:800,color:'var(--green)',lineHeight:1}}>{cet}</div>
              <div style={{fontSize:11,color:'var(--text3)',margin:'3px 0 10px'}}>out of 200</div>
              <div className="prog" style={{height:6,marginBottom:8}}><div className="prog-fill" style={{width:(cet/200*100)+"%",background:'var(--green)'}}/></div>
            </div>
          </div>
          <div className="card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>Subject Breakdown</div>
            <BarChart data={[{l:'Bio',v:inp.bio,c:'var(--bio)'},{l:'Chem',v:inp.chem,c:'var(--chem)'},{l:'Phys',v:inp.phys,c:'var(--phys)'},{l:'Speed',v:inp.speed,c:'var(--orange)'},{l:'Rev',v:inp.rev,c:'var(--purple)'}]} h={120}/>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SETTINGS PAGE (working dark mode toggle) ───────────────────────
const SettingsPage = ({profile, setProfile, onLogout}) => {
  const [darkMode,setDarkMode] = useState(true)
  const [notifs,setNotifs] = useState(true)
  const [sound,setSound] = useState(true)

  useEffect(()=>{
    const root = document.documentElement
    if(darkMode){
      root.style.setProperty('--bg','#0f1117');root.style.setProperty('--bg3','#1c2333')
      root.style.setProperty('--card','#161b22');root.style.setProperty('--card2','#1c2333')
      root.style.setProperty('--border','#30363d');root.style.setProperty('--text','#e6edf3')
      root.style.setProperty('--text2','#8b949e');root.style.setProperty('--text3','#6e7681')
      document.body.style.background='#0f1117';document.body.style.color='#e6edf3'
    } else {
      root.style.setProperty('--bg','#ffffff');root.style.setProperty('--bg3','#eaeef2')
      root.style.setProperty('--card','#ffffff');root.style.setProperty('--card2','#f6f8fa')
      root.style.setProperty('--border','#d0d7de');root.style.setProperty('--text','#1f2328')
      root.style.setProperty('--text2','#656d76');root.style.setProperty('--text3','#848d97')
      document.body.style.background='#ffffff';document.body.style.color='#1f2328'
    }
  },[darkMode])

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>{'⚙️'} Settings and Profile</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Customise your study experience</p>
      </div>
      <div style={{display:'flex',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:280,display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>Profile</div>
            {[['Name',profile?.name||'Pallavi'],["Class","Class "+(profile?.class||11)],['Stream',profile?.stream||'PCB'],['Target Exams',(profile?.targets||['NEET']).join(', ')],['Daily Goal',((profile?.goal||180)/60)+"h"]].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:13,fontWeight:500}}>{l}</span>
                <span style={{fontSize:13,color:'var(--blue)',fontWeight:500}}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>Appearance</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0'}}>
              <div>
                <div style={{fontSize:13,fontWeight:500}}>Dark mode</div>
                <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>Easier on eyes during night study</div>
              </div>
              <Toggle on={darkMode} onClick={()=>setDarkMode(v=>!v)}/>
            </div>
          </div>
          <div className="card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>Notifications</div>
            {[['Daily study reminders',notifs,setNotifs],['Sound effects',sound,setSound]].map(([l,val,fn])=>(
              <div key={l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:13,fontWeight:500}}>{l}</span>
                <Toggle on={val} onClick={()=>fn(v=>!v)}/>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:14}}>Account</div>
            <div style={{padding:'10px 0',borderBottom:'1px solid var(--border)',marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:2}}>Logged in as Pallavi</div>
              <div style={{fontSize:11,color:'var(--text3)'}}>Switch to Admin view to see progress reports</div>
            </div>
            <button className="btn btn-danger" style={{width:'100%'}} onClick={onLogout}>{'←'} Log Out</button>
          </div>
        </div>
        <div style={{width:250,flexShrink:0}}>
          <div className="card card-blue" style={{textAlign:'center'}}>
            <div style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:'#fff',margin:'0 auto 12px',fontFamily:'Space Grotesk,sans-serif'}}>{(profile?.name||'P')[0].toUpperCase()}</div>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16,marginBottom:3}}>{profile?.name||'Pallavi'}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginBottom:14}}>Class {profile?.class||11} {'·'} {profile?.stream||'PCB'} Stream</div>
            <div style={{fontSize:12,color:'var(--text2)'}}>Just getting started - complete quizzes to earn XP and badges!</div>
          </div>
        </div>
      </div>
    </div>
  )
}


// ── 3D DIAGRAMS PAGE (Real SVG Diagrams) ─────────────────────────
const DiagramsPage = ({setPage, logActivity}) => {
  const [activeSub, setActiveSub] = useState('bio')
  const [activeItem, setActiveItem] = useState(null)

  // ── SVG DIAGRAMS ──────────────────────────────────────────────
  const SVG_AnimalCell = () => (
    <svg viewBox="0 0 400 380" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="cellGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1a3a2a"/>
          <stop offset="100%" stopColor="#0d1f17"/>
        </radialGradient>
        <radialGradient id="nucGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="100%" stopColor="#0d1520"/>
        </radialGradient>
      </defs>
      {/* Cell membrane */}
      <ellipse cx="200" cy="190" rx="175" ry="165" fill="url(#cellGrad)" stroke="#3fb950" strokeWidth="3" strokeDasharray="8,3"/>
      {/* Nucleus */}
      <ellipse cx="185" cy="175" rx="60" ry="52" fill="url(#nucGrad)" stroke="#58a6ff" strokeWidth="2.5"/>
      <ellipse cx="185" cy="175" rx="60" ry="52" fill="none" stroke="#58a6ff" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
      {/* Nucleolus */}
      <ellipse cx="180" cy="170" rx="18" ry="15" fill="#1f6feb" opacity="0.8"/>
      <text x="180" y="174" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">nucleolus</text>
      {/* Mitochondria */}
      <ellipse cx="300" cy="130" rx="30" ry="16" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
      <path d="M278,130 Q285,122 292,130 Q299,138 306,130 Q313,122 322,130" fill="none" stroke="#f0883e" strokeWidth="1.5"/>
      <ellipse cx="110" cy="280" rx="28" ry="14" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
      <path d="M90,280 Q97,273 104,280 Q111,287 118,280 Q125,273 132,280" fill="none" stroke="#f0883e" strokeWidth="1.5"/>
      {/* Endoplasmic Reticulum */}
      <path d="M240,175 Q260,155 270,175 Q280,195 260,205 Q240,215 250,235 Q260,255 280,250" fill="none" stroke="#bc8cff" strokeWidth="2.5"/>
      {/* Golgi Apparatus */}
      <g transform="translate(115,210)">
        {[0,7,14,21].map((y,i) => <path key={i} d={"M5,"+y+" Q35,"+(y-6)+" 65,"+y} fill="none" stroke="#d29922" strokeWidth="2.5"/>)}
      </g>
      {/* Ribosomes (dots) */}
      {[[255,165],[262,178],[248,195],[270,195],[240,220],[275,215],[290,175],[295,155],[305,165]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="3.5" fill="#f0883e" opacity="0.9"/>
      )}
      {/* Lysosomes */}
      <circle cx="150" cy="280" r="16" fill="#3d1515" stroke="#f85149" strokeWidth="2"/>
      <text x="150" y="284" textAnchor="middle" fill="#f85149" fontSize="7" fontWeight="bold">lyso</text>
      <circle cx="320" cy="250" r="13" fill="#3d1515" stroke="#f85149" strokeWidth="2"/>
      {/* Vacuole */}
      <ellipse cx="140" cy="130" rx="28" ry="22" fill="#162030" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="140" y="134" textAnchor="middle" fill="#58a6ff" fontSize="7">vacuole</text>
      {/* Centriole */}
      <rect x="230" y="250" width="18" height="8" rx="3" fill="none" stroke="#bc8cff" strokeWidth="1.5"/>
      <rect x="234" y="262" width="18" height="8" rx="3" fill="none" stroke="#bc8cff" strokeWidth="1.5" transform="rotate(5,243,266)"/>

      {/* LABELS */}
      <line x1="245" y1="175" x2="340" y2="90" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="344" y="88" fill="#58a6ff" fontSize="11" fontWeight="bold">Nucleus</text>
      <line x1="300" y1="114" x2="340" y2="95" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="300" y1="130" x2="358" y2="125" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="362" y="129" fill="#f0883e" fontSize="11" fontWeight="bold">Mitochondria</text>
      <line x1="270" y1="195" x2="355" y2="190" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="358" y="194" fill="#bc8cff" fontSize="11" fontWeight="bold">ER</text>
      <line x1="150" y1="215" x2="60" y2="225" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="229" fill="#d29922" fontSize="11" fontWeight="bold">Golgi</text>
      <line x1="150" y1="265" x2="80" y2="295" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="299" fill="#f85149" fontSize="11" fontWeight="bold">Lysosome</text>
      <line x1="200" y1="25" x2="200" y2="5" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="115" y="12" fill="#3fb950" fontSize="11" fontWeight="bold">Cell Membrane</text>
      <line x1="252" y1="254" x2="295" y2="270" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="298" y="274" fill="#bc8cff" fontSize="11" fontWeight="bold">Centriole</text>
    </svg>
  )

  const SVG_Heart = () => (
    <svg viewBox="0 0 420 380" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5a1a1a"/>
          <stop offset="100%" stopColor="#2d0d0d"/>
        </radialGradient>
      </defs>
      {/* Heart shape */}
      <path d="M210,320 C120,260 40,200 40,130 C40,80 75,50 110,50 C140,50 165,65 180,85 C195,65 215,50 245,50 C280,50 315,80 315,130 C315,165 295,190 270,215" fill="url(#heartGrad)" stroke="#f85149" strokeWidth="2.5"/>
      <path d="M210,320 C200,295 165,265 150,240 C130,210 40,200 40,130" fill="none" stroke="#f85149" strokeWidth="2"/>
      <path d="M210,320 C220,295 255,265 270,240 C290,210 315,185 315,130" fill="none" stroke="#f85149" strokeWidth="2"/>
      
      {/* Chambers */}
      {/* Right Atrium - top right */}
      <ellipse cx="265" cy="115" rx="42" ry="35" fill="#3a0d0d" stroke="#f85149" strokeWidth="2" opacity="0.9"/>
      <text x="265" y="111" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Right</text>
      <text x="265" y="122" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Atrium</text>
      
      {/* Left Atrium - top left */}
      <ellipse cx="150" cy="110" rx="42" ry="33" fill="#1a2a3a" stroke="#58a6ff" strokeWidth="2" opacity="0.9"/>
      <text x="150" y="106" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Left</text>
      <text x="150" y="117" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Atrium</text>
      
      {/* Right Ventricle - bottom right */}
      <ellipse cx="255" cy="215" rx="45" ry="55" fill="#2d0d0d" stroke="#f85149" strokeWidth="2" opacity="0.85"/>
      <text x="255" y="211" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Right</text>
      <text x="255" y="222" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Ventricle</text>
      
      {/* Left Ventricle - bottom left */}
      <ellipse cx="155" cy="215" rx="43" ry="58" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="2.5" opacity="0.9"/>
      <text x="155" y="211" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Left</text>
      <text x="155" y="222" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Ventricle</text>
      
      {/* Septum */}
      <line x1="205" y1="75" x2="205" y2="285" stroke="#d29922" strokeWidth="2.5" strokeDasharray="5,3"/>
      
      {/* Valves */}
      <ellipse cx="205" cy="145" rx="8" ry="5" fill="#d29922" stroke="#d29922"/>
      <text x="205" y="143" textAnchor="middle" fill="#000" fontSize="6" fontWeight="bold">AV</text>
      
      {/* Blood vessels */}
      {/* Aorta */}
      <path d="M145,75 Q130,30 160,15 Q185,5 200,25" fill="none" stroke="#58a6ff" strokeWidth="7" strokeLinecap="round"/>
      {/* Superior Vena Cava */}
      <path d="M280,75 Q290,35 275,20" fill="none" stroke="#f85149" strokeWidth="6" strokeLinecap="round"/>
      {/* Pulmonary artery */}
      <path d="M260,85 Q275,55 295,50 Q315,48 320,65" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      
      {/* SA Node */}
      <circle cx="280" cy="90" r="7" fill="#d29922" stroke="#f0883e" strokeWidth="2"/>
      <text x="280" y="93" textAnchor="middle" fill="#000" fontSize="6" fontWeight="bold">SA</text>

      {/* LABELS */}
      <line x1="140" y1="75" x2="60" y2="45" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="43" fill="#58a6ff" fontSize="11" fontWeight="bold">Aorta</text>
      <line x1="278" y1="20" x2="340" y2="15" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="343" y="19" fill="#f85149" fontSize="11" fontWeight="bold">Sup.Vena Cava</text>
      <line x1="287" y1="90" x2="345" y2="75" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="348" y="79" fill="#d29922" fontSize="11" fontWeight="bold">SA Node</text>
      <line x1="210" y1="145" x2="345" y2="140" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="348" y="144" fill="#d29922" fontSize="11" fontWeight="bold">AV Valve</text>
      <line x1="210" y1="160" x2="340" y2="200" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="343" y="204" fill="#3fb950" fontSize="11" fontWeight="bold">Interventricular</text>
      <text x="343" y="216" fill="#3fb950" fontSize="11" fontWeight="bold">Septum</text>
    </svg>
  )

  const SVG_Neuron = () => (
    <svg viewBox="0 0 500 280" style={{width:'100%',maxWidth:500,height:'auto'}}>
      {/* Dendrites */}
      {[[-40,-35],[-55,-10],[-45,20],[-30,45],[-10,60]].map(([dx,dy],i) =>
        <line key={i} x1="120" y1="140" x2={120+dx} y2={140+dy} stroke="#3fb950" strokeWidth={3-i*0.3} strokeLinecap="round"/>
      )}
      {[[-55,-30],[-65,-5],[-50,25]].map(([dx,dy],i) =>
        <line key={i} x1="80" y1="140" x2={80+dx} y2={140+dy} stroke="#3fb950" strokeWidth="2" strokeLinecap="round"/>
      )}
      {/* Cell body */}
      <ellipse cx="155" cy="140" rx="50" ry="45" fill="#1a2d1a" stroke="#3fb950" strokeWidth="2.5"/>
      {/* Nucleus */}
      <ellipse cx="155" cy="138" rx="22" ry="19" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="2"/>
      <ellipse cx="152" cy="136" rx="8" ry="7" fill="#1f6feb"/>
      <text x="155" y="168" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Cell Body</text>
      {/* Axon hillock */}
      <path d="M198,140 Q215,138 225,140" fill="none" stroke="#bc8cff" strokeWidth="4" strokeLinecap="round"/>
      {/* Axon */}
      <line x1="225" y1="140" x2="430" y2="140" stroke="#bc8cff" strokeWidth="4"/>
      {/* Myelin sheaths */}
      {[240,280,320,360,400].map((x,i) =>
        <rect key={i} x={x} y="129" width="28" height="22" rx="11" fill="#1a1a2d" stroke="#d29922" strokeWidth="2"/>
      )}
      {/* Nodes of Ranvier */}
      {[268,308,348,388].map((x,i) =>
        <line key={i} x1={x} y1="133" x2={x} y2="147" stroke="#58a6ff" strokeWidth="2.5"/>
      )}
      {/* Axon terminal */}
      <path d="M430,140 Q445,125 455,118 M430,140 Q445,138 458,135 M430,140 Q445,152 455,160" fill="none" stroke="#bc8cff" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Synaptic knobs */}
      {[[455,118],[458,135],[455,160]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="6" fill="#bc8cff" opacity="0.8"/>
      )}
      {/* Direction arrow */}
      <path d="M300,110 L340,110 L335,105 M340,110 L335,115" fill="none" stroke="#f0883e" strokeWidth="1.5"/>
      <text x="315" y="106" fill="#f0883e" fontSize="9">impulse →</text>

      {/* LABELS */}
      <text x="45" y="90" fill="#3fb950" fontSize="11" fontWeight="bold">Dendrites</text>
      <line x1="75" y1="95" x2="90" y2="112" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="108" y="60" fill="#58a6ff" fontSize="11" fontWeight="bold">Nucleus</text>
      <line x1="148" y1="120" x2="145" y2="65" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="230" y="170" fill="#d29922" fontSize="11" fontWeight="bold">Myelin Sheath</text>
      <line x1="250" y1="166" x2="250" y2="152" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="270" y="115" fill="#58a6ff" fontSize="11" fontWeight="bold">Node of Ranvier</text>
      <line x1="268" y1="118" x2="268" y2="130" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="440" y="100" fill="#bc8cff" fontSize="11" fontWeight="bold">Synaptic</text>
      <text x="440" y="113" fill="#bc8cff" fontSize="11" fontWeight="bold">Knobs</text>
      <line x1="458" y1="118" x2="452" y2="114" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="230" y="100" fill="#bc8cff" fontSize="11" fontWeight="bold">Axon</text>
    </svg>
  )

  const SVG_Atom = () => (
    <svg viewBox="0 0 380 360" style={{width:'100%',maxWidth:380,height:'auto'}}>
      {/* Electron orbits */}
      <ellipse cx="190" cy="180" rx="160" ry="55" fill="none" stroke="#58a6ff" strokeWidth="1.5" opacity="0.5"/>
      <ellipse cx="190" cy="180" rx="160" ry="55" fill="none" stroke="#58a6ff" strokeWidth="1.5" opacity="0.5" transform="rotate(60,190,180)"/>
      <ellipse cx="190" cy="180" rx="160" ry="55" fill="none" stroke="#58a6ff" strokeWidth="1.5" opacity="0.5" transform="rotate(120,190,180)"/>
      {/* Nucleus */}
      <circle cx="190" cy="180" r="28" fill="#1f1a00" stroke="#d29922" strokeWidth="2"/>
      {/* Protons */}
      {[[180,172],[200,172],[190,188],[180,184],[200,184]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="6" fill="#f85149"/>
      )}
      {/* Neutrons */}
      {[[186,176],[196,176],[184,188],[198,182]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="5.5" fill="#8b949e"/>
      )}
      {/* Electrons on orbits */}
      <circle cx="350" cy="180" r="7" fill="#58a6ff"/>
      <circle cx="110" cy="60" r="7" fill="#58a6ff"/>
      <circle cx="110" cy="300" r="7" fill="#58a6ff"/>
      {/* Labels */}
      <text x="190" y="184" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">NUCLEUS</text>
      <text x="355" y="176" fill="#58a6ff" fontSize="10" fontWeight="bold">e⁻</text>
      <text x="90" y="57" fill="#58a6ff" fontSize="10" fontWeight="bold">e⁻</text>
      <text x="90" y="300" fill="#58a6ff" fontSize="10" fontWeight="bold">e⁻</text>
      <line x1="165" y1="185" x2="60" y2="230" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="228" fill="#f85149" fontSize="11" fontWeight="bold">Proton (+)</text>
      <line x1="190" y1="185" x2="80" y2="280" stroke="#8b949e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="278" fill="#8b949e" fontSize="11" fontWeight="bold">Neutron</text>
      <line x1="350" y1="173" x2="330" y2="130" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="300" y="120" fill="#58a6ff" fontSize="11" fontWeight="bold">Electron (-)</text>
      <text x="100" y="338" fill="#58a6ff" fontSize="11" textAnchor="middle">K shell (max 2e)  L shell (max 8e)</text>
    </svg>
  )

  const SVG_Benzene = () => (
    <svg viewBox="0 0 360 320" style={{width:'100%',maxWidth:360,height:'auto'}}>
      {/* Benzene ring */}
      {[0,1,2,3,4,5].map(i => {
        const a1 = (i*60-90)*Math.PI/180, a2 = ((i+1)*60-90)*Math.PI/180
        const x1=180+80*Math.cos(a1), y1=160+80*Math.sin(a1)
        const x2=180+80*Math.cos(a2), y2=160+80*Math.sin(a2)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bc8cff" strokeWidth="3"/>
      })}
      {/* Inner circle (delocalized electrons) */}
      <circle cx="180" cy="160" r="48" fill="none" stroke="#d29922" strokeWidth="2" strokeDasharray="6,4"/>
      {/* Carbon atoms */}
      {[0,1,2,3,4,5].map(i => {
        const a = (i*60-90)*Math.PI/180
        const x=180+80*Math.cos(a), y=160+80*Math.sin(a)
        return <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#1a0d2d" stroke="#bc8cff" strokeWidth="2"/>
          <text x={x} y={y+4} textAnchor="middle" fill="#bc8cff" fontSize="11" fontWeight="bold">C</text>
        </g>
      })}
      {/* Hydrogen atoms */}
      {[0,1,2,3,4,5].map(i => {
        const a = (i*60-90)*Math.PI/180
        const x=180+118*Math.cos(a), y=160+118*Math.sin(a)
        const lx=180+92*Math.cos(a), ly=160+92*Math.sin(a)
        return <g key={i}>
          <line x1={lx} y1={ly} x2={x} y2={y} stroke="#3fb950" strokeWidth="2"/>
          <circle cx={x} cy={y} r="9" fill="#0d2d0d" stroke="#3fb950" strokeWidth="1.5"/>
          <text x={x} y={y+4} textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">H</text>
        </g>
      })}
      {/* Bond angle label */}
      <text x="180" y="260" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Bond angle: 120°</text>
      <text x="180" y="278" textAnchor="middle" fill="#8b949e" fontSize="11">sp² hybridised carbons</text>
      <text x="180" y="296" textAnchor="middle" fill="#d29922" fontSize="11">Delocalized π electrons</text>
      {/* Labels */}
      <line x1="235" y1="100" x2="290" y2="65" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="293" y="63" fill="#bc8cff" fontSize="11" fontWeight="bold">Carbon (C)</text>
      <line x1="280" y1="118" x2="310" y2="95" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="313" y="93" fill="#3fb950" fontSize="11" fontWeight="bold">Hydrogen (H)</text>
      <line x1="180" y1="112" x2="220" y2="80" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="188" y="72" fill="#d29922" fontSize="10">π electrons</text>
    </svg>
  )

  const SVG_Eye = () => (
    <svg viewBox="0 0 440 300" style={{width:'100%',maxWidth:440,height:'auto'}}>
      {/* Eyeball outer */}
      <ellipse cx="200" cy="150" rx="155" ry="130" fill="#1a1a2d" stroke="#8b949e" strokeWidth="2"/>
      {/* Sclera */}
      <ellipse cx="200" cy="150" rx="152" ry="127" fill="#e8e8e8" opacity="0.08"/>
      {/* Cornea */}
      <path d="M85,90 Q50,150 85,210" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      <path d="M85,90 Q55,150 85,210" fill="rgba(88,166,255,0.08)"/>
      {/* Iris */}
      <circle cx="160" cy="150" r="45" fill="#2d1a00" stroke="#d29922" strokeWidth="2.5"/>
      <circle cx="160" cy="150" r="45" fill="none" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,3"/>
      {/* Pupil */}
      <circle cx="160" cy="150" r="20" fill="#0a0a0a" stroke="#333" strokeWidth="1"/>
      {/* Lens */}
      <ellipse cx="185" cy="150" rx="18" ry="35" fill="rgba(200,220,255,0.15)" stroke="#58a6ff" strokeWidth="2"/>
      {/* Retina */}
      <path d="M330,55 Q360,150 330,245" fill="none" stroke="#3fb950" strokeWidth="4" strokeLinecap="round"/>
      {/* Fovea */}
      <circle cx="335" cy="150" r="8" fill="#3fb950" opacity="0.9"/>
      {/* Optic nerve */}
      <path d="M340,150 Q370,150 430,145" fill="none" stroke="#bc8cff" strokeWidth="6" strokeLinecap="round"/>
      {/* Blind spot */}
      <circle cx="340" cy="185" r="10" fill="#f85149" opacity="0.7"/>
      {/* Aqueous humor */}
      <ellipse cx="122" cy="150" rx="30" ry="55" fill="rgba(88,166,255,0.05)" stroke="rgba(88,166,255,0.2)" strokeWidth="1"/>
      {/* Vitreous humor */}
      <ellipse cx="250" cy="150" rx="80" ry="90" fill="rgba(88,166,255,0.03)" stroke="rgba(88,166,255,0.1)" strokeWidth="1"/>
      {/* Ciliary muscle */}
      <ellipse cx="186" cy="105" rx="8" ry="4" fill="#bc8cff" opacity="0.8"/>
      <ellipse cx="186" cy="195" rx="8" ry="4" fill="#bc8cff" opacity="0.8"/>
      {/* LABELS */}
      <line x1="68" y1="150" x2="20" y2="100" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="96" fill="#58a6ff" fontSize="11" fontWeight="bold">Cornea</text>
      <line x1="160" y1="105" x2="130" y2="55" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="80" y="51" fill="#d29922" fontSize="11" fontWeight="bold">Iris</text>
      <line x1="155" y1="130" x2="140" y2="75" stroke="#333" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="108" y="68" fill="#8b949e" fontSize="11" fontWeight="bold">Pupil</text>
      <line x1="185" y1="115" x2="225" y2="65" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="228" y="63" fill="#58a6ff" fontSize="11" fontWeight="bold">Lens</text>
      <line x1="186" y1="102" x2="240" y2="80" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="238" y="75" fill="#bc8cff" fontSize="11" fontWeight="bold">Ciliary</text>
      <line x1="330" y1="55" x2="370" y2="35" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="373" y="33" fill="#3fb950" fontSize="11" fontWeight="bold">Retina</text>
      <line x1="336" y1="150" x2="400" y2="120" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="403" y="118" fill="#3fb950" fontSize="11" fontWeight="bold">Fovea</text>
      <line x1="340" y1="190" x2="390" y2="210" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="393" y="214" fill="#f85149" fontSize="11" fontWeight="bold">Blind Spot</text>
      <line x1="385" y1="147" x2="410" y2="175" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="413" y="179" fill="#bc8cff" fontSize="11" fontWeight="bold">Optic Nerve</text>
    </svg>
  )

  const SVG_Electromagnet = () => (
    <svg viewBox="0 0 480 280" style={{width:'100%',maxWidth:480,height:'auto'}}>
      {/* Spectrum bar */}
      <defs>
        <linearGradient id="specGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff0000"/>
          <stop offset="15%" stopColor="#ff8800"/>
          <stop offset="30%" stopColor="#ffff00"/>
          <stop offset="45%" stopColor="#00ff00"/>
          <stop offset="60%" stopColor="#0088ff"/>
          <stop offset="75%" stopColor="#4400ff"/>
          <stop offset="90%" stopColor="#8800ff"/>
          <stop offset="100%" stopColor="#cc00ff"/>
        </linearGradient>
      </defs>
      {/* Wavelength visual */}
      {[0,1,2,3,4].map(i => {
        const x = 40 + i*80, amp = 30-i*3, freq = 0.08+i*0.04
        const pts = Array.from({length:80},(_,j) => (x+j)+','+(120+amp*Math.sin(freq*j*Math.PI))).join(' ')
        const colors = ['#f85149','#f0883e','#3fb950','#58a6ff','#bc8cff']
        return <polyline key={i} points={pts} fill="none" stroke={colors[i]} strokeWidth="2.5"/>
      })}
      {/* Spectrum categories */}
      {[
        {x:15,label:'Radio',sub:'>1mm',color:'#f85149'},
        {x:70,label:'Micro',sub:'1mm-1m',color:'#f0883e'},
        {x:155,label:'Infrared',sub:'700nm',color:'#d29922'},
        {x:235,label:'VISIBLE',sub:'400-700nm',color:'#3fb950'},
        {x:315,label:'UV',sub:'10-400nm',color:'#58a6ff'},
        {x:390,label:'X-ray',sub:'0.01nm',color:'#bc8cff'},
        {x:450,label:'γ-ray',sub:'<0.01',color:'#f85149'},
      ].map(({x,label,sub,color}) => (
        <g key={label}>
          <text x={x} y="170" textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{label}</text>
          <text x={x} y="182" textAnchor="middle" fill="#8b949e" fontSize="7">{sub}</text>
        </g>
      ))}
      {/* Visible light detail */}
      <rect x="215" y="190" width="70" height="14" fill="url(#specGrad)" rx="3"/>
      <text x="250" y="202" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">VIBGYOR</text>
      {/* Arrows showing energy */}
      <line x1="10" y1="90" x2="470" y2="90" stroke="#8b949e" strokeWidth="1" strokeDasharray="4,3"/>
      <path d="M460,85 L470,90 L460,95" fill="#8b949e"/>
      <text x="240" y="82" textAnchor="middle" fill="#8b949e" fontSize="10">Increasing Frequency / Energy →</text>
      <path d="M20,95 L10,90 L20,85" fill="#8b949e"/>
      <text x="240" y="72" textAnchor="middle" fill="#8b949e" fontSize="10">← Increasing Wavelength</text>
      {/* c = 3x10^8 label */}
      <rect x="155" y="215" width="170" height="30" rx="6" fill="#1a2235" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="240" y="228" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">c = 3×10⁸ m/s</text>
      <text x="240" y="241" textAnchor="middle" fill="#8b949e" fontSize="9">All EM waves travel at c in vacuum</text>
      <text x="240" y="268" textAnchor="middle" fill="#d29922" fontSize="11" fontWeight="bold">E = hf = hc/λ</text>
    </svg>
  )

  const SVG_Mirror = () => (
    <svg viewBox="0 0 440 280" style={{width:'100%',maxWidth:440,height:'auto'}}>
      {/* Concave mirror */}
      <path d="M60,40 Q20,140 60,240" fill="none" stroke="#d29922" strokeWidth="5" strokeLinecap="round"/>
      <text x="10" y="145" fill="#d29922" fontSize="10" fontWeight="bold">Concave</text>
      <text x="10" y="157" fill="#d29922" fontSize="10" fontWeight="bold">Mirror</text>
      {/* Principal axis */}
      <line x1="60" y1="140" x2="400" y2="140" stroke="#8b949e" strokeWidth="1" strokeDasharray="5,3"/>
      {/* Centre of Curvature C */}
      <circle cx="220" cy="140" r="5" fill="#bc8cff"/>
      <text x="218" y="158" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">C</text>
      {/* Focus F */}
      <circle cx="155" cy="140" r="5" fill="#f0883e"/>
      <text x="153" y="158" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">F</text>
      {/* Pole P */}
      <circle cx="60" cy="140" r="4" fill="#3fb950"/>
      <text x="58" y="158" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">P</text>
      {/* Incident ray 1 - parallel to axis */}
      <line x1="400" y1="80" x2="60" y2="80" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#arr)"/>
      {/* Reflected ray 1 - through F */}
      <line x1="60" y1="80" x2="155" y2="140" stroke="#f85149" strokeWidth="2" strokeDasharray="5,3"/>
      {/* Incident ray 2 - through C */}
      <line x1="400" y1="110" x2="220" y2="140" stroke="#58a6ff" strokeWidth="2"/>
      <line x1="220" y1="140" x2="60" y2="170" stroke="#58a6ff" strokeWidth="2"/>
      <line x1="60" y1="170" x2="155" y2="140" stroke="#f85149" strokeWidth="2" strokeDasharray="5,3"/>
      {/* Image */}
      <line x1="155" y1="100" x2="155" y2="180" stroke="#3fb950" strokeWidth="2" strokeDasharray="3,2"/>
      <text x="155" y="95" textAnchor="middle" fill="#3fb950" fontSize="9">Image</text>
      {/* Object */}
      <line x1="330" y1="90" x2="330" y2="140" stroke="#f0883e" strokeWidth="2.5"/>
      <path d="M325,90 L330,82 L335,90" fill="#f0883e"/>
      <text x="330" y="78" textAnchor="middle" fill="#f0883e" fontSize="9">Object</text>
      {/* Formula box */}
      <rect x="260" y="200" width="165" height="65" rx="8" fill="#1a2235" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="342" y="218" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Mirror Formula</text>
      <text x="342" y="234" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">1/f = 1/v + 1/u</text>
      <text x="342" y="250" textAnchor="middle" fill="#d29922" fontSize="10">m = -v/u = h'/h</text>
      <text x="342" y="262" textAnchor="middle" fill="#8b949e" fontSize="9">New Cartesian sign convention</text>
    </svg>
  )

  // ── NEW 3D-STYLE DIAGRAMS ──────────────────────────────────────

  const SVG_Chloroplast = () => (
    <svg viewBox="0 0 420 360" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="chloroGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a3a1a"/>
          <stop offset="100%" stopColor="#0a1f0a"/>
        </radialGradient>
        <radialGradient id="thylGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1f4a1f"/>
          <stop offset="100%" stopColor="#0d2a0d"/>
        </radialGradient>
      </defs>
      {/* Outer membrane */}
      <ellipse cx="210" cy="180" rx="185" ry="130" fill="url(#chloroGrad)" stroke="#3fb950" strokeWidth="3"/>
      {/* Inner membrane */}
      <ellipse cx="210" cy="180" rx="168" ry="114" fill="none" stroke="#3fb950" strokeWidth="2" strokeDasharray="6,3" opacity="0.7"/>
      {/* Stroma (background fill) */}
      <ellipse cx="210" cy="180" rx="165" ry="111" fill="rgba(16,40,16,0.5)"/>
      {/* Grana stacks (thylakoid discs) */}
      {[
        {cx:130, cy:175, discs:[160,168,176,184,192]},
        {cx:210, cy:165, discs:[148,156,164,172,180,188]},
        {cx:295, cy:180, discs:[158,166,174,182,190]},
      ].map(({cx,discs},gi)=>
        discs.map((cy,i)=>(
          <ellipse key={gi+'-'+i} cx={cx} cy={cy} rx="35" ry="7"
            fill="url(#thylGrad)" stroke="#2ea043" strokeWidth="1.5"/>
        ))
      )}
      {/* Interconnecting lamella */}
      <path d="M165,180 Q185,175 210,172" fill="none" stroke="#2ea043" strokeWidth="1.5" strokeDasharray="4,3"/>
      <path d="M245,180 Q265,177 260,183" fill="none" stroke="#2ea043" strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* Starch grains */}
      <ellipse cx="165" cy="215" rx="14" ry="10" fill="#2d3a1a" stroke="#8b949e" strokeWidth="1.5"/>
      <ellipse cx="260" cy="210" rx="12" ry="9" fill="#2d3a1a" stroke="#8b949e" strokeWidth="1.5"/>
      {/* DNA circle */}
      <ellipse cx="85" cy="155" rx="18" ry="12" fill="none" stroke="#f0883e" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="85" y="159" textAnchor="middle" fill="#f0883e" fontSize="7" fontWeight="bold">cpDNA</text>
      {/* Ribosome dots */}
      {[[320,155],[330,162],[315,168],[325,175]].map(([x,y],i)=>
        <circle key={i} cx={x} cy={y} r="3" fill="#d29922" opacity="0.9"/>
      )}
      {/* LABELS */}
      <line x1="210" y1="50" x2="210" y2="35" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="170" y="30" fill="#3fb950" fontSize="11" fontWeight="bold">Outer Membrane</text>
      <line x1="210" y1="180" x2="80" y2="280" stroke="#2ea043" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="278" fill="#2ea043" fontSize="11" fontWeight="bold">Granum</text>
      <text x="5" y="290" fill="#2ea043" fontSize="9">(Thylakoid stack)</text>
      <line x1="165" y1="218" x2="100" y2="310" stroke="#8b949e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="25" y="314" fill="#8b949e" fontSize="11" fontWeight="bold">Starch Grain</text>
      <line x1="78" y1="143" x2="40" y2="110" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="106" fill="#f0883e" fontSize="11" fontWeight="bold">cpDNA</text>
      <line x1="325" y1="162" x2="370" y2="145" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="373" y="143" fill="#d29922" fontSize="11" fontWeight="bold">Ribosomes</text>
      <text x="210" y="340" textAnchor="middle" fill="#8b949e" fontSize="10">Stroma (fluid matrix)</text>
    </svg>
  )

  const SVG_DNA = () => (
    <svg viewBox="0 0 380 400" style={{width:'100%',maxWidth:380,height:'auto'}}>
      <defs>
        <linearGradient id="strand1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#58a6ff"/>
          <stop offset="100%" stopColor="#1f6feb"/>
        </linearGradient>
        <linearGradient id="strand2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f85149"/>
          <stop offset="100%" stopColor="#b91c1c"/>
        </linearGradient>
      </defs>
      {/* Double helix - backbone curves */}
      {Array.from({length:20},(_,i)=>{
        const y=i*18+20, t=i/3.5
        const x1=190+70*Math.sin(t), x2=190-70*Math.sin(t)
        return <g key={i}>
          <circle cx={x1} cy={y} r="5" fill="url(#strand1)" opacity={0.85+0.15*Math.sin(t)}/>
          <circle cx={x2} cy={y} r="5" fill="url(#strand2)" opacity={0.85+0.15*Math.cos(t)}/>
        </g>
      })}
      {/* Base pairs (rungs) */}
      {Array.from({length:10},(_,i)=>{
        const y=i*36+29, t=i/1.75
        const x1=190+70*Math.sin(t), x2=190-70*Math.sin(t)
        const pairs=[['A','T'],['T','A'],['G','C'],['C','G'],['A','T'],['G','C'],['T','A'],['C','G'],['A','T'],['G','C']]
        const baseCols={'A':'#3fb950','T':'#f0883e','G':'#bc8cff','C':'#58a6ff'}
        const [b1,b2]=pairs[i]
        const mid=(x1+x2)/2
        return <g key={i}>
          <line x1={x1} y1={y} x2={mid-5} y2={y} stroke={baseCols[b1]} strokeWidth="2.5"/>
          <line x1={x2} y1={y} x2={mid+5} y2={y} stroke={baseCols[b2]} strokeWidth="2.5"/>
          <circle cx={mid-8} cy={y} r="7" fill={baseCols[b1]} opacity="0.9"/>
          <circle cx={mid+8} cy={y} r="7" fill={baseCols[b2]} opacity="0.9"/>
          <text x={mid-8} y={y+4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b1}</text>
          <text x={mid+8} y={y+4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b2}</text>
        </g>
      })}
      {/* Backbone lines connecting dots */}
      {Array.from({length:19},(_,i)=>{
        const y1=i*18+20, y2=y1+18, t1=i/3.5, t2=(i+1)/3.5
        return <g key={i}>
          <line x1={190+70*Math.sin(t1)} y1={y1} x2={190+70*Math.sin(t2)} y2={y2} stroke="#58a6ff" strokeWidth="2" opacity="0.5"/>
          <line x1={190-70*Math.sin(t1)} y1={y1} x2={190-70*Math.sin(t2)} y2={y2} stroke="#f85149" strokeWidth="2" opacity="0.5"/>
        </g>
      })}
      {/* Labels */}
      <line x1="262" y1="38" x2="310" y2="20" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="313" y="18" fill="#58a6ff" fontSize="11" fontWeight="bold">5'→3' strand</text>
      <line x1="118" y1="38" x2="65" y2="20" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="18" fill="#f85149" fontSize="11" fontWeight="bold">3'→5' strand</text>
      {/* Legend */}
      <rect x="10" y="335" width="360" height="58" rx="8" fill="rgba(30,40,30,0.6)" stroke="#30363d" strokeWidth="1"/>
      {[['A','#3fb950','Adenine'],['T','#f0883e','Thymine'],['G','#bc8cff','Guanine'],['C','#58a6ff','Cytosine']].map(([b,c,name],i)=>(
        <g key={b}>
          <circle cx={30+i*88} cy={352} r="8" fill={c}/>
          <text x={30+i*88} y={356} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b}</text>
          <text x={30+i*88} y={372} textAnchor="middle" fill={c} fontSize="9">{name}</text>
          <text x={30+i*88} y={384} textAnchor="middle" fill="#8b949e" fontSize="8">{b==='A'?'pairs with T':b==='T'?'pairs with A':b==='G'?'pairs with C':'pairs with G'}</text>
        </g>
      ))}
    </svg>
  )

  const SVG_Kidney = () => (
    <svg viewBox="0 0 420 360" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="kidneyGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3d1515"/>
          <stop offset="100%" stopColor="#200a0a"/>
        </radialGradient>
      </defs>
      {/* Kidney outline */}
      <path d="M80,180 C80,100 120,40 180,40 C220,40 230,70 220,100 C215,120 200,125 195,140 C190,160 205,175 205,195 C205,215 190,225 185,245 C175,275 175,320 140,320 C100,320 80,265 80,180Z"
        fill="url(#kidneyGrad)" stroke="#f85149" strokeWidth="2.5"/>
      {/* Renal pelvis */}
      <path d="M170,150 Q195,155 195,180 Q195,205 170,210 Q150,215 140,190 Q128,165 170,150Z"
        fill="#2d0a0a" stroke="#f0883e" strokeWidth="2"/>
      <text x="167" y="182" textAnchor="middle" fill="#f0883e" fontSize="8" fontWeight="bold">Renal</text>
      <text x="167" y="193" textAnchor="middle" fill="#f0883e" fontSize="8" fontWeight="bold">Pelvis</text>
      {/* Cortex label region */}
      <path d="M100,130 Q115,85 155,65 Q130,130 115,150Z" fill="rgba(248,81,73,0.15)" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      {/* Nephron loop schematic */}
      {[0,1,2].map(i=>(
        <g key={i}>
          <path d={`M${108+i*18},${110+i*5} Q${115+i*18},${145+i*5} ${108+i*18},${180+i*5}`}
            fill="none" stroke="#d29922" strokeWidth="1.5" opacity="0.8"/>
        </g>
      ))}
      {/* Ureter */}
      <path d="M170,210 Q175,265 185,310 Q188,330 200,335" fill="none" stroke="#f0883e" strokeWidth="4" strokeLinecap="round"/>
      {/* Renal artery */}
      <path d="M300,170 Q250,165 205,172" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      {/* Renal vein */}
      <path d="M205,190 Q255,196 305,192" fill="none" stroke="#f85149" strokeWidth="5" strokeLinecap="round"/>
      {/* Medullary pyramids */}
      {[0,1,2].map(i=>(
        <path key={i} d={`M${135+i*15},${155+i*8} L${155+i*10},${188+i*4} L${118+i*18},${195+i*2}Z`}
          fill="rgba(188,60,60,0.25)" stroke="#f85149" strokeWidth="1" opacity="0.8"/>
      ))}
      {/* LABELS */}
      <line x1="145" y1="75" x2="80" y2="50" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="46" fill="#3fb950" fontSize="11" fontWeight="bold">Cortex</text>
      <line x1="130" y1="175" x2="50" y2="175" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="173" fill="#bc8cff" fontSize="11" fontWeight="bold">Medulla</text>
      <line x1="170" y1="215" x2="50" y2="240" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="238" fill="#f0883e" fontSize="11" fontWeight="bold">Renal Pelvis</text>
      <line x1="185" y1="310" x2="210" y2="335" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="213" y="339" fill="#d29922" fontSize="11" fontWeight="bold">Ureter</text>
      <line x1="253" y1="167" x2="280" y2="145" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="283" y="143" fill="#58a6ff" fontSize="11" fontWeight="bold">Renal Artery</text>
      <line x1="255" y1="194" x2="280" y2="215" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="283" y="219" fill="#f85149" fontSize="11" fontWeight="bold">Renal Vein</text>
      <text x="270" y="280" fill="#d29922" fontSize="10" fontWeight="bold">Nephron units</text>
      <text x="270" y="293" fill="#8b949e" fontSize="9">~1 million per kidney</text>
    </svg>
  )

  const SVG_MethaneOrbital = () => (
    <svg viewBox="0 0 380 380" style={{width:'100%',maxWidth:380,height:'auto'}}>
      <defs>
        <radialGradient id="cAtomGrad" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#3d2060"/>
          <stop offset="100%" stopColor="#1a0a30"/>
        </radialGradient>
        <radialGradient id="hAtomGrad" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#103a10"/>
          <stop offset="100%" stopColor="#051505"/>
        </radialGradient>
      </defs>
      {/* Tetrahedral bonds - 3D perspective effect */}
      {/* Bond to top-H */}
      <line x1="190" y1="165" x2="190" y2="60" stroke="#bc8cff" strokeWidth="3" strokeLinecap="round"/>
      {/* Bond to front-left H */}
      <line x1="190" y1="195" x2="85" y2="270" stroke="#bc8cff" strokeWidth="5" strokeLinecap="round"/>
      {/* Bond to front-right H */}
      <line x1="190" y1="195" x2="295" y2="270" stroke="#bc8cff" strokeWidth="5" strokeLinecap="round"/>
      {/* Bond to back H (dashed = behind) */}
      <line x1="190" y1="175" x2="190" y2="300" stroke="#bc8cff" strokeWidth="2" strokeDasharray="6,4" strokeLinecap="round" opacity="0.6"/>
      {/* Electron cloud glow around C */}
      <circle cx="190" cy="185" r="55" fill="rgba(188,140,255,0.07)" stroke="rgba(188,140,255,0.2)" strokeWidth="1" strokeDasharray="4,4"/>
      <circle cx="190" cy="185" r="38" fill="rgba(188,140,255,0.1)" stroke="rgba(188,140,255,0.3)" strokeWidth="1"/>
      {/* sp3 lobes */}
      <ellipse cx="190" cy="125" rx="16" ry="30" fill="rgba(88,166,255,0.15)" stroke="#58a6ff" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="135" cy="240" rx="25" ry="12" fill="rgba(88,166,255,0.15)" stroke="#58a6ff" strokeWidth="1" opacity="0.7" transform="rotate(-35,135,240)"/>
      <ellipse cx="245" cy="240" rx="25" ry="12" fill="rgba(88,166,255,0.15)" stroke="#58a6ff" strokeWidth="1" opacity="0.7" transform="rotate(35,245,240)"/>
      {/* H atoms */}
      <circle cx="190" cy="55" r="22" fill="url(#hAtomGrad)" stroke="#3fb950" strokeWidth="2"/>
      <text x="190" y="60" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">H</text>
      <circle cx="80" cy="272" r="24" fill="url(#hAtomGrad)" stroke="#3fb950" strokeWidth="2"/>
      <text x="80" y="278" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">H</text>
      <circle cx="300" cy="272" r="24" fill="url(#hAtomGrad)" stroke="#3fb950" strokeWidth="2"/>
      <text x="300" y="278" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">H</text>
      <circle cx="190" cy="305" r="22" fill="url(#hAtomGrad)" stroke="#3fb950" strokeWidth="2" opacity="0.75"/>
      <text x="190" y="311" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold" opacity="0.75">H</text>
      {/* Central C atom */}
      <circle cx="190" cy="183" r="32" fill="url(#cAtomGrad)" stroke="#bc8cff" strokeWidth="2.5"/>
      <text x="190" y="189" textAnchor="middle" fill="#bc8cff" fontSize="16" fontWeight="bold">C</text>
      {/* Labels */}
      <rect x="5" y="320" width="370" height="52" rx="8" fill="rgba(20,15,35,0.7)" stroke="#30363d" strokeWidth="1"/>
      <text x="190" y="337" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">CH₄ – Methane: sp³ Hybridisation</text>
      <text x="190" y="352" textAnchor="middle" fill="#8b949e" fontSize="10">Bond angle: 109.5° (tetrahedral geometry)</text>
      <text x="190" y="366" textAnchor="middle" fill="#d29922" fontSize="10">4 equivalent C–H sigma bonds | 4 sp³ hybrid orbitals</text>
    </svg>
  )

  const SVG_WaveOptics = () => (
    <svg viewBox="0 0 480 360" style={{width:'100%',maxWidth:480,height:'auto'}}>
      <defs>
        <linearGradient id="waveGrad1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#58a6ff" stopOpacity="0"/>
          <stop offset="50%" stopColor="#58a6ff"/>
          <stop offset="100%" stopColor="#58a6ff" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {/* Double slit barrier */}
      <rect x="155" y="40" width="12" height="85" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      <rect x="155" y="145" width="12" height="30" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      <rect x="155" y="195" width="12" height="85" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      {/* Slit labels */}
      <text x="153" y="142" textAnchor="end" fill="#d29922" fontSize="10" fontWeight="bold">S₁</text>
      <text x="153" y="200" textAnchor="end" fill="#d29922" fontSize="10" fontWeight="bold">S₂</text>
      {/* Incoming wave (left side) */}
      {[0,1,2,3].map(i=>(
        <line key={i} x1={20+i*32} y1="40" x2={20+i*32} y2="320" stroke="#58a6ff" strokeWidth="1.5" opacity="0.5"/>
      ))}
      <text x="75" y="30" textAnchor="middle" fill="#58a6ff" fontSize="11">Incoming</text>
      <text x="75" y="42" textAnchor="middle" fill="#58a6ff" fontSize="11">Wavefronts</text>
      {/* Circular waves from each slit */}
      {[155,185].map((slitY,si)=>(
        [35,65,95,125].map(r=>(
          <path key={si+'-'+r} d={`M167,${slitY} A${r},${r} 0 0 1 ${167+r},${slitY}`}
            fill="none" stroke={si===0?'#58a6ff':'#f0883e'} strokeWidth="1.5" opacity={1.1-r/130}/>
        ))
      ))}
      {/* Screen */}
      <rect x="370" y="40" width="10" height="280" fill="#1a2235" stroke="#58a6ff" strokeWidth="1.5"/>
      {/* Interference fringe pattern */}
      {[0,1,2,3,4,5,6,7,8].map(i=>{
        const y=80+i*25, brightness=Math.abs(4-i)
        const opacity=brightness===0?1:brightness===1?0.7:brightness===2?0.35:0.1
        return <rect key={i} x="380" y={y-10} width="18" height="20" fill="#58a6ff" opacity={opacity}/>
      })}
      {/* Fringe labels */}
      <text x="403" y="162" fill="#58a6ff" fontSize="9" fontWeight="bold">n=0 (bright)</text>
      <text x="403" y="137" fill="#58a6ff" fontSize="9">n=1</text>
      <text x="403" y="187" fill="#58a6ff" fontSize="9">n=1</text>
      <text x="403" y="112" fill="#8b949e" fontSize="8">n=2</text>
      <text x="403" y="212" fill="#8b949e" fontSize="8">n=2</text>
      {/* Formula box */}
      <rect x="20" y="280" width="120" height="60" rx="6" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="80" y="298" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Fringe Width</text>
      <text x="80" y="315" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">β = λD/d</text>
      <text x="80" y="330" textAnchor="middle" fill="#8b949e" fontSize="8">λ=wavelength, D=distance</text>
      <text x="80" y="341" textAnchor="middle" fill="#8b949e" fontSize="8">d=slit separation</text>
      {/* Annotations */}
      <line x1="167" y1="20" x2="167" y2="35" stroke="#d29922" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="167" y="18" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Double Slit</text>
      <line x1="375" y1="20" x2="375" y2="38" stroke="#3fb950" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="375" y="16" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Screen</text>
      <text x="270" y="355" textAnchor="middle" fill="#bc8cff" fontSize="10">Young's Double Slit Experiment</text>
    </svg>
  )

  const SVG_Digestive = () => (
    <svg viewBox="0 0 400 400" style={{width:'100%',maxWidth:400,height:'auto'}}>
      {/* Oesophagus */}
      <rect x="185" y="20" width="28" height="60" rx="8" fill="#1a2d1a" stroke="#3fb950" strokeWidth="2"/>
      <text x="199" y="54" textAnchor="middle" fill="#3fb950" fontSize="8">Eso-</text>
      <text x="199" y="65" textAnchor="middle" fill="#3fb950" fontSize="8">phagus</text>
      {/* Stomach */}
      <path d="M170,80 Q130,90 125,130 Q118,175 145,195 Q170,210 200,205 Q230,200 235,175 Q240,148 230,125 Q220,90 195,80 Z"
        fill="#2d1a0d" stroke="#f0883e" strokeWidth="2.5"/>
      <text x="178" y="148" textAnchor="middle" fill="#f0883e" fontSize="11" fontWeight="bold">Stomach</text>
      <text x="178" y="162" textAnchor="middle" fill="#f0883e" fontSize="8">pH 1.5–3.5</text>
      {/* Small intestine */}
      <path d="M145,200 Q115,215 110,240 Q105,265 120,280 Q140,295 165,285 Q185,275 190,255 Q195,235 175,225 Q155,215 150,240 Q145,265 160,275 Q175,285 195,275 Q215,265 218,245 Q220,225 205,215 Q188,205 185,220"
        fill="none" stroke="#d29922" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Large intestine */}
      <path d="M218,245 Q225,275 215,310 Q205,340 190,355 Q175,365 160,355 Q135,345 125,315 Q118,290 122,280"
        fill="none" stroke="#bc8cff" strokeWidth="7" strokeLinecap="round"/>
      {/* Liver */}
      <ellipse cx="290" cy="125" rx="50" ry="35" fill="#2d1a00" stroke="#d29922" strokeWidth="2"/>
      <text x="290" y="129" textAnchor="middle" fill="#d29922" fontSize="11" fontWeight="bold">Liver</text>
      {/* Bile duct */}
      <path d="M270,145 Q250,165 230,170" fill="none" stroke="#d29922" strokeWidth="2" strokeDasharray="4,2"/>
      {/* Pancreas */}
      <ellipse cx="265" cy="185" rx="45" ry="18" fill="#1a1a2d" stroke="#58a6ff" strokeWidth="1.5" transform="rotate(-20,265,185)"/>
      <text x="263" y="190" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Pancreas</text>
      {/* Rectum */}
      <path d="M190,355 Q195,375 192,390" fill="none" stroke="#f85149" strokeWidth="4" strokeLinecap="round"/>
      {/* LABELS */}
      <line x1="125" y1="130" x2="55" y2="115" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="113" fill="#f0883e" fontSize="10" fontWeight="bold">HCl + Pepsin</text>
      <text x="5" y="125" fill="#8b949e" fontSize="8">Churning + digestion</text>
      <line x1="160" y1="255" x2="55" y2="255" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="253" fill="#d29922" fontSize="10" fontWeight="bold">Small Intestine</text>
      <text x="5" y="265" fill="#8b949e" fontSize="8">Absorption of nutrients</text>
      <line x1="130" y1="315" x2="55" y2="315" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="313" fill="#bc8cff" fontSize="10" fontWeight="bold">Large Intestine</text>
      <text x="5" y="325" fill="#8b949e" fontSize="8">Water reabsorption</text>
      <line x1="192" y1="390" x2="230" y2="390" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="233" y="394" fill="#f85149" fontSize="10" fontWeight="bold">Rectum / Anus</text>
    </svg>
  )

  const DIAGRAMS = {
    bio: [
      {id:'cell', title:'Animal Cell', color:'var(--bio)', SvgComponent: SVG_AnimalCell,
       parts:['Nucleus - stores DNA, controls cell activity','Cell Membrane - fluid mosaic, phospholipid bilayer','Mitochondria - ATP production, powerhouse of cell','Endoplasmic Reticulum - rough (ribosomes) and smooth','Golgi Apparatus - packaging and secretion of proteins','Lysosomes - contain digestive enzymes (suicide bags)','Ribosomes - protein synthesis (70S prokaryote, 80S eukaryote)','Centriole - cell division, forms spindle fibres'],
       facts:['Cell theory: Schleiden (1838), Schwann (1839), Virchow (1858)','Fluid Mosaic Model proposed by Singer and Nicolson (1972)','Largest organelle: nucleus. Powerhouse: mitochondria']},
      {id:'heart', title:'Human Heart', color:'#f85149', SvgComponent: SVG_Heart,
       parts:['Right Atrium - receives deoxygenated blood from body via vena cava','Right Ventricle - pumps to lungs via pulmonary artery','Left Atrium - receives oxygenated blood from lungs via pulmonary veins','Left Ventricle - pumps to body via aorta, thickest wall','SA Node - pacemaker, generates 72 beats per min','AV Node - delays impulse 0.1s to allow ventricular filling','Aorta - largest artery, exits from left ventricle'],
       facts:['Heart beats 72/min = 100,000 times/day','Cardiac output = Heart rate x Stroke volume = 5L/min','Lubb = AV valves closing; Dupp = semilunar valves closing']},
      {id:'neuron', title:'Neuron Structure', color:'#bc8cff', SvgComponent: SVG_Neuron,
       parts:['Dendrites - receive signals from other neurons','Cell Body (Soma) - contains nucleus and organelles','Axon - carries impulse away from cell body','Myelin Sheath - insulates axon, speeds conduction','Nodes of Ranvier - gaps in myelin, saltatory conduction','Axon Terminal - releases neurotransmitters into synapse'],
       facts:['Myelinated nerves conduct at 70-120 m/s (saltatory conduction)','Unmyelinated nerves conduct at 0.5-2 m/s','Resting potential = -70mV (inside negative vs outside)']},
      {id:'chloroplast', title:'Chloroplast', color:'#2ea043', SvgComponent: SVG_Chloroplast,
       parts:['Outer Membrane - permeable, encloses the organelle','Inner Membrane - semi-permeable, site of fatty acid synthesis','Stroma - fluid matrix where Calvin cycle (dark reactions) occur','Granum - stack of thylakoid discs, contains chlorophyll','Thylakoid Membrane - light reactions occur here (Photosystem I & II)','Starch Grains - store glucose produced by photosynthesis','cpDNA - circular chloroplast DNA (evidence of endosymbiosis)','Ribosomes (70S) - for protein synthesis inside chloroplast'],
       facts:['Chlorophyll absorbs red (680nm) and blue-violet (430nm) light','Light reactions: H2O → O2 + ATP + NADPH (in thylakoid)','Dark reactions (Calvin cycle): CO2 fixed to glucose (in stroma)','One glucose requires 6CO2, 18ATP, 12NADPH']},
      {id:'dna', title:'DNA Double Helix', color:'#58a6ff', SvgComponent: SVG_DNA,
       parts:["Sugar-Phosphate Backbone - alternating deoxyribose and phosphate","Adenine (A) - purine, pairs with Thymine via 2 H-bonds","Thymine (T) - pyrimidine, pairs with Adenine via 2 H-bonds","Guanine (G) - purine, pairs with Cytosine via 3 H-bonds","Cytosine (C) - pyrimidine, pairs with Guanine via 3 H-bonds","5' to 3' directionality - strands are antiparallel","Major and Minor Groove - proteins interact via major groove"],
       facts:["Watson and Crick proposed double helix structure in 1953","Chargaff's rule: A=T and G=C in any double-stranded DNA","Helix pitch = 3.4 nm; base pair spacing = 0.34 nm (10 bp/turn)","GC content is higher in thermophilic organisms (3 H-bonds = more stable)"]},
      {id:'kidney', title:'Human Kidney', color:'#f85149', SvgComponent: SVG_Kidney,
       parts:["Cortex - outer region, contains glomeruli and Bowman's capsule","Medulla - inner region, contains loops of Henle and collecting ducts","Renal Pelvis - funnel-shaped cavity collecting urine","Ureter - tube carrying urine to urinary bladder","Renal Artery - brings oxygenated blood with waste to kidney","Renal Vein - carries filtered blood back to general circulation","Nephron - functional unit (approx 1 million per kidney)"],
       facts:["Glomerular filtration rate (GFR) = 125 mL/min = 180 L/day","Only ~1.5 L of urine is produced daily (99% reabsorbed)","Ultrafiltration occurs at Bowman's capsule under high pressure","ADH from posterior pituitary controls water reabsorption in DCT/CD"]},
      {id:'digestive', title:'Digestive System', color:'#f0883e', SvgComponent: SVG_Digestive,
       parts:['Oesophagus - muscular tube, peristalsis pushes food down','Stomach - pH 1.5-3.5 (HCl); secretes pepsinogen which becomes pepsin','Small Intestine - duodenum/jejunum/ileum; main absorption site','Liver - secretes bile (emulsification of fats), detoxification','Pancreas - secretes digestive enzymes + insulin/glucagon','Large Intestine - water reabsorption, electrolyte balance','Rectum and Anus - storage and elimination of faeces'],
       facts:['Digestion time: stomach 2-4 hrs, small intestine 4-5 hrs, large intestine 12-24 hrs','Bile is stored in gall bladder and released into duodenum','Trypsin, chymotrypsin, lipase, amylase - pancreatic enzymes','Villi and microvilli in small intestine increase surface area ~600x']},
    ],
    chem: [
      {id:'atom', title:'Atom Structure', color:'var(--phys)', SvgComponent: SVG_Atom,
       parts:['Nucleus - contains protons(+) and neutrons(0)','Proton - +1 charge, mass 1 amu, determines atomic number','Neutron - 0 charge, mass 1 amu, determines isotope','Electron - -1 charge, mass 0.0005 amu, in shells','K shell - max 2 electrons (1s2)','L shell - max 8 electrons (2s2 2p6)','M shell - max 18 electrons'],
       facts:['Atomic number = proton count = electron count','Mass number = protons + neutrons','Isotopes: same protons, different neutrons (e.g. C-12, C-14)']},
      {id:'benzene', title:'Benzene C6H6', color:'var(--chem)', SvgComponent: SVG_Benzene,
       parts:['6 Carbon atoms in regular hexagonal ring','Each C is sp2 hybridised - 3 sigma bonds + 1 p orbital','6 C-H sigma bonds - one per carbon atom','Pi electron cloud - 6 delocalized electrons above and below ring','Bond angle - 120 degrees (trigonal planar)','Bond length - 1.40 Angstroms (between single and double)'],
       facts:['Kekule proposed alternating single-double bond structure in 1865','All C-C bonds are equivalent due to resonance/delocalization','Huckel rule: 4n+2 pi electrons = aromatic stability (n=1 gives 6)']},
      {id:'methane', title:'Methane sp³ Orbital', color:'#bc8cff', SvgComponent: SVG_MethaneOrbital,
       parts:['Central Carbon (C) - sp3 hybridized, 4 equivalent hybrid orbitals','4 Hydrogen atoms - placed at corners of a tetrahedron','sp3 Hybrid Orbitals - formed by mixing 1s + 3p orbitals of carbon','C-H Sigma Bonds - formed by overlap of sp3 and H(1s) orbitals','Tetrahedral Geometry - all bond angles exactly 109.5 degrees','Electron Cloud - 4 pairs of bonding electrons, 0 lone pairs'],
       facts:['sp3 hybridisation: one 2s + three 2p orbitals mix to form 4 sp3 orbitals','Bond angle 109.5 degrees; simplest alkane (methane)','Molecular formula CH4, MW = 16 g/mol, non-polar molecule','All four C-H bonds are equivalent - same length (109 pm) and energy']},
    ],
    phys: [
      {id:'eye', title:'Human Eye', color:'var(--phys)', SvgComponent: SVG_Eye,
       parts:['Cornea - transparent, provides most refraction (~40 Dioptre)','Iris - coloured part, controls pupil size in response to light','Pupil - opening, dilates in dim light, constricts in bright','Lens - adjustable curvature, provides fine focus (accommodation)','Retina - contains rods (120M, dim light) and cones (6M, colour)','Fovea - point of maximum acuity, only cones present','Blind Spot - optic disc, no photoreceptors, where optic nerve exits','Optic Nerve - carries visual signals to occipital lobe'],
       facts:['Near point = 25 cm; Far point = infinity for normal eye','Yellow spot = fovea; Blind spot = optic disc','Rods detect dim light; Cones detect colour (3 types: RGB)']},
      {id:'em', title:'Electromagnetic Spectrum', color:'var(--phys)', SvgComponent: SVG_Electromagnet,
       parts:['Radio waves - wavelength greater than 1mm, lowest frequency','Microwaves - 1mm to 1m, used in radar and cooking','Infrared - 700nm to 1mm, heat radiation, remote controls','Visible light - 400 to 700nm, only EM wave visible to human eye','Ultraviolet - 10 to 400nm, causes sunburn, germicidal lamps','X-rays - 0.01 to 10nm, penetrates soft tissue, medical imaging','Gamma rays - less than 0.01nm, highest energy, radioactive decay'],
       facts:['All EM waves travel at c = 3x10^8 m/s in vacuum','Energy E = hf = hc/lambda (higher frequency = higher energy)','VIBGYOR: Violet(400nm) to Red(700nm) in visible spectrum']},
      {id:'mirror', title:'Mirror and Lens Optics', color:'#3fb950', SvgComponent: SVG_Mirror,
       parts:['Concave Mirror - converging, focus in front of mirror (real)','Convex Mirror - diverging, focus behind mirror (virtual)','Mirror Formula: 1/f = 1/v + 1/u (New Cartesian convention)','Magnification m = -v/u = h-prime/h','Focus F - midpoint between pole and centre of curvature','Centre of Curvature C - centre of the sphere of which mirror is part'],
       facts:['For concave mirror: f is negative (New Cartesian)','For convex mirror: f is positive (New Cartesian)','Focal length = R/2 where R is radius of curvature']},
      {id:'waveoptics', title:"Young's Double Slit", color:'#58a6ff', SvgComponent: SVG_WaveOptics,
       parts:['Source (S) - monochromatic coherent light source','Double Slits (S1, S2) - two narrow slits separated by distance d','Wavefronts - circular waves emerging from each slit','Constructive Interference - path difference = nλ → bright fringe','Destructive Interference - path difference = (2n-1)λ/2 → dark fringe','Screen - placed at distance D from double slit','Fringe Width (β) - distance between consecutive bright/dark fringes'],
       facts:['Fringe width β = λD/d (more separation = narrower fringes)','Central maximum (n=0) is brightest; intensity decreases outward','Wavelength of visible light: 400nm (violet) to 700nm (red)','Coherent sources maintain constant phase difference (essential for stable fringes)']},
    ]
  }

  const subColor = {bio:'var(--bio)',chem:'var(--chem)',phys:'var(--phys)'}[activeSub]

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>SVG Diagrams and Visual Study</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Interactive SVG diagrams with labeled parts and NEET key facts</p>
      </div>

      <div className="tabs" style={{marginBottom:20}}>
        {[['bio','Biology'],['chem','Chemistry'],['phys','Physics']].map(([k,l])=>(
          <div key={k} className={"tab"+(activeSub===k?" active":"")}
            style={activeSub===k?{color:subColor,borderBottomColor:subColor}:{}}
            onClick={()=>{setActiveSub(k);setActiveItem(null)}}>{l}</div>
        ))}
      </div>

      {!activeItem?(
        <div className="grid-3">
          {DIAGRAMS[activeSub].map(d=>(
            <div key={d.id} className="card" style={{cursor:'pointer',borderLeft:"3px solid "+d.color,transition:'all .2s'}}
              onClick={()=>{setActiveItem(d);if(logActivity)logActivity("Viewed Diagram: "+d.title,"SVG diagram study")}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor=d.color}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
              <div style={{padding:'20px 0',textAlign:'center'}}>
                <d.SvgComponent/>
              </div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,marginBottom:5,color:d.color}}>{d.title}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>{d.parts.length} labeled parts</div>
              <button className="btn btn-primary btn-sm" style={{width:'100%'}}>Study Diagram</button>
            </div>
          ))}
        </div>
      ):(
        <div className="fade-in">
          <button className="btn btn-ghost btn-sm" style={{marginBottom:16}} onClick={()=>setActiveItem(null)}>Back to Diagrams</button>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'start'}}>
            {/* Left - SVG Diagram */}
            <div className="card" style={{borderTop:"3px solid "+activeItem.color}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16,marginBottom:4,color:activeItem.color}}>{activeItem.title}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:16}}>Hover over parts in the diagram</div>
              <div style={{padding:'10px 0'}}>
                <activeItem.SvgComponent/>
              </div>
            </div>
            {/* Right - Parts + Facts */}
            <div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>Labeled Parts</div>
                {activeItem.parts.map((p,i)=>{
                  const [name,...rest] = p.split(' - ')
                  const desc = rest.join(' - ').trim()
                  return (
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 0',borderBottom:i<activeItem.parts.length-1?'1px solid var(--border)':'none'}}>
                      <span style={{width:22,height:22,borderRadius:'50%',background:activeItem.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:activeItem.color}}>{name.trim()}</div>
                        {desc&&<div style={{fontSize:12,color:'var(--text2)',marginTop:2,lineHeight:1.5}}>{desc}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="card" style={{borderColor:'rgba(88,166,255,.2)',background:'rgba(88,166,255,.04)'}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>Key Facts for NEET</div>
                {activeItem.facts.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:8,padding:'8px 0',borderBottom:i<activeItem.facts.length-1?'1px solid var(--border)':'none'}}>
                    <span style={{width:20,height:20,borderRadius:4,background:'rgba(88,166,255,.15)',color:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</span>
                    <span style={{fontSize:13,color:'var(--text2)',lineHeight:1.5}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default function App() {
  const [loginState,setLoginState] = useState(()=>{try{const s=localStorage.getItem('neet_login');return s?JSON.parse(s):null}catch{return null}})
  const [profile,setProfile] = useState(()=>{try{const s=localStorage.getItem('neet_profile');return s?JSON.parse(s):null}catch{return null}})
  const [onboarded,setOnboarded] = useState(()=>{try{return localStorage.getItem('neet_onboarded')==='true'}catch{return false}})
  const [page,setPage] = useState('home')
  const [sidebarOpen,setSidebarOpen] = useState(true)
  const [showNotif,setShowNotif] = useState(false)
  const [chapterContext,setChapterContext] = useState(null)
  const [activityLog,setActivityLog] = useState([])
  const [totalMinutes,setTotalMinutes] = useState(0)
  const [totalQuestions,setTotalQuestions] = useState(0)
  const [xp,setXp] = useState(0)

  const logActivity = (action, detail) => {
    const now = new Date()
    const time = now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
    const iconMap = {'Started Quiz':'⚡','Completed Quiz':'⚡','Started Mock':'ud83dudcdd','Played':'ud83cudfae','Viewed Diagram':'🔬','AI Mentor Chat':'🤖','Created Note':'📝','Opened AI Mentor':'🤖'}
    const colorMap = {'Started Quiz':'var(--blue)','Completed Quiz':'var(--green)','AI Mentor Chat':'var(--purple)','Viewed Diagram':'var(--orange)','Created Note':'var(--bio)'}
    const entry = {date:'Today',time,action,detail,icon:iconMap[action]||'📌',color:colorMap[action]||'var(--blue)'}
    setActivityLog(prev=>[entry,...prev].slice(0,50))
  }

  const addXP = (n) => setXp(v=>v+n)

  const go = (p) => { setPage(p); setShowNotif(false) }

  const handleLogin = (who) => {
    setLoginState(who)
    try{localStorage.setItem('neet_login',JSON.stringify(who))}catch{}
  }
  const handleLogout = () => {
    setLoginState(null)
    try{localStorage.removeItem('neet_login')}catch{}
  }
  const handleOnboarded = (d) => {
    setProfile(d); setOnboarded(true)
    try{localStorage.setItem('neet_profile',JSON.stringify(d));localStorage.setItem('neet_onboarded','true')}catch{}
  }

  const NAV = [
    {section:'Main',items:[
      {id:'home',icon:'🏠',label:'Dashboard'},
      {id:'syllabus',icon:'📚',label:'Syllabus'},
      {id:'quiz',icon:'⚡',label:'Quiz Engine'},
      {id:'tests',icon:'📝',label:'Mock Tests and PYQs'},
      {id:'games',icon:'🎮',label:'Learning Games'},
      {id:'diagrams',icon:'🔭',label:'3D Diagrams'},
    ]},
    {section:'Progress',items:[
      {id:'analytics',icon:'📊',label:'Analytics'},
      {id:'revision',icon:'🔄',label:'Revision Scheduler'},
      {id:'prediction',icon:'🎯',label:'Score Predictor'},
    ]},
    {section:'Tools',items:[
      {id:'chat',icon:'🤖',label:'AI Mentor'},
      {id:'planner',icon:'📅',label:'Study Planner'},
      {id:'notes',icon:'📝',label:'My Notes'},
    ]},
    {section:'Account',items:[
      {id:'settings',icon:'⚙️',label:'Settings',badge:true},
    ]},
  ]

  const TITLES = {
    home:'Dashboard',syllabus:'Syllabus',quiz:'Quiz Engine',tests:'Mock Tests and PYQs',
    games:'Learning Games',diagrams:'3D Diagrams',analytics:'Analytics',
    revision:'Revision Scheduler',prediction:'Score Predictor',
    chat:'AI Mentor',planner:'Study Planner',notes:'My Notes',settings:'Settings'
  }

  const renderPage = () => {
    switch(page) {
      case 'home':       return <Dashboard setPage={go} profile={profile} logActivity={logActivity}/>
      case 'syllabus':   return <SyllabusPage setPage={go} setChapterContext={setChapterContext} logActivity={logActivity}/>
      case 'quiz':       return <QuizPage chapterContext={chapterContext} clearChapterContext={()=>setChapterContext(null)} logActivity={logActivity} addXP={addXP}/>
      case 'tests':      return <TestsPage setPage={go} logActivity={logActivity}/>
      case 'games':      return <GamesPage setPage={go} logActivity={logActivity} addXP={addXP}/>
      case 'diagrams':   return <DiagramsPage logActivity={logActivity}/>
      case 'analytics':  return <AnalyticsPage/>
      case 'revision':   return <RevisionPage setPage={go}/>
      case 'prediction': return <PredictionPage/>
      case 'chat':       return <ChatPage profile={profile} logActivity={logActivity}/>
      case 'planner':    return <PlannerPage logActivity={logActivity}/>
      case 'notes':      return <NotesPage logActivity={logActivity}/>
      case 'settings':   return <SettingsPage profile={profile} setProfile={setProfile} onLogout={handleLogout}/>
      default:           return <Dashboard setPage={go} profile={profile} logActivity={logActivity}/>
    }
  }

  if(!loginState) return (<><style>{CSS}</style><LoginScreen onLogin={handleLogin}/></>)
  if(loginState==='admin') return (<><style>{CSS}</style><AdminDashboard onLogout={handleLogout} activityLog={activityLog} totalMinutes={totalMinutes} totalQuestions={totalQuestions}/></>)
  if(!onboarded) return (<><style>{CSS}</style><Onboarding onDone={handleOnboarded}/></>)

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Sidebar */}
        <nav style={{width:sidebarOpen?240:0,minHeight:'100vh',background:'var(--card)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,zIndex:100,transition:'width .25s cubic-bezier(.4,0,.2,1)',overflow:'hidden'}}>
          <div style={{padding:'16px 16px 12px',display:'flex',alignItems:'center',gap:10,borderBottom:'1px solid var(--border)',marginBottom:6,flexShrink:0}}>
            <div style={{width:30,height:30,borderRadius:7,background:'linear-gradient(135deg,#58a6ff,#bc8cff)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'#fff',flexShrink:0,fontFamily:'Space Grotesk,sans-serif'}}>N</div>
            <div style={{minWidth:0}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,whiteSpace:'nowrap'}}>NEET Prep AI</div>
              <div style={{fontSize:10,color:'var(--text3)',whiteSpace:'nowrap'}}>Class {profile?.class||11} {'·'} {profile?.stream||'PCB'}</div>
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'0 8px'}}>
            {NAV.map(section=>(
              <div key={section.section} style={{marginBottom:4}}>
                <div style={{fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'.07em',color:'var(--text3)',padding:'8px 8px 4px',whiteSpace:'nowrap'}}>{section.section}</div>
                {section.items.map(item=>(
                  <div key={item.id} onClick={()=>go(item.id)}
                    style={{display:'flex',alignItems:'center',gap:9,padding:'7px 10px',borderRadius:'var(--r)',cursor:'pointer',transition:'all .15s',color:page===item.id?'var(--blue)':'var(--text2)',background:page===item.id?'rgba(88,166,255,.1)':'transparent',fontWeight:page===item.id?600:500,fontSize:13,marginBottom:1,position:'relative',whiteSpace:'nowrap'}}
                    onMouseEnter={e=>{if(page!==item.id){e.currentTarget.style.background='var(--bg3)';e.currentTarget.style.color='var(--text)'}}}
                    onMouseLeave={e=>{if(page!==item.id){e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--text2)'}}}>
                    {page===item.id&&<div style={{position:'absolute',left:0,top:'20%',height:'60%',width:3,background:'var(--blue)',borderRadius:'0 3px 3px 0'}}/>}
                    <span style={{fontSize:15,width:20,textAlign:'center',flexShrink:0}}>{item.icon}</span>
                    <span style={{flex:1}}>{item.label}</span>
                    {item.badge&&<div style={{width:7,height:7,borderRadius:'50%',background:'var(--orange)',flexShrink:0}}/>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{padding:'10px 8px',borderTop:'1px solid var(--border)',flexShrink:0}}>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:'var(--r)',cursor:'pointer',transition:'background .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--bg3)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}
              onClick={()=>go('settings')}>
              <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,color:'#fff',flexShrink:0,fontFamily:'Space Grotesk,sans-serif'}}>{(profile?.name||'P')[0].toUpperCase()}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{profile?.name||'Pallavi'}</div>
                <div style={{fontSize:10,color:'var(--text3)'}}>{xp} XP earned</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div style={{marginLeft:sidebarOpen?240:0,flex:1,minHeight:'100vh',transition:'margin-left .25s'}}>
          {/* Topbar */}
          <div style={{position:'sticky',top:0,zIndex:90,background:'rgba(15,17,23,.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'0 20px',height:54,display:'flex',alignItems:'center',gap:10}}>
            <button onClick={()=>setSidebarOpen(v=>!v)}
              style={{width:32,height:32,borderRadius:'var(--r)',background:'var(--bg3)',border:'1px solid var(--border)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'var(--text2)',transition:'all .15s',flexShrink:0}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text2)'}}>
              {sidebarOpen?'←':'\u2630'}
            </button>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,flex:1}}>{TITLES[page]||'Dashboard'}</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{display:'flex',alignItems:'center',gap:5,background:'rgba(240,136,62,.1)',border:'1px solid rgba(240,136,62,.25)',borderRadius:20,padding:'4px 10px',fontSize:12,fontWeight:600,color:'var(--orange)'}}>
                {'🔥'} 0-day streak
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5,background:'rgba(188,140,255,.1)',border:'1px solid rgba(188,140,255,.25)',borderRadius:20,padding:'4px 10px',fontSize:12,fontWeight:600,color:'var(--purple)'}}>
                {'⚡'} {xp} XP
              </div>
              <div onClick={()=>setShowNotif(v=>!v)}
                style={{width:32,height:32,borderRadius:'var(--r)',background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',position:'relative',transition:'all .15s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border2)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)'}}>
                {'🔔'}
                <div style={{position:'absolute',top:6,right:6,width:7,height:7,borderRadius:'50%',background:'var(--red)',border:'2px solid var(--bg)'}}/>
              </div>
              <div onClick={()=>go('settings')}
                style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--purple))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,color:'#fff',cursor:'pointer',fontFamily:'Space Grotesk,sans-serif'}}>
                {(profile?.name||'P')[0].toUpperCase()}
              </div>
            </div>
          </div>

          {showNotif&&<NotifPanel onClose={()=>setShowNotif(false)}/>}

          {page==='chat'?renderPage():(
            <div style={{maxWidth:1200,width:'100%'}}>{renderPage()}</div>
          )}
        </div>
      </div>
    </>
  )
}