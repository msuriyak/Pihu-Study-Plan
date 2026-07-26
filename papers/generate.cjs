/* Regenerate the bundled practice papers:  node papers/generate.cjs
   Edit the SPRINTS array below to add chapters, then re-run. No build step,
   no dependencies — plain Node. Outputs self-contained printable HTML. */
const fs=require('fs'), path=require('path');
const OUT=__dirname+'/';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const STYLE=`
*{box-sizing:border-box}
body{font-family:'Georgia',serif;color:#16283C;max-width:820px;margin:0 auto;padding:28px 32px;line-height:1.5}
h1{font-family:'Arial',sans-serif;font-size:22px;margin:0 0 2px}
.sub{font-family:'Arial',sans-serif;color:#5B6E80;font-size:13px;margin:0 0 4px}
.meta{font-family:'Arial',sans-serif;font-size:12px;color:#5B6E80;border-top:2px solid #16283C;border-bottom:1px solid #CBD8E0;padding:8px 0;margin:10px 0 18px;display:flex;gap:18px;flex-wrap:wrap}
.meta b{color:#16283C}
ol.qs{padding-left:22px} ol.qs>li{margin:0 0 14px;padding-left:4px}
.opts{list-style:none;padding:0;margin:6px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:2px 18px;font-size:14px}
.opts li:before{content:"(" attr(data-k) ")  ";font-family:'Arial',sans-serif;color:#5B6E80}
.key{page-break-before:always;border-top:2px solid #16283C;margin-top:26px;padding-top:12px}
table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
th,td{text-align:left;border-bottom:1px solid #CBD8E0;padding:6px 8px;vertical-align:top}
th{font-family:'Arial',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#5B6E80;border-bottom:1.5px solid #16283C}
td.a{font-family:'Arial',sans-serif;font-weight:bold;color:#1D6B50;white-space:nowrap}
.note{background:#FBF6EC;border-left:3px solid #A9701A;padding:8px 12px;font-family:'Arial',sans-serif;font-size:12px;margin:14px 0}
.orig{font-family:'Arial',sans-serif;font-size:11px;color:#8497A6;margin-top:22px;border-top:1px solid #CBD8E0;padding-top:8px}
.pbtn{position:fixed;top:14px;right:14px;font-family:'Arial',sans-serif;font-size:12px;font-weight:bold;
  background:#16283C;color:#fff;border:0;border-radius:3px;padding:9px 14px;cursor:pointer}
h2{font-family:'Arial',sans-serif;font-size:15px;margin:20px 0 6px}
h3{font-family:'Arial',sans-serif;font-size:13px;margin:16px 0 5px}
hr{border:0;border-top:1px solid #CBD8E0;margin:16px 0}
blockquote{border-left:3px solid #8497A6;margin:12px 0;padding:6px 12px;background:#F1F5F7;font-size:14px}
ul.md{padding-left:20px} ul.md li{margin:4px 0}
@media print{.pbtn{display:none}body{max-width:none;padding:0}}
`;
function wrap(title,inner){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title>
<style>${STYLE}</style></head><body>
<button class="pbtn" onclick="window.print()">Print / Save as PDF</button>
${inner}</body></html>`;
}
const KEYLETTER=['a','b','c','d'];
function sprint(p){
  const total=p.qs.length*4;
  let q=`<h1>${esc(p.subject)} — ${esc(p.title)}</h1>
<p class="sub">Chapter sprint (${p.code}) · JEE-style timed practice</p>
<div class="meta"><span><b>Questions:</b> ${p.qs.length}</span><span><b>Time:</b> ${p.mins} min</span>
<span><b>Marking:</b> +4 / −1 / 0</span><span><b>Max:</b> ${total}</span></div>
<div class="note">Single correct option. Aim for ~2 min/question. Log every error with a cause tag
(concept / silly / speed / didn't know). Answer key on the last page — don't look until you're done.</div>
<ol class="qs">`;
  p.qs.forEach(it=>{ q+=`<li>${esc(it.q)}<ul class="opts">`+
    it.o.map((o,i)=>`<li data-k="${KEYLETTER[i]}">${esc(o)}</li>`).join('')+`</ul></li>`; });
  q+=`</ol>`;
  let k=`<div class="key"><h2>Answer key &amp; solutions — ${esc(p.code)} ${esc(p.title)}</h2>
<table><thead><tr><th>Q</th><th>Ans</th><th>Why</th></tr></thead><tbody>`;
  p.qs.forEach((it,i)=>{ k+=`<tr><td>${i+1}</td><td class="a">${KEYLETTER[it.a]}</td><td>${esc(it.s||'')}</td></tr>`; });
  k+=`</tbody></table></div>
<p class="orig">Original practice paper generated for this study tracker (not a CBSE/NTA paper).
Answer keys verified by hand. Modelled on the JEE Main pattern.</p>`;
  fs.writeFileSync(OUT+`sprint-${p.id}.html`, wrap(`${p.subject} — ${p.title} (sprint)`, q+k));
  console.log('wrote sprint-'+p.id+'.html ('+p.qs.length+'Q)');
}

const SPRINTS=[
 {id:'m1',code:'M1',subject:'Mathematics',title:'Relations and Functions',mins:16,qs:[
  {q:'The relation R on {1,2,3} given by R = {(1,1),(2,2),(3,3),(1,2)} is',o:['reflexive and symmetric','reflexive and transitive','symmetric and transitive','an equivalence relation'],a:1,s:'Has all (i,i) so reflexive; (1,2) present but (2,1) absent so not symmetric; no pair breaks transitivity.'},
  {q:'f : R → R, f(x) = 2x + 3 is',o:['one-one but not onto','onto but not one-one','bijective','neither'],a:2,s:'A non-constant linear map on R is one-one and onto.'},
  {q:'The number of one-one functions from a 3-element set to a 4-element set is',o:['12','24','64','81'],a:1,s:'4·3·2 = 24.'},
  {q:'f : R → R, f(x) = x² is',o:['one-one','onto','bijective','neither one-one nor onto'],a:3,s:'f(−1)=f(1) not one-one; negative values not attained, not onto.'},
  {q:'If f(x) = x/(x−1), x ≠ 1, then f(f(x)) equals',o:['x','1/x','x − 1','x/(x−1)'],a:0,s:'Substitute and simplify: f(f(x)) = x.'},
  {q:'The number of reflexive relations on a set with 3 elements is',o:['512','64','8','27'],a:1,s:'2^(n²−n) = 2^6 = 64.'},
  {q:'R is an equivalence relation on A (|A| = 5) with exactly two classes of sizes 2 and 3. The number of ordered pairs in R is',o:['13','25','10','6'],a:0,s:'Within-class pairs: 2² + 3² = 13.'},
  {q:'f : R → R, f(x) = x³ is',o:['one-one but not onto','onto but not one-one','bijective','neither'],a:2,s:'Strictly increasing and onto R.'},
 ]},
 {id:'m5',code:'M5',subject:'Mathematics',title:'Continuity & Differentiability',mins:20,qs:[
  {q:'d/dx [ sin(x²) ] equals',o:['2x cos(x²)','cos(x²)','2 cos(x²)','−2x cos(x²)'],a:0,s:'Chain rule.'},
  {q:'d/dx [ log(sin x) ] equals',o:['cot x','tan x','−cot x','sec x'],a:0,s:'(1/sin x)·cos x = cot x.'},
  {q:'d/dx [ e^(x²) ] equals',o:['2x e^(x²)','e^(x²)','x² e^(x²)','2 e^(x²)'],a:0,s:'Chain rule.'},
  {q:'If y = x^x, then dy/dx equals',o:['x·x^(x−1)','x^x (1 + ln x)','x^x ln x','x^x'],a:1,s:'Logarithmic differentiation: ln y = x ln x.'},
  {q:'The function f(x) = |x| is',o:['differentiable everywhere','continuous everywhere but not differentiable at x = 0','discontinuous at x = 0','not continuous at x = 0'],a:1,s:'Corner at 0: left/right derivatives differ.'},
  {q:'d/dx [ tan⁻¹ x ] equals',o:['1/√(1 − x²)','−1/(1 + x²)','1/(1 + x²)','1/(1 − x²)'],a:2,s:'Standard derivative.'},
  {q:'For x = at², y = 2at, dy/dx equals',o:['1/t','t','2t','1/(2t)'],a:0,s:'(dy/dt)/(dx/dt) = 2a/(2at) = 1/t.'},
  {q:'d/dx [ ln(cos x) ] equals',o:['tan x','−tan x','cot x','−cot x'],a:1,s:'(1/cos x)(−sin x) = −tan x.'},
  {q:'f(x) = x² sin(1/x) for x ≠ 0 and f(0) = 0. At x = 0, f is',o:['differentiable with f′(0) = 0','not continuous','continuous but not differentiable','differentiable with f′(0) = 1'],a:0,s:'f′(0) = lim x·sin(1/x) = 0.'},
  {q:'The value of c in Rolle’s theorem for f(x) = x² − 4 on [−2, 2] is',o:['−1','0','1','2'],a:1,s:'f′(x) = 2x = 0 ⇒ c = 0.'},
 ]},
 {id:'c1',code:'C1',subject:'Chemistry',title:'Solutions',mins:16,qs:[
  {q:'Which of the following is a colligative property?',o:['viscosity','osmotic pressure','surface tension','refractive index'],a:1,s:'Depends only on number of solute particles.'},
  {q:'The van’t Hoff factor i for K₄[Fe(CN)₆] assuming complete dissociation is',o:['2','3','4','5'],a:3,s:'4 K⁺ + 1 [Fe(CN)₆]⁴⁻ = 5 particles.'},
  {q:'The molarity of a solution with 0.5 mol solute in 2 L is',o:['0.5 M','0.25 M','1 M','2 M'],a:1,s:'0.5/2 = 0.25 M.'},
  {q:'Relative lowering of vapour pressure equals the mole fraction of the',o:['solvent','solute','solution','gas'],a:1,s:'Raoult: (p° − p)/p° = x(solute).'},
  {q:'For a 1 molal aqueous solution (Kb = 0.52 K kg mol⁻¹) the boiling point is about',o:['100.00 °C','100.26 °C','100.52 °C','101.04 °C'],a:2,s:'ΔTb = Kb·m = 0.52 K.'},
  {q:'A solution showing positive deviation from Raoult’s law has ΔH(mix)',o:['zero','negative','positive','undefined'],a:2,s:'Weaker A–B interactions ⇒ endothermic mixing.'},
  {q:'The osmotic pressure of a 0.1 M solution at 300 K (R = 0.0821) is about',o:['1.23 atm','2.46 atm','24.6 atm','0.246 atm'],a:1,s:'π = CRT = 0.1·0.0821·300 ≈ 2.46 atm.'},
  {q:'At the same molality, which has the highest boiling point?',o:['glucose','NaCl','CaCl₂','urea'],a:2,s:'Largest van’t Hoff factor (i ≈ 3).'},
 ]},
 {id:'p8',code:'P8',subject:'Physics',title:'Electromagnetic Waves',mins:16,qs:[
  {q:'Electromagnetic waves are',o:['longitudinal','transverse','both longitudinal and transverse','neither'],a:1,s:'E and B oscillate perpendicular to propagation.'},
  {q:'The speed of electromagnetic waves in vacuum equals',o:['1/√(μ₀ε₀)','√(μ₀ε₀)','μ₀ε₀','1/(μ₀ε₀)'],a:0,s:'c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s.'},
  {q:'In an EM wave, E and B are',o:['parallel','mutually perpendicular and perpendicular to the direction of propagation','antiparallel','inclined at 45°'],a:1,s:'E, B and the propagation direction are mutually perpendicular.'},
  {q:'Which has the longest wavelength?',o:['X-rays','visible light','radio waves','gamma rays'],a:2,s:'Radio waves have the largest wavelength of these.'},
  {q:'The ratio E₀/B₀ in an EM wave equals',o:['c','1/c','c²','1'],a:0,s:'Amplitudes are related by E₀ = c B₀.'},
  {q:'Displacement current arises due to',o:['motion of charges','a changing electric field','a changing magnetic field','a steady conduction current'],a:1,s:'i_d = ε₀ dΦ_E/dt.'},
  {q:'Which EM waves are used in RADAR?',o:['infrared','microwaves','ultraviolet','gamma rays'],a:1,s:'Microwaves.'},
  {q:'The ozone layer chiefly absorbs',o:['infrared','ultraviolet','radio waves','microwaves'],a:1,s:'Protects the surface from UV.'},
 ]},
];
SPRINTS.forEach(sprint);

/* ── Diagnostic: convert the vetted repo markdown to printable HTML ── */
function md2html(md){
  const lines=md.replace(/\r/g,'').split('\n'); let out=[],i=0,para=[],list=[];
  const flushP=()=>{ if(para.length){ out.push('<p>'+inline(para.join(' '))+'</p>'); para=[]; } };
  const flushL=()=>{ if(list.length){ out.push('<ul class="md">'+list.map(x=>'<li>'+inline(x)+'</li>').join('')+'</ul>'); list=[]; } };
  function inline(s){ s=esc(s); s=s.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>'); return s; }
  while(i<lines.length){ let ln=lines[i];
    if(/^\s*\|/.test(ln)){ flushP();flushL(); let tb=[]; while(i<lines.length && /^\s*\|/.test(lines[i])){ tb.push(lines[i]); i++; }
      const rows=tb.filter(r=>!/^\s*\|[\s:|-]+\|?\s*$/.test(r)).map(r=>r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim()));
      if(rows.length){ out.push('<table><thead><tr>'+rows[0].map(c=>'<th>'+inline(c)+'</th>').join('')+'</tr></thead><tbody>'+
        rows.slice(1).map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>'); }
      continue; }
    if(/^#{1,3}\s/.test(ln)){ flushP();flushL(); const h=ln.match(/^#+/)[0].length; out.push(`<h${h}>`+inline(ln.replace(/^#+\s/,''))+`</h${h}>`); i++; continue; }
    if(/^---+\s*$/.test(ln)){ flushP();flushL(); out.push('<hr>'); i++; continue; }
    if(/^>\s?/.test(ln)){ flushP();flushL(); out.push('<blockquote>'+inline(ln.replace(/^>\s?/,''))+'</blockquote>'); i++; continue; }
    if(/^\s*[-*]\s+/.test(ln)){ flushP(); list.push(ln.replace(/^\s*[-*]\s+/,'')); i++; continue; }
    if(/^\s*$/.test(ln)){ flushP();flushL(); i++; continue; }
    flushL(); para.push(ln.trim()); i++;
  }
  flushP();flushL(); return out.join('\n');
}
const D=path.join(__dirname,'..','docs')+'/';
const dp=md2html(fs.readFileSync(D+'diagnostic-test-paper.md','utf8'));
fs.writeFileSync(OUT+'diagnostic-week0.html', wrap('Week 0 Diagnostic — question paper',
  dp+'<p class="orig">Rendered from the vetted diagnostic in this repository (docs/diagnostic-test-paper.md).</p>'));
const dk=md2html(fs.readFileSync(D+'diagnostic-marking-key.md','utf8'));
fs.writeFileSync(OUT+'diagnostic-week0-key.html', wrap('Week 0 Diagnostic — marking key (guardian)',
  '<div class="note">For the guardian. Mark Sections A and D mechanically; use the checklists for B and C.</div>'+dk));
console.log('wrote diagnostic-week0.html + diagnostic-week0-key.html');
