<template>
  <b-container>
    <b-container class="mb-3">
      <b-row align-h="between">
        <h1>Notebooks</h1>
        <b-button variant="primary" to="/notebooks/new"
          >Create New Notebook</b-button
        >
      </b-row>
    </b-container>
    <b-card>
      <b-list-group v-for="item in notebooks" :key="item.id">
        <b-list-group-item flex align-h="between">
          <span
            :nbook-id="item.id"
            @click="onItemClicked"
            style="cursor: pointer"
          >
            {{ item.title }}
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      notebooks: [],
      count: 0,
    }
  },
  async fetch() {
    try {
      const res = await this.$axios.$get('/api/notebooks')
      this.notebooks = res.items
      this.count = res.count
    } catch (err) {
      this.$store.dispatch('profile/logout')
      this.$router.push(`/login?back=${window.location.href}`)
    }
  },
  methods: {
    onItemClicked(event) {
      const notebookID = event.target.attributes['nbook-id'].value
      this.$router.push(`/notebooks/${notebookID}`)
    },
  },
}
</script>

<style>
</style>