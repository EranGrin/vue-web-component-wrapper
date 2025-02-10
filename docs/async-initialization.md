# Async Initialization

The `vue-web-component-wrapper` supports asynchronous initialization, allowing you to perform tasks (e.g., fetching configuration data or dynamically importing modules) before your web component is fully mounted.

## How It Works

By providing an `asyncInitialization` function that returns a Promise in the `createWebComponent` method, the web component waits for the Promise to resolve before mounting the Vue component. This is useful when you need to perform asynchronous operations (such as API calls or dynamic imports) prior to the component's initialization.

## Example

```javascript
const asyncPromise = () => {
  return new Promise((resolve) => {
    // Simulate an asynchronous task (e.g., API call, dynamic import)
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

createWebComponent({
  rootComponent: App,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  asyncInitialization: asyncPromise, // Wait for this promise to resolve before mounting
  loaderAttribute: 'data-web-component-loader',
  hideSlotContentUntilMounted: true,
});
```

In this example, the Vue app inside the web component will not mount until the asynchronous task completes. 