import React, { useState } from "react";
import { supabase } from './supabase';
import jsPDF from "jspdf";
import "jspdf-autotable";

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const C={bg:"#f8f9fb",surface:"#ffffff",border:"#e8ecf1",borderSoft:"#f0f2f5",text:"#111827",sub:"#4b5563",muted:"#9ca3af",accent:"#2563eb",green:"#059669",amber:"#d97706",red:"#dc2626",r:12,rs:8};
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.26,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Outfit'"}}>{score}%</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:22,boxShadow:"0 1px 2px rgba(0,0,0,.03)",...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}
function BrandLogo({name,website,size=22,color}){
  const[src,setSrc]=useState(null);
  const[fallback,setFallback]=useState(false);
  const domain=website?website.replace(/^https?:\/\//,"").replace(/\/.*$/,""):null;
  React.useEffect(()=>{setSrc(domain?`https://img.logo.dev/${domain}?token=${window.__LOGO_TOKEN||"pk_V2YlDNlxSO61y2CJt0JSDQ"}&size=${size*2}&format=png`:null);setFallback(false);},[domain,size]);
  if(src&&!fallback)return <img src={src} width={size} height={size} style={{borderRadius:size/4,objectFit:"contain",background:"#fff"}} onError={()=>{if(src.includes("logo.dev")){setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size*2}`);}else{setFallback(true);}}} alt={name}/>;
  return <div style={{width:size,height:size,borderRadius:size/4,background:color||"#ccc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.5,fontWeight:700,color:"#fff"}}>{(name||"?")[0]}</div>;
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
async function callWithRetry(fn, maxRetries=3, baseDelayMs=1000){
  for(let attempt=0;attempt<=maxRetries;attempt++){
    try{
      const result=await fn();
      if(result!==null)return result;
      if(attempt===maxRetries)return null;
      await new Promise(r=>setTimeout(r,baseDelayMs*Math.pow(2,attempt)));
    }catch(e){
      if(attempt===maxRetries)return null;
      const isRateLimit=e.message?.includes("429")||e.message?.includes("rate")||e.message?.includes("quota");
      let delay=baseDelayMs*Math.pow(2,attempt);
      if(isRateLimit)delay=delay*2;
      console.error(`API attempt ${attempt+1}/${maxRetries+1} failed (${isRateLimit?"rate limit":"error"}), retrying in ${delay}ms...`);
      await new Promise(r=>setTimeout(r,delay));
    }
  }
  return null;
}

function validateResponse(raw,minLength=10){
  if(!raw)return null;
  const text=typeof raw==="string"?raw:raw.text||raw.result||"";
  if(text.length<minLength)return null;
  return text;
}

async function callOpenAI(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),45000);
    try{
      const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt}),signal:controller.signal});
      clearTimeout(timeout);
      const data=await res.json();
      if(data.error){console.error("OpenAI error:",data.error);return null;}
      if(data.rateLimit?.remaining&&parseInt(data.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);console.error("OpenAI API error:",e);return null;}
  });
}

async function callOpenAI4o(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),45000);
    try{
      const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt,model:"gpt-4o"}),signal:controller.signal});
      clearTimeout(timeout);
      const data=await res.json();
      if(data.error){console.error("OpenAI 4o error:",data.error);return null;}
      if(data.rateLimit?.remaining&&parseInt(data.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);console.error("OpenAI 4o API error:",e);return null;}
  });
}

async function callGemini(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),45000);
    try{
      const res=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,systemPrompt}),signal:controller.signal});
      clearTimeout(timeout);
      const data=await res.json();
      if(data.error){
        if(data.error.includes("SAFETY")||data.error.includes("block"))return "";
        console.error("Gemini error:",data.error);return null;
      }
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);console.error("Gemini API error:",e);return null;}
  });
}

async function callOpenAISearch(query, region){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),75000);
    try{
      const r=await fetch("/api/openai-search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query,region}),signal:controller.signal});
      clearTimeout(timeout);
      const d=await r.json();
      if(d.error&&!d.result){console.error("OpenAI Search error:",d.error);return null;}
      if(d.rateLimit?.remaining&&parseInt(d.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return{text:d.result||"",citations:d.citations||[]};
    }catch(e){clearTimeout(timeout);console.error("OpenAI Search API error:",e);return null;}
  })||{text:"",citations:[]};
}

// Call a specific engine by name, with fallback to OpenAI
async function callEngine(engine, prompt, systemPrompt){
  if(engine==="openai") return await callOpenAI(prompt, systemPrompt);
  if(engine==="gemini") return await callGemini(prompt, systemPrompt);
  return await callOpenAI(prompt, systemPrompt);
}

function safeJSON(raw){
  if(!raw)return null;
  let text=typeof raw==="string"?raw:JSON.stringify(raw);
  text=text.replace(/```json\s*/gi,"").replace(/```\s*/gi,"").trim();
  try{return JSON.parse(text);}catch(e){}
  const jsonMatch=text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if(jsonMatch){try{return JSON.parse(jsonMatch[1]);}catch(e){}}
  try{const fixed=text.replace(/,\s*([}\]])/g,"$1").replace(/'/g,'"');return JSON.parse(fixed);}catch(e){}
  return null;
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
 try{
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

  onProgress("Crawling competitor websites...",6);
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
  let searchQueries = [];
  const topicsToUse = topics.slice(0, 10);
  try{
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
  }catch(stepError){
    console.error("Query generation failed:",stepError.message);
    onProgress("Warning: query generation had an issue, using fallback queries...",12);
    searchQueries=topicsToUse.flatMap(t=>[
      `What are the best ${t} options with the highest ratings in ${region}?`,
      `Compare the top ${t} providers by features, pricing and customer reviews in ${region}`
    ]).slice(0,20);
  }

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
      onProgress(`Testing on ${engineLabel}...`, 15 + Math.round((i / queries.length) * 25));
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
      onProgress(`Testing on ChatGPT...`, 15 + Math.round((i / queries.length) * 25));
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
  let gptResponses=[],gemResponses=[];
  try{
    const [gR,gmR]=await Promise.all([
      runGptSearchBatches(searchQueries, region, 3, 1500).catch(e=>{console.error("ChatGPT testing failed:",e.message);return[];}),
      runQueryBatches(callGemini, searchQueries, 2, 5000, "Gemini").catch(e=>{console.error("Gemini testing failed:",e.message);return[];})
    ]);
    gptResponses=gR||[];gemResponses=gmR||[];
    if(gptResponses.length===0&&gemResponses.length===0)onProgress("Warning: both engine tests failed, continuing with limited data...",42);
    else if(gptResponses.length===0)onProgress("Warning: ChatGPT testing failed, continuing with Gemini data...",42);
    else if(gemResponses.length===0)onProgress("Warning: Gemini testing failed, continuing with ChatGPT data...",42);
  }catch(stepError){
    console.error("Engine testing failed:",stepError.message);
    onProgress("Warning: engine testing encountered an issue, continuing...",42);
  }

  // ── Step 4: Classify responses — scan real text for brand names and URLs ──
  onProgress("Analyzing responses for brand visibility...", 45);
  let gptVisibility={},gemVisibility={};
  const emptyVis={mentionRate:0,citationRate:0,queries:searchQueries.map(q=>({query:q,status:"Absent",confidence:"fallback"}))};
  try{

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
  gptVisibility = gptVisRaw.result;
  gemVisibility = gemVisRaw.result;

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
    onProgress("Verifying ChatGPT citations...", 47);
    await batchReclassify(gptVisRaw.ambiguousCases, callOpenAI, gptVisibility);
  }
  if (gemVisRaw.ambiguousCases.length > 0) {
    onProgress("Verifying Gemini citations...", 49);
    await batchReclassify(gemVisRaw.ambiguousCases, callGemini, gemVisibility);
  }
  }catch(stepError){
    console.error("Visibility computation failed:",stepError.message);
    onProgress("Warning: visibility analysis had an issue, continuing...",50);
    const fallbackBrands=[brand,...compNames.filter(n=>n)];
    fallbackBrands.forEach(n=>{if(!gptVisibility[n])gptVisibility[n]=emptyVis;if(!gemVisibility[n])gemVisibility[n]=emptyVis;});
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
  onProgress("Analyzing strengths and weaknesses...", 52);

  const brandGptVis = gptVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };
  const brandGemVis = gemVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };

  let swGpt={},swGem={};
  try{
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
  swGpt = safeJSON(swGptRaw) || {};
  swGem = safeJSON(swGemRaw) || {};
  }catch(stepError){
    console.error("Strengths/weaknesses analysis failed:",stepError.message);
    onProgress("Warning: strengths analysis had an issue, continuing...",55);
  }

  const gptData = {
    score: Math.round(brandGptVis.mentionRate * 0.5 + brandGptVis.citationRate * 0.5),
    mentionRate: brandGptVis.mentionRate,
    citationRate: brandGptVis.citationRate,
    queries: brandGptVis.queries || [],
    strengths: swGpt.strengths || ["Analysis unavailable"],
    weaknesses: swGpt.weaknesses || ["Analysis unavailable"]
  };

  const gemData = {
    score: Math.round(brandGemVis.mentionRate * 0.5 + brandGemVis.citationRate * 0.5),
    mentionRate: brandGemVis.mentionRate,
    citationRate: brandGemVis.citationRate,
    queries: brandGemVis.queries || [],
    strengths: swGem.strengths || ["Analysis unavailable"],
    weaknesses: swGem.weaknesses || ["Analysis unavailable"]
  };

  // ── Step 5b: Sentiment Analysis ──
  onProgress("Analyzing brand sentiment across AI engines...",56);
  let sentimentData={brand:{gpt:50,gemini:50,avg:50,summary:"Sentiment analysis unavailable"},competitors:compNames.map(n=>({name:n,gpt:50,gemini:50,avg:50,summary:""}))};
  try{
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

  sentimentData={
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
  }catch(stepError){
    console.error("Sentiment analysis failed:",stepError.message);
    onProgress("Warning: sentiment analysis had an issue, continuing...",59);
  }

  // ── Step 4b: Extract detailed sentiment signals ──
  onProgress("Extracting sentiment signals...",60);
  let sentimentSignals={positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]};
  try{
    const responseSnippets=[];
    (gptResponses||[]).forEach((resp,i)=>{
      const text=typeof resp==="string"?resp:resp?.response||resp?.text||resp?.result||"";
      if(text.length>20)responseSnippets.push({engine:"ChatGPT",query:searchQueries[i]||"",snippet:text.slice(0,800)});
    });
    (gemResponses||[]).forEach((resp,i)=>{
      const text=typeof resp==="string"?resp:resp?.response||resp?.text||resp?.result||"";
      if(text.length>20)responseSnippets.push({engine:"Gemini",query:searchQueries[i]||"",snippet:text.slice(0,800)});
    });
    const gptSnippets=responseSnippets.filter(s=>s.engine==="ChatGPT");
    const gemSnippets=responseSnippets.filter(s=>s.engine==="Gemini");
    const interleaved=[];
    const maxLen=Math.max(gptSnippets.length,gemSnippets.length);
    for(let i=0;i<maxLen;i++){if(gptSnippets[i])interleaved.push(gptSnippets[i]);if(gemSnippets[i])interleaved.push(gemSnippets[i]);}
    let snippetBlock=interleaved.map(s=>`[${s.engine}] Q: ${s.query}\nA: ${s.snippet}`).join("\n\n");
    if(snippetBlock.length>6000)snippetBlock=snippetBlock.slice(0,6000);
    if(snippetBlock.length>100){
      const sigPrompt=`Analyze the following AI engine responses about "${brand}" in the ${industry} industry in ${region}.

RESPONSES:
${snippetBlock}

Extract:
1. positive: Array of 4-6 positive signals — specific themes or qualities AI engines portray favorably about ${brand}. Each a short phrase (3-8 words).
2. negative: Array of 3-5 negative signals — specific concerns or weaknesses AI engines mention about ${brand}. Each a short phrase.
3. quotes: Array of 4-6 notable direct quotes from the AI responses about ${brand}. Each: {"text":"<under 40 words>","engine":"ChatGPT"|"Gemini","sentiment":"positive"|"negative"|"neutral"}
4. competitorSentiment: Array for each competitor mentioned: {"name":"...","sentiment":"positive"|"negative"|"mixed","summary":"one sentence comparing to ${brand}"}

Competitors to look for: ${compNames.join(", ")}

Return ONLY valid JSON:
{"positive":["..."],"negative":["..."],"quotes":[{"text":"...","engine":"...","sentiment":"..."}],"competitorSentiment":[{"name":"...","sentiment":"...","summary":"..."}]}`;
      const [gptSig,gemSig]=await Promise.all([
        callOpenAI(sigPrompt,engineSystemPrompt).catch(()=>null),
        callGemini(sigPrompt,engineSystemPrompt).catch(()=>null)
      ]);
      const gptP=safeJSON(gptSig),gemP=safeJSON(gemSig);
      const mergeArr=(a1,a2)=>{const combined=[...(a1||[]),...(a2||[])];const seen=new Set();return combined.filter(item=>{const key=(typeof item==="string"?item:item.text||item.name||"").toLowerCase().trim();if(seen.has(key)||key.length<3)return false;seen.add(key);return true;});};
      sentimentSignals={
        positive:mergeArr(gptP?.positive,gemP?.positive).slice(0,8),
        negative:mergeArr(gptP?.negative,gemP?.negative).slice(0,6),
        quotes:mergeArr(gptP?.quotes,gemP?.quotes).slice(0,8),
        competitorSentiment:mergeArr(gptP?.competitorSentiment,gemP?.competitorSentiment),
        rawSnippets:responseSnippets.slice(0,10)
      };
    }
  }catch(stepError){
    console.error("Sentiment signal extraction failed:",stepError.message);
  }

  // ── Step 5: Competitor analysis — BOTH engines + crawl data ──
  onProgress("Analysing competitors across both engines...",63);
  let compData={competitors:[]};
  let mergedComps=[];
  try{
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
  mergedComps=(compGpt.competitors||[]).map(gc=>{
    const gemMatch=(compGem.competitors||[]).find(g=>g.name&&gc.name&&g.name.toLowerCase()===gc.name.toLowerCase());
    if(gemMatch){
      return{...gc,score:Math.round((gc.score+gemMatch.score)/2),
        engineScores:[gc.engineScores?gc.engineScores[0]:gc.score, gemMatch.engineScores?gemMatch.engineScores[1]:gemMatch.score],
        painPoints:(gc.painPoints||[]).map((pp,j)=>{const gp=(gemMatch.painPoints||[])[j];return{label:pp.label,score:gp?Math.round((pp.score+gp.score)/2):pp.score};})};
    }
    return gc;
  });
  compData={competitors:mergedComps.length>0?mergedComps:(compGem.competitors||[])};
  }catch(stepError){
    console.error("Competitor analysis failed:",stepError.message);
    onProgress("Warning: competitor analysis had an issue, continuing...",64);
  }

  // ── Step 5: Pain points — BOTH engines + crawl data ──
  onProgress("Scoring categories across both engines...",66);
  const painCatLabels=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  let mergedPainPoints=painCatLabels.map(l=>({label:l,score:0,severity:"critical"}));
  try{
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
  mergedPainPoints=(catGpt.painPoints&&catGpt.painPoints.length>0?catGpt.painPoints:catGem.painPoints||[]).map((pp,i)=>{
    const gemPP=(catGem.painPoints||[])[i];
    const avgScore=gemPP?Math.round((pp.score+gemPP.score)/2):pp.score;
    return{label:pp.label,score:avgScore,severity:avgScore<30?"critical":avgScore<60?"warning":"good"};
  });
  }catch(stepError){
    console.error("Pain points analysis failed:",stepError.message);
    onProgress("Warning: Category scoring had an issue, continuing...",68);
  }

  // ── Step 6: User archetypes + journeys — OpenAI generates, Gemini verifies engine statuses ──
  onProgress("Generating user archetypes...",70);
  let archData={stakeholders:[]};
  try{
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
  archData=safeJSON(archRaw)||{stakeholders:[]};

  // Now ask Gemini to verify/correct the engine statuses
  onProgress("Verifying archetype journeys...",74);
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
  }catch(stepError){
    console.error("Archetypes generation failed:",stepError.message);
    onProgress("Warning: archetypes generation had an issue, continuing...",76);
  }

  // ── Step 6b: Intent Pathway — real data from BOTH engines ──
  onProgress("Testing intent pathway prompts...",77);
  let intentData=[];
  try{
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
  intentData=(Array.isArray(intentGpt)&&intentGpt.length>0?intentGpt:intentGem).map((stage,si)=>{
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
  }catch(stepError){
    console.error("Intent pathway analysis failed:",stepError.message);
    onProgress("Warning: intent pathway had an issue, continuing...",80);
  }

  // ── Step 7: AEO Channel verification via REAL web crawling ──
  onProgress("Verifying channels via web search...",81);
  let chData={channels:[]};
  try{
  let realChannels=null;
  try{realChannels=await verifyChannels(brand, cd.website, industry, region);}catch(e){console.error("Channel verify failed:",e);}

  if(realChannels&&realChannels.channels&&realChannels.channels.length>0){
    chData.channels=realChannels.channels;
    onProgress("Checking podcast & academic presence...",83);
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
  }catch(stepError){
    console.error("Channel verification failed:",stepError.message);
    onProgress("Warning: channel verification had an issue, continuing...",85);
  }

  // ── Step 8: Content recommendations — BOTH engines, using ALL audit data ──
  onProgress("Building content recommendations...",87);
  let contentData={contentTypes:[]};
  try{
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
  contentData={contentTypes:allContentTypes.slice(0,10)};
  }catch(stepError){
    console.error("Content recommendations failed:",stepError.message);
    onProgress("Warning: content recommendations had an issue, continuing...",90);
  }

  // ── Step 9: 90-Day Roadmap — using ALL previous data ──
  onProgress("Creating 90-day roadmap from audit data...",92);
  let roadData=null;
  try{
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
  roadData=safeJSON(roadRaw)||null;
  }catch(stepError){
    console.error("Roadmap generation failed:",stepError.message);
    onProgress("Warning: roadmap generation had an issue, continuing...",95);
  }

  onProgress("Compiling final report...",96);

  return {
    engineData:{
      engines:[
        {id:"chatgpt",...gptData,queries:(gptData.queries||[])},
        {id:"gemini",...gemData,queries:(gemData.queries||[])}
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
    sentimentSignals:sentimentSignals,
    brandCrawlData: brandCrawl?.mainPage || null,
    compCrawlData: compCrawlsRaw,
    compVisibilityData: compScoresMap,
    searchQueries: searchQueries
  };
 }catch(fatalError){
    console.error("Audit failed:",fatalError);
    onProgress("Audit failed: "+(fatalError.message||"Unknown error"),-1);
    return{
      error:true,
      errorMessage:fatalError.message||"The audit encountered an unexpected error. Please try again.",
      engineData:{engines:[{id:"chatgpt",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"gemini",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}],painPoints:[]},
      competitorData:{competitors:[]},archData:[],intentData:null,channelData:{channels:[]},contentGridData:[],roadmapData:null,contentData:[],sentimentData:{brand:{gpt:50,gemini:50,avg:50,summary:"Audit failed"},competitors:[]},brandCrawlData:null,compCrawlData:{},compVisibilityData:{},searchQueries:[]
    };
  }
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

/* ─── PDF EXPORT ─── */
function exportPDF(r){
  const doc=new jsPDF("p","mm","a4");
  const W=210,H=297,margin=15,contentW=W-margin*2;
  let y=0;
  const brand=r.clientData.brand;
  const region=r.clientData.region;
  const industry=r.clientData.industry;
  const date=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const accent=[37,99,235],dark=[17,24,39],muted=[107,114,128],green=[22,163,74],red=[220,38,38],amber=[217,119,6];

  function checkPage(needed=20){if(y+needed>H-margin){doc.addPage();y=margin;}}
  function sectionHeader(title){
    checkPage(25);doc.setFontSize(14);doc.setFont("helvetica","bold");doc.setTextColor(...dark);
    doc.text(title,margin,y);y+=2;doc.setDrawColor(...accent);doc.setLineWidth(0.5);doc.line(margin,y,margin+40,y);y+=8;
  }
  function kvLine(label,value,valueColor=dark){
    checkPage(8);doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text(label,margin,y);
    doc.setFont("helvetica","bold");doc.setTextColor(...valueColor);doc.text(String(value),margin+55,y);y+=6;
  }

  // ── COVER PAGE ──
  doc.setFillColor(...accent);doc.rect(0,0,W,50,"F");
  doc.setFontSize(24);doc.setFont("helvetica","bold");doc.setTextColor(255,255,255);doc.text("Audit Report",margin,25);
  doc.setFontSize(12);doc.setFont("helvetica","normal");doc.text(brand,margin,35);
  y=65;doc.setTextColor(...dark);doc.setFontSize(11);doc.setFont("helvetica","bold");doc.text(brand,margin,y);y+=8;
  doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...muted);
  doc.text("Industry: "+(industry||"N/A"),margin,y);y+=5;
  doc.text("Region: "+(region||"N/A"),margin,y);y+=5;
  doc.text("Date: "+date,margin,y);y+=5;
  doc.text("Generated by EnterRank",margin,y);y+=15;

  // ── EXECUTIVE SUMMARY ──
  sectionHeader("Executive Summary");
  const overallScore=r.overall||0;
  const gptE=r.engines[0]||{},gemE=r.engines[1]||{};
  const avgMention=Math.round(((gptE.mentionRate||0)+(gemE.mentionRate||0))/2);
  const avgCitation=Math.round(((gptE.citationRate||0)+(gemE.citationRate||0))/2);
  kvLine("Overall Visibility Score",overallScore+"%",overallScore>=60?green:overallScore>=30?amber:red);
  kvLine("Average Mention Rate",avgMention+"%");
  kvLine("Average Citation Rate",avgCitation+"%");
  kvLine("ChatGPT Mentions / Citations",(gptE.mentionRate||0)+"% / "+(gptE.citationRate||0)+"%");
  kvLine("Gemini Mentions / Citations",(gemE.mentionRate||0)+"% / "+(gemE.citationRate||0)+"%");
  y+=5;

  // Key findings (inline diagnostics)
  const findings=[];
  if(avgMention<15)findings.push(avgMention+"% mention rate — "+brand+" isn't part of the AI conversation yet.");
  else if(avgMention<35)findings.push("Mentioned in ~1 of "+Math.round(100/avgMention)+" relevant responses ("+avgMention+"%).");
  if(avgCitation<10)findings.push(avgCitation+"% citation rate. Users get answers but aren't sent to your site.");
  const critCats=(r.painPoints||[]).filter(p=>p.severity==="critical");
  if(critCats.length>0)findings.push(critCats.map(c=>c.label.split("/")[0].trim()+" "+c.score+"%").join(", ")+" — need immediate attention.");
  const compsAhead=(r.competitors||[]).filter(c=>{const cr=Math.round(((c.mentionRate||0)+(c.citationRate||0))/2);return cr>Math.round((avgMention+avgCitation)/2);});
  if(compsAhead.length>0)findings.push(compsAhead.map(c=>c.name).join(", ")+" scoring above you on visibility metrics.");
  if(findings.length>0){
    checkPage(10);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text("Key Findings",margin,y);y+=6;
    findings.slice(0,5).forEach(f=>{
      checkPage(10);doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...dark);
      const lines=doc.splitTextToSize("\u2022 "+f,contentW-5);doc.text(lines,margin+3,y);y+=lines.length*4+2;
    });
  }

  // ── INTENT PATHWAY — QUERY RESULTS ──
  doc.addPage();y=margin;
  sectionHeader("Intent Pathway \u2014 Query Results");
  const gptQueries=gptE.queries||[];
  const gemQueries=gemE.queries||[];
  const searchQueries=r.searchQueries||gptQueries.map(q=>q.query||q);
  const queryTableData=searchQueries.map((q,i)=>{
    const qText=typeof q==="string"?q:q.query||q;
    const gptStatus=gptQueries[i]?.status||"Absent";
    const gemStatus=gemQueries[i]?.status||"Absent";
    return[qText,gptStatus,gemStatus];
  });
  if(queryTableData.length>0){
    doc.autoTable({startY:y,head:[["Query","ChatGPT","Gemini"]],body:queryTableData,margin:{left:margin,right:margin},
      styles:{fontSize:7,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
      columnStyles:{0:{cellWidth:contentW-50},1:{cellWidth:25,halign:"center"},2:{cellWidth:25,halign:"center"}},
      didParseCell:function(data){
        if(data.section==="body"&&(data.column.index===1||data.column.index===2)){
          const val=data.cell.raw;
          if(val==="Cited")data.cell.styles.textColor=green;
          else if(val==="Mentioned")data.cell.styles.textColor=accent;
          else data.cell.styles.textColor=red;
          data.cell.styles.fontStyle="bold";
        }
      }
    });y=doc.lastAutoTable.finalY+10;
  }

  // ── SHARE OF VOICE ──
  checkPage(30);sectionHeader("Share of Voice");
  const allBrandsForVoice=[{name:brand,mentionRate:avgMention,citationRate:avgCitation},...(r.competitors||[]).filter(c=>c.name.toLowerCase()!==brand.toLowerCase())];
  if(allBrandsForVoice.length>0){
    doc.autoTable({startY:y,head:[["Brand","Mention Rate","Citation Rate","Overall"]],
      body:allBrandsForVoice.map(b=>[b.name,(b.mentionRate||0)+"%",(b.citationRate||0)+"%",Math.round(((b.mentionRate||0)+(b.citationRate||0))/2)+"%"]),
      margin:{left:margin,right:margin},styles:{fontSize:8,cellPadding:3},
      headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold"},
      columnStyles:{0:{cellWidth:contentW-75},1:{cellWidth:25,halign:"center"},2:{cellWidth:25,halign:"center"},3:{cellWidth:25,halign:"center"}}
    });y=doc.lastAutoTable.finalY+10;
  }

  // ── PLATFORM ANALYSIS ──
  checkPage(30);sectionHeader("Platform Analysis");
  [{label:"ChatGPT",eng:gptE},{label:"Gemini",eng:gemE}].forEach(({label,eng})=>{
    checkPage(15);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text(label,margin,y);y+=6;
    doc.setFontSize(8);doc.setFont("helvetica","bold");doc.setTextColor(...green);doc.text("Strengths:",margin+2,y);y+=4;
    doc.setFont("helvetica","normal");doc.setTextColor(...dark);
    (eng.strengths||[]).forEach(s=>{checkPage(6);const lines=doc.splitTextToSize("\u2022 "+s,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;});
    y+=3;doc.setFontSize(8);doc.setFont("helvetica","bold");doc.setTextColor(...red);doc.text("Weaknesses:",margin+2,y);y+=4;
    doc.setFont("helvetica","normal");doc.setTextColor(...dark);
    (eng.weaknesses||[]).forEach(w=>{checkPage(6);const lines=doc.splitTextToSize("\u2022 "+w,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;});
    y+=6;
  });

  // ── COMPETITOR DEEP-DIVE ──
  checkPage(30);sectionHeader("Competitor Deep-Dive");
  (r.competitors||[]).forEach(comp=>{
    checkPage(20);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text(comp.name||"Unknown",margin,y);y+=5;
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...muted);
    if(comp.score!=null){doc.text("Score: "+comp.score+"%",margin+2,y);y+=4;}
    (comp.advantages||[]).slice(0,5).forEach(a=>{
      checkPage(6);doc.setTextColor(...dark);
      const txt=a.insight?(a.category||"")+": "+a.insight.text:(a.category||"");
      const lines=doc.splitTextToSize("\u2022 "+txt,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;
    });y+=5;
  });

  // ── USER ARCHETYPES ──
  checkPage(30);sectionHeader("User Archetypes");
  (r.stakeholders||[]).forEach(sg=>{
    checkPage(12);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...accent);doc.text((sg.icon||"")+" "+(sg.group||""),margin,y);y+=6;
    (sg.archetypes||[]).forEach(a=>{
      checkPage(18);doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text(a.name||"",margin+2,y);y+=4;
      doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...muted);
      if(a.demo){doc.text(a.demo+(a.size?" \u00B7 ~"+a.size+"% of searches":"")+(a.brandVisibility?" \u00B7 "+a.brandVisibility+"% visibility":""),margin+4,y);y+=4;}
      if(a.behavior){const lines=doc.splitTextToSize("Behaviour: "+a.behavior,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;}
      y+=3;
    });
  });

  // ── AEO CHANNELS ──
  checkPage(30);sectionHeader("Target Channels");
  const chSorted=[...(r.aeoChannels||[])].sort((a,b)=>b.impact-a.impact);
  if(chSorted.length>0){
    doc.autoTable({startY:y,head:[["Channel","Impact","Status","Finding"]],
      body:chSorted.map(ch=>[ch.channel||"",String(ch.impact||""),ch.status||"Unknown",ch.finding||""]),
      margin:{left:margin,right:margin},styles:{fontSize:7,cellPadding:3},
      headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
      columnStyles:{0:{cellWidth:50},1:{cellWidth:15,halign:"center"},2:{cellWidth:25,halign:"center"},3:{cellWidth:contentW-90}},
      didParseCell:function(data){
        if(data.section==="body"&&data.column.index===2){
          const val=(data.cell.raw||"").toLowerCase();
          if(val.includes("active")||val.includes("verified")||val.includes("found"))data.cell.styles.textColor=green;
          else if(val.includes("not")||val.includes("missing"))data.cell.styles.textColor=red;
          else data.cell.styles.textColor=amber;
        }
      }
    });y=doc.lastAutoTable.finalY+10;
  }

  // ── SENTIMENT SIGNALS ──
  if(r.sentimentSignals){
    checkPage(30);sectionHeader("Sentiment Analysis");
    if(r.sentimentSignals.positive?.length){
      doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...green);
      doc.text("Positive Signals:",margin,y);y+=5;
      doc.setFont("helvetica","normal");doc.setTextColor(...dark);
      r.sentimentSignals.positive.forEach(s=>{
        checkPage(6);const text=typeof s==="string"?s:s.text||s;
        const lines=doc.splitTextToSize("+ "+text,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;
      });y+=4;
    }
    if(r.sentimentSignals.negative?.length){
      doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...red);
      doc.text("Negative Signals:",margin,y);y+=5;
      doc.setFont("helvetica","normal");doc.setTextColor(...dark);
      r.sentimentSignals.negative.forEach(s=>{
        checkPage(6);const text=typeof s==="string"?s:s.text||s;
        const lines=doc.splitTextToSize("\u2212 "+text,contentW-10);doc.text(lines,margin+4,y);y+=lines.length*3.5+1;
      });y+=4;
    }
    if(r.sentimentSignals.quotes?.length){
      doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);
      doc.text("AI Engine Quotes:",margin,y);y+=5;
      doc.setFont("helvetica","normal");
      r.sentimentSignals.quotes.forEach(q=>{
        checkPage(8);const qt=typeof q==="string"?q:q.text||q;
        doc.setTextColor(...muted);const lines=doc.splitTextToSize('"'+qt+'"',contentW-10);
        doc.text(lines,margin+4,y);y+=lines.length*3.5+2;
      });
    }
    y+=6;
  }

  // ── CONTENT-CHANNEL GRID ──
  checkPage(30);sectionHeader("Content-Channel Grid");
  const ct=r.contentTypes||[];
  if(ct.length>0){
    const sorted=[...ct].sort((a,b)=>{const po={P0:0,P1:1,P2:2,P3:3};return(po[a.p]??9)-(po[b.p]??9);});
    doc.autoTable({startY:y,head:[["Content Type","Channels","Frequency","Priority","Owner"]],
      body:sorted.slice(0,15).map(item=>[item.type||"",Array.isArray(item.channels)?item.channels.join(", "):item.channels||"",item.freq||"",item.p||"",item.owner||""]),
      margin:{left:margin,right:margin},styles:{fontSize:7,cellPadding:2.5},
      headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:7},
      didParseCell:function(data){
        if(data.section==="body"&&data.column.index===3){
          const val=(data.cell.raw||"").toUpperCase();
          if(val==="P0")data.cell.styles.textColor=red;
          else if(val==="P1")data.cell.styles.textColor=amber;
          else data.cell.styles.textColor=green;
          data.cell.styles.fontStyle="bold";
        }
      }
    });y=doc.lastAutoTable.finalY+10;
  }

  // ── 90-DAY ROADMAP ──
  checkPage(30);sectionHeader("90-Day Roadmap");
  if(r.roadmap&&r.roadmap.day30){
    [r.roadmap.day30,r.roadmap.day60,r.roadmap.day90].filter(Boolean).forEach(phase=>{
      checkPage(20);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...accent);
      doc.text((phase.title||"")+" ("+(phase.sub||"")+")",margin,y);y+=5;
      if(phase.lift){doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text("Expected lift: "+phase.lift,margin+2,y);y+=4;}
      (phase.departments||[]).forEach(d=>{
        checkPage(10);doc.setFontSize(8);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text(d.dept||"",margin+2,y);y+=4;
        doc.setFont("helvetica","normal");
        (d.tasks||[]).forEach(t=>{
          checkPage(6);doc.setTextColor(...dark);const lines=doc.splitTextToSize("\u2192 "+t,contentW-10);doc.text(lines,margin+6,y);y+=lines.length*3.5+1;
        });y+=2;
      });y+=5;
    });
  }else{
    doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...muted);doc.text("Roadmap data not available. Run a new audit to generate.",margin,y);y+=8;
  }

  // ── FOOTER ON EVERY PAGE ──
  const pageCount=doc.internal.getNumberOfPages();
  for(let i=1;i<=pageCount;i++){
    doc.setPage(i);doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(...muted);
    doc.text("EnterRank Audit Report \u2014 "+brand+" \u2014 "+date,margin,H-8);
    doc.text("Page "+i+" of "+pageCount,W-margin,H-8,{align:"right"});
  }
  doc.save(brand.replace(/\s+/g,"_")+"_Audit_"+new Date().toISOString().split("T")[0]+".pdf");
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
      return{...e,score:ae.score||0,mentionRate:ae.mentionRate||0,citationRate:ae.citationRate||0,queries:(ae.queries||[]).map(q=>({query:q.query||"",status:q.status||"Absent"})),strengths:fB(ae.strengths,[`${cd.brand} appears in some ${cd.industry} queries`]),weaknesses:fB(ae.weaknesses,[`Competitors cited more frequently`])};}
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
  const sentimentSignals=(hasApi&&apiData.sentimentSignals)?apiData.sentimentSignals:{positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]};
  const brandCrawl=(hasApi&&apiData.brandCrawlData)?apiData.brandCrawlData:null;
  const compCrawlData=(hasApi&&apiData.compCrawlData)?apiData.compCrawlData:{};
  const searchQueries=(hasApi&&apiData.searchQueries)?apiData.searchQueries:[];
  return{overall,scoreLabel:getScoreLabel(overall),scoreDesc:getScoreDesc(overall,cd.brand),engines,painPoints,competitors,stakeholders,funnelStages,aeoChannels,brandGuidelines,contentTypes,roadmap,outputReqs,sentiment,sentimentSignals,brandCrawl,compCrawlData,searchQueries,clientData:cd};
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
  {group:"Analysis",items:[
    {id:"dashboard",label:"Dashboard",icon:"grid"},
    {id:"archetypes",label:"User Archetypes",icon:"users"},
    {id:"sentiment",label:"Sentiment",icon:"heart"},
    {id:"intent",label:"Intent Pathway",icon:"route"},
  ]},
  {group:"Strategy",items:[
    {id:"channels",label:"Target Channels",icon:"broadcast"},
    {id:"roadmap",label:"90-Day Roadmap",icon:"calendar"},
  ]},
  {group:"Creation",items:[
    {id:"playbook",label:"Brand Playbook",icon:"book"},
    {id:"contenthub",label:"Content Hub",icon:"filetext"},
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
    heart:<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/></>,
    activity:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    filetext:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.5" fill="none"/><polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5" fill="none"/><line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="1.5"/><line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="1.5"/><line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="1.5"/></>};
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
            {!collapsed&&item.comingSoon&&<span style={{fontSize:9,background:"#f1f1f1",color:"#999",padding:"2px 6px",borderRadius:4,marginLeft:6,fontWeight:500}}>Soon</span>}
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

/* ─── AUDIT LOADING SCREEN ─── */
function AuditLoadingScreen({progress,statusMessage,C}){
  const progressStages=[
    {min:0,max:8,msg:"Initializing audit engine..."},
    {min:8,max:15,msg:"Generating search queries..."},
    {min:15,max:25,msg:"Scanning search landscape..."},
    {min:25,max:35,msg:"Querying AI platforms..."},
    {min:35,max:45,msg:"Analyzing brand signals..."},
    {min:45,max:52,msg:"Detecting citation patterns..."},
    {min:52,max:58,msg:"Processing visibility data..."},
    {min:58,max:62,msg:"Evaluating content signals..."},
    {min:62,max:66,msg:"Extracting sentiment signals..."},
    {min:66,max:70,msg:"Assessing competitor landscape..."},
    {min:70,max:76,msg:"Mapping competitor presence..."},
    {min:76,max:82,msg:"Scanning channel coverage..."},
    {min:82,max:87,msg:"Building audience profiles..."},
    {min:87,max:92,msg:"Compiling recommendations..."},
    {min:92,max:96,msg:"Generating roadmap..."},
    {min:96,max:100,msg:"Finalizing report..."}
  ];
  const currentStage=progressStages.find(s=>progress>=s.min&&progress<s.max)||progressStages[progressStages.length-1];
  const[smoothProgress,setSmoothProgress]=useState(0);
  React.useEffect(()=>{
    const target=Math.max(progress,0);
    const interval=setInterval(()=>{
      setSmoothProgress(prev=>{
        if(prev>=target)return target;
        return prev+Math.max(0.3,(target-prev)*0.08);
      });
    },50);
    return()=>clearInterval(interval);
  },[progress]);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",gap:32}}>
      <div style={{position:"relative",width:80,height:80}}>
        <div style={{position:"absolute",inset:0,border:"2px solid #e5e7eb",borderTopColor:C.accent,borderRadius:"50%",animation:"spin 2s linear infinite"}}/>
        <div style={{position:"absolute",inset:12,border:"2px solid #e5e7eb",borderBottomColor:C.accent,borderRadius:"50%",animation:"spin 1.5s linear infinite reverse"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:600,color:"#111827"}}>{Math.round(smoothProgress)}%</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:6,minHeight:20,minWidth:250}}>{currentStage.msg}</div>
        <div style={{fontSize:12,color:"#9ca3af"}}>Audit incoming. This usually takes 5-6 minutes.</div>
      </div>
      <div style={{width:280,height:3,background:"#e5e7eb",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",background:C.accent,borderRadius:2,width:smoothProgress+"%",transition:"width 0.3s ease"}}/>
      </div>
    </div>
  );
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
  const[autoFilling,setAutoFilling]=useState(false);
  const[autoFilled,setAutoFilled]=useState(false);
  const[generatingTopics,setGeneratingTopics]=useState(false);
  const[topicsAutoFilled,setTopicsAutoFilled]=useState(false);

  const generateTopicsFromIndustry=async(industry,region,competitorNames)=>{
    if(!industry||industry.trim().length<2)return;
    setGeneratingTopics(true);
    try{
      const compNamesStr=(competitorNames||[]).filter(n=>n&&n.trim().length>1).map(n=>n.trim()).join(", ");
      const prompt=`Generate exactly 5 search queries that someone would type into ChatGPT or Gemini when they are ACTIVELY LOOKING TO BUY or CHOOSE a product/service in the ${industry} industry in ${region||"Global"}.

These are people who ALREADY KNOW they want this type of product. They are comparing options, checking prices, reading reviews, or deciding which one to buy. They have NOT chosen a brand yet.

Generate queries for these 5 specific angles:
1. COMPARISON: "Compare the top [products] by [2-3 specific features like price, battery life, flavors, quality]"
2. BEST-OF: "What are the best [products] for [specific use case] in ${region||"Global"}?"
3. WHERE TO BUY: "Where to buy authentic [products] online in ${region||"Global"}?" or "Who offers the best deals on [products] in [city in ${region||"Global"}]?"
4. BEGINNER: "What is the best [product] for someone who is new to [category] in ${region||"Global"}?"
5. FEATURE-SPECIFIC: "Which [products] offer the best [specific feature like flavor variety, device reliability, value for money] in ${region||"Global"}?"

${compNamesStr?"Do NOT mention these names: "+compNamesStr:""}
Do NOT include any brand or company names.
Use the specific product category terminology (e.g. "heated tobacco devices" not "tobacco industry products").
All queries must be in English.
Each query should be 12-25 words.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5"]}`;
      const raw=await callOpenAI4o(prompt,"You generate purchase-intent search queries for people actively shopping for a product. Every query must be from a buyer comparing options. Never include any brand or company names. Return ONLY valid JSON.");
      const result=safeJSON(raw);
      if(result&&result.topics&&Array.isArray(result.topics)){
        const validTopics=result.topics.filter(t=>typeof t==="string"&&t.trim().length>15).map(t=>t.trim()).slice(0,5);
        if(validTopics.length>0){
          setData(prev=>{
            const hasExisting=(prev.topics||[]).some(t=>(typeof t==="string"?t:"").trim().length>3);
            if(!hasExisting)return{...prev,topics:validTopics};
            return prev;
          });
          setTopicsAutoFilled(true);
        }
      }
    }catch(e){console.error("Topic generation failed:",e);}
    setGeneratingTopics(false);
  };

  const autoFillFromBrand=async(brandName)=>{
    if(!brandName||brandName.trim().length<2||autoFilling)return;
    setAutoFilling(true);
    try{
      const prompt=`I need information about the company or brand called "${brandName.trim()}".\n\nReturn JSON only:\n{\n  "website": "https://example.com",\n  "industry": "the primary industry (1-3 words, e.g. Telecommunications, SaaS, E-commerce)",\n  "region": "primary operating region (e.g. Malaysia, United States, Global, Southeast Asia)",\n  "competitors": [\n    {"name": "Competitor 1", "website": "https://competitor1.com"},\n    {"name": "Competitor 2", "website": "https://competitor2.com"},\n    {"name": "Competitor 3", "website": "https://competitor3.com"}\n  ]\n}\n\nRules:\n- Website must be the MAIN company website, not Wikipedia or social\n- Return the top 3 direct competitors that actively compete with this brand in their primary operating region. Competitors must actually operate and be available in that region — do not list globally known brands that have no presence in the brand's market\n- All output must be in English. Do not translate to local languages\n- If unsure about the brand, make your best guess based on the name`;
      const raw=await callGemini(prompt,"You are a business intelligence assistant. Return ONLY valid JSON, no markdown fences.");
      const result=safeJSON(raw);
      if(result){
        let didFill=false;
        let filledIndustry="";let filledRegion="";let filledCompNames=[];
        setData(prev=>{
          const updates={};
          if(!prev.website||!prev.website.trim())updates.website=normalizeUrl(result.website||"");
          if(!prev.industry||!prev.industry.trim())updates.industry=result.industry||"";
          if(!prev.region||!prev.region.trim())updates.region=result.region||"";
          const hasComps=(prev.competitors||[]).some(c=>c.name&&c.name.trim());
          if(!hasComps&&result.competitors&&Array.isArray(result.competitors)){
            updates.competitors=result.competitors.filter(c=>c.name&&c.name.toLowerCase()!==brandName.trim().toLowerCase()).slice(0,3).map(c=>({name:c.name||"",website:normalizeUrl(c.website||"")}));
          }
          if(Object.keys(updates).length>0){didFill=true;filledIndustry=updates.industry||prev.industry||"";filledRegion=updates.region||prev.region||"";filledCompNames=(updates.competitors||prev.competitors||[]).map(c=>c.name).filter(Boolean);return{...prev,...updates};}
          return prev;
        });
        if(didFill){
          setAutoFilled(true);
          // Generate topics separately — brand name is NOT passed to the AI
          const topicIndustry=filledIndustry||result.industry||"";
          const topicRegion=filledRegion||result.region||"";
          const topicCompNames=(result.competitors||[]).map(c=>c.name).filter(Boolean);
          if(topicIndustry)setTimeout(()=>generateTopicsFromIndustry(topicIndustry,topicRegion,topicCompNames),100);
        }
      }
    }catch(e){console.error("Auto-fill failed:",e);}
    setAutoFilling(false);
  };

  // Generate topics via gpt-4o — NO brand name passed to AI
  const generateTopics=async()=>{
    setGenTopics(true);setError(null);
    const nw=normalizeUrl(data.website);const nc=(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}));
    if(nw!==data.website||JSON.stringify(nc)!==JSON.stringify(data.competitors))setData(d=>({...d,website:nw,competitors:nc}));
    try{
      const compNamesStr=nc.filter(c=>c.name&&c.name.trim().length>1).map(c=>c.name.trim()).join(", ");
      const prompt=`Generate exactly 5 search queries that someone would type into ChatGPT or Gemini when they are ACTIVELY LOOKING TO BUY or CHOOSE a product/service in the ${data.industry||"Technology"} industry in ${data.region||"Global"}.

These are people who ALREADY KNOW they want this type of product. They are comparing options, checking prices, reading reviews, or deciding which one to buy. They have NOT chosen a brand yet.

Generate queries for these 5 specific angles:
1. COMPARISON: "Compare the top [products] by [2-3 specific features like price, battery life, flavors, quality]"
2. BEST-OF: "What are the best [products] for [specific use case] in ${data.region||"Global"}?"
3. WHERE TO BUY: "Where to buy authentic [products] online in ${data.region||"Global"}?" or "Who offers the best deals on [products] in [city in ${data.region||"Global"}]?"
4. BEGINNER: "What is the best [product] for someone who is new to [category] in ${data.region||"Global"}?"
5. FEATURE-SPECIFIC: "Which [products] offer the best [specific feature like flavor variety, device reliability, value for money] in ${data.region||"Global"}?"

${compNamesStr?"Do NOT mention these names: "+compNamesStr:""}
Do NOT include any brand or company names.
Use the specific product category terminology (e.g. "heated tobacco devices" not "tobacco industry products").
All queries must be in English.
Each query should be 12-25 words.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5"]}`;
      const raw=await callOpenAI4o(prompt,"You generate purchase-intent search queries for people actively shopping for a product. Every query must be from a buyer comparing options. Never include any brand or company names. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      const topics=parsed&&parsed.topics?parsed.topics:Array.isArray(parsed)?parsed:null;
      if(topics&&Array.isArray(topics)&&topics.length>0){
        setData(d=>({...d,topics:topics.filter(t=>typeof t==="string"&&t.trim().length>15).map(t=>t.trim()).slice(0,5)}));
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
      const existing=data.topics.join("; ");
      const compNamesStr=(data.competitors||[]).filter(c=>c.name&&c.name.trim().length>1).map(c=>c.name.trim()).join(", ");
      const prompt=`Generate exactly 5 search queries that someone would type into ChatGPT or Gemini when they are ACTIVELY LOOKING TO BUY or CHOOSE a product/service in the ${data.industry||"Technology"} industry in ${data.region||"Global"}.

These are people who ALREADY KNOW they want this type of product. They are comparing options, checking prices, reading reviews, or deciding which one to buy. They have NOT chosen a brand yet.

I already have these queries (do NOT duplicate them): ${existing}

Generate queries for these 5 specific angles:
1. COMPARISON: "Compare the top [products] by [2-3 specific features like price, battery life, flavors, quality]"
2. BEST-OF: "What are the best [products] for [specific use case] in ${data.region||"Global"}?"
3. WHERE TO BUY: "Where to buy authentic [products] online in ${data.region||"Global"}?" or "Who offers the best deals on [products] in [city in ${data.region||"Global"}]?"
4. BEGINNER: "What is the best [product] for someone who is new to [category] in ${data.region||"Global"}?"
5. FEATURE-SPECIFIC: "Which [products] offer the best [specific feature like flavor variety, device reliability, value for money] in ${data.region||"Global"}?"

${compNamesStr?"Do NOT mention these names: "+compNamesStr:""}
Do NOT include any brand or company names.
Use the specific product category terminology (e.g. "heated tobacco devices" not "tobacco industry products").
All queries must be in English.
Each query should be 12-25 words.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5"]}`;
      const raw=await callOpenAI4o(prompt,"You generate purchase-intent search queries for people actively shopping for a product. Every query must be from a buyer comparing options. Never include any brand or company names. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      const newTopics=parsed&&parsed.topics?parsed.topics:Array.isArray(parsed)?parsed:null;
      if(newTopics&&Array.isArray(newTopics)&&newTopics.length>0){
        const cleaned=newTopics.filter(t=>typeof t==="string"&&t.trim().length>15).map(t=>t.trim()).slice(0,5);
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


  const startSmooth=()=>{
    displayRef.current=0;targetRef.current=0;
    // Smooth tick every 80ms
    intervalRef.current=setInterval(()=>{
      const target=targetRef.current;
      const current=displayRef.current;
      if(current<target){
        const gap=target-current;
        const step=Math.max(0.15, gap*0.08);
        displayRef.current=Math.min(target, current+step);
      }else if(current<95&&target>0){
        const nextTarget=Math.min(target+3, 99);
        displayRef.current=Math.min(nextTarget, current+0.05);
      }
      setDisplayProgress(Math.round(displayRef.current));
    },80);
  };
  const stopSmooth=()=>{if(intervalRef.current){clearInterval(intervalRef.current);intervalRef.current=null;}};

  const go=async()=>{
    // Normalize all URLs before running
    const normalizedData={...data,website:normalizeUrl(data.website),competitors:(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}))};
    setData(normalizedData);
    setRunning(true);setError(null);setDisplayProgress(0);
    targetRef.current=0;displayRef.current=0;
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
      console.error("Audit error:",e);setError("API call failed — falling back to simulated data.");
      targetRef.current=100;
      await new Promise(r=>setTimeout(r,1500));
      stopSmooth();setRunning(false);onRun(null);
    }
  };

  // Cleanup on unmount
  React.useEffect(()=>()=>{stopSmooth();},[]);

  const progress=displayProgress;
  if(running)return(<AuditLoadingScreen progress={progress} C={C}/>);

  /* ─── STEP 2: Topics Review ─── */
  if(auditStep==="topics")return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}>
      <h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Review Topics for {data.brand}</h2>
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
      {/* Topic loading indicator */}
      {generatingTopics&&(<div style={{display:"flex",alignItems:"center",gap:6,padding:"12px 14px",background:C.accent+"06",borderRadius:10,marginBottom:8,fontSize:11,color:C.accent}}>
        <div style={{width:12,height:12,border:"2px solid "+C.accent,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
        Generating relevant search queries for {data.industry||"your industry"}...
      </div>)}
      {/* Topic list */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {data.topics.map((topic,i)=>{const topicLower=topic.toLowerCase();const topicContainsBrand=data.brand&&data.brand.trim().length>1&&topicLower.includes(data.brand.trim().toLowerCase());const topicContainsComp=(data.competitors||[]).some(c=>c.name&&c.name.trim().length>1&&topicLower.includes(c.name.trim().toLowerCase()));const hasWarning=topicContainsBrand||topicContainsComp;return(<div key={i}><div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:hasWarning?"#fef2f2":C.bg,borderRadius:8,border:`1px solid ${hasWarning?"#fecaca":C.borderSoft}`}}>
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
        </div>{hasWarning&&(<div style={{fontSize:10,color:"#dc2626",marginTop:2,paddingLeft:24,marginBottom:2}}>{topicContainsBrand?"This topic contains your brand name":"This topic contains a competitor name"} — results may be inflated. Consider rephrasing as a generic query.</div>)}</div>);})}
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
      <button onClick={regenerateTopics} disabled={genTopics||generatingTopics||data.topics.length>=10} style={{width:"100%",padding:"10px 16px",background:"none",border:`1px dashed ${C.accent}40`,borderRadius:8,fontSize:12,fontWeight:600,color:data.topics.length>=10?C.muted:C.accent,cursor:genTopics||generatingTopics||data.topics.length>=10?"not-allowed":"pointer",fontFamily:"'Outfit'",marginBottom:8,opacity:genTopics||generatingTopics||data.topics.length>=10?.5:1}}>
        {genTopics?"Generating more topics...":data.topics.length>=10?"Maximum 10 topics":"+ Generate More Topics"}
      </button>
      {data.topics.length>0&&!genTopics&&!generatingTopics&&(
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
          <span onClick={()=>{setData(d=>({...d,topics:[]}));setTopicsAutoFilled(false);const compNamesArr=(data.competitors||[]).map(c=>typeof c==="string"?c:c?.name||"").filter(Boolean);generateTopicsFromIndustry(data.industry,data.region,compNamesArr);}} style={{fontSize:11,color:C.accent,cursor:"pointer",textDecoration:"underline"}}>{"\u21BB"} Regenerate all topics</span>
        </div>
      )}

      <div style={{paddingTop:16,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setAuditStep("input")} style={{padding:"8px 16px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.sub,cursor:"pointer",fontFamily:"'Outfit'"}}>← Back to Details</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,color:C.muted}}>{data.topics.length} topics</span>
          <button onClick={go} disabled={!topicsOk} style={{padding:"10px 24px",background:topicsOk?C.accent:"#dde1e7",color:topicsOk?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:topicsOk?"pointer":"not-allowed",fontFamily:"'Outfit'"}}>Run Audit →</button>
        </div>
      </div>
    </Card>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
  </div>);

  /* ─── STEP 1: Client Details Input ─── */
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>{data.brand?"Configure Audit":"New Audit"}</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>{data.brand?`${history.length>0?"Run another":"Set up"} audit for ${data.brand}.`:"Enter client details to begin."}</p></div>
    {autoFilled&&(
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:10,marginBottom:16,fontSize:12,color:C.accent}}>
        <span style={{fontSize:14}}>✦</span>
        <span>Fields auto-filled based on brand detection. Review and edit before running the audit.</span>
        <span onClick={()=>setAutoFilled(false)} style={{marginLeft:"auto",cursor:"pointer",opacity:.6,fontSize:14}}>✕</span>
      </div>
    )}
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <Field label="Brand Name" value={data.brand} onChange={v=>{setData({...data,brand:v});if(autoFilled)setAutoFilled(false);if(topicsAutoFilled){setTopicsAutoFilled(false);setData(d=>({...d,topics:[]}));}}} placeholder="Acme Corp" onBlur={e=>{const val=e.target.value.trim();if(val.length>=2&&!autoFilled)autoFillFromBrand(val);}}/>
        {autoFilling&&(
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.accent}}>
            <div style={{width:12,height:12,border:`2px solid ${C.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
            Scanning brand details...
          </div>
        )}
        {generatingTopics&&!autoFilling&&(
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.accent}}>
            <div style={{width:12,height:12,border:`2px solid ${C.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
            Generating search topics...
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
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
      <div>
        <div style={{fontSize:22,fontWeight:600,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text}}>Hello, Aris</div>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>Dashboard for {r.clientData.brand}</div>
      </div>
      <button onClick={()=>exportPDF(r)} style={{padding:"8px 16px",fontSize:12,fontWeight:500,background:C.accent,color:"#fff",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Outfit'",whiteSpace:"nowrap"}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        Export PDF
      </button>
    </div>

    {r._auditError&&<div style={{padding:"16px 20px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:18}}>&#9888;</span>
      <div><div style={{fontSize:13,fontWeight:500,color:"#991b1b"}}>Audit completed with errors</div><div style={{fontSize:12,color:"#b91c1c",marginTop:2}}>{r._auditError} Some sections may show limited data.</div></div>
    </div>}

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
    <div style={{marginBottom:48}}>
      <div style={{fontSize:18,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text,marginBottom:4}}>Historical Performance</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Track {r.clientData.brand}'s AI visibility over time</div>

      {(()=>{
        const rawData=(history||[]).filter(h=>h.overall!=null&&h.overall>0).map(h=>({
          date:(typeof h.date==="string"?h.date:new Date(h.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})).replace(/\s\d{4}$/,""),
          fullDate:typeof h.date==="string"?h.date:new Date(h.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),
          overall:h.overall||0,
          mentions:h.mentions||0,
          citations:h.citations||0,
          _ts:typeof h.date==="string"?new Date(h.date).getTime():new Date(h.date).getTime()
        }));
        const dayMap=new Map();
        rawData.forEach(d=>{const key=d.date;if(!dayMap.has(key)||d._ts>dayMap.get(key)._ts)dayMap.set(key,d);});
        const chartData=[...dayMap.values()].map(({_ts,...rest})=>rest);

        if(chartData.length<2)return(
          <div style={{padding:32,background:C.card,border:"1px solid "+C.border,borderRadius:14,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:8}}>&#x1F4CA;</div>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>Not enough data yet</div>
            <div style={{fontSize:12,color:C.muted}}>Run at least 2 audits to see historical trends. Each audit is saved automatically.</div>
          </div>
        );

        const W=700,H=250,padL=40,padR=20,padT=10,padB=30;
        const plotW=W-padL-padR,plotH=H-padT-padB;
        const maxVal=100,n=chartData.length;
        const getX=(i)=>padL+(i/(n-1))*plotW;
        const getY=(val)=>padT+plotH-(val/maxVal)*plotH;
        const makePath=(key)=>chartData.map((d,i)=>`${i===0?"M":"L"}${getX(i).toFixed(1)},${getY(d[key]).toFixed(1)}`).join(" ");
        const lines=[{key:"overall",color:C.accent,width:2.5},{key:"mentions",color:"#22c55e",width:1.5},{key:"citations",color:"#f59e0b",width:1.5}];
        const yTicks=[0,25,50,75,100];
        const first=chartData[0],last=chartData[chartData.length-1];
        const delta=last.overall-first.overall;

        return(
          <div style={{padding:24,background:C.card,border:"1px solid "+C.border,borderRadius:14}}>
            {/* Legend */}
            <div style={{display:"flex",gap:20,marginBottom:20,fontSize:12}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:C.accent}}/><span style={{color:C.muted}}>Overall Score</span></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:"#22c55e"}}/><span style={{color:C.muted}}>Mention Rate</span></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:"#f59e0b"}}/><span style={{color:C.muted}}>Citation Rate</span></div>
            </div>

            {/* SVG Chart */}
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",overflow:"visible"}}>
              {yTicks.map(tick=><g key={tick}><line x1={padL} x2={W-padR} y1={getY(tick)} y2={getY(tick)} stroke={C.border} strokeWidth={1} strokeDasharray={tick===0?"none":"4,4"}/><text x={padL-8} y={getY(tick)+4} textAnchor="end" fontSize={10} fill={C.muted}>{tick}%</text></g>)}
              {lines.map(line=><path key={line.key} d={makePath(line.key)} fill="none" stroke={line.color} strokeWidth={line.width} strokeLinecap="round" strokeLinejoin="round"/>)}
              {lines.map(line=>chartData.map((d,i)=><circle key={`${line.key}-${i}`} cx={getX(i)} cy={getY(d[line.key])} r={3} fill={line.color} stroke="#fff" strokeWidth={1.5}><title>{line.key}: {d[line.key]}% — {d.fullDate}</title></circle>))}
              {chartData.map((d,i)=><text key={i} x={getX(i)} y={H-5} textAnchor="middle" fontSize={10} fill={C.muted}>{d.date}</text>)}
              {lines.map(line=><text key={`lbl-${line.key}`} x={getX(n-1)+8} y={getY(last[line.key])+4} fontSize={10} fontWeight={500} fill={line.color}>{last[line.key]}%</text>)}
            </svg>

            {/* Delta summary */}
            <div style={{marginTop:16,padding:"12px 16px",background:delta>=0?"rgba(220,252,231,0.06)":"rgba(254,226,226,0.06)",borderRadius:10,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>{delta>=0?"\u{1F4C8}":"\u{1F4C9}"}</span>
              <span style={{fontSize:13,color:C.text}}>
                Overall score {delta>=0?"improved":"decreased"} by <span style={{fontWeight:600,color:delta>=0?"#166534":"#991b1b"}}>{Math.abs(delta)}%</span> since first audit
                <span style={{color:C.muted}}> ({first.fullDate} → {last.fullDate})</span>
              </span>
            </div>
          </div>
        );
      })()}
    </div>

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
          name:c.name,website:((r.clientData.competitors||[]).find(cc=>cc.name.toLowerCase()===c.name.toLowerCase()))?.website||"",sentimentScore:c.avg||50,
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

                  {/* Technical Signals comparison */}
                  {(()=>{
                    const brandD=r.brandCrawl;
                    const compD=r.compCrawlData?.[comp.name]||null;
                    if(!brandD&&!compD)return null;
                    const weightColor={Critical:C.red,High:C.amber,Medium:C.accent,Low:C.muted};
                    return(
                      <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.borderSoft}`}}>
                        <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:10}}>Technical Signals</div>
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
function ArchetypesPage({r,goTo,onUpdate}){
  const[selGroup,setSelGroup]=useState(0);
  const[selArch,setSelArch]=useState(null);
  const[regenArch,setRegenArch]=useState(false);
  const regenerateArchetypes=async()=>{
    setRegenArch(true);
    try{
      const brand=r.clientData?.brand||"Brand",industry=r.clientData?.industry||"Technology",region=r.clientData?.region||"Global",topics=(r.clientData?.topics||[]).join(", ");
      const prompt=`For "${brand}" in ${industry} (${region}), topics: ${topics}.
Generate 2-3 stakeholder groups with 2-3 archetypes each. Each archetype needs a 4-stage customer journey with 2-3 prompts per stage.
Return JSON:
{"stakeholders":[{"group":"<name>","icon":"<emoji>","desc":"<1 sentence>","archetypes":[{"name":"<name>","icon":"<emoji>","demo":"<demographics>","behavior":"<search behavior>","intent":"<intent>","size":25,"brandVisibility":30,"opportunity":"medium","prompts":["p1","p2"],"journey":[{"stage":"Awareness","color":"#6366f1","prompts":[{"query":"<prompt>","status":"Absent","engines":{"gpt":"Absent","gemini":"Absent"}}]},{"stage":"Consideration","color":"#8b5cf6","prompts":[...]},{"stage":"Transaction","color":"#ec4899","prompts":[...]},{"stage":"Retention","color":"#f59e0b","prompts":[...]}]}]}]}
Return JSON only.`;
      const raw=await callOpenAI(prompt,"You are an AEO analyst. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      if(parsed?.stakeholders?.length>0&&onUpdate)onUpdate(prev=>({...prev,stakeholders:parsed.stakeholders}));
    }catch(e){console.error("Archetype regeneration failed:",e);}
    setRegenArch(false);
  };
  if(!r.stakeholders||r.stakeholders.length===0)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>User Archetypes</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:28,marginBottom:8}}>👥</div>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Archetypes not generated</div>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
      <button onClick={regenerateArchetypes} disabled={regenArch} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenArch?"#e5e7eb":C.accent,color:regenArch?"#999":"#fff",border:"none",borderRadius:8,cursor:regenArch?"default":"pointer",fontFamily:"'Outfit'"}}>{regenArch?"Generating...":"Generate Archetypes"}</button>
    </div>
  </div>);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>User Archetypes</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Who is searching — grouped by stakeholder type</p></div>
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
  </div>);
}

/* ─── PAGE: INTENT PATHWAY ─── */
function IntentPage({r,goTo}){
  const[testQuery,setTestQuery]=useState("");
  const[testingPrompt,setTestingPrompt]=useState(false);
  const[testResults,setTestResults]=useState(null);
  const[testedPrompts,setTestedPrompts]=useState([]);

  // Build combined query data from engines
  const gptQueries=r.engines[0]?.queries||[];
  const gemQueries=r.engines[1]?.queries||[];
  const allSearchQueries=r.searchQueries||gptQueries.map(q=>q.query);

  const normalizeStatus=(s)=>{if(!s)return"Absent";const l=s.trim().toLowerCase();if(l==="cited")return"Cited";if(l==="mentioned")return"Mentioned";return"Absent";};
  const combinedQueries=allSearchQueries.map((query,i)=>{
    const qText=typeof query==="string"?query:query.query;
    const gptMatch=gptQueries.find(q=>q.query===qText)||gptQueries[i];
    const gemMatch=gemQueries.find(q=>q.query===qText)||gemQueries[i];
    return{query:qText,gptStatus:normalizeStatus(gptMatch?.status),gemStatus:normalizeStatus(gemMatch?.status)};
  });

  // Status badge helper
  const statusBadge=(status)=>{
    const bg=status==="Cited"?"#dcfce7":status==="Mentioned"?"#dbeafe":"#fee2e2";
    const cl=status==="Cited"?"#166534":status==="Mentioned"?"#1e40af":"#991b1b";
    const icon=status==="Cited"?"\u2713":status==="Mentioned"?"~":"\u2717";
    return <span style={{fontSize:11,fontWeight:500,padding:"4px 10px",borderRadius:6,display:"inline-block",background:bg,color:cl}}>{icon} {status}</span>;
  };

  // Overall stats
  let totalCited=0,totalMentionedOnly=0,totalAbsent=0;
  combinedQueries.forEach(q=>{
    const gs=(q.gptStatus||"").toLowerCase(),gm=(q.gemStatus||"").toLowerCase();
    if(gs==="cited"||gm==="cited")totalCited++;
    else if(gs==="mentioned"||gm==="mentioned")totalMentionedOnly++;
    else totalAbsent++;
  });

  // Brand classification helper (mirrors runRealAudit's classifyResponse)
  function classifyText(responseText,brandName,website,citationUrls){
    if(!responseText||responseText.length<20)return "Absent";
    const escaped=brandName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const nameRegex=new RegExp('\\b'+escaped+'\\b','i');
    let domain="";
    if(website){try{domain=new URL(website.startsWith("http")?website:"https://"+website).hostname.replace("www.","");}catch(e){}}
    const nameFound=nameRegex.test(responseText);
    const urlCited=domain&&citationUrls&&citationUrls.length>0&&citationUrls.some(c=>(c.url||"").toLowerCase().includes(domain.toLowerCase()));
    const textUrlFound=domain&&responseText.toLowerCase().includes(domain.toLowerCase());
    if(!nameFound&&!urlCited&&!textUrlFound)return "Absent";
    if(urlCited||textUrlFound)return "Cited";
    const bn=escaped;
    const numListMatch=responseText.match(/(?:^|\n)\s*1[\.\)]\s*\*?\*?([^\n]{5,100})/m);
    if(numListMatch&&nameRegex.test(numListMatch[1]))return "Cited";
    const citedPatterns=[
      new RegExp('(?:i\\s+)?(?:recommend|suggest|would\\s+recommend|highly\\s+recommend).*?'+bn,'i'),
      new RegExp(bn+'.*?(?:is\\s+(?:a\\s+)?(?:great|excellent|top|best|leading|strong|solid|reliable|popular|recommended))','i'),
      new RegExp('(?:the\\s+)?(?:best|top|leading|most\\s+popular|number\\s+one|#1).*?'+bn,'i'),
      new RegExp(bn+'.*?(?:offers?|provides?|features?|starts?\\s+at|\\d+\\.\\d+%|\\$\\d|AED|USD|RM|EUR|GBP)','i'),
      new RegExp('(?:^|\\n)\\s*(?:\\d+\\.\\s*)?\\*?\\*?'+bn+'\\*?\\*?\\s*(?:\\(|\u2014|:|\\n)','im'),
    ];
    if(citedPatterns.some(p=>p.test(responseText)))return "Cited";
    return "Mentioned";
  }

  // Test a Prompt handler
  async function handleTestPrompt(){
    if(!testQuery.trim()||testingPrompt)return;
    setTestingPrompt(true);
    setTestResults(null);
    const query=testQuery.trim();
    const brand=r.clientData.brand;
    const website=r.clientData.website;
    const region=r.clientData.region;
    try{
      const[gptResult,gemResult]=await Promise.all([
        callOpenAISearch(query,region),
        callGemini(query,"You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them.")
      ]);
      const gptText=gptResult?.text||gptResult||"";
      const gemText=gemResult||"";
      const gptClass=classifyText(gptText,brand,website,gptResult?.citations||[]);
      const gemClass=classifyText(gemText,brand,website,[]);
      const result={
        gpt:gptClass,
        gem:gemClass,
        gptSnippet:(typeof gptText==="string"?gptText:"").slice(0,300),
        gemSnippet:(typeof gemText==="string"?gemText:"").slice(0,300)
      };
      setTestResults(result);
      setTestedPrompts(prev=>[{query,...result},...prev].slice(0,10));
      setTestQuery("");
    }catch(e){
      console.error("Test prompt failed:",e);
      setTestResults({gpt:"Error",gem:"Error",gptSnippet:"API call failed",gemSnippet:"API call failed"});
    }
    setTestingPrompt(false);
  }

  return(<div>
    {/* Header */}
    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Intent Pathway</h2>
      <p style={{color:C.muted,fontSize:13,marginTop:4}}>Audit query results across ChatGPT and Gemini for {r.clientData.brand}</p>
    </div>

    {/* Overall summary */}
    <div style={{padding:"20px 24px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,marginBottom:32,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div>
        <div style={{fontSize:14,fontWeight:500,color:C.text,fontFamily:"'Outfit'"}}>Query Visibility Summary</div>
        <div style={{fontSize:12,color:C.muted,marginTop:2}}>{combinedQueries.length} prompts tested across both engines</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <span style={{fontSize:12,fontWeight:500,padding:"5px 12px",borderRadius:8,background:"#dcfce7",color:"#166534"}}>{totalCited} cited</span>
        <span style={{fontSize:12,fontWeight:500,padding:"5px 12px",borderRadius:8,background:"#dbeafe",color:"#1e40af"}}>{totalMentionedOnly} mentioned only</span>
        <span style={{fontSize:12,fontWeight:500,padding:"5px 12px",borderRadius:8,background:"#fee2e2",color:"#991b1b"}}>{totalAbsent} absent</span>
      </div>
    </div>

    {/* Audit Query Results — flat table */}
    <div style={{fontSize:14,fontWeight:500,marginBottom:16}}>Audit Query Results</div>

    {combinedQueries.length===0?<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:24,textAlign:"center",color:C.muted,fontSize:13}}>No query data available. Run an audit to see results.</div>
    :<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 110px 110px",padding:"12px 20px",borderBottom:"1px solid "+C.border,fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em"}}>
        <span>Query</span>
        <span style={{textAlign:"center"}}>ChatGPT</span>
        <span style={{textAlign:"center"}}>Gemini</span>
      </div>
      {combinedQueries.map((q,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 110px",padding:"14px 20px",alignItems:"center",borderBottom:i<combinedQueries.length-1?"1px solid "+C.border+"30":"none",background:i%2===0?"transparent":C.border+"10"}}>
        <span style={{fontSize:13,lineHeight:1.5,color:C.text,paddingRight:12}}>{q.query}</span>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.gptStatus)}</div>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.gemStatus)}</div>
      </div>))}
    </div>}

    {/* Section B: Test a Prompt */}
    <div style={{marginTop:40,padding:24,background:"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:15,fontWeight:500,fontFamily:"'Outfit'",letterSpacing:"-.02em",color:C.text,marginBottom:4}}>Test a Prompt</div>
      <p style={{fontSize:12,color:C.muted,marginBottom:16,marginTop:0}}>Type any search query to test whether {r.clientData.brand} gets cited or mentioned on ChatGPT and Gemini.</p>

      <div style={{display:"flex",gap:8}}>
        <input value={testQuery} onChange={e=>setTestQuery(e.target.value)}
          placeholder={`e.g. What are the best ${r.clientData.industry||"tech"} options in ${r.clientData.region||"my region"}?`}
          style={{flex:1,padding:"10px 14px",fontSize:13,border:`1px solid ${C.border}`,borderRadius:10,outline:"none",fontFamily:"inherit",color:C.text}}
          onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}
          onKeyDown={e=>e.key==="Enter"&&testQuery.trim()&&handleTestPrompt()}/>
        <button onClick={handleTestPrompt} disabled={!testQuery.trim()||testingPrompt}
          style={{padding:"10px 20px",fontSize:13,fontWeight:500,fontFamily:"'Outfit'",
            background:testQuery.trim()&&!testingPrompt?C.accent:"#e5e7eb",
            color:testQuery.trim()&&!testingPrompt?"#fff":"#999",
            border:"none",borderRadius:10,cursor:testQuery.trim()&&!testingPrompt?"pointer":"default",
            display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
          {testingPrompt?<><div style={{width:12,height:12,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>Testing...</>:"Test"}
        </button>
      </div>

      {/* Test results */}
      {testResults&&<div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{padding:14,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>ChatGPT (with web search)</div>
          {statusBadge(testResults.gpt)}
          {testResults.gptSnippet&&<p style={{fontSize:11,color:C.muted,lineHeight:1.5,maxHeight:100,overflow:"auto",margin:"8px 0 0"}}>{testResults.gptSnippet}</p>}
        </div>
        <div style={{padding:14,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Gemini</div>
          {statusBadge(testResults.gem)}
          {testResults.gemSnippet&&<p style={{fontSize:11,color:C.muted,lineHeight:1.5,maxHeight:100,overflow:"auto",margin:"8px 0 0"}}>{testResults.gemSnippet}</p>}
        </div>
      </div>}

      {/* History of tested prompts */}
      {testedPrompts.length>0&&<div style={{marginTop:16}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>Previously tested</div>
        {testedPrompts.map((tp,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 110px",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.border}30`,alignItems:"center"}}>
          <span style={{fontSize:12,color:C.text}}>{tp.query}</span>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.gpt)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.gem)}</div>
        </div>))}
      </div>}
    </div>
  </div>);
}

