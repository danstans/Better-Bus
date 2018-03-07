const _ = require('lodash')
const moment = require('moment')
const fs = require('fs')

const busesStartTimes = require('./startTimes.json')
const busStops = require('./busStops.json')
const timeIntervals = require('./timeIntervals.json')

const busData = {}

_.each(busesStartTimes, (busStartTimes, busRoute) => {
  _.each(busStartTimes, (startTime) => {
    let startTimeUCT = moment(startTime, 'hh:mmA')
    let busRouteStops
    let busRouteIntervals
    if (busRoute % 2 === 1) {
      busRouteStops = busStops.odd
      busRouteIntervals = timeIntervals.odd
    } else if (busRoute === 10) {
      busRouteStops = busStops.even10
      busRouteIntervals = timeIntervals.even10
    } else if (busRoute === 16) {
      busRouteStops = busStops.even16
      busRouteIntervals = timeIntervals.even16
    } else {
      busRouteStops = busStops.even
      busRouteIntervals = timeIntervals.even
    }

    for (let i in busRouteStops) {
      let busStop = busRouteStops[i]
      let interval = timeIntervals[i]
      let busTime = {
        busRoute: busRoute,
        time: startTimeUCT.add(interval, 'minutes').format('hh:mmA')
      }
      busData[busStop] ? busData[busStop].push(busTime) : (busData[busStop] = []).push(busTime)
    }
  })
})
fs.writeFileSync('./data.json', JSON.stringify(busData, null, 2), 'utf-8')
