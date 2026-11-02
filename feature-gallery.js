'use strict';
const viewer = document.querySelector('.feature-viewer');
const image = document.querySelector('#feature-image');
const caption = document.querySelector('#feature-caption');
let opener;
document.querySelectorAll('[data-feature-preview]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    viewer.showModal();
    document.body.classList.add('feature-viewer-open');
  });
});
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('feature-viewer-open');
  opener?.focus({preventScroll: true});
});