/* ─── PAGE: BRAND PLAYBOOK ─── */
function PlaybookPage({r,goTo,activeProject}){
  const TABS=[{id:"voice",label:"Brand Voice"},{id:"taglines",label:"Taglines"},{id:"visual",label:"Visual CI"},{id:"compliance",label:"Compliance"},{id:"products",label:"Products"},{id:"positioning",label:"Positioning"}];
  const[activeTab,setActiveTab]=useState("voice");
  const[loading,setLoading]=useState(false);
  const[saving,setSaving]=useState(false);
  const[saveStatus,setSaveStatus]=useState(null);
  const[playbook,setPlaybook]=useState({brand_voice:{tone:"",personality:"",dos:[],donts:[],examples:[]},taglines:{primary:"",supporting:[]},visual_ci:{primaryColor:"#2563eb",secondaryColor:"#10b981",accentColor:"#d97706",fonts:[],logoUrl:""},compliance:{restrictions:[],notes:""},products:[],positioning:[]});
  const[expandG,setExpandG]=useState(null);
  const[editProduct,setEditProduct]=useState(null);
  const[prodForm,setProdForm]=useState({name:"",description:"",features:[]});
  const[featureInput,setFeatureInput]=useState("");
  const[generating,setGenerating]=useState(false);

  const projectId=activeProject?.id||null;
  const brand=r?.clientData?.brand||"";
  const industry=r?.clientData?.industry||"";
  const region=r?.clientData?.region||"";
  const website=r?.clientData?.website||"";

  React.useEffect(()=>{
    if(!projectId)return;
    setLoading(true);
    sbLoadPlaybook(projectId).then(pb=>{
      if(pb){
        setPlaybook({
          brand_voice:pb.brand_voice||{tone:"",personality:"",dos:[],donts:[],examples:[]},
          taglines:pb.taglines||{primary:"",supporting:[]},
          visual_ci:pb.visual_ci||{primaryColor:"#2563eb",secondaryColor:"#10b981",accentColor:"#d97706",fonts:[],logoUrl:""},
          compliance:pb.compliance||{restrictions:[],notes:""},
          products:pb.products||[],
          positioning:pb.positioning||[]
        });
      }
      setLoading(false);
    });
  },[projectId]);

  const saveSection=async(section,value)=>{
    if(!projectId)return;
    setSaving(true);setSaveStatus(null);
    const res=await sbSavePlaybook(projectId,section,value);
    setSaving(false);
    if(res){setSaveStatus("saved");setTimeout(()=>setSaveStatus(null),2500);}
    else{setSaveStatus("error");setTimeout(()=>setSaveStatus(null),3000);}
  };

  const inputStyle={width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,color:C.text,outline:"none",fontFamily:"inherit"};
  const labelStyle={fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4};
  const saveBtn=(onClick)=>(<div style={{marginTop:14,display:"flex",alignItems:"center",gap:10,justifyContent:"flex-end"}}>
    {saveStatus==="saved"&&<span style={{fontSize:11,color:C.green,fontWeight:500}}>Saved</span>}
    {saveStatus==="error"&&<span style={{fontSize:11,color:C.red,fontWeight:500}}>Save failed</span>}
    <button onClick={onClick} disabled={saving} style={{padding:"8px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",opacity:saving?.6:1}}>{saving?"Saving...":"Save"}</button>
  </div>);

  const aiLink=(onClick)=>(<span onClick={generating?undefined:onClick} style={{fontSize:12,fontWeight:500,color:generating?C.muted:C.accent,cursor:generating?"default":"pointer",marginLeft:8,display:"inline-flex",alignItems:"center",gap:4}}>{generating?"Generating...":"✨ AI Generate"}</span>);

  const addToList=(section,field,value)=>{
    if(!value.trim())return;
    const updated={...playbook[section],[field]:[...(playbook[section][field]||[]),value.trim()]};
    setPlaybook({...playbook,[section]:updated});
  };
  const removeFromList=(section,field,idx)=>{
    const updated={...playbook[section],[field]:(playbook[section][field]||[]).filter((_,i)=>i!==idx)};
    setPlaybook({...playbook,[section]:updated});
  };

  const ListEditor=({section,field,label,placeholder,color})=>{
    const[inp,setInp]=useState("");
    const items=playbook[section]?.[field]||[];
    const c=color||C.accent;
    return(<div style={{marginBottom:10}}>
      <label style={labelStyle}>{label}</label>
      <div style={{display:"flex",gap:6,marginBottom:6}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} placeholder={placeholder} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addToList(section,field,inp);setInp("");}}} style={{...inputStyle,flex:1}}/>
        <button onClick={()=>{addToList(section,field,inp);setInp("");}} style={{padding:"8px 14px",background:`${c}10`,color:c,border:`1px solid ${c}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",whiteSpace:"nowrap"}}>+ Add</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {items.map((item,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 10px",background:`${c}08`,color:c,borderRadius:100,fontSize:11,fontWeight:500}}>{item}<span onClick={()=>removeFromList(section,field,i)} style={{cursor:"pointer",opacity:.6,fontSize:13,lineHeight:1}}>×</span></span>))}
      </div>
    </div>);
  };

  /* ── AI Generate handlers ── */
  const genVoice=async()=>{
    setGenerating(true);
    try{
      const prompt=`You are a brand strategist. Based on the following brand, generate a comprehensive brand voice guide.\n\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\nWebsite: ${website}\n\nGenerate a JSON object with:\n- tone: A 1-2 sentence description of the brand's tone of voice\n- personality: A 2-3 sentence description of the brand's personality as if it were a person\n- dos: An array of 5 things the brand should ALWAYS do in communications\n- donts: An array of 5 things the brand should NEVER do in communications\n- examples: An array of 3 example phrases that capture how the brand sounds\n\nReturn ONLY valid JSON, no markdown, no explanation.\n{"tone":"...","personality":"...","dos":["..."],"donts":["..."],"examples":["..."]}`;
      const result=await callGemini(prompt,"You are a brand strategist. Return ONLY valid JSON.");
      const parsed=safeJSON(result);
      if(parsed){setPlaybook(prev=>({...prev,brand_voice:{tone:parsed.tone||"",personality:parsed.personality||"",dos:parsed.dos||[],donts:parsed.donts||[],examples:parsed.examples||[]}}));}
    }catch(e){console.error("Voice generation failed:",e);}
    setGenerating(false);
  };

  const genTaglines=async()=>{
    setGenerating(true);
    try{
      const prompt=`You are a brand copywriter. Generate taglines and key messages for this brand.\n\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\n\nGenerate a JSON object with:\n- primary: One powerful primary tagline (5-10 words, memorable, captures the brand essence)\n- supporting: An array of 5 supporting messages / value propositions that reinforce the primary tagline. Each should be 1 sentence.\n\nReturn ONLY valid JSON, no markdown.\n{"primary":"...","supporting":["...","...","...","...","..."]}`;
      const result=await callGemini(prompt,"You are a brand copywriter. Return ONLY valid JSON.");
      const parsed=safeJSON(result);
      if(parsed){setPlaybook(prev=>({...prev,taglines:{primary:parsed.primary||"",supporting:parsed.supporting||[]}}));}
    }catch(e){console.error("Taglines generation failed:",e);}
    setGenerating(false);
  };

  const genVisual=async()=>{
    setGenerating(true);
    try{
      const prompt=`You are a brand designer. Based on the brand, suggest a visual identity color palette and typography.\n\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\nWebsite: ${website}\n\nGenerate a JSON object with:\n- primaryColor: A hex color code for the primary brand color (based on the brand's actual colors if known, otherwise appropriate for the industry)\n- secondaryColor: A hex color code for the secondary color\n- accentColor: A hex color code for the accent/highlight color\n- fonts: An array of 2-3 recommended font families (e.g. ["Inter", "Georgia", "SF Pro"])\n- logoUrl: Leave as empty string ""\n\nConsider the brand's industry, target audience, and regional preferences. If you know the brand's actual colors from their website, use those.\n\nReturn ONLY valid JSON, no markdown.\n{"primaryColor":"#...","secondaryColor":"#...","accentColor":"#...","fonts":["..."],"logoUrl":""}`;
      const result=await callGemini(prompt,"You are a brand designer. Return ONLY valid JSON.");
      const parsed=safeJSON(result);
      if(parsed){setPlaybook(prev=>({...prev,visual_ci:{primaryColor:parsed.primaryColor||"#000000",secondaryColor:parsed.secondaryColor||"#ffffff",accentColor:parsed.accentColor||"#2563eb",fonts:parsed.fonts||[],logoUrl:parsed.logoUrl||prev.visual_ci.logoUrl||""}}));}
    }catch(e){console.error("Visual CI generation failed:",e);}
    setGenerating(false);
  };

  const genCompliance=async()=>{
    setGenerating(true);
    try{
      const research=await callOpenAISearch(`${industry} advertising regulations ${region} current laws restrictions`,region);
      const researchText=(research&&research.text)?research.text:(typeof research==="string"?research:"");
      const prompt=`Based on this research about ${industry} advertising regulations in ${region}:\n\n${researchText.slice(0,3000)}\n\nGenerate a JSON object with:\n- restrictions: An array of 8-12 specific, actionable content restrictions for ${brand} in ${region}. Each should be a clear rule like "Never show product being consumed in advertising material" or "All content must include mandatory health warning text". Be SPECIFIC to the industry and region.\n- notes: A paragraph summarizing the key regulatory framework, naming specific laws/acts that apply, and any important nuances or exceptions.\n\nReturn ONLY valid JSON.\n{"restrictions":["..."],"notes":"..."}`;
      const result=await callOpenAI(prompt,"You are a regulatory compliance expert. Return ONLY valid JSON.");
      const parsed=safeJSON(result);
      if(parsed){setPlaybook(prev=>({...prev,compliance:{restrictions:parsed.restrictions||[],notes:parsed.notes||""}}));}
    }catch(e){console.error("Compliance generation failed:",e);}
    setGenerating(false);
  };

  const genPositioning=async()=>{
    setGenerating(true);
    try{
      const competitors=r?.clientData?.competitors||[];
      const compNames=competitors.map(c=>c.name||c).filter(Boolean);
      const prompt=`You are a competitive strategy consultant. Generate positioning statements for this brand against its competitors.\n\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\nCompetitors: ${compNames.join(", ")||"Unknown — suggest 3 likely competitors"}\n\nGenerate a JSON array of positioning statements, one per competitor. Each entry should have:\n- competitor: The competitor name\n- differentiator: One sentence explaining the brand's key advantage over this competitor\n- messaging: A 1-2 sentence messaging framework for how to position against this competitor in content\n\nReturn ONLY valid JSON array, no markdown.\n[{"competitor":"...","differentiator":"...","messaging":"..."}]`;
      const result=await callGemini(prompt,"You are a competitive strategist. Return ONLY valid JSON array.");
      const parsed=safeJSON(result);
      if(Array.isArray(parsed)){setPlaybook(prev=>({...prev,positioning:parsed}));}
    }catch(e){console.error("Positioning generation failed:",e);}
    setGenerating(false);
  };

  const renderTab=()=>{
    if(activeTab==="voice"){
      const v=playbook.brand_voice;
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Voice & Tone{aiLink(genVoice)}</h3>
        </div>
        <div style={{marginBottom:10}}><label style={labelStyle}>Tone of Voice</label><input value={v.tone} onChange={e=>setPlaybook({...playbook,brand_voice:{...v,tone:e.target.value}})} placeholder="e.g. Authoritative, data-driven, approachable" style={inputStyle}/></div>
        <div style={{marginBottom:10}}><label style={labelStyle}>Brand Personality</label><textarea value={v.personality} onChange={e=>setPlaybook({...playbook,brand_voice:{...v,personality:e.target.value}})} placeholder="Describe your brand personality in 2-3 sentences..." rows={3} style={{...inputStyle,resize:"vertical"}}/></div>
        <ListEditor section="brand_voice" field="dos" label="Do's — Voice Guidelines" placeholder="e.g. Use active voice"/>
        <ListEditor section="brand_voice" field="donts" label="Don'ts — What to Avoid" placeholder="e.g. Never use jargon without explanation" color={C.red}/>
        <ListEditor section="brand_voice" field="examples" label="Example Phrases" placeholder="e.g. We believe in transparent AI"/>
        {saveBtn(()=>saveSection("brand_voice",playbook.brand_voice))}
      </Card>);
    }
    if(activeTab==="taglines"){
      const t=playbook.taglines;
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Taglines & Messaging{aiLink(genTaglines)}</h3>
        </div>
        <div style={{marginBottom:10}}><label style={labelStyle}>Primary Tagline</label><input value={t.primary} onChange={e=>setPlaybook({...playbook,taglines:{...t,primary:e.target.value}})} placeholder={`e.g. "${brand} — The future of ${industry}"`} style={inputStyle}/></div>
        <ListEditor section="taglines" field="supporting" label="Supporting Messages" placeholder="e.g. Trusted by 500+ enterprises worldwide"/>
        {saveBtn(()=>saveSection("taglines",playbook.taglines))}
      </Card>);
    }
    if(activeTab==="visual"){
      const vi=playbook.visual_ci;
      const setVi=(k,val)=>setPlaybook({...playbook,visual_ci:{...vi,[k]:val}});
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Visual Corporate Identity{aiLink(genVisual)}</h3>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
          {[["primaryColor","Primary"],["secondaryColor","Secondary"],["accentColor","Accent"]].map(([key,lbl])=>(<div key={key}>
            <label style={labelStyle}>{lbl} Colour</label>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <input type="color" value={vi[key]} onChange={e=>setVi(key,e.target.value)} style={{width:36,height:36,border:`1px solid ${C.border}`,borderRadius:6,padding:2,cursor:"pointer",background:"transparent"}}/>
              <input value={vi[key]} onChange={e=>setVi(key,e.target.value)} style={{...inputStyle,flex:1,fontFamily:"monospace"}}/>
            </div>
          </div>))}
        </div>
        <div style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",height:32,marginBottom:14,border:`1px solid ${C.border}`}}>
          <div style={{flex:1,background:vi.primaryColor}}/>
          <div style={{flex:1,background:vi.secondaryColor}}/>
          <div style={{flex:1,background:vi.accentColor}}/>
        </div>
        <ListEditor section="visual_ci" field="fonts" label="Brand Fonts" placeholder="e.g. Outfit, Plus Jakarta Sans"/>
        <div style={{marginBottom:10}}>
          <label style={labelStyle}>Logo URL</label>
          <input value={vi.logoUrl} onChange={e=>setVi("logoUrl",e.target.value)} placeholder="https://example.com/logo.svg" style={inputStyle}/>
          {vi.logoUrl&&<div style={{marginTop:8,padding:12,background:C.bg,borderRadius:C.rs,border:`1px solid ${C.border}`,textAlign:"center"}}><img src={vi.logoUrl} alt="Logo preview" style={{maxHeight:60,maxWidth:"100%",objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/></div>}
        </div>
        {saveBtn(()=>saveSection("visual_ci",playbook.visual_ci))}
      </Card>);
    }
    if(activeTab==="compliance"){
      const co=playbook.compliance;
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Compliance & Restrictions{aiLink(genCompliance)}</h3>
        </div>
        <ListEditor section="compliance" field="restrictions" label="Brand Restrictions" placeholder="e.g. Never compare directly with competitor X" color={C.red}/>
        <div style={{marginBottom:10}}><label style={labelStyle}>Additional Notes</label><textarea value={co.notes} onChange={e=>setPlaybook({...playbook,compliance:{...co,notes:e.target.value}})} placeholder="Any additional compliance notes, legal disclaimers, or regulatory requirements..." rows={4} style={{...inputStyle,resize:"vertical"}}/></div>
        {saveBtn(()=>saveSection("compliance",playbook.compliance))}
      </Card>);
    }
    if(activeTab==="products"){
      const prods=playbook.products||[];
      const startEdit=(p,idx)=>{setEditProduct(idx);setProdForm(p?{...p}:{name:"",description:"",features:[]});setFeatureInput("");};
      const saveProd=()=>{
        if(!prodForm.name.trim())return;
        let updated;
        if(editProduct==="new"){updated=[...prods,{...prodForm}];}
        else{updated=prods.map((p,i)=>i===editProduct?{...prodForm}:p);}
        setPlaybook({...playbook,products:updated});
        setEditProduct(null);setProdForm({name:"",description:"",features:[]});setFeatureInput("");
      };
      const deleteProd=(idx)=>{
        const updated=prods.filter((_,i)=>i!==idx);
        setPlaybook({...playbook,products:updated});
      };
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Products & Services</h3>
          <button onClick={()=>startEdit(null,"new")} style={{padding:"6px 14px",background:`${C.accent}10`,color:C.accent,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>+ Add Product</button>
        </div>
        {editProduct!==null&&<div style={{padding:14,background:C.bg,borderRadius:C.rs,border:`1px solid ${C.accent}25`,marginBottom:14}}>
          <div style={{marginBottom:8}}><label style={labelStyle}>Product Name</label><input value={prodForm.name} onChange={e=>setProdForm({...prodForm,name:e.target.value})} placeholder="e.g. Enterprise Analytics Suite" style={inputStyle}/></div>
          <div style={{marginBottom:8}}><label style={labelStyle}>Description</label><textarea value={prodForm.description} onChange={e=>setProdForm({...prodForm,description:e.target.value})} placeholder="Brief product description..." rows={2} style={{...inputStyle,resize:"vertical"}}/></div>
          <div style={{marginBottom:8}}>
            <label style={labelStyle}>Features (press Enter to add)</label>
            <div style={{display:"flex",gap:6,marginBottom:6}}>
              <input value={featureInput} onChange={e=>setFeatureInput(e.target.value)} placeholder="e.g. Real-time dashboards" onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();if(featureInput.trim()){setProdForm({...prodForm,features:[...prodForm.features,featureInput.trim()]});setFeatureInput("");}}}} style={{...inputStyle,flex:1}}/>
              <button onClick={()=>{if(featureInput.trim()){setProdForm({...prodForm,features:[...prodForm.features,featureInput.trim()]});setFeatureInput("");}}} style={{padding:"8px 14px",background:`${C.accent}10`,color:C.accent,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>+ Add</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{prodForm.features.map((f,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",background:`${C.accent}08`,color:C.accent,borderRadius:100,fontSize:11}}>{f}<span onClick={()=>setProdForm({...prodForm,features:prodForm.features.filter((_,j)=>j!==i)})} style={{cursor:"pointer",opacity:.6,fontSize:13}}>×</span></span>))}</div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button onClick={()=>{setEditProduct(null);setProdForm({name:"",description:"",features:[]});setFeatureInput("");}} style={{padding:"6px 14px",background:C.bg,color:C.sub,border:`1px solid ${C.border}`,borderRadius:6,fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'Outfit'"}}>Cancel</button>
            <button onClick={saveProd} style={{padding:"6px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Save Product</button>
          </div>
        </div>}
        {prods.length===0&&editProduct===null&&<div style={{textAlign:"center",padding:20,color:C.muted,fontSize:12}}>No products added yet. Click "+ Add Product" to get started.</div>}
        {prods.map((p,i)=>(<div key={i} style={{padding:12,background:C.surface,borderRadius:C.rs,border:`1px solid ${C.borderSoft}`,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:C.text}}>{p.name}</div>
              {p.description&&<div style={{fontSize:11,color:C.sub,marginTop:2}}>{p.description}</div>}
              {p.features&&p.features.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>{p.features.map((f,j)=>(<Pill key={j} color={C.accent}>{f}</Pill>))}</div>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <span onClick={()=>startEdit(p,i)} style={{fontSize:11,color:C.accent,cursor:"pointer",fontWeight:500}}>Edit</span>
              <span onClick={()=>deleteProd(i)} style={{fontSize:11,color:C.red,cursor:"pointer",fontWeight:500}}>Delete</span>
            </div>
          </div>
        </div>))}
        {saveBtn(()=>saveSection("products",playbook.products))}
      </Card>);
    }
    if(activeTab==="positioning"){
      const po=Array.isArray(playbook.positioning)?playbook.positioning:[];
      return(<Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Competitive Positioning{aiLink(genPositioning)}</h3>
        </div>
        {po.length>0?po.map((p,i)=>(<div key={i} style={{padding:12,background:C.surface,borderRadius:C.rs,border:`1px solid ${C.borderSoft}`,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:500,color:C.accent,marginBottom:2}}>vs {p.competitor}</div>
              <div style={{fontSize:12,color:C.text,marginBottom:4}}><strong>Differentiator:</strong> {p.differentiator}</div>
              <div style={{fontSize:11,color:C.sub}}><strong>Messaging:</strong> {p.messaging}</div>
            </div>
            <span onClick={()=>{const updated=po.filter((_,j)=>j!==i);setPlaybook({...playbook,positioning:updated});}} style={{fontSize:11,color:C.red,cursor:"pointer",fontWeight:500,flexShrink:0,marginLeft:8}}>Remove</span>
          </div>
        </div>)):<div style={{textAlign:"center",padding:20,color:C.muted,fontSize:12}}>No positioning statements yet. Click "AI Generate" to create competitor positioning.</div>}
        {saveBtn(()=>saveSection("positioning",playbook.positioning))}
      </Card>);
    }
    return null;
  };

  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Playbook</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Your brand hub — identity, voice, and AI-optimised guidelines</p></div>
    <SectionNote text="This is your central brand hub. Define your brand voice, manage compliance, and set guidelines. Everything here powers your content generation and AI engine strategy."/>

    {/* Tab Bar */}
    <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {TABS.map(tab=>(<button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",background:"transparent",border:"none",borderBottom:activeTab===tab.id?`2px solid ${C.accent}`:"2px solid transparent",color:activeTab===tab.id?C.accent:C.muted,fontSize:12,fontWeight:activeTab===tab.id?600:500,cursor:"pointer",fontFamily:"'Outfit'",whiteSpace:"nowrap",transition:"all .15s"}}>{tab.label}</button>))}
    </div>

    {/* Loading state */}
    {loading&&<div style={{textAlign:"center",padding:40,color:C.muted,fontSize:13}}>Loading playbook...</div>}

    {/* No project guard */}
    {!projectId&&!loading&&<Card style={{marginBottom:16,textAlign:"center",padding:32}}>
      <div style={{fontSize:20,marginBottom:8}}>📋</div>
      <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>No project linked yet</div>
      <div style={{fontSize:12,color:C.muted}}>Save an audit first to start building your brand playbook.</div>
    </Card>}

    {/* Tab content */}
    {!loading&&projectId&&<div style={{marginBottom:16}}>{renderTab()}</div>}

    {/* Brand Guidelines - expandable (always shown when results available) */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Brand Guidelines</h3>
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
  </div>);
}

/* ─── PAGE: SENTIMENT ANALYSIS ─── */
function SentimentPage({r}){
  const signals=r?.sentimentSignals||{positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]};
  const sentimentScore=r?.sentiment?.brand?.avg||50;
  const compSentiment=r?.sentiment?.competitors||[];
  const getScoreLabel=(score)=>{
    if(score>=80)return{label:"Very Positive",color:"#16a34a"};
    if(score>=60)return{label:"Positive",color:"#22c55e"};
    if(score>=45)return{label:"Neutral",color:"#d97706"};
    if(score>=30)return{label:"Negative",color:"#ea580c"};
    return{label:"Very Negative",color:"#dc2626"};
  };
  const scoreInfo=getScoreLabel(sentimentScore);
  const brandNameLower=(r?.clientData?.brand||"").toLowerCase();
  return(<div>
    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:22,fontWeight:600,color:C.text,letterSpacing:"-.02em",margin:0,fontFamily:"'Outfit'"}}>Sentiment Analysis</h2>
      <p style={{fontSize:13,color:C.sub,marginTop:4}}>How AI engines perceive and portray {r?.clientData?.brand||"your brand"}</p>
    </div>

    {/* Score overview + competitor comparison */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
      <Card>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:12}}>Brand Sentiment</div>
        <div style={{display:"flex",alignItems:"baseline",gap:8}}>
          <span style={{fontSize:36,fontWeight:600,color:scoreInfo.color,fontFamily:"'Outfit'"}}>{sentimentScore}</span>
          <span style={{fontSize:13,color:scoreInfo.color,fontWeight:500}}>{scoreInfo.label}</span>
        </div>
        <div style={{fontSize:12,color:C.muted,marginTop:8}}>Based on analysis of AI engine responses across all tested queries</div>
      </Card>
      <Card>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:12}}>Competitor Comparison</div>
        {compSentiment.length>0?(<div>
          {compSentiment.filter(c=>c.name?.toLowerCase()!==brandNameLower).map((comp,i)=>{
            const cInfo=getScoreLabel(comp.avg||50);
            return(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<compSentiment.filter(c=>c.name?.toLowerCase()!==brandNameLower).length-1?`1px solid ${C.borderSoft}`:"none"}}>
              <span style={{fontSize:13,color:C.text}}>{comp.name}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:60,height:4,background:"#e5e7eb",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:(comp.avg||50)+"%",background:cInfo.color,borderRadius:2}}/></div>
                <span style={{fontSize:12,fontWeight:500,color:cInfo.color,minWidth:24,textAlign:"right"}}>{comp.avg||50}</span>
              </div>
            </div>);
          })}
        </div>):(<div style={{fontSize:12,color:C.muted}}>No competitor sentiment data available</div>)}
      </Card>
    </div>

    {/* Positive and Negative signals */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
      <Card>
        <div style={{fontSize:15,fontWeight:500,color:C.text,marginBottom:16,display:"flex",alignItems:"center",gap:8,fontFamily:"'Outfit'"}}>
          <span style={{fontSize:16}}>✅</span> Positive Signals
        </div>
        {signals.positive.length>0?signals.positive.map((signal,i)=>(
          <div key={i} style={{padding:"8px 12px",background:"#f0fdf4",borderRadius:8,marginBottom:6,fontSize:13,color:"#166534",display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#22c55e",fontSize:10}}>●</span>
            {typeof signal==="string"?signal:signal.text||signal}
          </div>
        )):(<div style={{fontSize:12,color:C.muted}}>No positive signals detected</div>)}
      </Card>
      <Card>
        <div style={{fontSize:15,fontWeight:500,color:C.text,marginBottom:16,display:"flex",alignItems:"center",gap:8,fontFamily:"'Outfit'"}}>
          <span style={{fontSize:16}}>⚠️</span> Negative Signals
        </div>
        {signals.negative.length>0?signals.negative.map((signal,i)=>(
          <div key={i} style={{padding:"8px 12px",background:"#fef2f2",borderRadius:8,marginBottom:6,fontSize:13,color:"#991b1b",display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#dc2626",fontSize:10}}>●</span>
            {typeof signal==="string"?signal:signal.text||signal}
          </div>
        )):(<div style={{fontSize:12,color:C.muted}}>No negative signals detected</div>)}
      </Card>
    </div>

    {/* AI Engine Quotes */}
    <div style={{marginBottom:32}}>
      <div style={{fontSize:15,fontWeight:500,color:C.text,marginBottom:16,fontFamily:"'Outfit'"}}>What AI Engines Are Saying</div>
      {signals.quotes.length>0?(<div style={{display:"grid",gap:10}}>
        {signals.quotes.map((quote,i)=>{
          const q=typeof quote==="string"?{text:quote,engine:"Unknown",sentiment:"neutral"}:quote;
          const sentColors={positive:{border:"#dcfce7",bg:"#f0fdf450"},negative:{border:"#fee2e2",bg:"#fef2f250"},neutral:{border:C.border,bg:"transparent"}};
          const sc=sentColors[q.sentiment]||sentColors.neutral;
          return(<div key={i} style={{padding:"16px 20px",background:sc.bg,border:"1px solid "+sc.border,borderRadius:12,borderLeft:"3px solid "+(q.sentiment==="positive"?"#22c55e":q.sentiment==="negative"?"#dc2626":"#9ca3af")}}>
            <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontStyle:"italic"}}>"{q.text}"</div>
            <div style={{fontSize:11,color:C.muted,marginTop:8,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontWeight:500}}>{q.engine}</span>
              <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:q.sentiment==="positive"?"#dcfce7":q.sentiment==="negative"?"#fee2e2":"#f3f4f6",color:q.sentiment==="positive"?"#166534":q.sentiment==="negative"?"#991b1b":"#6b7280"}}>{q.sentiment}</span>
            </div>
          </div>);
        })}
      </div>):(<div style={{padding:24,textAlign:"center",color:C.muted,fontSize:12,background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>No quotes extracted</div>)}
    </div>

    {/* Competitor Sentiment Details */}
    {signals.competitorSentiment?.length>0&&(<div style={{marginBottom:32}}>
      <div style={{fontSize:15,fontWeight:500,color:C.text,marginBottom:16,fontFamily:"'Outfit'"}}>Competitor Sentiment Breakdown</div>
      <div style={{display:"grid",gap:10}}>
        {signals.competitorSentiment.map((comp,i)=>{
          const sentColor=comp.sentiment==="positive"?"#22c55e":comp.sentiment==="negative"?"#dc2626":"#d97706";
          return(<div key={i} style={{padding:"14px 18px",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:12,display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:sentColor,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500,color:C.text}}>{comp.name}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{comp.summary}</div>
            </div>
            <span style={{fontSize:10,fontWeight:500,padding:"3px 8px",borderRadius:4,background:comp.sentiment==="positive"?"#dcfce7":comp.sentiment==="negative"?"#fee2e2":"#fef3c7",color:comp.sentiment==="positive"?"#166534":comp.sentiment==="negative"?"#991b1b":"#92400e",textTransform:"capitalize"}}>{comp.sentiment}</span>
          </div>);
        })}
      </div>
    </div>)}

  </div>);
}

/* ─── PAGE: TARGET CHANNELS (Step 06 with drill-down) ─── */
function ChannelsPage({r,goTo,onUpdate}){
  const[expandCh,setExpandCh]=useState(null);
  const[regenCh,setRegenCh]=useState(false);
  const regenerateChannels=async()=>{
    setRegenCh(true);
    try{
      const brand=r.clientData?.brand||"Brand",industry=r.clientData?.industry||"Technology",region=r.clientData?.region||"Global";
      const prompt=`For "${brand}" in ${industry} (${region}), list the top 10 channels that directly influence AI engine visibility (where ChatGPT and Gemini pull data from). For each channel provide: name, type, impact score (1-10), current status ("Active"|"Missing"|"Weak"), and actionable recommendation.
Return JSON only:
[{"name":"Wikipedia","type":"Knowledge Base","impact":9,"status":"Missing","recommendation":"Create a Wikipedia page for ${brand}","finding":"","url":"","sites":[]}]`;
      const raw=await callGemini(prompt,"You are an AEO analyst. Return ONLY valid JSON array.");
      const parsed=safeJSON(raw);
      if(Array.isArray(parsed)&&parsed.length>0&&onUpdate)onUpdate(prev=>({...prev,aeoChannels:parsed}));
    }catch(e){console.error("Channel regeneration failed:",e);}
    setRegenCh(false);
  };
  if(!r.aeoChannels||r.aeoChannels.length===0)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Target Channels</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:28,marginBottom:8}}>📡</div>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Channels not generated</div>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
      <button onClick={regenerateChannels} disabled={regenCh} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenCh?"#e5e7eb":C.accent,color:regenCh?"#999":"#fff",border:"none",borderRadius:8,cursor:regenCh?"default":"pointer",fontFamily:"'Outfit'"}}>{regenCh?"Generating...":"Generate Channels"}</button>
    </div>
  </div>);
  const hasAnyFindings=r.aeoChannels.some(ch=>ch.finding);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Target Channels</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Channels ranked by impact on AI engine visibility {hasAnyFindings&&<span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>✓ Verified via Web Search</span>}</p></div>
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
  </div>);
}

