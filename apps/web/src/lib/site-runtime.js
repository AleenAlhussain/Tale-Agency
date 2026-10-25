/* TALAL·AT — the site's interaction layer (cursor, galleries, games, scroll motion, estimator).
   Ported from the static site as-is. It runs once per page load, after React has hydrated the markup,
   and every block checks that its section exists on the page.
   DATA comes from the API through the page (see components/chrome/SiteRuntime.tsx). */
import { BRAND } from '@talal-at/shared/dist/brand';

export function initSite(DATA){
"use strict";
if(window.__taSite)return;window.__taSite=true;
DATA=DATA||{};
var CDN='https://mir-s3-cdn-cf.behance.net/';
var CATS={re:'Real Estate',br:'Branding',ca:'Campaigns',ar:'Art & Type'};
var LETTERS=BRAND.wordmark.letters;
var SUN=BRAND.icon.sun,ROOF=BRAND.icon.roof,DOOR=BRAND.icon.door;
/* archive projects, as the tuples the rest of this file expects: [slug,title,subtitle,behancePath,cover,category,views,innerImage,client] */
var P=(DATA.projects||[]).map(function(p){return [p.slug,p.title,p.subtitle,p.behancePath,p.cover,p.category,p.views,p.innerImage,p.client]});
var BY={};P.forEach(function(p){BY[p[0]]=p});
function cover(p,s){return CDN+'projects/'+(s||'808')+'/'+p[4]}
var NOINNER={sakura:1,sky1:1};
function inner(p){return p[7]&&!NOINNER[p[0]]?CDN+'project_modules/'+p[7]:cover(p)}
function link(p){return 'https://www.behance.net/gallery/'+p[3]}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function im(src,cls,alt,fb){return '<img class="'+(cls||'')+'" src="'+src+'" alt="'+esc(alt||'')+'" loading="lazy" decoding="async" referrerpolicy="no-referrer"'+(fb?' data-fb="'+fb+'"':'')+'>'}
function $(id){return document.getElementById(id)}
function pad(n){return String(n).padStart(2,'0')}

/* ---------- local work: case studies (files in assets/img/work and assets/video) ---------- */
var W='/assets/img/work/',V='/assets/video/';
function wi(p,c){return {src:W+p+'.webp',th:W+p+'-t.webp',cap:c}}
function wv(n,c){return {vid:V+n+'.mp4',poster:V+n+'.jpg',th:V+n+'.jpg',cap:c}}
var CASES={},CASE_ORDER=[];
(DATA.caseStudies||[]).forEach(function(c){CASES[c.slug]={t:c.title,s:c.summary,cat:c.category,cover:c.cover,pos:c.coverPosition||'50% 50%',peek:c.peek||undefined,peekVid:c.peekVideo||undefined,items:c.items||[]};CASE_ORDER.push(c.slug)});
var LOGOS=[['grind','Grind'],['ravel','Ravel'],['miwal','MIWAL'],['reactive','reactive'],['snck','SNCK'],['symbol-01','Symbol'],['anstek','anstek'],['whirl','whirl'],['symbol-02','Symbol'],['kiquzolab','kiquzolab · brand board'],['symbol-03','Symbol']];
var MOODS=[['cadence','Cadence','Running club'],['nest','Nest','Neighbourhood wine bar'],['book-bridle','Book & Bridle','Independent bookshop'],['the-court','The Court','Padel & tennis club'],['mediterraneo','Il Mediterraneo','Local Mediterranean restaurant'],['coastal','Coastal','Hospitality'],['wholeness','House of Wholeness','Wellness']];
var RENDERS=[['matcha-statue','Statue & matcha','3D · art direction'],['perfume','Perfume on the map','3D · product'],['gold-statue','Gold statue','3D · art direction'],['milano','Milano Fashion','3D · product'],['time','What\'s protected persists','Art direction'],['provenance','Chain of custody','Art direction'],['camera','Camera','3D · product'],['phone','Phone','3D · product'],['mouse','Mouse','3D · product'],['laptop','Laptop','3D · product']];
function caseCount(c){var v=c.items.filter(function(i){return i.vid}).length,n=c.items.length-v;return n+(n===1?' frame':' frames')+(v?' · '+v+(v===1?' film':' films'):'')}

/* ---------- gallery viewer (images and videos) ---------- */
var gv=null,gList=[],gI=0,gTitle='';
function gBuild(){if(gv)return;gv=document.createElement('div');gv.className='gv';gv.setAttribute('role','dialog');gv.setAttribute('aria-modal','true');gv.setAttribute('aria-hidden','true');gv.setAttribute('aria-label','Gallery');
  gv.innerHTML='<div class="gv-top"><span class="gv-t"></span><span class="gv-n caps"></span><button class="gv-x" type="button" aria-label="Close">×</button></div><div class="gv-stage"></div><button class="gv-p" type="button" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="gv-nx" type="button" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><div class="gv-cap caps"></div><div class="gv-th"></div>';
  document.body.appendChild(gv);
  gv.querySelector('.gv-x').addEventListener('click',closeGallery);
  gv.querySelector('.gv-p').addEventListener('click',function(){gGo(-1)});gv.querySelector('.gv-nx').addEventListener('click',function(){gGo(1)});
  gv.querySelector('.gv-stage').addEventListener('click',function(e){if(e.target===this)closeGallery()});
  gv.querySelector('.gv-th').addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(b){gI=+b.dataset.g;gShow()}});
  var tx=null;gv.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});gv.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)gGo(d<0?1:-1);tx=null});
}
function gGo(d){if(!gList.length)return;gI=(gI+d+gList.length)%gList.length;gShow()}
function gShow(){var it=gList[gI],st=gv.querySelector('.gv-stage');[].forEach.call(st.querySelectorAll('video'),function(v){v.pause()});
  st.innerHTML=it.vid?'<video src="'+it.vid+'" poster="'+(it.poster||'')+'" autoplay muted loop playsinline controls></video>':'<img src="'+it.src+'" alt="'+esc(gTitle+' — '+(it.cap||''))+'">';
  var m=st.firstChild;if(m.tagName==='VIDEO'){var pr=m.play();if(pr&&pr.catch)pr.catch(function(){})}
  gv.querySelector('.gv-t').textContent=gTitle;gv.querySelector('.gv-n').textContent=pad(gI+1)+' / '+pad(gList.length);gv.querySelector('.gv-cap').textContent=it.cap||'';
  var many=gList.length>1;gv.querySelector('.gv-p').hidden=!many;gv.querySelector('.gv-nx').hidden=!many;gv.querySelector('.gv-th').hidden=!many;
  [].forEach.call(gv.querySelectorAll('.gv-th button'),function(b,j){b.classList.toggle('on',j===gI);if(j===gI&&b.scrollIntoView)b.scrollIntoView({block:'nearest',inline:'center'})});
  [gList[(gI+1)%gList.length],gList[(gI-1+gList.length)%gList.length]].forEach(function(n){if(n&&n.src){var p=new Image();p.src=n.src}})}
function openGallery(list,i,title){gBuild();gList=list;gI=i||0;gTitle=title||'';
  gv.querySelector('.gv-th').innerHTML=list.map(function(it,j){return '<button type="button" data-g="'+j+'" aria-label="'+esc(it.cap||('Item '+(j+1)))+'"><img src="'+(it.th||it.src)+'" alt="" loading="lazy">'+(it.vid?'<i></i>':'')+'</button>'}).join('');
  gShow();gv.classList.add('on');gv.setAttribute('aria-hidden','false');root.classList.add('gv-open');if(window.__lenis)window.__lenis.stop();var x=gv.querySelector('.gv-x');if(x)x.focus({preventScroll:true})}
function closeGallery(){if(!gv||!gv.classList.contains('on'))return;[].forEach.call(gv.querySelectorAll('video'),function(v){v.pause()});gv.querySelector('.gv-stage').innerHTML='';gv.classList.remove('on');gv.setAttribute('aria-hidden','true');root.classList.remove('gv-open');if(window.__lenis)window.__lenis.start()}
function openCase(k,i){var c=CASES[k];if(c)openGallery(c.items,i||0,c.t)}
addEventListener('keydown',function(e){if(!gv||!gv.classList.contains('on'))return;if(e.key==='ArrowRight')gGo(1);else if(e.key==='ArrowLeft')gGo(-1)});
document.addEventListener('click',function(e){var c=e.target.closest('[data-case]');if(!c)return;e.preventDefault();openCase(c.getAttribute('data-case'),0)});
document.addEventListener('error',function(e){var t=e.target;if(!t||t.tagName!=='IMG')return;var f=t.getAttribute('data-fb');if(f){t.removeAttribute('data-fb');t.src=f;return}var lg=t.closest('.lg');if(lg){lg.classList.add('fallback');return}t.style.visibility='hidden';var fr=t.closest('.frame,.ph,.pf,.arc-it');if(fr)fr.classList.add('noimg')},true);
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var root=document.documentElement;
function css(v){return getComputedStyle(root).getPropertyValue(v).trim()}
var redrawers=[];function redrawAll(){redrawers.forEach(function(f){f()})}
function watch(el,fn){var v={on:false};if('IntersectionObserver' in window){new IntersectionObserver(function(es){v.on=es[0].isIntersecting;if(v.on&&fn)fn()},{rootMargin:'100px'}).observe(el)}else v.on=true;return v}
function local(e,el){var r=el.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top,r]}

/* ---------- theme ---------- */
var tBtn=$('themeBtn'),tLbl=$('themeLbl');
function syncTheme(){var d=root.getAttribute('data-theme')==='dark';if(tLbl)tLbl.textContent=d?'Light':'Dark';if(tBtn)tBtn.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',d?'#0C0D0C':'#F4F3EF')}
syncTheme();
if(tBtn)tBtn.addEventListener('click',function(){
  var next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  function apply(){root.setAttribute('data-theme',next);syncTheme();try{localStorage.setItem('ta-theme',next)}catch(err){}redrawAll()}
  if(!document.startViewTransition||reduce){apply();return}
  var r=tBtn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  var vt=document.startViewTransition(apply);
  vt.ready.then(function(){root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},{duration:900,easing:'cubic-bezier(.19,1,.22,1)',pseudoElement:'::view-transition-new(root)'})});
});

/* ---------- toast, clock, year, copy ---------- */
var toast=$('toast'),tt;window.__taSay=function(m){say(m)};function say(m){if(!toast)return;toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('on')},2200)}
function tick(){var c=$('clock');if(!c)return;try{c.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Dubai'}).format(new Date())}catch(e){}}
tick();setInterval(tick,15000);
[].forEach.call(document.querySelectorAll('.yr'),function(y){y.textContent=new Date().getFullYear()});
[].forEach.call(document.querySelectorAll('[data-copy]'),function(b){b.addEventListener('click',function(){var a=b.getAttribute('data-copy');if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a).then(function(){say('Email copied')},function(){say(a)});else say(a)})});

/* ---------- mobile menu ---------- */
var menu=$('menu'),menuBtn=$('menuBtn');
function setMenu(o){if(!menu)return;menu.classList.toggle('open',o);menu.setAttribute('aria-hidden',o?'false':'true');if(menuBtn)menuBtn.setAttribute('aria-expanded',o?'true':'false');document.body.style.overflow=o?'hidden':''}
if(menuBtn)menuBtn.addEventListener('click',function(){setMenu(true)});
if($('menuClose'))$('menuClose').addEventListener('click',function(){setMenu(false)});
addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);closeGallery()}});

