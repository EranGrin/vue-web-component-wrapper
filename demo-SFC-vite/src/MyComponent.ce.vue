<template>
  <div id="test">Hello, Web Component!</div>
  <slot></slot>
</template>

<script lang="ts">
export default {
  name: 'MyComponent',
}
</script>

<style scoped>
#test {
  color: blue;
}
</style>
