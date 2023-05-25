import { Component, App } from 'vue';

interface PluginObject {
    install: (app: App) => void;
}

export interface CreateWebComponentOptions {
    elementName: string;
    rootComponent: Component;
    plugins?: PluginObject;
    cssFrameworkStyles?: string;
    VueDefineCustomElement: (...args: any[]) => any;
    h: (...args: any[]) => any;
    getCurrentInstance: (...args: any[]) => any;
    createApp: (...args: any[]) => any;
  }

export function createWebComponent(options: CreateWebComponentOptions): void;
