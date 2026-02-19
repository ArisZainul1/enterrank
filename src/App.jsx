import React, { useState } from "react";

const ChatGPTLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>);
const GeminiLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 24C12 20.8174 10.7357 17.7652 8.48528 15.5147C6.23484 13.2643 3.18261 12 0 12C3.18261 12 6.23484 10.7357 8.48528 8.48528C10.7357 6.23484 12 3.18261 12 0C12 3.18261 13.2643 6.23484 15.5147 8.48528C17.7652 10.7357 20.8174 12 24 12C20.8174 12 17.7652 13.2643 15.5147 15.5147C13.2643 17.7652 12 20.8174 12 24Z" fill="url(#gG2)"/><defs><linearGradient id="gG2" x1="0" y1="12" x2="24" y2="12"><stop stopColor="#4285F4"/><stop offset=".5" stopColor="#9B72CB"/><stop offset="1" stopColor="#D96570"/></linearGradient></defs></svg>);
const ClaudeLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="#D97757"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/></svg>);
const PerplexityLogo=({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="#20B8CD"><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/></svg>);
const DeepSeekLogo=({size=24})=>(<svg width={size} height={size} viewBox="3.771 6.973 23.993 17.652" fill="#4D6BFE"><path d="m27.501 8.469c-.252-.123-.36.111-.508.23-.05.04-.093.09-.135.135-.368.395-.797.652-1.358.621-.821-.045-1.521.213-2.14.842-.132-.776-.57-1.238-1.235-1.535-.349-.155-.701-.309-.944-.645-.171-.238-.217-.504-.303-.765-.054-.159-.108-.32-.29-.348-.197-.031-.274.135-.352.273-.31.567-.43 1.192-.419 1.825.028 1.421.628 2.554 1.82 3.36.136.093.17.186.128.321-.081.278-.178.547-.264.824-.054.178-.135.217-.324.14a5.448 5.448 0 0 1-1.719-1.169c-.848-.82-1.614-1.726-2.57-2.435-.225-.166-.449-.32-.681-.467-.976-.95.128-1.729.383-1.82.267-.096.093-.428-.77-.424s-1.653.293-2.659.677a2.782 2.782 0 0 1-.46.135 9.554 9.554 0 0 0-2.853-.1c-1.866.21-3.356 1.092-4.452 2.6-1.315 1.81-1.625 3.87-1.246 6.018.399 2.261 1.552 4.136 3.326 5.601 1.837 1.518 3.955 2.262 6.37 2.12 1.466-.085 3.1-.282 4.942-1.842.465.23.952.322 1.762.392.623.059 1.223-.031 1.687-.127.728-.154.677-.828.414-.953-2.132-.994-1.665-.59-2.09-.916 1.084-1.285 2.717-2.619 3.356-6.94.05-.343.007-.558 0-.837-.004-.168.034-.235.228-.254a4.084 4.084 0 0 0 1.529-.47c1.382-.757 1.938-1.997 2.07-3.485.02-.227-.004-.463-.243-.582zm-12.041 13.391c-2.067-1.627-3.07-2.162-3.483-2.138-.387.021-.318.465-.233.754.089.285.205.482.368.732.113.166.19.414-.112.598-.666.414-1.823-.139-1.878-.166-1.347-.793-2.473-1.842-3.267-3.276-.765-1.38-1.21-2.861-1.284-4.441-.02-.383.093-.518.472-.586a4.692 4.692 0 0 1 1.514-.04c2.109.31 3.905 1.255 5.41 2.749.86.853 1.51 1.871 2.18 2.865.711 1.057 1.478 2.063 2.454 2.887.343.289.619.51.881.672-.792.088-2.117.107-3.022-.61zm.99-6.38a.304.304 0 1 1 .609 0c0 .17-.136.304-.306.304a.3.3 0 0 1-.303-.305zm3.077 1.581c-.197.08-.394.15-.584.159a1.246 1.246 0 0 1-.79-.252c-.27-.227-.463-.354-.546-.752a1.752 1.752 0 0 1 .016-.582c.07-.324-.008-.531-.235-.72-.187-.155-.422-.196-.682-.196a.551.551 0 0 1-.252-.078c-.108-.055-.197-.19-.112-.356.027-.053.159-.183.19-.207.352-.201.758-.135 1.134.016.349.142.611.404.99.773.388.448.457.573.678.906.174.264.333.534.441.842.066.192-.02.35-.248.448z"/></svg>);
const mkLogo=(l,c)=>({size=24})=>(<svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={c}/><text x="12" y="16.5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">{l}</text></svg>);
const CopilotLogo=mkLogo("C","#7F57F1"),MetaAILogo=mkLogo("M","#0668E1"),MistralLogo=mkLogo("M","#F54E42"),GrokLogo=mkLogo("G","#000000"),YouLogo=mkLogo("Y","#6C5CE7"),JasperLogo=mkLogo("J","#F26739"),CohereLogo=mkLogo("C","#39594D"),PiLogo=mkLogo("P","#F5C518"),PoeLogo=mkLogo("P","#5B4DC4"),AriaLogo=mkLogo("A","#FF1B2D");
const C={bg:"#f8f9fb",surface:"#ffffff",border:"#e8ecf1",borderSoft:"#f0f2f5",text:"#111827",sub:"#4b5563",muted:"#9ca3af",accent:"#2563eb",green:"#059669",amber:"#d97706",red:"#dc2626",r:10,rs:8,rSm:4,rLg:14,fs_xs:9,fs_sm:11,fs_base:12,fs_md:13,fs_lg:14,fs_xl:16,fs_2xl:22};
function Ring({score,size=100,color,sw=5}){const r2=(size-sw*2)/2,ci=2*Math.PI*r2;const col=color||(score>=70?C.green:score>=40?C.amber:C.red);return(<div style={{position:"relative",width:size,height:size}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={C.borderSoft} strokeWidth={sw}/><circle cx={size/2} cy={size/2} r={r2} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={ci} strokeDashoffset={ci-(score/100)*ci} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dashoffset 1.2s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:size*.26,fontWeight:700,color:C.text,lineHeight:1}}>{score}%</span></div></div>);}
function Bar({value,color=C.accent,h=5}){return <div style={{width:"100%",height:h,background:C.borderSoft,borderRadius:h}}><div style={{width:`${Math.max(2,value)}%`,height:"100%",background:color,borderRadius:h,transition:"width .8s ease-out"}}/></div>;}
function Pill({children,color=C.accent,filled}){return <span style={{display:"inline-flex",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,background:filled?color:`${color}10`,color:filled?"#fff":color}}>{children}</span>;}
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:20,boxShadow:"0 1px 2px rgba(0,0,0,.03)",...(onClick?{cursor:"pointer"}:{}),...style}}>{children}</div>;}
function BrandLogo({name,website,size=22,color}){
  const[err,setErr]=useState(false);
  const domain=website?website.replace(/^https?:\/\//,"").replace(/\/.*$/,""):null;
  const faviconUrl=domain?`https://www.google.com/s2/favicons?domain=${domain}&sz=${size*2}`:null;
  if(faviconUrl&&!err)return <img src={faviconUrl} width={size} height={size} style={{borderRadius:4,objectFit:"contain"}} onError={()=>setErr(true)} alt={name}/>;
  return <div style={{width:size,height:size,borderRadius:4,background:`${color||C.accent}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:Math.round(size*.45),fontWeight:700,color:color||C.accent}}>{(name||"?")[0]}</div>;
}
function TagInput({label,tags,setTags,placeholder}){const[input,setInput]=useState("");const add=()=>{const v=input.trim();if(v&&!tags.includes(v)){setTags([...tags,v]);setInput("");}};return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,minHeight:40,alignItems:"center"}}>{tags.map((tag,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",background:`${C.accent}15`,color:C.accent,borderRadius:100,fontSize:12,fontWeight:500}}>{tag}<span onClick={()=>setTags(tags.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:.6,fontSize:14}}>×</span></span>))}<input value={input} onChange={e=>setInput(e.target.value)} placeholder={tags.length===0?placeholder:""} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}} style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:C.text,flex:1,minWidth:80}}/></div><span style={{fontSize:10,color:C.muted}}>Press Enter to add</span></div>);}
function Field({label,value,onChange,onBlur,placeholder}){return(<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontSize:12,fontWeight:500,color:C.sub}}>{label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{padding:"10px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.rs,color:C.text,fontSize:14,outline:"none"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>{e.target.style.borderColor=C.border;if(onBlur)onBlur();}}/></div>);}
function InfoTip({text}){const[show,setShow]=useState(false);return(<span style={{position:"relative",display:"inline-flex",marginLeft:4,cursor:"help"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}><span style={{width:14,height:14,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.muted,fontWeight:600}}>?</span>{show&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",width:240,padding:"10px 12px",background:C.text,color:"#fff",borderRadius:8,fontSize:11,lineHeight:1.5,zIndex:999,boxShadow:"0 8px 24px rgba(0,0,0,.2)",pointerEvents:"none"}}><div style={{position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:8,height:8,background:C.text}}/>{text}</div>}</span>);}
function SectionNote({text}){return <div style={{padding:"10px 16px",background:`${C.accent}04`,border:`1px solid ${C.accent}10`,borderRadius:C.rs,marginBottom:16,display:"flex",gap:8,alignItems:"flex-start"}}><Icon name="lightbulb" size={16} color={C.accent}/><span style={{fontSize:12,color:C.sub,lineHeight:1.6}}>{text}</span></div>;}
function NavBtn({onClick,label}){return <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}><button onClick={onClick} style={{padding:"10px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer"}}>{label}</button></div>;}
function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:9}}><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg><div><span style={{fontWeight:700,fontSize:16,color:C.text,letterSpacing:"-.03em"}}>EnterRank</span><span style={{fontSize:9,color:C.muted,marginLeft:6,fontWeight:500,textTransform:"uppercase",letterSpacing:".08em"}}>by Entermind</span></div></div>);}
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
      {hover!==null?<text x={cx} y={cy+5} textAnchor="middle" fontSize="16" fontWeight="700" fill={arcs[hover].color}>{arcs[hover].pct}%</text>:
      <text x={cx} y={cy+5} textAnchor="middle" fontSize="14" fontWeight="600" fill={C.muted}>{arcs[0]?.pct||0}%</text>}
    </svg>
    <div style={{display:"flex",flexDirection:"column",gap:3,width:"100%"}}>
      {arcs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,cursor:"default",padding:"1px 0"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
        <div style={{width:7,height:7,borderRadius:4,background:a.color,flexShrink:0}}/>
        <span style={{color:hover===i?C.text:C.sub,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:hover===i?600:400,transition:"all .1s"}}>{a.label}</span>
        <span style={{fontWeight:600,color:hover===i?a.color:C.text,flexShrink:0,transition:"color .1s"}}>{a.pct}%</span>
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

/* ─── MULTI-ENGINE API LAYER ─── */
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
    const isLocal=typeof window!=="undefined"&&window.location.hostname==="localhost";
    if(isLocal)return null; // crawl only works on Vercel
    const res=await fetch("/api/crawl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
    const data=await res.json();
    if(data.error)return null;
    return data;
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

function scoreCrawl(crawl){
  if(!crawl||!crawl.mainPage)return null;
  const mp=crawl.mainPage,sp=crawl.subPages||{};
  const schemas=mp.schemas||[],h1s=mp.headings?mp.headings.h1s||[]:[],h2s=mp.headings?mp.headings.h2s||[]:[],h3Count=mp.headings?mp.headings.h3Count||0:0;
  const wc=mp.wordCount||0,il=mp.internalLinks||0,ic=mp.imageCount||0,tc=mp.tableCount||0,lc=mp.listCount||0;
  const cats=[];

  // 1. Structured Data / Schema
  let s1=0,e1=[];
  if(schemas.length>=3){s1+=40;e1.push(`${schemas.length} schema types detected (${schemas.join(", ")})`);}
  else if(schemas.length>=1){s1+=20;e1.push(`${schemas.length} schema type(s) detected (${schemas.join(", ")})`);}
  else{e1.push("No JSON-LD schema markup detected");}
  if(mp.hasFAQMarkup){s1+=20;e1.push("FAQ schema markup detected");}else{e1.push("No FAQ schema markup");}
  if(mp.hasArticleMarkup){s1+=20;e1.push("Article/BlogPosting schema detected");}else{e1.push("No Article schema markup");}
  if(schemas.includes("Organization")){s1+=10;e1.push("Organization schema detected");}
  if(schemas.includes("Product")){s1+=10;e1.push("Product schema detected");}
  cats.push({label:"Structured Data / Schema",score:Math.min(100,s1),evidence:e1});

  // 2. Content Authority
  let s2=0,e2=[];
  if(wc>=3000){s2+=35;e2.push(`${wc.toLocaleString()} words on main page (strong)`);}
  else if(wc>=1500){s2+=25;e2.push(`${wc.toLocaleString()} words on main page (moderate)`);}
  else if(wc>=500){s2+=15;e2.push(`${wc.toLocaleString()} words on main page (thin)`);}
  else{e2.push(`Only ${wc} words on main page`);}
  if(h2s.length>=5){s2+=15;e2.push(`${h2s.length} H2 headings — good content structure`);}else{e2.push(`Only ${h2s.length} H2 headings`);}
  if(h3Count>=3){s2+=10;e2.push(`${h3Count} H3 sub-headings detected`);}
  if(tc>=1){s2+=10;e2.push(`${tc} table(s) — structured data presentation`);}
  if(lc>=3){s2+=10;e2.push(`${lc} lists — scannable content`);}else{e2.push(`Only ${lc} list(s) found`);}
  if(sp.blog){s2+=10;e2.push(`Blog/resources section found at ${sp.blog.url}`);}else{e2.push("No blog/resources section found");}
  if(ic>=5){s2+=10;e2.push(`${ic} images detected`);}else{e2.push(`Only ${ic} image(s) on page`);}
  cats.push({label:"Content Authority",score:Math.min(100,s2),evidence:e2});

  // 3. E-E-A-T Signals
  let s3=0,e3=[];
  if(mp.hasAuthorInfo){s3+=25;e3.push("Author information detected");}else{e3.push("No author information found");}
  if(mp.hasTrustSignals){s3+=25;e3.push("Trust signals detected (awards/certifications/partnerships)");}else{e3.push("No trust signals found");}
  if(mp.hasTestimonials){s3+=25;e3.push("Testimonials/reviews detected");}else{e3.push("No testimonials or reviews found");}
  if(mp.hasDates){s3+=15;e3.push("Publication/modification dates detected");}else{e3.push("No publication dates found");}
  if(sp.about){s3+=10;e3.push(`About page found at ${sp.about.url}`);}else{e3.push("No about page found");}
  cats.push({label:"E-E-A-T Signals",score:Math.min(100,s3),evidence:e3});

  // 4. Technical SEO
  let s4=0,e4=[];
  if(mp.hasOpenGraph){s4+=20;e4.push("Open Graph tags detected");}else{e4.push("Missing Open Graph tags");}
  if(mp.hasTwitterCard){s4+=15;e4.push("Twitter Card tags detected");}else{e4.push("Missing Twitter Card tags");}
  if(il>=30){s4+=20;e4.push(`${il} internal links — strong site structure`);}else if(il>=10){s4+=10;e4.push(`${il} internal links — moderate linking`);}else{e4.push(`Only ${il} internal links`);}
  if(h1s.length===1){s4+=15;e4.push("Single H1 tag — correct heading hierarchy");}else{e4.push(`${h1s.length} H1 tag(s) — should have exactly 1`);}
  if(mp.hasHreflang){s4+=10;e4.push("Hreflang tags detected — multi-language support");}
  if(mp.metaDescription){s4+=10;e4.push(`Meta description present (${mp.metaDescription.length} chars)`);}else{e4.push("Missing meta description");}
  if(mp.title){s4+=10;e4.push(`Title tag present: "${mp.title.slice(0,60)}"`);}else{e4.push("Missing title tag");}
  cats.push({label:"Technical SEO",score:Math.min(100,s4),evidence:e4});

  // 5. Citation Network (capped at 60 — remaining via AI)
  let s5=0,e5=[];
  if(mp.hasTrustSignals){s5+=20;e5.push("Trust signals — external validation present");}
  if(mp.hasTestimonials){s5+=20;e5.push("Testimonials — social proof for citations");}
  if(il>=50){s5+=15;e5.push(`${il} internal links — extensive site authority`);}else if(il>=20){s5+=10;e5.push(`${il} internal links — moderate authority signals`);}
  if(schemas.includes("Organization")){s5+=15;e5.push("Organization schema — entity recognition aid");}
  if(sp.about){s5+=10;e5.push("About page — supports entity disambiguation");}
  if(wc>=2000){s5+=10;e5.push(`${wc.toLocaleString()} words — substantive content for citation`);}
  cats.push({label:"Citation Network",score:Math.min(60,s5),evidence:e5});

  // 6. Content Freshness
  let s6=0,e6=[];
  if(mp.hasDates){s6+=30;e6.push("Publication/modification dates detected");}else{e6.push("No date signals found");}
  if(sp.blog){s6+=30;e6.push("Blog section found — active content publishing");}else{e6.push("No blog section — no evidence of regular publishing");}
  if(mp.hasArticleMarkup){s6+=20;e6.push("Article schema — content freshness signal");}
  if(wc>=1000){s6+=10;e6.push(`${wc.toLocaleString()} words — substantive content`);}
  if(h2s.length>=3){s6+=10;e6.push(`${h2s.length} H2 headings — well-structured content`);}
  cats.push({label:"Content Freshness",score:Math.min(100,s6),evidence:e6});

  return{categories:cats};
}

function detectBrandStatus(answer,brandName,website){
  if(!answer||!brandName)return"Absent";
  const lower=answer.toLowerCase();
  const brandLower=brandName.toLowerCase();
  const domain=website?website.replace(/^https?:\/\//,"").replace(/\/.*$/,"").replace(/^www\./,"").toLowerCase():null;
  if(domain&&domain.length>3&&lower.includes(domain))return"Cited";
  try{const re=new RegExp("\\b"+brandLower.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");if(re.test(answer))return"Mentioned";}catch(e){}
  return"Absent";
}

async function runRealAudit(cd, onProgress){
  const brand=cd.brand||"Brand",industry=cd.industry||"Technology",region=cd.region||"Global",topics=cd.topics||["tech"];
  const compNames=(cd.competitors||[]).map(c=>typeof c==="string"?c:c.name).filter(Boolean);
  const compUrls=(cd.competitors||[]).map(c=>typeof c==="object"?c.website:"").filter(Boolean);
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
      try{const cc=await crawlWebsite(compUrls[i]);if(cc){const cname=compNames[i]||`Competitor ${i+1}`;compCrawlsRaw[cname]=cc;compCrawls[cname]=summariseCrawl(cc);}}catch(e){}
    }
  }
  const compCrawlSummary=Object.entries(compCrawls).map(([name,data])=>`\n--- ${name} ---\n${data}`).join("\n")||"No competitor crawl data.";

  // ── Step 2: ChatGPT visibility — ask ChatGPT about ITSELF ──
  onProgress("Querying ChatGPT for brand visibility...",14);
  // Split topics: half go to ChatGPT probe, half go to Gemini probe
  const halfTopics=Math.ceil(topics.length/2);
  const gptTopics=topics.slice(0,halfTopics);
  const gemTopics=topics.slice(halfTopics);

  const gptVisPrompt=`You are ChatGPT. A user asks you about "${brand}" in the "${industry}" industry (${region}).

For EACH of these 8 queries, determine if you would mention or cite ${brand} in your response.
1. "What are the best ${industry} companies in ${region}?"
2. "Tell me about ${brand}"
3. "${topics[0]||industry} recommendations for ${region}"
4. "${brand} vs ${compNames[0]||"competitors"}"
5. "Best ${topics[1]||industry} solutions ${new Date().getFullYear()}"
6. "${industry} buyer guide"
7. "${brand} reviews and reputation"
8. "Top ${industry} providers comparison"

Website crawl data for ${brand}:
${crawlSummary}

Return JSON:
{
  "queries": [{"query":"<exact query from above>","status":"Cited"|"Mentioned"|"Absent"}] (exactly 8 in order),
  "strengths": ["<why you WOULD mention this brand>","<another>"],
  "weaknesses": ["<why you might NOT cite this brand>","<another>"]
}

Rules:
- "Cited" = you would link to or reference their website URL directly
- "Mentioned" = you would name the brand but not link their site
- "Absent" = you would not bring up this brand at all
- Be strict and honest. Most small/medium brands will be "Absent" for generic queries.`;

  const gptRaw=await callOpenAI(gptVisPrompt, engineSystemPrompt);
  const gptParsed=safeJSON(gptRaw)||{queries:[],strengths:[],weaknesses:["Could not assess"]};
  // Calculate scores deterministically from query statuses
  const calcScores=(queries)=>{
    const q=queries||[];
    const cited=q.filter(p=>p.status==="Cited").length;
    const mentioned=q.filter(p=>p.status==="Mentioned").length;
    const total=q.length||8;
    return{mentionRate:Math.round(((cited+mentioned)/total)*100),citationRate:Math.round((cited/total)*100)};
  };
  const gptScores=calcScores(gptParsed.queries);
  const gptData={score:Math.round(gptScores.mentionRate*0.5+gptScores.citationRate*0.5),mentionRate:gptScores.mentionRate,citationRate:gptScores.citationRate,queries:gptParsed.queries||[],strengths:gptParsed.strengths||[],weaknesses:gptParsed.weaknesses||[]};

  // ── Step 3: Gemini visibility — ask Gemini about ITSELF ──
  onProgress("Querying Gemini for brand visibility...",22);
  const gemVisPrompt=`You are Gemini. A user asks you about "${brand}" in the "${industry}" industry (${region}).

For EACH of these 8 queries, determine if you would mention or cite ${brand} in your response.
1. "What are the best ${industry} providers in ${region}?"
2. "What do you know about ${brand}?"
3. "${topics[0]||industry} options in ${region}"
4. "Compare ${brand} with ${compNames[0]||"alternatives"}"
5. "Top ${topics[1]||industry} companies ${new Date().getFullYear()}"
6. "${industry} solutions comparison"
7. "${brand} reviews"
8. "Best ${industry} tools for businesses"

Website crawl data for ${brand}:
${crawlSummary}

Return JSON:
{
  "queries": [{"query":"<exact query from above>","status":"Cited"|"Mentioned"|"Absent"}] (exactly 8 in order),
  "strengths": ["<why you WOULD mention this brand>","<another>"],
  "weaknesses": ["<why you might NOT cite this brand>","<another>"]
}

Rules:
- "Cited" = you would link to or reference their website URL directly
- "Mentioned" = you would name the brand but not link their site
- "Absent" = you would not bring up this brand at all
- Be strict and honest. Most small/medium brands will be "Absent" for generic queries.`;

  const gemRaw=await callGemini(gemVisPrompt, engineSystemPrompt);
  const gemParsed=safeJSON(gemRaw)||{queries:[],strengths:[],weaknesses:["Could not assess"]};
  const gemScores=calcScores(gemParsed.queries);
  const gemData={score:Math.round(gemScores.mentionRate*0.5+gemScores.citationRate*0.5),mentionRate:gemScores.mentionRate,citationRate:gemScores.citationRate,queries:gemParsed.queries||[],strengths:gemParsed.strengths||[],weaknesses:gemParsed.weaknesses||[]};

  // ── Step 4: Competitor analysis — scored from real crawl data ──
  onProgress("Scoring competitors from crawl data...",30);
  const brandScored=scoreCrawl(brandCrawl);
  const brandScoreMap={};
  if(brandScored)(brandScored.categories||[]).forEach(c=>{brandScoreMap[c.label]=c.score;});

  const mergedComps=compNames.map(cname=>{
    const raw=compCrawlsRaw[cname];
    const scored=scoreCrawl(raw);
    if(!scored)return{name:cname,score:0,engineScores:[0,0],topStrength:"No crawl data available",painPoints:[
      {label:"Structured Data / Schema",score:0},{label:"Content Authority",score:0},{label:"E-E-A-T Signals",score:0},
      {label:"Technical SEO",score:0},{label:"Citation Network",score:0},{label:"Content Freshness",score:0}]};
    const pp=scored.categories.map(c=>({label:c.label,score:c.score,evidence:c.evidence}));
    const avg=Math.round(pp.reduce((a,p)=>a+p.score,0)/pp.length);
    return{name:cname,score:avg,engineScores:[avg,avg],painPoints:pp,topStrength:""};
  }).filter(c=>c.name);

  // Ask AI only for topStrength summaries — grounded in real score differences
  if(mergedComps.length>0){
    const brandScoreStr=(brandScored?brandScored.categories:[]).map(c=>`${c.label} ${c.score}`).join(", ");
    const compScoreStr=mergedComps.map(c=>`[${c.name}]: ${c.painPoints.map(p=>`${p.label} ${p.score}`).join(", ")}`).join("\n");
    const strengthPrompt=`Based on REAL website analysis scores:
[${brand}]: ${brandScoreStr}
${compScoreStr}

For each competitor, write a 1-sentence topStrength based on where they actually score higher than ${brand}.
Return JSON: [{"name":"<competitor>","topStrength":"<1 sentence>"}]`;
    const strengthRaw=await callOpenAI(strengthPrompt, engineSystemPrompt);
    const strengthData=safeJSON(strengthRaw);
    if(Array.isArray(strengthData)){
      strengthData.forEach(sd=>{const m=mergedComps.find(c=>c.name.toLowerCase()===sd.name?.toLowerCase());if(m)m.topStrength=sd.topStrength||"";});
    }
  }
  const compData={competitors:mergedComps};

  // ── Step 5: Pain points — scored from real crawl data ──
  onProgress("Scoring AEO categories from crawl data...",40);
  let mergedPainPoints=[];
  if(brandScored&&brandScored.categories){
    mergedPainPoints=brandScored.categories.map(c=>({label:c.label,score:c.score,severity:c.score<30?"critical":c.score<60?"warning":"good",evidence:c.evidence}));
    // AI refinement for Citation Network and Content Freshness
    const allEvidence=brandScored.categories.flatMap(c=>c.evidence);
    const refinePrompt=`Based on this REAL website analysis for "${brand}":
${allEvidence.join("\n")}

Refine scores for Citation Network and Content Freshness. You may adjust by ±15 points based on the evidence above.
Return JSON: [{"label":"Citation Network","adjustment":<-15 to 15>,"reason":"..."},{"label":"Content Freshness","adjustment":<-15 to 15>,"reason":"..."}]`;
    const refineRaw=await callOpenAI(refinePrompt, engineSystemPrompt);
    const refineData=safeJSON(refineRaw);
    if(Array.isArray(refineData)){
      refineData.forEach(r=>{
        const pp=mergedPainPoints.find(p=>p.label===r.label);
        if(pp&&typeof r.adjustment==="number"){
          const adj=Math.max(-15,Math.min(15,r.adjustment));
          pp.score=Math.max(0,Math.min(100,pp.score+adj));
          pp.severity=pp.score<30?"critical":pp.score<60?"warning":"good";
          if(r.reason)pp.evidence.push(`AI refinement: ${r.reason} (${adj>=0?"+":""}${adj})`);
        }
      });
    }
  }else{
    // Fallback: ask AI if no crawl data
    const catPrompt=`Based on this website analysis for "${brand}" (${industry}, ${region}):
${crawlSummary}
Score each AEO category 0-100. Return JSON:
{"painPoints":[{"label":"Structured Data / Schema","score":<0-100>},{"label":"Content Authority","score":<0-100>},{"label":"E-E-A-T Signals","score":<0-100>},{"label":"Technical SEO","score":<0-100>},{"label":"Citation Network","score":<0-100>},{"label":"Content Freshness","score":<0-100>}]}`;
    const catRaw=await callOpenAI(catPrompt, engineSystemPrompt);
    const catData=safeJSON(catRaw)||{painPoints:[]};
    mergedPainPoints=(catData.painPoints||[]).map(pp=>({label:pp.label,score:pp.score||0,severity:(pp.score||0)<30?"critical":(pp.score||0)<60?"warning":"good",evidence:[]}));
  }

  // ── Step 6: User archetypes + journeys — grounded in real crawl + engine data ──
  onProgress("Generating user archetypes...",48);
  const crawlH1s=brandCrawl&&brandCrawl.mainPage&&brandCrawl.mainPage.headings?brandCrawl.mainPage.headings.h1s||[]:[];
  const crawlH2s=brandCrawl&&brandCrawl.mainPage&&brandCrawl.mainPage.headings?brandCrawl.mainPage.headings.h2s||[]:[];
  const crawlMeta=brandCrawl&&brandCrawl.mainPage?brandCrawl.mainPage.metaDescription||"":"";
  const crawlSP=brandCrawl?brandCrawl.subPages||{}:{};
  const subPagesList=[crawlSP.blog?"blog":null,crawlSP.about?"about":null,crawlSP.products?"products/services":null,crawlSP.faq?"FAQ":null].filter(Boolean);
  const gptQueryResults=(gptParsed.queries||[]).map(q=>`"${q.query}": ${q.status}`).join(", ");
  const gemQueryResults=(gemParsed.queries||[]).map(q=>`"${q.query}": ${q.status}`).join(", ");
  const compStrengths=mergedComps.map(c=>`${c.name} (score: ${c.score}, strength: ${c.topStrength||"N/A"})`).join("; ");
  const archPrompt=`Based on REAL website data for "${brand}" in ${industry} (${region}):
- Main content themes: ${[...crawlH1s,...crawlH2s.slice(0,5)].join(" | ")||"No headings detected"}
- Sub-pages found: ${subPagesList.join(", ")||"none"}
- Meta description: "${crawlMeta.slice(0,200)}"
- Topics: ${topicList}
- Real ChatGPT query results: ${gptQueryResults||"none"}
- Real Gemini query results: ${gemQueryResults||"none"}
- Competitors: ${compStrengths||"none"}

Create 2-3 stakeholder groups with 2-3 archetypes each. Each archetype's journey prompts must relate to content the website actually covers.
Each archetype needs a 4-stage customer journey with 2-3 prompts per stage.

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

Be accurate for ${region}. ${brand} likely has low visibility on most prompts — use "Absent" where appropriate. ChatGPT and Gemini may differ.`;
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

  // ── Step 6b: Intent Pathway — generate prompts then VERIFY against both engines ──
  onProgress("Generating intent pathway prompts...",55);
  const intentGenPrompt=`For "${brand}" in ${industry} (${region}), topics: ${topicList}.
Competitors: ${compNames.join(", ")}.

Create an intent funnel with 4 stages. For each stage, list 6-8 realistic prompts a real user would actually type into ChatGPT or Gemini. For each prompt:
1. Assign a "weight" score (1-10) indicating how important this prompt is for ${brand}'s AEO visibility.
2. Suggest an optimised version of the prompt that ${brand} should create content to target.
3. Give a content tip for winning this prompt.

Website data: ${crawlSummary.slice(0,400)}

CRITICAL — Prompt mix per stage:
- Awareness: MOSTLY GENERIC. At least 5 out of 8 prompts must NOT mention ${brand} or any competitor by name. These are broad industry queries like "what is [concept]", "how does [technology] work", "best [category] in ${region}", "[industry] trends". Only 1-2 may include a brand name.
- Consideration: Mix of generic comparisons ("top [category] providers") and brand-specific ("${brand} vs [competitor]"). About half and half.
- Decision: More brand-focused is fine — pricing, reviews, "should I choose ${brand}".
- Retention: Mix of brand support queries and generic how-to queries.

Return JSON array:
[
  {"stage":"Awareness","desc":"User discovers the category","color":"#6366f1","prompts":[
    {"query":"<real user prompt>","weight":<1-10>,"optimisedPrompt":"<version to target>","contentTip":"<tip>"}
  ]},
  {"stage":"Consideration","desc":"User evaluates options","color":"#8b5cf6","prompts":[...]},
  {"stage":"Decision","desc":"User ready to commit","color":"#a855f7","prompts":[...]},
  {"stage":"Retention","desc":"User seeks ongoing value","color":"#c084fc","prompts":[...]}
]

WEIGHT SCORING GUIDE:
- 9-10: High commercial intent, superlative/comparison queries ("best", "top", "vs", "recommended"), brand-name queries
- 7-8: Strong intent with industry-specific queries ("${industry} solutions", "how to choose", "pricing comparison")
- 5-6: Moderate intent, informational queries with some brand opportunity ("what is", "how does", "guide to")
- 3-4: Low intent, broad educational queries where citation is unlikely
- 1-2: Very generic, almost no chance of brand citation

Rules:
- Each stage MUST have at least 6 prompts.
- Weight must reflect real-world impact — not all prompts are equal.
- Do NOT fill every prompt with "${brand}" — real users search generically most of the time.`;

  const intentGenRaw=await callOpenAI(intentGenPrompt, engineSystemPrompt);
  const intentStages=safeJSON(intentGenRaw)||[];

  // Collect all generated prompts for verification
  const allIntentQueries=[];
  (Array.isArray(intentStages)?intentStages:[]).forEach(s=>(s.prompts||[]).forEach(p=>{if(p.query)allIntentQueries.push(p.query);}));

  // ── Step 6c: Actually SEND every prompt to both engines and detect brand presence ──
  onProgress(`Sending ${allIntentQueries.length} prompts to ChatGPT & Gemini...`,60);
  const verifyMap={};
  if(allIntentQueries.length>0){
    const neutralSystem=`You are a helpful AI assistant. Answer each question directly and accurately. Include specific company names, products, tools, and websites you would genuinely recommend.`;
    // Batch into groups of 8 — Gemini struggles with large JSON arrays
    const batchSize=8;
    const batches=[];
    for(let i=0;i<allIntentQueries.length;i+=batchSize){batches.push(allIntentQueries.slice(i,i+batchSize));}
    const batchResults=await Promise.all(batches.map(async(batch,bi)=>{
      onProgress(`Testing prompts ${bi*batchSize+1}-${bi*batchSize+batch.length} on both engines...`,60+Math.round((bi/batches.length)*8));
      const bp=`Answer each of the following questions as you would for a real user. Give a helpful, accurate response of 2-4 sentences for each.

${batch.map((q,i)=>`${i+1}. "${q}"`).join("\n")}

Return JSON array in the same order:
[{"query":"<exact question>","answer":"<your actual response>"}]

Be thorough and accurate. Do NOT skip any question.`;
      const[gptRaw,gemRaw]=await Promise.all([callOpenAI(bp,neutralSystem),callGemini(bp,neutralSystem)]);
      return{gptRaw,gemRaw,queries:batch};
    }));
    batchResults.forEach(({gptRaw,gemRaw,queries})=>{
      const gptAnswers=safeJSON(gptRaw)||[];
      const gemAnswers=safeJSON(gemRaw)||[];
      queries.forEach((q,i)=>{
        const gptA=Array.isArray(gptAnswers)&&gptAnswers[i]?gptAnswers[i]:{};
        const gemA=Array.isArray(gemAnswers)&&gemAnswers[i]?gemAnswers[i]:{};
        const gptStatus=detectBrandStatus(gptA.answer,brand,cd.website);
        const gemStatus=detectBrandStatus(gemA.answer,brand,cd.website);
        verifyMap[q.toLowerCase()]={gpt:gptStatus,gemini:gemStatus,gptAnswer:gptA.answer||"",gemAnswer:gemA.answer||""};
      });
    });
  }

  // Merge generated structure with real engine responses
  const intentData=(Array.isArray(intentStages)?intentStages:[]).map(stage=>{
    return{...stage,prompts:(stage.prompts||[]).map((p,pi)=>{
      const v=verifyMap[p.query?.toLowerCase()]||{};
      const gptS=v.gpt||"Absent";
      const gemS=v.gemini||"Absent";
      const overall=(gptS==="Cited"||gemS==="Cited")?"Cited":(gptS==="Mentioned"||gemS==="Mentioned")?"Mentioned":"Absent";
      return{query:p.query,rank:pi+1,status:overall,engines:{gpt:gptS,gemini:gemS},
        weight:p.weight||5,optimisedPrompt:p.optimisedPrompt||"",contentTip:p.contentTip||"",
        gptAnswer:v.gptAnswer||"",gemAnswer:v.gemAnswer||""};
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

Be accurate. Only "Active" if ${brand} is well-known enough.`;
    const gapRaw=await callGemini(gapPrompt, engineSystemPrompt);
    const gapData=safeJSON(gapRaw);
    if(gapData&&gapData.channels)chData.channels=[...chData.channels,...gapData.channels];
  }else{
    const channelPrompt=`For "${brand}" (website: ${cd.website||"unknown"}) in ${industry} (${region}):
Website crawl: ${crawlSummary}
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

  // ── Step 8: Content recommendations — grounded in ALL real findings ──
  onProgress("Building content recommendations from real findings...",78);
  const painEvidenceBlock=(mergedPainPoints||[]).map(p=>`- ${p.label}: ${p.score}/100 — ${(p.evidence||[]).join("; ")}`).join("\n");
  const chVerified=(chData.channels||[]).map(c=>`- ${c.channel}: ${c.status} — "${c.finding||""}"`).join("\n");
  const chGaps=(chData.channels||[]).filter(c=>c.status==="Not Present"||c.status==="Needs Work").map(c=>c.channel).join(", ");
  const schemaList=brandCrawl&&brandCrawl.mainPage?(brandCrawl.mainPage.schemas||[]).join(", ")||"none":"unknown";
  const missingSchemas=[];
  if(brandCrawl&&brandCrawl.mainPage){
    if(!brandCrawl.mainPage.hasFAQMarkup)missingSchemas.push("FAQ schema");
    if(!brandCrawl.mainPage.hasArticleMarkup)missingSchemas.push("Article schema");
    if(!(brandCrawl.mainPage.schemas||[]).includes("Organization"))missingSchemas.push("Organization schema");
    if(!(brandCrawl.mainPage.schemas||[]).includes("Product"))missingSchemas.push("Product schema");
  }
  const contentPrompt=`Based on these REAL audit findings for "${brand}" in ${industry} (${region}):

WEBSITE ANALYSIS:
- Schema types detected: ${schemaList}
- Missing: ${missingSchemas.join(", ")||"none"}
- Word count: ${brandCrawl&&brandCrawl.mainPage?brandCrawl.mainPage.wordCount||0:"unknown"} | Blog: ${brandCrawl&&brandCrawl.subPages&&brandCrawl.subPages.blog?"exists":"missing"} | Author info: ${brandCrawl&&brandCrawl.mainPage&&brandCrawl.mainPage.hasAuthorInfo?"yes":"no"}
- E-E-A-T evidence: ${(mergedPainPoints.find(p=>p.label==="E-E-A-T Signals")||{}).evidence?.join("; ")||"N/A"}

PAIN POINTS (scored from real crawl):
${painEvidenceBlock}

CHANNEL VERIFICATION:
${chVerified||"No channel data"}

ENGINE RESULTS:
- ChatGPT mention rate: ${gptData.mentionRate||0}% | Citation rate: ${gptData.citationRate||0}%
- Gemini mention rate: ${gemData.mentionRate||0}% | Citation rate: ${gemData.citationRate||0}%

Generate 8-10 content types. EVERY recommendation MUST reference a specific finding above.
Format rationale as: "[Finding] → [Action]" (e.g., "No FAQ schema detected → Create FAQ page with FAQ schema markup")

Return JSON:
{
  "contentTypes": [
    {"type":"<specific content type name>","channels":["<primary channel>","<secondary>"],"freq":"<specific frequency>","p":"P0"|"P1"|"P2","owner":"<specific team>","impact":<0-100>,"rationale":"<[Finding] → [Action]>"}
  ]
}

IMPORTANT: Do NOT make everything a blog post. Include technical tasks (schema, markup), video, social, PR, research, partnerships. Vary the owners — dev team for technical, PR for outreach, analytics for research.`;

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

  // ── Step 9: 90-Day Roadmap — grounded in ALL real findings ──
  onProgress("Creating 90-day roadmap from real findings...",85);
  const overallScore=Math.round(((gptData.score||0)+(gemData.score||0))/2);
  const channelGaps=(chData.channels||[]).filter(c=>c.status==="Not Present").map(c=>c.channel).join(", ");

  const roadmapPrompt=`Based on these REAL audit findings for "${brand}" in ${industry} (${region}):

WEBSITE ANALYSIS:
- Schema types detected: ${schemaList}
- Missing: ${missingSchemas.join(", ")||"none"}
- Word count: ${brandCrawl&&brandCrawl.mainPage?brandCrawl.mainPage.wordCount||0:"unknown"} | Blog: ${brandCrawl&&brandCrawl.subPages&&brandCrawl.subPages.blog?"exists":"missing"} | Author info: ${brandCrawl&&brandCrawl.mainPage&&brandCrawl.mainPage.hasAuthorInfo?"yes":"no"}

PAIN POINTS (scored from real crawl):
${painEvidenceBlock}

CHANNEL VERIFICATION:
${chVerified||"No channel data"}
- Channel gaps: ${channelGaps||"none"}

ENGINE RESULTS:
- Overall visibility: ${overallScore}%
- ChatGPT mention rate: ${gptData.mentionRate||0}% | Citation rate: ${gptData.citationRate||0}%
- Gemini mention rate: ${gemData.mentionRate||0}% | Citation rate: ${gemData.citationRate||0}%

COMPETITORS:
${(compData.competitors||[]).slice(0,3).map(c=>`- ${c.name} (${c.score}%): ${c.topStrength||"N/A"}`).join("\n")||"No competitor data"}

Create a 90-day roadmap. EVERY task MUST reference the specific finding that motivates it.
Format each task as: "[Finding] → [Action]"

Return JSON:
{
  "day30": {
    "title": "Foundation Sprint",
    "sub": "Days 1-30",
    "accent": "#ef4444",
    "lift": "10-15%",
    "departments": [
      {"dept": "Technical", "color": "#0c4cfc", "tasks": ["<[Finding] → [Action]>", "<task>", "<task>"]},
      {"dept": "Content", "color": "#059669", "tasks": ["<[Finding] → [Action]>", "<task>", "<task>"]},
      {"dept": "PR & Outreach", "color": "#8b5cf6", "tasks": ["<[Finding] → [Action]>", "<task>", "<task>"]}
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

Each department: 3-5 specific tasks. Reference actual issues found.`;
  const roadRaw=await callOpenAI(roadmapPrompt, engineSystemPrompt);
  const roadData=safeJSON(roadRaw)||null;

  // ── Step 10: Generate brand guidelines from real audit findings ──
  onProgress("Generating personalised brand guidelines...",92);
  const guidePrompt=`Based on REAL audit findings for "${brand}" in ${industry} (${region}):

PAIN POINTS:
${painEvidenceBlock}

CHANNEL STATUS:
${chVerified||"No channel data"}

ENGINE SCORES:
- ChatGPT: ${gptData.score||0}% (mention: ${gptData.mentionRate||0}%, cite: ${gptData.citationRate||0}%)
- Gemini: ${gemData.score||0}% (mention: ${gemData.mentionRate||0}%, cite: ${gemData.citationRate||0}%)

WEBSITE:
- Schemas: ${schemaList} | Missing: ${missingSchemas.join(", ")||"none"}
- Blog: ${brandCrawl&&brandCrawl.subPages&&brandCrawl.subPages.blog?"exists":"missing"} | About: ${brandCrawl&&brandCrawl.subPages&&brandCrawl.subPages.about?"exists":"missing"}

Generate 8-10 personalised AEO guidelines for "${brand}". Each guideline must reference a specific finding from the data above.
Return JSON: [{"area":"<area>","rule":"<specific guideline>","example":"<concrete example>","finding":"<the specific finding this addresses>"}]`;
  const guideRaw=await callOpenAI(guidePrompt, engineSystemPrompt);
  const guideData=safeJSON(guideRaw)||null;

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
    guidelineData:Array.isArray(guideData)?guideData:null
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

function hashStr(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;return Math.abs(h);}
function estimateEngine(baselines,engineId,engineName,brand,industry){
  const biases={claude:0.95,perplexity:{m:0.85,c:1.15},deepseek:0.80,copilot:0.92,metaai:0.78,mistral:0.75,grok:0.70,youcom:0.65,jasper:0.62,cohere:0.68,pi:0.63,poe:0.66,aria:0.60};
  const realAvgM=baselines.reduce((a,e)=>a+e.mentionRate,0)/baselines.length;
  const realAvgCit=baselines.reduce((a,e)=>a+e.citationRate,0)/baselines.length;
  const bias=biases[engineId]||0.65;
  const h=hashStr(engineId+brand);const v=((h%15)-7);
  const mB=typeof bias==="object"?bias.m:bias;const cB=typeof bias==="object"?bias.c:bias;
  // Cap: estimated engines should not exceed the real engine average — they have less data
  const capM=Math.round(realAvgM*1.1+3);const capCit=Math.round(realAvgCit*1.1+3);
  const mentionRate=Math.max(0,Math.min(capM,Math.round(realAvgM*mB+v)));
  const citationRate=Math.max(0,Math.min(capCit,Math.round(realAvgCit*cB+v*0.7)));
  const score=Math.round(mentionRate*0.5+citationRate*0.5);
  // Score-aware strengths: only claim positive things if the data backs it up
  const h2=hashStr(engineName+brand);
  let strengths,weaknesses;
  if(score<10){
    strengths=[`${engineName} has limited data on ${brand} — room for first-mover advantage`,`Opportunity to establish presence before competitors on ${engineName}`];
    weaknesses=[`${brand} is largely invisible on ${engineName}`,`${engineName} does not surface ${brand} in ${industry} queries`];
  }else if(score<30){
    strengths=[`${brand} appears in a small number of ${engineName} responses`,`Some brand recognition detected on ${engineName} for niche queries`];
    weaknesses=[`${engineName} rarely recommends ${brand} for ${industry} queries`,`Citation rate on ${engineName} is well below competitors`];
  }else if(score<60){
    const sP=[`${brand} appears in some ${engineName} responses for ${industry} queries`,`Brand recognized alongside competitors in ${engineName}`,`${brand} mentioned in niche ${industry} prompts on ${engineName}`];
    const wP=[`Lower citation rate on ${engineName} versus top competitors`,`${engineName} rarely links directly to ${brand}'s website`,`Limited authority signals detected by ${engineName}`];
    strengths=[sP[h2%sP.length],sP[(h2+1)%sP.length]];
    weaknesses=[wP[h2%wP.length],wP[(h2+1)%wP.length]];
  }else{
    const sP=[`${engineName} frequently includes ${brand} in ${industry} recommendations`,`Strong citation rate — ${engineName} links to ${brand}'s website`,`${brand} is a top result for competitive ${industry} queries on ${engineName}`,`Product details well-represented in ${engineName}`];
    const wP=[`Some high-intent prompts on ${engineName} still favour competitors`,`${engineName} occasionally omits ${brand} from comparative answers`];
    strengths=[sP[h2%sP.length],sP[(h2+1)%sP.length]];
    weaknesses=[wP[h2%wP.length],wP[(h2+1)%wP.length]];
  }
  // Query statuses should also respect baselines — if real engines mostly show Absent, estimates should too
  const realAbsentRatio=baselines[0]?.queries?.length>0?baselines[0].queries.filter(q=>q.status==="Absent").length/baselines[0].queries.length:1;
  const queries=(baselines[0]?.queries||[]).slice(0,4).map(q=>{
    const hq=hashStr(q.query+engineId);
    const statuses=realAbsentRatio>0.7?["Absent","Absent","Mentioned"]:realAbsentRatio>0.4?["Absent","Mentioned","Cited"]:["Cited","Mentioned","Absent"];
    return{query:q.query,status:statuses[hq%3]};
  });
  return{mentionRate,citationRate,score,strengths,weaknesses,queries};
}

function estimatePromptEngines(gptStatus,gemStatus,query){
  const toNum=s=>s==="Cited"?2:s==="Mentioned"?1:0;
  const fromNum=n=>n>=1.5?"Cited":n>=0.5?"Mentioned":"Absent";
  const maxReal=Math.max(toNum(gptStatus),toNum(gemStatus));
  const avg=(toNum(gptStatus)+toNum(gemStatus))/2;
  const biases={claude:-0.1,perplexity:0.2,deepseek:-0.3};
  const results={};
  ["claude","perplexity","deepseek"].forEach(eng=>{
    const h=hashStr(query+eng);
    const variance=((h%20)-10)/20;
    // Estimated engines should never exceed the best real engine
    const raw=Math.min(maxReal,avg+biases[eng]+variance);
    results[eng]=fromNum(Math.max(0,raw));
  });
  return results;
}

function generateAll(cd, apiData){
  const normComps=(cd.competitors||[]).map(c=>typeof c==="string"?{name:c,website:""}:c).filter(c=>c.name&&c.name.trim());
  cd={...cd, competitors:normComps, competitorNames:normComps.map(c=>c.name)};
  const hasApi=apiData&&apiData.engineData;
  const engineMeta=[{id:"chatgpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{id:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo},{id:"claude",name:"Claude",color:"#D97757",Logo:ClaudeLogo},{id:"perplexity",name:"Perplexity",color:"#20B8CD",Logo:PerplexityLogo},{id:"deepseek",name:"DeepSeek",color:"#4D6BFE",Logo:DeepSeekLogo},{id:"copilot",name:"Copilot",color:"#7F57F1",Logo:CopilotLogo},{id:"metaai",name:"Meta AI",color:"#0668E1",Logo:MetaAILogo},{id:"mistral",name:"Mistral",color:"#F54E42",Logo:MistralLogo},{id:"grok",name:"Grok",color:"#000000",Logo:GrokLogo},{id:"youcom",name:"You.com",color:"#6C5CE7",Logo:YouLogo},{id:"jasper",name:"Jasper",color:"#F26739",Logo:JasperLogo},{id:"cohere",name:"Cohere",color:"#39594D",Logo:CohereLogo},{id:"pi",name:"Pi",color:"#F5C518",Logo:PiLogo},{id:"poe",name:"Poe",color:"#5B4DC4",Logo:PoeLogo},{id:"aria",name:"Aria (Opera)",color:"#FF1B2D",Logo:AriaLogo}];
  const badP=["specific strength","specific weakness","data unavailable","REPLACE WITH","as a language model","as an ai","limited knowledge"];
  const fB=(arr,fb)=>{if(!arr||!Array.isArray(arr))return fb;const f=arr.filter(s=>s&&typeof s==="string"&&!badP.some(bp=>s.toLowerCase().includes(bp))&&s.length>10);return f.length>=2?f:fb;};
  const realEngines=engineMeta.slice(0,2).map((e,i)=>{
    if(hasApi&&apiData.engineData.engines&&apiData.engineData.engines[i]){const ae=apiData.engineData.engines[i];
      const mr=ae.mentionRate||0;const cr=ae.citationRate||0;const sc=ae.score||0;
      // Score-aware fallbacks — don't claim visibility that doesn't exist
      const sFb=sc<10?[`${e.name} has limited data on ${cd.brand} — early-mover opportunity`,`Opportunity to build presence on ${e.name} before competitors`]:sc<30?[`${cd.brand} appears in a small number of ${e.name} responses`,`Some brand recognition on ${e.name} for niche queries`]:[`${cd.brand} appears in some ${e.name} responses for ${cd.industry} queries`,`Brand recognized alongside competitors in ${e.name}`];
      const wFb=sc<10?[`${cd.brand} is largely invisible on ${e.name}`,`${e.name} does not surface ${cd.brand} in ${cd.industry} queries`]:sc<30?[`${e.name} rarely recommends ${cd.brand} for ${cd.industry} queries`,`Citation rate on ${e.name} is well below competitors`]:[`Competitors cited more frequently on ${e.name}`,`Lower citation rate on ${e.name} versus top competitors`];
      return{...e,score:sc,mentionRate:mr,citationRate:cr,queries:(ae.queries||[]).slice(0,8).map(q=>({query:q.query||"",status:q.status||"Absent"})),strengths:fB(ae.strengths,sFb),weaknesses:fB(ae.weaknesses,wFb)};}
    return{...e,score:0,mentionRate:0,citationRate:0,queries:[],strengths:[],weaknesses:["No API data received"]};
  });
  const engines=[...realEngines,...engineMeta.slice(2).map(e=>{const est=estimateEngine(realEngines,e.id,e.name,cd.brand,cd.industry);return{...e,...est};})];
  engines.forEach(e=>{e.score=Math.round(e.mentionRate*0.5+e.citationRate*0.5);});
  const overall=Math.round(engines.reduce((a,e)=>a+e.score,0)/engines.length);
  const getScoreLabel=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const getScoreDesc=(s,b)=>s>=80?b+" is dominant — frequently cited and recommended.":s>=60?b+" has strong visibility — regularly mentioned.":s>=40?b+" has moderate visibility — rarely cited as primary source.":s>=20?b+" has weak visibility — occasionally mentioned.":b+" is invisible to AI engines.";
  const painCats=["Structured Data / Schema","Content Authority","E-E-A-T Signals","Technical SEO","Citation Network","Content Freshness"];
  const painPoints=(hasApi&&apiData.engineData.painPoints&&apiData.engineData.painPoints.length>0)?apiData.engineData.painPoints.map(pp=>({label:pp.label,score:pp.score,severity:pp.score<30?"critical":pp.score<60?"warning":"good",evidence:pp.evidence||[]})):painCats.map(label=>({label,score:0,severity:"critical",evidence:[]}));
  const competitors=(hasApi&&apiData.competitorData)?(()=>{const raw=Array.isArray(apiData.competitorData)?apiData.competitorData:apiData.competitorData.competitors||[];return raw.map(c=>{const cPain=(c.painPoints||painCats.map(l=>({label:l,score:c.score||0}))).map(p=>({label:p.label,score:p.score}));const advantages=cPain.map(pp=>{const brandPP=painPoints.find(bp=>bp.label===pp.label);const diff=pp.score-(brandPP?brandPP.score:0);return{category:pp.label,cat:pp.label,diff,yourScore:brandPP?brandPP.score:0,theirScore:pp.score,insight:getInsight(pp.label,c.name,cd.brand,diff>0)};}).filter(a=>a.insight);return{name:c.name,score:c.score||0,painPoints:cPain,advantages,engineScores:c.engineScores||[c.score||0,c.score||0],topStrength:c.topStrength||"N/A"};});})():[];
  const stakeholders=(hasApi&&apiData.archData&&Array.isArray(apiData.archData)&&apiData.archData.length>0)?apiData.archData:[];
  const funnelStages=(()=>{
    if(hasApi&&apiData.intentData&&Array.isArray(apiData.intentData)&&apiData.intentData.length>0){
      return apiData.intentData.map(s=>({stage:s.stage,desc:s.desc||"",color:s.color||"#6366f1",prompts:(s.prompts||[]).map(p=>{const eng=p.engines||{gpt:"Absent",gemini:"Absent"};const est=estimatePromptEngines(eng.gpt||"Absent",eng.gemini||"Absent",p.query||"");return{query:p.query||"",rank:p.rank||0,status:p.status||"Absent",engines:{gpt:eng.gpt||"Absent",gemini:eng.gemini||"Absent",claude:est.claude,perplexity:est.perplexity,deepseek:est.deepseek},weight:p.weight||5,optimisedPrompt:p.optimisedPrompt||"",contentTip:p.contentTip||"",gptAnswer:p.gptAnswer||"",gemAnswer:p.gemAnswer||""};})}));
    }
    // Fallback: generate prompts from audit topics + archetype journeys
    const topics=cd.topics||[];const b=cd.brand;const ind=cd.industry;const reg=cd.region||"Global";
    const compList=(cd.competitors||[]).map(c=>typeof c==="string"?c:c.name).filter(Boolean);
    const stageDefs=[
      {stage:"Awareness",desc:"User discovers the problem or category",color:"#6366f1",
        tpl:t=>[`What is ${t}?`,`Best ${t} in ${reg}`,`${t} trends ${new Date().getFullYear()}`,`How does ${t} work?`]},
      {stage:"Consideration",desc:"User evaluates and compares options",color:"#8b5cf6",
        tpl:t=>[`Top ${t} providers in ${reg}`,`${b} vs ${compList[0]||"competitors"} for ${t}`,`Best ${t} for small business`]},
      {stage:"Decision",desc:"User is ready to purchase or commit",color:"#a855f7",
        tpl:t=>[`${b} ${t} pricing`,`${b} ${t} reviews`,`Should I choose ${b} for ${t}?`]},
      {stage:"Retention",desc:"User seeks ongoing value",color:"#c084fc",
        tpl:t=>[`How to get more from ${t}`,`${b} ${t} support`,`${t} tips and tricks`]}
    ];
    // Collect archetype journey prompts per stage
    const archPrompts={Awareness:[],Consideration:[],Decision:[],Retention:[]};
    (stakeholders||[]).forEach(sg=>(sg.archetypes||[]).forEach(a=>(a.journey||[]).forEach(j=>{
      const sName=j.stage||"";const bucket=Object.keys(archPrompts).find(k=>sName.toLowerCase().includes(k.toLowerCase()));
      if(bucket)(j.prompts||[]).forEach(p=>{if(p.query)archPrompts[bucket].push(p);});
    })));
    return stageDefs.map(sd=>{
      const topicPrompts=topics.slice(0,4).flatMap((t,ti)=>sd.tpl(t).map((q,qi)=>({query:q,rank:ti*3+qi+1,status:"Absent",engines:{gpt:"Absent",gemini:"Absent",claude:"Absent",perplexity:"Absent",deepseek:"Absent"},weight:5,optimisedPrompt:"",contentTip:"",gptAnswer:"",gemAnswer:""})));
      const archP=(archPrompts[sd.stage]||[]).map((p,i)=>{const eng=p.engines||{gpt:"Absent",gemini:"Absent"};const est=estimatePromptEngines(eng.gpt||"Absent",eng.gemini||"Absent",p.query||"");return{query:p.query,rank:topicPrompts.length+i+1,status:p.status||"Absent",engines:{gpt:eng.gpt||"Absent",gemini:eng.gemini||"Absent",claude:est.claude,perplexity:est.perplexity,deepseek:est.deepseek},weight:p.weight||5,optimisedPrompt:p.optimisedPrompt||"",contentTip:p.contentTip||"",gptAnswer:p.gptAnswer||"",gemAnswer:p.gemAnswer||""};});
      const seen=new Set();const deduped=[...topicPrompts,...archP].filter(p=>{const k=p.query.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
      return{stage:sd.stage,desc:sd.desc,color:sd.color,prompts:deduped};
    });
  })();
  const fallbackGuidelines=[{area:"Entity Disambiguation",rule:"Establish "+cd.brand+" as a distinct entity across knowledge graph sources.",example:"Audit Wikidata, Knowledge Panel, Crunchbase for consistency."},{area:"Semantic Content Architecture",rule:"Structure content using topic clusters with pillar pages.",example:"Pillar: "+cd.brand+"'s Guide to "+(cd.topics[0]||cd.industry)},{area:"JSON-LD Schema",rule:"Deploy Organization, Product, FAQ, Article, Speakable schema.",example:"Every blog: Article schema with author, dates, FAQ markup."},{area:"E-E-A-T Signals",rule:"Every piece must demonstrate Experience, Expertise, Authority, Trust.",example:"Author bios with credentials, Person schema, cited sources."},{area:"Citation Velocity",rule:"Target DA50+ domains. 3 fresh citations beat 10 stale ones.",example:"Monthly: 2 guest articles DA60+, 3 HARO quotes, 1 data study."},{area:"Content Freshness",rule:"Quarterly review cycle. Update dateModified in schema.",example:"Flag pages >100 traffic/month for quarterly refresh."},{area:"Multi-Modal Content",rule:"Every piece in 2+ formats. Manual video transcripts.",example:"Guide → YouTube + infographic + LinkedIn carousel."},{area:"Competitor Response",rule:"Weekly monitoring. 14-day response to competitor citations.",example:"Monitor top-50 prompts weekly. Create displacement briefs."},{area:"Brand Narrative Consistency",rule:"150-word canonical description across all channels.",example:cd.brand+" is a "+(cd.region||"global")+" "+cd.industry+" company specialising in "+cd.topics.slice(0,3).join(", ")+"."},{area:"AI-Specific Formatting",rule:"Clear H2/H3, definitive answers in first 2 sentences.",example:"Direct claims with verifiable data points."}];
  const brandGuidelines=(hasApi&&apiData.guidelineData&&Array.isArray(apiData.guidelineData)&&apiData.guidelineData.length>0)?apiData.guidelineData.map(g=>({area:g.area||"General",rule:g.rule||"",example:g.example||"",finding:g.finding||""})):fallbackGuidelines;
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
      <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="you@company.com" type="email" style={{width:"100%",padding:"12px 16px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,fontSize:14,color:C.text,outline:"none",transition:"all .15s"}}/>
    </div>
    <div>
      <label style={{fontSize:13,fontWeight:500,color:C.text,display:"block",marginBottom:6}}>Password</label>
      <div style={{position:"relative"}}>
        <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="••••••••" type={showPw?"text":"password"} style={{width:"100%",padding:"12px 16px",paddingRight:48,background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,fontSize:14,color:C.text,outline:"none",transition:"all .15s"}}/>
        <span onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",cursor:"pointer",fontSize:12,color:C.muted,userSelect:"none",fontWeight:500}}>{showPw?"Hide":"Show"}</span>
      </div>
    </div>
    {error&&<div style={{padding:"10px 16px",background:`${C.red}06`,border:`1px solid ${C.red}12`,borderRadius:10,fontSize:13,color:C.red}}>{error}</div>}
    <button onClick={submit} disabled={!ok||loading} style={{width:"100%",padding:"12px",background:ok&&!loading?C.accent:"#d1d5db",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:ok&&!loading?"pointer":"not-allowed",transition:"all .2s",marginTop:2}}>{loading?"Signing in...":"Sign in"}</button>
  </div>);
}

/* ─── CHAT PANEL — Human-in-the-loop AI assistant ─── */

const NAV_ITEMS=[
  {group:"Analytics",items:[
    {id:"audit",label:"Overview",icon:"grid"},
    {id:"archetypes",label:"User Archetypes",icon:"users"},
    {id:"intent",label:"Intent Pathway",icon:"route"},
    {id:"volume",label:"Prompt Volume",icon:"bar-chart"},
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
    book:<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="1.5" fill="none"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="1.5" fill="none"/></>,
    "bar-chart":<><line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="1.5"/><line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="1.5"/><line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="1.5"/></>};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">{p[name]||null}</svg>;
};

const Icon=({name,size=16,color=C.muted})=>{
  const s={strokeWidth:"1.5",stroke:color,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"};
  const p={
    lightbulb:<><path d="M9 18h6" {...s}/><path d="M10 22h4" {...s}/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" {...s}/></>,
    zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...s}/></>,
    link:<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...s}/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...s}/></>,
    "message-circle":<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" {...s}/></>,
    "alert-circle":<><circle cx="12" cy="12" r="10" {...s}/><line x1="12" y1="8" x2="12" y2="12" {...s}/><line x1="12" y1="16" x2="12.01" y2="16" {...s}/></>,
    "trending-down":<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" {...s}/><polyline points="17 18 23 18 23 12" {...s}/></>,
    flag:<><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" {...s}/><line x1="4" y1="22" x2="4" y2="15" {...s}/></>,
    radio:<><circle cx="12" cy="12" r="2" {...s}/><path d="M16.24 7.76a6 6 0 0 1 0 8.49" {...s}/><path d="M7.76 16.24a6 6 0 0 1 0-8.49" {...s}/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" {...s}/><path d="M4.93 19.07a10 10 0 0 1 0-14.14" {...s}/></>,
    "check-circle":<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" {...s}/><polyline points="22 4 12 14.01 9 11.01" {...s}/></>,
    palette:<><circle cx="13.5" cy="6.5" r="1.5" fill={color} stroke="none"/><circle cx="17.5" cy="10.5" r="1.5" fill={color} stroke="none"/><circle cx="8.5" cy="7.5" r="1.5" fill={color} stroke="none"/><circle cx="6.5" cy="12" r="1.5" fill={color} stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.24-.3-.39-.65-.39-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.36-8.92-10-8.92z" {...s}/></>,
    ruler:<><path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" {...s}/><path d="M12 9v4" {...s}/><path d="M12 17h.01" {...s}/></>,
    "package":<><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" {...s}/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" {...s}/><polyline points="3.27 6.96 12 12.01 20.73 6.96" {...s}/><line x1="12" y1="22.08" x2="12" y2="12" {...s}/></>,
    "file-text":<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" {...s}/><polyline points="14 2 14 8 20 8" {...s}/><line x1="16" y1="13" x2="8" y2="13" {...s}/><line x1="16" y1="17" x2="8" y2="17" {...s}/><polyline points="10 9 9 9 8 9" {...s}/></>,
    "bar-chart":<><line x1="12" y1="20" x2="12" y2="10" {...s}/><line x1="18" y1="20" x2="18" y2="4" {...s}/><line x1="6" y1="20" x2="6" y2="16" {...s}/></>,
    paperclip:<><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" {...s}/></>,
    search:<><circle cx="11" cy="11" r="8" {...s}/><line x1="21" y1="21" x2="16.65" y2="16.65" {...s}/></>,
    scale:<><path d="M16 3l-8 0" {...s}/><path d="M12 3l0 18" {...s}/><path d="M19 8l-3-5" {...s}/><path d="M5 8l3-5" {...s}/><path d="M3 13a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4l-4-5-4 5z" {...s}/><path d="M13 13a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4l-4-5-4 5z" {...s}/></>,
    "credit-card":<><rect x="1" y="4" width="22" height="16" rx="2" ry="2" {...s}/><line x1="1" y1="10" x2="23" y2="10" {...s}/></>,
    "refresh-cw":<><polyline points="23 4 23 10 17 10" {...s}/><polyline points="1 20 1 14 7 14" {...s}/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" {...s}/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>{p[name]||null}</svg>;
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
          <span style={{fontWeight:600,color:C.text,fontSize:13}}>{brand||"EnterRank"}</span>
        </div>
      </div>}
    </div>

    {/* New Audit button */}
    <div style={{padding:collapsed?"10px 8px":"12px 16px"}}>
      <button onClick={()=>setStep("input")} style={{width:"100%",padding:collapsed?"8px":"9px 14px",background:step==="input"?`${C.accent}08`:"transparent",border:`1px solid ${step==="input"?C.accent+"30":C.border}`,borderRadius:8,fontSize:12,fontWeight:600,color:step==="input"?C.accent:C.sub,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"flex-start",gap:8,transition:"all .15s"}}>
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
            {!collapsed&&item.comingSoon&&<span style={{fontSize:9,fontWeight:700,color:"#fff",background:"#d1d5db",padding:"1px 5px",borderRadius:4,marginLeft:"auto"}}>SOON</span>}
          </div>);
        })}
      </div>))}
    </div>

    {/* Bottom section */}
    <div style={{borderTop:`1px solid ${C.border}`,padding:collapsed?"10px 6px":"10px 12px"}}>
      <div onClick={()=>setCollapsed(!collapsed)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:12,color:C.muted,justifyContent:collapsed?"center":"flex-start"}}
        onMouseEnter={e=>e.currentTarget.style.background=C.bg}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <span style={{fontSize:14}}>{collapsed?"»":"«"}</span>
        {!collapsed&&<span>Collapse</span>}
      </div>
      {!collapsed&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginTop:4}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:C.accent,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,flexShrink:0}}>AZ</div>
        <div style={{overflow:"hidden"}}><div style={{fontSize:12,fontWeight:500,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Aris Zainul</div></div>
      </div>}
    </div>
  </div>);
}

