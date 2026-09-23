(function(){
  const nav=document.querySelector('.site-nav');
  if(nav){
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>30),{passive:true});
    const hero=document.querySelector('.internal-hero');
    if(hero){
      const content=hero.querySelector('.hero-content');
      const title=content&&content.querySelector('h1');
      if(content&&title){
        const label=(document.title.split('—')[0]||'Page').trim();
        const servicePages={"Business Operations":1,"IT Solutions":1,"Hiring Services":1,"Payroll Services":1,"SAP Services":1,"Shared Workspaces":1};
        const homeHref=new URL('./index.html',window.location.href).href;
        const servicesHref=new URL('./services.html',window.location.href).href;
        const crumbs=document.createElement('nav');
        crumbs.className='breadcrumbs';
        crumbs.setAttribute('aria-label','Breadcrumb');
        crumbs.innerHTML='<a class="crumb-link" href="'+homeHref+'">Home</a>'+(servicePages[label]?'<span class="sep">/</span><a class="crumb-link" href="'+servicesHref+'">Services</a>':'')+'<span class="sep">/</span><span class="current" aria-current="page">'+label.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))+'</span>';
        hero.appendChild(crumbs);
        crumbs.querySelectorAll('.crumb-link').forEach(link=>link.addEventListener('click',function(e){
          e.preventDefault();
          window.location.assign(this.getAttribute('href'));
        }));
      }
    }
  }
  document.querySelectorAll('.reveal,.service-slide').forEach(el=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.1}).observe(el));
  document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
  const form=document.querySelector('.contact-form');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button');if(b)b.textContent='Signal received ✓';form.reset()});
})();