/* ---------- page curtain between pages ---------- */
var curtain=$('curtain');
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href]');if(!a||!curtain||reduce)return;
  var h=a.getAttribute('href');if(!/^\/(?!\/|api\/|admin)[\w\-\/]*(#.*)?$/.test(h)||(h.indexOf('#')>-1&&h.split('#')[0]===location.pathname)||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;
  e.preventDefault();setMenu(false);curtain.classList.remove('enter');curtain.classList.add('leave');setTimeout(function(){location.href=h},650);
});
addEventListener('pageshow',function(e){if(e.persisted&&curtain){curtain.classList.remove('leave')}});

/* ---------- cursor ---------- */
var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,fx=mx,fy=my;
var cur=$('cursor'),curL=$('cursorL');
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(cur)cur.classList.add('on')},{passive:true});
document.addEventListener('mouseover',function(e){if(!cur)return;var t=e.target.closest('[data-cursor]');if(t){curL.textContent=t.getAttribute('data-cursor');cur.classList.add('big')}cur.classList.toggle('hide',!!e.target.closest('#match .area,#sign .area,iframe,.form'))});
document.addEventListener('mouseout',function(e){if(!cur)return;var t=e.target.closest('[data-cursor]');if(t&&!t.contains(e.relatedTarget))cur.classList.remove('big')});

/* ---------- featured grid (landing) ---------- */
var LINES=[
 function(){return '<circle cx="202" cy="158" r="120" pathLength="1"/><circle cx="202" cy="158" r="74" pathLength="1"/><line x1="0" y1="158" x2="404" y2="158" pathLength="1"/><line x1="202" y1="0" x2="202" y2="316" pathLength="1"/><line x1="0" y1="0" x2="404" y2="316" pathLength="1"/><line x1="404" y1="0" x2="0" y2="316" pathLength="1"/><rect class="sq" x="199" y="155" width="6" height="6"/><rect class="sq" x="319" y="155" width="6" height="6"/><text class="t" x="14" y="300">01 / STRUCTURE</text>'},
 function(){return '<rect x="40" y="30" width="195" height="195" pathLength="1"/><path d="M235 30 A195 195 0 0 1 40 225" pathLength="1"/><rect x="235" y="30" width="120" height="120" pathLength="1"/><path d="M355 150 A120 120 0 0 0 235 30" pathLength="1"/><line x1="0" y1="225" x2="404" y2="225" pathLength="1"/><rect class="sq" x="232" y="27" width="6" height="6"/><rect class="sq" x="37" y="222" width="6" height="6"/><text class="t" x="14" y="300">02 / RATIO</text>'},
 function(){var s='';for(var i=1;i<6;i++){s+='<line x1="'+(i*67.3)+'" y1="0" x2="'+(i*67.3)+'" y2="316" pathLength="1"/>'}for(var j=1;j<4;j++){s+='<line x1="0" y1="'+(j*79)+'" x2="404" y2="'+(j*79)+'" pathLength="1"/>'}return s+'<circle cx="269" cy="158" r="58" pathLength="1"/><rect class="sq" x="266" y="155" width="6" height="6"/><text class="t" x="14" y="300">03 / GRID</text>'},
 function(){return '<path d="M20 290 C 120 40, 280 300, 384 30" pathLength="1"/><line x1="20" y1="290" x2="120" y2="40" pathLength="1"/><line x1="384" y1="30" x2="280" y2="300" pathLength="1"/><circle cx="202" cy="158" r="96" pathLength="1"/><rect class="sq" x="17" y="287" width="6" height="6"/><rect class="sq" x="381" y="27" width="6" height="6"/><text class="t" x="290" y="300">04 / CONTOUR</text>'}
];
var gridEl=$('grid');
if(gridEl){
  var FEAT=[['sky3','1 / span 7',0],['sakura','8 / span 5',36],['omoria','1 / span 4',0],['nobu','5 / span 8',0],['casa','1 / span 6',0],['celeste','7 / span 6',36],['zorah','1 / span 8',0],['sky1','9 / span 4',0],['mardi','1 / span 5',0],['trends','6 / span 7',0],['pura','1 / span 4',0],['zam','5 / span 4',24],['hamilton','9 / span 4',0]];
  FEAT=FEAT.filter(function(f){return f[0].charAt(0)==='@'?!!CASES[f[0].slice(1)]:!!BY[f[0]]});
  if($('featCount'))$('featCount').textContent=FEAT.length+' of '+(P.length+CASE_ORDER.length)+' projects';
  gridEl.innerHTML=FEAT.map(function(f,i){
    if(f[0].charAt(0)==='@'){var k=f[0].slice(1),c=CASES[k],tw=c.t.split(' '),lw=tw.pop(),ttl=(tw.length?esc(tw.join(' '))+' ':'')+'<em>'+esc(lw)+'</em>',cv=W+c.cover+'.webp',st=' style="object-position:'+c.pos+'"';
      var pk=c.peekVid?'<div class="peek"><video muted loop playsinline preload="none" poster="'+V+c.peekVid+'.jpg"><source src="'+V+c.peekVid+'.mp4" type="video/mp4"></video></div>':'<div class="peek">'+im(W+(c.peek||c.cover)+'-t.webp','','')+'</div>';
      return '<a class="card" style="--c:'+f[1]+';margin-top:'+f[2]+'px" href="/projects#case-'+k+'" data-case="'+k+'" data-cursor="Open">'+
        '<div class="num caps"><span>'+pad(i+1)+'</span><span>'+esc(c.cat)+'</span></div>'+
        '<div class="frame"><div class="box">'+im(cv,'g',c.t).replace('<img ','<img'+st+' ')+im(cv,'c','').replace('<img ','<img'+st+' ')+'</div><span class="ph-name">'+esc(c.t)+'</span>'+
        '<svg class="lines" viewBox="0 0 404 316" preserveAspectRatio="none" aria-hidden="true">'+LINES[i%4]()+'</svg>'+pk+'</div>'+
        '<div class="cap"><h3>'+ttl+'</h3><span class="caps">'+caseCount(c)+'</span><span class="who">'+esc(c.s)+'</span></div></a>'}
    var p=BY[f[0]],t=p[1].split(' '),last=t.pop();
    var title=(t.length?esc(t.join(' '))+' ':'')+'<em>'+esc(last)+'</em>';
    return '<a class="card" style="--c:'+f[1]+';margin-top:'+f[2]+'px" href="'+link(p)+'" target="_blank" rel="noopener" data-cursor="View">'+
      '<div class="num caps"><span>'+pad(i+1)+'</span><span>'+CATS[p[5]]+'</span></div>'+
      '<div class="frame"><div class="box">'+im(cover(p),'g',p[1],cover(p,'404'))+im(cover(p),'c','',cover(p,'404'))+'</div><span class="ph-name">'+esc(p[1])+'</span>'+
      '<svg class="lines" viewBox="0 0 404 316" preserveAspectRatio="none" aria-hidden="true">'+LINES[i%4]()+'</svg>'+
      '<div class="peek'+(NOINNER[p[0]]?' detail':'')+'">'+im(inner(p),'','',cover(p))+'</div></div>'+
      '<div class="cap"><h3>'+title+'</h3><span class="caps">'+(p[6]?p[6].toLocaleString('en-US')+' views':'')+'</span><span class="who">'+esc(p[2])+'</span></div></a>';
  }).join('');
}
var cards=[].slice.call(document.querySelectorAll('.card'));
function reveal(c){if(c.classList.contains('drawn'))return;c.classList.add('drawn');setTimeout(function(){c.classList.add('shown')},reduce?0:1150);setTimeout(function(){c.classList.add('rest')},reduce?0:2900)}
if('IntersectionObserver' in window){var rio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){reveal(en.target);rio.unobserve(en.target)}})},{threshold:.3});cards.forEach(function(c){rio.observe(c)})}else cards.forEach(reveal);
cards.forEach(function(card){
  var fr=card.querySelector('.frame'),c=card.querySelector('.c'),pk=card.querySelector('.peek');
  function pos(e){var r=fr.getBoundingClientRect();return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]}
  function set(e){var p=pos(e);c.style.setProperty('--x',p[0]*100+'%');c.style.setProperty('--y',p[1]*100+'%')}
  var pv=pk&&pk.querySelector('video');
  card.addEventListener('mouseenter',function(e){set(e);if(pv){var pr=pv.play();if(pr&&pr.catch)pr.catch(function(){})}});card.addEventListener('mouseleave',function(e){set(e);if(pv)pv.pause()});
  card.addEventListener('mousemove',function(e){var p=pos(e);pk.style.setProperty('--px',((p[0]-.5)*-40).toFixed(1)+'px');pk.style.setProperty('--py',((p[1]-.5)*-30).toFixed(1)+'px');if(pk.classList.contains('detail')){pk.style.setProperty('--ox',(p[0]*100).toFixed(0)+'%');pk.style.setProperty('--oy',(p[1]*100).toFixed(0)+'%')}});
});

/* ---------- studio track (landing) ---------- */
var GRIDS=[['grid-01','Liquid Gold','Jewellery & beauty grid'],['grid-02','Slow Rituals','Skincare grid'],['grid-03','Quiet Hours','Lifestyle grid'],['grid-04','Fig Season','Food styling grid'],['grid-05','Amber Night','Mood grid'],['grid-06','Into the Woods','Outdoor lifestyle grid'],['grid-07','Legend of Avara','Social identity'],['green-carat/01','Green Carat','Fine jewellery grid · I'],['green-carat/02','Green Carat','Fine jewellery grid · II'],['green-carat/03','Green Carat','Fine jewellery grid · III']];
function gsrc(g){return g[0].indexOf('/')>-1?W+g[0]+'.webp':'/assets/img/grids/'+g[0]+'.webp'}
var RITEMS=RENDERS.map(function(r){return wi('renders/'+r[0],r[1]+' · '+r[2])});
var track=$('track');
if(track){
  var S=[['g',0],['p','trends'],['g',3],['p','callig'],['g',1],['p','colstory'],['g',6],['p','coral'],['g',4],['p','sport'],['g',2],['p','psych'],['g',5],['p','artistry'],['r',0],['r',2],['r',1],['r',3]];
  track.innerHTML=S.map(function(s){
    if(s[0]==='r'){var r=RENDERS[s[1]];return '<a class="slide tall grid9" href="'+W+'renders/'+r[0]+'.webp" data-render="'+s[1]+'" data-cursor="Open"><div class="ph">'+im(W+'renders/'+r[0]+'-t.webp','',r[1]+' — '+r[2])+'<span class="ph-name">'+esc(r[1])+'</span></div><div class="sc caps"><span>'+esc(r[1])+'</span><span>'+esc(r[2])+'</span></div></a>'}
    if(s[0]==='g'){var g=GRIDS[s[1]];return '<a class="slide tall grid9" href="/services#grid-design" data-cursor="Grids"><div class="ph">'+im(gsrc(g),'',g[1]+' — '+g[2])+'<span class="ph-name">'+esc(g[1])+'</span></div><div class="sc caps"><span>'+esc(g[1])+'</span><span>'+esc(g[2])+'</span></div></a>'}
    var p=BY[s[1]];return '<a class="slide" href="'+link(p)+'" target="_blank" rel="noopener" data-cursor="Open"><div class="ph">'+im(cover(p),'',p[1],cover(p,'404'))+'<span class="ph-name">'+esc(p[1])+'</span></div><div class="sc caps"><span>'+esc(p[1])+'</span><span>'+esc(p[2])+'</span></div></a>'
  }).join('')+'<a class="slide tall cta" href="/services" data-cursor="Open"><div class="ph"><div><span class="it">Want a feed that looks like this?</span><span class="caps">Grid design &amp; social media ↗</span></div></div><div class="sc caps"><span>Services</span><span>Social</span></div></a>';
  track.addEventListener('click',function(e){var a=e.target.closest('[data-render]');if(!a)return;e.preventDefault();openGallery(RITEMS,+a.dataset.render,'Studio · 3D & art direction')});
}
if(!fine&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){en.target.classList.toggle('is-active',en.isIntersecting)})},{rootMargin:'-40% 0px -40% 0px'});[].forEach.call(document.querySelectorAll('.card,.slide,.pc'),function(el){io.observe(el)})}

