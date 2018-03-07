<template>
  <div>
    <div class="drawer-small" v-if="showUnauth">
      <div class="login" @click="clickLogin">
        Login
      </div>
      <div class="signup" @click="clickSignup">
        Sign up
      </div>
    </div>
    <div class="drawer-large" v-else-if="showLogin">
      <div class="login-form">
        This is the Login
      </div>
    </div>
    <div class="drawer-large" v-else-if="showSignup">
      <form class="signup-form" @submit.prevent="signUpUser">
        <span>Sign Up</span>        
        <input v-model="signup.username" type="text" placeholder="Username">
        <input v-model="signup.password" type="password" placeholder="Password">
        <div class="signup-button">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Drawer',
    data () {
      return {
        showUnauth: true,
        showLogin: false,
        showSignup: false,
        signup: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'signUpFirebase'
      ]),
      clickLogin: function () {
        this.showUnauth = false
        this.showLogin = true
      },
      clickSignup: function () {
        this.showUnauth = false
        this.showSignup = true
      },
      signUpUser: function () {
        if (!this.signup.password || !this.signup.username) {
          console.log('one of these fields are incomplete')
        } else {
          // Create user account and store into state
          this.signUpFirebase({'username': this.signup.username, 'password': this.signup.password})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.drawer-small {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 8%;
  background: #35495E;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.9;

  .login, .signup {
    color: white;
    border: 1px solid white;
    height: 36px;
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.drawer-large {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 50%;
  background: #35495E;  
  opacity: 0.9;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .signup-form {
    box-sizing: border-box;
    height: 80%;
    width: 80%;
    display: grid;
    grid-template-rows: 25% 40px 40px 1fr; 
    grid-row-gap: 16px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;  
    }

    .signup-button {
      position: relative;

      button {
        position: absolute;
        right: 15px;
        top: 15px;
      }
    }
  }
}
</style>