/* ─── PAGE: CONTENT HUB ─── */
function ContentHubPage({r,goTo,activeProject,onUpdate}){
  const TABS=[{id:"grid",label:"Grid",icon:"📊"},{id:"suggested",label:"Suggested",icon:"💡"},{id:"create",label:"Create",icon:"✍️"},{id:"library",label:"Library",icon:"📚"}];
  const[activeTab,setActiveTab]=useState("grid");
  const[contentLibrary,setContentLibrary]=useState([]);
  const[loading,setLoading]=useState(true);
  const[generating,setGenerating]=useState(false);
  const[regenGrid,setRegenGrid]=useState(false);
  const[editingContent,setEditingContent]=useState(null);
  const[filterType,setFilterType]=useState("all");
  const[filterStatus,setFilterStatus]=useState("all");
  const[playbook,setPlaybook]=useState(null);
  // Create tab state
  const[selectedType,setSelectedType]=useState("blog");
  const[createTopic,setCreateTopic]=useState("");
  const[createChannel,setCreateChannel]=useState("");
  // Library tab state
  const[editText,setEditText]=useState("");
  const[editTitle,setEditTitle]=useState("");
  const[libSaving,setLibSaving]=useState(false);
  const[copied,setCopied]=useState(false);

  const projectId=activeProject?.id||null;

  React.useEffect(()=>{
    if(!projectId){setLoading(false);return;}
    Promise.all([sbLoadContent(projectId),sbLoadPlaybook(projectId)]).then(([content,pb])=>{
      setContentLibrary(content||[]);
      setPlaybook(pb);
      setLoading(false);
    });
  },[projectId]);

  React.useEffect(()=>{
    if(editingContent){setEditText(editingContent.content||"");setEditTitle(editingContent.title||"");}
  },[editingContent?.id]);

  const contentTypes=[
    {id:"blog",label:"Blog Article",icon:"📝",desc:"Long-form SEO-optimized article (800-1500 words)"},
    {id:"faq",label:"FAQ Page",icon:"❓",desc:"Schema-optimized Q&A content (8-12 questions)"},
    {id:"social",label:"Social Post",icon:"📱",desc:"Platform-specific social media content"},
    {id:"email",label:"Email Newsletter",icon:"📧",desc:"Email content with subject line and CTA"},
    {id:"video",label:"Video Script",icon:"🎬",desc:"Script with scenes, narration, and visual notes"},
    {id:"landing",label:"Landing Page",icon:"🖥",desc:"Hero copy, benefits, and conversion-focused content"},
    {id:"schema",label:"Schema Markup",icon:"🔧",desc:"JSON-LD structured data snippets"}
  ];

  function buildBrandContext(){
    const voice=playbook?.brand_voice||{};
    const tags=playbook?.taglines||{};
    const comp=playbook?.compliance||{};
    const products=playbook?.products||[];
    let ctx="";
    if(voice.tone)ctx+=`Brand tone: ${voice.tone}. `;
    if(voice.personality)ctx+=`Brand personality: ${voice.personality}. `;
    if(voice.dos?.length)ctx+=`Always: ${(voice.dos||[]).join(", ")}. `;
    if(voice.donts?.length)ctx+=`Never: ${(voice.donts||[]).join(", ")}. `;
    if(voice.examples?.length)ctx+=`Example phrases: "${(voice.examples||[]).join('", "')}". `;
    if(tags.primary)ctx+=`Primary tagline: "${tags.primary}". `;
    if(comp.restrictions?.length)ctx+=`COMPLIANCE RESTRICTIONS (must follow): ${(comp.restrictions||[]).join("; ")}. `;
    if(comp.notes)ctx+=`Compliance notes: ${comp.notes}. `;
    if((products||[]).length)ctx+=`Products: ${(products||[]).map(p=>`${p.name}${p.description?" - "+p.description:""}`).join("; ")}. `;
    return ctx||"No brand playbook data available — use professional, neutral tone.";
  }

  async function generateContent(type,topic,channel,sourceQuery,sourceRoadmapItem){
    setGenerating(true);
    const brand=r?.clientData?.brand||"";
    const region=r?.clientData?.region||"";
    const industry=r?.clientData?.industry||"";
    const brandContext=buildBrandContext();

    const typePrompts={
      blog:`Write a comprehensive, SEO-optimized blog article (800-1500 words) about: "${topic}"\n\nStructure it with:\n- An engaging headline (H1)\n- An intro paragraph that hooks the reader\n- 3-5 subheadings (H2) with detailed paragraphs under each\n- Practical tips, data points, or examples where relevant\n- A conclusion with a clear next step or CTA\n- Meta description (150 chars)\n\nOptimize for AEO/GEO: include natural question-and-answer patterns within the text, use clear factual statements that AI engines can extract, and structure information in a way that's easy for AI to cite.`,
      faq:`Create a schema-optimized FAQ page with 8-12 questions and answers about: "${topic}"\n\nEach Q&A should:\n- Use natural language questions people actually search for\n- Provide comprehensive, authoritative answers (3-5 sentences each)\n- Include specific details, numbers, or examples where relevant\n- Be structured so AI engines can easily extract and cite individual answers\n\nAlso provide the JSON-LD FAQPage schema markup at the end.`,
      social:`Create a social media post for ${channel||"LinkedIn"} about: "${topic}"\n\nInclude:\n- The post text (optimized for the platform's algorithm and character limits)\n- 3-5 relevant hashtags\n- A suggested image description\n- A call to action\n\nPlatform guidelines:\n- LinkedIn: professional, thought-leadership, 1300 chars max, use line breaks\n- Twitter/X: concise, punchy, 280 chars, conversational\n- Facebook: storytelling, community-focused, medium length\n- Instagram: visual-first, lifestyle-oriented, include emoji, 2200 chars max\n- TikTok: trend-aware, casual, hook in first line`,
      email:`Write an email newsletter about: "${topic}"\n\nInclude:\n- Subject line (50 chars max, high open rate optimized)\n- Preview text (90 chars)\n- Email body with:\n  - Opening hook\n  - Main content (3-4 short paragraphs)\n  - Key takeaway or insight\n  - Clear CTA button text\n- P.S. line (optional but effective)`,
      video:`Write a video script about: "${topic}"\n\nStructure:\n- Hook (first 3 seconds — attention grabber)\n- Introduction (who this is for and what they'll learn)\n- Main content (3-5 key points with talking points for each)\n- For each section include: [VISUAL] notes for what to show on screen\n- Call to action (what to do next)\n- Estimated duration: 2-4 minutes\n\nFormat each section clearly with timestamps and visual/narration separation.`,
      landing:`Write landing page copy about: "${topic}"\n\nInclude these sections:\n- Hero headline + subheadline\n- Hero CTA button text\n- 3 key benefit blocks (icon suggestion + headline + 2-sentence description each)\n- Social proof section (suggested testimonial format)\n- Feature comparison or "How it works" (3 steps)\n- FAQ section (4-5 questions)\n- Final CTA section with headline + button text\n\nMake it conversion-focused. Every section should move the reader toward the CTA.`,
      schema:`Generate JSON-LD structured data markup for: "${topic}"\n\nProvide these schema types (whichever are relevant):\n- Organization schema\n- Product schema (if product-related)\n- FAQPage schema\n- Article schema\n- BreadcrumbList schema\n- HowTo schema (if process-related)\n\nEach schema should be complete, valid JSON-LD that can be directly pasted into a webpage <script> tag. Include all required and recommended properties.`
    };

    const systemPrompt=`You are an expert AEO/GEO content strategist. You create content specifically optimized to be cited and recommended by AI search engines (ChatGPT, Gemini, Perplexity, etc).\n\nBRAND CONTEXT:\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\n${brandContext}\n\nAEO OPTIMIZATION RULES:\n- Use clear, factual, authoritative language that AI engines prefer to cite\n- Include natural question-and-answer patterns\n- Structure content with clear headings and logical flow\n- Include specific details, statistics, and examples\n- Write in a way that answers user queries directly and comprehensively\n- Avoid fluff, filler, and vague statements\n- Make statements that are quotable and extractable by AI\n\nIMPORTANT: All content must be in English. Follow all compliance restrictions listed above. Never violate brand guidelines.`;

    const userPrompt=typePrompts[type]||`Create ${type} content about: "${topic}"`;

    try{
      const result=await callOpenAI(userPrompt,systemPrompt);
      const title=topic.length>60?topic.substring(0,57)+"...":topic;
      const newContent={type,title,content:result,channel:channel||null,source_query:sourceQuery||null,source_roadmap_item:sourceRoadmapItem||null,status:"draft"};
      if(projectId){
        const saved=await sbSaveContent(projectId,newContent);
        if(saved){setContentLibrary(prev=>[saved,...prev]);setEditingContent(saved);setActiveTab("library");}
        setGenerating(false);
        return saved;
      }else{
        const local={...newContent,id:"local_"+Date.now(),created_at:new Date().toISOString()};
        setContentLibrary(prev=>[local,...prev]);setEditingContent(local);setActiveTab("library");
        setGenerating(false);
        return local;
      }
    }catch(e){
      console.error("Content generation failed:",e);
      setGenerating(false);
      return null;
    }
  }

  /* ── Grid Tab (moved from standalone Content Grid page) ── */
  const renderGrid=()=>{
    const ct=Array.isArray(r?.contentTypes)?r.contentTypes:[];
    if(ct.length===0){
      const regenerateGrid=async()=>{
        setRegenGrid(true);
        try{
          const brand=r.clientData?.brand||"Brand",industry=r.clientData?.industry||"Technology";
          const prompt=`For "${brand}" in ${industry}, create a content strategy grid with 8-10 content types. For each provide: type name, target channels (array), publishing frequency, priority (P0/P1/P2), suggested owner/department, and a rationale.
Return JSON only: [{"type":"...","channels":["..."],"freq":"Weekly","p":"P0","owner":"Marketing","rationale":"..."}]`;
          const raw=await callGemini(prompt,"You are a content strategist. Return ONLY valid JSON array.");
          const parsed=safeJSON(raw);
          if(Array.isArray(parsed)&&parsed.length>0&&onUpdate)onUpdate(prev=>({...prev,contentTypes:parsed}));
        }catch(e){console.error("Grid regeneration failed:",e);}
        setRegenGrid(false);
      };
      return(<div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
        <div style={{fontSize:28,marginBottom:8}}>📊</div>
        <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Content grid not generated</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
        <button onClick={regenerateGrid} disabled={regenGrid} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenGrid?"#e5e7eb":C.accent,color:regenGrid?"#999":"#fff",border:"none",borderRadius:8,cursor:regenGrid?"default":"pointer",fontFamily:"'Outfit'"}}>{regenGrid?"Generating...":"Generate Content Grid"}</button>
      </div>);
    }
    return(<div>
      <SectionNote text={`This content grid is tailored to ${r.clientData?.brand||"your brand"}'s specific gaps and competitive landscape. Priority P0 = start immediately based on audit findings.`}/>
      <Card style={{marginBottom:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["Content Type","Channels","Frequency","Priority","Owner"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,color:C.muted,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
        <tbody>{[...ct].sort((a,b)=>{const po={"P0":0,"P1":1,"P2":2,"P3":3};return(po[a.p]??9)-(po[b.p]??9);}).map((item,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
          <td style={{padding:"10px"}}><div style={{fontWeight:500,color:C.text}}>{item.type}</div>{item.rationale&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.rationale}</div>}</td>
          <td style={{padding:"10px"}}><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{(item.channels||[]).map(ch=><Pill key={ch} color="#64748b">{ch}</Pill>)}</div></td>
          <td style={{padding:"10px",color:C.sub}}>{item.freq}</td>
          <td style={{padding:"10px"}}><Pill color={item.p==="P0"?C.red:item.p==="P1"?C.amber:"#94a3b8"}>{item.p}</Pill></td>
          <td style={{padding:"10px",color:C.sub,fontSize:11}}>{item.owner}</td>
        </tr>))}</tbody></table>
      </Card>
      <Card><h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Monthly Output Requirements</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:500,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
        </div>
      </Card>
    </div>);
  };

  /* ── Suggested Tab ── */
  const renderSuggested=()=>{
    const suggestions=[];
    const gptQueries=Array.isArray(r?.gptData?.queries)?r.gptData.queries:[];
    const gemQueries=Array.isArray(r?.gemData?.queries)?r.gemData.queries:[];
    const searchQueries=Array.isArray(r?.searchQueries)?r.searchQueries:[];

    searchQueries.forEach((q,i)=>{
      const qText=typeof q==="string"?q:(q&&q.query)||"";
      if(!qText)return;
      const gptStatus=gptQueries[i]?.status||"Absent";
      const gemStatus=gemQueries[i]?.status||"Absent";
      if(gptStatus==="Absent"&&gemStatus==="Absent"){
        suggestions.push({type:"blog",topic:qText,reason:"Your brand is absent on both ChatGPT and Gemini for this query",priority:"high",source_query:qText});
      }else if(gptStatus==="Absent"||gemStatus==="Absent"){
        suggestions.push({type:"faq",topic:qText,reason:`Your brand is absent on ${gptStatus==="Absent"?"ChatGPT":"Gemini"} for this query`,priority:"medium",source_query:qText});
      }
    });

    const contentGrid=Array.isArray(r?.contentTypes)?r.contentTypes:[];
    (contentGrid||[]).slice(0,5).forEach(item=>{
      const topic=item.type||item.topic||item.title||"";
      const chArr=Array.isArray(item.channels)?item.channels:[];
      const channel=(chArr[0]||"").toLowerCase();
      let type="blog";
      if(channel.includes("social")||channel.includes("linkedin")||channel.includes("twitter")||channel.includes("instagram")||channel.includes("facebook")||channel.includes("tiktok"))type="social";
      else if(channel.includes("email")||channel.includes("newsletter"))type="email";
      else if(channel.includes("video")||channel.includes("youtube"))type="video";
      else if(channel.includes("faq"))type="faq";
      if(topic&&!suggestions.find(s=>s.topic===topic)){
        suggestions.push({type,topic,reason:`Recommended in your Content Grid — ${chArr.length?chArr.join(", "):"multi-channel"}`,priority:item.p==="P0"?"high":"medium",channel:chArr[0]||null});
      }
    });

    const roadmap=Array.isArray(r?.roadmap)?r.roadmap:[];
    (roadmap||[]).forEach(phase=>{
      const tasks=Array.isArray(phase.tasks)?phase.tasks:Array.isArray(phase.items)?phase.items:Array.isArray(phase.actions)?phase.actions:[];
      (tasks||[]).slice(0,3).forEach(task=>{
        const taskText=typeof task==="string"?task:(task&&(task.task||task.title||task.description))||"";
        if(taskText&&taskText.length>20&&!suggestions.find(s=>s.topic===taskText)){
          suggestions.push({type:"blog",topic:taskText,reason:`From your 90-Day Roadmap — ${phase.phase||phase.title||""}`,priority:"medium",source_roadmap_item:taskText});
        }
      });
    });

    suggestions.sort((a,b)=>(a.priority==="high"?0:1)-(b.priority==="high"?0:1));

    const priorityColors={high:{bg:"#fee2e2",text:"#991b1b",label:"High Priority"},medium:{bg:"#fef3c7",text:"#92400e",label:"Medium"},low:{bg:"#f0fdf4",text:"#166534",label:"Low"}};

    if(suggestions.length===0)return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>✨</div><div style={{fontSize:14,fontWeight:500,color:C.text}}>No suggestions yet</div><div style={{fontSize:12,color:C.muted,marginTop:4}}>Run an audit first to get content recommendations based on your visibility gaps.</div></div>);

    return(<div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>{suggestions.length} content suggestions based on your audit data</div>
      {suggestions.slice(0,15).map((s,i)=>{
        const typeInfo=contentTypes.find(ct=>ct.id===s.type)||contentTypes[0];
        const pColor=priorityColors[s.priority]||priorityColors.medium;
        return(<div key={i} style={{padding:"16px 20px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:10,display:"flex",alignItems:"flex-start",gap:14}}>
          <span style={{fontSize:22}}>{typeInfo.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500,color:C.text,lineHeight:1.4}}>{s.topic}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:4}}>{s.reason}</div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <span style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:pColor.bg,color:pColor.text,fontWeight:500}}>{pColor.label}</span>
              <span style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:"#f1f5f9",color:C.muted}}>{typeInfo.label}</span>
            </div>
          </div>
          <button onClick={()=>generateContent(s.type,s.topic,s.channel,s.source_query,s.source_roadmap_item)} disabled={generating} style={{padding:"8px 16px",fontSize:11,fontWeight:500,background:generating?"#e5e7eb":C.accent,color:generating?"#999":"#fff",border:"none",borderRadius:8,cursor:generating?"default":"pointer",whiteSpace:"nowrap",fontFamily:"'Outfit'"}}>{generating?"Generating...":"Generate"}</button>
        </div>);
      })}
    </div>);
  };

  /* ── Create Tab ── */
  const renderCreate=()=>{
    const topic=createTopic;
    const setTopic=setCreateTopic;
    const channel=createChannel;
    const setChannel=setCreateChannel;
    const socialChannels=["LinkedIn","Twitter/X","Facebook","Instagram","TikTok"];
    const selectedTypeInfo=contentTypes.find(ct=>ct.id===selectedType);

    return(<div>
      <div style={{fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:12}}>Content Type</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,marginBottom:24}}>
        {contentTypes.map(ct=>(<button key={ct.id} onClick={()=>setSelectedType(ct.id)} style={{padding:"14px 12px",background:selectedType===ct.id?`${C.accent}10`:C.surface,border:selectedType===ct.id?`2px solid ${C.accent}`:`1px solid ${C.border}`,borderRadius:10,cursor:"pointer",textAlign:"left"}}>
          <div style={{fontSize:18,marginBottom:4}}>{ct.icon}</div>
          <div style={{fontSize:12,fontWeight:500,color:selectedType===ct.id?C.accent:C.text}}>{ct.label}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>{ct.desc}</div>
        </button>))}
      </div>

      {selectedType==="social"&&<div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>Platform</div>
        <div style={{display:"flex",gap:6}}>
          {socialChannels.map(ch=>(<button key={ch} onClick={()=>setChannel(ch)} style={{padding:"6px 14px",fontSize:12,background:channel===ch?C.accent:"transparent",color:channel===ch?"#fff":C.muted,border:channel===ch?"none":`1px solid ${C.border}`,borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>{ch}</button>))}
        </div>
      </div>}

      <div style={{marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>Topic or Brief</div>
        <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder={`What should this ${selectedTypeInfo?.label||"content"} be about? Be specific — the more detail you provide, the better the output.`} style={{width:"100%",minHeight:100,padding:"12px 14px",fontSize:13,border:`1px solid ${C.border}`,borderRadius:10,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",color:C.text,background:C.bg}}/>
      </div>

      <button onClick={()=>{if(topic.trim())generateContent(selectedType,topic.trim(),channel||null);}} disabled={!topic.trim()||generating} style={{padding:"12px 28px",fontSize:13,fontWeight:500,background:topic.trim()&&!generating?C.accent:"#e5e7eb",color:topic.trim()&&!generating?"#fff":"#999",border:"none",borderRadius:10,cursor:topic.trim()&&!generating?"pointer":"default",display:"flex",alignItems:"center",gap:8,fontFamily:"'Outfit'"}}>
        {generating?(<><div style={{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>Generating {selectedTypeInfo?.label}...</>):(<>✨ Generate {selectedTypeInfo?.label}</>)}
      </button>

      <div style={{marginTop:20,padding:"12px 16px",background:C.bg,borderRadius:8,fontSize:11,color:C.muted}}>
        {playbook?.brand_voice?.tone?(<>✓ Brand Playbook connected — content will use your brand voice, compliance rules, and product details.</>):(<>⚠ Brand Playbook is empty — content will use a neutral professional tone. <span onClick={()=>goTo("playbook")} style={{color:C.accent,cursor:"pointer"}}>Set up your Brand Playbook</span> for better results.</>)}
      </div>
    </div>);
  };

  /* ── Library Tab ── */
  const renderLibrary=()=>{
    const saving=libSaving;
    const setSaving=setLibSaving;

    const filtered=(contentLibrary||[]).filter(c=>{
      if(filterType!=="all"&&c.type!==filterType)return false;
      if(filterStatus!=="all"&&c.status!==filterStatus)return false;
      return true;
    });

    const saveEdit=async()=>{
      if(!editingContent)return;
      setSaving(true);
      const updated=await sbUpdateContent(editingContent.id,{title:editTitle,content:editText});
      if(updated){setContentLibrary(prev=>prev.map(c=>c.id===updated.id?updated:c));setEditingContent(updated);}
      setSaving(false);
    };

    const updateStatus=async(contentId,newStatus)=>{
      const updated=await sbUpdateContent(contentId,{status:newStatus});
      if(updated){setContentLibrary(prev=>prev.map(c=>c.id===updated.id?updated:c));if(editingContent?.id===contentId)setEditingContent(updated);}
    };

    const deleteContent=async(contentId)=>{
      const ok=await sbDeleteContent(contentId);
      if(ok){setContentLibrary(prev=>prev.filter(c=>c.id!==contentId));if(editingContent?.id===contentId)setEditingContent(null);}
    };

    const copyContent=()=>{
      navigator.clipboard.writeText(editText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
    };

    const statusColors={draft:{bg:"#f3f4f6",text:"#6b7280"},published:{bg:"#dcfce7",text:"#166534"}};

    return(<div style={{display:"grid",gridTemplateColumns:editingContent?"300px 1fr":"1fr",gap:20}}>
      <div>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{fontSize:11,padding:"4px 8px",border:`1px solid ${C.border}`,borderRadius:6,background:"#fff",color:C.text,fontFamily:"inherit"}}>
            <option value="all">All types</option>
            {contentTypes.map(ct=><option key={ct.id} value={ct.id}>{ct.label}</option>)}
          </select>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{fontSize:11,padding:"4px 8px",border:`1px solid ${C.border}`,borderRadius:6,background:"#fff",color:C.text,fontFamily:"inherit"}}>
            <option value="all">All status</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
        </div>

        {filtered.length===0?(<div style={{padding:24,textAlign:"center",color:C.muted,fontSize:12}}>{contentLibrary.length===0?"No content generated yet. Use the Suggested or Create tab to get started.":"No content matches filters"}</div>):(
          filtered.map(c=>{
            const typeInfo=contentTypes.find(ct=>ct.id===c.type)||{icon:"📄",label:c.type};
            const sColor=statusColors[c.status]||statusColors.draft;
            const isActive=editingContent?.id===c.id;
            return(<div key={c.id} onClick={()=>setEditingContent(c)} style={{padding:"12px 14px",background:isActive?`${C.accent}08`:C.surface,border:isActive?`1px solid ${C.accent}40`:`1px solid ${C.border}`,borderRadius:10,marginBottom:6,cursor:"pointer",transition:"all .1s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14}}>{typeInfo.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.title||"Untitled"}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:2}}>{new Date(c.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</div>
                </div>
                <span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:sColor.bg,color:sColor.text,fontWeight:500}}>{c.status}</span>
              </div>
            </div>);
          })
        )}
      </div>

      {editingContent&&(<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:8}}>
          <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} style={{fontSize:16,fontWeight:500,border:"none",outline:"none",background:"transparent",flex:1,padding:0,color:C.text,fontFamily:"'Outfit'"}} placeholder="Content title..."/>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={copyContent} style={{padding:"5px 10px",fontSize:11,background:"#f1f5f9",border:"none",borderRadius:6,cursor:"pointer",color:C.text,fontFamily:"inherit"}}>{copied?"Copied!":"📋 Copy"}</button>
            <button onClick={()=>updateStatus(editingContent.id,editingContent.status==="draft"?"published":"draft")} style={{padding:"5px 10px",fontSize:11,background:editingContent.status==="draft"?"#dcfce7":"#f3f4f6",color:editingContent.status==="draft"?"#166534":"#6b7280",border:"none",borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>{editingContent.status==="draft"?"✓ Publish":"↩ Draft"}</button>
            <button onClick={()=>deleteContent(editingContent.id)} style={{padding:"5px 10px",fontSize:11,background:"#fee2e2",color:"#991b1b",border:"none",borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>🗑</button>
          </div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:12,fontSize:11,color:C.muted}}>
          <span>{contentTypes.find(ct=>ct.id===editingContent.type)?.label||editingContent.type}</span>
          {editingContent.channel&&<span>· {editingContent.channel}</span>}
          <span>· {new Date(editingContent.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
          <span>· {(editText||"").split(/\s+/).filter(Boolean).length} words</span>
        </div>

        <textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{flex:1,minHeight:400,padding:16,fontSize:13,lineHeight:1.7,border:`1px solid ${C.border}`,borderRadius:10,outline:"none",resize:"vertical",fontFamily:"Georgia, serif",boxSizing:"border-box",color:C.text,background:C.bg}}/>

        <div style={{display:"flex",justifyContent:"flex-end",marginTop:12,gap:8}}>
          <button onClick={saveEdit} disabled={saving} style={{padding:"8px 20px",fontSize:12,fontWeight:500,background:saving?"#e5e7eb":C.accent,color:saving?"#999":"#fff",border:"none",borderRadius:8,cursor:saving?"default":"pointer",fontFamily:"'Outfit'"}}>{saving?"Saving...":"Save Changes"}</button>
        </div>
      </div>)}
    </div>);
  };

  if(!projectId)return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content Hub</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Generate content powered by your brand playbook and audit insights.</p></div>
    <Card style={{textAlign:"center",padding:32}}>
      <div style={{fontSize:20,marginBottom:8}}>📋</div>
      <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>No project linked yet</div>
      <div style={{fontSize:12,color:C.muted}}>Save an audit first to start generating content.</div>
    </Card>
  </div>);

  if(loading)return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content Hub</h2></div>
    <div style={{textAlign:"center",padding:40,color:C.muted,fontSize:13}}>Loading content library...</div>
  </div>);

  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content Hub</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Generate content powered by your brand playbook and audit insights.</p></div>

    <div style={{display:"flex",gap:0,marginBottom:20,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {TABS.map(tab=>(<button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",background:"transparent",border:"none",borderBottom:activeTab===tab.id?`2px solid ${C.accent}`:"2px solid transparent",color:activeTab===tab.id?C.accent:C.muted,fontSize:12,fontWeight:activeTab===tab.id?600:500,cursor:"pointer",fontFamily:"'Outfit'",whiteSpace:"nowrap",transition:"all .15s",display:"flex",alignItems:"center",gap:6}}>
        <span>{tab.icon}</span>{tab.label}
        {tab.id==="library"&&contentLibrary.length>0&&<span style={{fontSize:10,background:C.border,color:C.text,padding:"2px 6px",borderRadius:10}}>{contentLibrary.length}</span>}
      </button>))}
    </div>

    {activeTab==="grid"&&renderGrid()}
    {activeTab==="suggested"&&renderSuggested()}
    {activeTab==="create"&&renderCreate()}
    {activeTab==="library"&&renderLibrary()}
  </div>);
}

/* ─── PAGE: CONTENT GRID (Step 07) ─── */
function GridPage({r,goTo}){
  if(!r.contentTypes||r.contentTypes.length===0)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content Grid</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:28,marginBottom:8}}>📊</div>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Content grid not generated</div>
      <div style={{fontSize:12,color:"#9ca3af"}}>This can happen if the AI service timed out during the audit.</div>
    </div>
  </div>);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Personalised content strategy based on {r.clientData.brand}'s audit findings.</p></div>
    <SectionNote text={`This content grid is tailored to ${r.clientData.brand}'s specific gaps and competitive landscape. Priority P0 = start immediately based on audit findings.`}/>
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
    <Card><h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 12px",fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Monthly Output Requirements for {r.clientData.brand}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Outfit'"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:500,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
      </div>
    </Card>
  </div>);
}