/* ---------- marquee ---------- */
var mq=$('mq');
if(mq){var mk='<svg class="ico" viewBox="'+BRAND.icon.viewBox+'"><use href="#icon"/></svg>';var ph=['<span>a vision beyond the surface '+mk+'</span>','<span class="k">Think. Inspire. Design. '+mk+'</span>','<span>where imagination becomes form '+mk+'</span>','<span class="k">Identities with intention '+mk+'</span>'].join('');mq.innerHTML=ph+ph}

/* ---------- archive: three moving lines of covers ---------- */
var arc=$('arcRows');
if(arc){
  var cut3=[P.slice(0,23),P.slice(23,45),P.slice(45)];
  arc.innerHTML=cut3.map(function(list,r){var items=list.map(function(p){return '<a class="arc-it" href="'+link(p)+'" target="_blank" rel="noopener" data-cursor="View">'+im(cover(p,'404'),'',p[1],cover(p))+'<span class="ph-name">'+esc(p[1])+'</span><span class="nm">'+esc(p[1])+'</span></a>'}).join('');
    return '<div class="arc-row'+(r===1?' rev':'')+'" style="--dur:'+[95,120,105][r]+'s"><div class="arc-track">'+items+items.replace(/<a /g,'<a tabindex="-1" aria-hidden="true" ')+'</div></div>'}).join('');
}

/* ---------- brands: white logos, three moving lines ---------- */
var lrows=$('lrows');
if(lrows){
  /* [file name in assets/img/logos, brand name, width/height ratio] */
  var BR=[
   [['hre','HRE Development',2.0],['omoria','Omoria Private Residences',3.774],['mardi-holding','Mardi Holding',2.941],['royal-caviar','Royal Caviar',1.105],['remax-zam','RE/MAX ZAM',2.426]],
   [['nobu','Nobu Residences',3.413],['dubai-investments-park','Dubai Investments Park',2.926],['al-taif-mall','Al Taif Mall',1.264],['mirdif-hills','Mirdif Hills Avenue',2.084],['silk','Silk Marketing Agency',2.093]],
   [['okta','Okta',3.03],['creative-link','Creative Link Services',1.593],['al-omran','Al Omran Centre',0.877],['wasfaty','Wasfaty Restaurant & Cafe',1.779],['dukan-burger','Dukan Burger',1.22]]
  ];
  lrows.innerHTML=BR.map(function(row,r){var one=row.map(function(b){var k=Math.max(.62,Math.min(1.6,Math.sqrt(2.3/b[2])));return '<span class="lg" style="--k:'+k.toFixed(2)+'" role="img" aria-label="'+esc(b[1])+'"><img src="/assets/img/logos/'+b[0]+'.png" alt="" loading="lazy" decoding="async"><span class="wm s'+(1+(r*5+row.indexOf(b))%6)+'" aria-hidden="true">'+esc(b[1])+'</span></span>'}).join('');
    var hidden=one.replace(/role="img"/g,'aria-hidden="true"');return '<div class="lrow'+(r===1?' rev':'')+'" style="--dur:'+[46,56,50][r]+'s"><div class="ltrack">'+one+hidden+hidden+hidden+'</div></div>'}).join('');
}

/* ---------- projects page ---------- */
var pgrid=$('pgrid');
if(pgrid){
  pgrid.innerHTML=P.map(function(p,i){return '<a class="pc" href="'+link(p)+'" target="_blank" rel="noopener" data-cat="'+p[5]+'" data-cursor="View"><div class="pf">'+im(cover(p),'g',p[1],cover(p,'404'))+im(cover(p),'c','',cover(p,'404'))+'<span class="ph-name">'+esc(p[1])+'</span></div><div class="pk">'+im(inner(p),'','',cover(p))+'</div><div class="pmeta"><h3>'+esc(p[1])+'</h3><span class="caps">'+CATS[p[5]]+'</span><span class="who">'+esc(p[2])+(p[6]?' · '+p[6].toLocaleString('en-US')+' views':'')+'</span></div></a>'}).join('');
  var cnt={all:P.length};P.forEach(function(p){cnt[p[5]]=(cnt[p[5]]||0)+1});
  var fl=$('pfilters');
  fl.innerHTML='<div class="grp">'+[['all','All']].concat(Object.keys(CATS).map(function(k){return [k,CATS[k]]})).map(function(c,i){return '<button type="button" data-f="'+c[0]+'" aria-pressed="'+(i?'false':'true')+'">'+esc(c[1])+'<sup>'+cnt[c[0]]+'</sup></button>'}).join('')+'</div><span class="caps" id="pcount" style="color:var(--mute)">'+P.length+' projects</span>';
  fl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(fl.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});var f=b.getAttribute('data-f'),n=0;
    [].forEach.call(pgrid.children,function(c){var on=f==='all'||c.getAttribute('data-cat')===f;c.hidden=!on;if(on){n++;c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}});$('pcount').textContent=n+' projects';if(window.ScrollTrigger)ScrollTrigger.refresh()});

  var h=location.hash.slice(1);if(h&&CATS[h]){var b=fl.querySelector('[data-f="'+h+'"]');if(b)b.click()}
}

/* ---------- services ---------- */
var svc=$('svc');
if(svc){
  var SV=[
   ['Brand identity &amp; <em>logo</em>','Marks with a reason behind every line. Research, concept, logo, icon and wordmark, built to work from a favicon to a tower facade.',['Logo & icon','Wordmark','Brand strategy','Naming support'],'anira'],
   ['Brand <em>guidelines</em>','The rulebook that keeps a brand consistent: colour, typography, patterns, tone and usage, delivered as a clear PDF book and templates.',['Guidelines book','Colour system','Typography','Templates'],'fanatk'],
   ['Social media <em>management</em>','Your accounts, run as one system: strategy, monthly calendar, shoots, design, captions, publishing, community and a report at the end of every month.',['Strategy & calendar','Content creation','Community','Monthly reports'],'@grid-07|Legend of Avara'],
   ['Grid <em>design</em>','Instagram feeds art-directed as one composition. Every post works on its own, and every nine read as a single frame with one mood and one palette.',['3×3 grid plans','Mood & palette','Post templates','Highlight covers'],'@grid-04|Fig Season'],
   ['Real estate <em>launches</em>','Everything a project needs to sell off-plan: key visuals, sales brochures, hoardings, sales gallery and launch events.',['Key visuals','Brochures','Hoardings','Sales gallery'],'sky3'],
   ['Art &amp; creative <em>direction</em>','Concepts, shoots and campaigns with one point of view, including celebrity campaigns like Salman Khan × Sakura Gardens.',['Campaign concept','Shoot direction','AI imagery','Retouching'],'pura'],
   ['Campaigns &amp; paid <em>ads</em>','Paid creatives that look like the brand and perform like ads, tested in sets and refreshed on schedule.',['Meta ads','Key visuals','Reels covers','A/B creatives'],'iggrid'],
   ['Print &amp; <em>production</em>','Press-ready files and vendor follow-up for brochures, signage, packaging and stationery. CMYK, bleed and finishes handled.',['Brochures','Signage','Packaging','Stationery'],'taifbro'],
   ['Motion &amp; <em>video</em>','Launch films, reels and motion graphics that bring the identity to life on screens and road billboards.',['Reels','Launch films','Motion graphics','DOOH'],'nobu'],
   ['Web &amp; <em>UI</em>','Landing pages and websites designed around the brand, from the first wireframe to the final UI.',['Landing pages','Websites','UI design','Wireframes'],'dipweb']
  ];
  function svcImg(k){var a;if(k.charAt(0)==='@'){a=k.slice(1).split('|');return ['/assets/img/grids/'+a[0]+'.webp',a[1]]}if(k.charAt(0)==='~'){a=k.slice(1).split('|');return [W+a[0]+'.webp',a[1]]}var p=BY[k];return p?[cover(p),p[1]]:['',k]}
  var svcPv=$('svcPv'),svcOn=-1;
  svc.innerHTML=SV.map(function(s,i){return '<li><button type="button" aria-expanded="false" data-i="'+i+'"><span class="n caps">'+pad(i+1)+'</span><span class="tt">'+s[0]+'</span><span class="pl"></span></button><div class="bd"><div><p>'+s[1]+'</p><div class="chips">'+s[2].map(function(c){return '<span>'+esc(c)+'</span>'}).join('')+'</div></div></div></li>'}).join('');
  var svcItems=[].slice.call(svc.children);
  var svcSet=function(i){if(i===svcOn)return;svcOn=i;svcItems.forEach(function(li,j){li.classList.toggle('on',j===i);li.querySelector('button').setAttribute('aria-expanded',j===i?'true':'false')});
    var d=svcImg(SV[i][3]);$('svcCap').textContent=d[1];$('svcNo').textContent=pad(i+1)+' / '+pad(SV.length);$('svcBig').textContent=pad(i+1);$('svcPh').textContent=d[1];
    var old=[].slice.call(svcPv.querySelectorAll('img'));var n=new Image();n.alt=d[1];n.referrerPolicy='no-referrer';n.className='out';n.src=d[0];n.onerror=function(){n.remove()};svcPv.appendChild(n);
    requestAnimationFrame(function(){requestAnimationFrame(function(){n.className='in'})});old.forEach(function(o){setTimeout(function(){o.remove()},1100)})};
  svcItems.forEach(function(li,i){var b=li.querySelector('button');b.addEventListener('click',function(){svcSet(i)});if(fine)b.addEventListener('mouseenter',function(){svcSet(i)})});
  var start=0,hs=location.hash;if(hs==='#social-media')start=2;if(hs==='#grid-design')start=3;svcSet(start);
}

/* ---------- galleries: grid design, moodboards, cases, logofolio ---------- */
var gs=$('gridshow');
if(gs){var GS=GRIDS.filter(function(g){return g[0]!=='grid-07'}),GSI=GS.map(function(g){return {src:gsrc(g),th:gsrc(g),cap:g[1]+' · '+g[2]}});
  gs.innerHTML=GS.map(function(g,i){return '<button class="gi" type="button" data-i="'+i+'" data-cursor="Open"><div class="gimg">'+im(gsrc(g),'',g[1]+' — '+g[2])+'</div><div class="gcap caps"><b>'+esc(g[1])+'</b><span>'+pad(i+1)+' · '+esc(g[2])+'</span></div></button>'}).join('');
  gs.addEventListener('click',function(e){var b=e.target.closest('.gi');if(b)openGallery(GSI,+b.dataset.i,'Grid design')})}
