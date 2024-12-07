
import type {
  ComponentOptionsMixin,
  ComponentOptionsWithArrayProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComputedOptions,
  EmitsOptions,
  MethodOptions,
  RenderFunction,
  SetupContext,
  ComponentInternalInstance,
  VNode,
  RootHydrateFunction,
  ExtractPropTypes,
  ConcreteComponent,
  ComponentOptions,
  ComponentInjectOptions,
  SlotsType,
  DefineComponent
} from '@vue/runtime-core';

import {
  createVNode,
  defineComponent,
  nextTick,
  warn,
  h,
  FunctionalComponent
} from 'vue';

import { camelize, extend, hyphenate, isArray, toNumber } from '@vue/shared'
import { hydrate, render } from 'vue'

// @ts-ignore
const __DEV__ = import.meta.env.DEV

export type VueElementConstructor<P = {}> = {
  new (initialProps?: Record<string, any>): VueElement & P
}

export interface DefineCustomElementConfig {
  /**
   * Render inside a shadow root DOM element
   * @default true
   */
  shadowRoot?: boolean
}

// defineCustomElement provides the same type inference as defineComponent
// so most of the following overloads should be kept in sync w/ defineComponent.

// overload 1: direct setup function
export function defineCustomElement<Props, RawBindings = object>(
  setup: (
    props: Readonly<Props>,
    ctx: SetupContext,
  ) => RawBindings | RenderFunction,
  config?: DefineCustomElementConfig,
): VueElementConstructor<Props>

// overload 2: object format with no props
export function defineCustomElement<
  Props = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  I extends ComponentInjectOptions = {},
  II extends string = string,
  S extends SlotsType = {},
>(
  options: ComponentOptionsWithoutProps<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II,
    S
  > & { styles?: string[] },
  config?: DefineCustomElementConfig
): VueElementConstructor<Props>

// overload 3: object format with array props declaration
export function defineCustomElement<
  PropNames extends string,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
  I extends ComponentInjectOptions = {},
  II extends string = string,
  S extends SlotsType = {},
>(
  options: ComponentOptionsWithArrayProps<
    PropNames,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II,
    S
  > & { styles?: string[] },
  config?: DefineCustomElementConfig
): VueElementConstructor<{ [K in PropNames]: any }>

// overload 4: object format with object props declaration
export function defineCustomElement<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
  I extends ComponentInjectOptions = {},
  II extends string = string,
  S extends SlotsType = {},
>(
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II,
    S
  > & { styles?: string[] },
  config?: DefineCustomElementConfig
): VueElementConstructor<ExtractPropTypes<PropsOptions>>

// overload 5: defining a custom element from the returned value of
// `defineComponent`
export function defineCustomElement<P>(
  options: DefineComponent<P, any, any, any>,
  config?: DefineCustomElementConfig
): VueElementConstructor<ExtractPropTypes<P>>

/*! #__NO_SIDE_EFFECTS__ */
export function defineCustomElement(
  options: any,
  config?: DefineCustomElementConfig,
  hydrate?: RootHydrateFunction,
): VueElementConstructor {
  const Comp = defineComponent(options) as any
  class VueCustomElement extends VueElement {
    static def = Comp
    constructor(initialProps?: Record<string, any>) {
      super(Comp, initialProps, config, hydrate)
    }
  }

  return VueCustomElement
}

/*! #__NO_SIDE_EFFECTS__ */
export const defineSSRCustomElement = ((
  options: any,
  config?: DefineCustomElementConfig
) => {
  
  // @ts-expect-error
  return defineCustomElement(options, hydrate)
}) as typeof defineCustomElement

const BaseClass = (
  typeof HTMLElement !== 'undefined' ? HTMLElement : class {}
) as typeof HTMLElement

type InnerComponentDef = ConcreteComponent & { styles?: string[], components?: { [key: string]: InnerComponentDef } }

// extend the interface ComponentInternalInstance
// to add the `styles` property
interface ComponentInternalInstanceCe extends ComponentInternalInstance {
  ceReload?: (newStyles: string[] | undefined) => void
  isCE?: boolean
  provides?: Record<string, any>
}

export class VueElement extends BaseClass {
  /**
   * @internal
   */
  _instance: ComponentInternalInstanceCe | null = null

  private _connected = false
  private _resolved = false
  private _numberProps: Record<string, true> | null = null
  private _styles?: HTMLStyleElement[]
  private _slots: { [key: string]: VNode[] } = {};
  private _ob?: MutationObserver | null = null
  constructor(
    private _def: InnerComponentDef,
    private _props: Record<string, any> = {},
    private _config: DefineCustomElementConfig = { shadowRoot: true },
    hydrate?: RootHydrateFunction,
  ) {
    super()
    if (this._root && hydrate) {
      hydrate(this._createVNode(), this._root)
    } else {
      if (__DEV__ && this._root) {
        warn(
          `Custom element has pre-rendered declarative shadow root but is not ` +
            `defined as hydratable. Use \`defineSSRCustomElement\`.`,
        )
      }
      if (this._config.shadowRoot !== false) {
        this.attachShadow({ mode: 'open' })
      }

      if (!(this._def as ComponentOptions).__asyncLoader) {
        // for sync component defs we can immediately resolve props
        this._resolveProps(this._def)
      }
    }
  }
  get _root(): Element | ShadowRoot | null {
    return this._config.shadowRoot ? this.shadowRoot : this
  }

  connectedCallback() {
    this._connected = true
    if (!this._instance) {
      if (this._resolved) {
        this._update()
      } else {
        this._resolveDef()
      }
    }
  }

