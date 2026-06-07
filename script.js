/* finera. Landing Page — script.js */
(function(){
'use strict';

// Navbar scroll
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar&&(window.scrollY>60?navbar.classList.add('scrolled'):navbar.classList.remove('scrolled'));
},{passive:true});

// Hamburger
const ham=document.getElementById('hamburger');
ham&&ham.addEventListener('click',()=>ham.classList.toggle('is-open'));

// Scroll reveal
function initReveal(){
  const els=document.querySelectorAll('.reveal-up,.reveal-right');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=>obs.observe(el));
}

// GSAP animations
function initGSAP(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){initReveal();return;}
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.timeline({defaults:{ease:'power3.out'}})
    .from('.hero-text',{opacity:0,y:60,duration:1,delay:.2})
    .from('.hero-visual',{opacity:0,x:60,duration:1},'<.4')
    .from('.hero-icon',{opacity:0,scale:.4,stagger:.15,duration:.6},'<.3');

  // Scroll reveals
  document.querySelectorAll('.reveal-up').forEach(el=>{
    const delay=parseFloat(getComputedStyle(el).getPropertyValue('--delay')||'0');
    gsap.from(el,{opacity:0,y:48,duration:.85,delay,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });

  // Stagger groups
  [
    {sel:'.bento-card',trigger:'.bento-grid'},
    {sel:'.booster-card',trigger:'.boosters-grid'},
    {sel:'.step-card',trigger:'.steps-grid'},
    {sel:'.blog-card',trigger:'.blog-grid'}
  ].forEach(({sel,trigger})=>{
    gsap.from(sel,{opacity:0,y:40,stagger:.1,duration:.7,ease:'power3.out',
      scrollTrigger:{trigger,start:'top 85%',once:true}});
  });

  // Ally
  gsap.from('.ally-left',{opacity:0,x:-50,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:'.ally',start:'top 75%',once:true}});
  gsap.from('.ally-right',{opacity:0,x:50,duration:.9,ease:'power3.out',delay:.2,
    scrollTrigger:{trigger:'.ally',start:'top 75%',once:true}});

  // CTA
  gsap.from('.cta-inner',{opacity:0,y:60,duration:1,ease:'power3.out',
    scrollTrigger:{trigger:'.cta-section',start:'top 75%',once:true}});
}

// Marquee pause on hover
document.querySelectorAll('.marquee-track').forEach(track=>{
  track.addEventListener('mouseenter',()=>track.querySelectorAll('.marquee-set').forEach(s=>s.style.animationPlayState='paused'));
  track.addEventListener('mouseleave',()=>track.querySelectorAll('.marquee-set').forEach(s=>s.style.animationPlayState='running'));
});

// Nav dropdown aria
document.querySelectorAll('.dropdown').forEach(d=>{
  const btn=d.querySelector('.nav-btn');
  d.addEventListener('mouseenter',()=>btn&&btn.setAttribute('aria-expanded','true'));
  d.addEventListener('mouseleave',()=>btn&&btn.setAttribute('aria-expanded','false'));
});

document.readyState!=='loading'?initGSAP():document.addEventListener('DOMContentLoaded',initGSAP);
})();
