<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>Register</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="email" id="email" v-model="email">
                <label for="email">Email Address</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password">
                <label for="password">Password</label>
              </div>
              <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
              <div class="container" v-if="error.length">
                <div class="card-panel red white-text">
                  {{error}}
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "Register",
  data () {
    return {
      email: '',
      password: '',
      error: []
    }
  },

  methods: {
    register (e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        alert(`Account Created for ${user.user.email}`);
          this.$router.go({path: this.$router.path})
      },
      err => {
        this.error = err.message
      })
      e.preventDefault();
    }
  }
}
</script>
