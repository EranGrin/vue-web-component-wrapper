

## SFC as Custom Element

This section explains how to enhance the core functionality of SFC (Single File Component) as a Custom Element using the `defineCustomElementSFC` method. It introduces two new features: **Nested Components** and **Shadow DOM option**.

### Nested Components

With the SFC as Custom Element approach, you can use nested components with styles and share base components between multiple custom elements. This allows for better code organization and reusability.

### Shadow DOM option

The SFC custom element supports the option to enable or disable the Shadow DOM. The Shadow DOM provides encapsulation for the component's styles and DOM structure, preventing them from affecting the rest of the page. By default, the Shadow DOM is enabled, but you can disable it if needed.

### Usage

To use SFC as a Custom Element, follow these steps:

1. Import the `defineCustomElementSFC` function from the `vue-web-component-wrapper` package.
2. Call the `defineCustomElementSFC` function, passing in your SFC component and an options object.
    - The options object can include the `shadowRoot` property, which determines whether the Shadow DOM should be enabled or disabled for the custom element.
3. Use the `customElements.define` method to define your custom element, providing a name for the element and the result of the `defineCustomElementSFC` function.

### Example

```javascript
// main.js
import { defineCustomElementSFC } from 'vue-web-component-wrapper';
const MyComponentElement = defineCustomElementSFC(MyComponent, {shadowRoot: false})
customElements.define('my-component', MyComponentElement)
```

### Demo
[Demo Link](https://stackblitz.com/edit/vue-web-component-wrapper?file=README.md&startScript=sfc-demo)