(function(){
  var items = document.querySelectorAll('.article-toc__item[data-target]');
  if(!items.length) return;
  var sections = Array.prototype.map.call(items, function(li){
    var id = li.getAttribute('data-target');
    return { li: li, el: document.getElementById(id) };
  }).filter(function(x){ return x.el; });

  Array.prototype.forEach.call(items, function(li){
    var a = li.querySelector('a');
    if(!a) return;
    a.addEventListener('click', function(e){
      e.preventDefault();
      var id = li.getAttribute('data-target');
      var el = document.getElementById(id);
      if(el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior:'smooth' });
    });
  });

  function update(){
    var y = window.scrollY + 140;
    var current = sections[0];
    for(var i=0;i<sections.length;i++){
      if(sections[i].el.offsetTop <= y) current = sections[i];
    }
    Array.prototype.forEach.call(items, function(li){ li.classList.remove('is-active'); });
    current.li.classList.add('is-active');
  }
  update();
  window.addEventListener('scroll', update, { passive:true });
})();
