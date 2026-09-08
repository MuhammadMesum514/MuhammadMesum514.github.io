(() => {
const root=document.documentElement;
let raf=0;
addEventListener("pointermove",e=>{if(raf)return;raf=requestAnimationFrame(()=>{root.style.setProperty("--mx",e.clientX+"px");root.style.setProperty("--my",e.clientY+"px");raf=0})},{passive:true});

const toggle=document.getElementById("menuToggle"),menu=document.getElementById("mobileMenu");
const closeMenu=()=>{menu?.classList.remove("open");toggle?.setAttribute("aria-expanded","false")};
toggle?.addEventListener("click",()=>{const open=!menu.classList.contains("open");menu.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open))});
menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));

const targets=document.querySelectorAll(".project,.cap-grid>div,.arch-flow>div,.timeline article,.lab-console");
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("reveal-in");observer.unobserve(e.target)}}),{threshold:.1});
targets.forEach(x=>observer.observe(x));

const canvas=document.getElementById("networkCanvas");
if(canvas&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const ctx=canvas.getContext("2d");let w=0,h=0,dpr=1,pts=[];
 const resize=()=>{w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);const n=Math.min(44,Math.max(18,Math.floor(w/30)));pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12}))};
 resize();addEventListener("resize",resize,{passive:true});
 const draw=()=>{ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1});
 for(let i=0;i<pts.length;i++){let a=pts[i];ctx.fillStyle="rgba(87,240,192,.35)";ctx.fillRect(a.x,a.y,1.4,1.4);for(let j=i+1;j<pts.length;j++){let b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){ctx.strokeStyle=`rgba(87,240,192,${(1-d/120)*.05})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}requestAnimationFrame(draw)};draw();
}

const labBtn=document.getElementById("runLab"),labStatus=document.getElementById("labStatus"),nodes=[...document.querySelectorAll(".lab-node")];
labBtn?.addEventListener("click",()=>{labBtn.disabled=true;nodes.forEach(n=>n.classList.remove("active"));let i=0;const states=["ACCEPTING INPUT...","CLASSIFYING TASK...","RETRIEVING CONTEXT...","REASONING...","EXECUTING TOOLS...","VERIFYING OUTPUT...","SYSTEM COMPLETE ✓"];labStatus.textContent=states[0];const t=setInterval(()=>{nodes.forEach(n=>n.classList.remove("active"));if(i<nodes.length)nodes[i].classList.add("active");i++;labStatus.textContent=states[i]||states[states.length-1];if(i>nodes.length){clearInterval(t);labBtn.disabled=false}},480)});

const cases={
docs:{tag:"AI · DOCUMENT INTELLIGENCE",title:"AI Document Intelligence",summary:"Production document-processing workflows that turn high-volume PDF input into structured, usable information.",problem:"Manual document workflows become expensive and inconsistent at scale.",approach:"Combine document processing with AI-assisted extraction and backend automation for repeatable processing.",engineering:"Python services, APIs, document processing, AI/LLM integrations and production infrastructure.",outcome:"The production work handled 100K+ PDFs."},
agents:{tag:"AGENTS · CREWAI",title:"Multi-Agent Content Generation",summary:"A CrewAI workflow exploring specialized agents collaborating on a content pipeline.",problem:"Complex content workflows contain distinct responsibilities.",approach:"Split responsibilities into specialized agents and orchestrate their work.",engineering:"Python, CrewAI and LLM-based agent orchestration.",outcome:"A practical foundation for extending agentic workflows with tools and APIs."},
study:{tag:"AI PRODUCT",title:"AI Study Coach",summary:"An AI-focused learning product connected to the BestGradez platform.",problem:"Learning products can benefit from intelligent assistance inside the user experience.",approach:"Bring AI capabilities into a real education product instead of an isolated demo.",engineering:"AI services, backend engineering and web product integration.",outcome:"A live AI product direction."},
parkinson:{tag:"DEEP LEARNING · COMPUTER VISION",title:"Parkinson Disease Classifier",summary:"A CNN-based project exploring automated classification of Parkinson disease stages.",problem:"Apply deep learning to a practical classification problem.",approach:"Train and evaluate a convolutional neural network for stage classification.",engineering:"Python, CNNs and deep learning workflows.",outcome:"A hands-on computer-vision project."},
tb:{tag:"HEALTHCARE · DATA INFRASTRUCTURE",title:"Multi-Country TB Control & Research Platform",summary:"A healthcare data platform supporting a TB control program across multiple countries.",problem:"Distributed campaign data needs to become consistent records for analysis and research.",approach:"Synchronize country servers, process and validate data, create analytical records, and support research.",engineering:"Distributed data synchronization, processing workflows and analytics-oriented backend infrastructure.",outcome:"A real-world healthcare data platform, deliberately positioned as infrastructure rather than AI."}
};
const modal=document.getElementById("caseModal");
document.querySelectorAll(".case-btn").forEach(b=>b.addEventListener("click",()=>{const c=cases[b.dataset.case];if(!c)return;for(const [id,key] of [["caseTag","tag"],["caseTitle","title"],["caseSummary","summary"],["caseProblem","problem"],["caseApproach","approach"],["caseEngineering","engineering"],["caseOutcome","outcome"]])document.getElementById(id).textContent=c[key];modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open")}));
document.querySelectorAll("[data-close]").forEach(x=>x.addEventListener("click",()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}));
addEventListener("keydown",e=>{if(e.key==="Escape"){modal?.classList.remove("open");document.body.classList.remove("modal-open")}});
})();