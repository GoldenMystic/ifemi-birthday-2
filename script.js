const screens=[...document.querySelectorAll('.screen')];
let current=0;
const music=document.getElementById('birthdayMusic');
const musicButton=document.getElementById('musicButton');
const sparkContainer=document.getElementById('transitionSparkles');
const reasons=[
 ['❤️','Your Beautiful Heart','I love the beautiful person you are inside. Your heart, your kindness, and the way you care make you incredibly special to me.'],
 ['😊','Your Smile','Your smile can turn an ordinary moment into one I want to remember forever.'],
 ['🌸','Your Sweetness','There is something soft and special about the way you make people feel around you.'],
 ['🤍','The Way You Are','I never want you to feel like you have to be anyone else. I love you for being you.'],
 ['✨','Your Dreams','I love seeing you dream, grow and become the person you are meant to be.'],
 ['💕','Simply You','After all the reasons I could list, the simplest one is still the biggest: you are you.']
];
function sparkleBurst(count=20){
  sparkContainer.innerHTML='';
  const icons=['✨','💗','💕','⭐','❤️','🌸'];
  for(let i=0;i<count;i++){
    const s=document.createElement('span');s.className='spark';s.textContent=icons[Math.floor(Math.random()*icons.length)];
    s.style.left='50%';s.style.top='50%';s.style.setProperty('--x',`${(Math.random()-.5)*100}vw`);s.style.setProperty('--y',`${(Math.random()-.5)*100}vh`);s.style.animationDelay=`${Math.random()*.2}s`;sparkContainer.appendChild(s);
  }
  setTimeout(()=>sparkContainer.innerHTML='',1100);
}
function goTo(index){
  if(index<0||index>=screens.length||index===current)return;
  const old=screens[current], next=screens[index];
  old.classList.add('exit-left');
  sparkleBurst(16);
  setTimeout(()=>old.classList.remove('active','exit-left'),120);
  next.classList.add('active');
  current=index;
  if(next.id==='screenTwo') makeCelebration();
  if(next.id==='finalScreen') makeFireworks();
  window.scrollTo(0,0);
}
function tryMusic(){
  if(!music.src)return;
  music.play().then(()=>{musicButton.textContent='🔊';}).catch(()=>{});
}
musicButton.addEventListener('click',()=>{if(music.paused){music.play().then(()=>musicButton.textContent='🔊').catch(()=>{});}else{music.pause();musicButton.textContent='🎵';}});
document.getElementById('tapButton').addEventListener('click',()=>{document.getElementById('giftBox').classList.add('open');sparkleBurst(28);tryMusic();setTimeout(()=>goTo(1),650);});
document.getElementById('continueButton').addEventListener('click',()=>goTo(2));
document.getElementById('letterButton').addEventListener('click',()=>goTo(3));
document.getElementById('memoriesButton').addEventListener('click',()=>goTo(4));
document.getElementById('nextButton').addEventListener('click',()=>goTo(5));
document.getElementById('futureButton').addEventListener('click',()=>goTo(6));
document.getElementById('finalButton').addEventListener('click',()=>goTo(7));
document.getElementById('playAgainButton').addEventListener('click',()=>{document.getElementById('loveFinal').classList.remove('show');goTo(0);});
const wishButton=document.getElementById('wishButton');
wishButton.addEventListener('click',()=>{
  document.querySelectorAll('.flame').forEach(f=>f.style.opacity='0');
  document.getElementById('wishResult').classList.add('show');
  document.getElementById('letterButton').classList.add('show');
  wishButton.textContent='✨ WISH MADE';sparkleBurst(35);
});
let reasonIndex=0;
document.getElementById('reasonButton').addEventListener('click',()=>{
  reasonIndex=(reasonIndex+1)%reasons.length;const [icon,title,text]=reasons[reasonIndex];
  document.getElementById('reasonNumber').textContent=reasonIndex+1;document.getElementById('reasonIcon').textContent=icon;document.getElementById('reasonTitle').textContent=title;document.getElementById('reasonText').textContent=text;
  const card=document.querySelector('.love-card');card.animate([{opacity:.3,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:450});
  if(reasonIndex===reasons.length-1)document.getElementById('loveFinal').classList.add('show');
  sparkleBurst(10);
});
function makeCelebration(){
 const box=document.getElementById('celebration');box.innerHTML='';
 for(let i=0;i<34;i++){const s=document.createElement('span');s.textContent=['✨','💗','💕','🎉','⭐'][Math.floor(Math.random()*5)];s.style.left='50%';s.style.top='48%';s.style.setProperty('--x',`${(Math.random()-.5)*95}vw`);s.style.setProperty('--y',`${(Math.random()-.5)*90}vh`);s.style.animationDelay=`${Math.random()*.45}s`;box.appendChild(s)}
 setTimeout(()=>box.innerHTML='',1700);
}
function makeFireworks(){
 const box=document.getElementById('fireworks');box.innerHTML='';
 for(let k=0;k<4;k++){
   setTimeout(()=>{
     const cx=15+Math.random()*70,cy=18+Math.random()*55;
     for(let i=0;i<18;i++){const f=document.createElement('span');f.className='fire';f.textContent=['✨','💖','⭐','💕'][Math.floor(Math.random()*4)];f.style.left=cx+'%';f.style.top=cy+'%';const a=Math.PI*2*i/18,r=70+Math.random()*110;f.style.setProperty('--x',Math.cos(a)*r+'px');f.style.setProperty('--y',Math.sin(a)*r+'px');box.appendChild(f)}
   },k*500);
 }
 setTimeout(()=>box.innerHTML='',3000);
}
// Swipe navigation on phones, while keeping buttons as the main controls.
let touchX=0,touchY=0;
document.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX;touchY=e.changedTouches[0].screenY},{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX,dy=e.changedTouches[0].screenY-touchY;if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)){if(dx<0)goTo(current+1);else goTo(current-1)}},{passive:true});
