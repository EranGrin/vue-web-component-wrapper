# Replace `:root` with `:host` in CSS Framework Styles

When working with global CSS styles or CSS frameworks, rules defined on the `:root` selector might not work as expected inside a web component that uses Shadow DOM. The `replaceRootWithHostInCssFramework` option automatically converts `:root` to `:host` in your imported CSS styles.

## How It Works

By enabling the `replaceRootWithHostInCssFramework` option, any occurrence of `:root` in your `cssFrameworkStyles` will be replaced with `:host` during component creation. This ensures that CSS variables and other styles remain correctly scoped within the web component's Shadow DOM.

## Usage

Set the option to `true` when creating your web component:

```javascript
createWebComponent({
  rootComponent: App,
  elementName: 'my-web-component',
  plugins: pluginsWrapper,
  cssFrameworkStyles: tailwindStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  replaceRootWithHostInCssFramework: true, // Enable replacement of :root with :host
});
```

This feature is particularly useful when your global CSS or framework styles rely on selectors defined on `:root`, ensuring they are correctly applied within the Shadow DOM. 