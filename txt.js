(function (window) {

  let _txtEl;
  let _header;
  let _headerDateEl;

  let txt = function (options) {
    let {
      txtEl,
      headerEl
    } = options;
    _txtEl = txtEl;
    _header = headerEl;

    initTxt();
    getFromLocalStorage();
    setInterval(() => {
      saveToLocalStorage();
      setLastSaved();
    }, 1000);
  };

   function initTxt() {
    _txtEl.contentEditable = true;
    tab();
  }

  function setLastSaved() {
    if (!_headerDateEl) {
      _headerDateEl = _header.querySelector('.date');
    }
    const text = new Date().toUTCString();
    _headerDateEl.innerHTML = '';
    _headerDateEl.insertAdjacentText('afterbegin', `${text}`);
  }

  function tab() {
    let tabSize = '';
    for (let i = 0; i < window.cfg.indentSize; i++) {
      tabSize += '\u00a0';
    }
    _txtEl.addEventListener('keydown', function (e) {
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

  function getFromLocalStorage() {
    const key = window.cfg.storeKey;
    const localStorage = window.localStorage;

    let contents = localStorage.getItem(key);
    if (contents) {
      _txtEl.innerText = contents;
    }
  }

  function saveToLocalStorage() {
    const key = window.cfg.storeKey;
    const localStorage = window.localStorage;

    localStorage.setItem(key, _txtEl.innerText);
  }

  window.txt = txt;
})(window);