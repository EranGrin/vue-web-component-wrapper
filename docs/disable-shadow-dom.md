## Disable Shadow DOM

By default, the `vue-web-component-wrapper` uses the Shadow DOM to encapsulate styles and scripts, preventing clashes with the rest of the host application. However, in some cases, you may want to disable the Shadow DOM. This can be done by setting the `disableShadowDOM` option to `true` in the `createWebComponent` function.

When the `disableShadowDOM` option is set to `true`, the web component will render its content in the light DOM, allowing the styles and scripts to affect the rest of the host application. This can be useful when you want to share styles or scripts between the web component and the host application.

Here's an example of how to disable the Shadow DOM in the `createWebComponent` function:

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
  disableStyleRemoval: false,
  disableShadowDOM: true, // Disable Shadow DOM
});
```

When the `disableShadowDOM` option is set to `true`, the named slots will be rendered in the light DOM without the need to define the named slots in the Vue component. The `namedSlots` attribute in the Vue component is not needed if `disableShadowDOM` is `true`.

```javascript
namedSlots: ['customName'] // Not needed if disableShadowDOM is true
```

By disabling the Shadow DOM, you can have more control over the styling and behavior of your web component, allowing it to interact more seamlessly with the rest of the host application. However, be aware that disabling the Shadow DOM can also expose your web component to potential clashes with the host application's styles and scripts. Use this feature judiciously based on your specific use case and requirements.


## Importent Note

Behind the scenes, this feature useas a patch of the vue `apiCustomElement` api, therefore it is important to note that future versions of `vue` may not be compatible with this feature and may cause unexpected behavior. It is recommended to test this feature with the version of vue you are using before using it in production.

if you are using this feature and you encounter any issues, please report them in the [GitHub repository](https://github.com/EranGrin/vue-web-component-wrapper)
