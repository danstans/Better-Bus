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
      <form class="login-form" @submit.prevent="loginUser">
        <div class="exit-button" @click="clickClose">
          <button type="submit">Close</button>
        </div>
        <span>Log In</span>        
        <input v-model="login.email" type="text" placeholder="Email">
        <input v-model="login.password" type="password" placeholder="Password">
        <div class="login-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    <div class="drawer-large" v-else-if="showSignup">
      <form class="signup-form" @submit.prevent="signUpUser">
        <div class="exit-button" @click="clickClose">
          <button type="submit">Close</button>
        </div>
        <span>Sign Up</span>        
        <input v-model="signup.email" type="text" placeholder="email">
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
          email: '',
          password: ''
        },
        login: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'signUpFirebase',
        'loginUserFirebase'
      ]),
      clickLogin: function () {
        this.showUnauth = false
        this.showLogin = true
      },
      clickSignup: function () {
        this.showUnauth = false
        this.showSignup = true
      },
      clickClose: function () {
        this.showUnauth = true
        this.showSignup = false
        this.showLogin = false
      },
      signUpUser: function () {
        if (!this.signup.password || !this.signup.email) {
          console.log('one of these fields are incomplete')
        } else {
          // Create user account and store into state
          this.signUpFirebase({'email': this.signup.email, 'password': this.signup.password})
        }
      },

      loginUser: function () {
        if (!this.login.password || !this.login.email) {
          console.log('one of these fields are incomplete')
        } else {
          this.loginUserFirebase({'email': this.login.email, 'password': this.login.password})
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
    grid-template-rows: 5px 25% 40px 40px 1fr; 
    grid-row-gap: 16px;

    .exit-button {
      margin-top: -10px;
      padding-left: 450px;

    }
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

  .login-form {
    box-sizing: border-box;
    height: 80%;
    width: 80%;
    display: grid;
    grid-template-rows: 5px 25% 40px 40px 1fr; 
    grid-row-gap: 16px;

    .exit-button {
      margin-top: -10px;
      padding-left: 450px;

    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;  
    }

    .login-button {
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