/* ─── PAGE: 90-DAY ROADMAP (Step 08 with premium PDF) ─── */
function RoadmapPage({r,onUpdate}){
  const[regenRoad,setRegenRoad]=useState(false);
  const regenerateRoadmap=async()=>{
    setRegenRoad(true);
    try{
      const brand=r.clientData?.brand||"Brand",industry=r.clientData?.industry||"Technology",region=r.clientData?.region||"Global";
      const prompt=`Create a 90-day AI visibility transformation roadmap for "${brand}" in ${industry} (${region}). Split into 3 phases (Day 1-30, Day 31-60, Day 61-90). Each phase should have a title and 4-6 tasks. Each task needs: title, department (Marketing/Content/SEO/Product/PR), priority (P0/P1/P2), and description.
Return JSON only:
{"day30":{"title":"Foundation","tasks":[{"title":"...","dept":"Marketing","priority":"P0","desc":"..."}]},"day60":{"title":"Growth","tasks":[...]},"day90":{"title":"Scale","tasks":[...]}}`;
      const raw=await callGemini(prompt,"You are a digital strategy consultant. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      if(parsed?.day30&&onUpdate)onUpdate(prev=>({...prev,roadmap:parsed}));
    }catch(e){console.error("Roadmap regeneration failed:",e);}
    setRegenRoad(false);
  };
  if(!r.roadmap||!r.roadmap.day30)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>90-Day Roadmap</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:28,marginBottom:8}}>🗺️</div>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Roadmap not generated</div>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
      <button onClick={regenerateRoadmap} disabled={regenRoad} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenRoad?"#e5e7eb":C.accent,color:regenRoad?"#999":"#fff",border:"none",borderRadius:8,cursor:regenRoad?"default":"pointer",fontFamily:"'Outfit'"}}>{regenRoad?"Generating...":"Generate Roadmap"}</button>
    </div>
  </div>);
  const phases=[r.roadmap.day30,r.roadmap.day60,r.roadmap.day90];


  return(<div>
    <div style={{marginBottom:24}}>
      <h2 style={{fontSize:22,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>90-Day Transformation Roadmap</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Department-by-department plan for <strong>{r.clientData.brand}</strong></p>
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
      <p style={{fontSize:12,color:C.sub,maxWidth:460,margin:"0 auto 14px"}}>Let Entermind execute this strategy and guarantee measurable improvements within 90 days.</p>
      <button onClick={()=>exportPDF(r)} style={{padding:"11px 26px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Export Full Report as PDF</button>
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

/* ─── SUPABASE HELPERS ─── */

async function sbSaveProject(projectData) {
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('user_id', 'default')
    .eq('brand', projectData.brand)
    .limit(1);

  if (existing && existing.length > 0) {
    const { data, error } = await supabase
      .from('projects')
      .update({
        website: projectData.website,
        industry: projectData.industry,
        region: projectData.region,
        competitors: projectData.competitors,
        topics: projectData.topics,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing[0].id)
      .select()
      .single();
    if (error) console.error('Error updating project:', error);
    return data;
  } else {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: 'default',
        brand: projectData.brand,
        website: projectData.website,
        industry: projectData.industry,
        region: projectData.region,
        competitors: projectData.competitors,
        topics: projectData.topics
      })
      .select()
      .single();
    if (error) console.error('Error creating project:', error);
    return data;
  }
}

async function sbSaveAudit(projectId, apiData, computedScores) {
  const { data, error } = await supabase
    .from('audits')
    .insert({
      project_id: projectId,
      user_id: 'default',
      results: apiData,
      overall_score: computedScores?.overall ?? null,
      mention_rate: computedScores?.mentions ?? null,
      citation_rate: computedScores?.citations ?? null,
      sentiment_score: computedScores?.sentiment ?? null
    })
    .select()
    .single();
  if (error) console.error('Error saving audit:', error);
  return data;
}

async function sbLoadProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, audits(id, overall_score, mention_rate, citation_rate, created_at)')
    .eq('user_id', 'default')
    .order('updated_at', { ascending: false });
  if (error) { console.error('Error loading projects:', error); return []; }
  return data || [];
}

async function sbLoadAudit(auditId) {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', auditId)
    .single();
  if (error) { console.error('Error loading audit:', error); return null; }
  return data;
}

async function sbLoadProjectAudits(projectId) {
  const { data, error } = await supabase
    .from('audits')
    .select('id, overall_score, mention_rate, citation_rate, sentiment_score, created_at')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) { console.error('Error loading audits:', error); return []; }
  return data || [];
}

async function sbDeleteProject(projectId) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);
  if (error) console.error('Error deleting project:', error);
  return !error;
}

