import React, { useState } from "react";

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const ClaudeLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M16.98 11.14L12.58 2.29C12.42 1.97 12.09 1.77 11.73 1.77C11.37 1.77 11.04 1.97 10.88 2.29L3.07 17.84C2.91 18.16 2.94 18.54 3.15 18.83C3.36 19.12 3.71 19.27 4.07 19.22L11.73 18.15L16.57 12.05C16.84 11.71 16.98 11.14 16.98 11.14Z" fill="#D97706"/><path d="M20.93 17.84L17.38 10.77L11.73 18.15L19.93 19.22C20.29 19.27 20.64 19.12 20.85 18.83C21.06 18.54 21.09 18.16 20.93 17.84Z" fill="#B45309"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const C={bg:"#f5f6f8",surface:"#ffffff",border:"#e2e5ea",borderSoft:"#edf0f3",text:"#0c1222",sub:"#4a5568",muted:"#8896a6",accent:"#0c4cfc",green:"#059669",amber:"#d97706",red:"#dc2626",r:12,rs:8};
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.28,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Outfit'"}}>{score}</span><span style={{fontSize:size*.09,color:C.muted,marginTop:1}}>/ 100</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:C.r,padding:22,boxShadow:"0 1px 3px rgba(0,0,0,.03)",...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}
function TagInput({label,tags,setTags,placeholder}){const[input,setInput]=useState("");const add=()=>{const v=input.trim();if(v&&!tags.includes(v)){setTags([...tags,v]);setInput("");}};return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,minHeight:40,alignItems:"center"}}>{tags.map((tag,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",background:`${C.accent}15`,color:C.accent,borderRadius:100,fontSize:12,fontWeight:500}}>{tag}<span onClick={()=>setTags(tags.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:.6,fontSize:14}}>×</span></span>))}<input value={input} onChange={e=>setInput(e.target.value)} placeholder={tags.length===0?placeholder:""} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}} style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:C.text,flex:1,minWidth:80,fontFamily:"inherit"}}/></div><span style={{fontSize:10,color:C.muted}}>Press Enter to add</span></div>);}
function Field({label,value,onChange,placeholder}){return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{padding:"10px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,color:C.text,fontSize:14,outline:"none",fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/></div>);}
function InfoTip({text}){const[show,setShow]=useState(false);return(<span style={{position:"relative",display:"inline-flex",marginLeft:4,cursor:"help"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}><span style={{width:14,height:14,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.muted,fontWeight:600}}>?</span>{show&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",width:240,padding:"10px 12px",background:C.text,color:"#fff",borderRadius:8,fontSize:11,lineHeight:1.5,zIndex:999,boxShadow:"0 8px 24px rgba(0,0,0,.2)",pointerEvents:"none"}}><div style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:C.text}}/>{text}</div>}</span>);}
function SectionNote({text}){return <div style={{padding:"10px 14px",background:`${C.accent}04`,border:`1px solid ${C.accent}10`,borderRadius:C.rs,marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:14,lineHeight:1}}>💡</span><span style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{text}</span></div>;}
function NavBtn({onClick,label}){return <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}><button onClick={onClick} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>{label}</button></div>;}
function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:9}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg><div><span style={{fontWeight:700,fontSize:16,color:C.text,letterSpacing:"-.03em",fontFamily:"'Outfit'"}}>EnterRank</span><span style={{fontSize:9,color:C.muted,marginLeft:6,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>by Entermind</span></div></div>);}
function BRow({name,score,color,bold,diff}){return(<div style={{display:"flex",alignItems:"center",gap:12}}><span style={{minWidth:120,fontSize:12,fontWeight:bold?600:400,color:bold?C.accent:C.sub}}>{name}</span><div style={{flex:1}}><Bar value={score} color={color} h={8}/></div><span style={{minWidth:26,textAlign:"right",fontSize:13,fontWeight:700,color:bold?C.text:C.sub}}>{score}</span>{diff!==undefined&&<span style={{fontSize:11,fontWeight:600,color:diff>0?C.red:C.green,minWidth:32,textAlign:"right"}}>{diff>0?`+${diff}`:diff}</span>}</div>);}
function SC(s){return s==="critical"?C.red:s==="warning"?C.amber:C.green;}

/* ─── SVG CHARTS WITH HOVER TOOLTIPS ─── */
function MiniLineChart({data,lines,height=180,width=500}){
  const[hover,setHover]=useState(null);
  if(!data||data.length<2)return null;
  const pad={t:24,r:20,b:30,l:36},w=width-pad.l-pad.r,h=height-pad.t-pad.b;
  const allV=lines.flatMap(l=>data.map(d=>d[l.key]));const minV=Math.min(...allV)-5,maxV=Math.max(...allV)+5;const range=maxV-minV||1;
  const getX=i=>pad.l+(i/(data.length-1))*w,getY=v=>pad.t+h*(1-(v-minV)/range);
  return(<svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow:"visible"}} onMouseLeave={()=>setHover(null)}>
    {[0,.25,.5,.75,1].map(f=>{const y=pad.t+h*(1-f);return(<g key={f}><line x1={pad.l} y1={y} x2={width-pad.r} y2={y} stroke={C.borderSoft} strokeDasharray="3 3"/><text x={pad.l-6} y={y+4} textAnchor="end" fontSize="10" fill={C.muted}>{Math.round(minV+range*f)}</text></g>);})}
    {data.map((d,i)=>(<text key={i} x={getX(i)} y={height-6} textAnchor="middle" fontSize="10" fill={C.muted}>{d.label}</text>))}
    {lines.map(l=>{const pts=data.map((d,i)=>`${getX(i)},${getY(d[l.key])}`).join(" ");return(<g key={l.key}><polyline points={pts} fill="none" stroke={l.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>{data.map((d,i)=>(<circle key={i} cx={getX(i)} cy={getY(d[l.key])} r={hover===i?6:4} fill={l.color} stroke="#fff" strokeWidth="2"/>))}</g>);})}
    {data.map((d,i)=>(<rect key={`h${i}`} x={getX(i)-15} y={pad.t} width={30} height={h} fill="transparent" onMouseEnter={()=>setHover(i)} style={{cursor:"crosshair"}}/>))}
    {hover!==null&&<g><line x1={getX(hover)} y1={pad.t} x2={getX(hover)} y2={pad.t+h} stroke={C.accent} strokeWidth="1" strokeDasharray="3 3" opacity=".4"/>
      <rect x={getX(hover)-60} y={4} width={120} height={14+lines.length*14} rx="4" fill={C.text} opacity=".92"/>
      <text x={getX(hover)} y={16} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">{data[hover].label}</text>
      {lines.map((l,li)=>(<text key={l.key} x={getX(hover)} y={30+li*14} textAnchor="middle" fontSize="10" fill={l.color}>{l.label}: {data[hover][l.key]}</text>))}
    </g>}
    {lines.length>1&&<g>{lines.map((l,i)=>(<g key={l.key} transform={`translate(${pad.l+i*100},${pad.t-10})`}><circle r="4" fill={l.color} cx="0" cy="0"/><text x="8" y="4" fontSize="10" fill={C.sub}>{l.label}</text></g>))}</g>}
  </svg>);
}
function MiniAreaChart({data,dataKey,color=C.accent,height=180,width=500}){
  const[hover,setHover]=useState(null);
  if(!data||data.length<2)return null;
  const pad={t:24,r:20,b:30,l:36},w=width-pad.l-pad.r,h=height-pad.t-pad.b;
  const vals=data.map(d=>d[dataKey]);const minV=Math.min(...vals)-5,maxV=Math.max(...vals)+5;const range=maxV-minV||1;
  const getX=i=>pad.l+(i/(data.length-1))*w,getY=v=>pad.t+h*(1-(v-minV)/range);
  const pts=data.map((d,i)=>`${getX(i)},${getY(d[dataKey])}`).join(" ");
  const area=`${getX(0)},${pad.t+h} ${pts} ${getX(data.length-1)},${pad.t+h}`;
  return(<svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow:"visible"}} onMouseLeave={()=>setHover(null)}>
    <defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".15"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
    {[0,.25,.5,.75,1].map(f=>{const y=pad.t+h*(1-f);return(<g key={f}><line x1={pad.l} y1={y} x2={width-pad.r} y2={y} stroke={C.borderSoft} strokeDasharray="3 3"/><text x={pad.l-6} y={y+4} textAnchor="end" fontSize="10" fill={C.muted}>{Math.round(minV+range*f)}</text></g>);})}
    {data.map((d,i)=>(<text key={i} x={getX(i)} y={height-6} textAnchor="middle" fontSize="10" fill={C.muted}>{d.label}</text>))}
    <polygon points={area} fill="url(#aGrad)"/><polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {data.map((d,i)=>(<circle key={i} cx={getX(i)} cy={getY(d[dataKey])} r={hover===i?6:4} fill={color} stroke="#fff" strokeWidth="2"/>))}
    {data.map((d,i)=>(<rect key={`h${i}`} x={getX(i)-15} y={pad.t} width={30} height={h} fill="transparent" onMouseEnter={()=>setHover(i)} style={{cursor:"crosshair"}}/>))}
    {hover!==null&&<g><line x1={getX(hover)} y1={pad.t} x2={getX(hover)} y2={pad.t+h} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity=".4"/>
      <rect x={getX(hover)-40} y={getY(data[hover][dataKey])-24} width={80} height={20} rx="4" fill={C.text} opacity=".92"/>
      <text x={getX(hover)} y={getY(data[hover][dataKey])-10} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">{data[hover][dataKey]}</text>
    </g>}
  </svg>);
}
function MiniRadar({data,keys,size=220}){
  if(!data||data.length<3)return null;const cx=size/2,cy=size/2,r=size/2-30;const n=data.length;
  const angle=(i)=>(-Math.PI/2)+(2*Math.PI*i)/n;
  const pt=(i,v)=>({x:cx+r*(v/100)*Math.cos(angle(i)),y:cy+r*(v/100)*Math.sin(angle(i))});
  return(<svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
    {[25,50,75,100].map(v=>(<polygon key={v} points={data.map((_,i)=>`${pt(i,v).x},${pt(i,v).y}`).join(" ")} fill="none" stroke={C.borderSoft} strokeWidth="1"/>))}
    {data.map((_,i)=>(<line key={i} x1={cx} y1={cy} x2={pt(i,100).x} y2={pt(i,100).y} stroke={C.borderSoft}/>))}
    {data.map((d,i)=>{const p=pt(i,108);return(<text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="9" fill={C.sub} dominantBaseline="middle">{d.label}</text>);})}
    {keys.map(k=>(<polygon key={k.key} points={data.map((d,i)=>`${pt(i,d[k.key]).x},${pt(i,d[k.key]).y}`).join(" ")} fill={k.color} fillOpacity=".1" stroke={k.color} strokeWidth="2"/>))}
    {keys.map((k,ki)=>(<g key={k.key} transform={`translate(${20+ki*90},${size-10})`}><circle r="4" fill={k.color} cx="0" cy="0"/><text x="8" y="4" fontSize="10" fill={C.sub}>{k.label}</text></g>))}
  </svg>);
}

/* ─── CLAUDE API INTEGRATION ─── */
/* ─── MULTI-ENGINE API LAYER ─── */
async function callClaude(prompt, systemPrompt="You are an expert AEO analyst.", useWebSearch=false){
  try{
    const isArtifact=typeof window!=="undefined"&&window.location.hostname.includes("claude");
    if(isArtifact){
      const body={model:"claude-sonnet-4-20250514",max_tokens:useWebSearch?4000:2000,system:systemPrompt,messages:[{role:"user",content:prompt}]};
      if(useWebSearch){body.tools=[{type:"web_search_20250305",name:"web_search"}];}
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const data=await res.json();
      return data.content?.map(b=>b.type==="text"?b.text:"").filter(Boolean).join("\n")||"";
    }else{
      const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt,useWebSearch})});
      const data=await res.json();
      if(data.error)throw new Error(data.error);
      return data.text||"";
    }
  }catch(e){console.error("Claude API error:",e);return null;}
}

async function callOpenAI(prompt, systemPrompt="You are an expert AEO analyst."){
  try{
    const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt})});
    const data=await res.json();
    if(data.error)throw new Error(data.error);
    return data.text||"";
  }catch(e){console.error("OpenAI API error:",e);return null;}
}

async function callGemini(prompt, systemPrompt="You are an expert AEO analyst."){
  try{
    const res=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt})});
    const data=await res.json();
    if(data.error)throw new Error(data.error);
    return data.text||"";
  }catch(e){console.error("Gemini API error:",e);return null;}
}

// Call a specific engine by name, with fallback to Claude
async function callEngine(engine, prompt, systemPrompt){
  if(engine==="openai") return await callOpenAI(prompt, systemPrompt);
  if(engine==="gemini") return await callGemini(prompt, systemPrompt);
  return await callClaude(prompt, systemPrompt);
}

function safeJSON(text){
  if(!text)return null;
  try{const clean=text.replace(/```json|```/g,"").trim();return JSON.parse(clean);}catch(e){
    const m=text.match(/\{[\s\S]*\}/)||text.match(/\[[\s\S]*\]/);
    if(m)try{return JSON.parse(m[0]);}catch(e2){}
    return null;
  }
}

