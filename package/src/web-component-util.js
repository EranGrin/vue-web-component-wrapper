import { defineCustomElement as VueDefineCustomElementPatch}  from "./api-custom-element"
const nearestElement = (el) => {
  while (el?.nodeType !== 1 /* ELEMENT */) {
    if (!el.parentElement) {
      throw new Error(
        'No parent element found, the rootComponent must be wrapped in a HTML element (e.g. <template><div> app content </div></template>)'
      )
    }
    el = el.parentElement
  }
  return el
}

function convertToOnEventName(eventName) {
  return 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
}

// Function to replace ':root' with ':host' in CSS
function replaceRootWithHost(styles) {
  if (typeof styles === 'string') {
    return styles.replace(/:root/g, ':host');
  } else if (Array.isArray(styles)) {
    return styles.map(style => style.replace(/:root/g, ':host'));
  } else {
    return styles;
  }
}

export const defineCustomElement = ({
  rootComponent,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
  elementName,
  disableRemoveStylesOnUnmount,
  disableShadowDOM,
  replaceRootWithHostInCssFramework,
  asyncInitialization,
  loaderAttribute,
  hideSlotContentUntilMounted,
  nonce
}) =>
  {
    const customElementDefiner = disableShadowDOM ? VueDefineCustomElementPatch : VueDefineCustomElement

    const modifiedCssFrameworkStyles = replaceRootWithHostInCssFramework
    ? replaceRootWithHost(cssFrameworkStyles) 
    : cssFrameworkStyles;
    const customElementConfig = customElementDefiner({
    styles: [modifiedCssFrameworkStyles],
    nonce,
    props: {
      ...rootComponent.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] } // v-model support
    }, 
    emits: rootComponent?.emits,
    
    setup(props, { slots }) {
      const emitsList = [...(rootComponent?.emits || []), 'update:modelValue']
      const app = createApp()
      app.component('app-root', rootComponent)

      if (rootComponent.provide) {
        const provide = typeof rootComponent.provide === 'function'
          ? rootComponent.provide() 
          : rootComponent.provide;
        
        // Setup provide
        Object.keys(provide).forEach(key => {
          app.provide(key, provide[key]);
        });
      }
      
      app.mixin({
        mounted() {
          if (this.$?.type?.name === 'vue-custom-element-root-component') {
            return;
          }          

          const insertStyles = (styles) => {
            if (styles?.length) {
              this.__style = document.createElement('style')
              this.__style.innerText = styles.join().replace(/\n/g, '')
              if (nonce) this.__style.setAttribute('nonce', nonce);
              nearestElement(this.$el).append(this.__style)
            }
          }

          insertStyles(this.$?.type.styles);
          if (this.$options.components) {
            for (const comp of Object.values(this.$options.components)) {
              insertStyles(comp.styles);
            }
          }

          const host = this.$el.getRootNode()?.host || nearestElement(this.$el);
          if (host) {
            if (hideSlotContentUntilMounted) {
              const hiddenEls = host.querySelectorAll(`[hidden]`);
              hiddenEls.forEach(el => {
                el.removeAttribute('hidden');
              });
            }
            
            const loaderEls = host.querySelectorAll(`[${loaderAttribute}]`);
            loaderEls.forEach(el => {
              el.remove();
            });

          }
        },
        unmounted() {
          if (!disableRemoveStylesOnUnmount) {
            this.__style?.remove();
          }
        },
      });

      app.use(plugins);

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);

      // Add support for Vue Devtools
      if (process.env.NODE_ENV === 'development' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const root = document.querySelector(elementName);
        app._container = root;
        app._instance = inst;

        const types = {
          Comment: Symbol('v-cmt'),
          Fragment: Symbol('v-fgt'),
          Static: Symbol('v-stc'),
          Text: Symbol('v-txt'),
        };

        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('app:init', app, app.version, types);
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
      }

        // Forward all emitted events to the custom element
        const eventListeners = emitsList?.reduce((acc, eventName) => {
          const onEventName = convertToOnEventName(eventName);
          acc[onEventName] = (e) => { inst.emit(eventName, e); };
          return acc;
        }, {});

      // Establish named slots with an onSlotchange listener that iterates over
      // all parent nodes of the slot (non recursive) and removes the "hidden" attribute from each.
      const namedSlots = rootComponent?.namedSlots?.reduce((acc, slotsName) => {
        acc[slotsName] = () => h('slot', {
          name: slotsName,
        });
        return acc;
      }, {});

      return () => h(
        rootComponent,
        {
          ...props,
          ...eventListeners,
        },
        {
          default: () => h('slot'),
          ...namedSlots,
          ...slots,
        }
      );
    },
  }, { shadowRoot: !disableShadowDOM, nonce })

  return asyncInitialization().then(() => {
    return customElementConfig;
  })

}
