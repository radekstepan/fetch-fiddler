if (document.readyState === 'complete' || document.readyState === 'interactive') {
  injectScript();
} else {
  document.addEventListener('DOMContentLoaded', injectScript);
}

function injectScript() {
  // Use typeof to check for the global variable 'browser' or 'chrome'
  const runtime = (typeof browser !== 'undefined' ? browser.runtime :
                   (typeof chrome !== 'undefined' ? chrome.runtime : null));
  if (!runtime) {
    console.error('Extension runtime API not found.');
    return;
  }
  const script = document.createElement('script');
  script.src = runtime.getURL('modifyFetch.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}
