<template>
  <div class="bus-map">
    <gmap-map
      :center="{lat: 36.989455, lng: -122.058457}"
      :zoom="14"
      style="width: 100%; height: 100%"
      >

      <gmap-marker
        :key="index"
        v-for="(bus, index) in busMarkers"
        :position="bus.position"
       />
       <gmap-marker
        :key="index"
        v-for="(bus, index) in busStopMarkers"
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
        busMarkers: [],
        busStopMarkers: [
          {
            position: {lat: 36.994270, lng: -122.055512},
            name: 'Hagar & East Field House'
          },
          {
            position: {lat: 36.990617, lng: -122.066132},
            name: 'Oakes College'
          }
        ]
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
            this.busMarkers = markersData
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