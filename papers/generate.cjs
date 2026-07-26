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
 {id:'m2',code:'M2',subject:'Mathematics',title:'Inverse Trigonometric Functions',mins:12,qs:[
  {q:'The principal value of sin⁻¹(1/2) is',o:['π/3','π/6','π/4','5π/6'],a:1,s:'sin(π/6)=1/2 and π/6 lies in [−π/2, π/2].'},
  {q:'tan⁻¹1 + tan⁻¹2 + tan⁻¹3 equals',o:['π/2','π','3π/4','0'],a:1,s:'A standard identity.'},
  {q:'cos⁻¹(−1/2) equals',o:['π/3','5π/6','2π/3','π/6'],a:2,s:'Range of cos⁻¹ is [0, π]; cos(2π/3)=−1/2.'},
  {q:'sin⁻¹(sin 2π/3) equals',o:['2π/3','π/3','−π/3','π/6'],a:1,s:'sin(2π/3)=√3/2 ⇒ sin⁻¹=π/3.'},
  {q:'The domain of cos⁻¹x is',o:['R','[−1, 1]','[0, π]','[−π/2, π/2]'],a:1,s:'Defined only for −1 ≤ x ≤ 1.'},
  {q:'cos⁻¹(cos 7π/6) equals',o:['7π/6','5π/6','π/6','−5π/6'],a:1,s:'2π − 7π/6 = 5π/6, which lies in [0, π].'},
 ]},
 {id:'m3',code:'M3',subject:'Mathematics',title:'Matrices',mins:12,qs:[
  {q:'If A is 2×3 and B is 3×4, the order of AB is',o:['3×4','2×4','2×3','4×2'],a:1,s:'Rows of A × columns of B.'},
  {q:'A matrix that is both symmetric and skew-symmetric is',o:['the identity matrix','the null matrix','a diagonal matrix','an orthogonal matrix'],a:1,s:'A = Aᵀ = −Aᵀ forces every entry to 0.'},
  {q:'The trace of A = [[2, 3],[1, 4]] is',o:['6','5','8','2'],a:0,s:'2 + 4 = 6.'},
  {q:'For any square matrix A, the matrix A + Aᵀ is',o:['skew-symmetric','symmetric','singular','orthogonal'],a:1,s:'(A + Aᵀ)ᵀ = A + Aᵀ.'},
  {q:'If A is 3×3 with |A| = 2, then |Aᵀ| equals',o:['1/2','2','4','8'],a:1,s:'A determinant is unchanged by transpose.'},
  {q:'The number of entries in a 3×3 matrix is',o:['6','9','3','12'],a:1,s:'3 × 3 = 9.'},
 ]},
 {id:'m4',code:'M4',subject:'Mathematics',title:'Determinants',mins:12,qs:[
  {q:'A is 3×3 with |A| = 4. Then |2A| equals',o:['8','16','32','64'],a:2,s:'|kA| = kⁿ|A| = 2³·4 = 32.'},
  {q:'For a 3×3 matrix with |A| = 3, |adj A| equals',o:['3','6','9','27'],a:2,s:'|adj A| = |A|ⁿ⁻¹ = 3² = 9.'},
  {q:'If A is 3×3 with |A| = 5, then |A⁻¹| equals',o:['5','1/5','25','1/25'],a:1,s:'|A⁻¹| = 1/|A|.'},
  {q:'If |A| = 0, then A is',o:['invertible','singular','symmetric','orthogonal'],a:1,s:'No inverse exists.'},
  {q:'The area of the triangle with vertices (0,0), (4,0), (0,3) is',o:['6','12','10','3'],a:0,s:'½ × base × height = ½·4·3 = 6.'},
  {q:'The determinant of the 3×3 identity matrix is',o:['0','1','3','9'],a:1,s:'|I| = 1.'},
 ]},
 {id:'m6',code:'M6',subject:'Mathematics',title:'Application of Derivatives',mins:12,qs:[
  {q:'The function f(x) = x² is increasing on',o:['(−∞, 0)','(0, ∞)','all of R','nowhere'],a:1,s:'f′(x) = 2x > 0 for x > 0.'},
  {q:'The slope of the tangent to y = x³ at x = 2 is',o:['6','8','12','4'],a:2,s:'y′ = 3x² = 12.'},
  {q:'f(x) = x³ − 3x has a local maximum at',o:['x = 1','x = −1','x = 0','x = 3'],a:1,s:'f′=3x²−3=0 ⇒ x=±1; f″=6x<0 at x=−1.'},
  {q:'For y = x², the approximate change dy as x goes 3 → 3.01 is',o:['0.06','0.6','0.03','0.09'],a:0,s:'dy = 2x·dx = 6·0.01 = 0.06.'},
  {q:'A function is decreasing where its derivative is',o:['positive','negative','zero','undefined'],a:1,s:'f′ < 0 ⇒ decreasing.'},
  {q:'The maximum value of f(x) = −(x − 2)² + 5 is',o:['2','5','−5','0'],a:1,s:'Vertex value, at x = 2.'},
 ]},
 {id:'m7',code:'M7',subject:'Mathematics',title:'Integrals',mins:12,qs:[
  {q:'∫₀¹ x² dx equals',o:['1','1/2','1/3','2/3'],a:2,s:'[x³/3]₀¹ = 1/3.'},
  {q:'∫ (1/x) dx equals',o:['ln|x| + C','x²/2 + C','−1/x² + C','1 + C'],a:0,s:'Standard integral.'},
  {q:'∫ eˣ dx equals',o:['eˣ + C','x eˣ + C','eˣ/x + C','ln x + C'],a:0,s:'Standard integral.'},
  {q:'∫₀^{π/2} sin x dx equals',o:['0','1','2','π/2'],a:1,s:'[−cos x]₀^{π/2} = 0 − (−1) = 1.'},
  {q:'∫ sec²x dx equals',o:['tan x + C','sec x + C','−cot x + C','ln|sec x| + C'],a:0,s:'Standard integral.'},
  {q:'∫_{−a}^{a} x³ dx equals',o:['a⁴/4','0','2a⁴','a³'],a:1,s:'Odd function over a symmetric interval.'},
 ]},
 {id:'m8',code:'M8',subject:'Mathematics',title:'Application of Integrals',mins:12,qs:[
  {q:'The area under y = x² from x = 0 to 3 is',o:['9','27','3','6'],a:0,s:'∫₀³ x² dx = 9.'},
  {q:'The area under y = x from x = 0 to 2 is',o:['2','4','1','8'],a:0,s:'∫₀² x dx = 2.'},
  {q:'The area under y = √x from x = 0 to 4 is',o:['16/3','8/3','4','8'],a:0,s:'(2/3)x^{3/2}|₀⁴ = 16/3.'},
  {q:'The area between y = sin x and the x-axis over [0, π] is',o:['1','2','0','π'],a:1,s:'∫₀^π sin x dx = 2.'},
  {q:'The area of the region bounded by y = x² and y = x (0 to 1) is',o:['1/6','1/2','1/3','1/12'],a:0,s:'∫₀¹(x − x²) dx = 1/2 − 1/3 = 1/6.'},
  {q:'Area under a curve is computed using',o:['differentiation','definite integration','limits','matrices'],a:1,s:'By definition.'},
 ]},
 {id:'m9',code:'M9',subject:'Mathematics',title:'Differential Equations',mins:12,qs:[
  {q:'The order of d²y/dx² + y = 0 is',o:['1','2','3','0'],a:1,s:'Highest derivative is second order.'},
  {q:'The degree of (dy/dx)³ + y = 0 is',o:['1','2','3','0'],a:2,s:'Power of the highest-order derivative.'},
  {q:'The solution of dy/dx = y is',o:['y = Ce^x','y = Cx','y = x² + C','y = ln x'],a:0,s:'Variable-separable.'},
  {q:'The integrating factor of dy/dx + y = x is',o:['e^x','e^(−x)','x','1'],a:0,s:'IF = e^{∫1 dx} = e^x.'},
  {q:'A first-order linear DE has the form',o:['dy/dx + Py = Q','y = mx + c','d²y/dx² = 0','dy/dx = y²'],a:0,s:'By definition.'},
  {q:'The general solution of dy/dx = 2x is',o:['y = x² + C','y = 2 + C','y = 2x² + C','y = x + C'],a:0,s:'Integrate 2x.'},
 ]},
 {id:'m10',code:'M10',subject:'Mathematics',title:'Vector Algebra',mins:12,qs:[
  {q:'For a = î + ĵ and b = ĵ + k̂, a·b equals',o:['1','0','2','3'],a:0,s:'0 + 1 + 0 = 1.'},
  {q:'|î × ĵ| equals',o:['0','1','−1','2'],a:1,s:'î × ĵ = k̂, magnitude 1.'},
  {q:'Two vectors are perpendicular when their dot product is',o:['1','0','maximum','negative'],a:1,s:'cos 90° = 0.'},
  {q:'The magnitude of 3î + 4ĵ is',o:['5','7','25','1'],a:0,s:'√(9 + 16) = 5.'},
  {q:'The projection of a on b is',o:['(a·b)/|b|','a × b','|a||b|','(a·b)/|a|'],a:0,s:'Scalar projection formula.'},
  {q:'The scalar triple product [a b c] represents the',o:['area of a triangle','volume of a parallelepiped','angle','length'],a:1,s:'Its magnitude is that volume.'},
 ]},
 {id:'m11',code:'M11',subject:'Mathematics',title:'Three Dimensional Geometry',mins:12,qs:[
  {q:'The direction ratios of the line joining (1,2,3) and (2,4,5) are',o:['(1, 2, 2)','(3, 6, 8)','(1, 1, 1)','(2, 4, 5)'],a:0,s:'Differences of coordinates.'},
  {q:'The distance of the point (1, 2, 2) from the origin is',o:['3','5','9','√5'],a:0,s:'√(1 + 4 + 4) = 3.'},
  {q:'The equation x = 0 represents',o:['the yz-plane','the x-axis','the xy-plane','a single point'],a:0,s:'All points with x-coordinate 0.'},
  {q:'Two lines are perpendicular when a₁a₂ + b₁b₂ + c₁c₂ equals',o:['1','0','−1','∞'],a:1,s:'Dot product of direction ratios is 0.'},
  {q:'Direction cosines satisfy l² + m² + n² =',o:['0','1','2','3'],a:1,s:'A standard identity.'},
  {q:'The number of direction cosines of a line is',o:['2','3','1','4'],a:1,s:'One for each axis.'},
 ]},
 {id:'m13',code:'M13',subject:'Mathematics',title:'Probability',mins:12,qs:[
  {q:'If P(A) = 0.3, P(B) = 0.4 and A, B are independent, then P(A∩B) is',o:['0.12','0.7','0.1','0.07'],a:0,s:'0.3 × 0.4 = 0.12.'},
  {q:'A die is thrown once; P(an even number) is',o:['1/2','1/3','1/6','2/3'],a:0,s:'3 of 6 outcomes.'},
  {q:'If P(A) = 0.6, then P(A′) is',o:['0.4','0.6','1','0.36'],a:0,s:'Complement.'},
  {q:'Two coins are tossed; P(exactly one head) is',o:['1/2','1/4','3/4','1'],a:0,s:'HT and TH out of 4.'},
  {q:'Bayes’ theorem is used to find',o:['conditional (posterior) probability','the mean','the variance','the mode'],a:0,s:'It updates probabilities on evidence.'},
  {q:'For independent events, P(A∩B) equals',o:['P(A) + P(B)','P(A)·P(B)','P(A)/P(B)','P(A|B)'],a:1,s:'Definition of independence.'},
 ]},
 {id:'p1',code:'P1',subject:'Physics',title:'Electric Charges and Fields',mins:12,qs:[
  {q:'The Coulomb force between two point charges is proportional to',o:['1/r','1/r²','r','r²'],a:1,s:'Inverse-square law.'},
  {q:'The SI unit of electric charge is the',o:['coulomb','ampere','volt','farad'],a:0,s:'Base is the coulomb.'},
  {q:'The electric flux through a closed surface enclosing charge q is',o:['q/ε₀','qε₀','q','0'],a:0,s:'Gauss’s law.'},
  {q:'The electric field due to a point charge is proportional to',o:['1/r','1/r²','r','ln r'],a:1,s:'Inverse-square law.'},
  {q:'The net charge enclosed by a Gaussian surface around a dipole is',o:['+q','−q','0','2q'],a:2,s:'+q and −q cancel.'},
  {q:'The electric field due to a positive point charge points',o:['radially inward','radially outward','in circles','nowhere'],a:1,s:'Away from a positive charge.'},
 ]},
 {id:'p2',code:'P2',subject:'Physics',title:'Electrostatic Potential & Capacitance',mins:12,qs:[
  {q:'The SI unit of capacitance is the',o:['farad','coulomb','volt','ohm'],a:0,s:'C = Q/V, unit farad.'},
  {q:'The energy stored in a capacitor is',o:['½CV²','CV','½C/V','CV²'],a:0,s:'U = ½CV².'},
  {q:'For capacitors in series, the equivalent capacitance is',o:['the sum of the capacitances','less than the smallest','greater than the largest','equal to one of them'],a:1,s:'1/C = Σ1/Cᵢ.'},
  {q:'The work done in moving a charge along an equipotential surface is',o:['maximum','zero','negative','infinite'],a:1,s:'No potential difference.'},
  {q:'Inserting a dielectric (K > 1) at constant charge makes the capacitance',o:['increase','decrease','stay the same','become zero'],a:0,s:'C = KC₀.'},
  {q:'The electric potential due to a point charge is proportional to',o:['1/r','1/r²','r','r²'],a:0,s:'V ∝ 1/r.'},
 ]},
 {id:'p3',code:'P3',subject:'Physics',title:'Current Electricity',mins:12,qs:[
  {q:'Ohm’s law states that V equals',o:['IR','I/R','I²R','IR²'],a:0,s:'V = IR.'},
  {q:'The SI unit of resistance is the',o:['ohm','volt','ampere','watt'],a:0,s:'Ohm.'},
  {q:'For resistances in parallel, the equivalent resistance is',o:['the sum','less than the smallest','greater than the largest','equal to one'],a:1,s:'1/R = Σ1/Rᵢ.'},
  {q:'The drift velocity of electrons is proportional to',o:['the applied electric field','1/field','field²','it is independent of the field'],a:0,s:'v_d = (eE/m)τ.'},
  {q:'Kirchhoff’s junction rule expresses conservation of',o:['energy','charge','momentum','mass'],a:1,s:'Current in = current out.'},
  {q:'A Wheatstone bridge is balanced when',o:['P/Q = R/S','P = Q','R = S','PQ = RS'],a:0,s:'No current through the galvanometer.'},
 ]},
 {id:'p4',code:'P4',subject:'Physics',title:'Moving Charges & Magnetism',mins:12,qs:[
  {q:'The force on a charge q moving with velocity v in field B is',o:['q(v × B)','qE','qvB always','q/B'],a:0,s:'Lorentz magnetic force.'},
  {q:'The maximum force on a current-carrying conductor of length L is',o:['BIL','BIL²','I/BL','B/IL'],a:0,s:'F = BIL sinθ, maximum BIL.'},
  {q:'The magnetic field at the centre of a circular current loop is proportional to',o:['the current I','1/I','I²','independent of I'],a:0,s:'B ∝ I.'},
  {q:'The Biot–Savart law gives the',o:['magnetic field due to a current element','electric field','force on a charge','potential'],a:0,s:'dB from I dl.'},
  {q:'A moving-coil galvanometer measures',o:['small currents','voltage only','resistance','power'],a:0,s:'Deflection ∝ current.'},
  {q:'The path of a charged particle moving perpendicular to a uniform magnetic field is a',o:['straight line','circle','parabola','ellipse'],a:1,s:'Constant-speed circular motion.'},
 ]},
 {id:'p5',code:'P5',subject:'Physics',title:'Magnetism & Matter',mins:12,qs:[
  {q:'A material strongly attracted by a magnet is',o:['diamagnetic','paramagnetic','ferromagnetic','non-magnetic'],a:2,s:'Ferromagnetic (e.g. iron).'},
  {q:'Magnetic field lines of a bar magnet emerge from the',o:['south pole','north pole','both poles','centre'],a:1,s:'Outside: N to S.'},
  {q:'Diamagnetic materials are',o:['weakly repelled by a magnet','strongly attracted','unaffected','ferromagnetic'],a:0,s:'Negative susceptibility.'},
  {q:'The magnetic dipole moment of a current loop is',o:['NIA','IL','BIL','I/A'],a:0,s:'m = NIA.'},
  {q:'The relative permeability of a ferromagnetic material is',o:['about 1','slightly less than 1','very large','zero'],a:2,s:'μ_r ≫ 1.'},
  {q:'An isolated magnetic monopole',o:['exists commonly','does not exist','equals a charge','is the same as an electron'],a:1,s:'Poles always occur in pairs.'},
 ]},
 {id:'p6',code:'P6',subject:'Physics',title:'Electromagnetic Induction',mins:12,qs:[
  {q:'Faraday’s law: the induced EMF is proportional to the',o:['rate of change of magnetic flux','flux itself','current','resistance'],a:0,s:'EMF = −dΦ/dt.'},
  {q:'Lenz’s law is a consequence of conservation of',o:['charge','energy','momentum','mass'],a:1,s:'Opposes the change causing it.'},
  {q:'The SI unit of magnetic flux is the',o:['weber','tesla','henry','volt'],a:0,s:'Weber.'},
  {q:'The SI unit of inductance is the',o:['henry','weber','tesla','farad'],a:0,s:'Henry.'},
  {q:'Eddy currents are usefully applied in',o:['induction furnaces and braking','transformers only','fixed resistors','capacitors'],a:0,s:'Induced circulating currents.'},
  {q:'The motional EMF in a rod of length l moving at speed v perpendicular to B is',o:['Blv','B/lv','Bl/v','Blv²'],a:0,s:'ε = Blv.'},
 ]},
 {id:'p7',code:'P7',subject:'Physics',title:'Alternating Current',mins:12,qs:[
  {q:'The RMS value of an AC of peak I₀ is',o:['I₀/√2','I₀√2','I₀','I₀/2'],a:0,s:'I_rms = I₀/√2.'},
  {q:'At resonance in a series LCR circuit, the impedance is',o:['minimum, equal to R','maximum','zero','infinite'],a:0,s:'X_L = X_C cancel.'},
  {q:'The reactance of a capacitor is',o:['1/ωC','ωC','ωL','R'],a:0,s:'X_C = 1/ωC.'},
  {q:'The power factor of a purely inductive circuit is',o:['1','0','0.5','−1'],a:1,s:'cos 90° = 0.'},
  {q:'A transformer works on the principle of',o:['mutual induction','self induction only','Ohm’s law','Coulomb’s law'],a:0,s:'Flux linkage between coils.'},
  {q:'A step-up transformer has more turns in the',o:['primary','secondary','core','none'],a:1,s:'V ∝ N.'},
 ]},
 {id:'p9',code:'P9',subject:'Physics',title:'Ray Optics & Optical Instruments',mins:12,qs:[
  {q:'A concave mirror is a',o:['diverging mirror','converging mirror','plane mirror','lens'],a:1,s:'It converges parallel rays.'},
  {q:'The mirror formula is',o:['1/v + 1/u = 1/f','v + u = f','1/v − 1/u = 1/f','uv = f'],a:0,s:'Standard mirror equation.'},
  {q:'Total internal reflection occurs when light travels from a',o:['rarer to a denser medium','denser to a rarer medium beyond the critical angle','any interface','vacuum only'],a:1,s:'Angle of incidence > critical angle.'},
  {q:'The power of a lens (in dioptres) equals',o:['f','1/f (f in metres)','1/f (f in cm)','f²'],a:1,s:'P = 1/f, f in metres.'},
  {q:'A convex lens is a',o:['diverging lens','converging lens','plane surface','concave mirror'],a:1,s:'It converges light.'},
  {q:'For a prism, deviation is minimum when the ray passes',o:['symmetrically through the prism','along one face','perpendicular to a face','grazing the surface'],a:0,s:'Angle of incidence = angle of emergence.'},
 ]},
 {id:'p10',code:'P10',subject:'Physics',title:'Wave Optics',mins:12,qs:[
  {q:'In Young’s double-slit experiment, the fringe width β equals',o:['dD/λ','λD/d','λd/D','D/λd'],a:1,s:'β = λD/d.'},
  {q:'Interference requires two ... sources',o:['incoherent','coherent','white','random'],a:1,s:'Constant phase difference.'},
  {q:'Diffraction is most pronounced when the slit width is',o:['very large','comparable to the wavelength','zero','infinite'],a:1,s:'Aperture ≈ λ.'},
  {q:'The central fringe in the double-slit pattern is',o:['dark','bright','coloured','absent'],a:1,s:'Zero path difference.'},
  {q:'Light waves are',o:['longitudinal','transverse','mechanical','both'],a:1,s:'E and B are transverse.'},
  {q:'Polarisation confirms that light is',o:['longitudinal','a particle only','transverse','always unpolarised'],a:2,s:'Only transverse waves polarise.'},
 ]},
 {id:'p11',code:'P11',subject:'Physics',title:'Dual Nature of Radiation & Matter',mins:12,qs:[
  {q:'The photoelectric effect shows that light behaves as',o:['waves','particles (photons)','both at once','neither'],a:1,s:'Energy comes in quanta.'},
  {q:'The energy of a photon is',o:['h/ν','hν','ν/h','hc'],a:1,s:'E = hν.'},
  {q:'The stopping potential depends on the',o:['intensity','frequency of the light','distance','area'],a:1,s:'Not on intensity.'},
  {q:'The de Broglie wavelength is',o:['p/h','h/p','hν','h/c'],a:1,s:'λ = h/p.'},
  {q:'The work function is the',o:['maximum kinetic energy','minimum energy to eject an electron','photon energy','always zero'],a:1,s:'Threshold energy.'},
  {q:'Increasing the intensity at the same frequency increases the',o:['maximum KE','number of photoelectrons','frequency','stopping potential'],a:1,s:'More photons, same energy each.'},
 ]},
 {id:'p12',code:'P12',subject:'Physics',title:'Atoms',mins:12,qs:[
  {q:'In Bohr’s model the angular momentum is quantised as',o:['nh','nh/2π','h/2π','2πnh'],a:1,s:'L = nh/2π.'},
  {q:'The Balmer series lies in the ... region',o:['ultraviolet','visible','infrared','X-ray'],a:1,s:'Visible spectrum.'},
  {q:'Rutherford’s scattering experiment used',o:['electrons','alpha particles','neutrons','protons'],a:1,s:'Alpha particles on gold foil.'},
  {q:'The energy of the electron in the nth Bohr orbit is proportional to',o:['n²','−1/n²','1/n','−n'],a:1,s:'Eₙ = −13.6/n² eV.'},
  {q:'The radius of the nth Bohr orbit is proportional to',o:['1/n²','n²','n','1/n'],a:1,s:'rₙ ∝ n².'},
  {q:'The ground-state energy of the hydrogen atom is',o:['+13.6 eV','−13.6 eV','0','−3.4 eV'],a:1,s:'n = 1 level.'},
 ]},
 {id:'p13',code:'P13',subject:'Physics',title:'Nuclei',mins:12,qs:[
  {q:'The nuclear force is',o:['long-range and weak','short-range and strong','gravitational','purely electromagnetic'],a:1,s:'Strong, acts over ~fm.'},
  {q:'In β⁻ decay the emitted particle is',o:['a proton','an electron','a photon','a helium nucleus'],a:1,s:'An electron (with antineutrino).'},
  {q:'Mass defect Δm relates to binding energy by',o:['E = Δm','E = Δmc²','E = Δm/c²','E = mc'],a:1,s:'Einstein’s relation.'},
  {q:'The half-life is the time for the activity to fall to',o:['one-third','half','zero','double'],a:1,s:'Half the initial value.'},
  {q:'Energy is released in fusion because the',o:['mass increases','binding energy per nucleon increases','charge doubles','energy is absorbed'],a:1,s:'Products are more tightly bound.'},
  {q:'Isotopes have the same',o:['mass number','atomic number','number of neutrons','density'],a:1,s:'Same Z, different N.'},
 ]},
 {id:'p14',code:'P14',subject:'Physics',title:'Semiconductor Electronics',mins:12,qs:[
  {q:'At 0 K an intrinsic semiconductor behaves as',o:['a conductor','an insulator','a superconductor','a metal'],a:1,s:'No free carriers at 0 K.'},
  {q:'Doping with a pentavalent impurity gives a',o:['p-type','n-type','intrinsic','insulating'],a:1,s:'Extra electrons.'},
  {q:'A p–n junction diode conducts in',o:['reverse bias','forward bias','both','neither'],a:1,s:'Forward bias lowers the barrier.'},
  {q:'A full-wave rectifier converts',o:['DC to AC','AC to DC','AC to AC','DC to DC'],a:1,s:'Rectification.'},
  {q:'In a p-type semiconductor the majority carriers are',o:['electrons','holes','protons','ions'],a:1,s:'Acceptor doping.'},
  {q:'A Zener diode is used as a',o:['rectifier only','voltage regulator','amplifier','oscillator'],a:1,s:'Operates in reverse breakdown.'},
 ]},
 {id:'c2',code:'C2',subject:'Chemistry',title:'Electrochemistry',mins:12,qs:[
  {q:'Oxidation is the',o:['gain of electrons','loss of electrons','gain of protons','loss of neutrons'],a:1,s:'OIL: oxidation is loss.'},
  {q:'The Nernst equation relates electrode potential to',o:['temperature only','ion concentration','pressure only','mass'],a:1,s:'E depends on concentration.'},
  {q:'In a galvanic cell, reduction occurs at the',o:['anode','cathode','salt bridge','wire'],a:1,s:'Cathode = reduction.'},
  {q:'Faraday’s constant is approximately',o:['6.02×10²³','96500 C/mol','8.314','22.4'],a:1,s:'Charge per mole of electrons.'},
  {q:'Molar conductivity ... on dilution',o:['decreases','increases','is unchanged','becomes zero'],a:1,s:'More complete dissociation.'},
  {q:'The SI unit of cell potential is the',o:['ampere','volt','coulomb','ohm'],a:1,s:'EMF in volts.'},
 ]},
 {id:'c3',code:'C3',subject:'Chemistry',title:'Chemical Kinetics',mins:12,qs:[
  {q:'The rate of a reaction generally ... with temperature',o:['decreases','increases','is unchanged','is zero'],a:1,s:'More effective collisions.'},
  {q:'The unit of the rate constant of a first-order reaction is',o:['mol L⁻¹ s⁻¹','s⁻¹','L mol⁻¹ s⁻¹','mol'],a:1,s:'First order ⇒ s⁻¹.'},
  {q:'The half-life of a first-order reaction is',o:['proportional to the initial concentration','independent of the initial concentration','inversely proportional to it','zero'],a:1,s:'t½ = 0.693/k.'},
  {q:'The order of a reaction can be',o:['only an integer','fractional or integer','only 1','always negative'],a:1,s:'Determined experimentally.'},
  {q:'The Arrhenius equation involves the',o:['pressure','activation energy','volume','colour'],a:1,s:'k = A e^{−Ea/RT}.'},
  {q:'A catalyst speeds up a reaction by',o:['raising the activation energy','lowering the activation energy','adding heat','changing ΔH'],a:1,s:'Provides an alternative path.'},
 ]},
 {id:'c4',code:'C4',subject:'Chemistry',title:'The d- and f-Block Elements',mins:12,qs:[
  {q:'Transition elements have partially filled',o:['s-orbitals','d-orbitals','p-orbitals','f-orbitals only'],a:1,s:'Characteristic d-electrons.'},
  {q:'Transition metals show ... oxidation states',o:['only +2','variable','only +1','no'],a:1,s:'Due to close (n−1)d and ns energies.'},
  {q:'The colour of transition-metal ions is due to',o:['their size','d–d electronic transitions','their mass','s–s transitions'],a:1,s:'Absorption in the visible region.'},
  {q:'Lanthanoid contraction is the steady size decrease across the',o:['3d series','4f (lanthanoid) series','p-block','s-block'],a:1,s:'Poor shielding by 4f electrons.'},
  {q:'A characteristic property of transition metals is',o:['low melting points','catalytic activity','non-metallic character','colourless ions'],a:1,s:'Many act as catalysts.'},
  {q:'Zn²⁺ is colourless because it has',o:['unpaired d electrons','a fully filled d¹⁰ configuration','a half-filled d⁵','empty d-orbitals'],a:1,s:'No d–d transition possible.'},
 ]},
 {id:'c5',code:'C5',subject:'Chemistry',title:'Coordination Compounds',mins:12,qs:[
  {q:'In K₄[Fe(CN)₆], the coordination number of Fe is',o:['4','6','2','3'],a:1,s:'Six CN⁻ ligands.'},
  {q:'NH₃ acts as a',o:['anionic bidentate ligand','neutral monodentate ligand','bridging ligand','chelate'],a:1,s:'One donor N, neutral.'},
  {q:'EDTA is a ... ligand',o:['monodentate','hexadentate','bidentate','neutral'],a:1,s:'Six donor sites.'},
  {q:'Crystal field theory explains the',o:['boiling point','colour and magnetic behaviour','density','molar mass'],a:1,s:'From d-orbital splitting.'},
  {q:'The oxidation state of Ni in [Ni(CO)₄] is',o:['+2','0','+4','−1'],a:1,s:'CO is neutral.'},
  {q:'A strong-field ligand causes',o:['small splitting (high spin)','large splitting (low spin)','no splitting','ionisation'],a:1,s:'Large Δ pairs electrons.'},
 ]},
 {id:'c6',code:'C6',subject:'Chemistry',title:'Haloalkanes & Haloarenes',mins:12,qs:[
  {q:'SN2 reactions proceed with',o:['retention of configuration','inversion of configuration','racemisation','no change'],a:1,s:'Backside attack (Walden inversion).'},
  {q:'SN1 reactions proceed through a',o:['carbanion','carbocation','free radical','carbene'],a:1,s:'Rate-determining ionisation.'},
  {q:'The order of reactivity toward SN1 is',o:['1° > 2° > 3°','3° > 2° > 1°','all equal','only 1°'],a:1,s:'More stable carbocation.'},
  {q:'Haloarenes are ... toward nucleophilic substitution',o:['more reactive than haloalkanes','less reactive than haloalkanes','equally reactive','explosive'],a:1,s:'Partial double-bond character of C–X.'},
  {q:'A chiral molecule',o:['is symmetric','rotates plane-polarised light','is achiral','cannot exist'],a:1,s:'Optically active.'},
  {q:'The best leaving group among these is',o:['F⁻','I⁻','OH⁻','CH₃⁻'],a:1,s:'Iodide is a good leaving group.'},
 ]},
 {id:'c7',code:'C7',subject:'Chemistry',title:'Alcohols, Phenols & Ethers',mins:12,qs:[
  {q:'Phenol is ... than ethanol',o:['less acidic','more acidic','equally acidic','basic'],a:1,s:'Resonance-stabilised phenoxide.'},
  {q:'The Lucas test distinguishes',o:['aldehydes','1°, 2° and 3° alcohols','carboxylic acids','ethers'],a:1,s:'By reaction rate with HCl/ZnCl₂.'},
  {q:'Oxidation of a primary alcohol first gives',o:['a ketone','an aldehyde','an acid directly','an ester'],a:1,s:'1° → aldehyde → acid.'},
  {q:'Phenol’s acidity arises from resonance stabilisation of the',o:['phenol molecule','phenoxide ion','a cation','a radical'],a:1,s:'Negative charge delocalised into the ring.'},
  {q:'Ethers are',o:['highly reactive','relatively inert','strongly acidic','strongly basic'],a:1,s:'Fairly unreactive C–O–C.'},
  {q:'Williamson synthesis is used to prepare',o:['alcohols','ethers','acids','amines'],a:1,s:'Alkoxide + alkyl halide.'},
 ]},
 {id:'c8',code:'C8',subject:'Chemistry',title:'Aldehydes, Ketones & Carboxylic Acids',mins:12,qs:[
  {q:'Aldehydes and ketones contain the',o:['hydroxyl group','carbonyl (C=O) group','carboxyl group','amino group'],a:1,s:'C=O is the functional group.'},
  {q:'The Tollens’ test is positive for',o:['ketones','aldehydes','acids','alcohols'],a:1,s:'Silver mirror with aldehydes.'},
  {q:'Carboxylic acids are ... than alcohols',o:['less acidic','more acidic','equally acidic','basic'],a:1,s:'Resonance-stabilised carboxylate.'},
  {q:'The aldol reaction requires an',o:['no hydrogen','α-hydrogen','aromatic ring','halogen'],a:1,s:'α-H is removed to form the enolate.'},
  {q:'The Cannizzaro reaction is given by aldehydes having',o:['an α-hydrogen','no α-hydrogen','a ring','a halogen'],a:1,s:'e.g. benzaldehyde, HCHO.'},
  {q:'Nucleophilic addition is characteristic of',o:['alkanes','carbonyl compounds','benzene','ethers'],a:1,s:'Polar C=O.'},
 ]},
 {id:'c9',code:'C9',subject:'Chemistry',title:'Amines',mins:12,qs:[
  {q:'Amines are ... in nature',o:['acidic','basic','always neutral','amphoteric'],a:1,s:'Lone pair on nitrogen.'},
  {q:'In aqueous solution aniline is ... than ammonia',o:['more basic','less basic','equally basic','non-basic'],a:1,s:'Lone pair delocalised into the ring.'},
  {q:'Diazonium salts are formed by the ... of primary aromatic amines',o:['oxidation','diazotisation','reduction','hydrolysis'],a:1,s:'With HNO₂/HCl at low temperature.'},
  {q:'In the gas phase the basicity order is generally',o:['NH₃ > all amines','3° > 2° > 1° > NH₃','only 1°','none of these'],a:1,s:'Inductive effect dominates in the gas phase.'},
  {q:'The carbylamine test is given by',o:['secondary amines','primary amines','tertiary amines','amides'],a:1,s:'Primary amines give offensive isocyanides.'},
  {q:'Reduction of a nitro compound gives',o:['an acid','an amine','an alcohol','a ketone'],a:1,s:'–NO₂ → –NH₂.'},
 ]},
 {id:'c10',code:'C10',subject:'Chemistry',title:'Biomolecules',mins:12,qs:[
  {q:'Glucose is a',o:['disaccharide','monosaccharide','polysaccharide','protein'],a:1,s:'A single sugar unit (aldohexose).'},
  {q:'Proteins are polymers of',o:['glucose','amino acids','fatty acids','nucleotides'],a:1,s:'Linked by peptide bonds.'},
  {q:'The bond linking amino acids is the',o:['glycosidic bond','peptide bond','ester bond','ionic bond'],a:1,s:'–CO–NH– amide linkage.'},
  {q:'Starch and cellulose are',o:['monosaccharides','polysaccharides','proteins','lipids'],a:1,s:'Polymers of glucose.'},
  {q:'DNA is built from',o:['amino acids','nucleotides','monosaccharides','fatty acids'],a:1,s:'Base + sugar + phosphate.'},
  {q:'Enzymes are biological',o:['fuels','catalysts','hormones','vitamins'],a:1,s:'They speed up biochemical reactions.'},
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