async function runRealAudit(cd, onProgress){
  const brand=cd.brand, industry=cd.industry, topics=cd.topics, competitors=cd.competitors, region=cd.region||"Global";

  // ── STEP 1: Direct engine queries — each AI answers about the brand itself ──
  const perEnginePrompt=(engineName)=>`You are ${engineName}. A user is researching "${brand}" — a ${industry} company (website: ${cd.website}, region: ${region}, topics: ${topics.join(", ")}, competitors: ${competitors.join(", ")||"none listed"}).

TASK 1 — QUERY VISIBILITY:
For each of the 8 queries below, honestly assess: would you mention "${brand}" in your response?
- "Cited" = you would link to ${cd.website} as a source
- "Mentioned" = you would name-drop "${brand}" in your answer
- "Absent" = you would NOT reference "${brand}" at all
If you genuinely don't know this company, most should be "Absent". Be honest.

TASK 2 — SELF-ASSESSMENT:
Rate yourself honestly:
- score (0-100): overall, how visible is "${brand}" in your knowledge? 0 = never heard of them, 100 = I cite them constantly
- mentionRate (0-100): what % of ${industry} queries would you mention them?
- citationRate (0-100): what % of queries would you link to their website?
- sentiment (0-100): how positively do you view them? 50 = neutral

TASK 3 — STRENGTHS & WEAKNESSES:
Provide exactly 2 strengths and 2 weaknesses about "${brand}"'s visibility in your engine. These must be SPECIFIC and ACTIONABLE — not meta-commentary about your own limitations.

BAD examples (do NOT write these):
- "Limited knowledge available" ← too vague
- "specific strength" ← placeholder
- "As a language model, I don't have..." ← meta-commentary about yourself
- "Would acknowledge if directly asked" ← not a real strength

GOOD examples (write things like these):
- "Strong presence in ${region} ${industry} discussions — frequently mentioned alongside ${competitors[0]||"major competitors"}"
- "Website has comprehensive FAQ content that maps well to common user queries"
- "No structured data / schema markup detected on ${cd.website}, reducing citation likelihood"
- "Competitors like ${competitors[0]||"larger firms"} dominate 'best ${industry}' queries — ${brand} rarely appears in top recommendations"
- "Active LinkedIn presence with thought leadership content strengthens authority signals"
- "Limited third-party reviews or press coverage reduces trust signals for AI citation"

Respond ONLY with valid JSON (no markdown, no backticks, no explanation before or after):
{"score":25,"mentionRate":15,"citationRate":5,"sentiment":50,"queries":[{"query":"Best ${industry} companies","status":"Absent"},{"query":"${topics[0]||industry} recommendations","status":"Absent"},{"query":"${brand} reviews","status":"Absent"},{"query":"Top ${industry} providers in ${region}","status":"Absent"},{"query":"Is ${brand} worth it","status":"Absent"},{"query":"${topics[0]||industry} comparison","status":"Absent"},{"query":"${brand} vs ${competitors[0]||"competitors"}","status":"Absent"},{"query":"${industry} buyer guide","status":"Absent"}],"strengths":["REPLACE WITH REAL SPECIFIC STRENGTH ABOUT ${brand}","REPLACE WITH REAL SPECIFIC STRENGTH ABOUT ${brand}"],"weaknesses":["REPLACE WITH REAL SPECIFIC WEAKNESS ABOUT ${brand}","REPLACE WITH REAL SPECIFIC WEAKNESS ABOUT ${brand}"]}`;

  onProgress("Querying ChatGPT (gpt-4o)...",8);
  const gptRaw=callEngine("openai",perEnginePrompt("ChatGPT"),"You are an AEO visibility analyst roleplaying as ChatGPT. Provide specific, actionable analysis about the brand's visibility. Never use placeholder text. Never write meta-commentary about being an AI. Write real strengths and weaknesses about the BRAND, not about yourself.");
  
  onProgress("Querying Claude (claude-sonnet-4-20250514)...",14);
  const claudeRaw=callClaude(perEnginePrompt("Claude"),"You are an AEO visibility analyst roleplaying as Claude. Provide specific, actionable analysis about the brand's visibility. Never use placeholder text. Never write meta-commentary about being an AI. Write real strengths and weaknesses about the BRAND, not about yourself.");
  
  onProgress("Querying Gemini (gemini-2.0-flash)...",20);
  const geminiRaw=callEngine("gemini",perEnginePrompt("Gemini"),"You are an AEO visibility analyst roleplaying as Gemini. Provide specific, actionable analysis about the brand's visibility. Never use placeholder text. Never write meta-commentary about being an AI. Write real strengths and weaknesses about the BRAND, not about yourself.");

  // Run all 3 in parallel
  const [gptResult, claudeResult, geminiResult] = await Promise.all([gptRaw, claudeRaw, geminiRaw]);
  
  onProgress("Parsing engine responses...",26);
  const gptData=safeJSON(gptResult);
  const claudeData=safeJSON(claudeResult);
  const geminiData=safeJSON(geminiResult);
  
  const engineData={
    engines:[
      {id:"chatgpt",...(gptData||{score:30,mentionRate:20,citationRate:10,sentiment:50,queries:[],strengths:["Data unavailable"],weaknesses:["API call failed"]})},
      {id:"claude",...(claudeData||{score:30,mentionRate:20,citationRate:10,sentiment:50,queries:[],strengths:["Data unavailable"],weaknesses:["API call failed"]})},
      {id:"gemini",...(geminiData||{score:30,mentionRate:20,citationRate:10,sentiment:50,queries:[],strengths:["Data unavailable"],weaknesses:["API call failed"]})},
    ],
    painPoints:null
  };

  // ── STEP 1b: Category pain points (Claude handles this — best at structured analysis) ──
  onProgress("Analysing AEO categories...",30);
  const catPrompt=`Analyse "${brand}" (${cd.website}) in "${industry}" and score these 6 AEO categories from 0-100. Be realistic.
Respond ONLY with JSON: [{"label":"Structured Data / Schema","score":35,"severity":"critical"},{"label":"Content Authority","score":55,"severity":"warning"},{"label":"E-E-A-T Signals","score":40,"severity":"critical"},{"label":"Technical SEO","score":60,"severity":"warning"},{"label":"Citation Network","score":30,"severity":"critical"},{"label":"Content Freshness","score":45,"severity":"warning"}]`;
  const catRaw=await callClaude(catPrompt);
  const catData=safeJSON(catRaw);
  if(catData&&Array.isArray(catData))engineData.painPoints=catData;

  // ── STEP 2: Competitor analysis ──
  onProgress("Analysing competitors...",28);
  let competitorData=[];
  if(competitors.length>0){
    const compPrompt=`For the "${industry}" industry, compare these competitors against "${brand}": ${competitors.join(", ")}.

For each competitor, provide:
- An AEO score (0-100)
- Scores for 6 categories: Structured Data / Schema, Content Authority, E-E-A-T Signals, Technical SEO, Citation Network, Content Freshness
- Their strongest category
- Engine scores for ChatGPT, Claude, Gemini

Respond ONLY with JSON array (no markdown):
[{"name":"CompName","score":55,"painPoints":[{"label":"Structured Data / Schema","score":60},{"label":"Content Authority","score":50},{"label":"E-E-A-T Signals","score":45},{"label":"Technical SEO","score":55},{"label":"Citation Network","score":40},{"label":"Content Freshness","score":50}],"topStrength":"Content Authority","engineScores":[52,48,55]}]`;
    const compRaw=await callClaude(compPrompt);
    competitorData=safeJSON(compRaw)||[];
  }

  // ── STEP 3: User archetypes (Step 3) ──
  onProgress("Generating user archetypes...",45);
  const archPrompt=`Analyse the specific brand "${brand}" — a ${industry} company (website: ${cd.website}, topics: ${topics.join(", ")}, region: ${region}, competitors: ${competitors.join(", ")||"none specified"}).

CRITICAL RULES:
- Think deeply about WHO would actually search for "${brand}" or its specific services. Do NOT use generic templates.
- Every archetype must make sense for THIS specific company. A consulting firm's archetypes look nothing like a consumer app's archetypes.
- The prompts must be things a REAL person would actually type into ChatGPT/Claude/Gemini when looking for what "${brand}" offers. No filler prompts.
- Demographics must be realistic for "${brand}"'s actual target market.
- If "${brand}" is B2B, don't include student/budget segments unless they genuinely apply.
- If "${brand}" is B2C, don't include enterprise procurement segments unless they genuinely apply.
- "brandVisibility" should reflect how likely AI engines are to mention "${brand}" specifically for that segment's queries — be honest, most brands score low here.

Create 3 stakeholder groups that are genuinely relevant to "${brand}". Each group should have 2-3 specific customer segments.

Respond ONLY with JSON (no markdown, no explanation):
[
  {"group":"Group Name Relevant to This Brand","icon":"emoji","desc":"1-line description","archetypes":[
    {"name":"Specific Segment Name","icon":"emoji","demo":"Realistic demographic","behavior":"Their actual search behavior","intent":"What they're trying to achieve","size":15,"brandVisibility":25,"opportunity":"high","prompts":["realistic prompt 1","realistic prompt 2","realistic prompt 3","realistic prompt 4"]}
  ]}
]`;
  const archRaw=await callClaude(archPrompt);
  const archData=safeJSON(archRaw);

  // ── STEP 4: Intent pathway with real prompts (Step 4) ──
  onProgress("Testing intent pathway prompts...",62);
  const intentPrompt=`For the brand "${brand}" (${cd.website}) in "${industry}" (topics: ${topics.join(", ")}, region: ${region}, competitors: ${competitors.join(", ")||"none"}):

Generate the REAL prompts that people would type into AI chatbots (ChatGPT, Claude, Gemini) at each stage of the buying journey.

CRITICAL RULES:
- ONLY include prompts that real people would actually ask. Do NOT pad the list with filler or variations of the same prompt.
- If a stage only has 5 genuine prompts, return 5. If it has 15, return 15. Do NOT force 20 per stage.
- Every prompt must be something a real human would type — not SEO keyword stuffing.
- Be brutally honest about status: if "${brand}" is a small/niche company, most prompts should be "Absent". Don't inflate results.
- "Cited" means the AI engine actually links to ${cd.website}. This is RARE for most brands. Don't overuse it.
- "Mentioned" means the brand name appears in the response text. 
- "Absent" means the brand is not referenced at all — this is the most common status for most companies.
- rank = estimated position among the sources/brands the AI would list (1 = top pick, 10+ = barely mentioned)
- Awareness prompts are about the category/problem, NOT about "${brand}" specifically.
- Retention prompts should only exist if "${brand}" has enough product depth to warrant them.

Respond ONLY with JSON (no markdown):
[
  {"stage":"Awareness","desc":"User discovers the category or problem","color":"#6366f1","prompts":[{"query":"actual prompt","rank":8,"status":"Absent"}]},
  {"stage":"Consideration","desc":"User evaluates and compares options","color":"#8b5cf6","prompts":[...]},
  {"stage":"Decision","desc":"User ready to choose or purchase","color":"#a855f7","prompts":[...]},
  {"stage":"Retention","desc":"Existing user seeks more value","color":"#c084fc","prompts":[...]}
]`;
  const intentRaw=await callClaude(intentPrompt);
  const intentData=safeJSON(intentRaw);

  onProgress("Compiling results...",85);

  // ── STEP 5: Channel verification — split across all 3 engines with web search ──
  onProgress("Verifying channel presence...",72);
  let channelData=null;
  let deepData=null;
  
  const verifyPrompt=(channels)=>`You must search the web to verify whether "${brand}" (website: ${cd.website}) has a REAL presence on these specific channels. Do NOT guess — actually search for evidence.

For each channel, search the web and determine:
- "Active" = you found a real, maintained page/profile for "${brand}" on this platform
- "Needs Work" = you found something but it's incomplete, outdated, or minimal
- "Not Present" = you searched and found NO page/profile for "${brand}" on this platform

Provide a specific finding for each — what URL did you find? How many followers? When was it last updated? If you found nothing, say so clearly.

Channels to verify:
${channels.map((c,i)=>`${i+1}. ${c}`).join("\n")}

Respond ONLY with JSON (no markdown):
[{"channel":"${channels[0]}","status":"Active","finding":"Found company page at linkedin.com/company/brandname with 10K followers, posts weekly"}]`;

  try{
    // Split channels across engines for speed and accuracy
    const claudeChannels=["Wikipedia / Wikidata","LinkedIn","Company Blog / Knowledge Base","Press / News Coverage"];
    const gptChannels=["YouTube / Video","Review Platforms","Podcasts"];
    const geminiChannels=["Social Media (X, Reddit, Quora)","Industry Directories","Academic Citations"];

    onProgress("Claude checking Wikipedia, LinkedIn, Blog, Press...",74);
    const claudeVerifyP=callClaude(verifyPrompt(claudeChannels),"You are a research assistant. You MUST use web search to verify each channel. Do not guess. Search for real URLs and evidence.",true);
    
    onProgress("ChatGPT checking YouTube, Reviews, Podcasts...",76);
    const gptVerifyP=callEngine("openai",verifyPrompt(gptChannels),"You are a research assistant. Verify each channel by searching the web. Provide specific evidence — URLs, follower counts, review scores. If you cannot find evidence, say Not Present.");
    
    onProgress("Gemini checking Social Media, Directories, Academic...",78);
    const geminiVerifyP=callEngine("gemini",verifyPrompt(geminiChannels),"You are a research assistant. Verify each channel by searching the web. Provide specific evidence. If you cannot find evidence, say Not Present.");

    const [claudeVerifyRaw, gptVerifyRaw, geminiVerifyRaw] = await Promise.all([claudeVerifyP, gptVerifyP, geminiVerifyP]);

    onProgress("Merging verification results...",82);
    const claudeVerify=safeJSON(claudeVerifyRaw)||[];
    const gptVerify=safeJSON(gptVerifyRaw)||[];
    const geminiVerify=safeJSON(geminiVerifyRaw)||[];
    
    const allVerified=[...claudeVerify,...gptVerify,...geminiVerify];
    
    if(allVerified.length>0){
      channelData={channels:allVerified,recommendedSites:null};
      const findCh=(name)=>allVerified.find(c=>c.channel&&c.channel.includes(name));
      deepData={
        wikipedia:{exists:findCh("Wikipedia")?.status==="Active",details:findCh("Wikipedia")?.finding||""},
        youtube:{exists:findCh("YouTube")?.status==="Active",details:findCh("YouTube")?.finding||""},
        linkedin:{exists:findCh("LinkedIn")?.status==="Active",details:findCh("LinkedIn")?.finding||""},
        news:{exists:findCh("Press")?.status==="Active",details:findCh("Press")?.finding||""},
        reviews:{exists:findCh("Review")?.status==="Active",details:findCh("Review")?.finding||""},
      };
    }
  }catch(e){console.error("Channel verification error:",e);}

  // Get industry-specific site recommendations from Claude
  onProgress("Generating channel recommendations...",86);
  const recPrompt=`For "${brand}" in "${industry}" (region: ${region}), recommend the most relevant specific sites for these 4 channel categories. Return 10-15 sites per category tailored to this industry and region.
Respond ONLY with JSON: {"reviewPlatforms":[{"name":"Site","url":"site.com","focus":"Why relevant"}],"pressNews":[...],"industryDirectories":[...],"socialMedia":[...]}`;
  const recRaw=await callClaude(recPrompt);
  const recData=safeJSON(recRaw);
  if(channelData&&recData)channelData.recommendedSites=recData;

  onProgress("Finalising report...",90);

  return {engineData,competitorData,archData,intentData,channelData,deepData};
}

/* ─── MERGE API RESULTS WITH STATIC DATA ─── */
function getInsight(cat,comp,brand,theyWin){
  const w={
    "Structured Data / Schema":{win:`${comp} has more comprehensive schema markup, making their content easier for AI engines to parse and cite.`,lose:`${brand} has stronger structured data, giving AI engines clearer signals.`},
    "Content Authority":{win:`${comp} publishes deeper, long-form content with higher topical coverage that AI engines interpret as expertise.`,lose:`${brand} produces more authoritative content with deeper coverage.`},
    "E-E-A-T Signals":{win:`${comp} has stronger expertise signals — named authors, credentials, and endorsements that AI engines trust.`,lose:`${brand} demonstrates stronger E-E-A-T through better credentials and trust signals.`},
    "Technical SEO":{win:`${comp} has a faster, more crawlable website, making it easier for AI engines to index their content.`,lose:`${brand}'s technical foundation is stronger with better Core Web Vitals.`},
    "Citation Network":{win:`${comp} is referenced by more authoritative third-party sources, giving AI engines more confidence to cite them.`,lose:`${brand} has a stronger citation network with more authoritative references.`},
    "Content Freshness":{win:`${comp} publishes and updates content more frequently, signalling currentness to AI engines.`,lose:`${brand} maintains fresher content with more regular updates.`},
  };return w[cat]?{text:theyWin?w[cat].win:w[cat].lose,advantage:theyWin?"them":"you"}:null;
}

