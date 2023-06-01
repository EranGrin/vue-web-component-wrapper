<template>
  <div class="test-apply">
    <h1 class="test-apply">
      I am a route 1
      <TestComponent1 />
    </h1>
  </div>
  <div>
    <h1 class="text-lg font-bold text-center text-blue-300">extra element in template</h1>
  </div>
</template>

<script >
import TestComponent1 from '../components/TestComponent1.vue'
export default {
  components: {
    TestComponent1,
  },
}
</script>

<style lang="scss">
.test-apply {
  @apply text-4xl font-bold text-center text-blue-500;
}
</style>