/* ─── SUPABASE: PLAYBOOK HELPERS ─── */
async function sbLoadPlaybook(projectId) {
  const { data, error } = await supabase
    .from('brand_playbook')
    .select('*')
    .eq('project_id', projectId)
    .maybeSingle();
  if (error) { console.error('Error loading playbook:', error); return null; }
  return data || null;
}

async function sbSavePlaybook(projectId, section, value) {
  const { data: existing } = await supabase
    .from('brand_playbook')
    .select('id')
    .eq('project_id', projectId)
    .single();
  if (existing) {
    const { data, error } = await supabase
      .from('brand_playbook')
      .update({ [section]: value, updated_at: new Date().toISOString() })
      .eq('project_id', projectId)
      .select()
      .single();
    if (error) { console.error('Error updating playbook:', error); return null; }
    return data;
  } else {
    const { data, error } = await supabase
      .from('brand_playbook')
      .insert({ project_id: projectId, [section]: value })
      .select()
      .single();
    if (error) { console.error('Error inserting playbook:', error); return null; }
    return data;
  }
}

async function sbLoadAssets(projectId) {
  const { data, error } = await supabase
    .from('playbook_assets')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) { console.error('Error loading assets:', error); return []; }
  return data || [];
}

async function sbUploadAsset(projectId, file) {
  const path = `${projectId}/${Date.now()}_${file.name}`;
  const { error: uploadErr } = await supabase.storage
    .from('playbook-assets')
    .upload(path, file);
  if (uploadErr) { console.error('Error uploading asset:', uploadErr); return null; }
  const { data: urlData } = supabase.storage
    .from('playbook-assets')
    .getPublicUrl(path);
  const { data, error } = await supabase
    .from('playbook_assets')
    .insert({
      project_id: projectId,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      storage_path: path,
      public_url: urlData.publicUrl,
      category: file.type.startsWith('image/') ? 'image' : 'document'
    })
    .select()
    .single();
  if (error) { console.error('Error saving asset record:', error); return null; }
  return data;
}

