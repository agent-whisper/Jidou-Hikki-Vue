// import Cookies from 'js-cookie'
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'jh-profile',
    storage: window.localStorage,
    // restoreState: (key, storage) => {
    //   return JSON.parse(Cookies.get(key) || '{}')
    // },
    // saveState: (key, state, storage) => {
    //   Cookies.set(key, JSON.stringify(state.profile), {
        // expires: 3
    //   })
    // },
    modules: ['profile']
  }).plugin(store)
}