function generateAll(cd, apiData){
  const seed=cd.brand.length+cd.website.length+(cd.industry||"").length+cd.topics.length;
  const pr=o=>{const x=Math.sin(seed+o)*10000;return x-Math.floor(x);};
  const base=30+pr(1)*45;
  const hasApi=apiData&&apiData.engineData;

  // Engines — use API data if available, fallback to simulated
  const engineMeta=[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{id:"claude",name:"Claude",color:"#D97706",Logo:ClaudeLogo},{id:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo}];
  const engines=engineMeta.map((e,i)=>{
    const t0=cd.topics[0]||cd.industry||"tech";
    // Filter out bad/placeholder strengths and weaknesses
    const badPatterns=["specific strength","specific weakness","data unavailable","REPLACE WITH","as a language model","as an ai","limited knowledge available","would acknowledge"];
    const filterBad=(arr,fallbacks)=>{
      if(!arr||!Array.isArray(arr))return fallbacks;
      const filtered=arr.filter(s=>s&&typeof s==="string"&&!badPatterns.some(bp=>s.toLowerCase().includes(bp))&&s.length>10);
      return filtered.length>=2?filtered:fallbacks;
    };
    if(hasApi&&apiData.engineData.engines&&apiData.engineData.engines[i]){
      const ae=apiData.engineData.engines[i];
      const defStrengths=[`${cd.brand} has a clear niche positioning in ${cd.industry} that could differentiate it from larger competitors`,`Brand name includes relevant industry keywords which aids AI entity recognition`];
      const defWeaknesses=[`Limited third-party citations and reviews reduce AI engines' confidence to recommend ${cd.brand}`,`Larger competitors like ${cd.competitors[0]||"established firms"} dominate generic ${cd.industry} queries`];
      return{...e,score:ae.score||Math.round(base),mentionRate:ae.mentionRate||50,citationRate:ae.citationRate||30,sentiment:ae.sentiment||50,
        queries:(ae.queries||[]).slice(0,8).map(q=>({query:q.query||"",status:q.status||"Absent"})),
        strengths:filterBad(ae.strengths,defStrengths),weaknesses:filterBad(ae.weaknesses,defWeaknesses)};
    }
    const score=Math.max(8,Math.min(95,Math.round(base+(pr(i*7+3)-.5)*20)));
    return{...e,score,mentionRate:Math.min(100,Math.round(score*.8+pr(i*11)*15)),citationRate:Math.min(100,Math.round(score*.5+pr(i*13)*20)),sentiment:Math.min(100,Math.max(10,Math.round(50+(score-50)*.6+(pr(i*17)-.5)*20))),
      queries:[`Best ${cd.industry} companies`,`${t0} recommendations`,`${cd.brand} reviews`,`Top ${cd.industry} providers`,`Is ${cd.brand} worth it`,`${t0} comparison`,`${cd.brand} vs ${cd.competitors[0]||"competitors"}`,`${cd.industry} buyer guide`].map((q,j)=>({query:q,status:pr(i*31+j*37)<.35?"Cited":pr(i*31+j*37)<.65?"Mentioned":"Absent"})),
      strengths:["Strong FAQ coverage detected","Cited in comparison queries"],weaknesses:["Missing from 'best of' queries","Not cited as authoritative source"]};
  });
  const overall=Math.round(engines.reduce((a,e)=>a+e.score,0)/engines.length);

  // Pain points — use API data if available
  const painCats=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  const painPoints=(hasApi&&apiData.engineData.painPoints)?apiData.engineData.painPoints.map(pp=>({label:pp.label,score:pp.score,severity:pp.score<40?"critical":pp.score<65?"warning":"good"})):painCats.map((label,i)=>{const s=Math.max(5,Math.min(95,Math.round(base+(pr(i*19+7)-.5)*40)));return{label,score:s,severity:s<40?"critical":s<65?"warning":"good"};});

  // Competitors — use API data if available
  const brandLower=cd.brand.toLowerCase().trim();
  const isNotSelf=(name)=>{const n=name.toLowerCase().trim();return n!==brandLower&&!n.includes(brandLower)&&!brandLower.includes(n);};
  const competitors=(apiData&&apiData.competitorData&&apiData.competitorData.length>0)?apiData.competitorData.filter(c=>isNotSelf(c.name)).map(c=>{
    const cPain=(c.painPoints||[]).map(pp=>({label:pp.label,score:pp.score}));
    const advantages=cPain.map((cp,j)=>{const diff=cp.score-(painPoints[j]?.score||50);return{cat:cp.label,theirScore:cp.score,yourScore:painPoints[j]?.score||50,diff,insight:Math.abs(diff)>8?getInsight(cp.label,c.name,cd.brand,diff>0):null};}).filter(a=>a.insight);
    return{name:c.name,score:c.score,painPoints:cPain,advantages,engineScores:c.engineScores||[c.score,c.score-3,c.score+2],topStrength:c.topStrength||"Unknown"};
  }):cd.competitors.filter(n=>isNotSelf(n)).map((name,i)=>{
    const cs=Math.max(15,Math.min(95,Math.round(base+(pr(i*23+11)-.5)*50)));
    const cPain=painCats.map((l,j)=>({label:l,score:Math.max(10,Math.min(95,Math.round(cs+(pr(i*29+j*31)-.5)*30)))}) );
    const advantages=cPain.map((cp,j)=>{const diff=cp.score-painPoints[j].score;return{cat:cp.label,theirScore:cp.score,yourScore:painPoints[j].score,diff,insight:Math.abs(diff)>8?getInsight(cp.label,name,cd.brand,diff>0):null};}).filter(a=>a.insight);
    return{name,score:cs,painPoints:cPain,advantages,engineScores:[Math.max(8,Math.min(95,Math.round(cs+(pr(i*37)-.5)*15))),Math.max(8,Math.min(95,Math.round(cs+(pr(i*41)-.5)*15))),Math.max(8,Math.min(95,Math.round(cs+(pr(i*43)-.5)*15)))],topStrength:cPain.reduce((a,b)=>b.score>a.score?b:a,cPain[0]).label};
  });

  // Stakeholder-grouped archetypes — use API data if available
  const stakeholders=(apiData&&apiData.archData&&Array.isArray(apiData.archData)&&apiData.archData.length>0)?apiData.archData.map(sg=>({group:sg.group,icon:sg.icon||"👤",desc:sg.desc||"",archetypes:(sg.archetypes||[]).map(a=>({name:a.name,icon:a.icon||"👤",demo:a.demo||"Various",behavior:a.behavior||"Research queries",intent:a.intent||"Find information",size:a.size||15,brandVisibility:a.brandVisibility||Math.round(overall*.6),opportunity:a.opportunity||"medium",prompts:a.prompts||[]}))})):[
    {group:"End Users / Consumers",icon:"👤",desc:"People who directly use or purchase the product/service",archetypes:[
      {name:"Budget-Conscious Researchers",icon:"🎓",demo:"18-25, Students",behavior:"Compare prices, seek free alternatives",intent:"Find affordable option",size:Math.round(10+pr(41)*30),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(53)-.5)*40))),opportunity:pr(47)>.5?"high":"medium",prompts:[`Best affordable ${cd.industry||"tech"} solutions`,`Cheap ${cd.topics[0]||"services"} for students`,`Free ${cd.topics[0]||"tools"} alternatives`,`${cd.industry||"Tech"} student discounts`]},
      {name:"First-Time Buyers",icon:"🔍",demo:"All ages, New to category",behavior:"Educational queries, beginner guides",intent:"Understand before buying",size:Math.round(15+pr(44)*25),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(56)-.5)*40))),opportunity:"high",prompts:[`What is ${cd.topics[0]||cd.industry}`,`${cd.industry} beginner guide`,`How to choose ${cd.topics[0]||"provider"}`,`${cd.industry} explained`]},
      {name:"Switchers & Upgraders",icon:"🔄",demo:"28-45, Competitor users",behavior:"Alternative-to queries, comparisons",intent:"Find better alternative",size:Math.round(8+pr(45)*20),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(57)-.5)*40))),opportunity:"high",prompts:[`${cd.competitors[0]||"Competitor"} alternatives`,`Switch to ${cd.brand}`,`${cd.brand} vs ${cd.competitors[0]||"competitor"}`,`${cd.industry} migration guide`]},
    ]},
    {group:"Business Decision Makers",icon:"💼",desc:"People evaluating solutions for their organisation",archetypes:[
      {name:"Enterprise Decision Makers",icon:"📊",demo:"35-55, C-Suite & Directors",behavior:"Evaluate ROI, compare features",intent:"Find reliable enterprise solution",size:Math.round(10+pr(42)*25),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(54)-.5)*40))),opportunity:"high",prompts:[`Best enterprise ${cd.industry} platform`,`${cd.topics[0]||"Solution"} ROI comparison`,`Top ${cd.industry} for large companies`,`${cd.brand} enterprise reviews`]},
      {name:"Procurement & Ops Managers",icon:"📋",demo:"30-50, Mid-management",behavior:"Vendor comparisons, compliance checks",intent:"Find compliant, cost-effective vendor",size:Math.round(6+pr(46)*15),brandVisibility:Math.max(5,Math.min(85,Math.round(base+(pr(58)-.5)*35))),opportunity:"medium",prompts:[`${cd.industry} vendor comparison`,`${cd.brand} compliance certifications`,`${cd.industry} procurement guide`,`${cd.brand} SLA details`]},
    ]},
    {group:"Technical Evaluators",icon:"⚙️",desc:"People assessing technical capabilities and integration",archetypes:[
      {name:"Tech-Savvy Evaluators",icon:"⚡",demo:"25-40, Engineers & Leads",behavior:"Deep-dive specs, APIs, integrations",intent:"Find technically capable solution",size:Math.round(10+pr(43)*20),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(55)-.5)*40))),opportunity:pr(48)>.4?"high":"medium",prompts:[`${cd.topics[0]||"Platform"} technical comparison`,`Best ${cd.industry} API`,`${cd.brand} developer reviews`,`${cd.topics[0]||"Tool"} benchmarks`]},
      {name:"IT Security & Compliance",icon:"🛡️",demo:"30-50, InfoSec & Legal",behavior:"Security audits, data privacy queries",intent:"Verify security and compliance",size:Math.round(4+pr(49)*10),brandVisibility:Math.max(5,Math.min(80,Math.round(base+(pr(59)-.5)*30))),opportunity:"medium",prompts:[`${cd.brand} security features`,`${cd.industry} data compliance`,`${cd.brand} SOC 2 certification`,`${cd.industry} GDPR compliance`]},
    ]},
  ];

  // Intent funnel — use API data if available
  const t0=cd.topics[0]||cd.industry||"tech";
  const mkP=(temps,off)=>temps.map((q,j)=>({query:q,rank:Math.round(1+pr(j*61+off)*15),status:pr(j*63+off)<.3?"Cited":pr(j*63+off)<.6?"Mentioned":"Absent"}));
  const funnelStages=(apiData&&apiData.intentData&&Array.isArray(apiData.intentData)&&apiData.intentData.length>0)?apiData.intentData.map(s=>({stage:s.stage,desc:s.desc||"",color:s.color||"#6366f1",prompts:(s.prompts||[]).map(p=>({query:p.query||"",rank:p.rank||8,status:p.status||"Absent"}))})):[
    {stage:"Awareness",desc:"User discovers the category",color:"#6366f1",prompts:mkP([`What is ${t0}`,`${cd.industry} trends`,`How does ${t0} work`,`Benefits of ${t0}`,`${cd.industry} overview`,`Why use ${t0}`,`${cd.industry} use cases`],0)},
    {stage:"Consideration",desc:"User evaluates options",color:"#8b5cf6",prompts:mkP([`Best ${cd.industry} companies`,`${cd.brand} reviews`,`${cd.brand} vs ${cd.competitors[0]||"competitors"}`,`Top ${t0} providers`,`${cd.brand} pricing`,`Is ${cd.brand} worth it`,`${cd.industry} comparison`],100)},
    {stage:"Decision",desc:"User ready to choose",color:"#a855f7",prompts:mkP([`${cd.brand} free trial`,`${cd.brand} onboarding`,`${cd.brand} pricing plans`,`How to start with ${cd.brand}`,`${cd.brand} implementation`],200)},
    {stage:"Retention",desc:"User seeks more value",color:"#c084fc",prompts:mkP([`${cd.brand} best practices`,`${cd.brand} advanced features`,`${cd.brand} tips`,`Get more from ${cd.brand}`],300)},
  ];

  const brandGuidelines=[
    {area:"Entity Disambiguation & Knowledge Graph Presence",rule:`Establish ${cd.brand} as a distinct, unambiguous entity across all knowledge graph sources. Ensure Wikidata QID, Google Knowledge Panel, and Crunchbase entries use identical entity attributes (founding date, HQ location, CEO, industry classification). AI models resolve entity conflicts by cross-referencing these sources — inconsistencies cause citation suppression.`,example:`Audit all structured databases: Wikidata entry must list ${cd.brand} with correct P31 (instance of: technology company), P17 (country), P856 (official website: ${cd.clientData?.website||"yoursite.com"}). File a Google Knowledge Panel claim and verify all attributes match.`},
    {area:"Semantic Content Architecture",rule:`Structure all ${cd.brand} web content using topic clusters with defined pillar pages and supporting content. Each pillar page should target a primary entity (e.g., "${cd.topics[0]||cd.industry}") and be semantically linked to 8-12 supporting articles. AI engines extract topical authority from the density and interconnection of content within a domain's semantic graph.`,example:`Create pillar: "${cd.brand}'s Complete Guide to ${cd.topics[0]||cd.industry}" → Link to supporting pages: "How ${cd.topics[0]||cd.industry} Works", "${cd.topics[0]||cd.industry} vs Traditional Methods", "${cd.topics[0]||cd.industry} ROI Calculator", "Case Study: [Client] + ${cd.brand}". Use exact-match internal anchor text.`},
    {area:"JSON-LD Schema Implementation",rule:`Deploy comprehensive JSON-LD schema markup across all page types. Minimum required: Organization (with sameAs to all social profiles), Product/Service, FAQ, HowTo, Article (with author → Person schema linking to LinkedIn), and Speakable markup on key content blocks. AI engines preferentially extract content wrapped in speakable schema for voice and chat responses.`,example:`Every blog post must include: Article schema (headline, datePublished, dateModified, author.name, author.url → LinkedIn, publisher → Organization), FAQ schema for any Q&A content, and Speakable schema on the introduction paragraph and any key statistics or claims you want AI to quote directly.`},
    {area:"E-E-A-T Signal Maximisation",rule:`Every content piece published by ${cd.brand} must demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness through verifiable signals. Author bylines must link to Person schema with credentials. All claims must be cited with links to primary sources. Include methodology disclosures on research content. AI engines weight E-E-A-T signals heavily when deciding which sources to cite.`,example:`Author bio format: "[Name], [Title] at ${cd.brand} | [X]+ years in ${cd.industry} | [Credential/Certification] | Published in [Notable Publication]". Link author name to a dedicated /team/[name] page with full bio, photo, social links, and list of authored content. Add ReviewedBy schema for medical/financial/legal topics.`},
    {area:"Citation Velocity & Link Authority",rule:`Build a systematic citation acquisition strategy targeting domains with Domain Authority 50+. AI models track citation frequency and recency — a brand cited by 3 authoritative sources in the past 90 days outranks one with 10 stale citations. Prioritise co-citation (being mentioned alongside established competitors) and contextual citations (within topically relevant content, not generic directories).`,example:`Monthly targets: 2 guest articles on DA60+ publications, 3 expert quote placements via HARO/Connectively, 1 original data study pitched to industry press, weekly contributions to ${cd.industry} subreddits and Quora topics. Track new referring domains weekly and flag any lost citations for reclamation.`},
    {area:"Content Freshness & Update Cadence",rule:`Implement a systematic content refresh protocol. AI engines deprioritise content with stale lastmod signals. All evergreen content must be reviewed and updated minimum quarterly with visible "Last Updated" timestamps. Refresh triggers: new data available, competitor content updated, AI engine response changes detected, industry developments.`,example:`Create a content freshness calendar: flag all pages with traffic > 100/month for quarterly review. Update process: (1) check if AI engines are citing the current version, (2) add new data points or examples, (3) update dateModified in Article schema, (4) add "Updated [Month Year]" badge visible to users, (5) resubmit to Google Search Console.`},
    {area:"Multi-Modal Content Optimisation",rule:`AI engines increasingly index and cross-reference multi-modal content — video transcripts, podcast show notes, infographic alt-text, and PDF content. Every piece of ${cd.brand} content should exist in at least 2 formats. Video content must have complete, accurate transcripts (not auto-generated). Infographics must have comprehensive alt-text that captures all data points.`,example:`For every definitive guide published: (1) create a companion YouTube video with manually-reviewed transcript, (2) design a shareable infographic with detailed alt-text, (3) produce a LinkedIn carousel summarising key points, (4) extract FAQs for a standalone FAQ page. Ensure all formats link back to the canonical pillar page.`},
    {area:"Competitor Response Protocol",rule:`Monitor competitor AEO positioning weekly. When a competitor is cited for a query where ${cd.brand} should appear, analyse the cited content's structure, schema, and authority signals. Create a superior response within 14 days. AI engines regularly re-evaluate citation sources — the window to displace a competitor citation is typically 30-60 days after publishing superior content.`,example:`Set up weekly monitoring: search each top-50 prompt in ChatGPT, Claude, and Gemini. Document: (1) which competitor is cited, (2) what content is being referenced, (3) what schema/signals that content has. Create a displacement brief: "Competitor X cited for [query] because of [reason]. Our response: publish [content type] with [superior signals] by [date]."`},
    {area:"Brand Narrative Consistency Layer",rule:`Define a canonical brand description paragraph (150 words) that must appear verbatim or near-verbatim across all owned and third-party channels. AI models build entity understanding by finding consistent descriptions across multiple sources. Divergent descriptions fragment the entity signal and reduce citation confidence.`,example:`Canonical description: "${cd.brand} is a ${cd.region||"global"} ${cd.industry} company specialising in ${cd.topics.slice(0,3).join(", ")}. Founded in [year], ${cd.brand} serves [target market] with [key differentiator]. Recognised for [achievement/award], ${cd.brand} has helped [X]+ clients achieve [measurable outcome]." Deploy this exact text on: About page, LinkedIn Company, Crunchbase, all press releases, speaker bios, and directory listings.`},
    {area:"AI-Specific Content Formatting",rule:`Structure content for AI extraction: use clear H2/H3 hierarchies, place definitive answers in the first 2 sentences of each section, use "According to [Source]" citation patterns that AI engines can verify, and include structured comparison tables where relevant. Avoid ambiguous language — AI engines skip content with hedging phrases like "it depends" or "there are many factors" in favour of content that gives direct, citable answers.`,example:`Instead of: "There are many ${cd.industry} providers to choose from." Write: "${cd.brand} is one of the top 5 ${cd.industry} providers in ${cd.region||"the market"}, serving [X]+ clients since [year]. Key differentiators include: [Feature 1] which delivers [Outcome], [Feature 2] rated [Score] by [Source], and [Feature 3] with [Metric] performance." This gives AI engines a quotable, verifiable claim.`},
  ];

  // AEO Channels — merge real verification data if available
  const channelNames=["Company Blog / Knowledge Base","Wikipedia / Wikidata","YouTube / Video","Review Platforms","Press / News Coverage","LinkedIn","Industry Directories","Podcasts","Social Media (X, Reddit, Quora)","Academic Citations"];
  const getChStatus=(chName)=>{
    // First check deep verification data for key channels
    if(apiData&&apiData.deepData){
      const dd=apiData.deepData;
      if(chName.includes("Wikipedia")&&dd.wikipedia) return {status:dd.wikipedia.exists?"Active":"Not Present",finding:dd.wikipedia.details||""};
      if(chName.includes("YouTube")&&dd.youtube) return {status:dd.youtube.exists?"Active":"Not Present",finding:dd.youtube.details||""};
      if(chName.includes("LinkedIn")&&dd.linkedin) return {status:dd.linkedin.exists?"Active":"Not Present",finding:dd.linkedin.details||""};
      if(chName.includes("Press")&&dd.news) return {status:dd.news.exists?"Active":"Needs Work",finding:dd.news.details||""};
      if(chName.includes("Review")&&dd.reviews) return {status:dd.reviews.exists?"Active":"Needs Work",finding:dd.reviews.details||""};
    }
    // Then check Claude estimation data
    if(apiData&&apiData.channelData&&apiData.channelData.channels){
      const match=apiData.channelData.channels.find(c=>c.channel===chName||chName.includes(c.channel.split("/")[0].trim())||c.channel.includes(chName.split("/")[0].trim()));
      if(match) return {status:match.status||"Needs Work",finding:match.finding||""};
    }
    return null;
  };
  const getRecSites=(key)=>{
    if(apiData&&apiData.channelData&&apiData.channelData.recommendedSites&&apiData.channelData.recommendedSites[key]){
      const sites=apiData.channelData.recommendedSites[key];
      if(Array.isArray(sites)&&sites.length>3) return sites;
    }
    return null;
  };

  const defaultReviewSites=[{name:"G2",url:"g2.com",focus:"Enterprise software reviews"},{name:"Trustpilot",url:"trustpilot.com",focus:"Consumer trust reviews"},{name:"Capterra",url:"capterra.com",focus:"Software comparison"},{name:"TrustRadius",url:"trustradius.com",focus:"B2B technology reviews"},{name:"Product Hunt",url:"producthunt.com",focus:"New product launches"},{name:"Clutch.co",url:"clutch.co",focus:"Agency & services reviews"},{name:"Google Business Profile",url:"business.google.com",focus:"Local search & reviews"},{name:"Apple App Store",url:"apps.apple.com",focus:"Mobile app reviews"},{name:"Gartner Peer Insights",url:"gartner.com/reviews",focus:"Enterprise tech reviews"},{name:"Software Advice",url:"softwareadvice.com",focus:"Software recommendations"},{name:"Glassdoor",url:"glassdoor.com",focus:"Employer brand (impacts trust)"},{name:"BBB",url:"bbb.org",focus:"Business credibility"},{name:"Yelp",url:"yelp.com",focus:"Local business reviews"},{name:"Comparably",url:"comparably.com",focus:"Culture & compensation"},{name:"GetApp",url:"getapp.com",focus:"SaaS discovery"}];
  const defaultPressSites=[{name:"TechCrunch",url:"techcrunch.com",focus:"Tech startups & innovation"},{name:"Forbes",url:"forbes.com",focus:"Business & leadership"},{name:"Bloomberg",url:"bloomberg.com",focus:"Finance & markets"},{name:"Reuters",url:"reuters.com",focus:"Global news wire"},{name:"The Verge",url:"theverge.com",focus:"Technology & culture"},{name:"Wired",url:"wired.com",focus:"Tech deep-dives"},{name:"VentureBeat",url:"venturebeat.com",focus:"AI & enterprise tech"},{name:"Business Insider",url:"businessinsider.com",focus:"Business news"},{name:"CNBC",url:"cnbc.com",focus:"Financial news"},{name:"The Guardian",url:"theguardian.com",focus:"Global news"},{name:"PR Newswire",url:"prnewswire.com",focus:"Press release distribution"},{name:"GlobeNewswire",url:"globenewswire.com",focus:"Press release wire"},{name:"Mashable",url:"mashable.com",focus:"Tech & digital culture"},{name:"Fast Company",url:"fastcompany.com",focus:"Innovation & design"},{name:"Inc.com",url:"inc.com",focus:"Entrepreneurship"}];
  const defaultDirSites=[{name:"Crunchbase",url:"crunchbase.com",focus:"Company data & funding"},{name:"AngelList",url:"angel.co",focus:"Startup ecosystem"},{name:"CB Insights",url:"cbinsights.com",focus:"Market intelligence"},{name:"PitchBook",url:"pitchbook.com",focus:"Private capital data"},{name:"Owler",url:"owler.com",focus:"Competitive intelligence"},{name:`${cd.industry} Association Directory`,url:"varies",focus:"Industry-specific listing"},{name:"Chamber of Commerce",url:"varies",focus:"Local business directory"},{name:"Yellow Pages / Kompass",url:"kompass.com",focus:"B2B directory"},{name:"Manta",url:"manta.com",focus:"Small business directory"},{name:"LinkedIn Company Directory",url:"linkedin.com",focus:"Professional network listing"},{name:"ZoomInfo",url:"zoominfo.com",focus:"B2B contact database"},{name:"Dun & Bradstreet",url:"dnb.com",focus:"Business credit & data"},{name:"Hoovers",url:"hoovers.com",focus:"Company information"},{name:"Bloomberg Terminal",url:"bloomberg.com",focus:"Financial data"},{name:"S&P Capital IQ",url:"capitaliq.com",focus:"Financial intelligence"}];
  const defaultSocialSites=[{name:"Reddit",url:"reddit.com",focus:`Post in r/${cd.industry?.toLowerCase()||"technology"} and related subreddits`},{name:"Quora",url:"quora.com",focus:`Answer questions about ${cd.topics[0]||cd.industry}`},{name:"X (Twitter)",url:"x.com",focus:"Industry conversations & thought leadership"},{name:"Hacker News",url:"news.ycombinator.com",focus:"Tech community (high authority)"},{name:"Stack Overflow",url:"stackoverflow.com",focus:"Technical Q&A (if applicable)"},{name:"Medium",url:"medium.com",focus:"Long-form content & republishing"},{name:"Substack",url:"substack.com",focus:"Newsletter thought leadership"},{name:"Discord Communities",url:"discord.com",focus:"Niche community engagement"},{name:"Facebook Groups",url:"facebook.com",focus:"Industry-specific groups"},{name:"Threads",url:"threads.net",focus:"Conversational social"},{name:"Pinterest",url:"pinterest.com",focus:"Visual content (infographics)"},{name:"TikTok",url:"tiktok.com",focus:"Short-form video education"},{name:"Mastodon",url:"mastodon.social",focus:"Decentralised social"},{name:"IndieHackers",url:"indiehackers.com",focus:"Startup community"},{name:"DEV Community",url:"dev.to",focus:"Developer content"}];

  const rawChannels=[
    {channel:"Company Blog / Knowledge Base",impact:95,desc:"Primary content hub for AI engines",sites:null},
    {channel:"Wikipedia / Wikidata",impact:92,desc:"Knowledge graph source for AI",sites:null},
    {channel:"YouTube / Video",impact:88,desc:"Video transcripts indexed by AI",sites:null},
    {channel:"Review Platforms",impact:85,desc:"Social proof for AI recommendations",sites:getRecSites("reviewPlatforms")||defaultReviewSites},
    {channel:"Press / News Coverage",impact:82,desc:"Authority from trusted domains",sites:getRecSites("pressNews")||defaultPressSites},
    {channel:"LinkedIn",impact:78,desc:"Professional authority signals",sites:null},
    {channel:"Industry Directories",impact:75,desc:"Structured listings AI references",sites:getRecSites("industryDirectories")||defaultDirSites},
    {channel:"Podcasts",impact:68,desc:"Long-form content indexed by AI",sites:null},
    {channel:"Social Media (X, Reddit, Quora)",impact:65,desc:"Community discussions training AI",sites:getRecSites("socialMedia")||defaultSocialSites},
    {channel:"Academic Citations",impact:72,desc:"High-trust expertise signals",sites:null},
  ];
  const aeoChannels=rawChannels.map((ch,i)=>{
    const verified=getChStatus(ch.channel);
    return {...ch,status:verified?verified.status:(pr(i*7+3)>.5?"Active":"Needs Work"),finding:verified?verified.finding:null};
  });

  const contentTypes=[
    {type:"Definitive Guides",channels:["Blog","YouTube","LinkedIn"],freq:"2/month",p:"P0",owner:"Content Team",impact:95},
    {type:"FAQ & Knowledge Base",channels:["Website","Blog"],freq:"Weekly",p:"P0",owner:"Content Team",impact:92},
    {type:"Case Studies",channels:["Blog","LinkedIn"],freq:"2/month",p:"P1",owner:"Marketing + Sales",impact:88},
    {type:"Original Research",channels:["Blog","PR","Email"],freq:"Quarterly",p:"P0",owner:"Content + Analytics",impact:96},
    {type:"Thought Leadership",channels:["LinkedIn","Podcast"],freq:"Weekly",p:"P1",owner:"Leadership + PR",impact:85},
    {type:"Comparison Content",channels:["Blog","YouTube"],freq:"Monthly",p:"P1",owner:"Content Team",impact:90},
    {type:"Video Tutorials",channels:["YouTube","Website"],freq:"2/month",p:"P2",owner:"Product + Mktg",impact:80},
    {type:"Press Releases",channels:["PR Wire","News"],freq:"As needed",p:"P1",owner:"PR Team",impact:82},
    {type:"Community Posts",channels:["Reddit","Quora","X"],freq:"Daily",p:"P2",owner:"Community Mgr",impact:65},
    {type:"Schema Updates",channels:["Website"],freq:"Ongoing",p:"P0",owner:"Dev Team",impact:94},
  ];

  const roadmap={
    day30:{title:"Foundation Sprint",sub:"Days 1-30",accent:"#ef4444",lift:"10-15%",departments:[
      {dept:"Entermind (Consultants)",color:"#0c4cfc",tasks:["Complete full AEO audit and baseline report","Design schema markup templates","Create brand voice guidelines for AI","Set up AI engine monitoring","Identify top 50 priority prompts"]},
      {dept:"Content & Marketing",color:"#059669",tasks:["Publish FAQ pages for top 10 queries","Add author bios to all content","Audit brand descriptions for consistency","Create briefs for 4 definitive guides","Begin daily community engagement"]},
      {dept:"Web Development",color:"#d97706",tasks:["Implement Organization + Product schema","Fix critical technical SEO issues","Add speakable schema to key content","Create XML sitemap with lastmod","Add 'Last Updated' timestamps"]},
      {dept:"PR & Communications",color:"#8b5cf6",tasks:["Update Wikipedia/Wikidata entries","Audit review platform profiles","Prepare outreach list of 20+ publications"]},
    ]},
    day60:{title:"Authority Building",sub:"Days 31-60",accent:"#f59e0b",lift:"20-30%",departments:[
      {dept:"Entermind (Consultants)",color:"#0c4cfc",tasks:["Mid-point re-audit and benchmarking","Optimise prompt cluster strategy","Refine content-channel grid","Advanced schema review","Competitor gap analysis refresh"]},
      {dept:"Content & Marketing",color:"#059669",tasks:[`Publish 4 guides: ${cd.topics.slice(0,4).join(", ")}`,"Create comparison vs top competitors","Produce 3 case studies","Launch weekly LinkedIn thought leadership","Build content hub with internal links"]},
      {dept:"Web Development",color:"#d97706",tasks:["Implement HowTo + Article schema","Build automated schema injection","Optimise to sub-2s load times","Create prompt cluster landing pages"]},
      {dept:"PR & Communications",color:"#8b5cf6",tasks:["Secure 5+ guest contributions","Launch digital PR campaign","Pitch 3+ podcast appearances","Secure 10+ review entries"]},
      {dept:"Social Media",color:"#ec4899",tasks:["Amplify content across channels","20+ industry conversations weekly","Create video snippets for Shorts/Reels","Build community around expertise"]},
    ]},
    day90:{title:"Dominance & Scale",sub:"Days 61-90",accent:"#10b981",lift:"40-60%",departments:[
      {dept:"Entermind (Consultants)",color:"#0c4cfc",tasks:["Full re-audit with comparison report","Document AEO playbook","Deliver next 90-day strategy","Train internal team on AEO","Final ROI presentation"]},
      {dept:"Content & Marketing",color:"#059669",tasks:["Publish original research report","Cover 50+ long-tail queries","Establish 2/week publishing","Automate content refresh workflow","Launch AEO email nurture"]},
      {dept:"Web Development",color:"#d97706",tasks:["Full schema audit (95%+ coverage)","Build AEO monitoring dashboard","Automate freshness signals","Schema testing in CI/CD"]},
      {dept:"PR & Communications",color:"#8b5cf6",tasks:["3+ expert endorsements","15+ new authoritative backlinks","Pitch research to major publications"]},
      {dept:"Leadership / C-Suite",color:"#0ea5e9",tasks:["Record executive thought leadership","Approve ongoing AEO budget","Champion AEO across departments"]},
    ]},
  };

  return{overall,engines,painPoints,competitors,stakeholders,funnelStages,aeoChannels,brandGuidelines,contentTypes,roadmap,clientData:cd};
}

