document.addEventListener('DOMContentLoaded', function () {
  const txt = document.getElementById('txt');
  txt.contentEditable = true;
  statusUp();
  tab(txt);
});

const statusUp = (function () {
  let _status;

  function getStatusEl() {
    if (!_status) {
      _status = document.querySelector('.main .status');
    }
    return _status;
  }

  return function () {
    let status = getStatusEl();
    status.innerHTML = '';
    status.insertAdjacentHTML('afterbegin', '<div>editing</div>');
  }
}());

function tab(txt) {
  let tabSize = '';
  for (let i = 0; i < window.cfg.indentSize; i++) {
    tabSize += '\u00a0';
  }
  txt.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) {
      return;
    }

    let handled = false;
    if (e.key === 'Tab') {
      handled = true;
      document.execCommand('insertHTML', false, tabSize);
    }

    if (handled) {
      e.preventDefault();
    }
  });
}