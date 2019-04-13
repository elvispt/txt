document.addEventListener('DOMContentLoaded', function () {
  const txtEl = document.getElementById('txt');
  const headerEl = document.querySelector('header.header');
  const txt = window.txt({txtEl, headerEl});
});
