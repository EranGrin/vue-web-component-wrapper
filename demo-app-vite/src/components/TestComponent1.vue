<template>
    <div>
      <h2>{{ message }}</h2>
      <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="increment">Increment</button>
      <p>Count: {{ count }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const message = 'Hello, Vue 3!';
  const count = ref(0);
  const increment = () => count.value++;
  
  const props = defineProps({
    initialCount: Number,
  });
  
  onMounted(() => {
    if (props.initialCount !== undefined) {
      count.value = props.initialCount;
    }
  });
</script>