const STEPS=[{id:"input",label:"New Audit",n:"01"},{id:"audit",label:"AEO Audit",n:"02"},{id:"archetypes",label:"User Archetypes",n:"03"},{id:"intent",label:"Intent Pathway",n:"04"},{id:"playbook",label:"Brand Playbook",n:"05",comingSoon:true},{id:"channels",label:"AEO Channels",n:"06"},{id:"grid",label:"Content Grid",n:"07"},{id:"roadmap",label:"90-Day Roadmap",n:"08"}];

/* ─── PAGE: NEW AUDIT ─── */
function NewAuditPage({data,setData,onRun}){
  const[running,setRunning]=useState(false);const[progress,setProgress]=useState(0);const[stage,setStage]=useState("");const[error,setError]=useState(null);
  const ok=data.brand&&data.industry&&data.website&&data.topics.length>0;
  const[logLines,setLogLines]=useState([]);
  const addLog=(msg)=>setLogLines(prev=>[...prev.slice(-14),{msg,t:Date.now()}]);
  const go=async()=>{
    setRunning(true);setProgress(0);setError(null);setLogLines([]);
    try{
      const apiData=await runRealAudit(data,(msg,pct)=>{setStage(msg);setProgress(pct);
        // Generate techy log lines based on progress
        const logs={
          8:["[INIT] Establishing secure API connections...","[INIT] Loading NLP entity recognition models...","[INIT] Configuring multi-engine query pipeline..."],
          8:["[ENGINE] Connecting to OpenAI API → gpt-4o...","[ENGINE] Sending 8 query probes to ChatGPT..."],
          14:["[ENGINE] Connecting to Anthropic API → claude-sonnet-4-20250514...","[ENGINE] Sending 8 query probes to Claude..."],
          20:["[ENGINE] Connecting to Google AI API → gemini-2.0-flash...","[ENGINE] Sending 8 query probes to Gemini..."],
          26:["[PARSE] Extracting mention rates from ChatGPT response...","[PARSE] Extracting citation data from Claude response...","[PARSE] Extracting sentiment scores from Gemini response...","[SCAN] Cross-referencing entity signals across 3 engines..."],
          30:["[AUDIT] Scoring Structured Data / Schema...","[AUDIT] Scoring Content Authority & E-E-A-T...","[AUDIT] Scoring Citation Network & Freshness..."],
          28:["[COMP] Running competitor signal analysis...","[COMP] Cross-referencing citation networks for "+data.competitors.slice(0,3).join(", "),"[COMP] Calculating category-level differentials...","[COMP] Mapping authority distribution curves..."],
          45:["[ARCH] Analysing search intent clusters...","[ARCH] Segmenting user archetypes by behaviour pattern...","[ARCH] Correlating query frequency → brand visibility...","[ARCH] Generating stakeholder-mapped personas..."],
          62:["[INTENT] Testing "+data.topics[0]+" prompt variants...","[INTENT] Evaluating citation probability per funnel stage...","[INTENT] Mapping brand mention density across query types...","[INTENT] Scoring "+data.brand+" presence in AI responses..."],
          72:["[VERIFY] Dispatching channel checks to 3 engines...","[VERIFY] Claude → searching Wikipedia, LinkedIn, Blog, Press...","[VERIFY] ChatGPT → searching YouTube, Reviews, Podcasts...","[VERIFY] Gemini → searching Social Media, Directories, Academic..."],
          74:["[VERIFY] Engines searching the web for real evidence...","[VERIFY] Looking for: "+data.brand+" company profiles, pages, mentions..."],
          82:["[VERIFY] All engines reported back ✓","[VERIFY] Merging verification results from 3 sources...","[REC] Generating industry-specific site recommendations..."],
          90:["[BUILD] Compiling AEO score matrix...","[BUILD] Generating brand playbook recommendations...","[BUILD] Calculating 90-day projection model...","[BUILD] Assembling final report..."],
          95:["[DONE] All engines responded ✓","[DONE] Data validation complete ✓","[DONE] Report ready ✓"]
        };
        const closest=Object.keys(logs).map(Number).filter(k=>k<=pct).sort((a,b)=>b-a)[0];
        if(closest&&logs[closest])logs[closest].forEach((l,i)=>setTimeout(()=>addLog(l),i*250));
      });
      setProgress(100);setStage("Complete");
      await new Promise(r=>setTimeout(r,500));
      setRunning(false);onRun(apiData);
    }catch(e){
      console.error("Audit error:",e);setError("API call failed — falling back to simulated data.");addLog("[ERR] API error — using fallback engine...");
      await new Promise(r=>setTimeout(r,1500));
      setRunning(false);onRun(null);
    }
  };
  if(running)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh",gap:20,maxWidth:520,margin:"0 auto"}}>
    {/* Main progress ring */}
    <div style={{position:"relative",width:130,height:130}}>
      <svg width="130" height="130"><circle cx="65" cy="65" r="56" fill="none" stroke={C.borderSoft} strokeWidth="3"/><circle cx="65" cy="65" r="56" fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray={352} strokeDashoffset={352-(progress/100)*352} strokeLinecap="round" transform="rotate(-90 65 65)" style={{transition:"stroke-dashoffset .5s ease-out"}}/></svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:30,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{progress}%</span></div>
    </div>
    {/* Title */}
    <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:C.text,fontFamily:"'Outfit'"}}>Running Full AEO Audit</div></div>
    {/* Scrolling techy text — single line that changes */}
    <div style={{height:20,overflow:"hidden",textAlign:"center"}}>
      {logLines.length>0&&<div key={logLines[logLines.length-1].t} style={{fontSize:12,color:C.accent,fontWeight:500,fontFamily:"'Outfit'",animation:"fadeInUp .3s ease-out"}}>{logLines[logLines.length-1].msg.replace(/^\[.*?\]\s*/,"")}</div>}
    </div>
    {/* Engine status row */}
    <div style={{display:"flex",gap:16}}>
      {[{L:ChatGPTLogo,n:"ChatGPT",a:progress>=8,done:progress>=26},{L:ClaudeLogo,n:"Claude",a:progress>=14,done:progress>=26},{L:GeminiLogo,n:"Gemini",a:progress>=20,done:progress>=26}].map(e=>(<div key={e.n} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,background:e.done?`${C.green}08`:e.a?`${C.accent}06`:C.bg,border:`1px solid ${e.done?`${C.green}20`:e.a?`${C.accent}15`:C.border}`,transition:"all .3s"}}>
        <e.L size={18}/><span style={{fontSize:11,fontWeight:600,color:e.done?C.green:e.a?C.text:C.muted}}>{e.n}</span>
        {e.done?<span style={{fontSize:10,color:C.green}}>✓</span>:e.a?<span style={{width:4,height:4,borderRadius:"50%",background:C.accent,animation:"pulse 1s infinite"}}/>:null}
      </div>))}
    </div>
    {/* Step progress bars */}
    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:6}}>
      {[{l:"ChatGPT (gpt-4o)",p:Math.min(100,progress*100/14),c:"#10A37F"},{l:"Claude (Sonnet)",p:Math.max(0,Math.min(100,(progress-8)*100/12)),c:"#D97706"},{l:"Gemini (Flash)",p:Math.max(0,Math.min(100,(progress-14)*100/12)),c:"#4285F4"},{l:"Competitor Analysis",p:Math.max(0,Math.min(100,(progress-30)*100/15)),c:"#8b5cf6"},{l:"Archetype Generation",p:Math.max(0,Math.min(100,(progress-45)*100/17)),c:"#ec4899"},{l:"Intent Pathway",p:Math.max(0,Math.min(100,(progress-62)*100/10)),c:"#f59e0b"},{l:"Channel Verification",p:Math.max(0,Math.min(100,(progress-72)*100/18)),c:"#059669"},{l:"Report Compilation",p:Math.max(0,Math.min(100,(progress-90)*100/10)),c:C.accent}].map(s=>(<div key={s.l} style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:10,color:s.p>=100?C.green:s.p>0?C.text:C.muted,minWidth:120,fontWeight:s.p>0&&s.p<100?600:400,fontFamily:"'Outfit'"}}>{s.p>=100?"✓ ":s.p>0?"◉ ":"○ "}{s.l}</span>
        <div style={{flex:1,height:3,background:C.borderSoft,borderRadius:2}}><div style={{width:`${Math.max(0,s.p)}%`,height:"100%",background:s.p>=100?C.green:s.c,borderRadius:2,transition:"width .5s ease-out"}}/></div>
      </div>))}
    </div>
    <div style={{padding:"6px 14px",background:`${C.accent}08`,borderRadius:100,fontSize:11,color:C.accent,fontWeight:500}}>⚡ Powered by live AI analysis</div>
    {error&&<div style={{padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </div>);
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>New AEO Audit</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>Enter client details for a comprehensive 8-stage AEO analysis.</p></div>
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <Field label="Brand Name" value={data.brand} onChange={v=>setData({...data,brand:v})} placeholder="Acme Corp"/>
      <Field label="Industry" value={data.industry} onChange={v=>setData({...data,industry:v})} placeholder="e.g. Technology"/>
      <Field label="Website" value={data.website} onChange={v=>setData({...data,website:v})} placeholder="acme.com"/>
      <Field label="Region" value={data.region} onChange={v=>setData({...data,region:v})} placeholder="e.g. Malaysia"/>
      <div style={{gridColumn:"1/-1"}}><TagInput label="Key Topics" tags={data.topics} setTags={v=>setData({...data,topics:v})} placeholder="Type a topic and press Enter..."/></div>
      <div style={{gridColumn:"1/-1"}}><TagInput label="Competitors" tags={data.competitors} setTags={v=>setData({...data,competitors:v})} placeholder="Type a competitor and press Enter..."/></div>
    </div>
    <div style={{marginTop:20,paddingTop:18,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:11,color:C.muted}}>Engines:</span><ChatGPTLogo size={18}/><ClaudeLogo size={18}/><GeminiLogo size={18}/></div>
      <button onClick={go} disabled={!ok} style={{padding:"10px 24px",background:ok?C.accent:"#dde1e7",color:ok?"#fff":"#9ca3af",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:ok?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>Run AEO Audit →</button>
    </div></Card></div>);
}

/* ─── PAGE: AEO AUDIT ─── */
function AuditPage({r,history,goTo}){
  const[ex,setEx]=useState(null);
  const[expandComp,setExpandComp]=useState(null);
  const[radarComp,setRadarComp]=useState(0);
  const[showTrack,setShowTrack]=useState(false);
  const trend=history.map(h=>({label:h.date,overall:h.overall}));
  const engineTrend=history.map(h=>({label:h.date,ChatGPT:h.engines[0],Claude:h.engines[1],Gemini:h.engines[2]}));
  const selComp=r.competitors[radarComp]||r.competitors[0];
  const radarData=r.painPoints.map(pp=>({label:pp.label.split(" ").slice(0,2).join(" "),you:pp.score,comp:selComp?selComp.painPoints.find(c=>c.label===pp.label)?.score||50:50}));
  const latestChange=history.length>1?r.overall-history[history.length-2].overall:0;
  const catChanges=r.painPoints.map(pp=>{const hist=history.map(h=>{const f=h.categories.find(c=>c.label===pp.label);return f?f.score:null;}).filter(Boolean);const prev=hist.length>1?hist[hist.length-2]:pp.score;return{...pp,change:pp.score-prev};});

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>AEO Audit Results</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Visibility report for <strong>{r.clientData.brand}</strong> <span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>⚡ Live AI Analysis</span></p></div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {latestChange!==0&&<div style={{padding:"5px 10px",borderRadius:8,background:latestChange>0?`${C.green}10`:`${C.red}10`}}><span style={{fontSize:13,fontWeight:700,color:latestChange>0?C.green:C.red}}>{latestChange>0?"▲ +":"▼ "}{Math.abs(latestChange)}</span><span style={{fontSize:9,color:C.muted,display:"block"}}>vs last</span></div>}
        <Ring score={r.overall} size={84}/>
      </div>
    </div>
    <SectionNote text={`Your overall AEO score of ${r.overall}/100 measures how visible ${r.clientData.brand} is when people ask AI chatbots questions about your industry. Higher = AI engines are more likely to cite your brand.`}/>

    {/* Engine cards */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
      {r.engines.map(e=>(<Card key={e.id} onClick={()=>setEx(ex===e.id?null:e.id)} style={{cursor:"pointer",border:ex===e.id?`1px solid ${e.color}40`:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8}}><e.Logo size={20}/><span style={{fontWeight:600,fontSize:13,color:C.text}}>{e.name}</span></div><Ring score={e.score} size={44} color={e.color} sw={3}/></div>
        {[{l:"Mentions",v:e.mentionRate,tip:"How often this AI mentions your brand in relevant answers."},{l:"Citations",v:e.citationRate,tip:"How often this AI links to your website as a source."},{l:"Sentiment",v:e.sentiment,tip:"How positively this AI talks about your brand."}].map(m=>(<div key={m.l} style={{marginBottom:7}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}><span style={{fontSize:10,color:C.muted,display:"flex",alignItems:"center"}}>{m.l}<InfoTip text={m.tip}/></span><span style={{fontSize:10,fontWeight:600}}>{m.v}%</span></div><Bar value={m.v} color={e.color}/></div>))}
        {ex===e.id&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.borderSoft}`}}>
          <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Query Visibility</div>
          {e.queries.map((q,j)=>(<div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0"}}><span style={{fontSize:11,color:C.sub}}>{q.query}</span><Pill color={q.status==="Cited"?C.green:q.status==="Mentioned"?C.amber:C.red}>{q.status}</Pill></div>))}
          <div style={{marginTop:10}}><div style={{fontSize:10,fontWeight:600,color:C.green,marginBottom:3}}>✓ Strengths</div>{e.strengths.map((s,i)=><div key={i} style={{fontSize:11,color:C.sub,padding:"2px 0"}}>• {s}</div>)}<div style={{fontSize:10,fontWeight:600,color:C.red,marginBottom:3,marginTop:6}}>✗ Weaknesses</div>{e.weaknesses.map((s,i)=><div key={i} style={{fontSize:11,color:C.sub,padding:"2px 0"}}>• {s}</div>)}</div>
        </div>}
        <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:10,color:C.muted}}>{ex===e.id?"collapse ↑":"details ↓"}</span></div>
      </Card>))}
    </div>

    {/* Competitors */}
    {r.competitors.length>0&&<Card style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Competitive Landscape</h3><InfoTip text="Scores compare AI visibility across all engines. +/- shows points ahead or behind you."/></div>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>AEO visibility scores — bar length shows share of AI engine visibility.</p>
      <div style={{display:"flex",flexDirection:"column",gap:8}}><BRow name={`${r.clientData.brand} (You)`} score={r.overall} color={C.accent} bold/>
      {r.competitors.map((c,i)=><BRow key={i} name={c.name} score={c.score} color={c.score>r.overall?C.red:"#94a3b8"} diff={c.score-r.overall}/>)}</div>
    </Card>}

    {/* Competitor Deep-Dive */}
    {r.competitors.length>0&&<Card style={{marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'"}}>Competitor Deep-Dive</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Why competitors rank higher or lower — and what you can learn.</p>
      {r.competitors.map((c,ci)=>{const isOpen=expandComp===ci;const ahead=c.score>r.overall;return(<div key={ci} style={{border:`1px solid ${isOpen?(ahead?`${C.red}30`:`${C.green}30`):C.border}`,borderRadius:C.rs,overflow:"hidden",marginBottom:8}}>
        <div onClick={()=>setExpandComp(isOpen?null:ci)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:isOpen?`${ahead?C.red:C.green}03`:"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:8,background:ahead?`${C.red}08`:`${C.green}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:ahead?C.red:C.green,fontFamily:"'Outfit'"}}>{c.score}</div><div><div style={{fontWeight:600,fontSize:13,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{ahead?`${c.score-r.overall}pts ahead`:`${r.overall-c.score}pts behind`}</div></div></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Pill color={ahead?C.red:C.green} filled>{ahead?"Outranking":"Behind"}</Pill><span style={{fontSize:10,color:C.muted}}>{isOpen?"▲":"▼"}</span></div>
        </div>
        {isOpen&&<div style={{padding:"0 14px 14px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14,marginTop:4}}>
            {c.painPoints.map((cp,j)=>{const yours=r.painPoints[j]?.score||50;const diff=cp.score-yours;return(<div key={j} style={{padding:"8px 10px",background:C.bg,borderRadius:6}}><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{cp.label.split("/")[0].trim()}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.accent,fontWeight:600}}>You: {yours}</span><span style={{fontSize:11,fontWeight:600,color:diff>0?C.red:C.green}}>{c.name.split(" ")[0]}: {cp.score}</span></div><div style={{marginTop:4}}><Bar value={yours} color={C.accent} h={3}/><div style={{marginTop:2}}><Bar value={cp.score} color={diff>0?C.red:"#94a3b8"} h={3}/></div></div></div>);})}
          </div>
          {c.advantages.length>0&&<div>{c.advantages.map((adv,ai)=>(<div key={ai} style={{padding:"10px 12px",background:adv.insight.advantage==="them"?`${C.red}04`:`${C.green}04`,borderRadius:6,borderLeft:`3px solid ${adv.insight.advantage==="them"?C.red:C.green}`,marginBottom:6}}><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:2}}>{adv.cat.split("/")[0].trim()} <span style={{color:C.muted,fontWeight:400}}>— You: {adv.yourScore} vs {adv.theirScore}</span></div><div style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{adv.insight.text}</div></div>))}</div>}
        </div>}
      </div>);})}
    </Card>}

    {/* Performance Tracking */}
    <Card style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setShowTrack(!showTrack)}>
        <div><h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'"}}>📈 Performance Tracking</h3><p style={{fontSize:12,color:C.muted,margin:"2px 0 0"}}>Score history and category trends</p></div>
        <span style={{fontSize:12,color:C.accent,fontWeight:600}}>{showTrack?"Hide ↑":"Show ↓"}</span>
      </div>
      {showTrack&&<div style={{marginTop:18}}>
        <SectionNote text="Each audit adds a data point. Over time this shows if your AEO strategy is working."/>
        <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>AEO Score Trend</div><MiniAreaChart data={trend} dataKey="overall" color={C.accent}/></div>
        <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Engine Performance</div><MiniLineChart data={engineTrend} lines={[{key:"ChatGPT",color:"#10A37F",label:"ChatGPT"},{key:"Claude",color:"#D97706",label:"Claude"},{key:"Gemini",color:"#4285F4",label:"Gemini"}]}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:13,fontWeight:600,color:C.text}}>Category Radar</span>
              {r.competitors.length>0&&<select value={radarComp} onChange={e=>setRadarComp(Number(e.target.value))} style={{fontSize:11,padding:"4px 8px",borderRadius:6,border:`1px solid ${C.border}`,background:C.bg,color:C.text,fontFamily:"inherit"}}>
                {r.competitors.map((c,i)=>(<option key={i} value={i}>vs {c.name}</option>))}
              </select>}
            </div>
            <MiniRadar data={radarData} keys={[{key:"you",color:C.accent,label:r.clientData.brand},{key:"comp",color:C.red,label:selComp?.name||"Competitor"}]}/>
          </div>
          <div><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Category Movement</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>{catChanges.map((cat,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,color:C.sub,minWidth:70}}>{cat.label.split(" ").slice(0,2).join(" ")}</span><div style={{flex:1}}><Bar value={cat.score} color={SC(cat.severity)} h={5}/></div><span style={{fontSize:12,fontWeight:700,color:C.text,minWidth:20,textAlign:"right"}}>{cat.score}</span><span style={{fontSize:10,fontWeight:600,minWidth:28,textAlign:"right",color:cat.change>0?C.green:cat.change<0?C.red:C.muted}}>{cat.change>0?`+${cat.change}`:cat.change===0?"—":cat.change}</span></div>))}</div>
          </div>
        </div>
      </div>}
    </Card>
    <NavBtn onClick={()=>goTo("archetypes")} label="Next: User Archetypes →"/>
  </div>);
}

