<template>
  <div class="bus-map">
    <modal name="bus-times-modal" height="auto" scrollable>
      {{(selectedBusStop.bus || {}).name}}<br><br>
      <div v-for="(times, bus) in selectedBusStop.routes" :key="bus">
        {{bus}}
        <div v-for="(time, index) in times" :key="index">
          {{time.time}}
        </div>
        <br>
      </div>
    </modal>
    <gmap-map
      :center="{lat: 36.989455, lng: -122.058457}"
      :zoom="14"
      style="width: 100%; height: 100%"
      >

      <gmap-marker
        v-for="(bus, index) in busMarkers"
        :position="bus.position"
        icon="static/bus.png"
       />

       <gmap-marker
        v-for="(bus, index) in busStopMarkers"
        :position="bus.position"
        icon="static/bus-stop.png"
        @click="showBusTimes(bus)"
       />
    </gmap-map>
  </div>
</template>

<script>
  import _ from 'lodash'
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
        busStopMarkers: busStops,
        selectedBusStop: {}
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
      showBusTimes (bus) {
        let routes = _.groupBy(this.getSpecificBusStop[bus.id], 'busRoute')

        this.selectedBusStop = {
          bus: bus,
          routes: routes
        }
        console.log(this.selectedBusStop.routes)
        this.$modal.show('bus-times-modal')
      }
    }
  }
</script>

<style lang="scss" scoped>
.bus-map {
  height: 100%;
}
</style>
