if (document.readyState === 'complete' || document.readyState === 'interactive') {
  injectScript();
} else {
  document.addEventListener('DOMContentLoaded', injectScript);
}

function injectScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('modifyFetch.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}
  