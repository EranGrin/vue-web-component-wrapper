<template>
    <div>
      <h2>{{ message }}</h2>
      <button @click="increment">Increment</button>
      <p>Count: {{ count }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  
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