<template>
    <div class="bus-map">
      <modal class="busstop-modal" width="80%" height="60%" name="bus-times-modal">
        <div class="busstop-nav">
          <span @click="showBusSchedule = true">Bus Schedule</span>
          <span @click="showBusSchedule = false">Bus Stop Information</span>
        </div>
        <div class="busstop-contents">
          <span class="busstop-name">
            {{(selectedBusStop.bus || {}).name}}          
          </span>
          <div v-if="showBusSchedule">
            <div v-for="(times, bus) in selectedBusStop.routes" :key="bus">
              {{bus}}
              <div v-for="(time, index) in times" :key="index">
                {{time.time}}
              </div>
            </div>
          </div>

          <div class="stop-information" v-else>
            <div class="bus-density">
              <span>Bus Stop Density:</span>
              <span>:D</span>
            </div>
            <div class="bus-density-selector">
              this is the bus density selector
            </div>
          </div>
        </div>
      </modal>

      <gmap-map
        :center="{lat: 36.988602, lng: -122.058505}"
        :zoom="14"
        :zoomControl="false"
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
        selectedBusStop: {},
        showBusSchedule: true
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
        this.showBusSchedule = true
        this.$modal.show('bus-times-modal')
      }
    }
  }
</script>

<style lang="scss" scoped>
.bus-map {
  height: 100%;
}

.busstop-modal {
  .busstop-nav {
    height: 40px;
    background: white;
    background: blue;
    display: flex;

    >span {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .busstop-contents {
    background: yellow;
    height: calc(100% - 40px);
    overflow: auto;
    display: flex;
    flex-direction: column;

    .busstop-name {
      background: grey;
      min-width: 100%;
      min-height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
