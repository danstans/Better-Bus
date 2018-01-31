<template>
  <div class="frame">
    <div class="frame-left">
      BetterBus
    </div>
    <div class="frame-right">
      Login
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Frame'
  }
</script>

<style lang="scss" scoped>
.frame {
  height: 56px;
  width: 100vw;
  background: #35495E;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  >div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
  }
}
</style>