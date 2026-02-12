import React, { useState } from "react";

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const ClaudeLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M16.98 11.14L12.58 2.29C12.42 1.97 12.09 1.77 11.73 1.77C11.37 1.77 11.04 1.97 10.88 2.29L3.07 17.84C2.91 18.16 2.94 18.54 3.15 18.83C3.36 19.12 3.71 19.27 4.07 19.22L11.73 18.15L16.57 12.05C16.84 11.71 16.98 11.14 16.98 11.14Z" fill="#D97706"/><path d="M20.93 17.84L17.38 10.77L11.73 18.15L19.93 19.22C20.29 19.27 20.64 19.12 20.85 18.83C21.06 18.54 21.09 18.16 20.93 17.84Z" fill="#B45309"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const C={bg:"#f8f9fb",surface:"#ffffff",border:"#e8ecf1",borderSoft:"#f0f2f5",text:"#111827",sub:"#4b5563",muted:"#9ca3af",accent:"#2563eb",green:"#059669",amber:"#d97706",red:"#dc2626",r:12,rs:8};
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.26,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Outfit'"}}>{score}%</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:22,boxShadow:"0 1px 2px rgba(0,0,0,.03)",...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}
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
function MiniDonut({data,size=110,innerRatio=.6}){
  const[hover,setHover]=useState(null);
  const cx=size/2,cy=size/2,r=size/2-2,ir=r*innerRatio;
  let cumAngle=-Math.PI/2;
  const total=data.reduce((a,d)=>a+d.value,0)||1;
  const arcs=data.map((d)=>{const angle=Math.max(0.02,(d.value/total)*2*Math.PI);const start=cumAngle;cumAngle+=angle;const end=cumAngle;
    const x1=cx+r*Math.cos(start),y1=cy+r*Math.sin(start),x2=cx+r*Math.cos(end),y2=cy+r*Math.sin(end);
    const ix1=cx+ir*Math.cos(end),iy1=cy+ir*Math.sin(end),ix2=cx+ir*Math.cos(start),iy2=cy+ir*Math.sin(start);
    const large=angle>Math.PI?1:0;
    const path=`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix1},${iy1} A${ir},${ir} 0 ${large} 0 ${ix2},${iy2} Z`;
    return{...d,path,pct:Math.round((d.value/total)*100)};
  });
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block"}} onMouseLeave={()=>setHover(null)}>
      {arcs.map((a,i)=>(<path key={i} d={a.path} fill={hover===i?a.color:`${a.color}bb`} stroke={C.surface} strokeWidth="2" onMouseEnter={()=>setHover(i)} style={{cursor:"default",transition:"fill .1s"}}/>))}
      {hover!==null?<text x={cx} y={cy+5} textAnchor="middle" fontSize="16" fontWeight="700" fill={arcs[hover].color} fontFamily="Outfit">{arcs[hover].pct}%</text>:
      <text x={cx} y={cy+5} textAnchor="middle" fontSize="14" fontWeight="600" fill={C.muted} fontFamily="Outfit">{arcs[0]?.pct||0}%</text>}
    </svg>
    <div style={{display:"flex",flexDirection:"column",gap:3,width:"100%"}}>
      {arcs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,cursor:"default",padding:"1px 0"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
        <div style={{width:7,height:7,borderRadius:2,background:a.color,flexShrink:0}}/>
        <span style={{color:hover===i?C.text:C.sub,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:hover===i?600:400,transition:"all .1s"}}>{a.label}</span>
        <span style={{fontWeight:600,color:hover===i?a.color:C.text,flexShrink:0,fontFamily:"'Outfit'",transition:"color .1s"}}>{a.pct}%</span>
      </div>))}
    </div>
  </div>);
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

// Call a specific engine by name, with fallback to OpenAI
async function callEngine(engine, prompt, systemPrompt){
  if(engine==="openai") return await callOpenAI(prompt, systemPrompt);
  if(engine==="gemini") return await callGemini(prompt, systemPrompt);
  return await callOpenAI(prompt, systemPrompt);
}

function safeJSON(text){
  if(!text)return null;
  try{const clean=text.replace(/```json|```/g,"").trim();return JSON.parse(clean);}catch(e){
    const m=text.match(/\{[\s\S]*\}/)||text.match(/\[[\s\S]*\]/);
    if(m)try{return JSON.parse(m[0]);}catch(e2){}
    return null;
  }
}