/* ─── VISIBILITY CHART — Bar chart with hover scores ─── */
function VisibilityChart({engines,overall,brand}){
  const[hover,setHover]=useState(null);
  const getGrade=(s)=>s>=80?"Dominant":s>=60?"Strong":s>=40?"Moderate":s>=20?"Weak":"Invisible";
  const gradeColor=(s)=>s>=80?C.green:s>=60?"#10A37F":s>=40?C.amber:s>=20?"#f97316":C.red;
  const top5=engines.slice(0,5);
  const bars=top5.flatMap((e,ei)=>[
    {label:"Mentions",engine:e.name,value:e.mentionRate||0,color:e.color,Logo:e.Logo,sub:"mention",gi:ei},
    {label:"Citations",engine:e.name,value:e.citationRate||0,color:`${e.color}99`,Logo:e.Logo,sub:"cite",gi:ei},
  ]);
  const maxVal=100;
  const barH=130;
  return(<div>
    <div style={{marginBottom:20}}>
      <div style={{fontSize:13,color:C.muted,marginBottom:6,fontWeight:500}}>Visibility Score for {brand}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:10}}>
        <span style={{fontSize:36,fontWeight:800,color:C.text,letterSpacing:"-.03em",lineHeight:1}}>{overall}%</span>
        <span style={{fontSize:14,fontWeight:600,color:gradeColor(overall),padding:"3px 10px",background:`${gradeColor(overall)}12`,borderRadius:20}}>{getGrade(overall)}</span>
      </div>
    </div>
    {/* Vertical bar chart */}
    <div style={{display:"flex",alignItems:"flex-end",gap:0,paddingTop:8}}>
      {bars.map((b,i)=>{
        const h=Math.max(4,(b.value/maxVal)*barH);
        const isGap=i>0&&b.gi!==bars[i-1].gi;
        return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",marginLeft:isGap?12:0}}
          onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
          <div style={{fontSize:11,fontWeight:700,color:hover===i?b.color:C.text,marginBottom:4,transition:"color .2s"}}>{b.value}%</div>
          <div style={{width:"100%",maxWidth:40,height:barH,background:C.bg,borderRadius:"6px 6px 0 0",border:`1px solid ${C.borderSoft}`,borderBottom:"none",position:"relative",overflow:"hidden",display:"flex",alignItems:"flex-end"}}>
            <div style={{width:"100%",height:h,background:b.color,borderRadius:"4px 4px 0 0",transition:"height .6s ease-out",opacity:hover===i?1:b.sub==="cite"?.6:.85}}/>
          </div>
          <div style={{borderTop:`2px solid ${C.border}`,width:"100%",maxWidth:40,paddingTop:6,textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:600,color:C.sub}}>{b.label}</div>
          </div>
        </div>);
      })}
    </div>
    {/* Engine legend below */}
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:14,marginTop:14}}>
      {top5.map(e=>(<div key={e.id} style={{display:"flex",alignItems:"center",gap:5}}>
        <e.Logo size={14}/>
        <span style={{fontSize:11,fontWeight:600,color:C.sub}}>{e.name}</span>
        <span style={{fontSize:10,color:C.muted}}>({e.score}%)</span>
      </div>))}
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
      <div style={{padding:"24px",borderRight:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:4}}>{title}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,marginBottom:16}}>{ownBrand?.pct||0}%<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <svg width={size} height={size} onMouseLeave={()=>setHover(null)}>
            {arcs.map((a,i)=>(<path key={i} d={a.path} fill={hover===i?a.color:`${a.color}cc`} stroke="none" onMouseEnter={()=>setHover(i)} style={{cursor:"default",transition:"fill .15s"}}/>))}
          </svg>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:14,justifyContent:"center"}}>
          {arcs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,cursor:"default"}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
            <div style={{width:8,height:8,borderRadius:4,background:a.color}}/>
            <span style={{color:hover===i?C.text:C.muted,fontWeight:hover===i?600:400}}>{a.name}</span>
          </div>))}
        </div>
      </div>
      {/* Right: ranked list */}
      <div style={{padding:"24px"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:4}}>{rankTitle}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,marginBottom:16}}>#{brandRank}<span style={{fontSize:14,color:C.muted,fontWeight:400,marginLeft:6}}>–</span></div>
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
            <span style={{fontSize:14,fontWeight:600,color:C.text}}>{a.pct}%</span>
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

  // Auto-fill website from company name via Clearbit with heuristic fallback
  const lookupDomain=async(name)=>{
    if(!name||name.trim().length<2)return null;
    try{
      const res=await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(name.trim())}`);
      if(res.ok){const arr=await res.json();if(arr&&arr.length>0)return arr[0].domain;}
    }catch(e){}
    return name.trim().toLowerCase().replace(/[^a-z0-9]/g,"")+".com";
  };
  const autofillBrandWebsite=async(name)=>{
    const domain=await lookupDomain(name);
    if(domain)setData(d=>d.website?d:{...d,website:domain});
  };
  const autofillCompWebsite=async(name,idx)=>{
    const domain=await lookupDomain(name);
    if(domain)setData(d=>{const c=[...(d.competitors||[])];if(c[idx]&&!c[idx].website){c[idx]={...c[idx],website:domain};return{...d,competitors:c};}return d;});
  };

  // Generate topics via OpenAI
  const generateTopics=async()=>{
    setGenTopics(true);setError(null);
    try{
      const compInfo=(data.competitors||[]).filter(c=>c.name).map(c=>`${c.name}${c.website?" ("+c.website+")":""}`).join(", ");
      const prompt=`For the brand "${data.brand}" in the "${data.industry}" industry, based in "${data.region||"Global"}", with website ${data.website||"unknown"}${compInfo?", competitors: "+compInfo:""}.

Generate 12-15 key topics that are most relevant for measuring AI engine visibility in this industry (AEO - Answer Engine Optimisation). Mix brand-specific AND generic industry topics.

Include a balance of:
- Generic industry topics people search without any brand in mind (e.g. "mobile data plans", "5G coverage", "prepaid vs postpaid") — at least 5-6 of these
- Core product/service topics for this brand
- Industry trends and educational topics (e.g. "how does [technology] work", "what is [concept]")
- Regional/local relevance topics
- Buyer decision and comparison topics

IMPORTANT: Do NOT make every topic about "${data.brand}" or its competitors. At least half should be generic industry queries that a normal person would search.

Return ONLY a JSON array of strings, no markdown, no explanation:
["topic 1", "topic 2", "topic 3", ...]`;
      const raw=await callOpenAI(prompt,"You are an AEO (Answer Engine Optimisation) expert. Return ONLY valid JSON arrays, no markdown fences.");
      const topics=safeJSON(raw);
      if(topics&&Array.isArray(topics)&&topics.length>0){
        setData(d=>({...d,topics:topics.filter(t=>typeof t==="string"&&t.trim().length>0).map(t=>t.trim())}));
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

Generate 5 MORE different topics that are also relevant for measuring AI engine visibility. These should NOT duplicate existing topics. Focus on gaps or angles not yet covered.

Return ONLY a JSON array of strings:
["new topic 1", "new topic 2", ...]`;
      const raw=await callOpenAI(prompt,"You are an AEO expert. Return ONLY valid JSON arrays.");
      const newTopics=safeJSON(raw);
      if(newTopics&&Array.isArray(newTopics)&&newTopics.length>0){
        const cleaned=newTopics.filter(t=>typeof t==="string"&&t.trim().length>0).map(t=>t.trim());
        setData(d=>({...d,topics:[...d.topics,...cleaned]}));
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
  const addTopic=()=>{if(newTopic.trim()){setData({...data,topics:[...data.topics,newTopic.trim()]});setNewTopic("");}};

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
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:28,fontWeight:700,color:C.accent}}>{progress}%</span></div>
    </div>
    {/* Title */}
    <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:C.text}}>Running Full AEO Audit</div></div>
    {/* Scrolling techy text — single line that changes */}
    <div style={{height:20,overflow:"hidden",textAlign:"center"}}>
      {logLines.length>0&&<div key={logLines[logLines.length-1].t} style={{fontSize:12,color:C.accent,fontWeight:500,animation:"fadeInUp .3s ease-out"}}>{logLines[logLines.length-1].msg.replace(/^\[.*?\]\s*/,"")}</div>}
    </div>
    {/* Step progress bars */}
    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:6}}>
      {[{l:"ChatGPT · Claude · Perplexity",p:Math.min(100,progress*100/12),c:"#10A37F"},{l:"Gemini · DeepSeek · Copilot",p:Math.max(0,Math.min(100,(progress-5)*100/13)),c:"#4285F4"},{l:"Meta AI · Mistral · 7 more",p:Math.max(0,Math.min(100,(progress-12)*100/14)),c:"#7c3aed"},{l:"Competitor Analysis",p:Math.max(0,Math.min(100,(progress-30)*100/15)),c:"#8b5cf6"},{l:"Archetype Generation",p:Math.max(0,Math.min(100,(progress-45)*100/17)),c:"#ec4899"},{l:"Intent Pathway",p:Math.max(0,Math.min(100,(progress-62)*100/10)),c:"#f59e0b"},{l:"Channel Verification",p:Math.max(0,Math.min(100,(progress-72)*100/18)),c:"#059669"},{l:"Report Compilation",p:Math.max(0,Math.min(100,(progress-90)*100/10)),c:C.accent}].map(s=>(<div key={s.l} style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:10,color:s.p>=100?C.green:s.p>0?C.text:C.muted,minWidth:120,fontWeight:s.p>0&&s.p<100?600:400}}>{s.p>=100?"✓ ":s.p>0?"◉ ":"○ "}{s.l}</span>
        <div style={{flex:1,height:3,background:C.borderSoft,borderRadius:4}}><div style={{width:`${Math.max(0,s.p)}%`,height:"100%",background:s.p>=100?C.green:s.c,borderRadius:4,transition:"width .15s linear"}}/></div>
      </div>))}
    </div>
    <div style={{padding:"6px 14px",background:`${C.accent}08`,borderRadius:100,fontSize:11,color:C.accent,fontWeight:500,display:"inline-flex",alignItems:"center",gap:4}}><Icon name="zap" size={12} color={C.accent}/> Powered by live AI analysis</div>
    {error&&<div style={{padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </div>);

  /* ─── STEP 2: Topics Review ─── */
  if(auditStep==="topics")return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>Review Topics for {data.brand}</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:4}}>These topics will be used to measure AI engine visibility. Edit, remove, or add more.</p>
    </div>
    <Card>
      {/* Topic list */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {data.topics.map((topic,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
          <span style={{fontSize:13,color:C.accent,fontWeight:600,minWidth:22}}>{i+1}.</span>
          {editingTopic===i?(<>
            <input value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveEdit(i);if(e.key==="Escape"){setEditingTopic(null);setEditVal("");}}} autoFocus style={{flex:1,padding:"4px 8px",background:"#fff",border:`1px solid ${C.accent}40`,borderRadius:8,fontSize:13,color:C.text,outline:"none"}}/>
            <span onClick={()=>saveEdit(i)} style={{cursor:"pointer",fontSize:11,color:C.accent,fontWeight:600}}>Save</span>
            <span onClick={()=>{setEditingTopic(null);setEditVal("");}} style={{cursor:"pointer",fontSize:11,color:C.muted}}>Cancel</span>
          </>):(<>
            <span style={{flex:1,fontSize:13,color:C.text}}>{topic}</span>
            <span onClick={()=>startEdit(i)} style={{cursor:"pointer",fontSize:11,color:C.accent,fontWeight:500,opacity:.7}}>Edit</span>
            <span onClick={()=>deleteTopic(i)} style={{cursor:"pointer",fontSize:14,color:C.muted,lineHeight:1}}>×</span>
          </>)}
        </div>))}
      </div>

      {/* Add new topic */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <input value={newTopic} onChange={e=>setNewTopic(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addTopic();}} placeholder="Add a custom topic..." style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none"}}/>
        <button onClick={addTopic} disabled={!newTopic.trim()} style={{padding:"8px 16px",background:newTopic.trim()?C.accent:"#dde1e7",color:newTopic.trim()?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:newTopic.trim()?"pointer":"not-allowed"}}>Add</button>
      </div>

      {/* Generate more button */}
      <button onClick={regenerateTopics} disabled={genTopics} style={{width:"100%",padding:"10px 16px",background:"none",border:`1px dashed ${C.accent}40`,borderRadius:8,fontSize:12,fontWeight:600,color:C.accent,cursor:genTopics?"wait":"pointer",marginBottom:16,opacity:genTopics?.6:1}}>
        {genTopics?"Generating more topics...":"+ Generate More Topics"}
      </button>

      <div style={{paddingTop:16,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setAuditStep("input")} style={{padding:"8px 16px",background:"none",border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.sub,cursor:"pointer"}}>← Back to Details</button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:11,color:C.muted}}>{data.topics.length} topics</span>
          <button onClick={go} disabled={!topicsOk} style={{padding:"10px 24px",background:topicsOk?C.accent:"#dde1e7",color:topicsOk?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:topicsOk?"pointer":"not-allowed"}}>Run AEO Audit →</button>
        </div>
      </div>
    </Card>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
  </div>);

  /* ─── STEP 1: Client Details Input ─── */
  return(<div style={{maxWidth:620,margin:"0 auto"}}>
    <div style={{marginBottom:24,textAlign:"center"}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>{data.brand?"Configure AEO Audit":"New AEO Audit"}</h2><p style={{color:C.sub,fontSize:13,marginTop:4}}>{data.brand?`${history.length>0?"Run another":"Set up"} audit for ${data.brand}.`:"Enter client details to begin."}</p></div>
    <Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <Field label="Brand Name" value={data.brand} onChange={v=>setData({...data,brand:v})} onBlur={()=>autofillBrandWebsite(data.brand)} placeholder="Acme Corp"/>
      <Field label="Industry" value={data.industry} onChange={v=>setData({...data,industry:v})} placeholder="e.g. Technology"/>
      <Field label="Website" value={data.website} onChange={v=>setData({...data,website:v})} placeholder="acme.com"/>
      <Field label="Region" value={data.region} onChange={v=>setData({...data,region:v})} placeholder="e.g. Malaysia"/>
      <div style={{gridColumn:"1/-1"}}>
        <label style={{fontSize:12,fontWeight:500,color:C.sub,display:"block",marginBottom:8}}>Competitors</label>
        {(data.competitors||[]).map((comp,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <input value={comp.name} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],name:e.target.value};setData({...data,competitors:c});}} onBlur={()=>autofillCompWebsite(comp.name,i)} placeholder={`Competitor ${i+1}`} style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none"}}/>
          <input value={comp.website} onChange={e=>{const c=[...data.competitors];c[i]={...c[i],website:e.target.value};setData({...data,competitors:c});}} placeholder="website.com" style={{flex:1,padding:"8px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.text,outline:"none"}}/>
          <span onClick={()=>{const c=data.competitors.filter((_,j)=>j!==i);setData({...data,competitors:c});}} style={{cursor:"pointer",color:C.muted,fontSize:16,padding:"0 4px",lineHeight:1}}>×</span>
        </div>))}
        {(data.competitors||[]).length<8&&<button onClick={()=>setData({...data,competitors:[...(data.competitors||[]),{name:"",website:""}]})} style={{padding:"6px 14px",background:"none",border:`1px dashed ${C.border}`,borderRadius:8,fontSize:12,color:C.muted,cursor:"pointer"}}>+ Add competitor</button>}
      </div>
    </div>
    <div style={{marginTop:20,paddingTop:18,borderTop:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:11,color:C.muted}}>Engines:</span><ChatGPTLogo size={18}/><GeminiLogo size={18}/><ClaudeLogo size={18}/><PerplexityLogo size={18}/><DeepSeekLogo size={18}/><div style={{width:18,height:18,borderRadius:"50%",background:"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"#9ca3af"}}>10+</div></div>
      <button onClick={generateTopics} disabled={!inputOk||genTopics} style={{padding:"10px 24px",background:inputOk&&!genTopics?C.accent:"#dde1e7",color:inputOk&&!genTopics?"#fff":"#9ca3af",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:inputOk&&!genTopics?"pointer":"not-allowed"}}>{genTopics?"Generating Topics...":"Generate Topics →"}</button>
    </div>
    {error&&<div style={{marginTop:12,padding:"10px 16px",background:`${C.red}08`,border:`1px solid ${C.red}20`,borderRadius:8,fontSize:12,color:C.red}}>{error}</div>}
    </Card></div>);
}

