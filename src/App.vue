<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Frame from './components/Frame'
export default {
  name: 'app',
  components: { Frame }
}
</script>

<style>
@import url('https://meyerweb.com/eric/tools/css/reset/reset.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
