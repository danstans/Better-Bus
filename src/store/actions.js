import { firebase } from './utils/firebase'

export default {
  signUpFirebase: function ({commit}, payload) {
    console.log('you aer here in sign up')
    console.log(`the value of the payload is ${payload}`)
    console.log(`The value of username is ${payload.username}`)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('user signed in')
      commit('SET_USER_STATE', true)
    }).catch(err => {
      console.log(err)
    })
  },

  loginUserFirebase: function ({commit}, payload) {
    console.log(`The value of username is ${payload.email}`)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log('user logged in')
      commit('SET_USER_STATE', firebase.auth().currentUser.uid)
    }).catch(err => {
      console.log(err)
    })
  },

  logoutUserFirebase: function ({commit}) {
    firebase.auth().signOut().then(response => {
      // Sign-out successful.
      console.log('user signed out')
      commit('SET_USER_STATE', false)
    }).catch(err => {
      console.log(err)
    })
  },
  updateFirebaseDatabase: function ({commit}, payload) {
    console.log(`The catval is ${payload.catVal} and the busID is ${payload.busID}`)
    firebase.database().ref(`/busstops/${payload.busID}`).once('value').then(response => {
      var newAvg = ((response.val().avgRating * response.val().numResponses) + payload.catVal) / (response.val().numResponses + 1)
      console.log(`The new average is ${newAvg}`)
      return firebase.database().ref(`/busstops/${payload.busID}`).set({
        'avgRating': newAvg,
        'numResponses': (response.val().numResponses + 1)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
