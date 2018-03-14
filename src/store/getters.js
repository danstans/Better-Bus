export default {
  getSpecificBusStop (state) {
    // return the specific bus stop schedule at the currne timte.
    return state.busStopSchedule
  },
  getUserState (state) {
    return state.userState
  }
}