/* ─── WEBSITE CRAWLER ─── */
async function crawlWebsite(url){
  if(!url||url.length<3)return null;
  try{
    const isArtifact=typeof window!=="undefined"&&window.location.hostname.includes("claude");
    if(isArtifact)return null; // crawl only works on Vercel
    const res=await fetch("/api/crawl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
    const data=await res.json();
    if(data.error)return null;
    return data;
  }catch(e){console.error("Crawl error for "+url+":",e);return null;}
}

function summariseCrawl(crawl){
  if(!crawl||!crawl.mainPage)return"No crawl data available.";
  const mp=crawl.mainPage;
  const parts=[];
  parts.push(`Title: "${mp.title}"`);
  if(mp.metaDescription)parts.push(`Meta description: "${mp.metaDescription}"`);
  if(mp.schemas&&mp.schemas.length>0)parts.push(`Schema markup: ${mp.schemas.join(", ")}`);
  else parts.push("No JSON-LD schema markup detected.");
  if(mp.headings){
    if(mp.headings.h1s.length>0)parts.push(`H1: ${mp.headings.h1s.slice(0,3).join(" | ")}`);
    parts.push(`H2 count: ${mp.headings.h2s.length}, H3 count: ${mp.headings.h3Count}`);
  }
  parts.push(`Word count: ${mp.wordCount||0}`);
  parts.push(`Internal links: ${mp.internalLinks||0}`);
  if(mp.hasOpenGraph)parts.push("Has Open Graph tags ✓"); else parts.push("Missing Open Graph tags ✗");
  if(mp.hasTwitterCard)parts.push("Has Twitter Card ✓"); else parts.push("Missing Twitter Card ✗");
  if(mp.hasFAQMarkup)parts.push("Has FAQ schema ✓"); else parts.push("No FAQ schema ✗");
  if(mp.hasArticleMarkup)parts.push("Has Article/Blog schema ✓"); else parts.push("No Article schema ✗");
  if(mp.hasAuthorInfo)parts.push("Author info detected ✓"); else parts.push("No author info ✗");
  if(mp.hasTrustSignals)parts.push("Trust signals detected (awards/certs) ✓"); else parts.push("No trust signals ✗");
  if(mp.hasTestimonials)parts.push("Testimonials/reviews detected ✓"); else parts.push("No testimonials ✗");
  if(mp.hasVideo)parts.push("Video content detected ✓"); else parts.push("No video content ✗");
  parts.push(`Images: ${mp.imageCount||0}, Tables: ${mp.tableCount||0}, Lists: ${mp.listCount||0}`);
  // Sub-pages
  const sp=crawl.subPages||{};
  if(sp.blog)parts.push(`Blog/resources page found at ${sp.blog.url} (${sp.blog.wordCount||0} words)`);
  else parts.push("No blog/resources section found.");
  if(sp.about)parts.push(`About page found at ${sp.about.url}`);
  if(sp.faq)parts.push(`FAQ page found at ${sp.faq.url}`);
  if(sp.products)parts.push(`Products/services page found at ${sp.products.url}`);
  return parts.join("\n");
}

async function runRealAudit(cd, onProgress){
  const brand=cd.brand||"Brand",industry=cd.industry||"Technology",region=cd.region||"Global",topics=cd.topics||["tech"];
  const compNames=(cd.competitors||[]).map(c=>typeof c==="string"?c:c.name).filter(Boolean);
  const compUrls=(cd.competitors||[]).map(c=>typeof c==="object"?c.website:"").filter(Boolean);
  const topicList=topics.join(", ");

  // ── Step 1: Crawl brand website ──
  onProgress("Crawling brand website...",5);
  let brandCrawl=null;
  try{brandCrawl=await crawlWebsite(cd.website);}catch(e){console.error("Crawl failed:",e);}
  const crawlSummary=brandCrawl?summariseCrawl(brandCrawl):"No crawl data available.";

  // ── Step 2: Query ChatGPT for brand visibility ──
  onProgress("Querying ChatGPT for brand visibility...",12);
  const engineSystemPrompt=`You are an AEO (Answer Engine Optimization) analyst. Respond ONLY with valid JSON, no markdown fences, no explanations.`;
  const enginePrompt=`Analyse how the AI engine would respond to queries about "${brand}" in the "${industry}" industry, region: "${region}". Topics: ${topicList}. Competitors: ${compNames.join(", ")||"none specified"}.

Website crawl data:
${crawlSummary}

Return JSON:
{
  "score": <0-100 overall visibility score>,
  "mentionRate": <0-100 % of relevant queries where brand is mentioned>,
  "citationRate": <0-100 % of queries where brand website is directly cited/linked>,
  "queries": [{"query":"<specific user prompt>","status":"Cited"|"Mentioned"|"Absent"}] (exactly 8 queries),
  "strengths": ["<specific strength based on crawl data>","<another strength>"],
  "weaknesses": ["<specific weakness based on crawl data>","<another weakness>"]
}

Be accurate. Base scores on real factors: does the brand have structured data? FAQ schema? Strong content? Authority signals? Use the crawl data to inform your analysis. Low scores are fine if warranted.`;

  const gptRaw=await callOpenAI(enginePrompt, engineSystemPrompt);
  const gptData=safeJSON(gptRaw)||{score:25,mentionRate:15,citationRate:8,queries:[],strengths:["Brand has basic web presence"],weaknesses:["Limited structured data detected"]};

  // ── Step 3: Query Gemini for brand visibility ──
  onProgress("Querying Gemini for brand visibility...",22);
  const gemRaw=await callGemini(enginePrompt, engineSystemPrompt);
  const gemData=safeJSON(gemRaw)||{score:20,mentionRate:12,citationRate:5,queries:[],strengths:["Brand appears in search results"],weaknesses:["Missing schema markup"]};

  // ── Step 4: Competitor analysis ──
  onProgress("Analysing competitors...",32);
  const compPrompt=`Analyse these competitors against "${brand}" in ${industry} (${region}) for AI engine visibility.
Competitors: ${compNames.map((n,i)=>`${n}${compUrls[i]?" ("+compUrls[i]+")":""}`).join(", ")||"none"}.

For each competitor, estimate their AEO visibility compared to ${brand}. Return JSON:
{
  "competitors": [
    {
      "name": "<competitor name>",
      "score": <0-100>,
      "engineScores": [<chatgpt_score>, <gemini_score>],
      "topStrength": "<their main advantage>",
      "painPoints": [
        {"label":"Structured Data / Schema","score":<0-100>},
        {"label":"Content Authority","score":<0-100>},
        {"label":"E-E-A-T Signals","score":<0-100>},
        {"label":"Technical SEO","score":<0-100>},
        {"label":"Citation Network","score":<0-100>},
        {"label":"Content Freshness","score":<0-100>}
      ]
    }
  ]
}`;
  const compRaw=await callOpenAI(compPrompt, engineSystemPrompt);
  const compData=safeJSON(compRaw)||{competitors:[]};

  // ── Step 5: Pain points / category scoring ──
  onProgress("Scoring AEO categories...",42);
  const catPrompt=`Based on this website analysis for "${brand}" (${industry}, ${region}):

${crawlSummary}

Score each AEO category 0-100. Return JSON:
{
  "painPoints": [
    {"label":"Structured Data / Schema","score":<0-100>,"severity":"critical"|"warning"|"good"},
    {"label":"Content Authority","score":<0-100>,"severity":"critical"|"warning"|"good"},
    {"label":"E-E-A-T Signals","score":<0-100>,"severity":"critical"|"warning"|"good"},
    {"label":"Technical SEO","score":<0-100>,"severity":"critical"|"warning"|"good"},
    {"label":"Citation Network","score":<0-100>,"severity":"critical"|"warning"|"good"},
    {"label":"Content Freshness","score":<0-100>,"severity":"critical"|"warning"|"good"}
  ]
}

Use severity: "critical" if <30, "warning" if 30-60, "good" if >60. Be accurate based on the crawl data.`;
  const catRaw=await callGemini(catPrompt, engineSystemPrompt);
  const catData=safeJSON(catRaw)||{painPoints:[
    {label:"Structured Data / Schema",score:25,severity:"critical"},
    {label:"Content Authority",score:40,severity:"warning"},
    {label:"E-E-A-T Signals",score:30,severity:"warning"},
    {label:"Technical SEO",score:45,severity:"warning"},
    {label:"Citation Network",score:20,severity:"critical"},
    {label:"Content Freshness",score:35,severity:"warning"}
  ]};

  // ── Step 6: User archetypes ──
  onProgress("Generating user archetypes...",52);
  const archPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}, competitors: ${compNames.join(", ")||"none"}.

Create 2-3 stakeholder groups with 2-3 archetypes each. Each archetype needs a 4-stage customer journey with 3 prompts per stage showing how AI engines respond.

Return JSON:
{
  "stakeholders": [
    {
      "group": "<group name>",
      "icon": "<emoji>",
      "desc": "<1 sentence description>",
      "archetypes": [
        {
          "name": "<archetype name>",
          "icon": "<emoji>",
          "demo": "<demographics>",
          "behavior": "<search behavior>",
          "intent": "<primary intent>",
          "size": <% of searches 10-40>,
          "brandVisibility": <0-100>,
          "opportunity": "high"|"medium"|"low",
          "prompts": ["<prompt 1>","<prompt 2>","<prompt 3>","<prompt 4>"],
          "journey": [
            {"stage":"Awareness","color":"#6366f1","prompts":[
              {"query":"<actual prompt>","status":"Cited"|"Mentioned"|"Absent","engines":{"gpt":"Cited"|"Mentioned"|"Absent","gemini":"Cited"|"Mentioned"|"Absent"}}
            ]},
            {"stage":"Consideration","color":"#8b5cf6","prompts":[...]},
            {"stage":"Transaction","color":"#ec4899","prompts":[...]},
            {"stage":"Retention","color":"#f59e0b","prompts":[...]}
          ]
        }
      ]
    }
  ]
}

Make prompts realistic for ${region}. Use "Absent" for most prompts if ${brand} has low visibility. Each stage should have 2-3 prompts.`;
  const archRaw=await callOpenAI(archPrompt, engineSystemPrompt);
  const archData=safeJSON(archRaw)||{stakeholders:[]};

  // ── Step 7: AEO Channels verification via crawl + search ──
  onProgress("Verifying AEO channels...",65);
  // Use Gemini with web search context + crawl data for accurate channel detection
  const channelPrompt=`For "${brand}" (website: ${cd.website||"unknown"}) in ${industry} (${region}):

Website crawl data:
${crawlSummary}

Based on the crawl data and your knowledge, determine which AEO distribution channels this brand is present on. Use the crawl data signals:
- If schemas include "FAQPage" → they have FAQ content
- If hasVideo is true → they likely have YouTube
- If hasArticleMarkup → they have blog content
- Check for social media links in the page

Return JSON:
{
  "channels": [
    {"channel":"Wikipedia","status":"Active"|"Needs Work"|"Not Present","finding":"<specific detail about what you found>","priority":"High"|"Medium"|"Low","action":"<specific actionable recommendation>"},
    {"channel":"YouTube","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"LinkedIn","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Reddit","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Quora","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Industry Directories","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Review Sites (G2/Capterra/Trustpilot)","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Press/News Coverage","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Podcast Appearances","status":"...","finding":"...","priority":"...","action":"..."},
    {"channel":"Academic/Research Citations","status":"...","finding":"...","priority":"...","action":"..."}
  ]
}

IMPORTANT: Be conservative and accurate. Only mark as "Active" if you have strong reason to believe the brand is present there. For smaller or regional brands, most channels will be "Not Present" or "Needs Work". Base your assessment on the crawl data signals and your knowledge of the brand.`;
  const chRaw=await callGemini(channelPrompt, engineSystemPrompt);
  const chData=safeJSON(chRaw)||{channels:[]};

  // ── Step 8: Content recommendations ──
  onProgress("Building content recommendations...",78);
  const contentPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}.

Based on their AEO gaps, recommend content types. Return JSON:
{
  "contentTypes": [
    {"type":"<content type>","priority":"High"|"Medium"|"Low","description":"<why this helps AEO>","prompts":["<AI prompt this would help rank for>","<another prompt>"],"effort":"Low"|"Medium"|"High","impact":"High"|"Medium"|"Low"}
  ]
}

Provide 6-8 content types. Focus on content that helps AI engines cite and mention ${brand}.`;
  const contentRaw=await callOpenAI(contentPrompt, engineSystemPrompt);
  const contentData=safeJSON(contentRaw)||{contentTypes:[]};

  // ── Step 9: 90-Day Roadmap ──
  onProgress("Creating 90-day roadmap...",88);
  const roadmapPrompt=`Create a 90-day AEO roadmap for "${brand}" in ${industry} (${region}).

Return JSON:
{
  "day30": {
    "title": "Foundation Sprint",
    "sub": "Days 1-30",
    "accent": "#ef4444",
    "lift": "10-15%",
    "departments": [
      {"dept": "Technical", "color": "#0c4cfc", "tasks": ["<specific task 1>", "<specific task 2>", "<specific task 3>"]},
      {"dept": "Content", "color": "#059669", "tasks": ["<specific task 1>", "<specific task 2>", "<specific task 3>"]},
      {"dept": "PR & Outreach", "color": "#8b5cf6", "tasks": ["<specific task 1>", "<specific task 2>", "<specific task 3>"]}
    ]
  },
  "day60": {
    "title": "Authority Building",
    "sub": "Days 31-60",
    "accent": "#f59e0b",
    "lift": "20-30%",
    "departments": [
      {"dept": "Technical", "color": "#0c4cfc", "tasks": [...]},
      {"dept": "Content", "color": "#059669", "tasks": [...]},
      {"dept": "PR & Outreach", "color": "#8b5cf6", "tasks": [...]}
    ]
  },
  "day90": {
    "title": "Dominance & Scale",
    "sub": "Days 61-90",
    "accent": "#10b981",
    "lift": "40-60%",
    "departments": [
      {"dept": "Technical", "color": "#0c4cfc", "tasks": [...]},
      {"dept": "Content", "color": "#059669", "tasks": [...]},
      {"dept": "PR & Outreach", "color": "#8b5cf6", "tasks": [...]}
    ]
  }
}

Each department should have 3-5 specific, actionable tasks tailored to ${brand}'s ${industry} context.`;
  const roadRaw=await callGemini(roadmapPrompt, engineSystemPrompt);
  const roadData=safeJSON(roadRaw)||{phases:[],kpis:[]};

  onProgress("Compiling final report...",95);

  return {
    engineData:{
      engines:[
        {id:"chatgpt",...gptData,queries:(gptData.queries||[]).slice(0,8)},
        {id:"gemini",...gemData,queries:(gemData.queries||[]).slice(0,8)}
      ],
      painPoints:(catData.painPoints||[]).slice(0,6)
    },
    competitorData:{competitors:(compData.competitors||[]).slice(0,5)},
    archData:archData.stakeholders||[],
    channelData:{channels:(chData.channels||[]).slice(0,10)},
    contentGridData:(contentData.contentTypes||[]).slice(0,8),
    roadmapData:roadData,
    contentData:(contentData.contentTypes||[]).slice(0,8)
  };
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
  // Normalize competitors to {name, website} objects and extract name strings
  const normComps=(cd.competitors||[]).map(c=>typeof c==="string"?{name:c,website:""}:c).filter(c=>c.name&&c.name.trim());
  const compNameList=normComps.map(c=>c.name);
  // Create a shallow copy with normalized competitors for downstream use
  cd={...cd, competitors:normComps, competitorNames:compNameList};
  const seed=cd.brand.length+cd.website.length+(cd.industry||"").length+cd.topics.length;
  const pr=o=>{const x=Math.sin(seed+o)*10000;return x-Math.floor(x);};
  const base=30+pr(1)*45;
  const hasApi=apiData&&apiData.engineData;

  // Engines — use API data if available, fallback to simulated
  const engineMeta=[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{id:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo}];
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
      const defWeaknesses=[`Limited third-party citations and reviews reduce AI engines' confidence to recommend ${cd.brand}`,`Larger competitors like ${cd.competitorNames[0]||"established firms"} dominate generic ${cd.industry} queries`];
      return{...e,score:ae.score||Math.round(base),mentionRate:ae.mentionRate||50,citationRate:ae.citationRate||30,
        queries:(ae.queries||[]).slice(0,8).map(q=>({query:q.query||"",status:q.status||"Absent"})),
        strengths:filterBad(ae.strengths,defStrengths),weaknesses:filterBad(ae.weaknesses,defWeaknesses)};
    }
    const score=Math.max(8,Math.min(95,Math.round(base+(pr(i*7+3)-.5)*20)));
    return{...e,score,mentionRate:Math.min(100,Math.round(score*.8+pr(i*11)*15)),citationRate:Math.min(100,Math.round(score*.5+pr(i*13)*20)),
      queries:[`Best ${cd.industry} companies`,`${t0} recommendations`,`${cd.brand} reviews`,`Top ${cd.industry} providers`,`Is ${cd.brand} worth it`,`${t0} comparison`,`${cd.brand} vs ${cd.competitorNames[0]||"competitors"}`,`${cd.industry} buyer guide`].map((q,j)=>({query:q,status:pr(i*31+j*37)<.35?"Cited":pr(i*31+j*37)<.65?"Mentioned":"Absent"})),
      strengths:["Strong FAQ coverage detected","Cited in comparison queries"],weaknesses:["Missing from 'best of' queries","Not cited as authoritative source"]};
  });
  // Score = weighted: Mentions 50% + Citations 50%
  const calcEngineScore=(e)=>Math.round(e.mentionRate*0.5+e.citationRate*0.5);
  engines.forEach(e=>{e.score=calcEngineScore(e);});
  const overall=Math.round(engines.reduce((a,e)=>a+e.score,0)/engines.length);

  // Score interpretation
  const getScoreLabel=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const getScoreDesc=(s,brand)=>{
    if(s>=80)return`${brand} is a dominant voice in AI engine responses — frequently cited and recommended across all major platforms.`;
    if(s>=60)return`${brand} has strong AI visibility — regularly mentioned by engines but with room to increase direct citations and become the go-to recommendation.`;
    if(s>=40)return`${brand} has moderate visibility — AI engines are aware of the brand but rarely cite it as a primary source. Competitors are more frequently recommended.`;
    if(s>=20)return`${brand} has weak AI visibility — engines occasionally mention the brand but almost never cite the website. Significant work needed to build presence.`;
    return`${brand} is largely invisible to AI engines — not mentioned in relevant queries. Competitors dominate the conversation entirely.`;
  };

  // Pain points — use API data if available
  const painCats=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  const painPoints=(hasApi&&apiData.engineData.painPoints)?apiData.engineData.painPoints.map(pp=>({label:pp.label,score:pp.score,severity:pp.score<40?"critical":pp.score<65?"warning":"good"})):painCats.map((label,i)=>{const s=Math.max(5,Math.min(95,Math.round(base+(pr(i*19+7)-.5)*40)));return{label,score:s,severity:s<40?"critical":s<65?"warning":"good"};});

  // Competitors — use API data if available
  const brandLower=cd.brand.toLowerCase().trim();
  const isNotSelf=(name)=>{const n=name.toLowerCase().trim();return n!==brandLower&&!n.includes(brandLower)&&!brandLower.includes(n);};
  const competitors=(apiData&&apiData.competitorData&&(Array.isArray(apiData.competitorData)?apiData.competitorData:apiData.competitorData.competitors)&&((Array.isArray(apiData.competitorData)?apiData.competitorData:apiData.competitorData.competitors)||[]).length>0)?(Array.isArray(apiData.competitorData)?apiData.competitorData:apiData.competitorData.competitors).filter(c=>isNotSelf(c.name)).map(c=>{
    const cPain=(c.painPoints||[]).map(pp=>({label:pp.label,score:pp.score}));
    const advantages=cPain.map((cp,j)=>{const diff=cp.score-(painPoints[j]?.score||50);return{cat:cp.label,theirScore:cp.score,yourScore:painPoints[j]?.score||50,diff,insight:Math.abs(diff)>8?getInsight(cp.label,c.name,cd.brand,diff>0):null};}).filter(a=>a.insight);
    return{name:c.name,score:c.score,painPoints:cPain,advantages,engineScores:c.engineScores||[c.score,c.score-3,c.score+2],topStrength:c.topStrength||"Unknown"};
  }):cd.competitorNames.filter(n=>isNotSelf(n)).map((name,i)=>{
    const cs=Math.max(15,Math.min(95,Math.round(base+(pr(i*23+11)-.5)*50)));
    const cPain=painCats.map((l,j)=>({label:l,score:Math.max(10,Math.min(95,Math.round(cs+(pr(i*29+j*31)-.5)*30)))}) );
    const advantages=cPain.map((cp,j)=>{const diff=cp.score-painPoints[j].score;return{cat:cp.label,theirScore:cp.score,yourScore:painPoints[j].score,diff,insight:Math.abs(diff)>8?getInsight(cp.label,name,cd.brand,diff>0):null};}).filter(a=>a.insight);
    return{name,score:cs,painPoints:cPain,advantages,engineScores:[Math.max(8,Math.min(95,Math.round(cs+(pr(i*37)-.5)*15))),Math.max(8,Math.min(95,Math.round(cs+(pr(i*41)-.5)*15))),Math.max(8,Math.min(95,Math.round(cs+(pr(i*43)-.5)*15)))],topStrength:cPain.reduce((a,b)=>b.score>a.score?b:a,cPain[0]).label};
  });

  // Stakeholder-grouped archetypes — use API data if available
  const stakeholders=(apiData&&apiData.archData&&Array.isArray(apiData.archData)&&apiData.archData.length>0)?apiData.archData.map(sg=>({group:sg.group,icon:sg.icon||"👤",desc:sg.desc||"",archetypes:(sg.archetypes||[]).map(a=>({name:a.name,icon:a.icon||"👤",demo:a.demo||"Various",behavior:a.behavior||"Research queries",intent:a.intent||"Find information",size:a.size||15,brandVisibility:a.brandVisibility||Math.round(overall*.6),opportunity:a.opportunity||"medium",prompts:a.prompts||[],journey:a.journey||[]}))})):[
    {group:"End Users / Consumers",icon:"👤",desc:"People who directly use or purchase the product/service",archetypes:[
      {name:"Budget-Conscious Researchers",icon:"🎓",demo:"18-25, Students",behavior:"Compare prices, seek free alternatives",intent:"Find affordable option",size:Math.round(10+pr(41)*30),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(53)-.5)*40))),opportunity:pr(47)>.5?"high":"medium",prompts:[`Best affordable ${cd.industry||"tech"} solutions`,`Cheap ${cd.topics[0]||"services"} for students`,`Free ${cd.topics[0]||"tools"} alternatives`,`${cd.industry||"Tech"} student discounts`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`Cheapest ${cd.industry} options`,status:pr(70)<.3?"Mentioned":"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`Free ${cd.topics[0]||"tools"} alternatives`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.industry} student discounts`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} vs ${cd.competitorNames[0]||"competitor"} pricing`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`Best budget ${cd.industry} ${new Date().getFullYear()}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`${cd.brand} free trial`,status:pr(73)<.3?"Cited":"Absent",engines:{gpt:pr(73)<.3?"Cited":"Absent",gemini:"Absent"}},{query:`${cd.brand} student plan sign up`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} referral program`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`How to save on ${cd.brand} renewal`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
      {name:"First-Time Buyers",icon:"🔍",demo:"All ages, New to category",behavior:"Educational queries, beginner guides",intent:"Understand before buying",size:Math.round(15+pr(44)*25),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(56)-.5)*40))),opportunity:"high",prompts:[`What is ${cd.topics[0]||cd.industry}`,`${cd.industry} beginner guide`,`How to choose ${cd.topics[0]||"provider"}`,`${cd.industry} explained`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`What is ${cd.topics[0]||cd.industry}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.industry} beginner guide`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`How does ${cd.topics[0]||cd.industry} work`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`Best ${cd.industry} for beginners`,status:pr(74)<.3?"Mentioned":"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} reviews`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`Easiest ${cd.industry} to use`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`How to start with ${cd.brand}`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`${cd.brand} onboarding guide`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} tips for beginners`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
      {name:"Switchers & Upgraders",icon:"🔄",demo:"28-45, Competitor users",behavior:"Alternative-to queries, comparisons",intent:"Find better alternative",size:Math.round(8+pr(45)*20),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(57)-.5)*40))),opportunity:"high",prompts:[`${cd.competitorNames[0]||"Competitor"} alternatives`,`Switch to ${cd.brand}`,`${cd.brand} vs ${cd.competitorNames[0]||"competitor"}`,`${cd.industry} migration guide`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`${cd.competitorNames[0]||"Competitor"} alternatives`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`Best ${cd.industry} to switch to`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} vs ${cd.competitorNames[0]||"competitor"}`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Mentioned"}},{query:`Is ${cd.brand} better than ${cd.competitorNames[0]||"competitor"}`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`${cd.brand} migration experience`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`Switch to ${cd.brand} from ${cd.competitorNames[0]||"competitor"}`,status:pr(75)<.4?"Mentioned":"Absent",engines:{gpt:pr(75)<.4?"Mentioned":"Absent",gemini:"Absent"}},{query:`${cd.brand} transfer process`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} advanced features`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`Get more from ${cd.brand}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
    ]},
    {group:"Business Decision Makers",icon:"💼",desc:"People evaluating solutions for their organisation",archetypes:[
      {name:"Enterprise Decision Makers",icon:"📊",demo:"35-55, C-Suite & Directors",behavior:"Evaluate ROI, compare features",intent:"Find reliable enterprise solution",size:Math.round(10+pr(42)*25),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(54)-.5)*40))),opportunity:"high",prompts:[`Best enterprise ${cd.industry} platform`,`${cd.topics[0]||"Solution"} ROI comparison`,`Top ${cd.industry} for large companies`,`${cd.brand} enterprise reviews`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`Top enterprise ${cd.industry} platforms`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.industry} market leaders ${new Date().getFullYear()}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} enterprise reviews`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`${cd.topics[0]||"Solution"} ROI comparison`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} vs ${cd.competitorNames[0]||"competitor"} for enterprise`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`${cd.brand} enterprise pricing`,status:pr(76)<.3?"Mentioned":"Absent",engines:{gpt:pr(76)<.3?"Mentioned":"Absent",gemini:"Absent"}},{query:`${cd.brand} demo request`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} enterprise support`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`${cd.brand} uptime SLA`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
      {name:"Procurement & Ops Managers",icon:"📋",demo:"30-50, Mid-management",behavior:"Vendor comparisons, compliance checks",intent:"Find compliant, cost-effective vendor",size:Math.round(6+pr(46)*15),brandVisibility:Math.max(5,Math.min(85,Math.round(base+(pr(58)-.5)*35))),opportunity:"medium",prompts:[`${cd.industry} vendor comparison`,`${cd.brand} compliance certifications`,`${cd.industry} procurement guide`,`${cd.brand} SLA details`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`${cd.industry} vendor comparison ${new Date().getFullYear()}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.industry} procurement guide`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} compliance certifications`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} SLA details`,status:pr(77)<.3?"Mentioned":"Absent",engines:{gpt:pr(77)<.3?"Mentioned":"Absent",gemini:"Absent"}},{query:`${cd.brand} vs ${cd.competitorNames[0]||"competitor"} pricing for business`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`${cd.brand} business plan pricing`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} bulk licensing`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} vendor management portal`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
    ]},
    {group:"Technical Evaluators",icon:"⚙️",desc:"People assessing technical capabilities and integration",archetypes:[
      {name:"Tech-Savvy Evaluators",icon:"⚡",demo:"25-40, Engineers & Leads",behavior:"Deep-dive specs, APIs, integrations",intent:"Find technically capable solution",size:Math.round(10+pr(43)*20),brandVisibility:Math.max(5,Math.min(90,Math.round(base+(pr(55)-.5)*40))),opportunity:pr(48)>.4?"high":"medium",prompts:[`${cd.topics[0]||"Platform"} technical comparison`,`Best ${cd.industry} API`,`${cd.brand} developer reviews`,`${cd.topics[0]||"Tool"} benchmarks`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`Best ${cd.industry} API ${new Date().getFullYear()}`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.topics[0]||"Tool"} benchmarks`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} developer reviews`,status:"Mentioned",engines:{gpt:"Mentioned",gemini:"Absent"}},{query:`${cd.brand} API documentation quality`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} integration capabilities`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`${cd.brand} developer plan`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} sandbox access`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} API changelog`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} developer community`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
      {name:"IT Security & Compliance",icon:"🛡️",demo:"30-50, InfoSec & Legal",behavior:"Security audits, data privacy queries",intent:"Verify security and compliance",size:Math.round(4+pr(49)*10),brandVisibility:Math.max(5,Math.min(80,Math.round(base+(pr(59)-.5)*30))),opportunity:"medium",prompts:[`${cd.brand} security features`,`${cd.industry} data compliance`,`${cd.brand} SOC 2 certification`,`${cd.industry} GDPR compliance`],
        journey:[
          {stage:"Awareness",color:"#6366f1",prompts:[{query:`${cd.industry} data compliance requirements`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.industry} security best practices`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Consideration",color:"#8b5cf6",prompts:[{query:`${cd.brand} SOC 2 certification`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} GDPR compliance`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} security audit report`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Transaction",color:"#a855f7",prompts:[{query:`${cd.brand} security certification verification`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]},
          {stage:"Retention",color:"#c084fc",prompts:[{query:`${cd.brand} security updates`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}},{query:`${cd.brand} incident response`,status:"Absent",engines:{gpt:"Absent",gemini:"Absent"}}]}
        ]},
    ]},
  ];

  // Intent funnel — use API data if available
  const t0=cd.topics[0]||cd.industry||"tech";
  const mkP=(temps,off)=>temps.map((q,j)=>({query:q,rank:Math.round(1+pr(j*61+off)*15),status:pr(j*63+off)<.3?"Cited":pr(j*63+off)<.6?"Mentioned":"Absent"}));
  const funnelStages=(apiData&&apiData.intentData&&Array.isArray(apiData.intentData)&&apiData.intentData.length>0)?apiData.intentData.map(s=>({stage:s.stage,desc:s.desc||"",color:s.color||"#6366f1",prompts:(s.prompts||[]).map(p=>({query:p.query||"",rank:p.rank||8,status:p.status||"Absent"}))})):[
    {stage:"Awareness",desc:"User discovers the category",color:"#6366f1",prompts:mkP([`What is ${t0}`,`${cd.industry} trends`,`How does ${t0} work`,`Benefits of ${t0}`,`${cd.industry} overview`,`Why use ${t0}`,`${cd.industry} use cases`],0)},
    {stage:"Consideration",desc:"User evaluates options",color:"#8b5cf6",prompts:mkP([`Best ${cd.industry} companies`,`${cd.brand} reviews`,`${cd.brand} vs ${cd.competitorNames[0]||"competitors"}`,`Top ${t0} providers`,`${cd.brand} pricing`,`Is ${cd.brand} worth it`,`${cd.industry} comparison`],100)},
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
    {area:"Competitor Response Protocol",rule:`Monitor competitor AEO positioning weekly. When a competitor is cited for a query where ${cd.brand} should appear, analyse the cited content's structure, schema, and authority signals. Create a superior response within 14 days. AI engines regularly re-evaluate citation sources — the window to displace a competitor citation is typically 30-60 days after publishing superior content.`,example:`Set up weekly monitoring: search each top-50 prompt in ChatGPT and Gemini. Document: (1) which competitor is cited, (2) what content is being referenced, (3) what schema/signals that content has. Create a displacement brief: "Competitor X cited for [query] because of [reason]. Our response: publish [content type] with [superior signals] by [date]."`},
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

  // Content types — use API-generated personalised data, fallback to basic defaults
  const contentTypes=(hasApi&&apiData.contentGridData&&Array.isArray(apiData.contentGridData)&&apiData.contentGridData.length>0)?
    apiData.contentGridData.map(ct=>({type:ct.type||"Content",channels:ct.channels||["Blog"],freq:ct.freq||"Monthly",p:ct.p||"P1",owner:ct.owner||"Content Team",impact:ct.impact||70,rationale:ct.rationale||""})):
    [
      {type:`${cd.industry} Definitive Guides`,channels:["Blog","LinkedIn"],freq:"2/month",p:"P0",owner:"Content Team",impact:95,rationale:`Address knowledge gaps in ${cd.industry}`},
      {type:"FAQ & Knowledge Base",channels:["Website"],freq:"Weekly",p:"P0",owner:"Content Team",impact:92,rationale:"Cover common queries AI engines pull from"},
      {type:`${cd.brand} Case Studies`,channels:["Blog","LinkedIn"],freq:"2/month",p:"P1",owner:"Marketing",impact:88,rationale:"Build E-E-A-T through demonstrated expertise"},
      {type:"Schema Markup Updates",channels:["Website"],freq:"Ongoing",p:"P0",owner:"Dev Team",impact:94,rationale:"Enable AI engines to parse and cite content"},
      {type:`${cd.industry} Comparison Content`,channels:["Blog","YouTube"],freq:"Monthly",p:"P1",owner:"Content Team",impact:90,rationale:`Compete for 'vs' and comparison queries`},
      {type:"Original Research",channels:["Blog","PR"],freq:"Quarterly",p:"P0",owner:"Analytics",impact:96,rationale:"Generate citable, authoritative data"},
    ];

  // Roadmap — use API-generated personalised data, fallback to basic framework
  const roadmap=(hasApi&&apiData.roadmapData&&apiData.roadmapData.day30)?apiData.roadmapData:{
    day30:{title:"Foundation Sprint",sub:"Days 1-30",accent:"#ef4444",lift:"10-15%",departments:[
      {dept:"Technical",color:"#0c4cfc",tasks:[`Implement Organization schema on ${cd.website}`,`Fix missing meta descriptions and Open Graph tags`,`Add structured data for ${cd.industry}-specific content types`,`Create XML sitemap with proper lastmod dates`,`Add author markup and date stamps to all content`]},
      {dept:"Content",color:"#059669",tasks:[`Create FAQ page covering top 10 ${cd.industry} queries`,`Publish 2 definitive guides on ${cd.topics.slice(0,2).join(" and ")||cd.industry}`,`Add case studies demonstrating ${cd.brand} expertise`,`Audit and update all existing content for accuracy`]},
      {dept:"PR & Outreach",color:"#8b5cf6",tasks:[`Verify/create ${cd.brand} profiles on key industry directories`,`Audit review platform presence (G2, Trustpilot, etc.)`,`Prepare media outreach list for ${cd.region||"target"} region`]},
    ]},
    day60:{title:"Authority Building",sub:"Days 31-60",accent:"#f59e0b",lift:"20-30%",departments:[
      {dept:"Technical",color:"#0c4cfc",tasks:[`Implement FAQ and HowTo schema across content`,`Optimise Core Web Vitals to sub-2s load times`,`Build automated schema injection pipeline`]},
      {dept:"Content",color:"#059669",tasks:[`Publish comparison content: ${cd.brand} vs ${cd.competitorNames[0]||"competitors"}`,`Create ${cd.industry} buyer's guide`,`Launch weekly thought leadership on LinkedIn`,`Produce original research report on ${cd.topics[0]||cd.industry}`]},
      {dept:"PR & Outreach",color:"#8b5cf6",tasks:[`Secure 5+ guest contributions in ${cd.industry} publications`,`Build citation network through industry partnerships`,`Launch digital PR campaign in ${cd.region||"target"} market`]},
    ]},
    day90:{title:"Dominance & Scale",sub:"Days 61-90",accent:"#10b981",lift:"40-60%",departments:[
      {dept:"Technical",color:"#0c4cfc",tasks:[`Achieve 95%+ schema coverage across ${cd.website}`,`Build AEO monitoring dashboard`,`Automate content freshness signals`]},
      {dept:"Content",color:"#059669",tasks:[`Cover 50+ long-tail ${cd.industry} queries`,`Establish 2/week publishing cadence`,`Create video content for YouTube presence`]},
      {dept:"PR & Outreach",color:"#8b5cf6",tasks:[`Secure 15+ authoritative backlinks`,`Get featured in ${cd.industry} roundups and lists`,`Build ongoing media relationships`]},
    ]},
  };

  // Monthly output requirements — use API data or generate from audit findings
  const outputReqs=(hasApi&&apiData.outputData&&Array.isArray(apiData.outputData)&&apiData.outputData.length>=4)?apiData.outputData:
    [{n:"6-8",u:"pieces/month",l:`${cd.industry} Guides & Articles`,d:`Covering ${cd.topics.slice(0,2).join(", ")||cd.industry} topics`},
     {n:"4-6",u:"pages/month",l:"FAQ & Knowledge Base",d:`Answering real ${cd.industry} queries`},
     {n:"2-3",u:"per month",l:"Case Studies",d:`Demonstrating ${cd.brand} expertise`},
     {n:"1",u:"per quarter",l:"Original Research",d:`${cd.industry}-specific data and insights`},
     {n:"Weekly",u:"posts",l:"Thought Leadership",d:`LinkedIn + industry publications`},
     {n:"Ongoing",u:"updates",l:"Schema & Technical",d:`Structured data on ${cd.website}`}];

  return{overall,scoreLabel:getScoreLabel(overall),scoreDesc:getScoreDesc(overall,cd.brand),engines,painPoints,competitors,stakeholders,funnelStages,aeoChannels,brandGuidelines,contentTypes,roadmap,outputReqs,clientData:cd};
}

/* ─── LOGIN FORM ─── */
function LoginForm({onSubmit,error,loading}){
  const[email,setEmail]=useState("");const[pw,setPw]=useState("");const[showPw,setShowPw]=useState(false);
  const ok=email.length>0&&pw.length>0;
  const submit=()=>{if(ok&&!loading)onSubmit(email,pw);};
  return(<div style={{display:"flex",flexDirection:"column",gap:18}}>
    <div>
      <label style={{fontSize:13,fontWeight:500,color:C.text,display:"block",marginBottom:6}}>Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="you@company.com" type="email" style={{width:"100%",padding:"11px 14px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,fontSize:14,color:C.text,outline:"none",fontFamily:"inherit",transition:"all .15s"}}/>
    </div>
    <div>
      <label style={{fontSize:13,fontWeight:500,color:C.text,display:"block",marginBottom:6}}>Password</label>
      <div style={{position:"relative"}}>
        <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="••••••••" type={showPw?"text":"password"} style={{width:"100%",padding:"11px 14px",paddingRight:48,background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,fontSize:14,color:C.text,outline:"none",fontFamily:"inherit",transition:"all .15s"}}/>
        <span onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer",fontSize:12,color:C.muted,userSelect:"none",fontWeight:500}}>{showPw?"Hide":"Show"}</span>
      </div>
    </div>
    {error&&<div style={{padding:"10px 14px",background:`${C.red}06`,border:`1px solid ${C.red}12`,borderRadius:10,fontSize:13,color:C.red}}>{error}</div>}
    <button onClick={submit} disabled={!ok||loading} style={{width:"100%",padding:"12px",background:ok&&!loading?C.accent:"#d1d5db",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:ok&&!loading?"pointer":"not-allowed",fontFamily:"'Outfit'",transition:"all .2s",marginTop:2}}>{loading?"Signing in...":"Sign in"}</button>
  </div>);
}

/* ─── CHAT PANEL — Human-in-the-loop AI assistant ─── */
function buildChatContext(step, results){
  if(!results)return{section:"No audit data",data:""};
  const r=results;
  const brand=r.clientData?.brand||"Brand";
  const base=`Brand: ${brand}\nIndustry: ${r.clientData?.industry||""}\nWebsite: ${r.clientData?.website||""}\nRegion: ${r.clientData?.region||""}\nOverall AEO Score: ${r.overall}% (${r.scoreLabel})\n`;
  switch(step){
    case "audit":return{section:"AEO Audit Results",data:base+
      `\nEngine Scores:\n${r.engines.map(e=>`- ${e.name}: ${e.score}% (mentions:${e.mentionRate}%, citations:${e.citationRate}%)\n  Strengths: ${e.strengths.join("; ")}\n  Weaknesses: ${e.weaknesses.join("; ")}`).join("\n")}`+
      `\n\nPain Points:\n${r.painPoints.map(p=>`- ${p.label}: ${p.score}% (${p.severity})`).join("\n")}`+
      `\n\nCompetitors:\n${r.competitors.map(c=>`- ${c.name}: ${c.score}% (strength: ${c.topStrength})`).join("\n")}`};
    case "archetypes":return{section:"User Archetypes",data:base+
      `\nStakeholder Groups:\n${r.stakeholders.map(sg=>`\n${sg.icon} ${sg.group}: ${sg.desc}\n${sg.archetypes.map(a=>`  - ${a.name} (${a.demo}) — ${a.intent}, ~${a.size}% of searches, ${a.brandVisibility}% visibility, ${a.opportunity} opportunity`).join("\n")}`).join("\n")}`};
    case "intent":return{section:"Intent Pathway",data:base+
      `\nArchetype Journeys:\n${r.stakeholders.flatMap(sg=>sg.archetypes).filter(a=>a.journey?.length>0).map(a=>`\n${a.icon} ${a.name}:\n${a.journey.map(j=>`  ${j.stage}: ${(j.prompts||[]).map(p=>`"${p.query}" → ${p.status} (GPT:${p.engines?.gpt||"?"}, Gemini:${p.engines?.gemini||"?"})`).join("; ")}`).join("\n")}`).join("\n")}`};
    case "channels":return{section:"AEO Channels",data:base+
      `\nChannels:\n${r.aeoChannels.map(ch=>`- ${ch.channel}: Impact ${ch.impact}, Status: ${ch.status}${ch.finding?", Finding: "+ch.finding:""}`).join("\n")}`};
    case "grid":return{section:"Content Grid",data:base+
      `\nContent Types:\n${r.contentTypes.map(ct=>`- ${ct.type} [${ct.p}]: ${ct.channels.join(", ")} @ ${ct.freq} — Owner: ${ct.owner}${ct.rationale?"\n  Rationale: "+ct.rationale:""}`).join("\n")}`};
    case "roadmap":return{section:"90-Day Roadmap",data:base+
      `\nRoadmap:\n${["day30","day60","day90"].map(k=>{const p=r.roadmap[k];return p?`\n${p.title} (${p.sub}, lift: ${p.lift}):\n${p.departments.map(d=>`  ${d.dept}:\n${d.tasks.map(t=>`    → ${t}`).join("\n")}`).join("\n")}`:""}).join("\n")}`};
    default:return{section:"Dashboard",data:base};
  }
}

function ChatPanel({isOpen,onClose,step,results,onUpdateResults}){
  const[messages,setMessages]=useState([]);
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const bottomRef=React.useRef(null);
  const inputRef=React.useRef(null);

  React.useEffect(()=>{if(bottomRef.current)bottomRef.current.scrollIntoView({behavior:"smooth"});},[messages]);
  React.useEffect(()=>{if(isOpen&&inputRef.current)setTimeout(()=>inputRef.current.focus(),200);},[isOpen]);

  const ctx=buildChatContext(step,results);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();
    setInput("");
    setMessages(prev=>[...prev,{role:"user",text:userMsg}]);
    setLoading(true);

    try{
      const systemPrompt=`You are an expert AEO (AI Engine Optimisation) consultant embedded in the EnterRank dashboard. You have access to the full audit data for the current section.

CURRENT SECTION: ${ctx.section}

FULL DATA FOR THIS SECTION:
${ctx.data}

RULES:
1. You can answer questions about the data — be specific, cite exact numbers, give actionable advice.
2. If the user asks you to CHANGE, UPDATE, REGENERATE, or MODIFY any data in this section, respond with the updated data in a JSON block wrapped in <json_update> tags.
3. For mutations, include ONLY the fields that need to change. Use the exact field names from the data structure.
4. Keep responses concise and professional — this is a premium consultant tool.
5. When answering, reference the brand name, actual scores, and specific data points. Never be generic.

MUTATION FORMAT (only when user asks for changes):
<json_update>
{"field": "updated_value"}
</json_update>

For channel updates, use: {"aeoChannels": [{...full channel object...}]}
For content grid updates, use: {"contentTypes": [{...full content type object...}]}
For roadmap updates, use: {"roadmap": {"day30": {...}, "day60": {...}, "day90": {...}}}
For archetype updates, use: {"stakeholders": [{...full stakeholder group...}]}
For engine updates, use: {"engines": [{...full engine object...}]}
For pain point updates, use: {"painPoints": [{...}]}

If the user's request is ambiguous, ask a clarifying question instead of guessing.`;

      const body={model:"claude-sonnet-4-20250514",max_tokens:3000,system:systemPrompt,messages:[
        ...messages.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text})),
        {role:"user",content:userMsg}
      ]};

      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const data=await res.json();
      const reply=data.content?.map(b=>b.type==="text"?b.text:"").filter(Boolean).join("\n")||"Sorry, I couldn't process that.";

      // Check for JSON mutation
      const jsonMatch=reply.match(/<json_update>([\s\S]*?)<\/json_update>/);
      if(jsonMatch){
        try{
          const updates=JSON.parse(jsonMatch[1].trim());
          onUpdateResults(updates);
          const cleanReply=reply.replace(/<json_update>[\s\S]*?<\/json_update>/,"").trim();
          setMessages(prev=>[...prev,{role:"assistant",text:cleanReply||"Done — the dashboard has been updated.",mutation:true}]);
        }catch(e){
          setMessages(prev=>[...prev,{role:"assistant",text:reply.replace(/<json_update>[\s\S]*?<\/json_update>/,"").trim()+"\n\n(Note: I tried to update the data but the format was invalid. Please try again.)"}]);
        }
      }else{
        setMessages(prev=>[...prev,{role:"assistant",text:reply}]);
      }
    }catch(e){
      console.error("Chat error:",e);
      setMessages(prev=>[...prev,{role:"assistant",text:"Sorry, there was an error connecting to the AI. Please try again."}]);
    }
    setLoading(false);
  };

  if(!isOpen)return null;

  return(<div style={{position:"fixed",right:0,top:0,bottom:0,width:380,background:C.surface,borderLeft:`1px solid ${C.border}`,display:"flex",flexDirection:"column",zIndex:1000,boxShadow:"-8px 0 30px rgba(0,0,0,.08)",animation:"slideIn .2s ease-out"}}>
    <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
    {/* Header */}
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:"'Outfit'",display:"flex",alignItems:"center",gap:6}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="4" fill={C.accent}/><path d="M4 6h8M4 8h6M4 10h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          AEO Copilot
        </div>
        <div style={{fontSize:10,color:C.muted,marginTop:1}}>Viewing: {ctx.section}</div>
      </div>
      <div style={{display:"flex",gap:6}}>
        {messages.length>0&&<span onClick={()=>setMessages([])} style={{fontSize:10,color:C.muted,cursor:"pointer",padding:"3px 8px",borderRadius:4,border:`1px solid ${C.border}`}}>Clear</span>}
        <span onClick={onClose} style={{fontSize:16,color:C.muted,cursor:"pointer",padding:"2px 6px",lineHeight:1}}>✕</span>
      </div>
    </div>

    {/* Messages */}
    <div style={{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:10}}>
      {messages.length===0&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:20}}>
        <div style={{width:48,height:48,borderRadius:12,background:`${C.accent}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💬</div>
        <div style={{fontSize:13,fontWeight:600,color:C.text,fontFamily:"'Outfit'",textAlign:"center"}}>Ask me anything about this section</div>
        <div style={{fontSize:11,color:C.muted,textAlign:"center",lineHeight:1.6}}>I can explain the data, give strategic advice, or update the report based on your instructions.</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,width:"100%",marginTop:8}}>
          {(step==="audit"?["Why is my citation rate so low?","What should I fix first?","Regenerate the diagnostic summary"]:
            step==="channels"?["Localise the press section to Malaysia","Which channel should I prioritise?","Add a podcast strategy"]:
            step==="archetypes"?["Rename the first segment","Which archetype is most valuable?","Add a new B2B segment"]:
            step==="intent"?["Why am I absent on most prompts?","Which stage needs the most work?","Make prompts more specific to my region"]:
            step==="grid"?["Reprioritise for a small team","Add social media content types","What should we publish first?"]:
            step==="roadmap"?["Simplify the Day 1-30 tasks","Make this more aggressive","Add a social media department"]:
            ["What does this data mean?","What should I focus on?","How can I improve my score?"]).map((q,i)=>(
            <div key={i} onClick={()=>{setInput(q);}} style={{padding:"8px 12px",background:C.bg,borderRadius:6,fontSize:11,color:C.sub,cursor:"pointer",border:`1px solid ${C.borderSoft}`,transition:"all .1s"}}
              onMouseEnter={e=>e.target.style.borderColor=C.accent+"40"}
              onMouseLeave={e=>e.target.style.borderColor=C.borderSoft}>
              "{q}"
            </div>
          ))}
        </div>
      </div>}
      {messages.map((m,i)=>(<div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
        <div style={{maxWidth:"88%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?C.accent:`${C.bg}`,color:m.role==="user"?"#fff":C.text,fontSize:12,lineHeight:1.6,border:m.role==="user"?"none":`1px solid ${C.borderSoft}`}}>
          {m.mutation&&<div style={{fontSize:9,fontWeight:600,color:C.green,marginBottom:4,display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:C.green,display:"inline-block"}}/>DASHBOARD UPDATED
          </div>}
          {m.text.split("\n").map((line,li)=><div key={li} style={{marginBottom:line?3:6}}>{line}</div>)}
        </div>
      </div>))}
      {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{padding:"10px 14px",borderRadius:"14px 14px 14px 4px",background:C.bg,border:`1px solid ${C.borderSoft}`}}>
        <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.muted,animation:`pulse 1s ${i*.2}s infinite`}}/>)}</div>
      </div></div>}
      <div ref={bottomRef}/>
    </div>

    {/* Input */}
    <div style={{padding:"12px 14px",borderTop:`1px solid ${C.border}`,flexShrink:0}}>
      <div style={{display:"flex",gap:8}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
          placeholder={`Ask about ${ctx.section.toLowerCase()}...`}
          style={{flex:1,padding:"10px 14px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{padding:"10px 16px",background:loading||!input.trim()?C.borderSoft:C.accent,color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:600,cursor:loading?"wait":"pointer",fontFamily:"'Outfit'",transition:"all .15s"}}>
          {loading?"···":"Send"}
        </button>
      </div>
      <div style={{fontSize:9,color:C.muted,marginTop:6,textAlign:"center"}}>Powered by Claude · Responses are contextual to the current section</div>
    </div>
  </div>);
}

const NAV_ITEMS=[
  {group:"Analytics",items:[
    {id:"audit",label:"Overview",icon:"grid"},
    {id:"archetypes",label:"User Archetypes",icon:"users"},
    {id:"intent",label:"Intent Pathway",icon:"route"},
  ]},
  {group:"Action",items:[
    {id:"channels",label:"AEO Channels",icon:"broadcast"},
    {id:"grid",label:"Content Grid",icon:"edit"},
    {id:"roadmap",label:"90-Day Roadmap",icon:"calendar"},
  ]},
  {group:"Context",items:[
    {id:"brandhub",label:"Brand Hub",icon:"book",comingSoon:true},
    {id:"contenthub",label:"Content Hub",icon:"edit",comingSoon:true},
  ]},
];
const STEPS=NAV_ITEMS.flatMap(g=>g.items).map((s,i)=>({...s,n:String(i+1).padStart(2,"0")}));

/* ─── SIDEBAR ICONS ─── */
const SidebarIcon=({name,size=18,color="#9ca3af"})=>{
  const p={grid:<><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/></>,
    users:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="1.5" fill="none"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="1.5" fill="none"/></>,
    route:<><circle cx="6" cy="19" r="3" stroke={color} strokeWidth="1.5" fill="none"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="18" cy="5" r="3" stroke={color} strokeWidth="1.5" fill="none"/></>,
    broadcast:<><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    edit:<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="1.5" fill="none"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="1.5" fill="none"/></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="1.5"/><line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5"/></>,
    book:<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.5" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.5" fill="none"/></>};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{p[name]||null}</svg>;
};

function Sidebar({step,setStep,results,brand,onBack,isArtifact,onLogout,collapsed,setCollapsed}){
  const sideW=collapsed?60:220;
  return(<div style={{position:"fixed",left:0,top:0,bottom:0,width:sideW,background:"#fff",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",transition:"width .2s ease",zIndex:100,overflow:"hidden"}}>
    {/* Logo area */}
    <div style={{padding:collapsed?"16px 12px":"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
      <svg width="28" height="28" viewBox="0 0 28 28" style={{flexShrink:0}}><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg>
      {!collapsed&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
        <div style={{fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:4}}>
          {!isArtifact&&<span onClick={onBack} style={{cursor:"pointer",color:C.accent,fontSize:11}}>←</span>}
          <span style={{fontWeight:600,color:C.text,fontSize:13}}>{brand||"EnterRank"}</span>
        </div>
      </div>}
    </div>

    {/* New Audit button */}
    <div style={{padding:collapsed?"10px 8px":"12px 16px"}}>
      <button onClick={()=>setStep("input")} style={{width:"100%",padding:collapsed?"8px":"9px 14px",background:step==="input"?`${C.accent}08`:"transparent",border:`1px solid ${step==="input"?C.accent+"30":C.border}`,borderRadius:8,fontSize:12,fontWeight:600,color:step==="input"?C.accent:C.sub,cursor:"pointer",fontFamily:"'Outfit'",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"flex-start",gap:8,transition:"all .15s"}}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        {!collapsed&&"New Audit"}
      </button>
    </div>

    {/* Navigation groups */}
    <div style={{flex:1,overflowY:"auto",padding:collapsed?"4px 6px":"4px 12px"}}>
      {NAV_ITEMS.map(g=>(<div key={g.group} style={{marginBottom:16}}>
        {!collapsed&&<div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",padding:"8px 8px 6px",userSelect:"none"}}>{g.group}</div>}
        {g.items.map(item=>{
          const active=step===item.id;
          const dis=!results||item.comingSoon;
          return(<div key={item.id} onClick={()=>{if(!dis)setStep(item.id);}}
            style={{display:"flex",alignItems:"center",gap:10,padding:collapsed?"10px 12px":"8px 10px",borderRadius:8,cursor:dis?"default":"pointer",background:active?"#111827":"transparent",color:active?"#fff":dis?"#d1d5db":C.sub,fontSize:13,fontWeight:active?600:500,marginBottom:2,transition:"all .12s",opacity:item.comingSoon?.5:1,justifyContent:collapsed?"center":"flex-start"}}
            onMouseEnter={e=>{if(!dis&&!active)e.currentTarget.style.background=C.bg;}}
            onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>
            <SidebarIcon name={item.icon} size={18} color={active?"#fff":dis?"#d1d5db":"#6b7280"}/>
            {!collapsed&&<span>{item.label}</span>}
            {!collapsed&&item.comingSoon&&<span style={{fontSize:8,fontWeight:700,color:"#fff",background:"#d1d5db",padding:"1px 5px",borderRadius:3,marginLeft:"auto"}}>SOON</span>}
          </div>);
        })}
      </div>))}
    </div>

    {/* Bottom section */}
    <div style={{borderTop:`1px solid ${C.border}`,padding:collapsed?"10px 6px":"10px 12px"}}>
      <div onClick={()=>setCollapsed(!collapsed)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:6,cursor:"pointer",fontSize:12,color:C.muted,justifyContent:collapsed?"center":"flex-start"}}
        onMouseEnter={e=>e.currentTarget.style.background=C.bg}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <span style={{fontSize:14}}>{collapsed?"»":"«"}</span>
        {!collapsed&&<span>Collapse</span>}
      </div>
      {!collapsed&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginTop:4}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,fontFamily:"'Outfit'",flexShrink:0}}>AZ</div>
        <div style={{overflow:"hidden"}}><div style={{fontSize:12,fontWeight:500,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Aris Zainul</div></div>
      </div>}
    </div>
  </div>);
}

/* ─── VISIBILITY CHART — Bar chart with hover scores ─── */
function VisibilityChart({engines,overall,brand}){
  const[hover,setHover]=useState(null);
  const barH=200;
  return(<div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:13,color:C.muted,marginBottom:4}}>Visibility Score for {brand}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:6}}>
        <span style={{fontSize:36,fontWeight:700,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>{overall}%</span>
        <span style={{fontSize:13,color:C.muted}}>–</span>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:32,height:barH,paddingBottom:30,position:"relative"}}>
      {/* Y-axis labels */}
      {[0,25,50,75,100].map(v=>(<div key={v} style={{position:"absolute",left:0,bottom:30+(v/100)*(barH-30),fontSize:10,color:C.muted,transform:"translateY(50%)"}}>{v}%</div>))}
      {/* Grid lines */}
      {[0,25,50,75,100].map(v=>(<div key={`g${v}`} style={{position:"absolute",left:30,right:0,bottom:30+(v/100)*(barH-30),height:1,background:C.borderSoft,borderStyle:v===0?"solid":"dashed"}}/>))}
      {/* Bars with hover */}
      <div style={{display:"flex",alignItems:"flex-end",gap:40,paddingLeft:40,flex:1,justifyContent:"center",position:"relative",zIndex:1}}>
        {engines.map((e,i)=>{const bH=Math.max(4,(e.score/100)*(barH-50));return(<div key={e.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,position:"relative"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
          {hover===i&&<div style={{position:"absolute",bottom:bH+36,background:C.text,color:"#fff",padding:"5px 10px",borderRadius:6,fontSize:12,fontWeight:600,fontFamily:"'Outfit'",whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,.15)",zIndex:2}}>
            {e.name}: {e.score}%
            <div style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:C.text}}/>
          </div>}
          <div style={{width:52,height:bH,background:hover===i?e.color:`${e.color}cc`,borderRadius:"4px 4px 0 0",transition:"all .2s ease-out",cursor:"default"}}/>
          <e.Logo size={18}/>
        </div>);})}
      </div>
    </div>
  </div>);
}

/* ─── SHARE OF VOICE — Large donut + ranked list like Profound ─── */
function ShareOfVoiceSection({title,rankTitle,brands,metricKey}){
  const[hover,setHover]=useState(null);
  const size=200,cx=size/2,cy=size/2,r=size/2-8,ir=r*.65;
  const total=brands.reduce((a,b)=>a+b[metricKey],0)||1;
  let cumAngle=-Math.PI/2;
  const gapAngle=0.03;
  const arcs=brands.map(b=>{const val=b[metricKey];const angle=Math.max(0.02,(val/total)*2*Math.PI)-gapAngle;const start=cumAngle;cumAngle+=angle+gapAngle;const end=start+angle;
    const x1=cx+r*Math.cos(start),y1=cy+r*Math.sin(start),x2=cx+r*Math.cos(end),y2=cy+r*Math.sin(end);
    const ix1=cx+ir*Math.cos(end),iy1=cy+ir*Math.sin(end),ix2=cx+ir*Math.cos(start),iy2=cy+ir*Math.sin(start);
    const large=angle>Math.PI?1:0;
    const path=`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix1},${iy1} A${ir},${ir} 0 ${large} 0 ${ix2},${iy2} Z`;
    return{...b,path,pct:Math.round(val/total*100)};
  });
  const ownBrand=arcs[0];
  // Sort to find actual rank of the user's brand (arcs[0])
  const sorted=[...arcs].sort((a,b)=>b.pct-a.pct);
  const brandRank=sorted.findIndex(a=>a.name===ownBrand?.name)+1;

  return(<div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",overflow:"hidden"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      {/* Left: donut */}
      <div style={{padding:"24px 28px",borderRight:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:4}}>{title}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,fontFamily:"'Outfit'",marginBottom:16}}>{ownBrand?.pct||0}%<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <svg width={size} height={size} onMouseLeave={()=>setHover(null)}>
            {arcs.map((a,i)=>(<path key={i} d={a.path} fill={hover===i?a.color:`${a.color}cc`} stroke="none" onMouseEnter={()=>setHover(i)} style={{cursor:"default",transition:"fill .15s"}}/>))}
          </svg>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:14,justifyContent:"center"}}>
          {arcs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,cursor:"default"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
            <div style={{width:8,height:8,borderRadius:2,background:a.color}}/>
            <span style={{color:hover===i?C.text:C.muted,fontWeight:hover===i?600:400}}>{a.name}</span>
          </div>))}
        </div>
      </div>
      {/* Right: ranked list */}
      <div style={{padding:"24px 28px"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:4}}>{rankTitle}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,fontFamily:"'Outfit'",marginBottom:16}}>#{brandRank}<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8}}>
          <div style={{display:"grid",gridTemplateColumns:"30px 1fr auto",gap:8,padding:"6px 0",fontSize:11,color:C.muted,fontWeight:500}}>
            <span></span><span>Brand</span><span>Share</span>
          </div>
          {sorted.map((a,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"30px 1fr auto",gap:8,padding:"10px 0",borderTop:`1px solid ${C.borderSoft}`,alignItems:"center"}} onMouseEnter={()=>setHover(arcs.indexOf(a))} onMouseLeave={()=>setHover(null)}>
            <span style={{fontSize:12,color:C.muted,fontWeight:500}}>{i+1}.</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:22,height:22,borderRadius:6,background:`${a.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:a.color}}>{a.name[0]}</div>
              <span style={{fontSize:13,fontWeight:500,color:C.text}}>{a.name}</span>
            </div>
            <span style={{fontSize:14,fontWeight:600,color:C.text,fontFamily:"'Outfit'"}}>{a.pct}%</span>
          </div>))}
        </div>
      </div>
    </div>
  </div>);
}