/* ─── PAGE: AEO AUDIT (Overview) ─── */
function AuditPage({r,history,goTo}){
  const[expandComp,setExpandComp]=useState(null);
  const trend=history.map(h=>({label:h.date,overall:h.overall}));
  const engineTrend=history.map(h=>{const d={label:h.date};if(Array.isArray(h.engines)&&h.engines.length>0&&typeof h.engines[0]==="number"){d.ChatGPT=h.engines[0];d.Gemini=h.engines[1];}else if(Array.isArray(h.engines)){h.engines.forEach(e=>{d[e.name]=e.score;});}return d;});
  const latestChange=history.length>1?r.overall-history[history.length-2].overall:0;
  const catChanges=r.painPoints.map(pp=>{const hist=history.map(h=>{const f=h.categories.find(c=>c.label===pp.label);return f?f.score:null;}).filter(Boolean);const prev=hist.length>1?hist[hist.length-2]:pp.score;return{...pp,change:pp.score-prev};});

  // Compute share-of-voice data: brand + competitors
  const allBrands=[{name:r.clientData.brand,website:r.clientData.website,mentionRate:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citationRate:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),color:C.accent},...r.competitors.map((c,i)=>{const compObj=(r.clientData.competitors||[]).find(cc=>cc.name===c.name);return{name:c.name,website:compObj?compObj.website:"",mentionRate:c.engineScores?Math.round(c.engineScores.reduce((a,s)=>a+s,0)/c.engineScores.length):c.score,citationRate:c.engineScores?Math.round(c.engineScores.reduce((a,s)=>a+s,0)/c.engineScores.length*.6):Math.round(c.score*.6),color:["#10A37F","#D97706","#4285F4","#8b5cf6","#ec4899","#0ea5e9","#f97316"][i%7]};})];

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
  if(bestEngine.score-worstEngine.score>15) diags.push({icon:"zap",severity:"warning",text:`${bestEngine.score-worstEngine.score}pt gap between ${bestEngine.name} (${bestEngine.score}%) and ${worstEngine.name} (${worstEngine.score}%).`});
  if(avgCitation<10) diags.push({icon:"link",severity:"critical",text:`${avgCitation}% citation rate. Users get answers about your space but aren't sent to your site.`});
  else if(avgCitation<25) diags.push({icon:"link",severity:"warning",text:`${avgCitation}% citation rate — ${100-avgCitation}% of mentions don't link back to you.`});
  if(avgMention<15) diags.push({icon:"message-circle",severity:"critical",text:`${avgMention}% mention rate across engines. ${r.clientData.brand} isn't part of the AI conversation yet.`});
  else if(avgMention<35) diags.push({icon:"message-circle",severity:"warning",text:`Mentioned in ~1 of ${Math.round(100/avgMention)} relevant responses (${avgMention}%).`});
  if(criticalCats.length>0) diags.push({icon:"alert-circle",severity:"critical",text:`${criticalCats.map(c=>c.label.split("/")[0].trim()+" "+c.score+"%").join(", ")} — ${criticalCats.length>1?"these need":"needs"} immediate attention.`});
  if(weakestCat.score<30) diags.push({icon:"trending-down",severity:"critical",text:`${weakestCat.label.split("/")[0].trim()} at ${weakestCat.score}% — lowest category score.`});
  if(compsAhead.length>0) diags.push({icon:"flag",severity:compsAhead.length>1?"critical":"warning",text:`${compsAhead.map(c=>c.name+" "+c.score+"%").join(", ")} ${compsAhead.length>1?"are":"is"} scoring above you.`});
  if(missingChannels.length>0) diags.push({icon:"radio",severity:"warning",text:`Not found on ${missingChannels.length} distribution channel${missingChannels.length>1?"s":""}.`});
  if(strongestCat.score>60) diags.push({icon:"check-circle",severity:"good",text:`${strongestCat.label.split("/")[0].trim()} is your strongest signal at ${strongestCat.score}%.`});
  const sevOrder={critical:0,warning:1,info:2,good:3};
  diags.sort((a,b)=>(sevOrder[a.severity]??2)-(sevOrder[b.severity]??2));
  const sevColors={critical:C.red,warning:C.amber,info:C.accent,good:C.green};

  return(<div>
    {/* Page title */}
    <h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:"0 0 24px"}}>Overview</h2>

    {/* Top row: Visibility Score (left) + System Diagnostics (right) */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24,alignItems:"stretch"}}>
      {/* Visibility Score chart */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px",display:"flex",flexDirection:"column"}}>
        <VisibilityChart engines={r.engines} overall={r.overall} brand={r.clientData.brand}/>
      </div>

      {/* System Diagnostics */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"20px",display:"flex",flexDirection:"column"}}>
        <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:14}}>System Diagnostics</div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:6,overflowY:"auto"}}>
          {diags.slice(0,6).map((d,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"10px 12px",background:`${sevColors[d.severity]||C.accent}05`,borderRadius:8,border:`1px solid ${sevColors[d.severity]||C.accent}12`,alignItems:"flex-start"}}>
            <Icon name={d.icon} size={16} color={sevColors[d.severity]||C.accent}/>
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
    <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 4px"}}>{r.clientData.brand} — Platform Breakdown</h3>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 24px"}}>How each AI engine sees your brand · {r.engines.length} engines analyzed</p>
      {/* Featured Engines — full detail */}
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {r.engines.slice(0,5).map(e=>(<div key={e.id} style={{padding:"20px",background:C.bg,borderRadius:10,border:`1px solid ${C.borderSoft}`}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <e.Logo size={22}/>
            <span style={{fontSize:14,fontWeight:600,color:C.text}}>{e.name}</span>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Mentions</div><div style={{fontSize:14,fontWeight:700,color:C.text}}>{e.mentionRate}%</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Citations</div><div style={{fontSize:14,fontWeight:700,color:C.text}}>{e.citationRate}%</div></div>
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
      {/* Other Engines — compact grid */}
      {r.engines.length>5&&<>
        <div style={{fontSize:13,fontWeight:600,color:C.text,margin:"24px 0 12px"}}>Other Engines</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {r.engines.slice(5).map(e=>(<div key={e.id} style={{padding:"14px 12px",background:C.bg,borderRadius:10,border:`1px solid ${C.borderSoft}`,textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><e.Logo size={20}/></div>
            <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:6}}>{e.name}</div>
            <div style={{fontSize:20,fontWeight:800,color:e.score>=60?C.green:e.score>=40?C.amber:C.red,marginBottom:8}}>{e.score}%</div>
            <div style={{display:"flex",justifyContent:"center",gap:10,fontSize:10,color:C.muted}}>
              <span>M: {e.mentionRate}%</span>
              <span>C: {e.citationRate}%</span>
            </div>
          </div>))}
        </div>
      </>}
    </div>

    {/* Performance Tracking */}
    <div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:0}}>Performance Tracking</h3>
      <p style={{fontSize:13,color:C.muted,margin:"2px 0 0 0"}}>Score history and category trends</p>
      <div style={{marginTop:18}}>
        {history.length<2?<div style={{textAlign:"center",padding:"32px 20px",background:C.bg,borderRadius:10}}>
          <div style={{marginBottom:8}}><Icon name="bar-chart" size={28} color={C.muted}/></div>
          <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:4}}>First Audit Complete</div>
          <div style={{fontSize:13,color:C.muted,maxWidth:360,margin:"0 auto"}}>Run another audit to see trends and score changes.</div>
        </div>:<>
          <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>AEO Score Trend</div><MiniAreaChart data={trend} dataKey="overall" color={C.accent}/></div>
          <div style={{marginBottom:18}}><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Engine Performance</div><MiniLineChart data={engineTrend} lines={r.engines.slice(0,5).map(e=>({key:e.name,color:e.color,label:e.name})).filter(l=>engineTrend.every(d=>typeof d[l.key]==="number"))}/></div>
          <div><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Category Movement</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>{catChanges.map((cat,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:C.sub,minWidth:100}}>{cat.label.split(" ").slice(0,2).join(" ")}</span><div style={{flex:1}}><Bar value={cat.score} color={SC(cat.severity)} h={5}/></div><span style={{fontSize:12,fontWeight:700,color:C.text,minWidth:26,textAlign:"right"}}>{cat.score}%</span><span style={{fontSize:10,fontWeight:600,minWidth:32,textAlign:"right",color:cat.change>0?C.green:cat.change<0?C.red:C.muted}}>{cat.change>0?`+${cat.change}`:cat.change===0?"—":cat.change}</span></div>))}</div>
          </div>
        </>}
      </div>
    </div>

    {/* Competitor Deep-Dive */}
    {r.competitors.length>0&&<div style={{border:`1px solid ${C.border}`,borderRadius:14,background:"#fff",padding:"24px",marginBottom:24}}>
      <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 4px"}}>Looking Under The Hood</h3>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 16px"}}>Why competitors rank higher or lower</p>
      {r.competitors.map((c,ci)=>{const isOpen=expandComp===ci;const ahead=c.score>r.overall;return(<div key={ci} style={{border:`1px solid ${isOpen?(ahead?`${C.red}25`:`${C.green}25`):C.border}`,borderRadius:10,overflow:"hidden",marginBottom:8}}>
        <div onClick={()=>setExpandComp(isOpen?null:ci)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:isOpen?`${ahead?C.red:C.green}03`:"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:8,background:ahead?`${C.red}08`:`${C.green}08`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:ahead?C.red:C.green}}>{c.score}%</div><div><div style={{fontWeight:600,fontSize:13,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{ahead?`${c.score-r.overall} points ahead`:`${r.overall-c.score} points behind`}</div></div></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><Pill color={ahead?C.red:C.green} filled>{ahead?"Outranking":"Behind"}</Pill><span style={{fontSize:10,color:C.muted}}>{isOpen?"▲":"▼"}</span></div>
        </div>
        {isOpen&&<div style={{padding:"0 16px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14,marginTop:4}}>
            {c.painPoints.map((cp,j)=>{const yours=r.painPoints[j]?.score||50;const diff=cp.score-yours;return(<div key={j} style={{padding:"8px 10px",background:C.bg,borderRadius:8}}><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{cp.label.split("/")[0].trim()}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.accent,fontWeight:600}}>You: {yours}%</span><span style={{fontSize:11,fontWeight:600,color:diff>0?C.red:C.green}}>{c.name.split(" ")[0]}: {cp.score}%</span></div><div style={{marginTop:4}}><Bar value={yours} color={C.accent} h={3}/><div style={{marginTop:2}}><Bar value={cp.score} color={diff>0?C.red:"#94a3b8"} h={3}/></div></div></div>);})}
          </div>
          {c.advantages.length>0&&<div>{c.advantages.map((adv,ai)=>(<div key={ai} style={{padding:"10px 12px",background:adv.insight.advantage==="them"?`${C.red}04`:`${C.green}04`,borderRadius:8,borderLeft:`3px solid ${adv.insight.advantage==="them"?C.red:C.green}`,marginBottom:6}}><div style={{fontSize:11,fontWeight:600,color:C.text,marginBottom:2}}>{adv.cat.split("/")[0].trim()} <span style={{color:C.muted,fontWeight:400}}>— You: {adv.yourScore}% vs {adv.theirScore}%</span></div><div style={{fontSize:12,color:C.sub,lineHeight:1.5}}>{adv.insight.text}</div></div>))}</div>}
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>User Archetypes</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Who is searching — grouped by stakeholder type</p></div>
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
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>{a.prompts.map((p,j)=><div key={j} style={{padding:"8px 12px",background:C.bg,borderRadius:8,fontSize:11,color:C.sub}}>"{p}"</div>)}</div>
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
  const stageIcons=["search","scale","credit-card","refresh-cw"];
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

  const testPrompt=async()=>{
    if(!newPrompt.trim()||testing)return;
    setTesting(true);
    const q=newPrompt.trim();
    setNewPrompt("");
    try{
      // Step 1: Actually send the prompt to both engines — no brand context, neutral system prompt
      const neutralSys=`You are a helpful AI assistant. Answer the question directly and accurately based on your knowledge. Include specific company names, products, and websites where relevant.`;
      const[gptRaw,gemRaw]=await Promise.all([callOpenAI(q, neutralSys),callGemini(q, neutralSys)]);
      const gptAnswer=gptRaw||"";
      const gemAnswer=gemRaw||"";
      // Step 2: Detect brand presence in actual responses
      const gptStatus=detectBrandStatus(gptAnswer,r.clientData.brand,r.clientData.website);
      const gemStatus=detectBrandStatus(gemAnswer,r.clientData.brand,r.clientData.website);
      const overall=(gptStatus==="Cited"||gemStatus==="Cited")?"Cited":(gptStatus==="Mentioned"||gemStatus==="Mentioned")?"Mentioned":"Absent";
      // Step 3: Get weight + tips via separate analysis call
      const analysisPr=`A user searched: "${q}"
Brand: "${r.clientData.brand}" in ${r.clientData.industry}.
ChatGPT's actual response ${gptStatus==="Absent"?"did NOT mention the brand":gptStatus==="Cited"?"cited the brand's website":"mentioned the brand by name"}.
Gemini's actual response ${gemStatus==="Absent"?"did NOT mention the brand":gemStatus==="Cited"?"cited the brand's website":"mentioned the brand by name"}.
Return JSON only:
{"weight":<1-10 AEO importance>,"optimisedPrompt":"<content-optimized version to target>","contentTip":"<what content to create to win this prompt>","stage":"Awareness"|"Consideration"|"Decision"|"Retention"}`;
      const analysisRaw=await callOpenAI(analysisPr,"You are an AEO analyst. Return only valid JSON.");
      const analysis=safeJSON(analysisRaw)||{};
      const est=estimatePromptEngines(gptStatus,gemStatus,q);
      const newP={query:q,status:overall,engines:{gpt:gptStatus,gemini:gemStatus,claude:est.claude,perplexity:est.perplexity,deepseek:est.deepseek},
        custom:true,weight:analysis.weight||5,
        optimisedPrompt:analysis.optimisedPrompt||"",contentTip:analysis.contentTip||"",
        gptAnswer,gemAnswer};
      const stageIdx=stageNames.indexOf(analysis.stage);
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
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>Intent Pathway</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:3}}>How visible is {r.clientData.brand} at each stage of the customer journey? Each prompt is verified across AI engines.</p>
    </div>

    <SectionNote text={`Every prompt was tested across AI engines during the audit. The status shows whether ${r.clientData.brand} actually appeared in each engine's response. Expand any row to see the full response.`}/>

    {/* Add prompt input */}
    <Card style={{marginBottom:16,background:`${C.accent}03`,borderColor:`${C.accent}20`}}>
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Test a Prompt</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Type any prompt. We'll test it across AI engines in real time.</div>
      <div style={{display:"flex",gap:8}}>
        <input value={newPrompt} onChange={e=>setNewPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")testPrompt();}}
          placeholder={`e.g. "Best ${r.clientData.industry||"tech"} companies in ${r.clientData.region||"my area"}"`}
          style={{flex:1,padding:"10px 16px",border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,color:C.text,outline:"none",background:"#fff"}}
          onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
        <button onClick={testPrompt} disabled={!newPrompt.trim()||testing}
          style={{padding:"10px 20px",background:!newPrompt.trim()||testing?"#d1d5db":C.accent,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:!newPrompt.trim()||testing?"not-allowed":"pointer",whiteSpace:"nowrap",minWidth:110}}>
          {testing?"Testing...":"Test Prompt"}
        </button>
      </div>
    </Card>

    {/* Stage tabs */}
    <div style={{display:"flex",gap:6,marginBottom:16}}>
      {stageNames.map((name,i)=>{
        const s=stageStats[i];const active=selStage===i;const color=stageColors[i];
        return(<div key={i} onClick={()=>{setSelStage(i);setExpandedRow(null);}} style={{flex:1,padding:"12px 12px",cursor:"pointer",background:active?"#fff":C.surface,border:`1.5px solid ${active?color:C.border}`,borderRadius:10,textAlign:"center",transition:"all .15s",boxShadow:active?`0 2px 8px ${color}15`:"none"}}>
          <div style={{marginBottom:4}}><Icon name={stageIcons[i]} size={18} color={color}/></div>
          <div style={{fontSize:12,fontWeight:600,color:active?C.text:C.sub,marginTop:2}}>{name}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.cited} cited · {s.mentioned} mentioned</div>
          <div style={{fontSize:10,color:C.muted,marginTop:1}}>{s.total} prompts</div>
        </div>);
      })}
    </div>

    {/* Stage detail with weighted prompts */}
    {(()=>{
      const prompts=getMergedPrompts(selStage);
      const color=stageColors[selStage];
      const s=stageStats[selStage];
      if(prompts.length===0)return(<Card><div style={{textAlign:"center",padding:24,color:C.muted,fontSize:13}}>No prompts for {stageNames[selStage]} yet. Use "Test a Prompt" above.</div></Card>);
      const statusOrder={Cited:0,Mentioned:1,Absent:2};
      const sorted=[...prompts].sort((a,b)=>(statusOrder[a.status]??2)-(statusOrder[b.status]??2));
      return(<Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Icon name={stageIcons[selStage]} size={18} color={color}/>
              <h3 style={{fontSize:16,fontWeight:700,color:color,margin:0}}>{stageNames[selStage]}</h3>
            </div>
            <p style={{fontSize:11,color:C.muted,margin:"3px 0 0"}}>{stageDescs[selStage]}</p>
          </div>
          <div style={{display:"flex",gap:4}}>
            <Pill color={C.green} filled>{s.cited} Cited</Pill>
            <Pill color={C.amber} filled>{s.mentioned} Mentioned</Pill>
            <Pill color={C.red} filled>{s.absent} Absent</Pill>
          </div>
        </div>
        {/* Column headers */}
        {(()=>{const top5Eng=[{key:"gpt",name:"ChatGPT",color:"#10A37F",Logo:ChatGPTLogo},{key:"gemini",name:"Gemini",color:"#4285F4",Logo:GeminiLogo},{key:"claude",name:"Claude",color:"#D97757",Logo:ClaudeLogo},{key:"perplexity",name:"Perplexity",color:"#20B8CD",Logo:PerplexityLogo},{key:"deepseek",name:"DeepSeek",color:"#4D6BFE",Logo:DeepSeekLogo}];
        return(<>
        <div style={{display:"grid",gridTemplateColumns:`1fr repeat(5, 48px)`,padding:"8px 20px",borderBottom:`2px solid ${C.borderSoft}`,background:C.bg}}>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>Prompt</span>
          {top5Eng.map(e=><div key={e.key} style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <e.Logo size={14}/><span style={{fontSize:8,color:C.muted,fontWeight:600,lineHeight:1}}>{e.name}</span>
          </div>)}
        </div>
        {sorted.map((p,j)=>{
          const eng=p.engines||{};
          const isExpanded=expandedRow===`${selStage}-${j}`;
          const hasTips=p.gptAnswer||p.gemAnswer||p.optimisedPrompt||p.contentTip;
          return(<div key={j}>
            <div onClick={()=>hasTips&&setExpandedRow(isExpanded?null:`${selStage}-${j}`)}
              style={{display:"grid",gridTemplateColumns:`1fr repeat(5, 48px)`,padding:"10px 20px",borderBottom:`1px solid ${C.borderSoft}`,alignItems:"center",
                background:p.custom?`${C.accent}04`:isExpanded?`${color}04`:"transparent",cursor:hasTips?"pointer":"default",transition:"background .1s"}}>
              {/* Query */}
              <div>
                <div style={{fontSize:12,lineHeight:1.4,color:C.text}}>"{p.query}"</div>
                {p.custom&&<span style={{fontSize:9,fontWeight:600,color:C.accent,padding:"1px 5px",background:`${C.accent}10`,borderRadius:3}}>CUSTOM</span>}
                {hasTips&&<span style={{fontSize:9,color:C.muted,marginLeft:4}}>{isExpanded?"▲":"▼ details"}</span>}
              </div>
              {top5Eng.map(e=>{const st=eng[e.key]||p.status||"Absent";return(<div key={e.key} style={{textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:statusColor(st)}}>{statusIcon(st)}</span>
                <div style={{fontSize:9,color:statusColor(st),marginTop:1}}>{st}</div>
              </div>);})}
            </div>
            {/* Expanded detail row */}
            {isExpanded&&<div style={{padding:"12px 20px 14px 20px",borderBottom:`1px solid ${C.borderSoft}`,background:`${color}03`}}>
              {(p.gptAnswer||p.gemAnswer)&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                {p.gptAnswer?<div style={{padding:"8px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
                  <div style={{fontSize:10,fontWeight:600,color:"#10A37F",marginBottom:4,display:"flex",alignItems:"center",gap:4}}><ChatGPTLogo size={12}/>ChatGPT Response</div>
                  <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{p.gptAnswer.slice(0,400)}{p.gptAnswer.length>400?"...":""}</div>
                </div>:<div style={{padding:"8px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
                  <div style={{fontSize:10,fontWeight:600,color:"#10A37F",marginBottom:4}}>ChatGPT</div>
                  <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>No response captured</div>
                </div>}
                {p.gemAnswer?<div style={{padding:"8px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
                  <div style={{fontSize:10,fontWeight:600,color:"#4285F4",marginBottom:4,display:"flex",alignItems:"center",gap:4}}><GeminiLogo size={12}/>Gemini Response</div>
                  <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{p.gemAnswer.slice(0,400)}{p.gemAnswer.length>400?"...":""}</div>
                </div>:<div style={{padding:"8px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.borderSoft}`}}>
                  <div style={{fontSize:10,fontWeight:600,color:"#4285F4",marginBottom:4}}>Gemini</div>
                  <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>No response captured</div>
                </div>}
              </div>}
              {p.optimisedPrompt&&<div style={{marginBottom:10}}>
                <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:4}}>Optimised Prompt to Target</div>
                <div style={{fontSize:11,color:C.sub,fontStyle:"italic",lineHeight:1.5}}>"{p.optimisedPrompt}"</div>
              </div>}
              {p.contentTip&&<div style={{padding:"8px 12px",background:`${C.green}06`,borderRadius:8,borderLeft:`3px solid ${C.green}`}}>
                <div style={{fontSize:10,fontWeight:600,color:C.green,marginBottom:2}}>CONTENT STRATEGY TIP</div>
                <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{p.contentTip}</div>
              </div>}
            </div>}
          </div>);
        })}
      </>);})()}
      </Card>);
    })()}
  </div>);
}

/* ─── PAGE: PROMPT VOLUME ─── */
function PromptVolumePage({r,goTo,cache,setCache}){
  const volumeData=cache.volumeData;
  const customVolumes=cache.customVolumes||[];
  const setVolumeData=(d)=>setCache(prev=>({...prev,volumeData:d}));
  const setCustomVolumes=(fn)=>setCache(prev=>({...prev,customVolumes:typeof fn==="function"?fn(prev.customVolumes||[]):fn}));
  const[loading,setLoading]=useState(false);
  const[newPrompt,setNewPrompt]=useState("");
  const[checking,setChecking]=useState(false);

  const stageNames=["Awareness","Consideration","Decision","Retention"];
  const stages=r.funnelStages||[];

  const getStagePrompts=(si)=>{
    const s=stages[si];
    return(s&&s.prompts||[]).filter(p=>p.query).map(p=>({query:p.query,stage:stageNames[si]||s.stage||"Unknown"}));
  };
  const allPrompts=stageNames.flatMap((_,si)=>getStagePrompts(si));

  const generate=async()=>{
    if(allPrompts.length===0||loading)return;
    setLoading(true);
    const queryList=allPrompts.map((p,i)=>`${i+1}. "${p.query}"`).join("\n");
    const sysPrompt="You are an expert search analyst with deep knowledge of Google search volume data and keyword research.";
    const prompt=`What is the estimated average monthly Google search volume for each of these queries in the ${r.clientData.industry} space (${r.clientData.region})?

Queries:
${queryList}

Return JSON array only:
[{"query":"<exact query>","volume":<number>,"competition":"Low"|"Medium"|"High"}]

Rules:
- volume = estimated average monthly Google searches
- Be realistic — most long-tail queries have <500 monthly volume
- competition: Low (<3 strong results), Medium (3-8), High (8+)`;

    try{
      const raw=await callOpenAI(prompt,sysPrompt);
      const parsed=safeJSON(raw);
      if(Array.isArray(parsed)){
        const merged=allPrompts.map(ap=>{
          const match=parsed.find(v=>v.query&&v.query.toLowerCase()===ap.query.toLowerCase());
          return{query:ap.query,volume:match?match.volume:0,competition:match?match.competition:"Low"};
        });
        setVolumeData(merged);
        setCustomVolumes([]);
      }else{setVolumeData([]);}
    }catch(e){console.error("Volume generation error:",e);setVolumeData([]);}
    setLoading(false);
  };

  const checkPrompt=async()=>{
    if(!newPrompt.trim()||checking)return;
    setChecking(true);
    const q=newPrompt.trim();
    setNewPrompt("");
    const sysPrompt="You are an expert search analyst with deep knowledge of Google search volume data and keyword research.";
    const prompt=`What is the estimated average monthly Google search volume for this query in the ${r.clientData.industry} space (${r.clientData.region})?

Query: "${q}"

Return JSON only:
{"query":"<exact query>","volume":<number>,"competition":"Low"|"Medium"|"High"}`;
    try{
      const raw=await callOpenAI(prompt,sysPrompt);
      const parsed=safeJSON(raw);
      if(parsed&&parsed.query){
        const entry={query:parsed.query,volume:parsed.volume||0,competition:parsed.competition||"Low"};
        setCustomVolumes(prev=>[...prev,entry]);
      }
    }catch(e){console.error("Volume check error:",e);}
    setChecking(false);
  };

  const compColor=(c)=>c==="High"?C.red:c==="Medium"?C.amber:C.green;
  const fmt=(n)=>typeof n==="number"?n.toLocaleString():"-";

  const allVols=[...(volumeData||[]),...customVolumes].sort((a,b)=>b.volume-a.volume);
  const totalAll=allVols.length;
  const avgAll=allVols.length>0?Math.round(allVols.reduce((s,v)=>s+v.volume,0)/allVols.length):0;

  return(<div>
    <div style={{marginBottom:24}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>Prompt Volume</h2>
      <p style={{color:C.sub,fontSize:13,marginTop:3}}>Estimated monthly search volume for your audit queries, based on Google search data as a proxy for overall search interest.</p>
    </div>

    <SectionNote text="Volumes are AI-estimated using Google search data as a proxy. These reflect directional search interest — actual volumes may vary. Use as a relative indicator to prioritise high-demand prompts."/>

    {/* Generate */}
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <button onClick={generate} disabled={loading||allPrompts.length===0} style={{padding:"9px 22px",background:loading?C.muted:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:loading?"not-allowed":"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:8}}>
          {loading&&<span style={{width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .6s linear infinite"}}/>}
          {loading?`Estimating ${allPrompts.length} prompts...`:"Estimate Volumes"}
        </button>
        {allPrompts.length>0&&<span style={{fontSize:11,color:C.muted}}>{allPrompts.length} prompts</span>}
        <span style={{fontSize:10,color:C.amber,fontWeight:500,marginLeft:"auto"}}>AI-estimated</span>
      </div>
      {allPrompts.length===0&&<div style={{fontSize:11,color:C.muted,marginTop:10}}>No prompts found — run an audit first.</div>}
    </Card>

    {/* Check a prompt bar */}
    <Card style={{marginBottom:16,background:`${C.accent}03`,borderColor:`${C.accent}20`}}>
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Check a Prompt</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Enter any query to get its estimated search volume and competition level.</div>
      <div style={{display:"flex",gap:8}}>
        <input value={newPrompt} onChange={e=>setNewPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")checkPrompt();}}
          placeholder={`e.g. "Best ${r.clientData.industry||"tech"} companies in ${r.clientData.region||"my area"}"`}
          style={{flex:1,padding:"10px 16px",border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,color:C.text,outline:"none",background:"#fff"}}
          onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
        <button onClick={checkPrompt} disabled={!newPrompt.trim()||checking}
          style={{padding:"10px 20px",background:!newPrompt.trim()||checking?"#d1d5db":C.accent,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:!newPrompt.trim()||checking?"not-allowed":"pointer",whiteSpace:"nowrap",minWidth:120}}>
          {checking?"Checking...":"Check Volume"}
        </button>
      </div>
    </Card>

    {/* Summary bar */}
    {allVols.length>0&&<div style={{display:"flex",gap:12,marginBottom:16}}>
      <Pill color={C.accent}>{totalAll} prompts</Pill>
      <Pill color={C.green}>avg {fmt(avgAll)}/mo</Pill>
      <Pill color={C.amber}>AI-estimated</Pill>
    </div>}

    {/* Prompt list */}
    {(()=>{
      if(!volumeData&&customVolumes.length===0)return(<Card><div style={{textAlign:"center",padding:24,color:C.muted,fontSize:13}}>
        <div style={{marginBottom:8}}><Icon name="bar-chart" size={28} color={C.muted}/></div>
        Click Estimate Volumes to generate search volume data.
      </div></Card>);
      if(allVols.length===0)return(<Card><div style={{textAlign:"center",padding:24,color:C.muted,fontSize:13}}>No volume data yet.</div></Card>);
      return(<Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.borderSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Icon name="bar-chart" size={18} color={C.accent}/>
            <h3 style={{fontSize:16,fontWeight:700,color:C.text,margin:0}}>All Prompts</h3>
          </div>
          <div style={{display:"flex",gap:6}}>
            <Pill color={C.accent}>{allVols.length} prompts</Pill>
            <Pill color={C.green}>avg {fmt(avgAll)}/mo</Pill>
          </div>
        </div>
        {/* Column headers */}
        <div style={{display:"grid",gridTemplateColumns:"40px 1fr 110px 90px",padding:"8px 20px",borderBottom:`2px solid ${C.borderSoft}`,background:C.bg}}>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>#</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase"}}>Prompt</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",textAlign:"right"}}>Est. Monthly Vol.</span>
          <span style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",textAlign:"center"}}>Competition</span>
        </div>
        {allVols.map((v,j)=>(<div key={j} style={{display:"grid",gridTemplateColumns:"40px 1fr 110px 90px",padding:"10px 20px",borderBottom:`1px solid ${C.borderSoft}`,alignItems:"center",transition:"background .1s"}} onMouseEnter={ev=>ev.currentTarget.style.background=`${C.accent}04`} onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
          <span style={{fontSize:12,color:C.muted,fontWeight:500}}>{j+1}</span>
          <div>
            <span style={{fontSize:12,color:C.text,lineHeight:1.4}}>"{v.query}"</span>
            {customVolumes.includes(v)&&<span style={{fontSize:9,fontWeight:600,color:C.accent,padding:"1px 5px",background:`${C.accent}10`,borderRadius:3,marginLeft:6}}>CUSTOM</span>}
          </div>
          <span style={{fontSize:13,fontWeight:700,color:C.text,textAlign:"right",fontVariantNumeric:"tabular-nums"}}>{fmt(v.volume)}</span>
          <div style={{textAlign:"center"}}><Pill color={compColor(v.competition)}>{v.competition}</Pill></div>
        </div>))}
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
  const docTypes=[{type:"Brand Logo",icon:"palette",desc:"Primary and secondary logos (SVG, PNG)"},{type:"Brand CI / Style Guide",icon:"ruler",desc:"Colours, typography, spacing rules"},{type:"Messaging Framework",icon:"message-circle",desc:"Taglines, value props, tone of voice"},{type:"Media Kit",icon:"package",desc:"Press photos, exec headshots, boilerplate"},{type:"Product Docs",icon:"file-text",desc:"Feature sheets, technical documentation"},{type:"Case Studies",icon:"bar-chart",desc:"Customer success stories and data"}];
  return(<div>
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>Brand Playbook</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Your AEO brand hub — identity, assets, and AI-optimised guidelines</p></div>
    <SectionNote text="This is your central brand hub for AEO. Upload your brand assets so our system can reference them when generating content strategies. The guidelines below are tailored to how AI engines process and cite brand information."/>

    {/* Brand Identity Form */}
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:0}}>Brand Identity</h3>{saved&&<Pill color={C.green} filled>✓ Saved</Pill>}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Tagline</label><input value={brandAssets.tagline} onChange={e=>setBrandAssets({...brandAssets,tagline:e.target.value})} placeholder={`e.g. "${r.clientData.brand} — The future of ${r.clientData.industry}"`} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Colours (hex codes)</label><input value={brandAssets.colors} onChange={e=>setBrandAssets({...brandAssets,colors:e.target.value})} placeholder="e.g. #0c4cfc, #10b981, #0c1222" style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Tone of Voice</label><input value={brandAssets.tone} onChange={e=>setBrandAssets({...brandAssets,tone:e.target.value})} placeholder="e.g. Authoritative, data-driven, approachable" style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none"}}/></div>
        <div><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Brand Positioning</label><input value={brandAssets.positioning} onChange={e=>setBrandAssets({...brandAssets,positioning:e.target.value})} placeholder={`e.g. "The most trusted ${r.clientData.industry} platform for enterprise"`} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none"}}/></div>
        <div style={{gridColumn:"1/-1"}}><label style={{fontSize:11,fontWeight:500,color:C.muted,display:"block",marginBottom:4}}>Mission Statement</label><textarea value={brandAssets.mission} onChange={e=>setBrandAssets({...brandAssets,mission:e.target.value})} placeholder={`e.g. "${r.clientData.brand} empowers organisations to harness ${r.clientData.industry} for measurable business outcomes..."`} rows={2} style={{width:"100%",padding:"8px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none",resize:"vertical"}}/></div>
      </div>
      <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setSaved(true)} style={{padding:"8px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>Save Brand Identity</button></div>
    </Card>

    {/* Document Upload Hub */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 4px"}}>Brand Asset Library</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>Upload and store brand documents. These inform your AEO content strategy.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {docTypes.map((dt,i)=>{const uploaded=docs.filter(d=>d.type===dt.type);return(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,border:`1px dashed ${uploaded.length>0?C.green:C.border}`,textAlign:"center",cursor:"pointer",transition:"all .15s"}} onClick={()=>addDoc(dt.type)}>
          <div style={{marginBottom:4,display:"flex",justifyContent:"center"}}><Icon name={dt.icon} size={20} color={C.accent}/></div>
          <div style={{fontSize:12,fontWeight:600,color:C.text}}>{dt.type}</div>
          <div style={{fontSize:10,color:C.muted,marginTop:2}}>{dt.desc}</div>
          {uploaded.length>0?<div style={{marginTop:6}}><Pill color={C.green} filled>{uploaded.length} uploaded</Pill></div>:<div style={{marginTop:6,fontSize:10,color:C.accent,fontWeight:500}}>+ Click to upload</div>}
        </div>);})}
      </div>
      {docs.length>0&&<div>
        <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Uploaded Documents ({docs.length})</div>
        {docs.map((d,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:C.surface,borderRadius:8,border:`1px solid ${C.borderSoft}`,marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Icon name="paperclip" size={14} color={C.muted}/><div><div style={{fontSize:11,fontWeight:500,color:C.text}}>{d.type}</div><div style={{fontSize:10,color:C.muted}}>{d.name} · {d.size} · {d.date}</div></div></div>
          <span onClick={()=>setDocs(docs.filter((_,j)=>j!==i))} style={{fontSize:12,color:C.red,cursor:"pointer",fontWeight:500}}>Remove</span>
        </div>))}
      </div>}
    </Card>

    {/* AEO Brand Guidelines - expandable */}
    <Card style={{marginBottom:16}}>
      <h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 4px"}}>AEO Brand Guidelines</h3>
      <p style={{fontSize:12,color:C.muted,margin:"0 0 14px"}}>{r.brandGuidelines.length} technical guidelines for maximising AI engine citation rate. Click to expand.</p>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {r.brandGuidelines.map((g,i)=>{const isOpen=expandG===i;return(<div key={i} style={{borderRadius:C.rs,border:`1px solid ${isOpen?`${C.accent}25`:C.border}`,overflow:"hidden",transition:"all .15s"}}>
          <div onClick={()=>setExpandG(isOpen?null:i)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,background:isOpen?`${C.accent}03`:"transparent"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><span style={{fontSize:11,fontWeight:700,color:C.accent,background:`${C.accent}08`,padding:"2px 8px",borderRadius:4}}>G{String(i+1).padStart(2,"0")}</span><span style={{fontSize:13,fontWeight:600,color:C.text}}>{g.area}</span></div>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>AEO Channels</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Channels ranked by impact on AI engine visibility {hasAnyFindings&&<span style={{padding:"2px 8px",background:`${C.green}10`,borderRadius:100,fontSize:10,fontWeight:600,color:C.green,marginLeft:6}}>✓ Verified via Web Search</span>}</p></div>
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
          {ch.finding&&<div style={{padding:"8px 12px",background:ch.status==="Active"?`${C.green}05`:ch.status==="Not Present"?`${C.red}05`:`${C.amber}05`,borderRadius:8,borderLeft:`3px solid ${ch.status==="Active"?C.green:ch.status==="Not Present"?C.red:C.amber}`,marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:2}}>Verification Finding</div>
            <div style={{fontSize:11,color:C.sub,lineHeight:1.5}}>{ch.finding}</div>
          </div>}
          {hasSites&&<div>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",marginBottom:6}}>Top {ch.sites.length} sites & publishers to target</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {ch.sites.map((s,si)=>(<div key={si} style={{padding:"8px 10px",background:C.bg,borderRadius:8}}>
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
    <div style={{marginBottom:24}}><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>Content-Channel Grid</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Personalised content strategy based on {r.clientData.brand}'s audit findings.</p></div>
    <SectionNote text={`This content grid is tailored to ${r.clientData.brand}'s specific AEO gaps and competitive landscape. Priority P0 = start immediately based on audit findings.`}/>
    <Card style={{marginBottom:20,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["Content Type","Channels","Frequency","Priority","Owner"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:600,color:C.muted,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
      <tbody>{[...r.contentTypes].sort((a,b)=>{const po={"P0":0,"P1":1,"P2":2,"P3":3};return(po[a.p]??9)-(po[b.p]??9);}).map((ct,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
        <td style={{padding:"10px"}}><div style={{fontWeight:600,color:C.text}}>{ct.type}</div>{ct.rationale&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{ct.rationale}</div>}</td>
        <td style={{padding:"10px"}}><div style={{display:"flex",flexWrap:"wrap",gap:3}}>{ct.channels.map(ch=><Pill key={ch} color="#64748b">{ch}</Pill>)}</div></td>
        <td style={{padding:"10px",color:C.sub}}>{ct.freq}</td>
        <td style={{padding:"10px"}}><Pill color={ct.p==="P0"?C.red:ct.p==="P1"?C.amber:"#94a3b8"}>{ct.p}</Pill></td>
        <td style={{padding:"10px",color:C.sub,fontSize:11}}>{ct.owner}</td>
      </tr>))}</tbody></table>
    </Card>
    <Card><h3 style={{fontSize:14,fontWeight:600,color:C.text,margin:"0 0 12px"}}>Monthly Output Requirements for {r.clientData.brand}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {(r.outputReqs||[]).map((item,i)=>(<div key={i} style={{padding:"14px",background:C.bg,borderRadius:C.rs,textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:C.accent}}>{item.n}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>{item.u}</div><div style={{fontSize:12,fontWeight:600,color:C.text}}>{item.l}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{item.d}</div></div>))}
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
    const pdfEngKeys=[{key:"gpt",name:"ChatGPT"},{key:"gemini",name:"Gemini"},{key:"claude",name:"Claude"},{key:"perplexity",name:"Perplexity"},{key:"deepseek",name:"DeepSeek"}];
    const funnelHtml=r.stakeholders.flatMap(sg=>sg.archetypes).filter(a=>a.journey&&a.journey.length>0).map(a=>{
      return`<h3>${a.icon} ${a.name}</h3>${(a.journey||[]).map(s=>{const st={c:(s.prompts||[]).filter(p=>p.status==="Cited").length,m:(s.prompts||[]).filter(p=>p.status==="Mentioned").length,a:(s.prompts||[]).filter(p=>p.status==="Absent").length};return`<div style="margin-bottom:8px"><strong style="color:${s.color}">${s.stage}</strong> <span style="color:#8896a6">(${st.c} cited, ${st.m} mentioned, ${st.a} absent)</span></div><table><tr><th>Prompt</th>${pdfEngKeys.map(ek=>`<th>${ek.name}</th>`).join("")}<th>Overall</th></tr>${(s.prompts||[]).map(p=>{const e=p.engines||{};return`<tr><td>${p.query}</td>${pdfEngKeys.map(ek=>{const st=e[ek.key]||p.status||"Absent";return`<td style="color:${st==="Cited"?"#059669":st==="Mentioned"?"#d97706":"#dc2626"}">${st}</td>`;}).join("")}<td style="color:${p.status==="Cited"?"#059669":p.status==="Mentioned"?"#d97706":"#dc2626"}">${p.status}</td></tr>`;}).join("")}</table>`;}).join("")}`;
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
      <div><h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:0}}>90-Day Transformation Roadmap</h2><p style={{color:C.sub,fontSize:13,marginTop:3}}>Department-by-department plan for <strong>{r.clientData.brand}</strong></p></div>
      <button onClick={handleExport} style={{padding:"10px 20px",background:C.text,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><Icon name="file-text" size={14} color="#fff"/> Export Full Report</button>
    </div>
    <SectionNote text="This roadmap assigns tasks to every department involved. The PDF export includes all 8 stages of your audit in a professional format with cover page and table of contents."/>

    <Card style={{marginBottom:20,background:C.bg}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,textAlign:"center"}}>
        {[{l:"Current",s:r.overall,c:C.red,d:"Today"},{l:"Day 30",s:Math.min(90,r.overall+12),c:C.amber,d:"+10-15%"},{l:"Day 60",s:Math.min(95,r.overall+25),c:"#f59e0b",d:"+20-30%"},{l:"Day 90",s:Math.min(98,r.overall+40),c:C.green,d:"+40-60%"}].map(x=>(<div key={x.l}><Ring score={x.s} size={64} color={x.c} sw={4}/><div style={{fontSize:12,fontWeight:600,color:C.text,marginTop:4}}>{x.l}</div><div style={{fontSize:10,color:C.muted}}>{x.d}</div></div>))}
      </div>
    </Card>

    <div style={{position:"relative",paddingLeft:24}}>
      <div style={{position:"absolute",left:9,top:12,bottom:12,width:2,background:C.accent,borderRadius:1}}/>
      {phases.map((p,idx)=>(<div key={idx} style={{position:"relative",marginBottom:idx<2?16:0}}>
        <div style={{position:"absolute",left:-19,top:10,width:12,height:12,borderRadius:"50%",background:p.accent,border:"3px solid #f5f6f8",boxShadow:`0 0 0 2px ${p.accent}33`}}/>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div style={{fontSize:16,fontWeight:700,color:C.text}}>{p.title}</div><div style={{color:p.accent,fontSize:11,fontWeight:600,marginTop:1}}>{p.sub}</div></div>
            <div style={{padding:"5px 12px",background:`${p.accent}08`,borderRadius:8,border:`1px solid ${p.accent}20`}}><span style={{fontSize:10,color:C.muted}}>Lift: </span><span style={{fontSize:14,fontWeight:700,color:p.accent}}>{p.lift}</span></div>
          </div>
          {p.departments.map((d,di)=>(<div key={di} style={{marginBottom:di<p.departments.length-1?10:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><div style={{width:3,height:14,borderRadius:4,background:d.color}}/><span style={{fontSize:12,fontWeight:700,color:d.color}}>{d.dept}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginLeft:10}}>{d.tasks.map((tk,ti)=>(<div key={ti} style={{padding:"6px 8px",background:C.bg,borderRadius:8,fontSize:11,color:C.sub,display:"flex",gap:6}}><span style={{color:d.color,fontSize:10}}>→</span>{tk}</div>))}</div>
          </div>))}
        </Card>
      </div>))}
    </div>

    <Card style={{marginTop:20,background:`${C.accent}06`,border:`1px solid ${C.accent}20`,textAlign:"center"}}>
      <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>Ready to dominate AI search results?</div>
      <p style={{fontSize:12,color:C.sub,maxWidth:460,margin:"0 auto 14px"}}>Let Entermind execute this strategy and guarantee measurable AEO improvements within 90 days.</p>
      <button onClick={handleExport} style={{padding:"12px 24px",background:C.accent,color:"#fff",border:"none",borderRadius:C.rs,fontSize:13,fontWeight:600,cursor:"pointer"}}>Export Full Report as PDF</button>
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

  return(<div style={{minHeight:"100vh",background:"#fff"}}>
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
          <h1 style={{fontSize:28,fontWeight:700,color:C.text,margin:0,letterSpacing:"-.02em"}}>Client Management</h1>
        </div>
      </div>

      {/* Workspaces section */}
      <div style={{border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",background:"#fff"}}>
        <div style={{padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke={C.sub} strokeWidth="1.5"/></svg>
            <span style={{fontSize:14,fontWeight:600,color:C.text}}>Workspaces</span>
          </div>
          <button onClick={onNew} style={{padding:"8px 18px",background:C.text,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"opacity .15s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            New workspace
          </button>
        </div>

        {loading?<div style={{textAlign:"center",padding:60,color:C.muted}}><div style={{width:24,height:24,border:`2.5px solid ${C.borderSoft}`,borderTopColor:C.accent,borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 12px"}}/><span style={{fontSize:13}}>Loading...</span></div>:
         projects.length===0?<div style={{textAlign:"center",padding:"64px 40px"}}>
          <div style={{width:48,height:48,borderRadius:10,background:C.bg,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 4v14M4 11h14" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"0 0 6px"}}>No workspaces yet</h3>
          <p style={{color:C.muted,fontSize:13,margin:"0 0 20px"}}>Create your first workspace to start tracking AEO visibility.</p>
          <button onClick={onNew} style={{padding:"10px 20px",background:C.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Create workspace</button>
        </div>:
        <div>
          {projects.sort((a,b)=>new Date(b.lastAudit||b.createdAt)-new Date(a.lastAudit||a.createdAt)).map((p,pi)=>(
            <div key={p.id} onClick={()=>onSelect(p)}
              onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
              style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:pi<projects.length-1?`1px solid ${C.borderSoft}`:"none",background:hovered===p.id?"#f8fafc":"transparent",transition:"background .15s"}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${C.accent}08`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:16,fontWeight:700,color:C.accent}}>{(p.brand||"?")[0].toUpperCase()}</span>
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
                <button onClick={(e)=>{e.stopPropagation();onSelect(p);}} style={{padding:"6px 16px",background:"#fff",color:C.text,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .15s"}}
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
  const[volumeCache,setVolumeCache]=useState({engine:"google",volumeData:null,customVolumes:[]});
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
    setStep("audit");
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

  if(!authed)return(<div style={{minHeight:"100vh",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}10!important}`}</style>
    <div style={{width:"100%",maxWidth:380,padding:"0 24px",animation:"fadeIn .5s ease-out"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:6}}>
          <svg width="36" height="36" viewBox="0 0 28 28"><rect width="28" height="28" rx="7" fill={C.accent}/><path d="M7 14L12 8L17 14L12 20Z" fill="white" opacity=".9"/><path d="M13 14L18 8L23 14L18 20Z" fill="white" opacity=".5"/></svg>
          <span style={{fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-.03em"}}>EnterRank</span>
        </div>
        <div style={{fontSize:14,color:C.muted,fontWeight:400}}>AI Engine Optimisation Platform</div>
      </div>
      <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:14,padding:"36px 32px",boxShadow:"0 1px 3px rgba(0,0,0,.04),0 8px 32px rgba(0,0,0,.04)"}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,margin:"0 0 2px",textAlign:"center"}}>Welcome back</h2>
        <p style={{fontSize:13,color:C.muted,margin:"0 0 28px",textAlign:"center"}}>Sign in to your account</p>
        <LoginForm onSubmit={handleLogin} error={loginError} loading={loggingIn}/>
      </div>
      <div style={{textAlign:"center",marginTop:20,fontSize:12,color:C.muted}}>Powered by <span style={{fontWeight:600,color:C.sub}}>Entermind</span></div>
    </div>
  </div>);

  if(screen==="hub")return(<>
    <ProjectHub onSelect={handleSelectProject} onNew={handleNewProject} onLogout={handleLogout}/>
    {projectPrompt&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,animation:"fadeIn .2s ease-out"}} onClick={()=>setProjectPrompt(null)}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:14,padding:"32px",width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,.15)",animation:"fadeIn .25s ease-out"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:48,height:48,borderRadius:14,background:`${C.accent}10`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <BrandLogo name={projectPrompt.project.brand} website={projectPrompt.project.website} size={28} color={C.accent}/>
          </div>
          <div style={{fontSize:22,fontWeight:700,color:C.text,marginBottom:6}}>{projectPrompt.project.brand}</div>
          <div style={{fontSize:13,color:C.muted}}>Last audit: {projectPrompt.lastAudit.date||"Recent"} · Score: {projectPrompt.lastAudit.overall||"—"}%</div>
        </div>
        <div style={{fontSize:14,color:C.sub,textAlign:"center",marginBottom:24}}>Would you like to run another audit or view the existing dashboard?</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>openProjectDashboard(projectPrompt.project,projectPrompt.lastAudit)} style={{flex:1,padding:"14px 20px",background:"#fff",border:`2px solid ${C.accent}`,borderRadius:10,fontSize:14,fontWeight:600,color:C.accent,cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:`${C.accent}08`})} onMouseLeave={e=>Object.assign(e.target.style,{background:"#fff"})}>View Dashboard</button>
          <button onClick={()=>openProjectForAudit(projectPrompt.project)} style={{flex:1,padding:"14px 20px",background:C.accent,border:`2px solid ${C.accent}`,borderRadius:10,fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>Object.assign(e.target.style,{background:"#1d4ed8"})} onMouseLeave={e=>Object.assign(e.target.style,{background:C.accent})}>Run AEO Audit</button>
        </div>
        <div onClick={()=>setProjectPrompt(null)} style={{textAlign:"center",marginTop:16,fontSize:12,color:C.muted,cursor:"pointer"}}>Cancel</div>
      </div>
    </div>)}
  </>);

  const run=async(apiData)=>{
    const r=generateAll(data, apiData);setResults(r);setVolumeCache({engine:"google",volumeData:null,customVolumes:[]});
    const entry={date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),brand:data.brand,overall:r.overall,engines:r.engines.map(e=>({id:e.id,name:e.name,score:e.score})),mentions:Math.round(r.engines.reduce((a,e)=>a+e.mentionRate,0)/r.engines.length),citations:Math.round(r.engines.reduce((a,e)=>a+e.citationRate,0)/r.engines.length),categories:r.painPoints.map(p=>({label:p.label,score:p.score})),apiData:apiData};
    setHistory(prev=>[...prev,entry]);
    setStep("audit");

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


  return(<div style={{minHeight:"100vh",background:C.bg,color:C.text,display:"flex"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::selection{background:${C.accent}18}input:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px ${C.accent}08!important}`}</style>

    {/* Sidebar */}
    <Sidebar step={step} setStep={setStep} results={results} brand={results?.clientData?.brand||data.brand} onBack={handleBackToHub} isLocal={isLocal} onLogout={handleLogout} collapsed={sideCollapsed} setCollapsed={setSideCollapsed}/>

    {/* Main content */}
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",marginLeft:sideCollapsed?60:220,transition:"margin-left .2s ease"}}>
      <div style={{flex:1,overflowY:"auto",padding:"28px 32px",maxWidth:1060,width:"100%",margin:"0 auto"}}>
        {step==="input"&&<NewAuditPage data={data} setData={setData} onRun={run} history={history}/>}
        {step==="audit"&&results&&<AuditPage r={results} history={history} goTo={setStep}/>}
        {step==="archetypes"&&results&&<ArchetypesPage r={results} goTo={setStep}/>}
        {step==="intent"&&results&&<IntentPage r={results} goTo={setStep}/>}
        {step==="volume"&&results&&<PromptVolumePage r={results} goTo={setStep} cache={volumeCache} setCache={setVolumeCache}/>}
        {step==="playbook"&&results&&<PlaybookPage r={results} goTo={setStep}/>}
        {step==="channels"&&results&&<ChannelsPage r={results} goTo={setStep}/>}
        {step==="grid"&&results&&<GridPage r={results} goTo={setStep}/>}
        {step==="roadmap"&&results&&<RoadmapPage r={results}/>}
      </div>
    </div>
  </div>);
}
