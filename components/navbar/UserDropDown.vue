<template>
  <div>
    <b-nav-item-dropdown v-if="profile.username" right>
      <!-- Using 'button-content' slot -->
      <template #button-content>
        <em>{{ profile.username }} ({{ profile.email }})</em>
      </template>
      <b-dropdown-item href="#" @click="logout">Log Out</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-navbar-nav v-else>
      <b-nav-item to="/login">Login</b-nav-item>
    </b-navbar-nav>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'UserDropDown',
  props: {},
  data() {
    return {
      profile: {
        username: Cookies.get('username'),
        email: Cookies.get('email'),
        first_name: Cookies.get('first_name'),
        last_name: Cookies.get('last_name'),
      },
    }
  },
  computed: {},
  methods: {
    async logout() {
      await this.$axios.$post('/api/auth/logout', null, {
        withCredentials: true,
      })
      Cookies.remove('username')
      Cookies.remove('email')
      Cookies.remove('first_name')
      Cookies.remove('last_name')
      window.location.href = '/home'
    },
  },
}
</script>

<style></style>
