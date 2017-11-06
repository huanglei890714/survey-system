<template>
  <div id="das">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
body {
  margin: 0px auto;
  width: 1000px
}
#das {
  height: 900px;
  background: url(./../assets/bg.gif);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
</style>
