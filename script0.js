
(function(){
  "use strict";
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---- original, hand-drawn icon set (no third-party assets) ---- */
  /* ---- real free animation files, sourced from LottieFiles (each confirmed
     "Free to use under the Lottie Simple License" on its own page) — every
     key below is a distinct file, none repeated anywhere on the page ---- */
  var VIDEOS = {
    operations: 'https://assets-v2.lottiefiles.com/a/bf1ccdd6-1179-11ee-8ece-2fe0cb52a99c/hiSU5kliFC.mp4', // Settings gear — اردشیر حکیمی
    it:         'https://assets-v2.lottiefiles.com/a/4a9280b2-1171-11ee-ae64-f362e58577ca/yNTVc1bFAL.mp4', // Cloud Icon — Shubham
    hiring:     'https://assets-v2.lottiefiles.com/a/2e419f22-116e-11ee-95aa-83d7b5371961/2v0pm99cSc.mp4', // Handshake — Juan Ocampo
    payroll:    'https://assets-v2.lottiefiles.com/a/eeffa1bc-1161-11ee-b043-5b1f16c675c0/EwKjzIt93D.mp4', // Wallet Icon — Md Najmul Islam Shakil
    sap:        'https://assets-v2.lottiefiles.com/a/7eacce8a-1152-11ee-87af-dbfe14a06e31/eaNi8LPBYR.mp4', // Checklist — Petr Slobodzian
    workspace:  'https://assets-v2.lottiefiles.com/a/c36b07ca-1167-11ee-bf57-f7bd58cf486c/PghqFahems.mp4', // Business team — Alexander Rozhkov
    chart:      'https://assets-v2.lottiefiles.com/a/fcb7bf18-1168-11ee-9ef6-9fceb224df1a/kKNekUElO9.mp4', // Growth Chart — Emi
    shield:     'https://assets-v2.lottiefiles.com/a/65021d7e-1165-11ee-a782-630ecc03fb73/EjR3YSj36D.mp4', // Shield Icon
    check:      'https://assets-v2.lottiefiles.com/a/1e7709c0-1177-11ee-9187-eb8aa7fa9a10/RBxOSWCzD0.mp4'  // Check Mark — sulov
  };
  function iconSvg(key){
    var src = VIDEOS[key] || VIDEOS.check;
    return '<video autoplay muted loop playsinline class="icon-video" src="'+src+'"></video>';
  }
  document.querySelectorAll('[data-icon]').forEach(function(el){
    el.innerHTML = iconSvg(el.dataset.icon);
  });

  var diagnostics = [
    { chip:"Payroll chaos", tag:"Payroll Services", icon:"payroll", title:"Payroll that doesn't keep you up at night", body:"Timely, compliant and accurate payroll tailored to your structure — salaries, tax deductions and statutory filings, handled end-to-end." },
    { chip:"IT firefighting", tag:"IT Solutions", icon:"it", title:"Stop reacting. Start running smoothly.", body:"Smart, secure IT services that support your business at every stage — from infrastructure to helpdesk and cloud, built for scale." },
    { chip:"Hiring backlog", tag:"Hiring Services", icon:"hiring", title:"High-performing teams, without the backlog", body:"Full recruitment lifecycle management — sourcing, screening and onboarding aligned with your goals, values and growth path." },
    { chip:"Manual processes", tag:"Business Operations", icon:"operations", title:"We design and run the operations layer", body:"Process design and day-to-day execution — you focus on strategy, we handle the moving parts that keep things running." },
    { chip:"SAP headaches", tag:"SAP Services", icon:"sap", title:"SAP that just works, post-go-live too", body:"We optimise your SAP systems end-to-end, from enhancements to post-go-live support, with flexible staffing when you need experts fast." },
    { chip:"Outgrowing your space", tag:"Shared Workspaces", icon:"workspace", title:"Space that scales with your team", body:"Fully-equipped, flexible workspaces built for productivity — high-speed internet, private zones and smart tools, ready to go." }
  ];
  var chipList = document.getElementById('chipList');
  var diagTag = document.getElementById('diagTag');
  var diagTitle = document.getElementById('diagTitle');
  var diagBody = document.getElementById('diagBody');
  function setDiagnostic(i){
    var d = diagnostics[i];
    diagTag.textContent = d.tag;
    diagTitle.textContent = d.title;
    diagBody.textContent = d.body;
    document.querySelectorAll('.chip').forEach(function(c,ci){ c.classList.toggle('active', ci===i); });
  }
  diagnostics.forEach(function(d,i){
    var btn = document.createElement('button');
    btn.className = 'chip' + (i===0 ? ' active' : '');
    btn.innerHTML = '<span>'+d.chip+'</span><span class="arrow">→</span>';
    btn.addEventListener('click', function(){ setDiagnostic(i); });
    chipList.appendChild(btn);
  });
  setDiagnostic(0);

  var services = [
    { t:"Business Operations", icon:"operations", d:"We design, set up and manage day-to-day operations with precision — you focus on strategy, we handle the moving parts." },
    { t:"IT Solutions", icon:"it", d:"Smart, secure IT services that support your business at every stage — from infrastructure to helpdesk and cloud." },
    { t:"Hiring Services", icon:"hiring", d:"High-performing teams aligned with your goals, values and growth path — full recruitment lifecycle, managed for you." },
    { t:"Payroll Services", icon:"payroll", d:"Timely, compliant and accurate payroll tailored to your structure — salaries, tax deductions and statutory filings, handled." },
    { t:"SAP Services", icon:"sap", d:"We optimise your SAP systems end-to-end, from enhancements to post-go-live support, with flexible SAP staffing on tap." },
    { t:"Shared Workspaces", icon:"workspace", d:"Flexible, fully-equipped spaces built for productivity — high-speed internet, private zones and smart tools, ready to go." }
  ];
  var galleryTrack = document.getElementById('galleryTrack');
  services.forEach(function(s,i){
    var el = document.createElement('div');
    el.className = 'service-slide';
    var wash = i%2===0 ? 'wash-blue' : 'wash-orange';
    el.innerHTML = '<span class="icon-badge '+wash+'" style="margin-bottom:1rem;">'+iconSvg(s.icon)+'</span><span class="idx">0'+(i+1)+' / 06</span><h3>'+s.t+'</h3><p>'+s.d+'</p>';
    galleryTrack.appendChild(el);
  });
  document.getElementById('galPrev').addEventListener('click', function(){ galleryTrack.scrollBy({left:-340, behavior:'smooth'}); });
  document.getElementById('galNext').addEventListener('click', function(){ galleryTrack.scrollBy({left:340, behavior:'smooth'}); });
  (function dragScroll(){
    var isDown = false, startX, scrollLeft;
    galleryTrack.addEventListener('mousedown', function(e){
      isDown = true; galleryTrack.classList.add('dragging');
      startX = e.pageX - galleryTrack.offsetLeft; scrollLeft = galleryTrack.scrollLeft;
    });
    ['mouseleave','mouseup'].forEach(function(evt){
      galleryTrack.addEventListener(evt, function(){ isDown = false; galleryTrack.classList.remove('dragging'); });
    });
    galleryTrack.addEventListener('mousemove', function(e){
      if(!isDown) return;
      e.preventDefault();
      var x = e.pageX - galleryTrack.offsetLeft;
      galleryTrack.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });
  })();

  var whys = [
    { t:"Results-driven execution", icon:"chart", d:"We don't measure success by activity. Every engagement is built to solve a real problem and show up as a measurable outcome." },
    { t:"Seamless integration", icon:"operations", d:"We act as a true extension of your team, fitting into your existing workflows and pace instead of imposing our own." },
    { t:"Multi-function expertise", icon:"sap", d:"Hiring, IT, payroll and SAP under one roof — one aligned team instead of five separate vendors to manage." }
  ];
  var whyTabs = document.getElementById('whyTabs');
  var whyPanels = document.getElementById('whyPanels');
  var indicator = document.createElement('div');
  indicator.className = 'why-tab-indicator';
  whyTabs.appendChild(indicator);
  whys.forEach(function(w,i){
    var tab = document.createElement('button');
    tab.className = 'why-tab' + (i===0 ? ' active' : '');
    tab.textContent = w.t;
    tab.addEventListener('click', function(){ setWhyTab(i); });
    whyTabs.appendChild(tab);

    var panel = document.createElement('div');
    panel.className = 'why-panel' + (i===0 ? ' active' : '');
    var wash = i%2===0 ? 'wash-blue' : 'wash-orange';
    panel.innerHTML = '<span class="icon-badge '+wash+'">'+iconSvg(w.icon)+'</span><div><h3>'+w.t+'</h3><p>'+w.d+'</p></div>';
    whyPanels.appendChild(panel);
  });
  function setWhyTab(i){
    var tabs = whyTabs.querySelectorAll('.why-tab');
    tabs.forEach(function(t,ti){ t.classList.toggle('active', ti===i); });
    whyPanels.querySelectorAll('.why-panel').forEach(function(p,pi){ p.classList.toggle('active', pi===i); });
    var active = tabs[i];
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.transform = 'translateX('+active.offsetLeft+'px)';
  }
  window.addEventListener('load', function(){ setWhyTab(0); });
  window.addEventListener('resize', function(){
    var activeIdx = 0;
    whyTabs.querySelectorAll('.why-tab').forEach(function(t,i){ if(t.classList.contains('active')) activeIdx = i; });
    setWhyTab(activeIdx);
  });

  var stickerCaption = document.getElementById('stickerCaption');
  document.querySelectorAll('.stage-sticker').forEach(function(chip){
    chip.addEventListener('mouseenter', function(){
      stickerCaption.innerHTML = '<strong>'+chip.textContent.trim()+':</strong> '+chip.dataset.desc;
    });
    chip.addEventListener('mouseleave', function(){
      stickerCaption.textContent = "Hover a sticker to see what we handle for you →";
    });
  });

  var terminalData = [
    { text:"$ opslogic status --clients", value:null },
    { text:"> enterprise_clients = ", value:9 },
    { text:"> core_services = ", value:6 },
    { text:"> countries_served = ", value:2 },
    { text:"> tailor_made = ", value:100, suffix:"%" }
  ];
  var terminalLines = document.getElementById('terminalLines');
  var termBuilt = false;
  function buildTerminal(){
    if(termBuilt) return; termBuilt = true;
    terminalData.forEach(function(row, i){
      var line = document.createElement('div');
      line.className = 'terminal-line';
      if(row.value === null){
        line.innerHTML = '<span class="prompt">'+row.text+'</span>';
      } else {
        line.innerHTML = row.text+'<span class="val" data-count="'+row.value+'" data-suffix="'+(row.suffix||'')+'">0</span>';
      }
      terminalLines.appendChild(line);
      setTimeout(function(){
        line.classList.add('shown');
        var val = line.querySelector('.val');
        if(val){
          var target = parseInt(val.dataset.count,10);
          var suffix = val.dataset.suffix || '';
          var start = null;
          function step(ts){
            if(!start) start = ts;
            var p = Math.min((ts-start)/900,1);
            var eased = 1 - Math.pow(1-p,3);
            val.textContent = Math.round(eased*target)+suffix;
            if(p<1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }, i*260);
    });
    var cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    var lastLine = document.createElement('div');
    lastLine.className = 'terminal-line shown';
    lastLine.appendChild(cursor);
    setTimeout(function(){ terminalLines.appendChild(lastLine); }, terminalData.length*260 + 200);
  }

  var heading = document.getElementById('heroHeading');
  var words = ["We","make","","business","move","."];
  var accentWord = "business";
  ["We","make","business","move."].forEach(function(w){
    var span = document.createElement('span');
    span.className = 'word' + (w === 'business' ? ' accent' : '');
    span.textContent = w + ' ';
    heading.appendChild(span);
  });

  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  if(!isTouch){
    var dot = document.getElementById('curDot');
    var ring = document.getElementById('curRing');
    var label = document.getElementById('curLabel');
    var mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
      var el = document.elementFromPoint(mx,my);
      var lightBg = el && el.closest && !el.closest('.hero');
      document.body.classList.toggle('on-light', !!lightBg);
    });
    (function loop(){
      rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
      ring.style.transform = 'translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button').forEach(function(el){
      el.addEventListener('mouseenter', function(){ ring.classList.add('big'); label.textContent = el.dataset.cursor === 'click' ? 'Go' : ''; });
      el.addEventListener('mouseleave', function(){ ring.classList.remove('big'); label.textContent=''; });
    });

    var heroSection = document.getElementById('heroSection');
    var videoSpot = document.getElementById('videoSpot');
    heroSection.addEventListener('mouseenter', function(){ heroSection.classList.add('spotlit'); });
    heroSection.addEventListener('mousemove', function(e){
      var r = heroSection.getBoundingClientRect();
      videoSpot.style.setProperty('--sx', (((e.clientX-r.left)/r.width)*100)+'%');
      videoSpot.style.setProperty('--sy', (((e.clientY-r.top)/r.height)*100)+'%');
    });
    heroSection.addEventListener('mouseleave', function(){ heroSection.classList.remove('spotlit'); });

    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width/2;
        var relY = e.clientY - r.top - r.height/2;
        el.style.transform = 'translate('+relX*0.22+'px,'+relY*0.32+'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; });
    });
  }

  var heroVideo = document.getElementById('hero-video');
  window.addEventListener('load', function(){
    requestAnimationFrame(function(){ heroVideo.style.transform = 'translate(-50%,-50%) scale(1.12)'; });
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.15 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var termIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ buildTerminal(); termIo.disconnect(); } });
  }, { threshold:0.4 });
  termIo.observe(document.getElementById('terminalWrap'));

  var paraIo = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ e.target.classList.toggle('active', e.isIntersecting); });
  }, { threshold:0.55 });
  document.querySelectorAll('.about-para').forEach(function(p){ paraIo.observe(p); });

})();
