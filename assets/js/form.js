(function(){
  // Phone mask: +7 (___) ___-__-__
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
  Array.prototype.forEach.call(document.querySelectorAll('input[type="tel"]'), function(input){
    input.addEventListener('focus', function(){
      if(!input.value) input.value = '+7 (';
    });
    input.addEventListener('input', function(){
      input.value = fmt(input.value);
    });
    input.addEventListener('blur', function(){
      if(input.value === '+7 (' || input.value === '+7') input.value = '';
    });
  });

  // Form submit — stub
  Array.prototype.forEach.call(document.querySelectorAll('.lead-form'), function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      if(!name.value.trim()){ name.focus(); return; }
      if(!phone.value.trim() || phone.value.replace(/\D/g,'').length < 11){ phone.focus(); return; }
      var btn = form.querySelector('.lead-form__submit');
      if(btn){ btn.textContent = 'Отправлено — перезвоним за 5 минут'; btn.disabled = true; }
    });
  });
})();
