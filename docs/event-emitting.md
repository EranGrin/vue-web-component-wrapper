## Using event emitting in `vue-web-component-wrapper`

The `vue-web-component-wrapper` enhances Vue components to be used as standard web components, supporting event emitting. Use the `emits` attribute in your Vue component to specify which events are emitted.

### Defining emitted events in Vue Component

In your Vue component, define the `emits` in the component's options to specify which events are emitted.

**App.vue (Vue Component):**

```vue
    <template>
  <button @click="emitCustomEvent">Click me</button>
</template>

<script>
export default {
    emits: ['customEvent'],
    methods: {
        emitCustomEvent() {
        // Emitting a custom event named 'custom-event'
        this.$emit('customEvent', { payload: 'some data' });
        }
    }
}
</script>

```
In this example, clicking the button in App.vue will emit a custom event named custom-event with an associated payload.

### Using emitted events in Web Component

## Usage in HTML:

```html
    <my-web-component @custom-event="handleCustomEvent"></my-web-component>
    <script>
        const component = document.querySelector('my-web-component');
        component.addEventListener('customEvent', (event) => {
            console.log('Custom event received:', event);
            // Do something with event data
        });
    </script>
```
Here, `my-web-component` is listening for the `customEvent` emitted from within the Vue component. Then with `addEventListener` we can listen to these custom events as you would with native DOM events.

### Tips

- The event names defined in your Vue component (`customEvent`, `customEvent2`, etc.) should match the `@` attributes used in the HTML where the web component is utilized.
- The `emits` attribute in the Vue component should be an array of strings, where each string is the name of an emitted event.
















<!-- Using Event Emitting in vue-web-component-wrapper
The vue-web-component-wrapper allows for custom event emission from Vue components when used as web components. Below is an example of how to define and emit custom events, and how to listen to these events when using the web component.

Defining and Emitting Events in Vue Component
Custom events can be emitted from within your Vue component, allowing for interactive and dynamic web components.

ExampleComponent.vue:

vue
Copy code
<template>
  <button @click="emitCustomEvent">Click me</button>
</template>

<script>
export default {
  methods: {
    emitCustomEvent() {
      // Emitting a custom event named 'custom-event'
      this.$emit('custom-event', { payload: 'some data' });
    }
  }
}
</script>
Save to grepper
In this example, clicking the button in ExampleComponent.vue will emit a custom event named custom-event with an associated payload.

Listening to Events in the Web Component
When using the component as a web component, listen to these custom events as you would with native DOM events.

Usage in HTML:

html
Copy code
<my-web-component @custom-event="handleCustomEvent"></my-web-component>
Save to grepper
Here, my-web-component is listening for the custom-event emitted from within the Vue component. The function handleCustomEvent would be defined in your JavaScript to handle this event.

JavaScript Example for Event Handling:
javascript
Copy code
function handleCustomEvent(event) {
  console.log('Custom event received:', event.detail);
}
Save to grepper
Tips
Custom events in Vue are typically kebab-cased (e.g., custom-event).
Ensure the event names you emit from your Vue component match the event listeners set up in your web component usage.
The payload of the emitted event can be accessed via event.detail in the event handler. -->