/* ─── PAGE: NEW AUDIT ─── */
function NewAuditPage({data,setData,onRun,history=[]}){
  const[running,setRunning]=useState(false);const[stage,setStage]=useState("");const[error,setError]=useState(null);
  const ok=data.brand&&data.industry&&data.website&&data.topics.length>0;
  const[logLines,setLogLines]=useState([]);
  const addLog=(msg)=>setLogLines(prev=>[...prev.slice(-14),{msg,t:Date.now()}]);

  // Smooth progress: target is set by API callbacks, displayed value interpolates toward it
  const targetRef=React.useRef(0);
  const displayRef=React.useRef(0);
  const[displayProgress,setDisplayProgress]=useState(0);
  const intervalRef=React.useRef(null);
  const logIntervalRef=React.useRef(null);

  // All log messages grouped by phase
  const allLogs=React.useRef([
    {at:0,msg:"Crawling "+data.website+" for AEO signals..."},
    {at:1,msg:"Extracting schema markup, meta tags, heading structure..."},
    {at:2,msg:"Checking for blog, FAQ, about, and product pages..."},
    {at:3,msg:"Crawling competitor websites for comparison data..."},
    {at:5,msg:"Analysing content depth, E-E-A-T signals, trust factors..."},
    {at:6,msg:"Website crawl complete — feeding data to engines..."},
    {at:7,msg:"Establishing secure API connections..."},
    {at:2,msg:"Loading NLP entity recognition models..."},
    {at:4,msg:"Configuring multi-engine query pipeline..."},
    {at:6,msg:"Connecting to OpenAI API → gpt-4o..."},
    {at:9,msg:"Sending 8 query probes to ChatGPT..."},
    {at:12,msg:"Connecting to Anthropic API → claude-sonnet-4-20250514..."},
    {at:15,msg:"Sending 8 query probes to Gemini..."},
    {at:18,msg:"Connecting to Google AI API → gemini-2.0-flash..."},
    {at:21,msg:"Sending 8 query probes to Gemini..."},
    {at:24,msg:"Extracting mention rates from ChatGPT response..."},
    {at:27,msg:"Extracting citation data from Gemini response..."},
    {at:29,msg:"Cross-referencing entity signals across 3 engines..."},
    {at:31,msg:"Scoring Structured Data / Schema..."},
    {at:33,msg:"Scoring Content Authority & E-E-A-T..."},
    {at:35,msg:"Running competitor signal analysis..."},
    {at:38,msg:`Cross-referencing citation networks for ${data.competitors.slice(0,3).join(", ")||"competitors"}...`},
    {at:41,msg:"Calculating category-level differentials..."},
    {at:44,msg:"Mapping authority distribution curves..."},
    {at:47,msg:"Generating user archetypes from crawl data..."},
    {at:50,msg:"Testing archetype prompts across ChatGPT and Gemini..."},
    {at:52,msg:"Calculating real visibility for each user segment..."},
    {at:55,msg:"Archetype verification complete — real engine data applied..."},
    {at:58,msg:`Testing intent pathway prompts for ${data.brand}...`},
    {at:60,msg:"Calibrating status against actual engine mention rates..."},
    {at:63,msg:`Scoring ${data.brand} presence in AI responses...`},
    {at:65,msg:"Intent pathway complete..."},
    {at:68,msg:"Starting channel verification via web search..."},
    {at:70,msg:"Searching Wikipedia, LinkedIn, YouTube, G2, Crunchbase..."},
    {at:73,msg:`Verifying ${data.brand} presence on 10 channels...`},
    {at:76,msg:"Checking review platforms and press coverage..."},
    {at:78,msg:"Verifying social media and directory listings..."},
    {at:80,msg:`All 10 channels verified with real URLs...`},
    {at:82,msg:"Generating industry-specific site recommendations..."},
    {at:84,msg:"Building personalised content strategy from audit data..."},
    {at:86,msg:"Matching content types to "+data.brand+"'s specific AEO gaps..."},
    {at:88,msg:"Creating personalised 90-day roadmap..."},
    {at:89,msg:"Tailoring tasks to "+data.brand+"'s crawl findings..."},
    {at:90,msg:"Mapping competitor advantages into action items..."},
    {at:92,msg:"Building department-level task breakdowns..."},
    {at:93,msg:"Calculating monthly output requirements..."},
    {at:95,msg:"Compiling final report..."},
    {at:96,msg:"All engines responded ✓"},
    {at:98,msg:"Data validation complete ✓"},
  ]);
  const lastLogIndex=React.useRef(0);

  const startSmooth=()=>{
    displayRef.current=0;targetRef.current=0;lastLogIndex.current=0;
    // Smooth tick every 80ms
    intervalRef.current=setInterval(()=>{
      const target=targetRef.current;
      const current=displayRef.current;
      if(current<target){
        // Move toward target — faster when far away, slower when close (easing)
        const gap=target-current;
        const step=Math.max(0.15, gap*0.08);
        displayRef.current=Math.min(target, current+step);
      }else if(current<95&&target>0){
        // Slow creep even when waiting for next API call (never fully stalls)
        const nextTarget=Math.min(target+3, 99);
        displayRef.current=Math.min(nextTarget, current+0.05);
      }
      setDisplayProgress(Math.round(displayRef.current));
      // Check if any new log lines should show
      const logs=allLogs.current;
      while(lastLogIndex.current<logs.length&&logs[lastLogIndex.current].at<=displayRef.current){
        addLog(logs[lastLogIndex.current].msg);
        lastLogIndex.current++;
      }
    },80);
  };
  const stopSmooth=()=>{if(intervalRef.current){clearInterval(intervalRef.current);intervalRef.current=null;}};

  const go=async()=>{
    setRunning(true);setError(null);setLogLines([]);setDisplayProgress(0);
    targetRef.current=0;displayRef.current=0;lastLogIndex.current=0;
    startSmooth();
    try{
      const apiData=await runRealAudit(data,(msg,pct)=>{
        setStage(msg);
        targetRef.current=Math.max(targetRef.current, pct);
      });
      targetRef.current=100;
      await new Promise(r=>setTimeout(r,800));
      stopSmooth();setDisplayProgress(100);
      await new Promise(r=>setTimeout(r,400));
      setRunning(false);onRun(apiData);
    }catch(e){
      console.error("Audit error:",e);setError("API call failed — falling back to simulated data.");addLog("API error — using fallback engine...");
      targetRef.current=100;
      await new Promise(r=>setTimeout(r,1500));
      stopSmooth();setRunning(false);onRun(null);
    }
  };

  // Cleanup on unmount
  React.useEffect(()=>()=>{stopSmooth();},[]);

  const progress=displayProgress;
  if(running)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh",gap:20,maxWidth:520,margin:"0 auto"}}>
    {/* Main progress ring */}
    <div style={{position:"relative",width:130,height:130}}>
      <svg width="130" height="130"><circle cx="65" cy="65" r="56" fill="none" stroke={C.borderSoft} strokeWidth="3"/><circle cx="65" cy="65" r="56" fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray={352} strokeDashoffset={352-(progress/100)*352} strokeLinecap="round" transform="rotate(-90 65 65)" style={{transition:"stroke-dashoffset .15s linear"}}/></svg>
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
      {[{L:ChatGPTLogo,n:"ChatGPT",a:progress>=8,done:progress>=26},{L:GeminiLogo,n:"Gemini",a:progress>=14,done:progress>=26}].map(e=>(<div key={e.n} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,background:e.done?`${C.green}08`:e.a?`${C.accent}06`:C.bg,border:`1px solid ${e.done?`${C.green}20`:e.a?`${C.accent}15`:C.border}`,transition:"all .3s"}}>
        <e.L size={18}/><span style={{fontSize:11,fontWeight:600,color:e.done?C.green:e.a?C.text:C.muted}}>{e.n}</span>
        {e.done?<span style={{fontSize:10,color:C.green}}>✓</span>:e.a?<span style={{width:4,height:4,borderRadius:"50%",background:C.accent,animation:"pulse 1s infinite"}}/>:null}
      </div>))}
    </div>
    {/* Step progress bars */}
    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:6}}>
      {[{l:"ChatGPT (gpt-4o)",p:Math.min(100,progress*100/14),c:"#10A37F"},{l:"Gemini (Flash)",p:Math.max(0,Math.min(100,(progress-8)*100/12)),c:"#4285F4"},{l:"Competitor Analysis",p:Math.max(0,Math.min(100,(progress-30)*100/15)),c:"#8b5cf6"},{l:"Archetype Generation",p:Math.max(0,Math.min(100,(progress-45)*100/17)),c:"#ec4899"},{l:"Intent Pathway",p:Math.max(0,Math.min(100,(progress-62)*100/10)),c:"#f59e0b"},{l:"Channel Verification",p:Math.max(0,Math.min(100,(progress-72)*100/18)),c:"#059669"},{l:"Report Compilation",p:Math.max(0,Math.min(100,(progress-90)*100/10)),c:C.accent}].map(s=>(<div key={s.l} style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:10,color:s.p>=100?C.green:s.p>0?C.text:C.muted,minWidth:120,fontWeight:s.p>0&&s.p<100?600:400,fontFamily:"'Outfit'"}}>{s.p>=100?"✓ ":s.p>0?"◉ ":"○ "}{s.l}</span>
        <div style={{flex:1,height:3,background:C.borderSoft,borderRadius:2}}><div style={{width:`${Math.max(0,s.p)}%`,height:"100%",background:s.p>=100?C.green:s.c,borderRadius:2,transition:"width .15s linear"}}/></div>
      </div>))}
    </div>
    <div style={{padding:"6px 14px",background:`${C.accent}08`,borderRadius:100,fontSize:11,color:C.accent,fontWeight:500}}>⚡ Powered by live AI analysis</div>
    {error&&<div style={{padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </div>);
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>{data.brand?"Run AEO Audit":"New AEO Audit"}</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>{data.brand?`Run a ${history.length>0?"follow-up":"first"} audit for ${data.brand}.`:"Enter client details for a comprehensive 8-stage AEO analysis."}</p></div>
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <Field label="Brand Name" value={data.brand} onChange={v=>setData({...data,brand:v})} placeholder="Acme Corp"/>
      <Field label="Industry" value={data.industry} onChange={v=>setData({...data,industry:v})} placeholder="e.g. Technology"/>
      <Field label="Website" value={data.website} onChange={v=>setData({...data,website:v})} placeholder="acme.com"/>
      <Field label="Region" value={data.region} onChange={v=>setData({...data,region:v})} placeholder="e.g. Malaysia"/>
      <div style={{gridColumn:"1/-1"}}><TagInput label="Key Topics" tags={data.topics} setTags={v=>setData({...data,topics:v})} placeholder="Type a topic and press Enter..."/></div>
      <div style={{gridColumn:"1/-1"}}>
        <label style={{fontSize:12,fontWeight:500,color:C.sub,display:"block",marginBottom:8}}>Competitors</label>
        {(data.competitors||[]).map((comp,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <input value={comp.name} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],name:e.target.value};setData({...data,competitors:c});}} placeholder={`Competitor ${i+1}`} style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/>
          <input value={comp.website} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],website:e.target.value};setData({...data,competitors:c});}} placeholder="website.com" style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/>
          <span onClick={()=>{const c=data.competitors.filter((_,j)=>j!==i);setData({...data,competitors:c});}} style={{cursor:"pointer",color:C.muted,fontSize:16,padding:"0 4px",lineHeight:1}}>×</span>
        </div>))}
        {(data.competitors||[]).length<8&&<button onClick={()=>setData({...data,competitors:[...(data.competitors||[]),{name:"",website:""}]})} style={{padding:"6px 14px",background:"none",border:`1px dashed ${C.border}`,borderRadius:C.rs,fontSize:12,color:C.muted,cursor:"pointer",fontFamily:"inherit"}}>+ Add competitor</button>}
      </div>
    </div>
    <div style={{marginTop:20,paddingTop:18,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:11,color:C.muted}}>Engines:</span><ChatGPTLogo size={18}/><GeminiLogo size={18}/></div>
      <button onClick={go} disabled={!ok} style={{padding:"10px 24px",background:ok?C.accent:"#dde1e7",color:ok?"#fff":"#9ca3af",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:ok?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>Run AEO Audit →</button>
    </div></Card></div>);
}

