(function () {
  'use strict';
  if (typeof window.CONFIG === 'undefined') {
    var _intro = document.getElementById('intro');
    if (_intro) {
      _intro.innerHTML = '<div class="intro-inner"><h1>配置文件出错啦 😢</h1>' +
        '<p>js/config.js 的语法有误，常见原因：漏了逗号、引号没配对、多了数字或文字。<br>' +
        '把它改回正确格式后，点击下面的按钮刷新页面。</p>' +
        '<button onclick="location.reload()" style="cursor:pointer;border:none;padding:12px 30px;border-radius:999px;color:#3a1c10;background:linear-gradient(90deg,#ffd36b,#ff9a5c);font-size:16px;box-shadow:0 8px 30px rgba(255,150,90,.45);">刷新重试</button></div>';
    }
    return;
  }
  var cfg = window.CONFIG;
  function $(s){ return document.querySelector(s); }
  function $$(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function pad(n){ return n<10 ? '0'+n : ''+n; }

  /* ============ 星空背景 ============ */
  function buildStars(){
    var wrap = $('#stars');
    for (var i=0; i<160; i++){
      var s = document.createElement('div'); s.className = 'star';
      var z = (Math.random()*2.2+0.6).toFixed(2);
      s.style.width = z+'px'; s.style.height = z+'px';
      s.style.left = (Math.random()*100)+'%';
      s.style.top = (Math.random()*100)+'%';
      s.style.setProperty('--tw', (Math.random()*4+2).toFixed(2)+'s');
      s.style.animationDelay = (Math.random()*6).toFixed(2)+'s';
      wrap.appendChild(s);
    }
    var sh = $('#shootingStars');
    for (var j=0; j<3; j++){
      var e = document.createElement('div'); e.className = 'shooting';
      e.style.top = (Math.random()*38)+'%';
      e.style.left = (20+Math.random()*60)+'%';
      e.style.animationDelay = (2+Math.random()*7).toFixed(2)+'s';
      sh.appendChild(e);
    }
  }

  /* ============ 宇宙中心 & 星球 ============ */
  function buildUniverse(){
    $('#sunName').textContent = cfg.herName;
    $('#heroTitle').textContent = cfg.heroTitle;
    $('#heroSub').textContent = cfg.heroSub;
    var orbits = $('#orbits');
    var n = cfg.periods.length;
    cfg.periods.forEach(function(p, i){
      var frac = 0.17 + 0.28 * (i / Math.max(1, n-1));
      var dur = 13 + i*3.5;
      var delay = -(i*1.7);
      var o = document.createElement('div'); o.className = 'orbit';
      o.style.setProperty('--r', 'calc('+frac.toFixed(3)+' * var(--D))');
      o.style.setProperty('--dur', dur+'s');
      o.style.setProperty('--delay', delay+'s');
      var a = document.createElement('div'); a.className = 'planet-anchor';
      var pl = document.createElement('div'); pl.className = 'planet';
      pl.style.setProperty('--pc', p.color);
      pl.innerHTML = '<span class="p-dot"></span><span class="p-name"></span>';
      pl.querySelector('.p-name').textContent = p.name;
      (function(id){ pl.addEventListener('click', function(){ scrollToPeriod(id); }); })(p.id);
      a.appendChild(pl); o.appendChild(a); orbits.appendChild(o);
    });
  }

  function scrollToPeriod(id){
    var el = document.getElementById('period-'+id);
    if (!el) return;
    el.scrollIntoView({ behavior:'smooth', block:'start' });
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
    setTimeout(function(){ el.classList.remove('flash'); }, 1800);
  }

  /* ============ 纪念日倒计时 ============ */
  function buildCountdown(){
    var start = new Date(cfg.startDate.replace(/-/g,'/'));
    var parts = cfg.anniversary.split('-');
    var m = parseInt(parts[0],10), d = parseInt(parts[1],10);
    function tick(){
      var now = new Date();
      var together = Math.floor((now - start)/86400000);
      if (together < 0) together = 0;
      $('#togetherDays').textContent = '我们已经相爱了 ' + together + ' 天 💞';
      var next = new Date(now.getFullYear(), m-1, d);
      if (next.getTime() - now.getTime() <= 0){ next = new Date(now.getFullYear()+1, m-1, d); }
      var ms = next.getTime() - now.getTime();
      var days = Math.floor(ms/86400000);
      var hrs = Math.floor(ms/3600000)%24;
      var mins = Math.floor(ms/60000)%60;
      var secs = Math.floor(ms/1000)%60;
      $('#cdDays').textContent = days;
      $('#cdHours').textContent = pad(hrs);
      $('#cdMins').textContent = pad(mins);
      $('#cdSecs').textContent = pad(secs);
      $('#countLabel').textContent = '距离下一个纪念日（' + m + '月' + d + '日）';
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ============ 照片墙 ============ */
  function buildGallery(){
    var wrap = $('#periods');
    cfg.periods.forEach(function(p){
      var sec = document.createElement('div'); sec.className = 'period'; sec.id = 'period-'+p.id;
      sec.style.setProperty('--pc', p.color);
      var head = document.createElement('div'); head.className = 'period-head';
      head.innerHTML = '<span class="p-badge"></span><h3></h3><span class="p-time"></span>';
      head.querySelector('h3').textContent = p.name;
      head.querySelector('.p-time').textContent = p.time;
      var desc = document.createElement('p'); desc.className = 'period-desc'; desc.textContent = p.desc;
      var grid = document.createElement('div'); grid.className = 'photo-grid';
      if (p.photos && p.photos.length){
        p.photos.forEach(function(ph){ grid.appendChild(makePhoto(ph, p)); });
      } else {
        for (var k=0; k<6; k++){ grid.appendChild(makePlaceholder(p)); }
      }
      sec.appendChild(head); sec.appendChild(desc); sec.appendChild(grid);
      wrap.appendChild(sec);
    });
  }
  function makePhoto(ph, p){
    var cell = document.createElement('div'); cell.className = 'photo';
    var img = document.createElement('img');
    img.loading = 'lazy'; img.alt = ph.caption || p.name; img.src = ph.src;
    img.addEventListener('click', function(){ openLightbox(img.src, ph.caption); });
    img.addEventListener('error', function(){
      cell.classList.add('placeholder');
      cell.innerHTML = '<span class="ph-ico">📷</span><span class="ph-txt">放一张照片<br>photos/'+p.id+'/ 文件夹</span>';
    });
    cell.appendChild(img);
    if (ph.caption){
      var c = document.createElement('div'); c.className = 'cap'; c.textContent = ph.caption; cell.appendChild(c);
    }
    return cell;
  }
  function makePlaceholder(p){
    var cell = document.createElement('div'); cell.className = 'photo placeholder';
    cell.innerHTML = '<span class="ph-ico">💗</span><span class="ph-txt">把照片放进<br>photos/'+p.id+'/ 文件夹</span>';
    return cell;
  }
  function openLightbox(src, cap){
    $('#lbImg').src = src;
    $('#lbCaption').textContent = cap || '';
    $('#lightbox').classList.remove('hidden');
  }

  /* ============ 小游戏：切换标签 ============ */
  $$('.game-tab').forEach(function(t){
    t.addEventListener('click', function(){
      $$('.game-tab').forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
      $$('.game-panel').forEach(function(p){ p.classList.remove('active'); });
      $('#game-'+t.getAttribute('data-game')).classList.add('active');
    });
  });

  /* ============ 小游戏：摘星星 ============ */
  var catchState = { running:false, score:0, time:30, spawnT:null, timeT:null };
  function catchStart(){
    if (catchState.running) return;
    catchState.running = true; catchState.score = 0; catchState.time = 30;
    $('#catchScore').textContent = '0'; $('#catchTime').textContent = '30';
    $('#catchArea').innerHTML = '';
    catchState.spawnT = setInterval(spawnStar, 430);
    catchState.timeT = setInterval(function(){
      catchState.time--;
      $('#catchTime').textContent = catchState.time;
      if (catchState.time <= 0) catchEnd();
    }, 1000);
  }
  function spawnStar(){
    var a = $('#catchArea');
    if (!a || !catchState.running) return;
    var s = document.createElement('span'); s.className = 'cstar';
    s.textContent = ['⭐','✨','🌟','💫'][Math.floor(Math.random()*4)];
    s.style.left = (2+Math.random()*88)+'%';
    s.style.fontSize = (18+Math.random()*16)+'px';
    s.style.setProperty('--f', (2.4+Math.random()*2).toFixed(2)+'s');
    s.addEventListener('click', function(){
      if (!catchState.running) return;
      catchState.score++;
      $('#catchScore').textContent = catchState.score;
      var pop = document.createElement('span'); pop.className = 'pop'; pop.textContent = '+1';
      pop.style.left = s.style.left; pop.style.top = '45%';
      a.appendChild(pop);
      setTimeout(function(){ pop.remove(); }, 700);
      s.remove();
    });
    s.addEventListener('animationend', function(){ s.remove(); });
    a.appendChild(s);
  }
  function catchEnd(){
    catchState.running = false;
    clearInterval(catchState.spawnT); clearInterval(catchState.timeT);
    var msg = catchState.score >= 18 ? '她把好运全收下啦 💖'
            : catchState.score >= 8 ? '还不错，继续加油哦 ✨'
            : '再试一次，把星星都摘给她 💫';
    $('#catchArea').innerHTML = '<div class="result">摘到了 <b>'+catchState.score+'</b> 颗星星！<br>'+msg+'</div>';
  }
  $('#catchStart').addEventListener('click', catchStart);

  /* ============ 小游戏：默契大考验 ============ */
  var qState = { idx:0, score:0 };
  function renderQuiz(){
    var body = $('#quizBody');
    if (qState.idx >= cfg.quiz.length){ renderQuizResult(); return; }
    var item = cfg.quiz[qState.idx];
    var html = '<div class="quiz-progress">第 '+(qState.idx+1)+' / '+cfg.quiz.length+' 题</div>';
    html += '<h3 class="quiz-q">'+item.q+'</h3><div class="quiz-opts">';
    item.options.forEach(function(op, i){ html += '<button class="quiz-opt" data-i="'+i+'">'+op+'</button>'; });
    html += '</div>';
    body.innerHTML = html;
    $$('#quizBody .quiz-opt').forEach(function(b){
      b.addEventListener('click', function(){
        var i = parseInt(b.getAttribute('data-i'),10);
        var ok = (i === item.answer);
        if (ok) qState.score++;
        var opts = $$('#quizBody .quiz-opt');
        opts.forEach(function(x, xi){
          x.disabled = true;
          if (xi === item.answer) x.classList.add('right');
          if (xi === i && !ok) x.classList.add('wrong');
        });
        setTimeout(function(){ qState.idx++; renderQuiz(); }, 900);
      });
    });
  }
  function renderQuizResult(){
    var total = cfg.quiz.length;
    var rate = Math.round(qState.score/total*100);
    var msg = rate === 100 ? '满分！你太懂她了 💯'
            : rate >= 80 ? '默契满分，天生一对 💞'
            : rate >= 50 ? '还不错，多陪陪她就好啦 😊'
            : '要加油啦，多了解她的喜好哦 💪';
    $('#quizBody').innerHTML = '<div class="quiz-result"><div class="quiz-score">'+rate+'%</div>'+
      '<p>你们的默契度</p><p class="quiz-msg">'+msg+'</p>'+
      '<button class="btn" id="quizRestart">再测一次</button></div>';
    $('#quizRestart').addEventListener('click', function(){ qState.idx = 0; qState.score = 0; renderQuiz(); });
  }

  /* ============ 小游戏：情话盲盒 ============ */
  $('#capsuleBox').addEventListener('click', function(){
    var box = $('#capsuleBox');
    box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    var i = Math.floor(Math.random()*cfg.sweetWords.length);
    var txt = $('#capsuleText');
    txt.style.opacity = '0';
    setTimeout(function(){ txt.textContent = cfg.sweetWords[i]; txt.style.opacity = '1'; }, 260);
  });

  /* ============ 小游戏：放飞心愿 ============ */
  $('#lanternBtn').addEventListener('click', function(){
    var inp = $('#lanternInput');
    var txt = inp.value.trim();
    if (!txt){ inp.focus(); return; }
    var sky = $('#lanternSky');
    var l = document.createElement('div'); l.className = 'lantern';
    l.textContent = '🏮 ' + txt;
    l.style.left = (5+Math.random()*70)+'%';
    l.style.setProperty('--rt', (5+Math.random()*4).toFixed(2)+'s');
    l.addEventListener('animationend', function(){ l.remove(); });
    sky.appendChild(l);
    inp.value = '';
  });

  /* ============ 灯箱关闭 ============ */
  $('#lbClose').addEventListener('click', function(){ $('#lightbox').classList.add('hidden'); });
  $('#lightbox').addEventListener('click', function(e){ if (e.target.id === 'lightbox') $('#lightbox').classList.add('hidden'); });

  /* ============ 初始化 ============ */
  function init(){
    buildStars();
    buildUniverse();
    buildCountdown();
    buildGallery();
    renderQuiz();
    $('#letterText').textContent = cfg.letter;
    function enter(){
      $('#intro').classList.add('hide');
      $('#main').classList.remove('hidden');
      setTimeout(function(){ var x = $('#intro'); if (x) x.remove(); }, 800);
    }
    $('#enterBtn').addEventListener('click', enter);
    if (/[?&]preview=1/.test(location.search)) { enter(); }
  }
  init();
})();
