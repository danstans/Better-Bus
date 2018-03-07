import { firebase } from './utils/firebase'

export default {
  signUpFirebase: function ({commit}, payload) {
    console.log('you aer here in sign up')
    console.log(`the value of the payload is ${payload}`)
    console.log(`The value of username is ${payload.username}`)
    firebase.auth().createUserWithEmailAndPassword(payload.username, payload.password).then(response => {
      console.log('user signed in')
      commit('SET_USER_STATE', true)
    }).catch(err => {
      console.log(err)
    })
  }
}
