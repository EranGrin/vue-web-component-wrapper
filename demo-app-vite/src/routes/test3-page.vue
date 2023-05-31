<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../pinia/counter.store'

const counterStore = useCounterStore()

const { count, name, doubleCount } = storeToRefs(counterStore)
const { increment, reset } = counterStore
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center text-2xl bg-blue-300 rounded-xl p-4">
      <h1>I am a route 3 (and Support Pinia!)</h1>
      <p>Check localstorage</p>
    </div>

    <p>{{ name }}</p>

    <p>Count: {{ count }}</p>
    <p>Doble Count: {{ doubleCount }}</p>
  </div>

  <div class="flex py-2">
    <button class="p-2 bg-blue-300 text-black border-cyan-300 rounded-l-lg rounded-r-none w-full" @click="increment">
      Increment
    </button>
    <button
      :class="{ 'bg-slate-300 text-slate-500': count == 0 }"
      class="p-2 bg-red-600 text-white border-cyan-300 rounded-r-lg w-full duration-300"
      :disabled="count == 0"
      @click="reset"
    >
      Reset
    </button>
  </div>
</template>
