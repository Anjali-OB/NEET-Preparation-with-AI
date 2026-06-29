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
  // ── BIOLOGY CLASS 11 ──
  // Cell: The Unit of Life
  {id:1,sub:"bio",ch:"Cell: The Unit of Life",text:"Which phase of mitosis is characterized by separation of chromatids to opposite poles?",opts:["Prophase","Metaphase","Anaphase","Telophase"],correct:2,diff:"easy",exam:"NEET",year:2022,exp:"During Anaphase, centromeres split and sister chromatids are pulled to opposite poles by spindle fibres."},
  {id:101,sub:"bio",ch:"Cell: The Unit of Life",text:"The Fluid Mosaic Model of cell membrane was proposed by:",opts:["Danielli and Davson","Singer and Nicolson","Watson and Crick","Robertson"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"Singer and Nicolson (1972) proposed the Fluid Mosaic Model - phospholipid bilayer with proteins embedded like mosaic tiles."},
  {id:102,sub:"bio",ch:"Cell: The Unit of Life",text:"Which organelle is called the 'powerhouse of the cell'?",opts:["Nucleus","Ribosome","Mitochondria","Chloroplast"],correct:2,diff:"easy",exam:"NEET",year:2020,exp:"Mitochondria produce ATP via oxidative phosphorylation. They have their own circular DNA and 70S ribosomes."},
  {id:103,sub:"bio",ch:"Cell: The Unit of Life",text:"70S ribosomes are found in:",opts:["Eukaryotic cytoplasm","Prokaryotes and mitochondria","Nucleus only","Golgi body"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"70S ribosomes occur in prokaryotes, mitochondria, and chloroplasts (endosymbiotic origin). Eukaryotic cytoplasm has 80S."},
  {id:104,sub:"bio",ch:"Cell: The Unit of Life",text:"The unit membrane model was given by:",opts:["Singer","Robertson","Danielli","Gorter"],correct:1,diff:"hard",exam:"MHT",year:2021,exp:"J.D. Robertson (1959) proposed the unit membrane model based on electron microscopy - protein-lipid-protein trilayer."},
  {id:105,sub:"bio",ch:"Cell: The Unit of Life",text:"Which cell organelle is the site of protein synthesis?",opts:["Mitochondria","Golgi body","Ribosome","Lysosome"],correct:2,diff:"easy",exam:"NEET",year:2023,exp:"Ribosomes are the sites of protein synthesis (translation). mRNA is translated by ribosomes into polypeptide chains."},
  // Biomolecules
  {id:106,sub:"bio",ch:"Biomolecules",text:"Which bond links amino acids in a protein?",opts:["Glycosidic bond","Peptide bond","Phosphodiester bond","Hydrogen bond"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"Peptide bonds (-CO-NH-) link the carboxyl group of one amino acid to the amino group of the next, forming polypeptides."},
  {id:107,sub:"bio",ch:"Biomolecules",text:"The enzyme that catalyses the first step of glycolysis is:",opts:["Phosphoglucose isomerase","Hexokinase","Phosphofructokinase","Pyruvate kinase"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"Hexokinase phosphorylates glucose to glucose-6-phosphate, the first committed step of glycolysis."},
  {id:108,sub:"bio",ch:"Biomolecules",text:"Starch is a polymer of:",opts:["Fructose","Galactose","Glucose","Mannose"],correct:2,diff:"easy",exam:"MHT",year:2020,exp:"Starch is a polysaccharide made of alpha-glucose units linked by alpha-1,4 (amylose) and alpha-1,6 (amylopectin) glycosidic bonds."},
  {id:109,sub:"bio",ch:"Biomolecules",text:"Which vitamin is water soluble?",opts:["Vitamin A","Vitamin D","Vitamin C","Vitamin K"],correct:2,diff:"easy",exam:"NEET",year:2020,exp:"Vitamin C (ascorbic acid) is water soluble. Vitamins A, D, E, K are fat-soluble."},
  // Cell Cycle and Cell Division
  {id:110,sub:"bio",ch:"Cell Cycle and Cell Division",text:"Crossing over occurs during:",opts:["Leptotene","Zygotene","Pachytene","Diplotene"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Crossing over (exchange of genetic material between non-sister chromatids) occurs during Pachytene of Prophase I of meiosis."},
  {id:111,sub:"bio",ch:"Cell Cycle and Cell Division",text:"The S-phase of cell cycle is associated with:",opts:["Cell growth","DNA replication","Organelle duplication","Cell division"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"S-phase (Synthesis phase) is when DNA replication occurs, duplicating the genome before cell division."},
  {id:112,sub:"bio",ch:"Cell Cycle and Cell Division",text:"Synapsis of homologous chromosomes occurs in:",opts:["Leptotene","Zygotene","Pachytene","Diakinesis"],correct:1,diff:"med",exam:"MHT",year:2022,exp:"Synapsis - pairing of homologous chromosomes by synaptonemal complex - occurs during Zygotene of Prophase I."},
  // Photosynthesis in Higher Plants
  {id:113,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"P700 is the reaction centre of:",opts:["Photosystem I","Photosystem II","Both","Neither"],correct:0,diff:"med",exam:"NEET",year:2022,exp:"P700 is the reaction centre of PS-I absorbing light at 700 nm. P680 belongs to PS-II."},
  {id:114,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"Oxygen evolved during photosynthesis comes from:",opts:["CO2","Water","Glucose","Both CO2 and Water"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Water splitting (photolysis) at PS-II releases O2. Proved by heavy oxygen isotope (O-18) experiments by Ruben and Kamen."},
  {id:115,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"Calvin cycle is also known as:",opts:["Light reactions","Dark reactions","Hill reaction","Blackman reaction"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"Calvin cycle (C3 cycle) occurs in stroma, does not need light directly - called dark reactions or carbon fixation cycle."},
  {id:116,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"In C4 plants, CO2 is first fixed into:",opts:["PGA (3-carbon)","OAA (4-carbon)","RuBP","Glucose"],correct:1,diff:"hard",exam:"NEET",year:2023,exp:"C4 plants (like maize) fix CO2 into oxaloacetate (OAA, 4-carbon) in mesophyll cells via PEP carboxylase."},
  {id:117,sub:"bio",ch:"Photosynthesis in Higher Plants",text:"How many ATP and NADPH are required to fix one CO2 in Calvin cycle?",opts:["2 ATP, 2 NADPH","3 ATP, 2 NADPH","2 ATP, 3 NADPH","3 ATP, 3 NADPH"],correct:1,diff:"hard",exam:"NEET",year:2021,exp:"Fixation of one CO2 requires 3 ATP and 2 NADPH in the Calvin cycle."},
  // Respiration in Plants
  {id:118,sub:"bio",ch:"Respiration in Plants",text:"Net gain of ATP in glycolysis is:",opts:["2 ATP","4 ATP","8 ATP","38 ATP"],correct:0,diff:"easy",exam:"NEET",year:2021,exp:"Glycolysis uses 2 ATP and produces 4 ATP. Net gain is 2 ATP per glucose molecule."},
  {id:119,sub:"bio",ch:"Respiration in Plants",text:"Krebs cycle occurs in:",opts:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Chloroplast"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"Krebs cycle (TCA cycle) occurs in the mitochondrial matrix. It generates NADH, FADH2, and CO2."},
  {id:120,sub:"bio",ch:"Respiration in Plants",text:"RQ (Respiratory Quotient) for carbohydrates is:",opts:["0.7","0.8","1.0","More than 1"],correct:2,diff:"med",exam:"MHT",year:2021,exp:"RQ = CO2 released / O2 consumed. For carbohydrates: C6H12O6 + 6O2 → 6CO2 + 6H2O. RQ = 6/6 = 1.0"},
  // Digestion and Absorption
  {id:121,sub:"bio",ch:"Digestion and Absorption",text:"Digestion of starch begins in:",opts:["Stomach","Small intestine","Mouth","Large intestine"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"Salivary amylase (ptyalin) in the mouth begins starch digestion, breaking it down to maltose."},
  {id:122,sub:"bio",ch:"Digestion and Absorption",text:"Which enzyme converts pepsinogen to pepsin?",opts:["Trypsin","HCl","Enterokinase","Renin"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"HCl (hydrochloric acid) secreted by parietal cells converts inactive pepsinogen to active pepsin in stomach."},
  {id:123,sub:"bio",ch:"Digestion and Absorption",text:"Absorption of fat-soluble vitamins occurs in:",opts:["Stomach","Small intestine","Large intestine","Mouth"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"Fat-soluble vitamins (A, D, E, K) are absorbed along with fats in the small intestine via micelles."},
  // Breathing and Exchange of Gases
  {id:124,sub:"bio",ch:"Breathing and Exchange of Gases",text:"Normal tidal volume in humans is approximately:",opts:["500 mL","1000 mL","2000 mL","4000 mL"],correct:0,diff:"easy",exam:"NEET",year:2020,exp:"Tidal volume is the amount of air inspired/expired in a normal breath - approximately 500 mL."},
  {id:125,sub:"bio",ch:"Breathing and Exchange of Gases",text:"Oxygen is transported in blood mainly as:",opts:["Dissolved in plasma","Oxyhaemoglobin","Carbamino compound","Bicarbonate"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"About 97% of oxygen is transported as oxyhaemoglobin (HbO2). Only ~3% dissolves in plasma."},
  // Body Fluids and Circulation
  {id:126,sub:"bio",ch:"Body Fluids and Circulation",text:"Universal blood donor has blood group:",opts:["A","B","AB","O"],correct:3,diff:"easy",exam:"NEET",year:2020,exp:"O group has no A or B antigens on RBC surface, so it can be donated to any blood group without reaction."},
  {id:127,sub:"bio",ch:"Body Fluids and Circulation",text:"SA node is called pacemaker because:",opts:["It is the largest node","It generates action potentials spontaneously","It is connected to both ventricles","It controls blood pressure"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"SA node (sinoatrial node) generates spontaneous rhythmic electrical impulses (72/min) that initiate the heartbeat."},
  {id:128,sub:"bio",ch:"Body Fluids and Circulation",text:"Which is the correct path of cardiac impulse?",opts:["SA node → AV node → Bundle of His → Purkinje fibres","AV node → SA node → Bundle of His → Purkinje fibres","SA node → Bundle of His → AV node → Purkinje fibres","Purkinje fibres → SA node → AV node → Bundle of His"],correct:0,diff:"med",exam:"MHT",year:2022,exp:"Cardiac impulse: SA node → AV node → Bundle of His → Bundle branches → Purkinje fibres → ventricular muscle."},
  // Excretory Products
  {id:129,sub:"bio",ch:"Excretory Products",text:"Glomerular filtration rate (GFR) in a normal adult is:",opts:["25 mL/min","125 mL/min","250 mL/min","500 mL/min"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Normal GFR is 125 mL/min = 180 L/day. Of this, only about 1.5 L is excreted as urine (99% reabsorbed)."},
  {id:130,sub:"bio",ch:"Excretory Products",text:"The hormone that regulates water reabsorption in collecting duct is:",opts:["Aldosterone","ADH (Vasopressin)","Renin","Angiotensin"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"ADH (Anti-Diuretic Hormone) from posterior pituitary increases permeability of DCT and collecting duct to water."},
  // Neural Control
  {id:131,sub:"bio",ch:"Neural Control and Coordination",text:"Resting membrane potential of a neuron is:",opts:["-90 mV","-70 mV","+70 mV","+40 mV"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Resting potential is -70mV (inside negative relative to outside) maintained by Na+/K+ ATPase pump."},
  {id:132,sub:"bio",ch:"Neural Control and Coordination",text:"The neurotransmitter at neuromuscular junction is:",opts:["Dopamine","Serotonin","Acetylcholine","GABA"],correct:2,diff:"easy",exam:"MHT",year:2021,exp:"Acetylcholine (ACh) is released at neuromuscular junction. It binds nicotinic receptors causing muscle contraction."},
  // Plant Growth
  {id:133,sub:"bio",ch:"Plant Growth and Development",text:"The plant hormone responsible for apical dominance is:",opts:["Auxin","Cytokinin","Gibberellin","Ethylene"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"Auxin produced at shoot apex suppresses lateral bud growth, causing apical dominance. Cytokinin promotes lateral growth."},
  {id:134,sub:"bio",ch:"Plant Growth and Development",text:"Which hormone promotes seed germination and fruit development?",opts:["Auxin","Cytokinin","Gibberellin","Abscisic acid"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Gibberellins promote seed germination by breaking dormancy, stem elongation, and parthenocarpic fruit development."},
  // Biological Classification
  {id:135,sub:"bio",ch:"Biological Classification",text:"Five kingdom classification was proposed by:",opts:["Linnaeus","Whittaker","Haeckel","Copeland"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"R.H. Whittaker (1969) proposed five kingdoms: Monera, Protista, Fungi, Plantae, Animalia."},
  {id:136,sub:"bio",ch:"Biological Classification",text:"Cell wall of fungi is made of:",opts:["Cellulose","Chitin","Peptidoglycan","Pectin"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Fungal cell wall is composed of chitin (N-acetylglucosamine polymer), unlike plant cell walls which have cellulose."},
  // Living World
  {id:137,sub:"bio",ch:"The Living World",text:"Binomial nomenclature was introduced by:",opts:["Charles Darwin","Carolus Linnaeus","Ernst Haeckel","Robert Hooke"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"Carolus Linnaeus introduced binomial nomenclature in Species Plantarum (1753) - giving each organism a genus and species name."},
  // Animal Kingdom
  {id:138,sub:"bio",ch:"Animal Kingdom",text:"Which phylum has a true coelom for the first time in evolution?",opts:["Platyhelminthes","Aschelminthes","Annelida","Mollusca"],correct:2,diff:"hard",exam:"NEET",year:2022,exp:"Annelida (earthworm, leech) has a true schizocoelomate coelom formed by splitting of mesoderm."},
  {id:139,sub:"bio",ch:"Animal Kingdom",text:"Notochord is present in:",opts:["All vertebrates","All chordates throughout life","Only in embryonic stage of some chordates","Invertebrates only"],correct:2,diff:"med",exam:"NEET",year:2021,exp:"Notochord is present in all chordates at some stage. In most vertebrates it's replaced by vertebral column in adults."},
  // Morphology of Flowering Plants
  {id:140,sub:"bio",ch:"Morphology of Flowering Plants",text:"Tap root system is characteristic of:",opts:["Monocots","Dicots","Pteridophytes","Mosses"],correct:1,diff:"easy",exam:"MHT",year:2022,exp:"Dicots have tap root (primary root persists, secondary roots arise from it). Monocots have fibrous root system."},
  // ── BIOLOGY CLASS 12 ──
  // Molecular Basis of Inheritance
  {id:4,sub:"bio",ch:"Molecular Basis of Inheritance",text:"Okazaki fragments on the lagging strand are joined by:",opts:["DNA Pol I","DNA Ligase","DNA Pol III","RNA Primase"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"DNA Ligase seals nicks between Okazaki fragments by forming phosphodiester bonds."},
  {id:141,sub:"bio",ch:"Molecular Basis of Inheritance",text:"Template strand is also called:",opts:["Sense strand","Coding strand","Non-template strand","Antisense strand"],correct:3,diff:"med",exam:"NEET",year:2022,exp:"Template strand = antisense strand = non-coding strand. It serves as template for mRNA synthesis during transcription."},
  {id:142,sub:"bio",ch:"Molecular Basis of Inheritance",text:"Meselson and Stahl experiment proved:",opts:["DNA is double helix","Semi-conservative replication","Conservative replication","Transcription"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Using N-15 labelling, Meselson and Stahl (1958) proved semi-conservative DNA replication - each daughter DNA has one old and one new strand."},
  {id:143,sub:"bio",ch:"Molecular Basis of Inheritance",text:"RNA polymerase in prokaryotes recognizes the:",opts:["Promoter","Terminator","Enhancer","Operator"],correct:0,diff:"hard",exam:"NEET",year:2021,exp:"Sigma factor of RNA polymerase recognizes the promoter sequence (Pribnow box: TATAAT at -10; -35 region) to initiate transcription."},
  // Principles of Inheritance
  {id:10,sub:"bio",ch:"Principles of Inheritance and Variation",text:"Phenotypic ratio in F2 generation of a monohybrid cross:",opts:["1:1","3:1","9:3:3:1","1:2:1"],correct:1,diff:"easy",exam:"NEET",year:2023,exp:"Mendel Law: 3 dominant : 1 recessive phenotype in F2 of monohybrid cross."},
  {id:24,sub:"bio",ch:"Principles of Inheritance and Variation",text:"Genotypic ratio in F2 of monohybrid cross is:",opts:["3:1","1:2:1","9:3:3:1","1:1"],correct:1,diff:"med",exam:"NEET",year:2023,exp:"F2 genotypic ratio is 1 AA : 2 Aa : 1 aa. Phenotypic ratio is 3:1."},
  {id:144,sub:"bio",ch:"Principles of Inheritance and Variation",text:"ABO blood groups show which type of dominance?",opts:["Complete dominance","Incomplete dominance","Codominance","Epistasis"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"ABO blood groups show codominance - both IA and IB alleles are expressed in AB blood group (IAIB)."},
  {id:145,sub:"bio",ch:"Principles of Inheritance and Variation",text:"Colour blindness gene is located on:",opts:["Autosome","X chromosome","Y chromosome","Both X and Y"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"Colour blindness is X-linked recessive. Gene is on X chromosome. More common in males (XY) than females."},
  // Human Reproduction
  {id:25,sub:"bio",ch:"Human Reproduction",text:"Hormone that triggers ovulation is:",opts:["FSH","LH","Estrogen","Progesterone"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"LH surge triggers ovulation on day 14 of menstrual cycle."},
  {id:146,sub:"bio",ch:"Human Reproduction",text:"Corpus luteum secretes:",opts:["Estrogen only","Progesterone only","Both estrogen and progesterone","LH"],correct:2,diff:"med",exam:"NEET",year:2021,exp:"Corpus luteum (formed after ovulation from Graafian follicle) secretes both progesterone (mainly) and estrogen."},
  {id:147,sub:"bio",ch:"Human Reproduction",text:"Fertilization in humans normally occurs in:",opts:["Uterus","Ovary","Fallopian tube","Cervix"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"Fertilization occurs in the ampulla region of the fallopian tube (oviduct). The zygote then moves to the uterus for implantation."},
  // Evolution
  {id:13,sub:"bio",ch:"Evolution",text:"Hardy-Weinberg equilibrium is disturbed by:",opts:["Large population","Random mating","Natural selection","No migration"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Natural selection is one of the factors that disturbs Hardy-Weinberg equilibrium."},
  {id:27,sub:"bio",ch:"Evolution",text:"Analogous organs have:",opts:["Same origin, different function","Different origin, same function","Same origin, same function","Different origin, different function"],correct:1,diff:"hard",exam:"NEET",year:2022,exp:"Analogous organs: different origin, similar function (convergent evolution). E.g. wings of bat and butterfly."},
  {id:148,sub:"bio",ch:"Evolution",text:"Miller-Urey experiment (1953) demonstrated:",opts:["Natural selection","Origin of first cell","Abiogenesis - organic molecules from inorganic","Mutation"],correct:2,diff:"med",exam:"NEET",year:2021,exp:"Miller and Urey simulated early Earth conditions (CH4, H2, NH3, water, electric sparks) and produced amino acids, proving abiogenesis."},
  // Biotechnology
  {id:26,sub:"bio",ch:"Biotechnology: Principles and Processes",text:"Enzyme used to join DNA fragments is:",opts:["Restriction endonuclease","DNA Ligase","DNA Polymerase","Helicase"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"DNA Ligase joins sticky ends of DNA fragments. Restriction enzymes cut DNA."},
  {id:149,sub:"bio",ch:"Biotechnology: Principles and Processes",text:"EcoRI is an example of:",opts:["DNA Ligase","Restriction endonuclease","DNA polymerase","RNA polymerase"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"EcoRI is a Type II restriction endonuclease from E. coli. It recognizes the palindromic sequence GAATTC and cuts between G and A."},
  {id:150,sub:"bio",ch:"Biotechnology: Principles and Processes",text:"PCR uses which enzyme?",opts:["DNA Ligase","Taq polymerase","RNA polymerase","Reverse transcriptase"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"Taq polymerase (from Thermus aquaticus bacterium) is thermostable, so it survives denaturation step (94°C) in PCR."},
  // Human Health and Disease
  {id:16,sub:"bio",ch:"Human Health and Disease",text:"Which is NOT a symptom of AIDS?",opts:["Weight loss","Persistent fever","Hypertension","Opportunistic infections"],correct:2,diff:"easy",exam:"NEET",year:2020,exp:"AIDS causes immune collapse leading to weight loss, fever, diarrhoea. Hypertension is not characteristic."},
  {id:151,sub:"bio",ch:"Human Health and Disease",text:"Which blood cells are destroyed by HIV?",opts:["RBC","Platelets","T-helper cells (CD4+)","B-lymphocytes"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"HIV destroys T-helper (CD4+) lymphocytes, crippling cell-mediated immunity, leading to AIDS."},
  // Ecosystem
  {id:19,sub:"bio",ch:"Ecosystem",text:"The 10% energy law in ecology was given by:",opts:["Lindeman","Odum","Tansley","Elton"],correct:0,diff:"easy",exam:"NEET",year:2021,exp:"Raymond Lindeman (1942) proposed the 10% Law - only about 10% of energy transfers between trophic levels."},
  {id:152,sub:"bio",ch:"Ecosystem",text:"Which ecosystem has the highest primary productivity?",opts:["Desert","Tundra","Tropical rainforest","Open ocean"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Tropical rainforests have the highest net primary productivity due to year-round warmth, sunlight, and rainfall."},
  // Biodiversity
  {id:153,sub:"bio",ch:"Biodiversity and Conservation",text:"India is one of the mega-diversity nations. Which of the following is a biodiversity hotspot in India?",opts:["Gangetic plain","Western Ghats","Thar desert","Deccan plateau"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Western Ghats is one of India's two biodiversity hotspots (other is Eastern Himalayas). It has >30% endemic species."},
  // ── CHEMISTRY CLASS 11 ──
  // Structure of Atom
  {id:200,sub:"chem",ch:"Structure of Atom",text:"Bohr model radius of the nth orbit is proportional to:",opts:["n","n squared","1/n","1/n squared"],correct:1,diff:"easy",exam:"MHT",year:2023,exp:"radius = n² × a₀/Z. Radius grows as n squared. a₀ = 0.529 Å (Bohr radius for H)."},
  {id:201,sub:"chem",ch:"Structure of Atom",text:"de Broglie wavelength of an electron is given by:",opts:["lambda = hv","lambda = h/mv","lambda = h/E","lambda = mv/h"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"de Broglie: lambda = h/p = h/mv. All matter has wave nature. Electrons show this clearly (confirmed by Davisson-Germer)."},
  {id:202,sub:"chem",ch:"Structure of Atom",text:"Which quantum number determines the shape of an orbital?",opts:["Principal (n)","Azimuthal (l)","Magnetic (m)","Spin (s)"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Azimuthal quantum number (l) determines shape: l=0(s, spherical), l=1(p, dumbbell), l=2(d, cloverleaf)."},
  {id:203,sub:"chem",ch:"Structure of Atom",text:"Heisenberg uncertainty principle states:",opts:["Energy is quantised","Position and momentum cannot be measured precisely simultaneously","Electron has dual nature","Orbitals have fixed shapes"],correct:1,diff:"med",exam:"NEET",year:2020,exp:"Delta-x × Delta-p >= h/4pi. It is impossible to know both exact position and momentum of electron simultaneously."},
  // Chemical Bonding
  {id:17,sub:"chem",ch:"Chemical Bonding and Molecular Structure",text:"Shape of PCl5 molecule is:",opts:["Tetrahedral","Square planar","Trigonal bipyramidal","Octahedral"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"PCl5: 5 bond pairs, 0 lone pairs leads to trigonal bipyramidal geometry (VSEPR theory)."},
  {id:28,sub:"chem",ch:"Chemical Bonding and Molecular Structure",text:"Hybridisation of carbon in benzene is:",opts:["sp3","sp2","sp","sp3d"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"In benzene each carbon is sp2 hybridised. The unhybridised p orbital forms the pi delocalized system."},
  {id:204,sub:"chem",ch:"Chemical Bonding and Molecular Structure",text:"Which molecule has maximum bond angle?",opts:["H2O","NH3","CH4","BF3"],correct:3,diff:"hard",exam:"NEET",year:2022,exp:"BF3 is sp2 hybridised, trigonal planar with bond angle 120°. CH4=109.5°, NH3=107°, H2O=104.5°."},
  {id:205,sub:"chem",ch:"Chemical Bonding and Molecular Structure",text:"Bond order of O2 molecule is:",opts:["1","2","3","2.5"],correct:1,diff:"med",exam:"MHT",year:2021,exp:"O2: bond order = (8-4)/2 = 2. It is paramagnetic (2 unpaired electrons) - confirmed by MOT."},
  // Thermodynamics
  {id:11,sub:"chem",ch:"Thermodynamics",text:"For a spontaneous process at constant T and P, Gibbs free energy change must be:",opts:["Positive","Zero","Negative","Equal to enthalpy"],correct:2,diff:"med",exam:"NEET",year:2020,exp:"dG = dH - TdS. Spontaneous means dG < 0. Equilibrium means dG = 0."},
  {id:206,sub:"chem",ch:"Thermodynamics",text:"Enthalpy change at constant volume is equal to:",opts:["dH","dU (internal energy)","dG","dS"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"At constant volume, qv = dU. Enthalpy dH = dU + PdV. At constant volume, dV=0, so qv = dU."},
  {id:207,sub:"chem",ch:"Thermodynamics",text:"Which process has deltaS positive?",opts:["Freezing of water","Dissolution of gas in liquid","Vaporization of liquid","Crystallisation"],correct:2,diff:"easy",exam:"MHT",year:2022,exp:"Vaporization increases disorder (liquid → gas, more freedom of molecules). Therefore deltaS is positive."},
  // Equilibrium
  {id:20,sub:"chem",ch:"Equilibrium",text:"For an endothermic reaction, increasing temperature:",opts:["Shifts equilibrium left","Shifts equilibrium right","Has no effect","Decreases equilibrium constant"],correct:1,diff:"med",exam:"NEET",year:2020,exp:"Le Chatelier: for endothermic reactions (heat as reactant), increasing T shifts equilibrium to products."},
  {id:208,sub:"chem",ch:"Equilibrium",text:"Ka × Kb = ?",opts:["Kw","Kp","1","Kc"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"Ka × Kb = Kw (ionic product of water = 10^-14 at 25°C). This relationship holds for conjugate acid-base pairs."},
  {id:209,sub:"chem",ch:"Equilibrium",text:"Henderson-Hasselbalch equation gives:",opts:["pH of strong acid","pH of buffer","pOH of base","Kw"],correct:1,diff:"med",exam:"MHT",year:2022,exp:"Henderson-Hasselbalch: pH = pKa + log[salt/acid]. Used to calculate pH of buffer solutions."},
  // Organic Chemistry: Basic Principles
  {id:37,sub:"chem",ch:"Organic Chemistry: Basic Principles",text:"Inductive effect is:",opts:["Permanent and through pi bonds","Permanent and through sigma bonds","Temporary effect","Resonance effect"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Inductive effect is a permanent electron displacement through sigma bonds due to electronegativity difference."},
  {id:210,sub:"chem",ch:"Organic Chemistry: Basic Principles",text:"Electrophiles are:",opts:["Electron-rich species","Electron-deficient species","Neutral species","Free radicals"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"Electrophiles (E+) are electron-deficient species that seek electrons. Examples: H+, NO2+, carbocations (R+)."},
  // Hydrocarbons
  {id:40,sub:"chem",ch:"Hydrocarbons",text:"Markovnikov rule is applied to:",opts:["Symmetrical alkenes with HX","Unsymmetrical alkenes with HX","Alkynes only","Alkanes only"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Markovnikov rule: H adds to carbon with more hydrogens, applies to unsymmetrical alkenes with HX addition."},
  {id:211,sub:"chem",ch:"Hydrocarbons",text:"IUPAC name of CH3-CH(CH3)-CH2-CH3 is:",opts:["2-methylbutane","3-methylbutane","2-ethylpropane","Isopentane"],correct:0,diff:"med",exam:"MHT",year:2021,exp:"Longest chain = 4 carbons (butane). CH3 branch on C2. IUPAC name = 2-methylbutane."},
  // ── CHEMISTRY CLASS 12 ──
  // Electrochemistry
  {id:5,sub:"chem",ch:"Electrochemistry",text:"Standard electrode potential of SHE is:",opts:["+1.0 V","-1.0 V","0.0 V","+0.5 V"],correct:2,diff:"easy",exam:"MHT",year:2023,exp:"By convention the SHE is assigned exactly 0.00 V - universal reference electrode."},
  {id:212,sub:"chem",ch:"Electrochemistry",text:"Faraday's first law of electrolysis states:",opts:["m ∝ I","m ∝ It","m ∝ Z","m ∝ E²"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"m = ZIt. Mass deposited is proportional to both current (I) and time (t). Z = electrochemical equivalent."},
  {id:213,sub:"chem",ch:"Electrochemistry",text:"Nernst equation at 298K for 2e- transfer is:",opts:["E = E0 - 0.059 log Q","E = E0 - 0.0295 log Q","E = E0 + 0.059 log Q","E = E0 - 0.059/2 log Q"],correct:1,diff:"hard",exam:"NEET",year:2022,exp:"Nernst: E = E0 - (0.0592/n)logQ. For n=2: E = E0 - 0.0296 logQ ≈ E0 - 0.0295 logQ."},
  // Chemical Kinetics
  {id:2,sub:"chem",ch:"Chemical Kinetics",text:"For a first-order reaction, the half-life is independent of:",opts:["Temperature","Rate constant","Initial concentration","Activation energy"],correct:2,diff:"med",exam:"NEET",year:2023,exp:"Half-life = 0.693/k - depends only on k, not initial concentration. Defining property of first-order kinetics."},
  {id:214,sub:"chem",ch:"Chemical Kinetics",text:"Arrhenius equation gives relationship between rate constant and:",opts:["Concentration","Temperature","Pressure","Volume"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"k = Ae^(-Ea/RT). Arrhenius equation shows k increases exponentially with temperature. Ea = activation energy."},
  {id:215,sub:"chem",ch:"Chemical Kinetics",text:"For zero-order reaction, rate =",opts:["k[A]","k[A]2","k","k[A]0.5"],correct:2,diff:"med",exam:"MHT",year:2021,exp:"For zero-order: rate = k[A]^0 = k. Rate is constant, independent of concentration. Unit of k = mol L⁻¹ s⁻¹."},
  // Solutions
  {id:14,sub:"chem",ch:"Solutions",text:"Which colligative property is used to determine molar mass of polymers?",opts:["Osmotic pressure","Elevation of boiling point","Depression of freezing point","Relative lowering of vapor pressure"],correct:0,diff:"med",exam:"NEET",year:2022,exp:"Osmotic pressure gives measurably large values even at low concentrations, ideal for polymers."},
  {id:216,sub:"chem",ch:"Solutions",text:"Elevation in boiling point is proportional to:",opts:["Molarity","Molality","Mole fraction","Normality"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"ΔTb = Kb × m (molality). Boiling point elevation is a colligative property depending on molality, not molarity."},
  // Coordination Compounds
  {id:8,sub:"chem",ch:"Coordination Compounds",text:"IUPAC name of [Co(NH3)6]3+ is:",opts:["Cobalt hexamine","Hexaamminecobalt(III)","Hexaaminecobalt(III)","Hexaamminocobalt(III)"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"Ligands named before metal; NH3 = ammine; six = hexa; Co3+ = cobalt(III). Hexaamminecobalt(III)."},
  {id:217,sub:"chem",ch:"Coordination Compounds",text:"EAN (Effective Atomic Number) rule was given by:",opts:["Werner","Sidgwick","VSEPR","Lewis"],correct:1,diff:"hard",exam:"NEET",year:2021,exp:"Sidgwick gave the EAN rule. Werner gave coordination theory. EAN = atomic number - oxidation state + 2×no. of ligands."},
  // d and f Block
  {id:29,sub:"chem",ch:"d and f Block Elements",text:"Transition metal with highest melting point:",opts:["Iron","Copper","Tungsten","Chromium"],correct:2,diff:"med",exam:"NEET",year:2023,exp:"Tungsten (W) has highest melting point ~3422°C due to maximum unpaired d-electrons forming strong metallic bonds."},
  {id:218,sub:"chem",ch:"d and f Block Elements",text:"KMnO4 acts as oxidising agent in acidic medium. Mn goes from +7 to:",opts:["+2","+4","0","+6"],correct:0,diff:"med",exam:"NEET",year:2022,exp:"In acidic medium: MnO4⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H2O. Mn changes from +7 to +2."},
  // Polymers
  {id:30,sub:"chem",ch:"Polymers",text:"Nylon-6,6 is an example of:",opts:["Addition polymer","Condensation polymer","Natural polymer","Biopolymer"],correct:1,diff:"easy",exam:"MHT",year:2023,exp:"Nylon-6,6 is condensation polymer from adipic acid + hexamethylenediamine with water elimination."},
  // Haloalkanes
  {id:219,sub:"chem",ch:"Haloalkanes and Haloarenes",text:"SN2 reaction proceeds with:",opts:["Retention of configuration","Inversion of configuration","Racemisation","No change"],correct:1,diff:"hard",exam:"NEET",year:2022,exp:"SN2 is a single-step backside attack with Walden inversion (complete inversion of configuration at chiral centre)."},
  // ── PHYSICS CLASS 11 ──
  // Laws of Motion
  {id:3,sub:"phys",ch:"Laws of Motion",text:"A 2 kg block has coefficient of static friction 0.4. Minimum force to move it (g=10):",opts:["2 N","4 N","8 N","16 N"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"f = μs × mg = 0.4 × 2 × 10 = 8 N. Applied force must exceed maximum static friction."},
  {id:300,sub:"phys",ch:"Laws of Motion",text:"Newton's Second Law in terms of momentum:",opts:["F = mv","F = dp/dt","F = ma","p = Ft"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"F = dp/dt (rate of change of momentum). For constant mass this reduces to F = ma."},
  {id:301,sub:"phys",ch:"Laws of Motion",text:"Impulse equals:",opts:["Force × distance","Force × time","Mass × velocity","Force / time"],correct:1,diff:"easy",exam:"MHT",year:2021,exp:"Impulse = F × Δt = Δp (change in momentum). Unit: N·s = kg·m/s."},
  // Work, Energy and Power
  {id:302,sub:"phys",ch:"Work, Energy and Power",text:"Work done by a force is zero when angle between force and displacement is:",opts:["0°","45°","90°","180°"],correct:2,diff:"easy",exam:"NEET",year:2020,exp:"W = F·d·cosθ. When θ = 90°, cosθ = 0, so W = 0. Example: normal force on horizontal surface."},
  {id:303,sub:"phys",ch:"Work, Energy and Power",text:"A ball of mass 1 kg thrown upward with v=10 m/s. KE at maximum height (g=10):",opts:["50 J","100 J","0 J","25 J"],correct:2,diff:"easy",exam:"MHT",year:2021,exp:"At maximum height, velocity = 0. KE = ½mv² = 0. All KE has converted to PE = mgh = 1×10×5 = 50 J."},
  // Gravitation
  {id:31,sub:"phys",ch:"Gravitation",text:"Escape velocity from Earth surface is approximately:",opts:["7.9 km/s","11.2 km/s","8.0 km/s","16.0 km/s"],correct:1,diff:"med",exam:"NEET",year:2020,exp:"ve = sqrt(2gR) = 11.2 km/s. Minimum speed to escape Earth gravity completely."},
  {id:304,sub:"phys",ch:"Gravitation",text:"Orbital velocity of satellite near Earth surface is:",opts:["11.2 km/s","7.9 km/s","5.6 km/s","3.0 km/s"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"v = sqrt(gR) = sqrt(10 × 6.4×10⁶) ≈ 8 km/s ≈ 7.9 km/s for near-Earth orbit."},
  // Units and Measurements
  {id:38,sub:"phys",ch:"Units and Measurements",text:"Which of these is a dimensionless quantity?",opts:["Velocity","Strain","Force","Pressure"],correct:1,diff:"easy",exam:"MHT",year:2021,exp:"Strain = change in length / original length. Same dimensions cancel → dimensionless."},
  {id:305,sub:"phys",ch:"Units and Measurements",text:"Dimensional formula of Planck's constant is:",opts:["ML²T⁻¹","MLT⁻²","ML²T⁻²","M⁰L⁰T⁰"],correct:0,diff:"hard",exam:"NEET",year:2022,exp:"E = hν → h = E/ν = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]. Same dimensions as angular momentum."},
  // Oscillations
  {id:18,sub:"phys",ch:"Oscillations",text:"Time period of a simple pendulum of length L is:",opts:["2π√(L/g)","2π√(g/L)","π√(L/g)","2√(L/g)"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"T = 2π√(L/g). Period depends on L and g, independent of mass and amplitude for small angles."},
  {id:306,sub:"phys",ch:"Oscillations",text:"In SHM, at equilibrium position, the acceleration is:",opts:["Maximum","Minimum (zero)","Equal to velocity","Infinity"],correct:1,diff:"easy",exam:"MHT",year:2022,exp:"a = -ω²x. At equilibrium x=0, so a=0. At equilibrium, velocity is maximum, acceleration is zero."},
  // Waves
  {id:307,sub:"phys",ch:"Waves",text:"Speed of sound in air at 0°C is approximately:",opts:["232 m/s","332 m/s","432 m/s","532 m/s"],correct:1,diff:"easy",exam:"NEET",year:2020,exp:"Speed of sound in air at 0°C = 332 m/s. Increases by ~0.61 m/s per °C. At 20°C ≈ 344 m/s."},
  {id:308,sub:"phys",ch:"Waves",text:"In standing waves, nodes are points of:",opts:["Maximum displacement","Zero displacement","Maximum velocity","Maximum pressure"],correct:1,diff:"med",exam:"MHT",year:2021,exp:"Nodes are points of zero displacement (destructive interference). Antinodes are points of maximum displacement."},
  // Mechanical Properties
  {id:309,sub:"phys",ch:"Mechanical Properties of Solids",text:"Young's modulus is defined as:",opts:["Stress × Strain","Stress / Strain","Strain / Stress","Force / Area"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"Y = Stress/Strain = (F/A)/(ΔL/L). Unit: Pa (Pascal) or N/m². It measures stiffness of material."},
  // Thermal Properties
  {id:310,sub:"phys",ch:"Thermal Properties of Matter",text:"Stefan's law of radiation states that power emitted is proportional to:",opts:["T","T²","T³","T⁴"],correct:3,diff:"med",exam:"NEET",year:2022,exp:"P = σAT⁴ (Stefan-Boltzmann law). Power radiated is proportional to 4th power of absolute temperature."},
  // Kinetic Theory
  {id:311,sub:"phys",ch:"Kinetic Theory",text:"RMS speed of gas molecules is proportional to:",opts:["√T","T","T²","1/T"],correct:0,diff:"med",exam:"NEET",year:2021,exp:"vrms = √(3RT/M). RMS speed is proportional to √T (square root of absolute temperature)."},
  // ── PHYSICS CLASS 12 ──
  // Electric Charges and Fields
  {id:312,sub:"phys",ch:"Electric Charges and Fields",text:"Electric field inside a conducting sphere is:",opts:["Maximum","Zero","Same as outside","Inversely proportional to r²"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"Inside a conductor (and hollow sphere), electric field is always zero. All charge resides on the surface."},
  {id:313,sub:"phys",ch:"Electric Charges and Fields",text:"Coulomb's law: Force between charges is proportional to:",opts:["r","1/r","r²","1/r²"],correct:3,diff:"easy",exam:"MHT",year:2021,exp:"F = kq₁q₂/r². Force is inversely proportional to square of distance between charges."},
  // Current Electricity
  {id:9,sub:"phys",ch:"Current Electricity",text:"Kirchhoff Current Law (KCL) is based on conservation of:",opts:["Energy","Charge","Momentum","Mass"],correct:1,diff:"easy",exam:"MHT",year:2021,exp:"KCL: sum of all currents at a node = 0. Direct consequence of conservation of electric charge."},
  {id:314,sub:"phys",ch:"Current Electricity",text:"Resistivity of a conductor depends on:",opts:["Length","Cross-sectional area","Temperature","All of above"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Resistivity (ρ) is an intrinsic property depending only on material and temperature, not on geometry (L or A)."},
  {id:315,sub:"phys",ch:"Current Electricity",text:"Wheatstone bridge is balanced when:",opts:["P/Q = R/S","P/Q = S/R","P×Q = R×S","P+Q = R+S"],correct:0,diff:"med",exam:"MHT",year:2022,exp:"Bridge balanced: P/Q = R/S. No current through galvanometer. Used to find unknown resistance accurately."},
  // Moving Charges and Magnetism
  {id:316,sub:"phys",ch:"Moving Charges and Magnetism",text:"Force on a charge q moving with velocity v in magnetic field B is:",opts:["qvB cosθ","qvB sinθ","qvB tanθ","qvB"],correct:1,diff:"easy",exam:"NEET",year:2022,exp:"F = qv × B = qvB sinθ. Force is maximum when velocity is perpendicular to B (θ=90°), zero when parallel."},
  // Electromagnetic Induction
  {id:15,sub:"phys",ch:"Electromagnetic Induction",text:"Lenz law is a consequence of conservation of:",opts:["Charge","Mass","Energy","Momentum"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Lenz law: induced EMF opposes the change causing it - ensures conservation of energy."},
  {id:317,sub:"phys",ch:"Electromagnetic Induction",text:"EMF induced in a coil is given by Faraday's law as:",opts:["e = NdΦ/dt","e = -NdΦ/dt","e = NΦ","e = -Ndφ"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"e = -NdΦ/dt (Faraday-Lenz law). Negative sign shows opposition (Lenz law). N = number of turns, Φ = magnetic flux."},
  // Alternating Current
  {id:35,sub:"phys",ch:"Alternating Current",text:"At resonance in series LCR circuit, impedance is:",opts:["Zero","R only","Maximum","Infinity"],correct:1,diff:"hard",exam:"NEET",year:2023,exp:"At resonance XL = XC, they cancel. Z = R only. Current is maximum at resonance."},
  {id:318,sub:"phys",ch:"Alternating Current",text:"Power factor of a pure inductive circuit is:",opts:["1","0","0.5","Infinity"],correct:1,diff:"med",exam:"MHT",year:2022,exp:"Power factor = cosφ. For pure inductor, φ = 90°, cosφ = 0. No power is dissipated in pure inductor."},
  // Ray Optics
  {id:32,sub:"phys",ch:"Ray Optics and Optical Instruments",text:"Concave mirror with radius 20 cm has focal length:",opts:["20 cm","10 cm","40 cm","5 cm"],correct:1,diff:"easy",exam:"NEET",year:2021,exp:"f = R/2 = 20/2 = 10 cm. Focal length is half the radius of curvature for spherical mirrors."},
  {id:319,sub:"phys",ch:"Ray Optics and Optical Instruments",text:"Total internal reflection occurs when light goes from:",opts:["Rarer to denser medium","Denser to rarer medium at angle > critical angle","Any medium to vacuum","Denser to rarer at any angle"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"TIR occurs when light travels from denser to rarer medium and angle of incidence exceeds critical angle."},
  // Wave Optics
  {id:6,sub:"phys",ch:"Wave Optics",text:"In YDSE, if slit separation d is doubled, fringe width changes how?",opts:["Doubles","Halves","Unchanged","4 times"],correct:1,diff:"hard",exam:"NEET",year:2023,exp:"Fringe width β = λD/d. Doubling d halves fringe width. Inverse proportionality."},
  // Atoms
  {id:12,sub:"phys",ch:"Atoms",text:"In Bohr model, radius of the nth orbit is proportional to:",opts:["n","n squared","1/n","1/n squared"],correct:1,diff:"easy",exam:"MHT",year:2023,exp:"radius = n² × a₀/Z. Radius grows as n squared."},
  {id:320,sub:"phys",ch:"Atoms",text:"Energy of nth orbit in hydrogen atom is:",opts:["E = -13.6/n eV","E = -13.6/n² eV","E = -13.6×n² eV","E = +13.6/n² eV"],correct:1,diff:"med",exam:"NEET",year:2022,exp:"En = -13.6/n² eV. Negative sign means bound state. Ground state (n=1) = -13.6 eV."},
  // Nuclei
  {id:34,sub:"phys",ch:"Nuclei",text:"Half-life is 20 days. Fraction remaining after 60 days:",opts:["1/2","1/4","1/8","1/16"],correct:2,diff:"hard",exam:"NEET",year:2023,exp:"60 days = 3 half-lives. Remaining = (1/2)³ = 1/8."},
  {id:321,sub:"phys",ch:"Nuclei",text:"Mass defect is related to binding energy by:",opts:["BE = Δm × c","BE = Δm × c²","BE = Δm/c²","BE = Δm × c³"],correct:1,diff:"med",exam:"NEET",year:2021,exp:"E = mc². Binding energy = Δm × c² (Einstein's mass-energy equivalence). 1 amu = 931.5 MeV."},
  // Semiconductor Electronics
  {id:33,sub:"phys",ch:"Semiconductor Electronics",text:"In p-type semiconductor, majority carriers are:",opts:["Electrons","Holes","Both equally","Protons"],correct:1,diff:"easy",exam:"MHT",year:2022,exp:"p-type doped with trivalent impurity (acceptor). Majority carriers are holes."},
  {id:322,sub:"phys",ch:"Semiconductor Electronics",text:"In a p-n junction diode, the depletion region has:",opts:["Excess holes","Excess electrons","No free charge carriers","Both holes and electrons"],correct:2,diff:"med",exam:"NEET",year:2022,exp:"Depletion region forms at p-n junction where holes and electrons recombine, leaving no free carriers. Acts as barrier."},
  // Gravitation (12)
  {id:323,sub:"phys",ch:"Gravitation",text:"Kepler's third law states T² is proportional to:",opts:["r","r²","r³","1/r"],correct:2,diff:"med",exam:"NEET",year:2021,exp:"T² ∝ r³ (Kepler's law of periods). Longer orbital radius → longer period. Derived from gravitational force law."},
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
  const [activeChapter, setActiveChapter] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  // ─── SVG COMPONENTS ───────────────────────────────────────────

  const SVG_AnimalCell = () => (
    <svg viewBox="0 0 400 360" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="cellGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1a3a2a"/><stop offset="100%" stopColor="#0d1f17"/>
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="185" rx="185" ry="160" fill="url(#cellGrad)" stroke="#3fb950" strokeWidth="2.5"/>
      <ellipse cx="200" cy="172" rx="62" ry="54" fill="#0d1520" stroke="#58a6ff" strokeWidth="2"/>
      <ellipse cx="203" cy="168" rx="20" ry="14" fill="#0a2030" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="200" y="176" textAnchor="middle" fill="#58a6ff" fontSize="8" fontWeight="bold">Nucleus</text>
      {[
        [88,128,'Mitochondria','#f0883e'],
        [308,128,'Golgi','#d29922'],
        [78,255,'Ribosome','#bc8cff'],
        [318,255,'ER','#3fb950'],
        [188,312,'Lysosome','#f85149'],
        [55,185,'Vacuole','#58a6ff'],
      ].map(([x,y,name,col],i)=>(
        <g key={i}><circle cx={x} cy={y} r="18" fill="rgba(0,0,0,.4)" stroke={col} strokeWidth="1.5"/>
        <text x={x} y={y+4} textAnchor="middle" fill={col} fontSize="7" fontWeight="bold">{name}</text></g>
      ))}
      <text x="200" y="350" textAnchor="middle" fill="#8b949e" fontSize="9">Animal Cell — Eukaryotic; no cell wall or chloroplast</text>
    </svg>
  )

  const SVG_PlantCell = () => (
    <svg viewBox="0 0 400 360" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <rect x="18" y="18" width="364" height="324" rx="8" fill="#0a1a0a" stroke="#3fb950" strokeWidth="4"/>
      <rect x="28" y="28" width="344" height="304" rx="6" fill="#0d2a0d" stroke="#2ea043" strokeWidth="2"/>
      <rect x="75" y="38" width="250" height="55" rx="5" fill="rgba(63,185,80,.12)" stroke="#3fb950" strokeWidth="1.5"/>
      <text x="200" y="62" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Central Vacuole (turgor pressure)</text>
      <ellipse cx="200" cy="190" rx="55" ry="48" fill="#0d1520" stroke="#58a6ff" strokeWidth="2"/>
      <text x="200" y="194" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Nucleus</text>
      {[[88,185,'Chloroplast','#3fb950'],[312,185,'Mitochondria','#f0883e'],[310,275,'ER','#bc8cff'],[90,275,'Ribosome','#d29922']].map(([x,y,n,c],i)=>(
        <g key={i}><ellipse cx={x} cy={y} rx="28" ry="15" fill="rgba(0,0,0,.4)" stroke={c} strokeWidth="1.5"/>
        <text x={x} y={y+4} textAnchor="middle" fill={c} fontSize="7" fontWeight="bold">{n}</text></g>
      ))}
      <text x="200" y="352" textAnchor="middle" fill="#8b949e" fontSize="9">Plant Cell — has cell wall, chloroplast, large central vacuole</text>
    </svg>
  )

  const SVG_Mitosis2 = () => (
    <svg viewBox="0 0 460 300" style={{width:'100%',maxWidth:460,height:'auto'}}>
      {[['Prophase',58,70,'#f0883e'],['Metaphase',168,70,'#d29922'],['Anaphase',278,70,'#3fb950'],['Telophase',388,70,'#58a6ff']].map(([ph,cx,cy,col],i)=>(
        <g key={i}>
          <ellipse cx={cx} cy={cy+70} rx="42" ry="58" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="2"/>
          <text x={cx} y={cy+10} textAnchor="middle" fill={col} fontSize="11" fontWeight="bold">{ph}</text>
          {i===0&&[[-10,-15],[8,-18],[-6,5],[10,10]].map(([dx,dy],j)=><rect key={j} x={cx+dx-5} y={cy+70+dy-3} width="12" height="6" rx="2" fill={col} opacity="0.8"/>)}
          {i===1&&[-15,-8,0,8,15].map((dy,j)=><rect key={j} x={cx-12} y={cy+70+dy-2} width="24" height="5" rx="2" fill={col} opacity="0.8"/>)}
          {i===2&&[-16,-9,0,9,16].map((dy,j)=>[<rect key={'t'+j} x={cx-10} y={cy+52+dy} width="20" height="5" rx="2" fill={col} opacity="0.8"/>,<rect key={'b'+j} x={cx-10} y={cy+95+dy} width="20" height="5" rx="2" fill={col} opacity="0.8"/>])}
          {i===3&&[<ellipse key="a" cx={cx-16} cy={cy+70} rx="20" ry="38" fill="none" stroke={col} strokeWidth="1.5"/>,<ellipse key="b" cx={cx+16} cy={cy+70} rx="20" ry="38" fill="none" stroke={col} strokeWidth="1.5"/>]}
        </g>
      ))}
      <text x="230" y="280" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">PMAT → 2 genetically identical diploid daughter cells</text>
    </svg>
  )

  const SVG_Meiosis2 = () => (
    <svg viewBox="0 0 460 320" style={{width:'100%',maxWidth:460,height:'auto'}}>
      <text x="230" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Meiosis I and II — Produces 4 Haploid Cells</text>
      {[['Prophase I',55,40,'#bc8cff'],['Metaphase I',155,40,'#f0883e'],['Anaphase I',255,40,'#d29922'],['Telophase I',355,40,'#3fb950']].map(([ph,cx,cy,col],i)=>(
        <g key={i}>
          <ellipse cx={cx} cy={cy+70} rx="38" ry="52" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
          <text x={cx} y={cy+8} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold">{ph}</text>
        </g>
      ))}
      <text x="15" y="175" fill="#8b949e" fontSize="8">Meiosis I: Homologs separate. Crossing over in Pachytene (Prophase I)</text>
      <line x1="10" y1="183" x2="450" y2="183" stroke="#30363d" strokeWidth="1" strokeDasharray="4,4"/>
      {[['Prophase II',65,200,'#58a6ff'],['Metaphase II',185,200,'#f85149'],['Anaphase II',305,200,'#3fb950'],['Telophase II',405,200,'#d29922']].map(([ph,cx,cy,col],i)=>(
        <g key={i}>
          <ellipse cx={cx} cy={cy+50} rx="32" ry="44" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
          <text x={cx} y={cy+6} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold">{ph}</text>
        </g>
      ))}
      <text x="15" y="306" fill="#8b949e" fontSize="8">Meiosis II: Sister chromatids separate → 4 haploid cells (gametes)</text>
      <rect x="10" y="312" width="440" height="6" rx="3" fill="rgba(188,140,255,.3)"/>
    </svg>
  )

  const SVG_PlantKingdom2 = () => (
    <svg viewBox="0 0 440 340" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="18" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Plant Kingdom — Evolutionary Classification</text>
      {[
        {n:'Algae (Thallophyta)',y:38,c:'#2ea043',ex:'Chara, Spirogyra',note:'Aquatic; no true organs; no embryo'},
        {n:'Bryophyta',y:95,c:'#3fb950',ex:'Funaria (moss), Marchantia',note:'Amphibians of plant kingdom; no vascular tissue'},
        {n:'Pteridophyta',y:152,c:'#d29922',ex:'Fern (Dryopteris), Equisetum',note:'First vascular plants; seedless; sporophyte dominant'},
        {n:'Gymnosperms',y:209,c:'#f0883e',ex:'Pinus, Cycas, Gnetum',note:'Naked seeds; cones; no fruit; heterosporous'},
        {n:'Angiosperms',y:266,c:'#f85149',ex:'Mango, Rose, Wheat, Maize',note:'Seeds enclosed in fruit; dominant land plants; double fertilization'},
      ].map(({n,y,c,ex,note})=>(
        <g key={y}>
          <rect x="15" y={y} width="410" height="48" rx="6" fill="rgba(0,0,0,.3)" stroke={c} strokeWidth="1.5"/>
          <text x="25" y={y+17} fill={c} fontSize="11" fontWeight="bold">{n}</text>
          <text x="25" y={y+31} fill="#d29922" fontSize="9">e.g. {ex}</text>
          <text x="25" y={y+44} fill="#8b949e" fontSize="8">{note}</text>
        </g>
      ))}
      <text x="220" y="330" textAnchor="middle" fill="#8b949e" fontSize="9">Evolution: Algae → Bryophyta → Pteridophyta → Gymnosperms → Angiosperms</text>
    </svg>
  )

  const SVG_AnimalKingdom = () => (
    <svg viewBox="0 0 440 360" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Animal Kingdom — Major Phyla</text>
      {[
        {p:'Porifera',y:30,c:'#58a6ff',ex:'Sycon, Spongilla',note:'Pore-bearing; canal system; no true tissues'},
        {p:'Coelenterata',y:72,c:'#3fb950',ex:'Hydra, Obelia, Aurelia',note:'Nematocysts; radial symmetry; diploblastic'},
        {p:'Platyhelminthes',y:114,c:'#d29922',ex:'Taenia (tapeworm), Fasciola',note:'Acoelomate; flat body; parasitic mostly'},
        {p:'Aschelminthes',y:156,c:'#f0883e',ex:'Ascaris, Wuchereria',note:'Pseudocoelomate; round body; complete gut'},
        {p:'Annelida',y:198,c:'#bc8cff',ex:'Earthworm, Nereis, Leech',note:'True coelom (schizocoel); metamerism; nephridia'},
        {p:'Arthropoda',y:240,c:'#f85149',ex:'Prawn, Cockroach, Butterfly',note:'Largest phylum; jointed appendages; exoskeleton (chitin)'},
        {p:'Echinodermata',y:282,c:'#58a6ff',ex:'Starfish, Sea urchin',note:'Spiny skin; water vascular system; radial symmetry (adult)'},
        {p:'Chordata',y:324,c:'#3fb950',ex:'Fish, Amphibia, Reptilia, Birds, Mammals',note:'Notochord; dorsal hollow nerve cord; pharyngeal gill slits'},
      ].map(({p,y,c,ex,note})=>(
        <g key={y}>
          <rect x="15" y={y} width="410" height="36" rx="5" fill="rgba(0,0,0,.3)" stroke={c} strokeWidth="1.5"/>
          <text x="25" y={y+13} fill={c} fontSize="10" fontWeight="bold">{p}</text>
          <text x="130" y={y+13} fill="#d29922" fontSize="8">e.g. {ex}</text>
          <text x="25" y={y+28} fill="#8b949e" fontSize="7.5">{note}</text>
        </g>
      ))}
    </svg>
  )

  const SVG_FloweringPlant2 = () => (
    <svg viewBox="0 0 400 370" style={{width:'100%',maxWidth:400,height:'auto'}}>
      <text x="200" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Morphology of Flowering Plant</text>
      <rect x="193" y="170" width="14" height="145" rx="4" fill="#2ea043" stroke="#3fb950" strokeWidth="1.5"/>
      <path d="M200,315 Q185,338 172,355 M200,315 Q215,338 228,355 M200,315 Q200,345 200,360 M200,328 Q168,348 158,364 M200,328 Q232,348 242,364" fill="none" stroke="#d29922" strokeWidth="2"/>
      <ellipse cx="158" cy="240" rx="36" ry="14" fill="#1a3a1a" stroke="#3fb950" strokeWidth="1.5" transform="rotate(-32,158,240)"/>
      <ellipse cx="242" cy="255" rx="36" ry="14" fill="#1a3a1a" stroke="#3fb950" strokeWidth="1.5" transform="rotate(32,242,255)"/>
      {[0,60,120,180,240,300].map((angle,i)=>(
        <ellipse key={i} cx={200+38*Math.cos(angle*Math.PI/180)} cy={148+26*Math.sin(angle*Math.PI/180)} rx="17" ry="11" fill="#f85149" stroke="#d29922" strokeWidth="1" transform={`rotate(${angle},${200+38*Math.cos(angle*Math.PI/180)},${148+26*Math.sin(angle*Math.PI/180)})`} opacity="0.85"/>
      ))}
      <circle cx="200" cy="148" r="19" fill="#d29922" stroke="#f0883e" strokeWidth="2"/>
      <text x="200" y="152" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Receptacle</text>
      <line x1="200" y1="130" x2="200" y2="95" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="200" y="90" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Flower (calyx, corolla, stamen, pistil)</text>
      <line x1="152" y1="235" x2="75" y2="218" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="25" y="215" fill="#3fb950" fontSize="9">Leaf (lamina + petiole)</text>
      <line x1="200" y1="245" x2="335" y2="218" stroke="#2ea043" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="338" y="216" fill="#2ea043" fontSize="9">Stem (node + internode)</text>
      <line x1="200" y1="336" x2="335" y2="330" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="338" y="328" fill="#d29922" fontSize="9">Tap Root (dicot)</text>
      <text x="200" y="362" textAnchor="middle" fill="#8b949e" fontSize="9">Dicot: tap root, reticulate venation, 4-5 floral parts, 2 cotyledons</text>
    </svg>
  )

  const SVG_AnatomyStem2 = () => (
    <svg viewBox="0 0 400 360" style={{width:'100%',maxWidth:400,height:'auto'}}>
      <text x="200" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">T.S. of Dicot Stem</text>
      <circle cx="200" cy="192" r="152" fill="#0d1a0d" stroke="#3fb950" strokeWidth="3"/>
      <circle cx="200" cy="192" r="138" fill="#0a1a0a" stroke="#2ea043" strokeWidth="2"/>
      <circle cx="200" cy="192" r="98" fill="#061206" stroke="#d29922" strokeWidth="1.5"/>
      <circle cx="200" cy="192" r="48" fill="#080808" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="200" y="196" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Pith</text>
      {[0,45,90,135,180,225,270,315].map((angle,i)=>(
        <ellipse key={i} cx={200+73*Math.cos(angle*Math.PI/180)} cy={192+73*Math.sin(angle*Math.PI/180)} rx="11" ry="8" fill="#f0883e" stroke="#d29922" strokeWidth="1" transform={`rotate(${angle},${200+73*Math.cos(angle*Math.PI/180)},${192+73*Math.sin(angle*Math.PI/180)})`}/>
      ))}
      <line x1="200" y1="42" x2="200" y2="24" stroke="#3fb950" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="200" y="20" textAnchor="middle" fill="#3fb950" fontSize="9">Epidermis + Cuticle</text>
      <line x1="278" y1="98" x2="318" y2="76" stroke="#2ea043" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="320" y="74" fill="#2ea043" fontSize="9">Cortex (parenchyma)</text>
      <line x1="258" y1="150" x2="310" y2="138" stroke="#d29922" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="312" y="136" fill="#d29922" fontSize="9">Endodermis</text>
      <line x1="262" y1="170" x2="320" y2="168" stroke="#f0883e" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="322" y="171" fill="#f0883e" fontSize="9">Vascular Bundle</text>
      <text x="200" y="350" textAnchor="middle" fill="#8b949e" fontSize="9">Ring arrangement of VBs in dicot stem (scattered in monocot)</text>
    </svg>
  )

  const SVG_Earthworm = () => (
    <svg viewBox="0 0 440 280" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Earthworm — Pheretima posthuma</text>
      <ellipse cx="220" cy="148" rx="192" ry="75" fill="#1a0d00" stroke="#d29922" strokeWidth="2.5"/>
      {[60,88,116,144,172,200,228,256,284,312,340,368].map(x=>(
        <line key={x} x1={x} y1="95" x2={x} y2="200" stroke="#d29922" strokeWidth="0.8" opacity="0.35"/>
      ))}
      <ellipse cx="48" cy="148" r="26" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
      <text x="48" y="152" textAnchor="middle" fill="#f0883e" fontSize="8" fontWeight="bold">Mouth</text>
      <rect x="78" y="134" width="38" height="26" rx="4" fill="#2d0a0a" stroke="#f85149" strokeWidth="1.5"/>
      <text x="97" y="150" textAnchor="middle" fill="#f85149" fontSize="7">Pharynx</text>
      <rect x="124" y="136" width="48" height="22" rx="4" fill="#1a1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="148" y="150" textAnchor="middle" fill="#58a6ff" fontSize="7">Oesophagus</text>
      <rect x="180" y="133" width="34" height="28" rx="4" fill="#2d2d00" stroke="#d29922" strokeWidth="1.5"/>
      <text x="197" y="150" textAnchor="middle" fill="#d29922" fontSize="7">Gizzard</text>
      <rect x="222" y="133" width="128" height="28" rx="4" fill="#0d2d0d" stroke="#3fb950" strokeWidth="1.5"/>
      <text x="286" y="150" textAnchor="middle" fill="#3fb950" fontSize="7">Intestine (Typhlosole inside)</text>
      <ellipse cx="388" cy="148" rx="20" ry="17" fill="#1a0d00" stroke="#d29922" strokeWidth="1.5"/>
      <text x="388" y="152" textAnchor="middle" fill="#d29922" fontSize="7">Anus</text>
      <line x1="128" y1="105" x2="128" y2="78" stroke="#bc8cff" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="128" y="74" textAnchor="middle" fill="#bc8cff" fontSize="8">Clitellum (seg 14-16)</text>
      <text x="220" y="268" textAnchor="middle" fill="#8b949e" fontSize="9">100-120 segments | Metamerically segmented | Nephridia = excretory organs</text>
    </svg>
  )

  const SVG_Chloroplast2 = () => (
    <svg viewBox="0 0 420 340" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="chlG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a3a1a"/><stop offset="100%" stopColor="#0a1f0a"/>
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="170" rx="183" ry="125" fill="url(#chlG)" stroke="#3fb950" strokeWidth="3"/>
      <ellipse cx="210" cy="170" rx="167" ry="110" fill="none" stroke="#3fb950" strokeWidth="2" strokeDasharray="6,3" opacity="0.7"/>
      {[[128,165],[210,155],[295,170]].map(([cx,discs],_,arr)=>
        [0,1,2,3,4,5].map(i=>(
          <ellipse key={cx+i} cx={cx} cy={discs+i*16} rx="34" ry="6" fill="#0d2a0d" stroke="#2ea043" strokeWidth="1.5"/>
        ))
      )}
      <path d="M162,172 Q185,167 210,163" fill="none" stroke="#2ea043" strokeWidth="1.5" strokeDasharray="4,3"/>
      <path d="M244,172 Q268,170 263,176" fill="none" stroke="#2ea043" strokeWidth="1.5" strokeDasharray="4,3"/>
      <ellipse cx="162" cy="210" rx="14" ry="10" fill="#2d3a1a" stroke="#8b949e" strokeWidth="1.5"/>
      <ellipse cx="258" cy="205" rx="12" ry="9" fill="#2d3a1a" stroke="#8b949e" strokeWidth="1.5"/>
      <ellipse cx="83" cy="148" rx="18" ry="12" fill="none" stroke="#f0883e" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="83" y="152" textAnchor="middle" fill="#f0883e" fontSize="7" fontWeight="bold">cpDNA</text>
      {[[318,148],[328,155],[313,162],[323,169]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3" fill="#d29922" opacity="0.9"/>
      ))}
      <line x1="210" y1="47" x2="210" y2="30" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="168" y="26" fill="#3fb950" fontSize="9" fontWeight="bold">Outer Membrane</text>
      <line x1="210" y1="172" x2="78" y2="268" stroke="#2ea043" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="268" fill="#2ea043" fontSize="9" fontWeight="bold">Granum (thylakoid stack)</text>
      <line x1="83" y1="136" x2="38" y2="108" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="104" fill="#f0883e" fontSize="9" fontWeight="bold">cpDNA</text>
      <line x1="322" y1="155" x2="370" y2="138" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="372" y="136" fill="#d29922" fontSize="9" fontWeight="bold">Ribosomes (70S)</text>
      <text x="210" y="328" textAnchor="middle" fill="#8b949e" fontSize="9">Stroma = Calvin cycle | Thylakoid membrane = Light reactions</text>
    </svg>
  )

  const SVG_Mitochondria2 = () => (
    <svg viewBox="0 0 440 300" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <defs>
        <radialGradient id="mitoG" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#2a1a0a"/><stop offset="100%" stopColor="#150900"/>
        </radialGradient>
      </defs>
      <ellipse cx="220" cy="150" rx="193" ry="115" fill="url(#mitoG)" stroke="#f0883e" strokeWidth="3"/>
      <path d="M30,150 Q55,132 80,150 Q105,168 130,150 Q155,132 180,150 Q205,168 230,150 Q255,132 280,150 Q305,168 330,150 Q355,132 380,150 Q400,158 410,150"
        fill="none" stroke="#d29922" strokeWidth="2" opacity="0.8"/>
      {[0,1,2,3,4].map(i=>(
        <path key={i} d={`M${82+i*64},98 Q${92+i*64},128 ${82+i*64},155 Q${72+i*64},182 ${82+i*64},210`}
          fill="none" stroke="#d29922" strokeWidth="2.5" opacity="0.9"/>
      ))}
      <ellipse cx="220" cy="150" rx="172" ry="94" fill="rgba(30,18,5,0.45)" stroke="none"/>
      {[58,115,172,228,285,342].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy={165} r="5" fill="#3fb950" opacity="0.9"/>
          <line x1={x} y1="158" x2={x} y2="174" stroke="#3fb950" strokeWidth="2"/>
          <circle cx={x} cy={152} r="4" fill="#2ea043" opacity="0.8"/>
        </g>
      ))}
      {[[173,138],[198,148],[223,138],[248,148],[193,123],[233,123]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#bc8cff" opacity="0.8"/>
      ))}
      <ellipse cx="143" cy="172" rx="21" ry="14" fill="none" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="143" y="176" textAnchor="middle" fill="#58a6ff" fontSize="7" fontWeight="bold">mtDNA</text>
      <line x1="220" y1="37" x2="220" y2="22" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="128" y="18" fill="#f0883e" fontSize="9" fontWeight="bold">Outer Membrane</text>
      <line x1="198" y1="150" x2="96" y2="255" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="8" y="260" fill="#d29922" fontSize="9" fontWeight="bold">Cristae (ETC + ATP Synthase)</text>
      <line x1="143" y1="158" x2="58" y2="138" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="136" fill="#58a6ff" fontSize="9" fontWeight="bold">mtDNA (circular)</text>
      <line x1="238" y1="152" x2="340" y2="108" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="342" y="106" fill="#3fb950" fontSize="9" fontWeight="bold">ATP Synthase (F0F1)</text>
      <text x="220" y="290" textAnchor="middle" fill="#8b949e" fontSize="9">Matrix = Krebs cycle | Inner membrane = ETC + oxidative phosphorylation</text>
    </svg>
  )

  const SVG_Nephron2 = () => (
    <svg viewBox="0 0 420 390" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <circle cx="178" cy="58" r="29" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
      {[0,60,120,180,240,300].map((angle,i)=>(
        <ellipse key={i} cx={178+18*Math.cos(angle*Math.PI/180)} cy={58+18*Math.sin(angle*Math.PI/180)} rx="7" ry="5" fill="#3d1010" stroke="#f85149" strokeWidth="1" transform={`rotate(${angle},${178+18*Math.cos(angle*Math.PI/180)},${58+18*Math.sin(angle*Math.PI/180)})`}/>
      ))}
      <text x="178" y="62" textAnchor="middle" fill="#f85149" fontSize="7" fontWeight="bold">Glomerulus</text>
      <circle cx="178" cy="58" r="46" fill="none" stroke="#f0883e" strokeWidth="2" strokeDasharray="5,3"/>
      <path d="M78,40 Q118,34 150,52" fill="none" stroke="#f85149" strokeWidth="5" strokeLinecap="round"/>
      <text x="48" y="36" fill="#f85149" fontSize="8">Afferent</text>
      <path d="M206,52 Q232,38 268,48" fill="none" stroke="#58a6ff" strokeWidth="4" strokeLinecap="round"/>
      <text x="270" y="46" fill="#58a6ff" fontSize="8">Efferent</text>
      <path d="M178,104 Q218,118 228,142 Q238,168 208,178 Q178,188 173,208" fill="none" stroke="#3fb950" strokeWidth="4" strokeLinecap="round"/>
      <path d="M173,208 Q163,248 168,286 Q173,322 183,337" fill="none" stroke="#d29922" strokeWidth="4" strokeLinecap="round"/>
      <path d="M183,337 Q198,320 208,286 Q216,248 213,208" fill="none" stroke="#bc8cff" strokeWidth="4" strokeLinecap="round"/>
      <path d="M213,208 Q238,193 248,168 Q253,143 233,128 Q213,116 198,123" fill="none" stroke="#f0883e" strokeWidth="4" strokeLinecap="round"/>
      <path d="M213,208 Q278,228 308,268 Q328,292 323,337" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      <line x1="146" y1="58" x2="58" y2="78" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="76" fill="#f0883e" fontSize="9" fontWeight="bold">Bowman's Capsule</text>
      <line x1="220" y1="152" x2="308" y2="142" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="310" y="140" fill="#3fb950" fontSize="9" fontWeight="bold">PCT</text>
      <text x="310" y="152" fill="#8b949e" fontSize="7">Reabsorption</text>
      <line x1="170" y1="266" x2="78" y2="266" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="5" y="264" fill="#d29922" fontSize="9" fontWeight="bold">Loop of Henle</text>
      <text x="5" y="276" fill="#bc8cff" fontSize="7">Desc(H2O) / Asc(salt)</text>
      <line x1="240" y1="152" x2="308" y2="168" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="310" y="166" fill="#f0883e" fontSize="9" fontWeight="bold">DCT</text>
      <text x="310" y="178" fill="#8b949e" fontSize="7">ADH + Aldosterone</text>
      <line x1="308" y1="295" x2="358" y2="295" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="360" y="293" fill="#58a6ff" fontSize="9" fontWeight="bold">Collecting Duct</text>
      <text x="200" y="382" textAnchor="middle" fill="#8b949e" fontSize="9">GFR = 125 mL/min | 180 L filtered → only 1.5 L urine (99% reabsorbed)</text>
    </svg>
  )

  const SVG_HeartFull = () => (
    <svg viewBox="0 0 420 390" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <defs>
        <radialGradient id="hG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#200a0a"/><stop offset="100%" stopColor="#100505"/>
        </radialGradient>
      </defs>
      <path d="M210,335 Q108,275 78,205 Q48,145 78,107 Q108,68 143,78 Q173,86 210,118 Q247,86 277,78 Q312,68 342,107 Q372,145 342,205 Q312,275 210,335Z" fill="url(#hG)" stroke="#f85149" strokeWidth="3"/>
      <line x1="210" y1="103" x2="210" y2="292" stroke="#f85149" strokeWidth="3"/>
      <line x1="98" y1="192" x2="322" y2="192" stroke="#d29922" strokeWidth="2" strokeDasharray="5,3"/>
      <text x="143" y="152" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Right Atrium</text>
      <text x="143" y="166" textAnchor="middle" fill="#8b949e" fontSize="8">deoxygenated blood</text>
      <text x="278" y="152" textAnchor="middle" fill="#f85149" fontSize="11" fontWeight="bold">Left Atrium</text>
      <text x="278" y="166" textAnchor="middle" fill="#8b949e" fontSize="8">oxygenated blood</text>
      <text x="143" y="232" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Right Ventricle</text>
      <text x="278" y="232" textAnchor="middle" fill="#f85149" fontSize="11" fontWeight="bold">Left Ventricle</text>
      <text x="278" y="248" textAnchor="middle" fill="#8b949e" fontSize="8">thick wall; aorta</text>
      <text x="153" y="197" fill="#d29922" fontSize="8">Tricuspid</text>
      <text x="218" y="197" fill="#d29922" fontSize="8">Mitral</text>
      <path d="M128,90 Q88,58 73,33" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      <text x="28" y="30" fill="#58a6ff" fontSize="8">Pulmonary Artery</text>
      <path d="M292,90 Q322,63 347,38" fill="none" stroke="#f85149" strokeWidth="4" strokeLinecap="round"/>
      <text x="350" y="36" fill="#f85149" fontSize="8">Pulmonary Vein</text>
      <path d="M252,93 Q272,53 302,28" fill="none" stroke="#f85149" strokeWidth="6" strokeLinecap="round"/>
      <text x="304" y="26" fill="#f85149" fontSize="9" fontWeight="bold">Aorta</text>
      <path d="M158,93 Q148,58 153,23" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
      <text x="68" y="52" fill="#58a6ff" fontSize="8">Superior Vena Cava</text>
      <circle cx="163" cy="112" r="8" fill="#3fb950" opacity="0.9"/>
      <text x="100" y="100" fill="#3fb950" fontSize="8" fontWeight="bold">SA Node (pacemaker)</text>
      <circle cx="208" cy="192" r="6" fill="#bc8cff" opacity="0.9"/>
      <text x="210" y="210" textAnchor="middle" fill="#bc8cff" fontSize="8">AV Node</text>
      <text x="210" y="378" textAnchor="middle" fill="#8b949e" fontSize="9">Cardiac output = 70mL × 72/min = 5L/min | BP = 120/80 mmHg</text>
    </svg>
  )

  const SVG_BloodCells2 = () => (
    <svg viewBox="0 0 440 320" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">Blood Components</text>
      <ellipse cx="78" cy="95" rx="38" ry="26" fill="#2d0a0a" stroke="#f85149" strokeWidth="2"/>
      <ellipse cx="78" cy="95" rx="18" ry="9" fill="#1a0505" stroke="#f85149" strokeWidth="1" opacity="0.6"/>
      <text x="78" y="132" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">RBC</text>
      <text x="78" y="145" textAnchor="middle" fill="#8b949e" fontSize="7">Biconcave; no nucleus</text>
      <text x="78" y="157" textAnchor="middle" fill="#8b949e" fontSize="7">5 million/mm³; 120 days</text>
      <text x="220" y="40" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">WBC (Leukocytes) — 6000-8000/mm³</text>
      {[['Neutrophil',158,90,'#3fb950','Lobed nucleus; phagocytosis; 60-70%'],
        ['Eosinophil',240,90,'#d29922','Bilobed; allergy/parasites; 2-4%'],
        ['Basophil',322,90,'#bc8cff','S-shaped; histamine; 0.5-1%']].map(([name,cx,cy,col,info],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="27" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
          <text x={cx} y={cy+4} textAnchor="middle" fill={col} fontSize="7" fontWeight="bold">{name}</text>
          <text x={cx} y={cy+132} textAnchor="middle" fill={col} fontSize="8" fontWeight="bold">{name}</text>
          <text x={cx} y={cy+145} textAnchor="middle" fill="#8b949e" fontSize="7">{info}</text>
        </g>
      ))}
      {[[353,80],[372,94],[356,108]].map(([x,y],i)=>(
        <ellipse key={i} cx={x} cy={y} rx="9" ry="5" fill="#2d2d0a" stroke="#d29922" strokeWidth="1.5"/>
      ))}
      <text x="366" y="132" textAnchor="middle" fill="#d29922" fontSize="8" fontWeight="bold">Platelets</text>
      <text x="366" y="145" textAnchor="middle" fill="#8b949e" fontSize="7">Clotting; 1.5-3.5 lakh</text>
      <rect x="10" y="195" width="420" height="112" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="220" y="213" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">ABO Blood Groups</text>
      <text x="30" y="232" fill="#3fb950" fontSize="8">Group A: IA IA or IA i | Antigen A | Antibody anti-B</text>
      <text x="30" y="248" fill="#d29922" fontSize="8">Group B: IB IB or IB i | Antigen B | Antibody anti-A</text>
      <text x="30" y="264" fill="#f85149" fontSize="8">Group AB: IA IB | Both antigens | No antibody | Universal recipient</text>
      <text x="30" y="280" fill="#58a6ff" fontSize="8">Group O: ii | No antigens | Both antibodies | Universal donor</text>
      <text x="30" y="296" fill="#bc8cff" fontSize="8">Rh factor: 80% Indians Rh+ | Erythroblastosis foetalis: Rh- mother + Rh+ baby</text>
    </svg>
  )

  const SVG_LocomotionFull = () => (
    <svg viewBox="0 0 440 320" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Sliding Filament Theory of Muscle Contraction</text>
      <rect x="20" y="55" width="400" height="95" rx="6" fill="#0d0d1a" stroke="#bc8cff" strokeWidth="2"/>
      <text x="220" y="75" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">Sarcomere (Z line to Z line)</text>
      <line x1="20" y1="55" x2="20" y2="150" stroke="#58a6ff" strokeWidth="3"/>
      <line x1="420" y1="55" x2="420" y2="150" stroke="#58a6ff" strokeWidth="3"/>
      <text x="20" y="165" textAnchor="middle" fill="#58a6ff" fontSize="8">Z line</text>
      <text x="420" y="165" textAnchor="middle" fill="#58a6ff" fontSize="8">Z line</text>
      <rect x="100" y="93" width="220" height="8" rx="4" fill="#f85149"/>
      <rect x="100" y="104" width="220" height="8" rx="4" fill="#f85149"/>
      <text x="210" y="89" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Myosin thick filament (A band)</text>
      <rect x="20" y="108" width="155" height="5" rx="3" fill="#3fb950"/>
      <rect x="245" y="108" width="155" height="5" rx="3" fill="#3fb950"/>
      <rect x="20" y="118" width="155" height="5" rx="3" fill="#3fb950"/>
      <rect x="245" y="118" width="155" height="5" rx="3" fill="#3fb950"/>
      <text x="90" y="142" textAnchor="middle" fill="#3fb950" fontSize="8">Actin thin filament (I band)</text>
      <rect x="133" y="55" width="154" height="95" fill="rgba(248,81,73,.07)" stroke="#f85149" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="210" y="162" textAnchor="middle" fill="#f85149" fontSize="7">H zone (myosin only; disappears on contraction)</text>
      {[['1. Nerve impulse arrives',28,205,'#3fb950'],
        ['2. Ca2+ from sarcoplasmic reticulum',150,205,'#d29922'],
        ['3. Ca2+ binds Troponin',295,205,'#f0883e'],
        ['4. Tropomyosin shifts; actin exposed',28,245,'#f85149'],
        ['5. Myosin head binds actin',185,245,'#bc8cff'],
        ['6. Power stroke; ATP hydrolysis',318,245,'#58a6ff']].map(([text,x,y,col],i)=>(
        <g key={i}>
          <rect x={x} y={y-14} width="118" height="26" rx="4" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.2"/>
          <text x={x+59} y={y+2} textAnchor="middle" fill={col} fontSize="7.5">{text}</text>
        </g>
      ))}
      <text x="220" y="295" textAnchor="middle" fill="#8b949e" fontSize="9">I band shortens; A band stays constant; H zone disappears</text>
      <text x="220" y="308" textAnchor="middle" fill="#8b949e" fontSize="9">Ca2+ from SR | ATP for power stroke and detachment</text>
    </svg>
  )

  const SVG_Endocrine = () => (
    <svg viewBox="0 0 440 370" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Endocrine Glands and Hormones</text>
      {[
        {n:'Hypothalamus',x:220,y:45,c:'#bc8cff',h:'TRH, CRH, GnRH; also ADH and Oxytocin (stored in pituitary)'},
        {n:'Anterior Pituitary',x:220,y:88,c:'#f0883e',h:'GH, TSH, ACTH, FSH, LH, Prolactin'},
        {n:'Posterior Pituitary',x:220,y:128,c:'#d29922',h:'ADH (vasopressin) → water reabsorption; Oxytocin → uterine contraction'},
        {n:'Thyroid',x:120,y:170,c:'#3fb950',h:'T3, T4 (thyroxine → BMR); Calcitonin (lowers Ca2+)'},
        {n:'Parathyroid',x:338,y:170,c:'#58a6ff',h:'PTH → raises blood Ca2+ (opposes calcitonin)'},
        {n:'Adrenal Cortex',x:100,y:225,c:'#f85149',h:'Cortisol (stress); Aldosterone (Na+ reabsorption); Sex hormones'},
        {n:'Adrenal Medulla',x:100,y:268,c:'#f0883e',h:'Adrenaline + Noradrenaline → fight or flight response'},
        {n:'Pancreatic Islets',x:340,y:225,c:'#3fb950',h:'β cells → Insulin (lowers glucose); α cells → Glucagon (raises glucose)'},
        {n:'Gonads (Testes/Ovary)',x:220,y:325,c:'#bc8cff',h:'Testosterone; Estrogen + Progesterone; control reproduction'},
      ].map(({n,x,y,c,h})=>(
        <g key={y+n}>
          <rect x={x-80} y={y-14} width="160" height="28" rx="6" fill="rgba(0,0,0,.4)" stroke={c} strokeWidth="1.5"/>
          <text x={x} y={y-1} textAnchor="middle" fill={c} fontSize="8.5" fontWeight="bold">{n}</text>
          <text x={x} y={y+11} textAnchor="middle" fill="#8b949e" fontSize="6.5">{h}</text>
        </g>
      ))}
      <line x1="220" y1="59" x2="220" y2="74" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="220" y1="102" x2="220" y2="114" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
    </svg>
  )

  const SVG_DNAFull = () => (
    <svg viewBox="0 0 380 390" style={{width:'100%',maxWidth:380,height:'auto'}}>
      <defs>
        <linearGradient id="str1" x1="0" x2="1"><stop offset="0%" stopColor="#58a6ff"/><stop offset="100%" stopColor="#1f6feb"/></linearGradient>
        <linearGradient id="str2" x1="0" x2="1"><stop offset="0%" stopColor="#f85149"/><stop offset="100%" stopColor="#b91c1c"/></linearGradient>
      </defs>
      {Array.from({length:20},(_,i)=>{
        const y=i*18+20, t=i/3.5
        const x1=190+70*Math.sin(t), x2=190-70*Math.sin(t)
        return <g key={i}>
          <circle cx={x1} cy={y} r="5" fill="url(#str1)" opacity={0.85+0.15*Math.sin(t)}/>
          <circle cx={x2} cy={y} r="5" fill="url(#str2)" opacity={0.85+0.15*Math.cos(t)}/>
          {i>0&&<line x1={x1} y1={y} x2={190+70*Math.sin((i-1)/3.5)} y2={y-18} stroke="#58a6ff" strokeWidth="1.5" opacity="0.4"/>}
          {i>0&&<line x1={x2} y1={y} x2={190-70*Math.sin((i-1)/3.5)} y2={y-18} stroke="#f85149" strokeWidth="1.5" opacity="0.4"/>}
        </g>
      })}
      {Array.from({length:10},(_,i)=>{
        const y=i*36+29, t=i/1.75
        const x1=190+70*Math.sin(t), x2=190-70*Math.sin(t)
        const pairs=[['A','T'],['T','A'],['G','C'],['C','G'],['A','T'],['G','C'],['T','A'],['C','G'],['A','T'],['G','C']]
        const cols={'A':'#3fb950','T':'#f0883e','G':'#bc8cff','C':'#58a6ff'}
        const [b1,b2]=pairs[i]; const mid=(x1+x2)/2
        return <g key={i}>
          <line x1={x1} y1={y} x2={mid-5} y2={y} stroke={cols[b1]} strokeWidth="2.5"/>
          <line x1={x2} y1={y} x2={mid+5} y2={y} stroke={cols[b2]} strokeWidth="2.5"/>
          <circle cx={mid-8} cy={y} r="7" fill={cols[b1]} opacity="0.9"/>
          <circle cx={mid+8} cy={y} r="7" fill={cols[b2]} opacity="0.9"/>
          <text x={mid-8} y={y+4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b1}</text>
          <text x={mid+8} y={y+4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b2}</text>
        </g>
      })}
      <rect x="10" y="330" width="360" height="52" rx="8" fill="rgba(30,40,30,0.6)" stroke="#30363d" strokeWidth="1"/>
      {[['A','#3fb950','Adenine'],['T','#f0883e','Thymine'],['G','#bc8cff','Guanine'],['C','#58a6ff','Cytosine']].map(([b,c,name],i)=>(
        <g key={b}>
          <circle cx={30+i*88} cy={348} r="8" fill={c}/>
          <text x={30+i*88} y={352} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{b}</text>
          <text x={30+i*88} y={368} textAnchor="middle" fill={c} fontSize="8">{name}</text>
          <text x={30+i*88} y={380} textAnchor="middle" fill="#8b949e" fontSize="7">{b==='A'?'pairs T (2H)':b==='T'?'pairs A (2H)':b==='G'?'pairs C (3H)':'pairs G (3H)'}</text>
        </g>
      ))}
    </svg>
  )

  const SVG_MendelFull = () => (
    <svg viewBox="0 0 420 390" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <text x="210" y="20" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">Monohybrid Cross (Mendel)</text>
      <text x="210" y="46" textAnchor="middle" fill="#8b949e" fontSize="11">P Generation</text>
      <rect x="78" y="52" width="80" height="34" rx="8" fill="#1a2d1a" stroke="#3fb950" strokeWidth="2"/>
      <text x="118" y="74" textAnchor="middle" fill="#3fb950" fontSize="14" fontWeight="bold">TT</text>
      <rect x="262" y="52" width="80" height="34" rx="8" fill="#2d1a1a" stroke="#f85149" strokeWidth="2"/>
      <text x="302" y="74" textAnchor="middle" fill="#f85149" fontSize="14" fontWeight="bold">tt</text>
      <text x="210" y="74" textAnchor="middle" fill="#8b949e" fontSize="15">×</text>
      <line x1="210" y1="94" x2="210" y2="112" stroke="#8b949e" strokeWidth="1.5"/>
      <text x="210" y="128" textAnchor="middle" fill="#8b949e" fontSize="11">F₁ Generation</text>
      <rect x="153" y="135" width="114" height="34" rx="8" fill="#1a2a1a" stroke="#d29922" strokeWidth="2"/>
      <text x="210" y="157" textAnchor="middle" fill="#d29922" fontSize="14" fontWeight="bold">Tt</text>
      <text x="210" y="190" textAnchor="middle" fill="#8b949e" fontSize="10">Self-pollination ↓</text>
      <text x="210" y="215" textAnchor="middle" fill="#8b949e" fontSize="11">F₂ — Punnett Square</text>
      <rect x="118" y="222" width="184" height="118" fill="none" stroke="#30363d" strokeWidth="1.5"/>
      <line x1="210" y1="222" x2="210" y2="340" stroke="#30363d" strokeWidth="1.5"/>
      <line x1="118" y1="281" x2="302" y2="281" stroke="#30363d" strokeWidth="1.5"/>
      <text x="164" y="239" textAnchor="middle" fill="#d29922" fontSize="13" fontWeight="bold">T</text>
      <text x="256" y="239" textAnchor="middle" fill="#f85149" fontSize="13" fontWeight="bold">t</text>
      <text x="106" y="261" textAnchor="middle" fill="#d29922" fontSize="13" fontWeight="bold">T</text>
      <text x="106" y="321" textAnchor="middle" fill="#f85149" fontSize="13" fontWeight="bold">t</text>
      <rect x="119" y="223" width="90" height="57" fill="rgba(63,185,80,.08)"/>
      <rect x="211" y="223" width="90" height="57" fill="rgba(210,153,34,.08)"/>
      <rect x="119" y="282" width="90" height="57" fill="rgba(210,153,34,.08)"/>
      <rect x="211" y="282" width="90" height="57" fill="rgba(248,81,73,.08)"/>
      <text x="164" y="255" textAnchor="middle" fill="#3fb950" fontSize="14" fontWeight="bold">TT</text>
      <text x="256" y="255" textAnchor="middle" fill="#d29922" fontSize="14" fontWeight="bold">Tt</text>
      <text x="164" y="315" textAnchor="middle" fill="#d29922" fontSize="14" fontWeight="bold">Tt</text>
      <text x="256" y="315" textAnchor="middle" fill="#f85149" fontSize="14" fontWeight="bold">tt</text>
      <text x="210" y="358" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">Phenotype: 3 Tall : 1 Dwarf</text>
      <text x="210" y="374" textAnchor="middle" fill="#8b949e" fontSize="10">Genotype: 1 TT : 2 Tt : 1 tt</text>
    </svg>
  )

  const SVG_AtomFull = () => (
    <svg viewBox="0 0 420 360" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <text x="210" y="18" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Bohr Model of Atom (Hydrogen)</text>
      <circle cx="210" cy="185" r="20" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="2.5"/>
      <text x="210" y="183" textAnchor="middle" fill="#bc8cff" fontSize="8" fontWeight="bold">Nucleus</text>
      <text x="210" y="194" textAnchor="middle" fill="#8b949e" fontSize="6">p+ n0</text>
      {[{r:50,n:1,col:'#f85149',label:'K (n=1)  max 2e-'},
        {r:90,n:2,col:'#d29922',label:'L (n=2)  max 8e-'},
        {r:130,n:3,col:'#3fb950',label:'M (n=3)  max 18e-'},
        {r:170,n:4,col:'#58a6ff',label:'N (n=4)  max 32e-'}].map(({r,n,col,label},i)=>(
        <g key={i}>
          <circle cx="210" cy="185" r={r} fill="none" stroke={col} strokeWidth="1.5" strokeDasharray={i===0?'':'4,4'} opacity="0.6"/>
          <circle cx={210+r} cy="185" r="6" fill={col} opacity="0.9"/>
          <text x="210" y={185-r-5} textAnchor="middle" fill={col} fontSize="8">{label}</text>
        </g>
      ))}
      <rect x="10" y="295" width="400" height="56" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="210" y="313" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">Bohr Model Key Equations</text>
      <text x="20" y="330" fill="#3fb950" fontSize="9">Energy En = -13.6 Z²/n² eV | radius rn = n²a0/Z</text>
      <text x="20" y="345" fill="#d29922" fontSize="9">a0 = 0.529 Å (Bohr radius) | n = principal quantum number</text>
    </svg>
  )

  const SVG_ElectricFull = () => (
    <svg viewBox="0 0 420 340" style={{width:'100%',maxWidth:420,height:'auto'}}>
      <circle cx="138" cy="170" r="27" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
      <text x="138" y="176" textAnchor="middle" fill="#f85149" fontSize="19" fontWeight="bold">+</text>
      <circle cx="278" cy="170" r="27" fill="#0a0a1a" stroke="#58a6ff" strokeWidth="2.5"/>
      <text x="278" y="176" textAnchor="middle" fill="#58a6ff" fontSize="23" fontWeight="bold">−</text>
      {[-75,-52,-28,0,28,52,75].map((dy,i)=>{
        if(Math.abs(dy)<10) return <path key={i} d="M165,170 L251,170" fill="none" stroke="#f0883e" strokeWidth="1.5" opacity="0.9"/>
        return <path key={i} d={`M${165+Math.abs(dy)*0.1},${170+dy*0.4} Q${208},${170+dy} ${251-Math.abs(dy)*0.1},${170+dy*0.4}`}
          fill="none" stroke="#f0883e" strokeWidth="1.5" opacity={0.9-Math.abs(dy)/200}/>
      })}
      {[48,85].map(r=>(
        <g key={r}>
          <circle cx="138" cy="170" r={r} fill="none" stroke="#bc8cff" strokeWidth="1" strokeDasharray="4,4" opacity="0.5"/>
          <circle cx="278" cy="170" r={r} fill="none" stroke="#bc8cff" strokeWidth="1" strokeDasharray="4,4" opacity="0.5"/>
        </g>
      ))}
      <rect x="128" y="32" width="162" height="44" rx="8" fill="#0d1020" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="209" y="52" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Coulomb's Law</text>
      <text x="209" y="68" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">F = kq₁q₂/r²</text>
      <rect x="128" y="275" width="162" height="44" rx="8" fill="#0d1020" stroke="#f0883e" strokeWidth="1.5"/>
      <text x="209" y="295" textAnchor="middle" fill="#f0883e" fontSize="11" fontWeight="bold">Electric Field</text>
      <text x="209" y="312" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">E = kQ/r²</text>
      <text x="138" y="212" textAnchor="middle" fill="#f85149" fontSize="9">+q (source)</text>
      <text x="278" y="212" textAnchor="middle" fill="#58a6ff" fontSize="9">−q (sink)</text>
      <text x="50" y="108" fill="#f0883e" fontSize="9">Field lines</text>
      <text x="50" y="120" fill="#8b949e" fontSize="8">(+) to (−)</text>
      <text x="328" y="108" fill="#bc8cff" fontSize="9">Equipotential</text>
      <text x="328" y="120" fill="#bc8cff" fontSize="9">surfaces</text>
    </svg>
  )

  const SVG_WaveFull = () => (
    <svg viewBox="0 0 480 340" style={{width:'100%',maxWidth:480,height:'auto'}}>
      <rect x="153" y="38" width="12" height="83" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      <rect x="153" y="143" width="12" height="28" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      <rect x="153" y="193" width="12" height="83" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
      <text x="151" y="140" textAnchor="end" fill="#d29922" fontSize="9" fontWeight="bold">S₁</text>
      <text x="151" y="198" textAnchor="end" fill="#d29922" fontSize="9" fontWeight="bold">S₂</text>
      {[0,1,2,3].map(i=>(
        <line key={i} x1={18+i*32} y1="38" x2={18+i*32} y2="318" stroke="#58a6ff" strokeWidth="1.5" opacity="0.5"/>
      ))}
      {[155,185].map((slitY,si)=>(
        [33,62,91,120].map(r=>(
          <path key={si+'-'+r} d={`M165,${slitY} A${r},${r} 0 0 1 ${165+r},${slitY}`}
            fill="none" stroke={si===0?'#58a6ff':'#f0883e'} strokeWidth="1.5" opacity={1.1-r/130}/>
        ))
      ))}
      <rect x="368" y="38" width="10" height="278" fill="#1a2235" stroke="#58a6ff" strokeWidth="1.5"/>
      {[0,1,2,3,4,5,6,7,8].map(i=>{
        const y=78+i*24, brightness=Math.abs(4-i)
        const opacity=brightness===0?1:brightness===1?0.7:brightness===2?0.35:0.1
        return <rect key={i} x="378" y={y-10} width="18" height="20" fill="#58a6ff" opacity={opacity}/>
      })}
      <text x="400" y="160" fill="#58a6ff" fontSize="8" fontWeight="bold">n=0</text>
      <text x="400" y="138" fill="#58a6ff" fontSize="8">n=1</text>
      <text x="400" y="184" fill="#58a6ff" fontSize="8">n=1</text>
      <rect x="18" y="278" width="120" height="52" rx="6" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="78" y="297" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">β = λD/d</text>
      <text x="78" y="312" textAnchor="middle" fill="#8b949e" fontSize="8">λ = wavelength</text>
      <text x="78" y="324" textAnchor="middle" fill="#8b949e" fontSize="8">D = dist to screen, d = slit sep</text>
      <text x="270" y="336" textAnchor="middle" fill="#bc8cff" fontSize="9">Young's Double Slit Experiment — Wave nature of light</text>
    </svg>
  )

  const SVG_NucleiFull = () => (
    <svg viewBox="0 0 440 340" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">Radioactive Decay Types</text>
      <circle cx="220" cy="128" r="44" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
      {[[210,118],[230,118],[220,133],[208,136],[232,136],[220,106],[205,128],[235,128]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%2===0?6:5} fill={i%2===0?"#f85149":"#58a6ff"} opacity="0.9"/>
      ))}
      <text x="220" y="185" textAnchor="middle" fill="#8b949e" fontSize="9">Parent Nucleus (Z, A)</text>
      <path d="M175,108 L74,63" fill="none" stroke="#3fb950" strokeWidth="2.5"/>
      <circle cx="60" cy="57" r="17" fill="#0a1a0a" stroke="#3fb950" strokeWidth="2"/>
      <text x="60" y="61" textAnchor="middle" fill="#3fb950" fontSize="8" fontWeight="bold">⁴He</text>
      <rect x="4" y="77" width="112" height="48" rx="6" fill="#0a1a0a" stroke="#3fb950" strokeWidth="1.5"/>
      <text x="60" y="95" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">α-Decay</text>
      <text x="60" y="108" textAnchor="middle" fill="#8b949e" fontSize="7">Z→Z-2, A→A-4</text>
      <text x="60" y="120" textAnchor="middle" fill="#8b949e" fontSize="7">Stopped by paper</text>
      <path d="M220,172 L220,238" fill="none" stroke="#d29922" strokeWidth="2.5"/>
      <rect x="140" y="242" width="160" height="58" rx="6" fill="#1a1a0a" stroke="#d29922" strokeWidth="1.5"/>
      <text x="220" y="260" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">β-Decay</text>
      <text x="220" y="274" textAnchor="middle" fill="#8b949e" fontSize="7">n→p + e⁻ + antineutrino</text>
      <text x="220" y="287" textAnchor="middle" fill="#8b949e" fontSize="7">Z→Z+1; A unchanged</text>
      <text x="220" y="298" textAnchor="middle" fill="#8b949e" fontSize="7">Stopped by Al foil</text>
      <path d="M262,108 L360,63" fill="none" stroke="#bc8cff" strokeWidth="2.5"/>
      <rect x="324" y="48" width="112" height="58" rx="6" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="1.5"/>
      <text x="380" y="68" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">γ-Decay</text>
      <text x="380" y="82" textAnchor="middle" fill="#8b949e" fontSize="7">High energy photon</text>
      <text x="380" y="95" textAnchor="middle" fill="#8b949e" fontSize="7">Z, A unchanged</text>
      <text x="380" y="105" textAnchor="middle" fill="#8b949e" fontSize="7">Stopped by Pb</text>
      <rect x="10" y="308" width="420" height="28" rx="6" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="220" y="326" textAnchor="middle" fill="#58a6ff" fontSize="10">N = N₀e⁻λt | t½ = 0.693/λ | Activity A = λN | 1 Ci = 3.7×10¹⁰ Bq</text>
    </svg>
  )

  const SVG_SemiFull = () => (
    <svg viewBox="0 0 440 350" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Semiconductor Electronics</text>
      {[['Conductor',60,'#3fb950'],['Semiconductor',220,'#d29922'],['Insulator',380,'#f85149']].map(([type,cx,col],i)=>(
        <g key={i}>
          <text x={cx} y={56} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold">{type}</text>
          <rect x={cx-34} y={64} width="68" height="24" rx="3" fill={col} opacity="0.7"/>
          <text x={cx} y={80} textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Conduction Band</text>
          {i===0&&<rect x={cx-34} y={86} width="68" height="24" rx="3" fill={col} opacity="0.4"/>}
          {i===1&&<rect x={cx-34} y={95} width="68" height="12" rx="2" fill="transparent" stroke={col} strokeWidth="1" strokeDasharray="3,2"/>}
          {i===1&&<text x={cx} y={104} textAnchor="middle" fill={col} fontSize="7">~1eV gap</text>}
          {i===2&&<rect x={cx-34} y={100} width="68" height="20" rx="2" fill="transparent" stroke={col} strokeWidth="1" strokeDasharray="3,2"/>}
          {i===2&&<text x={cx} y={113} textAnchor="middle" fill={col} fontSize="7">&gt;3eV gap</text>}
          <rect x={cx-34} y={i===0?88:i===1?114:136} width="68" height="24" rx="3" fill={col} opacity="0.7"/>
          <text x={cx} y={i===0?104:i===1?130:152} textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Valence Band</text>
        </g>
      ))}
      <rect x="18" y="180" width="404" height="158" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="220" y="198" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">p-n Junction Diode</text>
      <rect x="28" y="208" width="170" height="68" rx="4" fill="#2d0a0a" stroke="#f85149" strokeWidth="2"/>
      <text x="113" y="240" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">p-type</text>
      <text x="113" y="256" textAnchor="middle" fill="#8b949e" fontSize="8">majority: holes; trivalent dopant</text>
      <rect x="242" y="208" width="170" height="68" rx="4" fill="#0a0a2d" stroke="#58a6ff" strokeWidth="2"/>
      <text x="327" y="240" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">n-type</text>
      <text x="327" y="256" textAnchor="middle" fill="#8b949e" fontSize="8">majority: electrons; pentavalent dopant</text>
      <rect x="200" y="208" width="42" height="68" fill="#1a1a1a" stroke="#bc8cff" strokeWidth="1.5"/>
      <text x="221" y="244" textAnchor="middle" fill="#bc8cff" fontSize="7">Depletion</text>
      <text x="221" y="255" textAnchor="middle" fill="#bc8cff" fontSize="7">region</text>
      <text x="220" y="298" textAnchor="middle" fill="#3fb950" fontSize="8">Forward bias &gt;0.7V (Si): conducts | Reverse bias: no conduction</text>
      <text x="220" y="314" textAnchor="middle" fill="#8b949e" fontSize="8">NAND/NOR = universal gates | BJT: Ic = β Ib (β = 50-300)</text>
      <text x="220" y="330" textAnchor="middle" fill="#d29922" fontSize="8">Rectifier: half-wave (1 diode) | full-wave bridge (4 diodes)</text>
    </svg>
  )

  const SVG_MoleculeFull = () => (
    <svg viewBox="0 0 380 360" style={{width:'100%',maxWidth:380,height:'auto'}}>
      <defs>
        <radialGradient id="cAtG" cx="50%" cy="35%" r="60%"><stop offset="0%" stopColor="#3d2060"/><stop offset="100%" stopColor="#1a0a30"/></radialGradient>
        <radialGradient id="hAtG" cx="50%" cy="35%" r="60%"><stop offset="0%" stopColor="#103a10"/><stop offset="100%" stopColor="#051505"/></radialGradient>
      </defs>
      <text x="190" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">CH₄ — sp³ Hybridisation</text>
      <line x1="190" y1="155" x2="190" y2="56" stroke="#bc8cff" strokeWidth="3" strokeLinecap="round"/>
      <line x1="190" y1="185" x2="83" y2="262" stroke="#bc8cff" strokeWidth="5" strokeLinecap="round"/>
      <line x1="190" y1="185" x2="297" y2="262" stroke="#bc8cff" strokeWidth="5" strokeLinecap="round"/>
      <line x1="190" y1="168" x2="190" y2="292" stroke="#bc8cff" strokeWidth="2" strokeDasharray="6,4" strokeLinecap="round" opacity="0.6"/>
      <circle cx="190" cy="175" r="55" fill="rgba(188,140,255,0.07)" stroke="rgba(188,140,255,0.2)" strokeWidth="1" strokeDasharray="4,4"/>
      <ellipse cx="190" cy="118" rx="16" ry="30" fill="rgba(88,166,255,0.14)" stroke="#58a6ff" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="133" cy="232" rx="25" ry="12" fill="rgba(88,166,255,0.14)" stroke="#58a6ff" strokeWidth="1" opacity="0.7" transform="rotate(-35,133,232)"/>
      <ellipse cx="247" cy="232" rx="25" ry="12" fill="rgba(88,166,255,0.14)" stroke="#58a6ff" strokeWidth="1" opacity="0.7" transform="rotate(35,247,232)"/>
      <circle cx="190" cy="52" r="21" fill="url(#hAtG)" stroke="#3fb950" strokeWidth="2"/>
      <text x="190" y="57" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">H</text>
      <circle cx="78" cy="264" r="23" fill="url(#hAtG)" stroke="#3fb950" strokeWidth="2"/>
      <text x="78" y="270" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">H</text>
      <circle cx="302" cy="264" r="23" fill="url(#hAtG)" stroke="#3fb950" strokeWidth="2"/>
      <text x="302" y="270" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">H</text>
      <circle cx="190" cy="297" r="21" fill="url(#hAtG)" stroke="#3fb950" strokeWidth="2" opacity="0.75"/>
      <text x="190" y="303" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold" opacity="0.75">H</text>
      <circle cx="190" cy="175" r="31" fill="url(#cAtG)" stroke="#bc8cff" strokeWidth="2.5"/>
      <text x="190" y="181" textAnchor="middle" fill="#bc8cff" fontSize="15" fontWeight="bold">C</text>
      <rect x="50" y="318" width="280" height="38" rx="8" fill="rgba(20,15,35,.7)" stroke="#30363d" strokeWidth="1"/>
      <text x="190" y="335" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">Bond angle 109.5° | Tetrahedral geometry</text>
      <text x="190" y="350" textAnchor="middle" fill="#8b949e" fontSize="9">4 equivalent sp³ C-H sigma bonds</text>
    </svg>
  )

  const SVG_EcoFull = () => (
    <svg viewBox="0 0 440 340" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Ecosystem — Energy Pyramid (10% Law)</text>
      <polygon points="220,42 118,128 322,128" fill="rgba(63,185,80,.15)" stroke="#3fb950" strokeWidth="2"/>
      <polygon points="220,138 88,202 352,202" fill="rgba(210,153,34,.15)" stroke="#d29922" strokeWidth="2"/>
      <polygon points="220,212 52,288 388,288" fill="rgba(248,81,73,.15)" stroke="#f85149" strokeWidth="2"/>
      <text x="220" y="96" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Producers (Plants)</text>
      <text x="220" y="110" textAnchor="middle" fill="#8b949e" fontSize="8">10,000 kcal</text>
      <text x="220" y="172" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Primary Consumers (Herbivores)</text>
      <text x="220" y="186" textAnchor="middle" fill="#8b949e" fontSize="8">1,000 kcal</text>
      <text x="220" y="258" textAnchor="middle" fill="#f85149" fontSize="10" fontWeight="bold">Secondary Consumers (Carnivores)</text>
      <text x="220" y="272" textAnchor="middle" fill="#8b949e" fontSize="8">100 kcal</text>
      <text x="25" y="295" fill="#58a6ff" fontSize="8">90% heat loss</text>
      <text x="25" y="308" fill="#58a6ff" fontSize="8">per trophic level</text>
      <rect x="10" y="300" width="420" height="36" rx="6" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="220" y="316" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Lindeman 10% Law (1942): only 10% energy transferred between trophic levels</text>
      <text x="220" y="330" textAnchor="middle" fill="#8b949e" fontSize="8">Pyramid of energy always upright | Biomass and numbers can be inverted</text>
    </svg>
  )

  const SVG_BiotechFull = () => (
    <svg viewBox="0 0 440 340" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Recombinant DNA Technology</text>
      <rect x="18" y="45" width="102" height="48" rx="8" fill="#0d1a0d" stroke="#3fb950" strokeWidth="2"/>
      <text x="69" y="64" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Source DNA</text>
      <text x="69" y="78" textAnchor="middle" fill="#8b949e" fontSize="8">(gene of interest)</text>
      <rect x="153" y="45" width="112" height="48" rx="8" fill="#1a0d0d" stroke="#f85149" strokeWidth="2"/>
      <text x="209" y="64" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Restriction</text>
      <text x="209" y="78" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Endonuclease</text>
      <path d="M120,69 L153,69" fill="none" stroke="#3fb950" strokeWidth="2" markerEnd="url(#a4)"/>
      <circle cx="360" cy="95" r="36" fill="#0d0d2d" stroke="#58a6ff" strokeWidth="2"/>
      <text x="360" y="92" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Vector</text>
      <text x="360" y="106" textAnchor="middle" fill="#8b949e" fontSize="7">(Plasmid/Phage)</text>
      <path d="M265,69 Q312,69 326,86" fill="none" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#a4)"/>
      <rect x="153" y="150" width="112" height="38" rx="8" fill="#0a1a0a" stroke="#3fb950" strokeWidth="1.5"/>
      <text x="209" y="167" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">DNA Ligase</text>
      <text x="209" y="181" textAnchor="middle" fill="#8b949e" fontSize="8">joins sticky ends</text>
      <path d="M265,95 L290,150 L265,190" fill="none" stroke="#3fb950" strokeWidth="1.5" strokeDasharray="4,3"/>
      <rect x="88" y="218" width="132" height="38" rx="8" fill="#0d2d0d" stroke="#3fb950" strokeWidth="2"/>
      <text x="154" y="234" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Recombinant DNA</text>
      <text x="154" y="248" textAnchor="middle" fill="#8b949e" fontSize="8">vector + insert</text>
      <rect x="268" y="218" width="132" height="38" rx="8" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="334" y="234" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Host Cell (E. coli)</text>
      <text x="334" y="248" textAnchor="middle" fill="#8b949e" fontSize="8">transformation</text>
      <path d="M220,256 L268,237" fill="none" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#a4)"/>
      <rect x="18" y="278" width="188" height="52" rx="8" fill="#1a1a0d" stroke="#d29922" strokeWidth="1.5"/>
      <text x="112" y="296" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">PCR (3 steps)</text>
      <text x="112" y="310" textAnchor="middle" fill="#8b949e" fontSize="8">94°C denature → 55°C anneal</text>
      <text x="112" y="323" textAnchor="middle" fill="#8b949e" fontSize="8">→ 72°C extend (Taq polymerase)</text>
      <rect x="234" y="278" width="188" height="52" rx="8" fill="#0d1a1a" stroke="#bc8cff" strokeWidth="1.5"/>
      <text x="328" y="296" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Gel Electrophoresis</text>
      <text x="328" y="310" textAnchor="middle" fill="#8b949e" fontSize="8">agarose gel; smaller fragments</text>
      <text x="328" y="323" textAnchor="middle" fill="#8b949e" fontSize="8">travel farther; EtBr staining</text>
      <defs><marker id="a4" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6Z" fill="#3fb950"/></marker></defs>
    </svg>
  )

  const SVG_ElectroChemFull = () => (
    <svg viewBox="0 0 440 340" style={{width:'100%',maxWidth:440,height:'auto'}}>
      <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Daniell Cell — Electrochemical Cell</text>
      <rect x="18" y="82" width="142" height="158" rx="8" fill="#0d1a0d" stroke="#3fb950" strokeWidth="2"/>
      <text x="89" y="102" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Anode (−)</text>
      <text x="89" y="116" textAnchor="middle" fill="#3fb950" fontSize="9">Oxidation</text>
      <rect x="73" y="122" width="32" height="88" rx="4" fill="#2d2d00" stroke="#d29922" strokeWidth="2"/>
      <text x="89" y="170" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Zn</text>
      <text x="89" y="206" textAnchor="middle" fill="#3fb950" fontSize="8">Zn→Zn²⁺+2e⁻</text>
      <text x="89" y="220" textAnchor="middle" fill="#8b949e" fontSize="7">1M ZnSO4</text>
      <rect x="280" y="82" width="142" height="158" rx="8" fill="#1a0d00" stroke="#f0883e" strokeWidth="2"/>
      <text x="351" y="102" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">Cathode (+)</text>
      <text x="351" y="116" textAnchor="middle" fill="#f0883e" fontSize="9">Reduction</text>
      <rect x="335" y="122" width="32" height="88" rx="4" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
      <text x="351" y="170" textAnchor="middle" fill="#f0883e" fontSize="9" fontWeight="bold">Cu</text>
      <text x="351" y="206" textAnchor="middle" fill="#f0883e" fontSize="8">Cu²⁺+2e⁻→Cu</text>
      <text x="351" y="220" textAnchor="middle" fill="#8b949e" fontSize="7">1M CuSO4</text>
      <rect x="153" y="56" width="134" height="24" rx="10" fill="#1a1a2d" stroke="#bc8cff" strokeWidth="2"/>
      <text x="220" y="72" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Salt Bridge (KCl)</text>
      <line x1="89" y1="82" x2="89" y2="52" stroke="#3fb950" strokeWidth="2"/>
      <line x1="89" y1="52" x2="351" y2="52" stroke="#58a6ff" strokeWidth="2"/>
      <line x1="351" y1="52" x2="351" y2="82" stroke="#f0883e" strokeWidth="2"/>
      <text x="220" y="48" textAnchor="middle" fill="#58a6ff" fontSize="9">e⁻ flow: Anode → Cathode (external wire)</text>
      <rect x="190" y="28" width="60" height="22" rx="5" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
      <text x="220" y="43" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">1.10V</text>
      <rect x="18" y="258" width="404" height="72" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d" strokeWidth="1"/>
      <text x="220" y="276" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Key Equations</text>
      <text x="28" y="292" fill="#3fb950" fontSize="8.5">E°cell = E°cathode − E°anode = +0.34−(−0.76) = +1.10 V</text>
      <text x="28" y="307" fill="#58a6ff" fontSize="8.5">Nernst: E = E° − (0.0592/n) log Q (at 298K)</text>
      <text x="28" y="322" fill="#bc8cff" fontSize="8.5">Faraday: m = ZIt = (M/nF)It | F = 96485 C mol⁻¹</text>
    </svg>
  )

  // ─── CHAPTER → DIAGRAM MAP ────────────────────────────────────
  const CHAPTER_DIAGRAMS = {
    'The Living World':              [{title:'Plant Kingdom Overview',           SvgC:SVG_PlantKingdom2,   parts:['Algae - aquatic; no true organs','Bryophyta - amphibians of plant kingdom; no vascular tissue','Pteridophyta - first vascular plants; seedless','Gymnosperms - naked seeds; no fruit','Angiosperms - seeds enclosed in fruit; dominant'],facts:['Whittaker (1969): 5 kingdoms','Binomial nomenclature: Linnaeus (1753)','Taxonomy hierarchy: Kingdom→Phylum→Class→Order→Family→Genus→Species']}],
    'Biological Classification':     [{title:'Five Kingdom Classification',       SvgC:SVG_PlantKingdom2,   parts:['Monera - prokaryotes; bacteria; no nucleus','Protista - unicellular eukaryotes; Euglena, Amoeba','Fungi - saprophytes; chitin cell wall; Rhizopus, Penicillium','Plantae - autotrophs; cellulose cell wall; embryophytes','Animalia - heterotrophs; no cell wall; multicellular'],facts:['Fungi cell wall: chitin | Bacteria wall: peptidoglycan','Viruses are acellular; not included in 5 kingdoms','Mycorrhiza: symbiosis between fungi and plant roots']}],
    'Plant Kingdom':                 [{title:'Plant Kingdom Classification',       SvgC:SVG_PlantKingdom2,   parts:['Algae (Thallophyta) - aquatic; Chara, Spirogyra','Bryophyta - liverworts, mosses; Funaria; no vascular tissue','Pteridophyta - ferns; Dryopteris; first vascular; no seeds','Gymnosperms - Pinus, Cycas; naked seeds; heterosporous','Angiosperms - Mango, Rose; enclosed seeds; double fertilization'],facts:['Bryophytes: gametophyte dominant; need water for fertilization','Pteridophytes: sporophyte dominant; first true vascular tissue','Angiosperms: most evolved; largest group of land plants']}],
    'Animal Kingdom':                [{title:'Animal Kingdom — Major Phyla',       SvgC:SVG_AnimalKingdom,   parts:['Porifera - sponges; canal system; choanocytes','Coelenterata - Hydra; nematocysts; radial symmetry','Platyhelminthes - flatworms; acoelomate; Taenia (tapeworm)','Aschelminthes - Ascaris; pseudocoelomate; roundworm','Annelida - earthworm; true coelom (schizocoel); segmented','Arthropoda - largest phylum; jointed legs; chitin exoskeleton','Chordata - notochord; dorsal nerve cord; pharyngeal slits'],facts:['Coelom: first true in Annelida (schizocoel)','Arthropoda: largest animal phylum (~80% all animal species)','Notochord: defining feature of phylum Chordata']}],
    'Morphology of Flowering Plants':[{title:'Morphology of Flowering Plant',      SvgC:SVG_FloweringPlant2, parts:['Root - tap (dicot) or fibrous (monocot); absorption; anchorage','Stem - node, internode, axillary bud; transport; support','Leaf - lamina + petiole; reticulate (dicot) or parallel (monocot) venation','Flower - calyx, corolla, androecium (stamen), gynoecium (pistil)','Fruit - ripened ovary; true vs false fruit (apple = false)','Seed - embryo + endosperm + seed coat (testa + tegmen)'],facts:['Dicot: tap root, reticulate venation, 4-5 floral parts, 2 cotyledons','Monocot: fibrous root, parallel venation, 3 floral parts, 1 cotyledon','Epigeal germination (bean): cotyledons above ground | Hypogeal (maize): below']}],
    'Anatomy of Flowering Plants':   [{title:'T.S. of Dicot Stem',                SvgC:SVG_AnatomyStem2,    parts:['Epidermis - outermost; cuticle; stomata; no chloroplasts','Cortex - parenchyma; stores food; collenchyma near epidermis in some','Endodermis - Casparian strip; controls water and mineral movement','Pericycle - meristematic; gives lateral roots (in roots); fibres in stem','Vascular Bundle - xylem (water) + phloem (food) + cambium (in dicot)','Pith - central parenchyma; storage'],facts:['Dicot stem: open vascular bundles (with cambium); ring arrangement','Monocot stem: closed vascular bundles (no cambium); scattered','Xylem: dead at maturity; tracheids + vessels. Phloem: living; sieve tubes + companion cells']}],
    'Structural Organisation in Animals':[{title:'Earthworm Internal Anatomy', SvgC:SVG_Earthworm,        parts:['Prostomium - sensory lobe above mouth; no segment','Pharynx - muscular; sucks food in','Oesophagus - connects pharynx to gizzard','Gizzard (seg 8-9) - grinds food with soil particles','Intestine - main digestion + absorption; typhlosole increases surface area','Nephridia - excretory organs in each segment; equivalent to kidney','Clitellum (seg 14-16) - secretes cocoon for reproduction'],facts:['Pheretima posthuma: 100-120 segments','Blood: red; haemoglobin in plasma (not RBCs)','Hermaphrodite: both male and female reproductive organs']}],
    'Cell: The Unit of Life':        [{title:'Animal Cell',                        SvgC:SVG_AnimalCell,      parts:['Cell Membrane - fluid mosaic model (Singer & Nicolson 1972)','Nucleus - double membrane; nuclear pores; chromosomes; nucleolus','Mitochondria - powerhouse; 70S ribosomes; cristae; matrix; mtDNA','Ribosome - 80S in cytoplasm; 60S+40S subunits; protein synthesis','Golgi Body - packaging; glycosylation; secretory vesicles','Lysosome - suicide bag; hydrolytic enzymes at pH 5; autophagy','ER - rough (ribosomes, protein) and smooth (lipid, detox)'],facts:['Cell theory: Schleiden+Schwann (1838-1839); Virchow (1855) added cells from cells','Prokaryote: 70S ribosomes, no membrane-bound organelles, circular DNA','Eukaryote: 80S ribosomes, membrane-bound organelles, linear DNA']},
                                       {title:'Plant Cell',                         SvgC:SVG_PlantCell,       parts:['Cell Wall - cellulose; rigid; provides shape and protection','Chloroplast - photosynthesis; own DNA (70S); double membrane; thylakoids','Large Central Vacuole - maintains turgor; stores pigments and waste','Plastids - chloroplast (green), chromoplast (red/orange), leucoplast (storage)','Plasmodesmata - cytoplasmic connections between adjacent plant cells','Middle Lamella - pectin; cements adjacent cells together'],facts:['Plant cell has cell wall, chloroplast, large vacuole; no centriole, no lysosomes','Centrioles: in animal cells and lower plants; involved in spindle formation','Tonoplast = membrane of vacuole']}],
    'Biomolecules':                  [{title:'Biomolecules Overview',              SvgC:SVG_DNAFull,         parts:['Carbohydrates - C:H:O = 1:2:1; monosaccharides, disaccharides, polysaccharides','Proteins - amino acids + peptide bonds; 4 structural levels','Lipids - glycerol + fatty acids; fats, phospholipids, steroids','Nucleic Acids - nucleotides; DNA (double helix) and RNA (single stranded)','Enzymes - protein catalysts; active site; Km = substrate at ½Vmax','Vitamins - organic micronutrients; fat-soluble (A,D,E,K) and water-soluble (B,C)'],facts:['Chargaff rule: A=T, G=C in double-stranded DNA','Enzymes not consumed in reaction; lower activation energy','Glycolysis: cytoplasm; 2 ATP net; anaerobic']}],
    'Cell Cycle and Cell Division':  [{title:'Mitosis Phases',                     SvgC:SVG_Mitosis2,        parts:['Interphase - G1 (growth), S (DNA replication), G2 (preparation); longest phase','Prophase - chromosomes condense; nucleolus disappears; spindle forms','Metaphase - chromosomes at equatorial plate; centromeres attach to spindle','Anaphase - centromeres split; sister chromatids to opposite poles','Telophase - nuclear envelope reforms; chromosomes decondense','Cytokinesis - cell plate (plants) or cleavage furrow (animals)'],facts:['PMAT: Prophase→Metaphase→Anaphase→Telophase','Mitosis: 2 genetically identical diploid daughter cells','CDK-cyclin complexes control cell cycle checkpoints; p53 = guardian of genome']},
                                       {title:'Meiosis',                            SvgC:SVG_Meiosis2,        parts:['Prophase I - synapsis; bivalents form; crossing over at Pachytene (key stage)','Metaphase I - bivalents at equatorial plate; centromeres face poles','Anaphase I - homologous chromosomes separate (NOT chromatids)','Meiosis II - similar to mitosis; sister chromatids separate','Result - 4 haploid (n) genetically unique cells (gametes)','Significance - genetic variation via crossing over and independent assortment'],facts:['Crossing over: exchange between non-sister chromatids of homologous chromosomes','Meiosis II: no DNA replication between meiosis I and II','Oogenesis: produces 1 egg + 3 polar bodies (unequal cytokinesis)']}],
    'Transport in Plants':           [{title:'Transport in Plants',                 SvgC:SVG_AnatomyStem2,    parts:['Apoplast - through cell walls and intercellular spaces (non-living)','Symplast - through cytoplasm via plasmodesmata (living)','Osmosis - water from high water potential to low; across semipermeable membrane','Transpiration pull - cohesion-tension theory (Dixon and Jolly 1894)','Active transport - against concentration gradient; requires ATP; carrier proteins','Phloem transport - pressure flow (Munch): source→sink; active loading of sucrose'],facts:['Water potential ψ = ψs + ψp (solute potential + pressure potential)','Plasmolysis: water loss from vacuole → protoplast shrinks from wall','Root pressure: positive pressure; responsible for guttation (water from hydathodes)']}],
    'Mineral Nutrition':             [{title:'Mineral Nutrition and Nitrogen Cycle', SvgC:SVG_FloweringPlant2, parts:['Macronutrients - N, P, K, Ca, Mg, S, C, H, O (needed in large amounts)','Micronutrients - Fe, Mn, Cu, Zn, Mo, B, Cl, Ni (trace amounts)','Nitrogen fixation - Rhizobium (legumes); Azotobacter (free-living); biological N fixation','Nitrification - NH4+→NO2- (Nitrosomonas)→NO3- (Nitrobacter)','Denitrification - NO3-→N2 (Pseudomonas); reduces soil nitrogen','Deficiency symptoms - chlorosis (yellowing), necrosis (death), stunting, purpling'],facts:['Nitrogen = component of amino acids, proteins, nucleic acids, ATP, chlorophyll','Iron deficiency: chlorosis in young leaves (unlike Mg where old leaves affected first)','Hydroponics: growing plants in mineral solution without soil; determines essential elements']}],
    'Photosynthesis in Higher Plants':[{title:'Photosynthesis — Z-Scheme + Calvin Cycle', SvgC:SVG_Chloroplast2, parts:['PS II (P680) - absorbs 680nm; oxidises water; releases O2; first in Z-scheme','PS I (P700) - absorbs 700nm; reduces NADP+ to NADPH','Electron transport chain - PQ→Cytochrome b6f→PC→PS I→Fd','ATP Synthase (CF0CF1) - chemiosmosis; H+ gradient drives ATP synthesis','Calvin Cycle - stroma; CO2+RuBP→2×3-PGA (RuBisCO); 3 ATP+2 NADPH per CO2','C4 pathway - CO2 first fixed as OAA (PEP carboxylase) in mesophyll cells'],facts:['Light reactions (thylakoid): 2H2O+2NADP++3ADP→O2+2NADPH+3ATP','Calvin cycle (stroma): 3CO2+9ATP+6NADPH→G3P→Glucose (6 turns)','C4 plants (maize, sugarcane): overcome photorespiration; more efficient in hot/dry']}],
    'Respiration in Plants':         [{title:'Cellular Respiration Pathways',       SvgC:SVG_Mitochondria2,   parts:['Glycolysis (cytoplasm) - glucose→2 pyruvate; net 2 ATP; 2 NADH; no O2 needed','Pyruvate decarboxylation - pyruvate→Acetyl CoA+CO2+NADH (in matrix)','Krebs Cycle (matrix) - per pyruvate: 3NADH+1FADH2+1GTP+2CO2','ETC (inner membrane) - NADH and FADH2 oxidised; 34 ATP via chemiosmosis','Fermentation - anaerobic; yeast: ethanol+CO2; muscle: lactic acid; net 2 ATP','Pentose Phosphate Pathway - alternative; NADPH + ribose-5-phosphate'],facts:['Total from 1 glucose: 36-38 ATP (10 NADH×2.5 + 2 FADH2×1.5 + 4 substrate-level)','RQ = CO2/O2: carbohydrates=1.0; fats=0.7; proteins=0.9; ethanol>1','Pasteur effect: presence of O2 suppresses fermentation (anaerobic glycolysis)']}],
    'Plant Growth and Development':  [{title:'Plant Hormones',                      SvgC:SVG_FloweringPlant2, parts:['Auxin (IAA) - apical dominance; phototropism; cell elongation; delays abscission','Gibberellin (GA3) - stem elongation; seed germination; breaks dormancy; parthenocarpy','Cytokinin (Zeatin) - cell division; delays senescence; promotes lateral bud growth','Abscisic Acid (ABA) - stress hormone; stomatal closure; seed dormancy; inhibitor','Ethylene (C2H4) - fruit ripening; abscission; promotes senescence; gas at room temp','Photoperiodism - SDP (<critical dark period), LDP (>critical dark period), Day-neutral'],facts:['Apical dominance: auxin from apex inhibits lateral buds; cytokinin reverses this','Vernalisation: cold treatment required for flowering in wheat (Triticum)','Bolting: rapid stem elongation before flowering; caused by gibberellins']}],
    'Digestion and Absorption':      [{title:'Digestive System',                    SvgC:SVG_Earthworm,       parts:['Mouth - salivary amylase (ptyalin) digests starch→maltose; mucin; pH 6.8','Stomach - HCl (pH 1.5-3.5); pepsinogen→pepsin; churning; intrinsic factor (Vit B12)','Small intestine - duodenum+jejunum+ileum; bile (liver) + pancreatic juice; main absorption','Liver - bile (stored in gall bladder); emulsification of fats; glycogen storage; detox','Pancreas - amylase, lipase, trypsinogen, chymotrypsinogen; also insulin+glucagon','Large intestine - water+electrolyte absorption; bacterial synthesis of Vit K and B12'],facts:['Brush border enzymes: maltase, sucrase, lactase, peptidases in SI wall','Bile: no enzymes; emulsifies fats; bile salts + bile pigments (bilirubin, biliverdin)','Absorption: villi + microvilli (brush border) increase surface area ~600 times']}],
    'Breathing and Exchange of Gases':[{title:'Human Respiratory System',           SvgC:SVG_AtomFull,        parts:['Nasal cavity - filters, warms, moistens air; mucus+cilia; olfactory epithelium','Larynx - voice box; epiglottis prevents food entering; vocal cords','Trachea - 11cm long; C-shaped cartilage rings; ciliated epithelium','Bronchi → Bronchioles → Terminal bronchioles → Alveoli','Alveoli - 300 million; 70m² surface area; wall = 1 cell thick; capillary network','Diaphragm - contraction → inspiration; relaxation → expiration'],facts:['Lung volumes: Tidal=500mL; IRV=2500mL; ERV=1100mL; RV=1100mL; VC=3800mL','Oxygen: 97% as OxyHb; 3% dissolved in plasma','CO2: 70% as HCO3-; 23% carbamino-Hb; 7% dissolved; Bohr effect']}],
    'Body Fluids and Circulation':   [{title:'Heart Chambers and Blood Flow',       SvgC:SVG_HeartFull,       parts:['Right Atrium - receives deoxygenated blood from superior and inferior vena cava','Right Ventricle - pumps blood to lungs via pulmonary artery','Left Atrium - receives oxygenated blood from lungs via 4 pulmonary veins','Left Ventricle - thickest wall (3× right); pumps blood to body via aorta','SA Node - pacemaker; generates 72 impulses/min; right atrium wall','AV Node - delays impulse 0.1s; Bundle of His → Purkinje fibres → ventricles'],facts:['Cardiac output = SV × HR = 70mL × 72/min = ~5 L/min','Normal BP: 120/80 mmHg (systolic/diastolic)','Heart sounds: S1 (lubb) = AV valves close; S2 (dupp) = semilunar valves close']},
                                       {title:'Blood Cells and ABO Groups',          SvgC:SVG_BloodCells2,     parts:['RBC - biconcave; no nucleus; Hb; 5 million/mm³; 120 days lifespan','Neutrophil - 60-70%; lobed nucleus; phagocytosis of bacteria','Lymphocyte - 20-30%; large nucleus; B cells (antibodies) and T cells (cell-mediated)','Monocyte - 2-8%; kidney-shaped nucleus; becomes macrophage in tissues','Platelets - 1.5-3.5 lakh/mm³; thrombocytes; clotting; fragment of megakaryocyte','ABO: O (universal donor); AB (universal recipient); Rh+ vs Rh-'],facts:['Haemopoiesis: RBC production in red bone marrow','WBC: increases in infection (leukocytosis); decreases in AIDS','Clotting: damaged platelet→thrombokinase→prothrombin→thrombin→fibrinogen→fibrin']}],
    'Excretory Products':            [{title:'Nephron Structure',                    SvgC:SVG_Nephron2,        parts:['Glomerulus - capillary tuft; ultrafiltration at 125 mL/min (GFR)','Bowman\'s Capsule - collects filtrate; filters everything < 70,000 MW','PCT - reabsorbs 70% water, all glucose+amino acids, Na+, K+, HCO3-','Loop of Henle - descending (H2O permeable); ascending (NaCl, impermeable to water)','DCT - regulated by Aldosterone (Na+) and ADH (water reabsorption)','Collecting Duct - final concentration; urine → renal pelvis → ureter → bladder'],facts:['GFR = 125 mL/min; 180 L filtered/day → only 1.5 L urine (99% reabsorbed)','Glucose threshold: 180 mg/100mL blood; glycosuria = diabetes mellitus','Countercurrent multiplier (Loop of Henle) creates medullary osmotic gradient up to 1200 mOsm']}],
    'Locomotion and Movement':       [{title:'Sliding Filament Theory',              SvgC:SVG_LocomotionFull,  parts:['Sarcomere - functional unit; Z line to Z line; contains both actin and myosin','Myosin (thick) - A band; globular heads form cross-bridges; myosin ATPase','Actin (thin) - I band; troponin-tropomyosin complex; F-actin polymer','Sliding - actin slides over myosin; I band and H zone shorten; A band constant','Troponin C - Ca2+ binding displaces tropomyosin; exposes myosin-binding sites on actin','ATP role - myosin head bends (power stroke); ATP needed to detach head'],facts:['Ca2+ released from sarcoplasmic reticulum on nerve impulse (T-tubule)','Rigor mortis: ATP depletion post-death → permanent cross-bridges','Types: skeletal (voluntary, striated), cardiac (involuntary, striated), smooth (involuntary, non-striated)']}],
    'Neural Control and Coordination':[{title:'Neuron and Synapse',                 SvgC:SVG_AnimalCell,      parts:['Dendrites - tree-like processes; receive signals from other neurons','Cell body (Soma) - contains nucleus, Nissl bodies (RER); metabolic centre','Axon - carries impulse away from cell body; up to 1m long in humans','Myelin Sheath - Schwann cells (PNS) or oligodendrocytes (CNS); speeds conduction','Nodes of Ranvier - gaps in myelin; ion exchange; saltatory conduction','Synapse - synaptic knob; neurotransmitter vesicles; synaptic cleft (20nm)'],facts:['Resting potential: -70mV; Na+/K+ pump (3Na+ out, 2K+ in)','Action potential: Na+ rushes in (+40mV); repolarised by K+ rush out','Acetylcholine at NMJ and cholinergic synapses; destroyed by AChE']}],
    'Chemical Coordination and Integration':[{title:'Endocrine Glands',             SvgC:SVG_Endocrine,       parts:['Hypothalamus - master controller; releasing/inhibiting hormones; connects nervous and endocrine','Anterior Pituitary - GH, TSH, ACTH, FSH, LH, Prolactin (tropic hormones)','Posterior Pituitary - stores ADH (water reabsorption) and Oxytocin (uterine contraction)','Thyroid - T3+T4 (raise BMR, growth); Calcitonin (lowers blood Ca2+)','Adrenal Cortex - Cortisol (stress); Aldosterone (Na+ retention); Androgens','Pancreatic Islets - β cells: Insulin (lowers glucose); α cells: Glucagon (raises glucose)'],facts:['Feedback inhibition: high T4→inhibits TRH (hypothalamus) and TSH (pituitary)','Diabetes mellitus: Type I (no insulin production); Type II (insulin resistance)','Oxytocin = milk ejection reflex; uterine contraction during parturition']}],
    'Reproduction in Organisms':     [{title:'Types of Reproduction',               SvgC:SVG_MendelFull,      parts:['Binary fission - Amoeba, bacteria; simplest; genetic copy of parent','Budding - Hydra, yeast; daughter organism from parent body','Fragmentation - Spirogyra; body breaks and each part grows','Vegetative propagation - Ginger (rhizome), Potato (stem tuber), Onion (bulb)','Asexual spores - Rhizopus (zoospores), Penicillium (conidia); haploid; airborne','Sexual reproduction - two parents; gametes; meiosis; genetic variation'],facts:['Clone: genetically identical to parent; from asexual reproduction','Parthenogenesis: egg develops without fertilization; e.g., honey bee drones','Parthenocarpy: seedless fruit development without fertilization; e.g., banana']}],
    'Sexual Reproduction in Flowering Plants':[{title:'Flower and Double Fertilization', SvgC:SVG_FloweringPlant2, parts:['Stamen - filament + anther; pollen grains (male gametophyte) produced by meiosis','Pistil - stigma + style + ovary; ovule contains megaspore (female gametophyte)','Pollen grain - 2-celled: vegetative cell (tube) + generative cell (2 male gametes)','Pollination - self (autogamy) or cross (allogamy); wind, water, insects, animals','Pollen tube - germinates from pollen; grows down style to ovule','Double fertilization - syngamy (egg+sperm→2n zygote) + triple fusion (2 polar nuclei+sperm→3n endosperm)'],facts:['Double fertilization: unique to angiosperms; discovered by Nawaschin (1898)','Endosperm (3n): nutritive tissue for embryo; persistent in monocots (rice, wheat)','Apomixis: seed formation without fertilization; seen in Asteraceae']}],
    'Human Reproduction':            [{title:'Human Reproductive System',            SvgC:SVG_Endocrine,       parts:['Testes - seminiferous tubules (sperm); Leydig cells (testosterone); 34°C optimal','Spermatogenesis - spermatogonia→primary spermatocyte→secondary→spermatid→sperm; 64 days','Ovaries - Graafian follicle develops; ovulation on day 14; corpus luteum','Oogenesis - starts fetal life; primary oocyte arrested at prophase I until puberty','Menstrual cycle - follicular (1-13), ovulation (14), luteal (15-28) phases','Fertilization - ampulla of fallopian tube; acrosome reaction; cortical reaction (prevents polyspermy)'],facts:['LH surge → ovulation on day 14 of 28-day cycle','Corpus luteum → progesterone (maintains pregnancy for first 3 months)','HCG from placenta maintains corpus luteum; detected in pregnancy tests']}],
    'Reproductive Health':           [{title:'Reproductive Health',                  SvgC:SVG_MendelFull,      parts:['Contraceptive methods - barrier (condom, diaphragm), hormonal (pills), IUD (Cu-T), surgical','Natural methods - calendar, lactational amenorrhea (effective up to 6 months)','Sexually transmitted infections - gonorrhoea, syphilis, HIV, hepatitis B, chlamydia','Amniocentesis - amniotic fluid test for chromosomal abnormalities; detects Down syndrome','Test tube baby - IVF+ET; egg fertilized in vitro; embryo transferred to uterus','ZIFT/GIFT - Zygote/Gamete Intra-Fallopian Transfer'],facts:['MTP (Medical Termination of Pregnancy): legal in India up to 20 weeks','RCH programme: Reproductive and Child Health; government initiative','STDs: prevention by safe sex, single partner, vaccination (Hep B)']}],
    'Principles of Inheritance and Variation':[{title:"Mendel's Laws",              SvgC:SVG_MendelFull,      parts:['Law of Dominance - dominant allele masks recessive in F1 heterozygote','Law of Segregation - alleles separate during gamete formation (meiosis); most fundamental law','Law of Independent Assortment - genes on different chromosomes assort independently','Codominance - both alleles expressed; ABO blood groups (IA and IB)','Incomplete dominance - F1 intermediate; e.g. snapdragon flower color (red×white=pink)','Linkage - genes on same chromosome; inherited together; reduces recombination frequency'],facts:['Test cross: dominant phenotype × homozygous recessive (aa) → reveals genotype','Dihybrid F2 ratio: 9:3:3:1 (if genes on different chromosomes)','Sickle cell anaemia: HbA/HbS codominant; HbS/HbS = disease; malaria resistance in HbA/HbS']}],
    'Molecular Basis of Inheritance':[{title:'DNA Structure and Replication',       SvgC:SVG_DNAFull,         parts:['DNA double helix - antiparallel; B-form; right-handed; 10 bp/turn; 0.34nm/bp','Chargaff rule - A=T (2H bonds); G=C (3H bonds); A+G = T+C','Replication - semi-conservative (Meselson-Stahl 1958); bidirectional from oriC','Transcription - RNA polymerase reads template 3→5; mRNA made 5→3','Translation - ribosome; mRNA codons (3 nt) decoded by tRNA anticodons; start AUG','Lac operon - negative control; repressor binds operator; inducer (lactose) removes repressor'],facts:['Start codon: AUG (Met); Stop codons: UAA, UAG, UGA (non-sense codons)','Genetic code: 64 codons; 61 sense; 3 stop; degenerate (multiple codons for one aa)','One gene-one enzyme hypothesis: Beadle and Tatum (1941); Neurospora crassa']}],
    'Evolution':                     [{title:'Evolution Timeline and Evidence',      SvgC:SVG_AtomFull,        parts:['Chemical evolution - Miller-Urey (1953): CH4+H2+NH3+H2O+sparks→amino acids','First cells - 3.5 bya; prokaryotes; RNA world hypothesis (RNA first)','Lamarck - use and disuse; inheritance of acquired characters (disproved)','Darwin - natural selection; On Origin of Species (1859); struggle for existence','Modern Synthesis - Neo-Darwinism; Darwinism + Mendelian genetics + population genetics','Molecular evidence - DNA sequences; cytochrome c similarities; molecular phylogeny'],facts:['Hardy-Weinberg law: p²+2pq+q²=1; equilibrium maintained if no evolution','Genetic drift: random change in allele frequency; Bottleneck + Founder effect','Convergent evolution→analogous organs; Divergent evolution→homologous organs']}],
    'Human Health and Disease':      [{title:'Immune System and Diseases',           SvgC:SVG_BloodCells2,     parts:['Innate immunity - non-specific; barriers (skin, mucus), fever, NK cells, phagocytes','Adaptive immunity - specific; B cells (humoral: antibodies) + T cells (cell-mediated)','Antibody structure - Y-shaped; 4 chains; 5 classes (IgG most abundant)','Vaccines - stimulate primary immune response; memory cells; long-term protection','HIV - retrovirus; attacks CD4+ T helper cells; AIDS when CD4 count <200/mm³','Cancer - oncogenes; carcinogens; uncontrolled cell division; metastasis'],facts:['Primary response: slow (7-10 days); Secondary response: fast (1-3 days); higher titre','Monoclonal antibodies: from single B cell clone; diagnostic and therapeutic uses','Malaria: Plasmodium falciparum (most lethal); transmitted by female Anopheles mosquito']}],
    'Strategies for Enhancement in Food Production':[{title:'Food Production Enhancement', SvgC:SVG_BiotechFull, parts:['Plant breeding - hybridization; selection; mutation breeding (colchicine)','Heterosis (Hybrid vigour) - F1 hybrid superior to both parents; used in crops','Biofortification - crops bred for higher vitamins/minerals; Golden Rice (Vit A)','SCP (Single Cell Protein) - Spirulina, Fusarium; protein-rich food from microbes','Tissue culture - somatic embryogenesis; somaclonal variation; virus-free plants','Animal husbandry - cross-breeding; MOET (Multiple Ovulation Embryo Transfer)'],facts:['Sonalika (wheat): Norman Borlaug; Green Revolution variety; high-yielding, disease-resistant','MOET: superovulation + embryo collection → multiple offspring from superior female','Aquaculture: culture of aquatic organisms; pisciculture (fish), apiculture (bees)']}],
    'Microbes in Human Welfare':     [{title:'Useful Microorganisms',                SvgC:SVG_BiotechFull,     parts:['Lactobacillus - lactic acid fermentation; curd formation; probiotic','Saccharomyces cerevisiae - yeast; bread rising (CO2); alcohol fermentation (ethanol)','Aspergillus niger - citric acid production; industrial fermentation','Penicillium notatum - penicillin discovery (Fleming 1928); antibiotic','Trichoderma - biocontrol agent; produces enzymes; plant growth promotion','Biogas plant - mixed microbes (methanogens); CH4+CO2 from organic waste; gobar gas'],facts:['Primary sewage treatment: physical removal (sedimentation)','Secondary sewage treatment: BOD reduction by microbes; activated sludge process','Nitrogen fixation by Rhizobium (legumes) and Azotobacter (free-living)']}],
    'Biotechnology: Principles and Processes':[{title:'Recombinant DNA Technology', SvgC:SVG_BiotechFull,     parts:['Restriction endonuclease - cuts DNA at palindromic sequences; EcoRI: GAATTC; 3000+ known','Gel electrophoresis - agarose gel; DNA fragments separated by size; EtBr staining; UV visualisation','PCR - 3 steps: 94°C denature; 55°C anneal primers; 72°C extend (Taq pol); 30 cycles = 10⁹ copies','Cloning vector - plasmid (pBR322); ori; selectable markers; MCS; can be viral (bacteriophage)','Transformation - CaCl2 method or electroporation; introduces recombinant DNA into host','Southern blotting - DNA→membrane; probe hybridization; detects specific DNA sequence'],facts:['EcoRI: from E. coli R Y13; recognition site GAATTC; gives sticky ends (AATT)','Ti plasmid: from Agrobacterium tumefaciens; natural vector for plant genetic engineering','Bioreactor: large-scale production (10-100 litre); pH, O2, temperature controlled']}],
    'Biotechnology and its Applications':[{title:'Biotechnology Applications',      SvgC:SVG_BiotechFull,     parts:['Bt cotton - Bacillus thuringiensis Cry proteins; toxic to bollworm; insect resistant','Golden Rice - β-carotene (Vit A precursor) genes from daffodil; addresses Vit A deficiency','Insulin production - humulin; A+B chains separately in E. coli; combined; 1982 first biotech drug','Gene therapy - ADA deficiency (SCID); retroviral vector; first human gene therapy (1990)','Molecular diagnostics - PCR, ELISA; detect pathogens before symptoms','Transgenic animals - Rosie (cow, human protein in milk); OncoMouse (cancer research)'],facts:['Genetically Modified Organisms (GMO): modified for herbicide resistance, pest resistance, nutrition','RNAi: RNA interference; double-stranded RNA silences specific gene; used against pests','Bioprospecting: exploring biodiversity for commercially useful genes and molecules']}],
    'Organisms and Populations':     [{title:'Population Ecology',                  SvgC:SVG_EcoFull,         parts:['Population attributes - birth rate, death rate, age distribution, sex ratio','Growth models - J-curve (exponential: dN/dt=rN) and S-curve (logistic: dN/dt=rN(K-N)/K)','Carrying capacity K - maximum population size environment can support','Natality - birth rate; mortality - death rate; immigration; emigration','Age pyramid - growing (triangular), stable (bell), declining (urn shaped)','Species interactions - mutualism, commensalism, predation, competition, parasitism, amensalism'],facts:['r = intrinsic rate of natural increase; higher in small organisms','Competitive exclusion principle (Gause): two species competing for same resource→one excluded','Coevolution: predator-prey arms race; parasite-host evolution']}],
    'Ecosystem':                     [{title:'Ecosystem Structure and Function',    SvgC:SVG_EcoFull,         parts:['Producers - autotrophs; primary producers; chlorophyll; fix solar energy','Consumers - primary (herbivores), secondary, tertiary (carnivores)','Decomposers - saprotrophic fungi and bacteria; mineralisation','Food chain - linear energy transfer; grassland vs detritus food chains','Food web - complex interlinking food chains; more stable than food chain','Energy flow - unidirectional; 10% law (Lindeman 1942); pyramids of energy/biomass/number'],facts:['GPP (Gross Primary Productivity) = total photosynthesis; NPP = GPP - respiration','Biogeochemical cycles: nitrogen, carbon, phosphorus, water (sedimentary vs gaseous)','Tropical rainforest: highest NPP; Desert and deep ocean: lowest NPP']}],
    'Biodiversity and Conservation': [{title:'Biodiversity and Conservation',       SvgC:SVG_EcoFull,         parts:['Genetic diversity - within species; 50,000 rice varieties in India','Species diversity - number of species; species richness; Shannon index','Ecosystem diversity - variety of habitat types; forest, wetland, grassland, ocean','In-situ conservation - protect in natural habitat; national parks, biosphere reserves, wildlife sanctuaries','Ex-situ conservation - outside habitat; zoos, botanical gardens, cryopreservation, gene banks','Biodiversity hotspot - >1500 endemic plant species AND lost >70% original habitat; 34 worldwide'],facts:['India has 2 hotspots: Western Ghats + Sri Lanka; and Eastern Himalayas','IUCN Red List: Extinct, EW, CR, EN, VU, NT, LC','Alien/invasive species: Lantana camara, water hyacinth (Eichhornia) threaten native biodiversity']}],
    'Environmental Issues':          [{title:'Environmental Issues',                 SvgC:SVG_EcoFull,         parts:['Global warming - greenhouse gases (CO2, CH4, N2O, CFCs); +1.5°C catastrophic','Ozone depletion - CFCs release Cl; Cl+O3→ClO+O2; Antarctica ozone hole','Acid rain - SO2+NOx+H2O→H2SO4+HNO3; pH<5.6; damages ecosystems and buildings','Water pollution - BOD (biological oxygen demand); eutrophication; heavy metals','Biomagnification - DDT, mercury accumulate up food chain (trophic magnification)','Radioactive waste - nuclear power and weapons; long half-lives; contamination'],facts:['Montreal Protocol (1987): international treaty to phase out CFCs; successful','BOD: high BOD = high pollution = low dissolved O2 = fish kill','Noise pollution: >75 dB harmful; industrial areas up to 120 dB']}],
    // Chemistry
    'Some Basic Concepts of Chemistry':[{title:'Mole Concept',                      SvgC:SVG_AtomFull,        parts:['Mole - 6.022×10²³ entities (Avogadro number); SI unit of amount','Molar mass - mass of 1 mole in grams; numerically = atomic/molecular weight','Molarity (M) - moles of solute per litre of solution; temperature-dependent','Molality (m) - moles of solute per kg of solvent; temperature-independent','Empirical formula - simplest whole number ratio of atoms in compound','Molecular formula - actual number of atoms; multiple of empirical formula'],facts:['1 mole of any gas at STP (0°C, 1 atm) = 22.4 L (molar volume)','Limiting reagent: determines maximum product; used up completely','% composition and % yield important in stoichiometry calculations']}],
    'Structure of Atom':             [{title:'Atomic Structure — Bohr Model',       SvgC:SVG_AtomFull,        parts:['Nucleus - protons (+1) + neutrons (0); diameter ~10⁻¹⁵ m (femtometre)','Electron shells - K(2), L(8), M(18), N(32); maximum = 2n² electrons','Bohr model - circular orbits; quantised energy; only for H-like atoms','Quantum numbers - n (shell), l (subshell 0 to n-1), m (-l to +l), s (+½,-½)','Aufbau principle - fill lowest energy orbitals first; 1s<2s<2p<3s<3p<4s<3d','Heisenberg uncertainty - Δx·Δp ≥ h/4π; cannot know both position and momentum exactly'],facts:['Wave-particle duality: λ = h/mv (de Broglie 1924)','Pauli exclusion: no two electrons can have all 4 quantum numbers same','Hund\'s rule: maximise unpaired electrons in degenerate orbitals (maximum multiplicity)']}],
    'Classification of Elements and Periodicity':[{title:'Periodic Table Trends',   SvgC:SVG_AtomFull,        parts:['Atomic radius - increases down group (more shells); decreases across period (more Zeff)','Ionization energy - increases across period; decreases down group; Na< Mg < Al < Si','Electron affinity - increases across period; Cl has highest (not F; F is small)','Electronegativity - F highest (3.98 Pauling); increases across period; decreases down group','Metallic character - decreases left to right; increases top to bottom','Shielding effect - inner electrons reduce effective nuclear charge felt by outer electrons'],facts:['Lanthanide contraction: 4f electrons poor shielding → size decrease from La to Lu','Noble gases: complete valence shell; highest IE; chemically inert (except Xe compounds)','Diagonal relationship: Li-Mg, Be-Al, B-Si have similar properties']}],
    'Chemical Bonding and Molecular Structure':[{title:'Chemical Bonding',          SvgC:SVG_MoleculeFull,    parts:['Ionic bond - electrostatic attraction; metal gives electrons to non-metal; NaCl, MgO','Covalent bond - sharing of electrons; sigma (σ) and pi (π) bonds','VSEPR theory - lone pairs repel more than bonding pairs; determines shape','sp3 hybridisation - CH4 (109.5°, tetrahedral); NH3 (107°, pyramidal); H2O (104.5°, bent)','sp2 hybridisation - C2H4 (120°, trigonal planar); BF3; benzene','sp hybridisation - C2H2 (180°, linear); CO2; BeCl2'],facts:['Polarity: depends on electronegativity difference AND molecular symmetry (CCl4 is non-polar)','Bond order = (bonding electrons - antibonding electrons)/2','O2 is paramagnetic (2 unpaired electrons); explained by MOT only']}],
    'States of Matter':              [{title:'States of Matter and Gas Laws',       SvgC:SVG_AtomFull,        parts:['Ideal gas - PV=nRT; no intermolecular forces; no volume of molecules','van der Waals - (P+an²/V²)(V-nb)=nRT; a corrects pressure; b corrects volume','Boyle\'s law - PV=constant at constant T; isothermal compression','Charles\'s law - V/T=constant at constant P; V extrapolates to 0 at -273°C','Dalton\'s law - Ptotal=P1+P2+P3... each gas acts independently','Graham\'s law - rate ∝ 1/√M; lighter gas diffuses faster'],facts:['Critical temperature Tc: above which gas cannot be liquefied (CO2: 31°C)','Viscosity of liquids decreases with temperature; gases increase with temperature','Surface tension of liquids decreases with temperature; detergents decrease it']}],
    'Thermodynamics':                [{title:'Thermodynamic Laws',                  SvgC:SVG_AtomFull,        parts:['System - matter under study; open/closed/isolated systems','First Law - ΔU=q+w; energy conserved; U is state function; q and w are path functions','Enthalpy H=U+PV; ΔH=qp (heat at constant pressure); ΔH=ΔU+ΔngRT','Entropy S - disorder; ΔSuniverse>0 for spontaneous; ΔS=qrev/T','Gibbs Free Energy G=H-TS; spontaneous if ΔG<0; equilibrium if ΔG=0','Standard state - 1 atm, 298K, 1M concentration; standard enthalpies tabulated'],facts:['Hess\'s law: ΔH is path-independent (state function); can add/subtract reactions','Exothermic: ΔH<0 | Endothermic: ΔH>0 (takes heat from surroundings)','Bond dissociation enthalpy: energy to break 1 mole of bonds in gaseous molecules']}],
    'Equilibrium':                   [{title:'Chemical and Ionic Equilibrium',      SvgC:SVG_AtomFull,        parts:['Dynamic equilibrium - rate of forward = rate of reverse; concentrations constant','Kc = [products]/[reactants]; only gaseous and dissolved species included','Kp = Kc(RT)^Δn; Δn = moles gas products - moles gas reactants','Le Chatelier principle - system shifts to oppose imposed stress (T, P, concentration)','pH = -log[H+]; pOH = -log[OH-]; pH+pOH = 14 at 25°C','Buffer - weak acid + its conjugate base; resists pH change; Henderson-Hasselbalch'],facts:['Kc>1: products favoured | Kc<1: reactants favoured at equilibrium','Ka×Kb = Kw = 10⁻¹⁴ at 25°C (conjugate acid-base pair)','Solubility product Ksp: PbCl2 ⇌ Pb²⁺+2Cl⁻; Ksp=[Pb²⁺][Cl⁻]²']}],
    'Redox Reactions':               [{title:'Redox Reactions and Oxidation Number', SvgC:SVG_ElectroChemFull, parts:['Oxidation - loss of electrons; increase in oxidation state; OIL','Reduction - gain of electrons; decrease in oxidation state; RIG','Oxidation number rules - F always -1; O usually -2 (except peroxides); H usually +1','Balancing redox - half-reaction method; balance atoms then charge with e-','Disproportionation - same element oxidised AND reduced simultaneously; e.g. Cl2+NaOH','Comproportionation - opposite of disproportionation; two different oxidation states→same'],facts:['MnO4⁻ in acid: Mn +7→+2 (gain 5e⁻); in neutral: +7→+4; in base: +7→+6','Cr2O7²⁻ in acid: Cr +6→+3 (gain 3e⁻ per Cr; 6e⁻ total)','Strongest oxidising agents: F2>MnO4⁻>Cr2O7²⁻>HNO3 (conc.)>Cl2']}],
    'Hydrogen':                      [{title:'Hydrogen and Water',                  SvgC:SVG_AtomFull,        parts:['Isotopes - Protium ¹H (99.985%), Deuterium ²H (0.015%), Tritium ³H (radioactive)','Preparation - reaction of metals with dilute acids; steam reforming of methane','Water structure - V-shaped; sp3 O; bond angle 104.5°; strong H-bonding; high BP (100°C)','Hardness of water - temporary (Ca/Mg bicarbonates; remove by boiling) and permanent (sulphates; ion exchange)','Heavy water D2O - neutron moderator in nuclear reactors; used in NMR; density 1.11 g/mL','H2O2 - weak acid; oxidising and reducing agent; bleaching agent; 2H2O2→2H2O+O2'],facts:['H-bonding in water: O-H...O; strongest among common H-bond donors (N-H, O-H, F-H)','Hydrogen economy: H2 as fuel; fuel cell (H2+O2→H2O+electricity); zero emission','Hydrides: saline (NaH), covalent (CH4, H2O, NH3), metallic/interstitial (TiH2)']}],
    's-Block Elements':              [{title:'Alkali and Alkaline Earth Metals',    SvgC:SVG_AtomFull,        parts:['Group 1 (Li,Na,K,Rb,Cs,Fr) - ns1; very reactive; soft; low MP/BP; flame colours','Group 2 (Be,Mg,Ca,Sr,Ba) - ns2; harder than group 1; higher MP; less reactive than group 1','Reactivity - increases down group; Li most anomalous (resembles Mg due to diagonal relationship)','Flame test - Li (crimson/red), Na (yellow), K (violet/lilac), Ca (brick red), Ba (apple green)','NaOH production - chlor-alkali process (electrolysis of brine); also produces Cl2 and H2','Biological importance - Na+/K+ pump; Ca2+ in bones, teeth, blood clotting, nerve signaling'],facts:['Solvay process: Na2CO3 from NaCl+NH3+CO2; most important industrial process for alkali','Gypsum: CaSO4·2H2O | Plaster of Paris: CaSO4·½H2O (sets by absorbing water)','Li has highest charge density; anomalous properties compared to rest of group 1']}],
    'p-Block Elements (11)':         [{title:'p-Block Elements — Group 13-18',      SvgC:SVG_AtomFull,        parts:['Group 13 (B,Al,Ga,In,Tl) - Al most abundant metal; Al2O3 amphoteric; BF3 Lewis acid','Group 14 (C,Si,Ge,Sn,Pb) - C allotropes (diamond, graphite, C60); Si semiconductor','Group 15 (N,P,As,Sb,Bi) - N2 very stable (triple bond); P allotropes (white, red, black)','Group 16 (O,S,Se,Te,Po) - O=most electronegative after F; S allotropes (rhombic, monoclinic)','Group 17 - Halogens (F,Cl,Br,I); F most reactive; Cl from NaCl electrolysis','Group 18 - Noble gases (He,Ne,Ar,Kr,Xe,Rn); full outer shell; Xe forms compounds'],facts:['N: no d-orbitals; can only form 4 bonds max; forms pπ-pπ multiple bonds','PCl3: sp3 pyramidal | PCl5: sp3d trigonal bipyramidal; P can expand octet (d-orbitals)','Ozone O3: V-shaped (sp3 with lone pair); protects from UV; unstable at low altitude']}],
    'Organic Chemistry: Basic Principles':[{title:'Organic Chemistry Basics',      SvgC:SVG_MoleculeFull,    parts:['Hybridisation - sp3 (109.5°, tetrahedral), sp2 (120°, planar), sp (180°, linear)','Inductive effect - permanent; through σ bonds; -I: F>Cl>Br>I>OH; +I: alkyl groups','Resonance - delocalization of π electrons; depicted by double-headed arrow between structures','Hyperconjugation - σ C-H electrons delocalise into adjacent empty p or π*; stabilises carbocations','Electrophile - electron-deficient species; attacks electron-rich centre; H+, Br+, NO2+','Nucleophile - electron-rich species; attacks electron-poor centre; OH-, CN-, NH3, H2O'],facts:['Carbocation stability: 3°>2°>1°>methyl (due to hyperconjugation and induction)','Carbanion stability: opposite of carbocation; methyl>1°>2°>3°','Free radicals: stabilised by hyperconjugation and induction; 3°>2°>1°']}],
    'Hydrocarbons':                  [{title:'Hydrocarbons',                        SvgC:SVG_MoleculeFull,    parts:['Alkanes (CnH2n+2) - sp3 C; free rotation; free radical halogenation (UV light)','Alkenes (CnH2n) - sp2 C; electrophilic addition; Markovnikov rule; geometrical isomerism','Alkynes (CnH2n-2) - sp C; triple bond; more acidic than alkenes; electrophilic addition','Benzene (C6H6) - sp2; 6π electrons; aromatic; electrophilic aromatic substitution (EAS)','Markovnikov rule - in addition of HX to alkene: H adds to C with more H; X to C with less H','Saytzeff rule - in elimination: major product has more substituted double bond'],facts:['Wurtz reaction: 2RX + 2Na → R-R + 2NaX; carbon-carbon bond formation','Ozonolysis: cleaves C=C; identifies position of double bond','Benzene resonance energy = 150 kJ/mol; less reactive than alkenes toward addition']}],
    'Environmental Chemistry':       [{title:'Environmental Chemistry',              SvgC:SVG_EcoFull,         parts:['Greenhouse effect - CO2, CH4, N2O, H2O vapour, CFCs; trap outgoing IR radiation','Ozone layer depletion - CFCs+UV→Cl; Cl+O3→ClO+O2; Antarctica ozone hole each spring','Acid rain - pH<5.6; SO2+H2O→H2SO3; NOx+H2O→HNO3; damages plants, buildings, aquatic life','BOD (Biological Oxygen Demand) - O2 needed by bacteria to decompose organic matter; high=polluted','Photochemical smog - NOx + hydrocarbons + UV → ozone + PAN; Los Angeles type','Classical smog - SO2 + smoke + fog; London type; reducing type'],facts:['Clean Air Act; Kyoto Protocol (1997); Paris Agreement (2015): CO2 reduction targets','Mercury biomagnification: Minimata disease (Japan 1956); methyl mercury poisoning','pH of normal rain = 5.6 (due to dissolved CO2 forming H2CO3)']}],
    'Solid State':                   [{title:'Crystal Systems and Defects',         SvgC:SVG_AtomFull,        parts:['Simple cubic - Z=1; APF=52%; CN=6; only Po','BCC (Body Centred Cubic) - Z=2; APF=68%; CN=8; Na,K,Fe,Cr,W','FCC/CCP (Face Centred Cubic) - Z=4; APF=74%; CN=12; Cu,Ag,Au,Al,Ni','HCP (Hexagonal Close Packing) - Z=6 (eff.); APF=74%; CN=12; Mg,Zn,Ti','Schottky defect - equal cation+anion missing; decreases density; NaCl,KCl','Frenkel defect - cation moves to interstitial; no density change; ZnS,AgCl'],facts:['Close packed: ABABAB=HCP; ABCABC=CCP(FCC)','Tetrahedral voids=2N; Octahedral voids=N (N=number of atoms in CCP)','Electrical conductivity: metals (band theory) > semiconductors > insulators']}],
    'Solutions':                     [{title:'Solutions and Colligative Properties', SvgC:SVG_AtomFull,        parts:['Mole fraction XA=nA/(nA+nB); dimensionless; sum of all mole fractions=1','Raoult\'s law - PA=XA×PA°; ideal solution; Henry\'s law for gases in liquid','Colligative properties - depend on number of solute particles; 4 types','Relative lowering of vapour pressure - ΔP/P°A=XB; simplest colligative property','Elevation of boiling point - ΔTb=Kb×m; Kb(water)=0.52 K kg mol⁻¹','Depression of freezing point - ΔTf=Kf×m; Kf(water)=1.86 K kg mol⁻¹'],facts:['Van\'t Hoff factor i: accounts for dissociation/association; NaCl i≈2 if fully dissociated','Osmotic pressure π=iMRT; used to determine molar mass of polymers and large molecules','Reverse osmosis: applied pressure > osmotic pressure; used in water purification']}],
    'Electrochemistry':              [{title:'Electrochemical Cell (Daniell Cell)',  SvgC:SVG_ElectroChemFull, parts:['Galvanic cell - spontaneous redox → electrical energy; Daniell cell (Zn/Cu)','Electrolytic cell - electrical energy → non-spontaneous redox; electrolysis','Standard electrode potential E° - vs SHE (E°=0.00V) at 1M, 1 atm, 298K','Cell EMF = E°cathode - E°anode; positive EMF = spontaneous = ΔG negative','Faraday\'s first law - m=ZIt; Z=electrochemical equivalent=M/nF','Nernst equation - E=E°-(0.0592/n)logQ at 298K; links EMF and concentration'],facts:['1 Faraday=96485 C mol⁻¹=charge of 1 mole electrons','Kohlrausch law: Λm°(electrolyte)=sum of λ°(individual ions) at infinite dilution','Conductance=1/Resistance; Molar conductance increases with dilution']}],
    'Chemical Kinetics':             [{title:'Chemical Kinetics',                   SvgC:SVG_AtomFull,        parts:['Rate of reaction - Δ[concentration]/Δt; rate law determined experimentally','Zero order - rate=k; [A]t=[A]0-kt; t½=[A]0/2k; unit of k: mol L⁻¹ s⁻¹','First order - rate=k[A]; [A]t=[A]0e⁻ᵏᵗ; t½=0.693/k; unit: s⁻¹','Second order - rate=k[A]²; 1/[A]t=1/[A]0+kt; unit: L mol⁻¹ s⁻¹','Arrhenius equation - k=Ae⁻ᴱᵃ/ᴿᵀ; lnk=-Ea/RT+lnA; Ea from ln k vs 1/T plot','Activation energy Ea - minimum energy required; lowered by catalyst'],facts:['Order determined by experiment; not from stoichiometry','Half-life of first order is constant (independent of initial concentration)','Integrated rate laws used to determine order from concentration-time data']}],
    'Surface Chemistry':             [{title:'Surface Chemistry and Colloids',       SvgC:SVG_AtomFull,        parts:['Adsorption - accumulation at surface; adsorbent vs adsorbate','Physisorption - weak Van der Waals; reversible; multilayer; low Ea; decreases with T','Chemisorption - strong covalent/ionic bond; irreversible; monolayer; high Ea; optimal T','Freundlich isotherm - x/m=kP^(1/n); empirical; n between 1 and 10','Colloid - particle size 1-1000 nm; shows Tyndall effect; Brownian motion','Coagulation - adding electrolyte destroys colloid; Hardy-Schulze rule: higher charge = more effective'],facts:['Tyndall effect: scattering of light by colloidal particles; distinguishes colloid from solution','Gold number: minimum amount of protective colloid to prevent coagulation by 1% NaCl','Emulsion: liquid in liquid; oil-in-water (milk) or water-in-oil (butter); stabilised by emulsifier']}],
    'General Principles of Metallurgy':[{title:'Extraction of Metals',              SvgC:SVG_AtomFull,        parts:['Ore - naturally occurring mineral with economically viable metal','Concentration - gravity (hydraulic washing), froth flotation (sulphides), magnetic, leaching (Al2O3)','Calcination - heating without air; removes CO2 from carbonates; MgCO3→MgO+CO2','Roasting - heating in excess air; converts sulphides to oxides; ZnS+O2→ZnO+SO2','Reduction - smelting; carbon or CO reduces oxide; ZnO+C→Zn+CO','Refining - electrolytic (Cu, Al), zone refining (semiconductors, Si, Ge), vapour phase (Ni: Mond process)'],facts:['Ellingham diagram: ΔG vs T; predicts feasibility of reduction by carbon','Thermite welding: Al+Fe2O3→Al2O3+Fe (aluminothermic reaction; very exothermic)','Copper: Cu2S+O2→2Cu+SO2 (self-reduction method; no external reducing agent)']}],
    'p-Block Elements (12)':         [{title:'p-Block Elements Class 12',           SvgC:SVG_AtomFull,        parts:['Group 15 - Oxides of N (N2O to N2O5); H3PO3 is diprotic (one P-H bond, not ionizable)','Group 16 - SO2 (V-shaped, sp3); H2SO4 (contact process); SO3 (trigonal planar, sp2)','Group 17 - Interhalogen compounds (ClF, ClF3, BrF5, IF7); oxoacids (HOCl to HClO4)','Group 18 - Xe compounds: XeF2 (linear sp3d), XeF4 (square planar sp3d2), XeF6 (distorted octahedral)','Nitric acid - Ostwald: 4NH3+5O2→4NO+6H2O; then NO→NO2→HNO3','Sulphuric acid - Contact: S+O2→SO2; 2SO2+O2→2SO3 (V2O5 catalyst); SO3+H2SO4→oleum'],facts:['Concentrated H2SO4: dehydrating, oxidising, sulphonating agent; oily, hygroscopic','Concentrated HNO3 on metals: passivation of Fe, Cr, Al due to oxide layer','Bleaching powder: Ca(OCl)Cl; releases Cl2 with CO2+H2O']}],
    'd and f Block Elements':        [{title:'Transition Metals (d-block)',          SvgC:SVG_AtomFull,        parts:['Electronic configuration - (n-1)d1-10 ns0-2; variable oxidation states due to d electrons','Colour - d-d transition absorbs visible light; complementary colour observed','Magnetic properties - paramagnetic (unpaired d electrons); ferromagnetic (Fe, Co, Ni)','Catalytic activity - variable oxidation state; surface adsorption; V2O5, Ni, Pt, Fe','Complex formation - d-orbitals available to accept lone pairs from ligands','Tungsten W - highest MP (3422°C) among all metals; many d-d unpaired electrons'],facts:['Mn has most oxidation states (+2 to +7); Cr is +2 to +6','KMnO4 in acid: Mn +7→+2 | in neutral: +7→+4 | in alkali: +7→+6','K2Cr2O7 (orange/dichromate) vs CrO4²⁻ (yellow/chromate); equilibrium at pH 4']}],
    'Coordination Compounds':        [{title:'Coordination Chemistry',               SvgC:SVG_AtomFull,        parts:['Central metal ion - Lewis acid; accepts electron pairs from ligands','Ligands - Lewis bases; monodentate (NH3, Cl⁻, H2O), bidentate (en, ox), hexadentate (EDTA)','Coordination number - number of donor atoms directly bonded to metal (2,4,6 common)','Werner\'s theory - primary valency (oxidation state) + secondary valency (coordination number)','Crystal field theory - explains colour and magnetism; Δo (octahedral splitting)','Isomerism - ionisation (different counter ions), linkage (ambidentate ligand), optical, geometrical'],facts:['EDTA: hexadentate; forms very stable chelate complexes; Kf very high','Spectrochemical series: I⁻<Br⁻<Cl⁻<F⁻<OH⁻<H2O<NH3<en<NO2⁻<CN⁻ (increasing field strength)','cis-platin: anti-cancer drug; [Pt(NH3)2Cl2] cis isomer; not trans']}],
    'Haloalkanes and Haloarenes':    [{title:'Haloalkanes — Reactions',              SvgC:SVG_MoleculeFull,    parts:['SN1 - unimolecular; rate=k[RX]; forms carbocation; racemisation; 3°>2°>1°','SN2 - bimolecular; rate=k[RX][Nu⁻]; backside attack; Walden inversion; 1°>2°>3°','E1 - elimination; carbocation intermediate; follows SN1 conditions (3°, polar solvent)','E2 - concerted; anti-periplanar requirement; strong base; Saytzeff product favoured','Grignard reagent RMgX - prepared in dry ether; very reactive; nucleophile+base','Nucleophilic aromatic substitution - requires electron-withdrawing groups on ring; ortho/para positions'],facts:['Order of reactivity with Nu: RI>RBr>RCl>RF (C-X bond strength)','Markovnikov addition of HX to alkene gives 2° or 3° alkyl halide','Freon (CCl2F2): refrigerant; depletes ozone; being phased out under Montreal Protocol']}],
    'Alcohols, Phenols and Ethers':  [{title:'Alcohols and Phenols',                SvgC:SVG_MoleculeFull,    parts:['Primary ROH - CH2OH terminal; oxidised to aldehyde then carboxylic acid','Secondary R2CHOH - oxidised to ketone only','Tertiary R3COH - not easily oxidised; E1/E2 predominates over SN','Phenol (C6H5OH) - pKa=10; more acidic than alcohol; OH activates ring (ortho, para directing)','Dehydration - conc H2SO4; >170°C gives alkene; 140°C gives ether (Williamson synthesis)','Lucas test - ZnCl2/HCl: 3° (immediate turbidity), 2° (5 min), 1° (no reaction at room T)'],facts:['Kolbe reaction: phenol + CO2 (under pressure) → salicylic acid (aspirin precursor)','Reimer-Tiemann: phenol + CHCl3 + KOH → salicylaldehyde (ortho-hydroxybenzaldehyde)','Denatured alcohol: ethanol + methanol; unfit for drinking; used industrially']}],
    'Aldehydes, Ketones and Carboxylic Acids':[{title:'Carbonyl Compounds',         SvgC:SVG_MoleculeFull,    parts:['Aldehyde RCHO - carbonyl at terminal C; easily oxidised to RCOOH','Ketone RCOR\' - carbonyl at internal C; not oxidised by mild agents (Tollens, Fehling)','Nucleophilic addition - CN⁻, RMgX, NaBH4 attack sp2 carbonyl carbon','Aldol condensation - base+α-H required; β-hydroxy carbonyl → α,β-unsaturated carbonyl','Cannizzaro reaction - HCHO or ArCHO (no α-H); disproportionation with strong base','Carboxylic acid - strongest organic acid; resonance-stabilised carboxylate anion'],facts:['Tollens test (AgNH3): silver mirror with aldehydes only; ketones do not react','Fehling test (Cu2+ complex): Cu2O brick-red precipitate with aldehydes (not aromatic)','Acidity order: RCOOH>ArOH>H2O>ROH>RC≡CH>RH (reverse of H+ donation ability)']}],
    'Amines':                        [{title:'Amines',                               SvgC:SVG_MoleculeFull,    parts:['Primary R-NH2 - one alkyl on N; basic due to lone pair; stronger base than aromatic','Secondary R2NH - two alkyl groups; even more basic than primary (more electron donation)','Tertiary R3N - three alkyl groups; less basic than secondary (steric hindrance to protonation)','Aniline (ArNH2) - lone pair delocalised into ring; much weaker base than aliphatic amines','Hofmann rearrangement - amide+Br2+KOH→amine with one less C; rearrangement of N=C=O','Diazonium salts ArN2+Cl⁻ - prepared at 0-5°C; coupling reaction gives azo dyes'],facts:['Aniline (pKa(conjugate acid)=4.6) << methylamine (pKa=10.6): ring delocalisation reduces basicity','Gabriel synthesis: phthalimide→primary amine only (no 2° or 3° contamination)','Mustard gas (β-chloroethyl sulphide): vesicant; chemical warfare agent; WWII']}],
    'Biomolecules':                  [{title:'Biological Molecules',                 SvgC:SVG_DNAFull,         parts:['Monosaccharides - glucose (C6H12O6); aldose vs ketose; α and β anomers','Disaccharides - maltose (α-1,4 glucose-glucose); sucrose (glucose-fructose, non-reducing)','Polysaccharides - starch (amylose+amylopectin); cellulose (β-1,4 linkage; structural)','Protein levels - primary (sequence), secondary (helix/sheet), tertiary (3D fold), quaternary','Enzyme kinetics - Michaelis-Menten; Km = substrate concentration at ½Vmax','DNA vs RNA - deoxyribose vs ribose; thymine vs uracil; double vs single stranded'],facts:['Reducing sugars: free anomeric -OH; glucose, fructose, maltose (NOT sucrose)','Denaturation: loss of 3D structure; reversible (by cooling) or irreversible (by boiling)','Essential amino acids (8): Val, Leu, Ile, Lys, Met, Phe, Thr, Trp; must come from diet']}],
    'Polymers':                      [{title:'Polymers',                              SvgC:SVG_MoleculeFull,    parts:['Addition polymer - monomer adds; no byproduct; polyethylene, PVC, polystyrene, Teflon','Condensation polymer - monomers join with elimination of H2O (or HCl); nylon, polyester, Bakelite','Nylon-6,6 - hexamethylenediamine + adipic acid; polyamide; synthetic fibre; Tg=263°C','Nylon-6 - caprolactam; ring-opening polymerisation; polyamide','Bakelite - phenol + formaldehyde; thermosetting; cross-linked network; cannot be remoulded','Natural rubber - cis-polyisoprene; vulcanisation with S (3-5%): improves elasticity and strength'],facts:['PET (Dacron): polyethylene terephthalate; polyester; bottles, clothing','Degree of polymerisation n: number of monomer units in polymer chain','PHBV: biodegradable; used in packaging; produced by bacteria']}],
    'Chemistry in Everyday Life':    [{title:'Chemistry in Daily Life',              SvgC:SVG_AtomFull,        parts:['Analgesics - aspirin (antipyretic+anti-inflammatory+antiplatelet); ibuprofen; morphine (narcotic)','Antibiotics - penicillin (beta-lactam; kills bacteria); tetracycline (bacteriostatic); streptomycin','Antacids - NaHCO3; Mg(OH)2; Al(OH)3; neutralise excess HCl; reduce acidity','Antiseptics - applied to living tissue; Dettol (chloroxylenol+terpineol); boric acid; iodine','Disinfectants - applied to non-living; bleach (1% NaOCl); phenol at high concentration','Soaps - sodium (hard)/potassium (soft) salts of fatty acids; micelle formation'],facts:['Sulfa drugs: 1st antibiotics (1930s); inhibit folic acid synthesis in bacteria','Synthetic sweeteners: saccharin (500× sweet); aspartame (100×); sucralose (600×); low-calorie','Rocket propellants: UDMH+N2O4 (liquid); NH4ClO4+Al (solid); liquid H2+O2 (cryogenic)']}],
    // Physics
    'Physical World':                [{title:'Fundamental Forces in Nature',         SvgC:SVG_AtomFull,        parts:['Gravitational force - weakest; infinite range; always attractive; F=Gm1m2/r²','Electromagnetic force - 10⁴² times stronger than gravity; infinite range; repulsive+attractive','Weak nuclear force - short range (~10⁻¹⁸m); responsible for beta decay; radioactivity','Strong nuclear force - strongest; very short range (10⁻¹⁵m); holds nucleus together; 100× EM','Grand Unified Theory (GUT) - attempts to unify 3 forces (not gravity)','Standard Model - describes quarks, leptons; doesn\'t include gravity'],facts:['All forces except gravity explained by exchange of virtual particles','Graviton: hypothetical particle mediating gravity; not yet detected','String theory: attempts to unify all 4 forces; requires extra dimensions']}],
    'Units and Measurements':        [{title:'Units, Dimensions and Errors',         SvgC:SVG_AtomFull,        parts:['SI base units - metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)','Dimensional analysis - [M^a L^b T^c]; checking equations; unit conversions','Significant figures - rules: non-zero digits + zeros between + trailing zeros after decimal','Absolute error = |measured - true|; mean absolute error = Δa_mean','Relative error = Δa/a; percentage error = (Δa/a)×100%','Random error - reduced by repetition; systematic error - corrected by calibration'],facts:['Dimensional formula of force: [MLT⁻²] | Planck constant: [ML²T⁻¹]','Light year = distance light travels in 1 year = 9.46×10¹⁵ m','Parallax method: distance = b/θ (b=baseline, θ=parallax angle in radians)']}],
    'Motion in a Straight Line':     [{title:'1D Kinematics',                        SvgC:SVG_AtomFull,        parts:['Position vector - reference to origin; displacement = final - initial position','Velocity - v=ds/dt (instantaneous); average v=Δs/Δt; vector quantity','Acceleration - a=dv/dt; can be negative (deceleration); constant or variable','Equations of motion - v=u+at; s=ut+½at²; v²=u²+2as; s_n=u+a(2n-1)/2','Free fall - a=g=9.8 m/s² downward; initial velocity=0 for dropped object','Relative motion - velocity of A relative to B: VAB=VA-VB'],facts:['Area under v-t graph = displacement; slope = acceleration','Area under a-t graph = change in velocity; slope of x-t graph = velocity','Motion in uniform gravitational field: parabolic trajectory']}],
    'Motion in a Plane':             [{title:'Projectile and Circular Motion',       SvgC:SVG_WaveFull,        parts:['Projectile motion - horizontal: uniform (vx=ucosθ); vertical: free fall (g downward)','Range R = u²sin2θ/g; maximum at θ=45°; same for complementary angles (30° and 60°)','Time of flight T = 2usinθ/g; maximum height H = u²sin²θ/2g','Uniform circular motion - constant speed; centripetal acceleration a=v²/r=ω²r (toward center)','Centripetal force - not a new force; provided by tension, normal, gravity, friction as needed','Relative velocity in 2D - vector subtraction; rain-umbrella problems'],facts:['At highest point of projectile: vy=0; vx=ucosθ; speed is minimum','Centripetal force = mv²/r = mω²r; directed toward center of circle','Banking angle: tanθ=v²/rg (no friction); for friction: tanθ=(v²/rg±μ)/(1∓μv²/rg)']}],
    'Laws of Motion':                [{title:'Newton\'s Laws of Motion',              SvgC:SVG_ElectricFull,    parts:['First Law (Inertia) - every body continues its state unless external net force acts','Second Law - F=ma=dp/dt; net force proportional to rate of change of momentum','Third Law - action and reaction: equal magnitude, opposite direction, different bodies','Static friction fs≤μsN; kinetic friction fk=μkN; rolling friction (smallest)','Free body diagram - all forces on one object; resolve; apply Newton\'s 2nd law','Impulse J=FΔt=Δp; area under F-t graph; changes momentum'],facts:['Inertia: resistance to change in state; measured by mass','Pseudo force in non-inertial frame = -ma (Newton\'s 2nd law not directly valid)','Friction is not always opposing motion; static friction can be in direction of motion']}],
    'Work, Energy and Power':        [{title:'Work, Energy and Power',               SvgC:SVG_AtomFull,        parts:['Work W=F·d·cosθ; scalar; zero if F⊥d (normal force) or zero displacement','Kinetic energy KE=½mv²; work-energy theorem: Wnet=ΔKE','Potential energy - gravitational (mgh); elastic (½kx²); PE depends on position/configuration','Conservation of mechanical energy - KE+PE=constant (no friction/dissipation)','Power P=W/t=Fv; instantaneous P=F·v; unit: watt (1W=1J/s); kW, HP','Elastic collision - KE+momentum conserved; inelastic - only momentum conserved'],facts:['Coefficient of restitution e=relative speed after/relative speed before; 1=elastic; 0=perfectly inelastic','Power of engine = Fv = (mg sinθ + friction force) × velocity for inclined plane','Conservative force: work done is path-independent (gravity, spring); non-conservative: friction']}],
    'System of Particles and Rotational Motion':[{title:'Rotational Motion',         SvgC:SVG_LocomotionFull,  parts:['Centre of mass - weighted average position; for system of particles: r_cm=Σmiri/Σmi','Torque τ=r×F=Iα; vector; about chosen axis; unit: N·m','Moment of inertia I=Σmr²; depends on mass distribution AND axis of rotation','Angular momentum L=Iω=r×p; dL/dt=τ; conserved if τ=0','Parallel axis theorem I=Icm+Md²; perpendicular axis Iz=Ix+Iy (for lamina)','Rolling without slipping: v=Rω; KE=½Iω²+½Mv²=½Mv²(1+I/MR²)'],facts:['Conservation of L: figure skater pulls arms in → I decreases → ω increases','KE of rolling sphere = ½Mv²(1+2/5) = 7/10 Mv² (I=2MR²/5 for solid sphere)','Torque couples: two equal and opposite forces not at same point; net force=0 but net torque≠0']}],
    'Gravitation':                   [{title:'Gravitation',                           SvgC:SVG_AtomFull,        parts:['Newton\'s law F=Gm1m2/r²; G=6.67×10⁻¹¹ N m² kg⁻²; inverse square law','Gravitational field g=GM/r²; near Earth surface g=9.8 m/s²; decreases with altitude','Gravitational potential V=-GM/r; work done per unit mass to bring from infinity','Orbital velocity vo=√(GM/r)≈7.9 km/s near Earth surface; independent of satellite mass','Escape velocity ve=√(2GM/R)=√(2gR)≈11.2 km/s; condition: KE≥PE','Kepler\'s laws: 1.Ellipse; 2.Equal areas (conservation of angular momentum); 3.T²∝a³'],facts:['Geostationary orbit: T=24h; h≈36000km above equator; appears stationary','g varies: 0 at center; maximum at surface; decreases above and below surface','Black hole: escape velocity > c; Schwarzschild radius Rs=2GM/c²']}],
    'Mechanical Properties of Solids':[{title:'Mechanical Properties',              SvgC:SVG_LocomotionFull,  parts:['Stress = Force/Area; unit: Pa (pascal)=N/m²; tensile, compressive, shear','Strain = ΔL/L (longitudinal), ΔV/V (volumetric), Δx/L (shear); dimensionless','Young\'s modulus Y = tensile stress/longitudinal strain; steel~2×10¹¹ Pa','Bulk modulus K = volumetric stress/volumetric strain; liquids have B not Y','Shear modulus (Rigidity) η = shear stress/shear strain','Elastic limit - Hooke\'s law valid up to this; beyond this: permanent deformation'],facts:['Steel: higher Young\'s modulus than rubber → steel is stiffer (less strain per stress)','Rubber: higher elastic limit than steel proportionally; can be stretched more before permanent deformation','Resilience: energy stored per unit volume = σ²/2Y; toughness: energy to fracture']}],
    'Mechanical Properties of Fluids':[{title:'Fluid Mechanics',                    SvgC:SVG_AtomFull,        parts:['Pressure P=F/A=ρgh; Pascal\'s principle: pressure transmitted equally in all directions','Archimedes\' principle - buoyant force = weight of displaced fluid; floats if density < fluid','Bernoulli equation - P+½ρv²+ρgh=constant (energy conservation; ideal fluid)','Continuity equation - A1v1=A2v2 (incompressible fluid; conservation of mass)','Viscosity η - tangential force per unit area per velocity gradient; Pa·s (poise)','Stokes\' law - F=6πηrv (sphere); terminal velocity when F_drag=W-buoyancy'],facts:['Bernoulli explains: aircraft lift, atomiser, Pitot tube, Venturimeter','Terminal velocity vt=2r²(ρ-σ)g/9η; proportional to r²','Capillary rise h=2Tcosθ/rρg; rise in narrow tube; water rises (θ<90°), mercury falls (θ>90°)']}],
    'Thermal Properties of Matter':  [{title:'Thermal Properties',                   SvgC:SVG_AtomFull,        parts:['Temperature scales - Kelvin=Celsius+273; Fahrenheit=9/5°C+32','Thermal expansion - linear ΔL=αLΔT; area Δa=βAΔT (β=2α); volume ΔV=γVΔT (γ=3α)','Specific heat c=Q/mΔT; water=4200 J/kg/K (very high; anomalous)','Latent heat - no temperature change; fusion (ice→water) and vaporisation (water→steam)','Heat transfer - conduction (Fourier: Q/t=KAΔθ/l), convection (fluid motion), radiation (Stefan-Boltzmann)','Stefan-Boltzmann P=σAT⁴; Wien\'s displacement: λmT=2.9×10⁻³ m·K'],facts:['Newton\'s law of cooling: dT/dt=-k(T-T0); exponential decay; valid for small temp difference','Anomalous expansion of water: maximum density at 4°C; ice floats on water','Bimetallic strip: different expansion coefficients → bending on heating; thermostat, fire alarm']}],
    'Thermodynamics':                [{title:'Thermodynamic Laws',                   SvgC:SVG_AtomFull,        parts:['Zeroth law - if A in equilibrium with C and B in equilibrium with C, then A in equilibrium with B; defines temperature','First law - ΔU=q+w; U is internal energy (state function); q=heat absorbed; w=work done on system','Second law - entropy of universe always increases for spontaneous process; Kelvin-Planck statement','Carnot engine - most efficient possible heat engine; η=1-T2/T1','Isothermal process - T constant; ΔU=0 for ideal gas; q=-w','Adiabatic process - q=0; PV^γ=constant; temperature changes'],facts:['Efficiency of heat engine: η=(W/QH)=(1-QL/QH); always <1 (Carnot)','Entropy: disorder measure; ΔSuniv=ΔSsys+ΔSsurr≥0; equals 0 at equilibrium','Refrigerator COP=QL/W=T2/(T1-T2); higher T2 (cold reservoir) → higher COP']}],
    'Kinetic Theory':                [{title:'Kinetic Theory of Gases',              SvgC:SVG_AtomFull,        parts:['KTG postulates - point masses; elastic collisions; random motion; intermolecular forces negligible','Pressure P=⅓ρvrms²=⅓(nm)vrms²; from Newton\'s 2nd law on gas molecules','RMS speed vrms=√(3RT/M)','Mean speed v̄=√(8RT/πM)=0.921 vrms','Most probable speed vmp=√(2RT/M)=0.816 vrms','Equipartition of energy - each degree of freedom has ½kT energy; Cv=(f/2)R'],facts:['vrms:v̄:vmp = √3:√(8/π):√2 ≈ 1.732:1.596:1.414','Mean free path λ=1/(√2 πd²n); increases with T at constant P; decreases with P at constant T','Real gas: Z=PV/nRT; Z>1 (repulsion dominates); Z<1 (attraction dominates)']}],
    'Oscillations':                  [{title:'Simple Harmonic Motion',               SvgC:SVG_WaveFull,        parts:['SHM definition - F=-kx; restoring force proportional to displacement; toward equilibrium','Equation of motion - x=A sin(ωt+φ); A=amplitude; ω=angular frequency; φ=phase constant','Velocity v=ω√(A²-x²); max at x=0; zero at x=±A','Acceleration a=-ω²x; max at x=±A; zero at x=0','Simple pendulum T=2π√(L/g); valid for small angles (θ<15°)','Spring-mass T=2π√(m/k); independent of amplitude; parallel: k=k1+k2; series: 1/k=1/k1+1/k2'],facts:['At equilibrium: v=max, a=0, KE=max, PE=min (zero)','At extremes x=±A: v=0, a=ω²A (max), KE=0, PE=max=½kA²','Resonance: driving frequency = natural frequency → amplitude theoretically infinite (if no damping)']}],
    'Waves':                         [{title:'Wave Motion',                           SvgC:SVG_WaveFull,        parts:['Transverse wave - displacement ⊥ to propagation; e.g. light, string vibration','Longitudinal wave - displacement ∥ to propagation; e.g. sound, spring compression','Wave equation y=A sin(kx-ωt); k=2π/λ (wave number); ω=2πf; v=fλ=ω/k','Speed of sound in air v=√(γP/ρ)=332 m/s at 0°C; increases with T','Standing waves - superposition of equal amplitude waves in opposite directions; nodes and antinodes','Beats - two waves of slightly different frequencies; fbeat=f1-f2 Hz'],facts:['Doppler effect: fo=fs(v±vo)/(v∓vs); + for approach, - for recession','Open pipe: fn=nf1 (all harmonics); closed pipe: fn=(2n-1)f1 (odd harmonics only)','Sound: Infrasonic<20Hz<audible<20kHz<ultrasonic; medical imaging uses ultrasound']}],
    'Electric Charges and Fields':   [{title:'Electric Charges and Coulomb\'s Law',  SvgC:SVG_ElectricFull,    parts:['Coulomb\'s law F=kq1q2/r²; k=9×10⁹ N m² C⁻²=1/4πε₀; vector form F=kq1q2r̂/r²','Electric field E=F/q₀; unit N/C or V/m; superposition principle applies','Field lines - originate from +; end at -; tangent=field direction; density=magnitude','Gauss\'s law ΦE=Q_enclosed/ε₀; useful for symmetric distributions (sphere, cylinder, plane)','Electric dipole p=qd (C·m); torque τ=p×E; potential energy U=-p·E','Electric flux Φ=E·A cosθ; unit: N m²/C or V·m'],facts:['Field of infinite plane sheet: E=σ/2ε₀; uniform; independent of distance','Field inside conductor = 0; all charge on outer surface; field ⊥ to surface','Faraday cage: no field inside hollow conductor; used to shield sensitive electronics']}],
    'Electrostatic Potential and Capacitance':[{title:'Potential and Capacitors',   SvgC:SVG_ElectricFull,    parts:['Electric potential V=kQ/r; scalar; work done per unit positive charge; unit: volt (V)','Potential difference: work done to move unit charge from one point to another','Equipotential surface - V=constant; no work done moving along it; ⊥ to field lines','Capacitance C=Q/V; unit farad (F); 1F=1 C/V; physical property of capacitor','Parallel plate capacitor C=ε₀A/d; with dielectric: C=Kε₀A/d (K=dielectric constant)','Energy stored U=½QV=½CV²=Q²/2C; energy density u=½ε₀E²'],facts:['Series capacitors: 1/C=1/C1+1/C2 (equivalent is less than smallest)','Parallel capacitors: C=C1+C2 (total is sum)','Van de Graaff generator: charge accumulation on dome; used as particle accelerator']}],
    'Current Electricity':           [{title:'Electric Circuits',                    SvgC:SVG_ElectricFull,    parts:['Ohm\'s law V=IR; resistance R=ρL/A; resistivity ρ increases with T for metals','Kirchhoff Current Law (KCL) - Σi=0 at node; conservation of charge','Kirchhoff Voltage Law (KVL) - ΣV=0 around closed loop; conservation of energy','Wheatstone bridge P/Q=R/S when balanced; null method; measures unknown resistance','Potentiometer - no current from source; compares EMFs; measures internal resistance','Drift velocity vd=I/nAe; mobility μ=vd/E=eτ/m'],facts:['Resistivities: metals ~10⁻⁸Ω·m; semiconductors 10⁻³ to 10³; insulators >10⁶ Ω·m','Temperature coefficient of resistance α: metals positive; semiconductors negative','Power P=IV=I²R=V²/R; energy E=Pt (kWh for household use); 1 unit=1kWh=3.6 MJ']}],
    'Moving Charges and Magnetism':  [{title:'Magnetic Force and Biot-Savart Law',  SvgC:SVG_ElectricFull,    parts:['Magnetic force F=qv×B=qvBsinθ; zero if v∥B; maximum if v⊥B','Biot-Savart law dB=μ₀/4π × Idl×r̂/r²; analogous to Coulomb but for magnetic field','Field at center of circular loop B=μ₀I/2R; proportional to current, inversely to radius','Ampere\'s law ∮B·dl=μ₀I_enclosed; analogous to Gauss\'s law for magnetism','Solenoid B=μ₀nI (inside); n=turns per unit length; uniform field inside','Cyclotron - r=mv/qB; T=2πm/qB; frequency independent of speed'],facts:['Lorentz force: F=q(E+v×B); qvB provides centripetal force in cyclotron','Galvanometer: coil+spring; converted to ammeter (low shunt parallel) or voltmeter (high resistance series)','Hall effect: perpendicular voltage when current conductor in magnetic field; determines charge carrier type']}],
    'Magnetism and Matter':          [{title:'Magnetic Properties of Materials',     SvgC:SVG_AtomFull,        parts:['Diamagnetic - repelled by magnet; χm slightly negative (10⁻⁵); Bi, Cu, Pb, H2O','Paramagnetic - weakly attracted; χm small positive (10⁻⁵-10⁻³); Al, O2, Na; follows Curie law','Ferromagnetic - strongly attracted; χm large positive (10³-10⁵); Fe, Co, Ni, Gd','Hysteresis - B-H loop; retentivity (B when H=0); coercivity (H to make B=0)','Curie temperature Tc - above this, ferromagnet→paramagnetic (Fe: 1043K; Ni: 631K)','Earth\'s magnetism - declination, inclination (dip), horizontal component BH'],facts:['Magnetic domains: ferromagnetism due to domain alignment; Weiss theory','Soft iron: high retentivity, low coercivity → transformer core, electromagnets','Hard steel: high retentivity, high coercivity → permanent magnets']}],
    'Electromagnetic Induction':     [{title:'Electromagnetic Induction',            SvgC:SVG_ElectricFull,    parts:['Faraday\'s law EMF=-NdΦ/dt; flux Φ=B·A·cosθ; rate of flux change = EMF','Lenz\'s law - induced current opposes the change causing it; energy conservation','Motional EMF ε=BLv; conductor moving in field; force on charges creates EMF','Self-inductance L=NΦ/I; EMF=-LdI/dt; unit: henry (H); coil opposes change in current','Mutual inductance M=N₂Φ₂₁/I₁; EMF₂=-MdI₁/dt; depends on geometry and orientation','AC generator - rotating coil in uniform B; ε=NBAω sin(ωt)=ε₀ sin(ωt)'],facts:['Eddy currents: induced in solid conductors in varying B field; reduce by lamination','Transformer ratio Vs/Vp=Ns/Np; ideal: power in=power out; step-up or step-down','Back EMF in motor opposes applied voltage; limits current; efficiency = back-EMF/applied-EMF']}],
    'Alternating Current':           [{title:'AC Circuits',                           SvgC:SVG_WaveFull,        parts:['AC basics - v=Vm sinωt; Vrms=Vm/√2=0.707Vm; f=ω/2π; T=1/f','Resistive circuit - I in phase with V; P=Vrms²/R=Vrms Irms','Inductive circuit - I lags V by 90°; XL=ωL; P=0 (wattless)','Capacitive circuit - I leads V by 90°; XC=1/ωC; P=0 (wattless)','Series LCR - impedance Z=√(R²+(XL-XC)²); phase φ=tan⁻¹((XL-XC)/R)','Resonance - XL=XC; Z=R (minimum); I=maximum; f₀=1/2π√(LC)'],facts:['Power factor cosφ=R/Z; average power P=Vrms Irms cosφ=I²R','Q factor=ω₀L/R=1/ω₀CR; sharpness of resonance; selectivity of tuned circuits','Choke coil: inductor in AC circuit; wattless current; used in fluorescent lamp']}],
    'Electromagnetic Waves':         [{title:'EM Spectrum',                           SvgC:SVG_AtomFull,        parts:['Maxwell\'s prediction - changing E field creates B field and vice versa; self-propagating wave','Speed c=1/√(μ₀ε₀)=3×10⁸ m/s in vacuum; all EM waves travel at c','Radio waves (>1mm) - communication; AM, FM radio; mobile phones; radar','Microwaves (1mm-30cm) - microwave oven; RADAR; satellite communication','Infrared (700nm-1mm) - heat radiation; remote control; night vision; medical imaging','Visible (400-700nm) - only EM wave visible to human eye; VIBGYOR'],facts:['UV radiation: photosynthesis; Vitamin D synthesis; sterilization; causes sunburn','X-rays: penetrate soft tissue; diffraction by crystals (Bragg\'s law); cancer treatment','Gamma rays: from nuclear decay; highest energy; most penetrating; sterilisation of medical equipment']}],
    'Ray Optics and Optical Instruments':[{title:'Ray Optics',                       SvgC:SVG_WaveFull,        parts:['Mirror formula 1/v+1/u=1/f; f=R/2; sign convention: distances from pole','Refraction - Snell\'s law n1sinθ1=n2sinθ2; n=c/v; denser medium has higher n','Lens formula 1/v-1/u=1/f; power P=1/f (dioptre); converging: P positive','Lens maker equation 1/f=(n-1)(1/R1-1/R2); determines focal length from geometry','Total internal reflection - at interface from denser to rarer; angle>critical angle θc=sin⁻¹(1/n)','Optical fibre - TIR principle; total confinement; used in internet, endoscope'],facts:['For concave mirror f<0; convex f>0 (using New Cartesian sign convention)','Apparent depth = real depth / n; apparent depth < real depth in denser medium','Compound microscope: magnification m=-L/fo × D/fe; L=tube length, D=least distance of distinct vision']}],
    'Wave Optics':                   [{title:"Young's Double Slit Experiment",       SvgC:SVG_WaveFull,        parts:['Huygens principle - every point on wavefront is source of secondary wavelets','Interference - constructive: path diff=nλ; destructive: (2n-1)λ/2; bright and dark fringes','YDSE fringe width β=λD/d; bright fringes at y=nβ; dark fringes at y=(2n-1)β/2','Coherence - constant phase relationship; essential for stable interference pattern','Diffraction - bending at edges; single slit: central max width=2λD/a','Polarisation - transverse wave property; Malus law I=I₀cos²θ; Brewster angle tanθ=n'],facts:['Fringe width β=λD/d: larger λ → wider fringes; larger D → wider; larger d → narrower','Thin film interference: soap bubble colours; anti-reflection coating (AR); minimum thickness λ/4n','Angular resolution limit: 1.22λ/D (Rayleigh criterion); applies to telescope, eye, camera lens']}],
    'Dual Nature of Radiation and Matter':[{title:'Photoelectric Effect',            SvgC:SVG_AtomFull,        parts:['Photoelectric effect - light ejects electrons from metal surface; proved quantum nature of light','Einstein equation KE_max=hf-φ=h(f-f₀); φ=work function; f₀=threshold frequency','Key observations - instantaneous; depends on frequency not intensity; no emission below f₀','Stopping potential eVs=KE_max; Vs is independent of intensity','de Broglie wavelength λ=h/mv=h/p; all matter has wave nature','Davisson-Germer experiment - electron diffraction (1927); proved wave nature of electrons'],facts:['Work function φ: Cs (1.9eV)< Na (2.3eV)< Al (4.1eV)< Cu (4.5eV)< W (4.5eV)','Heisenberg uncertainty: ΔxΔp≥h/4π; ΔEΔt≥h/4π; fundamental limit, not measurement error','Electron microscope: uses de Broglie wavelength (much smaller than visible light) → higher resolution']}],
    'Atoms':                         [{title:'Atomic Models',                         SvgC:SVG_AtomFull,        parts:['Thomson\'s plum pudding model - electrons embedded in positive sphere; failed Rutherford','Rutherford\'s model - nuclear; α-particle scattering; 1911; most mass in tiny nucleus','Rutherford\'s problems - should emit radiation; electrons should spiral in (classical EM)','Bohr\'s model - quantised orbits; En=-13.6/n² eV; rn=n²×0.529 Å (for H)','Spectral series - Lyman (n→1, UV); Balmer (n→2, visible); Paschen (n→3, IR)','Energy levels - ground state n=1 (-13.6eV); ionisation from n=1 needs +13.6eV'],facts:['Rydberg formula: 1/λ=R(1/n1²-1/n2²); R=1.097×10⁷ m⁻¹','Bohr radius a₀=0.529 Å; radius scales as n²; energy scales as 1/n²','Atomic spectra: emission (hot gas) and absorption (cool gas in front of hot source)']}],
    'Nuclei':                        [{title:'Nuclear Physics',                       SvgC:SVG_NucleiFull,      parts:['Nucleus size R=R₀A^(1/3); R₀=1.2 fm; nuclear density~2.3×10¹⁷ kg/m³ (constant for all nuclei)','Binding energy BE=Δm×c²; mass defect Δm=Zmp+(A-Z)mn-M_nucleus','BE per nucleon - peaks at Fe-56 (8.8 MeV/nucleon); most stable nucleus','Radioactive decay - alpha (⁴He; A-4,Z-2); beta (e⁻; Z+1,A same); gamma (photon; no change)','Radioactive decay law N=N₀e⁻λt; activity A=λN=A₀e⁻λt','Half-life t½=0.693/λ; mean life τ=1/λ=1.44t½'],facts:['Nuclear fission: U-235+n→Ba-141+Kr-92+3n+energy; chain reaction; critical mass','Nuclear fusion: ²H+³H→⁴He+n+17.6 MeV; needs ~10⁷ K (stellar temperature)','1 amu=931.5 MeV; 1 Curie=3.7×10¹⁰ dps; 1 Becquerel=1 decay/second']}],
    'Semiconductor Electronics':     [{title:'Semiconductor Devices',                 SvgC:SVG_SemiFull,        parts:['Intrinsic semiconductor - pure Si/Ge; few carriers; n=p; increases exponentially with T','p-type - trivalent impurity (B, Al, Ga); majority=holes; minority=electrons','n-type - pentavalent impurity (P, As, Sb); majority=electrons; minority=holes','p-n junction - depletion region (barrier ~0.7V Si, ~0.3V Ge); junction diode','Forward bias - Vapplied>Vbarrier; conducts; depletion layer narrows','Transistor (BJT) - PNP or NPN; 3 regions: emitter, base, collector; current amplifier'],facts:['Reverse bias: reverse saturation current (mA); depletion layer widens; breakdown at Zener voltage','NAND and NOR: universal gates (any logic circuit can be made from these alone)','IC (Integrated Circuit): millions of transistors on single silicon chip; SSI/MSI/LSI/VLSI/ULSI']}],
    'Communication Systems':         [{title:'Communication Systems',                 SvgC:SVG_WaveFull,        parts:['Modulation - amplitude (AM), frequency (FM), phase (PM); needed to transmit audio signals on carrier','AM bandwidth=2fm; FM bandwidth=2(Δf+fm); FM has less noise than AM','Ground wave propagation - along surface; MF band (0.3-3 MHz); range limited by absorption','Sky wave propagation - reflects off ionosphere; HF (3-30 MHz); long range','Space wave propagation - line of sight; VHF, UHF, microwave; needs repeaters or satellite','Optical fibre - TIR; high bandwidth; low loss; no EM interference; secure'],facts:['Ionosphere layers: D (60-90km), E (100-130km), F1+F2 (160-400km); reflect HF waves','Range of TV transmission d=√(2hT×Re); hT=antenna height; increases with antenna height','Mobile communication: cells (hexagonal); frequency reuse; base station; handoff/handover']}],
  }

  const subjects = {
    bio:  {label:'Biology',   icon:'🧬', color:'var(--bio)',  class11: SYLLABUS.biology[11],   class12: SYLLABUS.biology[12]},
    chem: {label:'Chemistry', icon:'⚗️', color:'var(--chem)', class11: SYLLABUS.chemistry[11], class12: SYLLABUS.chemistry[12]},
    phys: {label:'Physics',   icon:'⚛️', color:'var(--phys)', class11: SYLLABUS.physics[11],   class12: SYLLABUS.physics[12]},
  }
  const subColor = subjects[activeSub].color

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>3D Diagrams — Chapter Wise</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Every chapter has its own NCERT-based diagram with labeled parts and key NEET facts</p>
      </div>

      <div className="tabs" style={{marginBottom:20}}>
        {[['bio','Biology'],['chem','Chemistry'],['phys','Physics']].map(([k,l])=>(
          <div key={k} className={"tab"+(activeSub===k?" active":"")}
            style={activeSub===k?{color:subjects[k].color,borderBottomColor:subjects[k].color}:{}}
            onClick={()=>{setActiveSub(k);setActiveChapter(null);setActiveItem(null)}}>
            {subjects[k].icon} {l}
          </div>
        ))}
      </div>

      {activeItem ? (
        <div className="fade-in">
          <div style={{display:'flex',gap:8,marginBottom:16,alignItems:'center'}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setActiveItem(null)}>← Back to chapter</button>
            <span style={{fontSize:13,color:'var(--text3)'}}>{activeChapter}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'start'}}>
            <div className="card" style={{borderTop:"3px solid "+subColor}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16,marginBottom:4,color:subColor}}>{activeItem.title}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>Chapter: {activeChapter}</div>
              <activeItem.SvgC/>
            </div>
            <div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>Labeled Parts</div>
                {activeItem.parts.map((p,i)=>{
                  const [name,...rest]=p.split(' - '); const desc=rest.join(' - ').trim()
                  return (
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 0',borderBottom:i<activeItem.parts.length-1?'1px solid var(--border)':'none'}}>
                      <span style={{width:22,height:22,borderRadius:'50%',background:subColor,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:subColor}}>{name.trim()}</div>
                        {desc&&<div style={{fontSize:12,color:'var(--text2)',marginTop:2,lineHeight:1.5}}>{desc}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="card" style={{borderColor:'rgba(88,166,255,.2)',background:'rgba(88,166,255,.04)'}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>⭐ Key NEET Facts</div>
                {activeItem.facts.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:8,padding:'8px 0',borderBottom:i<activeItem.facts.length-1?'1px solid var(--border)':'none'}}>
                    <span style={{width:20,height:20,borderRadius:4,background:'rgba(88,166,255,.15)',color:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>★</span>
                    <span style={{fontSize:13,color:'var(--text2)',lineHeight:1.5}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      ) : activeChapter ? (
        <div className="fade-in">
          <button className="btn btn-ghost btn-sm" style={{marginBottom:16}} onClick={()=>setActiveChapter(null)}>← All Chapters</button>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:18,fontWeight:700,color:subColor,marginBottom:4}}>{activeChapter}</h2>
          <p style={{fontSize:13,color:'var(--text3)',marginBottom:20}}>Diagrams for this chapter</p>
          <div className="grid-3">
            {(CHAPTER_DIAGRAMS[activeChapter]||[]).map((d,i)=>(
              <div key={i} className="card" style={{cursor:'pointer',borderLeft:"3px solid "+subColor}}
                onClick={()=>{setActiveItem(d);if(logActivity)logActivity("Viewed Diagram: "+d.title,activeChapter)}}>
                <div style={{padding:'12px 0',textAlign:'center'}}><d.SvgC/></div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,color:subColor,marginBottom:4}}>{d.title}</div>
                <div style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>{d.parts.length} labeled parts • {d.facts.length} NEET facts</div>
                <button className="btn btn-primary btn-sm" style={{width:'100%'}}>Study Diagram →</button>
              </div>
            ))}
            {(!CHAPTER_DIAGRAMS[activeChapter]||CHAPTER_DIAGRAMS[activeChapter].length===0)&&(
              <div className="card" style={{textAlign:'center',padding:40,color:'var(--text3)',gridColumn:'1/-1'}}>
                <div style={{fontSize:40,marginBottom:12}}>🔬</div>
                <div style={{fontWeight:600}}>Diagram coming soon</div>
              </div>
            )}
          </div>
        </div>

      ) : (
        <>
          {[{label:'Class 11',chapters:subjects[activeSub].class11},{label:'Class 12',chapters:subjects[activeSub].class12}].map(({label,chapters})=>(
            <div key={label} style={{marginBottom:28}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,color:subColor,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:28,height:28,borderRadius:6,background:subColor,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{label.split(' ')[1]}</span>
                {label}
              </div>
              <div className="grid-3">
                {chapters.map((ch,i)=>{
                  const diags=CHAPTER_DIAGRAMS[ch]||[]
                  return (
                    <div key={i} className="card" style={{cursor:'pointer',borderLeft:"3px solid "+subColor}}
                      onClick={()=>setActiveChapter(ch)}>
                      <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:600,fontSize:13,color:subColor,marginBottom:6}}>{ch}</div>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>
                        {diags.length} diagram{diags.length!==1?'s':''} available
                      </div>
                      <button className="btn btn-primary btn-sm" style={{width:'100%',fontSize:11}}>View Diagrams →</button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </>
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