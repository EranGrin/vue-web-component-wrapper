<template>
  <div>
    <h1 class="test2 text-2xl bg-blue-400 rounded-xl p-4">
      I am a route 2
      <span class=".nest text-4xl">Test SCSS</span>

      <a href="http://localhost:5173/#/test1?param=test" target="blank">http://localhost:8080/?param=1</a>
    </h1>
  </div>
</template>

<script lang="ts">
export default {
  created() {
      // this.$route.query.param;
      console.log(this.$route.query.param);
      console.log("created")
    },
}

</script>

<style scoped lang="scss">
.test2 {
  color: red;
  span {
    color: blue;
  }
}
</style>