async function sbDeleteAsset(assetId, storagePath) {
  const { error: storageErr } = await supabase.storage
    .from('playbook-assets')
    .remove([storagePath]);
  if (storageErr) console.error('Error removing file from storage:', storageErr);
  const { error } = await supabase
    .from('playbook_assets')
    .delete()
    .eq('id', assetId);
  if (error) { console.error('Error deleting asset record:', error); return false; }
  return true;
}

/* ─── SUPABASE: CONTENT HUB HELPERS ─── */
async function sbLoadContent(projectId) {
  const { data, error } = await supabase
    .from('generated_content')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) console.error('Error loading content:', error);
  return data || [];
}

async function sbSaveContent(projectId, content) {
  const { data, error } = await supabase
    .from('generated_content')
    .insert({
      project_id: projectId,
      type: content.type,
      title: content.title,
      content: content.content,
      channel: content.channel || null,
      source_query: content.source_query || null,
      source_roadmap_item: content.source_roadmap_item || null,
      status: content.status || 'draft'
    })
    .select()
    .single();
  if (error) console.error('Error saving content:', error);
  return data;
}

async function sbUpdateContent(contentId, updates) {
  const { data, error } = await supabase
    .from('generated_content')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', contentId)
    .select()
    .single();
  if (error) console.error('Error updating content:', error);
  return data;
}

