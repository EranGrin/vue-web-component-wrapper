<template>
  <OtherComponent>
    <div><slot></slot></div>
  </OtherComponent>
</template>
  
<script lang="ts">
import OtherComponent from './OtherComponent.ce.vue'
  export default {
    name: 'OtherComponentSuper',
    components: {
      OtherComponent
    }
  }
</script>
  
<style>
  div {
    color: green;
  }
</style>
  