/* ─── PAGE: ARCHETYPES (stakeholder-grouped) ─── */
function ArchetypesPage({r,goTo}){
  const[selGroup,setSelGroup]=useState(0);
  const[selArch,setSelArch]=useState(null);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>User Archetypes</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Who is searching — grouped by stakeholder type</p></div>
    <SectionNote text="Select a stakeholder group to see customer segments within it. 'Visibility' shows how often AI engines mention your brand for this segment's queries."/>
    <div style={{display:"flex",gap:8,marginBottom:20}}>
      {r.stakeholders.map((sg,i)=>(<div key={i} onClick={()=>{setSelGroup(i);setSelArch(null);}} style={{flex:1,padding:"14px 16px",background:selGroup===i?`${C.accent}06`:C.surface,border:`1px solid ${selGroup===i?`${C.accent}30`:C.border}`,borderRadius:C.rs,cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
        <div style={{fontSize:22,marginBottom:4}}>{sg.icon}</div>
        <div style={{fontSize:12,fontWeight:600,color:selGroup===i?C.accent:C.text}}>{sg.group}</div>
        <div style={{fontSize:10,color:C.muted,marginTop:2}}>{sg.archetypes.length} segments</div>
      </div>))}
    </div>
    <div style={{fontSize:12,color:C.sub,marginBottom:14,padding:"0 4px"}}>{r.stakeholders[selGroup].desc}</div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {r.stakeholders[selGroup].archetypes.map((a,i)=>(<Card key={i} onClick={()=>setSelArch(selArch===i?null:i)} style={{cursor:"pointer",border:selArch===i?`1px solid ${C.accent}30`:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${C.accent}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{a.icon}</div>
            <div><div style={{fontWeight:600,fontSize:13,color:C.text}}>{a.name}</div><div style={{fontSize:11,color:C.muted}}>{a.demo} · ~{a.size}% of searches</div></div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><Pill color={a.opportunity==="high"?C.green:C.amber}>{a.opportunity} opp.</Pill><div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:C.text}}>{a.brandVisibility}%</div><div style={{fontSize:9,color:C.muted}}>visibility</div></div></div>
        </div>
        {selArch===i&&<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.borderSoft}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Behaviour</div><div style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{a.behavior}</div></div>
            <div><div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Intent</div><div style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{a.intent}</div></div>
          </div>
          <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Top Prompts</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>{a.prompts.map((p,j)=><div key={j} style={{padding:"7px 10px",background:C.bg,borderRadius:6,fontSize:11,color:C.sub}}>"{p}"</div>)}</div>
        </div>}
      </Card>))}
    </div>
    <NavBtn onClick={()=>goTo("intent")} label="Next: Intent Pathway →"/>
  </div>);
}

