document.addEventListener('DOMContentLoaded', function () {
  const txt = document.getElementById('txt');
  init(txt);
});

function init(txt) {
  txt.contentEditable = 'true';
  getFromLocalStorage(txt);
  tab(txt);

  setInterval(() => {
    statusUp('saving...');
    saveToLocalStorage(txt);
    statusUp();
  }, 1000);
}

function getFromLocalStorage(txt) {
  const key = window.cfg.storeKey;
  const localStorage = window.localStorage;

  let contents = localStorage.getItem(key);
  if (contents) {
    txt.innerText = contents;
  }
}

function saveToLocalStorage(txt) {
  const key = window.cfg.storeKey;
  const localStorage = window.localStorage;

  localStorage.setItem(key, txt.innerText);
}

const statusUp = (function () {
  let _status;

  function getStatusEl() {
    if (!_status) {
      _status = document.querySelector('.container .status');
    }
    return _status;
  }

  return function (text = '') {
    let status = getStatusEl();
    status.innerHTML = '';
    status.insertAdjacentHTML('afterbegin', `<div>${text}</div>`);
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