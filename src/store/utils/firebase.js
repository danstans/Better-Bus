const firebase = require('firebase')
var config = {
  apiKey: 'AIzaSyBM26bift4_WRrDHbW83l5Y4DMIKv4zS7s',
  authDomain: 'better-bus.firebaseapp.com',
  databaseURL: 'https://better-bus.firebaseio.com',
  projectId: 'better-bus',
  storageBucket: 'better-bus.appspot.com',
  messagingSenderId: '62060816884'
}

firebase.initializeApp(config)

export {
  firebase
}
