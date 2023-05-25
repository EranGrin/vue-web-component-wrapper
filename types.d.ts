import { Component, App, CreateAppFunction, getCurrentInstance, h, DefineComponent } from 'vue';

interface PluginObject {
  install: (app: App) => void;
}

export interface CreateWebComponentOptions {
  elementName: string;
  rootComponent: DefineComponent;
  plugins?: PluginObject;
  cssFrameworkStyles?: string;
  VueDefineCustomElement: typeof DefineComponent;
  h: typeof h;
  createApp: CreateAppFunction;
  getCurrentInstance: typeof getCurrentInstance;
}

export function createWebComponent(options: CreateWebComponentOptions): void;