(function(){
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobile-menu');
  var close = document.querySelector('.mobile-menu__close');
  if(!burger || !menu) return;
  function open(){ menu.classList.add('is-open'); document.body.style.overflow='hidden'; burger.setAttribute('aria-expanded','true'); }
  function shut(){ menu.classList.remove('is-open'); document.body.style.overflow=''; burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', open);
  if(close) close.addEventListener('click', shut);
  menu.addEventListener('click', function(e){
    if(e.target.tagName === 'A' || e.target.closest('a')) shut();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menu.classList.contains('is-open')) shut();
  });
})();