async function sbDeleteContent(contentId) {
  const { error } = await supabase
    .from('generated_content')
    .delete()
    .eq('id', contentId);
  if (error) console.error('Error deleting content:', error);
  return !error;
}

/* ─── PROJECT HUB ─── */
function ProjectHub({onSelect,onNew,onLogout}){
  const[projects,setProjects]=useState(null);
  const[loading,setLoading]=useState(true);
  const[deleting,setDeleting]=useState(null);
  const[hovered,setHovered]=useState(null);

  React.useEffect(()=>{
    const localProjects=lsGetProjects();
    sbLoadProjects().then(sbProjects=>{
      if(sbProjects.length>0){
        // Map Supabase projects to the shape the hub expects
        const mapped=sbProjects.map(p=>{
          const audits=(p.audits||[]).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
          const latest=audits[0];
          return{
            id:p.id,
            brand:p.brand,
            website:p.website,
            industry:p.industry,
            region:p.region,
            topics:p.topics,
            competitors:p.competitors,
            auditCount:audits.length,
            lastScore:latest?.overall_score||null,
            lastAudit:latest?.created_at||p.updated_at||p.created_at,
            createdAt:p.created_at,
            _supabase:true
          };
        });
        // Merge: Supabase projects win, add any local-only
        const merged=[...mapped];
        localProjects.forEach(lp=>{if(!merged.find(sp=>sp.brand===lp.brand))merged.push(lp);});
        setProjects(merged);setLoading(false);
      }else{
        // Fallback to API + localStorage
        fetch("/api/projects").then(r=>r.json()).then(d=>{
          const apiProjects=d.projects||[];
          const merged=[...apiProjects];
          localProjects.forEach(lp=>{if(!merged.find(ap=>ap.id===lp.id))merged.push(lp);});
          setProjects(merged);setLoading(false);
        }).catch(()=>{setProjects(localProjects);setLoading(false);});
      }
    }).catch(()=>{
      // Supabase failed — fallback to API + localStorage
      fetch("/api/projects").then(r=>r.json()).then(d=>{
        const apiProjects=d.projects||[];
        const merged=[...apiProjects];
        localProjects.forEach(lp=>{if(!merged.find(ap=>ap.id===lp.id))merged.push(lp);});
        setProjects(merged);setLoading(false);
      }).catch(()=>{setProjects(localProjects);setLoading(false);});
    });
  },[]);

  const handleDelete=async(id,e)=>{
    e.stopPropagation();
    if(!confirm("Delete this project and all its audit history?"))return;
    setDeleting(id);
    try{
      await sbDeleteProject(id);
      try{await fetch(`/api/projects?id=${id}`,{method:"DELETE"});}catch(e){}
      lsDeleteProject(id);
      setProjects(projects.filter(p=>p.id!==id));
    }catch(e){
      // Fallback: try old API delete
      try{await fetch(`/api/projects?id=${id}`,{method:"DELETE"});}catch(e2){}
      lsDeleteProject(id);
      setProjects(projects.filter(p=>p.id!==id));
    }
    setDeleting(null);
  };

  const scoreColor=(s)=>!s?C.muted:s>=70?C.green:s>=40?C.amber:C.red;

  return(<div style={{minHeight:"100vh",background:"#fff",fontFamily:"'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}::selection{background:${C.accent}18}`}</style>

    {/* Top nav */}
    <div style={{padding:"14px 32px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Logo/>
      <button onClick={onLogout} style={{padding:"7px 16px",fontSize:12,fontWeight:500,background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Outfit'",transition:"all .15s"}}
        onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.sub;}}
        onMouseLeave={e=>{e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor=C.border;}}>Log Out</button>
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"40px 32px",animation:"fadeIn .5s ease-out"}}>
      {/* Page header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:600,color:C.text,margin:0,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Client Management</h1>
        </div>
      </div>

      {/* Workspaces section */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:"#fff"}}>
        <div style={{padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/></svg>
            <span style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Outfit'",letterSpacing:"-.02em"}}>Workspaces</span>
          </div>
          <button onClick={onNew} style={{padding:"8px 18px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'",display:"flex",alignItems:"center",gap:5,transition:"opacity .15s"}}
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
          <p style={{color:C.muted,fontSize:13,margin:"0 0 20px"}}>Create your first workspace to start tracking visibility.</p>
          <button onClick={onNew} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit'"}}>Create workspace</button>
        </div>:
        <div>
          {projects.sort((a,b)=>new Date(b.lastAudit||b.createdAt)-new Date(a.lastAudit||a.createdAt)).map((p,pi)=>(
            <div key={p.id} onClick={()=>onSelect(p)}
              onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
              style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:pi<projects.length-1?`1px solid ${C.borderSoft}`:"none",background:hovered===p.id?"#f8fafc":"transparent",transition:"background .15s"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <BrandLogo name={p.brand} website={p.website} size={36} color={C.accent}/>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:C.text}}>{p.brand}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:1}}>
                    {p.lastAudit&&p.auditCount>0?`Last audit: ${new Date(p.lastAudit).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}${p.lastScore!=null?` \u00B7 Score: ${p.lastScore}%`:""}`:"No audits yet"}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
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
      // Supabase project — load latest audit from Supabase
      if(projectSummary._supabase){
        const audits=await sbLoadProjectAudits(projectSummary.id);
        const project={...projectSummary,history:[]};
        if(audits.length>0){
          const fullAudit=await sbLoadAudit(audits[0].id);
          if(fullAudit&&fullAudit.results){
            // Build history from all audits for the performance chart
            const historyEntries=audits.map(a=>({
              date:new Date(a.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
              overall:a.overall_score,
              mentions:a.mention_rate,
              citations:a.citation_rate,
              sentimentAvg:a.sentiment_score,
              mentionsPerEngine:{gpt:a.mention_rate,gemini:a.mention_rate},
              citationsPerEngine:{gpt:a.citation_rate,gemini:a.citation_rate},
              sentimentPerEngine:{gpt:a.sentiment_score||50,gemini:a.sentiment_score||50},
              apiData:null // only latest gets full data
            })).reverse();
            const lastAudit={...historyEntries[historyEntries.length-1],apiData:fullAudit.results};
            project.history=historyEntries.map((h,i)=>i===historyEntries.length-1?lastAudit:h);
            setProjectPrompt({project,lastAudit});
          }else{
            openProjectForAudit(project);
          }
        }else{
          openProjectForAudit(project);
        }
        return;
      }
      // Legacy: old API + localStorage path
      let project=null;
      try{
        const res=await fetch(`/api/projects?id=${projectSummary.id}`);
        const data=await res.json();
        if(!data.error)project=data;
      }catch(e){}
      if(!project)project=lsGetProject(projectSummary.id);
      if(!project){alert("Failed to load project");return;}
      const lastAudit=(project.history||[]).length>0?(project.history||[])[project.history.length-1]:null;
      if(lastAudit&&lastAudit.apiData){
        setProjectPrompt({project,lastAudit});
      }else{
        openProjectForAudit(project);
      }
    }catch(e){console.error("Failed to load project:",e);alert("Failed to load project");}
  };

  const openProjectForAudit=(project)=>{
    setProjectPrompt(null);
    setActiveProject(project);
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
    setHistory((project.history||[]).map(h=>({date:h.date||new Date(h.timestamp||h.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),...h})));
    setResults(null);
    setStep("input");
    setScreen("dashboard");
  };

  const openProjectDashboard=(project,lastAudit)=>{
    setProjectPrompt(null);
    setActiveProject(project);
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}]});
    setHistory((project.history||[]).map(h=>({date:h.date||new Date(h.timestamp||h.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),...h})));
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
        <h2 style={{fontSize:20,fontWeight:600,color:C.text,margin:"0 0 2px",fontFamily:"'Outfit'",letterSpacing:"-.02em",textAlign:"center"}}>Welcome back</h2>
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
          <button onClick={()=>openProjectForAudit(projectPrompt.project)} style={{flex:1,padding:"14px 20px",background:C.accent,border:`2px solid ${C.accent}`,borderRadius:12,fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"'Outfit'",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:"#1d4ed8"})} onMouseLeave={e=>Object.assign(e.target.style,{background:C.accent})}>Run Audit</button>
        </div>
        <div onClick={()=>setProjectPrompt(null)} style={{textAlign:"center",marginTop:16,fontSize:12,color:C.muted,cursor:"pointer"}}>Cancel</div>
      </div>
    </div>)}
  </>);

  const run=async(apiData)=>{
    if(apiData&&apiData.error){
      // Fatal error — still generate with whatever partial data we have
      const r=generateAll(data, apiData);
      r._auditError=apiData.errorMessage||"The audit encountered an error.";
      setResults(r);setStep("dashboard");return;
    }
    const r=generateAll(data, apiData);setResults(r);
    const entry={date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:r.overall,engines:[r.engines[0].score,r.engines[1].score],mentions:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citations:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),mentionsPerEngine:{gpt:r.engines[0].mentionRate,gemini:r.engines[1].mentionRate},citationsPerEngine:{gpt:r.engines[0].citationRate,gemini:r.engines[1].citationRate},sentimentPerEngine:{gpt:r.sentiment.brand.gpt,gemini:r.sentiment.brand.gemini},sentimentAvg:r.sentiment.brand.avg,categories:r.painPoints.map(p=>({label:p.label,score:p.score})),apiData:apiData};
    setHistory(prev=>[...prev,entry]);
    setStep("dashboard");

    // Save to localStorage as backup
    try{localStorage.setItem('enterrank_lastAudit',JSON.stringify(apiData));}catch(e){}

    // Save to Supabase (primary)
    try{
      const project=await sbSaveProject({
        brand:data.brand,
        website:data.website,
        industry:data.industry,
        region:data.region,
        competitors:data.competitors,
        topics:data.topics
      });
      if(project){
        await sbSaveAudit(project.id,apiData,{overall:entry.overall,mentions:entry.mentions,citations:entry.citations,sentiment:entry.sentimentAvg});
        console.log('Audit saved to Supabase:',project.id);
        setActiveProject({...project,_supabase:true});
      }
    }catch(e){
      console.error('Failed to save to Supabase:',e);
    }

    // Also save to old API + localStorage as fallback
    if(!isLocal){try{
      if(activeProject&&!activeProject._supabase){
        const res=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:activeProject.id,auditEntry:entry})});
        const updated=await res.json();
        if(!updated.error){lsSaveProject(updated);}
        else{const lp=lsGetProject(activeProject.id);if(lp){lp.history=[...(lp.history||[]),{...entry,timestamp:new Date().toISOString()}];lp.lastAudit=new Date().toISOString();lp.lastScore=entry.overall;lsSaveProject(lp);}}
      }else if(!activeProject){
        const res=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({brand:data.brand,industry:data.industry,website:data.website,region:data.region,topics:data.topics,competitors:data.competitors})});
        const created=await res.json();
        if(!created.error){
          const res2=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:created.id,auditEntry:entry})});
          const updated2=await res2.json();
          if(!updated2.error){lsSaveProject(updated2);}else{lsSaveProject(created);}
        }else{
          const localId=data.brand.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+Date.now().toString(36);
          const localProject={id:localId,brand:data.brand,industry:data.industry,website:data.website,region:data.region,topics:data.topics,competitors:data.competitors,history:[{...entry,timestamp:new Date().toISOString()}],lastAudit:new Date().toISOString(),lastScore:entry.overall,createdAt:new Date().toISOString()};
          lsSaveProject(localProject);
        }
      }
    }catch(e){console.error("Failed to save project (legacy):",e);}}
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
        {step==="archetypes"&&results&&<ArchetypesPage r={results} goTo={setStep} onUpdate={setResults}/>}
        {step==="sentiment"&&results&&<SentimentPage r={results}/>}
        {step==="intent"&&results&&<IntentPage r={results} goTo={setStep}/>}
        {step==="playbook"&&results&&<PlaybookPage r={results} goTo={setStep} activeProject={activeProject}/>}
        {step==="channels"&&results&&<ChannelsPage r={results} goTo={setStep} onUpdate={setResults}/>}
        {step==="contenthub"&&results&&<ContentHubPage r={results} goTo={setStep} activeProject={activeProject} onUpdate={setResults}/>}
        {step==="roadmap"&&results&&<RoadmapPage r={results} onUpdate={setResults}/>}
      </div>
    </div>
  </div>);
}
