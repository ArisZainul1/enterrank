import React, { useState } from "react";
import { supabase, sbSignUp, sbSignIn, sbSignOut, sbGetSession, sbOnAuthChange } from './supabase';
import jsPDF from "jspdf";
import "jspdf-autotable";

async function getAuthToken() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || "";
  } catch (e) {
    return "";
  }
}

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const C={bg:"#f8f9fb",surface:"#ffffff",border:"#e2e8f0",borderSoft:"#f0f2f5",text:"#111827",sub:"#4b5563",muted:"#9ca3af",accent:"#2563eb",green:"#059669",amber:"#d97706",red:"#dc2626",r:12,rs:8};
const CARD={base:{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"20px 24px",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"all 0.15s ease"},hover:{boxShadow:"0 4px 12px rgba(0,0,0,0.07)",borderColor:"#cbd5e1",transform:"translateY(-1px)"}};
const ENGINE_WEIGHTS={
  "Global":{chatgpt:0.45,gemini:0.20,perplexity:0.03,googleai:0.32},
  "United States":{chatgpt:0.42,gemini:0.15,perplexity:0.06,googleai:0.37},
  "United Kingdom":{chatgpt:0.40,gemini:0.18,perplexity:0.06,googleai:0.36},
  "Malaysia":{chatgpt:0.38,gemini:0.22,perplexity:0.04,googleai:0.36},
  "Singapore":{chatgpt:0.37,gemini:0.23,perplexity:0.04,googleai:0.36},
  "Indonesia":{chatgpt:0.35,gemini:0.25,perplexity:0.04,googleai:0.36},
  "India":{chatgpt:0.40,gemini:0.20,perplexity:0.04,googleai:0.36},
  "Australia":{chatgpt:0.40,gemini:0.18,perplexity:0.06,googleai:0.36},
  "Germany":{chatgpt:0.38,gemini:0.20,perplexity:0.06,googleai:0.36},
  "France":{chatgpt:0.38,gemini:0.20,perplexity:0.06,googleai:0.36},
  "Japan":{chatgpt:0.40,gemini:0.20,perplexity:0.04,googleai:0.36},
  "South Korea":{chatgpt:0.37,gemini:0.22,perplexity:0.05,googleai:0.36},
  "Brazil":{chatgpt:0.42,gemini:0.18,perplexity:0.04,googleai:0.36},
  "Canada":{chatgpt:0.40,gemini:0.16,perplexity:0.07,googleai:0.37},
  "UAE":{chatgpt:0.38,gemini:0.22,perplexity:0.05,googleai:0.35},
  "Saudi Arabia":{chatgpt:0.38,gemini:0.22,perplexity:0.05,googleai:0.35},
  "Philippines":{chatgpt:0.37,gemini:0.23,perplexity:0.04,googleai:0.36},
  "Thailand":{chatgpt:0.36,gemini:0.24,perplexity:0.04,googleai:0.36},
  "Vietnam":{chatgpt:0.35,gemini:0.25,perplexity:0.04,googleai:0.36},
  "Europe":{chatgpt:0.38,gemini:0.20,perplexity:0.06,googleai:0.36},
  "Southeast Asia":{chatgpt:0.36,gemini:0.24,perplexity:0.04,googleai:0.36},
  "Middle East":{chatgpt:0.38,gemini:0.22,perplexity:0.05,googleai:0.35},
  "Asia Pacific":{chatgpt:0.38,gemini:0.22,perplexity:0.04,googleai:0.36}
};
function getEngineWeights(region){
  if(!region)return ENGINE_WEIGHTS["Global"];
  const rl=region.toLowerCase();
  for(const[key,weights]of Object.entries(ENGINE_WEIGHTS)){if(key.toLowerCase()===rl)return weights;}
  for(const[key,weights]of Object.entries(ENGINE_WEIGHTS)){if(rl.includes(key.toLowerCase())||key.toLowerCase().includes(rl))return weights;}
  return ENGINE_WEIGHTS["Global"];
}
const CATEGORY_WEIGHTS={"Structured Data / Schema Markup":0.20,"Structured Data":0.20,"Content Authority / Depth":0.25,"Content Authority":0.25,"E-E-A-T Signals":0.20,"Technical SEO Foundations":0.10,"Technical SEO":0.10,"Citation Network / Linking":0.15,"Citation Network":0.15,"Content Freshness":0.10};
function getCategoryWeight(label){const clean=label.split("/")[0].trim().toLowerCase();for(const[key,weight]of Object.entries(CATEGORY_WEIGHTS)){const kClean=key.toLowerCase().split("/")[0].trim();if(kClean.includes(clean)||clean.includes(kClean))return weight;}return 1/6;}
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.26,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{score}%</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{...CARD.base,...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}

class ErrorBoundary extends React.Component{constructor(props){super(props);this.state={hasError:false};}static getDerivedStateFromError(){return{hasError:true};}componentDidCatch(error,errorInfo){console.error("Section render error:",error,errorInfo);}render(){if(this.state.hasError){return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:14,fontWeight:500,color:"#dc2626",marginBottom:8}}>Something went wrong</div><div style={{fontSize:12,color:"#6b7280",lineHeight:1.6}}>This section could not be loaded. Try refreshing the page or running a new audit.</div><button onClick={()=>this.setState({hasError:false})} style={{marginTop:12,padding:"6px 14px",fontSize:11,background:"none",border:"1px solid #e2e8f0",borderRadius:6,cursor:"pointer",color:"#6b7280",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Try Again</button></div>);}return this.props.children;}}
function BrandLogo({name,website,size=22,color}){
  const[src,setSrc]=useState(null);
  const[fallback,setFallback]=useState(false);
  const domain=website?website.replace(/^https?:\/\//,"").replace(/\/.*$/,""):null;
  React.useEffect(()=>{setSrc(domain?`https://img.logo.dev/${domain}?token=${window.__LOGO_TOKEN||"pk_V2YlDNlxSO61y2CJt0JSDQ"/* public Logo.dev display token — no billing risk */}&size=${size*2}&format=png`:null);setFallback(false);},[domain,size]);
  if(src&&!fallback)return <img src={src} width={size} height={size} style={{borderRadius:size/4,objectFit:"contain",background:"#fff"}} onError={()=>{if(src.includes("logo.dev")){setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size*2}`);}else{setFallback(true);}}} alt={name}/>;
  return <div style={{width:size,height:size,borderRadius:size/4,background:color||"#ccc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.5,fontWeight:700,color:"#fff"}}>{(name||"?")[0]}</div>;
}
function TagInput({label,tags,setTags,placeholder}){const[input,setInput]=useState("");const add=()=>{const v=input.trim();if(v&&!tags.includes(v)){setTags([...tags,v]);setInput("");}};return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,minHeight:40,alignItems:"center"}}>{tags.map((tag,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",background:`${C.accent}15`,color:C.accent,borderRadius:100,fontSize:12,fontWeight:500}}>{tag}<span onClick={()=>setTags(tags.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:.6,fontSize:14}}>×</span></span>))}<input value={input} onChange={e=>setInput(e.target.value)} placeholder={tags.length===0?placeholder:""} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}} style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:C.text,flex:1,minWidth:80,fontFamily:"inherit"}}/></div><span style={{fontSize:10,color:C.muted}}>Press Enter to add</span></div>);}
function normalizeUrl(url){if(!url||typeof url!=="string")return "";url=url.trim();if(!url)return "";if(url.startsWith("https://"))return url;if(url.startsWith("http://"))return url.replace("http://","https://");return "https://"+url;}
const formatAuditDate=(d)=>{const date=d instanceof Date?d:new Date(d);return date.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});};
function Field({label,value,onChange,placeholder,onBlur:onBlurCb}){return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label.endsWith(" *")?<>{label.slice(0,-2)}<span style={{color:C.red}}> *</span></>:label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,color:C.text,fontSize:14,outline:"none",fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>{e.target.style.borderColor=C.border;if(onBlurCb)onBlurCb(e);}}/></div>);}
function InfoTip({text}){const[show,setShow]=useState(false);return(<span style={{position:"relative",display:"inline-flex",marginLeft:4,cursor:"help"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}><span style={{width:14,height:14,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.muted,fontWeight:600}}>?</span>{show&&<div style={{position:"absolute",top:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",width:240,padding:"8px 10px",background:C.text,color:"#fff",borderRadius:8,fontSize:11,lineHeight:1.5,zIndex:99999,boxShadow:"0 8px 24px rgba(0,0,0,.2)",pointerEvents:"none"}}><div style={{position:"absolute",top:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:C.text}}/>{text}</div>}</span>);}
function SectionNote({text}){return <div style={{padding:"10px 14px",background:`${C.accent}04`,border:`1px solid ${C.accent}10`,borderRadius:C.rs,marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}><span style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{text}</span></div>;}
function NavBtn({onClick,label}){return <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}><button onClick={onClick} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all 0.15s ease"}} onMouseEnter={e=>Object.assign(e.target.style,{opacity:"0.9",transform:"translateY(-1px)",boxShadow:"0 2px 8px rgba(37,99,235,0.25)"})} onMouseLeave={e=>Object.assign(e.target.style,{opacity:"1",transform:"translateY(0)",boxShadow:"none"})}>{label}</button></div>;}
function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:9}}><img src="/enterank-icon.svg" alt="EnterRank" style={{width:28,height:28}}/><div><span style={{fontWeight:800,fontSize:16,color:C.text,letterSpacing:"-.03em",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>EnterRank</span><span style={{fontSize:9,color:C.muted,marginLeft:6,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>by Entermind</span></div></div>);}
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
        <span style={{fontWeight:600,color:hover===i?a.color:C.text,flexShrink:0,fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"color .1s"}}>{a.pct}%</span>
      </div>))}
    </div>
  </div>);
}

/* ─── MULTI-ENGINE API LAYER ─── */
async function callWithRetry(fn, maxRetries=2, baseDelayMs=2000){
  for(let attempt=0;attempt<=maxRetries;attempt++){
    try{
      const result=await fn();
      if(result!==null)return result;
      if(attempt===maxRetries)return null;
      await new Promise(r=>setTimeout(r,baseDelayMs*Math.pow(2,attempt)));
    }catch(e){
      const isRetryable=e.name==="AbortError"||e.message?.includes("429")||e.message?.includes("rate")||e.message?.includes("quota")||e.message?.includes("timeout")||e.message?.includes("abort")||e.message?.includes("ECONNRESET")||e.message?.includes("fetch failed")||e.message?.includes("500")||e.message?.includes("502")||e.message?.includes("503");
      if(attempt===maxRetries||!isRetryable){
        console.error(`API call failed after ${attempt+1} attempts:`,e.message||e);
        return null;
      }
      const delay=Math.min(baseDelayMs*Math.pow(2,attempt),10000);
      console.warn(`Retry ${attempt+1}/${maxRetries} after ${delay}ms:`,e.message||e);
      await new Promise(r=>setTimeout(r,delay));
    }
  }
  return null;
}
async function runInBatches(tasks, batchSize = 3, delayMs = 500) {
  const results = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn => fn()));
    results.push(...batchResults);
    if (i + batchSize < tasks.length) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  return results;
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
    const timeout=setTimeout(()=>controller.abort(),55000);
    try{
      const __token=await getAuthToken();const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({prompt,systemPrompt}),signal:controller.signal});
      clearTimeout(timeout);
      if(!res.ok&&[400,401,404].includes(res.status))return null;
      if(!res.ok)throw new Error(res.status+" "+res.statusText);
      const data=await res.json();
      if(data.error){throw new Error("API: "+data.error);}
      if(data.rateLimit?.remaining&&parseInt(data.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);throw e;}
  });
}

async function callOpenAI4o(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),55000);
    try{
      const __token=await getAuthToken();const res=await fetch("/api/openai",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({prompt,systemPrompt,model:"gpt-4o"}),signal:controller.signal});
      clearTimeout(timeout);
      if(!res.ok&&[400,401,404].includes(res.status))return null;
      if(!res.ok)throw new Error(res.status+" "+res.statusText);
      const data=await res.json();
      if(data.error){throw new Error("API: "+data.error);}
      if(data.rateLimit?.remaining&&parseInt(data.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);throw e;}
  });
}

async function callGemini(prompt, systemPrompt="You are an expert AEO analyst."){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),55000);
    try{
      const __token=await getAuthToken();const res=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({prompt,systemPrompt}),signal:controller.signal});
      clearTimeout(timeout);
      if(!res.ok&&[400,401,404].includes(res.status))return null;
      if(!res.ok)throw new Error(res.status+" "+res.statusText);
      const data=await res.json();
      if(data.error){
        if(data.error.includes("SAFETY")||data.error.includes("block"))return "";
        throw new Error("API: "+data.error);
      }
      return validateResponse(data.text)||"";
    }catch(e){clearTimeout(timeout);throw e;}
  });
}

async function callGeminiWithCitations(prompt, systemPrompt="You are an expert AEO analyst."){
  try{
    const __token=await getAuthToken();const res=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({prompt,systemPrompt})});
    if(!res.ok)return{text:"",citations:[]};
    const data=await res.json();
    return{
      text:data.text||(typeof data==="string"?data:""),
      citations:data.citations||[]
    };
  }catch(e){
    console.error("Gemini with citations failed:",e);
    return{text:"",citations:[]};
  }
}

async function callOpenAISearch(query, region){
  return callWithRetry(async()=>{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),75000);
    try{
      const __token=await getAuthToken();const r=await fetch("/api/openai-search",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({query,region}),signal:controller.signal});
      clearTimeout(timeout);
      if(!r.ok&&[400,401,404].includes(r.status))return null;
      if(!r.ok)throw new Error(r.status+" "+r.statusText);
      const d=await r.json();
      if(d.error&&!d.result){throw new Error("API: "+d.error);}
      if(d.rateLimit?.remaining&&parseInt(d.rateLimit.remaining)<5)await new Promise(r=>setTimeout(r,3000));
      return{text:d.result||"",citations:d.citations||[]};
    }catch(e){clearTimeout(timeout);throw e;}
  })||{text:"",citations:[]};
}

async function callPerplexity(query, systemPrompt){
  try{
    const __token=await getAuthToken();const res=await fetch("/api/perplexity",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({prompt:query,systemPrompt:systemPrompt||""})});
    if(!res.ok)return{text:"",citations:[]};
    const data=await res.json();
    return{text:data.result||"",citations:(data.citations||[]).map(c=>({url:c.url||c,title:c.title||""}))};
  }catch(e){
    console.error("Perplexity call failed:",e);
    return{text:"",citations:[]};
  }
}

async function callGoogleAI(query, region){
  try{
    const __token=await getAuthToken();const res=await fetch("/api/serpapi",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({query,region:region||""})});
    if(!res.ok)return{text:"",citations:[]};
    const data=await res.json();
    if(data.error){console.warn("Google AI Mode not available:",data.error);return{text:"",citations:[]};}
    return{text:data.result||"",citations:(data.citations||[]).map(c=>({url:c.url||"",title:c.title||""}))};
  }catch(e){console.error("Google AI Mode call failed:",e);return{text:"",citations:[]};}
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
    const __token=await getAuthToken();const res=await fetch("/api/crawl",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({url})});
    const data=await res.json();
    if(data.error&&!data.domain)return null;
    return{mainPage:data};
  }catch(e){console.error("Crawl error for "+url+":",e);return null;}
}

async function verifyChannels(brand, website, industry, region){
  try{
    const isLocal=typeof window!=="undefined"&&window.location.hostname==="localhost";
    if(isLocal)return null;
    const __token=await getAuthToken();const res=await fetch("/api/channels",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+__token},body:JSON.stringify({brand,website,industry,region})});
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

function scoreCrawlData(crawl){
  if(!crawl)return null;
  // Handle multiple data shapes from crawl API
  let mp,spRaw,schemas;
  if(crawl.mainPage){
    // Brand crawl: { mainPage: { ... } } — schemas might be at mainPage level
    mp=crawl.mainPage;
    spRaw=mp.subPages||crawl.subPages||[];
    // Schemas could be at mp.schemas OR crawl.schemas — check both, prefer non-empty
    schemas=(mp.schemas&&mp.schemas.length>0)?mp.schemas:(crawl.schemas||[]);
  }else if(crawl.url||crawl.domain||crawl.schemas||crawl.homepageWordCount){
    // Competitor crawl: flat structure, no mainPage wrapper
    mp=crawl;
    spRaw=crawl.subPages||[];
    schemas=crawl.schemas||[];
  }else{
    return null;
  }
  // Normalize field names — crawl API uses different names than expected
  const wordCount=mp.totalWordCount||mp.wordCount||mp.homepageWordCount||0;
  const internalLinks=mp.internalLinks||0;
  const externalLinks=mp.externalLinks||0;
  const imageCount=mp.imageCount||mp.contentStructure?.imageCount||0;
  const tableCount=mp.tableCount||mp.contentStructure?.tableCount||0;
  const listCount=mp.listCount||mp.contentStructure?.listCount||0;
  const h1s=mp.h1s||[];
  const h2s=mp.h2s||[];
  const h3Count=mp.h3s?.length||mp.h3Count||mp.contentStructure?.h3Count||0;
  // Derive boolean flags from schemas array (these don't exist as direct fields in crawl API)
  const hasFAQ=schemas.some(s=>s==="FAQPage"||s==="Question")||!!mp.hasFAQMarkup||!!mp.hasFAQSchema||!!mp.aeoSignals?.faqSchema;
  const hasArticle=schemas.some(s=>["Article","NewsArticle","BlogPosting","TechArticle"].includes(s))||!!mp.hasArticleMarkup||!!mp.hasArticleSchema||!!mp.aeoSignals?.articleSchema;
  const hasOrg=schemas.some(s=>["Organization","LocalBusiness","Corporation"].includes(s))||!!mp.hasOrgSchema||!!mp.aeoSignals?.orgSchema;
  const hasProduct=schemas.some(s=>s==="Product")||!!mp.hasProductSchema||!!mp.aeoSignals?.productSchema;
  const hasBreadcrumb=schemas.some(s=>s==="BreadcrumbList")||!!mp.hasBreadcrumb||!!mp.aeoSignals?.breadcrumbs;
  const hasHowTo=schemas.some(s=>s==="HowTo")||!!mp.hasHowToSchema||!!mp.aeoSignals?.howToSchema;
  const hasSpeakable=schemas.some(s=>s==="Speakable")||!!mp.hasSpeakable||!!mp.aeoSignals?.speakable;
  const hasVideo=!!mp.hasVideo||!!mp.aeoSignals?.video||schemas.some(s=>s==="VideoObject");
  const hasAuthorInfo=!!mp.hasAuthorInfo||!!mp.aeoSignals?.authorInfo;
  const hasTrustSignals=!!mp.hasTrustSignals||!!mp.aeoSignals?.trustSignals;
  const hasTestimonials=!!mp.hasTestimonials||!!mp.aeoSignals?.testimonials;
  const hasOpenGraph=!!mp.hasOpenGraph||!!mp.aeoSignals?.openGraph||!!mp.ogTitle;
  const hasTwitterCard=!!mp.hasTwitterCard||!!mp.aeoSignals?.twitterCard||!!mp.twitterCard;
  const hasCanonical=!!mp.hasCanonical||!!mp.aeoSignals?.canonical;
  const hasHreflang=!!mp.hasHreflang||!!mp.aeoSignals?.hreflang;
  // Normalize subPages — could be array [{url,title}] or object {blog:{url}}
  let hasBlog=false,hasAbout=false,hasFaqPage=false,hasProducts=false;
  if(mp.aeoSignals?.hasBlog)hasBlog=true;
  if(mp.aeoSignals?.hasFaqPage)hasFaqPage=true;
  if(Array.isArray(spRaw)){
    if(!hasBlog)hasBlog=spRaw.some(p=>/blog|resource|news|article/i.test(p.url||p.title||""));
    if(!hasAbout)hasAbout=spRaw.some(p=>/about/i.test(p.url||p.title||""));
    if(!hasFaqPage)hasFaqPage=spRaw.some(p=>/faq|help/i.test(p.url||p.title||""));
    if(!hasProducts)hasProducts=spRaw.some(p=>/product|service|pricing|plan/i.test(p.url||p.title||""));
  }else if(spRaw&&typeof spRaw==="object"){
    if(!hasBlog)hasBlog=!!spRaw.blog;
    if(!hasAbout)hasAbout=!!spRaw.about;
    if(!hasFaqPage)hasFaqPage=!!spRaw.faq;
    if(!hasProducts)hasProducts=!!spRaw.products;
  }
  const cats=[];
  // 1. Structured Data / Schema (0-100)
  let s1=0;const e1=[];
  if(schemas.length>0){s1+=15;e1.push(schemas.length+" schema types detected: "+schemas.join(", "));}
  if(hasFAQ){s1+=20;e1.push("FAQ schema detected");}else{e1.push("No FAQ schema");}
  if(hasArticle){s1+=15;e1.push("Article schema detected");}else{e1.push("No Article schema");}
  if(hasOrg){s1+=20;e1.push("Organization schema detected");}else{e1.push("No Organization schema");}
  if(hasProduct){s1+=10;e1.push("Product schema detected");}
  if(hasBreadcrumb){s1+=8;e1.push("Breadcrumb schema detected");}
  if(hasHowTo){s1+=7;e1.push("HowTo schema detected");}
  if(hasSpeakable){s1+=5;e1.push("Speakable schema detected");}
  if(schemas.length===0&&!hasFAQ&&!hasArticle&&!hasOrg&&!hasProduct){e1.unshift("No JSON-LD schema markup detected");}
  cats.push({label:"Structured Data / Schema",score:Math.min(100,s1),evidence:e1});
  // 2. Content Authority
  let s2=0;const e2=[];
  if(wordCount>=3000){s2+=30;e2.push(wordCount.toLocaleString()+" words (excellent depth)");}else if(wordCount>=1500){s2+=20;e2.push(wordCount.toLocaleString()+" words (good depth)");}else if(wordCount>=500){s2+=10;e2.push(wordCount.toLocaleString()+" words (thin content)");}else{e2.push(wordCount+" words (very thin)");}
  if(hasBlog){s2+=25;e2.push("Blog/content hub found");}else{e2.push("No blog detected");}
  if(hasFaqPage){s2+=15;e2.push("FAQ page found");}else{e2.push("No FAQ page");}
  if(hasProducts){s2+=10;e2.push("Products/services page found");}
  if(h2s.length>=5){s2+=10;e2.push(h2s.length+" H2 headings");}else if(h2s.length>=2){s2+=5;e2.push(h2s.length+" H2 headings");}
  if(tableCount>0||listCount>0){s2+=10;e2.push("Structured content (tables/lists) present");}
  cats.push({label:"Content Authority",score:Math.min(100,s2),evidence:e2});
  // 3. E-E-A-T Signals
  let s3=0;const e3=[];
  if(hasAuthorInfo){s3+=25;e3.push("Author attribution detected");}else{e3.push("No author info");}
  if(hasTrustSignals){s3+=20;e3.push("Trust signals detected");}else{e3.push("No trust signals");}
  if(hasTestimonials){s3+=20;e3.push("Testimonials/reviews detected");}else{e3.push("No testimonials");}
  if(hasAbout){s3+=15;e3.push("About page found");}else{e3.push("No about page");}
  if(hasOrg){s3+=10;e3.push("Organization schema supports entity verification");}
  if(hasVideo){s3+=10;e3.push("Video content detected");}
  cats.push({label:"E-E-A-T Signals",score:Math.min(100,s3),evidence:e3});
  // 4. Technical SEO
  let s4=0;const e4=[];
  if(hasOpenGraph){s4+=15;e4.push("Open Graph tags present");}else{e4.push("Missing Open Graph");}
  if(hasTwitterCard){s4+=10;e4.push("Twitter Card present");}else{e4.push("Missing Twitter Card");}
  if(hasCanonical){s4+=15;e4.push("Canonical URL present");}else{e4.push("Missing canonical");}
  if(h1s.length===1){s4+=15;e4.push("Single H1 (correct)");}else if(h1s.length>1){s4+=5;e4.push(h1s.length+" H1s (should be 1)");}else{e4.push("No H1 tag");}
  if(h2s.length>0&&h3Count>0){s4+=10;e4.push("Proper heading hierarchy");}
  if(internalLinks>=20){s4+=15;e4.push(internalLinks+" internal links");}else if(internalLinks>=10){s4+=8;e4.push(internalLinks+" internal links");}else{e4.push(internalLinks+" internal links (weak)");}
  if(hasHreflang){s4+=10;e4.push("Hreflang present");}
  if(imageCount>0){s4+=10;e4.push(imageCount+" images");}
  cats.push({label:"Technical SEO",score:Math.min(100,s4),evidence:e4});
  // 5. Citation Network
  let s5=0;const e5=[];
  if(externalLinks>=10){s5+=20;e5.push(externalLinks+" external links");}else if(externalLinks>=3){s5+=10;e5.push(externalLinks+" external links");}else{e5.push((externalLinks||0)+" external links (weak)");}
  if(internalLinks>=30){s5+=25;e5.push(internalLinks+" internal links (excellent)");}else if(internalLinks>=15){s5+=15;e5.push(internalLinks+" internal links");}else{s5+=5;e5.push(internalLinks+" internal links (poor)");}
  if(hasBreadcrumb){s5+=15;e5.push("Breadcrumb navigation");}
  if(hasBlog){s5+=15;e5.push("Blog creates link opportunities");}
  if(schemas.length>=3){s5+=10;e5.push("Rich schema aids knowledge graph");}
  if(hasSpeakable){s5+=15;e5.push("Speakable markup for voice citations");}
  cats.push({label:"Citation Network",score:Math.min(100,s5),evidence:e5});
  // 6. Content Freshness
  let s6=40;const e6=["Baseline score — publish dates not detectable from crawl"];
  if(hasBlog){s6+=20;e6.push("Blog suggests regular updates");}
  if(hasArticle){s6+=15;e6.push("Article schema suggests active publishing");}
  if(wordCount>=2000){s6+=10;e6.push("Substantial content volume");}
  if(hasVideo){s6+=10;e6.push("Video content detected");}
  if(hasProducts){s6+=5;e6.push("Active product pages");}
  cats.push({label:"Content Freshness",score:Math.min(100,s6),evidence:e6});
  return{categories:cats};
}

function analyzeSentimentFromResponses(responses,brandName){
  if(!responses||responses.length===0)return{score:50,positive:0,negative:0,neutral:0,posWords:[],negWords:[]};
  const escaped=brandName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const nameRegex=new RegExp('\\b'+escaped+'\\b','i');
  const posPatterns=[
    /\b(?:recommend|excellent|outstanding|leading|top\s+choice|best|superior|innovative|reliable|trusted|popular|preferred|well[\s-]?known|reputable|impressive|comprehensive|competitive|affordable|seamless|award[\s-]?winning)\b/gi,
    /\b(?:highly\s+rated|top[\s-]?rated|first\s+choice|market\s+leader|well[\s-]?established|user[\s-]?friendly|widely\s+(?:used|recognized|available))\b/gi,
    new RegExp('(?:recommend|suggest|consider|try)\\s+(?:\\w+\\s+){0,3}'+escaped,'gi'),
    new RegExp(escaped+'\\s+(?:is|are|has|offers?)\\s+(?:a\\s+)?(?:great|excellent|solid|strong|reliable|popular|leading|top|comprehensive|robust)','gi')
  ];
  const negPatterns=[
    /\b(?:drawback|limitation|downside|lacks?|missing|weak|poor|expensive|overpriced|complaints?|issues?|problems?|concerns?|behind|inferior|outdated|inconsistent)\b/gi,
    /\b(?:not\s+(?:the\s+)?(?:best|ideal|recommended)|could\s+(?:be\s+)?(?:better|improved)|room\s+for\s+improvement|falls?\s+short|doesn't\s+(?:offer|provide|support))\b/gi,
    /\b(?:limited\s+(?:coverage|options|features|support)|higher\s+(?:prices?|costs?|rates?)|slower|fewer|lag(?:s|ging)?)\b/gi
  ];
  let posCount=0,negCount=0,neuCount=0;
  const posWords=new Set(),negWords=new Set();
  responses.forEach(r=>{
    const text=typeof r==='string'?r:(r.response||r.text||'');
    if(!nameRegex.test(text))return;
    const sentences=text.split(/[.!?]+/).filter(s=>nameRegex.test(s));
    sentences.forEach(sentence=>{
      let foundPos=false,foundNeg=false;
      posPatterns.forEach(p=>{const m=sentence.match(p);if(m){foundPos=true;m.forEach(w=>posWords.add(w.trim().toLowerCase()));}});
      negPatterns.forEach(p=>{const m=sentence.match(p);if(m){foundNeg=true;m.forEach(w=>negWords.add(w.trim().toLowerCase()));}});
      if(foundPos&&!foundNeg)posCount++;
      else if(foundNeg&&!foundPos)negCount++;
      else neuCount++;
    });
  });
  const total=posCount+negCount+neuCount;
  if(total===0)return{score:45,positive:0,negative:0,neutral:0,posWords:[],negWords:[]};
  const score=Math.round(50+((posCount/total)*40)-((negCount/total)*40));
  return{score:Math.max(10,Math.min(95,score)),positive:posCount,negative:negCount,neutral:neuCount,posWords:Array.from(posWords).slice(0,6),negWords:Array.from(negWords).slice(0,6)};
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
  const accumulated = {};
  let queryArchetypeMap = {};

  // ── Step 1: Crawl brand website AND competitor websites ──
  onProgress("Crawling brand website...",2);
  let brandCrawl=null;
  try{brandCrawl=await crawlWebsite(cd.website);}catch(e){console.error("Crawl failed:",e);}
  const crawlSummary=brandCrawl?summariseCrawl(brandCrawl):"No crawl data available.";

  onProgress("Crawling competitor websites...",6);
  const compCrawls={};
  const compCrawlsRaw={};
  await Promise.all(compUrls.slice(0,5).map(async(url,i)=>{
    if(!url)return;
    try{
      const cc=await crawlWebsite(url);
      if(cc){
        const cname=compNames[i]||`Competitor ${i+1}`;
        compCrawls[cname]=summariseCrawl(cc);
        compCrawlsRaw[cname]={url,...cc.mainPage};
      }
    }catch(e){}
  }));
  const compCrawlSummary=Object.entries(compCrawls).map(([name,data])=>`\n--- ${name} ---\n${data}`).join("\n")||"No competitor crawl data.";

  // ── Step 2: Use topics directly as search queries ──
  onProgress("Preparing search queries from your topics...", 8);
  const topicsToUse = topics.slice(0, 15);
  let searchQueries = topicsToUse.filter(q => typeof q === "string" && q.length > 10);
  queryArchetypeMap = {};

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

  // Send queries in throttled batches (used for Gemini)
  async function runQueryBatches(callFn, queries, batchSize, delayMs, engineLabel) {
    const gemTasks = queries.map((q, i) => async () => {
      try {
        onProgress("Testing on " + engineLabel + "... (" + (i + 1) + "/" + queries.length + ")", 25 + Math.round((i / queries.length) * 14));
        const result = await callFn(q, "You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them.");
        return typeof result === "string" ? { query: q, response: result, citations: [] } : { query: q, response: result?.text || result?.response || "", citations: result?.citations || [] };
      } catch(e) {
        console.error(engineLabel + " query failed:", q, e.message);
        return { query: q, response: "", citations: [] };
      }
    });
    return runInBatches(gemTasks, batchSize, delayMs);
  }

  // ChatGPT batch runner using Responses API with web search
  async function runGptSearchBatches(queries, searchRegion, batchSize, delayMs) {
    const gptTasks = queries.map((q, i) => async () => {
      try {
        onProgress("Testing on ChatGPT... (" + (i + 1) + "/" + queries.length + ")", 10 + Math.round((i / queries.length) * 14));
        const result = await callOpenAISearch(q, searchRegion);
        return { query: q, response: result?.text || "", citations: result?.citations || [] };
      } catch(e) {
        console.error("ChatGPT query failed:", q, e.message);
        return { query: q, response: "", citations: [] };
      }
    });
    return runInBatches(gptTasks, batchSize, delayMs);
  }

  // Run all three engines simultaneously
  let gptResponses=[],gemResponses=[],pplxResponses=[],googleAIResponses=[];
  let googleAIData={score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]};
  try{
    const [gR,gmR,pR,gaiR]=await Promise.all([
      runGptSearchBatches(searchQueries, region, 3, 500).catch(e=>{console.error("ChatGPT testing failed:",e.message);return[];}),
      runQueryBatches(callGeminiWithCitations, searchQueries, 4, 300, "Gemini").catch(e=>{console.error("Gemini testing failed:",e.message);return[];}),
      (async()=>{
        const pplxTasks=searchQueries.map((q,i)=>async()=>{
          try{
            onProgress("Testing on Perplexity... ("+(i+1)+"/"+searchQueries.length+")",37+Math.round((i/searchQueries.length)*11));
            const result=await callPerplexity(q,"You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them.");
            return{query:q,response:result.text||"",citations:result.citations||[]};
          }catch(e){
            console.error("Perplexity query failed:",q,e.message);
            return{query:q,response:"",citations:[]};
          }
        });
        return runInBatches(pplxTasks,3,500);
      })().catch(e=>{console.error("Perplexity testing failed:",e.message);return[];}),
      (async()=>{
        const gaiTasks=searchQueries.map((q,i)=>async()=>{
          try{
            onProgress("Testing on Google AI... ("+(i+1)+"/"+searchQueries.length+")",49+Math.round((i/searchQueries.length)*11));
            const result=await callGoogleAI(q,region);
            return{query:q,response:result.text||"",citations:result.citations||[]};
          }catch(e){
            console.error("Google AI query failed:",q,e.message);
            return{query:q,response:"",citations:[]};
          }
        });
        return runInBatches(gaiTasks,3,600);
      })().catch(e=>{console.error("Google AI testing failed:",e.message);return[];})
    ]);
    gptResponses=gR||[];gemResponses=gmR||[];pplxResponses=pR||[];googleAIResponses=gaiR||[];
    const failedEngines=[!gptResponses.length&&"ChatGPT",!gemResponses.length&&"Gemini",!pplxResponses.length&&"Perplexity",!googleAIResponses.length&&"Google AI"].filter(Boolean);
    if(failedEngines.length>=2)onProgress("Warning: "+failedEngines.join(" and ")+" testing failed, continuing with limited data...",61);
    else if(failedEngines.length===1)onProgress("Warning: "+failedEngines[0]+" testing failed, continuing with other engines...",61);
  }catch(stepError){
    console.error("Engine testing failed:",stepError.message);
    onProgress("Warning: engine testing encountered an issue, continuing...",53);
  }

  // ── Step 4: Classify responses — scan real text for brand names and URLs ──
  onProgress("Classifying responses...", 62);
  let gptVisibility={},gemVisibility={},pplxVisibility={},googleAIVisibility={};
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
        return { query: r.query, status: classification.status, confidence: classification.confidence, citations: r.citations || [] };
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
  const pplxVisRaw = computeVisibility(pplxResponses, brandDetectors);
  const gaiVisRaw = computeVisibility(googleAIResponses, brandDetectors);
  gptVisibility = gptVisRaw.result;
  gemVisibility = gemVisRaw.result;
  pplxVisibility = pplxVisRaw.result;
  googleAIVisibility = gaiVisRaw.result;

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
    onProgress("Verifying ChatGPT citations...", 63);
    await batchReclassify(gptVisRaw.ambiguousCases, callOpenAI, gptVisibility);
  }
  if (gemVisRaw.ambiguousCases.length > 0) {
    onProgress("Verifying Gemini citations...", 64);
    await batchReclassify(gemVisRaw.ambiguousCases, callGemini, gemVisibility);
    await batchReclassify(pplxVisRaw.ambiguousCases, callOpenAI, pplxVisibility);
  }
  if (gaiVisRaw.ambiguousCases.length > 0) {
    await batchReclassify(gaiVisRaw.ambiguousCases, callOpenAI, googleAIVisibility);
  }
  }catch(stepError){
    console.error("Visibility computation failed:",stepError.message);
    onProgress("Warning: visibility analysis had an issue, continuing...",65);
    const fallbackBrands=[brand,...compNames.filter(n=>n)];
    fallbackBrands.forEach(n=>{if(!gptVisibility[n])gptVisibility[n]=emptyVis;if(!gemVisibility[n])gemVisibility[n]=emptyVis;if(!pplxVisibility[n])pplxVisibility[n]=emptyVis;if(!googleAIVisibility[n])googleAIVisibility[n]=emptyVis;});
  }

  // Build compScoresMap with real data for all competitors
  let compScoresMap = {};
  try{
  compNames.filter(n => n).forEach(name => {
    const gv = gptVisibility[name] || { mentionRate: 0, citationRate: 0 };
    const gm = gemVisibility[name] || { mentionRate: 0, citationRate: 0 };
    const pv = pplxVisibility[name] || emptyVis;
    const gaiv = googleAIVisibility[name] || emptyVis;
    compScoresMap[name] = {
      gpt: { mentionRate: gv.mentionRate, citationRate: gv.citationRate, score: Math.round(gv.mentionRate * 0.5 + gv.citationRate * 0.5) },
      gemini: { mentionRate: gm.mentionRate, citationRate: gm.citationRate, score: Math.round(gm.mentionRate * 0.5 + gm.citationRate * 0.5) },
      perplexity: { mentionRate: pv.mentionRate, citationRate: pv.citationRate, score: Math.round(pv.mentionRate * 0.5 + pv.citationRate * 0.5) },
      googleai: { mentionRate: gaiv.mentionRate, citationRate: gaiv.citationRate, score: Math.round(gaiv.mentionRate * 0.5 + gaiv.citationRate * 0.5) },
      avgMentionRate: Math.round((gv.mentionRate + gm.mentionRate + pv.mentionRate + gaiv.mentionRate) / 4),
      avgCitationRate: Math.round((gv.citationRate + gm.citationRate + pv.citationRate + gaiv.citationRate) / 4),
      avgScore: Math.round(((gv.mentionRate * 0.5 + gv.citationRate * 0.5) + (gm.mentionRate * 0.5 + gm.citationRate * 0.5) + (pv.mentionRate * 0.5 + pv.citationRate * 0.5) + (gaiv.mentionRate * 0.5 + gaiv.citationRate * 0.5)) / 4)
    };
  });
  }catch(e){console.error("Competitor visibility map failed:",e.message||e);}

  // ── Step 5: Build engine data objects ──
  onProgress("Analyzing strengths and weaknesses...", 66);

  const brandGptVis = gptVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };
  const brandGemVis = gemVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };
  const brandPplxVis = pplxVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };
  const brandGaiVis = googleAIVisibility[brand] || { mentionRate: 0, citationRate: 0, queries: [] };

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
    onProgress("Warning: strengths analysis had an issue, continuing...",67);
  }

  let gptData = {score:0,mentionRate:0,citationRate:0,queries:[],strengths:["Analysis unavailable"],weaknesses:["Analysis unavailable"]};
  let gemData = {score:0,mentionRate:0,citationRate:0,queries:[],strengths:["Analysis unavailable"],weaknesses:["Analysis unavailable"]};
  let pplxData = {score:0,mentionRate:0,citationRate:0,queries:[],strengths:["Analysis unavailable"],weaknesses:["Analysis unavailable"]};
  try{
    gptData = {
      score: Math.round(brandGptVis.mentionRate * 0.5 + brandGptVis.citationRate * 0.5),
      mentionRate: brandGptVis.mentionRate,
      citationRate: brandGptVis.citationRate,
      queries: brandGptVis.queries || [],
      strengths: swGpt.strengths || ["Analysis unavailable"],
      weaknesses: swGpt.weaknesses || ["Analysis unavailable"]
    };
    gemData = {
      score: Math.round(brandGemVis.mentionRate * 0.5 + brandGemVis.citationRate * 0.5),
      mentionRate: brandGemVis.mentionRate,
      citationRate: brandGemVis.citationRate,
      queries: brandGemVis.queries || [],
      strengths: swGem.strengths || ["Analysis unavailable"],
      weaknesses: swGem.weaknesses || ["Analysis unavailable"]
    };
    pplxData = {
      score: Math.round(brandPplxVis.mentionRate * 0.5 + brandPplxVis.citationRate * 0.5),
      mentionRate: brandPplxVis.mentionRate,
      citationRate: brandPplxVis.citationRate,
      queries: brandPplxVis.queries || [],
      strengths: ["Analysis via Perplexity"],
      weaknesses: ["Analysis via Perplexity"]
    };
    googleAIData = {
      score: Math.round(brandGaiVis.mentionRate * 0.5 + brandGaiVis.citationRate * 0.5),
      mentionRate: brandGaiVis.mentionRate,
      citationRate: brandGaiVis.citationRate,
      queries: brandGaiVis.queries || [],
      strengths: ["Analysis via Google AI Mode"],
      weaknesses: ["Analysis via Google AI Mode"]
    };
  }catch(e){console.error("Engine data construction failed:",e.message||e);}

  try{
  accumulated.engineData = { engines: [
    {id:"chatgpt", ...gptData, queries:(gptData.queries||[]).slice(0,8)},
    {id:"gemini", ...gemData, queries:(gemData.queries||[]).slice(0,8)},
    {id:"perplexity", ...pplxData, queries:(pplxData.queries||[]).slice(0,8)},
    {id:"googleai", ...googleAIData, queries:(googleAIData.queries||[]).slice(0,8)}
  ], painPoints: null };
  accumulated.searchQueries = searchQueries || [];
  accumulated.queryArchetypeMap = queryArchetypeMap || {};
  accumulated.brandCrawlData = brandCrawl || null;
  accumulated.compCrawlData = compCrawlsRaw || {};
  accumulated.compVisibilityData = compScoresMap || {};
  }catch(e){console.error("First emission data assembly failed:",e.message||e);}
  // Collect citation URLs from both engines
  let citationSources = { gpt: [], gemini: [], all: [] };
  try {
    const seen = new Set();
    (gptResponses || []).forEach(r => {
      (r.citations || []).forEach(c => {
        if (c.url && !seen.has(c.url)) { seen.add(c.url); citationSources.gpt.push({ url: c.url, title: c.title || "", query: r.query }); citationSources.all.push({ url: c.url, title: c.title || "", engine: "chatgpt", query: r.query }); }
      });
    });
    (gemResponses || []).forEach(r => {
      (r.citations || []).forEach(c => {
        if (!c.url) return;
        let url = c.url;
        let title = c.title || "";
        // Gemini returns proxy URLs via vertexaisearch — resolve via title or skip
        if (url.includes("vertexaisearch.cloud.google.com") || url.includes("grounding-api-redirect")) {
          if (title && !title.includes(" ") && title.includes(".")) {
            url = "https://" + title.replace(/^(https?:\/\/)?/,"").replace(/^www\./,"");
          } else { return; }
        }
        if (!seen.has(url)) { seen.add(url); citationSources.gemini.push({ url, title, query: r.query }); citationSources.all.push({ url, title, engine: "gemini", query: r.query }); }
      });
    });
    (pplxResponses || []).forEach(r => {
      (r.citations || []).forEach(c => {
        if (c.url && !seen.has(c.url)) { seen.add(c.url); citationSources.perplexity = citationSources.perplexity || []; citationSources.perplexity.push({ url: c.url, title: c.title || "", query: r.query }); citationSources.all.push({ url: c.url, title: c.title || "", engine: "perplexity", query: r.query }); }
      });
    });
    (googleAIResponses || []).forEach(r => {
      (r.citations || []).forEach(c => {
        if (c.url && !seen.has(c.url)) { seen.add(c.url); citationSources.googleai = citationSources.googleai || []; citationSources.googleai.push({ url: c.url, title: c.title || "", query: r.query }); citationSources.all.push({ url: c.url, title: c.title || "", engine: "googleai", query: r.query }); }
      });
    });
  } catch(e) { console.error("Citation collection failed:", e); }
  accumulated.citationSources = citationSources;
  try{onProgress("Engine data ready — analyzing sentiment...", null, {...accumulated});}catch(emitErr){console.error("Emission 1 failed:",emitErr);}

  // ── Parallel Group: Sentiment + Signals + Source Channels + Competitors + Pain Points ──
  onProgress("Analyzing sentiment, competitors, and categories...", 69);
  const painCatLabels=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  let sentimentData={brand:{gpt:50,gemini:50,perplexity:50,avg:50,summary:"Sentiment analysis unavailable"},competitors:compNames.map(n=>({name:n,gpt:50,gemini:50,perplexity:50,avg:50,summary:""}))};
  let sentimentSignals={positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]};
  let channelSourceData={sourceChannels:[],opportunities:[]};
  let compData={competitors:[]};
  let mergedComps=[];
  let mergedPainPoints=painCatLabels.map(l=>({label:l,score:0,severity:"critical"}));

  await Promise.all([
  // ── Sentiment Analysis — comprehensive analysis of ALL responses ──
  (async()=>{try{
    const brandEscaped=brand.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const brandRegex=new RegExp('\\b'+brandEscaped+'\\b','i');
    const positivePatterns=/\b(recommend|excellent|leading|best|top|innovative|reliable|trusted|strong|great|popular|preferred|outstanding|impressive|affordable|competitive|comprehensive|advanced|superior|premium|award|efficient)\b/i;
    const negativePatterns=/\b(expensive|poor|slow|lack|behind|weak|complaint|issue|problem|criticism|drawback|limitation|costly|overpriced|disappointing|outdated|unreliable|inferior|struggling)\b/i;
    const allResponses=[
      ...(gptResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"ChatGPT",query:r.query||""})),
      ...(gemResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Gemini",query:r.query||""})),
      ...(pplxResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Perplexity",query:r.query||""})),
      ...(googleAIResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Google AI Overview",query:r.query||""}))
    ];
    const totalResponses=allResponses.length;
    const brandMentions=[];
    allResponses.forEach(resp=>{
      if(!resp.text||!brandRegex.test(resp.text))return;
      const sentences=resp.text.split(/(?<=[.!?])\s+/).filter(s=>s.length>10);
      for(let i=0;i<sentences.length;i++){
        if(brandRegex.test(sentences[i])){
          const start=Math.max(0,i-1);
          const end=Math.min(sentences.length,i+2);
          const contextWindow=sentences.slice(start,end).join(" ").trim();
          const posMatch=contextWindow.match(positivePatterns);
          const negMatch=contextWindow.match(negativePatterns);
          let sentimentLabel="neutral";
          if(posMatch&&!negMatch)sentimentLabel="positive";
          else if(negMatch&&!posMatch)sentimentLabel="negative";
          else if(posMatch&&negMatch)sentimentLabel="mixed";
          brandMentions.push({text:contextWindow.replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/https?:\/\/[^\s)]+/g,"").replace(/\*\*([^*]*)\*\*/g,"$1").replace(/\*([^*]*)\*/g,"$1").replace(/^#{1,6}\s*/gm,"").replace(/^[-*]{3,}\s*$/gm,"").replace(/^\s*[-*+]\s+/gm,"").replace(/^\s*\d+\.\s+/gm,"").replace(/\(\s*\)/g,"").replace(/\s{2,}/g," ").trim(),engine:resp.engine,query:resp.query,sentiment:sentimentLabel,triggerWord:posMatch?posMatch[0]:(negMatch?negMatch[0]:"")});
          break;
        }
      }
    });
    const posCount=brandMentions.filter(m=>m.sentiment==="positive").length;
    const negCount=brandMentions.filter(m=>m.sentiment==="negative").length;
    const neuCount=brandMentions.filter(m=>m.sentiment==="neutral").length;
    const mixedCount=brandMentions.filter(m=>m.sentiment==="mixed").length;
    const mentionCount=brandMentions.length;
    const avgScore=mentionCount>0?Math.round(50+((posCount-negCount)/mentionCount)*50):50;
    sentimentData={
      brand:{gpt:avgScore,gemini:avgScore,perplexity:avgScore,avg:avgScore,summary:"",posCount,negCount,neuCount,mixedCount,mentionCount,totalResponses,posPercent:mentionCount>0?Math.round((posCount/mentionCount)*100):0,negPercent:mentionCount>0?Math.round((negCount/mentionCount)*100):0,neuPercent:mentionCount>0?Math.round((neuCount/mentionCount)*100):0},
      competitors:[]
    };
    // Competitor sentiment
    const compSentiments=[];
    (compNames||[]).forEach(compName=>{
      if(!compName)return;
      const compEscaped=compName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const compRegex=new RegExp('\\b'+compEscaped+'\\b','i');
      let cPos=0,cNeg=0,cNeu=0,cTotal=0;
      allResponses.forEach(resp=>{
        if(!resp.text||!compRegex.test(resp.text))return;
        cTotal++;
        const sentences=resp.text.split(/(?<=[.!?])\s+/).filter(s=>s.length>10);
        for(let i=0;i<sentences.length;i++){
          if(compRegex.test(sentences[i])){
            const start=Math.max(0,i-1);
            const end=Math.min(sentences.length,i+2);
            const context=sentences.slice(start,end).join(" ");
            const posM=positivePatterns.test(context);
            const negM=negativePatterns.test(context);
            if(posM&&!negM)cPos++;
            else if(negM&&!posM)cNeg++;
            else cNeu++;
            break;
          }
        }
      });
      compSentiments.push({name:compName,avg:cTotal>0?Math.round(50+((cPos-cNeg)/cTotal)*50):50,posCount:cPos,negCount:cNeg,neuCount:cNeu,mentionCount:cTotal,posPercent:cTotal>0?Math.round((cPos/cTotal)*100):0});
    });
    sentimentData.competitors=compSentiments;
    // Store brandMentions for later enrichment of sentimentSignals
    sentimentData._brandMentions=brandMentions;
    sentimentData._totalResponses=totalResponses;
  }catch(stepError){
    console.error("Sentiment analysis failed:",stepError.message);
  }})(),
  // ── Sentiment Signals (Theme Extraction) ──
  (async()=>{try{
    const gptTexts=(gptResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"ChatGPT"})).filter(r=>r.text.length>50);
    const gemTexts=(gemResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Gemini"})).filter(r=>r.text.length>50);
    const pplxTexts=(pplxResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Perplexity"})).filter(r=>r.text.length>50);
    const gaiTexts=(googleAIResponses||[]).map(r=>({text:typeof r==="string"?r:(r.response||""),engine:"Google AI"})).filter(r=>r.text.length>50);
    const allTexts=[...gptTexts,...gemTexts,...pplxTexts,...gaiTexts];
    const brandLower=brand.toLowerCase();
    const relevantTexts=allTexts.filter(r=>r.text.toLowerCase().includes(brandLower));
    if(relevantTexts.length===0){sentimentSignals={themes:[],summary:"Brand not found in AI engine responses."};return;}
    const excerpts=relevantTexts.map(r=>{
      const sentences=r.text.split(/[.!?]+/).filter(s=>s.toLowerCase().includes(brandLower)).slice(0,3);
      return{engine:r.engine,sentences:sentences.map(s=>s.trim()).filter(s=>s.length>20)};
    }).filter(r=>r.sentences.length>0);
    const excerptBlock=excerpts.map((e,i)=>`[${e.engine}] ${e.sentences.join(". ")}`).join("\n\n");
    const themePrompt=`Analyze these REAL AI engine responses about "${brand}" in ${industry} (${region}).

ACTUAL RESPONSE EXCERPTS:
${excerptBlock.slice(0,3000)}

Extract recurring THEMES — patterns in how AI engines describe ${brand}. For each theme:
1. Give it a short descriptive name (e.g. "Strong Network Coverage", "Premium Pricing Concerns", "Market Leadership Position")
2. Classify as "positive", "negative", or "neutral"
3. Count how many excerpts contain this theme
4. Pull the most relevant direct quote (under 80 chars) that demonstrates this theme

Also provide a 1-sentence summary of overall AI engine sentiment toward ${brand}.

Return JSON only:
{
  "themes": [
    {"name":"<theme name>","sentiment":"positive"|"negative"|"neutral","count":<number>,"quote":"<short direct quote under 80 chars>","engine":"ChatGPT"|"Gemini"|"Both"}
  ],
  "summary":"<1 sentence overall sentiment summary>"
}

Rules:
- Extract 4-8 themes based on what's ACTUALLY in the excerpts
- Do NOT invent themes that aren't supported by the text
- Count reflects how many separate excerpts mention this theme
- Themes should be specific to ${brand}, not generic industry observations
- Mix of positive, negative, and neutral themes based on what the text actually says`;
    const [themeGpt,themeGem]=await Promise.all([
      callOpenAI(themePrompt,engineSystemPrompt).catch(()=>null),
      callGemini(themePrompt,engineSystemPrompt).catch(()=>null)
    ]);
    const gptThemes=safeJSON(themeGpt)||{themes:[],summary:""};
    const gemThemes=safeJSON(themeGem)||{themes:[],summary:""};
    const mergedThemes={};
    [...(gptThemes.themes||[]),...(gemThemes.themes||[])].forEach(t=>{
      if(!t.name)return;
      const key=t.name.toLowerCase().replace(/[^a-z0-9]/g,"");
      if(mergedThemes[key]){
        mergedThemes[key].count=Math.max(mergedThemes[key].count||1,t.count||1);
        if(t.quote&&!mergedThemes[key].quotes.includes(t.quote))mergedThemes[key].quotes.push(t.quote);
        if(t.engine&&t.engine!==mergedThemes[key].engine)mergedThemes[key].engine="Both";
      }else{
        mergedThemes[key]={
          name:t.name,
          sentiment:t.sentiment||"neutral",
          count:t.count||1,
          quotes:t.quote?[t.quote]:[],
          engine:t.engine||"Both"
        };
      }
    });
    const themesList=Object.values(mergedThemes).sort((a,b)=>b.count-a.count).slice(0,8);
    const summary=gptThemes.summary||gemThemes.summary||"";
    sentimentSignals={
      themes:themesList,
      summary,
      positive:themesList.filter(t=>t.sentiment==="positive"),
      negative:themesList.filter(t=>t.sentiment==="negative"),
      quotes:themesList.flatMap(t=>t.quotes.map(q=>({text:q,engine:t.engine,sentiment:t.sentiment})))
    };
  }catch(e){
    console.error("Theme extraction failed:",e);
    sentimentSignals={themes:[],summary:"",positive:[],negative:[],quotes:[]};
  }})(),
  // ── Source Channels ──
  (async()=>{try{
    const srcSnippets=[];
    (gptResponses||[]).forEach((resp,i)=>{
      const text=typeof resp==="string"?resp:resp?.response||resp?.text||resp?.result||"";
      if(text.length>20)srcSnippets.push(`[ChatGPT Q${i+1}] ${text.slice(0,500)}`);
    });
    (gemResponses||[]).forEach((resp,i)=>{
      const text=typeof resp==="string"?resp:resp?.response||resp?.text||resp?.result||"";
      if(text.length>20)srcSnippets.push(`[Gemini Q${i+1}] ${text.slice(0,500)}`);
    });
    let srcBlock=srcSnippets.join("\n\n");
    if(srcBlock.length>6000)srcBlock=srcBlock.slice(0,6000);
    if(srcBlock.length>100){
      const sourcePrompt=`Analyze these AI engine responses about "${brand}" and extract which sources, websites, and channels the AI engines are referencing or pulling information from.

BRAND: ${brand}
WEBSITE: ${cd.website||"unknown"}
CONFIGURED COMPETITORS: ${compNames.join(", ")||"none"}

RESPONSES:
${srcBlock}

Return a JSON object with:
{
  "sourceChannels": [
    {
      "channel": "Company Website/Blog",
      "type": "owned",
      "referenceCount": 12,
      "description": "Brand's official website was referenced in 12 out of 40 responses",
      "specificUrls": ["example.com", "example.com/blog"],
      "queries": ["what is brand", "brand vs competitor"]
    }
  ],
  "opportunities": [
    {
      "channel": "Reddit",
      "reason": "AI engines referenced Reddit discussions in 6 responses but your brand was absent from those threads",
      "action": "Create or participate in Reddit discussions about your industry in relevant subreddits",
      "impact": "high"
    }
  ]
}

RULES:
- "sourceChannels" = channels where the brand IS being sourced from (found in responses)
- "opportunities" = channels where competitors or generic content is being sourced but the brand is NOT present
- Sort sourceChannels by referenceCount descending
- For each channel, count how many of the ${srcSnippets.length} responses referenced that type of source
- Common channel types: Company Website, Wikipedia, News/Press, YouTube, Reddit, Review Sites, Academic/Research, LinkedIn, Industry Directories, Government/Regulatory, Forums, Social Media
- "type" should be "owned" (brand controls it), "earned" (media/press), or "third-party" (platforms)
- Be specific — don't list channels that weren't actually referenced in any response
- Maximum 8 source channels, maximum 5 opportunities
- Only include channels you can genuinely identify from the response text
Return JSON only. No markdown, no explanation.`;
      const srcRaw=await callOpenAI(sourcePrompt,"Return valid JSON only. No markdown, no explanation.");
      const srcParsed=safeJSON(srcRaw);
      if(srcParsed)channelSourceData=srcParsed;
    }
  }catch(stepError){
    console.error("Source channel extraction failed:",stepError.message);
  }})(),
  // ── Competitor Analysis — pain points from REAL crawl data, topStrength from AI ──
  (async()=>{try{
  // Score each competitor from their crawl data
  const mergedCompsResult=compNames.filter(n=>n).map(cname=>{
    const rawCrawl=compCrawlsRaw[cname];
    // compCrawlsRaw stores flattened mainPage data — scoreCrawlData handles this shape directly
    const scored=rawCrawl?scoreCrawlData(rawCrawl):null;
    if(!scored)return{name:cname,score:0,engineScores:[0,0],topStrength:"No crawl data available",painPoints:painCatLabels.map(l=>({label:l,score:0}))};
    const pp=scored.categories.map(c=>({label:c.label,score:c.score,evidence:c.evidence}));
    const avg=Math.round(pp.reduce((a,p)=>a+p.score,0)/pp.length);
    return{name:cname,score:avg,engineScores:[avg,avg],painPoints:pp,topStrength:""};
  });
  // AI call for topStrength summaries only — no score guessing
  try{
    const strengthPrompt=`For each competitor, write a concise 1-sentence "topStrength" summarizing their main AEO advantage based on their website crawl data. Use the crawl data below.

Competitors: ${compNames.filter(n=>n).join(", ")}

Brand crawl: ${crawlSummary}
Competitor crawls: ${compCrawlSummary}

Return JSON only: {"strengths":[{"name":"<competitor>","topStrength":"<1 sentence>"}]}`;
    const strengthRaw=await callOpenAI(strengthPrompt,engineSystemPrompt);
    const strengthParsed=safeJSON(strengthRaw);
    if(strengthParsed&&strengthParsed.strengths){
      strengthParsed.strengths.forEach(s=>{
        const match=mergedCompsResult.find(c=>c.name.toLowerCase()===s.name?.toLowerCase());
        if(match&&s.topStrength)match.topStrength=s.topStrength;
      });
    }
  }catch(e){console.error("Competitor topStrength generation failed:",e);}
  mergedComps=mergedCompsResult;
  compData={competitors:mergedComps};
  }catch(stepError){
    console.error("Competitor analysis failed:",stepError.message);
  }})(),
  // ── Pain Points — scored from REAL crawl data ──
  (async()=>{try{
    const scored=scoreCrawlData(brandCrawl);
    if(scored&&scored.categories){
      mergedPainPoints=scored.categories.map(c=>({label:c.label,score:c.score,severity:c.score<30?"critical":c.score<60?"warning":"good",evidence:c.evidence}));
    }else{
      mergedPainPoints=painCatLabels.map(l=>({label:l,score:0,severity:"critical",evidence:["No crawl data available"]}));
    }
  }catch(e){
    console.error("Pain point scoring failed:",e);
    mergedPainPoints=painCatLabels.map(l=>({label:l,score:0,severity:"critical",evidence:[]}));
  }})()
  ]);

  // Enrich sentimentSignals with brandMentions from comprehensive analysis
  try{
    const brandMentions=sentimentData._brandMentions||[];
    const totalResponses=sentimentData._totalResponses||0;
    const mentionCount=brandMentions.length;
    if(brandMentions.length>0){
      if(!sentimentSignals.positive||sentimentSignals.positive.length===0)sentimentSignals.positive=brandMentions.filter(m=>m.sentiment==="positive");
      if(!sentimentSignals.negative||sentimentSignals.negative.length===0)sentimentSignals.negative=brandMentions.filter(m=>m.sentiment==="negative");
      if(!sentimentSignals.quotes||sentimentSignals.quotes.length===0)sentimentSignals.quotes=brandMentions;
    }
    sentimentSignals.brandMentions=brandMentions;
    sentimentSignals.totalResponses=totalResponses;
    sentimentSignals.mentionCount=mentionCount;
    sentimentSignals.neutral=brandMentions.filter(m=>m.sentiment==="neutral");
    // Tag each brand mention with the closest theme
    const themeNames=(sentimentSignals?.themes||[]).map(t=>({name:t.name,sentiment:t.sentiment,keywords:t.name.toLowerCase().split(/\s+/)}));
    (sentimentSignals.brandMentions||[]).forEach(mention=>{const textLower=(mention.text||"").toLowerCase();let bestMatch=null;let bestScore=0;themeNames.forEach(theme=>{let score=0;theme.keywords.forEach(kw=>{if(kw.length>3&&textLower.includes(kw))score++;});if(score>bestScore){bestScore=score;bestMatch=theme;}});mention.theme=bestMatch?bestMatch.name:(mention.sentiment==="positive"?"Positive mention":mention.sentiment==="negative"?"Negative mention":"General mention");});
    delete sentimentData._brandMentions;
    delete sentimentData._totalResponses;
  }catch(fbErr){console.error("Sentiment enrichment failed:",fbErr);}

  // Emit combined partial data after parallel group completes
  try{
    accumulated.sentimentData = sentimentData || null;
    accumulated.sentimentSignals = sentimentSignals || null;
    accumulated.channelSourceData = channelSourceData || { sourceChannels:[], opportunities:[] };
    accumulated.engineData = { engines: [
      {id:"chatgpt", ...gptData, queries:(gptData.queries||[]).slice(0,8)},
      {id:"gemini", ...gemData, queries:(gemData.queries||[]).slice(0,8)},
      {id:"perplexity", ...pplxData, queries:(pplxData.queries||[]).slice(0,8)}
    ], painPoints: mergedPainPoints.length > 0 ? mergedPainPoints.slice(0,6) : null };
    accumulated.competitorData = compData || { competitors: [] };
    accumulated.compVisibilityData = compScoresMap || {};
    accumulated.searchQueries = searchQueries || [];
    accumulated.queryArchetypeMap = queryArchetypeMap || {};
    accumulated.brandCrawlData = brandCrawl || null;
    accumulated.compCrawlData = compCrawlsRaw || {};
    accumulated.citationSources = citationSources;
  }catch(e){console.error("Accumulated data assembly failed:",e.message||e);}
  try{onProgress("Dashboard ready — loading remaining sections...", 70, {...accumulated});}catch(emitErr){console.error("Emission 2 failed:",emitErr);}

  // ── Parallel Group: Archetypes + Intent + Channels ──
  let archData={stakeholders:[]};
  let intentData=[];
  let chData={channels:[]};

  await Promise.all([
  // ── Archetypes ──
  (async()=>{
  onProgress("Generating user archetypes...",72);
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
  onProgress("Verifying archetype journeys...",75);
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
  }})(),
  // ── Intent Pathway ──
  (async()=>{
  onProgress("Testing intent pathway prompts...",74);
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
- optimisedPrompt should be a version ${brand} can create content around.
- IMPORTANT: When any prompt includes a year, use ${new Date().getFullYear()} — NEVER use 2023, 2024, or any past year. All prompts must feel current.`;

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
  }})(),
  // ── Channel Verification ──
  (async()=>{
  onProgress("Detecting distribution channels...",76);
  try{
  let realChannels=null;
  try{realChannels=await verifyChannels(brand, cd.website, industry, region);}catch(e){console.error("Channel verify failed:",e);}

  if(realChannels&&realChannels.channels&&realChannels.channels.length>0){
    chData.channels=realChannels.channels;
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

  // ── Step 7b: Web search verification pass for unconfirmed channels ──
  const channelResults=chData.channels||[];
  const unverifiedChannels=channelResults.filter(ch=>{
    const s=(ch.status||"").toLowerCase();
    return s!=="active"&&s!=="found";
  });
  const blogMissing=!channelResults.find(ch=>{
    const n=(ch.name||ch.channel||"").toLowerCase();
    return n.includes("blog")||n.includes("knowledge base");
  });

  // Direct blog detection from crawl data
  const hasBlogPath=crawlSummary.match(/\/(blog|news|resources|knowledge|help|faq|articles|insights|learn)/i);
  if(hasBlogPath){
    let blogCh=channelResults.find(ch=>{const n=(ch.name||ch.channel||"").toLowerCase();return n.includes("blog")||n.includes("knowledge");});
    if(blogCh){if(blogCh.status!=="Active"){blogCh.status="Active";blogCh.finding="Blog/knowledge base detected at "+hasBlogPath[0];blogCh.url=(cd.website||"")+hasBlogPath[0];blogCh.verifiedBy="crawl";}}
    else{channelResults.push({channel:"Company Blog / Knowledge Base",status:"Active",finding:"Blog/knowledge base detected at "+hasBlogPath[0],url:(cd.website||"")+hasBlogPath[0],priority:"High",action:"Keep blog content fresh and optimised for AI indexing.",verifiedBy:"crawl"});}
  }

  if(unverifiedChannels.length>0||blogMissing){
    onProgress("Verifying channel presence...",80);
    try{
      const channelsToVerify=unverifiedChannels.map(ch=>ch.name||ch.channel).join(", ");
      const website=cd.website||"unknown";
      let websiteDomain="";try{websiteDomain=new URL(website).hostname.replace("www.","");}catch(e){}
      const verifyQuery=`Verify whether the brand "${brand}" (website: ${website}) has an official, active presence on each of these channels: ${channelsToVerify}${blogMissing&&!hasBlogPath?", Company Blog or Resource Hub":""}

For EACH channel, do a specific web search:
- For social media: search for the EXACT brand name on that platform. For example search: ${brand} TikTok official account, or ${brand} LinkedIn page
- For Company Blog: search for ${brand} blog OR ${brand} resources OR ${brand} discover OR ${brand} news articles. Also check if the brand website has a subdomain like blog.${websiteDomain||"example.com"} or discover.${websiteDomain||"example.com"} or news.${websiteDomain||"example.com"}
- For Wikipedia: search: ${brand} Wikipedia
- For review sites: search: ${brand} reviews G2 OR Trustpilot

Return JSON only with this exact structure:
{"verifiedChannels": [{"channel": "TikTok", "status": "Active", "url": "https://tiktok.com/@brandname", "finding": "Official account with X followers"}]}

Status must be one of: Active (confirmed real official account or page exists), Not Present (searched thoroughly and confirmed no presence), Needs Work (exists but inactive or unofficial).

IMPORTANT: Only mark Not Present if you are CERTAIN after searching. If you find ANY official or semi-official presence, mark as Active.`;
      const verifyResult=await callOpenAISearch(verifyQuery, region);
      const verifyText=verifyResult?.text||"";
      let verifiedData={verifiedChannels:[]};
      try{
        const jsonMatch=verifyText.match(/\{[\s\S]*\}/);
        if(jsonMatch)verifiedData=JSON.parse(jsonMatch[0]);
      }catch(pe){
        const parsed=safeJSON(verifyText);
        if(parsed)verifiedData=parsed;
      }
      if(verifiedData.verifiedChannels&&verifiedData.verifiedChannels.length>0){
        verifiedData.verifiedChannels.forEach(v=>{
          const vName=(v.channel||"").toLowerCase();
          const existing=channelResults.find(ch=>{
            const cn=(ch.name||ch.channel||"").toLowerCase();
            return cn.includes(vName)||vName.includes(cn)||(vName.includes("blog")&&cn.includes("blog"))||(vName.includes("twitter")&&cn.includes("twitter"))||(vName.includes("podcast")&&cn.includes("podcast"))||(vName.includes("academic")&&cn.includes("academic"));
          });
          if(existing){
            const es=(existing.status||"").toLowerCase();
            const ns=(v.status||"").toLowerCase();
            if(es!=="active"&&ns.includes("active")){existing.status="Active";existing.url=v.url||existing.url;existing.finding=v.finding||existing.finding;existing.verifiedBy="web_search";}
            else if(es==="not verified"&&ns.includes("not present")){existing.status="Not Present";existing.finding=v.finding||"Not found via web search";existing.verifiedBy="web_search";}
            else if(es==="not verified"&&ns.includes("needs work")){existing.status="Needs Work";existing.finding=v.finding||existing.finding;existing.verifiedBy="web_search";}
          }else if(vName.includes("blog")||vName.includes("knowledge")){
            channelResults.push({channel:"Company Blog / Knowledge Base",status:v.status||"Not Present",url:v.url||null,finding:v.finding||null,priority:"High",action:"Start a company blog for AI indexing.",verifiedBy:"web_search"});
          }
        });
      }
      chData.channels=channelResults;
    }catch(ve){
      console.error("Channel web search verification failed:",ve);
    }
  }

  }catch(stepError){
    console.error("Channel verification failed:",stepError.message);
  }})()
  ]);

  // Emit partial data after archetypes + intent + channels complete
  accumulated.archData = (archData && archData.stakeholders) ? archData.stakeholders : [];
  accumulated.intentData = intentData && intentData.length > 0 ? intentData : null;
  accumulated.channelData = chData ? { channels: (chData.channels||[]).slice(0,12) } : { channels: [] };
  try{onProgress("Building final recommendations...", 84, {...accumulated});}catch(emitErr){console.error("Emission 3 failed:",emitErr);}

  // ── Parallel Group: Content + Roadmap ──
  let contentData={contentTypes:[]};
  let roadData=null;

  await Promise.all([
  // ── Content Recommendations ──
  (async()=>{
  onProgress("Generating content strategy...",86);
  try{
  const critCats=(mergedPainPoints||[]).filter(p=>p.severity==="critical").map(p=>`${p.label} (${p.score}%)`).join(", ");
  const warnCats=(mergedPainPoints||[]).filter(p=>p.severity==="warning").map(p=>`${p.label} (${p.score}%)`).join(", ");
  const chGaps=(chData.channels||[]).filter(c=>c.status==="Not Present"||c.status==="Needs Work").map(c=>c.channel).join(", ");
  const contentPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}.

AUDIT DATA TO BASE RECOMMENDATIONS ON:
- ChatGPT score: ${gptData.score||0}%, Gemini score: ${gemData.score||0}%, Perplexity score: ${pplxData.score||0}%, Google AI score: ${googleAIData.score||0}%
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
  }})(),
  // ── Roadmap ──
  (async()=>{
  onProgress("Building 90-day roadmap...",88);
  try{
  const overallScore=Math.round(((gptData.score||0)+(gemData.score||0)+(pplxData.score||0)+(googleAIData.score||0))/4);
  const criticalCats=(mergedPainPoints||[]).filter(p=>p.severity==="critical").map(p=>p.label).join(", ");
  const weakCats=(mergedPainPoints||[]).filter(p=>p.severity==="warning").map(p=>p.label).join(", ");
  const channelGaps=(chData.channels||[]).filter(c=>c.status==="Not Present").map(c=>c.channel).join(", ");

  // Specific query gaps for roadmap
  const absentOnAll=searchQueries.filter((_q,i)=>{
    const gptStatus=(gptVisibility[brand]?.queries||[])[i]?.status||"Absent";
    const gemStatus=(gemVisibility[brand]?.queries||[])[i]?.status||"Absent";
    const pplxStatus=(pplxVisibility[brand]?.queries||[])[i]?.status||"Absent";
    const gaiStatus=(googleAIVisibility[brand]?.queries||[])[i]?.status||"Absent";
    return gptStatus==="Absent"&&gemStatus==="Absent"&&pplxStatus==="Absent"&&gaiStatus==="Absent";
  }).map(q=>typeof q==="string"?q:q.query).slice(0,5);

  const absentOnSome=searchQueries.filter((_q,i)=>{
    const statuses=[(gptVisibility[brand]?.queries||[])[i]?.status||"Absent",(gemVisibility[brand]?.queries||[])[i]?.status||"Absent",(pplxVisibility[brand]?.queries||[])[i]?.status||"Absent",(googleAIVisibility[brand]?.queries||[])[i]?.status||"Absent"];
    const absentCount=statuses.filter(s=>s==="Absent").length;
    return absentCount>0&&absentCount<4;
  }).map(q=>typeof q==="string"?q:q.query).slice(0,5);

  // Missing schema from crawl
  const detectedSchemas=brandCrawl?.mainPage?.schemas||[];
  const missingSchemaList=[];
  if(!detectedSchemas.some(s=>s==="FAQPage"||s==="Question"))missingSchemaList.push("FAQ schema");
  if(!detectedSchemas.some(s=>["Article","NewsArticle","BlogPosting","TechArticle"].includes(s)))missingSchemaList.push("Article schema");
  if(!detectedSchemas.some(s=>["Organization","LocalBusiness","Corporation"].includes(s)))missingSchemaList.push("Organization schema");
  if(!detectedSchemas.some(s=>s==="Product"))missingSchemaList.push("Product schema");
  if(!detectedSchemas.some(s=>s==="HowTo"))missingSchemaList.push("HowTo schema");
  if(!detectedSchemas.some(s=>s==="BreadcrumbList"))missingSchemaList.push("Breadcrumb schema");
  if(!(brandCrawl?.mainPage?.hasSpeakable))missingSchemaList.push("Speakable schema");

  // Competitor advantages
  const compAdvantages=(compData.competitors||[]).slice(0,3).map(c=>{
    const dominated=(c.painPoints||[]).filter((cp,j)=>{
      const ours=mergedPainPoints[j]?.score||0;
      return cp.score-ours>10;
    }).map(cp=>cp.label.split("/")[0].trim());
    return dominated.length>0?`${c.name} beats you on: ${dominated.join(", ")}`:null;
  }).filter(Boolean);

  // Missing EEAT signals from crawl
  const missingEEAT=[];
  if(!brandCrawl?.mainPage?.hasAuthorInfo)missingEEAT.push("Author attribution");
  if(!brandCrawl?.mainPage?.hasTrustSignals)missingEEAT.push("Trust signals (awards/certs)");
  if(!brandCrawl?.mainPage?.hasTestimonials)missingEEAT.push("Testimonials/social proof");
  if(!brandCrawl?.subPages?.about)missingEEAT.push("About page");
  if(!brandCrawl?.subPages?.blog)missingEEAT.push("Blog/content hub");
  if(!brandCrawl?.subPages?.faq)missingEEAT.push("FAQ page");

  const roadmapWeightedReadiness=Math.round((mergedPainPoints||[]).reduce((sum,pp)=>sum+(pp.score*getCategoryWeight(pp.label)),0));
  const aiCrawlerSummaryForRoadmap=(()=>{try{const ac=brandCrawl?.mainPage?.aiCrawlerAccess;if(!ac)return null;const r=ac.robotsTxt;const l=ac.llmsTxt;let s=r?.found?ac.summary:"robots.txt not found";if(r?.found){const blocked=(r.crawlers||[]).filter(c=>c.blocked);if(blocked.length>0)s+=": "+blocked.map(c=>`${c.agent} (${c.engine})`).join(", ");}s+=l?.found?" | llms.txt present":" | llms.txt not found";return s;}catch(e){return null;}})();
  const roadmapPrompt=`Create a 90-day AEO roadmap for "${brand}" in ${industry}, specifically for improving visibility in ${region}.

AUDIT FINDINGS TO ADDRESS:
- Overall visibility score: ${overallScore}%
- ChatGPT score: ${gptData.score||0}%, Gemini score: ${gemData.score||0}%, Perplexity score: ${pplxData.score||0}%, Google AI score: ${googleAIData.score||0}%
- Critical categories: ${criticalCats||"none"}
- Warning categories: ${weakCats||"none"}
- Missing channels: ${channelGaps||"none"}
- Website issues from crawl: ${crawlSummary.slice(0,500)}
- Overall website readiness: ${roadmapWeightedReadiness||"N/A"}% (weighted by category importance for AI citations)
- AI crawler access: ${aiCrawlerSummaryForRoadmap||"not checked"}
- Top competitor advantages: ${(compData.competitors||[]).slice(0,3).map(c=>`${c.name} (${c.score}%): ${c.topStrength||"N/A"}`).join("; ")}

SPECIFIC QUERY GAPS (content MUST target these):
- Absent on ALL engines: ${absentOnAll.length>0?absentOnAll.map(q=>`"${q}"`).join(", "):"None — good coverage"}
- Absent on some engines: ${absentOnSome.length>0?absentOnSome.map(q=>`"${q}"`).join(", "):"None"}

MISSING SCHEMA MARKUP (technical tasks):
${missingSchemaList.length>0?missingSchemaList.map(s=>"- "+s).join("\n"):"- All key schemas detected"}

MISSING E-E-A-T SIGNALS:
${missingEEAT.length>0?missingEEAT.map(s=>"- "+s).join("\n"):"- All key EEAT signals present"}

AI CRAWLER ACCESS (from robots.txt):
${(()=>{try{const ac=brandCrawl?.mainPage?.aiCrawlerAccess;if(!ac||!ac.robotsTxt?.found)return"- robots.txt not found \u2014 AI crawlers may not index content";const blocked=(ac.robotsTxt.crawlers||[]).filter(c=>c.blocked);if(blocked.length===0)return"- All AI crawlers allowed \u2714";return blocked.map(c=>"- BLOCKED: "+c.agent+" ("+c.engine+")").join("\n");}catch(e){return"- Could not check";}})()}
${(()=>{try{const ac=brandCrawl?.mainPage?.aiCrawlerAccess;return ac?.llmsTxt?.found?"- llms.txt present \u2714 (AI-friendly site description)":"- llms.txt NOT found \u2014 consider adding for better AI engine understanding";}catch(e){return"";}})()}

COMPETITOR ADVANTAGES TO COUNTER:
${compAdvantages.length>0?compAdvantages.map(a=>"- "+a).join("\n"):"- No major competitor advantages detected"}

${(()=>{try{const neg=(sentimentSignals?.negative||[]).map(t=>typeof t==="string"?t:t.theme||t.name||"").filter(Boolean);if(neg.length>0){return"NEGATIVE BRAND PERCEPTION (address in content/PR):\n"+neg.slice(0,5).map(t=>"- "+t).join("\n");}else{return"BRAND PERCEPTION: Sentiment is neutral or positive. No negative themes to address. Do NOT generate defensive PR tasks. Instead, focus PR efforts on amplifying existing positive positioning and expanding into new topic areas where the brand is currently absent.";}}catch(e){return"BRAND PERCEPTION: Sentiment is neutral or positive. No negative themes to address. Do NOT generate defensive PR tasks. Instead, focus PR efforts on amplifying existing positive positioning and expanding into new topic areas where the brand is currently absent.";}})()}

CITATION SOURCE GAPS (authoritative third-party platforms to target):
IMPORTANT: The following are AUTHORITATIVE third-party sources where AI engines cite content. These are NOT competitor-owned websites. Do NOT recommend partnering with competitor sites or low-quality/irrelevant platforms. Only recommend establishing presence on reputable industry publications, review platforms, and directories.
${(()=>{try{const allSrc=citationSources?.all||[];const compDomainSet=new Set();(cd.competitors||[]).forEach(c=>{const name=(c.name||"").toLowerCase().replace(/\s+/g,"");const website=c.website||"";if(website){try{const hostname=new URL(website.startsWith("http")?website:"https://"+website).hostname.replace("www.","").toLowerCase();compDomainSet.add(hostname);hostname.split(".").slice(0,-1).forEach(part=>{if(part.length>3)compDomainSet.add(part);});}catch(e){}}if(name.length>3)compDomainSet.add(name);});const isCompDomain=(domain)=>{const dl=domain.toLowerCase();for(const comp of compDomainSet){if(dl.includes(comp)||comp.includes(dl.split(".")[0]))return true;}return false;};const lowQuality=["shopee","lazada","aliexpress","temu","wish.com","priceshop","mudah.my"];const topDomains=Object.entries(allSrc.reduce((acc,c)=>{try{const h=new URL(c.url).hostname.replace("www.","");if(!isCompDomain(h)&&!lowQuality.some(lq=>h.toLowerCase().includes(lq)))acc[h]=(acc[h]||0)+1;}catch(e){}return acc;},{})).sort((a,b)=>b[1]-a[1]).slice(0,8).map(d=>d[0]);return topDomains.length>0?topDomains.slice(0,5).map(d=>"- "+d+" (cited "+allSrc.filter(c=>{try{return new URL(c.url).hostname.replace("www.","")===d;}catch(e){return false;}}).length+" times)").join("\n"):"- No citation source data available";}catch(e){return"- No citation source data available";}})()}

CURRENT BRAND VISIBILITY SCORE: ${overallScore}%

CRITICAL LIFT RULES:
- The brand currently scores ${overallScore}%. All projected improvements must be realistic relative to this baseline.
- Phase 1 (Days 1-30): Target score should be ${Math.min(overallScore + Math.round((100 - overallScore) * 0.25), 95)}% (closing ~25% of the gap to 100%)
- Phase 2 (Days 31-60): Target score should be ${Math.min(overallScore + Math.round((100 - overallScore) * 0.45), 97)}% (closing ~45% of the gap)
- Phase 3 (Days 61-90): Target score should be ${Math.min(overallScore + Math.round((100 - overallScore) * 0.6), 98)}% (closing ~60% of the gap)
- Each task's estimated lift must be a SPECIFIC number (not a range like "10-15%") and all task lifts in a phase must sum to approximately the phase's total improvement
- For example: if current score is 83%, Phase 1 target is ~87%, so total Phase 1 lift is ~4 points spread across 3-4 tasks (e.g. +1.5%, +1%, +0.8%, +0.7%)
- If current score is 40%, Phase 1 target is ~55%, so total Phase 1 lift is ~15 points spread across tasks
- NEVER project a score above 95% — diminishing returns make this unrealistic
- Each task's lift should be proportional to its impact — technical fixes are smaller lifts, content creation is larger

CRITICAL RULES:
- NEVER recommend the brand get cited on competitor-owned websites (${(cd.competitors||[]).map(c=>c.name).join(", ")} domains)
- NEVER recommend partnerships with price comparison sites, discount aggregators, or low-quality directories
- Only recommend authoritative sources: industry publications, review platforms (G2, TrustRadius, Capterra), major news outlets, Wikipedia, LinkedIn, YouTube
- If no negative themes are detected, do NOT recommend defensive PR campaigns, crisis management, or reputation repair. Instead focus on growth: expanding visibility into new query categories and strengthening existing advantages.
- Every PR & Outreach task must make logical sense — do NOT recommend "countering negativity" when sentiment is positive.

Every task in the roadmap MUST reference a specific finding from above. Format each task as "[Finding] → [Action]". For example:
- "Missing FAQ schema → Implement FAQPage JSON-LD on top 5 service pages"
- "Absent for 'best prepaid plans in Malaysia' → Create comparison guide targeting this query"
- "Maxis beats you on Content Authority → Publish 2 long-form guides per week to close content gap"
- "Negative perception: 'Premium Pricing Concerns' → Publish value-comparison content showing ROI vs competitors"
- "Not cited on g2.com → Create and optimise G2 listing with verified reviews"
- "GPTBot blocked in robots.txt → Unblock GPTBot user agent to allow ChatGPT to index content"
- "No llms.txt → Create llms.txt with structured brand description for AI engines"
Do NOT include generic tasks like "optimize website" or "improve SEO" without tying them to a specific finding.

Return JSON:
{
  "day30": {
    "title": "Foundation Sprint",
    "sub": "Days 1-30",
    "accent": "#ef4444",
    "lift": "${Math.min(overallScore + Math.round((100 - overallScore) * 0.25), 95) - overallScore}%",
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
    "lift": "${Math.min(overallScore + Math.round((100 - overallScore) * 0.45), 97) - overallScore}%",
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
    "lift": "${Math.min(overallScore + Math.round((100 - overallScore) * 0.6), 98) - overallScore}%",
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
  }})()
  ]);

  onProgress("Compiling final report...",93);

  try{
    accumulated.contentGridData = (contentData && contentData.contentTypes) ? contentData.contentTypes.slice(0,10) : [];
    accumulated.roadmapData = roadData || null;
    accumulated.guidelineData = true;
  }catch(e){console.error("Content/roadmap emission failed:",e.message||e);}
  try{onProgress("All sections ready...", null, {...accumulated});}catch(emitErr){console.error("Emission 4 failed:",emitErr);}

  // --- Step: Verify Target Channel Gaps ---
  let verifiedChannelGaps=[];
  try{
    onProgress("Verifying target channel opportunities...",78);
    const brandWebsite=cd.website||"";
    const brandDomain=(()=>{try{return new URL(brandWebsite.startsWith("http")?brandWebsite:"https://"+brandWebsite).hostname.replace("www.","").toLowerCase();}catch(e){return"";}})();
    const compNamesLower=(compData?.competitors||[]).map(c=>(c.name||"").toLowerCase());
    const compWebsites=(compData?.competitors||[]).map(c=>{try{return new URL((c.website||"").startsWith("http")?c.website:"https://"+c.website).hostname.replace("www.","").toLowerCase();}catch(e){return"";}}).filter(Boolean);
    const allCitations=citationSources?.all||[];
    const domainCounts={};
    allCitations.forEach(c=>{
      let d="";try{d=new URL(c.url||"").hostname.replace("www.","").toLowerCase();}catch(e){return;}
      if(!d||d.length<4)return;
      if(brandDomain&&(d.includes(brandDomain)||brandDomain.includes(d.split(".")[0])))return;
      if(compWebsites.some(cw=>d.includes(cw)||cw.includes(d.split(".")[0])))return;
      if(["google.com","gstatic.com","googleapis.com","bing.com","yahoo.com","cloudflare.com","amazonaws.com","akamai.net","schema.org","w3.org","vertexaisearch.cloud.google.com"].some(ex=>d.includes(ex)))return;
      domainCounts[d]=(domainCounts[d]||0)+1;
    });
    const topDomains=Object.entries(domainCounts).sort((a,b)=>b[1]-a[1]).slice(0,20).map(([domain,count])=>({domain,count}));
    if(topDomains.length>0){
      const domainListStr=topDomains.map(d=>d.domain+" ("+d.count+" citations)").join("\n");
      console.log("[ChannelVerify] topDomains count:",topDomains.length);
      console.log("[ChannelVerify] topDomains:",topDomains.map(d=>d.domain+"("+d.count+")").join(", "));
      const verifyPrompt=`You are verifying platform opportunities for the brand "${brand}" (website: ${brandWebsite}) in the ${cd.industry||"general"} industry in ${cd.region||"Global"}.\n\nKnown competitors: ${compData?.competitors?.map(c=>c.name+" ("+(c.website||"")+")").join(", ")||"none"}\n\nBelow are third-party platforms that AI engines cited when answering queries about this industry. For EACH platform, determine:\n\n1. COMPETITOR: Is this a competitor, competitor sub-brand, or competitor-owned property? (true/false)\n2. RELEVANT: Is this platform relevant to ${brand}'s industry? (true/false)\n3. PRESENT: Does ${brand} have an active, findable presence on this platform? Search the web to verify. (true/false/unknown)\n4. ACTIONABLE: Can a brand realistically take action to establish or improve their presence here? (true/false)\n5. DESCRIPTION: One line describing what this platform is and why it matters for this industry.\n6. ACTION: If this is a genuine gap, one specific action ${brand} should take.\n\nPlatforms to verify:\n${domainListStr}\n\nCRITICAL RULES:\n- Actually search the web to check if ${brand} has a presence on each platform\n- Social media platforms — search for the brand's official page/channel before marking as not present\n- If you're unsure about presence, mark as "unknown" not "false"\n- Be strict about competitor detection — include sub-brands, sister companies\n- Only mark as ACTIONABLE if the brand can directly influence their presence\n\nRespond in JSON only. No preamble, no markdown backticks.\n{"platforms": [{"domain": "example.com","citations": 5,"isCompetitor": false,"isRelevant": true,"brandPresent": false,"isActionable": true,"description": "Leading review platform","action": "Submit product pages for review"}]}`;
      const verifyResp=await callOpenAISearch(verifyPrompt);
      console.log("[ChannelVerify] raw response type:",typeof verifyResp,typeof verifyResp?.text);
      console.log("[ChannelVerify] raw response preview:",(verifyResp?.text||verifyResp||"").substring(0,300));
      try{
        const cleaned=(verifyResp?.text||verifyResp||"").replace(/```json|```/g,"").trim();
        const parsed=safeJSON(cleaned)||JSON.parse(cleaned);
        console.log("[ChannelVerify] parsed platforms:",(parsed.platforms||[]).length);
        // Loosen filter to handle string/boolean mismatches from AI
        verifiedChannelGaps=(parsed.platforms||[]).filter(p=>{const isComp=p.isCompetitor===true||p.isCompetitor==="true";const isRel=p.isRelevant===true||p.isRelevant==="true";const notPresent=p.brandPresent===false||p.brandPresent==="false"||p.brandPresent==="no";const isAction=p.isActionable===true||p.isActionable==="true";return !isComp&&isRel&&notPresent&&isAction;}).map(p=>({domain:p.domain,citations:p.citations||domainCounts[p.domain]||0,description:p.description||"",action:p.action||""}));
        // Include unknown presence as uncertain gaps
        const uncertainGaps=(parsed.platforms||[]).filter(p=>{const isComp=p.isCompetitor===true||p.isCompetitor==="true";const isRel=p.isRelevant===true||p.isRelevant==="true";const isUnknown=p.brandPresent==="unknown"||p.brandPresent===null||p.brandPresent===undefined;const isAction=p.isActionable===true||p.isActionable==="true";return !isComp&&isRel&&isUnknown&&isAction;}).map(p=>({domain:p.domain,citations:p.citations||domainCounts[p.domain]||0,description:p.description||"",action:p.action||"",uncertain:true}));
        verifiedChannelGaps=[...verifiedChannelGaps,...uncertainGaps].sort((a,b)=>b.citations-a.citations);
        console.log("[ChannelVerify] filtered gaps:",verifiedChannelGaps.length,"uncertain:",uncertainGaps.length);
        // Log filter reasons
        (parsed.platforms||[]).forEach(p=>{const reasons=[];if(p.isCompetitor===true||p.isCompetitor==="true")reasons.push("competitor");if(!(p.isRelevant===true||p.isRelevant==="true"))reasons.push("not relevant");if(!(p.brandPresent===false||p.brandPresent==="false"||p.brandPresent==="no"||p.brandPresent==="unknown"||p.brandPresent===null||p.brandPresent===undefined))reasons.push("brand present: "+p.brandPresent);if(!(p.isActionable===true||p.isActionable==="true"))reasons.push("not actionable");if(reasons.length>0)console.log("[ChannelVerify] FILTERED OUT:",p.domain,"—",reasons.join(", "));else console.log("[ChannelVerify] KEPT:",p.domain);});
      }catch(e){console.error("[ChannelVerify] Parse error:",e.message);console.log("[ChannelVerify] Raw text that failed:",(verifyResp?.text||verifyResp||"").substring(0,500));}
    }else{console.log("[ChannelVerify] No topDomains found — citationSources.all has",allCitations.length,"items");}
  }catch(e){console.error("Channel verification failed:",e);}

  // ── Step: Generate narrative summaries ──
  let narratives = {};
  try {
    onProgress("Writing executive insights...", 95);

    const allEngineScores = [{name:"ChatGPT",score:gptData.score||0},{name:"Gemini",score:gemData.score||0},{name:"Perplexity",score:pplxData.score||0},{name:"Google AI",score:googleAIData.score||0}].sort((a,b)=>b.score-a.score);
    const bestEngine = allEngineScores[0];
    const worstEngine = allEngineScores[allEngineScores.length-1];
    const nCompNames = (compData?.competitors || []).map(c => c.name).filter(n => n).slice(0, 5);
    const compScoresArr = nCompNames.map(name => {
      const vis = compScoresMap?.[name];
      return { name, score: vis ? Math.round(((vis.avgMentionRate||0) + (vis.avgCitationRate||0)) / 2) : 0 };
    }).sort((a, b) => b.score - a.score);
    const topCompetitor = compScoresArr[0] || { name: "competitors", score: 0 };

    const nWeights = getEngineWeights(region);
    const overallScore = Math.round((gptData.score||0)*nWeights.chatgpt + (gemData.score||0)*nWeights.gemini + (pplxData.score||0)*nWeights.perplexity + (googleAIData.score||0)*(nWeights.googleai||0));
    const avgMentions = Math.round((gptData.mentionRate||0)*nWeights.chatgpt + (gemData.mentionRate||0)*nWeights.gemini + (pplxData.mentionRate||0)*nWeights.perplexity);
    const avgCitations = Math.round((gptData.citationRate||0)*nWeights.chatgpt + (gemData.citationRate||0)*nWeights.gemini + (pplxData.citationRate||0)*nWeights.perplexity);

    const sentLabel = (sentimentData?.brand?.avg || 50) >= 55 ? "positive" : (sentimentData?.brand?.avg || 50) >= 45 ? "neutral" : "negative";
    const themeNames = (sentimentSignals?.themes || []).slice(0, 5).map(t => `${t.name} (${t.sentiment})`).join(", ");

    const catBreakdown = {};
    (searchQueries || []).forEach((q, i) => {
      const qText = typeof q === "string" ? q : q.query;
      const qLower = (qText||"").toLowerCase();
      let cat = "General";
      if (/\bbest\b|top\s+\d|recommend|which\s+(is|are)|should\s+i/i.test(qLower)) cat = "Recommendation";
      else if (/\bvs\b|compar|versus|difference/i.test(qLower)) cat = "Comparison";
      else if (/\bhow\s+(to|do|does|can|much)|guide|tutorial/i.test(qLower)) cat = "How-To";
      else if (/\bbuy\b|price|cost|plan|package|subscription/i.test(qLower)) cat = "Transactional";
      else if (/\breview|rating|experience|worth/i.test(qLower)) cat = "Evaluation";
      else if (/\bwhat\s+(is|are)|explain|meaning/i.test(qLower)) cat = "Informational";
      if (!catBreakdown[cat]) catBreakdown[cat] = { total: 0, visible: 0 };
      catBreakdown[cat].total++;
      const gptQ = (gptData.queries || [])[i];
      const gemQ = (gemData.queries || [])[i];
      const pplxQ = (pplxData.queries || [])[i];
      if ((gptQ && gptQ.status !== "Absent") || (gemQ && gemQ.status !== "Absent") || (pplxQ && pplxQ.status !== "Absent")) catBreakdown[cat].visible++;
    });
    const catSummary = Object.entries(catBreakdown).map(([cat, d]) => `${cat}: ${d.visible}/${d.total} visible`).join(", ");

    const ppSummary = (mergedPainPoints || []).map(pp => `${(pp.label||"").split("/")[0].trim()}: ${pp.score}%`).join(", ");
    const weakPPs = (mergedPainPoints || []).filter(pp => pp.score < 40).map(pp => (pp.label||"").split("/")[0].trim());
    const strongPPs = (mergedPainPoints || []).filter(pp => pp.score >= 60).map(pp => (pp.label||"").split("/")[0].trim());

    const absentQueries = (searchQueries || []).filter((q, i) => {
      const gptQ = (gptData.queries || [])[i];
      const gemQ = (gemData.queries || [])[i];
      const pplxQ = (pplxData.queries || [])[i];
      return (!gptQ || gptQ.status === "Absent") && (!gemQ || gemQ.status === "Absent") && (!pplxQ || pplxQ.status === "Absent");
    }).map(q => typeof q === "string" ? q : q.query).slice(0, 5);

    const citationDomains = [...new Set(
      (citationSources?.all || []).map(c => { try { return new URL(c.url).hostname.replace("www.",""); } catch(e) { return ""; } }).filter(Boolean)
    )].slice(0, 10);

    const narrativeWeightedReadiness=Math.round((mergedPainPoints||[]).reduce((sum,pp)=>sum+(pp.score*getCategoryWeight(pp.label)),0));
    const aiCrawlerData=brandCrawl?.mainPage?.aiCrawlerAccess||null;
    const aiCrawlerSummary=aiCrawlerData?(()=>{const r=aiCrawlerData.robotsTxt;const l=aiCrawlerData.llmsTxt;let s=r?.found?aiCrawlerData.summary:"robots.txt not found";if(r?.found){const blocked=(r.crawlers||[]).filter(c=>c.blocked);if(blocked.length>0)s+=` (blocked: ${blocked.map(c=>c.agent).join(", ")})`;}s+=l?.found?" | llms.txt: present":" | llms.txt: not found";return s;})():null;

    const narrativePrompt = `You are a senior strategy consultant writing an AI visibility report for "${brand}" in ${industry} (${region}).

AUDIT DATA:
- Overall visibility score: ${overallScore}%
- ChatGPT: ${gptData.score||0}% | Gemini: ${gemData.score||0}% | Perplexity: ${pplxData.score||0}% | Google AI: ${googleAIData.score||0}%
- Best engine: ${bestEngine.name} (${bestEngine.score}%) | Weakest: ${worstEngine.name} (${worstEngine.score}%)
- Mention rate: ${avgMentions}% | Citation rate: ${avgCitations}%
- Top competitor: ${topCompetitor.name} at ${topCompetitor.score}%
- All competitors: ${compScoresArr.map(c => c.name + " (" + c.score + "%)").join(", ") || "none"}
- Sentiment: ${sentLabel}
- Key themes: ${themeNames || "none detected"}
- Query categories: ${catSummary}
- Queries where brand is ABSENT on all engines: ${absentQueries.join(" | ") || "none"}
- Website health: ${ppSummary || "not scored"}
- Website Readiness (weighted): ${narrativeWeightedReadiness || "N/A"}% (Content Authority 25%, Structured Data 20%, E-E-A-T 20%, Citation Network 15%, Technical SEO 10%, Content Freshness 10%)
- Weak areas: ${weakPPs.join(", ") || "none"}
- Strong areas: ${strongPPs.join(", ") || "none"}
- AI crawler access: ${aiCrawlerSummary || "not checked"}
- Citation sources referencing brand: ${citationDomains.join(", ") || "none found"}
- Scoring weights for ${region}: ChatGPT ${Math.round(nWeights.chatgpt*100)}%, Gemini ${Math.round(nWeights.gemini*100)}%, Perplexity ${Math.round(nWeights.perplexity*100)}%, Google AI ${Math.round((nWeights.googleai||0)*100)}% (based on estimated user share in this region)

Generate narrative summaries in consultant tone — professional, direct, strategic. No jargon. Speak to a CEO, not a technical SEO person.

Return JSON only:
{
  "dashboard": "<3-4 sentences. Start with what the score means in context. Compare to top competitor. Highlight the biggest gap or opportunity. End with the single most important thing to focus on.>",
  "dashboardLabel": "<5-8 words contextualizing the score label>",
  "sentiment": "<3-4 sentences. Describe HOW AI engines talk about the brand. What narrative are they pushing? How does this compare to competitors? What perception gap exists?>",
  "queryCategories": "<3-4 sentences. Summarise which query TYPES (recommendation, comparison, how-to, etc.) the brand performs best and worst on. Use percentages, NOT fractions like X out of Y. Name the weakest category and recommend a specific action. Be specific: e.g. cited in 85% of recommendation queries but only 40% of comparison queries.>",
  "categoryHealth": "<3-4 sentences. Translate technical scores into business language. Which website signals are helping visibility? Which gaps are holding the brand back? Be specific about what is missing.>",
  "citationSources": "<2-3 sentences. What types of sources are AI engines pulling from? Are they authoritative? Are there obvious sources missing that competitors likely have?>",
  "competitiveLandscape": "<2-3 sentences. How does the brand compare overall? Who is the biggest threat? What are competitors doing differently that is working?>"
}

Rules:
- Every sentence must reference SPECIFIC data from the audit — never generic advice
- Use the brand name, not "the brand" or "your brand"
- Compare to competitors BY NAME where possible
- Do NOT use technical jargon (no "schema markup", "E-E-A-T", "structured data" — translate these into plain business language)
- Do NOT use exclamation marks or overly positive/negative tone — be matter-of-fact
- If a score is low but the brand is competing against industry giants, acknowledge that context
- Keep each narrative to 3-4 sentences maximum`;

    const narrativeRaw = await callOpenAI(narrativePrompt, "You are a senior strategy consultant. Return ONLY valid JSON, no markdown fences.");
    narratives = safeJSON(narrativeRaw) || {};
  } catch(e) {
    console.error("Narrative generation failed:", e);
    narratives = {};
  }

  accumulated.narratives = narratives || {};

  try {
    return {
      engineData:{
        engines:[
          {id:"chatgpt",...(typeof gptData!=="undefined"&&gptData?gptData:{score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}),queries:((typeof gptData!=="undefined"&&gptData?gptData.queries:null)||[])},
          {id:"gemini",...(typeof gemData!=="undefined"&&gemData?gemData:{score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}),queries:((typeof gemData!=="undefined"&&gemData?gemData.queries:null)||[])},
          {id:"perplexity",...(typeof pplxData!=="undefined"&&pplxData?pplxData:{score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}),queries:((typeof pplxData!=="undefined"&&pplxData?pplxData.queries:null)||[])},
          {id:"googleai",...(typeof googleAIData!=="undefined"&&googleAIData?googleAIData:{score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}),queries:((typeof googleAIData!=="undefined"&&googleAIData?googleAIData.queries:null)||[])}
        ],
        painPoints:typeof mergedPainPoints!=="undefined"&&mergedPainPoints&&mergedPainPoints.length>0?mergedPainPoints.slice(0,6):[]
      },
      competitorData:{competitors:typeof compData!=="undefined"&&compData?(compData.competitors||[]).slice(0,5):[]},
      archData:typeof archData!=="undefined"&&archData?archData.stakeholders||[]:[],
      intentData:typeof intentData!=="undefined"&&intentData&&intentData.length>0?intentData:null,
      channelData:{channels:typeof chData!=="undefined"&&chData?(chData.channels||[]).slice(0,12):[]},
      contentGridData:typeof contentData!=="undefined"&&contentData?(contentData.contentTypes||[]).slice(0,10):[],
      roadmapData:typeof roadData!=="undefined"?roadData:null,
      contentData:typeof contentData!=="undefined"&&contentData?(contentData.contentTypes||[]).slice(0,10):[],
      sentimentData:typeof sentimentData!=="undefined"?sentimentData:{brand:{gpt:50,gemini:50,perplexity:50,avg:50,summary:""},competitors:[]},
      sentimentSignals:typeof sentimentSignals!=="undefined"?sentimentSignals:{positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]},
      brandCrawlData:typeof brandCrawl!=="undefined"&&brandCrawl?brandCrawl.mainPage||null:null,
      compCrawlData:typeof compCrawlsRaw!=="undefined"?compCrawlsRaw:{},
      compVisibilityData:typeof compScoresMap!=="undefined"?compScoresMap:{},
      searchQueries:typeof searchQueries!=="undefined"?searchQueries:[],
      queryArchetypeMap:typeof queryArchetypeMap!=="undefined"?queryArchetypeMap:{},
      channelSourceData:typeof channelSourceData!=="undefined"?channelSourceData:{sourceChannels:[],opportunities:[]},
      citationSources:typeof citationSources!=="undefined"?citationSources:{gpt:[],gemini:[],all:[]},
      guidelinesData:typeof guidelinesData!=="undefined"?guidelinesData:null,
      narratives:typeof narratives!=="undefined"?narratives:{},
      engineWeights:getEngineWeights(region),
      verifiedChannelGaps:typeof verifiedChannelGaps!=="undefined"?verifiedChannelGaps:[]
    };
  } catch(returnError) {
    console.error("CRITICAL: runRealAudit return assembly failed:",returnError);
    return {
      engineData:{engines:[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"gemini",name:"Gemini",color:"#4285F4",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"perplexity",name:"Perplexity",color:"#20808D",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"googleai",name:"Google AI",color:"#EA4335",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}],painPoints:[]},
      sentimentData:{brand:{gpt:50,gemini:50,perplexity:50,avg:50,summary:""},competitors:[]},
      sentimentSignals:{positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]},
      competitorData:{competitors:[]},
      compVisibilityData:{},
      archData:[],
      intentData:null,
      channelData:{channels:[]},
      channelSourceData:{sourceChannels:[],opportunities:[]},
      contentGridData:[],
      contentData:[],
      roadmapData:null,
      brandCrawlData:null,
      compCrawlData:{},
      searchQueries:[],
      queryArchetypeMap:{},
      guidelinesData:null,
      error:true,
      errorMessage:"Audit completed but result assembly failed: "+(returnError.message||"Unknown error")
    };
  }
  onProgress("Finalising audit...",99);
 }catch(fatalError){
    console.error("Audit failed:",fatalError);
    onProgress("Audit failed: "+(fatalError.message||"Unknown error"),-1);
    return{
      error:true,
      errorMessage:fatalError.message||"The audit encountered an unexpected error. Please try again.",
      engineData:{engines:[{id:"chatgpt",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"gemini",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]},{id:"perplexity",score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:[]}],painPoints:[]},
      competitorData:{competitors:[]},archData:[],intentData:null,channelData:{channels:[]},contentGridData:[],roadmapData:null,contentData:[],sentimentData:{brand:{gpt:50,gemini:50,perplexity:50,avg:50,summary:"Audit failed"},competitors:[]},brandCrawlData:null,compCrawlData:{},compVisibilityData:{},searchQueries:[]
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
  const date=r.auditDate?new Date(r.auditDate).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
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
  const gptE=r.engines[0]||{},gemE=r.engines[1]||{},pplxE=r.engines[2]||{},gaiE=r.engines[3]||{};
  const engArr=[gptE,gemE,pplxE,gaiE].filter(e=>e.score!=null);
  const avgMention=engArr.length?Math.round(engArr.reduce((s,e)=>s+(e.mentionRate||0),0)/engArr.length):0;
  const avgCitation=engArr.length?Math.round(engArr.reduce((s,e)=>s+(e.citationRate||0),0)/engArr.length):0;
  kvLine("Overall Visibility Score",overallScore+"%",overallScore>=60?green:overallScore>=30?amber:red);
  kvLine("Average Mention Rate",avgMention+"%");
  kvLine("Average Citation Rate",avgCitation+"%");
  kvLine("ChatGPT Mentions / Citations",(gptE.mentionRate||0)+"% / "+(gptE.citationRate||0)+"%");
  kvLine("Gemini Mentions / Citations",(gemE.mentionRate||0)+"% / "+(gemE.citationRate||0)+"%");
  kvLine("Perplexity Mentions / Citations",(pplxE.mentionRate||0)+"% / "+(pplxE.citationRate||0)+"%");
  kvLine("Google AI Mentions / Citations",(gaiE.mentionRate||0)+"% / "+(gaiE.citationRate||0)+"%");
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
  if(r.narratives?.dashboard){
    checkPage(20);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text("AI Summary",margin,y);y+=6;
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(80,80,80);
    const narrativeLines=doc.splitTextToSize(r.narratives.dashboard,contentW);narrativeLines.forEach(nl=>{checkPage(5);doc.text(nl,margin,y);y+=4;});y+=4;
  }
  if(findings.length>0){
    checkPage(10);doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text("Key Findings",margin,y);y+=6;
    findings.slice(0,5).forEach(f=>{
      checkPage(10);doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...dark);
      const lines=doc.splitTextToSize("\u2022 "+f,contentW-5);doc.text(lines,margin+3,y);y+=lines.length*4+2;
    });
  }
  const weights=r.engineWeights||{};
  if(Object.keys(weights).length>0){
    checkPage(8);doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(120,120,120);
    const weightText="Engine weights (regional market share): "+(r.engines||[]).map(e=>e.name+" "+Math.round((weights[e.id]||0)*100)+"%").join(", ");
    doc.text(weightText,margin,y);y+=6;
  }

  // ── INTENT PATHWAY — QUERY RESULTS ──
  doc.addPage();y=margin;
  sectionHeader("Query Results");
  const gptQueries=gptE.queries||[];
  const gemQueries=gemE.queries||[];
  const pplxQueries=pplxE.queries||[];
  const searchQueries=r.searchQueries||gptQueries.map(q=>q.query||q);
  const gaiQueries=(r.engines[3]||{}).queries||[];
  const queryTableData=searchQueries.map((q,i)=>{
    const qText=typeof q==="string"?q:q.query||q;
    const gptStatus=gptQueries[i]?.status||"Absent";
    const gemStatus=gemQueries[i]?.status||"Absent";
    const pplxStatus=pplxQueries[i]?.status||"Absent";
    const gaiStatus=gaiQueries[i]?.status||"Absent";
    return[qText,gptStatus,gemStatus,pplxStatus,gaiStatus];
  });
  if(queryTableData.length>0){
    doc.autoTable({startY:y,head:[["Query","ChatGPT","Gemini","Perplexity","Google AI"]],body:queryTableData,margin:{left:margin,right:margin},
      styles:{fontSize:7,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
      columnStyles:{0:{cellWidth:contentW-88},1:{cellWidth:22,halign:"center"},2:{cellWidth:22,halign:"center"},3:{cellWidth:22,halign:"center"},4:{cellWidth:22,halign:"center"}},
      didParseCell:function(data){
        if(data.section==="body"&&data.column.index>=1&&data.column.index<=4){
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
  const allBrandsForVoice=[{name:brand,mentionShare:r.sovData?.shares?.[brand]?.mentionShare||0,citationShare:r.sovData?.shares?.[brand]?.citationShare||0},...(r.competitors||[]).filter(c=>c.name.toLowerCase()!==brand.toLowerCase()).map(c=>({name:c.name,mentionShare:r.sovData?.shares?.[c.name]?.mentionShare||0,citationShare:r.sovData?.shares?.[c.name]?.citationShare||0}))];
  if(allBrandsForVoice.length>0){
    doc.autoTable({startY:y,head:[["Brand","Mention Share","Citation Share","Overall Share"]],
      body:allBrandsForVoice.map(b=>[b.name,(b.mentionShare||0)+"%",(b.citationShare||0)+"%",Math.round(((b.mentionShare||0)+(b.citationShare||0))/2)+"%"]),
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

  // ── WEBSITE READINESS ──
  if(r.painPoints&&r.painPoints.length>0){
    checkPage(40);sectionHeader("Website Readiness");
    if(r.websiteReadinessScore!=null){doc.setFontSize(10);doc.setFont("helvetica","bold");doc.setTextColor(...dark);doc.text("Weighted Readiness Score: "+r.websiteReadinessScore+"%",margin,y);y+=8;}
    const readinessRows=r.painPoints.map(p=>[p.label||p.name||"",String(p.score||0)+"%",p.severity||"",p.evidence||p.detail||""]);
    doc.autoTable({startY:y,head:[["Category","Score","Severity","Evidence"]],body:readinessRows,margin:{left:margin,right:margin},
      styles:{fontSize:7,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
      columnStyles:{0:{cellWidth:35},1:{cellWidth:15,halign:"center"},2:{cellWidth:18,halign:"center"},3:{cellWidth:contentW-68}},
      didParseCell:function(data){if(data.section==="body"&&data.column.index===2){const v=(data.cell.raw||"").toLowerCase();if(v==="critical")data.cell.styles.textColor=red;else if(v==="warning")data.cell.styles.textColor=amber;else data.cell.styles.textColor=green;data.cell.styles.fontStyle="bold";}}
    });y=doc.lastAutoTable.finalY+10;
  }

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

  // ── QUERY CATEGORIES ──
  checkPage(30);sectionHeader("Query Categories");
  const qcGptQueries = gptE.queries || [];
  const qcGemQueries = gemE.queries || [];
  const qcAll = (r.searchQueries || qcGptQueries.map(q => q.query)).map((query, i) => {
    const qText = typeof query === "string" ? query : query.query;
    const gptMatch = qcGptQueries.find(q => q.query === qText) || qcGptQueries[i];
    const gemMatch = qcGemQueries.find(q => q.query === qText) || qcGemQueries[i];
    const bestStatus = (gptMatch?.status === "Cited" || gemMatch?.status === "Cited") ? "Cited" : (gptMatch?.status === "Mentioned" || gemMatch?.status === "Mentioned") ? "Mentioned" : "Absent";
    const cat = (() => { const q = qText.toLowerCase(); if (/best|top\s+\d|recommend|which\s+(is|are)|should\s+i/i.test(q)) return "Recommendation"; if (/vs|compar|versus|difference/i.test(q)) return "Comparison"; if (/how\s+(to|do|does|can|much)|guide|tutorial/i.test(q)) return "How-To"; if (/buy|price|cost|plan|package|subscription/i.test(q)) return "Transactional"; if (/review|rating|experience|worth/i.test(q)) return "Evaluation"; if (/what\s+(is|are)|explain|meaning/i.test(q)) return "Informational"; return "General"; })();
    const arch=(r.queryArchetypeMap||{})[qText]||"";return [qText, cat, arch, gptMatch?.status || "Absent", gemMatch?.status || "Absent"];
  });
  if (qcAll.length > 0) {
    doc.autoTable({ startY: y, head: [["Query", "Category", "Archetype", "ChatGPT", "Gemini"]], body: qcAll, margin: { left: margin, right: margin }, styles: { fontSize: 7, cellPadding: 3 }, headStyles: { fillColor: accent, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8 }, columnStyles: { 0: { cellWidth: contentW - 95 }, 1: { cellWidth: 22 }, 2: { cellWidth: 25 }, 3: { cellWidth: 22, halign: "center" }, 4: { cellWidth: 26, halign: "center" } },
      didParseCell: function(data) { if (data.section === "body" && (data.column.index === 3 || data.column.index === 4)) { const val = data.cell.raw; if (val === "Cited") data.cell.styles.textColor = green; else if (val === "Mentioned") data.cell.styles.textColor = accent; else data.cell.styles.textColor = red; data.cell.styles.fontStyle = "bold"; } }
    }); y = doc.lastAutoTable.finalY + 10;
  }

  // ── TARGET CHANNELS ──
  checkPage(30);sectionHeader("Target Channels");
  const channelGaps=r.verifiedChannelGaps||[];
  if(channelGaps.length>0){
    doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...dark);
    doc.text("Verified platforms where "+(r.clientData?.brand||"your brand")+" can improve visibility",margin,y);y+=6;
    const gapRows=channelGaps.map((g,i)=>[String(i+1),g.domain||"",String(g.citations||0)+" citations",g.description||"",g.action||""]);
    doc.autoTable({startY:y,head:[["#","Platform","Citations","Description","Recommended Action"]],body:gapRows,margin:{left:margin,right:margin},
      styles:{fontSize:7,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
      columnStyles:{0:{cellWidth:8},1:{cellWidth:28},2:{cellWidth:18,halign:"center"},3:{cellWidth:contentW-109},4:{cellWidth:55}}
    });y=doc.lastAutoTable.finalY+10;
  }else{
    const srcCh=r.channelSourceData?.sourceChannels||[];
    const srcOpp=r.channelSourceData?.opportunities||[];
    if(srcCh.length>0){
      doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...dark);
      doc.text("Where AI Sources You",margin,y);y+=5;
      doc.autoTable({startY:y,head:[["Channel","Type","References","Description"]],
        body:srcCh.map(s=>[s.channel||"",s.type||"",String(s.referenceCount||0),s.description||""]),
        margin:{left:margin,right:margin},styles:{fontSize:7,cellPadding:3},
        headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
        columnStyles:{0:{cellWidth:40},1:{cellWidth:22,halign:"center"},2:{cellWidth:18,halign:"center"},3:{cellWidth:contentW-80}}
      });y=doc.lastAutoTable.finalY+6;
    }
    if(srcOpp.length>0){
      checkPage(20);
      doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...dark);
      doc.text("High-Impact Opportunities",margin,y);y+=5;
      doc.autoTable({startY:y,head:[["Channel","Impact","Action"]],
        body:srcOpp.map(o=>[o.channel||"",o.impact||"medium",o.action||""]),
        margin:{left:margin,right:margin},styles:{fontSize:7,cellPadding:3},
        headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold",fontSize:8},
        columnStyles:{0:{cellWidth:35},1:{cellWidth:20,halign:"center"},2:{cellWidth:contentW-55}}
      });y=doc.lastAutoTable.finalY+10;
    }
  }

  // ── SENTIMENT ANALYSIS ──
  checkPage(30);sectionHeader("Sentiment Analysis");
  const sentBrand=r.sentiment?.brand||{};
  if(sentBrand.posPercent!=null){
    doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(80,80,80);
    doc.text((sentBrand.posPercent||0)+"% positive sentiment across "+(sentBrand.mentionCount||0)+" mentions from "+(sentBrand.totalResponses||60)+" queries",margin,y);y+=5;
    doc.text((sentBrand.posCount||0)+" positive, "+(sentBrand.negCount||0)+" negative, "+(sentBrand.neuCount||0)+" neutral",margin,y);y+=8;
    const compSent=r.sentiment?.competitors||[];
    if(compSent.length>0){
      const sentRows=[[r.clientData?.brand||"Brand",String(sentBrand.mentionCount||0),String(sentBrand.posPercent||0)+"%",String(sentBrand.negPercent||0)+"%"]];
      compSent.forEach(c=>{if(c.name)sentRows.push([c.name,String(c.mentionCount||0),String(c.posPercent||0)+"%",String(c.negPercent||0)+"%"]);});
      doc.autoTable({startY:y,head:[["Brand","Mentions","Positive %","Negative %"]],body:sentRows,margin:{left:margin,right:margin},
        styles:{fontSize:8,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold"}
      });y=doc.lastAutoTable.finalY+8;
    }
  }
  if(r.sentimentSignals){
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

  // ── CITATION SOURCES ──
  const cs=r.citationSources||{};
  const allCite=(cs.all||[]).map(s=>{
    let url=s.url||"";if(url.includes("vertexaisearch")||url.includes("grounding-api-redirect")){if(s.title&&!s.title.includes(" ")&&s.title.includes("."))url="https://"+s.title.replace(/^(https?:\/\/)?/,"").replace(/^www\./,"");else return null;}
    const domain=(()=>{try{return new URL(url).hostname.replace("www.","");}catch(e){return"";}})();
    if(!domain||domain.length<3)return null;
    return{domain,engine:s.engine==="chatgpt"?"ChatGPT":s.engine==="gemini"?"Gemini":s.engine==="perplexity"?"Perplexity":s.engine==="googleai"?"Google AI":s.engine};
  }).filter(Boolean);
  if(allCite.length>0){
    checkPage(40);sectionHeader("Citation Sources");
    if(r.narratives?.citationSources){
      doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(80,80,80);
      const csNarr=doc.splitTextToSize(r.narratives.citationSources,contentW);csNarr.forEach(nl=>{checkPage(5);doc.text(nl,margin,y);y+=4;});y+=4;
    }
    const csDomainMap={};
    allCite.forEach(c=>{const d=c.domain;if(!csDomainMap[d])csDomainMap[d]={domain:d,count:0,engines:new Set()};csDomainMap[d].count++;csDomainMap[d].engines.add(c.engine);});
    const topDomains=Object.values(csDomainMap).filter(d=>d.count>=2).sort((a,b)=>b.count-a.count).slice(0,20);
    if(topDomains.length>0){
      const citRows=topDomains.map(d=>[d.domain,String(d.count),[...d.engines].join(", ")]);
      doc.autoTable({startY:y,head:[["Domain","Citations","Engines"]],body:citRows,margin:{left:margin,right:margin},
        styles:{fontSize:8,cellPadding:3},headStyles:{fillColor:accent,textColor:[255,255,255],fontStyle:"bold"}
      });y=doc.lastAutoTable.finalY+10;
    }
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
  const PerplexityLogo=()=><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="#20808D" strokeWidth="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="#20808D" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const GoogleAILogo=()=><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="#EA4335" strokeWidth="1.5"/><path d="M4 8h8M8 4v8" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  const engineMeta=[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{id:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo},{id:"perplexity",name:"Perplexity",color:"#20808D",Logo:PerplexityLogo},{id:"googleai",name:"Google AI Overview",color:"#EA4335",Logo:GoogleAILogo}];
  const badP=["specific strength","specific weakness","data unavailable","REPLACE WITH","as a language model","as an ai","limited knowledge"];
  const fB=(arr,fb)=>{if(!arr||!Array.isArray(arr))return fb;const f=arr.filter(s=>s&&typeof s==="string"&&!badP.some(bp=>s.toLowerCase().includes(bp))&&s.length>10);return f.length>=2?f:fb;};
  const engines=engineMeta.map((e,i)=>{
    if(hasApi&&apiData.engineData.engines&&apiData.engineData.engines[i]){const ae=apiData.engineData.engines[i];
      return{...e,score:ae.score||0,mentionRate:ae.mentionRate||0,citationRate:ae.citationRate||0,queries:(ae.queries||[]).map(q=>({query:q.query||"",status:q.status||"Absent"})),strengths:fB(ae.strengths,[`${cd.brand} appears in some ${cd.industry} queries`]),weaknesses:fB(ae.weaknesses,[`Competitors cited more frequently`])};}
    return{...e,score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:["No API data received"]};
  });
  engines.forEach(e=>{e.score=Math.round(e.mentionRate*0.5+e.citationRate*0.5);});
  const gWeights=getEngineWeights(cd.region);
  const overall=Math.round(engines.reduce((sum,e)=>{const w=gWeights[e.id]||(1/engines.length);return sum+(e.score*w);},0));
  const getScoreLabel=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const getScoreDesc=(s,b)=>s>=80?b+" is dominant — frequently cited and recommended.":s>=60?b+" has strong visibility — regularly mentioned.":s>=40?b+" has moderate visibility — rarely cited as primary source.":s>=20?b+" has weak visibility — occasionally mentioned.":b+" is invisible to AI engines.";
  const painCats=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  const painPoints=(hasApi&&apiData.engineData.painPoints&&apiData.engineData.painPoints.length>0)?apiData.engineData.painPoints.map(pp=>({label:pp.label,score:pp.score,severity:pp.score<30?"critical":pp.score<60?"warning":"good",evidence:pp.evidence||[]})):painCats.map(label=>({label,score:0,severity:"critical"}));
  const websiteReadinessScore=Math.round(painPoints.reduce((sum,pp)=>sum+(pp.score*getCategoryWeight(pp.label)),0));
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
  const sentiment=(hasApi&&apiData.sentimentData)?apiData.sentimentData:{brand:{gpt:50,gemini:50,perplexity:50,avg:50,summary:"Not assessed"},competitors:[]};
  const sentimentSignals=(hasApi&&apiData.sentimentSignals)?apiData.sentimentSignals:{positive:[],negative:[],quotes:[],competitorSentiment:[],rawSnippets:[]};
  const brandCrawl=(hasApi&&apiData.brandCrawlData)?apiData.brandCrawlData:null;
  const compCrawlData=(hasApi&&apiData.compCrawlData)?apiData.compCrawlData:{};
  const searchQueries=(hasApi&&apiData.searchQueries)?apiData.searchQueries:[];
  const queryArchetypeMap=(hasApi&&apiData.queryArchetypeMap)?apiData.queryArchetypeMap:{};
  const channelSourceData=(hasApi&&apiData.channelSourceData)?apiData.channelSourceData:{sourceChannels:[],opportunities:[]};
  // Share of Voice — unified counting method (no rate→count round-trip bias)
  const sovData=(()=>{
    const brandName=cd.brand;
    const sovEngines=engines||[];
    const mentionCounts={};const citationCounts={};
    // Brand: count directly from engine query statuses
    let brandMentions=0,brandCitations=0;
    sovEngines.forEach(engine=>{(engine.queries||[]).forEach(q=>{if(q.status==="Cited"||q.status==="Mentioned")brandMentions++;if(q.status==="Cited")brandCitations++;});});
    mentionCounts[brandName]=brandMentions;citationCounts[brandName]=brandCitations;
    // Competitors: use per-engine rates applied to per-engine query counts (same basis as brand)
    const cVis=(hasApi&&apiData.compVisibilityData)?apiData.compVisibilityData:{};
    competitors.forEach(c=>{const name=c.name;if(!name)return;let compM=0,compC=0;const cv=cVis[name];
      if(cv){sovEngines.forEach(engine=>{const eid=engine.id;let mRate=0,cRate=0;
        if(eid==="chatgpt"&&cv.gpt){mRate=cv.gpt.mentionRate||0;cRate=cv.gpt.citationRate||0;}
        else if(eid==="gemini"&&cv.gemini){mRate=cv.gemini.mentionRate||0;cRate=cv.gemini.citationRate||0;}
        else if(eid==="perplexity"&&cv.perplexity){mRate=cv.perplexity.mentionRate||0;cRate=cv.perplexity.citationRate||0;}
        else if(eid==="googleai"&&cv.googleai){mRate=cv.googleai.mentionRate||0;cRate=cv.googleai.citationRate||0;}
        const eqCount=(engine.queries||[]).length||1;
        compM+=Math.round(mRate/100*eqCount);compC+=Math.round(cRate/100*eqCount);});}
      mentionCounts[name]=compM;citationCounts[name]=compC;});
    const totalMentions=Object.values(mentionCounts).reduce((a,b)=>a+b,0)||1;
    const totalCitations=Object.values(citationCounts).reduce((a,b)=>a+b,0)||1;
    const shares={};const allNames=[brandName,...competitors.map(c=>c.name).filter(n=>n)];
    allNames.forEach(name=>{shares[name]={mentionCount:mentionCounts[name]||0,citationCount:citationCounts[name]||0,mentionShare:Math.round(((mentionCounts[name]||0)/totalMentions)*100),citationShare:Math.round(((citationCounts[name]||0)/totalCitations)*100),isBrand:name===brandName};});
    return{shares,totalMentions,totalCitations,totalQueries:sovEngines.reduce((sum,e)=>(e.queries||[]).length,0)};
  })();
  const citationSources=(hasApi&&apiData.citationSources)?apiData.citationSources:{gpt:[],gemini:[],all:[]};
  const verifiedChannelGaps=(hasApi&&apiData.verifiedChannelGaps)?apiData.verifiedChannelGaps:[];
  const narratives=(hasApi&&apiData.narratives)?apiData.narratives:{};
  const engineWeights=hasApi?(apiData.engineWeights||gWeights):gWeights;
  return{overall,scoreLabel:getScoreLabel(overall),scoreDesc:getScoreDesc(overall,cd.brand),engines,painPoints,competitors,stakeholders,funnelStages,aeoChannels,brandGuidelines,contentTypes,roadmap,outputReqs,sentiment,sentimentSignals,brandCrawl,compCrawlData,searchQueries,queryArchetypeMap,channelSourceData,citationSources,narratives,sovData,engineWeights,websiteReadinessScore,verifiedChannelGaps,auditDate:apiData.auditDate||new Date().toISOString(),clientData:cd};
}

function generatePartial(cd, partial) {
  const hasEngine = partial.engineData && partial.engineData.engines;
  if (!hasEngine) return null;
  const safeApiData = {
    engineData: partial.engineData || null,
    competitorData: partial.competitorData || { competitors: [] },
    compVisibilityData: partial.compVisibilityData || {},
    archData: partial.archData || [],
    intentData: partial.intentData || null,
    channelData: partial.channelData || { channels: [] },
    contentGridData: partial.contentGridData || [],
    roadmapData: partial.roadmapData || null,
    contentData: partial.contentGridData || [],
    guidelineData: partial.guidelineData || null,
    sentimentData: partial.sentimentData || null,
    sentimentSignals: partial.sentimentSignals || null,
    brandCrawlData: partial.brandCrawlData || null,
    compCrawlData: partial.compCrawlData || {},
    searchQueries: partial.searchQueries || [],
    queryArchetypeMap: partial.queryArchetypeMap || {},
    channelSourceData: partial.channelSourceData || { sourceChannels: [], opportunities: [] },
    citationSources: partial.citationSources || { gpt: [], gemini: [], all: [] },
    narratives: partial.narratives || {}
  };
  try { return generateAll(cd, safeApiData); } catch(e) { console.error("generatePartial error:", e); return null; }
}

/* ─── LANDING PAGE ─── */
function LandingPage({ onGetStarted }) {
  const [activeSection, setActiveSection] = React.useState("hero");
  const [hoverCTA, setHoverCTA] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "how"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById("section-" + id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) { setActiveSection(id); break; }
        }
      }
    };
    const scrollEl = document.getElementById("lp-scroll");
    if (scrollEl) { scrollEl.addEventListener("scroll", handleScroll, { passive: true }); return () => scrollEl.removeEventListener("scroll", handleScroll); }
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById("section-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinkStyle = (id) => ({fontSize:13,color:activeSection===id?"#2563eb":"#64748b",cursor:"pointer",fontWeight:activeSection===id?500:400,transition:"all .15s",textDecoration:"none"});

  const steps = [
    {
      number:"01",title:"Configure",subtitle:"Define your brand context",
      desc:"Enter your brand name, website, region, and industry. EnterRank automatically crawls your website to understand your products and positioning. Add up to 3 competitors for head-to-head comparison, then select from AI-generated audience archetypes that represent your key customer segments. These archetypes drive the 15 search topics your audit will test.",
      color:"#2563eb",
      visual:(
        <div style={{display:"flex",flexDirection:"column",gap:10,padding:24}}>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1,padding:"10px 14px",background:"#f8fafc",borderRadius:8,border:"1px solid #e2e8f0"}}>
              <div style={{fontSize:9,color:"#94a3b8",marginBottom:2}}>Brand Name</div>
              <div style={{fontSize:13,color:"#0f172a",fontWeight:500}}>Shell</div>
            </div>
            <div style={{flex:1,padding:"10px 14px",background:"#f8fafc",borderRadius:8,border:"1px solid #e2e8f0"}}>
              <div style={{fontSize:9,color:"#94a3b8",marginBottom:2}}>Region</div>
              <div style={{fontSize:13,color:"#0f172a",fontWeight:500}}>Malaysia</div>
            </div>
          </div>
          <div style={{padding:"10px 14px",background:"#f8fafc",borderRadius:8,border:"1px solid #e2e8f0"}}>
            <div style={{fontSize:9,color:"#94a3b8",marginBottom:4}}>Detected Competitors</div>
            <div style={{display:"flex",gap:6}}>
              {["Petronas","BP","Caltex"].map((c,i)=>(<span key={i} style={{fontSize:11,padding:"3px 10px",background:"#fff",borderRadius:6,border:"1px solid #e2e8f0",color:"#374151"}}>{c}</span>))}
            </div>
          </div>
          <div style={{padding:"10px 14px",background:"#eff6ff",borderRadius:8,border:"1px solid #bfdbfe"}}>
            <div style={{fontSize:9,color:"#2563eb",marginBottom:4}}>Target Archetypes (ranked)</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {["Daily Commuter","Budget-Conscious Family","Fleet Manager"].map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{width:18,height:18,borderRadius:6,background:"#2563eb",color:"#fff",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500}}>{i+1}</span>
                  <span style={{fontSize:11,color:"#1e40af"}}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      number:"02",title:"Test",subtitle:"Live queries on 4 AI engines",
      desc:"Each of your 15 topics is sent as a real query to ChatGPT, Gemini, Perplexity, and Google AI. That\u2019s 60 live data points collected in under three minutes. Every response is captured word-for-word, including citation URLs and source references.",
      color:"#059669",
      visual:(
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:20}}>
            {[{name:"ChatGPT",color:"#10A37F"},{name:"Gemini",color:"#4285F4"},{name:"Perplexity",color:"#20808D"},{name:"Google AI",color:"#EA4335"}].map((e,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{width:40,height:40,borderRadius:10,background:e.color+"15",border:"1px solid "+e.color+"30",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:e.color}}/>
                </div>
                <div style={{fontSize:10,color:e.color,fontWeight:500}}>{e.name}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {["What are the best petrol stations in Malaysia?","Compare Shell vs Petronas fuel quality","Cheapest fuel rewards program 2026"].map((q,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#f8fafc",borderRadius:8,border:"1px solid #e2e8f0"}}>
                <div style={{width:6,height:6,borderRadius:3,background:i===0?"#059669":"#e2e8f0"}}/>
                <span style={{fontSize:11,color:"#64748b",flex:1}}>{q}</span>
                <span style={{fontSize:9,color:"#059669",fontWeight:500}}>{i===0?"Testing...":"Queued"}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:12,fontSize:10,color:"#94a3b8"}}>15 queries × 4 engines = 60 live data points</div>
        </div>
      )
    },
    {
      number:"03",title:"Analyse",subtitle:"Classify, score, and compare",
      desc:"Responses are classified as Cited (the engine recommended you), Mentioned (you were named but not recommended), or Absent (you were not included at all). Scores are weighted by each engine\u2019s estimated market share in your region, so your visibility score reflects real-world user behaviour.",
      color:"#8b5cf6",
      visual:(
        <div style={{padding:24}}>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[{label:"Cited",count:8,color:"#dcfce7",textColor:"#166534"},{label:"Mentioned",count:4,color:"#dbeafe",textColor:"#1e40af"},{label:"Absent",count:3,color:"#fee2e2",textColor:"#991b1b"}].map((s,i)=>(
              <div key={i} style={{flex:1,textAlign:"center",padding:"12px 8px",background:s.color,borderRadius:8}}>
                <div style={{fontSize:20,fontWeight:500,color:s.textColor}}>{s.count}</div>
                <div style={{fontSize:10,color:s.textColor}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:"#64748b"}}>Shell</span><span style={{fontSize:10,fontWeight:500,color:"#0f172a"}}>62%</span></div>
            <div style={{height:6,borderRadius:3,background:"#e2e8f0"}}><div style={{width:"62%",height:6,borderRadius:3,background:"#2563eb"}}/></div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:"#64748b"}}>Petronas</span><span style={{fontSize:10,fontWeight:500,color:"#0f172a"}}>78%</span></div>
            <div style={{height:6,borderRadius:3,background:"#e2e8f0"}}><div style={{width:"78%",height:6,borderRadius:3,background:"#f97316"}}/></div>
          </div>
          <div style={{textAlign:"center",marginTop:12,fontSize:10,color:"#94a3b8"}}>Weighted by regional engine market share</div>
        </div>
      )
    },
    {
      number:"04",title:"Optimise",subtitle:"Actionable strategy backed by evidence",
      desc:"Review key findings with specific actions, sentiment analysis showing how each engine describes your brand, citation source mapping, competitive share of voice, and a 90-day transformation roadmap your team can execute immediately. Export everything as a PDF report.",
      color:"#d97706",
      visual:(
        <div style={{padding:24}}>
          <div style={{padding:"12px 16px",background:"#f0fdf4",borderRadius:8,borderLeft:"3px solid #059669",marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:500,color:"#166534",marginBottom:2}}>Key Finding</div>
            <div style={{fontSize:11,color:"#374151",lineHeight:1.5}}>Shell is absent from 40% of recommendation queries. Petronas is cited in all of them.</div>
          </div>
          <div style={{padding:"12px 16px",background:"#eff6ff",borderRadius:8,borderLeft:"3px solid #2563eb",marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:500,color:"#1e40af",marginBottom:2}}>Action</div>
            <div style={{fontSize:11,color:"#374151",lineHeight:1.5}}>Create comparison guide targeting "best petrol station" queries with pricing data and rewards breakdown.</div>
          </div>
          <div style={{padding:"12px 16px",background:"#fef3c7",borderRadius:8,borderLeft:"3px solid #d97706"}}>
            <div style={{fontSize:10,fontWeight:500,color:"#92400e",marginBottom:2}}>Citation Gap</div>
            <div style={{fontSize:11,color:"#374151",lineHeight:1.5}}>Competitors cited via Lowyat.net and PaulTan.org. Shell has no presence on either platform.</div>
          </div>
        </div>
      )
    }
  ];



  return (
    <div style={{fontFamily:"'Satoshi',-apple-system,BlinkMacSystemFont,sans-serif",background:"#ffffff",height:"100vh",overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"/>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatDash{0%,100%{transform:perspective(1400px) rotateY(-12deg) rotateX(5deg) translateY(0)}50%{transform:perspective(1400px) rotateY(-12deg) rotateX(5deg) translateY(-10px)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
      `}</style>

      {/* ===== FIXED NAV BAR ===== */}
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid #f1f5f9",padding:"0 48px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:24}}>
          <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>scrollTo("hero")}>
            <img src="/enterank-icon.svg" alt="EnterRank" style={{width:26,height:26}}/>
            <span style={{fontSize:15,fontWeight:500,color:"#0f172a",letterSpacing:"-.01em"}}>EnterRank</span>
          </div>
          <div style={{display:"flex",gap:20,marginLeft:16}}>
            <span onClick={()=>scrollTo("features")} style={navLinkStyle("features")}>Features</span>
            <span onClick={()=>scrollTo("how")} style={navLinkStyle("how")}>How It Works</span>
          </div>
        </div>
        <button onClick={onGetStarted} style={{padding:"8px 20px",background:"#2563eb",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Get Started</button>
      </div>

      {/* ===== SCROLLABLE CONTENT ===== */}
      <div id="lp-scroll" style={{overflowY:"auto",height:"100vh",paddingTop:56}}>

      {/* ===== SECTION 1: HERO ===== */}
      <div id="section-hero" style={{minHeight:"calc(100vh - 56px)",display:"flex",alignItems:"center",padding:"100px 48px 0",position:"relative"}}>
        <div style={{position:"absolute",inset:0,zIndex:0,overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)",backgroundSize:"32px 32px"}}/>
          <div style={{position:"absolute",top:"-15%",right:"-5%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(99,102,241,0.03) 40%, transparent 65%)",filter:"blur(40px)"}}/>
          <div style={{position:"absolute",top:"30%",left:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.02) 40%, transparent 65%)",filter:"blur(50px)"}}/>
          <div style={{position:"absolute",bottom:"-10%",right:"20%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, rgba(14,165,233,0.04) 0%, rgba(37,99,235,0.02) 40%, transparent 65%)",filter:"blur(45px)"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:48,maxWidth:1400,margin:"0 auto",width:"100%",position:"relative",zIndex:1}}>
          <div style={{flex:"0 0 42%",maxWidth:500}}>
            <div style={{fontSize:11,fontWeight:500,color:"#2563eb",letterSpacing:".1em",textTransform:"uppercase",marginBottom:20}}>Audit · Analyse · Optimise</div>
            <h1 style={{fontSize:50,fontWeight:500,color:"#0f172a",letterSpacing:"-.04em",margin:"0 0 20px",lineHeight:1.08}}>
              Own Your Brand's<br/><span style={{color:"#2563eb"}}>AI Visibility</span>
            </h1>
            <p style={{fontSize:16,color:"#64748b",margin:"0 0 32px",lineHeight:1.7,maxWidth:440}}>
              Test real queries on ChatGPT, Gemini, Perplexity, and Google AI. See exactly when AI engines mention, cite, or ignore your brand. Then build the strategy to change it.
            </p>
            <div style={{display:"flex",gap:12}}>
              <button onClick={onGetStarted} onMouseEnter={()=>setHoverCTA(true)} onMouseLeave={()=>setHoverCTA(false)} style={{padding:"15px 32px",background:hoverCTA?"#1d4ed8":"#2563eb",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all .25s",boxShadow:hoverCTA?"0 8px 28px rgba(37,99,235,0.3)":"0 4px 16px rgba(37,99,235,0.15)",transform:hoverCTA?"translateY(-2px)":"translateY(0)",display:"flex",alignItems:"center",gap:8}}>
                Run Audit Now <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={()=>scrollTo("how")} style={{padding:"15px 24px",background:"transparent",color:"#64748b",border:"1px solid #e2e8f0",borderRadius:10,fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>See How It Works</button>
            </div>
          </div>
          <div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",animation:"slideInRight 1s ease-out"}}>
            <div style={{position:"relative",width:"100%",maxWidth:540,perspective:"1200px",margin:"0 auto"}}>
              <div style={{position:"absolute",top:"10%",left:"10%",right:"10%",bottom:"10%",background:"radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)",filter:"blur(40px)",zIndex:0,borderRadius:"50%"}}/>
              <div style={{position:"relative",zIndex:1,background:"#fff",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",border:"1px solid rgba(226,232,240,0.8)",transform:"rotateY(-8deg) rotateX(4deg)",animation:"floatDash 6s ease-in-out infinite",overflow:"hidden",display:"flex",width:"100%",height:360}}>
                {/* Sidebar */}
                <div style={{width:140,background:"#f8fafc",borderRight:"1px solid #e2e8f0",padding:"14px 0",flexShrink:0}}>
                  <div style={{padding:"0 12px",marginBottom:16}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:18,height:18,borderRadius:6,background:"#3b82f6",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:8,fontWeight:500}}>E</span></div>
                      <span style={{fontSize:9,fontWeight:500,color:"#0f172a"}}>EnterRank</span>
                    </div>
                  </div>
                  <div style={{fontSize:7,color:"#94a3b8",padding:"0 12px",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>Analysis</div>
                  {[{name:"Dashboard",active:true},{name:"Sentiment",active:false},{name:"Query Categories",active:false},{name:"Citation Sources",active:false}].map((item,i)=>(<div key={i} style={{padding:"6px 12px",fontSize:8,color:item.active?"#0f172a":"#94a3b8",fontWeight:item.active?500:400,background:item.active?"#fff":"transparent",borderLeft:item.active?"2px solid #3b82f6":"2px solid transparent",marginBottom:1}}>{item.name}</div>))}
                  <div style={{fontSize:7,color:"#94a3b8",padding:"0 12px",marginTop:10,marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>Strategy</div>
                  {["Target Channels","Content Hub","90-Day Roadmap"].map((name,i)=>(<div key={i} style={{padding:"6px 12px",fontSize:8,color:"#94a3b8",borderLeft:"2px solid transparent",marginBottom:1}}>{name}</div>))}
                </div>
                {/* Main content */}
                <div style={{flex:1,padding:"16px 18px",overflowY:"hidden"}}>
                  <div style={{marginBottom:12,paddingBottom:8,borderBottom:"1px solid #f1f5f9"}}>
                    <div style={{fontSize:11,fontWeight:500,color:"#0f172a"}}>Acme Corp Visibility Report</div>
                    <div style={{fontSize:7,color:"#94a3b8",marginTop:2}}>Technology · United States · March 2026</div>
                  </div>
                  <div style={{display:"flex",gap:12,marginBottom:12,alignItems:"center"}}>
                    <div style={{textAlign:"center",flexShrink:0}}>
                      <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="4"/><circle cx="32" cy="32" r="26" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray={2*Math.PI*26} strokeDashoffset={2*Math.PI*26*(1-0.83)} strokeLinecap="round" transform="rotate(-90 32 32)"/><text x="32" y="35" textAnchor="middle" fontSize="14" fontWeight="500" fill="#0f172a">83%</text></svg>
                      <div style={{fontSize:6,color:"#94a3b8",marginTop:1}}>Visibility Score</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,flex:1}}>
                      <div style={{background:"#f8fafc",borderRadius:6,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:6,color:"#94a3b8",marginBottom:2}}>MENTION RATE</div><div style={{fontSize:12,fontWeight:500,color:"#1e40af"}}>86%</div></div>
                      <div style={{background:"#f8fafc",borderRadius:6,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:6,color:"#94a3b8",marginBottom:2}}>CITATION RATE</div><div style={{fontSize:12,fontWeight:500,color:"#1e40af"}}>72%</div></div>
                      <div style={{background:"#f8fafc",borderRadius:6,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:6,color:"#94a3b8",marginBottom:2}}>SENTIMENT</div><div style={{fontSize:10,fontWeight:500,color:"#059669"}}>Positive</div></div>
                    </div>
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:7,color:"#94a3b8",marginBottom:6,fontWeight:500}}>ENGINE PERFORMANCE</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
                      {[{name:"ChatGPT",score:77,color:"#10A37F"},{name:"Gemini",score:87,color:"#4285F4"},{name:"Perplexity",score:82,color:"#20808D"},{name:"Google AI",score:85,color:"#EA4335"}].map((e,i)=>(<div key={i} style={{background:"#f8fafc",borderRadius:6,padding:"6px 8px",textAlign:"center"}}><div style={{fontSize:7,color:e.color,fontWeight:500,marginBottom:2}}>{e.name}</div><div style={{fontSize:13,fontWeight:500,color:"#0f172a"}}>{e.score}%</div><div style={{height:3,background:"#e2e8f0",borderRadius:2,marginTop:3}}><div style={{width:e.score+"%",height:"100%",background:e.color,borderRadius:2}}/></div></div>))}
                    </div>
                  </div>
                  {/* Key finding insight */}
                  <div style={{padding:"6px 8px",background:"#eff6ff",borderRadius:6,borderLeft:"2px solid #3b82f6",marginBottom:10}}>
                    <div style={{fontSize:6,color:"#3b82f6",fontWeight:500,marginBottom:1}}>KEY FINDING</div>
                    <div style={{fontSize:7,color:"#334155",lineHeight:1.4}}>Absent from 40% of recommendation queries. Competitor A cited in all.</div>
                  </div>
                  {/* Mini query results */}
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:7,color:"#94a3b8",marginBottom:4,fontWeight:500}}>QUERY RESULTS</div>
                    <div style={{borderRadius:4,border:"1px solid #f1f5f9",overflow:"hidden"}}>
                      {[{q:"Best cloud platforms for startups",g:"Cited",m:"Cited"},{q:"Enterprise CRM comparison",g:"Mentioned",m:"Absent"},{q:"Project management for remote teams",g:"Cited",m:"Mentioned"}].map((r,i)=>{const bc=(s)=>({fontSize:6,fontWeight:500,padding:"1px 3px",borderRadius:2,background:s==="Cited"?"#dcfce7":s==="Mentioned"?"#dbeafe":"#fee2e2",color:s==="Cited"?"#166534":s==="Mentioned"?"#1e40af":"#991b1b"});return(<div key={i} style={{display:"flex",alignItems:"center",padding:"3px 6px",borderBottom:i<2?"1px solid #f1f5f9":"none",gap:3}}><div style={{flex:1,fontSize:7,color:"#64748b",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.q}</div><span style={bc(r.g)}>{r.g}</span><span style={bc(r.m)}>{r.m}</span></div>);})}
                    </div>
                  </div>
                  {/* SoV donut */}
                  <div>
                    <div style={{fontSize:7,color:"#94a3b8",marginBottom:4,fontWeight:500}}>SHARE OF VOICE</div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <svg width="40" height="40" viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="33 80" transform="rotate(-90 25 25)"/><circle cx="25" cy="25" r="18" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="25 88" strokeDashoffset="-33" transform="rotate(-90 25 25)"/><circle cx="25" cy="25" r="18" fill="none" stroke="#a855f7" strokeWidth="6" strokeDasharray="20 93" strokeDashoffset="-58" transform="rotate(-90 25 25)"/></svg>
                      <div style={{flex:1}}>
                        {[{name:"Acme Corp",pct:"30%",color:"#3b82f6"},{name:"Competitor A",pct:"23%",color:"#f97316"},{name:"Competitor B",pct:"18%",color:"#a855f7"}].map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4,marginBottom:1}}><div style={{width:5,height:5,borderRadius:"50%",background:c.color}}/><span style={{fontSize:6,color:"#64748b",flex:1}}>{c.name}</span><span style={{fontSize:6,fontWeight:500,color:"#0f172a"}}>{c.pct}</span></div>))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}><div style={{height:1,background:"linear-gradient(to right, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)"}}/></div>

      {/* ===== SECTION 2: WHAT YOU'LL DISCOVER ===== */}
      <div id="section-features" style={{padding:"80px 24px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{fontSize:13,fontWeight:500,color:"#2563eb",letterSpacing:".06em",textTransform:"uppercase",marginBottom:8}}>What You'll Discover</div>
          <div style={{fontSize:28,fontWeight:500,color:"#0f172a",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Actionable intelligence from every AI engine</div>
          <div style={{fontSize:14,color:"#64748b",marginTop:8,maxWidth:560,margin:"8px auto 0"}}>Every audit delivers three layers of intelligence that traditional SEO tools cannot provide</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          <div style={{background:"#fff",borderRadius:16,padding:"32px 28px",border:"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{width:48,height:48,borderRadius:12,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div style={{fontSize:17,fontWeight:500,color:"#0f172a",marginBottom:8}}>Visibility Scoring</div>
            <div style={{fontSize:13,color:"#64748b",lineHeight:1.7}}>See when ChatGPT, Gemini, Perplexity, and Google AI mention, cite, or ignore your brand across 60 real queries.</div>
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:"32px 28px",border:"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{width:48,height:48,borderRadius:12,background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            </div>
            <div style={{fontSize:17,fontWeight:500,color:"#0f172a",marginBottom:8}}>Competitive Intelligence</div>
            <div style={{fontSize:13,color:"#64748b",lineHeight:1.7}}>Compare your share of voice against competitors on every AI engine and find the queries where you're losing.</div>
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:"32px 28px",border:"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
            <div style={{width:48,height:48,borderRadius:12,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <div style={{fontSize:17,fontWeight:500,color:"#0f172a",marginBottom:8}}>90-Day Action Plan</div>
            <div style={{fontSize:13,color:"#64748b",lineHeight:1.7}}>Get a phased roadmap with specific content, platform, and technical actions tied to projected improvements.</div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}><div style={{height:1,background:"linear-gradient(to right, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)"}}/></div>

      {/* ===== SECTION 3: HOW IT WORKS ===== */}
      <div id="section-how" style={{padding:"80px 48px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:500,color:"#2563eb",letterSpacing:".1em",textTransform:"uppercase",marginBottom:12}}>How It Works</div>
            <h2 style={{fontSize:36,fontWeight:500,color:"#0f172a",letterSpacing:"-.03em",margin:"0 0 12px"}}>Four steps from setup to strategy</h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:520,margin:"0 auto"}}>EnterRank tests real queries on 4 live AI engines, classifies every response, and delivers actionable insights grounded in data, not guesses.</p>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:0,marginBottom:40}}>
            {steps.map((step,i)=>(
              <div key={i} onClick={()=>{setActiveStep(i);setAutoPlay(false);}} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 24px",cursor:"pointer",borderBottom:activeStep===i?"2px solid "+step.color:"2px solid transparent",transition:"all .2s"}}>
                <span style={{fontSize:11,fontWeight:500,color:activeStep===i?step.color:"#94a3b8",fontFamily:"'Space Mono',monospace"}}>{step.number}</span>
                <span style={{fontSize:13,fontWeight:activeStep===i?500:400,color:activeStep===i?"#0f172a":"#94a3b8"}}>{step.title}</span>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}} key={activeStep}>
            <div style={{animation:"fadeInUp .4s ease-out"}}>
              <div style={{fontSize:12,fontWeight:500,color:steps[activeStep].color,marginBottom:8}}>{steps[activeStep].subtitle}</div>
              <h3 style={{fontSize:28,fontWeight:500,color:"#0f172a",margin:"0 0 16px",letterSpacing:"-.02em"}}>{steps[activeStep].title}</h3>
              <p style={{fontSize:14,color:"#64748b",lineHeight:1.8,margin:0}}>{steps[activeStep].desc}</p>
            </div>
            <div style={{animation:"fadeInUp .5s ease-out"}}>
              <div style={{background:"#fff",borderRadius:16,border:"1px solid #e2e8f0",boxShadow:"0 8px 32px rgba(0,0,0,0.04)",overflow:"hidden"}}>
                <div style={{padding:"10px 16px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#ef4444"}}/>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#f59e0b"}}/>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e"}}/>
                  <span style={{fontSize:10,color:"#94a3b8",marginLeft:8}}>Step {steps[activeStep].number}: {steps[activeStep].title}</span>
                </div>
                {steps[activeStep].visual}
              </div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:32}}>
            {steps.map((s,i)=>(<div key={i} onClick={()=>{setActiveStep(i);setAutoPlay(false);}} style={{width:activeStep===i?24:8,height:8,borderRadius:4,background:activeStep===i?s.color:"#e2e8f0",cursor:"pointer",transition:"all .3s"}}/>))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}><div style={{height:1,background:"linear-gradient(to right, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)"}}/></div>

      {/* ===== FOOTER ===== */}
      <div style={{padding:"40px 48px",background:"#0f172a"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/enterank-icon.svg" alt="EnterRank" style={{width:24,height:24,opacity:0.8}}/>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:"#e2e8f0"}}>EnterRank</div>
              <div style={{fontSize:11,color:"#64748b"}}>AI Engine Visibility Platform by Entermind AI</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            <a href="https://entermind.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#64748b",textDecoration:"none"}}>Privacy Policy</a>
            <a href="https://entermind.ai" target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#60a5fa",textDecoration:"none",fontWeight:500}}>Visit Entermind AI →</a>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"16px auto 0",paddingTop:16,borderTop:"1px solid #1e293b",fontSize:11,color:"#475569"}}>
          © 2026 Entermind AI. All rights reserved.
        </div>
      </div>

      </div>{/* end lp-scroll */}
    </div>
  );
}

/* ─── LOGIN FORM ─── */
function LoginForm({ onLogin, onSignUp, error, loading, onBack }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [localError, setLocalError] = useState("");

  const ok = email.length > 3 && pw.length >= 6 && (!isSignUp || confirmPw.length >= 6);

  const submit = () => {
    if (!ok || loading) return;
    setLocalError("");
    if (isSignUp) {
      if (pw !== confirmPw) { setLocalError("Passwords don't match"); return; }
      if (pw.length < 6) { setLocalError("Password must be at least 6 characters"); return; }
      onSignUp(email.trim(), pw);
    } else {
      onLogin(email.trim(), pw);
    }
  };

  const displayError = localError || error;

  return (
    <div style={{height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Satoshi',-apple-system,BlinkMacSystemFont,sans-serif",position:"relative",background:"#ffffff"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"/>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        *{box-sizing:border-box}
        ::selection{background:#2563eb18}
      `}</style>

      {/* Gradient mesh background */}
      <div style={{position:"absolute",inset:0,zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)",backgroundSize:"32px 32px"}}/>
        <div style={{position:"absolute",top:"-15%",right:"-5%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(99,102,241,0.03) 40%, transparent 65%)",filter:"blur(40px)"}}/>
        <div style={{position:"absolute",top:"30%",left:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(147,51,234,0.02) 40%, transparent 65%)",filter:"blur(50px)"}}/>
        <div style={{position:"absolute",bottom:"-10%",right:"20%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle, rgba(14,165,233,0.04) 0%, rgba(37,99,235,0.02) 40%, transparent 65%)",filter:"blur(45px)"}}/>
        <div style={{position:"absolute",bottom:"-20%",left:"10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 60%)",filter:"blur(50px)"}}/>
      </div>

      {/* Login card */}
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:400,padding:"0 24px",animation:"fadeIn .6s ease-out"}}>
        <div style={{background:"#ffffff",borderRadius:16,border:"1px solid #e2e8f0",boxShadow:"0 16px 48px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)",padding:"40px 36px"}}>

          {/* Logo + title */}
          <div style={{textAlign:"center",marginBottom:32}}>
            <img src="/enterank-icon.svg" alt="EnterRank" style={{width:40,height:40,display:"block",margin:"0 auto 14px",cursor:"pointer"}} onClick={onBack}/>
            <div style={{fontSize:20,fontWeight:500,color:"#0f172a",fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>{isSignUp ? "Create your account" : "Welcome back"}</div>
            <div style={{fontSize:13,color:"#94a3b8",marginTop:4}}>{isSignUp ? "Get started with EnterRank" : "Sign in to EnterRank"}</div>
          </div>

          {/* Form fields */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div>
              <label style={{display:"block",fontSize:12,fontWeight:500,color:"#374151",marginBottom:5}}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder="you@company.com"
                style={{width:"100%",padding:"11px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,fontSize:14,color:"#0f172a",outline:"none",fontFamily:"inherit",transition:"all .15s"}}
              />
            </div>

            <div>
              <label style={{display:"block",fontSize:12,fontWeight:500,color:"#374151",marginBottom:5}}>Password</label>
              <div style={{position:"relative"}}>
                <input
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  placeholder={isSignUp ? "Min. 6 characters" : "Enter your password"}
                  style={{width:"100%",padding:"11px 14px",paddingRight:52,background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,fontSize:14,color:"#0f172a",outline:"none",fontFamily:"inherit",transition:"all .15s"}}
                />
                <span onClick={() => setShowPw(!showPw)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer",fontSize:12,color:"#94a3b8",userSelect:"none",fontWeight:500}}>{showPw ? "Hide" : "Show"}</span>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label style={{display:"block",fontSize:12,fontWeight:500,color:"#374151",marginBottom:5}}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={e => setConfirmPw(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  placeholder="Confirm your password"
                  style={{width:"100%",padding:"11px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,fontSize:14,color:"#0f172a",outline:"none",fontFamily:"inherit",transition:"all .15s"}}
                />
              </div>
            )}
          </div>

          {/* Error */}
          {displayError && (
            <div style={{marginTop:12,padding:"10px 14px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,fontSize:12,color:"#dc2626"}}>{displayError}</div>
          )}

          {/* Submit button */}
          <button
            onClick={submit}
            disabled={!ok || loading}
            style={{width:"100%",marginTop:18,padding:"12px",background:ok && !loading ? "#2563eb" : "#e2e8f0",color:ok && !loading ? "#fff" : "#94a3b8",border:"none",borderRadius:8,fontSize:14,fontWeight:500,cursor:ok && !loading ? "pointer" : "not-allowed",fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all .2s"}}
          >
            {loading ? (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
                {isSignUp ? "Creating account..." : "Signing in..."}
              </div>
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </button>

          {/* Toggle */}
          <div style={{textAlign:"center",marginTop:20,fontSize:13,color:"#94a3b8"}}>
            {isSignUp ? (
              <>Already have an account? <span onClick={() => { setIsSignUp(false); setConfirmPw(""); setLocalError(""); }} style={{color:"#2563eb",cursor:"pointer",fontWeight:500}}>Sign in</span></>
            ) : (
              <>Don't have an account? <span onClick={() => { setIsSignUp(true); setLocalError(""); }} style={{color:"#2563eb",cursor:"pointer",fontWeight:500}}>Create account</span></>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── CHAT PANEL — Human-in-the-loop AI assistant ─── */

const NAV_ITEMS=[
  {group:"Analysis",items:[
    {id:"dashboard",label:"Dashboard",icon:"grid"},
    {id:"sentiment",label:"Sentiment Analysis",icon:"heart"},
    {id:"archetypes",label:"Query Categories",icon:"activity"},
    {id:"citations",label:"Citation Sources",icon:"link"},
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
    link:<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    filetext:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="1.5" fill="none"/><polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.5" fill="none"/><line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="1.5"/><line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="1.5"/><line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="1.5"/></>};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{p[name]||null}</svg>;
};

function Sidebar({step,setStep,results,brand,onBack,isLocal,onLogout,collapsed,setCollapsed,sectionReady={},auditInProgress=false}){
  const [hoveredNav, setHoveredNav] = useState(null);
  const sectionMap = { dashboard:"dashboard", archetypes:"archetypes", sentiment:"sentiment", intent:"intent", citations:"citations", playbook:"playbook", channels:"channels", contenthub:"contenthub", roadmap:"roadmap" };
  const sideW=collapsed?60:220;
  return(<div style={{position:"fixed",left:0,top:0,bottom:0,width:sideW,background:"#fff",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",transition:"width .2s ease",zIndex:100,overflow:"hidden"}}>
    {/* Logo area */}
    <div style={{padding:collapsed?"16px 12px":"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
      <img src="/enterank-icon.svg" alt="EnterRank" style={{width:28,height:28,flexShrink:0}}/>
      {!collapsed&&<div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
        <div style={{fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:4}}>
          {!isLocal&&<span onClick={onBack} style={{cursor:"pointer",color:C.accent,fontSize:11}}>←</span>}
          <span style={{fontWeight:500,color:C.text,fontSize:13}}>{brand||"EnterRank"}</span>
        </div>
      </div>}
    </div>

    {/* New Audit button */}
    <div style={{padding:collapsed?"10px 8px":"12px 16px"}}>
      <button onClick={()=>setStep("input")} style={{width:"100%",padding:collapsed?"8px":"9px 14px",background:step==="input"?`${C.accent}08`:"transparent",border:`1px solid ${step==="input"?C.accent+"30":C.border}`,borderRadius:8,fontSize:12,fontWeight:600,color:step==="input"?C.accent:C.sub,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"flex-start",gap:8,transition:"all .15s"}}>
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
          const isLocked=auditInProgress&&sectionMap[item.id]&&!sectionReady[sectionMap[item.id]];
          const dis=(!results&&!auditInProgress)||item.comingSoon||isLocked;
          return(<div key={item.id} onClick={()=>{if(!dis)setStep(item.id);}}
            style={{display:"flex",alignItems:"center",gap:10,padding:collapsed?"10px 12px":"8px 10px",borderRadius:collapsed?8:0,borderTopRightRadius:8,borderBottomRightRadius:8,cursor:dis?"default":"pointer",background:active?C.accent+"08":"transparent",borderLeft:collapsed?"none":active?"3px solid "+C.accent:"3px solid transparent",color:active?C.text:dis?"#d1d5db":C.sub,fontSize:13,fontWeight:active?500:400,marginBottom:2,transition:"all 0.15s ease",opacity:isLocked?0.35:item.comingSoon?.5:1,justifyContent:collapsed?"center":"flex-start",position:"relative",overflow:"hidden"}}
            onMouseEnter={e=>{setHoveredNav(item.id);if(!dis&&!active)e.currentTarget.style.background="#f8fafc";}}
            onMouseLeave={e=>{setHoveredNav(null);if(!active)e.currentTarget.style.background="transparent";}}>
            <SidebarIcon name={item.icon} size={18} color={active?C.accent:dis?"#d1d5db":"#6b7280"}/>
            {!collapsed&&<span>{item.label}</span>}
            {!collapsed&&item.comingSoon&&<span style={{fontSize:9,background:"#f1f1f1",color:"#999",padding:"2px 6px",borderRadius:4,marginLeft:6,fontWeight:500}}>Soon</span>}
            {isLocked&&hoveredNav===item.id&&!collapsed&&(
              <div style={{position:"absolute",left:"100%",top:"50%",transform:"translateY(-50%)",marginLeft:8,padding:"5px 10px",background:"#1f2937",color:"#fff",borderRadius:6,fontSize:11,fontWeight:500,whiteSpace:"nowrap",zIndex:100,pointerEvents:"none"}}>
                Still loading...
              </div>
            )}
            {isLocked&&item.id!=="dashboard"&&(
              <div style={{position:"absolute",bottom:0,left:12,right:12,height:2,borderRadius:1,background:C.borderSoft,overflow:"hidden"}}>
                <div style={{width:"40%",height:"100%",borderRadius:1,background:C.accent,animation:"loadingSlide 2s ease-in-out infinite"}}/>
              </div>
            )}
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
function ShareOfVoiceSection({title,rankTitle,brands,metricKey,tooltip}){
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

  return(<div style={{...CARD.base,overflow:"visible"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      {/* Left: donut */}
      <div style={{padding:"24px 28px",borderRight:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:4}}>{title}{tooltip&&<InfoTip text={tooltip}/>}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",marginBottom:16}}>{ownBrand?.pct||0}%<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
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
        <div style={{fontSize:28,fontWeight:700,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",marginBottom:16}}>#{brandRank}<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
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
            <span style={{fontSize:14,fontWeight:600,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{a.pct}%</span>
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

/* ─── AUDIT LOADING INLINE (progressive) ─── */
function AuditLoadingInline({ progress, stage, error, onClearError }) {
  const [activeStep, setActiveStep] = useState(0);
  const [smoothP, setSmoothP] = useState(0);

  React.useEffect(() => {
    const target = progress || 0;
    const interval = setInterval(() => {
      setSmoothP(prev => {
        if (prev >= target) return target;
        const gap = target - prev;
        return prev + Math.max(0.3, gap * 0.08);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [progress]);

  const steps = [
    { label: "Crawling websites", threshold: 2 },
    { label: "Testing AI engines", threshold: 10 },
    { label: "Classifying responses", threshold: 61 },
    { label: "Analyzing competitors & sentiment", threshold: 69 },
    { label: "Building channels & content", threshold: 82 },
    { label: "Generating insights", threshold: 95 }
  ];

  React.useEffect(() => {
    const p = progress || 0;
    const idx = steps.reduce((acc, s, i) => p >= s.threshold ? i : acc, 0);
    setActiveStep(idx);
  }, [progress]);

  const p = Math.min(smoothP, 99);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"55vh", gap:28, maxWidth:480, margin:"0 auto", padding:"40px 20px" }}>

      {/* Spinning circle with percentage */}
      <div style={{ position:"relative", width:100, height:100 }}>
        <svg width="100" height="100" style={{ animation:"spin 2s linear infinite" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke={C.bg} strokeWidth="5"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke={C.accent} strokeWidth="5"
            strokeDasharray="80 184"
            strokeLinecap="round"/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:24, fontWeight:500, color:C.text, fontFamily:"'Satoshi',-apple-system,sans-serif", letterSpacing:"-.02em" }}>{Math.round(p)}%</span>
        </div>
      </div>

      {/* Status text */}
      {error ? (
        <div style={{ textAlign:"center", maxWidth:480 }}>
          <div style={{ padding:"16px 20px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, marginBottom:16 }}>
            <div style={{ fontSize:14, fontWeight:500, color:"#dc2626", marginBottom:6 }}>Audit Failed</div>
            <div style={{ fontSize:12, color:"#991b1b", lineHeight:1.6 }}>{error}</div>
          </div>
          <button onClick={onClearError} style={{ padding:"8px 16px", fontSize:12, fontWeight:500, background:"#dc2626", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontFamily:"'Satoshi',-apple-system,sans-serif" }}>Back to Configuration</button>
        </div>
      ) : (
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:16, fontWeight:500, color:C.text, fontFamily:"'Satoshi',-apple-system,sans-serif", letterSpacing:"-.02em", marginBottom:6 }}>
            Analyzing your brand
          </div>
          <div style={{ fontSize:12, color:C.muted }}>
            {stage || "Warming up the engines..."}
          </div>
        </div>
      )}

      {/* Step indicators */}
      <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:0 }}>
        {steps.map((s, i) => {
          const isDone = p >= (steps[i + 1]?.threshold || 100);
          const isActive = i === activeStep && !isDone;
          return (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:12, padding:"10px 16px",
              borderRadius:10,
              background: isActive ? C.accent + "06" : "transparent",
              transition:"all 0.4s ease"
            }}>
              <div style={{
                width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                background: isDone ? C.accent + "12" : isActive ? C.accent + "08" : C.bg,
                fontSize:13, transition:"all 0.3s ease"
              }}>
                {isDone ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <span style={{fontSize:12,fontWeight:500,color:isActive?C.accent:C.muted}}>{i+1}</span>}
              </div>
              <span style={{
                fontSize:13, fontWeight: isActive ? 500 : 400,
                color: isDone ? C.accent : isActive ? C.text : C.muted,
                transition:"all 0.3s ease"
              }}>
                {s.label}
              </span>
              {isActive && (
                <div style={{ marginLeft:"auto", width:16, height:16, border:"2px solid " + C.accent + "40", borderTopColor:C.accent, borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
              )}
              {isDone && (
                <span style={{ marginLeft:"auto", fontSize:11, color:C.accent, fontWeight:500 }}>Done</span>
              )}
            </div>
          );
        })}
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
  const fieldsLocked=!autoFilled&&!(data.industry&&data.industry.length>2)&&!(data.website&&data.website.length>5);
  const[generatingTopics,setGeneratingTopics]=useState(false);
  const[topicsAutoFilled,setTopicsAutoFilled]=useState(false);
  const[availableArchetypes,setAvailableArchetypes]=useState([]);
  const[selectedArchetypes,setSelectedArchetypes]=useState([]);
  const[generatingArchetypes,setGeneratingArchetypes]=useState(false);
  const[archLoadMsg,setArchLoadMsg]=useState("Analysing brand context...");
  const[editingArch,setEditingArch]=useState(null);
  const[editArchData,setEditArchData]=useState({name:"",description:"",demographics:""});
  const[addingArch,setAddingArch]=useState(false);
  const[newArchData,setNewArchData]=useState({name:"",description:"",demographics:""});
  const crawlCacheRef = React.useRef({ url: null, result: null });
  const getCachedCrawl = (url) => {
    if (!url || !crawlCacheRef.current.url || !crawlCacheRef.current.result) return null;
    const normalize = (u) => (u || "").replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/, "").toLowerCase();
    if (normalize(crawlCacheRef.current.url) === normalize(url)) return crawlCacheRef.current.result;
    return null;
  };

  React.useEffect(() => {
    const brand = (data.brand || "").trim();
    const region = (data.region || "").trim();
    if (brand.length >= 2 && region.length >= 2 && !autoFilled && !autoFilling) {
      const timer = setTimeout(() => {
        const currentBrand = (data.brand || "").trim();
        const currentRegion = (data.region || "").trim();
        if (currentBrand.length >= 2 && currentRegion.length >= 2 && !autoFilled && !autoFilling) {
          autoFillFromBrand(currentBrand);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [data.brand, data.region]);

  const generateTopicsFromIndustry=async(industry,region,competitorNames)=>{
    if(!industry||industry.trim().length<2)return;
    setGeneratingTopics(true);
    try{
      const compNamesStr=(competitorNames||[]).filter(n=>n&&n.trim().length>1).map(n=>n.trim()).join(", ");
      let crawlSummary="";try{const cached=getCachedCrawl(data.website||"");if(cached){crawlSummary=summariseCrawl(cached);}else if(data.website){const cr=await crawlWebsite(data.website);if(cr){crawlCacheRef.current={url:data.website,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}
      const prompt=`You are generating search topics for an AI visibility audit of ${data.brand||"Brand"} in ${region||"Global"}.

BRAND: ${data.brand||"Brand"}
INDUSTRY: ${industry}
WEBSITE: ${data.website||""}
COMPETITORS: ${compNamesStr||"None specified"}

${crawlSummary?"BRAND WEBSITE CONTENT (this tells you what the brand ACTUALLY sells):\n"+crawlSummary:""}

Generate exactly 15 search queries that a REAL CONSUMER would type into ChatGPT or Google when looking for products or services that ${data.brand||"Brand"} actually provides.

STRICT RULES:
1. Every query MUST be for a product or service that ${data.brand||"Brand"} actually sells or offers. Check the website content above.
2. For telecommunications brands: focus heavily on mobile data plans, postpaid plans, prepaid plans, 5G coverage, roaming packages, device bundles, number porting, network coverage, broadband/fibre ONLY if they offer it.
3. Do NOT generate queries about products the brand does not sell. Examples of what to EXCLUDE for a telco: satellite phones, satellite dishes, home security systems, wireless earbuds, noise cancelling headphones, smartphones (unless the brand sells devices), wireless routers (unless the brand sells them), cordless phones, walkie talkies, smart home devices.
4. Queries should be diverse across the brand's ACTUAL service categories. Mix comparison queries, best-of queries, how-to queries, and recommendation queries.
5. Include the region naturally where relevant (e.g. 'in ${region||"Global"}' or '${region||"Global"} ${new Date().getFullYear()}').
6. Each query should be 10-25 words, natural language, like a real person asking ChatGPT.
7. At least 10 out of 15 queries should be about the brand's PRIMARY product category.
8. Do NOT mention ${data.brand||"Brand"} by name in any query — these should be generic category queries where ${data.brand||"Brand"} SHOULD appear in the answer.
${compNamesStr?"9. Do NOT mention these competitor names: "+compNamesStr:""}
All queries must be in English.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5", "query 6", "query 7", "query 8", "query 9", "query 10", "query 11", "query 12", "query 13", "query 14", "query 15"]}`;
      const raw=await callOpenAI(prompt,"You generate search queries for an AI visibility audit. Queries must be about products the brand actually sells based on website content. Never include any brand or company names. Return ONLY valid JSON.");
      const result=safeJSON(raw);
      if(result&&result.topics&&Array.isArray(result.topics)){
        const validTopics=result.topics.filter(t=>typeof t==="string"&&t.trim().length>5).map(t=>t.trim()).slice(0,15);
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
    const userRegion=(data.region||"").trim();
    setAutoFilling(true);
    try{
      let crawlSummary="";
      const urlToCrawl=data.website&&data.website.trim().length>5?data.website:"";
      if(urlToCrawl){try{const cached=getCachedCrawl(urlToCrawl);if(cached){crawlSummary=summariseCrawl(cached);}else{const cr=await crawlWebsite(urlToCrawl);if(cr){crawlCacheRef.current={url:urlToCrawl,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}}
      const prompt=`I need information about the company or brand called "${brandName.trim()}".\n\nThe brand operates in "${userRegion||"Global"}". Use this region to determine localised competitors.\n\n${crawlSummary?"BRAND WEBSITE CONTENT (read this to understand what the brand primarily sells):\n"+crawlSummary+"\n\n":""}Return JSON only:\n{\n  "website": "https://example.com",\n  "industry": "the primary industry (1-3 words, e.g. Telecommunications, SaaS, E-commerce)",\n  "competitors": [\n    {"name": "Competitor 1", "website": "https://competitor1.com"},\n    {"name": "Competitor 2", "website": "https://competitor2.com"},\n    {"name": "Competitor 3", "website": "https://competitor3.com"}\n  ]\n}\n\nRules:\n- Website must be the MAIN company website, not Wikipedia or social\n- List the top 3-4 direct competitors of ${brandName.trim()} specifically in the ${userRegion||"Global"} market. Competitors must actually operate and be available in ${userRegion||"that region"} — do not list globally known brands that have no presence in ${userRegion||"the brand's market"}\n- All output must be in English. Do not translate to local languages\n- If unsure about the brand, make your best guess based on the name\n- CRITICAL: Return the CONSUMER-FACING brand name, NOT the parent/holding company name. If the competitor website is yes.my, the brand is YES or YES 5G, NOT YTL Communications. If the website is unifi.com.my, the brand is Unifi, NOT Telekom Malaysia Berhad. Use the brand name as it appears on the website itself (logo, header, title tag). The domain name is a strong hint: yes.my = YES, celcomdigi.com = CelcomDigi. NEVER return a holding company, parent company, or corporate entity name. Return the name a regular consumer would search for.\n\nCRITICAL COMPETITOR MATCHING RULES:\n- Competitors must be in the SAME primary business category as the brand\n- Match the brand's CORE product: if the brand is primarily a MOBILE telecommunications provider, competitors must also be MOBILE telecommunications providers\n- Do NOT suggest broadband-only or fibre-only providers as competitors to a mobile telco\n- Do NOT suggest companies from adjacent but different categories (e.g. an ISP is NOT a competitor to a mobile carrier unless that ISP also offers mobile services)\n- Check: does this competitor offer the same PRIMARY product as the brand? If the brand sells mobile plans and the competitor only sells home internet, they are NOT competitors\n- For Malaysian telcos specifically: Maxis, U Mobile, YES 5G, and Digi are mobile competitors. Unifi is a broadband/fibre provider and is NOT a primary competitor to a mobile telco unless the audit brand also primarily sells broadband\n\nEXAMPLES:\n- CelcomDigi (mobile telco) competitors: Maxis, U Mobile, YES 5G — NOT Unifi, NOT TIME dotCom\n- Unifi (broadband ISP) competitors: TIME dotCom, Maxis Fibre, CelcomDigi Fibre — NOT U Mobile\n- The brand's WEBSITE CONTENT tells you what their primary business is. Read it carefully before suggesting competitors.`;
      const raw=await callGemini(prompt,"You are a business intelligence assistant. Return ONLY valid JSON, no markdown fences.");
      const result=safeJSON(raw);
      if(result){
        let didFill=false;
        let filledIndustry="";let filledCompNames=[];
        setData(prev=>{
          const updates={};
          if(!prev.website||!prev.website.trim())updates.website=normalizeUrl(result.website||"");
          if(!prev.industry||!prev.industry.trim())updates.industry=result.industry||"";
          const hasComps=(prev.competitors||[]).some(c=>c.name&&c.name.trim());
          if(!hasComps&&result.competitors&&Array.isArray(result.competitors)){
            const corporateWords=/\b(communications|berhad|corporation|holdings|group|inc|ltd|limited|telecom|telekom|enterprises|company|co\b|corp)\b/i;
            let compsCleaned=result.competitors.filter(c=>c.name&&c.name.toLowerCase()!==brandName.trim().toLowerCase()).slice(0,3).map(c=>({name:c.name||"",website:normalizeUrl(c.website||"")}));
            compsCleaned=compsCleaned.map(comp=>{const url=comp.website||"";const name=comp.name||"";try{const domain=new URL(url).hostname.replace("www.","").split(".")[0];if(corporateWords.test(name)&&domain.length<=15){comp.name=domain.charAt(0).toUpperCase()+domain.slice(1);}}catch(e){}return comp;});
            updates.competitors=compsCleaned;
          }
          if(Object.keys(updates).length>0){didFill=true;filledIndustry=updates.industry||prev.industry||"";filledCompNames=(updates.competitors||prev.competitors||[]).map(c=>c.name).filter(Boolean);return{...prev,...updates};}
          return prev;
        });
        if(didFill){
          setAutoFilled(true);
          const topicIndustry=filledIndustry||result.industry||"";
          const topicRegion=userRegion||"Global";
          const topicCompNames=(result.competitors||[]).map(c=>c.name).filter(Boolean);
          if(topicIndustry)setTimeout(()=>generateTopicsFromIndustry(topicIndustry,topicRegion,topicCompNames),100);
        }
      }
    }catch(e){console.error("Auto-fill failed:",e);}
    setAutoFilling(false);
  };

  // Generate topics via gpt-4o — crawl website first for context
  const generateTopics=async()=>{
    setGenTopics(true);setError(null);
    const nw=normalizeUrl(data.website);const nc=(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}));
    if(nw!==data.website||JSON.stringify(nc)!==JSON.stringify(data.competitors))setData(d=>({...d,website:nw,competitors:nc}));
    try{
      const compNamesStr=nc.filter(c=>c.name&&c.name.trim().length>1).map(c=>c.name.trim()).join(", ");
      let crawlSummary="";try{const cached=getCachedCrawl(nw);if(cached){crawlSummary=summariseCrawl(cached);}else if(nw){const cr=await crawlWebsite(nw);if(cr){crawlCacheRef.current={url:nw,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}
      const prompt=`You are generating search topics for an AI visibility audit of ${data.brand||"Brand"} in ${data.region||"Global"}.

BRAND: ${data.brand||"Brand"}
INDUSTRY: ${data.industry||"Technology"}
WEBSITE: ${data.website||""}
COMPETITORS: ${compNamesStr||"None specified"}

${crawlSummary?"BRAND WEBSITE CONTENT (this tells you what the brand ACTUALLY sells):\n"+crawlSummary:""}

Generate exactly 15 search queries that a REAL CONSUMER would type into ChatGPT or Google when looking for products or services that ${data.brand||"Brand"} actually provides.

STRICT RULES:
1. Every query MUST be for a product or service that ${data.brand||"Brand"} actually sells or offers. Check the website content above.
2. For telecommunications brands: focus heavily on mobile data plans, postpaid plans, prepaid plans, 5G coverage, roaming packages, device bundles, number porting, network coverage, broadband/fibre ONLY if they offer it.
3. Do NOT generate queries about products the brand does not sell. Examples of what to EXCLUDE for a telco: satellite phones, satellite dishes, home security systems, wireless earbuds, noise cancelling headphones, smartphones (unless the brand sells devices), wireless routers (unless the brand sells them), cordless phones, walkie talkies, smart home devices.
4. Queries should be diverse across the brand's ACTUAL service categories. Mix comparison queries, best-of queries, how-to queries, and recommendation queries.
5. Include the region naturally where relevant (e.g. 'in ${data.region||"Global"}' or '${data.region||"Global"} ${new Date().getFullYear()}').
6. When including a year in any query, ALWAYS use ${new Date().getFullYear()}. NEVER use 2023, 2024, or any past year.
7. Each query should be 10-25 words, natural language, like a real person asking ChatGPT.
8. At least 10 out of 15 queries should be about the brand's PRIMARY product category.
9. Do NOT mention ${data.brand||"Brand"} by name in any query — these should be generic category queries where ${data.brand||"Brand"} SHOULD appear in the answer.
${compNamesStr?"10. Do NOT mention these competitor names: "+compNamesStr:""}
All queries must be in English.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5", "query 6", "query 7", "query 8", "query 9", "query 10", "query 11", "query 12", "query 13", "query 14", "query 15"]}`;
      const raw=await callOpenAI(prompt,"You generate search queries for an AI visibility audit. Queries must be about products the brand actually sells based on website content. Never include any brand or company names. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      const topics=parsed&&parsed.topics?parsed.topics:Array.isArray(parsed)?parsed:null;
      if(topics&&Array.isArray(topics)&&topics.length>0){
        setData(d=>({...d,topics:topics.filter(t=>typeof t==="string"&&t.trim().length>5).map(t=>t.trim()).slice(0,15)}));
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
      let crawlSummary="";try{const cached=getCachedCrawl(data.website||"");if(cached){crawlSummary=summariseCrawl(cached);}else if(data.website){const cr=await crawlWebsite(data.website);if(cr){crawlCacheRef.current={url:data.website,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}
      const prompt=`You are generating additional search topics for an AI visibility audit of ${data.brand||"Brand"} in ${data.region||"Global"}.

BRAND: ${data.brand||"Brand"}
INDUSTRY: ${data.industry||"Technology"}
WEBSITE: ${data.website||""}
COMPETITORS: ${compNamesStr||"None specified"}

${crawlSummary?"BRAND WEBSITE CONTENT (this tells you what the brand ACTUALLY sells):\n"+crawlSummary:""}

I already have these queries (do NOT duplicate them): ${existing}

Generate exactly 5 NEW and DIFFERENT search queries that a REAL CONSUMER would type into ChatGPT or Google when looking for products or services that ${data.brand||"Brand"} actually provides.

STRICT RULES:
1. Every query MUST be for a product or service that ${data.brand||"Brand"} actually sells or offers. Check the website content above.
2. For telecommunications brands: focus heavily on mobile data plans, postpaid plans, prepaid plans, 5G coverage, roaming packages, device bundles, number porting, network coverage, broadband/fibre ONLY if they offer it.
3. Do NOT generate queries about products the brand does not sell. Examples of what to EXCLUDE for a telco: satellite phones, satellite dishes, home security systems, wireless earbuds, noise cancelling headphones, smartphones (unless the brand sells devices), wireless routers (unless the brand sells them), cordless phones, walkie talkies, smart home devices.
4. Queries should be diverse across the brand's ACTUAL service categories. Mix comparison queries, best-of queries, how-to queries, and recommendation queries.
5. Include the region naturally where relevant (e.g. 'in ${data.region||"Global"}' or '${data.region||"Global"} ${new Date().getFullYear()}').
6. When including a year in any query, ALWAYS use ${new Date().getFullYear()}. NEVER use 2023, 2024, or any past year.
7. Each query should be 10-25 words, natural language, like a real person asking ChatGPT.
8. Do NOT mention ${data.brand||"Brand"} by name in any query — these should be generic category queries where ${data.brand||"Brand"} SHOULD appear in the answer.
${compNamesStr?"9. Do NOT mention these competitor names: "+compNamesStr:""}
All queries must be in English.

Return JSON only:
{"topics": ["query 1", "query 2", "query 3", "query 4", "query 5"]}`;
      const raw=await callOpenAI(prompt,"You generate search queries for an AI visibility audit. Queries must be about products the brand actually sells based on website content. Never include any brand or company names. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      const newTopics=parsed&&parsed.topics?parsed.topics:Array.isArray(parsed)?parsed:null;
      if(newTopics&&Array.isArray(newTopics)&&newTopics.length>0){
        const cleaned=newTopics.filter(t=>typeof t==="string"&&t.trim().length>15).map(t=>t.trim()).slice(0,5);
        setData(d=>({...d,topics:[...d.topics,...cleaned].slice(0,15)}));
      }
    }catch(e){console.error("Regenerate error:",e);}
    setGenTopics(false);
  };

  const generateArchetypes=async()=>{
    setGeneratingArchetypes(true);
    setArchLoadMsg("Analysing brand context...");
    try{
      const compNamesStr=(data.competitors||[]).filter(c=>c.name&&c.name.trim().length>1).map(c=>c.name.trim()).join(", ");
      let crawlSummary="";
      setArchLoadMsg("Crawling website for brand signals...");
      try{const cached=getCachedCrawl(data.website||"");if(cached){crawlSummary=summariseCrawl(cached);}else{const cr=await crawlWebsite(data.website||"");if(cr){crawlCacheRef.current={url:data.website,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}
      setArchLoadMsg("Generating audience archetypes...");
      const prompt=`For "${data.brand}" in "${data.industry}" (${data.region||"Global"}).
Website: ${data.website||"unknown"}
Competitors: ${compNamesStr||"none"}
${crawlSummary?"Website content:\n"+crawlSummary.slice(0,400):""}

Generate 6 distinct audience archetypes — real customer segments who would search for ${data.industry} products/services on AI engines (ChatGPT, Gemini) in ${data.region||"their region"}.

Requirements:
- Generate EXACTLY 3 everyday consumer archetypes AND 3 specialist/stakeholder archetypes
- EVERYDAY CONSUMERS (first 3): Regular people who search AI engines for ${data.industry} products/services in daily life. Think: families, students, budget-conscious shoppers, rewards/loyalty chasers, first-time buyers, commuters. These represent the HIGHEST VOLUME of AI queries.
- SPECIALIST STAKEHOLDERS (last 3): Professional or niche segments with specific ${data.industry} needs. Think: procurement managers, investors, industry analysts, business owners, researchers.
- Each archetype must be SPECIFIC to ${data.industry} in ${data.region}, not generic personas
- Demographics should include age range and 1-2 defining characteristics
- Everyday consumers should reflect how REAL PEOPLE casually search AI engines — "best X near me", "X vs Y which is better", "cheapest X in ${data.region}"

Return JSON only:
[{"name":"<specific archetype name>","description":"<1-2 sentences about their AI search behavior>","demographics":"<age range, key characteristic>"}]`;
      const raw=await callOpenAI(prompt,"You are a market research expert specializing in AI search behavior. Return ONLY valid JSON arrays, no markdown fences.");
      const parsed=safeJSON(raw);
      if(parsed&&Array.isArray(parsed)&&parsed.length>0){
        const cleaned=parsed.filter(a=>a.name&&a.description).slice(0,7).map((a,i)=>({id:"arch-"+Date.now()+"-"+i,name:a.name.trim(),description:a.description.trim(),demographics:(a.demographics||"").trim()}));
        setArchLoadMsg("Archetypes ready");
        setAvailableArchetypes(cleaned);
      }else{setAvailableArchetypes([]);}
    }catch(e){console.error("Archetype generation failed:",e);}
    setGeneratingArchetypes(false);
  };

  const generateMoreArchetypes=async()=>{
    setGeneratingArchetypes(true);
    try{
      const existing2=availableArchetypes.map(a=>a.name).join(", ");
      const prompt=`For "${data.brand}" in "${data.industry}" (${data.region||"Global"}).
I already have these archetypes: ${existing2}

Generate 3 MORE DIFFERENT audience archetypes for people who search for ${data.industry} on AI engines in ${data.region}. Do NOT duplicate existing ones.

Return JSON only:
[{"name":"...","description":"...","demographics":"..."}]`;
      const raw=await callOpenAI(prompt,"You are a market research expert. Return ONLY valid JSON arrays.");
      const parsed=safeJSON(raw);
      if(parsed&&Array.isArray(parsed)){
        const cleaned=parsed.filter(a=>a.name&&a.description).slice(0,3).map((a,i)=>({id:"arch-"+Date.now()+"-"+i,name:a.name.trim(),description:a.description.trim(),demographics:(a.demographics||"").trim()}));
        setAvailableArchetypes(prev=>[...prev,...cleaned]);
      }
    }catch(e){}
    setGeneratingArchetypes(false);
  };

  const generateTopicsFromArchetypes=async(archs)=>{
    setGenTopics(true);setError(null);
    try{
      const compNamesStr=(data.competitors||[]).filter(c=>c.name&&c.name.trim().length>1).map(c=>c.name.trim()).join(", ");
      let crawlSummary="";try{const cached=getCachedCrawl(data.website||"");if(cached){crawlSummary=summariseCrawl(cached);}else{const cr=await crawlWebsite(data.website||"");if(cr){crawlCacheRef.current={url:data.website,result:cr};crawlSummary=summariseCrawl(cr);}}}catch(e){}
      const archContext=archs.map((a,i)=>`${i+1}. ${a.name} (${a.demographics||"general"}): ${a.description}`).join("\n");
      const prompt=`You are generating search topics for an AI visibility audit of "${data.brand}" in "${data.industry}" (${data.region||"Global"}).

BRAND: ${data.brand}
INDUSTRY: ${data.industry}
WEBSITE: ${data.website||"unknown"}
COMPETITORS: ${compNamesStr||"None specified"}

${crawlSummary?"BRAND WEBSITE CONTENT:\n"+crawlSummary.slice(0,600)+"\n":""}
TARGET AUDIENCE ARCHETYPES (ranked by priority):
${archContext}

Generate exactly 15 search topics that these archetypes would actually search for on AI engines (ChatGPT, Gemini).

CRITICAL RULES:
1. Topics must be weighted by archetype priority — archetype #1 should influence ~6 topics, #2 ~5 topics, #3 ~4 topics
2. Each topic should reflect what that archetype ACTUALLY searches for
3. Topics must be about products/services ${data.brand} actually offers (check website content)
4. Do NOT mention ${data.brand} by name — these are generic queries where ${data.brand} SHOULD appear
5. Mix of comparison, recommendation, how-to, and transactional queries
6. Include the region naturally where relevant
7. Each topic should be 10-25 words, natural language
${compNamesStr?"8. Do NOT mention competitor names: "+compNamesStr:""}

You MUST return exactly 15 topics. Count them. If you have fewer than 15, add more until you reach exactly 15.

Return JSON only:
{"topics": ["topic 1", "topic 2", ..., "topic 15"]}`;
      const raw=await callOpenAI(prompt,"You generate search queries for an AI visibility audit. Return ONLY valid JSON.");
      const parsed=safeJSON(raw);
      const topics=parsed&&parsed.topics?parsed.topics:Array.isArray(parsed)?parsed:null;
      if(topics&&Array.isArray(topics)&&topics.length>0){
        setData(d=>({...d,topics:topics.filter(t=>typeof t==="string"&&t.trim().length>5).map(t=>t.trim()).slice(0,15)}));
      }else{setError("Failed to generate topics. Please try again.");}
    }catch(e){console.error("Topic generation from archetypes failed:",e);setError("Failed to generate topics. Check your API connection.");}
    setGenTopics(false);
  };


  const startEdit=(i)=>{setEditingTopic(i);setEditVal(data.topics[i]);};
  const saveEdit=(i)=>{
    if(editVal.trim()){const t=[...data.topics];t[i]=editVal.trim();setData({...data,topics:t});}
    setEditingTopic(null);setEditVal("");
  };
  const deleteTopic=(i)=>{setData({...data,topics:data.topics.filter((_,j)=>j!==i)});};
  const addTopic=()=>{if(newTopic.trim()&&data.topics.length<15){setData({...data,topics:[...data.topics,newTopic.trim()]});setNewTopic("");}};

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
    const normalizedData={...data,website:normalizeUrl(data.website),competitors:(data.competitors||[]).map(c=>({...c,website:normalizeUrl(c.website||"")}))};
    setData(normalizedData);
    onRun(normalizedData);
  };

  // Cleanup on unmount
  React.useEffect(()=>()=>{stopSmooth();},[]);

  const progress=displayProgress;
  if(running)return(<AuditLoadingScreen progress={progress} C={C}/>);

  /* ─── STEP 2: Topics Review ─── */
  /* ─── STEP 2: Archetype Selection ─── */
  if(auditStep==="archetypes")return(
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{marginBottom:24,textAlign:"center"}}>
        <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Target Audience</h2>
        <p style={{color:C.sub,fontSize:13,marginTop:4}}>Select up to 3 archetypes to focus your audit. Click to add, drag to reorder.</p>
      </div>

      {generatingArchetypes&&availableArchetypes.length===0?(
        <div style={{textAlign:"center",padding:60}}>
          <div style={{width:24,height:24,border:"2.5px solid "+C.borderSoft,borderTopColor:C.accent,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 12px"}}/>
          <div style={{fontSize:13,color:C.sub,marginBottom:4}}>Generating audience archetypes for {data.brand}...</div>
          <div style={{fontSize:11,color:C.muted}}>{archLoadMsg}</div>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"stretch"}}>
          {/* LEFT PANEL: Available Archetypes */}
          <div>
            <div style={{fontSize:12,fontWeight:500,color:C.muted,letterSpacing:".01em",marginBottom:10}}>Available Archetypes</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,minHeight:300}}>
              {availableArchetypes.map((arch)=>{
                const isSelected=!!selectedArchetypes.find(s=>s.id===arch.id);
                const isFull=selectedArchetypes.length>=3;
                return(
                <div key={arch.id} onClick={()=>{if(isSelected||isFull||editingArch===arch.id)return;setSelectedArchetypes(prev=>[...prev,arch]);}} style={{padding:"14px 16px",background:isSelected?C.accent+"06":"#fff",border:"1px solid "+(isSelected?C.accent+"30":C.border),borderRadius:10,cursor:isSelected?"default":isFull?"not-allowed":"pointer",transition:"all .25s ease",opacity:isSelected?0.4:isFull?0.5:1,position:"relative"}}>
                  {isSelected&&<div style={{position:"absolute",top:10,right:10,fontSize:9,fontWeight:500,color:C.accent,background:C.accent+"10",padding:"2px 8px",borderRadius:4}}>Added</div>}
                  {editingArch===arch.id?(
                    <div style={{display:"flex",flexDirection:"column",gap:6}} onClick={e=>e.stopPropagation()}>
                      <input value={editArchData.name} onChange={e=>setEditArchData({...editArchData,name:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,color:C.text,outline:"none"}} placeholder="Archetype name"/>
                      <input value={editArchData.description} onChange={e=>setEditArchData({...editArchData,description:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:11,color:C.sub,outline:"none"}} placeholder="Description"/>
                      <input value={editArchData.demographics} onChange={e=>setEditArchData({...editArchData,demographics:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:11,color:C.sub,outline:"none"}} placeholder="Demographics"/>
                      <div style={{display:"flex",gap:6}}>
                        <button onClick={()=>{setAvailableArchetypes(prev=>prev.map(a=>a.id===arch.id?{...a,...editArchData}:a));setEditingArch(null);}} style={{padding:"4px 12px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,cursor:"pointer"}}>Save</button>
                        <button onClick={()=>setEditingArch(null)} style={{padding:"4px 12px",background:"none",color:C.muted,border:"1px solid "+C.border,borderRadius:6,fontSize:11,cursor:"pointer"}}>Cancel</button>
                      </div>
                    </div>
                  ):(
                    <>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>{arch.name}</div>
                        {!isSelected&&(
                          <div style={{display:"flex",gap:4}}>
                            <span onClick={(e)=>{e.stopPropagation();setEditingArch(arch.id);setEditArchData({name:arch.name,description:arch.description,demographics:arch.demographics});}} style={{fontSize:10,color:C.muted,cursor:"pointer",padding:"2px 4px"}}>Edit</span>
                            <span onClick={(e)=>{e.stopPropagation();setAvailableArchetypes(prev=>prev.filter(a=>a.id!==arch.id));}} style={{fontSize:10,color:C.red,cursor:"pointer",padding:"2px 4px"}}>Remove</span>
                          </div>
                        )}
                      </div>
                      <div style={{fontSize:11,color:C.sub,lineHeight:1.5,marginBottom:4}}>{arch.description}</div>
                      {arch.demographics&&<div style={{fontSize:10,color:C.muted}}>{arch.demographics}</div>}
                    </>
                  )}
                </div>
                );
              })}
              {addingArch?(
                <div style={{padding:"14px 16px",background:"#fff",border:"1px dashed "+C.accent+"40",borderRadius:10}}>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <input value={newArchData.name} onChange={e=>setNewArchData({...newArchData,name:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,color:C.text,outline:"none"}} placeholder="Archetype name"/>
                    <input value={newArchData.description} onChange={e=>setNewArchData({...newArchData,description:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:11,color:C.sub,outline:"none"}} placeholder="Description"/>
                    <input value={newArchData.demographics} onChange={e=>setNewArchData({...newArchData,demographics:e.target.value})} style={{padding:"6px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:11,color:C.sub,outline:"none"}} placeholder="Demographics (e.g. 25-34, tech-savvy)"/>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>{if(newArchData.name.trim()){setAvailableArchetypes(prev=>[...prev,{id:"arch-custom-"+Date.now(),...newArchData}]);setNewArchData({name:"",description:"",demographics:""});setAddingArch(false);}}} style={{padding:"4px 12px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,cursor:"pointer"}}>Add</button>
                      <button onClick={()=>{setAddingArch(false);setNewArchData({name:"",description:"",demographics:""});}} style={{padding:"4px 12px",background:"none",color:C.muted,border:"1px solid "+C.border,borderRadius:6,fontSize:11,cursor:"pointer"}}>Cancel</button>
                    </div>
                  </div>
                </div>
              ):(
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setAddingArch(true)} style={{flex:1,padding:"10px",background:"none",border:"1px dashed "+C.border,borderRadius:8,fontSize:11,color:C.accent,cursor:"pointer",fontWeight:500}}>+ Add Custom</button>
                  <button onClick={generateMoreArchetypes} disabled={generatingArchetypes} style={{flex:1,padding:"10px",background:"none",border:"1px dashed "+C.border,borderRadius:8,fontSize:11,color:generatingArchetypes?C.muted:C.accent,cursor:generatingArchetypes?"not-allowed":"pointer",fontWeight:500}}>{generatingArchetypes?"Generating...":"+ Generate More"}</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Selected Archetypes (max 3) */}
          <div>
            <div style={{fontSize:12,fontWeight:500,color:C.muted,letterSpacing:".01em",marginBottom:10}}>Focus Archetypes <span style={{color:C.sub,textTransform:"none",letterSpacing:0}}>({selectedArchetypes.length}/3)</span></div>
            <div
              style={{minHeight:300,flex:1,overflowY:"auto",maxHeight:500,border:"1px solid "+(selectedArchetypes.length===0?C.border:C.accent+"20"),borderRadius:12,padding:12,display:"flex",flexDirection:"column",gap:8,transition:"all .2s",background:selectedArchetypes.length===0?C.bg+"40":"transparent"}}
            >
              {selectedArchetypes.length===0&&(
                <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
                  <div style={{textAlign:"center",color:C.muted}}>
                    <div style={{fontSize:13,marginBottom:4}}>Click archetypes to add</div>
                    <div style={{fontSize:11}}>Select up to 3 to focus your audit</div>
                  </div>
                </div>
              )}
              {selectedArchetypes.map((arch,i)=>(
                <div key={arch.id} draggable onDragStart={(e)=>{e.dataTransfer.setData("reorderId",String(i));e.dataTransfer.effectAllowed="move";setTimeout(()=>{e.target.style.opacity="0.4";},0);}} onDragEnd={(e)=>{e.target.style.opacity="1";}} onDragOver={(e)=>{e.preventDefault();e.currentTarget.style.borderColor=C.accent;}} onDragLeave={(e)=>{e.currentTarget.style.borderColor=C.accent+"20";}} onDrop={(e)=>{e.preventDefault();e.stopPropagation();e.currentTarget.style.borderColor=C.accent+"20";const fromStr=e.dataTransfer.getData("reorderId");if(fromStr==="")return;const from=parseInt(fromStr);if(isNaN(from)||from===i)return;const newOrder=[...selectedArchetypes];const[moved]=newOrder.splice(from,1);newOrder.splice(i,0,moved);setSelectedArchetypes(newOrder);}} style={{padding:"12px 14px",background:C.accent+"04",border:"1px solid "+C.accent+"20",borderRadius:10,cursor:"grab",display:"flex",alignItems:"center",gap:10,animation:"fadeInUp 0.25s ease-out",transition:"border-color .15s ease"}}>
                  <div style={{width:24,height:24,borderRadius:8,background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500,color:C.text}}>{arch.name}</div>
                    <div style={{fontSize:10,color:C.muted}}>{arch.demographics}</div>
                  </div>
                  <span onClick={(e)=>{e.stopPropagation();setSelectedArchetypes(prev=>prev.filter(a=>a.id!==arch.id));}} style={{fontSize:14,color:C.muted,cursor:"pointer",padding:"4px",flexShrink:0}}>x</span>
                </div>
              ))}
              {selectedArchetypes.length>0&&selectedArchetypes.length<3&&(
                <div style={{fontSize:10,color:C.muted,textAlign:"center",padding:4}}>Click {3-selectedArchetypes.length} more to add</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div style={{paddingTop:20,borderTop:"1px solid "+C.borderSoft,marginTop:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setAuditStep("input")} style={{padding:"8px 16px",background:"none",border:"1px solid "+C.border,borderRadius:8,fontSize:12,color:C.sub,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Back to Details</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,color:C.muted}}>{selectedArchetypes.length} of 3 selected</span>
          <button
            onClick={()=>{setData(d=>({...d,archetypes:selectedArchetypes,topics:[]}));setAuditStep("topics");setGenTopics(true);generateTopicsFromArchetypes(selectedArchetypes);}}
            disabled={selectedArchetypes.length===0}
            style={{padding:"10px 24px",background:selectedArchetypes.length>0?C.accent:"#dde1e7",color:selectedArchetypes.length>0?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:selectedArchetypes.length>0?"pointer":"not-allowed",fontFamily:"'Satoshi',-apple-system,sans-serif"}}
          >
            Generate Topics
          </button>
        </div>
      </div>
    </div>
  );

  if(auditStep==="topics")return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}>
      <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Review Topics for {data.brand}</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:4}}>These topics will be used to measure AI engine visibility. Edit, remove, or add more.</p>
    </div>
    <Card>
      {/* Topic guidance */}
      <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"10px 14px",background:"#fffbeb",border:"1px solid #fef3c7",borderRadius:10,marginBottom:12,fontSize:11,lineHeight:1.6,color:"#92400e"}}>
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
          <span style={{fontSize:13,color:C.accent,fontWeight:600,fontFamily:"'Satoshi',-apple-system,sans-serif",minWidth:22}}>{i+1}.</span>
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
        <span style={{fontSize:11,fontWeight:500,color:data.topics.length>=15?C.red:C.muted,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{data.topics.length} / 15 topics</span>
      </div>

      {/* Add new topic */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input value={newTopic} onChange={e=>setNewTopic(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addTopic();}} placeholder={data.topics.length>=15?"Maximum 15 topics reached":"Add a custom topic..."} disabled={data.topics.length>=10} style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none",fontFamily:"inherit",opacity:data.topics.length>=15?.5:1}}/>
        <button onClick={addTopic} disabled={!newTopic.trim()||data.topics.length>=10} style={{padding:"8px 16px",background:newTopic.trim()&&data.topics.length<15?C.accent:"#dde1e7",color:newTopic.trim()&&data.topics.length<15?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:newTopic.trim()&&data.topics.length<15?"pointer":"not-allowed",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Add</button>
      </div>

      {/* Generate more button */}
      <button onClick={regenerateTopics} disabled={genTopics||generatingTopics||data.topics.length>=10} style={{width:"100%",padding:"10px 16px",background:"none",border:`1px dashed ${C.accent}40`,borderRadius:8,fontSize:12,fontWeight:600,color:data.topics.length>=15?C.muted:C.accent,cursor:genTopics||generatingTopics||data.topics.length>=15?"not-allowed":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",marginBottom:8,opacity:genTopics||generatingTopics||data.topics.length>=15?.5:1}}>
        {genTopics?"Generating more topics...":"+ Generate More Topics"}
      </button>


      <div style={{paddingTop:16,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setAuditStep("archetypes")} style={{padding:"8px 16px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.sub,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>← Back to Audience</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,color:C.muted}}>{data.topics.length} topics</span>
          <button onClick={go} disabled={!topicsOk} style={{padding:"10px 24px",background:topicsOk?C.accent:"#dde1e7",color:topicsOk?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:topicsOk?"pointer":"not-allowed",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Run Audit →</button>
        </div>
      </div>
    </Card>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
  </div>);

  /* ─── STEP 1: Client Details Input ─── */
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>{data.brand?"Configure Audit":"New Audit"}</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>{data.brand?`${history.length>0?"Run another":"Set up"} audit for ${data.brand}.`:"Enter client details to begin."}</p></div>
    {autoFilled&&(
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:10,marginBottom:16,fontSize:12,color:C.accent}}>
        <span style={{fontSize:14}}>✦</span>
        <span>Fields auto-filled based on brand detection. Review and edit before running the audit.</span>
        <span onClick={()=>setAutoFilled(false)} style={{marginLeft:"auto",cursor:"pointer",opacity:.6,fontSize:14}}>✕</span>
      </div>
    )}
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <Field label="Brand Name *" value={data.brand} onChange={v=>{setData({...data,brand:v});if(autoFilled)setAutoFilled(false);if(topicsAutoFilled){setTopicsAutoFilled(false);setData(d=>({...d,topics:[]}));}}} placeholder="Acme Corp"/>
      <Field label="Region *" value={data.region} onChange={v=>setData({...data,region:v})} placeholder="e.g. Malaysia"/>
      <div style={{opacity:fieldsLocked?0.4:1,pointerEvents:fieldsLocked?"none":"auto",transition:"opacity .3s ease"}}>
        <Field label="Industry" value={data.industry} onChange={v=>setData({...data,industry:v})} placeholder="e.g. Technology"/>
      </div>
      <div style={{opacity:fieldsLocked?0.4:1,pointerEvents:fieldsLocked?"none":"auto",transition:"opacity .3s ease"}}>
        <Field label="Website" value={data.website} onChange={v=>setData({...data,website:v})} placeholder="acme.com"/>
      </div>
    </div>
    {autoFilling&&(
      <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.accent,marginTop:12}}>
        <div style={{width:12,height:12,border:"2px solid "+C.accent,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
        Scanning brand details...
      </div>
    )}
    {generatingTopics&&!autoFilling&&(
      <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.accent,marginTop:12}}>
        <div style={{width:12,height:12,border:"2px solid "+C.accent,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
        Generating search topics...
      </div>
    )}
      <div style={{marginTop:16,opacity:fieldsLocked?0.4:1,pointerEvents:fieldsLocked?"none":"auto",transition:"opacity .3s ease"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:6}}>
          <label style={{fontSize:12,fontWeight:500,color:C.sub}}>Competitor Name</label>
          <label style={{fontSize:12,fontWeight:500,color:C.sub}}>Website</label>
        </div>
        {(data.competitors||[]).map((comp,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:8}}>
          <input value={comp.name} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],name:e.target.value};setData({...data,competitors:c});}} placeholder={`Competitor ${i+1}`} style={{padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,fontSize:14,color:C.text,outline:"none",fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <input value={comp.website} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],website:e.target.value};setData({...data,competitors:c});}} placeholder="competitor.com" style={{flex:1,padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,fontSize:14,color:C.text,outline:"none",fontFamily:"inherit"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
            <span onClick={()=>{const c=data.competitors.filter((_,j)=>j!==i);setData({...data,competitors:c});}} style={{cursor:"pointer",color:C.muted,fontSize:16,opacity:0.5,flexShrink:0,lineHeight:1}}>×</span>
          </div>
        </div>))}
        {(data.competitors||[]).length<8&&<button onClick={()=>setData({...data,competitors:[...(data.competitors||[]),{name:"",website:""}]})} style={{padding:"6px 14px",background:"none",border:`1px dashed ${C.border}`,borderRadius:C.rs,fontSize:12,color:C.muted,cursor:"pointer",fontFamily:"inherit"}}>+ Add competitor</button>}
      </div>
    <div style={{marginTop:20,paddingTop:18,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:12,alignItems:"center",opacity:fieldsLocked?0.4:1,transition:"opacity .3s ease"}}><span style={{fontSize:11,color:C.muted}}>Engines:</span><ChatGPTLogo size={18}/><GeminiLogo size={18}/><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 0L14 4V12L8 16L2 12V4L8 0Z" fill="#20808D"/><path d="M8 3L11.5 5.5V10.5L8 13L4.5 10.5V5.5L8 3Z" fill="white" opacity="0.9"/></svg><svg width="18" height="18" viewBox="0 0 16 16" fill="none" title="Google AI Overview"><path d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z" fill="#EA4335" opacity="0.85"/><text x="8" y="11" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">G</text></svg></div>
      <button onClick={()=>{setAuditStep("archetypes");if(availableArchetypes.length===0)generateArchetypes();}} disabled={!inputOk||genTopics} style={{padding:"10px 24px",background:inputOk&&!genTopics?C.accent:"#dde1e7",color:inputOk&&!genTopics?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:inputOk&&!genTopics?"pointer":"not-allowed",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{genTopics?"Generating...":"Select Audience →"}</button>
    </div>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </Card></div>);
}

/* ─── PAGE: DASHBOARD ─── */
function DashboardPage({r,history,goTo}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available. Please run an audit first.</div>;
  const[expandedComp,setExpandedComp]=useState(null);

  // ── Metric calculations ──
  const dWeights=r.engineWeights||getEngineWeights(r.clientData?.region);
  const avgMentions=Math.round(r.engines.reduce((sum,e)=>{const w=dWeights[e.id]||(1/r.engines.length);return sum+(e.mentionRate*w);},0));
  const avgCitations=Math.round(r.engines.reduce((sum,e)=>{const w=dWeights[e.id]||(1/r.engines.length);return sum+(e.citationRate*w);},0));
  const avgSentiment=r.sentiment?.brand?.posPercent??r.sentiment?.brand?.avg??50;
  const prev=history.length>1?history[history.length-2]:null;
  const prevSentiment=prev?.sentimentPerEngine?Math.round(((prev.sentimentPerEngine.gpt||50)+(prev.sentimentPerEngine.gemini||50)+(prev.sentimentPerEngine.perplexity||50))/3):null;

  // ── Data readiness flags (for progressive loading placeholders) ──
  const painPointsReady=r.painPoints&&r.painPoints.some(p=>p.score>0||(p.evidence&&p.evidence.length>0));
  const competitorsReady=r.competitors&&r.competitors.length>0&&r.competitors.some(c=>(c.mentionRate||0)>0||(c.citationRate||0)>0||(c.painPoints||[]).some(p=>p.score>0));
  const sentimentReady=(r.sentiment?.brand?.posPercent!=null||r.sentiment?.brand?.avg!=null);

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
  if(bestEngine.score-worstEngine.score>15)diags.push({severity:"warning",text:`${bestEngine.score-worstEngine.score}pt gap between ${bestEngine.name} (${bestEngine.score}%) and ${worstEngine.name} (${worstEngine.score}%).`,action:`Focus content optimisation on ${worstEngine.name} — review its strengths/weaknesses for specific gaps.`});
  if(avgCitations<10)diags.push({severity:"critical",text:`${avgCitations}% citation rate — AI engines discuss your space but rarely link to your site.`,action:"Implement FAQ schema, add product comparison tables, and create definitive guides that AI engines can cite directly."});
  else if(avgCitations<25)diags.push({severity:"warning",text:`${avgCitations}% citation rate — ${100-avgCitations}% of mentions don't link back to you.`,action:"Add structured data (FAQ, HowTo schema) and authoritative long-form content to increase citation likelihood."});
  if(avgMentions<15)diags.push({severity:"critical",text:`${avgMentions}% mention rate — your brand is largely invisible to AI engines.`,action:"Prioritise entity disambiguation: update Wikipedia, Crunchbase, and knowledge graph presence. Create category-defining content."});
  else if(avgMentions<35)diags.push({severity:"warning",text:`${avgMentions}% mention rate — mentioned in roughly 1 in ${Math.round(100/avgMentions)} queries.`,action:"Create content targeting the specific queries where you're absent. See Query Categories for gaps."});
  if(criticalCats.length>0)diags.push({severity:"critical",text:`${criticalCats.map(c=>c.label.split("/")[0].trim()).join(", ")} ${criticalCats.length>1?"are":"is"} critically weak (under 30%).`,action:`${criticalCats[0].label.split("/")[0].trim()}: ${criticalCats[0].evidence?.[0]||"Needs immediate attention"}.`});
  if(compsAhead.length>0)diags.push({severity:"warning",text:`${compsAhead.map(c=>c.name).join(", ")} ${compsAhead.length>1?"are":"is"} scoring above you on visibility.`,action:"Expand into competitor comparison content and target queries where competitors are Cited but you're Absent."});
  if(missingChannels.length>3)diags.push({severity:"warning",text:`Not found on ${missingChannels.length} distribution channels.`,action:"Establish presence on missing channels — see Target Channels for the full list and verification status."});
  if(strongestCat&&strongestCat.score>60)diags.push({severity:"good",text:`${strongestCat.label.split("/")[0].trim()} is your strongest signal at ${strongestCat.score}%.`,action:"Maintain and build on this advantage — it's a competitive differentiator."});
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

  const[displayScore,setDisplayScore]=useState(0);
  const targetScore=r.overall||0;
  React.useEffect(()=>{if(targetScore===0)return;let current=0;const increment=targetScore/40;const timer=setInterval(()=>{current+=increment;if(current>=targetScore){setDisplayScore(targetScore);clearInterval(timer);}else{setDisplayScore(Math.round(current));}},25);return()=>clearInterval(timer);},[targetScore]);

  return(<div>
    {/* Dashboard Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32,paddingBottom:20,borderBottom:"1px solid "+C.border}}>
      <div>
        <div style={{fontSize:24,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{r.clientData?.brand||"Brand"} Visibility Report</div>
        <div style={{display:"flex",gap:16,marginTop:6}}>
          {r.clientData?.industry&&<span style={{fontSize:12,color:C.muted,display:"flex",alignItems:"center",gap:4}}><span style={{width:4,height:4,borderRadius:"50%",background:C.muted,display:"inline-block"}}/>{r.clientData.industry}</span>}
          {r.clientData?.region&&<span style={{fontSize:12,color:C.muted,display:"flex",alignItems:"center",gap:4}}><span style={{width:4,height:4,borderRadius:"50%",background:C.muted,display:"inline-block"}}/>{r.clientData.region}</span>}
          <span style={{fontSize:12,color:C.muted,display:"flex",alignItems:"center",gap:4}}><span style={{width:4,height:4,borderRadius:"50%",background:C.muted,display:"inline-block"}}/>{r.auditDate?new Date(r.auditDate).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span>
        </div>
      </div>
        <button onClick={()=>exportPDF(r)} style={{padding:"6px 14px",fontSize:11,fontWeight:500,background:C.accent,color:"#fff",border:"none",borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Satoshi',-apple-system,sans-serif",whiteSpace:"nowrap",transition:"all 0.15s ease"}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Export PDF
        </button>
    </div>

    {r._auditError&&<div style={{padding:"16px 20px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:18}}>&#9888;</span>
      <div><div style={{fontSize:13,fontWeight:500,color:"#991b1b"}}>Audit completed with errors</div><div style={{fontSize:12,color:"#b91c1c",marginTop:2}}>{r._auditError} Some sections may show limited data.</div></div>
    </div>}

    {/* ═══ TIER 1: THE HEADLINE ═══ */}
    <div style={{marginBottom:32}}>
      {/* Overall Score — circular ring */}
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:13,fontWeight:500,color:C.muted,marginBottom:12}}>Engine Visibility Score<InfoTip text="Weighted average across all engines based on estimated regional market share."/></div>
        <div style={{position:"relative",width:140,height:140,margin:"0 auto"}}>
          <svg viewBox="0 0 140 140" style={{width:140,height:140}}>
            <circle cx="70" cy="70" r="62" fill="none" stroke={C.borderSoft} strokeWidth="6"/>
            <circle cx="70" cy="70" r="62" fill="none" stroke={targetScore>=80?C.green:targetScore>=60?C.accent:targetScore>=40?C.amber:C.red} strokeWidth="6" strokeLinecap="round" strokeDasharray={2*Math.PI*62} strokeDashoffset={2*Math.PI*62*(1-displayScore/100)} transform="rotate(-90 70 70)" style={{transition:"stroke-dashoffset 0.15s ease"}}/>
          </svg>
          <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:42,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",color:C.text,letterSpacing:"-.03em",lineHeight:1}}>{displayScore}<span style={{fontSize:18,color:C.muted,fontWeight:400}}>%</span></div>
          </div>
        </div>
        <div style={{marginTop:10}}>
          <span style={{fontSize:12,fontWeight:500,padding:"4px 16px",borderRadius:100,maxWidth:300,textAlign:"center",background:r.overall>=80?"#dcfce7":r.overall>=60?"#dbeafe":r.overall>=40?"#fef3c7":r.overall>=20?"#ffedd5":"#fee2e2",color:r.overall>=80?"#166534":r.overall>=60?"#1e40af":r.overall>=40?"#92400e":r.overall>=20?"#9a3412":"#991b1b"}}>{r.narratives?.dashboardLabel||r.scoreLabel}</span>
        </div>
      </div>

      <div style={{ margin: "0 0 24px", ...CARD.base, borderRadius: 10, minHeight: 80 }}>
        {r.narratives?.dashboard ? (
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.7, textAlign: "left" }}>{r.narratives.dashboard}</div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 48 }}><div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>Generating insights...</div></div>
        )}
      </div>

      {/* 4 KPI cards in a row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {[
          {label:"Mention Rate",value:avgMentions+"%",prev:prev?.mentions,color:C.accent,tip:"Percentage of queries where AI engines mention your brand. Averaged across all engines, weighted by regional market share."},
          {label:"Citation Rate",value:avgCitations+"%",prev:prev?.citations,color:"#8b5cf6",tip:"Percentage of queries where AI engines specifically recommend or link to your brand. Citations are stronger signals than mentions."},
          {label:"Sentiment Score",value:sentimentReady?(avgSentiment>=50?"Positive":avgSentiment>=30?"Neutral":"Negative"):"...",prev:null,color:sentimentReady?(avgSentiment>=50?C.green:avgSentiment>=30?C.amber:C.red):C.muted,tip:"How positively AI engines describe your brand, based on language analysis of all responses that mention you."},
          {label:"Best Engine",value:bestEngine.name.length>12?(bestEngine.name||"").replace(" Overview",""):bestEngine.name,color:bestEngine.name==="ChatGPT"?"#10A37F":(bestEngine.name||"").includes("Google")?"#EA4335":bestEngine.name==="Perplexity"?"#20808D":"#4285F4",tip:"The AI engine where your brand has the highest visibility score."}
        ].map((kpi,i)=>(
          <div key={i} style={{...CARD.base,padding:"16px 20px",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:".01em",marginBottom:8}}>{kpi.label}{kpi.tip&&<InfoTip text={kpi.tip}/>}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:6,justifyContent:"center"}}>
              <span style={{fontSize:28,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",color:kpi.color,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{kpi.value}</span>
              {kpi.prev!=null&&kpi.label!=="Best Engine"&&delta(parseInt(kpi.value),kpi.prev)}
              {kpi.sub&&<span style={{fontSize:12,color:C.muted}}>{kpi.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      <div style={{borderBottom:"1px solid "+C.border,margin:"32px 0"}}/>

      {/* Engine comparison — individual cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat("+(r.engines||[]).length+",1fr)",gap:12,marginBottom:24}}>
        {(r.engines||[]).map((e,i)=>{
          const w=dWeights[e.id]||0;
          return (
            <div key={i} style={{...CARD.base,padding:"16px 20px",textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:500,color:e.color||C.text,marginBottom:2}}>{e.name}</div>
              <div style={{fontSize:10,color:C.muted,marginBottom:12}}>{w?Math.round(w*100)+"% weight":""}{i===0&&<InfoTip text="Estimated user share in your region. Higher weight means more impact on your overall score."/>}</div>
              <div style={{fontSize:28,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",marginBottom:12}}>{e.score}%</div>
              <div style={{display:"flex",justifyContent:"center",gap:16,fontSize:11,color:C.sub}}>
                <div style={{textAlign:"center"}}>
                  <div style={{color:C.muted,marginBottom:2}}>Mentions</div>
                  <div style={{fontWeight:500,color:C.text}}>{e.mentionRate}%</div>
                </div>
                <div style={{width:1,height:24,background:C.borderSoft}}/>
                <div style={{textAlign:"center"}}>
                  <div style={{color:C.muted,marginBottom:2}}>Citations</div>
                  <div style={{fontWeight:500,color:C.text}}>{e.citationRate}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div style={{borderBottom:"1px solid "+C.border,margin:"32px 0"}}/>

    {/* ═══ TIER 2: INSIGHTS ═══ */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
      {/* Key Findings */}
      <div style={{...CARD.base}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:500,color:C.text}}>Key Findings and Actions</span><InfoTip text="Actionable insights generated from your audit data. Each finding highlights a specific gap or strength with a recommended next step."/></div>
          <span style={{fontSize:11,color:C.muted}}>{diags.filter(d=>d.severity==="critical").length} critical · {diags.filter(d=>d.severity==="warning").length} warnings</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {diags.slice(0,4).map((d,i)=>(
            <div key={i} style={{display:"flex",gap:8,padding:"10px 12px",background:`${sevColors[d.severity]||C.accent}05`,borderRadius:8,border:`1px solid ${sevColors[d.severity]||C.accent}10`,alignItems:"flex-start"}}>
              <div style={{width:6,height:6,borderRadius:3,background:sevColors[d.severity]||C.accent,flexShrink:0,marginTop:5}}/>
              <div><div style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{d.text}</div>{d.action&&<div style={{fontSize:11,color:sevColors[d.severity]||C.accent,marginTop:3,lineHeight:1.4,fontWeight:500}}>{d.action}</div>}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Health */}
      <div style={{...CARD.base}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:14,fontWeight:500,color:C.text}}>Website Readiness</span><InfoTip text="Scored from a live crawl of your website, weighted by category importance for AI engine citations."/></div>{r.websiteReadinessScore!=null&&<span style={{fontSize:14,fontWeight:500,color:r.websiteReadinessScore>=60?C.green:r.websiteReadinessScore>=35?C.amber:C.red}}>{r.websiteReadinessScore}%</span>}</div>
        <div style={{ marginBottom: 14, padding: "10px 12px", background: C.bg, borderRadius: 8, minHeight: 60 }}>
          {r.narratives?.categoryHealth ? (
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{r.narratives.categoryHealth}</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 48 }}><div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>Generating insights...</div></div>
          )}
        </div>
        {painPointsReady?(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {r.painPoints.map((pp,i)=>{
              const topEvidence=(pp.evidence||[]).find(e=>!e.startsWith("Baseline")&&!e.startsWith("No "))||(pp.evidence||[])[0]||"";
              return (
                <div key={i}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:11,color:C.sub,minWidth:120,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{pp.label.split("/")[0].trim()} <span style={{fontSize:9,color:C.muted}}>({Math.round(getCategoryWeight(pp.label)*100)}%)</span></span>
                    <div style={{flex:1,height:6,borderRadius:3,background:C.bg}}>
                      <div style={{width:Math.max(2,pp.score)+"%",height:6,borderRadius:3,background:pp.severity==="critical"?C.red:pp.severity==="warning"?C.amber:C.green,transition:"width .6s ease"}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:500,color:C.text,minWidth:32,textAlign:"right"}}>{pp.score}%</span>
                  </div>
                  {topEvidence&&<div style={{fontSize:10,color:C.muted,marginTop:2,paddingLeft:128,lineHeight:1.4}}>{topEvidence}</div>}
                </div>
              );
            })}
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {["Structured Data","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"].map((label,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:11,color:C.muted,minWidth:100}}>{label}</span>
                <div style={{flex:1,height:8,borderRadius:4,background:"#f3f4f6",overflow:"hidden"}}>
                  <div style={{width:"100%",height:"100%",background:"linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>
                </div>
                <span style={{fontSize:12,color:C.muted,minWidth:32,textAlign:"right"}}>--</span>
              </div>
            ))}
          </div>
        )}

        {/* AI Crawler Access */}
        {(()=>{
          const ac=r.brandCrawl?.aiCrawlerAccess;
          if(!ac||!ac.robotsTxt)return null;
          const rt=ac.robotsTxt;
          const lt=ac.llmsTxt;
          const blocked=(rt.crawlers||[]).filter(c=>c.blocked);
          const allowed=(rt.crawlers||[]).filter(c=>!c.blocked);
          return(
            <div style={{marginTop:16,padding:"12px 14px",background:C.bg,borderRadius:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <span style={{fontSize:12,fontWeight:500,color:C.text}}>AI Crawler Access</span>
                <InfoTip text="Checks your robots.txt to see which AI engine crawlers are allowed to index your site. Blocked crawlers cannot read your content, which may reduce your visibility on that engine. llms.txt is a new standard that helps AI engines understand your site."/>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                {rt.found?(rt.crawlers||[]).map((c,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:6,fontSize:10,fontWeight:500,background:c.blocked?"#fef2f2":"#f0fdf4",color:c.blocked?C.red:C.green,border:"1px solid "+(c.blocked?"#fecaca":"#bbf7d0")}}>
                    <span style={{width:6,height:6,borderRadius:3,background:c.blocked?C.red:C.green}}/>{c.agent}
                  </div>
                )):(
                  <div style={{fontSize:11,color:C.muted}}>robots.txt not found</div>
                )}
              </div>
              <div style={{display:"flex",gap:12,fontSize:11,color:C.sub}}>
                {rt.found&&<span>{allowed.length} allowed, {blocked.length} blocked</span>}
                <span style={{color:lt?.found?C.green:C.muted}}>{lt?.found?"✓ llms.txt found":"✗ No llms.txt"}</span>
              </div>
              {blocked.length>0&&<div style={{fontSize:10,color:C.red,marginTop:6,lineHeight:1.4}}>Blocked crawlers: {blocked.map(c=>`${c.agent} (${c.engine})`).join(", ")} — these engines may not index your content.</div>}
            </div>
          );
        })()}
      </div>
    </div>

    <div style={{borderBottom:"1px solid "+C.border,margin:"32px 0"}}/>

    {/* ═══ TIER 3: COMPARISON ═══ */}
    {r.competitors.length>0&&(
      <div style={{marginBottom:32}}>
        <div style={{fontSize:15,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",color:C.text,marginBottom:4}}>Competitive Landscape</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:16}}>{r.clientData.brand} vs competitors across AI engines</div>

        <div style={{ marginBottom: 16, padding: "10px 12px", background: C.bg, borderRadius: 8, minHeight: 60 }}>
          {r.narratives?.competitiveLandscape ? (
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{r.narratives.competitiveLandscape}</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 48 }}><div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>Generating insights...</div></div>
          )}
        </div>

        {competitorsReady?(<>
        {/* Share of Voice — 3 donuts stacked */}
        {(()=>{
          const sov=r.sovData;
          const brandNameLower=r.clientData.brand.toLowerCase();
          const mentionBrands=[
            {name:r.clientData.brand,website:r.clientData.website,mentionRate:sov?.shares?.[r.clientData.brand]?.mentionShare||0,color:C.accent},
            ...r.competitors.filter(c=>c.name.toLowerCase()!==brandNameLower).map((c,i)=>({
              name:c.name,website:(r.clientData.competitors||[]).find(cc=>cc.name===c.name)?.website||"",mentionRate:sov?.shares?.[c.name]?.mentionShare||0,
              color:["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"][i%5]
            }))
          ];
          const citationBrands=mentionBrands.map(b=>({...b,citationRate:sov?.shares?.[b.name]?.citationShare||0}));
          const sentimentBrands=[
            {name:r.clientData.brand,website:r.clientData.website,sentimentScore:avgSentiment,color:C.accent},
            ...(r.sentiment?.competitors||[]).filter(c=>c.name.toLowerCase()!==brandNameLower).map((c,i)=>({
              name:c.name,website:((r.clientData.competitors||[]).find(cc=>cc.name.toLowerCase()===c.name.toLowerCase()))?.website||"",sentimentScore:c.avg||50,
              color:["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"][i%5]
            }))
          ];
          return(<>
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:8}}>
              <ShareOfVoiceSection title="Share of Mentions" rankTitle="Mention Share" brands={mentionBrands} metricKey="mentionRate" tooltip="Your brand's mentions as a proportion of all brand mentions across every query and engine. A mention means the brand was named in the response."/>
              <ShareOfVoiceSection title="Share of Citations" rankTitle="Citation Share" brands={citationBrands} metricKey="citationRate" tooltip="Your brand's citations as a proportion of all brand citations across every query and engine. A citation means the AI engine specifically recommended or linked to your brand."/>
              <ShareOfVoiceSection title="Share of Sentiment" rankTitle="Sentiment Score" brands={sentimentBrands} metricKey="sentimentScore" tooltip="Sentiment comparison across brands based on how AI engines describe each one. Derived from actual response language, not a rating."/>
            </div>
            <div style={{fontSize:11,color:C.muted,marginBottom:16,padding:"0 4px"}}>Share = brand mentions / total mentions across all brands in {sov?.totalQueries||"all"} AI engine responses. <span style={{color:C.sub}}>Higher share = AI engines name you more often relative to competitors.</span></div>
          </>);
        })()}

        {/* Competitor quick-comparison table */}
        <div style={{...CARD.base,padding:0,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr style={{borderBottom:"2px solid "+C.border}}>
                {["Brand","Score","Mentions","Citations","vs You"].map(h=>(
                  <th key={h} style={{padding:"10px 14px",textAlign:h==="Brand"?"left":"center",fontWeight:500,color:C.muted,fontSize:11,textTransform:"uppercase"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{background:`${C.accent}04`,borderBottom:"1px solid "+C.borderSoft}}>
                <td style={{padding:"10px 14px",fontWeight:500,color:C.text}}><div style={{display:"flex",alignItems:"center",gap:8}}><BrandLogo name={r.clientData.brand} website={r.clientData.website} size={22} color={C.accent}/>{r.clientData.brand}</div></td>
                <td style={{padding:"10px 14px",textAlign:"center",fontWeight:500,color:C.accent}}>{r.overall}%</td>
                <td style={{padding:"10px 14px",textAlign:"center"}}>{avgMentions}%</td>
                <td style={{padding:"10px 14px",textAlign:"center"}}>{avgCitations}%</td>
                <td style={{padding:"10px 14px",textAlign:"center",color:C.muted}}>{"\u2014"}</td>
              </tr>
              {r.competitors.filter(c=>c.name.toLowerCase()!==r.clientData.brand.toLowerCase()).map((c,i)=>{
                const compScore=Math.round(((c.mentionRate||0)+(c.citationRate||0))/2);
                const diff=compScore-Math.round((avgMentions+avgCitations)/2);
                const isOpen=expandedComp===i;
                const compWebsite=(r.clientData.competitors||[]).find(cc=>cc.name===c.name)?.website||"";
                const compColor=["#f97316","#8b5cf6","#06b6d4","#ec4899","#84cc16"][i%5];
                return(
                  <React.Fragment key={i}>
                    <tr onClick={()=>setExpandedComp(isOpen?null:i)} style={{borderBottom:isOpen?"none":"1px solid "+C.borderSoft,cursor:"pointer",transition:"background .15s",background:isOpen?C.bg+"80":"transparent"}} onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background=C.bg+"40"}} onMouseLeave={e=>{if(!isOpen)e.currentTarget.style.background=isOpen?C.bg+"80":"transparent"}}>
                      <td style={{padding:"10px 14px",color:C.text}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <BrandLogo name={c.name} website={compWebsite} size={22} color={compColor}/>
                          <span>{c.name}</span>
                          <span style={{fontSize:10,color:C.muted,marginLeft:4}}>{isOpen?"\u25B2":"\u25BC"}</span>
                        </div>
                      </td>
                      <td style={{padding:"10px 14px",textAlign:"center",fontWeight:500}}>{compScore}%</td>
                      <td style={{padding:"10px 14px",textAlign:"center"}}>{c.mentionRate||0}%</td>
                      <td style={{padding:"10px 14px",textAlign:"center"}}>{c.citationRate||0}%</td>
                      <td style={{padding:"10px 14px",textAlign:"center"}}>
                        <span style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:100,color:diff>0?"#991b1b":"#166534",background:diff>0?"#fee2e2":"#dcfce7"}}>{diff>0?"+":""}{diff}%</span>
                      </td>
                    </tr>
                    {isOpen&&(
                      <tr><td colSpan={5} style={{padding:0,borderBottom:"1px solid "+C.borderSoft}}>
                        <div style={{padding:"16px 20px",background:C.bg+"60"}}>
                          {/* Pain point comparison bars */}
                          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
                            {(c.painPoints||[]).map((cp,j)=>{
                              const yours=r.painPoints[j]?.score||0;
                              const theirs=cp.score||0;
                              const catDiff=theirs-yours;
                              return(
                                <div key={j} style={{padding:"8px 10px",background:"#fff",borderRadius:8,border:"1px solid "+C.borderSoft}}>
                                  <div style={{fontSize:10,color:C.muted,marginBottom:6}}>{cp.label.split("/")[0].trim()}</div>
                                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                    <span style={{fontSize:11,color:C.accent,fontWeight:500}}>You: {yours}%</span>
                                    <span style={{fontSize:11,fontWeight:500,color:catDiff>0?C.red:catDiff<0?C.green:C.text}}>{c.name.split(" ")[0]}: {theirs}%</span>
                                  </div>
                                  <div><Bar value={yours} color={C.accent} h={3}/><div style={{marginTop:2}}><Bar value={theirs} color={catDiff>0?C.red:"#94a3b8"} h={3}/></div></div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Crawl signal comparison table */}
                          {(()=>{
                            const brandCrawlData=r.brandCrawl?.mainPage||r.brandCrawl||null;
                            const compCrawlData=r.compCrawlData?.[c.name]||null;
                            if(!brandCrawlData&&!compCrawlData) return <div style={{fontSize:11,color:C.muted,textAlign:"center",padding:8}}>No crawl data available for comparison</div>;

                            const crawlSignals=[
                              {label:"Schema Markup (JSON-LD)",check:d=>d?.hasFAQSchema||d?.hasArticleMarkup||(d?.schemas?.length||0)>0||(d?.aeoSignals?.schemaMarkup)},
                              {label:"FAQ Schema",check:d=>d?.hasFAQMarkup||d?.hasFAQSchema||d?.aeoSignals?.faqSchema},
                              {label:"Article / Blog Schema",check:d=>d?.hasArticleMarkup||d?.hasArticleSchema||d?.aeoSignals?.articleSchema},
                              {label:"Organization Schema",check:d=>(d?.schemas||[]).some(s=>["Organization","LocalBusiness","Corporation"].includes(s))||d?.hasOrgSchema||d?.aeoSignals?.orgSchema},
                              {label:"Author Attribution (E-E-A-T)",check:d=>d?.hasAuthorInfo||d?.aeoSignals?.authorInfo},
                              {label:"Trust Signals",check:d=>d?.hasTrustSignals||d?.aeoSignals?.trustSignals},
                              {label:"Testimonials / Reviews",check:d=>d?.hasTestimonials||d?.aeoSignals?.testimonials},
                              {label:"Video Content",check:d=>d?.hasVideo||d?.aeoSignals?.video},
                              {label:"Blog / Content Hub",check:d=>d?.aeoSignals?.hasBlog||(d?.subPages?.blog!=null)||(typeof d==="object"&&d?.url&&d?.url.includes("blog"))},
                              {label:"Breadcrumb Navigation",check:d=>d?.hasBreadcrumb||d?.aeoSignals?.breadcrumbs||(d?.schemas||[]).includes("BreadcrumbList")},
                              {label:"Open Graph Tags",check:d=>d?.hasOpenGraph||d?.aeoSignals?.openGraph},
                              {label:"Canonical URL",check:d=>d?.hasCanonical||d?.aeoSignals?.canonical},
                              {label:"Content Depth (1000+ words)",check:d=>(d?.wordCount||d?.totalWordCount||d?.homepageWordCount||0)>=1000},
                              {label:"Internal Links (20+)",check:d=>(d?.internalLinks||0)>=20},
                              {label:"Proper Heading Hierarchy",check:d=>(d?.headings?.h1s?.length>0||d?.h1Count>0)&&(d?.headings?.h2s?.length>0||d?.h2Count>0)}
                            ];

                            const brandCount=brandCrawlData?crawlSignals.filter(s=>s.check(brandCrawlData)).length:0;
                            const compCount=compCrawlData?crawlSignals.filter(s=>s.check(compCrawlData)).length:0;

                            return(
                              <div>
                                <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:8}}>GEO Signal Comparison</div>
                                <div style={{display:"grid",gridTemplateColumns:"1fr 80px 80px",gap:0,fontSize:11,background:"#fff",borderRadius:8,border:"1px solid "+C.borderSoft,overflow:"hidden"}}>
                                  {/* Header */}
                                  <div style={{padding:"8px 12px",fontWeight:500,color:C.muted,borderBottom:"1px solid "+C.borderSoft,background:C.bg}}>Signal</div>
                                  <div style={{padding:"8px 6px",fontWeight:500,color:C.accent,borderBottom:"1px solid "+C.borderSoft,background:C.bg,textAlign:"center"}}>{r.clientData.brand}</div>
                                  <div style={{padding:"8px 6px",fontWeight:500,color:compColor,borderBottom:"1px solid "+C.borderSoft,background:C.bg,textAlign:"center"}}>{c.name}</div>
                                  {/* Rows */}
                                  {crawlSignals.map((sig,si)=>{
                                    const brandHas=brandCrawlData?sig.check(brandCrawlData):false;
                                    const compHas=compCrawlData?sig.check(compCrawlData):false;
                                    return(
                                      <React.Fragment key={si}>
                                        <div style={{padding:"6px 12px",borderBottom:si<crawlSignals.length-1?"1px solid "+C.borderSoft:"none",color:C.sub}}>{sig.label}</div>
                                        <div style={{padding:"6px 0",textAlign:"center",borderBottom:si<crawlSignals.length-1?"1px solid "+C.borderSoft:"none",color:brandHas?C.green:C.red,fontWeight:500}}>{brandHas?"Yes":"No"}</div>
                                        <div style={{padding:"6px 0",textAlign:"center",borderBottom:si<crawlSignals.length-1?"1px solid "+C.borderSoft:"none",color:compHas?C.green:C.red,fontWeight:500}}>{compHas?"Yes":"No"}</div>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between",marginTop:8,padding:"8px 12px",background:"#fff",borderRadius:8,border:"1px solid "+C.borderSoft,fontSize:11}}>
                                  <span style={{color:C.sub}}><span style={{fontWeight:500,color:C.accent}}>{r.clientData.brand}</span>: {brandCount}/{crawlSignals.length} signals</span>
                                  <span style={{color:C.sub}}><span style={{fontWeight:500,color:compColor}}>{c.name}</span>: {compCount}/{crawlSignals.length} signals</span>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Advantages / insights */}
                          {c.advantages&&c.advantages.length>0&&(
                            <div style={{marginTop:12}}>
                              {c.advantages.slice(0,4).map((adv,ai)=>(
                                <div key={ai} style={{padding:"8px 12px",background:adv.insight?.advantage==="them"?"#fef2f2":"#f0fdf4",borderRadius:8,borderLeft:"3px solid "+(adv.insight?.advantage==="them"?C.red:C.green),marginBottom:4}}>
                                  <div style={{fontSize:11,fontWeight:500,color:C.text,marginBottom:1}}>{(adv.cat||adv.category||"").split("/")[0].trim()} <span style={{color:C.muted,fontWeight:400}}>-- You: {adv.yourScore}% vs {adv.theirScore}%</span></div>
                                  <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{adv.insight?.text||""}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td></tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        </>):(
          <div style={{...CARD.base,overflow:"hidden"}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<2?"1px solid "+C.borderSoft:"none"}}>
                <div style={{width:28,height:28,borderRadius:8,background:"#e5e7eb"}}/>
                <div style={{flex:1}}>
                  <div style={{height:12,borderRadius:4,background:"linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",width:"40%",marginBottom:6}}/>
                  <div style={{height:8,borderRadius:4,background:"linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",width:"70%"}}/>
                </div>
                <div style={{height:12,borderRadius:4,background:"linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",width:50}}/>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

    <div style={{borderBottom:"1px solid "+C.border,margin:"32px 0"}}/>

    {/* ═══ TIER 4: HISTORICAL ═══ */}
    <div style={{marginBottom:32}}>
      <div style={{fontSize:15,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",color:C.text,marginBottom:4}}>Historical Performance</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Track {r.clientData.brand}'s AI visibility over time</div>

      {(()=>{
        // Deduplicate history entries by date
        const deduped=[];const seen=new Set();
        (history||[]).forEach(h=>{const key=h.date;if(!seen.has(key)){seen.add(key);deduped.push(h);}});
        const rawData=deduped.filter(h=>h.overall!=null&&h.overall>0).map(h=>({
          date:formatAuditDate(h.date).replace(/\s\d{4}$/,""),
          fullDate:formatAuditDate(h.date),
          overall:h.overall||0,
          mentions:h.mentions||0,
          citations:h.citations||0,
          _ts:new Date(h.date).getTime()
        }));
        const dayMap=new Map();
        rawData.forEach(d=>{const key=d.date;if(!dayMap.has(key)||d._ts>dayMap.get(key)._ts)dayMap.set(key,d);});
        if(r&&r.overall){
          const todayKey=formatAuditDate(new Date()).replace(/\s\d{4}$/,"");
          const currentMentions=Math.round(((r.engines?.[0]?.mentionRate||0)+(r.engines?.[1]?.mentionRate||0))/2);
          const currentCitations=Math.round(((r.engines?.[0]?.citationRate||0)+(r.engines?.[1]?.citationRate||0))/2);
          dayMap.set(todayKey,{date:todayKey,fullDate:formatAuditDate(new Date()),overall:r.overall||0,mentions:currentMentions,citations:currentCitations,_ts:Date.now()});
        }
        const chartData=[...dayMap.values()].map(({_ts,...rest})=>rest);

        if(chartData.length<2)return(
          <div style={{...CARD.base}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
              <div style={{width:40,height:40,borderRadius:10,background:C.accent+"08",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:500,color:C.text,marginBottom:4}}>First Audit Complete</div>
                <div style={{fontSize:12,color:C.sub,lineHeight:1.6,marginBottom:12}}>
                  Re-audit weekly to track AI-engine visibility score improvements as you implement roadmap items.
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <div style={{fontSize:11,padding:"6px 12px",background:C.bg,borderRadius:6,color:C.sub}}>
                    Next recommended audit: <span style={{fontWeight:500,color:C.text}}>{new Date(Date.now()+7*24*60*60*1000).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                  </div>
                  <div style={{fontSize:11,padding:"6px 12px",background:C.bg,borderRadius:6,color:C.sub}}>
                    Baseline score: <span style={{fontWeight:500,color:C.accent}}>{r.overall}%</span>
                  </div>
                </div>
              </div>
            </div>
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
        const chartDelta=last.overall-first.overall;

        return(
          <div style={{padding:24,background:C.card,border:"1px solid "+C.border,borderRadius:14}}>
            <div style={{display:"flex",gap:20,marginBottom:20,fontSize:12}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:C.accent}}/><span style={{color:C.muted}}>Overall Score</span></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:"#22c55e"}}/><span style={{color:C.muted}}>Mention Rate</span></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:3,borderRadius:2,background:"#f59e0b"}}/><span style={{color:C.muted}}>Citation Rate</span></div>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",overflow:"visible"}}>
              {yTicks.map(tick=><g key={tick}><line x1={padL} x2={W-padR} y1={getY(tick)} y2={getY(tick)} stroke={C.border} strokeWidth={1} strokeDasharray={tick===0?"none":"4,4"}/><text x={padL-8} y={getY(tick)+4} textAnchor="end" fontSize={10} fill={C.muted}>{tick}%</text></g>)}
              {lines.map(line=><path key={line.key} d={makePath(line.key)} fill="none" stroke={line.color} strokeWidth={line.width} strokeLinecap="round" strokeLinejoin="round"/>)}
              {lines.map(line=>chartData.map((d,i)=><circle key={`${line.key}-${i}`} cx={getX(i)} cy={getY(d[line.key])} r={3} fill={line.color} stroke="#fff" strokeWidth={1.5}><title>{line.key}: {d[line.key]}% — {d.fullDate}</title></circle>))}
              {chartData.map((d,i)=><text key={i} x={getX(i)} y={H-5} textAnchor="middle" fontSize={10} fill={C.muted}>{d.date}</text>)}
              {lines.map(line=><text key={`lbl-${line.key}`} x={getX(n-1)+8} y={getY(last[line.key])+4} fontSize={10} fontWeight={500} fill={line.color}>{last[line.key]}%</text>)}
            </svg>
            <div style={{marginTop:16,padding:"12px 16px",background:chartDelta>=0?"rgba(220,252,231,0.06)":"rgba(254,226,226,0.06)",borderRadius:10,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,color:C.text}}>
                Overall score {chartDelta>=0?"improved":"decreased"} by <span style={{fontWeight:500,color:chartDelta>=0?"#166534":"#991b1b"}}>{Math.abs(chartDelta)}%</span> since first audit
                <span style={{color:C.muted}}> ({first.fullDate} → {last.fullDate})</span>
              </span>
            </div>
            <div style={{marginTop:12,padding:"10px 14px",background:C.bg,borderRadius:8,fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:6}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {chartData.length<4
                ?"Recommended: re-audit weekly to track the impact of your GEO strategy."
                :`${chartData.length} audits recorded. Consistent tracking helps measure the impact of your GEO strategy.`
              }
            </div>
          </div>
        );
      })()}
    </div>

  </div>);
}


/* ─── PAGE: QUERY CATEGORIES ─── */
function QueryCategoriesPage({ r }) {
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const [selectedCat, setSelectedCat] = useState(null);
  const [testQuery, setTestQuery] = useState("");
  const [testingPrompt, setTestingPrompt] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [testedPrompts, setTestedPrompts] = useState([]);

  const handleTestPrompt = async () => {
    if (!testQuery.trim() || testingPrompt) return;
    setTestingPrompt(true);
    setTestResults(null);
    const query = testQuery.trim();
    try {
      const brand = r.clientData?.brand || "";
      const website = r.clientData?.website || "";
      const region = r.clientData?.region || "";
      const neutralSys = "You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them.";
      const [gptResult, gemResult, pplxResult, gaiResult] = await Promise.all([
        callOpenAISearch(query, region),
        callGeminiWithCitations(query, neutralSys),
        callPerplexity(query, neutralSys),
        callGoogleAI(query, r.clientData?.region || "")
      ]);
      const gptText = typeof gptResult === "string" ? gptResult : (gptResult?.response || gptResult?.text || "");
      const gemText = typeof gemResult === "string" ? gemResult : (gemResult?.text || gemResult?.response || "");
      const pplxText = typeof pplxResult === "string" ? pplxResult : (pplxResult?.text || pplxResult?.response || "");
      const gaiText = typeof gaiResult === "string" ? gaiResult : (gaiResult?.text || gaiResult?.response || "");
      const gptCitations = gptResult?.citations || [];
      const classifyText = (text, citations) => {
        if (!text || text.length < 20) return "Absent";
        const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRegex = new RegExp('\\b' + escaped + '\\b', 'i');
        let domain = "";
        if (website) { try { domain = new URL(website.startsWith("http") ? website : "https://" + website).hostname.replace("www.", ""); } catch(e) {} }
        const nameFound = nameRegex.test(text);
        const urlCited = domain && citations && citations.length > 0 && citations.some(c => (c.url || "").toLowerCase().includes(domain.toLowerCase()));
        const textUrlFound = domain && text.toLowerCase().includes(domain.toLowerCase());
        if (!nameFound && !urlCited && !textUrlFound) return "Absent";
        if (urlCited || textUrlFound) return "Cited";
        const citedPatterns = [
          new RegExp('(?:recommend|suggest|would\\s+recommend).*?' + escaped, 'i'),
          new RegExp(escaped + '.*?(?:is\\s+(?:a\\s+)?(?:great|excellent|top|best|leading))', 'i'),
          new RegExp('(?:best|top|leading).*?' + escaped, 'i')
        ];
        if (citedPatterns.some(p => p.test(text))) return "Cited";
        return "Mentioned";
      };
      const gptStatus = classifyText(gptText, gptCitations);
      const gemStatus = classifyText(gemText, gemResult?.citations || []);
      const pplxStatus = classifyText(pplxText, pplxResult?.citations || []);
      const gaiStatus = classifyText(gaiText, gaiResult?.citations || []);
      const result = { query, gptStatus, gemStatus, pplxStatus, gaiStatus, gptText: gptText.slice(0, 500), gemText: gemText.slice(0, 500), pplxText: pplxText.slice(0, 500), gaiText: gaiText.slice(0, 500) };
      setTestResults(result);
      setTestedPrompts(prev => [result, ...prev]);
      setTestQuery("");
    } catch(e) {
      console.error("Test prompt failed:", e);
      setTestResults({ query, gptStatus: "Error", gemStatus: "Error", pplxStatus: "Error", gaiStatus: "Error", error: true });
    }
    setTestingPrompt(false);
  };

  const gptQueries = r.engines[0]?.queries || [];
  const gemQueries = r.engines[1]?.queries || [];
  const pplxQueries = r.engines[2]?.queries || [];
  const gaiQueries = r.engines[3]?.queries || [];
  const allQueries = (r.searchQueries || gptQueries.map(q => q.query)).map((query, i) => {
    const qText = typeof query === "string" ? query : query.query;
    const gptMatch = gptQueries.find(q => q.query === qText) || gptQueries[i];
    const gemMatch = gemQueries.find(q => q.query === qText) || gemQueries[i];
    const pplxMatch = pplxQueries.find(q => q.query === qText) || pplxQueries[i];
    const gaiMatch = gaiQueries.find(q => q.query === qText) || gaiQueries[i];
    return {
      query: qText,
      gptStatus: gptMatch?.status || "Absent",
      gemStatus: gemMatch?.status || "Absent",
      pplxStatus: pplxMatch?.status || "Absent",
      gaiStatus: gaiMatch?.status || "Absent",
      bestStatus: (gptMatch?.status === "Cited" || gemMatch?.status === "Cited" || pplxMatch?.status === "Cited" || gaiMatch?.status === "Cited") ? "Cited" : (gptMatch?.status === "Mentioned" || gemMatch?.status === "Mentioned" || pplxMatch?.status === "Mentioned" || gaiMatch?.status === "Mentioned") ? "Mentioned" : "Absent",
      archetype: (r.queryArchetypeMap||{})[qText]||""
    };
  });

  const categorize = (query) => {
    const q = query.toLowerCase();
    if (/\bbest\b|top\s+\d|recommend|which\s+(is|are)|should\s+i/i.test(q)) return "Recommendation";
    if (/\bvs\b|compar|versus|difference\s+between|or\b.*\bor\b/i.test(q)) return "Comparison";
    if (/\bhow\s+(to|do|does|can|much)|guide|tutorial|step/i.test(q)) return "How-To";
    if (/\bbuy\b|price|cost|plan|package|subscription|where\s+to|deal/i.test(q)) return "Transactional";
    if (/\breview|rating|experience|worth|reliable|complaint/i.test(q)) return "Evaluation";
    if (/\bwhat\s+(is|are)|explain|meaning|definition|overview/i.test(q)) return "Informational";
    return "General";
  };

  const categorized = {};
  allQueries.forEach(q => {
    const cat = categorize(q.query);
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push(q);
  });

  const categoryColors = {
    "Recommendation": "#2563eb",
    "Comparison": "#8b5cf6",
    "How-To": "#059669",
    "Transactional": "#d97706",
    "Evaluation": "#dc2626",
    "Informational": "#0ea5e9",
    "General": "#6b7280"
  };

  const categoryDescs = {
    "Recommendation": "Queries asking AI to recommend or suggest brands",
    "Comparison": "Queries comparing brands, products, or features",
    "How-To": "Queries seeking instructions or guides",
    "Transactional": "Queries with purchase or pricing intent",
    "Evaluation": "Queries seeking reviews, ratings, or assessments",
    "Informational": "Queries seeking general knowledge or definitions",
    "General": "Other industry-related queries"
  };

  const categories = Object.entries(categorized).map(([name, queries]) => {
    const cited = queries.reduce((sum, q) => sum + (q.gptStatus === "Cited" ? 1 : 0) + (q.gemStatus === "Cited" ? 1 : 0) + (q.pplxStatus === "Cited" ? 1 : 0) + (q.gaiStatus === "Cited" ? 1 : 0), 0);
    const mentioned = queries.reduce((sum, q) => sum + (q.gptStatus === "Mentioned" ? 1 : 0) + (q.gemStatus === "Mentioned" ? 1 : 0) + (q.pplxStatus === "Mentioned" ? 1 : 0) + (q.gaiStatus === "Mentioned" ? 1 : 0), 0);
    const totalEngineResponses = queries.length * 4;
    const absent = totalEngineResponses - cited - mentioned;
    const winRate = Math.round(((cited + mentioned) / Math.max(totalEngineResponses, 1)) * 100);
    return { name, queries, cited, mentioned, absent, total: totalEngineResponses, winRate, color: categoryColors[name] || "#6b7280", desc: categoryDescs[name] || "" };
  }).sort((a, b) => b.queries.length - a.queries.length);

  let totalCited = 0, totalMentioned = 0, totalAbsent = 0;
  allQueries.forEach(q => {
    ["gptStatus", "gemStatus", "pplxStatus", "gaiStatus"].forEach(key => {
      const status = q[key];
      if (status === "Cited") totalCited++;
      else if (status === "Mentioned") totalMentioned++;
      else totalAbsent++;
    });
  });
  const totalDataPoints = totalCited + totalMentioned + totalAbsent;

  const statusBadge = (status) => {
    const bg = status === "Cited" ? "#dcfce7" : status === "Mentioned" ? "#dbeafe" : "#fee2e2";
    const cl = status === "Cited" ? "#166534" : status === "Mentioned" ? "#1e40af" : "#991b1b";
    return { background: bg, color: cl, padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500, display: "inline-block" };
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: C.text, margin: 0, fontFamily: "'Satoshi',-apple-system,sans-serif" }}>Query Categories</h2>
          <InfoTip text="How your brand performs across different types of AI queries. Each topic was tested on all engines. Cited means the engine recommended you, Mentioned means you were named, Absent means you were not included."/>
        </div>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Which customer questions lead to {r.clientData.brand} — and which don't</p>
      </div>

      <div style={{ marginBottom: 24, padding: "16px 20px", background: "#fff", border: "1px solid " + C.border, borderRadius: 10, minHeight: 70 }}>
        {r.narratives?.queryCategories ? (
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.7 }}>{r.narratives.queryCategories}</div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 48 }}><div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>Generating insights...</div></div>
        )}
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Data Points", value: totalDataPoints, color: C.text },
          { label: "Cited", value: totalCited, sub: Math.round(totalCited / Math.max(totalDataPoints, 1) * 100) + "%", color: "#166534" },
          { label: "Mentioned", value: totalMentioned, sub: Math.round(totalMentioned / Math.max(totalDataPoints, 1) * 100) + "%", color: "#1e40af" },
          { label: "Absent", value: totalAbsent, sub: Math.round(totalAbsent / Math.max(totalDataPoints, 1) * 100) + "%", color: "#991b1b" }
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 12, padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: ".01em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 500, fontFamily: "'Satoshi',-apple-system,sans-serif", color: s.color }}>{s.value}</div>
            {s.sub && <div style={{ fontSize: 11, color: s.color, marginTop: 2 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Category cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {categories.map((cat, ci) => {
          const isOpen = selectedCat === ci;
          return (
            <div key={ci} style={{ background: "#fff", border: "1px solid " + (isOpen ? cat.color + "40" : C.border), borderRadius: 12, overflow: "hidden", transition: "all .2s" }}>
              <div onClick={() => setSelectedCat(isOpen ? null : ci)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 4, height: 36, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{cat.desc}</div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted }}>Queries</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{cat.total}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.muted }}>Win Rate</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: cat.winRate >= 60 ? "#166534" : cat.winRate >= 30 ? "#92400e" : "#991b1b" }}>{cat.winRate}%</div>
                  </div>
                  <div style={{ width: 80, height: 6, borderRadius: 3, background: C.bg, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: (cat.cited / cat.total * 100) + "%", height: "100%", background: "#16a34a" }} />
                    <div style={{ width: (cat.mentioned / cat.total * 100) + "%", height: "100%", background: "#2563eb" }} />
                    <div style={{ width: (cat.absent / cat.total * 100) + "%", height: "100%", background: "#ef4444" }} />
                  </div>
                  <span style={{ fontSize: 10, color: C.muted }}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {isOpen && (
                <div style={{ padding: "0 20px 16px", borderTop: "1px solid " + C.borderSoft }}>
                  <div style={{ paddingTop: 12 }}>
                    {cat.queries.map((q, qi) => (
                      <div key={qi} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: qi < cat.queries.length - 1 ? "1px solid " + C.borderSoft : "none" }}>
                        <div style={{ flex: 1, fontSize: 12, color: C.sub, lineHeight: 1.5 }}>{q.query}{q.archetype&&<span style={{display:"inline-block",fontSize:9,fontWeight:500,padding:"2px 7px",borderRadius:4,background:C.accent+"10",color:C.accent,marginLeft:8,verticalAlign:"middle",whiteSpace:"nowrap"}}>{q.archetype}</span>}</div>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
                          <span style={statusBadge(q.gptStatus)}>GPT: {q.gptStatus}</span>
                          <span style={statusBadge(q.gemStatus)}>Gem: {q.gemStatus}</span>
                          <span style={statusBadge(q.pplxStatus)}>Pplx: {q.pplxStatus}</span>
                          <span style={statusBadge(q.gaiStatus)}>GAI: {q.gaiStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, padding: "10px 14px", background: cat.winRate >= 60 ? "#f0fdf4" : cat.winRate >= 30 ? "#fffbeb" : "#fef2f2", borderRadius: 8, fontSize: 12, color: C.sub, lineHeight: 1.5 }}>
                    {cat.winRate >= 60
                      ? `Strong performance on ${cat.name.toLowerCase()} queries. ${r.clientData.brand} is well-positioned when users ask AI engines for ${cat.desc.toLowerCase().replace("queries ", "")}.`
                      : cat.winRate >= 30
                        ? `Mixed results on ${cat.name.toLowerCase()} queries. ${r.clientData.brand} appears in some responses but is absent in ${cat.absent} out of ${cat.total} engine responses in this category.`
                        : `Weak visibility on ${cat.name.toLowerCase()} queries. AI engines rarely mention ${r.clientData.brand} when users ask for ${cat.desc.toLowerCase().replace("queries ", "")}. Priority area for content creation.`
                    }
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: C.muted, padding: "0 4px" }}>
        Categories assigned by query intent analysis. Win rate = queries where {r.clientData.brand} is Cited or Mentioned on at least one engine.
      </div>

      {/* Test a Prompt */}
      <div style={{ marginTop: 32, borderTop: "1px solid " + C.borderSoft, paddingTop: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: C.text, fontFamily: "'Satoshi',-apple-system,sans-serif", marginBottom: 4 }}>Test a Prompt</div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Enter any query to see how AI engines respond for {r.clientData?.brand || "your brand"}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input value={testQuery} onChange={e => setTestQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleTestPrompt()} placeholder="e.g. What are the best mobile plans in Malaysia?" style={{ flex: 1, padding: "11px 14px", border: "1px solid " + C.border, borderRadius: 8, fontSize: 13, color: C.text, outline: "none", background: "#fff", fontFamily: "inherit", transition: "all .15s" }}/>
          <button onClick={handleTestPrompt} disabled={!testQuery.trim() || testingPrompt} style={{ padding: "11px 20px", background: testQuery.trim() && !testingPrompt ? C.accent : "#e2e8f0", color: testQuery.trim() && !testingPrompt ? "#fff" : "#94a3b8", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: testQuery.trim() && !testingPrompt ? "pointer" : "not-allowed", fontFamily: "'Satoshi',-apple-system,sans-serif", transition: "all .15s", whiteSpace: "nowrap" }}>{testingPrompt ? "Testing..." : "Test"}</button>
        </div>
        {testResults && !testResults.error && (
          <div style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: C.sub, marginBottom: 8 }}>{testResults.query}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: testResults.gptStatus === "Cited" ? "#dcfce7" : testResults.gptStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: testResults.gptStatus === "Cited" ? "#166534" : testResults.gptStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>ChatGPT: {testResults.gptStatus}</span>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: testResults.gemStatus === "Cited" ? "#dcfce7" : testResults.gemStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: testResults.gemStatus === "Cited" ? "#166534" : testResults.gemStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>Gemini: {testResults.gemStatus}</span>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: testResults.pplxStatus === "Cited" ? "#dcfce7" : testResults.pplxStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: testResults.pplxStatus === "Cited" ? "#166534" : testResults.pplxStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>Perplexity: {testResults.pplxStatus}</span>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: testResults.gaiStatus === "Cited" ? "#dcfce7" : testResults.gaiStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: testResults.gaiStatus === "Cited" ? "#166534" : testResults.gaiStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>Google AI: {testResults.gaiStatus}</span>
            </div>
          </div>
        )}
        {testedPrompts.length > 1 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>Previously tested</div>
            {testedPrompts.slice(1, 6).map((tp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid " + C.borderSoft, fontSize: 11 }}>
                <div style={{ flex: 1, color: C.sub }}>{tp.query}</div>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: tp.gptStatus === "Cited" ? "#dcfce7" : tp.gptStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: tp.gptStatus === "Cited" ? "#166534" : tp.gptStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>{tp.gptStatus}</span>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: tp.gemStatus === "Cited" ? "#dcfce7" : tp.gemStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: tp.gemStatus === "Cited" ? "#166534" : tp.gemStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>{tp.gemStatus}</span>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: tp.pplxStatus === "Cited" ? "#dcfce7" : tp.pplxStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: tp.pplxStatus === "Cited" ? "#166534" : tp.pplxStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>{tp.pplxStatus}</span>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: tp.gaiStatus === "Cited" ? "#dcfce7" : tp.gaiStatus === "Mentioned" ? "#dbeafe" : "#fee2e2", color: tp.gaiStatus === "Cited" ? "#166534" : tp.gaiStatus === "Mentioned" ? "#1e40af" : "#991b1b" }}>{tp.gaiStatus}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PAGE: ARCHETYPES (stakeholder-grouped) ─── */
function ArchetypesPage({r,goTo,onUpdate}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
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
  if(!r.stakeholders||r.stakeholders.length===0)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>User Archetypes</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Archetypes not generated</div>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
      <button onClick={regenerateArchetypes} disabled={regenArch} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenArch?"#e5e7eb":C.accent,color:regenArch?"#999":"#fff",border:"none",borderRadius:8,cursor:regenArch?"default":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{regenArch?"Generating...":"Generate Archetypes"}</button>
    </div>
  </div>);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>User Archetypes</h2><p style={{color:"#6b7280",fontSize:13,marginTop:3}}>Who is searching — grouped by stakeholder type</p></div>
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

/* ─── PAGE: VISIBILITY MAP ─── */
function VisibilityMapPage({ r }) {
  const [expandedCat, setExpandedCat] = useState(null);
  const gptQueries = r.engines[0]?.queries || [];
  const gemQueries = r.engines[1]?.queries || [];
  const pplxQueries = r.engines[2]?.queries || [];
  const allQueries = (r.searchQueries || gptQueries.map(q => q.query)).map((query, i) => {
    const qText = typeof query === "string" ? query : query.query;
    const gptMatch = gptQueries.find(q => q.query === qText) || gptQueries[i];
    const gemMatch = gemQueries.find(q => q.query === qText) || gemQueries[i];
    const pplxMatch = pplxQueries.find(q => q.query === qText) || pplxQueries[i];
    return {
      query: qText,
      gptStatus: gptMatch?.status || "Absent",
      gemStatus: gemMatch?.status || "Absent",
      pplxStatus: pplxMatch?.status || "Absent",
      bestStatus: (gptMatch?.status === "Cited" || gemMatch?.status === "Cited" || pplxMatch?.status === "Cited") ? "Cited" : (gptMatch?.status === "Mentioned" || gemMatch?.status === "Mentioned" || pplxMatch?.status === "Mentioned") ? "Mentioned" : "Absent"
    };
  });
  const categorize = (query) => {
    const q = query.toLowerCase();
    if (/\bbest\b|top\s+\d|recommend|which\s+(is|are)|should\s+i/i.test(q)) return "Recommendation";
    if (/\bvs\b|compar|versus|difference\s+between|or\b.*\bor\b/i.test(q)) return "Comparison";
    if (/\bhow\s+(to|do|does|can|much)|guide|tutorial|step/i.test(q)) return "How-To";
    if (/\bbuy\b|price|cost|plan|package|subscription|where\s+to|deal/i.test(q)) return "Transactional";
    if (/\breview|rating|experience|worth|reliable|complaint/i.test(q)) return "Evaluation";
    if (/\bwhat\s+(is|are)|explain|meaning|definition|overview/i.test(q)) return "Informational";
    return "General";
  };
  const categorized = {};
  allQueries.forEach(q => {
    const cat = categorize(q.query);
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push(q);
  });
  const categories = Object.entries(categorized).map(([name, queries]) => {
    const cited = queries.filter(q => q.bestStatus === "Cited").length;
    const mentioned = queries.filter(q => q.bestStatus === "Mentioned").length;
    const absent = queries.filter(q => q.bestStatus === "Absent").length;
    const total = queries.length;
    const winRate = Math.round(((cited + mentioned) / total) * 100);
    const citeRate = Math.round((cited / total) * 100);
    return { name, queries, cited, mentioned, absent, total, winRate, citeRate };
  }).sort((a, b) => b.total - a.total);
  const brandName = r.clientData?.brand || "Your brand";
  const competitors = r.competitors || [];
  const painPoints = r.painPoints || [];
  const totalCited = allQueries.filter(q => q.bestStatus === "Cited").length;
  const totalMentioned = allQueries.filter(q => q.bestStatus === "Mentioned").length;
  const totalAbsent = allQueries.filter(q => q.bestStatus === "Absent").length;
  const totalQueries = allQueries.length || 1;
  const overallWinRate = Math.round(((totalCited + totalMentioned) / totalQueries) * 100);
  const getRecommendation = (cat) => {
    if (cat.winRate >= 70) return { type: "strong", text: `${brandName} dominates ${cat.name.toLowerCase()} queries. Maintain this position by keeping content fresh and authoritative.` };
    if (cat.winRate >= 40) return { type: "opportunity", text: `Mixed results on ${cat.name.toLowerCase()} queries \u2014 ${cat.absent} of ${cat.total} queries miss ${brandName}. Create targeted content for the gaps.` };
    return { type: "critical", text: `${brandName} is largely invisible for ${cat.name.toLowerCase()} queries. This is a priority gap \u2014 AI engines aren't associating your brand with these searches.` };
  };
  const recColors = { strong: { bg: "#f0fdf4", border: "#059669", text: "#166534" }, opportunity: { bg: "#fffbeb", border: "#d97706", text: "#92400e" }, critical: { bg: "#fef2f2", border: "#dc2626", text: "#991b1b" } };
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, color: C.text, margin: 0, fontFamily: "'Satoshi',-apple-system,sans-serif" }}>Visibility Map</h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Strategic overview of where {brandName} is visible and where the gaps are</p>
      </div>
      {/* Overview bar */}
      <div style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Overall Visibility</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{brandName} appears in {overallWinRate}% of tested AI engine queries</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, color: overallWinRate >= 60 ? "#059669" : overallWinRate >= 30 ? "#d97706" : "#dc2626", fontFamily: "'Satoshi',-apple-system,sans-serif" }}>{overallWinRate}%</div>
        </div>
        <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: C.bg, marginBottom: 8 }}>
          <div style={{ width: (totalCited / totalQueries * 100) + "%", background: "#22c55e", transition: "width .6s ease" }} title={"Cited: " + totalCited} />
          <div style={{ width: (totalMentioned / totalQueries * 100) + "%", background: "#3b82f6", transition: "width .6s ease" }} title={"Mentioned: " + totalMentioned} />
          <div style={{ width: (totalAbsent / totalQueries * 100) + "%", background: "#ef4444", transition: "width .6s ease" }} title={"Absent: " + totalAbsent} />
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.muted }}>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "#22c55e", marginRight: 4 }} />Cited: {totalCited}</span>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "#3b82f6", marginRight: 4 }} />Mentioned: {totalMentioned}</span>
          <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "#ef4444", marginRight: 4 }} />Absent: {totalAbsent}</span>
        </div>
      </div>
      {/* Category cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {categories.map((cat, ci) => {
          const isOpen = expandedCat === ci;
          const rec = getRecommendation(cat);
          const rc = recColors[rec.type];
          return (
            <div key={ci} style={{ background: "#fff", border: "1px solid " + (isOpen ? C.accent + "30" : C.border), borderRadius: 12, overflow: "hidden", transition: "all .2s" }}>
              <div onClick={() => setExpandedCat(isOpen ? null : ci)} style={{ padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{cat.total} queries tested</div>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: cat.winRate >= 60 ? "#f0fdf4" : cat.winRate >= 30 ? "#fffbeb" : "#fef2f2", border: "2px solid " + (cat.winRate >= 60 ? "#22c55e" : cat.winRate >= 30 ? "#f59e0b" : "#ef4444"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: cat.winRate >= 60 ? "#166534" : cat.winRate >= 30 ? "#92400e" : "#991b1b" }}>{cat.winRate}%</span>
                </div>
                <div style={{ display: "flex", gap: 8, fontSize: 11, flexShrink: 0 }}>
                  <span style={{ color: "#166534", fontWeight: 500 }}>{cat.cited} cited</span>
                  <span style={{ color: "#1e40af", fontWeight: 500 }}>{cat.mentioned} mentioned</span>
                  <span style={{ color: "#991b1b", fontWeight: 500 }}>{cat.absent} absent</span>
                </div>
                <span style={{ fontSize: 10, color: C.muted, flexShrink: 0 }}>{isOpen ? "\u25BC" : "\u25B6"}</span>
              </div>
              {isOpen && (
                <div style={{ padding: "0 20px 18px", borderTop: "1px solid " + C.borderSoft }}>
                  <div style={{ margin: "14px 0", padding: "12px 16px", background: rc.bg, borderRadius: 8, borderLeft: "3px solid " + rc.border }}>
                    <div style={{ fontSize: 10, fontWeight: 500, color: rc.text, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{rec.type === "strong" ? "Strength" : rec.type === "opportunity" ? "Opportunity" : "Priority Gap"}</div>
                    <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{rec.text}</div>
                  </div>
                  {cat.absent > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginBottom: 8 }}>Queries where {brandName} is absent:</div>
                      {cat.queries.filter(q => q.bestStatus === "Absent").map((q, qi) => (
                        <div key={qi} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fef2f2", borderRadius: 6, marginBottom: 4, fontSize: 12, color: "#991b1b" }}>
                          <span style={{ color: "#ef4444", flexShrink: 0 }}>&#x2717;</span>
                          <span style={{ flex: 1, color: C.sub }}>{q.query}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {cat.cited > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginBottom: 8 }}>Queries where {brandName} is cited:</div>
                      {cat.queries.filter(q => q.bestStatus === "Cited").map((q, qi) => (
                        <div key={qi} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f0fdf4", borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
                          <span style={{ color: "#22c55e", flexShrink: 0 }}>&#x2713;</span>
                          <span style={{ flex: 1, color: C.sub }}>{q.query}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {competitors.length > 0 && (
                    <div style={{ marginTop: 14, padding: "12px 14px", background: C.bg, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginBottom: 6 }}>How competitors perform on {cat.name.toLowerCase()} queries</div>
                      <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
                        {competitors.slice(0, 3).map(c => c.name).join(", ")} {competitors.length > 1 ? "are" : "is"} competing for the same {cat.name.toLowerCase()} queries.{cat.winRate < 50 ? ` Focus content creation on the ${cat.absent} absent queries above to close the gap.` : " Maintain your advantage with regular content updates."}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {painPoints.length > 0 && (
        <div style={{ marginTop: 24, background: "#fff", border: "1px solid " + C.border, borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>Website Signals Impacting Visibility</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>Category health scores from your website crawl data</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {painPoints.map((pp, i) => (
              <div key={i} style={{ padding: "10px 12px", background: C.bg, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: C.sub }}>{pp.label.split("/")[0].trim()}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: pp.severity === "critical" ? "#dc2626" : pp.severity === "warning" ? "#d97706" : "#059669" }}>{pp.score}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "#e5e7eb" }}>
                  <div style={{ width: Math.max(2, pp.score) + "%", height: 4, borderRadius: 2, background: pp.severity === "critical" ? "#ef4444" : pp.severity === "warning" ? "#f59e0b" : "#22c55e" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PAGE: INTENT PATHWAY ─── */
function IntentPage({r,goTo}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const[testQuery,setTestQuery]=useState("");
  const[testingPrompt,setTestingPrompt]=useState(false);
  const[testResults,setTestResults]=useState(null);
  const[testedPrompts,setTestedPrompts]=useState([]);

  // Build combined query data from engines
  const gptQueries=r.engines[0]?.queries||[];
  const gemQueries=r.engines[1]?.queries||[];
  const pplxQueries=r.engines[2]?.queries||[];
  const allSearchQueries=r.searchQueries||gptQueries.map(q=>q.query);

  const normalizeStatus=(s)=>{if(!s)return"Absent";const l=s.trim().toLowerCase();if(l==="cited")return"Cited";if(l==="mentioned")return"Mentioned";return"Absent";};
  const combinedQueries=allSearchQueries.map((query,i)=>{
    const qText=typeof query==="string"?query:query.query;
    const gptMatch=gptQueries.find(q=>q.query===qText)||gptQueries[i];
    const gemMatch=gemQueries.find(q=>q.query===qText)||gemQueries[i];
    const pplxMatch=pplxQueries.find(q=>q.query===qText)||pplxQueries[i];
    return{query:qText,gptStatus:normalizeStatus(gptMatch?.status),gemStatus:normalizeStatus(gemMatch?.status),pplxStatus:normalizeStatus(pplxMatch?.status),archetype:(r.queryArchetypeMap||{})[qText]||""};
  });

  // Status badge helper
  const statusBadge=(status)=>{
    const bg=status==="Cited"?"#dcfce7":status==="Mentioned"?"#dbeafe":"#fee2e2";
    const cl=status==="Cited"?"#166534":status==="Mentioned"?"#1e40af":"#991b1b";
    const icon=status==="Cited"?"\u2713":status==="Mentioned"?"~":"\u2717";
    return <span style={{fontSize:11,fontWeight:500,padding:"4px 10px",borderRadius:6,display:"inline-block",background:bg,color:cl}}>{icon} {status}</span>;
  };


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
      const[gptResult,gemResult,pplxResult,gaiResult]=await Promise.all([
        callOpenAISearch(query,region),
        callGeminiWithCitations(query,"You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them."),
        callPerplexity(query,"You are a helpful AI assistant. Answer the user's question directly and thoroughly. If you know of specific companies, products, or services relevant to the question, name them."),
        callGoogleAI(query,r.clientData?.region||"")
      ]);
      const gptText=gptResult?.text||gptResult||"";
      const gemText=gemResult?.text||gemResult||"";
      const pplxText=pplxResult?.text||pplxResult||"";
      const gaiText=gaiResult?.text||gaiResult||"";
      const gptClass=classifyText(gptText,brand,website,gptResult?.citations||[]);
      const gemClass=classifyText(gemText,brand,website,gemResult?.citations||[]);
      const pplxClass=classifyText(pplxText,brand,website,pplxResult?.citations||[]);
      const gaiClass=classifyText(gaiText,brand,website,gaiResult?.citations||[]);
      const result={
        gpt:gptClass,
        gem:gemClass,
        pplx:pplxClass,
        gai:gaiClass,
        gptSnippet:(typeof gptText==="string"?gptText:"").slice(0,300),
        gemSnippet:(typeof gemText==="string"?gemText:"").slice(0,300),
        pplxSnippet:(typeof pplxText==="string"?pplxText:"").slice(0,300),
        gaiSnippet:(typeof gaiText==="string"?gaiText:"").slice(0,300)
      };
      setTestResults(result);
      setTestedPrompts(prev=>[{query,...result},...prev].slice(0,10));
      setTestQuery("");
    }catch(e){
      console.error("Test prompt failed:",e);
      setTestResults({gpt:"Error",gem:"Error",pplx:"Error",gai:"Error",gptSnippet:"API call failed",gemSnippet:"API call failed",pplxSnippet:"API call failed",gaiSnippet:"API call failed"});
    }
    setTestingPrompt(false);
  }

  return(<div>
    {/* Header */}
    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Query Results</h2>
      <p style={{color:"#6b7280",fontSize:13,marginTop:4}}>Audit query results across ChatGPT, Gemini, Perplexity, and Google AI for {r.clientData.brand}</p>
    </div>

    {/* Overall summary */}
    <div style={{...CARD.base,marginBottom:32}}>
      <div style={{fontSize:14,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Query Visibility Summary</div>
      <div style={{fontSize:12,color:C.muted,marginTop:2}}>{combinedQueries.length} prompts tested across all engines</div>
    </div>

    {/* Audit Query Results — flat table */}
    <div style={{fontSize:14,fontWeight:500,marginBottom:16}}>Audit Query Results</div>

    {combinedQueries.length===0?<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:24,textAlign:"center",color:C.muted,fontSize:13}}>No query data available. Run an audit to see results.</div>
    :<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 80px 80px",padding:"12px 20px",borderBottom:"1px solid "+C.border,fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em"}}>
        <span>Query</span>
        <span style={{textAlign:"center"}}>ChatGPT</span>
        <span style={{textAlign:"center"}}>Gemini</span>
        <span style={{textAlign:"center"}}>Perplexity</span>
        <span style={{textAlign:"center"}}>Google AI</span>
      </div>
      {combinedQueries.map((q,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 80px 80px",padding:"14px 20px",alignItems:"center",borderBottom:i<combinedQueries.length-1?"1px solid "+C.border+"30":"none",background:i%2===0?"transparent":C.border+"10"}}>
        <span style={{fontSize:13,lineHeight:1.5,color:C.text,paddingRight:12}}>{q.query}{q.archetype&&<span style={{display:"inline-block",fontSize:9,fontWeight:500,padding:"2px 7px",borderRadius:4,background:C.accent+"10",color:C.accent,marginLeft:8,verticalAlign:"middle",whiteSpace:"nowrap"}}>{q.archetype}</span>}</span>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.gptStatus)}</div>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.gemStatus)}</div>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.pplxStatus)}</div>
        <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(q.gaiStatus||"Absent")}</div>
      </div>))}
    </div>}

    {/* Section B: Test a Prompt */}
    <div style={{marginTop:40,...CARD.base}}>
      <div style={{fontSize:15,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em",color:C.text,marginBottom:4}}>Test a Prompt</div>
      <p style={{fontSize:12,color:C.muted,marginBottom:16,marginTop:0}}>Type any search query to test whether {r.clientData.brand} gets cited or mentioned on ChatGPT, Gemini, Perplexity, and Google AI.</p>

      <div style={{display:"flex",gap:8}}>
        <input value={testQuery} onChange={e=>setTestQuery(e.target.value)}
          placeholder={`e.g. What are the best ${r.clientData.industry||"tech"} options in ${r.clientData.region||"my region"}?`}
          style={{flex:1,padding:"10px 14px",fontSize:13,border:`1px solid ${C.border}`,borderRadius:10,outline:"none",fontFamily:"inherit",color:C.text}}
          onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}
          onKeyDown={e=>e.key==="Enter"&&testQuery.trim()&&handleTestPrompt()}/>
        <button onClick={handleTestPrompt} disabled={!testQuery.trim()||testingPrompt}
          style={{padding:"10px 20px",fontSize:13,fontWeight:500,fontFamily:"'Satoshi',-apple-system,sans-serif",
            background:testQuery.trim()&&!testingPrompt?C.accent:"#e5e7eb",
            color:testQuery.trim()&&!testingPrompt?"#fff":"#999",
            border:"none",borderRadius:10,cursor:testQuery.trim()&&!testingPrompt?"pointer":"default",
            display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
          {testingPrompt?<><div style={{width:12,height:12,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>Testing...</>:"Test"}
        </button>
      </div>

      {/* Test results */}
      {testResults&&<div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
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
        <div style={{padding:14,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Perplexity</div>
          {statusBadge(testResults.pplx)}
          {testResults.pplxSnippet&&<p style={{fontSize:11,color:C.muted,lineHeight:1.5,maxHeight:100,overflow:"auto",margin:"8px 0 0"}}>{testResults.pplxSnippet}</p>}
        </div>
        <div style={{padding:14,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Google AI Mode</div>
          {statusBadge(testResults.gai)}
          {testResults.gaiSnippet&&<p style={{fontSize:11,color:C.muted,lineHeight:1.5,maxHeight:100,overflow:"auto",margin:"8px 0 0"}}>{testResults.gaiSnippet}</p>}
        </div>
      </div>}

      {/* History of tested prompts */}
      {testedPrompts.length>0&&<div style={{marginTop:16}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>Previously tested</div>
        {testedPrompts.map((tp,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 80px 80px",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.border}30`,alignItems:"center"}}>
          <span style={{fontSize:12,color:C.text}}>{tp.query}</span>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.gpt)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.gem)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.pplx)}</div>
          <div style={{display:"flex",justifyContent:"center"}}>{statusBadge(tp.gai||"Absent")}</div>
        </div>))}
      </div>}
    </div>
  </div>);
}

/* ─── PAGE: CITATION SOURCES ─── */
function CitationSourcesPage({ r }) {
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const [activeTab, setActiveTab] = useState("all");
  const [expandedDomain, setExpandedDomain] = useState(null);
  const [hideCompetitors, setHideCompetitors] = useState(true);

  const cs = r?.citationSources || { gpt: [], gemini: [], all: [] };
  const brandName = r?.clientData?.brand || "Your brand";

  // Build competitor domain detection
  const compDomainParts = React.useMemo(() => {
    const parts = new Set();
    (r?.competitors || []).forEach(c => {
      const name = (c.name || "").toLowerCase().replace(/\s+/g, "");
      const website = c.website || "";
      if (website) {
        try {
          const h = new URL(website.startsWith("http") ? website : "https://" + website).hostname.replace("www.", "").toLowerCase();
          parts.add(h);
          h.split(".").slice(0, -1).forEach(p => { if (p.length > 3) parts.add(p); });
        } catch(e) {}
      }
      if (name.length > 3) parts.add(name);
    });
    return parts;
  }, [r?.competitors]);
  const isCompDomain = (domain) => {
    const d = (domain || "").toLowerCase();
    for (const comp of compDomainParts) {
      if (d.includes(comp) || comp.includes(d.split(".")[0])) return true;
    }
    return false;
  };

  // Build sources list from the actual data shape
  const sources = (cs.all || []).map(s => {
    let url = s.url || "";
    // Handle Gemini proxy URLs in display
    if (url.includes("vertexaisearch.cloud.google.com") || url.includes("grounding-api-redirect")) {
      if (s.title && !s.title.includes(" ") && s.title.includes(".")) url = "https://" + s.title.replace(/^(https?:\/\/)?/,"").replace(/^www\./,"");
      else return null;
    }
    const domain = (() => { try { return new URL(url).hostname.replace("www.", ""); } catch(e) { return ""; } })();
    if (!domain || domain.length < 3 || domain === "unknown") return null;
    return {
      ...s, url,
      engine: s.engine === "chatgpt" ? "ChatGPT" : s.engine === "gemini" ? "Gemini" : s.engine === "perplexity" ? "Perplexity" : s.engine === "googleai" ? "Google AI" : s.engine,
      domain
    };
  }).filter(Boolean);

  // Filter by tab and competitor toggle
  const tabFiltered = activeTab === "all" ? sources
    : activeTab === "chatgpt" ? sources.filter(s => s.engine === "ChatGPT")
    : activeTab === "gemini" ? sources.filter(s => s.engine === "Gemini")
    : activeTab === "perplexity" ? sources.filter(s => s.engine === "Perplexity")
    : sources.filter(s => s.engine === "Google AI");
  const filtered = hideCompetitors ? tabFiltered.filter(s => !isCompDomain(s.domain)) : tabFiltered;

  // Group by domain
  const domainMap = {};
  filtered.forEach(s => {
    const d = s.domain;
    if (!domainMap[d]) domainMap[d] = { domain: d, entries: [], chatgpt: 0, gemini: 0, perplexity: 0, googleai: 0 };
    domainMap[d].entries.push(s);
    if (s.engine === "ChatGPT") domainMap[d].chatgpt++;
    else if (s.engine === "Gemini") domainMap[d].gemini++;
    else if (s.engine === "Google AI") domainMap[d].googleai++;
    else domainMap[d].perplexity++;
  });

  const domains = Object.values(domainMap).filter(d => d.entries.length >= 2).sort((a, b) => b.entries.length - a.entries.length);
  const statSources = filtered;
  const totalSources = statSources.length;
  const uniqueDomains = domains.length;
  const chatgptSources = statSources.filter(s => s.engine === "ChatGPT").length;
  const geminiSources = statSources.filter(s => s.engine === "Gemini").length;
  const pplxSources = statSources.filter(s => s.engine === "Perplexity").length;
  const gaiSources = statSources.filter(s => s.engine === "Google AI").length;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: C.text, margin: 0, fontFamily: "'Satoshi',-apple-system,sans-serif" }}>Citation Sources</h2>
          <InfoTip text="The actual websites and domains that AI engines reference when answering queries about your industry. Shows which sources each engine pulls from and how often."/>
        </div>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>The sources AI engines trust when talking about {brandName}</p>
      </div>

      <div style={{ marginBottom: 24, padding: "16px 20px", background: "#fff", border: "1px solid " + C.border, borderRadius: 10, minHeight: 70 }}>
        {r.narratives?.citationSources ? (
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.7 }}>{r.narratives.citationSources}</div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 48 }}><div style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>Generating insights...</div></div>
        )}
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Unique Sources", value: uniqueDomains, color: C.text },
          { label: "Unique Domains", value: uniqueDomains, color: C.accent },
          { label: "From ChatGPT", value: chatgptSources, color: "#10A37F" },
          { label: "From Gemini", value: geminiSources, color: "#4285F4" },
          { label: "From Perplexity", value: pplxSources, color: "#20808D" },
          { label: "From Google AI", value: gaiSources, color: "#EA4335" }
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 12, padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 500, fontFamily: "'Satoshi',-apple-system,sans-serif", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tab filter */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid " + C.border }}>
        {[
          { id: "all", label: "All Sources" },
          { id: "chatgpt", label: "ChatGPT Sources" },
          { id: "gemini", label: "Gemini Sources" },
          { id: "perplexity", label: "Perplexity Sources" },
          { id: "googleai", label: "Google AI Sources" }
        ].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setExpandedDomain(null); }} style={{
            padding: "8px 16px", fontSize: 12, fontWeight: activeTab === tab.id ? 500 : 400,
            color: activeTab === tab.id ? C.text : C.muted, background: "none", border: "none",
            borderBottom: activeTab === tab.id ? "2px solid " + C.accent : "2px solid transparent",
            cursor: "pointer", fontFamily: "'Satoshi',-apple-system,sans-serif", transition: "all .15s"
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Competitor toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setHideCompetitors(!hideCompetitors)} style={{
          padding: "5px 12px", fontSize: 11, borderRadius: 6,
          background: hideCompetitors ? "transparent" : "#fee2e2",
          color: hideCompetitors ? C.muted : "#dc2626",
          border: "1px solid " + (hideCompetitors ? C.border : "#fecaca"),
          cursor: "pointer", fontFamily: "inherit", fontWeight: hideCompetitors ? 400 : 500,
          transition: "all .15s"
        }}>
          {hideCompetitors ? "Show Competitor Domains" : "Showing Competitor Domains"}
        </button>
      </div>

      {/* Domain list */}
      {domains.length > 0 ? (
        <div style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 60px 60px", padding: "10px 20px", borderBottom: "1px solid " + C.border, background: C.bg }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>Source Domain</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textAlign: "center" }}>Citations</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textAlign: "center" }}>ChatGPT</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textAlign: "center" }}>Gemini</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textAlign: "center" }}>Perplexity</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textAlign: "center" }}>Google AI</span>
          </div>

          {/* Rows */}
          {domains.map((d, i) => {
            const isOpen = expandedDomain === i;
            return (
              <div key={i}>
                <div onClick={() => setExpandedDomain(isOpen ? null : i)} style={{
                  display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 60px 60px", padding: "14px 20px",
                  borderBottom: i < domains.length - 1 || isOpen ? "1px solid " + C.borderSoft : "none",
                  cursor: "pointer", transition: "background .15s",
                  background: isOpen ? C.bg : "transparent"
                }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = C.bg; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = isOpen ? C.bg : "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ transition: "transform .15s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}><path d="M3 1l4 4-4 4" stroke={C.muted} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 13, fontWeight: 500, color: C.accent }}>{d.domain}</span>
                    {isCompDomain(d.domain) && <span style={{ fontSize: 9, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: "#fee2e2", color: "#dc2626", marginLeft: 6 }}>Competitor</span>}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: C.text }}>{d.entries.length}</div>
                  <div style={{ textAlign: "center", fontSize: 13, color: d.chatgpt > 0 ? "#10A37F" : C.muted }}>{d.chatgpt || "-"}</div>
                  <div style={{ textAlign: "center", fontSize: 13, color: d.gemini > 0 ? "#4285F4" : C.muted }}>{d.gemini || "-"}</div>
                  <div style={{ textAlign: "center", fontSize: 13, color: d.perplexity > 0 ? "#20808D" : C.muted }}>{d.perplexity || "-"}</div>
                  <div style={{ textAlign: "center", fontSize: 13, color: d.googleai > 0 ? "#EA4335" : C.muted }}>{d.googleai || "-"}</div>
                </div>

                {/* Expanded: show individual citations */}
                {isOpen && (
                  <div style={{ padding: "8px 20px 16px 40px", background: C.bg, borderBottom: i < domains.length - 1 ? "1px solid " + C.borderSoft : "none" }}>
                    {d.entries.map((entry, ei) => (
                      <div key={ei} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: "#fff", borderRadius: 8, border: "1px solid " + C.borderSoft, marginBottom: 4 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <a href={entry.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: C.accent, textDecoration: "none", lineHeight: 1.5, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.title || entry.url}</a>
                          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>Query: {entry.query}</div>
                        </div>
                        <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                          <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: entry.engine === "ChatGPT" ? "#10A37F15" : entry.engine === "Gemini" ? "#4285F415" : entry.engine === "Google AI" ? "#EA433515" : "#20808D15", color: entry.engine === "ChatGPT" ? "#10A37F" : entry.engine === "Gemini" ? "#4285F4" : entry.engine === "Google AI" ? "#EA4335" : "#20808D" }}>{entry.engine}</span>
                          {(() => { const ek = entry.engine === "ChatGPT" ? "gpt" : entry.engine === "Gemini" ? "gemini" : entry.engine === "Perplexity" ? "perplexity" : "googleai"; const isBrand = (cs[ek] || []).some(b => b.url === entry.url || (b.query === entry.query && b.title === entry.title)); return (<span style={{ fontSize: 9, fontWeight: 500, padding: "2px 6px", borderRadius: 4, background: isBrand ? "#dcfce7" : "#fef3c7", color: isBrand ? "#166534" : "#92400e" }}>{isBrand ? "Your Brand" : "Competitor"}</span>); })()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid " + C.border, borderRadius: 12, padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.muted }}>No citation sources found. This may indicate AI engines answered from training data rather than web sources.</div>
        </div>
      )}

      {/* Methodology note */}
      <div style={{ marginTop: 16, fontSize: 11, color: C.muted, padding: "0 4px", lineHeight: 1.5 }}>
        Citation sources are extracted from real-time web searches performed by ChatGPT, Gemini, Perplexity, and Google AI during the audit. These are the actual URLs each engine referenced when generating its response.
      </div>
    </div>
  );
}

/* ─── PAGE: BRAND PLAYBOOK ─── */
function PlaybookPage({r,goTo,activeProject}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
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
    <button onClick={onClick} disabled={saving} style={{padding:"8px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",opacity:saving?.6:1}}>{saving?"Saving...":"Save"}</button>
  </div>);

  const aiLink=(onClick)=>(<span onClick={generating?undefined:onClick} style={{fontSize:12,fontWeight:500,color:generating?C.muted:C.accent,cursor:generating?"default":"pointer",marginLeft:8,display:"inline-flex",alignItems:"center",gap:4}}>{generating?"Generating...":"AI Generate"}</span>);

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
        <button onClick={()=>{addToList(section,field,inp);setInp("");}} style={{padding:"8px 14px",background:`${c}10`,color:c,border:`1px solid ${c}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",whiteSpace:"nowrap"}}>+ Add</button>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Brand Voice & Tone{aiLink(genVoice)}</h3>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Taglines & Messaging{aiLink(genTaglines)}</h3>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Visual Corporate Identity{aiLink(genVisual)}</h3>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Compliance & Restrictions{aiLink(genCompliance)}</h3>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Products & Services</h3>
          <button onClick={()=>startEdit(null,"new")} style={{padding:"6px 14px",background:`${C.accent}10`,color:C.accent,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>+ Add Product</button>
        </div>
        {editProduct!==null&&<div style={{padding:14,background:C.bg,borderRadius:C.rs,border:`1px solid ${C.accent}25`,marginBottom:14}}>
          <div style={{marginBottom:8}}><label style={labelStyle}>Product Name</label><input value={prodForm.name} onChange={e=>setProdForm({...prodForm,name:e.target.value})} placeholder="e.g. Enterprise Analytics Suite" style={inputStyle}/></div>
          <div style={{marginBottom:8}}><label style={labelStyle}>Description</label><textarea value={prodForm.description} onChange={e=>setProdForm({...prodForm,description:e.target.value})} placeholder="Brief product description..." rows={2} style={{...inputStyle,resize:"vertical"}}/></div>
          <div style={{marginBottom:8}}>
            <label style={labelStyle}>Features (press Enter to add)</label>
            <div style={{display:"flex",gap:6,marginBottom:6}}>
              <input value={featureInput} onChange={e=>setFeatureInput(e.target.value)} placeholder="e.g. Real-time dashboards" onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();if(featureInput.trim()){setProdForm({...prodForm,features:[...prodForm.features,featureInput.trim()]});setFeatureInput("");}}}} style={{...inputStyle,flex:1}}/>
              <button onClick={()=>{if(featureInput.trim()){setProdForm({...prodForm,features:[...prodForm.features,featureInput.trim()]});setFeatureInput("");}}} style={{padding:"8px 14px",background:`${C.accent}10`,color:C.accent,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>+ Add</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{prodForm.features.map((f,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",background:`${C.accent}08`,color:C.accent,borderRadius:100,fontSize:11}}>{f}<span onClick={()=>setProdForm({...prodForm,features:prodForm.features.filter((_,j)=>j!==i)})} style={{cursor:"pointer",opacity:.6,fontSize:13}}>×</span></span>))}</div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button onClick={()=>{setEditProduct(null);setProdForm({name:"",description:"",features:[]});setFeatureInput("");}} style={{padding:"6px 14px",background:C.bg,color:C.sub,border:`1px solid ${C.border}`,borderRadius:6,fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Cancel</button>
            <button onClick={saveProd} style={{padding:"6px 14px",background:C.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Save Product</button>
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
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Competitive Positioning{aiLink(genPositioning)}</h3>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Brand Playbook</h2><p style={{color:"#6b7280",fontSize:13,marginTop:3}}>Your brand hub — identity, voice, and AI-optimised guidelines</p></div>
    <SectionNote text="This is your central brand hub. Define your brand voice, manage compliance, and set guidelines. Everything here powers your content generation and AI engine strategy."/>

    {/* Tab Bar */}
    <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {TABS.map(tab=>(<button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",background:"transparent",border:"none",borderBottom:activeTab===tab.id?`2px solid ${C.accent}`:"2px solid transparent",color:activeTab===tab.id?C.accent:C.muted,fontSize:12,fontWeight:activeTab===tab.id?600:500,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",whiteSpace:"nowrap",transition:"all .15s"}}>{tab.label}</button>))}
    </div>

    {/* Loading state */}
    {loading&&<div style={{textAlign:"center",padding:40,color:C.muted,fontSize:13}}>Loading playbook...</div>}

    {/* No project guard */}
    {!projectId&&!loading&&<Card style={{marginBottom:16,textAlign:"center",padding:32}}>
      <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>No project linked yet</div>
      <div style={{fontSize:12,color:C.muted}}>Save an audit first to start building your brand playbook.</div>
    </Card>}

    {/* Tab content */}
    {!loading&&projectId&&<div style={{marginBottom:16}}>{renderTab()}</div>}

    {/* Brand Guidelines - expandable (always shown when results available) */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:15,fontWeight:600,color:C.text,margin:"0 0 4px",fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Brand Guidelines</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>{r.brandGuidelines.length} technical guidelines for maximising AI engine citation rate. Click to expand.</p>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {r.brandGuidelines.map((g,i)=>{const isOpen=expandG===i;return(<div key={i} style={{borderRadius:C.rs,border:`1px solid ${isOpen?`${C.accent}25`:C.border}`,overflow:"hidden",transition:"all .15s"}}>
          <div onClick={()=>setExpandG(isOpen?null:i)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,background:isOpen?`${C.accent}03`:"transparent"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><span style={{fontSize:11,fontWeight:700,color:C.accent,fontFamily:"'Satoshi',-apple-system,sans-serif",background:`${C.accent}08`,padding:"2px 8px",borderRadius:4}}>G{String(i+1).padStart(2,"0")}</span><span style={{fontSize:13,fontWeight:500,color:C.text}}>{g.area}</span></div>
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
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const cleanQuoteText=(text)=>{if(!text)return"";return text.replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/https?:\/\/[^\s)]+/g,"").replace(/\*\*([^*]*)\*\*/g,"$1").replace(/\*([^*]*)\*/g,"$1").replace(/^#{1,6}\s*/gm,"").replace(/^[-*]{3,}\s*$/gm,"").replace(/^\s*[-*+]\s+/gm,"").replace(/^\s*\d+\.\s+/gm,"").replace(/\(\s*\)/g,"").replace(/\s{2,}/g," ").replace(/^\s*[-\u2013\u2014]+\s*/g,"").replace(/\s*[-\u2013\u2014]+\s*$/g,"").trim();};
  const[activeTab,setActiveTab]=useState("all");
  const[visibleCount,setVisibleCount]=useState(10);
  const signals=r?.sentimentSignals||{};
  const brandMentions=signals.brandMentions||signals.quotes||[];
  const themes=signals.themes||[];
  const totalResponses=signals.totalResponses||60;
  const mentionCount=signals.mentionCount||brandMentions.length;
  const brandName=r?.clientData?.brand||"Your brand";
  const sentData=r?.sentiment?.brand||{};
  const posCount=sentData.posCount||brandMentions.filter(m=>m.sentiment==="positive").length;
  const negCount=sentData.negCount||brandMentions.filter(m=>m.sentiment==="negative").length;
  const neuCount=sentData.neuCount||brandMentions.filter(m=>m.sentiment==="neutral").length;
  const posPercent=sentData.posPercent||(mentionCount>0?Math.round((posCount/mentionCount)*100):0);
  const negPercent=sentData.negPercent||(mentionCount>0?Math.round((negCount/mentionCount)*100):0);
  const compSentiment=r?.sentiment?.competitors||[];
  const filteredMentions=activeTab==="all"?brandMentions:brandMentions.filter(m=>m.sentiment===activeTab);
  return(<div>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Sentiment Analysis</h2>
        <InfoTip text="How AI engines describe your brand in their responses. This is engine sentiment \u2014 what ChatGPT, Gemini, Perplexity, and Google AI say about you \u2014 not social media sentiment."/>
      </div>
      <p style={{fontSize:13,color:C.muted,marginTop:4}}>Extracted from {totalResponses} AI engine responses across {(r.engines||[]).length} engines</p>
    </div>

    {r.narratives?.sentiment&&(
      <div style={{marginBottom:24,...CARD.base,borderRadius:10,minHeight:70}}>
        <div style={{fontSize:13,color:C.sub,lineHeight:1.7}}>{r.narratives.sentiment}</div>
      </div>
    )}

    {/* Quantified overview */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
      {/* Brand sentiment */}
      <div style={{...CARD.base}}>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:".01em",marginBottom:16}}>
          {brandName} Engine Sentiment
          <InfoTip text="Based on language analysis of every AI engine response that mentions your brand. Each mention is classified by the tone of surrounding text."/>
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:16}}>
          <span style={{fontSize:36,fontWeight:500,color:posPercent>=60?"#059669":posPercent>=40?"#d97706":"#dc2626",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{posPercent}%</span>
          <span style={{fontSize:13,color:C.muted}}>positive sentiment</span>
        </div>
        <div style={{fontSize:12,color:C.sub,marginBottom:16}}>
          {posCount} positive, {negCount} negative, {neuCount} neutral out of {mentionCount} mentions across {totalResponses} queries
        </div>
        {/* Stacked bar */}
        <div style={{display:"flex",height:8,borderRadius:4,overflow:"hidden",background:C.bg,marginBottom:8}}>
          {posCount>0&&<div style={{width:(posCount/Math.max(mentionCount,1)*100)+"%",background:"#22c55e"}}/>}
          {neuCount>0&&<div style={{width:(neuCount/Math.max(mentionCount,1)*100)+"%",background:"#f59e0b"}}/>}
          {negCount>0&&<div style={{width:(negCount/Math.max(mentionCount,1)*100)+"%",background:"#ef4444"}}/>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted}}>
          <span><span style={{color:"#22c55e",fontWeight:500}}>{posCount}</span> Positive</span>
          <span><span style={{color:"#f59e0b",fontWeight:500}}>{neuCount}</span> Neutral</span>
          <span><span style={{color:"#ef4444",fontWeight:500}}>{negCount}</span> Negative</span>
        </div>
      </div>

      {/* Competitor comparison */}
      <div style={{...CARD.base}}>
        <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:".01em",marginBottom:16}}>
          Competitor Comparison
          <InfoTip text="Same methodology applied to every competitor. Shows what percentage of their AI engine mentions are positive."/>
        </div>
        {/* Brand first */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid "+C.borderSoft}}>
          <div>
            <span style={{fontSize:13,fontWeight:500,color:C.text}}>{brandName}</span>
            <span style={{fontSize:10,color:C.muted,marginLeft:6}}>{mentionCount} mentions</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:80,height:6,borderRadius:3,background:C.bg}}>
              <div style={{width:posPercent+"%",height:6,borderRadius:3,background:"#22c55e"}}/>
            </div>
            <span style={{fontSize:13,fontWeight:500,color:"#059669",minWidth:36,textAlign:"right"}}>{posPercent}%</span>
          </div>
        </div>
        {compSentiment.filter(c=>c.name&&c.name.toLowerCase()!==brandName.toLowerCase()).map((comp,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<compSentiment.length-2?"1px solid "+C.borderSoft:"none"}}>
            <div>
              <span style={{fontSize:13,fontWeight:500,color:C.text}}>{comp.name}</span>
              <span style={{fontSize:10,color:C.muted,marginLeft:6}}>{comp.mentionCount||0} mentions</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:80,height:6,borderRadius:3,background:C.bg}}>
                <div style={{width:(comp.posPercent||0)+"%",height:6,borderRadius:3,background:"#22c55e"}}/>
              </div>
              <span style={{fontSize:13,fontWeight:500,color:(comp.posPercent||0)>=60?"#059669":(comp.posPercent||0)>=40?"#d97706":"#dc2626",minWidth:36,textAlign:"right"}}>{comp.posPercent||0}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>



    {/* Full evidence quotes */}
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Engine Quotes</div>
          <div style={{fontSize:12,color:C.muted,marginTop:2}}>What AI engines actually say about {brandName} {"\u2014"} filtered by sentiment, tagged by theme</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:"1px solid "+C.border}}>
        {[
          {id:"all",label:"All ("+brandMentions.length+")"},
          {id:"positive",label:"Positive ("+posCount+")"},
          {id:"negative",label:"Negative ("+negCount+")"},
          {id:"neutral",label:"Neutral ("+neuCount+")"}
        ].map(tab=>(
          <button key={tab.id} onClick={()=>{setActiveTab(tab.id);setVisibleCount(10);}} style={{
            padding:"8px 16px",fontSize:12,fontWeight:activeTab===tab.id?500:400,
            color:activeTab===tab.id?C.text:C.muted,background:"none",border:"none",
            borderBottom:activeTab===tab.id?"2px solid "+C.accent:"2px solid transparent",
            cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Quote cards */}
      {filteredMentions.length>0?(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filteredMentions.slice(0,visibleCount).map((mention,i)=>{
            const sBorder=mention.sentiment==="positive"?"#059669":mention.sentiment==="negative"?"#dc2626":"#d97706";
            const sBg=mention.sentiment==="positive"?"#f0fdf4":mention.sentiment==="negative"?"#fef2f2":"#fffbeb";
            const sColor=mention.sentiment==="positive"?"#059669":mention.sentiment==="negative"?"#dc2626":"#d97706";
            const engineColors={"ChatGPT":"#10A37F","Gemini":"#4285F4","Perplexity":"#20808D","Google AI Overview":"#EA4335"};
            return(
              <div key={i} style={{...CARD.base,borderRadius:10,borderLeft:"3px solid "+sBorder,padding:"14px 18px"}}>
                <div style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:10,fontStyle:"italic"}}>
                  "{cleanQuoteText(mention.text)}"
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,fontSize:11}}>
                  <span style={{padding:"2px 8px",borderRadius:4,background:(engineColors[mention.engine]||C.accent)+"10",color:engineColors[mention.engine]||C.accent,fontWeight:500}}>{mention.engine}</span>
                  <span style={{color:C.muted}}>{mention.query}</span>
                  {mention.theme&&(
                    <span style={{padding:"2px 6px",borderRadius:4,background:"#f1f5f9",color:"#475569",fontSize:10,fontWeight:500}}>{mention.theme}</span>
                  )}
                </div>
              </div>
            );
          })}
          {filteredMentions.length>visibleCount&&(
            <button onClick={()=>setVisibleCount(v=>Math.min(v+10,filteredMentions.length))} style={{width:"100%",padding:"12px",background:"none",border:"1px solid "+C.border,borderRadius:8,fontSize:12,color:C.accent,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",marginTop:8}}>
              Show more ({Math.min(visibleCount,filteredMentions.length)} of {filteredMentions.length})
            </button>
          )}
        </div>
      ):(
        <div style={{...CARD.base,padding:"40px 20px",textAlign:"center"}}>
          <div style={{fontSize:13,color:C.muted}}>No {activeTab!=="all"?activeTab+" ":""}mentions found in AI engine responses</div>
        </div>
      )}
    </div>
  </div>);
}
/* ─── PAGE: TARGET CHANNELS (citation-based) ─── */
function TargetChannelsPage({r}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const gaps=r.verifiedChannelGaps||[];
  const brandName=r.clientData?.brand||"Your brand";
  return(<div>
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Target Channels</h2>
        <InfoTip text={"Platforms where AI engines source information for your industry but "+brandName+" has no active presence. Each platform was verified via web search during the audit. Only actionable, relevant gaps are shown."}/>
      </div>
      <p style={{fontSize:13,color:C.muted,marginTop:4}}>Verified platform gaps where {brandName} can improve AI engine visibility</p>
    </div>

    {/* Summary */}
    <div style={{...CARD.base,marginBottom:24}}>
      <div style={{fontSize:13,color:C.sub,lineHeight:1.7}}>
        {gaps.length>0
          ?"We identified "+gaps.length+" platform"+(gaps.length!==1?"s":"")+" where AI engines actively source information for your industry, but "+brandName+" has no presence. Each gap was verified via web search \u2014 these are real, actionable opportunities."
          :"No verified platform gaps found. "+brandName+" appears to have presence across the key platforms that AI engines reference for your industry."
        }
      </div>
    </div>

    {/* Gap cards */}
    {gaps.length>0?(
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {gaps.map((gap,i)=>(
          <div key={i} style={{...CARD.base}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:14,fontWeight:500,color:C.accent,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{i+1}. {gap.domain}</span>{gap.uncertain&&<span style={{fontSize:9,fontWeight:500,padding:"2px 6px",borderRadius:4,background:"#fef3c7",color:"#92400e",marginLeft:6}}>Unverified</span>}
              </div>
              <span style={{fontSize:11,color:C.muted,padding:"3px 10px",background:C.bg,borderRadius:6}}>
                {gap.citations} citation{gap.citations!==1?"s":""} in audit
              </span>
            </div>
            {gap.description&&(
              <div style={{fontSize:12,color:C.sub,lineHeight:1.6,marginBottom:10}}>
                {gap.description}
              </div>
            )}
            {gap.action&&(
              <div style={{fontSize:12,color:"#1e40af",lineHeight:1.5,padding:"10px 14px",background:"#eff6ff",borderRadius:8,borderLeft:"3px solid #3b82f6"}}>
                <span style={{fontWeight:500}}>Recommended action:</span> {gap.action}
              </div>
            )}
          </div>
        ))}
      </div>
    ):(
      <div style={{...CARD.base,padding:"48px 20px",textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:12}}>{String.fromCharCode(10003)}</div>
        <div style={{fontSize:15,fontWeight:500,color:"#059669",marginBottom:4}}>No Platform Gaps Detected</div>
        <div style={{fontSize:12,color:C.muted}}>{brandName} has presence across all key platforms referenced by AI engines</div>
      </div>
    )}

    {/* Methodology note */}
    <div style={{marginTop:20,fontSize:11,color:C.muted,lineHeight:1.5}}>
      Methodology: The top 20 most-cited third-party domains from your audit were verified via web search. Competitor-owned platforms, irrelevant domains, and platforms where {brandName} already has a presence were filtered out. Only actionable gaps are shown.
    </div>
  </div>);
}

/* ─── PAGE: CONTENT HUB ─── */
function ContentHubPage({r,goTo,activeProject,onUpdate}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
  const TABS=[{id:"grid",label:"Grid"},{id:"suggested",label:"Suggested"},{id:"create",label:"Create"},{id:"library",label:"Library"}];
  const[activeTab,setActiveTab]=useState("grid");
  const[contentLibrary,setContentLibrary]=useState([]);
  const[loading,setLoading]=useState(true);
  const[generatingIdx,setGeneratingIdx]=useState(null);const[seoMarkup,setSeoMarkup]=useState("");const[generatingSeo,setGeneratingSeo]=useState(false);
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
    {id:"blog",label:"Blog Article",desc:"Long-form SEO-optimized article (800-1500 words)"},
    {id:"faq",label:"FAQ Page",desc:"Question & answer format (8-12 questions)"},
    {id:"comparison",label:"Comparison Page",desc:"Balanced analysis vs competitors"},
    {id:"howto",label:"How-To Guide",desc:"Step-by-step instructions"},
    {id:"casestudy",label:"Case Study",desc:"Results-focused success story"},
    {id:"social",label:"Social Post",desc:"Single platform social content"},
    {id:"socialseries",label:"Social Series",desc:"Multi-platform post series (5 posts)"},
    {id:"email",label:"Email Newsletter",desc:"Email content with subject line and CTA"},
    {id:"video",label:"Video Script",desc:"Script with scenes, narration, and visual notes"},
    {id:"landing",label:"Landing Page",desc:"Conversion-focused copy with CTA"},
    {id:"pressrelease",label:"Press Release",desc:"Formal newsworthy announcement"},
    {id:"schema",label:"Schema Markup",desc:"JSON-LD structured data snippets"}
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
    if(tags.supporting?.length)ctx+=`Supporting value propositions: ${(tags.supporting||[]).join("; ")}. `;
    const pos=playbook?.positioning||[];
    if(pos.length)ctx+=`Positioning statements: ${pos.join("; ")}. `;
    const vis=playbook?.visual_ci||{};
    if(vis.primaryColor||vis.fonts?.length)ctx+=`Visual identity: primary color ${vis.primaryColor||"N/A"}, fonts: ${(vis.fonts||[]).join(", ")||"N/A"}. `;
    return ctx||"No brand playbook data available — use professional, neutral tone.";
  }

  async function generateContent(type,topic,channel,sourceQuery,sourceRoadmapItem,cardIdx){
    setGeneratingIdx(cardIdx!=null?cardIdx:"create");setSeoMarkup("");
    const brand=r?.clientData?.brand||"";
    const region=r?.clientData?.region||"";
    const industry=r?.clientData?.industry||"";
    const brandContext=buildBrandContext();

    // Find queries where brand is Absent or only Mentioned — these are the gaps content should target
    const gapGptQueries=r?.engines?.[0]?.queries||[];
    const absentQueries=gapGptQueries.filter(q=>q.status==="Absent").map(q=>q.query).slice(0,5);
    const mentionedOnlyQueries=gapGptQueries.filter(q=>q.status==="Mentioned").map(q=>q.query).slice(0,3);
    const citedQueries=gapGptQueries.filter(q=>q.status==="Cited").map(q=>q.query).slice(0,3);

    const queryGapsContext=`
REAL AUDIT DATA — Use this to make content strategically targeted:
- Queries where ${brand} is ABSENT (content should directly answer these): ${absentQueries.length>0?absentQueries.map(q=>`"${q}"`).join(", "):"None — brand has good coverage"}
- Queries where ${brand} is only MENTIONED but not CITED (content should aim for citation): ${mentionedOnlyQueries.length>0?mentionedOnlyQueries.map(q=>`"${q}"`).join(", "):"None"}
- Queries where ${brand} IS CITED (reference these as examples of what works): ${citedQueries.length>0?citedQueries.map(q=>`"${q}"`).join(", "):"None"}

CONTENT STRATEGY RULE: This content exists to fill SPECIFIC gaps in ${brand}'s AI visibility. The following queries are where ${brand} is currently INVISIBLE to AI engines. The content MUST directly answer at least 2 of these queries so that AI engines will cite ${brand} in future responses:`;

    const painPointGaps=(r?.painPoints||[]).filter(p=>p.severity==="critical"||p.severity==="warning").map(p=>`${p.label}: ${p.score}%`).join(", ");
    const painContext=painPointGaps?`\nWEAK CATEGORIES TO ADDRESS: ${painPointGaps}`:"";

    const typePrompts={
      blog:`Write a strategic long-form article (800-1500 words) about: "${topic}"\n\nThis article must be engineered to make AI engines (ChatGPT, Gemini, Perplexity, and Google AI) cite ${brand} when users search for related queries.\n\nStructure:\n- Headline that directly answers a query someone would type into an AI engine\n- Opening paragraph that states ${brand}'s position on this topic clearly and factually (AI engines extract opening paragraphs)\n- 3-5 sections, each answering a specific sub-question a user might ask\n- Each section must include at least one specific claim with a data point, statistic, or concrete example\n- Include a direct comparison or positioning statement vs alternatives (without naming competitors negatively)\n- Conclusion that summarises ${brand}'s key differentiator on this topic\n- Meta description (150 chars) phrased as an answer, not a teaser\n\nCRITICAL: Write in ${brand}'s voice. Every paragraph must contain information an AI engine could extract and cite. No filler, no fluff, no "in today's world" openings.`,
      faq:`Create a schema-optimized FAQ page with 10-12 questions about: "${topic}"\n\nEach question must be a REAL query that someone would type into ChatGPT, Gemini, Perplexity, or Google AI about ${brand} or ${industry} in ${region}.\n\nEach answer must:\n- Start with a direct, one-sentence answer (this is what AI engines extract)\n- Follow with 2-3 sentences of supporting detail including specific numbers, features, or facts about ${brand}\n- Reference ${brand}'s specific products or services where relevant\n- Be written in ${brand}'s tone of voice\n\nWrite clean question-and-answer pairs only. Do not include any JSON-LD or schema markup.\n\nCRITICAL: These questions should match the types of queries where ${brand} is currently ABSENT in AI engines. Design them to fill those exact gaps.`,
      social:`Create a ${channel||"LinkedIn"} post about: "${topic}"\n\nThe post must position ${brand} as a thought leader that AI engines would cite.\n\nRequirements:\n- Open with a surprising insight, data point, or contrarian take \u2014 not a generic statement\n- Include one specific, quotable claim about ${brand} or ${industry}\n- End with a question or CTA that drives engagement\n- Match ${brand}'s voice and tone exactly\n- Platform-specific formatting:\n  - LinkedIn: 800-1300 chars, use line breaks for readability, professional but not corporate\n  - Twitter/X: under 280 chars, punchy, one key insight\n  - Instagram: visual-first, include emoji sparingly, 2200 chars max\n\nInclude 3-5 hashtags and a suggested visual description.\n\nCRITICAL: Do NOT write generic thought leadership. The post must contain a specific claim or insight that only ${brand} can make.`,
      email:`Write an email newsletter about: "${topic}"\n\nThis email should drive traffic to content that improves ${brand}'s AI engine visibility.\n\nStructure:\n- Subject line: under 50 chars, curiosity-driven or value-driven (not clickbait)\n- Preview text: 90 chars that complements the subject line\n- Opening: one sentence that states why this matters NOW\n- Body: 3 short paragraphs max \u2014 each with a specific insight, stat, or update about ${brand}\n- CTA: link to the content piece this email promotes\n- P.S.: one additional value hook\n\nWrite in ${brand}'s voice. Keep it under 300 words total. No filler paragraphs.`,
      video:`Write a video script about: "${topic}"\n\nStructure:\n- Hook (first 3 seconds — attention grabber)\n- Introduction (who this is for and what they'll learn)\n- Main content (3-5 key points with talking points for each)\n- For each section include: [VISUAL] notes for what to show on screen\n- Call to action (what to do next)\n- Estimated duration: 2-4 minutes\n\nFormat each section clearly with timestamps and visual/narration separation.`,
      landing:`Write conversion-focused landing page copy about: "${topic}"\n\nThis page must rank in AI engine citations when users ask about ${topic} in ${region}.\n\nStructure:\n- Hero: headline that answers the core user query + subheadline with ${brand}'s specific differentiator\n- CTA button text (action-oriented, specific)\n- 3 benefit blocks: each with a specific, measurable claim \u2014 not generic benefits\n- Social proof section: format for real testimonials (include suggested structure)\n- "How it works" in exactly 3 steps\n- FAQ: 4-5 questions matching real AI engine queries\n- Final CTA with urgency or value statement\n\nCRITICAL: Every benefit must reference something specific about ${brand}'s products or positioning. No generic "we're the best" claims without supporting evidence.`,
      schema:`Generate JSON-LD structured data markup for: "${topic}"\n\nProvide these schema types (whichever are relevant):\n- Organization schema\n- Product schema (if product-related)\n- FAQPage schema\n- Article schema\n- BreadcrumbList schema\n- HowTo schema (if process-related)\n\nEach schema should be complete, valid JSON-LD that can be directly pasted into a webpage <script> tag. Include all required and recommended properties.`,
      comparison:`Write a balanced comparison page about: "${topic}"\n\nThis page must help AI engines (ChatGPT, Gemini, Perplexity, Google AI) cite ${brand} when users ask comparison questions.\n\nStructure:\n- Headline framed as a comparison question users would ask\n- Brief overview paragraph explaining what's being compared and why it matters\n- Feature-by-feature comparison sections (5-7 key areas)\n- For each area: factual assessment of ${brand}'s strengths, honest where competitors are strong\n- Summary table or verdict section with a clear recommendation\n- FAQ section with 3-4 common comparison questions\n\nCRITICAL: Be factual and fair. Do not disparage competitors. Focus on ${brand}'s genuine differentiators. AI engines prefer balanced, trustworthy content.`,
      casestudy:`Write a compelling case study about: "${topic}"\n\nStructure:\n- Title that highlights the key result or transformation\n- Client/Customer context (2-3 sentences — use a realistic scenario if no specific client)\n- The Challenge: What problem was the client facing? Be specific with metrics or pain points\n- The Solution: How ${brand} addressed the challenge. Include specific products, services, or approaches used\n- The Results: Quantifiable outcomes with specific numbers (revenue increase, time saved, efficiency gains)\n- Key Takeaways: 3-4 bullet points summarising what others can learn\n- A quote from the client (use placeholder name if needed)\n\nCRITICAL: Use specific numbers and metrics throughout. AI engines cite content with concrete data points, not vague claims.`,
      howto:`Write a comprehensive how-to guide about: "${topic}"\n\nStructure:\n- Title formatted as "How to [achieve specific outcome]"\n- Brief intro: what the reader will learn and why it matters (2-3 sentences)\n- Prerequisites or requirements (if any)\n- Step-by-step instructions (6-10 numbered steps)\n  - Each step has a clear heading\n  - 2-4 sentences of explanation per step\n  - Include specific tips or best practices within steps\n- Common Mistakes to Avoid (3-5 bullet points)\n- Summary or next steps\n\nCRITICAL: Make each step actionable and specific. Reference ${brand}'s products or expertise where naturally relevant. AI engines favour step-by-step content for how-to queries.`,
      pressrelease:`Write a press release about: "${topic}"\n\nUse standard press release format:\n- Headline: newsworthy, factual, under 80 characters\n- Dateline: [City, Date]\n- Lead paragraph: Who, What, When, Where, Why in 2-3 sentences\n- Body paragraph 1: Supporting details and context\n- Body paragraph 2: Additional information, market context, or impact\n- Quote from company spokesperson (use "[Spokesperson Name], [Title] at ${brand}")\n- About ${brand}: Company boilerplate (2-3 sentences about ${brand} in ${industry})\n- Contact: [Placeholder contact information]\n\nCRITICAL: Write in formal, third-person, newsworthy tone. Lead with the most important information. No marketing fluff.`,
      socialseries:`Create a social media post series about: "${topic}"\n\nWrite 5 social media posts for different platforms:\n\n1. LinkedIn Post (800-1300 chars):\n   - Open with a surprising insight or data point\n   - Professional but conversational tone\n   - End with a question to drive engagement\n\n2. LinkedIn Post (800-1300 chars):\n   - Different angle from Post 1\n   - Include a specific claim about ${brand} or ${industry}\n\n3. Instagram/Facebook Post (under 2200 chars):\n   - More visual-oriented language\n   - Include suggested image/graphic description\n   - 3-5 relevant hashtags\n\n4. Instagram/Facebook Post (under 2200 chars):\n   - Educational or how-to angle\n   - Include carousel/infographic suggestion\n\n5. Twitter/X Post (under 280 chars):\n   - One punchy, quotable insight\n   - 1-2 hashtags\n\nFor each post, include the platform label and suggested hashtags. Make each post stand alone while connecting to the overall theme.`
    };

    // Inject audit context into all content prompts
    Object.keys(typePrompts).forEach(key=>{
      typePrompts[key]=typePrompts[key]+"\n\n"+queryGapsContext+painContext;
    });

    const systemPrompt=`You are an expert AEO/GEO content strategist. You create content specifically optimized to be cited and recommended by AI search engines (ChatGPT, Gemini, Perplexity, etc).\n\nBRAND CONTEXT:\nBrand: ${brand}\nIndustry: ${industry}\nRegion: ${region}\n${brandContext}\n\nAEO OPTIMIZATION RULES:\n- Use clear, factual, authoritative language that AI engines prefer to cite\n- Include natural question-and-answer patterns\n- Structure content with clear headings and logical flow\n- Include specific details, statistics, and examples\n- Write in a way that answers user queries directly and comprehensively\n- Avoid fluff, filler, and vague statements\n- Make statements that are quotable and extractable by AI\n\nOUTPUT RULES:\n- Do NOT include JSON-LD, schema markup, meta tags, or any HTML metadata in the content\n- Do NOT include <script> tags or structured data snippets\n- Output clean, readable content only — SEO markup is handled separately\n- For FAQ content: write the questions and answers as clean text, not as schema markup\n\nIMPORTANT: All content must be in English. Follow all compliance restrictions listed above. Never violate brand guidelines.`;

    const userPrompt=typePrompts[type]||`Create ${type} content about: "${topic}"`;

    try{
      const result=await callOpenAI(userPrompt,systemPrompt);
      const title=topic.length>60?topic.substring(0,57)+"...":topic;
      const newContent={type,title,content:result,channel:channel||null,source_query:sourceQuery||null,source_roadmap_item:sourceRoadmapItem||null,status:"draft"};
      if(projectId){
        const saved=await sbSaveContent(projectId,newContent);
        if(saved){setContentLibrary(prev=>[saved,...prev]);setEditingContent(saved);setActiveTab("library");}
        setGeneratingIdx(null);
        return saved;
      }else{
        const local={...newContent,id:"local_"+Date.now(),created_at:new Date().toISOString()};
        setContentLibrary(prev=>[local,...prev]);setEditingContent(local);setActiveTab("library");
        setGeneratingIdx(null);
        return local;
      }
    }catch(e){
      console.error("Content generation failed:",e);
      setGeneratingIdx(null);
      return null;
    }
  }

  async function generateSeoMarkup(){
    if(!editingContent||!editText)return;
    setGeneratingSeo(true);
    const brand=r?.clientData?.brand||"";
    const industry=r?.clientData?.industry||"";
    const region=r?.clientData?.region||"";
    const prompt=`Generate complete JSON-LD structured data markup for the following content.

Content type: ${editingContent.type}
Brand: ${brand}
Industry: ${industry}
Region: ${region}

CONTENT:
${editText.substring(0,3000)}

Generate all relevant schema types (Organization, FAQPage, Article, Product, HowTo, BreadcrumbList) as appropriate for this content. Output ONLY valid JSON-LD wrapped in <script type="application/ld+json"> tags, ready to paste into a webpage. No explanation, no markdown.`;
    try{
      const result=await callOpenAI(prompt,"You are an SEO specialist. Output ONLY valid JSON-LD schema markup in <script> tags. No explanation.");
      setSeoMarkup(result||"");
    }catch(e){console.error("SEO markup generation failed:",e);}
    setGeneratingSeo(false);
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
        <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Content grid not generated</div>
        <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
        <button onClick={regenerateGrid} disabled={regenGrid} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenGrid?"#e5e7eb":C.accent,color:regenGrid?"#999":"#fff",border:"none",borderRadius:8,cursor:regenGrid?"default":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{regenGrid?"Generating...":"Generate Content Grid"}</button>
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
      <Card><h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 12px",fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Monthly Output Requirements</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:500,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
        </div>
      </Card>
    </div>);
  };

  /* ── Suggested Tab ── */
  const renderSuggested=()=>{
    const suggestions=[];
    const engines=r?.engines||[];
    const searchQueries=Array.isArray(r?.searchQueries)?r.searchQueries:[];
    const negThemes=(r?.sentimentSignals?.themes||[]).filter(t=>t.sentiment==="negative").map(t=>t.name);
    const channelGaps=(r?.verifiedChannelGaps||[]).slice(0,5);
    const getTypeColor=(type)=>({"Blog Article":"#dbeafe","FAQ Page":"#dcfce7","Comparison Page":"#fef3c7","Landing Page":"#e0e7ff","Press Release":"#fce7f3","Case Study":"#f3e8ff","How-To Guide":"#ccfbf1","Video Script":"#fee2e2","Social Media Post Series":"#cffafe","Technical Documentation":"#f1f5f9","Product/Service Page":"#fef9c3","Email Newsletter":"#ede9fe"}[type]||"#f1f5f9");
    const getTypeTextColor=(type)=>({"Blog Article":"#1e40af","FAQ Page":"#166534","Comparison Page":"#92400e","Landing Page":"#3730a3","Press Release":"#9d174d","Case Study":"#6b21a8","How-To Guide":"#0f766e","Video Script":"#991b1b","Social Media Post Series":"#155e75","Technical Documentation":"#475569","Product/Service Page":"#854d0e","Email Newsletter":"#5b21b6"}[type]||"#475569");
    const typeToId=(type)=>{const map={"Blog Article":"blog","FAQ Page":"faq","Comparison Page":"comparison","Landing Page":"landing","Press Release":"pressrelease","Case Study":"casestudy","How-To Guide":"howto","Video Script":"video","Social Media Post Series":"socialseries","Technical Documentation":"blog","Product/Service Page":"landing","Email Newsletter":"email"};return map[type]||"blog";};

    // Build absent and mentioned-not-cited queries from all engines
    const absentQueries=[];
    const mentionedNotCited=[];
    searchQueries.forEach((q,qi)=>{
      const qText=typeof q==="string"?q:(q&&q.query)||"";
      if(!qText)return;
      let absentCount=0,mentionCount=0,citedCount=0;
      engines.forEach(e=>{
        const eqArr=e.queries||[];
        const eq=eqArr[qi];
        if(eq){
          if(eq.status==="Absent")absentCount++;
          else if(eq.status==="Mentioned")mentionCount++;
          else if(eq.status==="Cited")citedCount++;
        }
      });
      if(absentCount>=3)absentQueries.push({query:qText,absentCount,type:qText.toLowerCase().match(/\b(how|guide|tutorial|step)\b/)?"howto":qText.toLowerCase().match(/\b(vs|versus|compare|comparison|better|best)\b/)?"comparison":qText.toLowerCase().match(/\b(best|top|recommend)\b/)?"landing":"faq"});
      else if(mentionCount>=2&&citedCount===0)mentionedNotCited.push({query:qText,mentionCount});
    });

    // Map absent queries to content types
    absentQueries.slice(0,4).forEach(aq=>{
      const typeMap={howto:{type:"How-To Guide",reason:"Brand absent on "+aq.absentCount+" engines for this how-to query"},comparison:{type:"Comparison Page",reason:"Brand absent on "+aq.absentCount+" engines for this comparison query"},landing:{type:"Landing Page",reason:"Brand absent on "+aq.absentCount+" engines for this recommendation query"},faq:{type:"FAQ Page",reason:"Brand absent on "+aq.absentCount+" engines for this informational query"}};
      const mapped=typeMap[aq.type]||typeMap.faq;
      suggestions.push({title:aq.query,type:mapped.type,gap:"Absent on "+aq.absentCount+"/"+engines.length+" engines for: "+aq.query,description:mapped.reason,priority:"high",source_query:aq.query,genType:typeToId(mapped.type)});
    });

    // Mentioned but not cited
    mentionedNotCited.slice(0,2).forEach(mq=>{
      suggestions.push({title:"Structured content for: "+mq.query,type:"Product/Service Page",gap:"Mentioned but not cited on "+mq.mentionCount+" engines",description:"Improve structured data and depth so engines cite, not just mention",priority:"high",source_query:mq.query,genType:"landing"});
    });

    // Negative sentiment themes
    negThemes.slice(0,1).forEach(theme=>{
      suggestions.push({title:"Address: "+theme,type:"Case Study",gap:"Negative sentiment theme: "+theme,description:"Counter this perception with evidence-based content",priority:"medium",genType:"casestudy"});
    });

    // Platform gaps
    channelGaps.slice(0,2).forEach(gap=>{
      const isVideo=gap.domain.includes("youtube");
      const isSocial=["linkedin","facebook","twitter","instagram","tiktok","reddit"].some(s=>gap.domain.includes(s));
      const type=isVideo?"Video Script":isSocial?"Social Media Post Series":"Blog Article";
      suggestions.push({title:"Establish presence on "+gap.domain,type,gap:"Platform gap: "+gap.domain+" ("+gap.citations+" citations)",description:gap.action||"Create and optimise presence on this platform",priority:"medium",genType:typeToId(type)});
    });

    // Fill remaining from content grid
    const contentGrid=Array.isArray(r?.contentTypes)?r.contentTypes:[];
    contentGrid.slice(0,3).forEach(item=>{
      if(suggestions.length>=9)return;
      const topic=item.type||item.topic||item.title||"";
      if(!topic||suggestions.find(s=>s.title===topic))return;
      const gridType=topic.toLowerCase().match(/\b(faq|question)/)?{t:"FAQ Page",g:"faq"}:topic.toLowerCase().match(/\b(video|youtube)/)?{t:"Video Script",g:"video"}:topic.toLowerCase().match(/\b(email|newsletter)/)?{t:"Email Newsletter",g:"email"}:topic.toLowerCase().match(/\b(guide|how)/)?{t:"How-To Guide",g:"howto"}:topic.toLowerCase().match(/\b(case.?study|success)/)?{t:"Case Study",g:"casestudy"}:topic.toLowerCase().match(/\b(social|linkedin|post)/)?{t:"Social Media Post Series",g:"socialseries"}:{t:"Blog Article",g:"blog"};suggestions.push({title:topic,type:gridType.t,gap:item.rationale||"From content strategy grid",description:item.rationale||"Recommended in audit content grid",priority:item.p==="P0"?"high":"medium",genType:gridType.g});
    });

    suggestions.sort((a,b)=>(a.priority==="high"?0:1)-(b.priority==="high"?0:1));
    const finalSuggestions=suggestions.slice(0,9);

    const priorityColors={high:{bg:"#fee2e2",text:"#991b1b",label:"High Priority"},medium:{bg:"#fef3c7",text:"#92400e",label:"Medium"},low:{bg:"#f0fdf4",text:"#166534",label:"Low"}};

    if(finalSuggestions.length===0)return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:14,fontWeight:500,color:C.text}}>No suggestions yet</div><div style={{fontSize:12,color:C.muted,marginTop:4}}>Run an audit first to get content recommendations based on your visibility gaps.</div></div>);

    return(<div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>{finalSuggestions.length} content suggestions mapped to your audit gaps</div>
      {finalSuggestions.map((s,i)=>{
        const pColor=priorityColors[s.priority]||priorityColors.medium;
        return(<div key={i} onMouseEnter={e=>Object.assign(e.currentTarget.style,CARD.hover)} onMouseLeave={e=>Object.assign(e.currentTarget.style,{boxShadow:CARD.base.boxShadow,borderColor:"#e2e8f0",transform:"none"})} style={{...CARD.base,marginBottom:10,display:"flex",alignItems:"flex-start",gap:14,cursor:"default"}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontSize:13,fontWeight:500,color:C.text,lineHeight:1.4}}>{s.title}</div>
              {s.priority==="high"&&<span style={{fontSize:9,fontWeight:500,padding:"2px 6px",borderRadius:4,background:"#fee2e2",color:"#dc2626"}}>High Priority</span>}
            </div>
            {s.gap&&<div style={{fontSize:11,color:C.muted,marginTop:4,fontStyle:"italic"}}>Addresses: {s.gap}</div>}
            {s.description&&s.description!==s.gap&&!s.gap?.includes(s.description)&&<div style={{fontSize:11,color:C.sub,marginTop:4}}>{s.description}</div>}
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <span style={{fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:4,background:getTypeColor(s.type),color:getTypeTextColor(s.type)}}>{s.type}</span>
            </div>
          </div>
          <button onClick={()=>generateContent(s.genType||"blog",s.title,null,s.source_query,null,i)} disabled={generatingIdx!=null} style={{padding:"8px 16px",fontSize:11,fontWeight:500,background:generatingIdx!=null?"#e5e7eb":C.accent,color:generatingIdx!=null?"#999":"#fff",border:"none",borderRadius:8,cursor:generatingIdx!=null?"default":"pointer",whiteSpace:"nowrap",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{generatingIdx===i?(<><div style={{width:12,height:12,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",display:"inline-block",marginRight:4}}/>Generating...</>):generatingIdx!=null?"Generate":"Generate"}</button>
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

      <button onClick={()=>{if(topic.trim())generateContent(selectedType,topic.trim(),channel||null,null,null,"create");}} disabled={!topic.trim()||generatingIdx!=null} style={{padding:"12px 28px",fontSize:13,fontWeight:500,background:topic.trim()&&generatingIdx==null?C.accent:"#e5e7eb",color:topic.trim()&&generatingIdx==null?"#fff":"#999",border:"none",borderRadius:10,cursor:topic.trim()&&generatingIdx==null?"pointer":"default",display:"flex",alignItems:"center",gap:8,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>
        {generatingIdx==="create"?(<><div style={{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>Generating {selectedTypeInfo?.label}...</>):(<>Generate {selectedTypeInfo?.label}</>)}
      </button>

      <div style={{marginTop:20,padding:"12px 16px",background:C.bg,borderRadius:8,fontSize:11,color:C.muted}}>
        {playbook?.brand_voice?.tone?(<>Brand Playbook connected — content will use your brand voice, compliance rules, and product details.</>):(<>Brand Playbook is empty — content will use a neutral professional tone. <span onClick={()=>goTo("playbook")} style={{color:C.accent,cursor:"pointer"}}>Set up your Brand Playbook</span> for better results.</>)}
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
            const typeInfo=contentTypes.find(ct=>ct.id===c.type)||{label:c.type};
            const sColor=statusColors[c.status]||statusColors.draft;
            const isActive=editingContent?.id===c.id;
            return(<div key={c.id} onClick={()=>{setEditingContent(c);setSeoMarkup("");}} style={{padding:"12px 14px",background:isActive?`${C.accent}08`:C.surface,border:isActive?`1px solid ${C.accent}40`:`1px solid ${C.border}`,borderRadius:10,marginBottom:6,cursor:"pointer",transition:"all .1s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
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

      {editingContent&&(<div style={{...CARD.base,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:8}}>
          <input value={editTitle} onChange={e=>setEditTitle(e.target.value)} style={{fontSize:16,fontWeight:500,border:"none",outline:"none",background:"transparent",flex:1,padding:0,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif"}} placeholder="Content title..."/>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={copyContent} style={{padding:"5px 10px",fontSize:11,background:"#f1f5f9",border:"none",borderRadius:6,cursor:"pointer",color:C.text,fontFamily:"inherit"}}>{copied?"Copied!":"Copy"}</button>
            <button onClick={()=>updateStatus(editingContent.id,editingContent.status==="draft"?"published":"draft")} style={{padding:"5px 10px",fontSize:11,background:editingContent.status==="draft"?"#dcfce7":"#f3f4f6",color:editingContent.status==="draft"?"#166534":"#6b7280",border:"none",borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>{editingContent.status==="draft"?"✓ Publish":"↩ Draft"}</button>
            <button onClick={()=>deleteContent(editingContent.id)} style={{padding:"5px 10px",fontSize:11,background:"#fee2e2",color:"#991b1b",border:"none",borderRadius:6,cursor:"pointer",fontFamily:"inherit"}}>Delete</button>
          </div>
        </div>

        <div style={{display:"flex",gap:12,marginBottom:12,fontSize:11,color:C.muted}}>
          <span>{contentTypes.find(ct=>ct.id===editingContent.type)?.label||editingContent.type}</span>
          {editingContent.channel&&<span>· {editingContent.channel}</span>}
          <span>· {new Date(editingContent.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
          <span>· {(editText||"").split(/\s+/).filter(Boolean).length} words</span>
        </div>

        <textarea value={editText} onChange={e=>setEditText(e.target.value)} style={{flex:1,minHeight:400,padding:16,fontSize:13,lineHeight:1.7,border:`1px solid ${C.border}`,borderRadius:10,outline:"none",resize:"vertical",fontFamily:"Georgia, serif",boxSizing:"border-box",color:C.text,background:C.bg}}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,gap:8}}>
          <button onClick={()=>{setSeoMarkup("");generateSeoMarkup();}} disabled={generatingSeo||!editText} style={{padding:"8px 16px",fontSize:11,fontWeight:500,background:generatingSeo?"#e5e7eb":"#f0f4ff",color:generatingSeo?"#999":"#3730a3",border:"1px solid #c7d2fe",borderRadius:8,cursor:generatingSeo?"default":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",display:"flex",alignItems:"center",gap:6}}>{generatingSeo?(<><div style={{width:12,height:12,border:"2px solid #6366f1",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>Generating SEO Markup...</>):"Generate SEO Markup"}</button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={saveEdit} disabled={saving} style={{padding:"8px 20px",fontSize:12,fontWeight:500,background:saving?"#e5e7eb":C.accent,color:saving?"#999":"#fff",border:"none",borderRadius:8,cursor:saving?"default":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{saving?"Saving...":"Save Changes"}</button>
          </div>
        </div>

        {seoMarkup&&(<div style={{marginTop:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:12,fontWeight:500,color:C.text}}>SEO Schema Markup</div>
            <button onClick={()=>{navigator.clipboard.writeText(seoMarkup);}} style={{padding:"4px 10px",fontSize:10,background:"#f0fdf4",color:"#166534",border:"1px solid #bbf7d0",borderRadius:5,cursor:"pointer",fontFamily:"inherit"}}>Copy Markup</button>
          </div>
          <pre style={{padding:14,background:"#1e1e2e",color:"#a6e3a1",borderRadius:10,fontSize:11,lineHeight:1.6,overflow:"auto",maxHeight:300,whiteSpace:"pre-wrap",wordBreak:"break-all"}}>{seoMarkup}</pre>
        </div>)}
      </div>)}
    </div>);
  };

  if(!projectId)return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Content Hub</h2><p style={{color:"#6b7280",fontSize:13,marginTop:3}}>Generate content powered by your brand playbook and audit insights.</p></div>
    <Card style={{textAlign:"center",padding:32}}>
      <div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:4}}>No project linked yet</div>
      <div style={{fontSize:12,color:C.muted}}>Save an audit first to start generating content.</div>
    </Card>
  </div>);

  if(loading)return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Content Hub</h2></div>
    <div style={{textAlign:"center",padding:40,color:C.muted,fontSize:13}}>Loading content library...</div>
  </div>);

  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Content Hub</h2><p style={{color:"#6b7280",fontSize:13,marginTop:3}}>Generate content powered by your brand playbook and audit insights.</p></div>

    <div style={{display:"flex",gap:0,marginBottom:20,borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
      {TABS.map(tab=>(<button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{padding:"10px 16px",background:"transparent",border:"none",borderBottom:activeTab===tab.id?`2px solid ${C.accent}`:"2px solid transparent",color:activeTab===tab.id?C.accent:C.muted,fontSize:12,fontWeight:activeTab===tab.id?600:500,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",whiteSpace:"nowrap",transition:"all .15s",display:"flex",alignItems:"center",gap:6}}>
        {tab.label}
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
  if(!r.contentTypes||r.contentTypes.length===0)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Content Grid</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Content grid not generated</div>
      <div style={{fontSize:12,color:"#9ca3af"}}>This can happen if the AI service timed out during the audit.</div>
    </div>
  </div>);
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Personalised content strategy based on {r.clientData.brand}'s audit findings.</p></div>
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
    <Card><h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 12px",fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Monthly Output Requirements for {r.clientData.brand}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:500,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
      </div>
    </Card>
  </div>);
}

/* ─── PAGE: 90-DAY ROADMAP (Step 08 with premium PDF) ─── */
function RoadmapPage({r,onUpdate}){
  if(!r)return <div style={{padding:40,textAlign:"center",color:C.muted}}>No audit data available.</div>;
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
  if(!r.roadmap||!r.roadmap.day30)return(<div><div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>90-Day Roadmap</h2></div>
    <div style={{padding:32,textAlign:"center",background:C.card||"#fff",border:`1px solid ${C.border}`,borderRadius:14}}>
      <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:4}}>Roadmap not generated</div>
      <div style={{fontSize:12,color:"#9ca3af",marginBottom:16}}>This can happen if the AI service timed out during the audit.</div>
      <button onClick={regenerateRoadmap} disabled={regenRoad} style={{padding:"8px 18px",fontSize:12,fontWeight:500,background:regenRoad?"#e5e7eb":C.accent,color:regenRoad?"#999":"#fff",border:"none",borderRadius:8,cursor:regenRoad?"default":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{regenRoad?"Generating...":"Generate Roadmap"}</button>
    </div>
  </div>);
  const phases=[r.roadmap.day30,r.roadmap.day60,r.roadmap.day90];


  return(<div>
    <div style={{marginBottom:24}}>
      <h2 style={{fontSize:22,fontWeight:500,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>90-Day Transformation Roadmap</h2><p style={{color:"#6b7280",fontSize:13,marginTop:3}}>Department-by-department plan for <strong>{r.clientData.brand}</strong></p>
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
            <div><div style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>{p.title}</div><div style={{color:p.accent,fontSize:11,fontWeight:600,marginTop:1}}>{p.sub}</div></div>
            <div style={{padding:"5px 12px",background:`${p.accent}08`,borderRadius:8,border:`1px solid ${p.accent}20`}}><span style={{fontSize:10,color:C.muted}}>Lift: </span><span style={{fontSize:14,fontWeight:700,color:p.accent,fontFamily:"'Satoshi',-apple-system,sans-serif"}}>{p.lift}</span></div>
          </div>
          {p.departments.map((d,di)=>(<div key={di} style={{marginBottom:di<p.departments.length-1?10:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><div style={{width:3,height:14,borderRadius:2,background:d.color}}/><span style={{fontSize:12,fontWeight:500,color:d.color}}>{d.dept}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginLeft:10}}>{d.tasks.map((tk,ti)=>(<div key={ti} style={{padding:"6px 8px",background:C.bg,borderRadius:5,fontSize:11,color:C.sub,display:"flex",gap:6}}><span style={{color:d.color,fontSize:10}}>→</span>{tk}</div>))}</div>
          </div>))}
        </Card>
      </div>))}
    </div>

    <Card style={{marginTop:20,background:`linear-gradient(135deg,${C.accent}08,${C.accent}03)`,border:`1px solid ${C.accent}20`,textAlign:"center"}}>
      <div style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em",marginBottom:4}}>Ready to dominate AI search results?</div>
      <p style={{fontSize:12,color:C.sub,maxWidth:460,margin:"0 auto 14px"}}>Let Entermind execute this strategy and guarantee measurable improvements within 90 days.</p>
      <button onClick={()=>exportPDF(r)} style={{padding:"11px 26px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Export Full Report as PDF</button>
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

async function sbGetUserId() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) return session.user.id;
  } catch(e) {}
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  return isLocal ? "local-dev-user" : null;
}

async function sbSaveProject(projectData) {
  const userId = await sbGetUserId();
  if (!userId) { console.error('No user ID available'); return null; }

  // Enforce 5 project cap
  const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', userId);

  // Check if this is a new project (not update) and enforce cap
  const { data: existingBrand } = await supabase.from('projects').select('id').eq('user_id', userId).eq('brand', projectData.brand).limit(1);
  if ((!existingBrand || existingBrand.length === 0) && count >= 5) {
    console.warn('Project cap reached (5 max)');
    return { _capReached: true };
  }

  const existing = existingBrand;

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
        user_id: userId,
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
      user_id: (await sbGetUserId()) || 'default',
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
  const userId = await sbGetUserId();
  if (!userId) return [];
  const { data, error } = await supabase
    .from('projects')
    .select('*, audits(id, overall_score, mention_rate, citation_rate, created_at)')
    .eq('user_id', userId)
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
  // Delete child records first (order matters for FK constraints)
  try {
    // Delete generated content for this project
    await supabase.from('generated_content').delete().eq('project_id', projectId);

    // Delete playbook assets - also remove from storage
    const { data: assets } = await supabase.from('playbook_assets').select('storage_path').eq('project_id', projectId);
    if (assets && assets.length > 0) {
      const paths = assets.map(a => a.storage_path).filter(Boolean);
      if (paths.length > 0) {
        await supabase.storage.from('playbook-assets').remove(paths);
      }
    }
    await supabase.from('playbook_assets').delete().eq('project_id', projectId);

    // Delete brand playbook
    await supabase.from('brand_playbook').delete().eq('project_id', projectId);

    // Delete audits
    await supabase.from('audits').delete().eq('project_id', projectId);

    // Finally delete the project itself
    const userId = await sbGetUserId();
    const { error } = await supabase.from('projects').delete().eq('id', projectId).eq('user_id', userId || 'none');
    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Error in sbDeleteProject cascade:', e);
    return false;
  }
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
        getAuthToken().then(__tk=>fetch("/api/projects",{headers:{"Authorization":"Bearer "+__tk}})).then(r=>r.json()).then(d=>{
          const apiProjects=d.projects||[];
          const merged=[...apiProjects];
          localProjects.forEach(lp=>{if(!merged.find(ap=>ap.id===lp.id))merged.push(lp);});
          setProjects(merged);setLoading(false);
        }).catch(()=>{setProjects(localProjects);setLoading(false);});
      }
    }).catch(()=>{
      // Supabase failed — fallback to API + localStorage
      getAuthToken().then(__tk=>fetch("/api/projects",{headers:{"Authorization":"Bearer "+__tk}})).then(r=>r.json()).then(d=>{
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
      try{await getAuthToken().then(__tk=>fetch(`/api/projects?id=${id}`,{method:"DELETE",headers:{"Authorization":"Bearer "+__tk}}));}catch(e){}
      lsDeleteProject(id);
      // Also remove from localStorage by brand name in case IDs don't match
      const deletedProject = projects.find(p => p.id === id);
      if (deletedProject && deletedProject.brand) {
        try {
          const all = JSON.parse(localStorage.getItem('enterrank_projects') || '[]');
          const filtered = all.filter(p => p.id !== id && p.brand !== deletedProject.brand);
          localStorage.setItem('enterrank_projects', JSON.stringify(filtered));
        } catch(e) {}
      }
      setProjects(projects.filter(p=>p.id!==id));
    }catch(e){
      // Fallback: try old API delete
      try{await getAuthToken().then(__tk=>fetch(`/api/projects?id=${id}`,{method:"DELETE",headers:{"Authorization":"Bearer "+__tk}}));}catch(e2){}
      lsDeleteProject(id);
      // Also remove from localStorage by brand name in case IDs don't match
      const deletedProject = projects.find(p => p.id === id);
      if (deletedProject && deletedProject.brand) {
        try {
          const all = JSON.parse(localStorage.getItem('enterrank_projects') || '[]');
          const filtered = all.filter(p => p.id !== id && p.brand !== deletedProject.brand);
          localStorage.setItem('enterrank_projects', JSON.stringify(filtered));
        } catch(e3) {}
      }
      setProjects(projects.filter(p=>p.id!==id));
    }
    setDeleting(null);
  };

  const scoreColor=(s)=>!s?C.muted:s>=70?C.green:s>=40?C.amber:C.red;

  return(<div style={{minHeight:"100vh",background:"#fff",fontFamily:"'Satoshi',-apple-system,BlinkMacSystemFont,sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}*{box-sizing:border-box}::selection{background:${C.accent}18}`}</style>

    {/* Top nav */}
    <div style={{padding:"14px 32px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Logo/>
      <button onClick={onLogout} style={{padding:"7px 16px",fontSize:12,fontWeight:500,background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all .15s"}}
        onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.sub;}}
        onMouseLeave={e=>{e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor=C.border;}}>Log Out</button>
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"40px 32px",animation:"fadeIn .5s ease-out"}}>
      {/* Page header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36}}>
        <div>
          <h1 style={{fontSize:28,fontWeight:600,color:C.text,margin:0,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Client Management</h1>
        </div>
      </div>

      {/* Workspaces section */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:"#fff"}}>
        <div style={{padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/></svg>
            <span style={{fontSize:15,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>Workspaces</span>
            {projects&&<span style={{fontSize:11,color:C.muted,marginLeft:4}}>{projects.length} / 5</span>}
          </div>
          <button onClick={()=>{if(projects&&projects.length>=5){alert("Maximum 5 projects reached. Delete an existing project to create a new one.");return;}onNew();}} style={{padding:"8px 18px",background:projects&&projects.length>=5?"#e5e7eb":C.accent,color:projects&&projects.length>=5?"#9ca3af":"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:projects&&projects.length>=5?"not-allowed":"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",display:"flex",alignItems:"center",gap:5,transition:"opacity .15s"}}
            onMouseEnter={e=>{if(!(projects&&projects.length>=5))e.currentTarget.style.opacity=".85";}}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            {projects&&projects.length>=5?"Limit reached":"New workspace"}
          </button>
        </div>

        {loading?<div style={{textAlign:"center",padding:60,color:C.muted}}><div style={{width:24,height:24,border:`2.5px solid ${C.borderSoft}`,borderTopColor:C.accent,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 12px"}}/><span style={{fontSize:13}}>Loading...</span></div>:
         projects.length===0?<div style={{textAlign:"center",padding:"64px 40px"}}>
          <div style={{width:48,height:48,borderRadius:12,background:C.bg,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4v14M4 11h14" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h3 style={{fontSize:15,fontWeight:500,color:C.text,margin:"0 0 6px",fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em"}}>No workspaces yet</h3>
          <p style={{color:C.muted,fontSize:13,margin:"0 0 20px"}}>Create your first workspace to start tracking visibility.</p>
          <button onClick={onNew} style={{padding:"10px 22px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif"}}>Create workspace</button>
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
                <button onClick={(e)=>{e.stopPropagation();onSelect(p);}} style={{padding:"6px 16px",background:"#fff",color:C.text,border:`1px solid ${C.border}`,borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all .15s"}}
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
          {projects.length<5&&Array.from({length:Math.min(3,5-projects.length)}).map((_,i)=>(
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
  const[authed,setAuthed]=useState(()=>{if(isLocal)return true;return false;});
  const [authLoading, setAuthLoading] = useState(!isLocal);
  const [authUser, setAuthUser] = useState(null);
  const[showLanding,setShowLanding]=useState(true);
  const[screen,setScreen]=useState(isLocal?"dashboard":"hub");
  const[activeProject,setActiveProject]=useState(null);
  const[step,setStep]=useState("input");
  const[data,setData]=useState({brand:"",industry:"",website:"",region:"",topics:[],competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}],archetypes:[]});
  const[results,setResults]=useState(null);
  const[history,setHistory]=useState([]);
  const [sectionReady, setSectionReady] = useState({ dashboard:true, archetypes:true, sentiment:true, intent:true, citations:true, playbook:true, channels:true, contenthub:true, roadmap:true });
  const [auditInProgress, setAuditInProgress] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditError, setAuditError] = useState(null);
  const [dashboardLoadProgress, setDashboardLoadProgress] = useState(0);
  const [auditStage, setAuditStage] = useState("");

  const[sideCollapsed,setSideCollapsed]=useState(false);
  const[loginError,setLoginError]=useState("");
  const[loggingIn,setLoggingIn]=useState(false);

  React.useEffect(() => {
    if (isLocal) return;
    const checkSession = async () => {
      try {
        const session = await sbGetSession();
        if (session) { setAuthed(true); setAuthUser(session.user); }
      } catch(e) {}
      setAuthLoading(false);
    };
    checkSession();
    const { data: listener } = sbOnAuthChange((event, session) => {
      if (event === "SIGNED_IN" && session) { setAuthed(true); setAuthUser(session.user); }
      else if (event === "SIGNED_OUT") { setAuthed(false); setAuthUser(null); }
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);


  const handleLogin = async (email, password) => {
    if (isLocal) { setAuthed(true); return; }
    setLoggingIn(true); setLoginError("");
    try {
      const result = await sbSignIn(email, password);
      if (result.error) { setLoginError(result.error); }
      else { setAuthed(true); setAuthUser(result.user); }
    } catch(e) { setLoginError("Connection error. Please try again."); }
    setLoggingIn(false);
  };

  const handleSignUp = async (email, password) => {
    setLoggingIn(true); setLoginError("");
    try {
      const result = await sbSignUp(email, password);
      if (result.error) { setLoginError(result.error); }
      else {
        const signInResult = await sbSignIn(email, password);
        if (signInResult.error) { setLoginError("Account created! Please sign in."); }
        else { setAuthed(true); setAuthUser(signInResult.user); }
      }
    } catch(e) { setLoginError("Connection error. Please try again."); }
    setLoggingIn(false);
  };

  const handleLogout = async () => {
    if (isLocal) { setResults(null); setStep("input"); return; }
    try { await sbSignOut(); } catch(e) {}
    setAuthed(false);
    setAuthUser(null);
    setResults(null);
    setStep("input");
    setScreen("hub");
    setActiveProject(null);
  };

  const[projectPrompt,setProjectPrompt]=useState(null);

  const handleSelectProject=async(projectSummary)=>{
    try{
      // Supabase project — load latest audit from Supabase
      if(projectSummary._supabase){
        const audits=await sbLoadProjectAudits(projectSummary.id);
        const project={...projectSummary,history:[]};
        if(audits.length>0){
          let fullAudit=await sbLoadAudit(audits[0].id);
          if(!fullAudit||!fullAudit.results){
            try{const cached=JSON.parse(localStorage.getItem("enterrank_audit_"+projectSummary.id)||"null");if(cached&&cached.apiData)fullAudit={results:cached.apiData};}catch(e){}
          }
          if(fullAudit&&fullAudit.results){
            // Build history from all audits for the performance chart
            const historyEntries=audits.map(a=>({
              date:formatAuditDate(a.created_at),
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
        const __tkP=await getAuthToken();const res=await fetch(`/api/projects?id=${projectSummary.id}`,{headers:{"Authorization":"Bearer "+__tkP}});
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
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}],archetypes:project.archetypes||[]});
    setHistory((project.history||[]).map(h=>({date:h.date||formatAuditDate(h.timestamp||h.created_at),...h})));
    setResults(null);
    setStep("input");
    setScreen("dashboard");
  };

  const openProjectDashboard=(project,lastAudit)=>{
    setProjectPrompt(null);
    setActiveProject(project);
    setData({brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors&&project.competitors.length>0?project.competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}],archetypes:project.archetypes||[]});
    setHistory((project.history||[]).map(h=>({date:h.date||formatAuditDate(h.timestamp||h.created_at),...h})));
    // Rebuild results from last audit
    const cd={brand:project.brand,industry:project.industry||"",website:project.website||"",region:project.region||"",topics:project.topics||[],competitors:project.competitors||[]};
    const r=generateAll(cd,lastAudit.apiData);
    setResults(r);
    setStep("dashboard");
    setScreen("dashboard");
    document.title=(project.brand||"Dashboard")+" \u2014 EnterRank";
  };

  const handleNewProject=()=>{
    setActiveProject(null);
    setData({brand:"",industry:"",website:"",region:"",topics:[],competitors:[{name:"",website:""},{name:"",website:""},{name:"",website:""}],archetypes:[]});
    setHistory([]);
    setResults(null);
    setStep("input");
    setScreen("dashboard");
    document.title="EnterRank \u2014 AI Engine Visibility Platform";
  };

  const handleBackToHub=()=>{setScreen("hub");setResults(null);setStep("input");document.title="EnterRank \u2014 AI Engine Visibility Platform";};

  if (authLoading) return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#ffffff"}}>
      <div style={{width:24,height:24,border:"2.5px solid #e2e8f0",borderTopColor:"#2563eb",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
    </div>
  );

  if(showLanding&&!authed)return <LandingPage onGetStarted={()=>setShowLanding(false)}/>;

  if(!authed)return <LoginForm onLogin={handleLogin} onSignUp={handleSignUp} error={loginError} loading={loggingIn} onBack={() => setShowLanding(true)}/>;

  if(screen==="hub")return(<>
    <ProjectHub onSelect={handleSelectProject} onNew={handleNewProject} onLogout={handleLogout}/>
    {projectPrompt&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,animation:"fadeIn .2s ease-out"}} onClick={()=>setProjectPrompt(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:"36px 32px 28px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,.15)",animation:"fadeIn .25s ease-out"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:48,height:48,borderRadius:14,background:`${C.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <BrandLogo name={projectPrompt.project.brand} website={projectPrompt.project.website} size={28} color={C.accent}/>
          </div>
          <div style={{fontSize:20,fontWeight:500,color:C.text,fontFamily:"'Satoshi',-apple-system,sans-serif",letterSpacing:"-.02em",marginBottom:6}}>{projectPrompt.project.brand}</div>
          <div style={{fontSize:13,color:C.muted}}>Last audit: {projectPrompt.lastAudit.date||"Recent"} · Score: {projectPrompt.lastAudit.overall||"—"}%</div>
        </div>
        <div style={{fontSize:14,color:C.sub,textAlign:"center",marginBottom:24}}>Would you like to run another audit or view the existing dashboard?</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>openProjectDashboard(projectPrompt.project,projectPrompt.lastAudit)} style={{flex:1,padding:"14px 20px",background:"#fff",border:`2px solid ${C.accent}`,borderRadius:12,fontSize:14,fontWeight:600,color:C.accent,cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:`${C.accent}08`})} onMouseLeave={e=>Object.assign(e.target.style,{background:"#fff"})}>View Dashboard</button>
          <button onClick={()=>openProjectForAudit(projectPrompt.project)} style={{flex:1,padding:"14px 20px",background:C.accent,border:`2px solid ${C.accent}`,borderRadius:12,fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"'Satoshi',-apple-system,sans-serif",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:"#1d4ed8"})} onMouseLeave={e=>Object.assign(e.target.style,{background:C.accent})}>Run Audit</button>
        </div>
        <div onClick={()=>setProjectPrompt(null)} style={{textAlign:"center",marginTop:16,fontSize:12,color:C.muted,cursor:"pointer"}}>Cancel</div>
      </div>
    </div>)}
  </>);

  const runAuditProgressive = async (auditData) => {
    let auditComplete = false;
    setAuditInProgress(true);
    setAuditProgress(0);
    setAuditError(null);
    setDashboardLoadProgress(0);
    setAuditStage("Preparing audit...");
    setStep("dashboard");
    setResults(null);
    setSectionReady({ dashboard:false, archetypes:false, sentiment:false, intent:false, citations:false, playbook:false, channels:false, contenthub:false, roadmap:false });

    try {
      const apiData = await runRealAudit(auditData, (msg, pct, partialData) => {
        if(auditComplete) return;
        if(pct != null) {
          setAuditProgress(prev => {
            const next = Math.max(prev, pct);
            setDashboardLoadProgress(next);
            return next;
          });
        }
        if(msg) setAuditStage(msg);
        if(partialData) {
          setSectionReady(prev => ({
            ...prev,
            dashboard: !!(partialData.engineData && partialData.competitorData),
            sentiment: !!(partialData.sentimentData && partialData.sentimentSignals),
            archetypes: !!(partialData.archData && partialData.archData.length > 0),
            citations: !!(partialData.engineData && partialData.citationSources),
            intent: !!(partialData.intentData && partialData.intentData.length > 0),
            channels: !!(partialData.channelData && partialData.channelData.channels && partialData.channelData.channels.length > 0),
            contenthub: !!(partialData.contentGridData && partialData.contentGridData.length > 0),
            roadmap: !!(partialData.roadmapData && partialData.roadmapData.day30),
            playbook: !!(partialData.guidelineData)
          }));
        }
      });

      // Full audit complete — generate final results
      auditComplete = true;
      setAuditInProgress(false);
      setAuditProgress(100);
      setAuditStage("");
      const r = generateAll(auditData, apiData);
      setResults(() => r);
      setSectionReady({ dashboard:true, archetypes:true, sentiment:true, intent:true, citations:true, playbook:true, channels:true, contenthub:true, roadmap:true });

      const entry={date:formatAuditDate(new Date()),brand:auditData.brand,overall:r.overall,engines:r.engines.map(e=>e.score),mentions:Math.round(r.engines.reduce((sum,e)=>{const w=(r.engineWeights||{})[e.id]||(1/r.engines.length);return sum+(e.mentionRate*w);},0)),citations:Math.round(r.engines.reduce((sum,e)=>{const w=(r.engineWeights||{})[e.id]||(1/r.engines.length);return sum+(e.citationRate*w);},0)),mentionsPerEngine:{gpt:r.engines[0]?.mentionRate||0,gemini:r.engines[1]?.mentionRate||0,perplexity:r.engines[2]?.mentionRate||0},citationsPerEngine:{gpt:r.engines[0]?.citationRate||0,gemini:r.engines[1]?.citationRate||0,perplexity:r.engines[2]?.citationRate||0},sentimentPerEngine:{gpt:r.sentiment.brand.gpt,gemini:r.sentiment.brand.gemini,perplexity:r.sentiment.brand.perplexity||50},sentimentAvg:r.sentiment.brand.avg,categories:r.painPoints.map(p=>({label:p.label,score:p.score})),apiData:apiData};

      try{localStorage.setItem('enterrank_lastAudit',JSON.stringify(apiData));}catch(e){}

      try{
        const project=await sbSaveProject({
          brand:auditData.brand,
          website:auditData.website,
          industry:auditData.industry,
          region:auditData.region,
          competitors:auditData.competitors,
          topics:auditData.topics
        });
        if(project){
          await sbSaveAudit(project.id,apiData,{overall:entry.overall,mentions:entry.mentions,citations:entry.citations,sentiment:entry.sentimentAvg});
          try{localStorage.setItem("enterrank_audit_"+project.id,JSON.stringify({apiData,timestamp:Date.now()}));}catch(e){}
          setActiveProject({...project,_supabase:true});
          try{
            const freshAudits=await sbLoadProjectAudits(project.id);
            if(freshAudits&&freshAudits.length>0){
              const freshHistory=freshAudits.map(a=>({date:formatAuditDate(a.created_at),overall:a.overall_score,mentions:a.mention_rate,citations:a.citation_rate,sentimentAvg:a.sentiment_score,mentionsPerEngine:{gpt:a.mention_rate,gemini:a.mention_rate},citationsPerEngine:{gpt:a.citation_rate,gemini:a.citation_rate},sentimentPerEngine:{gpt:a.sentiment_score||50,gemini:a.sentiment_score||50},apiData:null})).reverse();
              setHistory(freshHistory);
            }else{
              setHistory(prev=>[...prev,entry]);
            }
          }catch(he){console.error('Failed to refresh history:',he);setHistory(prev=>[...prev,entry]);}
        }
      }catch(e){
        console.error('Failed to save to Supabase:',e);
        setHistory(prev=>[...prev,entry]);
      }

      // Also save to old API + localStorage as fallback
      if(!isLocal){try{
        if(activeProject&&!activeProject._supabase){
          const res=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({id:activeProject.id,auditEntry:entry})});
          const updated=await res.json();
          if(!updated.error){lsSaveProject(updated);}
          else{const lp=lsGetProject(activeProject.id);if(lp){lp.history=[...(lp.history||[]),{...entry,timestamp:new Date().toISOString()}];lp.lastAudit=new Date().toISOString();lp.lastScore=entry.overall;lsSaveProject(lp);}}
        }else if(!activeProject){
          const res=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({brand:auditData.brand,industry:auditData.industry,website:auditData.website,region:auditData.region,topics:auditData.topics,competitors:auditData.competitors})});
          const created=await res.json();
          if(!created.error){
            const res2=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({id:created.id,auditEntry:entry})});
            const updated2=await res2.json();
            if(!updated2.error){lsSaveProject(updated2);}else{lsSaveProject(created);}
          }else{
            const localId=auditData.brand.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+Date.now().toString(36);
            const localProject={id:localId,brand:auditData.brand,industry:auditData.industry,website:auditData.website,region:auditData.region,topics:auditData.topics,competitors:auditData.competitors,history:[{...entry,timestamp:new Date().toISOString()}],lastAudit:new Date().toISOString(),lastScore:entry.overall,createdAt:new Date().toISOString()};
            lsSaveProject(localProject);
          }
        }
      }catch(legacyErr){console.error('Legacy save failed:',legacyErr);}}

    } catch(e) {
      console.error("Progressive audit error:", e);
      setAuditInProgress(false);
      setAuditStage("");
      setAuditProgress(0);
      setAuditError("Something went wrong during the audit. Please try again. If the issue persists, contact support.");
      setSectionReady({ dashboard:true, archetypes:true, sentiment:true, intent:true, citations:true, playbook:true, channels:true, contenthub:true, roadmap:true });
    }
  };

  const run=async(apiData)=>{
    if(apiData&&apiData.error){
      // Fatal error — still generate with whatever partial data we have
      const r=generateAll(data, apiData);
      r._auditError=apiData.errorMessage||"The audit encountered an error.";
      setResults(r);setStep("dashboard");return;
    }
    const r=generateAll(data, apiData);setResults(r);
    const entry={date:formatAuditDate(new Date()),brand:data.brand,overall:r.overall,engines:r.engines.map(e=>e.score),mentions:Math.round(r.engines.reduce((sum,e)=>{const w=(r.engineWeights||{})[e.id]||(1/r.engines.length);return sum+(e.mentionRate*w);},0)),citations:Math.round(r.engines.reduce((sum,e)=>{const w=(r.engineWeights||{})[e.id]||(1/r.engines.length);return sum+(e.citationRate*w);},0)),mentionsPerEngine:{gpt:r.engines[0]?.mentionRate||0,gemini:r.engines[1]?.mentionRate||0,perplexity:r.engines[2]?.mentionRate||0},citationsPerEngine:{gpt:r.engines[0]?.citationRate||0,gemini:r.engines[1]?.citationRate||0,perplexity:r.engines[2]?.citationRate||0},sentimentPerEngine:{gpt:r.sentiment.brand.gpt,gemini:r.sentiment.brand.gemini,perplexity:r.sentiment.brand.perplexity||50},sentimentAvg:r.sentiment.brand.avg,categories:r.painPoints.map(p=>({label:p.label,score:p.score})),apiData:apiData};
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
        try{localStorage.setItem("enterrank_audit_"+project.id,JSON.stringify({apiData,timestamp:Date.now()}));}catch(e){}
        setActiveProject({...project,_supabase:true});
        // Refresh audit history so the chart updates
        try{
          const freshAudits=await sbLoadProjectAudits(project.id);
          if(freshAudits&&freshAudits.length>0){
            const freshHistory=freshAudits.map(a=>({date:formatAuditDate(a.created_at),overall:a.overall_score,mentions:a.mention_rate,citations:a.citation_rate,sentimentAvg:a.sentiment_score,mentionsPerEngine:{gpt:a.mention_rate,gemini:a.mention_rate},citationsPerEngine:{gpt:a.citation_rate,gemini:a.citation_rate},sentimentPerEngine:{gpt:a.sentiment_score||50,gemini:a.sentiment_score||50},apiData:null})).reverse();
            setHistory(freshHistory);
          }else{
            setHistory(prev=>[...prev,entry]);
          }
        }catch(he){console.error('Failed to refresh history:',he);setHistory(prev=>[...prev,entry]);}
      }
    }catch(e){
      console.error('Failed to save to Supabase:',e);
      setHistory(prev=>[...prev,entry]);
    }

    // Also save to old API + localStorage as fallback
    if(!isLocal){try{
      if(activeProject&&!activeProject._supabase){
        const res=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({id:activeProject.id,auditEntry:entry})});
        const updated=await res.json();
        if(!updated.error){lsSaveProject(updated);}
        else{const lp=lsGetProject(activeProject.id);if(lp){lp.history=[...(lp.history||[]),{...entry,timestamp:new Date().toISOString()}];lp.lastAudit=new Date().toISOString();lp.lastScore=entry.overall;lsSaveProject(lp);}}
      }else if(!activeProject){
        const res=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({brand:data.brand,industry:data.industry,website:data.website,region:data.region,topics:data.topics,competitors:data.competitors})});
        const created=await res.json();
        if(!created.error){
          const res2=await fetch("/api/projects",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+(await getAuthToken())},body:JSON.stringify({id:created.id,auditEntry:entry})});
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


  return(<div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Satoshi',-apple-system,BlinkMacSystemFont,sans-serif",color:C.text,display:"flex"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@keyframes blink{50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes loadingSlide{0%{transform:translateX(-100%);opacity:0.5}30%{opacity:1}100%{transform:translateX(350%);opacity:0.3}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}08!important}.field-autofilled input{background:#f3f4f6!important;color:${C.sub}!important;transition:all .15s}.field-autofilled input:focus{background:#fff!important;color:${C.text}!important}`}</style>

    {/* Sidebar */}
    <Sidebar step={step} setStep={setStep} results={results} brand={results?.clientData?.brand||data.brand} onBack={handleBackToHub} isLocal={isLocal} onLogout={handleLogout} collapsed={sideCollapsed} setCollapsed={setSideCollapsed} sectionReady={sectionReady} auditInProgress={auditInProgress}/>

    {/* Main content */}
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",marginLeft:sideCollapsed?60:220,transition:"margin-left .2s ease"}}>
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px",maxWidth:1060,width:"100%",margin:"0 auto"}}>
        <div key={step} style={{animation:"fadeIn 0.2s ease"}}>
        {step==="input"&&<NewAuditPage data={data} setData={setData} onRun={runAuditProgressive} history={history}/>}
        {step==="dashboard"&&!results&&(auditInProgress||auditError)&&<AuditLoadingInline progress={dashboardLoadProgress} stage={auditStage} error={auditError} onClearError={()=>{setAuditError(null);setStep("input");}}/>}
        {step==="dashboard"&&results&&<ErrorBoundary><DashboardPage r={results} history={history} goTo={(s) => { if(auditInProgress && !sectionReady[s]) return; setStep(s); }}/></ErrorBoundary>}
        {step==="archetypes"&&results&&(sectionReady.archetypes||!auditInProgress)&&<ErrorBoundary><QueryCategoriesPage r={results}/></ErrorBoundary>}
        {step==="sentiment"&&results&&(sectionReady.sentiment||!auditInProgress)&&<ErrorBoundary><SentimentPage r={results}/></ErrorBoundary>}
        {step==="citations"&&results&&<ErrorBoundary><CitationSourcesPage r={results}/></ErrorBoundary>}
        {step==="playbook"&&results&&(sectionReady.playbook||!auditInProgress)&&<ErrorBoundary><PlaybookPage r={results} goTo={(s) => { if(auditInProgress && !sectionReady[s]) return; setStep(s); }} activeProject={activeProject}/></ErrorBoundary>}
        {step==="channels"&&results&&<ErrorBoundary><TargetChannelsPage r={results}/></ErrorBoundary>}
        {step==="contenthub"&&results&&(sectionReady.contenthub||!auditInProgress)&&<ErrorBoundary><ContentHubPage r={results} goTo={(s) => { if(auditInProgress && !sectionReady[s]) return; setStep(s); }} activeProject={activeProject} onUpdate={setResults}/></ErrorBoundary>}
        {step==="roadmap"&&results&&(sectionReady.roadmap||!auditInProgress)&&<ErrorBoundary><RoadmapPage r={results} onUpdate={setResults}/></ErrorBoundary>}
        {step!=="input"&&step!=="dashboard"&&auditInProgress&&!(sectionReady[step])&&results&&(
          <AuditLoadingInline progress={dashboardLoadProgress} stage={auditStage} error={auditError} onClearError={()=>{setAuditError(null);setStep("input");}}/>
        )}
        </div>
      </div>
    </div>
  </div>);
}
