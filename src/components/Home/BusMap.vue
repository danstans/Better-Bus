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
        icon="static/bus.png"
       />

       <gmap-marker
        v-for="(bus) in busStopMarkers"
        :key="bus.id"
        :position="bus.position"
        icon="static/bus-stop.png"
        @click="showBusTimes(bus.id)"
       />
    </gmap-map>
  </div>
</template>

<script>
  import axios from 'axios'
  import busStops from './busStops.js'
  import https from 'https'
  import { mapGetters } from 'vuex'
  export default {
    name: 'BusMap',
    created () {
      this.getBusMarkers()
    },
    computed: {
      ...mapGetters([
        'getSpecificBusStop'
      ])
    },
    data () {
      return {
        busMarkers: [],
        busStopMarkers: busStops
      }
    },
    methods: {
      getBusMarkers () {
        const agent = new https.Agent({
          rejectUnauthorized: false
        })
        setInterval(function () {
          axios.get('http://bts.ucsc.edu:8081/location/get', { httpsAgent: agent }).then(response => {
            var markersData = []
            response.data.forEach(bus => {
              if (bus.type !== 'OUT OF SERVICE/SORRY') {
                var busData = {}
                busData.position = {lat: bus.lat, lng: bus.lon}
                busData.type = bus.type
                busData.id = bus.id
                markersData.push(busData)
              }
            })
            this.busMarkers = markersData
          }).catch(err => {
            console.log(err)
          })
        }.bind(this), 500)
      },
      showBusTimes (busID) {
        console.log(busID)
        console.log(this.getSpecificBusStop[busID])
        // this.getSpecificBusStop(busID)
      }
    }
  }
</script>

<style lang="scss" scoped>
.bus-map {
  height: 90%;
}
</style>
