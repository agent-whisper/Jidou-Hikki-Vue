<template>
  <div>
    <NavBar />
    <b-container height="100%">
      <b-row>
        <Nuxt />
      </b-row>
      <b-row align-v="end">
        <!-- <FooterComponent /> -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'DefaultLayout',
  components: { NavBar },
}
</script>

<style>
footer {
  width: 100%;
  height: 40px;
}
</style>
