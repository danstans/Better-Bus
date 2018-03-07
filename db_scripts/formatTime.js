const moment = require('moment')
var arr = ['7:50am','8:50am','9:50am','10:50am','11:50am','12:20pm','12:50pm','1:20pm','1:50pm','2:20pm','2:50pm','3:20pm','3:50pm','4:20pm','4:50pm','5:20pm','5:50pm','6:20pm','6:50pm','7:20pm'																			]
var times = []

for (let time of arr) {
  times.push(moment(time, 'hh:mmA').add(10, 'minutes').format('hh:mmA'))
}
console.log(JSON.stringify(times))
