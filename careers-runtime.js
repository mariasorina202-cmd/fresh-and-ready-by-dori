(async function(){
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function publicJobs(d){
    const jobs=Array.isArray(d?.careers?.jobs)?d.careers.jobs:[];
    return jobs.filter(j=>j && (j.visible===true || j.visible==='true' || j.published===true) && ['open','closing-soon'].includes(String(j.status||'open').trim().toLowerCase()));
  }
  async function getData(){
    const preview=new URLSearchParams(location.search).get('preview')==='1';
    if(preview){
      try{const x=JSON.parse(localStorage.getItem('fr_preview')||'null');if(x)return x}catch(e){}
      try{const x=JSON.parse(sessionStorage.getItem('fr_preview')||'null');if(x)return x}catch(e){}
    }
    try{const r=await fetch('/api/site-data?cb='+Date.now(),{cache:'no-store'});if(r.ok)return await r.json()}catch(e){}
    return window.LIVE_SITE_DATA||window.SITE_DATA||{};
  }
  function render(d){
    const section=document.querySelector('#careers');
    const list=document.querySelector('[data-careers-list]');
    if(!section||!list)return;
    const t=d.text||{};
    const eyebrow=section.querySelector(':scope > .eyebrow'), title=section.querySelector(':scope > h2'), intro=section.querySelector(':scope > .intro');
    if(eyebrow)eyebrow.textContent=t.careersEyebrow||'CAREERS';
    if(title)title.textContent=t.careersTitle||'Build brighter days with us.';
    if(intro)intro.textContent=t.careersIntro||'Explore current opportunities at Fresh & Ready by Dori in Boston.';
    if(d.careers?.enabled===false){section.style.display='none';return;}
    section.style.display='';
    const jobs=publicJobs(d);
    list.innerHTML=jobs.length?jobs.map(j=>`<article class="careerCard"><span class="careerStatus">${esc(String(j.status).toLowerCase()==='closing-soon'?'Closing soon':'Open')}</span><p class="eyebrow">${esc(j.department||'CAREERS')}</p><h3>${esc(j.title||'Vacancy')}</h3><p class="careerMeta">${esc([j.location,j.employmentType,j.hours,j.pay].filter(Boolean).join(' • '))}</p><p>${esc(j.summary||'')}</p><a class="textLink" href="careers.html?job=${encodeURIComponent(j.id||'')}">View role & apply →</a></article>`).join(''):'<p class="muted">No vacancies are currently published.</p>';
  }
  const d=await getData();
  render(d);
  // Reassert after the general CMS runtime finishes; prevents legacy Sections data from hiding Careers.
  setTimeout(()=>render(window.LIVE_SITE_DATA||d),150);
  setTimeout(()=>render(window.LIVE_SITE_DATA||d),700);
})();
