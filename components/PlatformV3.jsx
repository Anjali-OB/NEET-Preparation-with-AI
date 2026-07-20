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
const DiagramsPage = ({logActivity}) => {
  const [activeSub, setActiveSub] = useState('bio')
  const [activeChapter, setActiveChapter] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  // ─── BIOLOGY DIAGRAMS ────────────────────────────────────────

  const BIO_CHAPTERS = {
    'The Living World': {
      title:'Taxonomic Hierarchy',
      parts:['Kingdom → Phylum → Class → Order → Family → Genus → Species','Binomial nomenclature: Genus (capital) + species (small) in italics','Species: most basic unit; members can interbreed freely','Taxonomic key: used to identify organisms based on characters'],
      facts:['Linnaeus introduced binomial nomenclature (1753)','KPCOFGS — King Philip Came Over For Good Soup (mnemonic)','Herbarium = dried plant specimens; type specimen = standard reference'],
      svg: () => (
        <svg viewBox="0 0 420 310" style={{width:'100%',height:'auto'}}>
          <text x="210" y="18" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Taxonomic Hierarchy</text>
          {[['Kingdom','Animalia','#f85149',42],['Phylum','Chordata','#f0883e',82],['Class','Mammalia','#d29922',122],['Order','Primates','#3fb950',162],['Family','Hominidae','#58a6ff',202],['Genus','Homo','#bc8cff',242],['Species','sapiens','#f85149',282]].map(([rank,eg,col,y],i)=>(
          <g key={i}>
            <rect x={28+i*6} y={y-14} width={364-i*12} height={26} rx={6} fill="rgba(0,0,0,.4)" stroke={col} strokeWidth={1.8}/>
            <text x="115" y={y+4} fill={col} fontSize="11" fontWeight="bold">{rank}</text>
            <text x="275" y={y+4} textAnchor="middle" fill="#e6edf3" fontSize="11" fontStyle="italic">{eg}</text>
          </g>))}
          <text x="210" y="302" textAnchor="middle" fill="#8b949e" fontSize="9">Broadest → Narrowest | Each rank more specific than the one above</text>
        </svg>)
    },
    'Biological Classification': {
      title:'Five Kingdom Classification (Whittaker 1969)',
      parts:['Monera — Prokaryotes; bacteria and cyanobacteria; 70S ribosomes; no nuclear membrane','Protista — Unicellular eukaryotes; Amoeba, Euglena, Paramecium; autotrophic or heterotrophic','Fungi — Saprophytes; chitin cell wall; no chlorophyll; Rhizopus, Penicillium, Agaricus','Plantae — Autotrophs; cellulose cell wall; embryo present; includes all plants','Animalia — Heterotrophs; no cell wall; ingestive nutrition; multicellular'],
      facts:['Fungi cell wall: chitin | Plant cell wall: cellulose | Bacteria: peptidoglycan','Viruses are acellular — not placed in any kingdom','Lichens = algae + fungi (mutualism); Mycorrhiza = fungi + plant roots'],
      svg: () => (
        <svg viewBox="0 0 440 290" style={{width:'100%',height:'auto'}}>
          <text x="220" y="18" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Five Kingdom Classification</text>
          {[{k:'Monera',c:'#f85149',ex:'Bacteria, Cyanobacteria',note:'Prokaryote; 70S ribosome; no nuclear membrane; oldest life form'},
            {k:'Protista',c:'#f0883e',ex:'Amoeba, Euglena, Paramecium',note:'Unicellular eukaryote; diverse; link between kingdoms'},
            {k:'Fungi',c:'#d29922',ex:'Rhizopus, Penicillium, Agaricus',note:'Saprophyte; chitin wall; heterotrophic; absorptive nutrition'},
            {k:'Plantae',c:'#3fb950',ex:'Moss, Fern, Rose, Mango',note:'Autotrophic; cellulose cell wall; photosynthesis; embryo present'},
            {k:'Animalia',c:'#58a6ff',ex:'Sponge, Earthworm, Frog, Humans',note:'Heterotrophic; no cell wall; ingestive; multicellular; motile'},
          ].map(({k,c,ex,note},i)=>(
            <g key={k}>
              <rect x="10" y={38+i*46} width="420" height="42" rx="7" fill="rgba(0,0,0,.35)" stroke={c} strokeWidth="2"/>
              <text x="20" y={55+i*46} fill={c} fontSize="12" fontWeight="bold">{k}</text>
              <text x="20" y={69+i*46} fill="#d29922" fontSize="8">e.g. {ex}</text>
              <text x="20" y={74+i*46} fill="#8b949e" fontSize="7.5">  {note}</text>
            </g>))}
        </svg>)
    },
    'Plant Kingdom': {
      title:'Plant Kingdom — Classification',
      parts:['Algae (Thallophyta) — No true roots/stem/leaves; aquatic; Chara, Volvox, Spirogyra','Bryophyta — No vascular tissue; need water to reproduce; Funaria (moss), Marchantia','Pteridophyta — First vascular plants; no seeds; sporophyte dominant; Dryopteris, Equisetum','Gymnosperms — Naked seeds; cones; heterosporous; Pinus, Cycas, Gnetum','Angiosperms — Seeds enclosed in fruit; double fertilization; dominant land plants today'],
      facts:['Bryophytes = amphibians of plant kingdom (need water for fertilization)','Pteridophytes = first vascular, seedless plants; Selaginella is heterosporous','Angiosperms: most evolved; 300,000 species; divided into monocots and dicots'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="18" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Plant Kingdom — Evolutionary Series</text>
          <line x1="75" y1="42" x2="75" y2="300" stroke="#3fb950" strokeWidth="2" strokeDasharray="4,4" opacity=".5"/>
          {[{n:'Algae',y:55,c:'#2ea043',ex:'Chara, Spirogyra, Volvox',note:'No embryo; aquatic; gametophyte dominant; no vascular tissue'},
            {n:'Bryophyta',y:110,c:'#3fb950',ex:'Funaria, Marchantia, Riccia',note:'Amphibians of plant kingdom; no vascular; need water for fertilization'},
            {n:'Pteridophyta',y:165,c:'#58a6ff',ex:'Selaginella, Dryopteris, Equisetum',note:'First vascular plants; seedless; sporophyte dominant'},
            {n:'Gymnosperms',y:220,c:'#d29922',ex:'Pinus, Cycas, Gnetum, Ephedra',note:'Naked seeds; no fruit; heterosporous; cones'},
            {n:'Angiosperms',y:275,c:'#f85149',ex:'Rose, Mango, Wheat, Maize',note:'Seeds in fruit; double fertilization; most dominant group'},
          ].map(({n,y,c,ex,note})=>(
            <g key={n}>
              <circle cx="75" cy={y} r="6" fill={c}/>
              <rect x="95" y={y-18} width="335" height="40" rx="6" fill="rgba(0,0,0,.35)" stroke={c} strokeWidth="1.5"/>
              <text x="105" y={y-3} fill={c} fontSize="11" fontWeight="bold">{n}</text>
              <text x="105" y={y+11} fill="#d29922" fontSize="8">e.g. {ex}</text>
              <text x="105" y={y+22} fill="#8b949e" fontSize="7.5">{note}</text>
            </g>))}
        </svg>)
    },
    'Animal Kingdom': {
      title:'Animal Kingdom — Major Phyla',
      parts:['Porifera — Pore-bearing; canal system; choanocytes; Sycon, Spongilla','Coelenterata — Nematocysts; radial symmetry; diploblastic; Hydra, Aurelia','Platyhelminthes — Flatworms; acoelomate; bilateral; Taenia (tapeworm), Fasciola','Aschelminthes — Roundworms; pseudocoelomate; complete gut; Ascaris, Wuchereria','Annelida — True coelom (schizocoel); metamerism; nephridia; earthworm, Nereis','Arthropoda — Largest phylum; jointed legs; chitin exoskeleton; cockroach, prawn','Chordata — Notochord + dorsal nerve cord + pharyngeal gill slits at some stage'],
      facts:['Arthropoda = largest animal phylum (>80% of all animal species)','True coelom first appears in Annelida (schizocoel — splits in mesoderm)','All vertebrates are chordates, but NOT all chordates are vertebrates'],
      svg: () => (
        <svg viewBox="0 0 440 350" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="11" fontWeight="bold">Animal Kingdom — Key Phyla</text>
          {[{p:'Porifera',ex:'Sycon, Spongilla',c:'#58a6ff',note:'Pore-bearing; canal system; choanocytes; sessile'},
            {p:'Coelenterata',ex:'Hydra, Obelia, Aurelia',c:'#3fb950',note:'Nematocysts; radial symmetry; diploblastic; polymorphism'},
            {p:'Platyhelminthes',ex:'Taenia, Fasciola, Planaria',c:'#d29922',note:'Flat; acoelomate; bilateral symmetry; flame cells for excretion'},
            {p:'Aschelminthes',ex:'Ascaris, Wuchereria',c:'#f0883e',note:'Round; pseudocoelomate; complete gut; dioecious (separate sexes)'},
            {p:'Annelida',ex:'Pheretima, Nereis, Hirudo',c:'#bc8cff',note:'True coelom (schizocoel); metamerism; nephridia; closed circulation'},
            {p:'Arthropoda',ex:'Cockroach, Prawn, Butterfly',c:'#f85149',note:'LARGEST phylum; jointed legs; chitin exoskeleton; open circulation'},
            {p:'Echinodermata',ex:'Starfish, Sea urchin, Holothuria',c:'#58a6ff',note:'Spiny skin; water vascular system; radial symmetry (adult)'},
            {p:'Chordata',ex:'Fish, Frog, Snake, Birds, Mammals',c:'#3fb950',note:'Notochord; dorsal hollow nerve cord; pharyngeal gill slits'},
          ].map(({p,ex,c,note},i)=>(
            <g key={p}>
              <rect x="10" y={24+i*40} width="420" height="36" rx="5" fill="rgba(0,0,0,.3)" stroke={c} strokeWidth="1.4"/>
              <text x="20" y={38+i*40} fill={c} fontSize="10" fontWeight="bold">{p}</text>
              <text x="20" y={52+i*40} fill="#8b949e" fontSize="7.5">e.g. {ex} | {note}</text>
            </g>))}
        </svg>)
    },
    'Morphology of Flowering Plants': {
      title:'Parts of a Flowering Plant',
      parts:['Root system — Tap root (dicot) or fibrous root (monocot); absorption and anchorage','Stem — Node (leaf attached) + internode; transport; support','Leaf — Lamina + petiole; reticulate venation (dicot) or parallel (monocot)','Flower — Calyx (sepals) + Corolla (petals) + Androecium (stamens) + Gynoecium (pistil)','Fruit — Ripened ovary; true fruit (mango) vs false fruit (apple = thalamus)','Seed — Embryo + endosperm + testa + tegmen (two seed coats)'],
      facts:['Dicot: tap root, reticulate venation, 4-5 floral parts, 2 cotyledons','Monocot: fibrous root, parallel venation, 3 floral parts, 1 cotyledon','Epigeal germination (cotyledons above soil): bean | Hypogeal (below): maize'],
      svg: () => (
        <svg viewBox="0 0 400 360" style={{width:'100%',height:'auto'}}>
          <text x="200" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Morphology of Flowering Plant</text>
          <rect x="192" y="162" width="16" height="148" rx="5" fill="#2ea043" stroke="#3fb950" strokeWidth="1.5"/>
          <circle cx="200" cy="205" r="5" fill="#d29922"/>
          <circle cx="200" cy="248" r="5" fill="#d29922"/>
          <path d="M200,310 Q182,335 170,352 M200,310 Q218,335 230,352 M200,310 Q200,340 200,358 M200,322 Q166,345 156,362 M200,322 Q234,345 244,362" fill="none" stroke="#d29922" strokeWidth="2"/>
          <ellipse cx="156" cy="232" rx="36" ry="14" fill="#1a3a1a" stroke="#3fb950" strokeWidth="1.5" transform="rotate(-30,156,232)"/>
          <ellipse cx="244" cy="248" rx="36" ry="14" fill="#1a3a1a" stroke="#3fb950" strokeWidth="1.5" transform="rotate(30,244,248)"/>
          {[0,60,120,180,240,300].map((a,i)=>(<ellipse key={i} cx={200+38*Math.cos(a*Math.PI/180)} cy={138+24*Math.sin(a*Math.PI/180)} rx="17" ry="11" fill="#f85149" stroke="#d29922" strokeWidth="1" opacity=".85" transform={`rotate(${a},${200+38*Math.cos(a*Math.PI/180)},${138+24*Math.sin(a*Math.PI/180)})`}/>))}
          <circle cx="200" cy="138" r="18" fill="#d29922" stroke="#f0883e" strokeWidth="2"/>
          <text x="200" y="142" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Receptacle</text>
          <line x1="200" y1="120" x2="200" y2="92" stroke="#f85149" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="200" y="88" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Flower</text>
          <line x1="152" y1="226" x2="72" y2="210" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="28" y="208" fill="#3fb950" fontSize="9">Leaf</text>
          <line x1="200" y1="205" x2="340" y2="188" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="342" y="186" fill="#d29922" fontSize="9">Node</text>
          <line x1="200" y1="230" x2="340" y2="225" stroke="#2ea043" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="342" y="223" fill="#2ea043" fontSize="9">Internode</text>
          <line x1="192" y1="338" x2="330" y2="330" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="332" y="328" fill="#f0883e" fontSize="9">Tap Root (dicot)</text>
          <text x="200" y="352" textAnchor="middle" fill="#8b949e" fontSize="9">Dicot: tap root | reticulate venation | 4-5 floral parts</text>
        </svg>)
    },
    'Anatomy of Flowering Plants': {
      title:'T.S. of Dicot Stem',
      parts:['Epidermis — Outermost layer; cuticle on surface; stomata; no chloroplasts','Cortex — Parenchyma cells below epidermis; stores starch; collenchyma near corners','Endodermis — Single layer with Casparian strip; controls water and mineral passage','Pericycle — Meristematic; gives rise to lateral roots; fibres in stem','Vascular Bundle — Xylem (wood, conducts water upward) + Phloem (conducts food downward)','Cambium — Present in dicot (open VB); absent in monocot (closed VB)','Pith — Central ground tissue; parenchyma; storage'],
      facts:['Dicot stem: ring arrangement of VBs with cambium (open)','Monocot stem: scattered VBs without cambium (closed)','Xylem: vessels + tracheids (dead, lignified) | Phloem: sieve tubes + companion cells (living)'],
      svg: () => (
        <svg viewBox="0 0 420 340" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">T.S. of Dicot Stem</text>
          <circle cx="210" cy="188" r="148" fill="#0d1a0d" stroke="#3fb950" strokeWidth="3"/>
          <circle cx="210" cy="188" r="133" fill="#0a1500" stroke="#2ea043" strokeWidth="2"/>
          <circle cx="210" cy="188" r="96" fill="#060f06" stroke="#d29922" strokeWidth="2"/>
          <circle cx="210" cy="188" r="46" fill="#030703" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="210" y="192" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Pith</text>
          {[0,45,90,135,180,225,270,315].map((angle,i)=>(
            <g key={i}>
              <ellipse cx={210+70*Math.cos(angle*Math.PI/180)} cy={188+70*Math.sin(angle*Math.PI/180)} rx="11" ry="8" fill="#2d1500" stroke="#f0883e" strokeWidth="1.5" transform={`rotate(${angle},${210+70*Math.cos(angle*Math.PI/180)},${188+70*Math.sin(angle*Math.PI/180)})`}/>
              <text x={210+70*Math.cos(angle*Math.PI/180)} y={191+70*Math.sin(angle*Math.PI/180)} textAnchor="middle" fill="#f0883e" fontSize="5">VB</text>
            </g>))}
          {[['Epidermis+Cuticle',148,'#3fb950',-85],['Cortex',112,'#2ea043',-50],['Endodermis',96,'#d29922',5],['Pericycle',85,'#bc8cff',35],['VB (Xylem+Phloem)',70,'#f0883e',65]].map(([name,r,col,angle],i)=>(
            <g key={i}>
              <line x1={210+r*Math.cos(angle*Math.PI/180)} y1={188+r*Math.sin(angle*Math.PI/180)} x2={210+(r+62)*Math.cos(angle*Math.PI/180)} y2={188+(r+62)*Math.sin(angle*Math.PI/180)} stroke={col} strokeWidth="1" strokeDasharray="3,2"/>
              <text x={210+(r+70)*Math.cos(angle*Math.PI/180)} y={191+(r+70)*Math.sin(angle*Math.PI/180)} textAnchor="middle" fill={col} fontSize="8">{name}</text>
            </g>))}
          <text x="210" y="332" textAnchor="middle" fill="#8b949e" fontSize="9">Ring VBs (dicot) vs Scattered VBs (monocot)</text>
        </svg>)
    },
    'Structural Organisation in Animals': {
      title:'Earthworm — Pheretima posthuma',
      parts:['Prostomium — Sensory lobe above mouth; not a true segment','Pharynx (seg 3-4) — Muscular; sucks food; salivary glands','Oesophagus (seg 5-7) — Passage connecting pharynx to gizzard','Gizzard (seg 8-9) — Grinds food with soil particles (muscular)','Intestine (seg 15 onwards) — Main digestion + absorption; typhlosole increases surface area','Nephridia — Excretory organs; present in each segment; like kidney','Clitellum (seg 14-16) — Glandular; secretes cocoon for reproduction'],
      facts:['Pheretima posthuma has 100-120 segments','Haemoglobin in plasma (NOT inside RBCs) — blood is red','Hermaphrodite: both male and female reproductive organs in one individual'],
      svg: () => (
        <svg viewBox="0 0 440 268" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Earthworm — Pheretima posthuma</text>
          <ellipse cx="220" cy="132" rx="192" ry="68" fill="#1a0d00" stroke="#d29922" strokeWidth="2.5"/>
          {[60,88,116,144,172,200,228,256,284,312,340,368].map(x=>(<line key={x} x1={x} y1="86" x2={x} y2="178" stroke="#d29922" strokeWidth=".8" opacity=".35"/>))}
          <ellipse cx="48" cy="132" r="23" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
          <text x="48" y="136" textAnchor="middle" fill="#f0883e" fontSize="8" fontWeight="bold">Mouth</text>
          <rect x="76" y="120" width="36" height="22" rx="4" fill="#2d0a0a" stroke="#f85149" strokeWidth="1.5"/>
          <text x="94" y="134" textAnchor="middle" fill="#f85149" fontSize="7">Pharynx</text>
          <rect x="120" y="122" width="44" height="20" rx="4" fill="#1a1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="142" y="135" textAnchor="middle" fill="#58a6ff" fontSize="7">Oesophagus</text>
          <rect x="172" y="118" width="30" height="26" rx="4" fill="#2d2d00" stroke="#d29922" strokeWidth="1.5"/>
          <text x="187" y="134" textAnchor="middle" fill="#d29922" fontSize="7">Gizzard</text>
          <rect x="210" y="118" width="125" height="26" rx="4" fill="#0d2d0d" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="272" y="134" textAnchor="middle" fill="#3fb950" fontSize="7">Intestine + Typhlosole</text>
          <ellipse cx="390" cy="132" rx="18" ry="15" fill="#1a0d00" stroke="#d29922" strokeWidth="1.5"/>
          <text x="390" y="136" textAnchor="middle" fill="#d29922" fontSize="7">Anus</text>
          <line x1="126" y1="100" x2="126" y2="75" stroke="#bc8cff" strokeWidth="1" strokeDasharray="2,2"/>
          <text x="126" y="71" textAnchor="middle" fill="#bc8cff" fontSize="8">Clitellum (seg 14-16)</text>
          <text x="220" y="230" textAnchor="middle" fill="#8b949e" fontSize="8">100-120 segments | Nephridia = excretory | Hermaphrodite</text>
          <text x="220" y="244" textAnchor="middle" fill="#8b949e" fontSize="8">Haemoglobin in plasma (not RBCs) | Setae for locomotion</text>
        </svg>)
    },
    'Cell: The Unit of Life': {
      title:'Animal Cell — Eukaryotic',
      parts:['Cell Membrane — Fluid Mosaic Model (Singer & Nicolson 1972); phospholipid bilayer + proteins','Nucleus — Double membrane; nuclear pores; contains DNA; nucleolus makes rRNA','Mitochondria — Double membrane; cristae; matrix; 70S ribosomes; mtDNA; powerhouse','Ribosome — 80S in cytoplasm (60S+40S); site of protein synthesis','Golgi Body — Packaging; glycosylation; secretory vesicles; cis and trans faces','Lysosome — Suicide bag; 40+ hydrolytic enzymes at pH 5; autophagy','Endoplasmic Reticulum — Rough (ribosomes; protein) and Smooth (lipid; detox)'],
      facts:['Cell theory: Schleiden+Schwann (1838-39); Virchow (1855): cells from cells','Prokaryote: 70S ribosomes, no membrane-bound organelles, circular DNA, no nuclear membrane','Eukaryote: 80S ribosomes, membrane-bound organelles, linear DNA, true nucleus'],
      svg: () => (
        <svg viewBox="0 0 420 340" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Animal Cell — Eukaryotic</text>
          <defs><radialGradient id="cg" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#1a3a2a"/><stop offset="100%" stopColor="#0d1f17"/></radialGradient></defs>
          <ellipse cx="210" cy="178" rx="182" ry="155" fill="url(#cg)" stroke="#3fb950" strokeWidth="2.5"/>
          <ellipse cx="210" cy="165" rx="60" ry="52" fill="#0d1520" stroke="#58a6ff" strokeWidth="2"/>
          <ellipse cx="214" cy="160" rx="19" ry="13" fill="#0a2030" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="210" y="165" textAnchor="middle" fill="#58a6ff" fontSize="7.5">Nucleolus</text>
          <text x="210" y="180" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Nucleus</text>
          {[{x:82,y:116,name:'Mito-chondria',col:'#f0883e',rx:22,ry:11},
            {x:322,y:112,name:'Golgi Body',col:'#d29922',rx:21,ry:11},
            {x:70,y:252,name:'Ribosome',col:'#bc8cff',rx:13,ry:8},
            {x:328,y:252,name:'Rough ER',col:'#3fb950',rx:21,ry:9},
            {x:188,y:308,name:'Lysosome',col:'#f85149',rx:15,ry:9},
            {x:50,y:178,name:'Smooth ER',col:'#2ea043',rx:16,ry:8},
            {x:342,y:178,name:'Centriole',col:'#58a6ff',rx:13,ry:7},
          ].map(({x,y,name,col,rx,ry})=>(
            <g key={name}>
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="rgba(0,0,0,.4)" stroke={col} strokeWidth="1.5"/>
              <text x={x} y={y+3} textAnchor="middle" fill={col} fontSize="6" fontWeight="bold">{name}</text>
            </g>))}
          <text x="210" y="330" textAnchor="middle" fill="#8b949e" fontSize="9">Fluid Mosaic Model | 80S cytoplasmic ribosomes | No cell wall</text>
        </svg>)
    },
    'Biomolecules': {
      title:'Classes of Biomolecules',
      parts:['Carbohydrates — C:H:O = 1:2:1; glucose, fructose (monosaccharides); sucrose, maltose (disaccharides)','Proteins — 20 amino acids linked by peptide bonds; 4 levels of structure (primary to quaternary)','Lipids — Glycerol + fatty acids → triglycerides; phospholipids in membrane; steroids','Nucleic Acids — DNA (deoxyribose; double helix; ATGC) and RNA (ribose; single strand; AUGC)','Enzymes — Protein catalysts; active site; lower activation energy; Km = [S] at ½Vmax','Vitamins — Fat-soluble (A,D,E,K) stored in liver; Water-soluble (B complex, C) excreted'],
      facts:['Chargaff rule: A=T (2H-bonds); G≡C (3H-bonds) in double-stranded DNA','Reducing sugars: free anomeric -OH; glucose, fructose, maltose — NOT sucrose','Peptide bond: -CO-NH-; formed by condensation (dehydration); broken by hydrolysis'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Biomolecules — Classes and Structure</text>
          {[{name:'Carbohydrates',col:'#3fb950',y:48,info:'Monosaccharides: Glucose C6H12O6 (aldohexose), Fructose (ketohexose)',info2:'Polysaccharides: Starch (α-1,4 + α-1,6), Cellulose (β-1,4), Glycogen'},
            {name:'Proteins',col:'#58a6ff',y:108,info:'Amino acids → peptide bond → polypeptide → protein','info2':'1°sequence → 2°helix/sheet → 3°3D-fold → 4°quaternary (Hb)'},
            {name:'Lipids',col:'#f0883e',y:168,info:'Triglycerides: glycerol + 3 fatty acids (ester bonds)','info2':'Phospholipids: bilayer of cell membrane | Steroids: cholesterol'},
            {name:'Nucleic Acids',col:'#bc8cff',y:228,info:'Nucleotide = base + sugar + phosphate (monomer unit)','info2':'DNA: deoxyribose; A≡T(2H), G≡C(3H); double helix; 3.4nm pitch'},
            {name:'Enzymes',col:'#d29922',y:288,info:'Protein catalysts; active site fits substrate (lock & key / induced fit)','info2':'Km = substrate conc at half Vmax; lower Km = higher affinity'},
          ].map(({name,col,y,info,info2})=>(
            <g key={name}>
              <rect x="10" y={y-14} width="420" height="50" rx="7" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="2"/>
              <text x="20" y={y+2} fill={col} fontSize="11" fontWeight="bold">{name}</text>
              <text x="20" y={y+16} fill="#8b949e" fontSize="8">{info}</text>
              <text x="20" y={y+28} fill="#8b949e" fontSize="8">{info2}</text>
            </g>))}
        </svg>)
    },
    'Cell Cycle and Cell Division': {
      title:'Mitosis and Meiosis',
      parts:['Interphase — G1 (cell growth) + S (DNA replication) + G2 (preparation); longest phase','Prophase — Chromatin condenses; spindle forms; nucleolus disappears; nuclear envelope breaks','Metaphase — Chromosomes align at equatorial plate; centromeres attached to spindle fibres','Anaphase — Centromeres split; sister chromatids pulled to opposite poles (PMAT)','Telophase — Nuclear envelope reforms; chromosomes decondense; nucleolus reappears','Meiosis I — Prophase I (crossing over at Pachytene); homologs separate; 2 haploid cells','Meiosis II — Like mitosis; sister chromatids separate; 4 haploid gametes produced'],
      facts:['PMAT: Prophase → Metaphase → Anaphase → Telophase','Crossing over: non-sister chromatids exchange during Pachytene of Prophase I','Mitosis: 2 identical diploid cells | Meiosis: 4 unique haploid cells'],
      svg: () => (
        <svg viewBox="0 0 460 300" style={{width:'100%',height:'auto'}}>
          <text x="230" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Mitosis — PMAT</text>
          {[['Prophase',55,75,'#f0883e','Chromatin condenses; spindle forms'],['Metaphase',170,75,'#d29922','Chromosomes at equatorial plate'],['Anaphase',285,75,'#3fb950','Chromatids pulled to poles'],['Telophase',400,75,'#58a6ff','Nuclear envelope reforms']].map(([ph,cx,cy,col,desc],i)=>(
          <g key={i}>
            <ellipse cx={cx} cy={cy+65} rx="42" ry="56" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="2"/>
            <text x={cx} y={cy+10} textAnchor="middle" fill={col} fontSize="10" fontWeight="bold">{ph}</text>
            <text x={cx} y={cy+153} textAnchor="middle" fill="#8b949e" fontSize="7" style={{dominantBaseline:'hanging'}}>{desc}</text>
            {i===1&&<line x1={cx} y1={cy+30} x2={cx} y2={cy+126} stroke={col} strokeWidth="1" strokeDasharray="4,3"/>}
          </g>))}
          <text x="230" y="278" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">PMAT → 2 identical diploid daughter cells</text>
          <text x="230" y="292" textAnchor="middle" fill="#8b949e" fontSize="8">Meiosis: PMAT×2 → 4 haploid cells | Crossing over in Pachytene</text>
        </svg>)
    },
    'Photosynthesis in Higher Plants': {
      title:'Z-Scheme — Light Reactions',
      parts:['PS II (P680) — Absorbs 680nm; oxidises water; releases O2; starts Z-scheme','Water splitting — 2H2O → O2 + 4H+ + 4e- at Oxygen Evolving Complex (OEC)','Plastoquinone (PQ) — Mobile electron carrier from PS II to Cyt b6f complex','Cyt b6f complex — Pumps H+ into thylakoid lumen; builds proton gradient for ATP','PS I (P700) — Absorbs 700nm; re-energizes electrons; reduces NADP+ to NADPH','ATP Synthase (CF0CF1) — H+ gradient drives rotation; synthesizes ATP (photophosphorylation)','Calvin Cycle — CO2 + RuBP (RuBisCO) → 3-PGA → G3P → regenerate RuBP + glucose'],
      facts:['Non-cyclic photophosphorylation: 2H2O + 2NADP+ + 3ADP → O2 + 2NADPH + 3ATP','P680 is the strongest biological oxidant (E° = +1.1V)','C4 plants (maize, sugarcane): CO2 first fixed as OAA by PEP carboxylase in mesophyll'],
      svg: () => (
        <svg viewBox="0 0 460 340" style={{width:'100%',height:'auto'}}>
          <text x="230" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Z-Scheme — Light Reactions in Thylakoid</text>
          <rect x="10" y="148" width="440" height="18" rx="5" fill="#0d2a0d" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="230" y="160" textAnchor="middle" fill="#3fb950" fontSize="8">Thylakoid Membrane</text>
          <rect x="28" y="72" width="98" height="64" rx="8" fill="#1a2d0d" stroke="#3fb950" strokeWidth="2"/>
          <text x="77" y="94" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">PS II</text>
          <text x="77" y="108" textAnchor="middle" fill="#d29922" fontSize="9">P680</text>
          <text x="77" y="122" textAnchor="middle" fill="#8b949e" fontSize="7">absorbs 680nm</text>
          <rect x="18" y="196" width="98" height="40" rx="6" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="67" y="213" textAnchor="middle" fill="#58a6ff" fontSize="8" fontWeight="bold">H2O splitting</text>
          <text x="67" y="226" textAnchor="middle" fill="#3fb950" fontSize="7">O2+4H++4e-</text>
          <line x1="77" y1="196" x2="77" y2="136" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#za)"/>
          <rect x="155" y="152" width="48" height="26" rx="5" fill="#1a1a0a" stroke="#d29922" strokeWidth="1.5"/>
          <text x="179" y="168" textAnchor="middle" fill="#d29922" fontSize="8" fontWeight="bold">PQ</text>
          <line x1="126" y1="104" x2="157" y2="157" stroke="#f0883e" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#za)"/>
          <rect x="224" y="88" width="82" height="48" rx="6" fill="#1a0d2d" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="265" y="109" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Cyt b6f</text>
          <text x="265" y="123" textAnchor="middle" fill="#8b949e" fontSize="7">pumps H+</text>
          <line x1="203" y1="165" x2="226" y2="116" stroke="#d29922" strokeWidth="2" markerEnd="url(#za)"/>
          <rect x="328" y="152" width="42" height="26" rx="5" fill="#1a1a0a" stroke="#d29922" strokeWidth="1.5"/>
          <text x="349" y="168" textAnchor="middle" fill="#d29922" fontSize="8">PC</text>
          <line x1="306" y1="112" x2="330" y2="155" stroke="#bc8cff" strokeWidth="2" markerEnd="url(#za)"/>
          <rect x="330" y="48" width="98" height="64" rx="8" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="2"/>
          <text x="379" y="70" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">PS I</text>
          <text x="379" y="84" textAnchor="middle" fill="#d29922" fontSize="9">P700</text>
          <text x="379" y="98" textAnchor="middle" fill="#8b949e" fontSize="7">absorbs 700nm</text>
          <line x1="371" y1="152" x2="371" y2="112" stroke="#d29922" strokeWidth="2" markerEnd="url(#za)"/>
          <rect x="330" y="205" width="98" height="44" rx="6" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="379" y="222" textAnchor="middle" fill="#58a6ff" fontSize="8" fontWeight="bold">Fd → NADP+</text>
          <text x="379" y="238" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">→ NADPH</text>
          <line x1="379" y1="112" x2="379" y2="205" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#za)"/>
          <rect x="158" y="205" width="90" height="44" rx="6" fill="#0a200a" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="203" y="222" textAnchor="middle" fill="#3fb950" fontSize="8" fontWeight="bold">ATP Synthase</text>
          <text x="203" y="238" textAnchor="middle" fill="#3fb950" fontSize="9">→ ATP</text>
          <text x="55" y="62" fill="#f0883e" fontSize="15">☀</text>
          <text x="356" y="42" fill="#f0883e" fontSize="15">☀</text>
          <defs><marker id="za" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#3fb950"/></marker></defs>
          <text x="230" y="332" textAnchor="middle" fill="#8b949e" fontSize="9">Non-cyclic: 2H2O + 2NADP+ + 3ADP → O2 + 2NADPH + 3ATP</text>
        </svg>)
    },
    'Respiration in Plants': {
      title:'Cellular Respiration — Glycolysis + Krebs + ETC',
      parts:['Glycolysis (cytoplasm) — Glucose → 2 Pyruvate; net 2 ATP + 2 NADH; no O2 needed','Pyruvate → Acetyl CoA — In mitochondrial matrix; releases CO2 + NADH per pyruvate','Krebs Cycle (matrix) — Per pyruvate: 3NADH + 1FADH2 + 1GTP + 2CO2','ETC (inner membrane) — NADH + FADH2 oxidised; H+ gradient drives ATP synthase','Total ATP — 2 (glycolysis) + 2 (Krebs substrate) + 34 (ETC) = 36-38 ATP per glucose','Fermentation — Anaerobic; yeast: glucose → ethanol + CO2; muscle: glucose → lactic acid'],
      facts:['RQ = CO2/O2: carbohydrates=1.0; fats=0.7; proteins≈0.9','Krebs cycle enzyme citrate synthase: most important regulatory enzyme','NADH → 2.5 ATP; FADH2 → 1.5 ATP (via ETC oxidative phosphorylation)'],
      svg: () => (
        <svg viewBox="0 0 440 350" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Krebs Cycle (TCA Cycle)</text>
          <circle cx="220" cy="178" r="115" fill="none" stroke="#f0883e" strokeWidth="1" strokeDasharray="5,4" opacity=".5"/>
          {[['Acetyl CoA\n+OAA',220,48,'#f0883e','CoA,NADH,CO2'],
            ['Citrate (C6)',368,108,'#d29922','isocitrate'],
            ['Isocitrate (C6)',382,202,'#3fb950','NADH+CO2'],
            ['α-KG (C5)',308,305,'#58a6ff','NADH+CO2'],
            ['Succinyl CoA (C4)',128,305,'#bc8cff','GTP here'],
            ['Succinate (C4)',52,202,'#f85149','FADH2'],
            ['Fumarate (C4)',40,108,'#d29922','fumarase'],
            ['Malate→OAA',148,48,'#3fb950','NADH'],
          ].map(([name,x,y,col,note],i)=>(
            <g key={i}>
              <rect x={x-50} y={y-14} width="100" height="28" rx="6" fill="rgba(0,0,0,.5)" stroke={col} strokeWidth="1.5"/>
              <text x={x} y={y-2} textAnchor="middle" fill={col} fontSize="8" fontWeight="bold">{name.replace('\n',' ')}</text>
              <text x={x} y={y+11} textAnchor="middle" fill="#8b949e" fontSize="7">{note}</text>
            </g>))}
          <text x="220" y="168" textAnchor="middle" fill="#f0883e" fontSize="9" fontWeight="bold">Per Pyruvate:</text>
          <text x="220" y="182" textAnchor="middle" fill="#3fb950" fontSize="9">3 NADH + 1 FADH2</text>
          <text x="220" y="196" textAnchor="middle" fill="#d29922" fontSize="9">1 GTP + 2 CO2</text>
          <text x="220" y="340" textAnchor="middle" fill="#8b949e" fontSize="9">Occurs in mitochondrial matrix | 2 turns per glucose molecule</text>
        </svg>)
    },
    'Plant Growth and Development': {
      title:'Plant Hormones',
      parts:['Auxin (IAA) — Apical dominance; phototropism (bends toward light); cell elongation in stem','Gibberellin (GA3) — Stem elongation (bolting); seed germination; breaks dormancy; parthenocarpy','Cytokinin — Cell division; delays senescence (stay green); promotes lateral bud growth','ABA (Abscisic acid) — Stress hormone; stomatal closure; seed dormancy; opposes GA','Ethylene (C2H4) — Fruit ripening; abscission; promotes senescence; gas at room temperature','Photoperiodism — SDP (short day; long night), LDP (long day; short night), Day-neutral plants'],
      facts:['Apical dominance: auxin from shoot apex inhibits lateral buds; cytokinin reverses it','Vernalisation: cold treatment promotes flowering in wheat and other winter crops','Ethylene used commercially to ripen bananas; fruit stores use CO2 to suppress ethylene'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Plant Hormones and Their Effects</text>
          {[{name:'Auxin (IAA)',col:'#3fb950',y:50,e1:'Apical dominance; phototropism; cell elongation',e2:'Delays leaf abscission; fruit set; herbicide at high conc'},
            {name:'Gibberellin (GA)',col:'#58a6ff',y:110,e1:'Stem elongation; seed germination; breaks dormancy',e2:'Parthenocarpy (seedless fruit); promotes male flowers'},
            {name:'Cytokinin',col:'#d29922',y:170,e1:'Cell division (cytokinesis); lateral bud growth',e2:'Delays senescence; promotes chloroplast development'},
            {name:'ABA',col:'#f85149',y:230,e1:'Stress hormone: drought → stomatal closure',e2:'Seed dormancy; inhibits growth (antagonist of GA)'},
            {name:'Ethylene',col:'#f0883e',y:284,e1:'Fruit ripening; abscission of leaves/flowers/fruits',e2:'Promotes senescence; gas at room temperature (unique)'},
          ].map(({name,col,y,e1,e2})=>(
            <g key={name}>
              <rect x="10" y={y-15} width="420" height="56" rx="7" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="2"/>
              <text x="20" y={y+2} fill={col} fontSize="11" fontWeight="bold">{name}</text>
              <text x="20" y={y+16} fill="#8b949e" fontSize="8">{e1}</text>
              <text x="20" y={y+30} fill="#8b949e" fontSize="8">{e2}</text>
            </g>))}
        </svg>)
    },
    'Digestion and Absorption': {
      title:'Human Digestive System',
      parts:['Mouth — Salivary amylase (ptyalin) digests starch → maltose; pH 6.8; mucin lubricates','Stomach — HCl (pH 1.5-3.5) activates pepsinogen → pepsin; churning; intrinsic factor','Small intestine — Duodenum + jejunum + ileum; bile (liver) + pancreatic juice; main absorption','Liver — Produces bile; stored in gall bladder; emulsifies fats; glycogen storage; detox','Pancreas — Secretes amylase, lipase, trypsinogen, chymotrypsinogen (all proenzymes)','Large intestine — Water + electrolyte absorption; bacteria make Vit K and Vit B12'],
      facts:['Brush border enzymes (in SI wall): maltase, sucrase, lactase, peptidases','Bile: no enzymes; bile salts emulsify fat; bilirubin gives yellow colour to faeces','Villi + microvilli in SI increase surface area ~600 times for absorption'],
      svg: () => (
        <svg viewBox="0 0 400 360" style={{width:'100%',height:'auto'}}>
          <text x="200" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Human Digestive System</text>
          <rect x="183" y="26" width="34" height="52" rx="8" fill="#0d1a0d" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="200" y="56" textAnchor="middle" fill="#3fb950" fontSize="7">Oesophagus</text>
          <path d="M160,78 Q118,90 114,130 Q108,173 136,190 Q160,204 192,198 Q222,192 226,168 Q231,141 220,118 Q210,86 186,78Z" fill="#2d1a0d" stroke="#f0883e" strokeWidth="2.5"/>
          <text x="168" y="140" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">Stomach</text>
          <text x="168" y="153" textAnchor="middle" fill="#8b949e" fontSize="7">pH 1.5-3.5</text>
          <text x="168" y="165" textAnchor="middle" fill="#8b949e" fontSize="7">HCl+pepsin</text>
          <path d="M136,196 Q106,210 103,234 Q98,258 115,268 Q135,280 155,270 Q174,260 178,240 Q182,220 165,210 Q148,200 146,222 Q144,244 158,255 Q172,266 190,256 Q208,246 210,225 Q212,204 197,196 Q181,187 179,205" fill="none" stroke="#d29922" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M210,224 Q218,260 209,296 Q200,328 186,340 Q170,350 155,340 Q130,330 122,302 Q116,278 119,268" fill="none" stroke="#bc8cff" strokeWidth="6" strokeLinecap="round"/>
          <ellipse cx="284" cy="114" rx="46" ry="31" fill="#2d1a00" stroke="#d29922" strokeWidth="2"/>
          <text x="284" y="118" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Liver</text>
          <line x1="256" y1="132" x2="226" y2="162" stroke="#d29922" strokeWidth="1.5" strokeDasharray="3,2"/>
          <text x="264" y="160" fill="#d29922" fontSize="7">Bile duct</text>
          <ellipse cx="266" cy="172" rx="40" ry="16" fill="#1a1a2d" stroke="#58a6ff" strokeWidth="1.5" transform="rotate(-18,266,172)"/>
          <text x="264" y="176" textAnchor="middle" fill="#58a6ff" fontSize="8" fontWeight="bold">Pancreas</text>
          <line x1="122" y1="126" x2="45" y2="108" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="5" y="104" fill="#f0883e" fontSize="7.5">HCl+Pepsin</text>
          <line x1="155" y1="244" x2="45" y2="244" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="5" y="240" fill="#d29922" fontSize="7.5">Small intestine</text>
          <text x="5" y="252" fill="#8b949e" fontSize="7">(absorption)</text>
          <line x1="128" y1="300" x2="45" y2="300" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="5" y="296" fill="#bc8cff" fontSize="7.5">Large intestine</text>
          <text x="5" y="308" fill="#8b949e" fontSize="7">(water abs.)</text>
        </svg>)
    },
    'Breathing and Exchange of Gases': {
      title:'Human Respiratory System',
      parts:['Nasal cavity — Filters, warms and moistens air; mucus + cilia; olfactory receptors','Larynx — Voice box; epiglottis prevents food entering trachea during swallowing','Trachea — 11cm long; C-shaped cartilaginous rings; ciliated epithelium; branches into bronchi','Bronchi → Bronchioles → Terminal bronchioles → Respiratory bronchioles → Alveoli','Alveoli — 300-400 million; surface area 70m²; wall only 1 cell thick; capillary network','Diaphragm — Contraction → inspiration (volume↑, pressure↓); relaxation → expiration'],
      facts:['Lung volumes: Tidal=500mL; IRV=2500mL; ERV=1100mL; RV=1100mL; VC=3800mL','Oxygen: 97% as oxyhaemoglobin; 3% dissolved in plasma','CO2 transport: 70% as HCO3- (bicarbonate); 23% carbamino-Hb; 7% dissolved'],
      svg: () => (
        <svg viewBox="0 0 400 348" style={{width:'100%',height:'auto'}}>
          <text x="200" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Human Respiratory System</text>
          <path d="M150,30 Q200,20 250,30 Q264,40 260,56 Q254,73 200,75 Q146,73 140,56 Q134,40 150,30Z" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="200" y="56" textAnchor="middle" fill="#58a6ff" fontSize="8">Nasal Cavity</text>
          <rect x="182" y="75" width="36" height="21" rx="3" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="200" y="90" textAnchor="middle" fill="#58a6ff" fontSize="7">Pharynx</text>
          <rect x="182" y="96" width="36" height="19" rx="3" fill="#1a2d0d" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="200" y="110" textAnchor="middle" fill="#3fb950" fontSize="7">Larynx</text>
          <rect x="189" y="115" width="22" height="38" rx="4" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          {[120,128,136,144].map(y=><line key={y} x1="189" y1={y} x2="211" y2={y} stroke="#58a6ff" strokeWidth="1" opacity=".6"/>)}
          <text x="228" y="133" fill="#58a6ff" fontSize="8">Trachea</text>
          <path d="M200,153 Q172,163 152,168" fill="none" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M200,153 Q228,163 248,168" fill="none" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M86,162 Q54,182 54,234 Q54,280 92,295 Q132,310 150,285 Q167,260 163,225 Q159,188 148,168Z" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="2"/>
          <path d="M314,162 Q346,182 346,234 Q346,280 308,295 Q268,310 250,285 Q233,260 237,225 Q241,188 252,168Z" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="2"/>
          {[[105,236],[124,254],[108,272],[136,245],[134,268]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="11" fill="rgba(88,166,255,.1)" stroke="#58a6ff" strokeWidth="1" opacity=".7"/>)}
          {[[295,236],[276,254],[292,272],[264,245],[266,268]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="11" fill="rgba(88,166,255,.1)" stroke="#58a6ff" strokeWidth="1" opacity=".7"/>)}
          <text x="106" y="320" textAnchor="middle" fill="#8b949e" fontSize="7">Left (2 lobes)</text>
          <text x="296" y="320" textAnchor="middle" fill="#8b949e" fontSize="7">Right (3 lobes)</text>
          <text x="200" y="340" textAnchor="middle" fill="#8b949e" fontSize="9">Alveoli: 300-400M | 70m² | Tidal volume = 500mL</text>
        </svg>)
    },
    'Body Fluids and Circulation': {
      title:'Human Heart — 4 Chambers',
      parts:['Right Atrium — Receives deoxygenated blood from superior and inferior vena cava','Right Ventricle — Pumps blood to lungs via pulmonary artery (deoxygenated blood only)','Left Atrium — Receives oxygenated blood from 4 pulmonary veins','Left Ventricle — Thickest wall (3× right); pumps blood to entire body via aorta','Tricuspid valve — 3 cusps; between right atrium and right ventricle','Mitral (bicuspid) valve — 2 cusps; between left atrium and left ventricle','SA Node (pacemaker) — Generates 72 impulses/min spontaneously; right atrium wall'],
      facts:['Cardiac output = Stroke volume × HR = 70mL × 72/min = ~5 L/min','Normal BP: 120/80 mmHg (systolic/diastolic)','Heart sounds: S1 (lubb) = AV valves close; S2 (dupp) = semilunar valves close'],
      svg: () => (
        <svg viewBox="0 0 420 360" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">Human Heart — 4 Chambers</text>
          <defs><radialGradient id="hg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#200a0a"/><stop offset="100%" stopColor="#100505"/></radialGradient></defs>
          <path d="M210,330 Q108,270 78,202 Q48,142 78,104 Q108,65 143,75 Q173,83 210,115 Q247,83 277,75 Q312,65 342,104 Q372,142 342,202 Q312,270 210,330Z" fill="url(#hg3)" stroke="#f85149" strokeWidth="3"/>
          <line x1="210" y1="100" x2="210" y2="288" stroke="#f85149" strokeWidth="3"/>
          <line x1="97" y1="188" x2="323" y2="188" stroke="#d29922" strokeWidth="2" strokeDasharray="5,3"/>
          <text x="143" y="148" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">RA</text>
          <text x="143" y="163" textAnchor="middle" fill="#8b949e" fontSize="8">deoxygenated</text>
          <text x="278" y="148" textAnchor="middle" fill="#f85149" fontSize="11" fontWeight="bold">LA</text>
          <text x="278" y="163" textAnchor="middle" fill="#8b949e" fontSize="8">oxygenated</text>
          <text x="143" y="228" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">RV</text>
          <text x="278" y="228" textAnchor="middle" fill="#f85149" fontSize="11" fontWeight="bold">LV</text>
          <text x="278" y="244" textAnchor="middle" fill="#8b949e" fontSize="8">thick wall→aorta</text>
          <text x="152" y="193" fill="#d29922" fontSize="8">Tricuspid</text>
          <text x="216" y="193" fill="#d29922" fontSize="8">Mitral</text>
          <path d="M128,88 Q88,56 73,31" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
          <text x="26" y="28" fill="#58a6ff" fontSize="8">Pulm. Artery</text>
          <path d="M292,88 Q322,61 347,36" fill="none" stroke="#f85149" strokeWidth="4" strokeLinecap="round"/>
          <text x="350" y="34" fill="#f85149" fontSize="8">Pulm. Vein</text>
          <path d="M252,91 Q272,51 302,26" fill="none" stroke="#f85149" strokeWidth="6" strokeLinecap="round"/>
          <text x="304" y="24" fill="#f85149" fontSize="9" fontWeight="bold">Aorta</text>
          <path d="M158,91 Q148,56 153,21" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
          <text x="66" y="50" fill="#58a6ff" fontSize="8">Vena Cava</text>
          <circle cx="163" cy="110" r="8" fill="#3fb950"/>
          <text x="96" y="98" fill="#3fb950" fontSize="8" fontWeight="bold">SA Node</text>
          <circle cx="208" cy="188" r="6" fill="#bc8cff"/>
          <text x="210" y="206" textAnchor="middle" fill="#bc8cff" fontSize="7">AV Node</text>
          <text x="210" y="348" textAnchor="middle" fill="#8b949e" fontSize="9">CO=5L/min | BP=120/80 mmHg | Double circulation</text>
        </svg>)
    },
    'Excretory Products': {
      title:'Nephron — Functional Unit of Kidney',
      parts:['Glomerulus — Capillary tuft; ultrafiltration at 125 mL/min (GFR); high pressure','Bowman\'s Capsule — Cup-shaped; collects protein-free filtrate from glomerulus','PCT (Proximal Convoluted Tubule) — Reabsorbs 70% water; all glucose + amino acids + Na+','Loop of Henle — Descending limb (water permeable); ascending limb (NaCl, impermeable to water)','DCT (Distal Convoluted Tubule) — Regulated by Aldosterone (Na+) and ADH (water)','Collecting Duct — Final water reabsorption controlled by ADH; urine passes to renal pelvis'],
      facts:['GFR = 125 mL/min; 180 L filtered/day → only 1.5 L urine (99% reabsorbed)','Glucose threshold: 180 mg/100mL blood; glycosuria indicates diabetes mellitus','Counter-current multiplier (Loop of Henle) creates medullary gradient up to 1200 mOsm/L'],
      svg: () => (
        <svg viewBox="0 0 420 365" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Nephron — Functional Unit of Kidney</text>
          <circle cx="177" cy="56" r="28" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
          {[0,60,120,180,240,300].map((angle,i)=>(<ellipse key={i} cx={177+17*Math.cos(angle*Math.PI/180)} cy={56+17*Math.sin(angle*Math.PI/180)} rx="7" ry="5" fill="#3d1010" stroke="#f85149" strokeWidth="1" transform={`rotate(${angle},${177+17*Math.cos(angle*Math.PI/180)},${56+17*Math.sin(angle*Math.PI/180)})`}/>))}
          <text x="177" y="60" textAnchor="middle" fill="#f85149" fontSize="7" fontWeight="bold">Glomerulus</text>
          <circle cx="177" cy="56" r="46" fill="none" stroke="#f0883e" strokeWidth="2" strokeDasharray="5,3"/>
          <path d="M75,37 Q115,31 150,49" fill="none" stroke="#f85149" strokeWidth="5" strokeLinecap="round"/>
          <text x="44" y="34" fill="#f85149" fontSize="8">Afferent</text>
          <path d="M204,49 Q230,36 264,46" fill="none" stroke="#58a6ff" strokeWidth="4" strokeLinecap="round"/>
          <text x="266" y="44" fill="#58a6ff" fontSize="8">Efferent</text>
          <path d="M177,102 Q217,116 227,140 Q237,165 207,175 Q177,185 172,205" fill="none" stroke="#3fb950" strokeWidth="4" strokeLinecap="round"/>
          <path d="M172,205 Q162,244 167,280 Q172,316 182,330" fill="none" stroke="#d29922" strokeWidth="4" strokeLinecap="round"/>
          <path d="M182,330 Q197,313 207,280 Q215,244 212,205" fill="none" stroke="#bc8cff" strokeWidth="4" strokeLinecap="round"/>
          <path d="M212,205 Q236,190 246,165 Q251,140 231,125 Q211,113 196,120" fill="none" stroke="#f0883e" strokeWidth="4" strokeLinecap="round"/>
          <path d="M212,205 Q275,224 304,262 Q322,286 318,330" fill="none" stroke="#58a6ff" strokeWidth="5" strokeLinecap="round"/>
          <line x1="145" y1="56" x2="57" y2="74" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="5" y="71" fill="#f0883e" fontSize="9" fontWeight="bold">Bowman's Capsule</text>
          <line x1="219" y1="150" x2="305" y2="138" stroke="#3fb950" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="307" y="136" fill="#3fb950" fontSize="9" fontWeight="bold">PCT</text>
          <line x1="169" y1="262" x2="76" y2="262" stroke="#d29922" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="5" y="258" fill="#d29922" fontSize="9" fontWeight="bold">Loop of Henle</text>
          <line x1="238" y1="150" x2="305" y2="165" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="307" y="163" fill="#f0883e" fontSize="9" fontWeight="bold">DCT</text>
          <line x1="304" y1="289" x2="356" y2="289" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="358" y="287" fill="#58a6ff" fontSize="9" fontWeight="bold">Collecting Duct</text>
          <text x="210" y="352" textAnchor="middle" fill="#8b949e" fontSize="9">GFR=125mL/min | 180L filtered/day → 1.5L urine</text>
        </svg>)
    },
    'Locomotion and Movement': {
      title:'Sliding Filament Theory — Muscle Contraction',
      parts:['Sarcomere — Functional unit between two Z lines; contains actin and myosin','Myosin (thick filament) — A band; globular heads form cross-bridges; myosin ATPase activity','Actin (thin filament) — I band; tropomyosin covers myosin-binding sites at rest','Troponin C — Binds Ca2+; causes tropomyosin to shift; exposes myosin-binding sites','Power stroke — Myosin head bends; pulls actin toward centre; 1 ATP per cycle','I band shortens; H zone disappears; A band length remains constant during contraction'],
      facts:['Ca2+ released from sarcoplasmic reticulum on nerve impulse via T-tubule system','Rigor mortis: ATP depletion post-death → permanent cross-bridges (stiffness)','Muscle types: skeletal (voluntary, striated), cardiac (involuntary, striated), smooth (involuntary)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Sliding Filament Theory</text>
          <rect x="18" y="48" width="404" height="92" rx="6" fill="#0d0d1a" stroke="#bc8cff" strokeWidth="2"/>
          <text x="220" y="67" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">Sarcomere</text>
          <line x1="18" y1="48" x2="18" y2="140" stroke="#58a6ff" strokeWidth="3"/>
          <line x1="422" y1="48" x2="422" y2="140" stroke="#58a6ff" strokeWidth="3"/>
          <text x="18" y="155" textAnchor="middle" fill="#58a6ff" fontSize="8">Z line</text>
          <text x="422" y="155" textAnchor="middle" fill="#58a6ff" fontSize="8">Z line</text>
          <rect x="100" y="85" width="222" height="8" rx="4" fill="#f85149"/>
          <rect x="100" y="97" width="222" height="8" rx="4" fill="#f85149"/>
          <text x="211" y="82" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Myosin thick filament (A band)</text>
          <rect x="18" y="100" width="155" height="5" rx="3" fill="#3fb950"/>
          <rect x="249" y="100" width="155" height="5" rx="3" fill="#3fb950"/>
          <rect x="18" y="110" width="155" height="5" rx="3" fill="#3fb950"/>
          <rect x="249" y="110" width="155" height="5" rx="3" fill="#3fb950"/>
          <text x="90" y="128" textAnchor="middle" fill="#3fb950" fontSize="8">Actin (I band)</text>
          <rect x="133" y="48" width="155" height="92" fill="rgba(248,81,73,.07)" stroke="#f85149" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="211" y="154" textAnchor="middle" fill="#f85149" fontSize="7">H zone — disappears on contraction</text>
          {[['1. Nerve impulse arrives',22,185,'#3fb950'],['2. Ca2+ from sarcoplasmic reticulum',152,185,'#d29922'],['3. Troponin binds Ca2+',298,185,'#f0883e'],['4. Tropomyosin moves; actin exposed',22,225,'#f85149'],['5. Myosin binds actin cross-bridge',185,225,'#bc8cff'],['6. Power stroke; ATP used',320,225,'#58a6ff']].map(([t,x,y,c])=>(
            <g key={t}><rect x={x} y={y-13} width="118" height="24" rx="4" fill="rgba(0,0,0,.3)" stroke={c} strokeWidth="1.2"/>
            <text x={x+59} y={y+2} textAnchor="middle" fill={c} fontSize="7.5">{t}</text></g>))}
          <text x="220" y="272" textAnchor="middle" fill="#8b949e" fontSize="9">I band shortens | A band constant | H zone disappears</text>
          <text x="220" y="285" textAnchor="middle" fill="#8b949e" fontSize="9">Ca2+ from SR | 1 ATP per power stroke | Rigor mortis if no ATP</text>
        </svg>)
    },
    'Neural Control and Coordination': {
      title:'Neuron Structure and Synapse',
      parts:['Dendrites — Highly branched; receive incoming signals from other neurons','Cell body (Soma) — Contains nucleus, Nissl bodies (RER); metabolic centre of neuron','Axon — Long single process; carries impulse away from cell body; up to 1m long','Myelin sheath — Formed by Schwann cells (PNS); insulates; speeds up conduction','Nodes of Ranvier — Gaps in myelin; allow saltatory conduction (jumps between nodes)','Synapse — Junction between neurons; neurotransmitters released into 20nm synaptic cleft','Resting potential: -70mV (inside); maintained by Na+/K+ ATPase pump (3Na+ out, 2K+ in)'],
      facts:['Myelinated fibres: 70-120 m/s (saltatory conduction) vs unmyelinated: 0.5-2 m/s','Action potential: Na+ rushes in (+40mV) → repolarisation by K+ outflow','Acetylcholine at NMJ and cholinergic synapses; destroyed by acetylcholinesterase'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Neuron Structure</text>
          {[[-60,-20],[-50,15],[-75,5],[-40,32]].map(([dx,dy],i)=>(<path key={i} d={`M220,138 Q${220+dx/2},${138+dy/2} ${220+dx},${138+dy}`} fill="none" stroke="#bc8cff" strokeWidth="2" strokeLinecap="round"/>))}
          <circle cx="220" cy="138" r="27" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="2"/>
          <text x="220" y="135" textAnchor="middle" fill="#bc8cff" fontSize="8">Cell body</text>
          <text x="220" y="147" textAnchor="middle" fill="#8b949e" fontSize="7">(Soma)</text>
          <line x1="247" y1="138" x2="408" y2="138" stroke="#3fb950" strokeWidth="4" strokeLinecap="round"/>
          {[272,302,332,362,392].map(x=>(<rect key={x} x={x-8} y={128} width="16" height="20" rx="3" fill="#d29922" opacity=".5"/>))}
          {[260,290,320,350,380].map(x=>(<line key={x} x1={x} y1={129} x2={x} y2={147} stroke="#0d0d0d" strokeWidth="3"/>))}
          <circle cx="418" cy="138" r="12" fill="#1a2d1a" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="418" y="142" textAnchor="middle" fill="#3fb950" fontSize="6.5">Term.</text>
          <text x="148" y="55" fill="#bc8cff" fontSize="9">Dendrites</text>
          <text x="330" y="125" textAnchor="middle" fill="#d29922" fontSize="8">Myelin Sheath</text>
          <text x="290" y="165" textAnchor="middle" fill="#8b949e" fontSize="7">Nodes of Ranvier</text>
          <text x="340" y="155" fill="#3fb950" fontSize="8">Axon terminal</text>
          <rect x="18" y="185" width="404" height="100" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="203" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Action Potential</text>
          <line x1="35" y1="270" x2="410" y2="270" stroke="#30363d" strokeWidth="1"/>
          <line x1="35" y1="215" x2="35" y2="274" stroke="#30363d" strokeWidth="1"/>
          <path d="M40,258 L100,258 L130,218 L155,215 L178,258 L215,268 L410,268" fill="none" stroke="#f85149" strokeWidth="2"/>
          <text x="37" y="211" fill="#f85149" fontSize="7">+40mV</text>
          <text x="37" y="262" fill="#58a6ff" fontSize="7">-70mV</text>
          <text x="128" y="213" fill="#3fb950" fontSize="7">Na+ in</text>
          <text x="170" y="263" fill="#d29922" fontSize="7">K+ out</text>
          <text x="280" y="260" fill="#8b949e" fontSize="7">Resting potential restored</text>
        </svg>)
    },
    'Chemical Coordination and Integration': {
      title:'Endocrine Glands and Hormones',
      parts:['Hypothalamus — Master controller; releasing/inhibiting hormones; connects nervous and endocrine','Anterior Pituitary — GH, TSH, ACTH, FSH, LH, Prolactin (tropic hormones control other glands)','Posterior Pituitary — Stores ADH (vasopressin → water reabsorption) and Oxytocin (uterine contraction)','Thyroid — T3+T4 (thyroxine: raises BMR, growth); Calcitonin (lowers blood Ca2+)','Adrenal Cortex — Cortisol (stress response); Aldosterone (Na+ retention); Androgens','Pancreatic Islets — β cells → Insulin (lowers blood glucose); α cells → Glucagon (raises glucose)'],
      facts:['Feedback inhibition: high T4 → inhibits TRH (hypothalamus) and TSH (anterior pituitary)','Diabetes mellitus: Type I (no insulin — autoimmune); Type II (insulin resistance — lifestyle)','Oxytocin = milk ejection reflex + uterine contractions during parturition (positive feedback)'],
      svg: () => (
        <svg viewBox="0 0 440 340" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Endocrine Glands and Hormones</text>
          {[{n:'Hypothalamus',x:220,y:46,c:'#bc8cff',h:'TRH, CRH, GnRH, ADH, Oxytocin'},
            {n:'Anterior Pituitary',x:220,y:88,c:'#f0883e',h:'GH, TSH, ACTH, FSH, LH, Prolactin'},
            {n:'Posterior Pituitary',x:220,y:128,c:'#d29922',h:'ADH (water reabsorption) | Oxytocin (uterine contraction)'},
            {n:'Thyroid',x:115,y:172,c:'#3fb950',h:'T3,T4 (BMR) | Calcitonin (↓Ca2+)'},
            {n:'Parathyroid',x:340,y:172,c:'#58a6ff',h:'PTH → raises blood Ca2+'},
            {n:'Adrenal Cortex',x:95,y:226,c:'#f85149',h:'Cortisol | Aldosterone | Androgens'},
            {n:'Adrenal Medulla',x:95,y:268,c:'#f0883e',h:'Adrenaline + Noradrenaline (fight/flight)'},
            {n:'Pancreatic Islets',x:345,y:226,c:'#3fb950',h:'β→Insulin (↓glucose) | α→Glucagon (↑glucose)'},
            {n:'Gonads',x:220,y:315,c:'#bc8cff',h:'Testosterone | Estrogen + Progesterone'},
          ].map(({n,x,y,c,h})=>(
            <g key={n}>
              <rect x={x-80} y={y-14} width="160" height="28" rx="6" fill="rgba(0,0,0,.4)" stroke={c} strokeWidth="1.5"/>
              <text x={x} y={y-1} textAnchor="middle" fill={c} fontSize="9" fontWeight="bold">{n}</text>
              <text x={x} y={y+11} textAnchor="middle" fill="#8b949e" fontSize="7">{h}</text>
            </g>))}
          <line x1="220" y1="60" x2="220" y2="74" stroke="#bc8cff" strokeWidth="1" strokeDasharray="3,2"/>
          <line x1="220" y1="102" x2="220" y2="114" stroke="#f0883e" strokeWidth="1" strokeDasharray="3,2"/>
        </svg>)
    },
  }

  Object.assign(BIO_CHAPTERS, {
    'Reproduction in Organisms': {
      title:'Types of Reproduction',
      parts:['Binary fission — Amoeba, bacteria; nucleus divides into 2; genetic copy of parent','Budding — Hydra, yeast; new daughter organism grows from parent body','Fragmentation — Spirogyra; body breaks into pieces; each grows into new organism','Vegetative propagation — Ginger (rhizome), Potato (tuber), Onion (bulb); from plant parts','Sexual reproduction — Two parents; meiosis produces gametes; fertilization gives variation'],
      facts:['Clone: genetically identical to parent — result of asexual reproduction','Parthenogenesis: egg develops without fertilization; seen in honeybee drones','Parthenocarpy: seedless fruit development without fertilization; e.g. banana'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Types of Reproduction</text>
          <rect x="10" y="30" width="420" height="135" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="2"/>
          <text x="220" y="48" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">Asexual Reproduction</text>
          {[['Binary fission','Amoeba, Bacteria','Nucleus divides → 2 cells; genetic copy'],['Budding','Hydra, Yeast','Daughter organism grows from parent'],['Fragmentation','Spirogyra','Body breaks; each part grows'],['Vegetative','Ginger, Potato, Onion','Roots/stems/leaves give new plant']].map(([type,eg,desc],i)=>(
          <g key={type}><text x="20" y={68+i*24} fill="#3fb950" fontSize="9" fontWeight="bold">{type}:</text>
          <text x="140" y={68+i*24} fill="#d29922" fontSize="8">({eg})</text>
          <text x="265" y={68+i*24} fill="#8b949e" fontSize="8">{desc}</text></g>))}
          <rect x="10" y="178" width="420" height="128" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="2"/>
          <text x="220" y="196" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Sexual Reproduction</text>
          {[['Involves','Two parents; meiosis; gamete formation; fertilization'],['Advantages','Genetic variation; adaptation; evolution'],['Gametogenesis','Spermatogenesis (testes) | Oogenesis (ovary)'],['Fertilization','External (frog,fish) | Internal (reptiles, birds, mammals)']].map(([k,v],i)=>(
          <g key={k}><text x="20" y={216+i*24} fill="#58a6ff" fontSize="9" fontWeight="bold">{k}:</text>
          <text x="115" y={216+i*24} fill="#8b949e" fontSize="8">{v}</text></g>))}
        </svg>)
    },
    'Sexual Reproduction in Flowering Plants': {
      title:'Flower Structure and Double Fertilization',
      parts:['Stamen — Anther (produces pollen) + filament; male reproductive part','Pistil — Stigma + style + ovary (contains ovules); female reproductive part','Pollen grain — 2-celled: vegetative cell (pollen tube) + generative cell (divides → 2 male gametes)','Pollination — Self (autogamy) or cross (allogamy); agents: wind, water, insects, animals','Syngamy (fertilization 1) — 1 male gamete + egg → 2n zygote → embryo','Triple fusion (fertilization 2) — 1 male gamete + 2 polar nuclei → 3n endosperm (nutritive tissue)'],
      facts:['Double fertilization is unique to angiosperms; discovered by Nawaschin (1898)','Endosperm (3n): persists in monocots (rice, wheat); consumed by embryo in dicots','Apomixis: asexual seed formation without fertilization; seen in Asteraceae'],
      svg: () => (
        <svg viewBox="0 0 420 350" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Flower Structure and Double Fertilization</text>
          {[0,60,120,180,240,300].map((a,i)=>(<ellipse key={i} cx={210+45*Math.cos(a*Math.PI/180)} cy={115+30*Math.sin(a*Math.PI/180)} rx="20" ry="11" fill="#2d1a1a" stroke="#f85149" strokeWidth="1.5" opacity=".85" transform={`rotate(${a},${210+45*Math.cos(a*Math.PI/180)},${115+30*Math.sin(a*Math.PI/180)})`}/>))}
          <text x="210" y="62" textAnchor="middle" fill="#f85149" fontSize="8">Petals (Corolla)</text>
          {[-25,0,25].map((dx,i)=>(<g key={i}><line x1={210+dx} y1="105" x2={210+dx} y2="143" stroke="#d29922" strokeWidth="1.5"/><ellipse cx={210+dx} cy={149} rx="6" ry="4" fill="#d29922" stroke="#f0883e" strokeWidth="1"/></g>))}
          <text x="252" y="143" fill="#d29922" fontSize="8">Stamen</text>
          <ellipse cx="210" cy="115" rx="10" ry="16" fill="rgba(0,0,0,.5)" stroke="#bc8cff" strokeWidth="2"/>
          <line x1="210" y1="99" x2="210" y2="87" stroke="#bc8cff" strokeWidth="2"/>
          <ellipse cx="210" cy="84" rx="8" ry="5" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="166" y="100" fill="#bc8cff" fontSize="8">Pistil (Ovary)</text>
          <rect x="10" y="183" width="400" height="155" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="210" y="201" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Double Fertilization (Unique to Angiosperms)</text>
          <text x="20" y="220" fill="#3fb950" fontSize="9" fontWeight="bold">Pollen grain (2-celled):</text>
          <text x="20" y="235" fill="#8b949e" fontSize="8">Vegetative cell (tube) + Generative cell (divides → 2 male gametes)</text>
          <text x="20" y="255" fill="#d29922" fontSize="9" fontWeight="bold">Syngamy (fertilization 1):</text>
          <text x="20" y="270" fill="#8b949e" fontSize="8">1 male gamete + egg cell → 2n Zygote → Embryo</text>
          <text x="20" y="290" fill="#f0883e" fontSize="9" fontWeight="bold">Triple fusion (fertilization 2):</text>
          <text x="20" y="305" fill="#8b949e" fontSize="8">1 male gamete + 2 polar nuclei → 3n Endosperm → nourishes embryo</text>
          <text x="210" y="330" textAnchor="middle" fill="#bc8cff" fontSize="8">Discovered by Nawaschin 1898</text>
        </svg>)
    },
    'Human Reproduction': {
      title:'Menstrual Cycle (28 days)',
      parts:['Testes — Seminiferous tubules produce sperm; Leydig cells secrete testosterone','Spermatogenesis — Spermatogonia → primary spermatocyte → secondary → spermatid → sperm; 64 days','Ovaries — Graafian follicle develops; ovulation on day 14; corpus luteum forms after','Menstrual phase — Day 1-5; shedding of endometrium (no fertilization occurred)','Follicular phase — Day 6-13; FSH stimulates follicle growth; estrogen rises','Ovulation — Day 14; LH surge triggers release of secondary oocyte','Luteal phase — Day 15-28; corpus luteum secretes progesterone (maintains uterine lining)'],
      facts:['LH surge triggers ovulation on day 14 of a 28-day cycle','Corpus luteum → progesterone (maintains pregnancy for first 3 months)','HCG (from placenta) maintains corpus luteum; basis of pregnancy tests'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Menstrual Cycle (28 days)</text>
          <rect x="20" y="38" width="400" height="40" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <rect x="20" y="38" width="72" height="40" rx="8" fill="rgba(248,81,73,.2)" stroke="#f85149" strokeWidth="1.5"/>
          <rect x="92" y="38" width="115" height="40" fill="rgba(63,185,80,.2)" stroke="#3fb950" strokeWidth="1.5"/>
          <rect x="207" y="38" width="18" height="40" fill="rgba(88,166,255,.3)" stroke="#58a6ff" strokeWidth="2"/>
          <rect x="225" y="38" width="195" height="40" rx="8" fill="rgba(188,140,255,.2)" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="56" y="53" textAnchor="middle" fill="#f85149" fontSize="8" fontWeight="bold">Menstruation</text>
          <text x="56" y="66" textAnchor="middle" fill="#8b949e" fontSize="7">Day 1-5</text>
          <text x="149" y="53" textAnchor="middle" fill="#3fb950" fontSize="8" fontWeight="bold">Follicular</text>
          <text x="149" y="66" textAnchor="middle" fill="#8b949e" fontSize="7">Day 6-13; FSH</text>
          <text x="216" y="53" textAnchor="middle" fill="#58a6ff" fontSize="7" fontWeight="bold">Ov.</text>
          <text x="322" y="53" textAnchor="middle" fill="#bc8cff" fontSize="8" fontWeight="bold">Luteal Phase</text>
          <text x="322" y="66" textAnchor="middle" fill="#8b949e" fontSize="7">Day 15-28</text>
          {[1,5,13,14,28].map((day,i)=>{const x=20+(day/28)*400; return <g key={i}><line x1={x} y1={78} x2={x} y2={88} stroke="#8b949e" strokeWidth="1"/><text x={x} y={98} textAnchor="middle" fill="#8b949e" fontSize="8">D{day}</text></g>})}
          <text x="220" y="120" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Hormone Levels</text>
          <rect x="20" y="128" width="400" height="120" rx="6" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="30" y="145" fill="#3fb950" fontSize="8">FSH</text>
          <path d="M50,173 Q150,141 220,168 Q290,193 350,181" fill="none" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="30" y="161" fill="#f85149" fontSize="8">LH</text>
          <path d="M50,193 Q160,188 210,148 Q230,148 240,188 Q290,213 350,203" fill="none" stroke="#f85149" strokeWidth="2"/>
          <text x="30" y="185" fill="#bc8cff" fontSize="8">E2</text>
          <path d="M50,208 Q130,188 200,168 Q220,168 250,203 Q310,228 350,221" fill="none" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="210" y="163" fill="#f85149" fontSize="9" fontWeight="bold">LH surge</text>
          <line x1="215" y1="148" x2="215" y2="243" stroke="#58a6ff" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="216" y="251" fill="#58a6ff" fontSize="7">Ovulation D14</text>
          <text x="220" y="270" textAnchor="middle" fill="#8b949e" fontSize="9">Fertilization in ampulla of fallopian tube</text>
          <text x="220" y="284" textAnchor="middle" fill="#8b949e" fontSize="9">HCG maintains corpus luteum during pregnancy</text>
        </svg>)
    },
    'Reproductive Health': {
      title:'Contraceptive Methods',
      parts:['Natural methods — Calendar (safe period); lactational amenorrhoea (up to 6 months postpartum)','Barrier methods — Condom (also prevents STDs); diaphragm; cervical cap','Oral pills — Saheli (non-steroidal, weekly); combined pills (estrogen+progestogen, daily)','IUD — Copper-T (most popular; Cu ions toxic to sperm); hormone-releasing LNG-20','Surgical methods — Vasectomy (male); tubectomy (female); permanent contraception','MTP (Medical Termination of Pregnancy) — Legal in India up to 20 weeks (with conditions)'],
      facts:['Amniocentesis: detects chromosomal abnormalities like Down syndrome (banned for sex determination in India)','IVF (test-tube baby): egg fertilized outside body; embryo transferred to uterus','RCH programme: government initiative for reproductive and child health'],
      svg: () => (
        <svg viewBox="0 0 440 290" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Reproductive Health — Contraception</text>
          {[{type:'Natural',col:'#3fb950',y:44,items:['Calendar method (safe period)','Lactational amenorrhoea (up to 6 mo)','Coitus interruptus (withdrawal)']},
            {type:'Barrier',col:'#58a6ff',y:106,items:['Condom (male/female) — prevents STDs too','Diaphragm, cervical cap, vaults','Spermicidal creams and jellies']},
            {type:'Hormonal (Pills)',col:'#d29922',y:168,items:['Saheli (non-steroidal) — once a week','Combined pills — daily','Mini pills (progestogen only)']},
            {type:'IUD',col:'#f0883e',y:230,items:['Copper-T (most popular method)','Hormone releasing: LNG-20']},
          ].map(({type,col,y,items})=>(
            <g key={type}><rect x="10" y={y-15} width="420" height="58" rx="7" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="2"/>
            <text x="20" y={y} fill={col} fontSize="11" fontWeight="bold">{type}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+14+j*13} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Principles of Inheritance and Variation': {
      title:"Mendel's Monohybrid Cross",
      parts:['Law of Dominance — Dominant allele masks recessive in F1 heterozygote (Tt looks Tall)','Law of Segregation — Alleles separate during gamete formation; most fundamental law','Law of Independent Assortment — Genes on different chromosomes assort independently','Codominance — Both alleles expressed equally; e.g. ABO blood groups (IA and IB)','Incomplete dominance — F1 phenotype intermediate; e.g. pink flowers from red×white snapdragon','Sex-linked inheritance — Genes on X chromosome (haemophilia, colour blindness); more common in males'],
      facts:['Test cross: unknown genotype × homozygous recessive (aa) → reveals genotype','Dihybrid F2 ratio: 9:3:3:1 (genes on different chromosomes)','Sickle cell anaemia: HbA/HbS codominant; HbS/HbS = disease; HbA/HbS gives malaria resistance'],
      svg: () => (
        <svg viewBox="0 0 420 370" style={{width:'100%',height:'auto'}}>
          <text x="210" y="20" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">Monohybrid Cross (Mendel)</text>
          <text x="210" y="44" textAnchor="middle" fill="#8b949e" fontSize="11">P Generation</text>
          <rect x="78" y="50" width="80" height="30" rx="8" fill="#1a2d1a" stroke="#3fb950" strokeWidth="2"/>
          <text x="118" y="69" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">TT</text>
          <rect x="262" y="50" width="80" height="30" rx="8" fill="#2d1a1a" stroke="#f85149" strokeWidth="2"/>
          <text x="302" y="69" textAnchor="middle" fill="#f85149" fontSize="13" fontWeight="bold">tt</text>
          <text x="210" y="69" textAnchor="middle" fill="#8b949e" fontSize="15">×</text>
          <line x1="210" y1="86" x2="210" y2="102" stroke="#8b949e" strokeWidth="1.5"/>
          <text x="210" y="118" textAnchor="middle" fill="#8b949e" fontSize="11">F₁ — All Tall (Tt)</text>
          <rect x="153" y="124" width="114" height="28" rx="8" fill="#1a2a1a" stroke="#d29922" strokeWidth="2"/>
          <text x="210" y="143" textAnchor="middle" fill="#d29922" fontSize="13" fontWeight="bold">Tt</text>
          <text x="210" y="174" textAnchor="middle" fill="#8b949e" fontSize="10">Self-pollination ↓</text>
          <text x="210" y="196" textAnchor="middle" fill="#8b949e" fontSize="11">F₂ Punnett Square</text>
          <rect x="118" y="203" width="184" height="108" fill="none" stroke="#30363d" strokeWidth="1.5"/>
          <line x1="210" y1="203" x2="210" y2="311" stroke="#30363d" strokeWidth="1.5"/>
          <line x1="118" y1="257" x2="302" y2="257" stroke="#30363d" strokeWidth="1.5"/>
          <text x="164" y="219" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">T</text>
          <text x="256" y="219" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">t</text>
          <text x="106" y="240" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">T</text>
          <text x="106" y="296" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">t</text>
          <rect x="119" y="204" width="90" height="52" fill="rgba(63,185,80,.08)"/>
          <rect x="211" y="204" width="90" height="52" fill="rgba(210,153,34,.08)"/>
          <rect x="119" y="258" width="90" height="52" fill="rgba(210,153,34,.08)"/>
          <rect x="211" y="258" width="90" height="52" fill="rgba(248,81,73,.08)"/>
          <text x="164" y="233" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">TT</text>
          <text x="256" y="233" textAnchor="middle" fill="#d29922" fontSize="13" fontWeight="bold">Tt</text>
          <text x="164" y="288" textAnchor="middle" fill="#d29922" fontSize="13" fontWeight="bold">Tt</text>
          <text x="256" y="288" textAnchor="middle" fill="#f85149" fontSize="13" fontWeight="bold">tt</text>
          <text x="210" y="333" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">Phenotype: 3 Tall : 1 Dwarf</text>
          <text x="210" y="349" textAnchor="middle" fill="#8b949e" fontSize="10">Genotype: 1 TT : 2 Tt : 1 tt</text>
        </svg>)
    },
    'Molecular Basis of Inheritance': {
      title:'DNA Replication — Semi-conservative',
      parts:['Helicase — Unwinds the double helix by breaking hydrogen bonds at replication fork','Primase — Synthesizes short RNA primer; provides free 3\'OH for DNA polymerase to start','DNA Pol III — Main replicating enzyme; adds nucleotides only in 5\'→3\' direction','Leading strand — Synthesized continuously toward the replication fork','Lagging strand — Synthesized discontinuously as Okazaki fragments, away from the fork','DNA Ligase — Seals nicks between Okazaki fragments by forming phosphodiester bonds'],
      facts:['Meselson and Stahl (1958) proved semi-conservative replication using N-15 labelling','Start codon: AUG (Met); Stop codons: UAA, UAG, UGA','One gene-one enzyme hypothesis: Beadle and Tatum (1941); Neurospora crassa'],
      svg: () => (
        <svg viewBox="0 0 440 360" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">DNA Replication — Semi-conservative</text>
          {Array.from({length:8},(_,i)=>{const y=24+i*14, t=i/2.5; return <g key={i}>
            <circle cx={120+48*Math.sin(t)} cy={y} r="5" fill="#58a6ff" opacity=".85"/>
            <circle cx={120-48*Math.sin(t)} cy={y} r="5" fill="#f85149" opacity=".85"/>
            {i>0&&<line x1={120+48*Math.sin(t)} y1={y} x2={120+48*Math.sin((i-1)/2.5)} y2={y-14} stroke="#58a6ff" strokeWidth="1.5" opacity=".4"/>}
            {i>0&&<line x1={120-48*Math.sin(t)} y1={y} x2={120-48*Math.sin((i-1)/2.5)} y2={y-14} stroke="#f85149" strokeWidth="1.5" opacity=".4"/>}
          </g>})}
          <text x="120" y="14" textAnchor="middle" fill="#8b949e" fontSize="9">Parent DNA</text>
          <circle cx="120" cy="138" r="14" fill="#d29922"/>
          <text x="120" y="142" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Helicase</text>
          <path d="M120,152 L65,218 L65,355" fill="none" stroke="#58a6ff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M120,152 L175,218 L175,355" fill="none" stroke="#f85149" strokeWidth="3" strokeLinecap="round"/>
          <path d="M175,228 L245,288 L245,355" fill="none" stroke="#3fb950" strokeWidth="3" strokeDasharray="7,3"/>
          {[55,80,105,130,155,180].map((y,i)=>(<path key={i} d={`M65,${y+173} L65,${y+190}`} fill="none" stroke="#3fb950" strokeWidth="3" strokeLinecap="round"/>))}
          <text x="245" y="270" fill="#3fb950" fontSize="9" fontWeight="bold">Leading strand</text>
          <text x="245" y="282" fill="#8b949e" fontSize="8">(continuous)</text>
          <text x="5" y="258" fill="#bc8cff" fontSize="9" fontWeight="bold">Lagging strand</text>
          <text x="5" y="270" fill="#8b949e" fontSize="8">(Okazaki frags)</text>
          <rect x="238" y="198" width="80" height="22" rx="5" fill="#1a2d1a" stroke="#3fb950"/>
          <text x="278" y="213" textAnchor="middle" fill="#3fb950" fontSize="8">DNA Pol III</text>
          <rect x="5" y="293" width="75" height="22" rx="5" fill="#1a2d2d" stroke="#58a6ff"/>
          <text x="42" y="308" textAnchor="middle" fill="#58a6ff" fontSize="8">DNA Ligase</text>
          <text x="220" y="345" textAnchor="middle" fill="#8b949e" fontSize="9">Meselson-Stahl (1958) — proved semi-conservative replication</text>
        </svg>)
    },
    'Evolution': {
      title:"Darwin's Theory and Evolutionary Timeline",
      parts:["Chemical evolution — Miller-Urey (1953) showed amino acids form from CH4+H2+NH3+sparks","First life — Prokaryotes appeared ~3.5 billion years ago; RNA world hypothesis","Lamarckism — Use and disuse; inheritance of acquired characters (now disproved)","Darwinism — Natural variation; struggle for existence; survival of fittest; natural selection","Modern Synthesis — Combines Darwinism with Mendelian genetics and population genetics","Hardy-Weinberg equilibrium — p²+2pq+q²=1; disturbed by mutation, migration, selection, drift"],
      facts:['On the Origin of Species (1859) by Charles Darwin established natural selection','Homologous organs (same origin, different function) → divergent evolution','Analogous organs (different origin, same function) → convergent evolution'],
      svg: () => (
        <svg viewBox="0 0 440 340" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Evolutionary Timeline and Darwin's Theory</text>
          <line x1="40" y1="48" x2="40" y2="298" stroke="#30363d" strokeWidth="2"/>
          {[['4600 MYA','Earth formed; chemical evolution begins','#8b949e',53],
            ['3500 MYA','First prokaryotes (bacteria, anaerobic)','#2ea043',93],
            ['1500 MYA','Eukaryotes evolve (membrane-bound nucleus)','#3fb950',133],
            ['600 MYA','Multicellular organisms; Cambrian explosion','#58a6ff',173],
            ['400 MYA','Land plants; Pteridophytes colonise land','#d29922',213],
            ['230 MYA','Reptiles; Dinosaurs; Gymnosperms dominant','#f0883e',253],
            ['200,000 YA','Homo sapiens evolve','#bc8cff',293],
          ].map(([time,event,col,y])=>(
            <g key={y}><circle cx="40" cy={y} r="5" fill={col}/>
            <text x="55" y={y+4} fill={col} fontSize="9" fontWeight="bold">{time}</text>
            <text x="55" y={y+16} fill="#8b949e" fontSize="8">{event}</text></g>))}
          <rect x="278" y="155" width="155" height="135" rx="8" fill="#1a1a0a" stroke="#d29922"/>
          <text x="355" y="173" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Darwin's Theory</text>
          {['Natural variation','Struggle for existence','Survival of fittest','Natural selection','New species over time','(Origin of Species 1859)'].map((t,i)=>(<text key={i} x="355" y={190+i*15} textAnchor="middle" fill="#8b949e" fontSize="8">{t}</text>))}
        </svg>)
    },
    'Human Health and Disease': {
      title:'Immune System — Innate vs Adaptive',
      parts:['Innate immunity — Non-specific; present from birth; skin, mucus, fever, phagocytes, NK cells','Adaptive immunity — Specific; B lymphocytes (humoral, antibodies); T lymphocytes (cell-mediated)','Antibody structure — Y-shaped; 4 polypeptide chains; 5 classes (IgG most abundant)','Vaccines — Stimulate primary immune response; create memory cells for fast secondary response','HIV/AIDS — Retrovirus; attacks CD4+ T-helper cells; transmitted via blood and sexual contact','Cancer — Oncogenes; uncontrolled cell division; metastasis (spread to other organs)'],
      facts:['Primary response: slow (7-10 days) | Secondary response: fast (1-3 days), higher titre','Malaria: Plasmodium falciparum (most lethal); female Anopheles mosquito vector','Monoclonal antibodies: produced from a single B-cell clone; used in diagnostics and treatment'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">Immune System — Innate vs Adaptive</text>
          <rect x="10" y="30" width="205" height="155" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="2"/>
          <text x="112" y="50" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">Innate Immunity</text>
          <text x="112" y="64" textAnchor="middle" fill="#8b949e" fontSize="8">(Non-specific; from birth)</text>
          {['Skin and mucous membranes','Tears, saliva (lysozyme)','Stomach acid (pH 1.5-3.5)','Phagocytes; NK cells','Complement system, interferons'].map((t,i)=>(<text key={i} x="20" y={84+i*16} fill="#8b949e" fontSize="8">• {t}</text>))}
          <rect x="225" y="30" width="205" height="155" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="2"/>
          <text x="327" y="50" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Adaptive Immunity</text>
          <text x="327" y="64" textAnchor="middle" fill="#8b949e" fontSize="8">(Specific; acquired)</text>
          {['B cells → antibodies (humoral)','T cells → cell-mediated immunity','Memory cells → secondary response','5 Ig classes (IgG, IgM, IgA, IgE, IgD)','Vaccines stimulate primary response'].map((t,i)=>(<text key={i} x="235" y={84+i*16} fill="#8b949e" fontSize="8">• {t}</text>))}
          <rect x="10" y="196" width="420" height="112" rx="8" fill="rgba(0,0,0,.3)" stroke="#f85149" strokeWidth="1.5"/>
          <text x="220" y="214" textAnchor="middle" fill="#f85149" fontSize="10" fontWeight="bold">Major Diseases</text>
          {[['HIV/AIDS','CD4+ T-cells destroyed; via blood/sex; no cure'],['Cancer','Oncogenes; uncontrolled division; metastasis'],['Malaria','Plasmodium falciparum; female Anopheles mosquito'],['Typhoid','Salmonella typhi; Widal test; rose spots']].map(([dis,desc],i)=>(<g key={dis}><text x="20" y={232+i*18} fill="#f85149" fontSize="9" fontWeight="bold">{dis}:</text><text x="95" y={232+i*18} fill="#8b949e" fontSize="8">{desc}</text></g>))}
        </svg>)
    },
    'Strategies for Enhancement in Food Production': {
      title:'Plant Breeding and Food Enhancement',
      parts:['Plant breeding — Hybridisation (crossing varieties); selection of best traits; mutation breeding','Heterosis (Hybrid vigour) — F1 hybrid superior to both parents; widely used in crop production','Biofortification — Crops bred for higher vitamins/minerals; e.g. Golden Rice (Vitamin A)','SCP (Single Cell Protein) — Spirulina, Methylophilus grown on waste; protein-rich food source','Tissue culture — Somatic embryogenesis; virus-free plants from meristem; somaclonal variation','Animal husbandry — Cross-breeding for yield; MOET (Multiple Ovulation Embryo Transfer)'],
      facts:['Sonalika (wheat) by Norman Borlaug: Green Revolution variety; high-yielding, disease-resistant','MOET: superovulation + embryo collection → multiple offspring from one superior female','Aquaculture: culturing aquatic organisms; pisciculture (fish farming), apiculture (bee farming)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Enhancement in Food Production</text>
          {[{name:'Plant Breeding',col:'#3fb950',y:46,i1:'Hybridisation: crossing two varieties',i2:'Heterosis: F1 hybrid vigour exceeds parents'},
            {name:'Tissue Culture',col:'#58a6ff',y:108,i1:'Totipotency: any cell → whole plant',i2:'Virus-free plants from meristem culture'},
            {name:'Biofortification',col:'#d29922',y:170,i1:'Golden Rice: β-carotene (Vit A) genes',i2:'Atlas 66 (wheat): high protein content'},
            {name:'Single Cell Protein',col:'#f0883e',y:232,i1:'Spirulina grown on waste; high protein',i2:'Sustainable food source for future'}].map(({name,col,y,i1,i2})=>(
            <g key={name}><rect x="10" y={y-14} width="420" height="50" rx="7" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="2"/>
            <text x="20" y={y+1} fill={col} fontSize="11" fontWeight="bold">{name}</text>
            <text x="20" y={y+16} fill="#8b949e" fontSize="8">{i1}</text>
            <text x="20" y={y+30} fill="#8b949e" fontSize="8">{i2}</text></g>))}
        </svg>)
    },
    'Microbes in Human Welfare': {
      title:'Microbes in Human Welfare',
      parts:['Lactobacillus — Lactic acid fermentation; converts milk to curd; probiotic action','Saccharomyces cerevisiae — Yeast; CO2 in bread rising; ethanol fermentation in brewing','Penicillium notatum — Discovered by Fleming (1928); produces antibiotic penicillin','Methanogens — Anaerobic bacteria; produce CH4 + CO2 from cattle dung in biogas plant','Trichoderma — Biocontrol agent; controls fungal plant diseases naturally','Sewage treatment — Primary (physical) + Secondary (microbial BOD reduction; activated sludge)'],
      facts:['Penicillin: first antibiotic discovered; revolutionised medicine','Biogas (gobar gas): renewable energy from cattle dung via anaerobic digestion','Bt toxin (Bacillus thuringiensis): used as natural pesticide against insect pests'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Microbes in Human Welfare</text>
          {[{use:'Food production',col:'#3fb950',y:46,mic:'Lactobacillus → curd | Saccharomyces → bread,beer | Acetobacter → vinegar'},
            {use:'Industrial production',col:'#d29922',y:90,mic:'Aspergillus niger → citric acid | Penicillium → statins (cholesterol drugs)'},
            {use:'Antibiotics',col:'#f85149',y:134,mic:'Penicillium notatum → Penicillin (Fleming 1928) | Streptomyces → Streptomycin'},
            {use:'Biogas plant',col:'#58a6ff',y:178,mic:'Methanogens: CH4+CO2 from cattle dung | renewable energy source'},
            {use:'Sewage treatment',col:'#bc8cff',y:222,mic:'Primary: sedimentation | Secondary: BOD reduction (activated sludge process)'},
            {use:'Biocontrol',col:'#f0883e',y:266,mic:'Trichoderma → plant disease control | Bt toxin → insect pest control'}].map(({use,col,y,mic})=>(
            <g key={use}><rect x="10" y={y-14} width="420" height="36" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+1} fill={col} fontSize="10" fontWeight="bold">{use}</text>
            <text x="20" y={y+16} fill="#8b949e" fontSize="8">{mic}</text></g>))}
        </svg>)
    },
    'Biotechnology: Principles and Processes': {
      title:'Recombinant DNA Technology — Steps',
      parts:['Restriction endonuclease — Cuts DNA at specific palindromic sites; EcoRI recognizes GAATTC','Gel electrophoresis — Separates DNA fragments by size; UV visualisation with EtBr stain','PCR — 94°C denature → 55°C anneal primers → 72°C extend with Taq polymerase (3 steps)','Cloning vector — Plasmid (pBR322) carries ori, selectable marker, multiple cloning site (MCS)','Transformation — Recombinant DNA introduced into host cell (CaCl2 or electroporation)','DNA Ligase — Joins sticky ends of vector and insert DNA fragments together'],
      facts:['EcoRI: from E.coli; recognizes GAATTC; gives sticky ends (AATT overhang)','Ti plasmid (Agrobacterium tumefaciens): natural vector for plant genetic engineering','Bioreactor: large-scale (10-100 litre) controlled growth of genetically modified organisms'],
      svg: () => (
        <svg viewBox="0 0 440 330" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Recombinant DNA Technology — Steps</text>
          <rect x="18" y="38" width="102" height="44" rx="8" fill="#0d1a0d" stroke="#3fb950" strokeWidth="2"/>
          <text x="69" y="56" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Source DNA</text>
          <text x="69" y="70" textAnchor="middle" fill="#8b949e" fontSize="8">gene of interest</text>
          <rect x="155" y="38" width="112" height="44" rx="8" fill="#1a0d0d" stroke="#f85149" strokeWidth="2"/>
          <text x="211" y="56" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Restriction Enzyme</text>
          <text x="211" y="70" textAnchor="middle" fill="#8b949e" fontSize="8">EcoRI cuts GAATTC</text>
          <path d="M120,60 L155,60" fill="none" stroke="#3fb950" strokeWidth="2" markerEnd="url(#qa)"/>
          <circle cx="362" cy="86" r="36" fill="#0d0d2d" stroke="#58a6ff" strokeWidth="2"/>
          <text x="362" y="83" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Plasmid</text>
          <text x="362" y="97" textAnchor="middle" fill="#8b949e" fontSize="7">Vector</text>
          <path d="M267,60 Q315,60 328,76" fill="none" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#qa)"/>
          <rect x="155" y="140" width="112" height="38" rx="8" fill="#0a1a0a" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="211" y="157" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">DNA Ligase</text>
          <text x="211" y="171" textAnchor="middle" fill="#8b949e" fontSize="8">seals sticky ends</text>
          <path d="M267,90 L292,140 L268,178" fill="none" stroke="#3fb950" strokeWidth="1.5" strokeDasharray="4,3"/>
          <rect x="88" y="210" width="132" height="38" rx="8" fill="#0d2d0d" stroke="#3fb950" strokeWidth="2"/>
          <text x="154" y="227" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Recombinant DNA</text>
          <text x="154" y="241" textAnchor="middle" fill="#8b949e" fontSize="8">vector + insert</text>
          <rect x="270" y="210" width="132" height="38" rx="8" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="336" y="227" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Host (E. coli)</text>
          <text x="336" y="241" textAnchor="middle" fill="#8b949e" fontSize="8">transformation</text>
          <path d="M220,248 L270,229" fill="none" stroke="#58a6ff" strokeWidth="2" markerEnd="url(#qa)"/>
          <rect x="18" y="270" width="188" height="48" rx="8" fill="#1a1a0d" stroke="#d29922" strokeWidth="1.5"/>
          <text x="112" y="288" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">PCR (3 steps)</text>
          <text x="112" y="302" textAnchor="middle" fill="#8b949e" fontSize="8">94°C→55°C→72°C cycles</text>
          <rect x="234" y="270" width="188" height="48" rx="8" fill="#0d1a1a" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="328" y="288" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Gel Electrophoresis</text>
          <text x="328" y="302" textAnchor="middle" fill="#8b949e" fontSize="8">size-based separation</text>
          <defs><marker id="qa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#3fb950"/></marker></defs>
        </svg>)
    },
    'Biotechnology and its Applications': {
      title:'Applications of Biotechnology',
      parts:['Bt Cotton — Cry protein gene from Bacillus thuringiensis; toxic to bollworm pest','Golden Rice — β-carotene (Vit A precursor) gene from daffodil inserted into rice','Insulin (Humulin) — A and B chains made separately in E.coli; first biotech drug (1982)','Gene therapy — ADA deficiency (SCID); retroviral vector; first human gene therapy (1990)','Molecular diagnostics — PCR and ELISA detect pathogens earlier than traditional methods','Transgenic animals — Rosie (cow) produces human protein in milk; OncoMouse for cancer research'],
      facts:['~60% of India\'s cotton cultivation is now Bt cotton','RNAi (RNA interference): double-stranded RNA silences specific genes; used against pests','GM crops engineered for: pest resistance, herbicide tolerance, improved nutrition'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Biotechnology Applications</text>
          {[{name:'Bt Cotton',col:'#3fb950',y:46,desc:'Bt cry protein gene | Toxic to bollworm | ~60% India\'s cotton is Bt'},
            {name:'Golden Rice',col:'#d29922',y:92,desc:'β-carotene from daffodil | Prevents Vitamin A deficiency'},
            {name:'Insulin (Humulin)',col:'#58a6ff',y:138,desc:'A+B chains in E.coli, combined | First biotech drug (1982)'},
            {name:'Gene Therapy',col:'#bc8cff',y:184,desc:'ADA deficiency — first gene therapy (1990) | Retroviral vector'},
            {name:'Molecular Diagnostics',col:'#f85149',y:230,desc:'PCR: amplify pathogen DNA | ELISA: HIV test; DNA fingerprinting'},
            {name:'Transgenic Animals',col:'#f0883e',y:276,desc:'Rosie (cow): human protein in milk | OncoMouse: cancer model'}].map(({name,col,y,desc})=>(
            <g key={name}><rect x="10" y={y-15} width="420" height="36" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y-1} fill={col} fontSize="10" fontWeight="bold">{name}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{desc}</text></g>))}
        </svg>)
    },
    'Organisms and Populations': {
      title:'Population Growth Models',
      parts:['Exponential growth (J-curve) — dN/dt=rN; no resource limit; unrealistic except in ideal conditions','Logistic growth (S-curve) — dN/dt=rN(K-N)/K; realistic; growth slows as N approaches K','Carrying capacity (K) — Maximum population an environment can sustainably support','Population attributes — Birth rate, death rate, age distribution, sex ratio','Species interactions — Mutualism (+,+), commensalism (+,0), predation (+,-), competition (-,-)','Coevolution — Predator-prey arms race; reciprocal evolutionary change between interacting species'],
      facts:['r = intrinsic rate of natural increase; higher in small, fast-reproducing organisms','Competitive exclusion principle (Gause): two species competing for the same resource cannot coexist indefinitely','Age pyramid shapes: triangular (growing population), bell (stable), urn (declining)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Population Growth Models</text>
          <rect x="10" y="28" width="420" height="85" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Exponential Growth (J-curve)</text>
          <text x="220" y="61" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">dN/dt = rN</text>
          <text x="220" y="76" textAnchor="middle" fill="#8b949e" fontSize="9">No resource limitation | Only in ideal conditions</text>
          <path d="M30,108 Q100,103 140,98 Q180,93 220,83 Q260,68 300,48 Q340,23 380,5" fill="none" stroke="#58a6ff" strokeWidth="2.5" strokeDasharray="5,3"/>
          <rect x="10" y="125" width="420" height="98" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="220" y="143" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Logistic Growth (S-curve / Sigmoid)</text>
          <text x="220" y="158" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">dN/dt = rN(K-N)/K</text>
          <text x="220" y="173" textAnchor="middle" fill="#8b949e" fontSize="9">K=carrying capacity | Real populations follow this</text>
          <path d="M30,213 Q80,211 130,203 Q175,193 210,173 Q245,151 270,143 Q310,138 380,137" fill="none" stroke="#3fb950" strokeWidth="2.5"/>
          <line x1="380" y1="137" x2="420" y2="137" stroke="#3fb950" strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="405" y="135" fill="#3fb950" fontSize="8">K</text>
          <text x="220" y="248" textAnchor="middle" fill="#d29922" fontSize="9">Population attributes: birth rate, death rate, age distribution, sex ratio</text>
          <text x="220" y="265" textAnchor="middle" fill="#8b949e" fontSize="9">Interactions: mutualism, commensalism, predation, competition, parasitism</text>
        </svg>)
    },
    'Ecosystem': {
      title:'Ecosystem Energy Flow — 10% Law',
      parts:['Producers — Autotrophs; fix solar energy via photosynthesis; base of energy pyramid','Primary consumers — Herbivores; feed directly on producers','Secondary consumers — Carnivores; feed on primary consumers','Decomposers — Fungi and bacteria; break down dead organic matter; mineralisation','Energy flow — Unidirectional; only ~10% transferred between trophic levels (Lindeman law)','GPP and NPP — Gross Primary Productivity (total photosynthesis); Net = GPP − Respiration'],
      facts:['Lindeman 10% Law (1942): only about 10% of energy transfers to the next trophic level','Pyramid of energy: always upright | Pyramid of numbers/biomass: can be inverted','Tropical rainforest has highest NPP; desert and deep ocean lowest'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Ecosystem Energy Flow — 10% Law</text>
          <polygon points="220,38 115,118 325,118" fill="rgba(63,185,80,.15)" stroke="#3fb950" strokeWidth="2"/>
          <polygon points="220,128 85,192 355,192" fill="rgba(210,153,34,.15)" stroke="#d29922" strokeWidth="2"/>
          <polygon points="220,202 50,272 390,272" fill="rgba(248,81,73,.15)" stroke="#f85149" strokeWidth="2"/>
          <text x="220" y="86" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Producers (Plants)</text>
          <text x="220" y="100" textAnchor="middle" fill="#8b949e" fontSize="8">10,000 kcal</text>
          <text x="220" y="161" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Primary Consumers (Herbivores)</text>
          <text x="220" y="175" textAnchor="middle" fill="#8b949e" fontSize="8">1,000 kcal | 10% transferred</text>
          <text x="220" y="241" textAnchor="middle" fill="#f85149" fontSize="10" fontWeight="bold">Secondary Consumers (Carnivores)</text>
          <text x="220" y="255" textAnchor="middle" fill="#8b949e" fontSize="8">100 kcal | 90% lost as heat</text>
          <text x="220" y="290" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Lindeman 10% Law (1942)</text>
        </svg>)
    },
    'Biodiversity and Conservation': {
      title:"India's Biodiversity Hotspots and Conservation",
      parts:['Genetic diversity — Variation within species; e.g. 50,000 rice varieties in India','Species diversity — Number and evenness of species; measured by Shannon index','Ecosystem diversity — Variety of habitat types: forest, wetland, grassland, coral reef','Western Ghats and Sri Lanka — One of India\'s 2 biodiversity hotspots; high endemism','Eastern Himalayas — Second biodiversity hotspot of India','HIPPCO — Habitat loss, Invasive species, Pollution, Population, Climate change, Over-exploitation'],
      facts:['Habitat loss/fragmentation is the single most important cause of biodiversity loss','In-situ conservation: national parks, biosphere reserves | Ex-situ: zoos, seed banks, cryopreservation','IUCN Red List categories: Extinct, Critically Endangered, Endangered, Vulnerable'],
      svg: () => (
        <svg viewBox="0 0 440 330" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Biodiversity and Conservation</text>
          <rect x="10" y="30" width="205" height="138" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="112" y="48" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Types of Biodiversity</text>
          {['Genetic: within species (50,000 rice var.)','Species: richness + evenness','Ecosystem: forest, wetland, coral reef'].map((t,i)=><text key={i} x="20" y={66+i*18} fill="#8b949e" fontSize="8">{t}</text>)}
          <text x="112" y="124" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">India's Hotspots</text>
          <text x="112" y="138" textAnchor="middle" fill="#8b949e" fontSize="8">1. Western Ghats + Sri Lanka</text>
          <text x="112" y="152" textAnchor="middle" fill="#8b949e" fontSize="8">2. Eastern Himalayas</text>
          <rect x="225" y="30" width="205" height="138" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="327" y="48" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Conservation Methods</text>
          {['In-situ: national parks, biosphere reserves','Ex-situ: zoos, botanical gardens','Seed banks, cryopreservation'].map((t,i)=><text key={i} x="235" y={66+i*18} fill="#8b949e" fontSize="8">{t}</text>)}
          <rect x="10" y="180" width="420" height="136" rx="8" fill="rgba(0,0,0,.3)" stroke="#f85149" strokeWidth="1.5"/>
          <text x="220" y="198" textAnchor="middle" fill="#f85149" fontSize="10" fontWeight="bold">Causes of Biodiversity Loss (HIPPCO)</text>
          {[['H','Habitat loss and fragmentation (MAIN cause)'],['I','Invasive species: Lantana, water hyacinth'],['P','Pollution of air, water, soil'],['P','Population growth and over-exploitation'],['C','Climate change — coral bleaching'],['O','Over-hunting and collection']].map(([letter,desc],i)=>(
          <g key={letter+i}><text x="20" y={216+i*16} fill="#f85149" fontSize="9" fontWeight="bold">{letter}:</text>
          <text x="35" y={216+i*16} fill="#8b949e" fontSize="8">{desc}</text></g>))}
        </svg>)
    },
    'Environmental Issues': {
      title:'Environmental Issues — Global Warming, Ozone, Acid Rain',
      parts:['Global warming — CO2, CH4, N2O, CFCs trap heat; +1.5°C would be catastrophic','Ozone layer depletion — CFCs release Cl radicals; Cl+O3→ClO+O2; Antarctic ozone hole','Acid rain — SO2+NOx+H2O→H2SO4+HNO3; pH below 5.6; damages forests and monuments','Water pollution — BOD measures pollution level; eutrophication from excess nutrients','Biomagnification — DDT and mercury accumulate at higher levels of the food chain','Solid and e-waste — Cd, Pb, Hg in electronics; plastics take 450+ years to decompose'],
      facts:['Montreal Protocol (1987): successful international treaty banning CFCs','Minamata disease (Japan, 1956): mercury poisoning from biomagnification in fish','High BOD = high organic pollution = low dissolved oxygen = fish kills'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Environmental Issues</text>
          {[{issue:'Global Warming',col:'#f85149',y:46,desc:'CO2,CH4,N2O,CFCs → greenhouse effect | Paris Agreement 2015'},
            {issue:'Ozone Depletion',col:'#bc8cff',y:90,desc:'CFCs→Cl+O3→ClO+O2 | Antarctic hole | Montreal Protocol 1987'},
            {issue:'Acid Rain',col:'#d29922',y:134,desc:'SO2+NOx+H2O→acids | pH<5.6 | Damages forests, monuments'},
            {issue:'Water Pollution',col:'#58a6ff',y:178,desc:'BOD = O2 needed | Eutrophication: nutrients → algal bloom'},
            {issue:'Biomagnification',col:'#3fb950',y:222,desc:'DDT concentrates up food chain | Minamata disease (Hg)'},
            {issue:'Solid Waste',col:'#f0883e',y:266,desc:'E-waste: Cd,Pb,Hg | Plastics: 450+ years to decompose'}].map(({issue,col,y,desc})=>(
            <g key={issue}><rect x="10" y={y-16} width="420" height="40" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{issue}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{desc}</text></g>))}
        </svg>)
    },
  })

  // ── CHEMISTRY CHAPTERS ───────────────────────────────────────
  const CHEM_CHAPTERS = {
    'Some Basic Concepts of Chemistry': {
      title:'Mole Concept and Stoichiometry',
      parts:['Mole — 6.022×10²³ entities (Avogadro number); SI unit for amount of substance','Molar mass — Mass of 1 mole in grams; numerically equal to atomic/molecular weight','Molarity (M) — Moles of solute per litre of solution; temperature-dependent','Molality (m) — Moles of solute per kg of solvent; temperature-independent','Empirical formula — Simplest whole number ratio of atoms (e.g. CH2O for glucose)','Limiting reagent — Completely consumed first; determines maximum product formed'],
      facts:['1 mole of any gas at STP (0°C, 1 atm) = 22.4 L','% yield = (actual yield / theoretical yield) × 100','Law of Conservation of Mass: total mass of reactants = total mass of products'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Mole Concept</text>
          <rect x="10" y="28" width="420" height="65" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="2"/>
          <text x="220" y="46" textAnchor="middle" fill="#d29922" fontSize="11" fontWeight="bold">1 Mole = 6.022 × 10²³ entities</text>
          <text x="220" y="62" textAnchor="middle" fill="#8b949e" fontSize="9">1 mole of any gas at STP = 22.4 L</text>
          <text x="220" y="77" textAnchor="middle" fill="#8b949e" fontSize="9">Molar mass (g/mol) = mass of 1 mole = atomic/molecular weight numerically</text>
          {[{label:'Molarity (M)',eq:'moles/litre solution',col:'#3fb950',y:118},
            {label:'Molality (m)',eq:'moles/kg solvent',col:'#58a6ff',y:154},
            {label:'Mole fraction (X)',eq:'nA/(nA+nB) — dimensionless',col:'#bc8cff',y:190},
            {label:'Mass percent (w/w)',eq:'(mass solute/mass solution)×100',col:'#f0883e',y:226},
            {label:'Limiting reagent',eq:'completely consumed first; limits product',col:'#f85149',y:262},
          ].map(({label,eq,col,y})=>(
            <g key={label}>
              <rect x="10" y={y-14} width="420" height="30" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
              <text x="20" y={y+2} fill={col} fontSize="9" fontWeight="bold">{label}:</text>
              <text x="160" y={y+2} fill="#8b949e" fontSize="9">{eq}</text>
            </g>))}
        </svg>)
    },
    'Structure of Atom': {
      title:'Bohr Model — Hydrogen Atom',
      parts:['Nucleus — Protons (+) and neutrons (0); diameter ~10⁻¹⁵ m; contains almost all the mass','Electron shells — K(max 2), L(max 8), M(max 18), N(max 32)','Bohr model — Circular orbits; quantised energy; En = -13.6Z²/n² eV','Quantum numbers — n (shell), l (subshell 0 to n-1), m (-l to +l), s (±½)','Aufbau principle — Fill lowest energy orbitals first: 1s < 2s < 2p < 3s < 3p < 4s < 3d','Heisenberg uncertainty — Δx·Δp ≥ h/4π; cannot know exact position and momentum simultaneously'],
      facts:['de Broglie wavelength: λ = h/mv (all matter has wave nature)','Pauli exclusion: no two electrons can have all four quantum numbers the same','Hund\'s rule: maximise unpaired electrons in degenerate (same energy) orbitals'],
      svg: () => (
        <svg viewBox="0 0 420 330" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Bohr Model — Hydrogen Atom</text>
          <circle cx="210" cy="170" r="17" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="2.5"/>
          <text x="210" y="168" textAnchor="middle" fill="#bc8cff" fontSize="7" fontWeight="bold">Nucleus</text>
          <text x="210" y="178" textAnchor="middle" fill="#8b949e" fontSize="6">p+, n0</text>
          {[{r:48,col:'#f85149',label:'K (n=1): max 2e⁻  E=-13.6eV'},
            {r:88,col:'#d29922',label:'L (n=2): max 8e⁻  E=-3.4eV'},
            {r:128,col:'#3fb950',label:'M (n=3): max 18e⁻ E=-1.51eV'},
            {r:164,col:'#58a6ff',label:'N (n=4): max 32e⁻ E=-0.85eV'}
          ].map(({r,col,label},i)=>(
            <g key={i}>
              <circle cx="210" cy="170" r={r} fill="none" stroke={col} strokeWidth="1.5" strokeDasharray="4,4" opacity=".7"/>
              <circle cx={210+r} cy="170" r="6" fill={col} opacity=".9"/>
              <text x="210" y={170-r-6} textAnchor="middle" fill={col} fontSize="7.5">{label}</text>
            </g>))}
          <rect x="10" y="300" width="400" height="26" rx="6" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="210" y="317" textAnchor="middle" fill="#bc8cff" fontSize="8.5">En=-13.6Z²/n² eV | rn=n²×0.529/Z Å | λ=h/mv (de Broglie)</text>
        </svg>)
    },
    'Classification of Elements and Periodicity': {
      title:'Periodic Table Trends',
      parts:['Atomic radius — Increases down group (more shells); decreases across period (more effective nuclear charge)','Ionisation energy — Increases across period; decreases down group; Be > B and N > O (exceptions)','Electron affinity — Increases across period; Cl has highest (not F — F is too small)','Electronegativity — F highest (3.98); increases across period; decreases down group','Metallic character — Decreases left to right; increases top to bottom in a group','Shielding effect — Inner electrons reduce effective nuclear charge on outer electrons'],
      facts:['Lanthanide contraction: 4f electrons poorly shield nuclear charge → size decrease La to Lu','Noble gases: complete valence shell; highest ionisation energy; largely chemically inert','Diagonal relationships: Li-Mg, Be-Al, B-Si have similar chemical properties'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Periodic Table Trends</text>
          <rect x="10" y="28" width="420" height="48" rx="6" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">ACROSS PERIOD (left → right)</text>
          {[['Atomic radius','Decreases ↓','#f85149'],['Ionization E','Increases ↑','#3fb950'],['Electronegativity','Increases ↑','#58a6ff'],['Metallic character','Decreases ↓','#bc8cff']].map(([prop,trend,col],i)=>(
            <text key={prop} x={28+i*108} y={66} fill={col} fontSize="8" textAnchor="middle">{prop}: {trend}</text>))}
          <rect x="10" y="88" width="420" height="48" rx="6" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="106" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">DOWN A GROUP (top → bottom)</text>
          {[['Atomic radius','Increases ↑','#f85149'],['Ionization E','Decreases ↓','#3fb950'],['Electronegativity','Decreases ↓','#d29922'],['Metallic char.','Increases ↑','#bc8cff']].map(([prop,trend,col],i)=>(
            <text key={prop} x={28+i*108} y={126} fill={col} fontSize="8" textAnchor="middle">{prop}: {trend}</text>))}
          {[{t:'Exceptions (Ionization Energy)',col:'#f0883e',y:158,items:['Be > B: B loses 2p electron (easier than Be\'s 2s)','N > O: N has half-filled 2p (extra stability); O loses paired electron']},
            {t:'Diagonal Relationships',col:'#3fb950',y:210,items:['Li resembles Mg | Be resembles Al | B resembles Si','Similar charge density and electronegativity in diagonal pairs']},
            {t:'Lanthanide Contraction',col:'#bc8cff',y:258,items:['4f electrons: poor shielding → size decreases La to Lu','Zr and Hf have nearly identical size; very hard to separate']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="6" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="9" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Chemical Bonding and Molecular Structure': {
      title:'VSEPR Theory and Hybridisation',
      parts:['Ionic bond — Transfer of electrons; metal to non-metal; NaCl, MgO; high MP; conducts when molten','Covalent bond — Sharing of electrons; sigma (σ) and pi (π) bonds','VSEPR — Lone pairs repel more than bonding pairs; determines molecular geometry','sp³ (tetrahedral 109.5°) — CH4; NH3 (107°, 1 lone pair); H2O (104.5°, 2 lone pairs)','sp² (trigonal planar 120°) — C2H4, BF3, benzene; has one π bond','sp (linear 180°) — C2H2, CO2, BeCl2; has two π bonds'],
      facts:['Polarity depends on electronegativity difference AND molecular symmetry (CCl4 is nonpolar)','Bond order = (bonding electrons − antibonding electrons)/2','O2 is paramagnetic (2 unpaired e⁻ in π* antibonding MOs) — explained only by MOT'],
      svg: () => (
        <svg viewBox="0 0 440 330" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Chemical Bonding — Shapes</text>
          {[{mol:'CH₄ (sp³)',shape:'Tetrahedral',angle:'109.5°',col:'#3fb950',x:78,y:68},
            {mol:'NH₃ (sp³)',shape:'Pyramidal',angle:'107°',col:'#58a6ff',x:220,y:68},
            {mol:'H₂O (sp³)',shape:'V-shaped',angle:'104.5°',col:'#f85149',x:362,y:68},
            {mol:'BF₃ (sp²)',shape:'Trig. planar',angle:'120°',col:'#d29922',x:78,y:168},
            {mol:'PCl₅ (sp³d)',shape:'Trig. bipyramid',angle:'90°/120°',col:'#f0883e',x:220,y:168},
            {mol:'SF₆ (sp³d²)',shape:'Octahedral',angle:'90°',col:'#bc8cff',x:362,y:168},
          ].map(({mol,shape,angle,col,x,y})=>(
            <g key={mol}>
              <rect x={x-68} y={y-26} width="136" height="66" rx="7" fill="rgba(0,0,0,.4)" stroke={col} strokeWidth="1.5"/>
              <text x={x} y={y-8} textAnchor="middle" fill={col} fontSize="11" fontWeight="bold">{mol}</text>
              <text x={x} y={y+8} textAnchor="middle" fill="#e6edf3" fontSize="9">{shape}</text>
              <text x={x} y={y+22} textAnchor="middle" fill="#8b949e" fontSize="8">{angle}</text>
            </g>))}
          <rect x="10" y="235" width="420" height="82" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="220" y="252" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Key Bond Concepts</text>
          {['Bond order = (bonding e⁻ − antibonding e⁻) / 2',
            'N₂: order=3 (triple bond; most stable diatomic) | O₂: order=2 (paramagnetic)',
            'CO: highest bond dissociation energy (1072 kJ/mol) among diatomics',
            'Polarity: CCl₄ nonpolar (symmetric) | CHCl₃ polar (asymmetric)'].map((t,i)=>(
            <text key={i} x="20" y={268+i*14} fill="#8b949e" fontSize="8">{t}</text>))}
        </svg>)
    },
    'States of Matter': {
      title:'Gas Laws',
      parts:["Boyle's Law — PV = constant at constant T; P and V inversely proportional","Charles' Law — V/T = constant at constant P; V and T directly proportional","Avogadro's Law — V/n = constant at constant T,P; equal volumes → equal moles","Ideal Gas Law — PV = nRT; R = 8.314 J/mol·K; combines all three gas laws","van der Waals equation — (P+an²/V²)(V-nb)=nRT; corrects for real gas behaviour","Graham's Law — Rate of diffusion ∝ 1/√M; lighter gases diffuse faster"],
      facts:["Critical temperature Tc: above this, gas cannot be liquefied regardless of pressure","Viscosity of liquids decreases with temperature; gases increase with temperature","At STP, 1 mole of ideal gas occupies 22.4 L (standard temperature 0°C, 1 atm)"],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Gas Laws</text>
          {[{law:"Boyle's Law",eq:"PV = constant  (T const)",col:'#58a6ff',y:48},
            {law:"Charles' Law",eq:"V/T = constant  (P const)",col:'#3fb950',y:86},
            {law:"Gay-Lussac's Law",eq:"P/T = constant  (V const)",col:'#d29922',y:124},
            {law:"Avogadro's Law",eq:"V/n = constant  (T,P const)",col:'#f0883e',y:162},
            {law:"Ideal Gas Law",eq:"PV = nRT   R = 8.314 J/mol·K",col:'#bc8cff',y:200},
            {law:"van der Waals (real gas)",eq:"(P+an²/V²)(V-nb) = nRT",col:'#f85149',y:238},
            {law:"Graham's Law",eq:"rate ∝ 1/√M  (lighter = faster)",col:'#2ea043',y:276},
          ].map(({law,eq,col,y})=>(
            <g key={law}>
              <rect x="10" y={y-14} width="420" height="28" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
              <text x="20" y={y+1} fill={col} fontSize="9" fontWeight="bold">{law}:</text>
              <text x="185" y={y+1} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            </g>))}
        </svg>)
    },
    'Thermodynamics': {
      title:'Laws of Thermodynamics',
      parts:["Zeroth Law — Thermal equilibrium; if A⇌C and B⇌C then A⇌B; defines temperature","First Law — ΔU = q + w; energy conserved; U is a state function; q and w are path functions","Second Law — ΔSuniverse ≥ 0; entropy always increases for spontaneous processes","Gibbs Free Energy — ΔG = ΔH - TΔS; ΔG < 0 → spontaneous; ΔG = 0 → equilibrium","Enthalpy — ΔH = ΔU + ΔngRT; Hess's law: ΔH is path-independent (state function)","Third Law — Entropy of a perfect crystal at 0 K = 0 (S = 0)"],
      facts:['Exothermic: ΔH < 0 | Endothermic: ΔH > 0','Bond dissociation enthalpy: energy to break 1 mole of bonds in gaseous state','Standard conditions: 25°C (298K), 1 atm, 1M concentration'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Thermodynamics — Laws</text>
          {[{law:'Zeroth Law',col:'#8b949e',y:46,eq:'',desc:'Thermal equilibrium — defines temperature; basis of thermometry'},
            {law:'First Law',col:'#3fb950',y:92,eq:'ΔU = q + w',desc:'Energy conserved | q = heat absorbed | w = work done ON system'},
            {law:'Second Law',col:'#d29922',y:138,eq:'ΔSuniv ≥ 0',desc:'Entropy of universe increases for spontaneous processes'},
            {law:'Gibbs Free Energy',col:'#f85149',y:184,eq:'ΔG = ΔH - TΔS',desc:'ΔG<0: spontaneous | ΔG=0: equilibrium | ΔG>0: non-spontaneous'},
            {law:'Hess\'s Law',col:'#58a6ff',y:230,eq:'ΔH = path-independent',desc:'State function; ΔH can be calculated by adding/subtracting reactions'},
            {law:'Third Law',col:'#bc8cff',y:276,eq:'S=0 at 0K',desc:'Entropy of perfect crystal at absolute zero equals zero'},
          ].map(({law,col,y,eq,desc})=>(
            <g key={law}>
              <rect x="10" y={y-16} width="420" height="42" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
              <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{law}</text>
              {eq&&<text x="185" y={y} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>}
              <text x="20" y={y+14} fill="#8b949e" fontSize="8">{desc}</text>
            </g>))}
        </svg>)
    },
    'Equilibrium': {
      title:'Chemical and Ionic Equilibrium',
      parts:["Dynamic equilibrium — Forward rate = reverse rate; concentrations constant but not equal","Kc = [products]/[reactants] — Only gas and dissolved species; solids and liquids excluded","Le Chatelier's principle — System shifts to oppose imposed change (concentration, T, P)","pH and Kw — pH = -log[H+]; pOH = -log[OH-]; pH + pOH = 14 at 25°C; Kw = 10⁻¹⁴","Ka and Kb — Acid and base dissociation constants; Ka × Kb = Kw for conjugate pair","Buffer solutions — Weak acid + conjugate base; Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])"],
      facts:['Kc > 1: products favoured | Kc < 1: reactants favoured at equilibrium','Common ion effect: suppresses ionization of weak acid/base by adding its conjugate','Solubility product Ksp: ionic product exceeds Ksp → precipitation occurs'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Chemical Equilibrium</text>
          <rect x="10" y="28" width="420" height="55" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Kc = [Products]^n / [Reactants]^m</text>
          <text x="220" y="61" textAnchor="middle" fill="#8b949e" fontSize="9">Kp = Kc(RT)^Δn | Δn = mol gas products − mol gas reactants</text>
          <text x="220" y="76" textAnchor="middle" fill="#8b949e" fontSize="9">Kc>1: products favoured | Kc<1: reactants favoured</text>
          {[{t:"Le Chatelier's Principle",col:'#d29922',y:108,items:['Add reactant → shifts right (→ products) | Remove product → shifts right','Increase T for endothermic → shifts right; for exothermic → shifts left','Increase P → shifts to side with fewer moles of gas']},
            {t:'pH Scale and Kw',col:'#f85149',y:178,items:['pH = -log[H+] | pOH = -log[OH-] | pH + pOH = 14 at 25°C','Strong acid: HCl, H2SO4, HNO3 | Strong base: NaOH, KOH','Ka × Kb = Kw = 10⁻¹⁴ (conjugate acid-base pair at 25°C)']},
            {t:'Buffer Solutions',col:'#3fb950',y:248,items:['Weak acid + conjugate base | Resists pH change on adding small acid/base','Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])','Blood buffer: H2CO3/HCO3- (pKa=6.1) maintains pH 7.4']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Redox Reactions': {
      title:'Oxidation-Reduction Reactions',
      parts:['Oxidation — Loss of electrons (OIL); increase in oxidation number','Reduction — Gain of electrons (RIG); decrease in oxidation number','Balancing redox — Half-reaction method; balance atoms, then charge with electrons','Disproportionation — Same element oxidised AND reduced simultaneously','KMnO4 (acidic) — Mn goes from +7 to +2; gains 5 electrons per Mn','K2Cr2O7 (acidic) — Cr goes from +6 to +3; gains 3 electrons per Cr'],
      facts:['F is always -1 | O is usually -2 (peroxide: -1) | H is usually +1 (metal hydrides: -1)','Strongest oxidising agents: F2 > MnO4- > Cr2O7²- > HNO3(conc.) > Cl2','Electrochemical series: higher reduction potential = stronger oxidising agent'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Redox Reactions</text>
          <rect x="10" y="28" width="420" height="55" rx="8" fill="rgba(0,0,0,.3)" stroke="#f0883e" strokeWidth="2"/>
          <text x="220" y="46" textAnchor="middle" fill="#f0883e" fontSize="11" fontWeight="bold">OIL RIG: Oxidation Is Loss, Reduction Is Gain</text>
          <text x="220" y="62" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Zn + CuSO₄ → ZnSO₄ + Cu</text>
          <text x="110" y="77" textAnchor="middle" fill="#58a6ff" fontSize="9">Zn→Zn²⁺+2e⁻ (oxidised; anode)</text>
          <text x="330" y="77" textAnchor="middle" fill="#f85149" fontSize="9">Cu²⁺+2e⁻→Cu (reduced; cathode)</text>
          {[{name:'KMnO4 in acid',from:'+7',to:'+2',eq:'MnO4⁻+8H⁺+5e⁻→Mn²⁺+4H2O',col:'#bc8cff',y:106},
            {name:'KMnO4 in neutral',from:'+7',to:'+4',eq:'MnO4⁻+2H2O+3e⁻→MnO2+4OH⁻',col:'#d29922',y:142},
            {name:'K2Cr2O7 in acid',from:'+6',to:'+3',eq:'Cr2O7²⁻+14H⁺+6e⁻→2Cr³⁺+7H2O',col:'#f0883e',y:178},
          ].map(({name,from,to,eq,col,y})=>(
            <g key={name}><rect x="10" y={y-14} width="420" height="32" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="9" fontWeight="bold">{name}: {from}→{to}</text>
            <text x="20" y={y+13} fill="#8b949e" fontSize="8">{eq}</text></g>))}
          <rect x="10" y="210" width="420" height="78" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="220" y="228" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Oxidation Number Rules</text>
          {['F: always -1 | O: usually -2 (peroxide -1; OF2 +2) | H: usually +1 (metal hydrides -1)',
            'Sum of ON = 0 for neutral molecule | Sum = charge for polyatomic ions',
            'Transition metals: variable ON (Mn: +2 to +7; Fe: +2 or +3; Cr: +2 to +6)'].map((t,i)=>(
            <text key={i} x="20" y={244+i*14} fill="#8b949e" fontSize="8">{t}</text>))}
        </svg>)
    },
    'Solid State': {
      title:'Crystal Systems — Unit Cells',
      parts:['Simple cubic (SC) — 1 atom/cell; APF 52%; CN 6; only polonium','BCC — 2 atoms/cell; APF 68%; CN 8; Na, K, Fe, Cr, W','FCC/CCP — 4 atoms/cell; APF 74%; CN 12; Cu, Ag, Au, Al; densest packing','Schottky defect — Both cation and anion missing; decreases density; NaCl, KCl','Frenkel defect — Cation moves to interstitial; no density change; AgCl, ZnS','F-centres — Anion vacancy with trapped electron; gives colour to crystals (KCl = yellow)'],
      facts:['Close packed structures: ABABAB = HCP | ABCABC = CCP (FCC)','Tetrahedral voids = 2N; Octahedral voids = N (N = number of atoms in CCP layer)','APF 74% (FCC/HCP) is the maximum possible packing of equal spheres'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Solid State — Unit Cells</text>
          {[{name:'Simple Cubic',Z:'1',APF:'52%',CN:'6',col:'#d29922',eg:'Po',x:73,y:58},
            {name:'BCC',Z:'2',APF:'68%',CN:'8',col:'#f0883e',eg:'Na, K, Fe',x:220,y:58},
            {name:'FCC/CCP',Z:'4',APF:'74%',CN:'12',col:'#3fb950',eg:'Cu, Ag, Au',x:367,y:58},
          ].map(({name,Z,APF,CN,col,eg,x,y})=>(
            <g key={name}>
              {[[0,0],[55,0],[0,55],[55,55]].map(([dx,dy],i)=>(<circle key={i} cx={x-28+dx} cy={y+dy} r="8" fill="rgba(0,0,0,.4)" stroke={col} strokeWidth="2"/>))}
              {name==='BCC'&&<circle cx={x} cy={y+28} r="8" fill={col} opacity=".7"/>}
              {name==='FCC/CCP'&&[[27.5,0],[0,27.5],[55,27.5],[27.5,55]].map(([dx,dy],i)=>(<circle key={i} cx={x-28+dx} cy={y+dy} r="7" fill={col} opacity=".7"/>))}
              {[[0,0,55,0],[0,55,55,55],[0,0,0,55],[55,0,55,55]].map(([x1,y1,x2,y2],i)=>(<line key={i} x1={x-28+x1} y1={y+y1} x2={x-28+x2} y2={y+y2} stroke={col} strokeWidth="1.5"/>))}
              <text x={x} y={y+78} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold">{name}</text>
              <text x={x} y={y+91} textAnchor="middle" fill="#8b949e" fontSize="8">Z={Z} | APF={APF} | CN={CN}</text>
              <text x={x} y={y+104} textAnchor="middle" fill="#d29922" fontSize="8">e.g. {eg}</text>
            </g>))}
          {[{t:'Crystal Defects',col:'#58a6ff',y:200,items:['Schottky: cation+anion both missing; density decreases; NaCl, KCl','Frenkel: cation moves to interstitial; no density change; AgCl, ZnS','F-centres: anion vacancy + trapped electron; gives colour (KCl = yellow)','Metal excess defect: extra cations in interstitial (ZnO heated → Zn²⁺ + e⁻)']},
            {t:'Close Packing',col:'#3fb950',y:290,items:['HCP: ABABAB pattern | CCP(FCC): ABCABC pattern','Tetrahedral voids = 2N; Octahedral voids = N per CCP layer']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Solutions': {
      title:'Colligative Properties of Solutions',
      parts:["Raoult's Law — PA = XA × PA°; partial pressure proportional to mole fraction","Relative lowering of VP — ΔP/P° = XB (mole fraction of solute)","Elevation of boiling point — ΔTb = Kb × m; Kb(water) = 0.52 K·kg/mol","Depression of freezing point — ΔTf = Kf × m; Kf(water) = 1.86 K·kg/mol","Osmotic pressure — π = iMRT; used to determine molar mass of polymers","Van't Hoff factor (i) — Accounts for dissociation/association; NaCl i≈2 if fully dissociated"],
      facts:["Reverse osmosis: applied pressure > osmotic pressure; used in water purification","Positive deviation from Raoult's law: A-B weaker than A-A and B-B (e.g. ethanol+water)","Negative deviation: A-B stronger than pure (e.g. HCl+water; acetone+chloroform)"],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Colligative Properties of Solutions</text>
          <rect x="10" y="28" width="420" height="48" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Raoult's Law: PA = XA × PA°</text>
          <text x="220" y="68" textAnchor="middle" fill="#8b949e" fontSize="9">Colligative properties depend on NUMBER of solute particles, not their nature</text>
          {[{prop:'Relative lowering of VP',eq:'ΔP/P° = XB',col:'#3fb950',y:104,note:'XB = mole fraction of solute | simplest colligative property'},
            {prop:'Elevation of boiling point',eq:'ΔTb = Kb × m',col:'#d29922',y:140,note:'Kb(water)=0.52 K·kg/mol | Ebullioscopy; antifreeze'},
            {prop:'Depression of freezing point',eq:'ΔTf = Kf × m',col:'#f0883e',y:176,note:'Kf(water)=1.86 K·kg/mol | Cryoscopy; car antifreeze'},
            {prop:'Osmotic pressure',eq:'π = iMRT',col:'#bc8cff',y:212,note:'Used to find molar mass of polymers and macromolecules'},
          ].map(({prop,eq,col,y,note})=>(
            <g key={prop}><rect x="10" y={y-14} width="420" height="34" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="9" fontWeight="bold">{prop}:</text>
            <text x="220" y={y} fill="#3fb950" fontSize="10" fontWeight="bold">{eq}</text>
            <text x="20" y={y+13} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <rect x="10" y="250" width="420" height="42" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922"/>
          <text x="220" y="268" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Van't Hoff Factor (i)</text>
          <text x="20" y="283" fill="#8b949e" fontSize="8">NaCl: i≈2 (dissociates) | CH3COOH in benzene: i<1 (associates) | glucose: i=1</text>
        </svg>)
    },
    'Electrochemistry': {
      title:'Electrochemical Cell — Daniell Cell',
      parts:['Galvanic cell — Spontaneous redox reaction converts chemical energy to electrical energy','Standard electrode potential E° — Measured vs SHE (E°=0.00V) at 1M, 1 atm, 298K','EMF of cell — E°cell = E°cathode − E°anode; positive EMF = spontaneous','Faraday\'s laws — m = ZIt = (M/nF)It; 1 Faraday = 96485 C/mol of electrons','Nernst equation — E = E° − (0.0592/n)logQ at 298K; relates EMF to concentration','Conductance — Reciprocal of resistance; Λm = Λ∞ − b√C (Kohlrausch law for dilute)'],
      facts:['ΔG° = −nFE° | ΔG° = −RT ln K; connects electrochemistry, thermodynamics, equilibrium','Electrolytic cell: electrical energy drives non-spontaneous redox reaction','1 Faraday deposits 1 gram-equivalent of substance at electrode'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Daniell Cell — Electrochemical Cell</text>
          <rect x="18" y="72" width="142" height="150" rx="8" fill="#0d1a0d" stroke="#3fb950" strokeWidth="2"/>
          <text x="89" y="92" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Anode (−)</text>
          <text x="89" y="106" textAnchor="middle" fill="#3fb950" fontSize="9">Oxidation: Zn→Zn²⁺+2e⁻</text>
          <rect x="73" y="112" width="32" height="82" rx="4" fill="#2d2d00" stroke="#d29922" strokeWidth="2"/>
          <text x="89" y="157" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Zn</text>
          <text x="89" y="205" textAnchor="middle" fill="#8b949e" fontSize="7">1M ZnSO4</text>
          <rect x="280" y="72" width="142" height="150" rx="8" fill="#1a0d00" stroke="#f0883e" strokeWidth="2"/>
          <text x="351" y="92" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">Cathode (+)</text>
          <text x="351" y="106" textAnchor="middle" fill="#f0883e" fontSize="9">Reduction: Cu²⁺+2e⁻→Cu</text>
          <rect x="335" y="112" width="32" height="82" rx="4" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
          <text x="351" y="157" textAnchor="middle" fill="#f0883e" fontSize="9" fontWeight="bold">Cu</text>
          <text x="351" y="205" textAnchor="middle" fill="#8b949e" fontSize="7">1M CuSO4</text>
          <rect x="153" y="46" width="134" height="22" rx="10" fill="#1a1a2d" stroke="#bc8cff" strokeWidth="2"/>
          <text x="220" y="61" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Salt Bridge (KCl)</text>
          <line x1="89" y1="72" x2="89" y2="42" stroke="#3fb950" strokeWidth="2"/>
          <line x1="89" y1="42" x2="351" y2="42" stroke="#58a6ff" strokeWidth="2"/>
          <line x1="351" y1="42" x2="351" y2="72" stroke="#f0883e" strokeWidth="2"/>
          <text x="220" y="38" textAnchor="middle" fill="#58a6ff" fontSize="9">e⁻ flow: Anode → Cathode</text>
          <rect x="185" y="18" width="70" height="22" rx="5" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="33" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">1.10V</text>
          <rect x="10" y="238" width="420" height="72" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="220" y="256" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Key Equations</text>
          <text x="20" y="272" fill="#3fb950" fontSize="8">E°cell = E°cathode − E°anode = +0.34−(−0.76) = +1.10 V</text>
          <text x="20" y="286" fill="#58a6ff" fontSize="8">Nernst: E = E° − (0.0592/n) log Q at 298K</text>
          <text x="20" y="300" fill="#bc8cff" fontSize="8">Faraday: m = (M/nF)It | ΔG° = −nFE° = −RT ln K</text>
        </svg>)
    },
    'Chemical Kinetics': {
      title:'Rate Laws and Arrhenius Equation',
      parts:['Rate law — rate = k[A]^m[B]^n; m, n determined experimentally (not from stoichiometry)','Zero order — rate = k; [A]t = [A]0 - kt; t½ = [A]0/2k; unit of k: mol L⁻¹ s⁻¹','First order — rate = k[A]; [A]t = [A]0e⁻ᵏᵗ; t½ = 0.693/k (constant!); unit: s⁻¹','Second order — rate = k[A]²; 1/[A]t = 1/[A]0 + kt; unit: L mol⁻¹ s⁻¹','Arrhenius equation — k = Ae⁻ᴱᵃ/ᴿᵀ; Ea = activation energy; A = frequency factor','Catalyst — Lowers Ea; provides alternate pathway; not consumed; increases reaction rate'],
      facts:['Half-life of first order is CONSTANT (independent of initial concentration)','ln k vs 1/T graph: slope = -Ea/R; used to calculate activation energy experimentally','Rate = rate constant k × concentration product (rate changes with conc; k changes only with T)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Chemical Kinetics</text>
          <rect x="10" y="28" width="420" height="100" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Integrated Rate Laws and Half-lives</text>
          {[['Order','Rate Law','t½','Unit of k'],
            ['Zero','rate=k','[A]₀/2k','mol L⁻¹ s⁻¹'],
            ['First','rate=k[A]','0.693/k','s⁻¹'],
            ['Second','rate=k[A]²','1/k[A]₀','L mol⁻¹ s⁻¹'],
          ].map((row,i)=>(
            <g key={i}>{row.map((cell,j)=>(
              <text key={j} x={20+j*104} y={65+i*18} fill={i===0?'#d29922':'#8b949e'} fontSize={i===0?8.5:8} fontWeight={i===0?'bold':'normal'}>{cell}</text>))}
            </g>))}
          {[{t:'Arrhenius Equation',col:'#3fb950',y:158,items:['k = A e^(-Ea/RT) | A = frequency factor; Ea = activation energy','ln k = ln A − Ea/RT | Slope of ln k vs 1/T = −Ea/R','Temperature increase → k increases exponentially (not linearly)']},
            {t:'Effect of Catalyst',col:'#d29922',y:228,items:['Lowers activation energy (Ea) → more molecules have Ea','Provides alternate reaction pathway | Not consumed in reaction','Heterogeneous: different phase (Ni, Pt, V2O5) | Homogeneous: same phase']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'd and f Block Elements': {
      title:'Transition Metals (d-Block)',
      parts:['Variable oxidation states — Due to (n-1)d and ns electrons; Mn has +2 to +7 (most)','Coloured compounds — d-d transition absorbs visible light; colour = complementary colour seen','Magnetic properties — Paramagnetic if unpaired d electrons; Fe, Co, Ni are ferromagnetic','Catalytic activity — Variable oxidation state; surface adsorption; V2O5 (Contact), Fe (Haber)','KMnO4 — Purple; strong oxidising agent; Mn +7→+2 (acid), +4 (neutral), +6 (alkaline)','K2Cr2O7 — Orange dichromate; Cr +6→+3 in acidic medium; used in volumetric analysis'],
      facts:['Tungsten (W): highest melting point (3422°C) among all metals','Mn has most oxidation states (+2 to +7); Cr is +2 to +6','Transition metals form complexes due to available empty d orbitals accepting lone pairs'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Transition Metals (d-Block)</text>
          <rect x="10" y="28" width="420" height="65" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">Properties of d-Block Elements</text>
          {['Variable oxidation states: (n-1)d + ns electrons available','High MP/BP (W:3422°C highest) | Hard metals | Good conductors',
            'Coloured compounds: d-d electron transition absorbs visible light',
            'Paramagnetic: unpaired d electrons | Ferromagnetic: Fe, Co, Ni (domain alignment)'].map((t,i)=>(<text key={i} x="20" y={63+i*11} fill="#8b949e" fontSize="7.5">{t}</text>))}
          {[{t:'KMnO4 — Reactions',col:'#bc8cff',y:122,items:['Acid medium: MnO4⁻+8H⁺+5e⁻→Mn²⁺+4H2O (pink→colourless)','Neutral medium: MnO4⁻+2H2O+3e⁻→MnO2+4OH⁻ (brown ppt)','Alkaline medium: MnO4⁻+e⁻→MnO4²⁻ (green; uncommon)']},
            {t:'K2Cr2O7 — Reactions',col:'#f0883e',y:192,items:['Acidic medium: Cr2O7²⁻+14H⁺+6e⁻→2Cr³⁺+7H2O (orange→green)','Oxidises: Fe²⁺, I⁻, H2S, FeSO4, ethanol, oxalic acid','Cr2O7²⁻ (orange,pH<4) ⇌ 2CrO4²⁻ (yellow,pH>6)']},
            {t:'Important Oxidation States',col:'#3fb950',y:262,items:['Fe: +2(FeSO4) and +3(Fe2O3) | Cu: +1(Cu2O) and +2(CuSO4)','Mn: +2,+4,+6,+7 | Cr: +2,+3,+6 (most common)']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Coordination Compounds': {
      title:'Coordination Chemistry',
      parts:['Central metal ion — Lewis acid; accepts lone pairs from ligands','Ligands — Lewis bases; monodentate (NH3, Cl-), bidentate (en, oxalate), hexadentate (EDTA)','Coordination number — Number of donor atoms directly bonded to the central metal','IUPAC naming — Ligands before metal (alphabetically); oxidation state in Roman numerals','Crystal Field Theory — d-orbitals split in ligand field; explains colour and magnetism','Isomerism — Ionisation (different counter ions), linkage, optical, geometrical isomers'],
      facts:['EDTA: hexadentate; forms very stable chelate complexes (chelate effect)','Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H2O < NH3 < en < CO < CN⁻','cis-platin [Pt(NH3)2Cl2]: anticancer drug; only cis isomer is active'],
      svg: () => (
        <svg viewBox="0 0 440 330" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Coordination Compounds</text>
          <circle cx="220" cy="110" r="24" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="2.5"/>
          <text x="220" y="114" textAnchor="middle" fill="#bc8cff" fontSize="9">Co³⁺</text>
          {[[-60,0],[60,0],[0,-50],[0,50],[-42,-42],[42,42]].map(([dx,dy],i)=>(
            <g key={i}>
              <line x1={220+dx*0.38} y1={110+dy*0.38} x2={220+dx*0.65} y2={110+dy*0.65} stroke="#3fb950" strokeWidth="2"/>
              <circle cx={220+dx} cy={110+dy} r="10" fill="#1a2d1a" stroke="#3fb950" strokeWidth="1.5"/>
              <text x={220+dx} y={113+dy} textAnchor="middle" fill="#3fb950" fontSize="7">NH3</text>
            </g>))}
          <text x="220" y="178" textAnchor="middle" fill="#8b949e" fontSize="9">[Co(NH3)6]³⁺ — Hexaamminecobalt(III) — octahedral</text>
          {[{t:'IUPAC Naming Rules',col:'#bc8cff',y:205,items:['Name ligands first (alphabetically), then metal + oxidation state','Anionic ligands end in -o: Cl⁻=chlorido, CN⁻=cyano, OH⁻=hydroxido','[CoCl3(NH3)3] = triamminetrichloridocobalt(III)']},
            {t:'Crystal Field Theory',col:'#d29922',y:270,items:['Octahedral field: d-orbitals split into t2g (lower) and eg (higher)','Large Δoct (strong field: CN⁻, CO) → low spin | Small Δoct (weak field: Cl⁻) → high spin','Spectrochemical: I⁻<Cl⁻<F⁻<OH⁻<H2O<NH3<en<CN⁻ (increasing field strength)']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Haloalkanes and Haloarenes': {
      title:'SN1 and SN2 Mechanisms',
      parts:['SN1 — Unimolecular; rate = k[RX]; forms carbocation intermediate; racemisation; 3° favoured','SN2 — Bimolecular; rate = k[RX][Nu]; backside attack; Walden inversion; 1° favoured','SN1 conditions — Tertiary substrate; polar protic solvent (water, alcohol); weak nucleophile','SN2 conditions — Primary substrate; polar aprotic solvent (acetone, DMSO); strong nucleophile','Grignard reagent (RMgX) — In dry ether; very reactive; used in organic synthesis','Nucleophilic aromatic substitution — Requires electron-withdrawing groups on ring'],
      facts:['Reactivity order with nucleophile: RI > RBr > RCl > RF (C-I bond weakest)','Walden inversion in SN2: complete inversion of configuration at chiral centre','Freon (CCl2F2): refrigerant; depletes ozone layer; being phased out (Montreal Protocol)'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Haloalkanes — SN1 vs SN2</text>
          <rect x="10" y="30" width="205" height="115" rx="8" fill="rgba(0,0,0,.3)" stroke="#f0883e" strokeWidth="2"/>
          <text x="112" y="50" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">SN1 Mechanism</text>
          <text x="112" y="66" textAnchor="middle" fill="#8b949e" fontSize="8">Rate = k[RX] (unimolecular)</text>
          <text x="112" y="80" textAnchor="middle" fill="#8b949e" fontSize="8">Step 1: RX → R⁺ + X⁻ (slow)</text>
          <text x="112" y="94" textAnchor="middle" fill="#8b949e" fontSize="8">Step 2: R⁺ + Nu → RNu (fast)</text>
          <text x="112" y="108" textAnchor="middle" fill="#8b949e" fontSize="8">Racemisation (flat carbocation)</text>
          <text x="112" y="122" textAnchor="middle" fill="#d29922" fontSize="8">Favoured: 3°RX, polar protic</text>
          <rect x="225" y="30" width="205" height="115" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="2"/>
          <text x="327" y="50" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">SN2 Mechanism</text>
          <text x="327" y="66" textAnchor="middle" fill="#8b949e" fontSize="8">Rate = k[RX][Nu] (bimolecular)</text>
          <text x="327" y="80" textAnchor="middle" fill="#8b949e" fontSize="8">Single step: backside attack</text>
          <text x="327" y="94" textAnchor="middle" fill="#8b949e" fontSize="8">Walden inversion (180° flip)</text>
          <text x="327" y="108" textAnchor="middle" fill="#8b949e" fontSize="8">Complete inversion of config.</text>
          <text x="327" y="122" textAnchor="middle" fill="#d29922" fontSize="8">Favoured: 1°RX, polar aprotic</text>
          {[{t:'Reactivity Order',col:'#3fb950',y:174,items:['With Nu: 1°>2°>3° (SN2) | 3°>2°>1° (SN1)','C-X bond strength: C-F>C-Cl>C-Br>C-I (strongest to weakest)','Reactivity (rate): RI>RBr>RCl>RF (weakest bond breaks first)']},
            {t:'Key Named Reactions',col:'#bc8cff',y:244,items:['Grignard (RMgX): dry ether; reacts with carbonyls, CO2, epoxides','Wurtz: 2RX+2Na→R-R+2NaX (new C-C bond)','Finkelstein: RCl+NaI(acetone)→RI+NaCl']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Polymers': {
      title:'Classification of Polymers',
      parts:['Addition polymer — Monomers add with no byproduct; polyethylene, PVC, Teflon, polystyrene','Condensation polymer — Monomers join with elimination of H2O or HCl; Nylon, Dacron, Bakelite','Nylon-6,6 — Hexamethylenediamine + adipic acid; polyamide; synthetic fibre','Bakelite — Phenol + formaldehyde; thermosetting; permanent cross-linked 3D network','Natural rubber — cis-polyisoprene; vulcanisation with 3-5% S improves elasticity and strength','Biodegradable polymers — PHBV, nylon-2-nylon-6; break down naturally in environment'],
      facts:['PET (Dacron): polyester from ethylene glycol + terephthalic acid; bottles and fibres','Thermoplastic: can be remoulded (polyethylene, PVC) | Thermosetting: cannot be remoulded (Bakelite)','Degree of polymerisation n: number of monomer units in one polymer chain'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Polymers — Classification</text>
          <rect x="10" y="28" width="205" height="120" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="112" y="46" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Addition Polymers</text>
          {[['Polyethylene (LDPE/HDPE)','CH2=CH2'],['PVC','CH2=CHCl'],['Teflon (PTFE)','CF2=CF2'],['Polystyrene','C6H5CH=CH2'],['Natural rubber','isoprene (cis)']].map(([name,m],i)=>(
            <g key={name}><text x="20" y={64+i*18} fill="#3fb950" fontSize="8" fontWeight="bold">{name}</text>
            <text x="20" y={75+i*18} fill="#8b949e" fontSize="7">{m}</text></g>))}
          <rect x="225" y="28" width="205" height="120" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="327" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">Condensation Polymers</text>
          {[['Nylon-6,6','hexamethylenediamine+adipic acid'],['Nylon-6','caprolactam (ring opening)'],['Dacron/PET','ethylene glycol+terephthalic acid'],['Bakelite','phenol+formaldehyde (thermo)'],['Glyptal','ethylene glycol+phthalic acid']].map(([name,m],i)=>(
            <g key={name}><text x="235" y={64+i*18} fill="#58a6ff" fontSize="8" fontWeight="bold">{name}</text>
            <text x="235" y={75+i*18} fill="#8b949e" fontSize="7">{m}</text></g>))}
          {[{t:'Classification by properties',col:'#d29922',y:180,items:['Thermoplastic: remoulded on heating (PE, PVC, polystyrene, nylon)','Thermosetting: permanent 3D network (Bakelite, melamine formaldehyde)','Elastomer: high elasticity (natural rubber, Neoprene, Buna-S, Buna-N)','Fibre: high tensile strength (nylon, Dacron, silk, cotton, wool)']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
  }

  // ── PHYSICS CHAPTERS ─────────────────────────────────────────
  const PHYS_CHAPTERS = {
    'Physical World': {
      title:'Fundamental Forces in Nature',
      parts:['Gravitational — Weakest; always attractive; infinite range; F=Gm1m2/r²; holds planets in orbit','Electromagnetic — 10⁴² times gravity; infinite range; responsible for chemistry and light','Weak nuclear — Short range (~10⁻¹⁸m); responsible for β-decay and radioactivity','Strong nuclear — Strongest (10³⁸×gravity); holds protons+neutrons in nucleus; range 10⁻¹⁵m','Standard Model — Describes quarks, leptons; unified EM+weak (electroweak); excludes gravity'],
      facts:['All forces except gravity explained by exchange of virtual particles','Graviton: hypothetical particle mediating gravity; not yet experimentally detected','String theory attempts to unify all 4 fundamental forces including gravity'],
      svg: () => (
        <svg viewBox="0 0 440 280" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Fundamental Forces in Nature</text>
          {[{force:'Gravitational',rel:'1 (weakest)',range:'Infinite',col:'#d29922',y:48,desc:'Always attractive; holds planets; F=Gm1m2/r²; Newton + Einstein'},
            {force:'Electromagnetic',rel:'10⁴²',range:'Infinite',col:'#58a6ff',y:96,desc:'Repulsive+attractive; responsible for chemistry, light, electricity'},
            {force:'Weak Nuclear',rel:'10²⁵',range:'10⁻¹⁸ m',col:'#f0883e',y:144,desc:'Causes β-decay; radioactivity; W±, Z bosons as mediators'},
            {force:'Strong Nuclear',rel:'10³⁸ (strongest)',range:'10⁻¹⁵ m',col:'#f85149',y:192,desc:'Holds nucleus together; gluons mediate; quarks held by colour force'},
          ].map(({force,rel,range,col,y,desc})=>(
            <g key={force}>
              <rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
              <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{force}</text>
              <text x="195" y={y} fill="#d29922" fontSize="8">Relative: {rel}</text>
              <text x="20" y={y+14} fill="#8b949e" fontSize="8">{desc} | Range: {range}</text>
            </g>))}
          <rect x="10" y="228" width="420" height="42" rx="6" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="220" y="246" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Standard Model</text>
          <text x="220" y="261" textAnchor="middle" fill="#8b949e" fontSize="8">Unifies EM + Weak + Strong | Quarks + Leptons + Gauge bosons | Gravity NOT included yet</text>
        </svg>)
    },
    'Units and Measurements': {
      title:'SI Units, Dimensions and Errors',
      parts:['SI base units — metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)','Dimensional formula — [Force]=[MLT⁻²]; [Energy]=[ML²T⁻²]; [Power]=[ML²T⁻³]','Significant figures — Non-zero digits; zeros between; trailing zeros after decimal; all are significant','Absolute error — |measured - true|; Mean absolute error = Σ|Δai|/n','Relative error — Δa/a; Percentage error = (Δa/a)×100%','Random error — Reduced by taking more readings; Systematic error — corrected by calibration'],
      facts:['Planck constant h: [ML²T⁻¹] (same dimensions as angular momentum)','Light year: distance light travels in 1 year = 9.46×10¹⁵ m (used for astronomical distances)','Parallax method: distance = baseline/parallax angle; used to measure distances to stars'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Units, Dimensions and Measurement</text>
          <rect x="10" y="28" width="420" height="78" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#d29922" fontSize="10" fontWeight="bold">SI Base Units (7)</text>
          {[['Length','metre (m)','Mass','kilogram (kg)'],
            ['Time','second (s)','Current','ampere (A)'],
            ['Temperature','kelvin (K)','Amount','mole (mol)'],
            ['Luminosity','candela (cd)','','']].map((row,i)=>(
            <g key={i}>{row.filter(Boolean).map((item,j)=>(
              <text key={j} x={20+j%4*108} y={62+i*16} fill={j%2===0?'#d29922':'#8b949e'} fontSize="8">{item}</text>))}</g>))}
          {[{t:'Dimensional Formulas',col:'#3fb950',y:138,items:['[Force] = [MLT⁻²] | [Energy] = [ML²T⁻²] | [Power] = [ML²T⁻³]','[Pressure] = [ML⁻¹T⁻²] | [Planck h] = [ML²T⁻¹]','Dimensionless: strain, refractive index, all ratios']},
            {t:'Error Analysis',col:'#58a6ff',y:204,items:['Absolute error = |measured − true| | Mean = Σ|Δai|/n','Relative error = Δa/a | Percentage = (Δa/a)×100','Addition/subtraction: add absolute errors | Multiplication: add relative errors']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Motion in a Straight Line': {
      title:'Kinematics — 1D Motion',
      parts:['Displacement — Vector; change in position; can be negative','Velocity — v = ds/dt (instantaneous); average v = Δs/Δt; vector quantity','Acceleration — a = dv/dt; uniform or variable; positive/negative/zero','Equations of motion — v=u+at; s=ut+½at²; v²=u²+2as; sn=u+a(2n-1)/2','Free fall — a = g = 9.8 m/s² downward; initial velocity = 0 for dropped object','Relative velocity — VAB = VA − VB; velocity of A with respect to B'],
      facts:['Area under v-t graph = displacement | Slope of v-t graph = acceleration','Slope of x-t graph = velocity | Area under a-t graph = change in velocity','At maximum height in vertical throw: v = 0; time = u/g; height = u²/2g'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Kinematics — Equations of Motion</text>
          <rect x="10" y="28" width="420" height="78" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#3fb950" fontSize="10" fontWeight="bold">Equations of Motion (uniform acceleration)</text>
          {[['v = u + at','1st equation (velocity-time)'],
            ['s = ut + ½at²','2nd equation (displacement-time)'],
            ['v² = u² + 2as','3rd equation (velocity-displacement)'],
            ['sn = u + a(2n-1)/2','displacement in nth second']].map(([eq,name],i)=>(
            <g key={eq}><text x="20" y={63+i*16} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="210" y={63+i*16} fill="#8b949e" fontSize="8">{name}</text></g>))}
          <rect x="10" y="118" width="205" height="110" rx="6" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="112" y="136" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">x-t graph</text>
          <line x1="30" y1="218" x2="205" y2="218" stroke="#30363d" strokeWidth="1"/>
          <line x1="30" y1="148" x2="30" y2="222" stroke="#30363d" strokeWidth="1"/>
          <path d="M30,210 L100,190 L185,185" fill="none" stroke="#3fb950" strokeWidth="2"/>
          <path d="M30,210 L100,175 L185,155" fill="none" stroke="#58a6ff" strokeWidth="2"/>
          <text x="112" y="228" textAnchor="middle" fill="#8b949e" fontSize="7">slope = velocity</text>
          <rect x="225" y="118" width="205" height="110" rx="6" fill="rgba(0,0,0,.3)" stroke="#f0883e" strokeWidth="1.5"/>
          <text x="327" y="136" textAnchor="middle" fill="#f0883e" fontSize="9" fontWeight="bold">v-t graph</text>
          <line x1="245" y1="218" x2="420" y2="218" stroke="#30363d" strokeWidth="1"/>
          <line x1="245" y1="148" x2="245" y2="222" stroke="#30363d" strokeWidth="1"/>
          <path d="M245,205 L420,165" fill="none" stroke="#f0883e" strokeWidth="2"/>
          <text x="327" y="228" textAnchor="middle" fill="#8b949e" fontSize="7">slope=accel; area=displacement</text>
          <text x="220" y="258" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Free fall: a = g = 9.8 m/s² | Relative velocity: VAB = VA − VB</text>
        </svg>)
    },
    'Motion in a Plane': {
      title:'Projectile Motion',
      parts:['Horizontal motion — Uniform velocity: x = (ucosθ)t; vx = ucosθ (constant throughout)','Vertical motion — Free fall: y = (usinθ)t − ½gt²; vy = usinθ − gt','Range — R = u²sin2θ/g; maximum at θ = 45°; same for complementary angles (30° and 60°)','Time of flight — T = 2usinθ/g','Maximum height — H = u²sin²θ/2g; independent of horizontal velocity','Circular motion — Centripetal acceleration = v²/r = ω²r; always toward centre'],
      facts:['At maximum height: vy = 0; vx = ucosθ (unchanged); speed is minimum','Centripetal force: not a new force; provided by tension, gravity, friction etc.','Banking angle: tanθ = v²/rg without friction'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Projectile Motion</text>
          <rect x="10" y="28" width="420" height="148" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <line x1="30" y1="168" x2="415" y2="168" stroke="#30363d" strokeWidth="1.5"/>
          <line x1="30" y1="168" x2="30" y2="38" stroke="#30363d" strokeWidth="1.5"/>
          <path d="M30,168 Q222,36 415,168" fill="none" stroke="#58a6ff" strokeWidth="2.5"/>
          <line x1="30" y1="168" x2="88" y2="108" stroke="#3fb950" strokeWidth="2" markerEnd="url(#pa2)"/>
          <text x="45" y="130" fill="#3fb950" fontSize="8" fontWeight="bold">u</text>
          <text x="55" y="108" fill="#3fb950" fontSize="8">ucosθ→</text>
          <line x1="222" y1="36" x2="222" y2="168" stroke="#d29922" strokeWidth="1" strokeDasharray="4,3"/>
          <text x="225" y="102" fill="#d29922" fontSize="8">H=u²sin²θ/2g</text>
          <text x="222" y="182" textAnchor="middle" fill="#f0883e" fontSize="8">R = u²sin2θ/g (maximum at θ=45°)</text>
          <defs><marker id="pa2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L7,3L0,6Z" fill="#3fb950"/></marker></defs>
          {[{t:'Key Formulas',col:'#3fb950',y:220,items:['Time of flight T = 2usinθ/g | Max height H = u²sin²θ/2g','Range R = u²sin2θ/g | R is max at θ=45°','Complementary angles give same range: R(30°)=R(60°)']},
            {t:'Circular Motion',col:'#d29922',y:278,items:['Centripetal acceleration ac = v²/r = ω²r (toward centre)','Centripetal force = mv²/r; provided by existing forces (not extra)']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Laws of Motion': {
      title:"Newton's Three Laws",
      parts:['First Law (Inertia) — A body continues in its state unless acted upon by external net force','Second Law — F = ma = dp/dt; net force causes acceleration proportional to it','Third Law — Every action has equal and opposite reaction; on different bodies','Impulse — J = FΔt = Δp; area under F-t graph = change in momentum','Static friction — fs ≤ μsN; prevents relative motion; maximum just before sliding','Kinetic friction — fk = μkN; always less than maximum static friction'],
      facts:['Inertia: resistance to change in state; measured by mass (not weight)','Pseudo force in non-inertial frame = −ma (opposite to frame acceleration)','Normal force ≠ weight for accelerating systems or inclined planes'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f0883e" fontSize="12" fontWeight="bold">Newton's Laws of Motion</text>
          {[{law:'First Law (Inertia)',col:'#3fb950',y:52,desc:"A body at rest stays at rest; a body in motion continues at constant velocity — unless acted on by external force. Defines inertia (mass = measure of inertia)."},
            {law:'Second Law: F = ma',col:'#58a6ff',y:104,desc:'Net force = rate of change of momentum: F = dp/dt = ma (constant mass). Impulse J = FΔt = Δp. Area under F-t graph = change in momentum.'},
            {law:'Third Law: Action-Reaction',col:'#f0883e',y:156,desc:'Every action has an equal and opposite reaction — on DIFFERENT bodies. Example: rocket exhaust down → rocket goes up.'},
            {law:'Friction',col:'#d29922',y:208,desc:'Static: fs ≤ μsN | Kinetic: fk = μkN (μk < μs always). Rolling < sliding < static (maximum). Friction can be in direction of motion.'},
          ].map(({law,col,y,desc})=>(
            <g key={law}><rect x="10" y={y-20} width="420" height="48" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y-4} fill={col} fontSize="10" fontWeight="bold">{law}</text>
            <text x="20" y={y+10} fill="#8b949e" fontSize="8">{desc.slice(0,80)}</text>
            <text x="20" y={y+22} fill="#8b949e" fontSize="8">{desc.slice(80)}</text></g>))}
          <rect x="10" y="250" width="420" height="42" rx="6" fill="rgba(0,0,0,.3)" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="220" y="268" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Impulse-Momentum Theorem</text>
          <text x="220" y="284" textAnchor="middle" fill="#8b949e" fontSize="8">J = FΔt = Δp = m(v−u) | Conservation of momentum: when net external force = 0</text>
        </svg>)
    },
    'Work, Energy and Power': {
      title:'Work, Energy and Power',
      parts:['Work — W = F·d·cosθ; scalar; zero when F⊥d; unit: joule (J)','Kinetic energy — KE = ½mv²; depends on speed; always positive','Potential energy — Gravitational: mgh; Elastic: ½kx²; depends on configuration','Work-energy theorem — Net work done = change in KE; Wnet = ΔKE','Conservation of mechanical energy — KE + PE = constant (no friction/dissipation)','Power — P = W/t = F·v; unit: watt (1W = 1J/s); 1 hp = 746 W'],
      facts:['Elastic collision: both momentum and KE conserved','Perfectly inelastic collision: momentum conserved; KE minimum; objects stick together','Coefficient of restitution e = speed of separation/speed of approach; 0 to 1'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Work, Energy and Power</text>
          {[{q:'Work',eq:'W = F·d·cosθ',col:'#3fb950',y:48,note:'Zero when F⊥d (normal force on flat surface). Negative when F opposite to d.'},
            {q:'Kinetic Energy',eq:'KE = ½mv²',col:'#58a6ff',y:90,note:'Increases when work done on object. Work-energy theorem: Wnet = ΔKE.'},
            {q:'Potential Energy',eq:'PE = mgh  or  ½kx²',col:'#d29922',y:132,note:'Gravitational: mgh | Spring: ½kx² | Stored due to position or configuration.'},
            {q:'Conservation',eq:'KE + PE = constant',col:'#bc8cff',y:174,note:'Only when no friction/dissipation. Non-conservative forces (friction) dissipate energy as heat.'},
            {q:'Power',eq:'P = W/t = Fv',col:'#f0883e',y:216,note:'1 watt = 1 J/s | 1 hp = 746 W | 1 kWh = 3.6×10⁶ J (unit of electrical energy)'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="165" y={y} fill="#3fb950" fontSize="10" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <rect x="10" y="255" width="420" height="38" rx="6" fill="rgba(0,0,0,.3)" stroke="#f85149" strokeWidth="1.5"/>
          <text x="220" y="272" textAnchor="middle" fill="#f85149" fontSize="9" fontWeight="bold">Collisions</text>
          <text x="220" y="286" textAnchor="middle" fill="#8b949e" fontSize="8">Elastic: momentum+KE conserved | Inelastic: momentum only | e=1 elastic; e=0 perfectly inelastic</text>
        </svg>)
    },
    'Gravitation': {
      title:'Gravitation — Newton and Kepler',
      parts:["Newton's law — F = Gm1m2/r²; G = 6.67×10⁻¹¹ N m² kg⁻²; universal attractive force",'Gravitational field — g = GM/r²; near Earth surface g = 9.8 m/s²; decreases with altitude','Gravitational PE — U = -GMm/r; negative means bound state; increases (less negative) with r','Orbital velocity — vo = √(GM/r) ≈ 7.9 km/s (near Earth); satellites must have this speed','Escape velocity — ve = √(2GM/R) = √(2gR) ≈ 11.2 km/s; independent of mass of projectile',"Kepler's laws — 1: Ellipse; 2: Equal areas (conservation of angular momentum); 3: T² ∝ a³"],
      facts:['Geostationary orbit: T=24h; height≈36000km; appears stationary relative to Earth','g decreases both above Earth surface (inverse square) and below surface (linear)','Black hole: escape velocity > c; Schwarzschild radius Rs = 2GM/c²'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Gravitation</text>
          {[{q:"Newton's Law",eq:'F = Gm₁m₂/r²',col:'#d29922',y:48,note:'G=6.67×10⁻¹¹ N m² kg⁻² | Universal; always attractive; inverse square law'},
            {q:'Orbital Velocity',eq:'vo = √(GM/r) ≈ 7.9 km/s',col:'#3fb950',y:92,note:'For near-Earth orbit | Satellite must have this speed to remain in orbit'},
            {q:'Escape Velocity',eq:'ve = √(2gR) ≈ 11.2 km/s',col:'#f85149',y:136,note:'Minimum speed to escape Earth gravity | Independent of mass of object'},
            {q:"Kepler's 3rd Law",eq:'T² ∝ a³',col:'#58a6ff',y:180,note:'T²/a³ = constant = 4π²/GM | Longer orbit → longer period'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="175" y={y} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <rect x="10" y="224" width="420" height="76" rx="8" fill="rgba(0,0,0,.3)" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="220" y="242" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">Variation of g</text>
          <text x="20" y="258" fill="#8b949e" fontSize="8">Above surface: g=GM/(R+h)² → decreases with altitude (inverse square)</text>
          <text x="20" y="272" fill="#8b949e" fontSize="8">Below surface: g=g0(1-d/R) → decreases linearly with depth d</text>
          <text x="20" y="286" fill="#8b949e" fontSize="8">At centre: g=0 | On poles: g slightly higher than equator (Earth is oblate)</text>
        </svg>)
    },
    'Oscillations': {
      title:'Simple Harmonic Motion (SHM)',
      parts:['SHM definition — F = -kx; restoring force ∝ displacement; acceleration always toward equilibrium','Displacement — x = A sin(ωt + φ); A = amplitude; ω = angular frequency; φ = initial phase','Velocity — v = ω√(A² - x²); maximum at x=0 (equilibrium); zero at x=±A (extremes)','Acceleration — a = -ω²x; maximum at x=±A; zero at x=0','Simple pendulum — T = 2π√(L/g); valid for small angles (θ<15°); independent of mass','Spring-mass — T = 2π√(m/k); independent of amplitude; springs in parallel: k=k1+k2'],
      facts:['At equilibrium: v=max, a=0, KE=max, PE=0','At extremes x=±A: v=0, a=max, KE=0, PE=max=½kA²','Resonance: driving frequency = natural frequency → maximum amplitude (potentially destructive)'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Simple Harmonic Motion</text>
          <rect x="10" y="28" width="420" height="90" rx="8" fill="rgba(0,0,0,.3)" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">SHM Equations</text>
          {[['x = A sin(ωt + φ)','displacement equation'],
            ['v = ω√(A²-x²)','velocity (max at x=0)'],
            ['a = -ω²x','acceleration (max at x=A)'],
            ['T = 2π/ω = 2π√(m/k)','time period'],
          ].map(([eq,desc],i)=>(
            <g key={eq}><text x="20" y={63+i*16} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="240" y={63+i*16} fill="#8b949e" fontSize="8">{desc}</text></g>))}
          <rect x="10" y="130" width="200" height="90" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="110" y="148" textAnchor="middle" fill="#58a6ff" fontSize="9" fontWeight="bold">Simple Pendulum</text>
          <line x1="110" y1="152" x2="110" y2="205" stroke="#d29922" strokeWidth="2"/>
          <circle cx="110" cy="210" r="10" fill="#2d2d00" stroke="#d29922" strokeWidth="2"/>
          <text x="110" y="214" textAnchor="middle" fill="#d29922" fontSize="7">m</text>
          <text x="110" y="213" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold" x="130" y="205">T=2π√(L/g)</text>
          <text x="110" y="210" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">T=2π√(L/g)</text>
          <rect x="230" y="130" width="200" height="90" rx="8" fill="rgba(0,0,0,.3)" stroke="#f0883e" strokeWidth="1.5"/>
          <text x="330" y="148" textAnchor="middle" fill="#f0883e" fontSize="9" fontWeight="bold">Spring-Mass System</text>
          <rect x="295" y="155" width="70" height="18" rx="4" fill="#2d1a00" stroke="#f0883e" strokeWidth="2"/>
          <text x="330" y="168" textAnchor="middle" fill="#f0883e" fontSize="8">k (spring)</text>
          <rect x="312" y="178" width="36" height="24" rx="4" fill="#1a1a2d" stroke="#58a6ff" strokeWidth="2"/>
          <text x="330" y="194" textAnchor="middle" fill="#58a6ff" fontSize="8">mass m</text>
          <text x="330" y="215" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">T=2π√(m/k)</text>
          <rect x="10" y="232" width="420" height="68" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="1.5"/>
          <text x="220" y="250" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">Energy in SHM</text>
          <text x="20" y="266" fill="#8b949e" fontSize="8">At equilibrium (x=0): KE=max=½kA², PE=0, speed=max=Aω</text>
          <text x="20" y="280" fill="#8b949e" fontSize="8">At extremes (x=±A): KE=0, PE=max=½kA², speed=0</text>
          <text x="20" y="294" fill="#3fb950" fontSize="8">Total energy = ½kA² = constant throughout SHM</text>
        </svg>)
    },
    'Waves': {
      title:"Wave Motion and Young's Double Slit",
      parts:['Transverse wave — Displacement perpendicular to propagation; light, string vibration','Longitudinal wave — Displacement parallel to propagation; sound, spring compression','Wave equation — y = A sin(kx − ωt); k = 2π/λ (wave number); ω = 2πf; v = fλ','Speed of sound — √(γP/ρ) ≈ 332 m/s at 0°C; increases with temperature','Standing waves — Nodes (zero displacement) and antinodes (maximum displacement)','Beats — Two waves of slightly different frequencies; fbeat = f1 − f2'],
      facts:["Doppler effect: f_observed = f_source × (v±v_observer)/(v∓v_source)",'Open pipe: all harmonics present | Closed pipe: only odd harmonics','Ultrasound (>20kHz) used in medical imaging (sonography)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Wave Motion</text>
          <rect x="10" y="28" width="420" height="65" rx="8" fill="rgba(0,0,0,.3)" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="220" y="46" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">y = A sin(kx − ωt)</text>
          <text x="20" y="62" fill="#8b949e" fontSize="8">k = 2π/λ (wave number) | ω = 2πf | v = fλ = ω/k</text>
          <text x="20" y="76" fill="#8b949e" fontSize="8">Speed of sound ≈ 332 m/s at 0°C | Increases with temperature by 0.61 m/s per °C</text>
          <rect x="10" y="105" width="420" height="70" rx="8" fill="rgba(0,0,0,.3)" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="220" y="123" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">Standing Waves</text>
          <path d="M25,158 Q110,125 220,158 Q330,191 415,158" fill="none" stroke="#3fb950" strokeWidth="2"/>
          <path d="M25,158 Q110,191 220,158 Q330,125 415,158" fill="none" stroke="#3fb950" strokeWidth="1.5" opacity=".5"/>
          {[25,220,415].map(x=>(<circle key={x} cx={x} cy={158} r="4" fill="#f85149"/>))}
          {[122.5,317.5].map(x=>(<circle key={x} cx={x} cy={158} r="4" fill="#58a6ff"/>))}
          <text x="220" y="186" textAnchor="middle" fill="#8b949e" fontSize="8">Nodes (red,zero displacement) | Antinodes (blue,max displacement)</text>
          {[{t:'Beats',col:'#d29922',y:212,items:['fbeat = |f1 − f2| (difference of frequencies)','Beat period = 1/fbeat | Maximum amplitude when superimposed']},
            {t:'Doppler Effect',col:'#f0883e',y:258,items:["f' = f × (v+vo)/(v−vs) (source and observer approaching)","f' = f × (v−vo)/(v+vs) (both moving away)"]},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Electric Charges and Fields': {
      title:'Electric Charges and Coulomb\'s Law',
      parts:["Coulomb's law — F = kq1q2/r²; k = 9×10⁹ N m² C⁻²; vector form with unit vector",'Electric field — E = F/q0; unit N/C or V/m; superposition principle applies','Field lines — Start at positive; end at negative; tangent gives direction; density = magnitude','Gauss\'s law — Φ = Q_enclosed/ε0; useful for symmetric charge distributions','Electric dipole — Two equal and opposite charges; p = qd; torque τ = p×E in external field','Continuous charge — Linear (λ), surface (σ), volume (ρ) charge distributions'],
      facts:['E inside a conductor = 0; all charge resides on the outer surface','E due to infinite line charge: E = λ/2πε0r','E due to infinite plane sheet: E = σ/2ε0 (uniform; independent of distance)'],
      svg: () => (
        <svg viewBox="0 0 420 320" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Electric Field Lines</text>
          <circle cx="135" cy="165" r="26" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
          <text x="135" y="169" textAnchor="middle" fill="#f85149" fontSize="18" fontWeight="bold">+</text>
          <circle cx="285" cy="165" r="26" fill="#0a0a1a" stroke="#58a6ff" strokeWidth="2.5"/>
          <text x="285" y="171" textAnchor="middle" fill="#58a6ff" fontSize="22" fontWeight="bold">−</text>
          {[-70,-48,-24,0,24,48,70].map((dy,i)=>{
            if(Math.abs(dy)<10) return <path key={i} d="M161,165 L259,165" fill="none" stroke="#f0883e" strokeWidth="1.5" opacity=".9"/>
            return <path key={i} d={`M${161+Math.abs(dy)*0.08},${165+dy*0.38} Q${210},${165+dy} ${259-Math.abs(dy)*0.08},${165+dy*0.38}`} fill="none" stroke="#f0883e" strokeWidth="1.5" opacity={0.9-Math.abs(dy)/200}/>})}
          {[44,80].map(r=>(<g key={r}>
            <circle cx="135" cy="165" r={r} fill="none" stroke="#bc8cff" strokeWidth="1" strokeDasharray="4,4" opacity=".5"/>
            <circle cx="285" cy="165" r={r} fill="none" stroke="#bc8cff" strokeWidth="1" strokeDasharray="4,4" opacity=".5"/>
          </g>))}
          <rect x="88" y="30" width="234" height="42" rx="8" fill="#0d1020" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="205" y="48" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">Coulomb's Law</text>
          <text x="205" y="64" textAnchor="middle" fill="#3fb950" fontSize="11" fontWeight="bold">F = kq₁q₂/r²</text>
          <rect x="88" y="278" width="234" height="34" rx="8" fill="#0d1020" stroke="#f0883e" strokeWidth="1.5"/>
          <text x="205" y="294" textAnchor="middle" fill="#f0883e" fontSize="10" fontWeight="bold">E = F/q = kQ/r²</text>
          <text x="135" y="208" textAnchor="middle" fill="#f85149" fontSize="9">+q (source)</text>
          <text x="285" y="208" textAnchor="middle" fill="#58a6ff" fontSize="9">−q (sink)</text>
          <text x="50" y="108" fill="#f0883e" fontSize="9">Field lines</text>
          <text x="50" y="120" fill="#8b949e" fontSize="8">(+ to −)</text>
          <text x="330" y="108" fill="#bc8cff" fontSize="9">Equipotential</text>
          <text x="330" y="120" fill="#bc8cff" fontSize="9">surfaces</text>
        </svg>)
    },
    'Current Electricity': {
      title:'Electric Circuits — Ohm\'s Law and Kirchhoff',
      parts:["Ohm's law — V = IR; resistance R = ρL/A; resistivity ρ depends on material and temperature","Kirchhoff's Current Law (KCL) — Sum of currents at any node = 0; conservation of charge","Kirchhoff's Voltage Law (KVL) — Sum of voltages around any closed loop = 0; conservation of energy","Wheatstone bridge — P/Q = R/S when balanced; no current through galvanometer; null method","Potentiometer — No current drawn from cell; compares EMFs accurately; measures internal resistance","Drift velocity — vd = I/nAe; n = electron density; very slow (~mm/s) despite fast signals"],
      facts:['Resistivities: metals ~10⁻⁸ Ω·m; semiconductors 10⁻³ to 10³; insulators >10⁶ Ω·m','For metals: resistivity increases with temperature (positive temperature coefficient)','Power P = IV = I²R = V²/R; 1 kWh = 3.6×10⁶ J (domestic unit of electrical energy)'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Electric Circuits</text>
          {[{q:"Ohm's Law",eq:'V = IR',col:'#58a6ff',y:48,note:'R=ρL/A | Resistivity ρ increases with T (metals); decreases with T (semiconductors)'},
            {q:'KCL (Junction Rule)',eq:'ΣI = 0',col:'#3fb950',y:92,note:'Sum of currents at node = 0 | Consequence of conservation of electric charge'},
            {q:'KVL (Loop Rule)',eq:'ΣV = 0',col:'#d29922',y:136,note:'Sum of EMF = sum of voltage drops in any closed loop | Conservation of energy'},
            {q:'Wheatstone Bridge',eq:'P/Q = R/S',col:'#f0883e',y:180,note:'Balanced: no current through galvanometer | Null method; very accurate'},
            {q:'Power',eq:'P = IV = I²R = V²/R',col:'#bc8cff',y:224,note:'Joule heating: H = I²Rt | 1 kWh = 3.6×10⁶ J | Domestic electricity unit'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="192" y={y} fill="#3fb950" fontSize="10" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <text x="220" y="275" textAnchor="middle" fill="#8b949e" fontSize="8">Series: R=R1+R2 | Parallel: 1/R=1/R1+1/R2 | Internal resistance r: V=EMF−Ir</text>
        </svg>)
    },
    'Moving Charges and Magnetism': {
      title:'Magnetic Force and Biot-Savart Law',
      parts:['Magnetic force — F = qv×B = qvBsinθ; zero when v∥B; maximum when v⊥B','Biot-Savart law — dB = μ0/4π × Idl×r̂/r²; analogous to Coulomb\'s law','Field at centre of circular loop — B = μ0I/2R; proportional to I, inversely to R','Ampere\'s law — ∮B·dl = μ0I_enclosed; for symmetric magnetic field distributions','Solenoid — B = μ0nI (inside); uniform field; n = turns per unit length','Cyclotron — Radius r = mv/qB; time period T = 2πm/qB (independent of speed)'],
      facts:['Lorentz force: F = q(E + v×B); combined electric and magnetic force on charge','Galvanometer → ammeter: connect low resistance (shunt) in parallel','Galvanometer → voltmeter: connect high resistance in series'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Moving Charges and Magnetism</text>
          {[{q:'Magnetic Force',eq:'F = qvBsinθ',col:'#58a6ff',y:48,note:'Direction: F = qv×B | Zero when v∥B | Maximum when v⊥B'},
            {q:'Biot-Savart Law',eq:'dB = μ₀Idl×r̂/4πr²',col:'#3fb950',y:92,note:'Field due to current element | Analogous to Coulomb\'s law for charges'},
            {q:'Circular Loop (centre)',eq:'B = μ₀I/2R',col:'#d29922',y:136,note:'Field at centre of loop | Proportional to I; inversely to radius R'},
            {q:"Ampere's Law",eq:'∮B·dl = μ₀I',col:'#f0883e',y:180,note:'Useful for solenoids, toroids | Analogous to Gauss\'s law for E field'},
            {q:'Solenoid (inside)',eq:'B = μ₀nI',col:'#bc8cff',y:224,note:'n = turns per metre | Uniform field inside | Zero outside ideal solenoid'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="190" y={y} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <text x="220" y="275" textAnchor="middle" fill="#8b949e" fontSize="8">Cyclotron: r=mv/qB | T=2πm/qB (independent of speed) | Used to accelerate charged particles</text>
        </svg>)
    },
    'Electromagnetic Induction': {
      title:'Faraday\'s Laws and Electromagnetic Induction',
      parts:["Faraday's law — EMF = -NdΦ/dt; magnetic flux Φ = B·A·cosθ; rate of change = EMF","Lenz's law — Induced current opposes the change causing it; consequence of energy conservation","Motional EMF — ε = BLv; conductor of length L moving at velocity v in field B","Self-inductance — L = NΦ/I; EMF = -LdI/dt; unit: henry (H); opposes change in current","Mutual inductance — M; EMF in coil 2 = -MdI1/dt; transformer principle","AC generator — Rotating coil in uniform B; ε = NBAωsin(ωt) = ε0sin(ωt)"],
      facts:['Eddy currents: induced in solid conductors in changing B field; reduced by lamination','Ideal transformer: Vs/Vp = Ns/Np = Ip/Is; power input = power output','Back EMF in DC motor limits current; efficiency = back-EMF/applied-EMF'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Electromagnetic Induction</text>
          {[{q:"Faraday's Law",eq:'EMF = −NdΦ/dt',col:'#d29922',y:48,note:'Φ = B·A·cosθ | Rate of change of flux induces EMF | N = number of turns'},
            {q:"Lenz's Law",eq:'Opposes change',col:'#f0883e',y:92,note:'Induced current creates field opposing the change | Energy conservation'},
            {q:'Motional EMF',eq:'ε = BLv',col:'#3fb950',y:136,note:'Conductor length L moving at v in field B | Force on charges → EMF'},
            {q:'Self Inductance',eq:'L = NΦ/I; EMF=-LdI/dt',col:'#58a6ff',y:180,note:'L in henry (H) | Opposes change in current | Choke coil uses this'},
            {q:'Transformer (ideal)',eq:'Vs/Vp = Ns/Np',col:'#bc8cff',y:224,note:'Step-up: Ns>Np | Step-down: Ns<Np | Power conserved: VsIs = VpIp'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="185" y={y} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <text x="220" y="275" textAnchor="middle" fill="#8b949e" fontSize="8">Eddy currents: heating (induction cooker) | Reduced by lamination (transformer cores)</text>
        </svg>)
    },
    'Alternating Current': {
      title:'AC Circuits — LCR and Resonance',
      parts:['AC voltage — v = Vm sinωt; Vrms = Vm/√2 = 0.707Vm; frequency f = ω/2π','Resistive circuit — I in phase with V; P = Vrms × Irms (maximum power factor = 1)','Inductive circuit — I lags V by 90°; XL = ωL; no power dissipated (wattless current)','Capacitive circuit — I leads V by 90°; XC = 1/ωC; no power dissipated','Series LCR — Z = √(R²+(XL-XC)²); phase φ = tan⁻¹((XL-XC)/R)','Resonance — XL = XC; Z = R (minimum); I = maximum; f0 = 1/2π√(LC)'],
      facts:['Power factor cosφ = R/Z; average power P = Vrms Irms cosφ = I²R','Q factor = ω0L/R = 1/ω0CR; measures sharpness of resonance','Choke coil: high inductance, low resistance; limits AC current without much power loss'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Alternating Current — LCR Circuit</text>
          {[{comp:'Resistor (R)',phase:'I in phase with V',X:'XR=R',col:'#3fb950',y:48,note:'Power dissipated: P = I²R = Vrms·Irms | Power factor = 1'},
            {comp:'Inductor (L)',phase:'I lags V by 90°',X:'XL=ωL',col:'#58a6ff',y:95,note:'No power dissipated (wattless) | Induces back EMF opposing current change'},
            {comp:'Capacitor (C)',phase:'I leads V by 90°',X:'XC=1/ωC',col:'#f0883e',y:142,note:'No power dissipated | Blocks DC; allows AC (lower XC at higher f)'},
            {comp:'Series LCR',phase:'Depends on XL vs XC',X:'Z=√(R²+(XL-XC)²)',col:'#d29922',y:189,note:'Phase: tanφ=(XL-XC)/R | At resonance: XL=XC, Z=R, I=max'},
          ].map(({comp,phase,X,col,y,note})=>(
            <g key={comp}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="9" fontWeight="bold">{comp}: {phase}</text>
            <text x="330" y={y} fill="#3fb950" fontSize="8" fontWeight="bold">{X}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <rect x="10" y="232" width="420" height="68" rx="8" fill="rgba(0,0,0,.3)" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="220" y="250" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="bold">Resonance in Series LCR</text>
          <text x="20" y="266" fill="#3fb950" fontSize="9" fontWeight="bold">Resonant frequency: f₀ = 1/(2π√LC)</text>
          <text x="20" y="281" fill="#8b949e" fontSize="8">At resonance: XL=XC; Z=R (minimum); I=Vrms/R (maximum)</text>
          <text x="20" y="294" fill="#8b949e" fontSize="8">Q factor = ω₀L/R; Power factor cosφ=R/Z; Avg power P=Vrms·Irms·cosφ</text>
        </svg>)
    },
    'Ray Optics and Optical Instruments': {
      title:'Ray Optics — Mirrors and Lenses',
      parts:['Mirror formula — 1/v + 1/u = 1/f; f = R/2; sign convention: distances from pole','Magnification (mirror) — m = -v/u = h\'/h; negative m means inverted image','Snell\'s law — n1 sinθ1 = n2 sinθ2; n = c/v (refractive index)','Lens formula — 1/v − 1/u = 1/f; power P = 1/f (dioptre); converging lens P > 0','Total internal reflection — Light from denser to rarer medium; angle > critical angle θc = sin⁻¹(1/n)','Lens maker equation — 1/f = (n−1)(1/R1 − 1/R2); determines focal length from geometry'],
      facts:['Critical angle θc = sin⁻¹(n2/n1); at TIR: reflected light, no refraction','Optical fibre uses TIR principle; used in internet and medical endoscopes','Compound microscope magnification: m = −L/fo × D/fe'],
      svg: () => (
        <svg viewBox="0 0 440 310" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Ray Optics — Mirrors and Lenses</text>
          {[{q:'Mirror Formula',eq:'1/v + 1/u = 1/f',col:'#3fb950',y:48,note:'f=R/2 | Concave mirror: f<0 | Convex mirror: f>0 (New Cartesian sign)'},
            {q:"Snell's Law",eq:'n₁sinθ₁ = n₂sinθ₂',col:'#58a6ff',y:92,note:'n = c/v | Denser medium: higher n, smaller angle of refraction'},
            {q:'Lens Formula',eq:'1/v − 1/u = 1/f',col:'#d29922',y:136,note:'Power P=1/f in dioptre | Converging: f>0,P>0 | Diverging: f<0,P<0'},
            {q:'Lens Maker Eq.',eq:'1/f=(n−1)(1/R₁−1/R₂)',col:'#f0883e',y:180,note:'n = refractive index of lens | R1, R2 = radii of curvature of surfaces'},
            {q:'Total Internal Reflection',eq:'θ > θc = sin⁻¹(1/n)',col:'#f85149',y:224,note:'Denser to rarer medium | Optical fibre, prism, mirage all use TIR'},
          ].map(({q,eq,col,y,note})=>(
            <g key={q}><rect x="10" y={y-16} width="420" height="44" rx="6" fill="rgba(0,0,0,.35)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y} fill={col} fontSize="10" fontWeight="bold">{q}:</text>
            <text x="192" y={y} fill="#3fb950" fontSize="9" fontWeight="bold">{eq}</text>
            <text x="20" y={y+14} fill="#8b949e" fontSize="8">{note}</text></g>))}
          <text x="220" y="278" textAnchor="middle" fill="#8b949e" fontSize="8">Apparent depth = real depth/n | Magnification = image size/object size = v/u</text>
        </svg>)
    },
    'Wave Optics': {
      title:"Young's Double Slit Experiment",
      parts:['Huygens principle — Every point on a wavefront acts as a source of secondary wavelets','Interference — Constructive: path difference = nλ (bright); Destructive: (2n-1)λ/2 (dark)','Fringe width — β = λD/d; increases with λ and D; decreases with d (slit separation)','Coherent sources — Must have constant phase difference; essential for stable interference','Single slit diffraction — Central maximum width = 2λD/a; minima at a sinθ = mλ','Polarisation — Transverse nature of light; Malus law: I = I0 cos²θ; Brewster: tanθp = n'],
      facts:['Fringe width: β = λD/d; substituting monochromatic light gives coloured fringes','Thin film interference: soap bubble colours; anti-reflection coating (AR) on lenses','Angular resolution limit: 1.22λ/D (Rayleigh criterion) for circular aperture'],
      svg: () => (
        <svg viewBox="0 0 480 320" style={{width:'100%',height:'auto'}}>
          <text x="240" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Young's Double Slit Experiment</text>
          <rect x="152" y="35" width="12" height="82" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
          <rect x="152" y="137" width="12" height="28" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
          <rect x="152" y="185" width="12" height="82" rx="2" fill="#484f58" stroke="#8b949e" strokeWidth="1.5"/>
          <text x="150" y="133" textAnchor="end" fill="#d29922" fontSize="9" fontWeight="bold">S₁</text>
          <text x="150" y="192" textAnchor="end" fill="#d29922" fontSize="9" fontWeight="bold">S₂</text>
          {[0,1,2,3].map(i=>(<line key={i} x1={18+i*32} y1="35" x2={18+i*32} y2="307" stroke="#58a6ff" strokeWidth="1.5" opacity=".5"/>))}
          {[155,183].map((sy,si)=>([32,60,90,118].map(r=>(<path key={si+'-'+r} d={`M164,${sy} A${r},${r} 0 0 1 ${164+r},${sy}`} fill="none" stroke={si===0?'#58a6ff':'#f0883e'} strokeWidth="1.5" opacity={1.1-r/130}/>))))}
          <rect x="366" y="35" width="10" height="272" fill="#1a2235" stroke="#58a6ff" strokeWidth="1.5"/>
          {[0,1,2,3,4,5,6,7,8].map(i=>{const y=75+i*24,b=Math.abs(4-i),op=b===0?1:b===1?.7:b===2?.35:.1; return <rect key={i} x="376" y={y-10} width="18" height="20" fill="#58a6ff" opacity={op}/>})}
          <text x="400" y="155" fill="#58a6ff" fontSize="8" fontWeight="bold">n=0 (bright)</text>
          <text x="400" y="133" fill="#58a6ff" fontSize="8">n=±1</text>
          <text x="400" y="178" fill="#58a6ff" fontSize="8">n=±1</text>
          <rect x="18" y="272" width="120" height="44" rx="6" fill="#0d1a2d" stroke="#58a6ff" strokeWidth="1.5"/>
          <text x="78" y="291" textAnchor="middle" fill="#58a6ff" fontSize="11" fontWeight="bold">β = λD/d</text>
          <text x="78" y="308" textAnchor="middle" fill="#8b949e" fontSize="8">fringe width</text>
        </svg>)
    },
    'Dual Nature of Radiation and Matter': {
      title:'Photoelectric Effect and de Broglie',
      parts:['Photoelectric effect — Light ejects electrons from metal surface; proved quantum nature','Einstein equation — KE_max = hf − φ (work function); threshold frequency f0 = φ/h','Key observations — Instantaneous; depends on frequency not intensity; no emission below f0','Stopping potential — eVs = KE_max = hf − φ; Vs is independent of intensity','de Broglie wavelength — λ = h/mv = h/p; all matter has wave nature','Davisson-Germer (1927) — Electron diffraction from Ni crystal; proved wave nature of electrons'],
      facts:['Work function φ: Cs (1.9eV) < Na (2.3eV) < Al (4.1eV) < Cu (4.5eV) < W (4.5eV)','Heisenberg uncertainty: ΔxΔp ≥ h/4π; fundamental limit, NOT measurement error','Electron microscope uses de Broglie wavelength; much smaller than light → higher resolution'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#d29922" fontSize="12" fontWeight="bold">Dual Nature — Photoelectric Effect</text>
          <rect x="10" y="28" width="420" height="78" rx="8" fill="rgba(0,0,0,.3)" stroke="#d29922" strokeWidth="2"/>
          <text x="220" y="46" textAnchor="middle" fill="#d29922" fontSize="11" fontWeight="bold">Einstein's Photoelectric Equation</text>
          <text x="220" y="63" textAnchor="middle" fill="#3fb950" fontSize="13" fontWeight="bold">KE_max = hf − φ</text>
          <text x="220" y="79" textAnchor="middle" fill="#8b949e" fontSize="9">φ = work function (minimum energy to eject electron)</text>
          <text x="220" y="95" textAnchor="middle" fill="#8b949e" fontSize="9">h = 6.626×10⁻³⁴ J·s (Planck constant)</text>
          {[{t:'Key Observations',col:'#58a6ff',y:126,items:['Emission is instantaneous (no time delay regardless of intensity)','Depends on FREQUENCY not intensity of light','No emission below threshold frequency f0 = φ/h, however high intensity']},
            {t:'de Broglie Wavelength',col:'#bc8cff',y:196,items:['λ = h/mv = h/p (all matter has wave nature)','Large mass → very small λ (undetectable for macroscopic objects)','Electron at 100V: λ ≈ 0.12 nm (X-ray range) → diffraction possible']},
          ].map(({t,col,y,items})=>(
            <g key={t}><rect x="10" y={y-14} width="420" height={items.length*14+20} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{t}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
    'Atoms': {
      title:'Atomic Models — Bohr Model',
      parts:["Thomson model — Plum pudding; electrons embedded in positive sphere; failed Rutherford's test","Rutherford model — Nuclear model from α-scattering (1911); most mass in tiny nucleus; unstable classically","Bohr model — Quantised orbits; En = -13.6Z²/n² eV; rn = n²×0.529/Z Å",'Energy levels — H: -13.6, -3.4, -1.51, -0.85 eV for n=1,2,3,4 respectively','Spectral series — Lyman (UV, n→1); Balmer (visible, n→2); Paschen (IR, n→3)','Rydberg formula — 1/λ = R(1/n1² − 1/n2²); R = 1.097×10⁷ m⁻¹'],
      facts:['Lyman series: transitions to n=1 (UV region)','Balmer series: transitions to n=2 (visible light; only 4 lines observable)','Bohr model works only for hydrogen-like atoms (one electron systems)'],
      svg: () => (
        <svg viewBox="0 0 420 330" style={{width:'100%',height:'auto'}}>
          <text x="210" y="16" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="bold">Bohr Model and Spectral Series</text>
          <circle cx="210" cy="170" r="17" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="2.5"/>
          <text x="210" y="168" textAnchor="middle" fill="#bc8cff" fontSize="7" fontWeight="bold">Nucleus</text>
          <text x="210" y="178" textAnchor="middle" fill="#8b949e" fontSize="6">Z protons</text>
          {[{r:45,col:'#f85149',n:1,E:'-13.6eV'},
            {r:82,col:'#f0883e',n:2,E:'-3.4eV'},
            {r:118,col:'#d29922',n:3,E:'-1.51eV'},
            {r:152,col:'#3fb950',n:4,E:'-0.85eV'}
          ].map(({r,col,n,E})=>(
            <g key={n}>
              <circle cx="210" cy="170" r={r} fill="none" stroke={col} strokeWidth="1.5" strokeDasharray="4,4" opacity=".7"/>
              <circle cx={210+r} cy="170" r="6" fill={col} opacity=".9"/>
              <text x="210" y={170-r-6} textAnchor="middle" fill={col} fontSize="7.5">n={n} | E={E}</text>
            </g>))}
          {/* Emission lines */}
          <line x1="272" y1="125" x2="295" y2="100" stroke="#f85149" strokeWidth="2" strokeDasharray="3,2"/>
          <text x="298" y="98" fill="#f85149" fontSize="8">Lyman (UV)</text>
          <line x1="288" y1="156" x2="318" y2="152" stroke="#d29922" strokeWidth="2" strokeDasharray="3,2"/>
          <text x="320" y="150" fill="#d29922" fontSize="8">Balmer (visible)</text>
          <line x1="326" y1="165" x2="360" y2="168" stroke="#58a6ff" strokeWidth="2" strokeDasharray="3,2"/>
          <text x="362" y="166" fill="#58a6ff" fontSize="8">Paschen (IR)</text>
          <rect x="10" y="298" width="400" height="26" rx="6" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="210" y="315" textAnchor="middle" fill="#bc8cff" fontSize="8.5">1/λ = R(1/n₁² − 1/n₂²) | R = 1.097×10⁷ m⁻¹ | rn = n²×0.529/Z Å</text>
        </svg>)
    },
    'Nuclei': {
      title:'Nuclear Physics and Radioactive Decay',
      parts:['Nucleus size — R = R0A^(1/3); R0 = 1.2 fm; nuclear density constant ≈ 2.3×10¹⁷ kg/m³','Binding energy — BE = Δm×c²; mass defect Δm = total nucleon masses − actual nucleus mass','Alpha decay — Emits ⁴He; A→A-4, Z→Z-2; stopped by paper; range few cm in air','Beta decay — Neutron→proton + electron + antineutrino; Z→Z+1; A unchanged; stopped by Al','Gamma decay — High energy photon; Z and A unchanged; most penetrating; stopped by Pb','Radioactive decay law — N = N0e⁻λt; t½ = 0.693/λ; Activity A = λN'],
      facts:['BE per nucleon: maximum for Fe-56 (8.8 MeV) → most stable nucleus in nature','Nuclear fission: U-235 + n → Ba + Kr + 3n + energy; chain reaction; reactor/bomb','Nuclear fusion: H + H → He + energy; Sun; needs T ~10⁷ K (thermonuclear)'],
      svg: () => (
        <svg viewBox="0 0 440 320" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">Radioactive Decay — Types</text>
          <circle cx="220" cy="120" r="42" fill="#1a0a0a" stroke="#f85149" strokeWidth="2.5"/>
          {[[210,110],[230,110],[220,125],[208,128],[232,128],[220,100],[205,120],[235,120]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r={i%2===0?6:5} fill={i%2===0?"#f85149":"#58a6ff"} opacity=".9"/>))}
          <text x="220" y="175" textAnchor="middle" fill="#8b949e" fontSize="9">Parent Nucleus (Z, A)</text>
          <path d="M178,103 L76,60" fill="none" stroke="#3fb950" strokeWidth="2.5"/>
          <circle cx="62" cy="54" r="16" fill="#0a1a0a" stroke="#3fb950" strokeWidth="2"/>
          <text x="62" y="58" textAnchor="middle" fill="#3fb950" fontSize="8" fontWeight="bold">⁴He</text>
          <rect x="4" y="72" width="105" height="46" rx="6" fill="#0a1a0a" stroke="#3fb950" strokeWidth="1.5"/>
          <text x="56" y="90" textAnchor="middle" fill="#3fb950" fontSize="9" fontWeight="bold">α-Decay</text>
          <text x="56" y="103" textAnchor="middle" fill="#8b949e" fontSize="7">A-4, Z-2 | Paper stops</text>
          <path d="M220,162 L220,226" fill="none" stroke="#d29922" strokeWidth="2.5"/>
          <rect x="140" y="230" width="160" height="56" rx="6" fill="#1a1a0a" stroke="#d29922" strokeWidth="1.5"/>
          <text x="220" y="248" textAnchor="middle" fill="#d29922" fontSize="9" fontWeight="bold">β-Decay</text>
          <text x="220" y="262" textAnchor="middle" fill="#8b949e" fontSize="7">n→p+e⁻+ν̄; Z+1, A same</text>
          <text x="220" y="276" textAnchor="middle" fill="#8b949e" fontSize="7">Al foil stops | +antineutrino</text>
          <path d="M262,103 L360,60" fill="none" stroke="#bc8cff" strokeWidth="2.5"/>
          <rect x="330" y="45" width="105" height="46" rx="6" fill="#1a0a2d" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="382" y="63" textAnchor="middle" fill="#bc8cff" fontSize="9" fontWeight="bold">γ-Decay</text>
          <text x="382" y="77" textAnchor="middle" fill="#8b949e" fontSize="7">High energy photon</text>
          <text x="382" y="87" textAnchor="middle" fill="#8b949e" fontSize="7">Z,A unchanged | Pb stops</text>
          <rect x="10" y="302" width="420" height="14" rx="5" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="220" y="313" textAnchor="middle" fill="#58a6ff" fontSize="9">N=N₀e⁻λt | t½=0.693/λ | Activity A=λN | 1 Ci=3.7×10¹⁰ Bq</text>
        </svg>)
    },
    'Semiconductor Electronics': {
      title:'Semiconductor Devices',
      parts:['Intrinsic semiconductor — Pure Si/Ge; equal electrons and holes; conductivity increases with T','p-type — Trivalent dopant (B, Al); majority carriers = holes; minority = electrons','n-type — Pentavalent dopant (P, As); majority carriers = electrons; minority = holes','p-n junction — Depletion region; built-in potential ~0.7V (Si); barrier prevents flow at rest','Forward bias — Applied voltage > barrier (0.7V for Si); conducts; depletion layer narrows','Logic gates — NOT, AND, OR, NAND, NOR; NAND and NOR are universal gates'],
      facts:['Reverse bias: depletion region widens; reverse saturation current (~µA); breakdown at Zener V','BJT (transistor): PNP or NPN; current amplifier; IC = βIB (β = current gain 50-300)','IC (integrated circuit): millions of transistors on single silicon chip'],
      svg: () => (
        <svg viewBox="0 0 440 330" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">Semiconductor Electronics</text>
          {[['Conductor',60,'#3fb950'],['Semiconductor',220,'#d29922'],['Insulator',380,'#f85149']].map(([type,cx,col],i)=>(
            <g key={type}>
              <text x={cx} y={52} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold">{type}</text>
              <rect x={cx-33} y={60} width="66" height="22" rx="3" fill={col} opacity=".7"/>
              <text x={cx} y={75} textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Conduction</text>
              {i===0&&<rect x={cx-33} y={80} width="66" height="22" rx="3" fill={col} opacity=".4"/>}
              {i===1&&<rect x={cx-33} y={88} width="66" height="11" rx="2" fill="transparent" stroke={col} strokeWidth="1" strokeDasharray="3,2"/>}
              {i===1&&<text x={cx} y={96} textAnchor="middle" fill={col} fontSize="6">~1eV gap</text>}
              {i===2&&<rect x={cx-33} y={96} width="66" height="18" rx="2" fill="transparent" stroke={col} strokeWidth="1" strokeDasharray="3,2"/>}
              {i===2&&<text x={cx} y={107} textAnchor="middle" fill={col} fontSize="6">&gt;3eV gap</text>}
              <rect x={cx-33} y={i===0?80:i===1?108:130} width="66" height="22" rx="3" fill={col} opacity=".7"/>
              <text x={cx} y={i===0?95:i===1?122:144} textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Valence</text>
            </g>))}
          <rect x="18" y="172" width="404" height="148" rx="8" fill="rgba(0,0,0,.3)" stroke="#30363d"/>
          <text x="220" y="190" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="bold">p-n Junction Diode</text>
          <rect x="28" y="202" width="170" height="64" rx="4" fill="#2d0a0a" stroke="#f85149" strokeWidth="2"/>
          <text x="113" y="232" textAnchor="middle" fill="#f85149" fontSize="12" fontWeight="bold">p-type</text>
          <text x="113" y="248" textAnchor="middle" fill="#8b949e" fontSize="8">majority: holes</text>
          <rect x="242" y="202" width="170" height="64" rx="4" fill="#0a0a2d" stroke="#58a6ff" strokeWidth="2"/>
          <text x="327" y="232" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="bold">n-type</text>
          <text x="327" y="248" textAnchor="middle" fill="#8b949e" fontSize="8">majority: electrons</text>
          <rect x="200" y="202" width="42" height="64" fill="#1a1a1a" stroke="#bc8cff" strokeWidth="1.5"/>
          <text x="221" y="234" textAnchor="middle" fill="#bc8cff" fontSize="7">Depletion</text>
          <text x="221" y="245" textAnchor="middle" fill="#bc8cff" fontSize="7">region</text>
          <text x="220" y="300" textAnchor="middle" fill="#3fb950" fontSize="8">Forward bias >0.7V (Si): conducts | Reverse: no conduction</text>
          <text x="220" y="314" textAnchor="middle" fill="#8b949e" fontSize="8">NAND/NOR = universal gates | BJT: IC = βIB (β=50-300)</text>
        </svg>)
    },
    'Communication Systems': {
      title:'Communication Systems',
      parts:['Modulation — AM (amplitude), FM (frequency), PM (phase); needed to transmit audio on carrier','AM bandwidth — 2fm; FM bandwidth = 2(Δf + fm); FM has better noise immunity','Ground wave — Along Earth surface; MF band (0.3-3 MHz); limited range by absorption','Sky wave — Reflects off ionosphere; HF (3-30 MHz); long distance communication','Space wave — Line of sight; VHF, UHF, microwave; satellite; needs repeaters','Optical fibre — TIR based; high bandwidth; low loss; no EM interference; secure data'],
      facts:['Ionosphere layers: D (60-90km), E (100-130km), F1+F2 (160-400km) reflect HF','Range of TV transmission: d = √(2hR) where h = antenna height, R = Earth radius','Mobile network: hexagonal cells; frequency reuse; base station; handoff between cells'],
      svg: () => (
        <svg viewBox="0 0 440 300" style={{width:'100%',height:'auto'}}>
          <text x="220" y="16" textAnchor="middle" fill="#3fb950" fontSize="12" fontWeight="bold">Communication Systems</text>
          {[{type:'Modulation',col:'#3fb950',y:48,items:['AM: carrier amplitude varies with message | FM: carrier frequency varies','AM bandwidth = 2fm | FM: better noise immunity than AM','Modulation needed: audio (20Hz-20kHz) cannot travel as EM wave directly']},
            {type:'Propagation Modes',col:'#58a6ff',y:118,items:['Ground wave: along Earth surface | MF band (0.3-3 MHz) | Limited by absorption','Sky wave: reflects off ionosphere | HF (3-30 MHz) | Long distance; day-night variation','Space wave: line of sight | VHF+ | Satellite; microwave links; TV broadcasting']},
            {type:'Modern Communication',col:'#bc8cff',y:196,items:['Optical fibre: TIR; high bandwidth (THz); very low loss; no EM interference','Mobile: hexagonal cells; 4G (LTE); 5G (mmWave, 1 Gbps)','Satellite: geostationary (36000km,24h) for TV/GPS; LEO (500-2000km) for internet']},
          ].map(({type,col,y,items})=>(
            <g key={type}><rect x="10" y={y-14} width="420" height={items.length*14+22} rx="7" fill="rgba(0,0,0,.3)" stroke={col} strokeWidth="1.5"/>
            <text x="20" y={y+2} fill={col} fontSize="10" fontWeight="bold">{type}</text>
            {items.map((item,j)=><text key={j} x="20" y={y+16+j*14} fill="#8b949e" fontSize="8">• {item}</text>)}</g>))}
        </svg>)
    },
  }

  // ── UI RENDERING ─────────────────────────────────────────────
  const subjects = {
    bio:  {label:'Biology',   icon:'🧬', color:'var(--bio)',  chapters11: SYLLABUS.biology[11],   chapters12: SYLLABUS.biology[12],   map: BIO_CHAPTERS},
    chem: {label:'Chemistry', icon:'⚗️', color:'var(--chem)', chapters11: SYLLABUS.chemistry[11], chapters12: SYLLABUS.chemistry[12], map: CHEM_CHAPTERS},
    phys: {label:'Physics',   icon:'⚛️', color:'var(--phys)', chapters11: SYLLABUS.physics[11],   chapters12: SYLLABUS.physics[12],   map: PHYS_CHAPTERS},
  }
  const sub = subjects[activeSub]
  const subColor = sub.color

  return (
    <div className="page fade-in">
      <div style={{marginBottom:20}}>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:22,fontWeight:700,marginBottom:4}}>3D Diagrams — Chapter Wise</h1>
        <p style={{fontSize:13,color:'var(--text2)'}}>Every NCERT chapter has its own unique diagram with labeled parts and key NEET facts</p>
      </div>

      {/* Subject tabs */}
      <div className="tabs" style={{marginBottom:20}}>
        {[['bio','Biology'],['chem','Chemistry'],['phys','Physics']].map(([k,l])=>(
          <div key={k} className={"tab"+(activeSub===k?" active":"")}
            style={activeSub===k?{color:subjects[k].color,borderBottomColor:subjects[k].color}:{}}
            onClick={()=>{setActiveSub(k);setActiveChapter(null);setActiveItem(null)}}>
            {subjects[k].icon} {l}
          </div>
        ))}
      </div>

      {/* ── DIAGRAM DETAIL VIEW ── */}
      {activeItem ? (
        <div className="fade-in">
          <div style={{display:'flex',gap:8,marginBottom:16,alignItems:'center'}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setActiveItem(null)}>← Back to chapter</button>
            <span style={{fontSize:13,color:'var(--text3)'}}>{activeChapter}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'start'}}>
            <div className="card" style={{borderTop:`3px solid ${subColor}`}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:16,marginBottom:4,color:subColor}}>{activeItem.title}</div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>Chapter: {activeChapter}</div>
              <activeItem.svg/>
            </div>
            <div>
              <div className="card" style={{marginBottom:14}}>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,marginBottom:12}}>Labeled Parts</div>
                {activeItem.parts.map((p,i)=>{
                  const dash = p.indexOf(' — ')
                  const name = dash>-1 ? p.slice(0,dash) : p
                  const desc = dash>-1 ? p.slice(dash+3) : ''
                  return (
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 0',borderBottom:i<activeItem.parts.length-1?'1px solid var(--border)':'none'}}>
                      <span style={{width:22,height:22,borderRadius:'50%',background:subColor,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:subColor}}>{name}</div>
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

      /* ── CHAPTER DIAGRAM LIST ── */
      ) : activeChapter ? (
        <div className="fade-in">
          <button className="btn btn-ghost btn-sm" style={{marginBottom:16}} onClick={()=>setActiveChapter(null)}>← All Chapters</button>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:18,fontWeight:700,color:subColor,marginBottom:4}}>{activeChapter}</h2>
          <p style={{fontSize:13,color:'var(--text3)',marginBottom:20}}>Click to study the diagram</p>
          {sub.map[activeChapter] ? (
            <div className="grid-3">
              <div className="card" style={{cursor:'pointer',borderLeft:`3px solid ${subColor}`}}
                onClick={()=>{setActiveItem(sub.map[activeChapter]);if(logActivity)logActivity('Viewed Diagram: '+sub.map[activeChapter].title,activeChapter)}}>
                <div style={{padding:'10px 0',textAlign:'center'}}><sub.map[activeChapter].svg/></div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:14,color:subColor,marginBottom:4}}>{sub.map[activeChapter].title}</div>
                <div style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>{sub.map[activeChapter].parts.length} labeled parts • {sub.map[activeChapter].facts.length} NEET facts</div>
                <button className="btn btn-primary btn-sm" style={{width:'100%'}}>Study Diagram →</button>
              </div>
            </div>
          ) : (
            <div className="card" style={{textAlign:'center',padding:40,color:'var(--text3)'}}>
              <div style={{fontSize:40,marginBottom:12}}>🔬</div>
              <div style={{fontWeight:600,marginBottom:8}}>Diagram coming soon</div>
              <div style={{fontSize:13}}>This chapter's diagram is being prepared</div>
            </div>
          )}
        </div>

      /* ── CHAPTER GRID ── */
      ) : (
        <>
          {[{label:'Class 11', chapters: sub.chapters11},{label:'Class 12', chapters: sub.chapters12}].map(({label,chapters})=>(
            <div key={label} style={{marginBottom:28}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:15,color:subColor,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:28,height:28,borderRadius:6,background:subColor,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{label.split(' ')[1]}</span>
                {label}
              </div>
              <div className="grid-3">
                {chapters.map((ch,i)=>{
                  const hasdiag = !!sub.map[ch]
                  return (
                    <div key={i} className="card" style={{cursor:'pointer',borderLeft:`3px solid ${subColor}`,opacity:hasdiag?1:0.7}}
                      onClick={()=>setActiveChapter(ch)}>
                      <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:600,fontSize:13,color:subColor,marginBottom:6}}>{ch}</div>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>
                        {hasdiag ? `${sub.map[ch].parts.length} parts • ${sub.map[ch].facts.length} facts` : 'Diagram available'}
                      </div>
                      <button className="btn btn-primary btn-sm" style={{width:'100%',fontSize:11}}>
                        {hasdiag ? 'View Diagram →' : 'Coming soon'}
                      </button>
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