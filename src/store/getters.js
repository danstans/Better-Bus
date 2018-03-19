import { firebase } from './utils/firebase'

export default {
  getSpecificBusStop (state) {
    // return the specific bus stop schedule at the currne timte.
    return state.busStopSchedule
  },
  getUserState (state) {
    return state.userState
  },
  getDensityEmoji: function (state) {
    firebase.database().ref('/busstops').on('value', (response) => {
      console.log(response.val()[1341].avgRating)
      return response.val()
    })
  }
}