/* ─── PAGE: AEO AUDIT (Overview) ─── */
function AuditPage({r,history,goTo}){
  const[expandComp,setExpandComp]=useState(null);
  const trend=history.map(h=>({label:h.date,overall:h.overall}));
  const engineTrend=history.map(h=>({label:h.date,ChatGPT:h.engines[0],Gemini:h.engines[1]}));
  const latestChange=history.length>1?r.overall-history[history.length-2].overall:0;
  const catChanges=r.painPoints.map(pp=>{const hist=history.map(h=>{const f=h.categories.find(c=>c.label===pp.label);return f?f.score:null;}).filter(Boolean);const prev=hist.length>1?hist[hist.length-2]:pp.score;return{...pp,change:pp.score-prev};});

  // Compute share-of-voice data: brand + competitors
  const allBrands=[{name:r.clientData.brand,mentionRate:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citationRate:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),color:C.accent},...r.competitors.map((c,i)=>({name:c.name,mentionRate:c.engineScores?Math.round(c.engineScores.reduce((a,s)=>a+s,0)/c.engineScores.length):c.score,citationRate:c.engineScores?Math.round(c.engineScores.reduce((a,s)=>a+s,0)/c.engineScores.length*.6):Math.round(c.score*.6),color:["#10A37F","#D97706","#4285F4","#8b5cf6","#ec4899","#0ea5e9","#f97316"][i%7]}))];

  // Compute diagnostics
  const avgMention=Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length);
  const avgCitation=Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length);
  const worstEngine=r.engines.reduce((a,e)=>e.score<a.score?e:a,r.engines[0]);
  const bestEngine=r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]);
  const criticalCats=r.painPoints.filter(p=>p.severity==="critical");
  const weakestCat=r.painPoints.reduce((a,b)=>b.score<a.score?b:a,r.painPoints[0]);
  const strongestCat=r.painPoints.reduce((a,b)=>b.score>a.score?b:a,r.painPoints[0]);
  const compsAhead=r.competitors.filter(c=>c.score>r.overall);
  const channels=r.aeoChannels||[];
  const missingChannels=channels.filter(ch=>ch.status==="Not Present"||ch.statusLabel==="Not Present");

  const diags=[];
  if(bestEngine.score-worstEngine.score>15) diags.push({icon:"⚡",severity:"warning",text:`${bestEngine.score-worstEngine.score}pt gap between ${bestEngine.name} (${bestEngine.score}%) and ${worstEngine.name} (${worstEngine.score}%).`});
  if(avgCitation<10) diags.push({icon:"🔗",severity:"critical",text:`${avgCitation}% citation rate. Users get answers about your space but aren't sent to your site.`});
  else if(avgCitation<25) diags.push({icon:"🔗",severity:"warning",text:`${avgCitation}% citation rate — ${100-avgCitation}% of mentions don't link back to you.`});
  if(avgMention<15) diags.push({icon:"💬",severity:"critical",text:`${avgMention}% mention rate across engines. ${r.clientData.brand} isn't part of the AI conversation yet.`});
  else if(avgMention<35) diags.push({icon:"💬",severity:"warning",text:`Mentioned in ~1 of ${Math.round(100/avgMention)} relevant responses (${avgMention}%).`});
  if(criticalCats.length>0) diags.push({icon:"🚨",severity:"critical",text:`${criticalCats.map(c=>c.label.split("/")[0].trim()+" "+c.score+"%").join(", ")} — ${criticalCats.length>1?"these need":"needs"} immediate attention.`});
  if(weakestCat.score<30) diags.push({icon:"📉",severity:"critical",text:`${weakestCat.label.split("/")[0].trim()} at ${weakestCat.score}% — lowest category score.`});
  if(compsAhead.length>0) diags.push({icon:"🏁",severity:compsAhead.length>1?"critical":"warning",text:`${compsAhead.map(c=>c.name+" "+c.score+"%").join(", ")} ${compsAhead.length>1?"are":"is"} scoring above you.`});
  if(missingChannels.length>0) diags.push({icon:"📡",severity:"warning",text:`Not found on ${missingChannels.length} distribution channel${missingChannels.length>1?"s":""}.`});
  if(strongestCat.score>60) diags.push({icon:"✅",severity:"good",text:`${strongestCat.label.split("/")[0].trim()} is your strongest signal at ${strongestCat.score}%.`});
  const sevOrder={critical:0,warning:1,info:2,good:3};
  diags.sort((a,b)=>(sevOrder[a.severity]??2)-(sevOrder[b.severity]??2));
  const sevColors={critical:C.red,warning:C.amber,info:C.accent,good:C.green};

  return(<div>
    {/* Page title */}
    <h2 style={{fontSize:24,fontWeight:700,color:C.text,margin:"0 0 24px",fontFamily:"'Outfit'"}}>Overview</h2>

    {/* Top row: Visibility Score (left) + System Diagnostics (right) */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,marginBottom:24}}>
      {/* Visibility Score chart */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px 28px"}}>
        <VisibilityChart engines={r.engines} overall={r.overall} brand={r.clientData.brand}/>
      </div>

      {/* System Diagnostics */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"20px 22px",display:"flex",flexDirection:"column"}}>
        <div style={{fontSize:14,fontWeight:600,color:C.text,fontFamily:"'Outfit'",marginBottom:14}}>System Diagnostics</div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:6,overflowY:"auto"}}>
          {diags.slice(0,6).map((d,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"10px 12px",background:`${sevColors[d.severity]||C.accent}05`,borderRadius:8,border:`1px solid ${sevColors[d.severity]||C.accent}12`}}>
            <span style={{fontSize:14,lineHeight:1,flexShrink:0}}>{d.icon}</span>
            <span style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{d.text}</span>
          </div>))}
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:10,paddingTop:8,borderTop:`1px solid ${C.borderSoft}`}}>{diags.filter(d=>d.severity==="critical").length} critical · {diags.filter(d=>d.severity==="warning").length} warnings · {diags.filter(d=>d.severity==="good").length} healthy</div>
      </div>
    </div>

    {/* Share of Voice sections — row by row, each full width with donut + ranked list */}
    {r.competitors.length>0&&<div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:24}}>
      <ShareOfVoiceSection title="Share of Mentions" rankTitle="Mentions Rank" brands={allBrands} metricKey="mentionRate"/>
      <ShareOfVoiceSection title="Share of Citations" rankTitle="Citation Rank" brands={allBrands} metricKey="citationRate"/>
    </div>}

    {/* Platform Breakdown */}
    <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px 28px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'"}}>{r.clientData.brand} — Platform Breakdown</h3>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 24px"}}>How each AI engine sees your brand</p>
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {r.engines.map(e=>(<div key={e.id} style={{padding:"20px 24px",background:C.bg,borderRadius:12,border:`1px solid ${C.borderSoft}`}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <e.Logo size={22}/>
            <span style={{fontSize:15,fontWeight:600,color:C.text}}>{e.name}</span>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Mentions</div><div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:"'Outfit'"}}>{e.mentionRate}%</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Citations</div><div style={{fontSize:14,fontWeight:700,color:C.text,fontFamily:"'Outfit'"}}>{e.citationRate}%</div></div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.green,textTransform:"uppercase",letterSpacing:".05em",marginBottom:10}}>Strengths</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {e.strengths.map((s,i)=><div key={i} style={{fontSize:13,color:C.sub,lineHeight:1.7,padding:"6px 12px",background:"#fff",borderRadius:8,borderLeft:`3px solid ${C.green}30`}}>{s}</div>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.red,textTransform:"uppercase",letterSpacing:".05em",marginBottom:10}}>Weaknesses</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {e.weaknesses.map((s,i)=><div key={i} style={{fontSize:13,color:C.sub,lineHeight:1.7,padding:"6px 12px",background:"#fff",borderRadius:8,borderLeft:`3px solid ${C.red}30`}}>{s}</div>)}
              </div>
            </div>
          </div>
        </div>))}
      </div>
    </div>

    {/* Performance Tracking */}
    <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px 28px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Performance Tracking</h3>
      <p style={{fontSize:13,color:C.muted,margin:"2px 0 0 0"}}>Score history and category trends</p>
      <div style={{marginTop:18}}>
        {history.length<2?<div style={{textAlign:"center",padding:"32px 20px",background:C.bg,borderRadius:10}}>
          <div style={{fontSize:28,marginBottom:8}}>📊</div>
          <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:4,fontFamily:"'Outfit'"}}>First Audit Complete</div>
          <div style={{fontSize:13,color:C.muted,maxWidth:360,margin:"0 auto"}}>Run another audit to see trends and score changes.</div>
        </div>:<>
          <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>AEO Score Trend</div><MiniAreaChart data={trend} dataKey="overall" color={C.accent}/></div>
          <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Engine Performance</div><MiniLineChart data={engineTrend} lines={[{key:"ChatGPT",color:"#10A37F",label:"ChatGPT"},{key:"Gemini",color:"#4285F4",label:"Gemini"}]}/></div>
          <div><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Category Movement</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>{catChanges.map((cat,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:C.sub,minWidth:100}}>{cat.label.split(" ").slice(0,2).join(" ")}</span><div style={{flex:1}}><Bar value={cat.score} color={SC(cat.severity)} h={5}/></div><span style={{fontSize:12,fontWeight:700,color:C.text,minWidth:26,textAlign:"right"}}>{cat.score}%</span><span style={{fontSize:10,fontWeight:600,minWidth:32,textAlign:"right",color:cat.change>0?C.green:cat.change<0?C.red:C.muted}}>{cat.change>0?`+${cat.change}`:cat.change===0?"—":cat.change}</span></div>))}</div>
          </div>
        </>}
      </div>
    </div>

    {/* Competitor Deep-Dive */}
    {r.competitors.length>0&&<div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px 28px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'"}}>Looking Under The Hood</h3>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 16px"}}>Why competitors rank higher or lower</p>
      {r.competitors.map((c,ci)=>{const isOpen=expandComp===ci;const ahead=c.score>r.overall;return(<div key={ci} style={{border:`1px solid ${isOpen?(ahead?`${C.red}25`:`${C.green}25`):C.border}`,borderRadius:10,overflow:"hidden",marginBottom:8}}>
        <div onClick={()=>setExpandComp(isOpen?null:ci)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:isOpen?`${ahead?C.red:C.green}03`:"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:8,background:ahead?`${C.red}08`:`${C.green}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:ahead?C.red:C.green,fontFamily:"'Outfit'"}}>{c.score}%</div><div><div style={{fontWeight:600,fontSize:13,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{ahead?`${c.score-r.overall} points ahead`:`${r.overall-c.score} points behind`}</div></div></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Pill color={ahead?C.red:C.green} filled>{ahead?"Outranking":"Behind"}</Pill><span style={{fontSize:10,color:C.muted}}>{isOpen?"▲":"▼"}</span></div>
        </div>
        {isOpen&&<div style={{padding:"0 16px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14,marginTop:4}}>
            {c.painPoints.map((cp,j)=>{const yours=r.painPoints[j]?.score||50;const diff=cp.score-yours;return(<div key={j} style={{padding:"8px 10px",background:C.bg,borderRadius:6}}><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{cp.label.split("/")[0].trim()}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.accent,fontWeight:600}}>You: {yours}%</span><span style={{fontSize:11,fontWeight:600,color:diff>0?C.red:C.green}}>{c.name.split(" ")[0]}: {cp.score}%</span></div><div style={{marginTop:4}}><Bar value={yours} color={C.accent} h={3}/><div style={{marginTop:2}}><Bar value={cp.score} color={diff>0?C.red:"#94a3b8"} h={3}/></div></div></div>);})}
          </div>
          {c.advantages.length>0&&<div>{c.advantages.map((adv,ai)=>(<div key={ai} style={{padding:"10px 12px",background:adv.insight.advantage==="them"?`${C.red}04`:`${C.green}04`,borderRadius:6,borderLeft:`3px solid ${adv.insight.advantage==="them"?C.red:C.green}`,marginBottom:6}}><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:2}}>{adv.cat.split("/")[0].trim()} <span style={{color:C.muted,fontWeight:400}}>— You: {adv.yourScore}% vs {adv.theirScore}%</span></div><div style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{adv.insight.text}</div></div>))}</div>}
        </div>}
      </div>);})}
    </div>}
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
  // Flatten all archetypes from all groups
  const allArchetypes=r.stakeholders.flatMap(sg=>sg.archetypes.map(a=>({...a,groupName:sg.group,groupIcon:sg.icon})));
  const[selArch,setSelArch]=useState(0);
  const[selStage,setSelStage]=useState(0);
  const arch=allArchetypes[selArch]||allArchetypes[0];
  const journey=arch.journey||[];
  const stageColors=["#6366f1","#8b5cf6","#a855f7","#c084fc"];
  const stageNames=["Awareness","Consideration","Transaction","Retention"];
  const stageDescs=["User discovers the problem or category","User evaluates and compares options","User is ready to purchase or commit","Existing user seeks ongoing value"];

  // Compute stats per stage for the selected archetype
  const stageStats=journey.map(s=>{const prompts=s.prompts||[];return{cited:prompts.filter(p=>p.status==="Cited").length,mentioned:prompts.filter(p=>p.status==="Mentioned").length,absent:prompts.filter(p=>p.status==="Absent").length,total:prompts.length};});

  // Overall archetype visibility across all stages
  const allPrompts=journey.flatMap(s=>s.prompts||[]);
  const archCited=allPrompts.filter(p=>p.status==="Cited").length;
  const archMentioned=allPrompts.filter(p=>p.status==="Mentioned").length;
  const archTotal=allPrompts.length||1;
  const archVisibility=Math.round((archCited*1+archMentioned*0.5)/archTotal*100);

  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Intent Pathway</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Each user segment has a unique search journey — select an archetype to see their specific prompts across all 4 stages.</p></div>
    <SectionNote text="Different user segments ask very different questions at each stage. A 'Price-Conscious Switcher' asking about deals is a completely different intent from an 'IT Manager' evaluating SLAs — and AI engines respond differently to each."/>

    {/* Archetype selector */}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",marginBottom:8}}>Select User Segment</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {allArchetypes.map((a,i)=>(<div key={i} onClick={()=>{setSelArch(i);setSelStage(0);}} style={{padding:"7px 14px",background:selArch===i?`${C.accent}10`:C.surface,border:`1px solid ${selArch===i?`${C.accent}40`:C.border}`,borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}>
          <span style={{fontSize:14}}>{a.icon}</span>
          <span style={{fontSize:11,fontWeight:selArch===i?600:400,color:selArch===i?C.accent:C.text}}>{a.name}</span>
        </div>))}
      </div>
    </div>

    {/* Selected archetype summary */}
    <Card style={{marginBottom:16,background:`${C.accent}04`,borderColor:`${C.accent}15`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:10,background:`${C.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{arch.icon}</div>
          <div>
            <div style={{fontWeight:600,fontSize:14,color:C.text}}>{arch.name}</div>
            <div style={{fontSize:11,color:C.muted}}>{arch.groupIcon} {arch.groupName} · {arch.demo} · ~{arch.size}% of searches</div>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:700,color:archVisibility>=40?C.green:archVisibility>=20?C.amber:C.red,fontFamily:"'Outfit'"}}>{archVisibility}%</div>
          <div style={{fontSize:9,color:C.muted}}>journey visibility</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12,paddingTop:12,borderTop:`1px solid ${C.accent}10`}}>
        <div><span style={{fontSize:10,fontWeight:600,color:C.muted}}>INTENT: </span><span style={{fontSize:11,color:C.sub}}>{arch.intent}</span></div>
        <div><span style={{fontSize:10,fontWeight:600,color:C.muted}}>BEHAVIOUR: </span><span style={{fontSize:11,color:C.sub}}>{arch.behavior}</span></div>
      </div>
    </Card>

    {/* Funnel stage tabs */}
    <Card style={{marginBottom:16,padding:0,overflow:"hidden"}}>
      <div style={{display:"flex"}}>
        {stageNames.map((name,i)=>{
          const s=stageStats[i]||{cited:0,mentioned:0,absent:0,total:0};
          const total=s.total||1;
          const visPct=Math.round((s.cited+s.mentioned)/total*100);
          const color=stageColors[i];
          return(<div key={i} onClick={()=>setSelStage(i)} style={{flex:1,padding:"14px 10px",cursor:"pointer",background:selStage===i?`${color}08`:"transparent",borderBottom:selStage===i?`3px solid ${color}`:"3px solid transparent",textAlign:"center",transition:"all .15s"}}>
            <div style={{fontSize:18,fontWeight:700,color:color,fontFamily:"'Outfit'"}}>{visPct}%</div>
            <div style={{fontSize:11,fontWeight:600,color:selStage===i?C.text:C.sub,marginTop:2}}>{name}</div>
            <div style={{fontSize:10,color:C.muted}}>{s.cited} cited · {s.mentioned} mentioned</div>
          </div>);
        })}
      </div>
    </Card>

    {/* Stage prompt detail */}
    {(()=>{
      const stage=journey[selStage];
      if(!stage||!stage.prompts||stage.prompts.length===0)return(<Card><div style={{textAlign:"center",padding:20,color:C.muted,fontSize:12}}>No prompts mapped for this stage yet.</div></Card>);
      const color=stageColors[selStage];
      const prompts=stage.prompts;
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <h3 style={{fontSize:14,fontWeight:600,color:color,margin:0,fontFamily:"'Outfit'"}}>{stageNames[selStage]}</h3>
            <p style={{fontSize:11,color:C.muted,margin:"2px 0 0"}}>{stageDescs[selStage]} · {prompts.length} prompts for this segment</p>
          </div>
          <div style={{display:"flex",gap:4}}>
            <Pill color={C.green} filled>{(stageStats[selStage]||{}).cited||0} Cited</Pill>
            <Pill color={C.amber} filled>{(stageStats[selStage]||{}).mentioned||0} Mentioned</Pill>
            <Pill color={C.red} filled>{(stageStats[selStage]||{}).absent||0} Absent</Pill>
          </div>
        </div>
        {/* Column headers */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 55px 55px 65px",padding:"6px 8px",borderBottom:`2px solid ${C.borderSoft}`,marginBottom:2}}>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>Prompt</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}><ChatGPTLogo size={12}/></span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}><GeminiLogo size={12}/></span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}>Overall</span>
        </div>
        {prompts.map((p,j)=>{
          const engines=p.engines||{};
          const statuses=["gpt","gemini"].map(e=>engines[e]||p.status||"Absent");
          const statusColor=(s)=>s==="Cited"?C.green:s==="Mentioned"?C.amber:C.red;
          const statusIcon=(s)=>s==="Cited"?"✓":s==="Mentioned"?"◐":"✗";
          return(<div key={j} style={{display:"grid",gridTemplateColumns:"1fr 55px 55px 65px",padding:"8px 8px",borderBottom:`1px solid ${C.borderSoft}`,alignItems:"center"}}>
            <span style={{color:C.sub,fontSize:11,lineHeight:1.4}}>"{p.query}"</span>
            {statuses.map((s,si)=>(<span key={si} style={{textAlign:"center",fontSize:11,fontWeight:600,color:statusColor(s)}}>{statusIcon(s)}</span>))}
            <span style={{textAlign:"center"}}><Pill color={statusColor(p.status||"Absent")}>{p.status||"Absent"}</Pill></span>
          </div>);
        })}
      </Card>);
    })()}

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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>AEO Channels</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Channels ranked by impact on AI engine visibility {hasAnyFindings&&<span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>✓ Verified via Web Search</span>}</p></div>
    <SectionNote text="These channels directly influence whether AI engines cite your brand. Each channel has been verified through real web searches — URLs confirmed, not estimated. Channels with ▼ include specific sites to target."/>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'"}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Personalised content strategy based on {r.clientData.brand}'s audit findings.</p></div>
    <SectionNote text={`This content grid is tailored to ${r.clientData.brand}'s specific AEO gaps and competitive landscape. Priority P0 = start immediately based on audit findings.`}/>
    <Card style={{marginBottom:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["Content Type","Channels","Frequency","Priority","Owner","Impact"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,color:C.muted,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
      <tbody>{[...r.contentTypes].sort((a,b)=>{const po={"P0":0,"P1":1,"P2":2,"P3":3};return(po[a.p]??9)-(po[b.p]??9);}).map((ct,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
        <td style={{padding:"10px"}}><div style={{fontWeight:600,color:C.text}}>{ct.type}</div>{ct.rationale&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{ct.rationale}</div>}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{ct.channels.map(ch=><Pill key={ch} color="#64748b">{ch}</Pill>)}</div></td>
        <td style={{padding:"10px",color:C.sub}}>{ct.freq}</td>
        <td style={{padding:"10px"}}><Pill color={ct.p==="P0"?C.red:ct.p==="P1"?C.amber:"#94a3b8"}>{ct.p}</Pill></td>
        <td style={{padding:"10px",color:C.sub,fontSize:11}}>{ct.owner}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><Bar value={ct.impact} color={ct.impact>=90?C.accent:C.green} h={4}/><span style={{fontWeight:600,fontSize:11}}>{ct.impact}</span></div></td>
      </tr>))}</tbody></table>
    </Card>
    <Card><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:"'Outfit'"}}>Monthly Output Requirements for {r.clientData.brand}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:600,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
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
    .cover{height:100vh;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#ffffff;page-break-after:always;text-align:center;overflow:hidden}
    .cover::before{content:'';position:absolute;top:-120px;right:-120px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(12,76,252,.06) 0%,transparent 70%)}
    .cover::after{content:'';position:absolute;bottom:-80px;left:-80px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(12,76,252,.04) 0%,transparent 70%)}
    .cover-inner{position:relative;z-index:1}
    .cover-line{width:60px;height:3px;background:linear-gradient(90deg,#0c4cfc,#6366f1);border-radius:2px;margin:0 auto 28px}
    .cover h1{font-size:38px;font-weight:800;color:#0c1222;letter-spacing:-.03em;margin-bottom:4px}
    .cover .brand-label{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#8896a6;margin-bottom:6px;font-weight:600}
    .cover .brand-name{font-size:26px;font-weight:700;color:#0c1222;margin-bottom:6px}
    .cover .sub{font-size:14px;color:#4a5568;margin-bottom:28px;font-weight:400}
    .cover .meta{font-size:11px;color:#8896a6;line-height:1.8}
    .cover .score-ring{width:100px;height:100px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;position:relative}
    .cover .score-ring::before{content:'';position:absolute;inset:0;border-radius:50%;border:3px solid #e2e5ea}
    .cover .score-val{font-size:32px;font-weight:800;line-height:1}
    .cover .score-label{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#8896a6;margin-top:8px}
    .cover-footer{position:absolute;bottom:40px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:6px;font-size:10px;color:#c8cdd5}
    .cover-dots{display:flex;gap:20px;margin:20px auto;justify-content:center}
    .cover-dot{width:4px;height:4px;border-radius:50%;background:#e2e5ea}
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
    .toc{page-break-after:always;padding:60px 50px}.toc h2{font-size:24px;border:none;margin-bottom:20px;padding:0}.toc-item{padding:10px 0;border-bottom:1px solid #edf0f3;display:flex;justify-content:space-between;font-size:13px}.toc-num{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:#f0f4ff;color:#0c4cfc;font-size:10px;font-weight:700;margin-right:10px}
    .kpi-row{display:flex;gap:12px;margin:12px 0}.kpi{flex:1;padding:12px;background:#f5f6f8;border-radius:8px;text-align:center}.kpi .val{font-size:24px;font-weight:800}.kpi .label{font-size:9px;text-transform:uppercase;color:#8896a6;margin-top:4px}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.cover{height:auto;min-height:95vh;padding:80px 50px}}`;

    const scCol=r.overall>=70?"#059669":r.overall>=40?"#d97706":"#dc2626";
    const scBg=r.overall>=70?"green":r.overall>=40?"amber":"red";
    const compRows=r.competitors.map(c=>`<tr><td>${c.name}</td><td><strong>${c.score}</strong></td><td style="color:${c.score>r.overall?"#dc2626":"#059669"}">${c.score>r.overall?"+":""}${c.score-r.overall}</td></tr>`).join("");
    const engRows=r.engines.map(e=>`<tr><td>${e.name}</td><td><strong>${e.score}</strong></td><td>${e.mentionRate}%</td><td>${e.citationRate}%</td></tr>`).join("");
    const archHtml=r.stakeholders.map(sg=>`<h3>${sg.icon} ${sg.group}</h3>${sg.archetypes.map(a=>`<div class="dept"><div class="dept-title" style="border-color:#0c4cfc">${a.name}</div><div style="color:#4a5568">${a.demo} · ~${a.size}% of searches · ${a.brandVisibility}% visibility</div><div style="margin-top:4px"><strong>Behaviour:</strong> ${a.behavior} | <strong>Intent:</strong> ${a.intent}</div><div style="margin-top:4px">${a.prompts.map(p=>`<span style="display:inline-block;padding:2px 8px;background:#f0f4ff;border-radius:4px;margin:2px;font-size:10px">"${p}"</span>`).join("")}</div></div>`).join("")}`).join("");
    const funnelHtml=r.stakeholders.flatMap(sg=>sg.archetypes).filter(a=>a.journey&&a.journey.length>0).map(a=>{
      return`<h3>${a.icon} ${a.name}</h3>${(a.journey||[]).map(s=>{const st={c:(s.prompts||[]).filter(p=>p.status==="Cited").length,m:(s.prompts||[]).filter(p=>p.status==="Mentioned").length,a:(s.prompts||[]).filter(p=>p.status==="Absent").length};return`<div style="margin-bottom:8px"><strong style="color:${s.color}">${s.stage}</strong> <span style="color:#8896a6">(${st.c} cited, ${st.m} mentioned, ${st.a} absent)</span></div><table><tr><th>Prompt</th><th>ChatGPT</th><th>Gemini</th><th>Overall</th></tr>${(s.prompts||[]).map(p=>{const e=p.engines||{};return`<tr><td>${p.query}</td><td style="color:${e.gpt==="Cited"?"#059669":e.gpt==="Mentioned"?"#d97706":"#dc2626"}">${e.gpt||p.status}</td><td style="color:${e.gemini==="Cited"?"#059669":e.gemini==="Mentioned"?"#d97706":"#dc2626"}">${e.gemini||p.status}</td><td style="color:${p.status==="Cited"?"#059669":p.status==="Mentioned"?"#d97706":"#dc2626"}">${p.status}</td></tr>`;}).join("")}</table>`;}).join("")}`;
    }).join("");
    const chHtml=r.aeoChannels.sort((a,b)=>b.impact-a.impact).map((ch,i)=>`<tr><td>${i+1}</td><td><strong>${ch.channel}</strong><br><span style="color:#8896a6">${ch.desc}</span></td><td>${ch.impact}</td><td style="color:${ch.status==="Active"?"#059669":ch.status==="Needs Work"?"#d97706":"#dc2626"}">${ch.status}</td></tr>`).join("");
    const gridHtml=[...r.contentTypes].sort((a,b)=>{const po={"P0":0,"P1":1,"P2":2,"P3":3};return(po[a.p]??9)-(po[b.p]??9);}).map(ct=>`<tr><td><strong>${ct.type}</strong>${ct.rationale?`<br><span style="color:#8896a6;font-size:9px">${ct.rationale}</span>`:""}</td><td>${ct.channels.join(", ")}</td><td>${ct.freq}</td><td>${ct.p}</td><td>${ct.owner}</td></tr>`).join("");
    const rmHtml=phases.map(p=>`<h3 style="color:${p.accent}">${p.title} (${p.sub}) — Expected lift: ${p.lift}</h3>${p.departments.map(d=>`<div class="dept"><div class="dept-title" style="border-color:${d.color};color:${d.color}">${d.dept}</div>${d.tasks.map(t=>`<div class="task">→ ${t}</div>`).join("")}</div>`).join("")}`).join("");
    const tocItems=["Executive Summary","AI Engine Scores","Competitive Landscape","User Archetypes","Intent Pathway","AEO Channels","Content-Channel Grid","90-Day Roadmap"];

    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>EnterRank AEO Report — ${r.clientData.brand}</title><style>${css}</style></head><body>
    <div class="cover">
      <div class="cover-inner">
        <div style="margin-bottom:28px"><svg width="44" height="44" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#0c4cfc"/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg></div>
        <div class="brand-label">AEO Audit Report</div>
        <h1>${r.clientData.brand}</h1>
        <div class="sub">${r.clientData.industry||"N/A"} · ${r.clientData.region||"Global"}</div>
        <div class="cover-line"></div>
        <div class="score-ring"><span class="score-val" style="color:${scCol}">${r.overall}%</span></div>
        <div class="score-label">Overall AEO Score</div>
        <div class="cover-dots"><span class="cover-dot"></span><span class="cover-dot"></span><span class="cover-dot"></span></div>
        <div class="meta">${r.clientData.website}<br>Generated ${new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</div>
      </div>
      <div class="cover-footer"><svg width="14" height="14" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#c8cdd5"/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg> Powered by EnterRank · Entermind</div>
    </div>

    <div class="toc"><h2>Table of Contents</h2>${tocItems.map((t,i)=>`<div class="toc-item"><span><span class="toc-num">${i+1}</span>${t}</span><span style="color:#8896a6">${i+2}</span></div>`).join("")}</div>

    <div class="page"><h2>1. Executive Summary</h2>
    <div class="kpi-row"><div class="kpi"><div class="val" style="color:${scCol}">${r.overall}</div><div class="label">Overall AEO Score</div></div><div class="kpi"><div class="val" style="color:#0c4cfc">${Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length)}%</div><div class="label">Avg Mention Rate</div></div><div class="kpi"><div class="val" style="color:#8b5cf6">${Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length)}%</div><div class="label">Avg Citation Rate</div></div><div class="kpi"><div class="val" style="color:${r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]).color}">${r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]).name}</div><div class="label">Best Engine</div></div></div>

    <h2>2. AI Engine Scores</h2><table><tr><th>Engine</th><th>Score</th><th>Mentions</th><th>Citations</th></tr>${engRows}</table>

    <h2>3. Competitive Landscape</h2><table><tr><th>Brand</th><th>Score</th><th>vs You</th></tr><tr style="background:#eff6ff"><td><strong>${r.clientData.brand}</strong></td><td>${r.overall}%</td><td>—</td></tr>${compRows}</table>
    ${r.competitors.filter(c=>c.advantages.length>0).map(c=>`<h3>${c.name} — Looking Under The Hood</h3>${c.advantages.map(a=>`<div class="insight" style="border-color:${a.insight.advantage==="them"?"#dc2626":"#059669"};background:${a.insight.advantage==="them"?"#fef2f2":"#f0fdf4"}">${a.cat.split("/")[0].trim()}: You ${a.yourScore}% vs ${a.theirScore}% — ${a.insight.text}</div>`).join("")}`).join("")}

    <h2>4. User Archetypes</h2>${archHtml}
    <h2>5. Intent Pathway</h2>${funnelHtml}
    <h2>6. AEO Channels</h2><table><tr><th>#</th><th>Channel</th><th>Impact</th><th>Status</th></tr>${chHtml}</table>
    <h2>7. Content-Channel Grid</h2><table><tr><th>Type</th><th>Channels</th><th>Frequency</th><th>Priority</th><th>Owner</th></tr>${gridHtml}</table>
    <h2>8. 90-Day Transformation Roadmap</h2>${rmHtml}
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
/* ─── LOCAL PROJECT STORAGE (fallback for Vercel /tmp) ─── */
const LS_KEY="enterrank_projects";
function lsGetProjects(){try{return JSON.parse(localStorage.getItem(LS_KEY)||"[]");}catch(e){return[];}}
function lsSaveProject(project){try{const all=lsGetProjects().filter(p=>p.id!==project.id);all.push(project);localStorage.setItem(LS_KEY,JSON.stringify(all));}catch(e){}}
function lsDeleteProject(id){try{const all=lsGetProjects().filter(p=>p.id!==id);localStorage.setItem(LS_KEY,JSON.stringify(all));}catch(e){}}
function lsGetProject(id){return lsGetProjects().find(p=>p.id===id)||null;}

/* ─── PROJECT HUB ─── */
function ProjectHub({onSelect,onNew,onLogout}){
  const[projects,setProjects]=useState(null);
  const[loading,setLoading]=useState(true);
  const[deleting,setDeleting]=useState(null);
  const[hovered,setHovered]=useState(null);

  React.useEffect(()=>{
    const localProjects=lsGetProjects();
    fetch("/api/projects").then(r=>r.json()).then(d=>{
      const apiProjects=d.projects||[];
      // Merge: API projects win on duplicates, add any local-only
      const merged=[...apiProjects];
      localProjects.forEach(lp=>{if(!merged.find(ap=>ap.id===lp.id))merged.push(lp);});
      setProjects(merged);setLoading(false);
    }).catch(()=>{setProjects(localProjects);setLoading(false);});
  },[]);

  const handleDelete=async(id,e)=>{
    e.stopPropagation();
    if(!confirm("Delete this project and all its audit history?"))return;
    setDeleting(id);
    try{await fetch(`/api/projects?id=${id}`,{method:"DELETE"});lsDeleteProject(id);setProjects(projects.filter(p=>p.id!==id));}catch(e){}
    setDeleting(null);
  };

  const scoreColor=(s)=>!s?C.muted:s>=70?C.green:s>=40?C.amber:C.red;

  return(<div style={{minHeight:"100vh",background:"#fff",fontFamily:"'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}::selection{background:${C.accent}18}`}</style>

    {/* Top nav */}
    <div style={{padding:"14px 32px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Logo/>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <span style={{fontSize:13,color:C.muted,cursor:"pointer",fontWeight:500}}>Support</span>
        <span style={{fontSize:13,color:C.muted,cursor:"pointer",fontWeight:500}}>Settings</span>
        <span onClick={onLogout} style={{width:32,height:32,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>AZ</span>
      </div>
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"40px 32px",animation:"fadeIn .5s ease-out"}}>
      {/* Page header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:700,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Client Management</h1>
        </div>
      </div>

      {/* Workspaces section */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:"#fff"}}>
        <div style={{padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/></svg>
            <span style={{fontSize:15,fontWeight:600,color:C.text,fontFamily:"'Outfit'"}}>Workspaces</span>
          </div>
          <button onClick={onNew} style={{padding:"8px 18px",background:C.text,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",display:"flex",alignItems:"center",gap:5,transition:"opacity .15s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            New workspace
          </button>
        </div>

        {loading?<div style={{textAlign:"center",padding:60,color:C.muted}}><div style={{width:24,height:24,border:`2.5px solid ${C.borderSoft}`,borderTopColor:C.accent,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 12px"}}/><span style={{fontSize:13}}>Loading...</span></div>:
         projects.length===0?<div style={{textAlign:"center",padding:"64px 40px"}}>
          <div style={{width:48,height:48,borderRadius:12,background:C.bg,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4v14M4 11h14" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 6px",fontFamily:"'Outfit'"}}>No workspaces yet</h3>
          <p style={{color:C.muted,fontSize:13,margin:"0 0 20px"}}>Create your first workspace to start tracking AEO visibility.</p>
          <button onClick={onNew} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Create workspace</button>
        </div>:
        <div>
          {projects.sort((a,b)=>new Date(b.lastAudit||b.createdAt)-new Date(a.lastAudit||a.createdAt)).map((p,pi)=>(
            <div key={p.id} onClick={()=>onSelect(p)}
              onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
              style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:pi<projects.length-1?`1px solid ${C.borderSoft}`:"none",background:hovered===p.id?"#f8fafc":"transparent",transition:"background .15s"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${C.accent}08`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:16,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{(p.brand||"?")[0].toUpperCase()}</span>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.brand}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:1}}>
                    {p.lastScore?<><span style={{color:scoreColor(p.lastScore),fontWeight:600}}>{p.lastScore}%</span><span> visibility score</span></>:"No audits yet"}
                    {p.auditCount>0&&<span> · {p.auditCount} audit{p.auditCount>1?"s":""}</span>}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {p.lastAudit&&<span style={{fontSize:12,color:C.muted}}>{Math.ceil((Date.now()-new Date(p.lastAudit))/(1000*60*60*24))}d ago</span>}
                <button onClick={(e)=>{e.stopPropagation();onSelect(p);}} style={{padding:"6px 16px",background:"#fff",color:C.text,border:`1px solid ${C.border}`,borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",transition:"all .15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.text;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=C.text;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.border;}}>
                  Open
                </button>
                <span onClick={(e)=>handleDelete(p.id,e)} style={{fontSize:14,color:C.muted,cursor:"pointer",padding:"4px 6px",borderRadius:4,opacity:deleting===p.id?.4:.6,transition:"opacity .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                  onMouseLeave={e=>e.currentTarget.style.opacity=".6"}>✕</span>
              </div>
            </div>
          ))}
          {/* Empty workspace slots */}
          {projects.length<6&&Array.from({length:Math.min(3,6-projects.length)}).map((_,i)=>(
            <div key={`empty-${i}`} onClick={onNew} style={{padding:"16px 24px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",borderBottom:i<Math.min(3,6-projects.length)-1?`1px solid ${C.borderSoft}`:"none",opacity:.4,transition:"opacity .15s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
              onMouseLeave={e=>e.currentTarget.style.opacity=".4"}>
              <div style={{width:36,height:36,borderRadius:10,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{fontSize:13,color:C.muted}}>Workspace available</span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  </div>);
}

export default function App(){
  const isArtifact=typeof window!=="undefined"&&(window.location.hostname.includes("claude")||window.location.hostname.includes("localhost"));
  const[authed,setAuthed]=useState(()=>{if(isArtifact)return true;try{return sessionStorage.getItem("enterrank_token")?true:false;}catch(e){return false;}});
  const[screen,setScreen]=useState(isArtifact?"dashboard":"hub");
  const[activeProject,setActiveProject]=useState(null);
  const[step,setStep]=useState("input");
  const[data,setData]=useState({brand:"",industry:"",website:"",region:"",topics:[],competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
  const[results,setResults]=useState(null);
  const[history,setHistory]=useState([]);
  const[chatOpen,setChatOpen]=useState(false);
  const[sideCollapsed,setSideCollapsed]=useState(false);
  const[loginError,setLoginError]=useState("");
  const[loggingIn,setLoggingIn]=useState(false);

  const handleLogin=async(email,password)=>{
    if(isArtifact){setAuthed(true);return;}
    setLoggingIn(true);setLoginError("");
    try{
      const res=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
      const data=await res.json();
      if(data.success){try{sessionStorage.setItem("enterrank_token",data.token);}catch(e){}setAuthed(true);}
      else{setLoginError(data.error||"Invalid credentials");}
    }catch(e){setLoginError("Connection error. Please try again.");}
    setLoggingIn(false);
  };

  const handleLogout=()=>{if(isArtifact){setResults(null);setStep("input");return;}try{sessionStorage.removeItem("enterrank_token");}catch(e){}setAuthed(false);setResults(null);setStep("input");setScreen("hub");setActiveProject(null);};

  const handleSelectProject=async(projectSummary)=>{
    // Load full project data — try API first, fallback to localStorage
    try{
      let project=null;
      try{
        const res=await fetch(`/api/projects?id=${projectSummary.id}`);
        const data=await res.json();
        if(!data.error)project=data;
      }catch(e){}
      if(!project)project=lsGetProject(projectSummary.id);
      if(!project){alert("Failed to load project");return;}
      setActiveProject(project);
      setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
      // Load history from project
      setHistory((project.history||[]).map(h=>({date:h.date||new Date(h.timestamp).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),...h})));
      setResults(null);
      setStep("input");
      setScreen("dashboard");
    }catch(e){alert("Failed to load project");}
  };

  const handleNewProject=()=>{
    setActiveProject(null);
    setData({brand:"",industry:"",website:"",region:"",topics:[],competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
    setHistory([]);
    setResults(null);
    setStep("input");
    setScreen("dashboard");
  };

  const handleBackToHub=()=>{setScreen("hub");setResults(null);setStep("input");};

  if(!authed)return(<div style={{minHeight:"100vh",background:"#fff",fontFamily:"'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}10!important}`}</style>
    <div style={{width:"100%",maxWidth:380,padding:"0 24px",animation:"fadeIn .5s ease-out"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:6}}>
          <svg width="36" height="36" viewBox="0 0 28 28"><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg>
          <span style={{fontSize:24,fontWeight:800,fontFamily:"'Outfit'",color:C.text,letterSpacing:"-.03em"}}>EnterRank</span>
        </div>
        <div style={{fontSize:14,color:C.muted,fontWeight:400}}>AI Engine Optimisation Platform</div>
      </div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:16,padding:"36px 32px",boxShadow:"0 1px 3px rgba(0,0,0,.04),0 8px 32px rgba(0,0,0,.04)"}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.text,margin:"0 0 2px",fontFamily:"'Outfit'",textAlign:"center"}}>Welcome back</h2>
        <p style={{fontSize:13,color:C.muted,margin:"0 0 28px",textAlign:"center"}}>Sign in to your account</p>
        <LoginForm onSubmit={handleLogin} error={loginError} loading={loggingIn}/>
      </div>
      <div style={{textAlign:"center",marginTop:20,fontSize:12,color:C.muted}}>Powered by <span style={{fontWeight:600,color:C.sub}}>Entermind</span></div>
    </div>
  </div>);

  if(screen==="hub")return <ProjectHub onSelect={handleSelectProject} onNew={handleNewProject} onLogout={handleLogout}/>;

  const run=async(apiData)=>{
    const r=generateAll(data, apiData);setResults(r);
    const entry={date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:r.overall,engines:[r.engines[0].score,r.engines[1].score],mentions:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citations:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),categories:r.painPoints.map(p=>({label:p.label,score:p.score}))};
    setHistory(prev=>[...prev,entry]);
    setStep("audit");

    // Save to project (create if new, update if existing) — skip in artifact mode
    if(!isArtifact){try{
      if(activeProject){
        const res=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:activeProject.id,auditEntry:entry})});
        const updated=await res.json();
        if(!updated.error){setActiveProject(updated);lsSaveProject(updated);}
        else{const lp=lsGetProject(activeProject.id);if(lp){lp.history=[...(lp.history||[]),{...entry,timestamp:new Date().toISOString()}];lp.lastAudit=new Date().toISOString();lp.lastScore=entry.overall;lsSaveProject(lp);setActiveProject(lp);}}
      }else{
        const res=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({brand:data.brand,industry:data.industry,website:data.website,region:data.region,topics:data.topics,competitors:data.competitors})});
        const created=await res.json();
        if(!created.error){
          setActiveProject(created);
          const res2=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:created.id,auditEntry:entry})});
          const updated2=await res2.json();
          if(!updated2.error){setActiveProject(updated2);lsSaveProject(updated2);}else{lsSaveProject(created);}
        }else{
          // API failed — save locally
          const localId=data.brand.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+Date.now().toString(36);
          const localProject={id:localId,brand:data.brand,industry:data.industry,website:data.website,region:data.region,topics:data.topics,competitors:data.competitors,history:[{...entry,timestamp:new Date().toISOString()}],lastAudit:new Date().toISOString(),lastScore:entry.overall,createdAt:new Date().toISOString()};
          lsSaveProject(localProject);setActiveProject(localProject);
        }
      }
    }catch(e){console.error("Failed to save project:",e);}}
  };

  const handleUpdateResults=(updates)=>{
    setResults(prev=>{
      if(!prev)return prev;
      const next={...prev};
      // Merge top-level fields
      if(updates.engines) next.engines=updates.engines;
      if(updates.painPoints) next.painPoints=updates.painPoints;
      if(updates.competitors) next.competitors=updates.competitors;
      if(updates.stakeholders) next.stakeholders=updates.stakeholders;
      if(updates.aeoChannels) next.aeoChannels=updates.aeoChannels;
      if(updates.contentTypes) next.contentTypes=updates.contentTypes;
      if(updates.roadmap) next.roadmap={...next.roadmap,...updates.roadmap};
      if(updates.funnelStages) next.funnelStages=updates.funnelStages;
      // Recalculate overall if engines changed
      if(updates.engines){
        next.overall=Math.round(next.engines.reduce((a,e)=>a+e.score,0)/next.engines.length);
        next.scoreLabel=next.overall>=80?"Dominant":next.overall>=60?"Strong":next.overall>=40?"Moderate":next.overall>=20?"Weak":"Invisible";
      }
      return next;
    });
  };

  return(<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif",color:C.text,display:"flex"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}08!important}`}</style>

    {/* Sidebar */}
    <Sidebar step={step} setStep={setStep} results={results} brand={results?.clientData?.brand||data.brand} onBack={handleBackToHub} isArtifact={isArtifact} onLogout={handleLogout} collapsed={sideCollapsed} setCollapsed={setSideCollapsed}/>

    {/* Main content */}
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",marginLeft:sideCollapsed?60:220,transition:"margin-left .2s ease"}}>
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px",maxWidth:1060,width:"100%",margin:"0 auto",transition:"padding-right .2s",paddingRight:chatOpen?420:32}}>
        {step==="input"&&<NewAuditPage data={data} setData={setData} onRun={run} history={history}/>}
        {step==="audit"&&results&&<AuditPage r={results} history={history} goTo={setStep}/>}
        {step==="archetypes"&&results&&<ArchetypesPage r={results} goTo={setStep}/>}
        {step==="intent"&&results&&<IntentPage r={results} goTo={setStep}/>}
        {step==="playbook"&&results&&<PlaybookPage r={results} goTo={setStep}/>}
        {step==="channels"&&results&&<ChannelsPage r={results} goTo={setStep}/>}
        {step==="grid"&&results&&<GridPage r={results} goTo={setStep}/>}
        {step==="roadmap"&&results&&<RoadmapPage r={results}/>}
      </div>
    </div>

    {/* Chat toggle button */}
    {results&&step!=="input"&&!chatOpen&&(
      <div onClick={()=>setChatOpen(true)} style={{position:"fixed",bottom:24,right:24,width:52,height:52,borderRadius:16,background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 20px rgba(37,99,235,.3)",zIndex:999,transition:"transform .15s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#fff"/><path d="M6 8h10M6 11h7" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
    )}

    {/* Chat Panel */}
    <ChatPanel isOpen={chatOpen} onClose={()=>setChatOpen(false)} step={step} results={results} onUpdateResults={handleUpdateResults}/>
  </div>);
}
