<template>
  <div id="test">Hello, Web Component!</div>
  <other-component/>
</template>

<script lang="ts">
import OtherComponent from './OtherComponent.vue';
export default {
  components: { OtherComponent },
  name: 'MyComponent',
}
</script>

<style scoped>
#test {
  color: blue;
}
</style>
