## Using Slots && Named Slots in `vue-web-component-wrapper`

The `vue-web-component-wrapper` enhances Vue components to be used as standard web components, supporting named slots. Use the `namedSlots` attribute in your Vue component to specify which slots are named.

### Defining Named Slots in Vue Component

In your Vue component, define the `namedSlots` in the component's options to specify which slots are named.

**App.vue (Vue Component):**

```vue
<template>
  <div>
    <!-- Usage of default slot -->
    <slot></slot>

    <!-- Usage of named slot -->
    <slot name="customName"></slot>
  </div>
</template>

<script>
export default {
  name: 'App',
  namedSlots: ['customName'],
  // ... other component options
}
</script>
```
In this example, App.vue declares a named slot customName by specifying it in the namedSlots array.

### Using Named Slots in Web Component
## Usage in HTML:

```html
    <my-web-component>
        <!-- Content for the default slot -->
        <h1>I am a default slot</h1>
        
        <!-- Content for the named slot 'customName' -->
        <div slot="customName">I am a custom slot</div>
    </my-web-component>
```
Here, the `<h1>` tag is passed into the default slot of `my-web-component`, and the `<div>` with `slot="customName"` is passed into the named slot `customName`.

### Tips

- The slot names defined in your Vue component (`header`, `footer`, etc.) should match the `slot` attributes used in the HTML where the web component is utilized.
- The `slot` attribute in the HTML should match the `name` attribute in the Vue component.
- The `namedSlots` attribute in the Vue component should be an array of strings, where each string is the name of a named slot.