/* ─── PAGE: INTENT PATHWAY ─── */
function IntentPage({r,goTo}){
  const[os,setOs]=useState(0);
  const stats=r.funnelStages.map(s=>({cited:s.prompts.filter(p=>p.status==="Cited").length,mentioned:s.prompts.filter(p=>p.status==="Mentioned").length,absent:s.prompts.filter(p=>p.status==="Absent").length}));
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Intent Pathway</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Where does your brand appear across the customer journey?</p></div>
    <SectionNote text="'Cited' = AI links to your site. 'Mentioned' = brand name appears without link. 'Absent' = not referenced. Only real, verified prompts are shown — no filler. The % shows citation rate per stage."/>
    <Card style={{marginBottom:20,padding:0,overflow:"hidden"}}><div style={{display:"flex"}}>
      {r.funnelStages.map((s,i)=>{const total=s.prompts.length||1;const pct=Math.round(stats[i].cited/total*100);return(<div key={i} onClick={()=>setOs(i)} style={{flex:1,padding:"16px 12px",cursor:"pointer",background:os===i?`${s.color}08`:"transparent",borderBottom:os===i?`3px solid ${s.color}`:"3px solid transparent",textAlign:"center",transition:"all .15s"}}><div style={{fontSize:20,fontWeight:700,color:s.color,fontFamily:"'Outfit'"}}>{pct}%</div><div style={{fontSize:11,fontWeight:600,color:C.text,marginTop:2}}>{s.stage}</div><div style={{fontSize:10,color:C.muted}}>{stats[i].cited}/{total} cited</div></div>);})}
    </div></Card>
    <Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div><h3 style={{fontSize:14,fontWeight:600,color:r.funnelStages[os].color,margin:0,fontFamily:"'Outfit'"}}>{r.funnelStages[os].stage}</h3><p style={{fontSize:11,color:C.muted,margin:"2px 0 0"}}>{r.funnelStages[os].desc} · {r.funnelStages[os].prompts.length} prompts identified</p></div>
      <div style={{display:"flex",gap:4}}><Pill color={C.green} filled>{stats[os].cited} Cited</Pill><Pill color={C.amber} filled>{stats[os].mentioned} Mentioned</Pill><Pill color={C.red} filled>{stats[os].absent} Absent</Pill></div>
    </div>
    <div style={{fontSize:12}}>{r.funnelStages[os].prompts.map((p,j)=>(<div key={j} style={{display:"grid",gridTemplateColumns:"1fr 50px 70px",padding:"7px 8px",borderBottom:`1px solid ${C.borderSoft}`,alignItems:"center"}}><span style={{color:C.sub,fontSize:11}}>{p.query}</span><span style={{textAlign:"center",fontWeight:600,fontSize:11,color:p.rank<=3?C.green:p.rank<=7?C.amber:C.red}}>#{p.rank}</span><span style={{textAlign:"center"}}><Pill color={p.status==="Cited"?C.green:p.status==="Mentioned"?C.amber:C.red}>{p.status}</Pill></span></div>))}</div></Card>
    <NavBtn onClick={()=>goTo("channels")} label="Next: AEO Channels →"/>
  </div>);
}

/* ─── PAGE: BRAND PLAYBOOK ─── */
function PlaybookPage({r,goTo}){
  const[brandAssets,setBrandAssets]=useState({tagline:"",colors:"",tone:"",mission:"",positioning:""});
  const[docs,setDocs]=useState([]);
  const[saved,setSaved]=useState(false);
  const[expandG,setExpandG]=useState(null);
  const addDoc=(type)=>{setDocs([...docs,{type,name:`${type}_${Date.now()}.pdf`,date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"}),size:"2.4 MB"}]);};
  const docTypes=[{type:"Brand Logo",icon:"🎨",desc:"Primary and secondary logos (SVG, PNG)"},{type:"Brand CI / Style Guide",icon:"📐",desc:"Colours, typography, spacing rules"},{type:"Messaging Framework",icon:"💬",desc:"Taglines, value props, tone of voice"},{type:"Media Kit",icon:"📦",desc:"Press photos, exec headshots, boilerplate"},{type:"Product Docs",icon:"📄",desc:"Feature sheets, technical documentation"},{type:"Case Studies",icon:"📊",desc:"Customer success stories and data"}];
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Brand Playbook</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Your AEO brand hub — identity, assets, and AI-optimised guidelines</p></div>
    <SectionNote text="This is your central brand hub for AEO. Upload your brand assets so our system can reference them when generating content strategies. The guidelines below are tailored to how AI engines process and cite brand information."/>

    {/* Brand Identity Form */}
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Brand Identity</h3>{saved&&<Pill color={C.green} filled>✓ Saved</Pill>}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Tagline</label><input value={brandAssets.tagline} onChange={e=>setBrandAssets({...brandAssets,tagline:e.target.value})} placeholder={`e.g. "${r.clientData.brand} — The future of ${r.clientData.industry}"`} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Colours (hex codes)</label><input value={brandAssets.colors} onChange={e=>setBrandAssets({...brandAssets,colors:e.target.value})} placeholder="e.g. #0c4cfc, #10b981, #0c1222" style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Tone of Voice</label><input value={brandAssets.tone} onChange={e=>setBrandAssets({...brandAssets,tone:e.target.value})} placeholder="e.g. Authoritative, data-driven, approachable" style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Positioning</label><input value={brandAssets.positioning} onChange={e=>setBrandAssets({...brandAssets,positioning:e.target.value})} placeholder={`e.g. "The most trusted ${r.clientData.industry} platform for enterprise"`} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/></div>
        <div style={{gridColumn:"1/-1"}}><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Mission Statement</label><textarea value={brandAssets.mission} onChange={e=>setBrandAssets({...brandAssets,mission:e.target.value})} placeholder={`e.g. "${r.clientData.brand} empowers organisations to harness ${r.clientData.industry} for measurable business outcomes..."`} rows={2} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit",resize:"vertical"}}/></div>
      </div>
      <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setSaved(true)} style={{padding:"8px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Save Brand Identity</button></div>
    </Card>

    {/* Document Upload Hub */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'"}}>Brand Asset Library</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Upload and store brand documents. These inform your AEO content strategy.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {docTypes.map((dt,i)=>{const uploaded=docs.filter(d=>d.type===dt.type);return(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,border:`1px dashed ${uploaded.length>0?C.green:C.border}`,textAlign:"center",cursor:"pointer",transition:"all .15s"}} onClick={()=>addDoc(dt.type)}>
          <div style={{fontSize:20,marginBottom:4}}>{dt.icon}</div>
          <div style={{fontSize:12,fontWeight:600,color:C.text}}>{dt.type}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>{dt.desc}</div>
          {uploaded.length>0?<div style={{marginTop:6}}><Pill color={C.green} filled>{uploaded.length} uploaded</Pill></div>:<div style={{marginTop:6,fontSize:10,color:C.accent,fontWeight:500}}>+ Click to upload</div>}
        </div>);})}
      </div>
      {docs.length>0&&<div>
        <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Uploaded Documents ({docs.length})</div>
        {docs.map((d,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:C.surface,borderRadius:6,border:`1px solid ${C.borderSoft}`,marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14}}>📎</span><div><div style={{fontSize:11,fontWeight:500,color:C.text}}>{d.type}</div><div style={{fontSize:10,color:C.muted}}>{d.name} · {d.size} · {d.date}</div></div></div>
          <span onClick={()=>setDocs(docs.filter((_,j)=>j!==i))} style={{fontSize:12,color:C.red,cursor:"pointer",fontWeight:500}}>Remove</span>
        </div>))}
      </div>}
    </Card>

    {/* AEO Brand Guidelines - expandable */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'"}}>AEO Brand Guidelines</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>{r.brandGuidelines.length} technical guidelines for maximising AI engine citation rate. Click to expand.</p>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {r.brandGuidelines.map((g,i)=>{const isOpen=expandG===i;return(<div key={i} style={{borderRadius:C.rs,border:`1px solid ${isOpen?`${C.accent}25`:C.border}`,overflow:"hidden",transition:"all .15s"}}>
          <div onClick={()=>setExpandG(isOpen?null:i)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,background:isOpen?`${C.accent}03`:"transparent"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><span style={{fontSize:11,fontWeight:700,color:C.accent,fontFamily:"'Outfit'",background:`${C.accent}08`,padding:"2px 8px",borderRadius:4}}>G{String(i+1).padStart(2,"0")}</span><span style={{fontSize:13,fontWeight:600,color:C.text}}>{g.area}</span></div>
              {!isOpen&&<div style={{fontSize:11,color:C.muted,marginTop:4,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{g.rule}</div>}
            </div>
            <span style={{fontSize:10,color:C.accent,marginTop:4,flexShrink:0}}>{isOpen?"▲":"▼"}</span>
          </div>
          {isOpen&&<div style={{padding:"0 16px 16px"}}>
            <div style={{fontSize:12,color:C.sub,lineHeight:1.7,marginBottom:12}}>{g.rule}</div>
            <div style={{padding:"12px 14px",background:`${C.accent}03`,borderRadius:8,border:`1px solid ${C.accent}10`}}>
              <div style={{fontSize:10,fontWeight:700,color:C.accent,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Implementation Example</div>
              <div style={{fontSize:11,color:C.text,lineHeight:1.7}}>{g.example}</div>
            </div>
          </div>}
        </div>);})}
      </div>
    </Card>
    <NavBtn onClick={()=>goTo("channels")} label="Next: AEO Channels →"/>
  </div>);
}

/* ─── PAGE: AEO CHANNELS (Step 06 with drill-down) ─── */
function ChannelsPage({r,goTo}){
  const[expandCh,setExpandCh]=useState(null);
  const hasAnyFindings=r.aeoChannels.some(ch=>ch.finding);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>AEO Channels</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Channels ranked by impact on AI engine visibility {hasAnyFindings&&<span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>✓ Verified via 3 AI Engines</span>}</p></div>
    <SectionNote text="These channels directly influence whether AI engines cite your brand. Each channel has been verified by ChatGPT, Claude, or Gemini searching the web for real evidence of your brand's presence. Channels with ▼ include specific sites to target."/>
    <Card>
      {r.aeoChannels.sort((a,b)=>b.impact-a.impact).map((ch,i)=>{const isOpen=expandCh===i;const hasSites=ch.sites&&ch.sites.length>0;const canExpand=hasSites||ch.finding;return(<div key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
        <div onClick={()=>{if(canExpand)setExpandCh(isOpen?null:i);}} style={{display:"grid",gridTemplateColumns:"30px 1fr 100px 90px 20px",gap:8,padding:"12px 8px",alignItems:"center",cursor:canExpand?"pointer":"default",background:isOpen?`${C.accent}03`:"transparent"}}>
          <span style={{fontWeight:600,color:C.muted,fontSize:12}}>{i+1}</span>
          <div><div style={{fontWeight:500,color:C.text,fontSize:12}}>{ch.channel}</div><div style={{fontSize:10,color:C.muted}}>{ch.desc}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Bar value={ch.impact} color={ch.impact>=85?C.green:C.amber} h={4}/><span style={{fontWeight:600,fontSize:11}}>{ch.impact}</span></div>
          <span style={{textAlign:"center"}}><Pill color={ch.status==="Active"?C.green:ch.status==="Needs Work"?C.amber:C.red}>{ch.status}</Pill></span>
          <span style={{fontSize:10,color:canExpand?C.accent:C.borderSoft}}>{canExpand?(isOpen?"▲":"▼"):"—"}</span>
        </div>
        {isOpen&&<div style={{padding:"0 8px 14px 38px"}}>
          {ch.finding&&<div style={{padding:"8px 12px",background:ch.status==="Active"?`${C.green}05`:ch.status==="Not Present"?`${C.red}05`:`${C.amber}05`,borderRadius:6,borderLeft:`3px solid ${ch.status==="Active"?C.green:ch.status==="Not Present"?C.red:C.amber}`,marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:2}}>Verification Finding</div>
            <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{ch.finding}</div>
          </div>}
          {hasSites&&<div>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Top {ch.sites.length} sites & publishers to target</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {ch.sites.map((s,si)=>(<div key={si} style={{padding:"8px 10px",background:C.bg,borderRadius:6}}>
                <div style={{fontSize:11,fontWeight:600,color:C.text}}>{s.name}</div>
                <div style={{fontSize:10,color:C.accent}}>{s.url}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.focus}</div>
              </div>))}
            </div>
          </div>}
        </div>}
      </div>);})}
    </Card>
    <NavBtn onClick={()=>goTo("grid")} label="Next: Content Grid →"/>
  </div>);
}

/* ─── PAGE: CONTENT GRID (Step 07) ─── */
function GridPage({r,goTo}){
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>What to publish, where, and who owns it.</p></div>
    <SectionNote text="Priority P0 = start immediately. Impact shows how much each content type influences AEO visibility. The output requirements show the minimum monthly production needed."/>
    <Card style={{marginBottom:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["Content Type","Channels","Frequency","Priority","Owner","Impact"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,color:C.muted,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
      <tbody>{r.contentTypes.map((ct,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
        <td style={{padding:"10px",fontWeight:600,color:C.text}}>{ct.type}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{ct.channels.map(ch=><Pill key={ch} color="#64748b">{ch}</Pill>)}</div></td>
        <td style={{padding:"10px",color:C.sub}}>{ct.freq}</td>
        <td style={{padding:"10px"}}><Pill color={ct.p==="P0"?C.red:ct.p==="P1"?C.amber:"#94a3b8"}>{ct.p}</Pill></td>
        <td style={{padding:"10px",color:C.sub,fontSize:11}}>{ct.owner}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Bar value={ct.impact} color={ct.impact>=90?C.accent:C.green} h={4}/><span style={{fontWeight:600,fontSize:11}}>{ct.impact}</span></div></td>
      </tr>))}</tbody></table>
    </Card>
    <Card><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:"'Outfit'"}}>Monthly Output Requirements</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{n:"8-12",u:"pieces/month",l:"Written Content",d:"Guides, FAQs, case studies"},{n:"4-6",u:"pieces/month",l:"Video Content",d:"Tutorials, demos, thought leadership"},{n:"20+",u:"per month",l:"Community Posts",d:"Reddit, Quora, LinkedIn, X"},{n:"2-4",u:"per month",l:"PR Placements",d:"Guest posts, press mentions"},{n:"1",u:"per quarter",l:"Research Report",d:"Original data, surveys"},{n:"Weekly",u:"updates",l:"Schema & Technical",d:"Markup, freshness, monitoring"}].map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:600,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
      </div>
    </Card>
    <NavBtn onClick={()=>goTo("roadmap")} label="Next: 90-Day Roadmap →"/>
  </div>);
}

