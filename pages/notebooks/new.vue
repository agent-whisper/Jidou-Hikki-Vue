<template>
  <div class="container mx-10">
    <b-card header="New Notebook">
      <b-form @submit="onSubmit">
        <b-form-group
          id="title-input-group"
          label="Title"
          label-for="title"
          label-cols-sm="4"
          label-cols-lg="4"
          content-cols-sm
          content-cols-lg="7"
        >
          <b-form-input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Enter title"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="description-input-group"
          label="Description"
          label-for="description"
          label-cols-sm="4"
          label-cols-lg="4"
          content-cols-sm
          content-cols-lg="7"
        >
          <b-form-input
            id="description"
            v-model="form.description"
            type="text"
            placeholder="Enter description"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="content-input-group"
          label="Description"
          label-for="content"
          label-cols-sm="4"
          label-cols-lg="4"
          content-cols-sm
          content-cols-lg="7"
        >
          <b-form-textarea
            id="content"
            v-model="form.content"
            placeholder="Enter notes"
            rows="3"
            max-rows="8"
          ></b-form-textarea>
        </b-form-group>
        <div class="d-flex felx-row-reverse">
          <b-button
            type="submit"
            variant="primary"
            v-bind="{ disabled: submitInProgress }"
            >Submit</b-button
          >
        </div>
      </b-form>
    </b-card>
    <b-alert v-model="showError" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'NewNotebookPage',
  data() {
    return {
      showError: false,
      errorMessage: '',
      form: {
        title: '',
        description: '',
        content: '',
      },
      submitInProgress: false,
    }
  },
  methods: {
    async onSubmit(event) {
      try {
        event.preventDefault()
        this.submitInProgress = true
        await this.$axios.post('/api/notebooks/', JSON.stringify(this.form))
      } catch (err) {
        this.errorMessage = String(err)
        this.showError = true
      } finally {
        this.submitInProgress = false
        this.$router.push('/notebooks')
      }
    },
  },
}
</script>

<style>
</style>