var ms=$('moodshow');
if(ms){var MI=MOODS.map(function(m){return wi('moodboards/'+m[0],m[1]+' · '+m[2])});
  ms.innerHTML=MOODS.map(function(m,i){return '<button class="mb" type="button" data-i="'+i+'" data-cursor="Open"><span class="mimg">'+im(W+'moodboards/'+m[0]+'-t.webp','',m[1]+' moodboard — '+m[2])+'</span><span class="gcap caps"><b>'+esc(m[1])+'</b><span>'+esc(m[2])+'</span></span></button>'}).join('');
  ms.addEventListener('click',function(e){var b=e.target.closest('.mb');if(b)openGallery(MI,+b.dataset.i,'Moodboards')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-lb]');if(!t)return;e.preventDefault();openGallery([{src:t.getAttribute('data-lb'),cap:t.getAttribute('data-cap')||''}],0,'')});
function caseCard(k,home){var c=CASES[k],cv=W+c.cover+'-t.webp',st=' style="object-position:'+c.pos+'"',pk=c.peekVid?V+c.peekVid+'.jpg':W+(c.peek||c.cover)+'-t.webp';
    return '<a class="pc cs"'+(home?'':' id="case-'+k+'"')+' href="'+(home?'/projects':'')+'#case-'+k+'" data-case="'+k+'" data-cursor="Open"><div class="pf">'+im(cv,'g',c.t).replace('<img ','<img'+st+' ')+im(cv,'c','').replace('<img ','<img'+st+' ')+'<span class="ph-name">'+esc(c.t)+'</span><span class="cnt caps">'+caseCount(c)+'</span></div><div class="pk">'+im(pk,'','')+'</div><div class="pmeta"><h3>'+esc(c.t)+'</h3><span class="caps">'+esc(c.cat)+'</span><span class="who">'+esc(c.s)+'</span></div></a>'}
function watchActive(els){if(fine||!('IntersectionObserver' in window))return;var o=new IntersectionObserver(function(es){es.forEach(function(en){en.target.classList.toggle('is-active',en.isIntersecting)})},{rootMargin:'-40% 0px -40% 0px'});[].forEach.call(els,function(el){o.observe(el)})}
var csEl=$('cases');
if(csEl){csEl.innerHTML=CASE_ORDER.map(function(k){return caseCard(k)}).join('');watchActive(csEl.children);
  var h0=location.hash.match(/^#case-(\w+)/);if(h0&&CASES[h0[1]])setTimeout(function(){openCase(h0[1])},700)}
var lc=$('latestCases');
if(lc){lc.innerHTML=['avara','hamilton','sakura','green'].map(function(k){return caseCard(k,1)}).join('');watchActive(lc.children)}
var lf=$('logofolio');
if(lf){var LI=LOGOS.map(function(l){return wi('logos/'+l[0],l[1])});
  lf.innerHTML=LOGOS.map(function(l,i){return '<button class="lgt" type="button" data-i="'+i+'" data-cursor="Open">'+im(W+'logos/'+l[0]+'-t.webp','',l[1]+' logo')+'<span class="caps">'+esc(l[1])+'</span></button>'}).join('')+'<a class="lgt cta" href="/pricing"><span class="it">Your mark,<br>next.</span><span class="caps">Build your scope →</span></a>';
  lf.addEventListener('click',function(e){var b=e.target.closest('.lgt[data-i]');if(b)openGallery(LI,+b.dataset.i,'Logofolio')})}
[].forEach.call(document.querySelectorAll('.pc'),function(c){var f=c.querySelector('.pf'),col=c.querySelector('.c');if(!f||!col)return;function set(e){var r=f.getBoundingClientRect();col.style.setProperty('--x',((e.clientX-r.left)/r.width*100)+'%');col.style.setProperty('--y',((e.clientY-r.top)/r.height*100)+'%')}c.addEventListener('mouseenter',set);c.addEventListener('mouseleave',set)});
/* every step row on the page draws its copper line when it scrolls in */
[].forEach.call(document.querySelectorAll('.steps'),function(steps){
if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){if(es[0].isIntersecting){steps.classList.add('in');so.disconnect()}},{threshold:.3});so.observe(steps)}else steps.classList.add('in');});

/* ---------- pricing: build your scope ---------- */
(function(){
var L=$('estL');if(!L)return;
/* ===== EDIT YOUR PRICES HERE (AED). mo:true = monthly. qty = quantity stepper. inc = included free with these option ids. quote = price on request ===== */
var PR=DATA.pricing,PM=DATA.payment||{};if(!PR)return;
var PAY={link:PM.link||'',deposit:PR.deposit,whatsapp:PM.whatsapp||'971542807100',email:PM.email||'talalatallah10@gmail.com',usd:PR.usdPeg};
var TERMS=PR.terms.map(function(t){return [t.id,t.label,t.discount]});
var S=PR.sections;
var PRE=PR.presets.map(function(p){return [p.label,p.pick]});
var state={r:{},c:{},q:{},term:'1',cur:'AED'};
function all(){var o={};S.forEach(function(s){s.items.forEach(function(i){o[i.id]=[i,s]});(s.add||[]).forEach(function(i){o[i.id]=[i,s]})});return o}
var IX=all();
function money(v,cur){cur=cur||state.cur;var x=cur==='USD'?v/PAY.usd:v;return (cur==='USD'?'$':'AED ')+Math.round(x).toLocaleString('en-US')}
function priceLab(i){if(i.quote)return 'On request';return (i.from?'from ':'')+money(i.p)+(i.mo?'<small>/mo</small>':'')+(i.qty?'<small> each</small>':'')}
function included(i){return i.inc&&i.inc.some(function(id){return Object.keys(state.r).some(function(k){return state.r[k]===id})})}
function render(){
  L.innerHTML=S.map(function(s){
    var opts=s.items.map(function(i){var on=s.radio?state.r[s.k]===i.id:!!state.c[i.id];var inc=included(i);
      return '<div class="opt'+(on?' on':'')+(inc?' inc':'')+'"><button type="button" class="ob" data-s="'+s.k+'" data-id="'+i.id+'" aria-pressed="'+on+'"'+(inc?' disabled':'')+'><span class="mk '+(s.radio?'rad':'chk')+'"></span><span class="ot"><b>'+i.n+(i.tag?' <em class="tg">'+i.tag+'</em>':'')+'</b><span>'+i.d+'</span></span><span class="op">'+(inc?'Included':priceLab(i))+'</span></button>'+
        (i.qty&&on?'<div class="qty"><span>'+i.qty.lab+'<small> '+money(i.p)+' each</small></span><span class="st"><button type="button" data-q="'+i.id+'" data-d="-1" aria-label="Fewer">−</button><output>'+(state.q[i.id]||1)+'</output><button type="button" data-q="'+i.id+'" data-d="1" aria-label="More">+</button></span></div>':'')+'</div>'}).join('');
    var adds=(s.add||[]).map(function(i){var inc=included(i),on=!inc&&!!state.c[i.id];
      return '<div class="opt add'+(on?' on':'')+(inc?' inc':'')+'"><button type="button" class="ob" data-c="'+i.id+'" aria-pressed="'+on+'"'+(inc?' disabled':'')+'><span class="mk chk"></span><span class="ot"><b>'+i.n+'</b><span>'+i.d+'</span></span><span class="op">'+(inc?'Included':'+ '+priceLab(i))+'</span></button>'+
        (i.qty&&on?'<div class="qty"><span>'+i.qty.lab+'</span><span class="st"><button type="button" data-q="'+i.id+'" data-d="-1" aria-label="Fewer">−</button><output>'+(state.q[i.id]||1)+'</output><button type="button" data-q="'+i.id+'" data-d="1" aria-label="More">+</button></span></div>':'')+'</div>'}).join('');
    var term=s.term?'<div class="term"><span class="caps">Commitment</span><div role="group" aria-label="Commitment">'+TERMS.map(function(t){return '<button type="button" data-term="'+t[0]+'" aria-pressed="'+(state.term===t[0])+'">'+t[1]+(t[2]?' <em>−'+Math.round(t[2]*100)+'%</em>':'')+'</button>'}).join('')+'</div></div>':'';
    return '<fieldset class="grp" id="g-'+s.k+'"><legend><span class="no">'+s.no+'</span><span class="gt">'+s.t+'</span></legend><p class="gs">'+s.sub+'</p>'+opts+(adds?'<div class="addh caps">Add-ons</div>'+adds:'')+term+'</fieldset>'}).join('');
  sum();
}
function lines(){var out=[],disc=(TERMS.filter(function(t){return t[0]===state.term})[0]||TERMS[0])[2];
  function push(i,s){if(included(i))return;var q=i.qty?(state.q[i.id]||1):1,amt=(i.p||0)*q;if(i.mo)amt=Math.round(amt*(1-disc));out.push({n:i.n.replace(/&amp;/g,'&')+(q>1?' × '+q:''),amt:amt,mo:!!i.mo,quote:!!i.quote,from:!!i.from})}
  S.forEach(function(s){s.items.forEach(function(i){if(s.radio?state.r[s.k]===i.id:state.c[i.id])push(i,s)});(s.add||[]).forEach(function(i){if(state.c[i.id])push(i,s)})});return out}
function sum(){var ls=lines(),one=0,mo=0,quote=false,from=false;ls.forEach(function(l){if(l.quote)quote=true;if(l.from)from=true;if(l.mo)mo+=l.amt;else one+=l.amt});
  var months=+state.term,dep=Math.round(one*PAY.deposit)+mo;
  $('sumLines').innerHTML=ls.length?ls.map(function(l){return '<li><span>'+esc(l.n)+'</span><b>'+(l.quote?'On request':(l.from?'from ':'')+money(l.amt)+(l.mo?'<small>/mo</small>':''))+'</b></li>'}).join(''):'<li class="empty">Nothing selected yet. Pick a service on the left.</li>';
  $('totOne').textContent=money(one);$('totMo').innerHTML=money(mo)+'<small>/mo</small>';$('rowMo').hidden=!mo;
  var big=one+mo*months;$('totBig').innerHTML=(from?'from ':'')+money(big)+(quote?'<small> + quote</small>':'');
  $('totSub').textContent=mo?(one?money(one)+' one-off + ':'')+money(mo)+' × '+months+(months>1?' months':' month'):(ls.length?'One-off project':' ');
  $('totDep').textContent=money(dep);$('mbTot').textContent=(from?'from ':'')+money(big);
  var txt='Hello Talal, here is my scope from your website:\n\n'+ls.map(function(l){return '• '+l.n+' — '+(l.quote?'on request':(l.from?'from ':'')+money(l.amt,'AED')+(l.mo?'/mo':''))}).join('\n')+(mo?'\n\nCommitment: '+(TERMS.filter(function(t){return t[0]===state.term})[0][1]):'')+'\n\nOne-off: '+money(one,'AED')+(mo?'\nMonthly: '+money(mo,'AED')+'/mo':'')+'\nEstimated investment: '+(from?'from ':'')+money(big,'AED')+'\nTo start: '+money(dep,'AED')+'\n\nMy name: \nCompany: ';
  $('sendWa').href='https://wa.me/'+PAY.whatsapp+'?text='+encodeURIComponent(txt);
  $('sendMail').href='mailto:'+PAY.email+'?subject='+encodeURIComponent('My project scope — '+money(big,'AED'))+'&body='+encodeURIComponent(txt);
  var pb=$('payBtn');pb.hidden=!PAY.link||!ls.length||quote;if(PAY.link)pb.href=PAY.link;pb.dataset.amt=money(dep,'AED');
  [$('sendWa'),$('sendMail')].forEach(function(a){a.classList.toggle('off',!ls.length)});
  $('mbar').classList.toggle('show',ls.length>0);
  try{localStorage.setItem('ta-scope',JSON.stringify(state))}catch(e){}
  /* the 'send to the studio' form (React) listens for this */
  document.dispatchEvent(new CustomEvent('ta:scope',{detail:{state:{r:state.r,c:state.c,q:state.q,term:state.term},currency:state.cur,lines:ls.length,total:big,from:from,quote:quote}}));
}
L.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.q){var i=IX[b.dataset.q][0],v=(state.q[i.id]||1)+(+b.dataset.d);state.q[i.id]=Math.max(1,Math.min(i.qty.max,v));render();return}
  if(b.dataset.term){state.term=b.dataset.term;render();return}
  if(b.dataset.c){state.c[b.dataset.c]=!state.c[b.dataset.c];render();return}
  var s=b.dataset.s,id=b.dataset.id,sec=IX[id][1];
  if(sec.radio){state.r[s]=state.r[s]===id?undefined:id}else state.c[id]=!state.c[id];
  render();
});
document.querySelector('.cur').addEventListener('click',function(e){var b=e.target.closest('[data-cur]');if(!b)return;state.cur=b.dataset.cur;[].forEach.call(this.children,function(x){x.setAttribute('aria-pressed',x===b)});render()});
$('estReset').addEventListener('click',function(){state={r:{},c:{},q:{},term:'1',cur:state.cur};render();[].forEach.call(document.querySelectorAll('#presets button'),function(x){x.setAttribute('aria-pressed','false')});say('Cleared')});
$('payBtn').addEventListener('click',function(){var a=this.dataset.amt;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(a.replace(/[^\d]/g,'')).catch(function(){});say('Deposit '+a+' — amount copied for the payment page')});
var pr=$('presets');pr.innerHTML='<span class="caps">Start from</span>'+PRE.map(function(p,i){return '<button type="button" data-p="'+i+'" aria-pressed="false">'+p[0]+'</button>'}).join('');
pr.addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(!b)return;var p=PRE[+b.dataset.p][1];state={r:{},c:{},q:{},term:state.term,cur:state.cur};
  if(p.id)state.r.id=p.id;if(p.web)state.r.web=p.web;if(p.social)state.r.social=p.social;(p.add||[]).forEach(function(a){state.c[a]=true});if(p.vid)Object.keys(p.vid).forEach(function(k){state.c[k]=true;state.q[k]=p.vid[k]});
  [].forEach.call(pr.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',x===b)});render();say(PRE[+b.dataset.p][0]+' — adjust anything you like')});
try{var sv=JSON.parse(localStorage.getItem('ta-scope')||'null');if(sv&&sv.r)state=sv}catch(e){}
[].forEach.call(document.querySelectorAll('.cur button'),function(x){x.setAttribute('aria-pressed',x.dataset.cur===state.cur)});
window.__taScope=function(){return {state:{r:state.r,c:state.c,q:state.q,term:state.term},currency:state.cur}};
render();
})();

