# ⚡Vite + Vue 3 + Typescript + Web Component

This is a boiler plate to show how to develop Web Component by using Vite + Vue 3 + typescript.

Especially, it might be helpful to implement small part UI by using vue3 + typescript,
while you work on big legacy web project.

# How to run

Please run steps below to run it as development mode.
`````
git clone https://github.com/skysign/vite-vue3-typescript-webcomponent.git
cd vite-vue3-typescript-webcomponent
npm install
npm run dev
`````

Now you can see two buttons, and numbers are increasing by clicking.
One web component have two buttons and

# How to release

Please run 'build' not 'dev'.
`````
npm run build
`````

You can see that html, js files are generated in './dist' folder.

Please run simple web server to see how web component works in browser.
`````
npx http-server ./dist
`````
