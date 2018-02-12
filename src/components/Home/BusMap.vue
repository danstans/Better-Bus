<template>
  <div class="bus-map">
    <gmap-map
      :center="{lat: 36.989455, lng: -122.058457}"
      :zoom="14"
      style="width: 100%; height: 100%"
      >

      <gmap-marker
        :key="index"
        v-for="(bus, index) in markers"
        :position="bus.position"
       />
    </gmap-map>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'BusMap',
    created () {
      this.getBusMarkers()
    },
    data () {
      return {
        markers: []
      }
    },
    methods: {

      getBusMarkers () {
        setInterval(function () {
          axios.get('http://bts.ucsc.edu:8081/location/get').then(response => {
            var markersData = []
            response.data.forEach(bus => {
              var busData = {}
              busData.position = {lat: bus.lat, lng: bus.lon}
              busData.type = bus.type
              busData.id = bus.id
              markersData.push(busData)
            })
            this.markers = markersData
            console.log(this.markers)
          }).catch(err => {
            console.log(err)
          })
        }.bind(this), 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
.bus-map {
  height: 90%;
}
</style>