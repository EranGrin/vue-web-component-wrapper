
# Using Vue 3 Web Components in HTML

In this example, we will demonstrate how to use a Vue 3 web component in an HTML file. The web component is created using the `vue-web-component-wrapper` plugin, which transforms a Vue application into a reusable web component.

## Development workflow

1. Create a Vue 3 application using the `vue-web-component-wrapper` plugin.
2. Run the development server to build the web component.
3. Use the web component in an HTML file.

## Example

### Vue 3 Web Component

The following code snippet shows the Vue 3 web component created using the `vue-web-component-wrapper` plugin. The web component has a default slot and a named slot.

```html
<my-web-component
    lang="de"
    route="/route1"
    class="my-web-component"
    api-token="++++++++++++++++++++++++"
    base-uri="https://my.base.uri"
    model-value="v-model-value"
>
    <!-- default slot -->
    <my-child-component
        lang="de"
        route="/route1"
        class="my-child-component"
    ></my-child-component>

    <!-- named slot -->
    <div slot="customName">I am a custom named slot </div>
</my-web-component>

<script src="my-web-component.js"></script> // path to the web component script
```

- note that you can use nested components inside the web component.