/* ---------- contact form: handled by components/forms/ContactForm.tsx (saved through the API) ---------- */

/* ---------- reels: the videos play in the page ---------- */
var strip=$('strip');
if(strip){
  /* Files live in assets/video as reel-01.mp4 … with a poster reel-01.jpg. Add a row here to add a reel. */
  var RL=[['01','Sakura Gardens','I find my calm · launch film'],['02','Avara Resorts','Some places · brand film'],['03','Beauty is an opinion','Mood film'],['04','Joy Café','F&B reel'],['05','Mosavali','Drink · product reel']];
  var SND='<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',MUTE='<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9l5 6M21 9l-5 6"/></svg>';
  strip.innerHTML=RL.map(function(r){return '<figure class="phone" style="margin:0"><div class="screen"><video muted loop playsinline preload="none" poster="/assets/video/reel-'+r[0]+'.jpg" aria-label="'+esc(r[1]+' — '+r[2])+'"><source src="/assets/video/reel-'+r[0]+'.mp4" type="video/mp4"></video><button class="snd" type="button" aria-label="Sound on">'+MUTE+'</button><div class="rtag"><b>'+esc(r[1])+'</b><span class="caps">'+esc(r[2])+'</span></div></div><figcaption class="pc caps"><span>'+r[0]+' / '+pad(RL.length)+'</span><span>'+esc(r[1])+'</span></figcaption></figure>'}).join('');
  var vids=[].slice.call(strip.querySelectorAll('video'));
  vids.forEach(function(v){var sc=v.parentNode,b=sc.querySelector('.snd');v.muted=true;
    b.addEventListener('click',function(){var on=v.muted;vids.forEach(function(o){if(o!==v&&!o.muted){o.muted=true;o.parentNode.querySelector('.snd').innerHTML=MUTE;o.parentNode.classList.remove('loud')}});v.muted=!on;b.innerHTML=on?SND:MUTE;b.setAttribute('aria-label',on?'Sound off':'Sound on');sc.classList.toggle('loud',on);if(on)v.play().catch(function(){})});
    v.addEventListener('click',function(){if(v.paused)v.play().catch(function(){});else v.pause()});
  });
  if('IntersectionObserver' in window&&!reduce){var vo=new IntersectionObserver(function(es){es.forEach(function(en){var v=en.target;if(en.isIntersecting){if(v.preload==='none')v.preload='auto';v.play().catch(function(){})}else v.pause()})},{threshold:.35});vids.forEach(function(v){vo.observe(v)})}
  else vids.forEach(function(v){v.controls=true});
  function stepR(dir){var w=strip.querySelector('.phone').getBoundingClientRect().width+24;strip.scrollBy({left:dir*w*2,behavior:'smooth'})}
  if($('rlPrev'))$('rlPrev').addEventListener('click',function(){stepR(-1)});if($('rlNext'))$('rlNext').addEventListener('click',function(){stepR(1)});
}

/* ---------- brand guidelines book ---------- */
var brandsEl=$('brands');
if(brandsEl){
  var M=CDN+'project_modules/1400/';
  var GB=[
   {k:'anira',name:'Anira',sub:'Restaurant · Dubai',sw:'#2B3A55',pages:[['The mark',M+'94f17e182132319.6527f8c827c52.jpg'],['Brand story',M+'a8eb15182132319.6527f8c82f351.jpg'],['Colour',M+'9a979c182132319.6527f8c828b10.jpg'],['Colour in use',M+'da9c89182132319.6527f8c830242.jpg'],['Pattern',M+'4e5200182132319.6527f8c832f61.jpg']]},
   {k:'silk',name:'Silk Studio',sub:'Creative agency · GCC',sw:'#9BD13A',pages:[['The mark',M+'fd5b38182155533.6528482c5b118.jpg'],['Variations',M+'4c4ac7182155533.6528482c5c319.jpg'],['Lock-ups',M+'2490a2182155533.6528482c653e2.jpg'],['Monochrome',M+'ddfb9b182155533.6528482c6628a.jpg'],['The icon',M+'bc3e8d182155533.6528482c5fe9d.jpg']]},
   {k:'velino',name:'Velino',sub:'Fashion label',sw:'#6E1420',pages:[['The mark',cover(BY.velino)],['On colour',M+'0701a7205197431.66b65002ead23.jpg'],['Wordmark',M+'5e84ec205197431.66b65002eb3e7.jpg']]},
   {k:'fanatk',name:'Fanatk',sub:'Chocolate · packaging',sw:'#5A3463',pages:[['Cover',cover(BY.fanatk)],['Logo system',M+'7d0155182161079.65286102b96f5.jpg'],['On colour',M+'2de59c182161079.65286102c1d86.jpg'],['Brand world',inner(BY.fanatk)]]},
   {k:'avara',name:'Avara',sub:'Resorts & sanctuaries',sw:'#3E4A2E',pages:[['Cover',W+'avara/01.webp'],['A ritual of renewal',W+'avara/02.webp'],['Community',W+'avara/03.webp'],['Experiences',W+'avara/04.webp'],['The collection',W+'avara/05.webp'],['Legends',W+'avara/06.webp'],['Resorts',W+'avara/07.webp'],['Vicus',W+'avara/09.webp']]}
  ];
  var toc=$('toc'),pw=$('pagewrap'),gb=0,pg=0;
  brandsEl.innerHTML=GB.map(function(b,i){return '<button type="button" role="tab" id="gb-'+b.k+'" aria-pressed="'+(i?'false':'true')+'" style="--sw:'+b.sw+'"><i></i>'+esc(b.name)+'</button>'}).join('');
  var palette=function(img,cb){try{var c=document.createElement('canvas'),w=80,h=Math.max(1,Math.round(80*img.naturalHeight/img.naturalWidth));c.width=w;c.height=h;var x=c.getContext('2d');x.drawImage(img,0,0,w,h);var d=x.getImageData(0,0,w,h).data,bins={};
    for(var i=0;i<d.length;i+=4){var r=d[i]>>4,g=d[i+1]>>4,b=d[i+2]>>4,k=r+','+g+','+b;bins[k]=(bins[k]||0)+1}
    var arr=Object.keys(bins).map(function(k){var p=k.split(',').map(Number);return {c:p.map(function(v){return v*16+8}),n:bins[k]}}).sort(function(a,b){return b.n-a.n});
    var out=[];arr.forEach(function(e){if(out.length>=6)return;if(out.every(function(o){return Math.abs(o[0]-e.c[0])+Math.abs(o[1]-e.c[1])+Math.abs(o[2]-e.c[2])>70}))out.push(e.c)});cb(out)}catch(err){cb(null)}};
  var hexA=function(c){return '#'+c.map(function(v){return Math.min(255,v).toString(16).padStart(2,'0')}).join('').toUpperCase()};
  var renderToc=function(){var b=GB[gb];toc.innerHTML='<div class="bn"><b>'+esc(b.name)+'</b><span class="caps">'+esc(b.sub)+'</span></div><div class="chap" role="tablist">'+b.pages.map(function(p,i){return '<button type="button" role="tab" aria-selected="'+(i===pg?'true':'false')+'" data-i="'+i+'"><span class="caps">'+pad(i+1)+'</span><b>'+esc(p[0])+'</b></button>'}).join('')+'</div><div class="sws"><span class="caps" style="color:var(--mute)">Palette · sampled live</span><div class="row2" id="sws"></div></div>'};
  var showPage=function(i){var b=GB[gb];pg=(i+b.pages.length)%b.pages.length;[].forEach.call(toc.querySelectorAll('[data-i]'),function(x,j){x.setAttribute('aria-selected',j===pg?'true':'false')});
    $('folioL').textContent=b.name+' · '+b.pages[pg][0];$('folioR').textContent=pad(pg+1)+' / '+pad(b.pages.length);
    var old=[].slice.call(pw.querySelectorAll('img')),msg=pw.querySelector('.noimg-msg');if(msg)msg.remove();
    var im2=new Image();if(/^https?:/.test(b.pages[pg][1]))im2.crossOrigin='anonymous';im2.referrerPolicy='no-referrer';im2.alt=b.name+' — '+b.pages[pg][0];im2.className='enter';
    im2.onload=function(){requestAnimationFrame(function(){im2.className='shown'});old.forEach(function(o){setTimeout(function(){o.remove()},1000)});palette(im2,function(cols){var el=$('sws');if(!el)return;if(!cols){el.parentNode.style.display='none';return}el.parentNode.style.display='';el.innerHTML=cols.map(function(c){var h=hexA(c);return '<i style="background:'+h+'" data-hex="'+h+'" title="'+h+'"></i>'}).join('')})};
    im2.onerror=function(){old.forEach(function(o){o.remove()});var m=document.createElement('div');m.className='noimg-msg';m.textContent=b.name+' · '+b.pages[pg][0];pw.appendChild(m)};
    im2.src=b.pages[pg][1];pw.insertBefore(im2,pw.querySelector('.nav2'))};
  var showBrand=function(i){gb=i;pg=0;[].forEach.call(brandsEl.children,function(x,j){x.setAttribute('aria-pressed',j===i?'true':'false')});renderToc();showPage(0)};
  toc.addEventListener('click',function(e){var t=e.target.closest('[data-i]');if(t)showPage(+t.dataset.i);var s=e.target.closest('#sws i');if(!s)return;var hx=s.dataset.hex;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(hx).then(function(){say(hx+' copied')},function(){say(hx)});else say(hx)});
  brandsEl.addEventListener('click',function(e){var t=e.target.closest('button');if(t)showBrand([].indexOf.call(brandsEl.children,t))});
  $('pgPrev').addEventListener('click',function(){showPage(pg-1)});$('pgNext').addEventListener('click',function(){showPage(pg+1)});
  showBrand(0);
}

