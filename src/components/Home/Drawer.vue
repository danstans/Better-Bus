<template>
  <div @click="showLargeDrawer = !showLargeDrawer">
    <div class="drawer-small" v-if="!showLargeDrawer">
      This is the small drawer
    </div>
    <div class="drawer-large" v-else>
      This is the large drawer
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Drawer',
    data () {
      return {
        showLargeDrawer: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.drawer-small {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 8%;
  background: #35495E; 
  opacity: 0.9; 
}

.drawer-large {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 50%;
  background: #35495E; 
  opacity: 0.9; 
}
</style>