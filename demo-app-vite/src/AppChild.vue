<template>
  <div>
    <h1 class="text-xl border border-y-indigo-50 rounded-lg bg-cyan-700">
      {{ testInject }}
    </h1>
  </div>
</template>

<script lang="ts">

export default {
  name: 'App',
  namedSlots: ['customName'],
  emits: ['customEventTest', 'update:modelValue'],

  inject: ['testKey'],

  props: {
    baseUri: { type: String, default: 'test.me' },
    modelValue: { type: String },
    apiToken: { type: String, required: true },
  },

  data: () => ({
    configuration: {},
    credentials: {
      apiToken: '',
      baseUri: '',
    },
    testInject: '',
  }),
  mounted() {
    console.log(this.testKey); // Outputs: 'This is test data'
    this.testInject = this.testKey as string;
  },

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