/* ---------- PLAY: brief spinner ---------- */
(function(){
var reels=$('briefReels');if(!reels)return;
var R=[['For','a <em>real estate</em> launch','a <em>caviar</em> house','a desert <em>retreat</em>','a <em>café</em> brand','a <em>fashion</em> label','a <em>wellness</em> studio','a <em>tech</em> startup','a <em>chocolate</em> brand'],
       ['Mood','<em>quiet</em> luxury','desert <em>warmth</em>','bold &amp; <em>graphic</em>','editorial <em>calm</em>','Arabic <em>calligraphy</em>','<em>copper</em> &amp; stone','modern <em>heritage</em>','night <em>gold</em>'],
       ['Make','a <em>logo</em> system','a launch <em>campaign</em>','a sales <em>brochure</em>','a social <em>grid</em>','a <em>guidelines</em> book','<em>packaging</em>','a road <em>billboard</em>','a landing <em>page</em>']];
var N=0,spinning=false,picks=[0,0,0];
reels.innerHTML=R.map(function(r){var items=r.slice(1);var list='';for(var k=0;k<4;k++)list+=items.map(function(t){return '<li>'+t+'</li>'}).join('');return '<div class="reel"><span class="cap2">'+r[0]+'</span><ul>'+list+'</ul></div>'}).join('');
var uls=[].slice.call(reels.querySelectorAll('ul'));
function h(){return reels.querySelector('li').getBoundingClientRect().height}
uls.forEach(function(u){u.style.transform='translateY(0)'});
function strip2(s){var d=document.createElement('div');d.innerHTML=s;return d.textContent}
$('spinBtn').addEventListener('click',function(){if(spinning)return;spinning=true;var H=h();
  uls.forEach(function(u,i){var n=R[i].length-1,pick=Math.floor(Math.random()*n);picks[i]=pick;var idx=n*2+pick;u.style.transition='none';u.style.transform='translateY(0)';u.offsetHeight;u.style.transition='transform '+(1.4+i*.45)+'s cubic-bezier(.15,.9,.2,1)';u.style.transform='translateY('+(-idx*H)+'px)'});
  setTimeout(function(){spinning=false;N++;$('briefN').textContent=N;var a=R[0][picks[0]+1],b=R[1][picks[1]+1],c=R[2][picks[2]+1];
    var sentence=strip2(c)+' with '+strip2(b)+', for '+strip2(a)+'.';
    $('briefOut').innerHTML='“'+c.charAt(0).toUpperCase()+c.slice(1)+' with '+b+', for '+a+'.” <br><a href="mailto:talalatallah10@gmail.com?subject='+encodeURIComponent('Brief: '+sentence)+'">Send this brief to Talal ↗</a>'},2500);
});
})();

/* ---------- PLAY: do & don't quiz ---------- */
(function(){
var tilesEl=$('tiles');if(!tilesEl)return;
var WRONG=[
 ['Never stretch the mark','transform="matrix(1.45 0 0 .78 -235 116)"',''],
 ['Never rotate the mark','transform="rotate(24 530 530)"',''],
 ['Never change the colour','','fill="#3A6FD8"'],
 ['Never outline the mark','','fill="none" stroke="currentColor" stroke-width="22"'],
 ['Never add effects','filter="url(#qShadow)"',''],
 ['Never rebuild the pieces','','','swap'],
 ['Keep the clear space','transform="matrix(1.9 0 0 1.9 -477 -477)"','']
];
var round=0,score=0,locked=false;
function svgFor(t,attrs,fill,mode){var base='<svg viewBox="-80 -80 1220 1220" aria-hidden="true"><defs><filter id="qShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="40" dy="50" stdDeviation="30" flood-color="#000" flood-opacity=".55"/></filter></defs><g '+(attrs||'')+' fill="currentColor" '+(fill||'')+'>';
  if(mode==='swap')return base+'<path d="'+SUN+'" transform="rotate(180 530 304)"/><path d="'+ROOF+'"/><path d="'+DOOR+'" transform="translate(0 -760)"/></g></svg>';
  return base+'<path d="'+SUN+'"/><path d="'+ROOF+'"/><path d="'+DOOR+'"/></g></svg>'}
function newRound(){locked=false;round++;$('quizRound').textContent=Math.min(round,5);
  if(round>5){tilesEl.innerHTML='';$('qq').innerHTML=score>=4?'You read guidelines like a <em>designer</em>.':'Every brand has <em>rules</em>. Now you know four.';$('quizMsg').textContent='Score '+score+' / 5.';$('quizNext').textContent='Play again';return}
  $('quizNext').textContent='Next round';
  $('qq').innerHTML='Round '+round+': which one follows the <em>guidelines</em>?';
  var pool=WRONG.slice().sort(function(){return Math.random()-.5}).slice(0,3),correct=Math.floor(Math.random()*4),k=0,html='';
  for(var i=0;i<4;i++){if(i===correct)html+='<button class="tile" type="button" data-ok="1" style="color:var(--copper)">'+svgFor()+'<span class="tag">Correct use</span></button>';else{var w=pool[k++];html+='<button class="tile" type="button" data-ok="0" style="color:var(--copper)">'+svgFor(null,w[1],w[2],w[3])+'<span class="tag">'+w[0]+'</span></button>'}}
  tilesEl.innerHTML=html}
tilesEl.addEventListener('click',function(e){var t=e.target.closest('.tile');if(!t||locked)return;locked=true;var ok=t.dataset.ok==='1';
  if(ok){score++;t.classList.add('ok');$('quizMsg').textContent='Right. The mark stays exactly as drawn.'}else{t.classList.add('bad');tilesEl.querySelector('[data-ok="1"]').classList.add('ok');$('quizMsg').textContent=t.querySelector('.tag').textContent+'.'}
  $('quizScore').textContent=score;setTimeout(function(){if(round<=5)newRound()},1700)});
$('quizNext').addEventListener('click',function(){if(round>5){round=0;score=0;$('quizScore').textContent=0}newRound()});
newRound();
})();

/* ---------- PLAY: cut on the beat ---------- */
(function(){
var area=$('cutArea');if(!area)return;
var tl=$('tl'),head=$('head'),fb=$('cutFb'),vis=watch(area);
var B=[.12,.29,.45,.6,.76,.9],D=4200,run=false,t0=0,pass=0,score=0,hits=[],marks=[];
var beats=B.map(function(b){var d=document.createElement('span');d.className='beat';d.style.left=(b*100)+'%';d.innerHTML='<i></i>';tl.appendChild(d);return d});
function clearPass(){hits=B.map(function(){return false});beats.forEach(function(b){b.classList.remove('hit','miss')});marks.forEach(function(m){m.remove()});marks=[]}
function start(){run=true;pass=1;score=0;t0=performance.now();clearPass();$('cutPass').textContent=1;$('cutScore').textContent=0;fb.textContent='Cut!';$('cutStart').textContent='Restart';$('cutMsg').textContent='Three passes. Perfect cuts score double.'}
function cut(){if(!run){start();return}var x=((performance.now()-t0)%D)/D,best=-1,bd=1;B.forEach(function(b,i){var d=Math.abs(b-x);if(!hits[i]&&d<bd){bd=d;best=i}});var ms=bd*D,m=document.createElement('span');m.className='cutm';m.style.left=(x*100)+'%';tl.appendChild(m);marks.push(m);
  if(best>=0&&ms<70){hits[best]=true;beats[best].classList.add('hit');score+=2;fb.textContent='Perfect cut.'}else if(best>=0&&ms<160){hits[best]=true;beats[best].classList.add('hit');score+=1;fb.textContent=(x<B[best]?'A frame early.':'A frame late.')}else{m.classList.add('bad');score=Math.max(0,score-1);fb.textContent='Off the beat.'}
  $('cutScore').textContent=score}
area.addEventListener('pointerdown',function(e){if(e.target.closest('#cutStart'))return;cut()});
$('cutStart').addEventListener('click',function(e){e.stopPropagation();start()});
addEventListener('keydown',function(e){if(e.code!=='Space'||!vis.on||!run)return;var t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.closest&&t.closest('button,a,[role=button]')))return;var r=area.getBoundingClientRect();if(r.top>innerHeight||r.bottom<0)return;e.preventDefault();cut()});
(function loop(){if(vis.on&&run){var el=performance.now()-t0,x=(el%D)/D,p=Math.floor(el/D)+1;head.style.left=(x*100)+'%';
  if(p!==pass){beats.forEach(function(b,i){if(!hits[i])b.classList.add('miss')});pass=p;if(pass>3){run=false;var max=B.length*3*2;$('cutMsg').textContent='Final score '+score+' of '+max+'.';fb.textContent=score>=max*.75?'That edit is ready to post.':score>=max*.4?'Good rhythm. One more take?':'Every editor needs a second take.';head.style.left='0%';$('cutStart').textContent='Play again'}else{setTimeout(clearPass,180);$('cutPass').textContent=pass}}}
  requestAnimationFrame(loop)})();
})();

/* ---------- PLAY: pen tool ---------- */
(function(){
var pen=$('pen'),idea=$('idea');if(!pen||!idea)return;
var A=[],C=[],drag=null,target=null,auto=0,vis=watch(idea);
function layout(){var w=idea.clientWidth,h=idea.clientHeight;A=[[w*.14,h*.78],[w*.5,h*.62],[w*.86,h*.2]];C=[[w*.36,h*.38],[w*.66,h*.9]];target=null;draw()}
function draw(){var a0=A[0],a1=A[1],a2=A[2],c1=C[0],c2=C[1],m1=[2*a1[0]-c2[0],2*a1[1]-c2[1]];
  $('curve').setAttribute('d','M'+a0[0]+' '+a0[1]+' C'+c1[0]+' '+c1[1]+' '+m1[0]+' '+m1[1]+' '+a1[0]+' '+a1[1]+' S'+c2[0]+' '+c2[1]+' '+a2[0]+' '+a2[1]);
  function L(id,p,q){var l=$(id);l.setAttribute('x1',p[0]);l.setAttribute('y1',p[1]);l.setAttribute('x2',q[0]);l.setAttribute('y2',q[1])}
  L('h1a',a0,c1);L('h1b',a1,m1);L('h2a',a1,c2);L('h2b',a2,c2);
  $('c1').setAttribute('cx',c1[0]);$('c1').setAttribute('cy',c1[1]);$('c2').setAttribute('cx',c2[0]);$('c2').setAttribute('cy',c2[1]);
  ['a0','a1','a2'].forEach(function(id,i){$(id).setAttribute('x',A[i][0]-4);$(id).setAttribute('y',A[i][1]-4)});
  $('arrow').setAttribute('transform','translate('+(c2[0]+6)+' '+(c2[1]+6)+')')}
layout();addEventListener('resize',layout);
idea.addEventListener('pointermove',function(e){var p=local(e,idea);if(drag){drag[0]=p[0];drag[1]=p[1];draw();return}target=p});
idea.addEventListener('pointerleave',function(){target=null});
pen.addEventListener('pointerdown',function(e){var map={a0:A[0],a1:A[1],a2:A[2],c1:C[0],c2:C[1]};if(map[e.target.id]){drag=map[e.target.id];pen.setPointerCapture(e.pointerId);e.preventDefault()}});
addEventListener('pointerup',function(){drag=null});
(function loop(){if(vis.on&&!drag){var w=idea.clientWidth,h=idea.clientHeight,tx,ty;if(target){tx=target[0];ty=target[1]}else{auto+=.008;tx=w*(.66+.12*Math.sin(auto));ty=h*(.72+.2*Math.cos(auto*1.3))}C[1][0]+=(tx-C[1][0])*.08;C[1][1]+=(ty-C[1][1])*.08;draw()}requestAnimationFrame(loop)})();
})();

