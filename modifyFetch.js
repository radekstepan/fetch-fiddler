(function() {
  const CONFIG = {
    "example.com": {
      key: "foo",
      value: "bar"
    },
    "anotherdomain.com": {
      key: "baz",
      value: "qux"
    }
  };

  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const requestUrl = new URL(args[0], window.location.href);
    const currentDomain = window.location.hostname;
    const rewrite = CONFIG[requestUrl.hostname] || CONFIG[currentDomain];

    const req = originalFetch.apply(this, arguments);
    if (rewrite) {
      return req.then(modifyResponse(rewrite)).catch((err) => {
        console.log('Error in modifyFetch.js', err);
        return req;
      });
    }
    return req;
  };

  function walkAndModify(obj, config) {
    if (Array.isArray(obj)) {
      // If the object is an array, iterate through its elements
      obj.forEach(item => walkAndModify(item, config));
    } else if (obj !== null && typeof obj === 'object') {
      // Iterate through object keys
      Object.keys(obj).forEach(key => {
        let modified = false
        for (const [k, v] of Object.entries(config)) {
          if (key === k) {
            obj[key] = v;
            modified = true;
          }
        }
        if (!modified) {
          walkAndModify(obj[key], config); // Recurse into nested objects/arrays
        }
      });
    }
  }

  function modifyResponse(config) {
    return function(response) {
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        return response.clone().json().then(data => {
          // Modify the JSON data here
          walkAndModify(data, config);
          const modifiedBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
          return new Response(modifiedBlob, response);
        });
      }
      return response;
    }
  }
})();