  disconnectedCallback() {
    this._connected = false
    nextTick(() => {
      if (!this._connected) {
        if (this._ob) {
          this._ob.disconnect()
          this._ob = null
        }
        render(null, this._root!)
        this._instance = null
      }
    })
  }

  /**
   * resolve inner component definition (handle possible async component)
   */
  private _resolveDef() {
    this._resolved = true

    // set initial attrs
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name)
    }

    // watch future attr changes
    this._ob = new MutationObserver(mutations => {
      for (const m of mutations) {
        this._setAttr(m.attributeName!)
      }
    })

    this._ob.observe(this, { attributes: true })

    const resolve = (def: InnerComponentDef, isAsync = false) => {
      const { props } = def

      const styles = this._collectNestedStyles(def);
      // cast Number-type props set before resolve
      let numberProps
      if (props && !isArray(props)) {
        for (const key in props) {
          const opt = props[key]
          if (opt === Number || (opt && opt.type === Number)) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key])
            }
            ;(numberProps || (numberProps = Object.create(null)))[
              camelize(key)
            ] = true
          }
        }
      }
      this._numberProps = numberProps

      if (isAsync) {
        // defining getter/setters on prototype
        // for sync defs, this already happened in the constructor
        this._resolveProps(def)
      }

      // replace slot
      if (!this._config.shadowRoot) {
        this._slots = {};
        for (const child of Array.from(this.children)) {
          const slotName = child.getAttribute('slot') || 'default';
          if (!this._slots[slotName]) {
            this._slots[slotName] = [];
          }
          this._slots[slotName].push(
            h(child.tagName.toLowerCase(), {}, child.innerHTML)
          );
        }
        this.replaceChildren();
      }

      // apply CSS
      this._applyStyles(styles)

      // initial render
      this._update()
    }

    const asyncDef = (this._def as ComponentOptions).__asyncLoader
    if (asyncDef) {
      asyncDef().then((def: InnerComponentDef) => resolve(def, true))
    } else {
      resolve(this._def)
    }
  }

  private _resolveProps(def: InnerComponentDef) {
    const { props } = def
    const declaredPropKeys = isArray(props) ? props : Object.keys(props || {})

    // check if there are props set pre-upgrade or connect
    for (const key of Object.keys(this)) {
      if (key[0] !== '_' && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key as keyof this], true, false)
      }
    }

    // defining getter/setters on prototype
    for (const key of declaredPropKeys.map(camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key)
        },
        set(val) {
          this._setProp(key, val)
        },
      })
    }
  }

  protected _setAttr(key: string) {
    let value = this.hasAttribute(key) ? this.getAttribute(key) : undefined
    const camelKey = camelize(key)
    if (this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value)
    }
    this._setProp(camelKey, value, false)
  }

  /**
   * @internal
   */
  protected _getProp(key: string) {
    return this._props[key]
  }

  /**
   * @internal
   */
  protected _setProp(
    key: string,
    val: any,
    shouldReflect = true,
    shouldUpdate = true,
  ) {
    if (val !== this._props[key]) {
      this._props[key] = val
      if (shouldUpdate && this._instance) {
        this._update()
      }
      // reflect
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(hyphenate(key), '')
        } else if (typeof val === 'string' || typeof val === 'number') {
          this.setAttribute(hyphenate(key), val + '')
        } else if (!val) {
          this.removeAttribute(hyphenate(key))
        }
      }
    }
  }

  private _update() {
    render(this._createVNode(), this._root!)
  }

  private _createVNode(): VNode<any, any> {

    const vnode = createVNode(this._def as FunctionalComponent, extend({}, this._props), this._slots) as VNode & {
      ce?: (instance: ComponentInternalInstance) => void
    }

    if (!this._instance) {
      vnode.ce = (instance: ComponentInternalInstanceCe) => {
        this._instance = instance
        instance.isCE = true
        // HMR
        if (__DEV__) {
          instance.ceReload = (newStyles: string[] | undefined) => {
            // always reset styles
            if (this._styles) {
              this._styles.forEach(s => this._root!.removeChild(s))
              this._styles.length = 0
            }
            this._applyStyles(newStyles)
            this._instance = null
            this._update()
          }
        }

        const dispatch = (event: string, args: any[]) => {
          this.dispatchEvent(
            new CustomEvent(event, {
              detail: args,
            }),
          )
        }

        instance.emit = (event: string, ...args: any[]) => {
          // dispatch both the raw and hyphenated versions of an event
          // to match Vue behavior
          dispatch(event, args)
          if (hyphenate(event) !== event) {
            dispatch(hyphenate(event), args)
          }
        }

        // locate nearest Vue custom element parent for provide/inject
        let parent: Node | null = this
        while (
          (parent =
            parent && (parent.parentNode || (parent as ShadowRoot).host))
        ) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance
            instance.provides = parent._instance!.provides
            break
          }
        }
      }
    }
    return vnode
  }

  private _applyStyles(styles: string[] | undefined) {
    if (styles) {
      styles.forEach(css => {
        const s = document.createElement('style')
        s.textContent = css
        this._root!.prepend(s)
        if (__DEV__) {
          ;(this._styles || (this._styles = [])).push(s)
        }
      })
    }
  }

  private _collectNestedStyles(componentDef: 
    InnerComponentDef
  ): string[] {
    let styles = componentDef.styles ?? [];

    if (componentDef.components) {
      Object.values(componentDef.components).forEach(subComponent => {
        styles = styles.concat(this._collectNestedStyles(subComponent as InnerComponentDef));
      });
    }
    return styles;
  }
}