<template>
  <div>
    <header class="bg-blue-300 rounded-lg shadow-lg p-4 mx-0 md:mx-20">
      <nav>
        <ul class="flex justify-between sm:mx-1 md:mx-20">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/test1">Test route 1</router-link>
          </li>
          <li>
            <router-link to="/test2">Test route 2</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="mt-4 p-4 mx-0 md:mx-20 bg-gray-200 rounded-lg shadow-lg">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Main',
  props: {
    apiToken: { type: String, required: true },
    baseUri: { type: String, default: 'test.me' },
  },

  data: () => ({
    configuration: {},
    credentials: {
      apiToken: '',
      baseUri: '',
    },
  }),

  created() {
    console.log(this)
  },
}
</script>
<style>
.test-heading {
  font-size: 2em;
  margin-top: 2rem;
}
a {
  @apply text-gray-900 hover:text-gray-700;
}
</style>
