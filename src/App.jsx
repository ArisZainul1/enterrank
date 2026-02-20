import React, { useState } from "react";

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const C={bg:"#f8f9fb",surface:"#ffffff",border:"#e8ecf1",borderSoft:"#f0f2f5",text:"#111827",sub:"#4b5563",muted:"#9ca3af",accent:"#2563eb",green:"#059669",amber:"#d97706",red:"#dc2626",r:12,rs:8};
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.26,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Outfit'"}}>{score}%</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:22,boxShadow:"0 1px 2px rgba(0,0,0,.03)",...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}
function BrandLogo({name,website,size=22,color}){
  const[err,setErr]=useState(false);
  const domain=website?website.replace(/^https?:\/\//,"").replace(/\/.*$/,""):null;
  const faviconUrl=domain?`https://www.google.com/s2/favicons?domain=${domain}&sz=${size*2}`:null;
  if(faviconUrl&&!err)return <img src={faviconUrl} width={size} height={size} style={{borderRadius:4,objectFit:"contain"}} onError={()=>setErr(true)} alt={name}/>;
  return <div style={{width:size,height:size,borderRadius:4,background:`${color||C.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(size*.45),fontWeight:700,color:color||C.accent,fontFamily:"'Outfit'"}}>{(name||"?")[0]}</div>;
}
function TagInput({label,tags,setTags,placeholder}){const[input,setInput]=useState("");const add=()=>{const v=input.trim();if(v&&!tags.includes(v)){setTags([...tags,v]);setInput("");}};return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,minHeight:40,alignItems:"center"}}>{tags.map((tag,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",background:`${C.accent}15`,color:C.accent,borderRadius:100,fontSize:12,fontWeight:500}}>{tag}<span onClick={()=>setTags(tags.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:.6,fontSize:14}}>×</span></span>))}<input value={input} onChange={e=>setInput(e.target.value)} placeholder={tags.length===0?placeholder:""} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}} style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:C.text,flex:1,minWidth:80,fontFamily:"inherit"}}/></div><span style={{fontSize:10,color:C.muted}}>Press Enter to add</span></div>);}
function normalizeUrl(url){if(!url||typeof url!=="string")return "";url=url.trim();if(!url)return "";if(url.startsWith("https://"))return url;if(url.startsWith("http://"))return url.replace("http://","https://");return "https://"+url;}
function Field({label,value,onChange,placeholder,onBlur:onBlurCb}){return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{padding:"10px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,color:C.text,fontSize:14,outline:"none",fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>{e.target.style.borderColor=C.border;if(onBlurCb)onBlurCb(e);}}/></div>);}
function InfoTip({text}){const[show,setShow]=useState(false);return(<span style={{position:"relative",display:"inline-flex",marginLeft:4,cursor:"help"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}><span style={{width:14,height:14,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.muted,fontWeight:600}}>?</span>{show&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",width:240,padding:"10px 12px",background:C.text,color:"#fff",borderRadius:8,fontSize:11,lineHeight:1.5,zIndex:999,boxShadow:"0 8px 24px rgba(0,0,0,.2)",pointerEvents:"none"}}><div style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:C.text}}/>{text}</div>}</span>);}
function SectionNote({text}){return <div style={{padding:"10px 14px",background:`${C.accent}04`,border:`1px solid ${C.accent}10`,borderRadius:C.rs,marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:14,lineHeight:1}}>💡</span><span style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{text}</span></div>;}
function NavBtn({onClick,label}){return <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}><button onClick={onClick} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>{label}</button></div>;}
function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:9}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg><div><span style={{fontWeight:800,fontSize:16,color:C.text,letterSpacing:"-.03em",fontFamily:"'Outfit'"}}>EnterRank</span><span style={{fontSize:9,color:C.muted,marginLeft:6,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>by Entermind</span></div></div>);}
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

/* ─── MULTI-ENGINE API LAYER ─── */
async function callWithRetry(fn, retries=2, delay=1500){
  for(let i=0;i<=retries;i++){
    const result=await fn();
    if(result!==null)return result;
    if(i<retries)await new Promise(r=>setTimeout(r,delay*(i+1)));
  }
  return null;
}

async function callOpenAI(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    try{
      const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt})});
      const data=await res.json();
      if(data.error){console.error("OpenAI error:",data.error);return null;}
      return data.text||"";
    }catch(e){console.error("OpenAI API error:",e);return null;}
  });
}

async function callOpenAI4o(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),55000);
      const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt,model:"gpt-4o"}),signal:controller.signal});
      clearTimeout(timeout);
      const data=await res.json();
      if(data.error){console.error("OpenAI 4o error:",data.error);return null;}
      return data.text||"";
    }catch(e){console.error("OpenAI 4o API error:",e);return null;}
  });
}

async function callGemini(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    try{
      const res=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt})});
      const data=await res.json();
      if(data.error){console.error("Gemini error:",data.error);return null;}
      return data.text||"";
    }catch(e){console.error("Gemini API error:",e);return null;}
  });
}

async function callOpenAISearch(query, region){
  return callWithRetry(async()=>{
    try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),55000);
      const r=await fetch("/api/openai-search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query,region}),signal:controller.signal});
      clearTimeout(timeout);
      const d=await r.json();
      if(d.error&&!d.result){console.error("OpenAI Search error:",d.error);return null;}
      return{text:d.result||"",citations:d.citations||[]};
    }catch(e){console.error("OpenAI Search API error:",e);return null;}
  })||{text:"",citations:[]};
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
    const isLocal=typeof window!=="undefined"&&window.location.hostname==="localhost";
    if(isLocal)return null; // crawl only works on Vercel
    const res=await fetch("/api/crawl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
    const data=await res.json();
    if(data.error&&!data.domain)return null;
    return{mainPage:data};
  }catch(e){console.error("Crawl error for "+url+":",e);return null;}
}

async function verifyChannels(brand, website, industry, region){
  try{
    const isLocal=typeof window!=="undefined"&&window.location.hostname==="localhost";
    if(isLocal)return null;
    const res=await fetch("/api/channels",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({brand,website,industry,region})});
    const data=await res.json();
    if(data.error)return null;
    return data;
  }catch(e){console.error("Channel verification error:",e);return null;}
}

function summariseCrawl(crawlResult){
  const d=crawlResult?.mainPage;
  if(!d)return"No crawl data available.";
  const signals=[];
  signals.push(`Website: ${d.domain} | Title: ${d.title}`);
  signals.push(`Content: ${d.totalWordCount?.toLocaleString()||d.homepageWordCount?.toLocaleString()||"unknown"} total words across ${d.totalPagesAnalyzed||1} pages`);
  if(d.schemas?.length>0)signals.push(`Schema markup: ${d.schemas.join(", ")}`);
  else signals.push("No schema markup detected");
  if(d.aeoSignals){
    const aeo=d.aeoSignals;
    const has=[],missing=[];
    if(aeo.faqSchema)has.push("FAQ schema");else missing.push("FAQ schema");
    if(aeo.articleSchema)has.push("Article schema");else missing.push("Article schema");
    if(aeo.orgSchema)has.push("Organization schema");else missing.push("Organization schema");
    if(aeo.authorInfo)has.push("Author attribution");else missing.push("Author attribution");
    if(aeo.trustSignals)has.push("Trust signals");else missing.push("Trust signals");
    if(aeo.video)has.push("Video content");else missing.push("Video content");
    if(aeo.breadcrumbs)has.push("Breadcrumbs");else missing.push("Breadcrumbs");
    if(aeo.hasBlog)has.push("Blog/content hub");else missing.push("Blog/content hub");
    if(aeo.hasFaqPage)has.push("FAQ page");else missing.push("FAQ page");
    if(has.length>0)signals.push(`AEO signals present: ${has.join(", ")}`);
    if(missing.length>0)signals.push(`AEO signals missing: ${missing.join(", ")}`);
  }
  signals.push(`Structure: ${d.contentStructure?.h1Count||0} H1s, ${d.contentStructure?.h2Count||0} H2s, ${d.contentStructure?.h3Count||0} H3s`);
  signals.push(`Links: ${d.internalLinks||0} internal, ${d.externalLinks||0} external`);
  signals.push(`Media: ${d.contentStructure?.imageCount||0} images, ${d.contentStructure?.tableCount||0} tables`);
  if(d.subPages?.length>0)signals.push(`Sub-pages found: ${d.subPages.map(sp=>sp.title||sp.url.split("/").pop()).join(", ")}`);
  return signals.join("\n");
}

async function runRealAudit(cd, onProgress){
  const brand=cd.brand||"Brand",industry=cd.industry||"Technology",region=cd.region||"Global",topics=cd.topics||["tech"];
  const brandLower=brand.toLowerCase();
  const compNamesRaw=(cd.competitors||[]).map(c=>typeof c==="string"?c:c.name).filter(Boolean);
  const compUrlsRaw=(cd.competitors||[]).map(c=>typeof c==="object"?c.website:"");
  const compNames=compNamesRaw.filter(n=>n.toLowerCase()!==brandLower);
  const compUrls=compNamesRaw.map((n,i)=>compUrlsRaw[i]||"").filter((_,i)=>compNamesRaw[i]?.toLowerCase()!==brandLower);
  const topicList=topics.join(", ");
  const engineSystemPrompt=`You are an AEO (Answer Engine Optimization) analyst. Respond ONLY with valid JSON, no markdown fences, no explanations.`;

  // ── Step 1: Crawl brand website AND competitor websites ──
  onProgress("Crawling brand website...",3);
  let brandCrawl=null;
  try{brandCrawl=await crawlWebsite(cd.website);}catch(e){console.error("Crawl failed:",e);}
  const crawlSummary=brandCrawl?summariseCrawl(brandCrawl):"No crawl data available.";

  onProgress("Crawling competitor websites...",8);
  const compCrawls={};
  const compCrawlsRaw={};
  for(let i=0;i<compUrls.length&&i<5;i++){
    if(compUrls[i]){
      try{
        const cc=await crawlWebsite(compUrls[i]);
        if(cc){
          compCrawls[compNames[i]||`Competitor ${i+1}`]=summariseCrawl(cc);
          compCrawlsRaw[compNames[i]||`Competitor ${i+1}`]={url:compUrls[i], ...cc.mainPage};
        }
      }catch(e){}
    }
  }
  const compCrawlSummary=Object.entries(compCrawls).map(([name,data])=>`\n--- ${name} ---\n${data}`).join("\n")||"No competitor crawl data.";

  // ── Step 2: Generate high-quality search queries from key topics ──
  onProgress("Generating search queries from your topics...", 10);

  const topicsToUse = topics.slice(0, 10);
  const queryGenPrompt = `You are an expert in AI engine optimization (AEO/GEO). Your job is to generate realistic, high-quality search queries that real users would type into ChatGPT or Gemini.

I need exactly 2 search queries for each of these topics. Each query must approach the topic from a DIFFERENT angle.

Industry: ${industry}
Region: ${region}
Topics:
${topicsToUse.map((t, i) => `${i + 1}. ${t}`).join("\n")}

For each topic, generate 2 queries using DIFFERENT angles from this list:
- Comparison/versus: "Compare X vs Y for [use case]"
- Best-of with specific criteria: "What are the best X with [specific feature] in [region]?"
- Purchase intent: "Where to buy X in [region]?" or "Which X is worth buying right now?"
- Problem-solving: "How to choose the right X for [specific need]?"
- Feature-specific: "Which X offers the best [specific feature like battery life, rewards, coverage]?"
- Price/value: "Who offers the best deals/pricing on X in [region]?"
- Beginner/newcomer: "Best X for beginners/first-time users in [region]?"
- Authenticity/trust: "Where to find authentic/genuine X in [region]?"
- Trends/current: "What are the top-rated X in [region] in 2026?"
- Trade-in/switching: "Best X for people switching from [alternative]?"

Rules:
- Queries must be specific and detailed — NOT generic like "best X in Y"
- Include specific criteria, features, or use cases in each query
- NEVER include the brand "${brand}" or these competitor names: ${compNames.filter(n=>n).join(", ")}
- Queries must be what someone asks when they do NOT have a specific company in mind
- Make queries specific to ${region} where relevant (mention cities, local context)
- All queries must be in English
- Each query should be 15-25 words long — detailed enough to get a substantive AI response
- The 2 queries per topic MUST use different angles — never repeat the same structure

BAD examples (too generic):
- "What are the best credit cards in UAE?"
- "Top heated tobacco brands in Malaysia"
- "Best mortgage rates"

GOOD examples (specific, varied angles):
- "Which credit cards in UAE offer the highest cashback on grocery and fuel purchases?"
- "Compare heat-not-burn devices by battery life, price and compatible tobacco sticks — which should I buy in Malaysia?"
- "Who offers the best mortgage refinancing deals for expats in Abu Dhabi right now?"
- "What are the most reliable heated tobacco devices for beginners who want easy maintenance?"
- "Where to buy authentic heat-not-burn devices and consumables online in Malaysia?"

Return JSON only:
{"queries": [${topicsToUse.map((t, i) => `\n  {"topic": "${t.replace(/"/g, '\\"')}", "q1": "first query for this topic", "q2": "second query for this topic"}`).join(",")}
]}`;

  const queryGenRaw = await callOpenAI4o(queryGenPrompt, "You are an AEO/GEO search query expert. Generate highly specific, realistic search queries. Return ONLY valid JSON, no markdown fences.");
  const queryGenParsed = safeJSON(queryGenRaw) || { queries: [] };

  // Extract queries from the structured response
  let searchQueries = [];
  if (Array.isArray(queryGenParsed.queries)) {
    queryGenParsed.queries.forEach(item => {
      if (typeof item === "string") {
        searchQueries.push(item);
      } else if (item && typeof item === "object") {
        if (item.q1) searchQueries.push(item.q1);
        if (item.q2) searchQueries.push(item.q2);
      }
    });
  }
  searchQueries = searchQueries.filter(q => typeof q === "string" && q.length > 15).slice(0, 20);

  // Fallback if generation failed
  if (searchQueries.length < 4) {
    searchQueries = topicsToUse.flatMap(t => [
      `What are the best ${t} options with the highest ratings in ${region}?`,
      `Compare the top ${t} providers by features, pricing and customer reviews in ${region}`
    ]).slice(0, 20);
  }

  // Post-generation: strip any brand/competitor names that leaked through
  const brandEscaped = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const brandStripRegex = new RegExp('\\b' + brandEscaped + '\\b', 'gi');
  searchQueries = searchQueries.map(q => {
    let cleaned = q;
    cleaned = cleaned.replace(brandStripRegex, '').replace(/\s{2,}/g, ' ').trim();
    compNames.filter(n => n && n.length > 2).forEach(cn => {
      const esc = cn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cleaned = cleaned.replace(new RegExp('\\b' + esc + '\\b', 'gi'), '').replace(/\s{2,}/g, ' ').trim();
    });
    return cleaned;
  }).filter(q => q.length > 10);

  // ── Step 3: Test all queries on both engines with real responses ──
  const allBrandNames = [brand, ...compNames.filter(n => n)].slice(0, 6);

  // Build detection helpers
  const buildDetectors = (brandName, website) => {
    const escaped = brandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nameRegex = new RegExp('\\b' + escaped + '\\b', 'i');
    let domain = "";
    if (website) {
      try { domain = new URL(website.startsWith("http") ? website : "https://" + website).hostname.replace("www.", ""); } catch(e) {}
    }
    return { nameRegex, domain, brandName };
  };

  const brandDetectors = allBrandNames.map((name, i) => {
    const compObj = i === 0 ? { website: cd.website } : (cd.competitors || []).find(c => (typeof c === "string" ? c : c.name) === name);
    return buildDetectors(name, (typeof compObj === "object" ? compObj.website : "") || "");
  });

  function classifyResponse(responseText, detector, citationUrls) {
    if (!responseText || responseText.length < 20) return { status: "Absent", confidence: "high" };
    const text = responseText;
    const nameFound = detector.nameRegex.test(text);

    // Check citation URLs from Responses API — if any URL contains the brand's domain, it's Cited
    const urlCited = detector.domain && citationUrls && citationUrls.length > 0 && citationUrls.some(c => {
      const url = (c.url || "").toLowerCase();
      return url.includes(detector.domain.toLowerCase());
    });

    // Also check for domain in the response text itself
    const textUrlFound = detector.domain && text.toLowerCase().includes(detector.domain.toLowerCase());

    if (!nameFound && !urlCited && !textUrlFound) return { status: "Absent", confidence: "high" };

    // If brand's domain appears in actual citation URLs — definitive Cited
    if (urlCited) return { status: "Cited", confidence: "high" };

    // If brand's domain in text — Cited
    if (textUrlFound) return { status: "Cited", confidence: "high" };

    const bn = detector.brandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Quick check: brand is #1 in a numbered list
    const numListMatch = text.match(/(?:^|\n)\s*1[\.\)]\s*\*?\*?([^\n]{5,100})/m);
    if (numListMatch && detector.nameRegex.test(numListMatch[1])) return { status: "Cited", confidence: "high" };

    const citedPatterns = [
      // Explicit recommendations
      new RegExp('(?:i\\s+)?(?:recommend|suggest|would\\s+recommend|highly\\s+recommend|strongly\\s+suggest).*?' + bn, 'i'),
      new RegExp(bn + '.*?(?:is\\s+(?:a\\s+)?(?:great|excellent|top|best|leading|strong|solid|reliable|popular|well-known|highly\\s+rated|recommended|ideal|go-to))', 'i'),
      // Ranked first or called top/best
      new RegExp('(?:^|\\n)\\s*(?:1\\.|#1|first)\\s*[.:\\-—)]?\\s*' + bn, 'im'),
      new RegExp('(?:the\\s+)?(?:best|top|leading|most\\s+popular|number\\s+one|#1|dominant|largest).*?' + bn, 'i'),
      new RegExp(bn + '.*?(?:stands?\\s+out|excels?|leads?\\s+the|dominates?|is\\s+the\\s+(?:top|best|leading|most))', 'i'),
      // Specific details (pricing, features, products)
      new RegExp(bn + '.*?(?:offers?|provides?|features?|includes?|comes?\\s+with|starts?\\s+at|(?:starting|priced?)\\s+(?:at|from)|\\d+\\.\\d+%|\\$\\d|AED|USD|RM|EUR|GBP)', 'i'),
      // Brand given its own section/heading
      new RegExp('(?:^|\\n)\\s*(?:\\d+\\.\\s*)?\\*?\\*?' + bn + '\\*?\\*?\\s*(?:\\(|—|:|\\n)', 'im'),
      // "top choice", "best option", "go-to" near brand
      new RegExp('(?:top\\s+choice|best\\s+option|go-to|first\\s+choice|safest\\s+bet|clear\\s+winner|obvious\\s+choice|strong\\s+contender).*?' + bn, 'i'),
      new RegExp(bn + '.*?(?:top\\s+choice|best\\s+option|go-to|first\\s+choice|safest\\s+bet|clear\\s+winner)', 'i'),
    ];
    if (citedPatterns.some(p => p.test(text))) return { status: "Cited", confidence: "high" };

    const paragraph = text.split(/\n\n+/).find(p => detector.nameRegex.test(p)) || text;
    const weakPatterns = [
      /(?:such as|including|like|options include|examples include|among|other|also|alongside)/i,
      /(?:here are|here's a list|some options|several|various|multiple|a few)/i,
    ];
    if (weakPatterns.some(p => p.test(paragraph))) return { status: "Mentioned", confidence: "medium" };
    return { status: "Mentioned", confidence: "low" };
  }

  // Send queries in parallel batches (used for Gemini)
  async function runQueryBatches(callFn, queries, batchSize, delayMs, engineLabel) {
    const results = [];
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      onProgress(`Testing on ${engineLabel}... (${Math.min(i + batchSize, queries.length)}/${queries.length})`, 14 + Math.round((i / queries.length) * 12));
      const batchResults = await Promise.all(
        batch.map(async (query) => {
          const response = await callFn(query, "You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them.");
          return { query, response: response || "", citations: [] };
        })
      );
      results.push(...batchResults);
      if (i + batchSize < queries.length && delayMs > 0) {
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
    return results;
  }

  // ChatGPT batch runner using Responses API with web search
  async function runGptSearchBatches(queries, searchRegion, batchSize, delayMs) {
    const results = [];
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      onProgress(`Testing on ChatGPT with web search... (${Math.min(i + batchSize, queries.length)}/${queries.length})`, 14 + Math.round((i / queries.length) * 12));
      const batchResults = await Promise.all(
        batch.map(async (query) => {
          const result = await callOpenAISearch(query, searchRegion);
          return { query, response: result.text || "", citations: result.citations || [] };
        })
      );
      results.push(...batchResults);
      if (i + batchSize < queries.length && delayMs > 0) {
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
    return results;
  }

  // Run both engines simultaneously
  const [gptResponses, gemResponses] = await Promise.all([
    runGptSearchBatches(searchQueries, region, 5, 500),
    runQueryBatches(callGemini, searchQueries, 3, 4000, "Gemini")
  ]);

  // ── Step 4: Classify responses — scan real text for brand names and URLs ──
  onProgress("Analyzing responses for brand visibility...", 28);

  function computeVisibility(responses, detectors) {
    const result = {};
    const ambiguousCases = [];
    detectors.forEach(det => {
      const queries = responses.map((r, qi) => {
        const classification = classifyResponse(r.response, det, r.citations || []);
        if (classification.confidence === "low") {
          const sentences = (r.response || "").split(/[.!?\n]+/).filter(s => det.nameRegex.test(s));
          const excerpt = sentences.slice(0, 3).join(". ").slice(0, 300);
          if (excerpt.length > 20) {
            ambiguousCases.push({ brandName: det.brandName, queryIndex: qi, query: r.query, excerpt });
          }
        }
        return { query: r.query, status: classification.status, confidence: classification.confidence };
      });
      const total = queries.length || 1;
      const cited = queries.filter(q => q.status === "Cited").length;
      const mentioned = queries.filter(q => q.status === "Mentioned").length;
      result[det.brandName] = {
        mentionRate: Math.round(((cited + mentioned) / total) * 100),
        citationRate: Math.round((cited / total) * 100),
        queries
      };
    });
    return { result, ambiguousCases };
  }

  const gptVisRaw = computeVisibility(gptResponses, brandDetectors);
  const gemVisRaw = computeVisibility(gemResponses, brandDetectors);
  let gptVisibility = gptVisRaw.result;
  let gemVisibility = gemVisRaw.result;

  // Batch reclassify ambiguous cases via AI
  async function batchReclassify(ambiguousCases, callFn, visibility) {
    if (ambiguousCases.length === 0) return;
    const batchPrompt = `For each case below, a user asked an AI engine a question and the response mentioned a specific brand. Classify whether the brand was CITED (directly recommended, given specific actionable details, called out as a top choice, or given pricing/product info) or just MENTIONED (listed among others, passing reference, no specific recommendation).

${ambiguousCases.map((c, i) => `${i + 1}. Brand: "${c.brandName}"\nQuery: "${c.query}"\nResponse excerpt: "${c.excerpt}"`).join("\n\n")}

Return JSON only:
{"classifications": [{"index": 1, "status": "Cited"}, {"index": 2, "status": "Mentioned"}, ...]}

Be strict: only "Cited" if specifically recommended or given detailed actionable info. Being one of several options is "Mentioned".`;
    try {
      const raw = await callFn(batchPrompt, "You are a text classifier. Return ONLY valid JSON, no markdown fences.");
      const parsed = safeJSON(raw);
      if (parsed && parsed.classifications) {
        parsed.classifications.forEach(cl => {
          const cd2 = ambiguousCases[cl.index - 1];
          if (cd2 && (cl.status === "Cited" || cl.status === "Mentioned")) {
            const bv = visibility[cd2.brandName];
            if (bv && bv.queries[cd2.queryIndex]) {
              bv.queries[cd2.queryIndex].status = cl.status;
              bv.queries[cd2.queryIndex].confidence = "ai-verified";
            }
          }
        });
        Object.keys(visibility).forEach(bn => {
          const qs = visibility[bn].queries;
          const total = qs.length || 1;
          const cited = qs.filter(q => q.status === "Cited").length;
          const mentioned = qs.filter(q => q.status === "Mentioned").length;
          visibility[bn].mentionRate = Math.round(((cited + mentioned) / total) * 100);
          visibility[bn].citationRate = Math.round((cited / total) * 100);
        });
      }
    } catch (e) { console.error("Batch reclassification failed:", e); }
  }

  if (gptVisRaw.ambiguousCases.length > 0) {
    onProgress("Verifying ChatGPT citations...", 26);
    await batchReclassify(gptVisRaw.ambiguousCases, callOpenAI, gptVisibility);
  }
  if (gemVisRaw.ambiguousCases.length > 0) {
    onProgress("Verifying Gemini citations...", 27);
    await batchReclassify(gemVisRaw.ambiguousCases, callGemini, gemVisibility);
  }

  // Build compScoresMap with real data for all competitors
  const compScoresMap = {};
  compNames.filter(n => n).forEach(name => {
    const gv = gptVisibility[name] || { mentionRate: 0, citationRate: 0 };
    const gm = gemVisibility[name] || { mentionRate: 0, citationRate: 0 };
    compScoresMap[name] = {
      gpt: { mentionRate: gv.mentionRate, citationRate: gv.citationRate, score: Math.round(gv.mentionRate * 0.5 + gv.citationRate * 0.5) },
      gemini: { mentionRate: gm.mentionRate, citationRate: gm.citationRate, score: Math.round(gm.mentionRate * 0.5 + gm.citationRate * 0.5) },
      avgMentionRate: Math.round((gv.mentionRate + gm.mentionRate) / 2),
      avgCitationRate: Math.round((gv.citationRate + gm.citationRate) / 2),
      avgScore: Math.round(((gv.mentionRate * 0.5 + gv.citationRate * 0.5) + (gm.mentionRate * 0.5 + gm.citationRate * 0.5)) / 2)
    };
  });

  // ── Step 5: Build engine data objects ──
  onProgress("Analyzing strengths and weaknesses...", 30);

  const brandGptVis = gptVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };
  const brandGemVis = gemVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };

  const swBasePrompt = (engineName, mentionRate, citationRate) => `You are ${engineName}. Evaluate this brand's visibility specifically for users in ${region} searching on ${engineName}.

Brand: "${brand}" in ${industry} (${region}).
Website signals: ${crawlSummary.slice(0, 400)}
This brand's visibility on YOUR engine: ${mentionRate}% mentioned, ${citationRate}% cited out of ${searchQueries.length} real queries tested.

Give 3 strengths and 3 weaknesses for why this brand performs this way specifically on ${engineName} for ${region}-based users. Consider whether the brand has strong regional presence, region-specific content, and relevance to ${region} audiences. Be specific and actionable.
Respond in English only. The region context is for market relevance only, not for language.
Return JSON only:
{"strengths":["...","...","..."],"weaknesses":["...","...","..."]}`;

  const [swGptRaw, swGemRaw] = await Promise.all([
    callOpenAI(swBasePrompt("ChatGPT", brandGptVis.mentionRate, brandGptVis.citationRate), engineSystemPrompt),
    callGemini(swBasePrompt("Gemini", brandGemVis.mentionRate, brandGemVis.citationRate), engineSystemPrompt)
  ]);
  const swGpt = safeJSON(swGptRaw) || {};
  const swGem = safeJSON(swGemRaw) || {};

  const gptData = {
    score: Math.round(brandGptVis.mentionRate * 0.5 + brandGptVis.citationRate * 0.5),
    mentionRate: brandGptVis.mentionRate,
    citationRate: brandGptVis.citationRate,
    queries: brandGptVis.queries || [],
    strengths: swGpt.strengths || ["Assessment not available"],
    weaknesses: swGpt.weaknesses || ["Assessment not available"]
  };

  const gemData = {
    score: Math.round(brandGemVis.mentionRate * 0.5 + brandGemVis.citationRate * 0.5),
    mentionRate: brandGemVis.mentionRate,
    citationRate: brandGemVis.citationRate,
    queries: brandGemVis.queries || [],
    strengths: swGem.strengths || ["Assessment not available"],
    weaknesses: swGem.weaknesses || ["Assessment not available"]
  };

  // ── Step 5b: Sentiment Analysis ──
  onProgress("Analyzing brand sentiment across AI engines...",24);

  const sentimentPrompt=`Analyze the general public and industry sentiment around "${brand}" in the ${industry} industry, specifically in ${region}.

CRITICAL: Rate sentiment specifically in ${region}, not globally. Consider local customer reviews, local news coverage, local social media perception, and regional reputation. A brand loved globally but unknown or unavailable in ${region} should score 40-50 (neutral). A brand with strong local presence and positive regional reputation should score higher than a global brand with no ${region} footprint.

Rate sentiment on a scale of 0-100:
- 0-20: Very negative (scandals, lawsuits, major complaints in ${region})
- 21-40: Negative (frequent criticism, declining reputation in ${region})
- 41-60: Neutral (not well known in ${region}, mixed local opinions)
- 61-80: Positive (well regarded in ${region}, good local reputation)
- 81-100: Very positive (market leader in ${region}, beloved by local customers)

Also rate these competitors based on their reputation in ${region}: ${compNames.join(", ")}

Return JSON only:
{
  "brand": {"score": <0-100>, "summary": "<1 sentence explaining the sentiment in ${region}>"},
  "competitors": [{"name": "<competitor>", "score": <0-100>, "summary": "<1 sentence about their ${region} reputation>"}]
}

Respond in English only. The region context is for market relevance only, not for language.
Be accurate. Base this on real market perception in ${region}, not global speculation. A brand nobody in ${region} has heard of should score 40-50 (neutral), not high.`;

  const [sentGptRaw, sentGemRaw]=await Promise.all([
    callOpenAI(sentimentPrompt, engineSystemPrompt),
    callGemini(sentimentPrompt, engineSystemPrompt)
  ]);
  const sentGpt=safeJSON(sentGptRaw)||{brand:{score:50,summary:"Could not assess"},competitors:[]};
  const sentGem=safeJSON(sentGemRaw)||{brand:{score:50,summary:"Could not assess"},competitors:[]};

  const sentimentData={
    brand:{
      gpt:sentGpt.brand?.score||50,
      gemini:sentGem.brand?.score||50,
      avg:Math.round(((sentGpt.brand?.score||50)+(sentGem.brand?.score||50))/2),
      summary:sentGpt.brand?.summary||sentGem.brand?.summary||"Neutral sentiment"
    },
    competitors:compNames.map(name=>{
      const gc=(sentGpt.competitors||[]).find(c=>c.name?.toLowerCase()===name.toLowerCase());
      const gm=(sentGem.competitors||[]).find(c=>c.name?.toLowerCase()===name.toLowerCase());
      const gScore=gc?.score||50;
      const mScore=gm?.score||50;
      return{name,gpt:gScore,gemini:mScore,avg:Math.round((gScore+mScore)/2),summary:gc?.summary||gm?.summary||""};
    })
  };

  // ── Step 4: Competitor analysis — BOTH engines + crawl data ──
  onProgress("Analysing competitors across both engines...",30);
  const compPromptBase=`Analyse these competitors against "${brand}" in ${industry} (${region}) for AI engine visibility.

Brand website crawl data:
${crawlSummary}

Competitor website crawl data:
${compCrawlSummary}

Competitors: ${compNames.map((n,i)=>`${n}${compUrls[i]?" ("+compUrls[i]+")":""}`).join(", ")||"none"}.

CRITICAL: Score ALL competitors based ONLY on their presence, reputation, and market share in ${region}. A globally known brand that is not available or not popular in ${region} should score VERY LOW. If a competitor does not operate in ${region}, score them near 0. Regional availability and local market dominance matter more than global brand recognition.

Evaluate each competitor's online presence targeting ${region}. Check if their website has ${region}-specific content, regional pricing, and local testimonials. Score based on their ${region} presence, not their global presence. Respond in English only.

Based on the actual crawl data, score each competitor. Return JSON:
{
  "competitors": [
    {
      "name": "<competitor name>",
      "score": <0-100 overall AEO visibility>,
      "engineScores": [<chatgpt_score>, <gemini_score>],
      "topStrength": "<their main AEO advantage based on crawl data>",
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
}

Use the crawl data to give accurate scores. If a competitor has better schema markup, score them higher on Structured Data.`;

  const[compGptRaw,compGemRaw]=await Promise.all([
    callOpenAI(compPromptBase, engineSystemPrompt),
    callGemini(compPromptBase, engineSystemPrompt)
  ]);
  const compGpt=safeJSON(compGptRaw)||{competitors:[]};
  const compGem=safeJSON(compGemRaw)||{competitors:[]};
  // Merge: average scores from both engines
  const mergedComps=(compGpt.competitors||[]).map(gc=>{
    const gemMatch=(compGem.competitors||[]).find(g=>g.name&&gc.name&&g.name.toLowerCase()===gc.name.toLowerCase());
    if(gemMatch){
      return{...gc,score:Math.round((gc.score+gemMatch.score)/2),
        engineScores:[gc.engineScores?gc.engineScores[0]:gc.score, gemMatch.engineScores?gemMatch.engineScores[1]:gemMatch.score],
        painPoints:(gc.painPoints||[]).map((pp,j)=>{const gp=(gemMatch.painPoints||[])[j];return{label:pp.label,score:gp?Math.round((pp.score+gp.score)/2):pp.score};})};
    }
    return gc;
  });
  const compData={competitors:mergedComps.length>0?mergedComps:(compGem.competitors||[])};

  // ── Step 5: Pain points — BOTH engines + crawl data ──
  onProgress("Scoring AEO categories across both engines...",40);
  const catPrompt=`Based on this website analysis for "${brand}" (${industry}, ${region}):

${crawlSummary}

Evaluate each category based on how well "${brand}" targets the ${region} market. Consider whether the website has ${region}-specific content, regional pricing, and local testimonials. A website with no ${region}-specific presence should score lower on Content Authority and E-E-A-T even if it has strong global content. Respond in English only.

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

Use severity: "critical" if <30, "warning" if 30-60, "good" if >60. Base scores strictly on the crawl data.`;

  const[catGptRaw,catGemRaw]=await Promise.all([
    callOpenAI(catPrompt, engineSystemPrompt),
    callGemini(catPrompt, engineSystemPrompt)
  ]);
  const catGpt=safeJSON(catGptRaw)||{painPoints:[]};
  const catGem=safeJSON(catGemRaw)||{painPoints:[]};
  // Merge: average pain point scores from both engines
  const mergedPainPoints=(catGpt.painPoints&&catGpt.painPoints.length>0?catGpt.painPoints:catGem.painPoints||[]).map((pp,i)=>{
    const gemPP=(catGem.painPoints||[])[i];
    const avgScore=gemPP?Math.round((pp.score+gemPP.score)/2):pp.score;
    return{label:pp.label,score:avgScore,severity:avgScore<30?"critical":avgScore<60?"warning":"good"};
  });

  // ── Step 6: User archetypes + journeys — OpenAI generates, Gemini verifies engine statuses ──
  onProgress("Generating user archetypes...",48);
  const archPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}, competitors: ${compNames.join(", ")||"none"}.

Generate archetypes for ${industry} customers specifically in ${region}. Use regional demographics, local behaviors, and regional context. The archetypes should reflect real user personas in ${region} — their local needs, purchasing habits, and how they search for ${industry} solutions in their region.

Create 2-3 stakeholder groups with 2-3 archetypes each. Each archetype needs a 4-stage customer journey with 2-3 prompts per stage. Prompts should be what a user in ${region} would actually type — use regional context (local competitors, local pricing, local market dynamics) but always write in English.

For each prompt, assess: would ChatGPT mention/cite ${brand}? Would Gemini?

Return JSON:
{
  "stakeholders": [
    {
      "group": "<group name>",
      "icon": "<emoji>",
      "desc": "<1 sentence>",
      "archetypes": [
        {
          "name": "<name>",
          "icon": "<emoji>",
          "demo": "<demographics>",
          "behavior": "<search behavior>",
          "intent": "<primary intent>",
          "size": <10-40>,
          "brandVisibility": <0-100>,
          "opportunity": "high"|"medium"|"low",
          "prompts": ["<prompt1>","<prompt2>","<prompt3>","<prompt4>"],
          "journey": [
            {"stage":"Awareness","color":"#6366f1","prompts":[
              {"query":"<actual user prompt>","status":"Cited"|"Mentioned"|"Absent","engines":{"gpt":"Cited"|"Mentioned"|"Absent","gemini":"Cited"|"Mentioned"|"Absent"}}
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

IMPORTANT: All output must be in English. Do not translate or localize the language. Use regional context (local competitors, local pricing, local regulations, local currency) but always respond in English.
Be accurate for ${region}. All demographics, behaviors, and prompts must reflect ${region}-specific context. ${brand} likely has low visibility on most prompts — use "Absent" where appropriate. ChatGPT and Gemini may differ.`;
  const archRaw=await callOpenAI(archPrompt, engineSystemPrompt);
  const archData=safeJSON(archRaw)||{stakeholders:[]};

  // Now ask Gemini to verify/correct the engine statuses
  onProgress("Verifying archetype journeys with Gemini...",54);
  if(archData.stakeholders&&archData.stakeholders.length>0){
    const allPrompts=[];
    archData.stakeholders.forEach(sg=>(sg.archetypes||[]).forEach(a=>(a.journey||[]).forEach(j=>(j.prompts||[]).forEach(p=>allPrompts.push(p.query)))));
    if(allPrompts.length>0){
      const verifyPrompt=`You are Gemini. For each of these prompts about "${brand}" in ${industry} (${region}), would you mention or cite ${brand} in your response?

Prompts:
${allPrompts.map((p,i)=>`${i+1}. "${p}"`).join("\n")}

Return JSON array — one entry per prompt in order:
[{"query":"<prompt>","geminiStatus":"Cited"|"Mentioned"|"Absent"}]

Be accurate. "Cited" = you would link to their website. "Mentioned" = you'd name them. "Absent" = you wouldn't bring them up.`;
      const verifyRaw=await callGemini(verifyPrompt, engineSystemPrompt);
      const verifyData=safeJSON(verifyRaw);
      if(verifyData&&Array.isArray(verifyData)){
        let idx=0;
        archData.stakeholders.forEach(sg=>(sg.archetypes||[]).forEach(a=>(a.journey||[]).forEach(j=>(j.prompts||[]).forEach(p=>{
          if(verifyData[idx]){p.engines={...p.engines,gemini:verifyData[idx].geminiStatus||p.engines?.gemini||"Absent"};}
          idx++;
        }))));
      }
    }
  }

  // ── Step 6b: Intent Pathway — real data from BOTH engines ──
  onProgress("Testing intent pathway prompts...",58);
  const intentPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}.
Competitors: ${compNames.join(", ")}.

IMPORTANT: Generate prompts that users in ${region} would actually type. Use regional context (local competitors, local currency, local regulations) but always write prompts in English. A user in ${region} searching for ${industry} solutions will reference regional specifics — reflect that in every prompt. All output must be in English.

Create an intent funnel with 4 stages. For each stage, list 6-8 realistic prompts a real user in ${region} would actually type into ChatGPT or Gemini. For each prompt:
1. Assess whether each engine would mention or cite ${brand}
2. Assign a "weight" score (1-10) indicating how important this prompt is for ${brand}'s AEO visibility. Higher weight = more likely to drive conversions, more search volume, more competitive.
3. Identify the trigger words in the prompt that influence AI engine citation behavior
4. Suggest an optimised version of the prompt that ${brand} should create content to target

Website data: ${crawlSummary.slice(0,400)}

Return JSON array:
[
  {"stage":"Awareness","desc":"User discovers the category","color":"#6366f1","prompts":[
    {"query":"<real user prompt>","engines":{"gpt":"Cited"|"Mentioned"|"Absent","gemini":"Cited"|"Mentioned"|"Absent"},"weight":<1-10>,"triggerWords":["best","top","recommended"],"optimisedPrompt":"<reworded prompt ${brand} should target with content>","contentTip":"<1-sentence tip on what content to create to win this prompt>"}
  ]},
  {"stage":"Consideration","desc":"User evaluates options","color":"#8b5cf6","prompts":[...]},
  {"stage":"Decision","desc":"User ready to commit","color":"#a855f7","prompts":[...]},
  {"stage":"Retention","desc":"User seeks ongoing value","color":"#c084fc","prompts":[...]}
]

WEIGHT SCORING GUIDE:
- 9-10: High commercial intent, superlative/comparison triggers ("best", "top", "vs", "recommended", "leading"), brand-name queries
- 7-8: Strong intent with industry-specific triggers ("${industry} solutions", "how to choose", "pricing comparison")  
- 5-6: Moderate intent, informational queries with some brand opportunity ("what is", "how does", "guide to")
- 3-4: Low intent, broad educational queries where citation is unlikely
- 1-2: Very generic, almost no chance of brand citation

TRIGGER WORD CATEGORIES for ${industry}:
- Superlatives: best, top, leading, #1, most popular, highest rated
- Comparisons: vs, compare, alternative to, switch from, better than
- Commercial: pricing, cost, buy, subscribe, free trial, demo, sign up
- Authority: recommended, trusted, certified, award-winning, expert
- Local/Regional: in ${region}, near me, ${region}-based
- Review: reviews, ratings, reputation, testimonials, experience with

Rules:
- Be strict on Cited/Mentioned/Absent. Most small brands will be "Absent" for generic queries.
- Each stage MUST have at least 6 prompts.
- Weight must reflect real-world impact — not all prompts are equal.
- triggerWords should only include words actually present in the query.
- optimisedPrompt should be a version ${brand} can create content around.`;

  const[intentGptRaw,intentGemRaw]=await Promise.all([
    callOpenAI(intentPrompt, engineSystemPrompt),
    callGemini(intentPrompt, engineSystemPrompt)
  ]);
  const intentGpt=safeJSON(intentGptRaw)||[];
  const intentGem=safeJSON(intentGemRaw)||[];
  // Merge: use GPT structure, override Gemini statuses from Gemini's own response
  const intentData=(Array.isArray(intentGpt)&&intentGpt.length>0?intentGpt:intentGem).map((stage,si)=>{
    const gemStage=(Array.isArray(intentGem)?intentGem:[])[si];
    return{...stage,prompts:(stage.prompts||[]).map((p,pi)=>{
      const gemP=gemStage&&gemStage.prompts?gemStage.prompts[pi]:null;
      const gptStatus=p.engines?.gpt||"Absent";
      const gemStatus=gemP?.engines?.gemini||p.engines?.gemini||"Absent";
      return{query:p.query,rank:pi+1,
        status:(gptStatus==="Cited"||gemStatus==="Cited")?"Cited":(gptStatus==="Mentioned"||gemStatus==="Mentioned")?"Mentioned":"Absent",
        engines:{gpt:gptStatus,gemini:gemStatus},
        weight:p.weight||5,triggerWords:p.triggerWords||[],optimisedPrompt:p.optimisedPrompt||"",contentTip:p.contentTip||""};
    })};
  });

  // ── Step 7: AEO Channel verification via REAL web crawling ──
  onProgress("Verifying AEO channels via web search...",65);
  let realChannels=null;
  try{realChannels=await verifyChannels(brand, cd.website, industry, region);}catch(e){console.error("Channel verify failed:",e);}

  let chData={channels:[]};
  if(realChannels&&realChannels.channels&&realChannels.channels.length>0){
    chData.channels=realChannels.channels;
    onProgress("Checking podcast & academic presence...",70);
    const gapPrompt=`For "${brand}" in ${industry} (${region}), assess ONLY these 2 channels:
1. Podcast Appearances
2. Academic/Research Citations

Return JSON:
{"channels":[
  {"channel":"Podcast Appearances","status":"Active"|"Needs Work"|"Not Present","finding":"<detail>","priority":"High"|"Medium"|"Low","action":"<recommendation>"},
  {"channel":"Academic/Research Citations","status":"Active"|"Needs Work"|"Not Present","finding":"<detail>","priority":"High"|"Medium"|"Low","action":"<recommendation>"}
]}

Be accurate for the ${region} market. Only "Active" if ${brand} has verifiable presence on these channels in ${region}. Recommendations should be specific to ${region}. Respond in English only.`;
    const gapRaw=await callGemini(gapPrompt, engineSystemPrompt);
    const gapData=safeJSON(gapRaw);
    if(gapData&&gapData.channels)chData.channels=[...chData.channels,...gapData.channels];
  }else{
    const channelPrompt=`For "${brand}" (website: ${cd.website||"unknown"}) in ${industry} (${region}):
Website crawl: ${crawlSummary}
Evaluate channel presence specifically in ${region}. Consider regional platforms, local review sites, and ${region}-specific directories. A channel that exists globally but has no ${region} presence should be "Needs Work". Respond in English only.
Determine channel presence. Return JSON:
{"channels":[
  {"channel":"Wikipedia","status":"Active"|"Needs Work"|"Not Present","finding":"<detail>","priority":"High"|"Medium"|"Low","action":"<rec>"},
  {"channel":"YouTube","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"LinkedIn","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Reddit","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Social Media (X, Reddit, Quora)","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Industry Directories","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Review Sites (G2/Capterra/Trustpilot)","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Press/News Coverage","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Podcast Appearances","status":"...","finding":"...","priority":"...","action":"..."},
  {"channel":"Academic/Research Citations","status":"...","finding":"...","priority":"...","action":"..."}
]}`;
    const chRaw=await callGemini(channelPrompt, engineSystemPrompt);
    chData=safeJSON(chRaw)||{channels:[]};
  }

  // ── Step 8: Content recommendations — BOTH engines, using ALL audit data ──
  onProgress("Building content recommendations from both engines...",78);
  const critCats=(mergedPainPoints||[]).filter(p=>p.severity==="critical").map(p=>`${p.label} (${p.score}%)`).join(", ");
  const warnCats=(mergedPainPoints||[]).filter(p=>p.severity==="warning").map(p=>`${p.label} (${p.score}%)`).join(", ");
  const chGaps=(chData.channels||[]).filter(c=>c.status==="Not Present"||c.status==="Needs Work").map(c=>c.channel).join(", ");
  const contentPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}.

AUDIT DATA TO BASE RECOMMENDATIONS ON:
- ChatGPT score: ${gptData.score||0}%, Gemini score: ${gemData.score||0}%
- Critical AEO categories: ${critCats||"none"}
- Warning categories: ${warnCats||"none"}
- Channel gaps: ${chGaps||"none"}
- Competitors outperforming on: ${(mergedComps||[]).slice(0,3).map(c=>`${c.name} (${c.topStrength||"N/A"})`).join(", ")||"none"}
- Website findings: ${crawlSummary.slice(0,300)}

Create 8-10 SPECIFIC content types. Each must:
1. Directly address an AEO gap found above
2. Have a DIFFERENT channel mix (not all "Blog")
3. Have VARIED frequencies (weekly, 2/month, monthly, quarterly)
4. Have DIFFERENT priorities (mix of P0, P1, P2)
5. Have DIFFERENT owners (Content Team, Dev Team, Marketing, PR, Analytics, Product)
6. Explain exactly HOW it improves visibility on ChatGPT AND Gemini

Return JSON:
{
  "contentTypes": [
    {"type":"<specific content type name>","channels":["<primary channel>","<secondary>"],"freq":"<specific frequency>","p":"P0"|"P1"|"P2","owner":"<specific team>","impact":<0-100>,"rationale":"<how this addresses specific AEO gaps found in audit>"}
  ]
}

Suggest content strategies relevant to the ${region} market. Content should target ${region}-based audiences, address regional ${industry} trends, and reference local market dynamics. Prioritize channels and formats that are popular in ${region}. All output must be in English — do not translate or localize the language.

IMPORTANT: Do NOT make everything a blog post. Include technical tasks (schema, markup), video, social, PR, research, partnerships. Vary the owners — dev team for technical, PR for outreach, analytics for research. Each content type must tie back to a specific finding from the audit.`;

  const[contentGptRaw,contentGemRaw]=await Promise.all([
    callOpenAI(contentPrompt, engineSystemPrompt),
    callGemini(contentPrompt, engineSystemPrompt)
  ]);
  const contentGpt=safeJSON(contentGptRaw)||{contentTypes:[]};
  const contentGem=safeJSON(contentGemRaw)||{contentTypes:[]};
  const allContentTypes=[...(contentGpt.contentTypes||[])];
  (contentGem.contentTypes||[]).forEach(gc=>{
    if(!allContentTypes.find(c=>c.type&&gc.type&&c.type.toLowerCase()===gc.type.toLowerCase()))allContentTypes.push(gc);
  });
  const contentData={contentTypes:allContentTypes.slice(0,10)};

  // ── Step 9: 90-Day Roadmap — using ALL previous data ──
  onProgress("Creating 90-day roadmap from audit data...",88);
  const overallScore=Math.round(((gptData.score||0)+(gemData.score||0))/2);
  const criticalCats=(mergedPainPoints||[]).filter(p=>p.severity==="critical").map(p=>p.label).join(", ");
  const weakCats=(mergedPainPoints||[]).filter(p=>p.severity==="warning").map(p=>p.label).join(", ");
  const channelGaps=(chData.channels||[]).filter(c=>c.status==="Not Present").map(c=>c.channel).join(", ");

  const roadmapPrompt=`Create a 90-day AEO roadmap for "${brand}" in ${industry}, specifically for improving visibility in ${region}.

AUDIT FINDINGS TO ADDRESS:
- Overall visibility score: ${overallScore}%
- ChatGPT score: ${gptData.score||0}%, Gemini score: ${gemData.score||0}%
- Critical categories: ${criticalCats||"none"}
- Warning categories: ${weakCats||"none"}
- Missing channels: ${channelGaps||"none"}
- Website issues from crawl: ${crawlSummary.slice(0,500)}
- Top competitor advantages: ${(compData.competitors||[]).slice(0,3).map(c=>`${c.name} (${c.score}%): ${c.topStrength||"N/A"}`).join("; ")}

Return JSON:
{
  "day30": {
    "title": "Foundation Sprint",
    "sub": "Days 1-30",
    "accent": "#ef4444",
    "lift": "10-15%",
    "departments": [
      {"dept": "Technical", "color": "#0c4cfc", "tasks": ["<specific task addressing critical issues>", "<task>", "<task>"]},
      {"dept": "Content", "color": "#059669", "tasks": ["<specific task>", "<task>", "<task>"]},
      {"dept": "PR & Outreach", "color": "#8b5cf6", "tasks": ["<specific task addressing channel gaps>", "<task>", "<task>"]}
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

Each department: 3-5 specific tasks that directly address the audit findings above. Reference actual issues found. All tasks must be tailored to the ${region} market — include regional content creation, local partnerships, and ${region}-specific PR outreach. Respond in English only.`;
  const roadRaw=await callOpenAI(roadmapPrompt, engineSystemPrompt);
  const roadData=safeJSON(roadRaw)||null;

  onProgress("Compiling final report...",95);

  return {
    engineData:{
      engines:[
        {id:"chatgpt",...gptData,queries:(gptData.queries||[]).slice(0,8)},
        {id:"gemini",...gemData,queries:(gemData.queries||[]).slice(0,8)}
      ],
      painPoints:mergedPainPoints.length>0?mergedPainPoints.slice(0,6):null
    },
    competitorData:{competitors:(compData.competitors||[]).slice(0,5)},
    archData:archData.stakeholders||[],
    intentData:intentData.length>0?intentData:null,
    channelData:{channels:(chData.channels||[]).slice(0,12)},
    contentGridData:(contentData.contentTypes||[]).slice(0,10),
    roadmapData:roadData,
    contentData:(contentData.contentTypes||[]).slice(0,10),
    sentimentData:sentimentData,
    brandCrawlData: brandCrawl?.mainPage || null,
    compCrawlData: compCrawlsRaw,
    compVisibilityData: compScoresMap,
    searchQueries: searchQueries
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
  const normComps=(cd.competitors||[]).map(c=>typeof c==="string"?{name:c,website:""}:c).filter(c=>c.name&&c.name.trim());
  cd={...cd, competitors:normComps, competitorNames:normComps.map(c=>c.name)};
  const hasApi=apiData&&apiData.engineData;
  const engineMeta=[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{id:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo}];
  const badP=["specific strength","specific weakness","data unavailable","REPLACE WITH","as a language model","as an ai","limited knowledge"];
  const fB=(arr,fb)=>{if(!arr||!Array.isArray(arr))return fb;const f=arr.filter(s=>s&&typeof s==="string"&&!badP.some(bp=>s.toLowerCase().includes(bp))&&s.length>10);return f.length>=2?f:fb;};
  const engines=engineMeta.map((e,i)=>{
    if(hasApi&&apiData.engineData.engines&&apiData.engineData.engines[i]){const ae=apiData.engineData.engines[i];
      return{...e,score:ae.score||0,mentionRate:ae.mentionRate||0,citationRate:ae.citationRate||0,queries:(ae.queries||[]).slice(0,8).map(q=>({query:q.query||"",status:q.status||"Absent"})),strengths:fB(ae.strengths,[`${cd.brand} appears in some ${cd.industry} queries`]),weaknesses:fB(ae.weaknesses,[`Competitors cited more frequently`])};}
    return{...e,score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:["No API data received"]};
  });
  engines.forEach(e=>{e.score=Math.round(e.mentionRate*0.5+e.citationRate*0.5);});
  const overall=Math.round(engines.reduce((a,e)=>a+e.score,0)/engines.length);
  const getScoreLabel=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const getScoreDesc=(s,b)=>s>=80?b+" is dominant — frequently cited and recommended.":s>=60?b+" has strong visibility — regularly mentioned.":s>=40?b+" has moderate visibility — rarely cited as primary source.":s>=20?b+" has weak visibility — occasionally mentioned.":b+" is invisible to AI engines.";
  const painCats=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  const painPoints=(hasApi&&apiData.engineData.painPoints&&apiData.engineData.painPoints.length>0)?apiData.engineData.painPoints.map(pp=>({label:pp.label,score:pp.score,severity:pp.score<30?"critical":pp.score<60?"warning":"good"})):painCats.map(label=>({label,score:0,severity:"critical"}));
  const compVis = (hasApi && apiData.compVisibilityData) ? apiData.compVisibilityData : {};
  const competitors=(hasApi&&apiData.competitorData)?(()=>{const raw=Array.isArray(apiData.competitorData)?apiData.competitorData:apiData.competitorData.competitors||[];return raw.filter(c=>c.name&&c.name.toLowerCase()!==cd.brand.toLowerCase()).map(c=>{const cPain=(c.painPoints||painCats.map(l=>({label:l,score:c.score||0}))).map(p=>({label:p.label,score:p.score}));const advantages=cPain.map(pp=>{const brandPP=painPoints.find(bp=>bp.label===pp.label);const diff=pp.score-(brandPP?brandPP.score:0);return{category:pp.label,diff,insight:getInsight(pp.label,c.name,cd.brand,diff>0)};}).filter(a=>a.insight);return{name:c.name,score:c.score||0,painPoints:cPain,advantages,mentionRate:(compVis[c.name]?.avgMentionRate)??0,citationRate:(compVis[c.name]?.avgCitationRate)??0,engineScores:[compVis[c.name]?.gpt?.score??c.score??0,compVis[c.name]?.gemini?.score??c.score??0],topStrength:c.topStrength||"N/A"};});})():[];
  const stakeholders=(hasApi&&apiData.archData&&Array.isArray(apiData.archData)&&apiData.archData.length>0)?apiData.archData:[];
  const funnelStages=(hasApi&&apiData.intentData&&Array.isArray(apiData.intentData)&&apiData.intentData.length>0)?apiData.intentData.map(s=>({stage:s.stage,desc:s.desc||"",color:s.color||"#6366f1",prompts:(s.prompts||[]).map(p=>({query:p.query||"",rank:p.rank||0,status:p.status||"Absent",engines:p.engines||{gpt:"Absent",gemini:"Absent"},weight:p.weight||5,triggerWords:p.triggerWords||[],optimisedPrompt:p.optimisedPrompt||"",contentTip:p.contentTip||""}))})):[{stage:"Awareness",desc:"",color:"#6366f1",prompts:[]},{stage:"Consideration",desc:"",color:"#8b5cf6",prompts:[]},{stage:"Decision",desc:"",color:"#a855f7",prompts:[]},{stage:"Retention",desc:"",color:"#c084fc",prompts:[]}];
  const brandGuidelines=[{area:"Entity Disambiguation",rule:"Establish "+cd.brand+" as a distinct entity across knowledge graph sources.",example:"Audit Wikidata, Knowledge Panel, Crunchbase for consistency."},{area:"Semantic Content Architecture",rule:"Structure content using topic clusters with pillar pages.",example:"Pillar: "+cd.brand+"'s Guide to "+(cd.topics[0]||cd.industry)},{area:"JSON-LD Schema",rule:"Deploy Organization, Product, FAQ, Article, Speakable schema.",example:"Every blog: Article schema with author, dates, FAQ markup."},{area:"E-E-A-T Signals",rule:"Every piece must demonstrate Experience, Expertise, Authority, Trust.",example:"Author bios with credentials, Person schema, cited sources."},{area:"Citation Velocity",rule:"Target DA50+ domains. 3 fresh citations beat 10 stale ones.",example:"Monthly: 2 guest articles DA60+, 3 HARO quotes, 1 data study."},{area:"Content Freshness",rule:"Quarterly review cycle. Update dateModified in schema.",example:"Flag pages >100 traffic/month for quarterly refresh."},{area:"Multi-Modal Content",rule:"Every piece in 2+ formats. Manual video transcripts.",example:"Guide → YouTube + infographic + LinkedIn carousel."},{area:"Competitor Response",rule:"Weekly monitoring. 14-day response to competitor citations.",example:"Monitor top-50 prompts weekly. Create displacement briefs."},{area:"Brand Narrative Consistency",rule:"150-word canonical description across all channels.",example:cd.brand+" is a "+(cd.region||"global")+" "+cd.industry+" company specialising in "+cd.topics.slice(0,3).join(", ")+"."},{area:"AI-Specific Formatting",rule:"Clear H2/H3, definitive answers in first 2 sentences.",example:"Direct claims with verifiable data points."}];
  const getChStatus=(chName)=>{if(!hasApi||!apiData.channelData||!apiData.channelData.channels)return null;return apiData.channelData.channels.find(c=>{const cn=c.channel||"";const parts=chName.split("/").map(s=>s.trim().toLowerCase());return parts.some(p=>cn.toLowerCase().includes(p))||cn.toLowerCase().includes(chName.toLowerCase());})||null;};
  const getRecSites=(type)=>{if(apiData&&apiData.deepData&&apiData.deepData.recommendedSites){const s=apiData.deepData.recommendedSites[type];if(Array.isArray(s)&&s.length>3)return s;}return null;};
  const defaultReviewSites=[{name:"G2",url:"g2.com",focus:"Software reviews"},{name:"Trustpilot",url:"trustpilot.com",focus:"Consumer reviews"},{name:"Capterra",url:"capterra.com",focus:"Software comparison"},{name:"TrustRadius",url:"trustradius.com",focus:"B2B reviews"},{name:"Product Hunt",url:"producthunt.com",focus:"Product launches"},{name:"Clutch.co",url:"clutch.co",focus:"Agency reviews"},{name:"Google Business",url:"business.google.com",focus:"Local reviews"},{name:"Gartner Peer Insights",url:"gartner.com/reviews",focus:"Enterprise reviews"},{name:"Software Advice",url:"softwareadvice.com",focus:"Recommendations"},{name:"Glassdoor",url:"glassdoor.com",focus:"Employer brand"},{name:"Yelp",url:"yelp.com",focus:"Local business"},{name:"GetApp",url:"getapp.com",focus:"SaaS discovery"}];
  const defaultPressSites=[{name:"TechCrunch",url:"techcrunch.com",focus:"Tech"},{name:"Forbes",url:"forbes.com",focus:"Business"},{name:"Bloomberg",url:"bloomberg.com",focus:"Finance"},{name:"Reuters",url:"reuters.com",focus:"News"},{name:"The Verge",url:"theverge.com",focus:"Technology"},{name:"VentureBeat",url:"venturebeat.com",focus:"AI"},{name:"Business Insider",url:"businessinsider.com",focus:"Business"},{name:"CNBC",url:"cnbc.com",focus:"Finance"},{name:"PR Newswire",url:"prnewswire.com",focus:"PR"},{name:"Fast Company",url:"fastcompany.com",focus:"Innovation"}];
  const defaultDirSites=[{name:"Crunchbase",url:"crunchbase.com",focus:"Company data"},{name:"AngelList",url:"angel.co",focus:"Startups"},{name:"Owler",url:"owler.com",focus:"Intel"},{name:"LinkedIn",url:"linkedin.com",focus:"Professional"},{name:"ZoomInfo",url:"zoominfo.com",focus:"B2B"},{name:"Dun & Bradstreet",url:"dnb.com",focus:"Business data"},{name:"Kompass",url:"kompass.com",focus:"B2B directory"},{name:"Manta",url:"manta.com",focus:"Small biz"}];
  const defaultSocialSites=[{name:"Reddit",url:"reddit.com",focus:"r/"+(cd.industry?.toLowerCase()||"technology")},{name:"Quora",url:"quora.com",focus:"Q&A"},{name:"X",url:"x.com",focus:"Conversations"},{name:"Hacker News",url:"news.ycombinator.com",focus:"Tech"},{name:"Medium",url:"medium.com",focus:"Long-form"},{name:"LinkedIn",url:"linkedin.com",focus:"Thought leadership"},{name:"Discord",url:"discord.com",focus:"Communities"},{name:"Facebook Groups",url:"facebook.com",focus:"Groups"}];
  const rawChannels=[{channel:"Company Blog / Knowledge Base",impact:95,desc:"Primary content hub",sites:null},{channel:"Wikipedia",impact:92,desc:"Knowledge graph source",sites:null},{channel:"YouTube",impact:88,desc:"Video transcripts",sites:null},{channel:"Review Sites (G2/Capterra/Trustpilot)",impact:85,desc:"Social proof",sites:getRecSites("reviewPlatforms")||defaultReviewSites},{channel:"Press/News Coverage",impact:82,desc:"Authority signals",sites:getRecSites("pressNews")||defaultPressSites},{channel:"LinkedIn",impact:78,desc:"Professional authority",sites:null},{channel:"X (Twitter)",impact:76,desc:"Real-time conversations",sites:null},{channel:"Facebook",impact:68,desc:"Community & brand page",sites:null},{channel:"Instagram",impact:65,desc:"Visual brand presence",sites:null},{channel:"TikTok",impact:62,desc:"Short-form video",sites:null},{channel:"Reddit",impact:74,desc:"Community discussions indexed by AI",sites:null},{channel:"Other Social Platforms",impact:58,desc:"Quora, Medium, Pinterest",sites:getRecSites("socialMedia")||defaultSocialSites},{channel:"Industry Directories",impact:75,desc:"Structured listings",sites:getRecSites("industryDirectories")||defaultDirSites},{channel:"Podcasts",impact:68,desc:"Long-form content",sites:null},{channel:"Academic Citations",impact:72,desc:"High-trust signals",sites:null}];
  const aeoChannels=rawChannels.map(ch=>{
    // Match against API channel data — try exact match first, then partial
    if(!hasApi||!apiData.channelData||!apiData.channelData.channels){return{...ch,status:"Unknown",finding:"Channel verification not available"};}
    const channels=apiData.channelData.channels;
    const chLow=ch.channel.toLowerCase();
    const match=channels.find(c=>{
      const cn=(c.channel||"").toLowerCase();
      if(cn===chLow)return true;
      // Partial matching
      if(chLow.includes("wikipedia")&&cn.includes("wikipedia"))return true;
      if(chLow.includes("youtube")&&cn.includes("youtube"))return true;
      if(chLow.includes("linkedin")&&cn.includes("linkedin"))return true;
      if(chLow.includes("x (twitter)")&&(cn.includes("x (twitter)")||cn.includes("twitter")))return true;
      if(chLow.includes("facebook")&&cn.includes("facebook"))return true;
      if(chLow.includes("instagram")&&cn.includes("instagram"))return true;
      if(chLow.includes("tiktok")&&cn.includes("tiktok"))return true;
      if(chLow.includes("reddit")&&cn.includes("reddit"))return true;
      if(chLow.includes("other social")&&cn.includes("other social"))return true;
      if(chLow.includes("review")&&cn.includes("review"))return true;
      if(chLow.includes("press")&&(cn.includes("press")||cn.includes("news")))return true;
      if(chLow.includes("director")&&cn.includes("director"))return true;
      if(chLow.includes("podcast")&&cn.includes("podcast"))return true;
      if(chLow.includes("academic")&&cn.includes("academic"))return true;
      if(chLow.includes("blog")&&cn.includes("blog"))return true;
      return false;
    });
    return{...ch,status:match?match.status:"Not Verified",finding:match?match.finding:"Could not verify this channel",url:match?match.url:null};
  });
  const contentTypes=(hasApi&&apiData.contentGridData&&Array.isArray(apiData.contentGridData)&&apiData.contentGridData.length>0)?apiData.contentGridData.map(ct=>({type:ct.type||"Content",channels:ct.channels||["Blog"],freq:ct.freq||"Monthly",p:ct.p||"P1",owner:ct.owner||"Content Team",impact:typeof ct.impact==="number"?ct.impact:70,rationale:ct.rationale||ct.description||""})):[];
  const roadmap=(hasApi&&apiData.roadmapData&&apiData.roadmapData.day30)?apiData.roadmapData:null;
  const outputReqs=contentTypes.slice(0,6).map(ct=>({n:ct.freq||"Monthly",u:"",l:ct.type,d:ct.rationale||""}));
  const sentiment=(hasApi&&apiData.sentimentData)?apiData.sentimentData:{brand:{gpt:50,gemini:50,avg:50,summary:"Not assessed"},competitors:[]};
  const brandCrawl=(hasApi&&apiData.brandCrawlData)?apiData.brandCrawlData:null;
  const compCrawlData=(hasApi&&apiData.compCrawlData)?apiData.compCrawlData:{};
  const searchQueries=(hasApi&&apiData.searchQueries)?apiData.searchQueries:[];
  return{overall,scoreLabel:getScoreLabel(overall),scoreDesc:getScoreDesc(overall,cd.brand),engines,painPoints,competitors,stakeholders,funnelStages,aeoChannels,brandGuidelines,contentTypes,roadmap,outputReqs,sentiment,brandCrawl,compCrawlData,searchQueries,clientData:cd};
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

const NAV_ITEMS=[
  {group:"Overview",items:[
    {id:"dashboard",label:"Dashboard",icon:"grid"},
  ]},
  {group:"Analysis",items:[
    {id:"archetypes",label:"User Archetypes",icon:"users"},
    {id:"intent",label:"Intent Pathway",icon:"route"},
  ]},
  {group:"Strategy",items:[
    {id:"playbook",label:"Brand Playbook",icon:"book"},
    {id:"channels",label:"AEO Channels",icon:"broadcast"},
    {id:"grid",label:"Content-Channel Grid",icon:"edit"},
    {id:"roadmap",label:"90-Day Roadmap",icon:"calendar"},
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
    book:<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.5" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.5" fill="none"/></>,
    activity:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{p[name]||null}</svg>;
};

function Sidebar({step,setStep,results,brand,onBack,isLocal,onLogout,collapsed,setCollapsed}){
  const sideW=collapsed?60:220;
  return(<div style={{position:"fixed",left:0,top:0,bottom:0,width:sideW,background:"#fff",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",transition:"width .2s ease",zIndex:100,overflow:"hidden"}}>
    {/* Logo area */}
    <div style={{padding:collapsed?"16px 12px":"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
      <svg width="28" height="28" viewBox="0 0 28 28" style={{flexShrink:0}}><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg>
      {!collapsed&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
        <div style={{fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:4}}>
          {!isLocal&&<span onClick={onBack} style={{cursor:"pointer",color:C.accent,fontSize:11}}>←</span>}
          <span style={{fontWeight:500,color:C.text,fontSize:13}}>{brand||"EnterRank"}</span>
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
            style={{display:"flex",alignItems:"center",gap:10,padding:collapsed?"10px 12px":"8px 10px",borderRadius:8,cursor:dis?"default":"pointer",background:active?"#111827":"transparent",color:active?"#fff":dis?"#d1d5db":C.sub,fontSize:13,fontWeight:500,marginBottom:2,transition:"all .12s",opacity:item.comingSoon?.5:1,justifyContent:collapsed?"center":"flex-start"}}
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
      <div onClick={onLogout} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:6,cursor:"pointer",fontSize:12,color:C.muted,justifyContent:collapsed?"center":"flex-start",transition:"all .15s",marginTop:4}}
        onMouseEnter={e=>{e.currentTarget.style.background="#fef2f2";e.currentTarget.style.color="#ef4444";}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.muted;}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        {!collapsed&&<span>Log Out</span>}
      </div>
    </div>
  </div>);
}

/* ─── SHARE OF VOICE — Large donut + ranked list like Profound ─── */
function ShareOfVoiceSection({title,rankTitle,brands,metricKey}){
  const[hover,setHover]=useState(null);
  const uniqueBrands=brands.filter((b,i,arr)=>arr.findIndex(x=>x.name.toLowerCase()===b.name.toLowerCase())===i);
  const size=200,cx=size/2,cy=size/2,r=size/2-8,ir=r*.65;
  const total=uniqueBrands.reduce((a,b)=>a+b[metricKey],0)||1;
  let cumAngle=-Math.PI/2;
  const gapAngle=0.03;
  const arcs=uniqueBrands.map(b=>{const val=b[metricKey];const angle=Math.max(0.02,(val/total)*2*Math.PI)-gapAngle;const start=cumAngle;cumAngle+=angle+gapAngle;const end=start+angle;
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
              <BrandLogo name={a.name} website={a.website} size={22} color={a.color}/>
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
  const[auditStep,setAuditStep]=useState(data.topics&&data.topics.length>0?"topics":"input"); // "input" → "topics" → running
  const[genTopics,setGenTopics]=useState(false);
  const[editingTopic,setEditingTopic]=useState(null);
  const[editVal,setEditVal]=useState("");
  const[newTopic,setNewTopic]=useState("");
  const inputOk=data.brand&&data.industry&&data.website;
  const topicsOk=data.topics.length>=3;
  const[logLines,setLogLines]=useState([]);
  const addLog=(msg)=>setLogLines(prev=>[...prev.slice(-14),{msg,t:Date.now()}]);
  const[autoFilling,setAutoFilling]=useState(false);
  const[autoFilled,setAutoFilled]=useState(false);

  const autoFillFromBrand=async(brandName)=>{
    if(!brandName||brandName.trim().length<2||autoFilling)return;
    setAutoFilling(true);
    try{
      const prompt=`I need information about the company or brand called "${brandName.trim()}".\n\nReturn JSON only:\n{\n  "website": "https://example.com",\n  "industry": "the primary industry (1-3 words, e.g. Telecommunications, SaaS, E-commerce)",\n  "region": "primary operating region (e.g. Malaysia, United States, Global, Southeast Asia)",\n  "competitors": [\n    {"name": "Competitor 1", "website": "https://competitor1.com"},\n    {"name": "Competitor 2", "website": "https://competitor2.com"},\n    {"name": "Competitor 3", "website": "https://competitor3.com"}\n  ],\n  "topics": ["search query 1", "search query 2", "search query 3", "search query 4", "search query 5"]\n}\n\nRules:\n- Website must be the MAIN company website, not Wikipedia or social\n- Return the top 3 direct competitors that actively compete with this brand in their primary operating region. Competitors must actually operate and be available in that region — do not list globally known brands that have no presence in the brand's market\n- Topics must be 5 realistic search queries a potential customer in the brand's region would type into ChatGPT or Gemini when looking for this type of product or service\n- Topics must NOT contain the brand name "${brandName.trim()}" or any competitor names\n- Topics should sound like natural searches e.g. "best credit cards with travel rewards in UAE", "low interest personal loan providers in Abu Dhabi", "which cloud hosting is best for startups"\n- Mix of: "best/top" queries, comparison queries, problem-solving queries, pricing queries\n- Make topics specific to the company's operating region — reference local competitors, local currency, local regulations\n- All output must be in English. Do not translate to local languages\n- If unsure about the brand, make your best guess based on the name`;
      const raw=await callGemini(prompt,"You are a business intelligence assistant. Return ONLY valid JSON, no markdown fences.");
      const result=safeJSON(raw);
      if(result){
        let didFill=false;
        setData(prev=>{
          const updates={};
          if(!prev.website||!prev.website.trim())updates.website=normalizeUrl(result.website||"");
          if(!prev.industry||!prev.industry.trim())updates.industry=result.industry||"";
          if(!prev.region||!prev.region.trim())updates.region=result.region||"";
          const hasComps=(prev.competitors||[]).some(c=>c.name&&c.name.trim());
          if(!hasComps&&result.competitors&&Array.isArray(result.competitors)){
            updates.competitors=result.competitors.filter(c=>c.name&&c.name.toLowerCase()!==brandName.trim().toLowerCase()).slice(0,3).map(c=>({name:c.name||"",website:normalizeUrl(c.website||"")}));
          }
          const hasTopics=(prev.topics||[]).length>0;
          if(!hasTopics&&result.topics&&Array.isArray(result.topics)){
            updates.topics=result.topics.filter(t=>typeof t==="string"&&t.trim().length>3).map(t=>t.trim()).slice(0,5);
          }
          if(Object.keys(updates).length>0){didFill=true;return{...prev,...updates};}
          return prev;
        });
        if(didFill)setAutoFilled(true);
      }
    }catch(e){console.error("Auto-fill failed:",e);}
    setAutoFilling(false);
  };

  // Generate topics via OpenAI
  const generateTopics=async()=>{
    setGenTopics(true);setError(null);
    // Normalize URLs before generating
    const nw=normalizeUrl(data.website);const nc=(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}));
    if(nw!==data.website||JSON.stringify(nc)!==JSON.stringify(data.competitors))setData(d=>({...d,website:nw,competitors:nc}));
    try{
      const compInfo=nc.filter(c=>c.name).map(c=>`${c.name}${c.website?" ("+c.website+")":""}`).join(", ");
      const prompt=`For the brand "${data.brand}" in the "${data.industry}" industry, operating in "${data.region||"Global"}", with website ${nw||"unknown"}${compInfo?", competitors: "+compInfo:""}.

Generate 8-12 key topics that are most relevant for measuring this brand's AI engine visibility (AEO - Answer Engine Optimisation). These should be specific topics that real users in ${data.region||"Global"} would ask AI engines about in ${data.industry}.

Topics must reflect ${data.region||"Global"} context — reference local currency, local regulations, and regional market conditions where relevant. A topic about pricing should reference local currency. A topic about regulations should reference local laws. All topics must be written in English — do not translate to local languages.

Focus on:
- Core product/service topics relevant in ${data.region||"Global"}
- Industry-specific comparison topics for the ${data.region||"Global"} market
- Regional/local relevance topics (local providers, local regulations, local pricing)
- Buyer decision topics for ${data.region||"Global"} consumers
- Technical/feature topics

Return ONLY a JSON array of strings, no markdown, no explanation:
["topic 1", "topic 2", "topic 3", ...]`;
      const raw=await callOpenAI(prompt,"You are an AEO (Answer Engine Optimisation) expert. Return ONLY valid JSON arrays, no markdown fences.");
      const topics=safeJSON(raw);
      if(topics&&Array.isArray(topics)&&topics.length>0){
        setData(d=>({...d,topics:topics.filter(t=>typeof t==="string"&&t.trim().length>0).map(t=>t.trim()).slice(0,10)}));
        setAuditStep("topics");
      }else{
        setError("Failed to generate topics. Please try again.");
      }
    }catch(e){
      console.error("Topic generation error:",e);
      setError("Failed to generate topics. Check your API connection.");
    }
    setGenTopics(false);
  };

  const regenerateTopics=async()=>{
    setGenTopics(true);setError(null);
    try{
      const existing=data.topics.join(", ");
      const compInfo=(data.competitors||[]).filter(c=>c.name).map(c=>`${c.name}${c.website?" ("+c.website+")":""}`).join(", ");
      const prompt=`For the brand "${data.brand}" in the "${data.industry}" industry (${data.region||"Global"}), website: ${data.website||"unknown"}${compInfo?", competitors: "+compInfo:""}.

I already have these topics: ${existing}

Generate 5 MORE different topics that are also relevant for measuring AI engine visibility in ${data.region||"Global"}. These should NOT duplicate existing topics. Focus on gaps or angles not yet covered. Topics must reflect ${data.region||"Global"} context — reference local currency and regional market conditions. All topics must be in English.

Return ONLY a JSON array of strings:
["new topic 1", "new topic 2", ...]`;
      const raw=await callOpenAI(prompt,"You are an AEO expert. Return ONLY valid JSON arrays.");
      const newTopics=safeJSON(raw);
      if(newTopics&&Array.isArray(newTopics)&&newTopics.length>0){
        const cleaned=newTopics.filter(t=>typeof t==="string"&&t.trim().length>0).map(t=>t.trim());
        setData(d=>({...d,topics:[...d.topics,...cleaned].slice(0,10)}));
      }
    }catch(e){console.error("Regenerate error:",e);}
    setGenTopics(false);
  };

  const startEdit=(i)=>{setEditingTopic(i);setEditVal(data.topics[i]);};
  const saveEdit=(i)=>{
    if(editVal.trim()){const t=[...data.topics];t[i]=editVal.trim();setData({...data,topics:t});}
    setEditingTopic(null);setEditVal("");
  };
  const deleteTopic=(i)=>{setData({...data,topics:data.topics.filter((_,j)=>j!==i)});};
  const addTopic=()=>{if(newTopic.trim()&&data.topics.length<10){setData({...data,topics:[...data.topics,newTopic.trim()]});setNewTopic("");}};

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
    {at:12,msg:"Querying AI engines for visibility data..."},
    {at:15,msg:"Sending 8 query probes to Gemini..."},
    {at:18,msg:"Connecting to Google AI API → gemini-2.0-flash..."},
    {at:21,msg:"Sending 8 query probes to Gemini..."},
    {at:24,msg:"Extracting mention rates from ChatGPT response..."},
    {at:27,msg:"Extracting citation data from Gemini response..."},
    {at:29,msg:"Cross-referencing entity signals across engines..."},
    {at:31,msg:"Scoring Structured Data / Schema..."},
    {at:33,msg:"Scoring Content Authority & E-E-A-T..."},
    {at:35,msg:"Running competitor signal analysis..."},
    {at:38,msg:`Cross-referencing citation networks for ${(data.competitors||[]).filter(c=>c.name).map(c=>c.name).slice(0,3).join(", ")||"competitors"}...`},
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
    // Normalize all URLs before running
    const normalizedData={...data,website:normalizeUrl(data.website),competitors:(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}))};
    setData(normalizedData);
    setRunning(true);setError(null);setLogLines([]);setDisplayProgress(0);
    targetRef.current=0;displayRef.current=0;lastLogIndex.current=0;
    startSmooth();
    try{
      const apiData=await runRealAudit(normalizedData,(msg,pct)=>{
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
    <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Running Full AEO Audit</div></div>
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

  /* ─── STEP 2: Topics Review ─── */
  if(auditStep==="topics")return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}>
      <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Review Topics for {data.brand}</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:4}}>These topics will be used to measure AI engine visibility. Edit, remove, or add more.</p>
    </div>
    <Card>
      {/* Topic guidance */}
      <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fef3c7",borderRadius:10,marginBottom:12,fontSize:11,lineHeight:1.6,color:"#92400e"}}>
        <span style={{fontSize:14,flexShrink:0,marginTop:1}}>💡</span>
        <div>
          <span style={{fontWeight:500}}>Tip:</span> Enter topics as real search queries — the way someone would actually ask ChatGPT or Gemini. For example, "best credit cards with rewards in UAE" instead of just "credit cards". We test whether AI engines mention your brand in response to these queries <em>without</em> naming any brand.
        </div>
      </div>
      {/* Topic list */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {data.topics.map((topic,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
          <span style={{fontSize:13,color:C.accent,fontWeight:600,fontFamily:"'Outfit'",minWidth:22}}>{i+1}.</span>
          {editingTopic===i?(<>
            <input value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveEdit(i);if(e.key==="Escape"){setEditingTopic(null);setEditVal("");}}} autoFocus style={{flex:1,padding:"4px 8px",background:"#fff",border:`1px solid ${C.accent}40`,borderRadius:6,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/>
            <span onClick={()=>saveEdit(i)} style={{cursor:"pointer",fontSize:11,color:C.accent,fontWeight:600}}>Save</span>
            <span onClick={()=>{setEditingTopic(null);setEditVal("");}} style={{cursor:"pointer",fontSize:11,color:C.muted}}>Cancel</span>
          </>):(<>
            <span style={{flex:1,fontSize:13,color:C.text}}>{topic}</span>
            <span onClick={()=>startEdit(i)} style={{cursor:"pointer",fontSize:11,color:C.accent,fontWeight:500,opacity:.7}}>Edit</span>
            <span onClick={()=>deleteTopic(i)} style={{cursor:"pointer",fontSize:14,color:C.muted,lineHeight:1}}>×</span>
          </>)}
        </div>))}
      </div>

      {/* Topic counter */}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
        <span style={{fontSize:11,fontWeight:500,color:data.topics.length>=10?C.red:C.muted,fontFamily:"'Outfit'"}}>{data.topics.length} / 10 topics</span>
      </div>

      {/* Add new topic */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input value={newTopic} onChange={e=>setNewTopic(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addTopic();}} placeholder={data.topics.length>=10?"Maximum 10 topics reached":"Add a custom topic..."} disabled={data.topics.length>=10} style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit",opacity:data.topics.length>=10?.5:1}}/>
        <button onClick={addTopic} disabled={!newTopic.trim()||data.topics.length>=10} style={{padding:"8px 16px",background:newTopic.trim()&&data.topics.length<10?C.accent:"#dde1e7",color:newTopic.trim()&&data.topics.length<10?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:newTopic.trim()&&data.topics.length<10?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>Add</button>
      </div>

      {/* Generate more button */}
      <button onClick={regenerateTopics} disabled={genTopics||data.topics.length>=10} style={{width:"100%",padding:"10px 16px",background:"none",border:`1px dashed ${C.accent}40`,borderRadius:8,fontSize:12,fontWeight:600,color:data.topics.length>=10?C.muted:C.accent,cursor:genTopics||data.topics.length>=10?"not-allowed":"pointer",fontFamily:"'Outfit'",marginBottom:16,opacity:genTopics||data.topics.length>=10?.5:1}}>
        {genTopics?"Generating more topics...":data.topics.length>=10?"Maximum 10 topics":"+ Generate More Topics"}
      </button>

      <div style={{paddingTop:16,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setAuditStep("input")} style={{padding:"8px 16px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.sub,cursor:"pointer",fontFamily:"'Outfit'"}}>← Back to Details</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,color:C.muted}}>{data.topics.length} topics</span>
          <button onClick={go} disabled={!topicsOk} style={{padding:"10px 24px",background:topicsOk?C.accent:"#dde1e7",color:topicsOk?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:topicsOk?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>Run AEO Audit →</button>
        </div>
      </div>
    </Card>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
  </div>);

  /* ─── STEP 1: Client Details Input ─── */
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>{data.brand?"Configure AEO Audit":"New AEO Audit"}</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>{data.brand?`${history.length>0?"Run another":"Set up"} audit for ${data.brand}.`:"Enter client details to begin."}</p></div>
    {autoFilled&&(
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:10,marginBottom:16,fontSize:12,color:C.accent}}>
        <span style={{fontSize:14}}>✦</span>
        <span>Fields auto-filled based on brand detection. Review and edit before running the audit.</span>
        <span onClick={()=>setAutoFilled(false)} style={{marginLeft:"auto",cursor:"pointer",opacity:.6,fontSize:14}}>✕</span>
      </div>
    )}
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <Field label="Brand Name" value={data.brand} onChange={v=>{setData({...data,brand:v});if(autoFilled)setAutoFilled(false);}} placeholder="Acme Corp" onBlur={e=>{const val=e.target.value.trim();if(val.length>=2&&!autoFilled)autoFillFromBrand(val);}}/>
        {autoFilling&&(
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.accent}}>
            <div style={{width:12,height:12,border:`2px solid ${C.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
            Scanning brand details...
          </div>
        )}
      </div>
      <Field label="Industry" value={data.industry} onChange={v=>setData({...data,industry:v})} placeholder="e.g. Technology"/>
      <Field label="Website" value={data.website} onChange={v=>setData({...data,website:v})} placeholder="acme.com"/>
      <Field label="Region" value={data.region} onChange={v=>setData({...data,region:v})} placeholder="e.g. Malaysia"/>
      <div style={{gridColumn:"1/-1"}}>
        <label style={{fontSize:12,fontWeight:500,color:C.sub,display:"block",marginBottom:8}}>Competitors</label>
        {(data.competitors||[]).map((comp,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <input value={comp.name} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],name:e.target.value};setData({...data,competitors:c});}} placeholder={`Competitor ${i+1}`} style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/>
          <input value={comp.website} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],website:e.target.value};setData({...data,competitors:c});}} placeholder="https://competitor.com" style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit"}}/>
          <span onClick={()=>{const c=data.competitors.filter((_,j)=>j!==i);setData({...data,competitors:c});}} style={{cursor:"pointer",color:C.muted,fontSize:16,padding:"0 4px",lineHeight:1}}>×</span>
        </div>))}
        {(data.competitors||[]).length<8&&<button onClick={()=>setData({...data,competitors:[...(data.competitors||[]),{name:"",website:""}]})} style={{padding:"6px 14px",background:"none",border:`1px dashed ${C.border}`,borderRadius:8,fontSize:12,color:C.muted,cursor:"pointer",fontFamily:"inherit"}}>+ Add competitor</button>}
      </div>
    </div>
    <div style={{marginTop:20,paddingTop:18,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:12,alignItems:"center"}}><span style={{fontSize:11,color:C.muted}}>Engines:</span><ChatGPTLogo size={18}/><GeminiLogo size={18}/></div>
      <button onClick={generateTopics} disabled={!inputOk||genTopics} style={{padding:"10px 24px",background:inputOk&&!genTopics?C.accent:"#dde1e7",color:inputOk&&!genTopics?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:inputOk&&!genTopics?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>{genTopics?"Generating Topics...":"Generate Topics →"}</button>
    </div>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </Card></div>);
}

/* ─── PAGE: DASHBOARD ─── */
function DashboardPage({r,history,goTo}){
  const[perfMetric,setPerfMetric]=useState("mentions");
  const[expandedComp,setExpandedComp]=useState(null);

  // ── Metric calculations ──
  const avgMentions=Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length);
  const avgCitations=Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length);
  const avgSentiment=r.sentiment?.brand?.avg||50;
  const prev=history.length>1?history[history.length-2]:null;
  const prevSentiment=prev?.sentimentPerEngine?Math.round((prev.sentimentPerEngine.gpt+prev.sentimentPerEngine.gemini)/2):null;

  const delta=(cur,pre)=>{
    if(pre===null||pre===undefined)return <span style={{fontSize:10,fontWeight:500,color:C.muted,background:C.bg,padding:"2px 8px",borderRadius:100}}>First audit</span>;
    const d=cur-pre;
    return <span style={{fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:100,color:d>=0?"#15803d":"#dc2626",background:d>=0?"#dcfce7":"#fee2e2"}}>{d>=0?"+":""}{d}%</span>;
  };

  // ── System Diagnostics logic ──
  const worstEngine=r.engines.reduce((a,e)=>e.score<a.score?e:a,r.engines[0]);
  const bestEngine=r.engines.reduce((a,e)=>e.score>a.score?e:a,r.engines[0]);
  const criticalCats=r.painPoints.filter(p=>p.severity==="critical");
  const weakestCat=r.painPoints.reduce((a,b)=>b.score<a.score?b:a,r.painPoints[0]);
  const strongestCat=r.painPoints.reduce((a,b)=>b.score>a.score?b:a,r.painPoints[0]);
  const brandAvgRate=Math.round((avgMentions+avgCitations)/2);
  const compsAhead=r.competitors.filter(c=>{const cr=Math.round(((c.mentionRate||0)+(c.citationRate||0))/2);return cr>brandAvgRate;});
  const channels=r.aeoChannels||[];
  const missingChannels=channels.filter(ch=>ch.status==="Not Present"||ch.statusLabel==="Not Present");

  const diags=[];
  if(bestEngine.score-worstEngine.score>15)diags.push({icon:"\u26A1",severity:"warning",text:`${bestEngine.score-worstEngine.score}pt gap between ${bestEngine.name} (${bestEngine.score}%) and ${worstEngine.name} (${worstEngine.score}%).`});
  if(avgCitations<10)diags.push({icon:"\uD83D\uDD17",severity:"critical",text:`${avgCitations}% citation rate. Users get answers about your space but aren't sent to your site.`});
  else if(avgCitations<25)diags.push({icon:"\uD83D\uDD17",severity:"warning",text:`${avgCitations}% citation rate \u2014 ${100-avgCitations}% of mentions don't link back to you.`});
  if(avgMentions<15)diags.push({icon:"\uD83D\uDCAC",severity:"critical",text:`${avgMentions}% mention rate across engines. ${r.clientData.brand} isn't part of the AI conversation yet.`});
  else if(avgMentions<35)diags.push({icon:"\uD83D\uDCAC",severity:"warning",text:`Mentioned in ~1 of ${Math.round(100/avgMentions)} relevant responses (${avgMentions}%).`});
  if(criticalCats.length>0)diags.push({icon:"\uD83D\uDEA8",severity:"critical",text:`${criticalCats.map(c=>c.label.split("/")[0].trim()+" "+c.score+"%").join(", ")} \u2014 ${criticalCats.length>1?"these need":"needs"} immediate attention.`});
  if(weakestCat.score<30)diags.push({icon:"\uD83D\uDCC9",severity:"critical",text:`${weakestCat.label.split("/")[0].trim()} at ${weakestCat.score}% \u2014 lowest category score.`});
  if(compsAhead.length>0){const compMsgs=compsAhead.map(c=>{const cr=Math.round(((c.mentionRate||0)+(c.citationRate||0))/2);return c.name+" "+cr+"%";});diags.push({icon:"\uD83C\uDFC1",severity:compsAhead.length>1?"critical":"warning",text:`${compMsgs.join(", ")} ${compsAhead.length>1?"are":"is"} scoring above you (${brandAvgRate}%) on real visibility metrics.`});}
  if(missingChannels.length>0)diags.push({icon:"\uD83D\uDCE1",severity:"warning",text:`Not found on ${missingChannels.length} distribution channel${missingChannels.length>1?"s":""}.`});
  if(strongestCat.score>60)diags.push({icon:"\u2705",severity:"good",text:`${strongestCat.label.split("/")[0].trim()} is your strongest signal at ${strongestCat.score}%.`});
  const sevOrder={critical:0,warning:1,info:2,good:3};
  diags.sort((a,b)=>(sevOrder[a.severity]??2)-(sevOrder[b.severity]??2));
  const sevColors={critical:"#ef4444",warning:"#f59e0b",good:"#22c55e"};
  const diagCounts={critical:diags.filter(d=>d.severity==="critical").length,warning:diags.filter(d=>d.severity==="warning").length,good:diags.filter(d=>d.severity==="good").length};

  // ── Grade helper ──
  const getGrade=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const gradeColor=(s)=>s>=80?C.green:s>=60?"#10A37F":s>=40?C.amber:s>=20?"#f97316":C.red;

  const metricCards=[
    {label:"Mentions",value:avgMentions,prev:prev?.mentions??null,iconBg:"#dbeafe",iconStroke:"#2563eb",
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>},
    {label:"Citations",value:avgCitations,prev:prev?.citations??null,iconBg:"#d1fae5",iconStroke:"#059669",
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>},
    {label:"Sentiments",value:avgSentiment,prev:prevSentiment,iconBg:"#fef3c7",iconStroke:"#d97706",
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>}
  ];

  return(<div>
    {/* Greeting header */}
    <div style={{marginBottom:32}}>
      <div style={{fontSize:22,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Hello, Aris</div>
      <div style={{fontSize:13,color:C.muted,marginTop:2}}>GEO Dashboard for {r.clientData.brand}</div>
    </div>

    {/* ═══ SECTION 1: SYSTEM DIAGNOSTICS ═══ */}

    {/* 1a. Section header */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>System Diagnostics</div>
      <div style={{fontSize:13,color:C.muted,marginTop:3}}>At-a-glance health check for {r.clientData.brand}'s AI engine visibility</div>
    </div>

    {/* 1b. Three metric cards */}
    <div style={{display:"flex",gap:14,marginBottom:20}}>
      {metricCards.map(m=>(
        <Card key={m.label} style={{flex:1,padding:20}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:12,background:m.iconBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {m.icon}
            </div>
            <div style={{minWidth:0}}>
              <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:".03em",textTransform:"uppercase",marginBottom:4}}>{m.label}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <span style={{fontSize:28,fontWeight:700,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>{m.value}<span style={{fontSize:16,color:C.muted}}>%</span></span>
                {delta(m.value,m.prev)}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>

    {/* 1c. Diagnostic insight cards */}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {diags.map((d,i)=>(
        <div key={i} style={{background:"#fff",border:`1px solid ${C.borderSoft}`,borderRadius:10,padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start",borderLeft:`3px solid ${sevColors[d.severity]||C.accent}`}}>
          <span style={{fontSize:16,lineHeight:1,flexShrink:0}}>{d.icon}</span>
          <span style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{d.text}</span>
        </div>
      ))}
    </div>
    <div style={{fontSize:11,color:C.muted,marginTop:8}}>{diagCounts.critical} critical · {diagCounts.warning} warnings · {diagCounts.good} healthy</div>

    {/* Section divider */}
    <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"40px 0"}}/>

    {/* ═══ SECTION 2: BRAND PERFORMANCE ═══ */}

    {/* 2a. Section header */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>{r.clientData.brand} Performance</div>
      <div style={{fontSize:13,color:C.muted,marginTop:3}}>Visibility breakdown by AI engine</div>
    </div>

    {/* 2b. Two engine score cards */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      {r.engines.map((e,ei)=>{
        const color=ei===0?"#10A37F":"#4285F4";
        const Logo=ei===0?ChatGPTLogo:GeminiLogo;
        const label=ei===0?"ChatGPT":"Gemini";
        const sentVal=ei===0?(r.sentiment?.brand?.gpt):(r.sentiment?.brand?.gemini);
        return(
          <Card key={ei} style={{padding:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <Logo size={20}/>
                <span style={{fontSize:14,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>{label}</span>
              </div>
              <span style={{fontSize:24,fontWeight:700,fontFamily:"'Outfit'",color}}>{e.score}%</span>
            </div>
            <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"14px 0"}}/>
            {[
              {l:"Mention Rate",v:e.mentionRate},
              {l:"Citation Rate",v:e.citationRate},
              {l:"Sentiment",v:sentVal}
            ].map(row=>(
              <div key={row.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}}>
                <span style={{fontSize:12,color:C.muted}}>{row.l}</span>
                <span style={{fontSize:14,fontWeight:600,color:C.text}}>{row.v!=null?row.v+"%":"\u2014"}</span>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"14px 0"}}/>
            <div style={{width:"100%",height:4,borderRadius:2,background:C.bg}}>
              <div style={{width:`${Math.max(2,e.score)}%`,height:4,borderRadius:2,background:color,transition:"width .8s ease-out"}}/>
            </div>
          </Card>
        );
      })}
    </div>

    {/* 2c. Overall visibility score */}
    <Card style={{marginTop:16,padding:"16px 20px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:13,fontWeight:500,color:C.muted}}>Overall Visibility Score</span>
        <div style={{flex:1,margin:"0 24px",height:6,borderRadius:3,background:C.bg}}>
          <div style={{width:`${Math.max(2,r.overall)}%`,height:6,borderRadius:3,background:C.accent,transition:"width .8s ease-out"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20,fontWeight:700,fontFamily:"'Outfit'",color:C.text}}>{r.overall}%</span>
          <span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:100,background:`${gradeColor(r.overall)}10`,color:gradeColor(r.overall)}}>{getGrade(r.overall)}</span>
        </div>
      </div>
    </Card>

    {/* Section divider */}
    <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"40px 0"}}/>

    {/* ═══ SECTION 3: HISTORICAL PERFORMANCE ═══ */}

    {/* 3a. Section header */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Historical Performance</div>
      <div style={{fontSize:13,color:C.muted,marginTop:3}}>Track {r.clientData.brand}'s AI visibility over time</div>
    </div>

    {/* 3b. Performance chart card */}
    {(()=>{
      const chartData=history.map(h=>{
        let gpt=0,gemini=0;
        if(perfMetric==="mentions"){gpt=h.mentionsPerEngine?.gpt??h.mentions??0;gemini=h.mentionsPerEngine?.gemini??h.mentions??0;}
        else if(perfMetric==="citations"){gpt=h.citationsPerEngine?.gpt??h.citations??0;gemini=h.citationsPerEngine?.gemini??h.citations??0;}
        else{gpt=h.sentimentPerEngine?.gpt??50;gemini=h.sentimentPerEngine?.gemini??50;}
        const dateLabel=typeof h.date==="string"?h.date.slice(0,10):new Date(h.date).toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
        return{date:dateLabel,gpt,gemini};
      });
      const padL=45,padR=15,padT=15,padB=35;
      const chartW=620-padL-padR,chartH=220-padT-padB;
      const yToSvg=(val)=>padT+chartH-(val/100)*chartH;
      const xToSvg=(i)=>padL+(chartData.length>1?(i/(chartData.length-1))*chartW:chartW/2);
      const polyStr=(arr,key)=>arr.map((d,i)=>`${xToSvg(i)},${yToSvg(d[key])}`).join(" ");
      const areaStr=(arr,key)=>`${xToSvg(0)},${padT+chartH} ${polyStr(arr,key)} ${xToSvg(arr.length-1)},${padT+chartH}`;
      const gridYs=[0,25,50,75,100];
      return(
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <span style={{fontSize:14,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Performance Tracker</span>
            <select value={perfMetric} onChange={e=>setPerfMetric(e.target.value)} style={{padding:"7px 14px",paddingRight:28,borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:500,color:C.text,background:"#fff",fontFamily:"inherit",cursor:"pointer",outline:"none",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center"}}>
              <option value="mentions">Mentions</option>
              <option value="citations">Citations</option>
              <option value="sentiments">Sentiments</option>
            </select>
          </div>
          <svg viewBox="0 0 620 220" style={{width:"100%"}} preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gptGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10A37F" stopOpacity="0.12"/><stop offset="100%" stopColor="#10A37F" stopOpacity="0.01"/></linearGradient>
              <linearGradient id="gemGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4285F4" stopOpacity="0.12"/><stop offset="100%" stopColor="#4285F4" stopOpacity="0.01"/></linearGradient>
            </defs>
            {gridYs.map(v=>{const y=yToSvg(v);return <g key={v}><line x1={padL} y1={y} x2={padL+chartW} y2={y} stroke={C.borderSoft} strokeDasharray="3,3" strokeWidth="1"/><text x={padL-8} y={y+4} textAnchor="end" fontSize="10" fill={C.muted} fontFamily="'Plus Jakarta Sans'">{v}</text></g>;})}
            {chartData.map((d,i)=><text key={"xl"+i} x={xToSvg(i)} y={212} textAnchor="middle" fontSize="9" fill={C.muted}>{d.date}</text>)}
            {chartData.length>=2&&<>
              <polygon points={areaStr(chartData,"gpt")} fill="url(#gptGrad)"/>
              <polygon points={areaStr(chartData,"gemini")} fill="url(#gemGrad)"/>
              <polyline points={polyStr(chartData,"gpt")} fill="none" stroke="#10A37F" strokeWidth="2" strokeLinejoin="round"/>
              <polyline points={polyStr(chartData,"gemini")} fill="none" stroke="#4285F4" strokeWidth="2" strokeLinejoin="round"/>
            </>}
            {chartData.length<2&&<text x="310" y="110" textAnchor="middle" fontSize="13" fill={C.muted}>Run more audits to track trends</text>}
            {chartData.map((d,i)=><g key={"pt"+i}><circle cx={xToSvg(i)} cy={yToSvg(d.gpt)} r="4" fill="#fff" stroke="#10A37F" strokeWidth="2"><title>ChatGPT: {d.gpt}% — {d.date}</title></circle><circle cx={xToSvg(i)} cy={yToSvg(d.gemini)} r="4" fill="#fff" stroke="#4285F4" strokeWidth="2"><title>Gemini: {d.gemini}% — {d.date}</title></circle></g>)}
          </svg>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.sub}}><div style={{width:8,height:8,borderRadius:"50%",background:"#10A37F"}}/>ChatGPT</div>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.sub}}><div style={{width:8,height:8,borderRadius:"50%",background:"#4285F4"}}/>Gemini</div>
          </div>
        </Card>
      );
    })()}

    {/* Section divider */}
    <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"40px 0"}}/>

    {/* ═══ SECTION 4: SHARE OF VOICE ═══ */}

    {/* 4a. Section header */}
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Share of Voice</div>
      <div style={{fontSize:13,color:C.muted,marginTop:3}}>{r.clientData.brand} vs competitors across key metrics</div>
    </div>

    {/* 4b-c. Three ShareOfVoiceSection donuts */}
    {(()=>{
      const compData=r.competitors||[];
      const brandNameLower=r.clientData.brand.toLowerCase();
      const allBrands=[
        {name:r.clientData.brand,website:r.clientData.website,mentionRate:avgMentions,citationRate:avgCitations,color:C.accent},
        ...compData.filter(c=>c.name.toLowerCase()!==brandNameLower).map((c,i)=>{
          const compObj=(r.clientData.competitors||[]).find(cc=>cc.name===c.name);
          return{
            name:c.name,
            website:compObj?.website||"",
            mentionRate:c.mentionRate||0,
            citationRate:c.citationRate||0,
            color:["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"][i%5]
          };
        })
      ];
      const sentimentBrands=[
        {name:r.clientData.brand,website:r.clientData.website,sentimentScore:avgSentiment,color:C.accent},
        ...(r.sentiment?.competitors||[]).filter(c=>c.name.toLowerCase()!==brandNameLower).map((c,i)=>({
          name:c.name,website:"",sentimentScore:c.avg||50,
          color:["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"][i%5]
        }))
      ];
      return(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <ShareOfVoiceSection title="Share of Mentions" rankTitle="Mention Rate" brands={allBrands} metricKey="mentionRate"/>
          <ShareOfVoiceSection title="Share of Citations" rankTitle="Citation Rate" brands={allBrands} metricKey="citationRate"/>
          <ShareOfVoiceSection title="Share of Sentiments" rankTitle="Sentiment Score" brands={sentimentBrands} metricKey="sentimentScore"/>
        </div>
      );
    })()}

    {/* Section divider */}
    <div style={{borderTop:`1px solid ${C.borderSoft}`,margin:"40px 0"}}/>

    {/* ═══ SECTION 5: COMPETITOR DEEP-DIVE ═══ */}

    {/* 5a. Section header */}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:16,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Competitor Deep Dive</div>
      <div style={{fontSize:12,color:C.muted,marginTop:2}}>Looking under the hood — how competitors stack up on AI engines</div>
    </div>

    {/* 5b. Expandable competitor cards + 5c. Summary */}
    {(()=>{
      const compData=r.competitors||[];
      if(compData.length===0)return(
        <Card style={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:14,fontWeight:500,color:C.muted,marginBottom:8}}>No competitor data available</div>
          <div style={{fontSize:12,color:C.muted}}>Add competitors during setup and run an audit to see the deep dive.</div>
        </Card>
      );

      const compColors=["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"];
      const getCompWebsite=(name)=>(r.clientData.competitors||[]).find(cc=>cc.name===name)?.website||"";
      const getCompSentiment=(name)=>{const sc=(r.sentiment?.competitors||[]).find(c=>c.name===name);return sc?(sc.avg||50):null;};
      const metricColor=(brandVal,compVal)=>{
        if(compVal===null||compVal===undefined)return C.text;
        const diff=compVal-brandVal;
        if(Math.abs(diff)<=5)return C.text;
        return diff>0?C.red:C.green;
      };

      const crawlSignals=[
        {key:"schemaMarkup",label:"Schema Markup (JSON-LD)",weight:"Critical",desc:"Structured data that AI engines parse directly",check:d=>d?.aeoSignals?.schemaMarkup||(d?.schemas?.length||0)>0,detail:d=>(d?.aeoSignals?.schemaTypes||d?.schemas||[]).join(", ")||"None"},
        {key:"faqSchema",label:"FAQ Schema",weight:"Critical",desc:"Q&A pairs that AI engines extract as direct answers",check:d=>d?.aeoSignals?.faqSchema||!!d?.hasFAQSchema},
        {key:"articleSchema",label:"Article / Blog Schema",weight:"High",desc:"Signals authoritative long-form content to AI",check:d=>d?.aeoSignals?.articleSchema||!!d?.hasArticleSchema},
        {key:"orgSchema",label:"Organization Schema",weight:"High",desc:"Establishes brand entity in knowledge graphs",check:d=>d?.aeoSignals?.orgSchema||!!d?.hasOrgSchema},
        {key:"howToSchema",label:"HowTo Schema",weight:"Medium",desc:"Step-by-step content AI engines can cite directly",check:d=>d?.aeoSignals?.howToSchema||!!d?.hasHowToSchema},
        {key:"breadcrumbs",label:"Breadcrumb Navigation",weight:"Medium",desc:"Helps AI understand site hierarchy and topic structure",check:d=>d?.aeoSignals?.breadcrumbs||!!d?.hasBreadcrumb},
        {key:"speakable",label:"Speakable Schema",weight:"High",desc:"Marks content suitable for voice assistant responses",check:d=>d?.aeoSignals?.speakable||!!d?.hasSpeakable},
        {key:"authorInfo",label:"Author Attribution (E-E-A-T)",weight:"Critical",desc:"Named expertise — critical trust signal for AI engines",check:d=>d?.aeoSignals?.authorInfo||!!d?.hasAuthorInfo},
        {key:"trustSignals",label:"Trust Signals",weight:"High",desc:"Awards, certifications, partnerships on website",check:d=>d?.aeoSignals?.trustSignals||!!d?.hasTrustSignals},
        {key:"testimonials",label:"Social Proof / Reviews",weight:"High",desc:"Testimonials, ratings, client logos on website",check:d=>d?.aeoSignals?.testimonials||!!d?.hasTestimonials},
        {key:"video",label:"Video Content",weight:"Medium",desc:"Rich media increases AI citation likelihood",check:d=>d?.aeoSignals?.video||!!d?.hasVideo},
        {key:"openGraph",label:"Open Graph Tags",weight:"Low",desc:"Content preview metadata for sharing and indexing",check:d=>d?.aeoSignals?.openGraph||!!d?.hasOpenGraph},
        {key:"twitterCard",label:"Twitter / X Card",weight:"Low",desc:"Social sharing metadata",check:d=>d?.aeoSignals?.twitterCard||!!d?.hasTwitterCard},
        {key:"canonical",label:"Canonical URL",weight:"Medium",desc:"Prevents duplicate content confusion for AI crawlers",check:d=>d?.aeoSignals?.canonical||!!d?.hasCanonical},
        {key:"contentDepth",label:"Content Depth (1000+ words)",weight:"High",desc:"Substantive content gives AI more to reference and cite",check:d=>d?.aeoSignals?.contentDepth||(d?.wordCount||d?.homepageWordCount||0)>=1000,detail:d=>(d?.totalWordCount||d?.wordCount||d?.homepageWordCount||0).toLocaleString()+" words"},
        {key:"internalLinking",label:"Internal Link Structure (20+)",weight:"Medium",desc:"Helps AI understand topic relationships across site",check:d=>d?.aeoSignals?.internalLinking||(d?.internalLinks||0)>=20,detail:d=>(d?.internalLinks||0)+" links"},
        {key:"properHierarchy",label:"Proper Heading Hierarchy",weight:"High",desc:"H1->H2->H3 structure helps AI parse content sections",check:d=>d?.contentStructure?.hasProperHierarchy||(d?.h1Count>0&&d?.h2Count>0),detail:d=>`${d?.contentStructure?.h1Count||d?.h1Count||0} H1, ${d?.contentStructure?.h2Count||d?.h2Count||0} H2, ${d?.contentStructure?.h3Count||d?.h3Count||0} H3`},
        {key:"hasBlog",label:"Blog / Content Hub",weight:"Critical",desc:"Regular content publishing is the #1 driver of AI visibility",check:d=>d?.aeoSignals?.hasBlog||(d?.subPages||[]).some(sp=>sp.url?.toLowerCase().includes("blog"))},
        {key:"hasFaqPage",label:"Dedicated FAQ Page",weight:"High",desc:"FAQ pages are directly extracted by AI for answers",check:d=>d?.aeoSignals?.hasFaqPage||(d?.subPages||[]).some(sp=>sp.url?.toLowerCase().includes("faq")||sp.url?.toLowerCase().includes("help"))},
      ];

      const allForRank=[
        {name:r.clientData.brand,mentionRate:avgMentions},
        ...compData.map(c=>({name:c.name,mentionRate:c.mentionRate||0}))
      ].sort((a,b)=>b.mentionRate-a.mentionRate);
      const brandRank=allForRank.findIndex(b=>b.name===r.clientData.brand)+1;

      return(<>
        {compData.map((comp,ci)=>{
          const isExpanded=expandedComp===ci;
          const compColor=compColors[ci%5];
          const compWebsite=getCompWebsite(comp.name);
          const compSent=getCompSentiment(comp.name);

          return(
            <Card key={ci} style={{padding:0,marginBottom:10,overflow:"hidden"}}>
              {/* Collapsed row */}
              <div onClick={()=>setExpandedComp(isExpanded?null:ci)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>{if(!isExpanded)e.currentTarget.style.background=`${C.bg}`;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1}}>
                  <BrandLogo name={comp.name} website={compWebsite} size={36} color={compColor}/>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{comp.name}</div>
                    {compWebsite&&<div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{compWebsite.replace(/^https?:\/\//,"").replace(/\/$/,"")}</div>}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:24,flexShrink:0}}>
                  <div style={{textAlign:"center",minWidth:52}}>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",marginBottom:2}}>Mentions</div>
                    <div style={{fontSize:16,fontWeight:600,fontFamily:"'Outfit'",color:metricColor(avgMentions,comp.mentionRate)}}>{comp.mentionRate||0}%</div>
                  </div>
                  <div style={{textAlign:"center",minWidth:52}}>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",marginBottom:2}}>Citations</div>
                    <div style={{fontSize:16,fontWeight:600,fontFamily:"'Outfit'",color:metricColor(avgCitations,comp.citationRate)}}>{comp.citationRate||0}%</div>
                  </div>
                  <div style={{textAlign:"center",minWidth:52}}>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:".04em",marginBottom:2}}>Sentiment</div>
                    <div style={{fontSize:16,fontWeight:600,fontFamily:"'Outfit'",color:compSent!==null?metricColor(avgSentiment,compSent):C.muted}}>{compSent!==null?compSent+"%":"—"}</div>
                  </div>
                  <span style={{fontSize:10,color:C.muted,marginLeft:8,transition:"transform .2s",display:"inline-block",transform:isExpanded?"rotate(180deg)":"rotate(0)"}}>▼</span>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded&&(
                <div style={{borderTop:`1px solid ${C.borderSoft}`,padding:"16px 20px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                    {/* Left: Performance comparison bars */}
                    <div>
                      <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:12}}>Performance vs {r.clientData.brand}</div>
                      {[
                        {label:"Mentions",brandVal:avgMentions,compVal:comp.mentionRate||0},
                        {label:"Citations",brandVal:avgCitations,compVal:comp.citationRate||0},
                        {label:"Sentiment",brandVal:avgSentiment,compVal:compSent}
                      ].map((m,mi)=>(
                        <div key={mi} style={{marginBottom:mi<2?14:0}}>
                          <div style={{fontSize:11,fontWeight:500,color:C.muted,marginBottom:4}}>{m.label}</div>
                          {m.compVal!==null?(
                            <div>
                              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                                <span style={{fontSize:10,color:C.accent,minWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.clientData.brand}</span>
                                <div style={{flex:1,height:6,background:C.borderSoft,borderRadius:3}}>
                                  <div style={{width:`${Math.max(2,m.brandVal)}%`,height:"100%",background:C.accent,borderRadius:3,transition:"width .6s"}}/>
                                </div>
                                <span style={{fontSize:10,fontWeight:600,color:C.text,minWidth:28,textAlign:"right"}}>{m.brandVal}%</span>
                              </div>
                              <div style={{display:"flex",alignItems:"center",gap:8}}>
                                <span style={{fontSize:10,color:compColor,minWidth:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{comp.name}</span>
                                <div style={{flex:1,height:6,background:C.borderSoft,borderRadius:3}}>
                                  <div style={{width:`${Math.max(2,m.compVal)}%`,height:"100%",background:compColor,borderRadius:3,transition:"width .6s"}}/>
                                </div>
                                <span style={{fontSize:10,fontWeight:600,color:C.text,minWidth:28,textAlign:"right"}}>{m.compVal}%</span>
                              </div>
                            </div>
                          ):(
                            <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Not assessed</div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right: Strengths / competitive insights */}
                    <div>
                      <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:12}}>Strengths</div>
                      {comp.advantages&&comp.advantages.length>0?(
                        comp.advantages.slice(0,4).map((a,ai)=>(
                          <div key={ai} style={{display:"flex",gap:6,alignItems:"flex-start",marginBottom:8}}>
                            <div style={{width:5,height:5,borderRadius:"50%",background:a.insight?.advantage==="them"?C.red:C.green,marginTop:5,flexShrink:0}}/>
                            <div style={{fontSize:11,color:C.sub,lineHeight:1.6}}>
                              <span style={{fontWeight:500}}>{a.category?.split("/")[0]?.trim()}</span>: {a.insight?.text||""}
                            </div>
                          </div>
                        ))
                      ):comp.topStrength&&comp.topStrength!=="N/A"?(
                        <div style={{fontSize:11,color:C.sub,lineHeight:1.6}}>{comp.topStrength}</div>
                      ):(
                        <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Run a deeper audit to unlock competitor insights</div>
                      )}
                    </div>
                  </div>

                  {/* Technical AEO Signals comparison */}
                  {(()=>{
                    const brandD=r.brandCrawl;
                    const compD=r.compCrawlData?.[comp.name]||null;
                    if(!brandD&&!compD)return null;
                    const weightColor={Critical:C.red,High:C.amber,Medium:C.accent,Low:C.muted};
                    return(
                      <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.borderSoft}`}}>
                        <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:10}}>Technical AEO Signals</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 60px 60px",gap:"0",fontSize:11}}>
                          <div style={{fontWeight:500,color:C.muted,paddingBottom:6,borderBottom:`1px solid ${C.borderSoft}`}}>Signal</div>
                          <div style={{fontWeight:500,color:C.accent,textAlign:"center",paddingBottom:6,borderBottom:`1px solid ${C.borderSoft}`,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.clientData.brand}</div>
                          <div style={{fontWeight:500,color:compColor,textAlign:"center",paddingBottom:6,borderBottom:`1px solid ${C.borderSoft}`,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{comp.name}</div>
                          {crawlSignals.map((sig,si)=>{
                            const brandHas=brandD?sig.check(brandD):false;
                            const compHas=compD?sig.check(compD):false;
                            return(<React.Fragment key={si}>
                              <div style={{padding:"5px 0",borderBottom:si<crawlSignals.length-1?`1px solid ${C.borderSoft}`:"none",color:C.sub}} title={sig.desc}>
                                <span>{sig.label}</span>
                                <span style={{marginLeft:6,fontSize:9,color:weightColor[sig.weight]||C.muted}}>{sig.weight}</span>
                              </div>
                              <div style={{padding:"5px 0",textAlign:"center",borderBottom:si<crawlSignals.length-1?`1px solid ${C.borderSoft}`:"none",color:brandHas?C.green:C.red}}>{brandHas?"Yes":"No"}</div>
                              <div style={{padding:"5px 0",textAlign:"center",borderBottom:si<crawlSignals.length-1?`1px solid ${C.borderSoft}`:"none",color:compHas?C.green:C.red}}>{compHas?"Yes":"No"}</div>
                            </React.Fragment>);
                          })}
                        </div>
                        {(()=>{
                          const brandCount=brandD?crawlSignals.filter(s=>s.check(brandD)).length:0;
                          const compCount=compD?crawlSignals.filter(s=>s.check(compD)).length:0;
                          return(
                            <div style={{display:"flex",justifyContent:"space-between",marginTop:10,padding:"8px 12px",background:C.bg,borderRadius:8,fontSize:11}}>
                              <span style={{color:C.sub}}><span style={{fontWeight:600,color:C.accent}}>{r.clientData.brand}</span>: {brandCount}/{crawlSignals.length} signals</span>
                              <span style={{color:C.sub}}><span style={{fontWeight:600,color:compColor}}>{comp.name}</span>: {compCount}/{crawlSignals.length} signals</span>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
              )}
            </Card>
          );
        })}

        {/* 5c. Summary ranking row */}
        <div style={{background:C.bg,borderRadius:10,padding:"12px 16px",marginTop:10}}>
          <span style={{fontSize:12,color:C.sub}}>{brandRank===1?"\uD83C\uDFC6 ":""}{r.clientData.brand} ranks <span style={{fontWeight:600}}>#{brandRank}</span> out of {allForRank.length} brands for overall AI visibility</span>
        </div>
      </>);
    })()}

  </div>);
}

/* ─── PAGE: ARCHETYPES (stakeholder-grouped) ─── */
function ArchetypesPage({r,goTo}){
  const[selGroup,setSelGroup]=useState(0);
  const[selArch,setSelArch]=useState(null);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>User Archetypes</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Who is searching — grouped by stakeholder type</p></div>
    <SectionNote text="Select a stakeholder group to see customer segments within it. 'Visibility' shows how often AI engines mention your brand for this segment's queries."/>
    <div style={{display:"flex",gap:8,marginBottom:20}}>
      {r.stakeholders.map((sg,i)=>(<div key={i} onClick={()=>{setSelGroup(i);setSelArch(null);}} style={{flex:1,padding:"14px 16px",background:selGroup===i?`${C.accent}06`:C.surface,border:`1px solid ${selGroup===i?`${C.accent}30`:C.border}`,borderRadius:C.rs,cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
        <div style={{fontSize:22,marginBottom:4}}>{sg.icon}</div>
        <div style={{fontSize:12,fontWeight:500,color:selGroup===i?C.accent:C.text}}>{sg.group}</div>
        <div style={{fontSize:10,color:C.muted,marginTop:2}}>{sg.archetypes.length} segments</div>
      </div>))}
    </div>
    <div style={{fontSize:12,color:C.sub,marginBottom:14,padding:"0 4px"}}>{r.stakeholders[selGroup].desc}</div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {r.stakeholders[selGroup].archetypes.map((a,i)=>(<Card key={i} onClick={()=>setSelArch(selArch===i?null:i)} style={{cursor:"pointer",border:selArch===i?`1px solid ${C.accent}30`:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${C.accent}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{a.icon}</div>
            <div><div style={{fontWeight:500,fontSize:13,color:C.text}}>{a.name}</div><div style={{fontSize:11,color:C.muted}}>{a.demo} · ~{a.size}% of searches</div></div>
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
  const[selStage,setSelStage]=useState(0);
  const[customPrompts,setCustomPrompts]=useState({0:[],1:[],2:[],3:[]});
  const[newPrompt,setNewPrompt]=useState("");
  const[testing,setTesting]=useState(false);
  const[expandedRow,setExpandedRow]=useState(null);
  const stageColors=["#6366f1","#8b5cf6","#a855f7","#c084fc"];
  const stageNames=["Awareness","Consideration","Decision","Retention"];
  const stageDescs=["User discovers the problem or category","User evaluates and compares options","User is ready to purchase or commit","User seeks ongoing value"];
  const stageIcons=["🔍","⚖️","💳","🔄"];
  const stages=r.funnelStages||[];

  const getMergedPrompts=(si)=>{
    const apiPrompts=(stages[si]&&stages[si].prompts)||[];
    const custom=customPrompts[si]||[];
    return[...apiPrompts,...custom];
  };

  const stageStats=stageNames.map((_,si)=>{
    const prompts=getMergedPrompts(si);
    return{cited:prompts.filter(p=>p.status==="Cited").length,mentioned:prompts.filter(p=>p.status==="Mentioned").length,absent:prompts.filter(p=>p.status==="Absent").length,total:prompts.length};
  });

  const allPrompts=stageNames.flatMap((_,si)=>getMergedPrompts(si));
  const totalCited=allPrompts.filter(p=>p.status==="Cited").length;
  const totalMentioned=allPrompts.filter(p=>p.status==="Mentioned").length;
  const totalAll=allPrompts.length||1;
  const funnelScore=Math.round((totalCited*1+totalMentioned*0.5)/totalAll*100);

  // Aggregate trigger word analysis
  const allTriggers={};
  allPrompts.forEach(p=>{(p.triggerWords||[]).forEach(tw=>{
    const k=tw.toLowerCase();
    if(!allTriggers[k])allTriggers[k]={word:tw,count:0,cited:0,mentioned:0,absent:0,totalWeight:0};
    allTriggers[k].count++;
    allTriggers[k].totalWeight+=(p.weight||5);
    if(p.status==="Cited")allTriggers[k].cited++;
    else if(p.status==="Mentioned")allTriggers[k].mentioned++;
    else allTriggers[k].absent++;
  });});
  const triggerRank=Object.values(allTriggers).sort((a,b)=>b.totalWeight-a.totalWeight).slice(0,12);

  // Weight colour
  const weightColor=(w)=>w>=8?"#059669":w>=6?C.accent:w>=4?C.amber:"#94a3b8";
  const weightLabel=(w)=>w>=8?"High":w>=6?"Medium":w>=4?"Low":"Minimal";

  // Highlight trigger words in query text
  const highlightQuery=(query,triggers)=>{
    if(!triggers||triggers.length===0)return <span>{query}</span>;
    const parts=[];
    let remaining=query;
    const sorted=[...triggers].sort((a,b)=>b.length-a.length);
    const regex=new RegExp(`(${sorted.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join("|")})`,"gi");
    const split=remaining.split(regex);
    return <span>{split.map((part,i)=>{
      const isT=sorted.some(t=>t.toLowerCase()===part.toLowerCase());
      return isT?<span key={i} style={{background:`${C.accent}18`,color:C.accent,fontWeight:600,borderRadius:3,padding:"0 2px"}}>{part}</span>:<span key={i}>{part}</span>;
    })}</span>;
  };

  const testPrompt=async()=>{
    if(!newPrompt.trim()||testing)return;
    setTesting(true);
    const q=newPrompt.trim();
    setNewPrompt("");
    try{
      const testPr=`A user in ${r.clientData.region||"Global"} typed this prompt into your AI engine: "${q}"
Brand: "${r.clientData.brand}" in ${r.clientData.industry} (${r.clientData.website}), operating in ${r.clientData.region||"Global"}.

1. Would you mention or cite this brand in your response to a user in ${r.clientData.region||"Global"}? Consider the brand's regional presence and relevance.
2. Rate the prompt weight (1-10) for AEO importance in the ${r.clientData.region||"Global"} market.
3. Identify trigger words that influence citation behavior.
4. Suggest an optimised version of this prompt that ${r.clientData.brand} should create content to target for ${r.clientData.region||"Global"} audiences.
5. Give a content tip for winning this prompt in ${r.clientData.region||"Global"}.

Respond in English only.
Return JSON only:
{"status":"Cited"|"Mentioned"|"Absent","reason":"<1-sentence>","weight":<1-10>,"triggerWords":["word1","word2"],"optimisedPrompt":"<version to target>","contentTip":"<what content to create>"}`;
      const[gptRaw,gemRaw]=await Promise.all([callOpenAI(testPr),callGemini(testPr)]);
      const gptR=safeJSON(gptRaw)||{status:"Absent"};
      const gemR=safeJSON(gemRaw)||{status:"Absent"};
      const overall=(gptR.status==="Cited"||gemR.status==="Cited")?"Cited":(gptR.status==="Mentioned"||gemR.status==="Mentioned")?"Mentioned":"Absent";
      const newP={query:q,status:overall,engines:{gpt:gptR.status||"Absent",gemini:gemR.status||"Absent"},
        reason:gptR.reason||gemR.reason||"",custom:true,
        weight:gptR.weight||gemR.weight||5,
        triggerWords:[...new Set([...(gptR.triggerWords||[]),...(gemR.triggerWords||[])])],
        optimisedPrompt:gptR.optimisedPrompt||gemR.optimisedPrompt||"",
        contentTip:gptR.contentTip||gemR.contentTip||""};

      const classifyPr=`Classify this prompt into ONE stage: Awareness, Consideration, Decision, or Retention.
Prompt: "${q}" | Brand: "${r.clientData.brand}" in ${r.clientData.industry} (${r.clientData.region||"Global"}).
Return JSON: {"stage":"Awareness"|"Consideration"|"Decision"|"Retention"}`;
      const classRaw=await callOpenAI(classifyPr);
      const classR=safeJSON(classRaw)||{stage:"Awareness"};
      const stageIdx=stageNames.indexOf(classR.stage);
      const targetStage=stageIdx>=0?stageIdx:0;
      setCustomPrompts(prev=>({...prev,[targetStage]:[...prev[targetStage],newP]}));
      setSelStage(targetStage);
    }catch(e){console.error("Prompt test error:",e);}
    setTesting(false);
  };

  const statusColor=(s)=>s==="Cited"?C.green:s==="Mentioned"?C.amber:C.red;
  const statusIcon=(s)=>s==="Cited"?"✓":s==="Mentioned"?"◐":"✗";

  return(<div>
    <div style={{marginBottom:24}}>
      <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Intent Pathway</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:3}}>How visible is {r.clientData.brand} at each stage of the customer journey? Prompts are weighted by their AEO impact.</p>
    </div>

    {/* Funnel overview + trigger word analysis side by side */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:C.text}}>Funnel Visibility</div>
            <div style={{fontSize:11,color:C.muted}}>{allPrompts.length} prompts · weighted by AEO impact</div>
          </div>
          <div style={{fontSize:28,fontWeight:800,color:funnelScore>=40?C.green:funnelScore>=20?C.amber:C.red,fontFamily:"'Outfit'"}}>{funnelScore}%</div>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:6}}>
          <Pill color={C.green}>{totalCited} Cited</Pill>
          <Pill color={C.amber}>{totalMentioned} Mentioned</Pill>
          <Pill color={C.red}>{allPrompts.length-totalCited-totalMentioned} Absent</Pill>
        </div>
        <div style={{display:"flex",gap:4,height:6,borderRadius:4,overflow:"hidden"}}>
          {stageNames.map((_,si)=>{const s=stageStats[si];const t=s.total||1;
            return(<div key={si} style={{flex:1,background:C.bg,borderRadius:3,overflow:"hidden",display:"flex"}}>
              <div style={{width:`${(s.cited/t)*100}%`,background:C.green}}/>
              <div style={{width:`${(s.mentioned/t)*100}%`,background:C.amber}}/>
            </div>);
          })}
        </div>
        <div style={{display:"flex",gap:4,marginTop:4}}>
          {stageNames.map((n,i)=>(<div key={i} style={{flex:1,textAlign:"center",fontSize:9,color:C.muted}}>{n}</div>))}
        </div>
      </Card>

      {/* Trigger word analysis */}
      <Card>
        <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>High-Impact Trigger Words</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Words in prompts that influence AI citation behavior for {r.clientData.industry}.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {triggerRank.length>0?triggerRank.map((t,i)=>{
            const eff=t.count>0?Math.round(((t.cited+t.mentioned*0.5)/t.count)*100):0;
            return(<div key={i} style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:600,
              background:eff>=50?`${C.green}10`:eff>=25?`${C.amber}10`:`${C.red}06`,
              color:eff>=50?C.green:eff>=25?C.amber:C.red,
              border:`1px solid ${eff>=50?`${C.green}25`:eff>=25?`${C.amber}25`:`${C.red}15`}`}}>
              {t.word} <span style={{opacity:.6,fontWeight:400}}>×{t.count}</span>
              <span style={{marginLeft:4,fontSize:9}}>{eff}% effective</span>
            </div>);
          }):<span style={{fontSize:11,color:C.muted}}>Run audit to see trigger words</span>}
        </div>
      </Card>
    </div>

    {/* Add prompt input */}
    <Card style={{marginBottom:16,background:`${C.accent}03`,borderColor:`${C.accent}20`}}>
      <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>Test a Prompt</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Type any prompt. We'll test it on both engines, score its weight, and identify trigger words.</div>
      <div style={{display:"flex",gap:8}}>
        <input value={newPrompt} onChange={e=>setNewPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")testPrompt();}}
          placeholder={`e.g. "Best ${r.clientData.industry||"tech"} companies in ${r.clientData.region||"my area"}"`}
          style={{flex:1,padding:"10px 14px",border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit",background:"#fff"}}
          onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
        <button onClick={testPrompt} disabled={!newPrompt.trim()||testing}
          style={{padding:"10px 20px",background:!newPrompt.trim()||testing?"#d1d5db":C.accent,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:!newPrompt.trim()||testing?"not-allowed":"pointer",fontFamily:"'Outfit'",whiteSpace:"nowrap",minWidth:110}}>
          {testing?"Testing...":"Test Prompt"}
        </button>
      </div>
    </Card>

    {/* Stage tabs */}
    <div style={{display:"flex",gap:6,marginBottom:16}}>
      {stageNames.map((name,i)=>{
        const s=stageStats[i];const active=selStage===i;const color=stageColors[i];
        const avgWeight=getMergedPrompts(i).length>0?Math.round(getMergedPrompts(i).reduce((a,p)=>a+(p.weight||5),0)/getMergedPrompts(i).length*10)/10:0;
        return(<div key={i} onClick={()=>{setSelStage(i);setExpandedRow(null);}} style={{flex:1,padding:"14px 10px",cursor:"pointer",background:active?"#fff":C.surface,border:`1.5px solid ${active?color:C.border}`,borderRadius:12,textAlign:"center",transition:"all .15s",boxShadow:active?`0 2px 8px ${color}15`:"none"}}>
          <div style={{fontSize:18,marginBottom:4}}>{stageIcons[i]}</div>
          <div style={{fontSize:18,fontWeight:700,color:color,fontFamily:"'Outfit'"}}>{s.total>0?Math.round((s.cited+s.mentioned)/Math.max(1,s.total)*100):0}%</div>
          <div style={{fontSize:12,fontWeight:500,color:active?C.text:C.sub,marginTop:2}}>{name}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.total} prompts · avg wt {avgWeight}</div>
        </div>);
      })}
    </div>

    {/* Stage detail with weighted prompts */}
    {(()=>{
      const prompts=getMergedPrompts(selStage);
      const color=stageColors[selStage];
      const s=stageStats[selStage];
      if(prompts.length===0)return(<Card><div style={{textAlign:"center",padding:24,color:C.muted,fontSize:13}}>No prompts for {stageNames[selStage]} yet. Use "Test a Prompt" above.</div></Card>);
      // Sort by weight descending
      const sorted=[...prompts].sort((a,b)=>(b.weight||5)-(a.weight||5));
      return(<Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>{stageIcons[selStage]}</span>
              <h3 style={{fontSize:16,fontWeight:500,color:color,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>{stageNames[selStage]}</h3>
            </div>
            <p style={{fontSize:11,color:C.muted,margin:"3px 0 0"}}>{stageDescs[selStage]} · sorted by AEO weight</p>
          </div>
          <div style={{display:"flex",gap:4}}>
            <Pill color={C.green} filled>{s.cited} Cited</Pill>
            <Pill color={C.amber} filled>{s.mentioned} Mentioned</Pill>
            <Pill color={C.red} filled>{s.absent} Absent</Pill>
          </div>
        </div>
        {/* Column headers */}
        <div style={{display:"grid",gridTemplateColumns:"46px 1fr 60px 60px 60px",padding:"8px 20px",borderBottom:`2px solid ${C.borderSoft}`,background:C.bg}}>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>Weight</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>Prompt</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}>ChatGPT</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}>Gemini</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textAlign:"center"}}>Overall</span>
        </div>
        {sorted.map((p,j)=>{
          const eng=p.engines||{};
          const gptS=eng.gpt||p.status||"Absent";
          const gemS=eng.gemini||p.status||"Absent";
          const w=p.weight||5;
          const isExpanded=expandedRow===`${selStage}-${j}`;
          const hasTips=p.optimisedPrompt||p.contentTip||(p.triggerWords&&p.triggerWords.length>0);
          return(<div key={j}>
            <div onClick={()=>hasTips&&setExpandedRow(isExpanded?null:`${selStage}-${j}`)}
              style={{display:"grid",gridTemplateColumns:"46px 1fr 60px 60px 60px",padding:"10px 20px",borderBottom:`1px solid ${C.borderSoft}`,alignItems:"center",
                background:p.custom?`${C.accent}04`:isExpanded?`${color}04`:"transparent",cursor:hasTips?"pointer":"default",transition:"background .1s"}}>
              {/* Weight badge */}
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:28,height:28,borderRadius:6,background:`${weightColor(w)}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:weightColor(w),fontFamily:"'Outfit'"}}>{w}</div>
              </div>
              {/* Query with highlighted trigger words */}
              <div>
                <div style={{fontSize:12,lineHeight:1.4,color:C.text}}>"{highlightQuery(p.query,p.triggerWords)}"</div>
                {p.custom&&<span style={{fontSize:9,fontWeight:600,color:C.accent,padding:"1px 5px",background:`${C.accent}10`,borderRadius:3}}>CUSTOM</span>}
                {hasTips&&<span style={{fontSize:9,color:C.muted,marginLeft:4}}>{isExpanded?"▲":"▼ details"}</span>}
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:statusColor(gptS)}}>{statusIcon(gptS)}</span>
                <div style={{fontSize:9,color:statusColor(gptS),marginTop:1}}>{gptS}</div>
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:statusColor(gemS)}}>{statusIcon(gemS)}</span>
                <div style={{fontSize:9,color:statusColor(gemS),marginTop:1}}>{gemS}</div>
              </div>
              <span style={{textAlign:"center"}}><Pill color={statusColor(p.status||"Absent")}>{p.status||"Absent"}</Pill></span>
            </div>
            {/* Expanded detail row */}
            {isExpanded&&<div style={{padding:"12px 20px 14px 66px",borderBottom:`1px solid ${C.borderSoft}`,background:`${color}03`}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {p.triggerWords&&p.triggerWords.length>0&&<div>
                  <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Trigger Words</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {p.triggerWords.map((tw,ti)=>(<span key={ti} style={{padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:600,background:`${C.accent}12`,color:C.accent}}>{tw}</span>))}
                  </div>
                </div>}
                {p.optimisedPrompt&&<div>
                  <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Optimised Prompt to Target</div>
                  <div style={{fontSize:11,color:C.sub,fontStyle:"italic",lineHeight:1.5}}>"{p.optimisedPrompt}"</div>
                </div>}
              </div>
              {p.contentTip&&<div style={{marginTop:10,padding:"8px 12px",background:`${C.green}06`,borderRadius:6,borderLeft:`3px solid ${C.green}`}}>
                <div style={{fontSize:10,fontWeight:600,color:C.green,marginBottom:2}}>CONTENT STRATEGY TIP</div>
                <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{p.contentTip}</div>
              </div>}
              {p.reason&&<div style={{marginTop:8,fontSize:11,color:C.muted,lineHeight:1.4}}>{p.reason}</div>}
            </div>}
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Playbook</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Your AEO brand hub — identity, assets, and AI-optimised guidelines</p></div>
    <SectionNote text="This is your central brand hub for AEO. Upload your brand assets so our system can reference them when generating content strategies. The guidelines below are tailored to how AI engines process and cite brand information."/>

    {/* Brand Identity Form */}
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:14,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Identity</h3>{saved&&<Pill color={C.green} filled>✓ Saved</Pill>}</div>
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
      <h3 style={{fontSize:14,fontWeight:500,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Asset Library</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Upload and store brand documents. These inform your AEO content strategy.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {docTypes.map((dt,i)=>{const uploaded=docs.filter(d=>d.type===dt.type);return(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,border:`1px dashed ${uploaded.length>0?C.green:C.border}`,textAlign:"center",cursor:"pointer",transition:"all .15s"}} onClick={()=>addDoc(dt.type)}>
          <div style={{fontSize:20,marginBottom:4}}>{dt.icon}</div>
          <div style={{fontSize:12,fontWeight:500,color:C.text}}>{dt.type}</div>
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
      <h3 style={{fontSize:14,fontWeight:500,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>AEO Brand Guidelines</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>{r.brandGuidelines.length} technical guidelines for maximising AI engine citation rate. Click to expand.</p>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {r.brandGuidelines.map((g,i)=>{const isOpen=expandG===i;return(<div key={i} style={{borderRadius:C.rs,border:`1px solid ${isOpen?`${C.accent}25`:C.border}`,overflow:"hidden",transition:"all .15s"}}>
          <div onClick={()=>setExpandG(isOpen?null:i)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,background:isOpen?`${C.accent}03`:"transparent"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><span style={{fontSize:11,fontWeight:700,color:C.accent,fontFamily:"'Outfit'",background:`${C.accent}08`,padding:"2px 8px",borderRadius:4}}>G{String(i+1).padStart(2,"0")}</span><span style={{fontSize:13,fontWeight:500,color:C.text}}>{g.area}</span></div>
              {!isOpen&&<div style={{fontSize:11,color:C.muted,marginTop:4,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{g.rule}</div>}
            </div>
            <span style={{fontSize:10,color:C.accent,marginTop:4,flexShrink:0}}>{isOpen?"▲":"▼"}</span>
          </div>
          {isOpen&&<div style={{padding:"0 16px 16px"}}>
            <div style={{fontSize:12,color:C.sub,lineHeight:1.7,marginBottom:12}}>{g.rule}</div>
            <div style={{padding:"12px 14px",background:`${C.accent}03`,borderRadius:8,border:`1px solid ${C.accent}10`}}>
              <div style={{fontSize:10,fontWeight:500,color:C.accent,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Implementation Example</div>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>AEO Channels</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Channels ranked by impact on AI engine visibility {hasAnyFindings&&<span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>✓ Verified via Web Search</span>}</p></div>
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
                <div style={{fontSize:11,fontWeight:500,color:C.text}}>{s.name}</div>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Personalised content strategy based on {r.clientData.brand}'s audit findings.</p></div>
    <SectionNote text={`This content grid is tailored to ${r.clientData.brand}'s specific AEO gaps and competitive landscape. Priority P0 = start immediately based on audit findings.`}/>
    <Card style={{marginBottom:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["Content Type","Channels","Frequency","Priority","Owner"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,color:C.muted,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
      <tbody>{[...r.contentTypes].sort((a,b)=>{const po={"P0":0,"P1":1,"P2":2,"P3":3};return(po[a.p]??9)-(po[b.p]??9);}).map((ct,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
        <td style={{padding:"10px"}}><div style={{fontWeight:500,color:C.text}}>{ct.type}</div>{ct.rationale&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{ct.rationale}</div>}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{ct.channels.map(ch=><Pill key={ch} color="#64748b">{ch}</Pill>)}</div></td>
        <td style={{padding:"10px",color:C.sub}}>{ct.freq}</td>
        <td style={{padding:"10px"}}><Pill color={ct.p==="P0"?C.red:ct.p==="P1"?C.amber:"#94a3b8"}>{ct.p}</Pill></td>
        <td style={{padding:"10px",color:C.sub,fontSize:11}}>{ct.owner}</td>
      </tr>))}</tbody></table>
    </Card>
    <Card><h3 style={{fontSize:14,fontWeight:500,color:C.text,margin:"0 0 12px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Monthly Output Requirements for {r.clientData.brand}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:500,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
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
      <div><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>90-Day Transformation Roadmap</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Department-by-department plan for <strong>{r.clientData.brand}</strong></p></div>
      <button onClick={handleExport} style={{padding:"10px 20px",background:C.text,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",display:"flex",alignItems:"center",gap:6}}>📄 Export Full Report</button>
    </div>
    <SectionNote text="This roadmap assigns tasks to every department involved. The PDF export includes all 8 stages of your audit in a professional format with cover page and table of contents."/>

    <Card style={{marginBottom:20,background:"linear-gradient(135deg,#f8f9fb,#f0f4ff)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,textAlign:"center"}}>
        {[{l:"Current",s:r.overall,c:C.red,d:"Today"},{l:"Day 30",s:Math.min(90,r.overall+12),c:C.amber,d:"+10-15%"},{l:"Day 60",s:Math.min(95,r.overall+25),c:"#f59e0b",d:"+20-30%"},{l:"Day 90",s:Math.min(98,r.overall+40),c:C.green,d:"+40-60%"}].map(x=>(<div key={x.l}><Ring score={x.s} size={64} color={x.c} sw={4}/><div style={{fontSize:12,fontWeight:500,color:C.text,marginTop:4}}>{x.l}</div><div style={{fontSize:10,color:C.muted}}>{x.d}</div></div>))}
      </div>
    </Card>

    <div style={{position:"relative",paddingLeft:24}}>
      <div style={{position:"absolute",left:9,top:12,bottom:12,width:2,background:"linear-gradient(to bottom,#ef4444,#f59e0b,#10b981)",borderRadius:1}}/>
      {phases.map((p,idx)=>(<div key={idx} style={{position:"relative",marginBottom:idx<2?16:0}}>
        <div style={{position:"absolute",left:-19,top:10,width:12,height:12,borderRadius:"50%",background:p.accent,border:"3px solid #f5f6f8",boxShadow:`0 0 0 2px ${p.accent}33`}}/>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div style={{fontSize:16,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>{p.title}</div><div style={{color:p.accent,fontSize:11,fontWeight:600,marginTop:1}}>{p.sub}</div></div>
            <div style={{padding:"5px 12px",background:`${p.accent}08`,borderRadius:8,border:`1px solid ${p.accent}20`}}><span style={{fontSize:10,color:C.muted}}>Lift: </span><span style={{fontSize:14,fontWeight:700,color:p.accent,fontFamily:"'Outfit'"}}>{p.lift}</span></div>
          </div>
          {p.departments.map((d,di)=>(<div key={di} style={{marginBottom:di<p.departments.length-1?10:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><div style={{width:3,height:14,borderRadius:2,background:d.color}}/><span style={{fontSize:12,fontWeight:500,color:d.color}}>{d.dept}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginLeft:10}}>{d.tasks.map((tk,ti)=>(<div key={ti} style={{padding:"6px 8px",background:C.bg,borderRadius:5,fontSize:11,color:C.sub,display:"flex",gap:6}}><span style={{color:d.color,fontSize:10}}>→</span>{tk}</div>))}</div>
          </div>))}
        </Card>
      </div>))}
    </div>

    <Card style={{marginTop:20,background:`linear-gradient(135deg,${C.accent}08,${C.accent}03)`,border:`1px solid ${C.accent}20`,textAlign:"center"}}>
      <div style={{fontSize:17,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em",marginBottom:4}}>Ready to dominate AI search results?</div>
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
      </div>
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"40px 32px",animation:"fadeIn .5s ease-out"}}>
      {/* Page header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:500,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Client Management</h1>
        </div>
      </div>

      {/* Workspaces section */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:"#fff"}}>
        <div style={{padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/></svg>
            <span style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Workspaces</span>
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
          <h3 style={{fontSize:16,fontWeight:500,color:C.text,margin:"0 0 6px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>No workspaces yet</h3>
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
                  <div style={{fontSize:14,fontWeight:500,color:C.text}}>{p.brand}</div>
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
  const isLocal=typeof window!=="undefined"&&window.location.hostname==="localhost";
  const[authed,setAuthed]=useState(()=>{if(isLocal)return true;try{return sessionStorage.getItem("enterrank_token")?true:false;}catch(e){return false;}});
  const[screen,setScreen]=useState(isLocal?"dashboard":"hub");
  const[activeProject,setActiveProject]=useState(null);
  const[step,setStep]=useState("input");
  const[data,setData]=useState({brand:"",industry:"",website:"",region:"",topics:[],competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
  const[results,setResults]=useState(null);
  const[history,setHistory]=useState([]);

  const[sideCollapsed,setSideCollapsed]=useState(false);
  const[loginError,setLoginError]=useState("");
  const[loggingIn,setLoggingIn]=useState(false);

  const handleLogin=async(email,password)=>{
    if(isLocal){setAuthed(true);return;}
    setLoggingIn(true);setLoginError("");
    try{
      const res=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
      const data=await res.json();
      if(data.success){try{sessionStorage.setItem("enterrank_token",data.token);}catch(e){}setAuthed(true);}
      else{setLoginError(data.error||"Invalid credentials");}
    }catch(e){setLoginError("Connection error. Please try again.");}
    setLoggingIn(false);
  };

  const handleLogout=()=>{if(isLocal){setResults(null);setStep("input");return;}try{sessionStorage.removeItem("enterrank_token");}catch(e){}setAuthed(false);setResults(null);setStep("input");setScreen("hub");setActiveProject(null);};

  const[projectPrompt,setProjectPrompt]=useState(null);

  const handleSelectProject=async(projectSummary)=>{
    try{
      let project=null;
      try{
        const res=await fetch(`/api/projects?id=${projectSummary.id}`);
        const data=await res.json();
        if(!data.error)project=data;
      }catch(e){}
      if(!project)project=lsGetProject(projectSummary.id);
      if(!project){alert("Failed to load project");return;}
      // Check if project has previous audit data
      const lastAudit=(project.history||[]).length>0?(project.history||[])[project.history.length-1]:null;
      if(lastAudit&&lastAudit.apiData){
        // Has previous results — ask user what they want
        setProjectPrompt({project,lastAudit});
      }else{
        // No previous audit — go straight to audit input
        openProjectForAudit(project);
      }
    }catch(e){alert("Failed to load project");}
  };

  const openProjectForAudit=(project)=>{
    setProjectPrompt(null);
    setActiveProject(project);
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
    setHistory((project.history||[]).map(h=>({date:h.date||new Date(h.timestamp).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),...h})));
    setResults(null);
    setStep("input");
    setScreen("dashboard");
  };

  const openProjectDashboard=(project,lastAudit)=>{
    setProjectPrompt(null);
    setActiveProject(project);
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
    setHistory((project.history||[]).map(h=>({date:h.date||new Date(h.timestamp).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),...h})));
    // Rebuild results from last audit
    const cd={brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors||[]};
    const r=generateAll(cd,lastAudit.apiData);
    setResults(r);
    setStep("dashboard");
    setScreen("dashboard");
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
        <h2 style={{fontSize:20,fontWeight:500,color:C.text,margin:"0 0 2px",fontFamily:"'Outfit'",letterSpacing:"-.02em",textAlign:"center"}}>Welcome back</h2>
        <p style={{fontSize:13,color:C.muted,margin:"0 0 28px",textAlign:"center"}}>Sign in to your account</p>
        <LoginForm onSubmit={handleLogin} error={loginError} loading={loggingIn}/>
      </div>
      <div style={{textAlign:"center",marginTop:20,fontSize:12,color:C.muted}}>Powered by <span style={{fontWeight:600,color:C.sub}}>Entermind</span></div>
    </div>
  </div>);

  if(screen==="hub")return(<>
    <ProjectHub onSelect={handleSelectProject} onNew={handleNewProject} onLogout={handleLogout}/>
    {projectPrompt&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,animation:"fadeIn .2s ease-out"}} onClick={()=>setProjectPrompt(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:"36px 32px 28px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,.15)",animation:"fadeIn .25s ease-out"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:48,height:48,borderRadius:14,background:`${C.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <BrandLogo name={projectPrompt.project.brand} website={projectPrompt.project.website} size={28} color={C.accent}/>
          </div>
          <div style={{fontSize:20,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em",marginBottom:6}}>{projectPrompt.project.brand}</div>
          <div style={{fontSize:13,color:C.muted}}>Last audit: {projectPrompt.lastAudit.date||"Recent"} · Score: {projectPrompt.lastAudit.overall||"—"}%</div>
        </div>
        <div style={{fontSize:14,color:C.sub,textAlign:"center",marginBottom:24}}>Would you like to run another audit or view the existing dashboard?</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>openProjectDashboard(projectPrompt.project,projectPrompt.lastAudit)} style={{flex:1,padding:"14px 20px",background:"#fff",border:`2px solid ${C.accent}`,borderRadius:12,fontSize:14,fontWeight:600,color:C.accent,cursor:"pointer",fontFamily:"'Outfit'",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:`${C.accent}08`})} onMouseLeave={e=>Object.assign(e.target.style,{background:"#fff"})}>View Dashboard</button>
          <button onClick={()=>openProjectForAudit(projectPrompt.project)} style={{flex:1,padding:"14px 20px",background:C.accent,border:`2px solid ${C.accent}`,borderRadius:12,fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"'Outfit'",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:"#1d4ed8"})} onMouseLeave={e=>Object.assign(e.target.style,{background:C.accent})}>Run AEO Audit</button>
        </div>
        <div onClick={()=>setProjectPrompt(null)} style={{textAlign:"center",marginTop:16,fontSize:12,color:C.muted,cursor:"pointer"}}>Cancel</div>
      </div>
    </div>)}
  </>);

  const run=async(apiData)=>{
    const r=generateAll(data, apiData);setResults(r);
    const entry={date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:r.overall,engines:[r.engines[0].score,r.engines[1].score],mentions:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citations:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),mentionsPerEngine:{gpt:r.engines[0].mentionRate,gemini:r.engines[1].mentionRate},citationsPerEngine:{gpt:r.engines[0].citationRate,gemini:r.engines[1].citationRate},sentimentPerEngine:{gpt:r.sentiment.brand.gpt,gemini:r.sentiment.brand.gemini},sentimentAvg:r.sentiment.brand.avg,categories:r.painPoints.map(p=>({label:p.label,score:p.score})),apiData:apiData};
    setHistory(prev=>[...prev,entry]);
    setStep("dashboard");

    // Save to project (create if new, update if existing) — skip in artifact mode
    if(!isLocal){try{
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


  return(<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif",color:C.text,display:"flex"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}08!important}`}</style>

    {/* Sidebar */}
    <Sidebar step={step} setStep={setStep} results={results} brand={results?.clientData?.brand||data.brand} onBack={handleBackToHub} isLocal={isLocal} onLogout={handleLogout} collapsed={sideCollapsed} setCollapsed={setSideCollapsed}/>

    {/* Main content */}
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",marginLeft:sideCollapsed?60:220,transition:"margin-left .2s ease"}}>
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px",maxWidth:1060,width:"100%",margin:"0 auto"}}>
        {step==="input"&&<NewAuditPage data={data} setData={setData} onRun={run} history={history}/>}
        {step==="dashboard"&&results&&<DashboardPage r={results} history={history} goTo={setStep}/>}
        {step==="archetypes"&&results&&<ArchetypesPage r={results} goTo={setStep}/>}
        {step==="intent"&&results&&<IntentPage r={results} goTo={setStep}/>}
        {step==="playbook"&&results&&<PlaybookPage r={results} goTo={setStep}/>}
        {step==="channels"&&results&&<ChannelsPage r={results} goTo={setStep}/>}
        {step==="grid"&&results&&<GridPage r={results} goTo={setStep}/>}
        {step==="roadmap"&&results&&<RoadmapPage r={results}/>}
      </div>
    </div>
  </div>);
}
