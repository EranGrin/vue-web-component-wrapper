import { defineCustomElementSFC } from '../../package/index.js'
import MyComponent from './MyComponent.ce.vue'
import OtherComponent from './OtherComponent.ce.vue'
import OtherComponentSuper from './OtherComponentSuper.ce.vue'

const MyComponentElement = defineCustomElementSFC(MyComponent, {shadowRoot: true})
const OtherComponentElement = defineCustomElementSFC(OtherComponent, {shadowRoot: true})
const OtherComponentSuperElement = defineCustomElementSFC(OtherComponentSuper, {shadowRoot: true})
customElements.define('my-component', MyComponentElement)
customElements.define('other-component', OtherComponentElement)
customElements.define('other-component-super', OtherComponentSuperElement)