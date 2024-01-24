## Using Provide/Inject in `vue-web-component-wrapper`

The `vue-web-component-wrapper` allows Vue components, transformed into web components, to use Vue's `provide` and `inject` features. This feature enables components to share data across the component tree without passing props down manually at every level.

### Providing Data in Root Component

In your root Vue component, you can use the `provide` option to specify data that should be available to all its descendant components.

**Example of Providing Data:**

#### App.vue (Vue Component) my-web-component:
```vue
<script>
export default {
  name: 'App',
  provide() {
    return {
      sharedData: 'This is shared data'
    };
  },
};
</script>
```


#### AppChild.vue (Vue Component) my-web-component-child:
```vue
```vue
<template>
  <div>
    <p>{{ sharedData }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppChild',
  inject: ['sharedData'],

  data() {
    return {
      injectedData: this.sharedData,
    };
  },
  mounted() {
    this.injectedData = this.sharedData;
  },
};
</script>
```

In this example, the `App.vue` component provides the data `sharedData` to all its descendant components. The `AppChild.vue` component injects the data `sharedData` and uses it in its template.

### Web Component Usage in HTML:

```html
<my-web-component>
    <my-web-component-child></my-web-component-child>
</my-web-component>
```