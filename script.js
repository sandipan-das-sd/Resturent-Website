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
