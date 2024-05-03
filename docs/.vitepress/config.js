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
        text: 'Installation & Registration',
        items: [
          { text: 'installation', link: '/installation' },
        ],
      },
      {
        text: 'Usage',
        items: [
          { text: 'config', link: '/usage' },
          { text: 'slots', link: '/slots' },
          { text: 'event-emitting', link: '/event-emitting' },
          { text: 'webpack', link: '/webpack-config' },
          { text: 'vite', link: '/vite-config' },
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