/* ---------- PLAY: kerning with the real TALAL·AT letters ---------- */
(function(){
var svg=$('kernSvg');if(!svg)return;var NS='http://www.w3.org/2000/svg';
var guide=document.createElementNS(NS,'line');guide.setAttribute('class','guide');guide.setAttribute('x1','-60');guide.setAttribute('x2','2614');guide.setAttribute('y1','407');guide.setAttribute('y2','407');svg.appendChild(guide);
var G=LETTERS.map(function(d){var p=document.createElementNS(NS,'path');p.setAttribute('d',d);p.setAttribute('fill-rule','evenodd');p.setAttribute('class','lt');svg.appendChild(p);return p});
var dx=G.map(function(){return 0}),done=false;
var score=$('kernScore'),msg=$('kernMsg');
function apply(anim){G.forEach(function(g,i){g.style.transition=anim?'transform 1s cubic-bezier(.19,1,.22,1), fill .3s':'fill .3s';g.style.transform='translateX('+dx[i].toFixed(1)+'px)'});rate()}
function rate(){var m=dx.reduce(function(s,v){return s+Math.abs(v)},0)/dx.length,sc=Math.max(0,Math.round(100-m/1.6));score.textContent=sc;
  if(sc>=98&&!done){done=true;msg.textContent='Perfect. That is exactly how TALAL·AT is spaced.'}else if(sc<98){done=false;msg.textContent=sc>85?'Almost. Trust your eye.':sc>60?'Getting there. Watch the space between A and T.':'The logo lost its spacing. Can you fix it?'}}
function shuffle(){dx=G.map(function(g,i){var s=(i%2?1:-1)*(Math.random()<.5?1:-1);return s*(70+Math.random()*150)});done=false;apply(true)}
var drag=-1,sx=0,sd=0;
G.forEach(function(g,i){g.addEventListener('pointerdown',function(e){drag=i;sx=e.clientX;sd=dx[i];g.classList.add('drag');g.setPointerCapture(e.pointerId);g.style.transition='fill .3s';e.preventDefault()})});
svg.addEventListener('pointermove',function(e){if(drag<0)return;var k=2554/svg.getBoundingClientRect().width;dx[drag]=sd+(e.clientX-sx)*k;G[drag].style.transform='translateX('+dx[drag].toFixed(1)+'px)';rate()});
function up(){if(drag<0)return;if(Math.abs(dx[drag])<16){dx[drag]=0;apply(true)}G[drag].classList.remove('drag');drag=-1;rate()}
svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);
$('kernShuffle').addEventListener('click',shuffle);
$('kernShow').addEventListener('click',function(){dx=dx.map(function(){return 0});apply(true)});
shuffle();
})();

/* ---------- PLAY: eyedropper, match the copper ---------- */
(function(){
var cv=$('matchCv');if(!cv)return;var ctx=cv.getContext('2d'),eye=$('eye'),area=cv.parentNode;
var T=[183,117,54];
function hsl2rgb(h,s,l){var a=s*Math.min(l,1-l);function f(n){var k=(n+h/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))))}return [f(0),f(8),f(4)]}
function lab(c){var r=c.map(function(v){v/=255;return v>.04045?Math.pow((v+.055)/1.055,2.4):v/12.92});var x=(r[0]*.4124+r[1]*.3576+r[2]*.1805)/.95047,y=r[0]*.2126+r[1]*.7152+r[2]*.0722,z=(r[0]*.0193+r[1]*.1192+r[2]*.9505)/1.08883;function f(t){return t>.008856?Math.cbrt(t):7.787*t+16/116}return [116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))]}
function de(a,b){var p=lab(a),q=lab(b);return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])}
function at(x,y){var w=cv.clientWidth,h=cv.clientHeight;return hsl2rgb(360*x/w,.58,.86-.72*y/h)}
function hex(c){return '#'+c.map(function(v){return v.toString(16).padStart(2,'0')}).join('').toUpperCase()}
function draw(){var w=area.clientWidth,h=area.clientHeight;cv.width=Math.max(2,Math.round(w/2));cv.height=Math.max(2,Math.round(h/2));var d=ctx.createImageData(cv.width,cv.height);for(var y=0;y<cv.height;y++)for(var x=0;x<cv.width;x++){var c=hsl2rgb(360*x/cv.width,.58,.86-.72*y/cv.height),k=(y*cv.width+x)*4;d.data[k]=c[0];d.data[k+1]=c[1];d.data[k+2]=c[2];d.data[k+3]=255}ctx.putImageData(d,0,0)}
draw();var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(draw,200)});
function move(e){var p=local(e,area);eye.style.left=p[0]+'px';eye.style.top=p[1]+'px';eye.style.background=hex(at(p[0],p[1]));eye.classList.add('on')}
area.addEventListener('pointermove',move);area.addEventListener('pointerleave',function(){eye.classList.remove('on')});
area.addEventListener('click',function(e){move(e);var p=local(e,area),c=at(p[0],p[1]),d=de(c,T),sc=Math.max(0,Math.round(100-d*2.2));
  $('pickSw').style.background=hex(c);$('pickHex').textContent=hex(c);$('matchScore').textContent=sc;
  $('matchMsg').textContent=sc>=95?'That is the one. #B77536, the TALAL·AT copper.':sc>=80?'Very close. A touch '+(lab(c)[0]>lab(T)[0]?'darker.':'lighter.'):sc>=50?'Warm, but not copper yet.':'Keep looking. Copper lives between orange and brown.'});
})();

/* ---------- PLAY: magnetic grid, stamp the mark ---------- */
(function(){
var cv=$('gridCv');if(!cv)return;var ctx=cv.getContext('2d'),area=cv.parentNode,vis=watch(area);
var icon=[new Path2D(SUN),new Path2D(ROOF),new Path2D(DOOR)];
var dots=[],S=30,P2=null,marks=[],dpr=Math.min(2,devicePixelRatio||1),auto=0;
function build(){var w=area.clientWidth,h=area.clientHeight;cv.width=w*dpr;cv.height=h*dpr;dots=[];for(var y=S/2;y<h;y+=S)for(var x=S/2;x<w;x+=S)dots.push({x:x,y:y,ox:x,oy:y,vx:0,vy:0})}
build();addEventListener('resize',build);
area.addEventListener('pointermove',function(e){var p=local(e,area);P2=[p[0],p[1]]});
area.addEventListener('pointerleave',function(){P2=null});
area.addEventListener('click',function(e){var p=local(e,area),gx=Math.round((p[0]-S/2)/S)*S+S/2,gy=Math.round((p[1]-S/2)/S)*S+S/2;marks.push({x:gx,y:gy,t:0,r:(Math.random()<.5?-1:1)*Math.PI/12*Math.floor(Math.random()*3)});if(marks.length>40)marks.shift();$('gridCount').textContent=marks.length;$('gridMsg').textContent=marks.length>=12?'A pattern. You just designed a brand texture.':marks.length>=4?'Repetition builds recognition.':'Everything snaps to the grid. Even you.'});
$('gridClear').addEventListener('click',function(){marks=[];$('gridCount').textContent=0});
(function loop(){if(vis.on){var w=area.clientWidth,h=area.clientHeight,col=css('--line2'),cop=css('--copper'),pt=P2;
  if(!pt&&!fine){auto+=.01;pt=[w*(.5+.35*Math.sin(auto)),h*(.5+.3*Math.cos(auto*1.4))]}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.fillStyle=col;
  for(var i=0;i<dots.length;i++){var d=dots[i],fx2=0,fy2=0;if(pt){var ddx=d.x-pt[0],ddy=d.y-pt[1],dist=Math.hypot(ddx,ddy),R=130;if(dist<R&&dist>0.1){var f=(1-dist/R)*7;fx2=ddx/dist*f;fy2=ddy/dist*f}}
    d.vx=(d.vx+fx2+(d.ox-d.x)*.08)*.82;d.vy=(d.vy+fy2+(d.oy-d.y)*.08)*.82;d.x+=d.vx;d.y+=d.vy;
    var near=pt?Math.max(0,1-Math.hypot(d.x-pt[0],d.y-pt[1])/130):0;ctx.fillStyle=near>.05?cop:col;ctx.beginPath();ctx.arc(d.x,d.y,1.2+near*1.8,0,6.283);ctx.fill()}
  ctx.fillStyle=cop;marks.forEach(function(m){m.t=Math.min(1,m.t+.06);var e=1-Math.pow(1-m.t,3),s=(S*1.15/1060)*e;ctx.save();ctx.translate(m.x,m.y);ctx.rotate(m.r*(1-e));ctx.scale(s,s);ctx.translate(-530,-530);icon.forEach(function(p){ctx.fill(p)});ctx.restore()})}
  requestAnimationFrame(loop)})();
})();

/* ---------- PLAY: build the mark ---------- */
(function(){
var area=document.querySelector('#build .area');if(!area)return;var vis=watch(area),pct=$('buildPct'),msg=$('buildMsg');
var pieces=[[$('bSun'),-260,-420,-75,.7],[$('bRoof'),430,260,40,.85],[$('bDoor'),-460,330,-140,1.4]];
var f=0,target=0,ptr=null;
area.addEventListener('pointermove',function(e){var p=local(e,area);ptr=[p[0],p[1],p[2]]});
area.addEventListener('pointerleave',function(){ptr=null});
(function loop(){if(vis.on){var r=area.getBoundingClientRect();
  if(ptr){var d=Math.hypot(ptr[0]-r.width/2,ptr[1]-r.height/2),R=Math.min(r.width,r.height)*.75;target=Math.max(0,Math.min(1,1-(d-30)/R))}
  else if(!fine){var c=r.top+r.height/2;target=Math.max(0,Math.min(1,1-Math.abs(c-innerHeight/2)/(innerHeight*.45)))}
  else target=0;
  f+=(target-f)*.08;var e=f*f*(3-2*f);
  pieces.forEach(function(p){var k=1-e;p[0].style.transform='translate('+(p[1]*k).toFixed(1)+'px,'+(p[2]*k).toFixed(1)+'px) rotate('+(p[3]*k).toFixed(1)+'deg) scale('+(1+(p[4]-1)*k).toFixed(3)+')';p[0].style.opacity=(.35+.65*e).toFixed(2)});
  var v=Math.round(e*100);pct.textContent=v;msg.textContent=v>=98?'The TALAL·AT mark: a sun, a roof, a door.':v>60?'Almost there. Every piece has its place.':'Three pieces, one mark. Come closer.'}
  requestAnimationFrame(loop)})();
})();

/* ---------- PLAY: weight wave ---------- */
(function(){
var box=$('waveWord');if(!box)return;var area=box.parentNode,vis=watch(area),out=$('waveW');
box.innerHTML=['THINK.','INSPIRE.','DESIGN.'].map(function(w){return '<span class="wd">'+w.split('').map(function(c){return '<span>'+c+'</span>'}).join('')+'</span>'}).join('');
var L=[].slice.call(box.querySelectorAll('.wd>span')),ptr=null,t=0;
area.addEventListener('pointermove',function(e){ptr=[e.clientX,e.clientY]});area.addEventListener('pointerleave',function(){ptr=null});
(function loop(){if(vis.on){t+=.03;var maxW=200,cop=css('--copper');
  L.forEach(function(s,i){var r=s.getBoundingClientRect(),cxx=r.left+r.width/2,cyy=r.top+r.height/2,k;
    if(ptr){var d=Math.hypot((ptr[0]-cxx),(ptr[1]-cyy)*1.6);k=Math.max(0,1-d/260)}else{k=(Math.sin(t-i*.45)+1)/2*.8}
    var w=Math.round(100+800*k);s.style.fontWeight=w;s.style.color=k>.62?cop:'';if(w>maxW)maxW=w});
  out.textContent=maxW}
  requestAnimationFrame(loop)})();
})();

