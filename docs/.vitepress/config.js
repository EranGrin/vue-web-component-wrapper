export default {
  title: 'Vue Truncate Readmore',
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
    ],
  },
};
