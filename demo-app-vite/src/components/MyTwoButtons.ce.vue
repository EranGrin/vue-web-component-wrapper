<script setup lang="ts">

const props = defineProps({
  countDefault: {
    type: String,
    default: '1000',
  },
});

const count = ref(parseInt(props.countDefault));

</script>

<script lang="ts">
import { ref } from 'vue';

const count2 = ref(0);

export default {
  setup() {
  
  },
  methods: {
    clicked() {
      const delta:number = 2;
      count2.value += delta;
      console.log(`Called, method clicked() ${count2.value}`)
      
    },
  }  
};
</script>

<template>
  <h1>Web Component</h1>
  <div><slot name="prefix" /></div>
  <br />
  <br />
  <text>Start from count-default, Increased by count++</text>
  <br />
  <button type="button" @click="count++">+1 by one click {{ count }}</button>

  <br />
  <br />
  <text>Increased by clicked() method</text>
  <br />
  <button type="button" @click="clicked">+2 by one click {{ count2 }}</button>
</template>

<style>
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
