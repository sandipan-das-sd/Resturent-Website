const menus={
  tasting:[['01','Forest Broth','wild mushroom · smoked chilli · gondhoraj','₹680'],['02','Ember Paneer','saffron · fermented pepper · mustard leaf','₹820'],['03','River & Rice','bhetki · gobindobhog · green mango','₹940'],['04','Charred Pumpkin','panch phoron · cultured cream · seeds','₹720'],['05','Black Garlic Lamb','slow fire · young jackfruit · jus','₹1,180'],['06','Mishti Cloud','date palm jaggery · coconut · sea salt','₹540']],
  lunch:[['01','Kasundi Caesar','baby gem · paneer crisp · mustard','₹520'],['02','Kolkata Kathi','charred chicken · pickled onion · flaky roti','₹640'],['03','Garden Khichdi','seasonal greens · ghee · papad','₹580'],['04','Coastal Curry','market fish · coconut · red rice','₹780']],
  drinks:[['01','Banyan Highball','kokum · gin · soda','₹720'],['02','Golden Hour','saffron · whisky · citrus','₹760'],['03','Monsoon Garden','tulsi · cucumber · tonic','₹420'],['04','House Kombucha','seasonal fruit · tea','₹360']]
};
const list=document.querySelector('#menu-list');
function renderMenu(name){list.innerHTML=menus[name].map((d,i)=>`<article class="dish" style="animation-delay:${i*.05}s"><small>${d[0]}</small><div><h3>${d[1]}</h3><p>${d[2]}</p></div><span>${d[3]}</span></article>`).join('')}
document.querySelectorAll('[data-menu]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-menu]').forEach(b=>b.classList.remove('active'));button.classList.add('active');renderMenu(button.dataset.menu)}));
renderMenu('tasting');
const dialog=document.querySelector('.booking');
document.querySelectorAll('[data-open-booking]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.querySelector('#booking-form').addEventListener('submit',event=>{event.preventDefault();event.target.hidden=true;document.querySelector('.success').hidden=false});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('done'),450));

const header=document.querySelector('.nav');
const progress=document.querySelector('.scroll-progress span');
const sectionLinks=[...document.querySelectorAll('.section-nav a')];
const sectionCount=document.querySelector('.section-count');
const sectionMarker=document.querySelector('.section-line i');
const sections=sectionLinks.map(link=>document.getElementById(link.dataset.section)).filter(Boolean);
let lastScroll=0;
let ticking=false;
function updateScroll(){
  const y=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?y/max:0;
  progress.style.transform=`scaleX(${ratio})`;
  sectionMarker.style.transform=`scaleY(${Math.max(.08,ratio)})`;
  header.classList.toggle('scrolled',y>60);
  header.classList.toggle('nav-hidden',y>lastScroll&&y>180);
  lastScroll=y;
  document.querySelectorAll('.parallax-image').forEach(image=>{
    const parent=image.parentElement;
    const rect=parent.getBoundingClientRect();
    if(rect.bottom>0&&rect.top<innerHeight){
      const amount=(rect.top-innerHeight/2)*-.045;
      image.style.setProperty('--parallax',`${amount}px`);
    }
  });
  let active=0;
  sections.forEach((section,index)=>{if(section.getBoundingClientRect().top<innerHeight*.5)active=index});
  sectionLinks.forEach((link,index)=>link.classList.toggle('active',index===active));
  sectionCount.textContent=String(active+1).padStart(2,'0');
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
updateScroll();

const splitTargets=document.querySelectorAll('.story-heading h2,.section-top h2,.signature-copy h2,.experience-card h2,.visit h2');
splitTargets.forEach(title=>{
  const nodes=[...title.childNodes];
  nodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE&&node.textContent.trim()){const span=document.createElement('span');span.className='line-mask';span.textContent=node.textContent;node.replaceWith(span)}else if(node.nodeName==='EM'){node.classList.add('line-mask')}});
});

document.querySelector('.menu-toggle').addEventListener('click',()=>{
  header.classList.toggle('menu-open');
  document.body.classList.toggle('locked');
});
document.querySelectorAll('.nav nav a').forEach(link=>link.addEventListener('click',()=>{header.classList.remove('menu-open');document.body.classList.remove('locked')}));
