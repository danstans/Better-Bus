<template>
    <div class="bus-map">
      <modal class="busstop-modal" width="80%" height="80%" name="bus-times-modal">
        <b-tabs class="busstop-modal-tabs">
          <b-tab title="Bus Schedule" active>
            <b-card :title="(selectedBusStop.bus || {}).name">
              <b-table :items="selectedBusStop.tableItems"></b-table>
            </b-card>
          </b-tab>
          <b-tab class="busstop-modal-tab" title="Bus Stop Information" >
            <b-card :title="(selectedBusStop.bus || {}).name">
              <div class="bus-density" >
                <div class="bus-density-info">
                  <span>Bus Stop Density:</span>
                  <div class="current-density">
                    <!-- <span>😺</span> -->
                    <span>{{this.getDensityEmoji}}</span>    
                  </div>
                </div>
                <div class="bus-density-selector">
                  <div>
                    <span @click="selectCat(0)">😿</span>
                    <span @click="selectCat(1)">😾</span>
                    <span @click="selectCat(2)">😺</span>
                    <span @click="selectCat(3)">😻</span>
                  </div>
                </div>
              </div>
            </b-card>
          </b-tab>
        </b-tabs>
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
          :icon="bus.img"
        />

        <gmap-marker
          v-for="(bus, index) in busStopMarkers"
          :position="bus.position"
          :icon="bus.type === 'odd' ? 'static/bus-stop-odd.png' : 'static/bus-stop-even.png'"
          @click="showBusTimes(bus)"
        />
      </gmap-map>
    </div>
</template>

<script>
  import axios from 'axios'
  import busStops from './busStops.js'
  import https from 'https'
  import moment from 'moment'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BusMap',
    created () {
      this.getBusMarkers()
    },
    computed: {
      ...mapGetters([
        'getSpecificBusStop',
        'getUserState',
        'getDensityEmoji'
      ])
    },
    data () {
      return {
        busMarkers: [],
        busStopMarkers: busStops,
        selectedBusStop: {},
        showBusSchedule: true,
        currentlySelectedBusStop: null
      }
    },
    methods: {
      ...mapActions([
        'updateFirebaseDatabase'
      ]),
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
                if (bus.type === 'LOOP') {
                  busData.img = 'static/lower.png'
                } else if (bus.type === 'UPPER CAMPUS') {
                  busData.img = 'static/upper.png'
                }
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
        let routes = this.getSpecificBusStop[bus.id]
        routes = routes.sort((a, b) => {
          if (moment(a.time, 'hh:mmA').isBefore(moment(b.time, 'hh:mmA'))) {
            return -1
          } else if (moment(b.time, 'hh:mmA').isBefore(moment(a.time, 'hh:mmA'))) {
            return 1
          }
          return 0
        })
        let tableItems = []
        let now = moment()
        for (let item of routes) {
          if (moment(item.time, 'hh:mmA').isAfter(now)) {
            tableItems.push({time: item.time, route: item.busRoute}) // eslint-disable-line
          }
        }
        tableItems = tableItems.slice(0, 10)

        this.selectedBusStop = {
          bus,
          routes,
          tableItems
        }
        this.showBusSchedule = true
        this.currentlySelectedBusStop = bus.id
        this.$modal.show('bus-times-modal')
      },
      selectCat (catVal) {
        var catEmoji = ''
        switch (catVal) {
          case 0:
            catEmoji = '😿'
            break
          case 1:
            catEmoji = '😾'
            break
          case 2:
            catEmoji = '😺'
            break
          case 3:
            catEmoji = '😻'
            break
        }
        this.updateFirebaseDatabase({'catVal': catVal, 'busID': this.currentlySelectedBusStop})
        this.$toasted.show(`${catEmoji} response logged`, {
          theme: 'outline',
          position: 'top-center',
          duration: 5000
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.bus-map {
  height: 100%;
}

.busstop-modal {

  .busstop-modal-tabs {
    height: 100%;

    .busstop-modal-tab {
      height: 100%;

      .bus-density {
        height: 500px;
        display: flex;
        flex-direction: column;

        .bus-density-info {

          span {
            height: 30px;
          }
          
          .current-density {
            height: 380px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 96px;
          }
        }

        .bus-density-selector {
          flex-grow: 1;
          display: flex;
          align-items: flex-end;
          
          >div {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            font-size: 40px;
            height: 120px;

            span {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
