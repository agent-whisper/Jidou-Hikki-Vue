<template>
  <div class="container mx-10">
    <b-card header="Login">
      <b-row align-v="center" fluid class="px-4">
        <b-form v-if="show" @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="login-input-group"
            label="Username"
            label-for="username"
            label-cols-sm="4"
            label-cols-lg="4"
            content-cols-sm
            content-cols-lg="7"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="login-input-group"
            label="Password"
            label-for="password"
            label-cols-sm="4"
            label-cols-lg="4"
            content-cols-sm
            content-cols-lg="7"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>

          <div class="d-flex felx-row-reverse">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </b-form>
      </b-row>
    </b-card>
    <b-alert v-model="showLoginError" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      show: true,
      showLoginError: false,
      errorMessage: '',
    }
  },
  methods: {
    async beforeMount() {
      try {
        // Check if already logged in
        this.showLoginError = false
        await this.$axios.$get('/api/auth/session')
        console.log('Already logged in')
        this.$router.push('/home')
      } catch (err) {
        if (err.response.status === 403) {
          console.log('Login required')
        } else {
          this.errorMessage = 'Cannot connect to authentication gateway.'
          this.showLoginError = true
        }
      }
    },
    async onSubmit(event) {
      try {
        event.preventDefault()
        this.showLoginError = false
        await this.$store.dispatch('profile/login', this.form)
        this.$router.push('/notebooks')
        window.location.href = '/notebooks'
        // this.$router.push('/notebooks')
      } catch (err) {
        this.reset()
        if (err.response.status === 401) {
          this.errorMessage = 'Wrong username or password.'
        } else if (err.response.status === 403) {
          this.errorMessage = 'Authentication request incomplete.'
        } else {
          this.errorMessage = 'Cannot connect to authentication gateway.'
        }
        this.showLoginError = true
      }
    },
    onReset(event) {
      event.preventDefault()
      this.reset()
    },
    reset() {
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

<style>
</style>
