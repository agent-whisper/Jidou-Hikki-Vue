import Cookies from 'js-cookie'

export const state = () => ({})

export const getters = {
  getProfile () {
    console.log('GET COOKIE')
    const profile = {
      username: Cookies.get('username'),
      email: Cookies.get('email'),
      first_name: Cookies.get('first_name'),
      last_name: Cookies.get('last_name')
    }
    return profile
  }
}

export const mutations = {}

export const actions = {
  async login ({ state, commit, getters, dispatch }, credentials) {
    await this.$axios.$get('/api/auth/csrf-token')
    const profile = await this.$axios.$post(
      '/api/auth/login',
      JSON.stringify(credentials),
      {
        headers: {
          'content-type': 'application/json'
        },
        withCredentials: true
      }
    )
    Cookies.set('username', profile.username)
    Cookies.set('email', profile.email)
    Cookies.set('first_name', profile.first_name)
    Cookies.set('last_name', profile.last_name)
    console.log('SET COOKIE')
  },
  async logout ({ dispatch, commit }) {
    await this.$axios.$post('/api/auth/logout', null, {
      withCredentials: true
    })
    Cookies.remove('username')
    Cookies.remove('email')
    Cookies.remove('first_name')
    Cookies.remove('last_name')
    console.log('REMOVED COOKIE')
  }
}
