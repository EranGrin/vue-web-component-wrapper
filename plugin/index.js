import { defineCustomElement } from './web-component-util';

export const createWebComponent = ({
  rootComponent,
  elementName,
  plugins,
  cssFrameworkStyles,
  VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance
}) => {
  if (!rootComponent ) {
    console.warn(
        'No root component provided. Please provide a root component to create a web component.'
    );
    return;
  }

  customElements.define(
    elementName,
    defineCustomElement(
      rootComponent,
      plugins,
      cssFrameworkStyles,
      VueDefineCustomElement,
      h,
      createApp,
      getCurrentInstance
    )
  );
};