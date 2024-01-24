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
          <li>
            <router-link to="/test3">Test route 3</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <header
      class="bg-gray-800 text-white text-center p-4 mt-4 rounded-lg shadow-lg mx-0 md:mx-20"
    >
    <div 
       style="display: flex; justify-content: space-between; "
      >
      <div class=" text-black flex">
        <input
        class="p-2 rounded-lg shadow-lg"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        />
        <div class="text-white ml-4 align self-center">
          {{ modelValue }}
        </div>
      </div>
      
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="testEmit"
      >
        emit event outside
      </button>
    </div>
    </header>
    <main class="mt-4 p-4 mx-0 md:mx-20 bg-gray-200 rounded-lg shadow-lg">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white text-center p-4 mt-4 rounded-lg shadow-lg mx-0 md:mx-20">
      <div class="mb-2">

        <slot></slot>
      </div>
      <div class="flex justify-center">
        <slot name="customName"></slot>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  namedSlots: ['customName'],
  emits: ['customEventTest', 'update:modelValue'],
  provide() {
    return {
      testKey: 'I am provide/inject data via default slot',
    };
  },
  props: {
    apiToken: { type: String, required: true },
    baseUri: { type: String, default: 'test.me' },
    modelValue: { type: String },
  },

  data: () => ({
    configuration: {},
    credentials: {
      apiToken: '',
      baseUri: '',
    },
  }),


  methods: {
    testEmit() {
      this.$emit('customEventTest', 
        { 
          testEvent: '123456789',
        }
      )
    }
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

header  {
  @apply font-sans;
}

main {
  @apply font-sans;
}
</style>
