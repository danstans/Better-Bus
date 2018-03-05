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
    for (let i in busStops) {
      let busStop = busStops[i]
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
