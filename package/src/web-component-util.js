
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
  asyncInitialization = () => Promise.resolve(),
}) =>
  {
    const customElementDefiner = disableShadowDOM ? VueDefineCustomElementPatch : VueDefineCustomElement
    
    
    const customElementConfig = customElementDefiner ({
      styles: [cssFrameworkStyles],
      props: {
        ...rootComponent.props,
        modelValue: { type: [String, Number, Boolean, Array, Object] } // v-model support
      }, 
      emits: rootComponent?.emits,


      
      setup(props, { slots }) {

        const emitsList = [...(rootComponent?.emits || []), 'update:modelValue']
        const app = createApp()
        app.use(plugins)

        
        app.component('app-root')

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
            const insertStyles = (styles) => {
              if (styles?.length) {
                this.__style = document.createElement('style')
                this.__style.innerText = styles.join().replace(/\n/g, '')
                nearestElement(this.$el).append(this.__style)
              }
            }

            insertStyles(this.$?.type.styles)
            if (this.$options.components) {
              for (const comp of Object.values(this.$options.components)) {
                insertStyles(comp.styles)
              }
            }
          },
          unmounted() {
            if(!disableRemoveStylesOnUnmount) {
              this.__style?.remove()
            }
          },
        })


        console.log('plugins', plugins)



        console.log('app', app)
        
        const inst = getCurrentInstance()
        Object.assign(inst.appContext, app._context)
        Object.assign(inst.provides, app._context.provides)

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

        // Establish named slots
        const namedSlots = rootComponent?.namedSlots?.reduce((acc, slotsName) => {
          acc[slotsName] = () => h('slot',{ name: slotsName});
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
          )

      },
  }, disableShadowDOM && { shadowRoot: false })

  return asyncInitialization().then(() => {
    return customElementConfig;
  })
}