/* ---------- PLAY: sign here ---------- */
(function(){
var cv=$('signCv');if(!cv)return;var ctx=cv.getContext('2d'),area=cv.parentNode,ph=$('signPh'),msg=$('signMsg');
var dpr=Math.min(2,devicePixelRatio||1),strokes=[],curS=null,len=0;
function size(){cv.width=area.clientWidth*dpr;cv.height=area.clientHeight*dpr;redraw()}
function seg(a,b,c){ctx.beginPath();ctx.moveTo((a.x+b.x)/2,(a.y+b.y)/2);ctx.quadraticCurveTo(b.x,b.y,(b.x+c.x)/2,(b.y+c.y)/2);ctx.lineWidth=b.w;ctx.stroke()}
function redraw(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.strokeStyle=css('--copper');ctx.lineCap='round';ctx.lineJoin='round';strokes.forEach(function(s){for(var i=1;i<s.length-1;i++)seg(s[i-1],s[i],s[i+1])})}
redrawers.push(redraw);size();addEventListener('resize',size);
area.addEventListener('pointerdown',function(e){var p=local(e,area);curS=[{x:p[0],y:p[1],w:2.4,t:performance.now()}];strokes.push(curS);area.setPointerCapture(e.pointerId);ph.style.opacity=0});
area.addEventListener('pointermove',function(e){if(!curS)return;var p=local(e,area),l=curS[curS.length-1],now=performance.now(),dist=Math.hypot(p[0]-l.x,p[1]-l.y);if(dist<1.5)return;var v=dist/Math.max(1,now-l.t),w=Math.max(.9,Math.min(4,3.6-v*1.4));w=l.w+(w-l.w)*.35;curS.push({x:p[0],y:p[1],w:w,t:now});len+=dist;ctx.strokeStyle=css('--copper');ctx.lineCap='round';if(curS.length>2)seg(curS[curS.length-3],curS[curS.length-2],curS[curS.length-1])});
function end(){if(!curS)return;curS=null;if(len>260)msg.textContent='Signed. Now send it, and we start.'}
area.addEventListener('pointerup',end);area.addEventListener('pointercancel',end);
$('signClear').addEventListener('click',function(){strokes=[];len=0;redraw();ph.style.opacity=1;msg.textContent='Every project starts with a signature.'});
})();

/* ---------- lead + counters ---------- */
var lead=$('lead'),LW=[];
if(lead){(function wrapW(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w||/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{var s=document.createElement('span');s.className='w';s.textContent=w;f.appendChild(s)}});c.replaceWith(f)}else if(c.nodeType===1)wrapW(c)})})(lead);LW=[].slice.call(lead.querySelectorAll('.w'))}
function fmt(n,k){return k&&n>=1000?(n/1000).toFixed(1).replace('.0','')+'K':String(n)}
if('IntersectionObserver' in window){var co=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,to=+el.dataset.count,k=el.dataset.k,s=el.dataset.suf||'',t0=performance.now();(function st(t){var q=Math.min(1,(t-t0)/1500),v=Math.round(to*(1-Math.pow(1-q,4)));el.textContent=fmt(v,k)+(q===1?s:'');if(q<1)requestAnimationFrame(st)})(t0);co.unobserve(el)})},{threshold:.6});[].forEach.call(document.querySelectorAll('[data-count]'),function(el){co.observe(el)})}

/* ---------- split serif headings ---------- */
[].forEach.call(document.querySelectorAll('.split-h'),function(h){[].slice.call(h.childNodes).forEach(function(n){if(n.nodeType===3&&n.textContent.trim()){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w.trim()){f.appendChild(document.createTextNode(w));return}var o=document.createElement('span');o.className='w';var i=document.createElement('span');i.textContent=w;o.appendChild(i);f.appendChild(o)});n.replaceWith(f)}else if(n.nodeType===1&&n.tagName==='EM'){var o=document.createElement('span');o.className='w';n.replaceWith(o);var i=document.createElement('span');i.appendChild(n);o.appendChild(i)}})});

/* ---------- motion ---------- */
var hasG=!!(window.gsap&&window.ScrollTrigger),lenis=null;
if(hasG)gsap.registerPlugin(ScrollTrigger);
if(window.Lenis&&!reduce&&fine){lenis=new Lenis({lerp:.085});window.__lenis=lenis;if(hasG){lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}else{(function r(t){lenis.raf(t);requestAnimationFrame(r)})(0)}}
[].forEach.call(document.querySelectorAll('a[href^="#"]'),function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href'),t=id==='#top'?0:document.querySelector(id);if(t===null)return;e.preventDefault();if(lenis)lenis.scrollTo(t,{duration:1.6,offset:id==='#top'?0:-62});else(id==='#top'?scrollTo({top:0,behavior:'smooth'}):t.scrollIntoView({behavior:'smooth'}))})});
var toolLinks=[].slice.call(document.querySelectorAll('#tools a')),secs=toolLinks.map(function(a){var id=a.getAttribute('href');return id==='#top'?$('hero'):id.charAt(0)==='#'?document.querySelector(id):null});
function markTool(){var y=innerHeight*.45,on=0;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<y)on=i});toolLinks.forEach(function(a,i){a.classList.toggle('on',i===on)})}
if(toolLinks.length){addEventListener('scroll',markTool,{passive:true});markTool()}
var depthEls=[].slice.call(document.querySelectorAll('[data-depth]')),flt=$('float');
(function raf(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;if(cur)cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)';fx+=(mx-fx)*.12;fy+=(my-fy)*.12;if(flt){flt.style.left=fx+'px';flt.style.top=fy+'px'}
  if(fine&&depthEls.length){var dx=(mx/innerWidth-.5),dy=(my/innerHeight-.5);depthEls.forEach(function(el){var d=+el.dataset.depth;el.style.translate=(dx*d).toFixed(2)+'px '+(dy*d*.6).toFixed(2)+'px'})}requestAnimationFrame(raf)})();

function q(s){return document.querySelector(s)}
function intro(){
  if(!hasG||reduce||!$('portrait'))return;
  var tl=gsap.timeline({defaults:{ease:'expo.out'}});
  tl.from('#portrait',{clipPath:'inset(50% 0 50% 0)',duration:1.5}).from('#portrait img',{scale:1.25,duration:2},'<').from('#rule',{scaleX:0,duration:1.6},'<.2')
    .from('#halfL svg',{clipPath:'inset(0 0 0 100%)',duration:1.6},'<.35').from('#halfR svg',{clipPath:'inset(0 100% 0 0)',duration:1.6},'<.15')
    .from('.frames rect',{strokeDasharray:'0 1000',duration:2.2,ease:'power2.out'},'<')
    .from('.frames .cap,.hero .top-l,.hero-foot>*',{opacity:0,y:16,duration:1.2,stagger:.08,clearProps:'opacity,transform'},'<.4');
}
if(hasG&&!reduce){
  if($('hero')){
    [].forEach.call(document.querySelectorAll('.frames rect'),function(r){r.setAttribute('pathLength','1000');r.style.strokeDasharray='1000 1000'});
    var st={trigger:'#hero',start:'top top',end:'bottom top',scrub:true};
    gsap.to('#halfL',{xPercent:-35,ease:'none',scrollTrigger:st});gsap.to('#halfR',{xPercent:35,ease:'none',scrollTrigger:st});
    gsap.to('#portrait,#d3wrap',{scale:.86,ease:'none',scrollTrigger:st});gsap.to('#rule',{scaleX:1.6,opacity:.2,ease:'none',scrollTrigger:st});
    gsap.to('.frames.l',{y:-120,ease:'none',scrollTrigger:st});gsap.to('.frames.r',{y:120,ease:'none',scrollTrigger:st});
  }
  if($('idea')){
    gsap.from('.think span',{yPercent:60,opacity:0,letterSpacing:'0.5em',duration:1.4,stagger:.06,ease:'expo.out',scrollTrigger:{trigger:'#idea',start:'top 65%'}});
    gsap.from('.intent',{opacity:0,y:30,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'#idea',start:'top 55%'}});
  }
  gsap.utils.toArray('.split-h').forEach(function(h){gsap.from(h.querySelectorAll('.w>span'),{yPercent:110,duration:1.3,stagger:.08,ease:'expo.out',delay:h.closest('.phero')?.35:0,scrollTrigger:{trigger:h,start:'top 85%'}})});
  gsap.utils.toArray('.phero .intro>*,.phero .crumb').forEach(function(el,i){gsap.from(el,{y:30,opacity:0,duration:1.3,delay:.6+i*.1,ease:'expo.out',clearProps:'opacity,transform'})});
  gsap.utils.toArray('.card').forEach(function(c){gsap.fromTo(c.querySelectorAll('.box img'),{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}})});
  gsap.utils.toArray('.stage').forEach(function(s){gsap.from(s,{y:60,opacity:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 90%'},clearProps:'opacity,transform'})});
  gsap.utils.toArray('.reveal').forEach(function(s){gsap.from(s,{y:50,opacity:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 88%'},clearProps:'opacity,transform'})});
  if(track)gsap.matchMedia().add('(min-width: 861px)',function(){function d(){return Math.max(0,track.scrollWidth-innerWidth)}
    gsap.to(track,{x:function(){return -d()},ease:'none',scrollTrigger:{trigger:'#trackWrap',start:'center center',end:function(){return '+='+d()},pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}})});
  if($('poster'))gsap.fromTo('#poster',{rotate:-4,y:60},{rotate:0,y:0,ease:'none',scrollTrigger:{trigger:'#poster',start:'top bottom',end:'center center',scrub:true}});
  if(lead)ScrollTrigger.create({trigger:lead,start:'top 80%',end:'bottom 50%',scrub:true,onUpdate:function(s){var n=Math.round(s.progress*LW.length);LW.forEach(function(w,i){w.style.opacity=i<n?1:.16})}});
  if(q('.endsig'))gsap.fromTo('.endsig .sig',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none',scrollTrigger:{trigger:'.endsig',start:'top 95%',end:'bottom 75%',scrub:true}});
  if(q('.cta'))gsap.utils.toArray('.cta').forEach(function(c){gsap.from(c,{y:60,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 85%'}})});
}else{LW.forEach(function(w){w.style.opacity=1})}

/* ---------- loader (landing only) ---------- */
var loader=$('loader'),bar=$('lbar');
if(loader){
  var finish=function(){if(loader.classList.contains('done'))return;loader.classList.add('done');intro();setTimeout(function(){loader.remove();if(window.ScrollTrigger)ScrollTrigger.refresh()},1300)};
  if(reduce){loader.remove()}else{var t0=performance.now();(function c(t){var qq=Math.min(1,(t-t0)/2000);bar.style.transform='scaleX('+qq+')';if(qq<1)requestAnimationFrame(c);else finish()})(t0);setTimeout(finish,3200)}
}
addEventListener('load',function(){if(window.ScrollTrigger)ScrollTrigger.refresh()});
if(document.readyState==='complete')setTimeout(function(){if(window.ScrollTrigger)ScrollTrigger.refresh()},50);
}
