<template>
  <b-container class="mb-5">
    <b-row>
      <b-col cols="8">
        <div class="card">
          <div class="card-header">
            <h2 v-html="notebook.title_html || notebook.title"></h2>
            <h5 class="card-subtitle mb-2 text-muted">
              {{ notebook.description }}
            </h5>
          </div>
          <div class="card-body">
            <div
              id="page-container"
              style="font-size: 22px"
              v-html="notebook.content_html || notebook.content_html"
            ></div>
          </div>
        </div>
      </b-col>
      <b-col>
        <b-card :header="`Words (${notebook.word_list.length})`">
          <b-list-group>
            <b-list-group-item
              v-for="item in notebook.word_list"
              :key="item.word_id"
              style="font-size: 18px"
              >{{ item.word }} ({{ item.count }})</b-list-group-item
            >
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'NotebookPages',
  data() {
    return {
      notebook: {
        id: '',
        title: '',
        title_html: '',
        content: '',
        content_html: '',
        description: '',
        created_at: '',
        modified_at: '',
        word_list: [],
      },
    }
  },
  async fetch() {
    try {
      const notebook = await this.$axios.get(
        `/api/notebooks/${this.$route.params.notebook_id}`
      )
      this.notebook = notebook.data
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        this.$store.dispatch('profile/logout')
        this.$router.push(`/login`)
      }
    }
  },
  mounted() {
    this.injectClickListener()
    // const furigana_toggle = document.getElementById('furigana-toggle')
    // furigana_toggle.setAttribute('data-furigana-state', 'show_all')
  },
  updated() {
    this.injectClickListener()
  },
  methods: {
    injectClickListener() {
      const kanjis = document.querySelectorAll('#page-container > * > ruby')
      const app = this
      ;[...kanjis].forEach(function (w) {
        w.onclick = app.onWordClicked
        w.onmouseover = ''
        w.style = 'cursor: pointer;'
        w.childNodes[2].style.display = ''
      })
    },
    onWordClicked(event) {
      // Get other word instances
      const wordID =
        event.originalTarget.parentElement.attributes['data-word-id'].value
      const words = document.querySelectorAll(`ruby[data-word-id="${wordID}"]`)
      words.forEach((x) => {
        if (x.childNodes[2].style.display === 'none') {
          x.childNodes[2].style.display = ''
        } else {
          x.childNodes[2].style.display = 'none'
        }
      })
    },

    // toggleAllFurigana(el) {
    //   kanjis = document.querySelectorAll('#page-container > * > ruby')
    //   if (el.getAttribute('data-furigana-state') == 'show_all') {
    //     console.log('Hiding all furigana')
    //     el.setAttribute('data-furigana-state', 'hidden')
    //   } else {
    //     console.log('Showing all furigana')
    //     el.setAttribute('data-furigana-state', 'show_all')
    //   }
    //   ;[...kanjis].forEach(function (w) {
    //     if (el.getAttribute('data-furigana-state') == 'show_all') {
    //       w.childNodes[2].style.display = ''
    //     } else {
    //       w.childNodes[2].style.display = 'none'
    //     }
    //   })
    // },
  },
}
</script>

<style>
</style>
