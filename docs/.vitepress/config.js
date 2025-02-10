export default {
  title: 'Web Component Wrapper',
  description: 'A Vue.js plugin to truncate and expand text content with a customizable read more/less button.',
  base: '/vue-web-component-wrapper/',
  themeConfig: {
    nav: [
      { text: 'Installation', link: '/installation' },
    ],
    sidebar: [
      {
        text: 'Installation',
        items: [
          { text: 'package installation', link: '/installation' },
        ],
      },
      {
        text: 'Usage',
        items: [
          { text: 'config', link: '/usage' },
          { text: 'slots', link: '/slots' },
          { text: 'event-emitting', link: '/event-emitting' },
          { text: 'disable-shadow-dom', link: '/disable-shadow-dom' },
          { text: 'host-implementation', link: '/host-implementation' },
          { text: 'SFC as Custom Element', link: '/sfc-as-custom-element' },
          { text: 'Async Initialization', link: '/async-initialization' },
          { text: 'Replace :root with :host', link: '/replace-root-with-host' },
        ],
      },
      {
        text: 'Bundlers',
        items: [
          { text: 'vite', link: '/vite-config' },
          { text: 'webpack', link: '/webpack-config' },
        ],
      },
      {
        text: 'Ui Frameworks',
        items: [
          { text: 'Tailwind', link: '/tailwind' },
          { text: 'UnoCSS', link: '/unocss' },
          { text: 'Element-Plus', link: '/element-plus' },
          { text: 'vuetify', link: '/vuetify' },
        ],

      }
    ],
  },
};
