# Fetch Fiddler

Fetch Fiddler is a Chrome extension designed to intercept and modify JSON responses from network requests made via the Fetch API. It's particularly useful for developers who need to test or debug web applications by altering API responses on the fly, without having to modify the backend code.

## Features

- **Domain Specific Modification**: Fetch Fiddler allows you to specify which domains' responses should be modified.
- **Key-Value Rewriting**: Easily rewrite specific key-value pairs in JSON responses.
- **Easy Configuration**: Define your modifications in a simple configuration object.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top right.
4. Click "Load unpacked" and select the directory containing the Fetch Fiddler files.

## Configuration

Fetch Fiddler uses a configuration object to define the modifications to be applied to JSON responses. Here's the structure of the configuration object:

```js
const CONFIG = {
  "example.com": {
    key: "foo",
    value: "bar"
  },
  "anotherdomain.com": {
    key: "baz",
    value: "qux"
  }
  // Add more domain configurations as needed
};
