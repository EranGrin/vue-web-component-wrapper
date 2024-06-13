import { defineCustomElementSFC } from '../../package/index.js'
// import { defineCustomElement } from 'vue'
import MyComponent from './MyComponent.ce.vue'

const MyComponentElement = defineCustomElementSFC(MyComponent, {shadowRoot: false})
customElements.define('my-component', MyComponentElement)