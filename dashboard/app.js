const NAV = [
  ['Overview','▦'],['Issuers','◎'],['Records','▤'],['Issuance','＋'],['Revocations','↺'],['Verifications','✓'],['Signing','◇'],['Billing','＄'],['Sales Pipeline','⇢'],['Audit & Security','⌁'],['System Health','●']
];

const state = {
  kpis: [
    ['Paying Issuers','0','Target: 3–5 in 30 days','warn'],
    ['Active Pilots','0','Founding issuer pipeline','warn'],
    ['Implementation Revenue','$0','Target: $4.5K–$15K+','warn'],
    ['Contracted MRR','$0','Target: $897–$1,495+','warn'],
    ['Production Records','1','Target: 500+ paid/pilot records','warn'],
    ['Verifications · 30d','—','Connect authorized metrics source','warn'],
    ['Revocations','0','Lifecycle proof required','warn'],
    ['API Calls · 30d','—','Connect server-side telemetry','warn']
  ],
  pipeline: [
    ['Qualified prospects',100,0],['Demos',10,0],['Proposals',5,0],['Paying issuers',3,0]
  ],
  readiness: [
    ['Public resolver','LIVE','live'],['Verification API','LIVE','live'],['Registry / PostgreSQL','LIVE','live'],['SHA-256 integrity','LIVE','live'],['Authenticated issuance','PENDING','pending'],['Revocation workflow','PENDING','pending'],['Ed25519 signing','PENDING','pending'],['Payment → entitlement','PENDING','pending'],['External paid issuer','BLOCKED','blocked']
  ],
  issuers: [
    ['QR-V Canonical Demo','Demo / Internal','1','—','Pending Ed25519','N/A','Low']
  ],
  mix: [['VERIFIED',0,'good'],['REVOKED',0,'warn'],['EXPIRED',0,'warn'],['NOT_FOUND',0,'bad']],
  actions: [
    'Activate authenticated issuer issuance without bypassing the canonical registry.',
    'Complete record revocation and verify the same public QR-V URL returns REVOKED.',
    'Complete Ed25519 key lifecycle, signing persistence, and verification end-to-end.',
    'Connect payment or approved-pilot entitlement to issuer provisioning.',
    'Onboard the first external issuer and issue production certificate records.',
    'Connect admin metrics to authorized server-side registry, audit, and billing sources.'
  ]
};

function el(tag, cls, text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}

const nav=document.querySelector('#nav');
NAV.forEach(([label,icon],i)=>{const a=el('a','nav-item'+(i===0?' active':''));a.href='#';a.innerHTML=`<span class="nav-icon">${icon}</span><span class="nav-label">${label}</span>`;a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));a.classList.add('active')});nav.appendChild(a)});

const grid=document.querySelector('#kpi-grid');
state.kpis.forEach(([label,value,meta,tone])=>{const card=el('article','kpi');card.append(el('p','eyebrow',label),el('div','value',value),el('div','meta trend '+tone,meta));grid.appendChild(card)});

const pipeline=document.querySelector('#pipeline');
state.pipeline.forEach(([label,target,current])=>{const row=el('div','pipeline-row');const pct=target?Math.min(100,Math.round((current/target)*100)):0;row.innerHTML=`<span>${label}</span><div class="bar"><span style="width:${pct}%"></span></div><strong>${current}/${target}</strong>`;pipeline.appendChild(row)});

const readiness=document.querySelector('#readiness');
state.readiness.forEach(([label,status,tone])=>{const row=el('div','readiness-row');row.append(el('span','',label),el('span','badge '+tone,status));readiness.appendChild(row)});

const issuerTable=document.querySelector('#issuer-table');
state.issuers.forEach(row=>{const tr=document.createElement('tr');row.forEach((cell,i)=>{const td=el('td',i===1?'state warn':'',cell);tr.appendChild(td)});issuerTable.appendChild(tr)});

const mix=document.querySelector('#verification-mix');
const total=Math.max(1,state.mix.reduce((a,x)=>a+x[1],0));
state.mix.forEach(([label,count,tone])=>{const row=el('div','mix-row');row.innerHTML=`<span>${label}</span><div class="bar ${tone}"><span style="width:${Math.round((count/total)*100)}%"></span></div><strong>${count}</strong>`;mix.appendChild(row)});

const actions=document.querySelector('#action-queue');
state.actions.forEach(item=>actions.appendChild(el('li','',item)));

document.querySelector('[data-action="refresh"]').addEventListener('click',()=>location.reload());
document.querySelector('[data-action="issuer"]').addEventListener('click',()=>alert('Wire this action to the authenticated issuer-approval endpoint. Do not perform privileged mutations directly from browser-only code.'));