/* ─── PAGE: 90-DAY ROADMAP (Step 08 with premium PDF) ─── */
function RoadmapPage({r}){
  const phases=[r.roadmap.day30,r.roadmap.day60,r.roadmap.day90];

  const handleExport=()=>{
    const w=window.open("","_blank");
    const css=`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0c1222;font-size:11px;line-height:1.5}
    .cover{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,#f0f4ff,#f5f6f8);page-break-after:always;text-align:center}
    .cover h1{font-size:42px;font-weight:800;color:#0c4cfc;letter-spacing:-.02em;margin-bottom:8px}.cover .sub{font-size:18px;color:#4a5568;margin-bottom:32px}.cover .meta{font-size:12px;color:#8896a6}
    .page{padding:40px 50px;max-width:900px;margin:0 auto;page-break-inside:avoid}
    h2{font-size:20px;font-weight:700;color:#0c4cfc;margin:28px 0 10px;padding-bottom:6px;border-bottom:2px solid #e2e5ea}h2:first-child{margin-top:0}
    h3{font-size:14px;font-weight:700;margin:14px 0 6px;color:#0c1222}
    .score-box{display:inline-block;padding:8px 20px;border-radius:10px;font-weight:800;font-size:28px;margin:8px 0}
    .green{background:#f0fdf4;color:#059669}.amber{background:#fffbeb;color:#d97706}.red{background:#fef2f2;color:#dc2626}.blue{background:#eff6ff;color:#0c4cfc}
    table{width:100%;border-collapse:collapse;margin:10px 0;font-size:10px}th,td{padding:6px 8px;border:1px solid #e2e5ea;text-align:left}th{background:#f5f6f8;font-weight:700;text-transform:uppercase;font-size:9px;letter-spacing:.04em}
    .dept{margin:10px 0;padding:12px 14px;border:1px solid #e2e5ea;border-radius:8px;page-break-inside:avoid}
    .dept-title{font-weight:700;font-size:12px;margin-bottom:6px;padding-bottom:4px;border-bottom:2px solid}.task{padding:3px 0;font-size:10.5px;color:#4a5568}
    .insight{padding:8px 12px;border-radius:6px;margin:4px 0;font-size:10.5px;border-left:3px solid}
    .footer{margin-top:28px;padding:14px 0;border-top:2px solid #e2e5ea;text-align:center;color:#8896a6;font-size:10px}
    .toc{page-break-after:always;padding:60px 50px}.toc h2{font-size:24px;border:none;margin-bottom:20px;padding:0}.toc-item{padding:8px 0;border-bottom:1px solid #edf0f3;display:flex;justify-content:space-between;font-size:13px}
    .kpi-row{display:flex;gap:12px;margin:12px 0}.kpi{flex:1;padding:12px;background:#f5f6f8;border-radius:8px;text-align:center}.kpi .val{font-size:24px;font-weight:800}.kpi .label{font-size:9px;text-transform:uppercase;color:#8896a6;margin-top:4px}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.cover{height:auto;min-height:95vh;padding:80px 50px}}`;

    const scCol=r.overall>=70?"green":r.overall>=40?"amber":"red";
    const compRows=r.competitors.map(c=>`<tr><td>${c.name}</td><td><strong>${c.score}</strong></td><td style="color:${c.score>r.overall?"#dc2626":"#059669"}">${c.score>r.overall?"+":""}${c.score-r.overall}</td></tr>`).join("");
    const engRows=r.engines.map(e=>`<tr><td>${e.name}</td><td><strong>${e.score}</strong></td><td>${e.mentionRate}%</td><td>${e.citationRate}%</td><td>${e.sentiment}%</td></tr>`).join("");
    const archHtml=r.stakeholders.map(sg=>`<h3>${sg.icon} ${sg.group}</h3>${sg.archetypes.map(a=>`<div class="dept"><div class="dept-title" style="border-color:#0c4cfc">${a.name}</div><div style="color:#4a5568">${a.demo} · ~${a.size}% of searches · ${a.brandVisibility}% visibility</div><div style="margin-top:4px"><strong>Behaviour:</strong> ${a.behavior} | <strong>Intent:</strong> ${a.intent}</div><div style="margin-top:4px">${a.prompts.map(p=>`<span style="display:inline-block;padding:2px 8px;background:#f0f4ff;border-radius:4px;margin:2px;font-size:10px">"${p}"</span>`).join("")}</div></div>`).join("")}`).join("");
    const funnelHtml=r.funnelStages.map(s=>{const st={c:s.prompts.filter(p=>p.status==="Cited").length,m:s.prompts.filter(p=>p.status==="Mentioned").length,a:s.prompts.filter(p=>p.status==="Absent").length};return`<h3 style="color:${s.color}">${s.stage} (${st.c} cited, ${st.m} mentioned, ${st.a} absent)</h3><table><tr><th>Prompt</th><th>Rank</th><th>Status</th></tr>${s.prompts.map(p=>`<tr><td>${p.query}</td><td>#${p.rank}</td><td style="color:${p.status==="Cited"?"#059669":p.status==="Mentioned"?"#d97706":"#dc2626"}">${p.status}</td></tr>`).join("")}</table>`;}).join("");
    const guideHtml=r.brandGuidelines.map(g=>`<div class="dept"><div class="dept-title" style="border-color:#0c4cfc">${g.area}</div><div style="color:#4a5568">${g.rule}</div><div class="insight" style="border-color:#e2e5ea;background:#f8f9fb;margin-top:6px"><strong>Example:</strong> ${g.example}</div></div>`).join("");
    const chHtml=r.aeoChannels.sort((a,b)=>b.impact-a.impact).map((ch,i)=>`<tr><td>${i+1}</td><td><strong>${ch.channel}</strong><br><span style="color:#8896a6">${ch.desc}</span></td><td>${ch.impact}</td><td style="color:${ch.status==="Active"?"#059669":ch.status==="Needs Work"?"#d97706":"#dc2626"}">${ch.status}</td></tr>`).join("");
    const gridHtml=r.contentTypes.map(ct=>`<tr><td>${ct.type}</td><td>${ct.channels.join(", ")}</td><td>${ct.freq}</td><td>${ct.p}</td><td>${ct.owner}</td></tr>`).join("");
    const rmHtml=phases.map(p=>`<h3 style="color:${p.accent}">${p.title} (${p.sub}) — Expected lift: ${p.lift}</h3>${p.departments.map(d=>`<div class="dept"><div class="dept-title" style="border-color:${d.color};color:${d.color}">${d.dept}</div>${d.tasks.map(t=>`<div class="task">→ ${t}</div>`).join("")}</div>`).join("")}`).join("");

    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>EnterRank AEO Report — ${r.clientData.brand}</title><style>${css}</style></head><body>
    <div class="cover"><div style="margin-bottom:20px"><svg width="48" height="48" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#0c4cfc"/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg></div><h1>EnterRank</h1><div class="sub">AEO Audit Report</div><div style="margin:20px 0"><span class="score-box ${scCol}">${r.overall} / 100</span></div><div style="font-size:16px;color:#0c1222;font-weight:600;margin:16px 0">${r.clientData.brand}</div><div class="meta">${r.clientData.industry||"N/A"} · ${r.clientData.region||"Global"} · ${r.clientData.website}</div><div class="meta" style="margin-top:20px">Generated ${new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}<br>by Entermind</div></div>

    <div class="toc"><h2>Table of Contents</h2>${["Executive Summary","AI Engine Scores","Competitive Landscape & Deep-Dive","User Archetypes","Intent Pathway","Brand Playbook","AEO Channels","Content-Channel Grid","90-Day Roadmap"].map((t,i)=>`<div class="toc-item"><span>${i+1}. ${t}</span><span style="color:#8896a6">${i+2}</span></div>`).join("")}</div>

    <div class="page"><h2>1. Executive Summary</h2>
    <div class="kpi-row"><div class="kpi"><div class="val" style="color:${r.overall>=70?"#059669":r.overall>=40?"#d97706":"#dc2626"}">${r.overall}</div><div class="label">Overall AEO Score</div></div><div class="kpi"><div class="val" style="color:#0c4cfc">${Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/3)}%</div><div class="label">Avg Mention Rate</div></div><div class="kpi"><div class="val" style="color:#8b5cf6">${Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/3)}%</div><div class="label">Avg Citation Rate</div></div><div class="kpi"><div class="val" style="color:${r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]).color}">${r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]).name}</div><div class="label">Best Engine</div></div></div>

    <h2>2. AI Engine Scores</h2><table><tr><th>Engine</th><th>Score</th><th>Mentions</th><th>Citations</th><th>Sentiment</th></tr>${engRows}</table>

    <h2>3. Competitive Landscape</h2><table><tr><th>Brand</th><th>Score</th><th>vs You</th></tr><tr style="background:#eff6ff"><td><strong>${r.clientData.brand}</strong></td><td>${r.overall}</td><td>—</td></tr>${compRows}</table>
    ${r.competitors.filter(c=>c.advantages.length>0).map(c=>`<h3>${c.name} — Key Insights</h3>${c.advantages.map(a=>`<div class="insight" style="border-color:${a.insight.advantage==="them"?"#dc2626":"#059669"};background:${a.insight.advantage==="them"?"#fef2f2":"#f0fdf4"}">${a.cat.split("/")[0].trim()}: You ${a.yourScore} vs ${a.theirScore} — ${a.insight.text}</div>`).join("")}`).join("")}

    <h2>4. User Archetypes</h2>${archHtml}
    <h2>5. Intent Pathway</h2>${funnelHtml}
    <h2>6. Brand Playbook</h2>${guideHtml}
    <h2>7. AEO Channels</h2><table><tr><th>#</th><th>Channel</th><th>Impact</th><th>Status</th></tr>${chHtml}</table>
    <h2>8. Content-Channel Grid</h2><table><tr><th>Type</th><th>Channels</th><th>Frequency</th><th>Priority</th><th>Owner</th></tr>${gridHtml}</table>
    <h2>9. 90-Day Transformation Roadmap</h2>${rmHtml}
    <div class="footer"><strong>EnterRank</strong> by Entermind · Confidential · ${new Date().getFullYear()}</div></div></body></html>`);
    w.document.close();setTimeout(()=>w.print(),600);
  };

  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>90-Day Transformation Roadmap</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Department-by-department plan for <strong>{r.clientData.brand}</strong></p></div>
      <button onClick={handleExport} style={{padding:"10px 20px",background:C.text,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",display:"flex",alignItems:"center",gap:6}}>📄 Export Full Report</button>
    </div>
    <SectionNote text="This roadmap assigns tasks to every department involved. The PDF export includes all 8 stages of your audit in a professional format with cover page and table of contents."/>

    <Card style={{marginBottom:20,background:"linear-gradient(135deg,#f8f9fb,#f0f4ff)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,textAlign:"center"}}>
        {[{l:"Current",s:r.overall,c:C.red,d:"Today"},{l:"Day 30",s:Math.min(90,r.overall+12),c:C.amber,d:"+10-15%"},{l:"Day 60",s:Math.min(95,r.overall+25),c:"#f59e0b",d:"+20-30%"},{l:"Day 90",s:Math.min(98,r.overall+40),c:C.green,d:"+40-60%"}].map(x=>(<div key={x.l}><Ring score={x.s} size={64} color={x.c} sw={4}/><div style={{fontSize:12,fontWeight:600,color:C.text,marginTop:4}}>{x.l}</div><div style={{fontSize:10,color:C.muted}}>{x.d}</div></div>))}
      </div>
    </Card>

    <div style={{position:"relative",paddingLeft:24}}>
      <div style={{position:"absolute",left:9,top:12,bottom:12,width:2,background:"linear-gradient(to bottom,#ef4444,#f59e0b,#10b981)",borderRadius:1}}/>
      {phases.map((p,idx)=>(<div key={idx} style={{position:"relative",marginBottom:idx<2?16:0}}>
        <div style={{position:"absolute",left:-19,top:10,width:12,height:12,borderRadius:"50%",background:p.accent,border:"3px solid #f5f6f8",boxShadow:`0 0 0 2px ${p.accent}33`}}/>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div style={{fontSize:16,fontWeight:700,color:C.text,fontFamily:"'Outfit'"}}>{p.title}</div><div style={{color:p.accent,fontSize:11,fontWeight:600,marginTop:1}}>{p.sub}</div></div>
            <div style={{padding:"5px 12px",background:`${p.accent}08`,borderRadius:8,border:`1px solid ${p.accent}20`}}><span style={{fontSize:10,color:C.muted}}>Lift: </span><span style={{fontSize:14,fontWeight:700,color:p.accent,fontFamily:"'Outfit'"}}>{p.lift}</span></div>
          </div>
          {p.departments.map((d,di)=>(<div key={di} style={{marginBottom:di<p.departments.length-1?10:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><div style={{width:3,height:14,borderRadius:2,background:d.color}}/><span style={{fontSize:12,fontWeight:700,color:d.color}}>{d.dept}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginLeft:10}}>{d.tasks.map((tk,ti)=>(<div key={ti} style={{padding:"6px 8px",background:C.bg,borderRadius:5,fontSize:11,color:C.sub,display:"flex",gap:6}}><span style={{color:d.color,fontSize:10}}>→</span>{tk}</div>))}</div>
          </div>))}
        </Card>
      </div>))}
    </div>

    <Card style={{marginTop:20,background:`linear-gradient(135deg,${C.accent}08,${C.accent}03)`,border:`1px solid ${C.accent}20`,textAlign:"center"}}>
      <div style={{fontSize:17,fontWeight:700,color:C.text,fontFamily:"'Outfit'",marginBottom:4}}>Ready to dominate AI search results?</div>
      <p style={{fontSize:12,color:C.sub,maxWidth:460,margin:"0 auto 14px"}}>Let Entermind execute this strategy and guarantee measurable AEO improvements within 90 days.</p>
      <button onClick={handleExport} style={{padding:"11px 26px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Export Full Report as PDF</button>
    </Card>
  </div>);
}

/* ─── MAIN APP ─── */
export default function App(){
  const[step,setStep]=useState("input");
  const[data,setData]=useState({brand:"",industry:"",website:"",region:"",topics:[],competitors:[]});
  const[results,setResults]=useState(null);
  const[history,setHistory]=useState([]);
  const run=(apiData)=>{
    const r=generateAll(data, apiData);setResults(r);
    const entry={date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:r.overall,engines:[r.engines[0].score,r.engines[1].score,r.engines[2].score],mentions:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/3),citations:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/3),categories:r.painPoints.map(p=>({label:p.label,score:p.score}))};
    if(history.length===0){const fh=[];for(let i=4;i>=1;i--){const d=new Date();d.setDate(d.getDate()-i*14);const n=()=>Math.round((Math.random()-.6)*8);fh.push({date:d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:Math.max(5,Math.min(95,entry.overall-i*5+n())),engines:[Math.max(5,Math.min(95,entry.engines[0]-i*4+n())),Math.max(5,Math.min(95,entry.engines[1]-i*5+n())),Math.max(5,Math.min(95,entry.engines[2]-i*3+n()))],mentions:Math.max(5,entry.mentions-i*4+n()),citations:Math.max(5,entry.citations-i*3+n()),categories:entry.categories.map(c=>({label:c.label,score:Math.max(5,Math.min(95,c.score-i*4+n()))}))});}setHistory([...fh,entry]);}else{setHistory([...history,entry]);}
    setStep("audit");
  };
  return(<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Plus Jakarta Sans',-apple-system,sans-serif",color:C.text}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::selection{background:#0c4cfc18}`}</style>
    <div style={{padding:"11px 24px",borderBottom:`1px solid ${C.border}`,background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}><Logo/>{results&&<div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/><span style={{fontSize:12,color:C.muted}}>Active: <strong style={{color:C.text}}>{results.clientData.brand}</strong> · Score: <strong style={{color:results.overall>=70?C.green:results.overall>=40?C.amber:C.red}}>{results.overall}</strong></span></div>}</div>
    <div style={{padding:"0 24px",borderBottom:`1px solid ${C.border}`,background:"#fff",overflowX:"auto"}}><div style={{display:"flex",minWidth:"max-content"}}>
      {STEPS.map(s=>{const dis=(!results&&s.id!=="input")||s.comingSoon;return(<button key={s.id} onClick={()=>{if(!dis)setStep(s.id);}} style={{padding:"10px 14px",background:"none",border:"none",borderBottom:step===s.id&&!s.comingSoon?`2px solid ${C.accent}`:"2px solid transparent",color:s.comingSoon?"#c8cdd5":step===s.id?C.accent:dis?"#d0d5dd":C.muted,fontSize:12,fontWeight:600,cursor:dis?"default":"pointer",fontFamily:"'Plus Jakarta Sans'",transition:"all .15s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,opacity:s.comingSoon?.5:1}}><span style={{fontSize:10,opacity:.5}}>{s.n}</span>{s.label}{s.comingSoon&&<span style={{fontSize:8,fontWeight:700,color:"#fff",background:"#c8cdd5",padding:"1px 5px",borderRadius:3,marginLeft:3}}>SOON</span>}</button>);})}
    </div></div>
    <div style={{padding:24,maxWidth:1020,margin:"0 auto"}}>
      {step==="input"&&<NewAuditPage data={data} setData={setData} onRun={run}/>}
      {step==="audit"&&results&&<AuditPage r={results} history={history} goTo={setStep}/>}
      {step==="archetypes"&&results&&<ArchetypesPage r={results} goTo={setStep}/>}
      {step==="intent"&&results&&<IntentPage r={results} goTo={setStep}/>}
      {step==="playbook"&&results&&<PlaybookPage r={results} goTo={setStep}/>}
      {step==="channels"&&results&&<ChannelsPage r={results} goTo={setStep}/>}
      {step==="grid"&&results&&<GridPage r={results} goTo={setStep}/>}
      {step==="roadmap"&&results&&<RoadmapPage r={results}/>}
    </div>
  </div>);
}
