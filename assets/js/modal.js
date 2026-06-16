(function(){
  var modal = document.getElementById('side-modal');
  if(!modal) return;

  var titleEl = modal.querySelector('.modal__title');
  var subEl = modal.querySelector('.modal__sub');
  var submitEl = modal.querySelector('.modal__submit');
  var closeBtn = modal.querySelector('.modal__close');

  function open(triggerBtn){
    var data = triggerBtn ? triggerBtn.dataset : {};
    if(data.modalTitle) titleEl.textContent = data.modalTitle;
    if(data.modalSub) subEl.textContent = data.modalSub;
    if(data.modalSubmit) submitEl.textContent = data.modalSubmit;

    modal.classList.add('is-open');
    document.body.classList.add('has-modal');
    var firstInput = modal.querySelector('input,select');
    if(firstInput) setTimeout(function(){ firstInput.focus(); }, 50);
  }
  function close(){
    modal.classList.remove('is-open');
    document.body.classList.remove('has-modal');
    var btn = modal.querySelector('.modal__submit');
    if(btn && btn.dataset.original){ btn.textContent = btn.dataset.original; btn.disabled = false; delete btn.dataset.original; }
  }

  document.querySelectorAll('[data-open-modal]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      open(btn);
    });
  });

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', function(e){
    if(e.target === modal) close();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // Phone mask reuse
  function fmt(v){
    var d = v.replace(/\D/g,'');
    if(d.length && d[0] !== '7' && d[0] !== '8') d = '7' + d;
    if(d[0] === '8') d = '7' + d.slice(1);
    d = d.slice(0,11);
    var out = '+7';
    if(d.length > 1) out += ' (' + d.slice(1,4);
    if(d.length >= 4) out += ') ' + d.slice(4,7);
    if(d.length >= 7) out += '-' + d.slice(7,9);
    if(d.length >= 9) out += '-' + d.slice(9,11);
    return out;
  }
  var phoneInput = modal.querySelector('input[type="tel"]');
  if(phoneInput){
    phoneInput.addEventListener('focus', function(){ if(!phoneInput.value) phoneInput.value = '+7 ('; });
    phoneInput.addEventListener('input', function(){ phoneInput.value = fmt(phoneInput.value); });
    phoneInput.addEventListener('blur', function(){ if(phoneInput.value === '+7 (' || phoneInput.value === '+7') phoneInput.value = ''; });
  }

  var form = modal.querySelector('form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      if(!name.value.trim()){ name.focus(); return; }
      if(!phone.value.trim() || phone.value.replace(/\D/g,'').length < 11){ phone.focus(); return; }
      var btn = form.querySelector('.modal__submit');
      if(btn){ btn.dataset.original = btn.textContent; btn.textContent = 'Отправлено — перезвоним за 5 минут'; btn.disabled = true; }
      setTimeout(close, 1800);
    });
  }
})();
