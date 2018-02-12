<template>
  <div class="home">
    <bus-map/>
    <drawer/>
  </div>
</template>

<script>
import Drawer from './Home/Drawer'
import BusMap from './Home/BusMap'
export default {
  name: 'home',
  components: { Drawer, BusMap },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
}
</style>
