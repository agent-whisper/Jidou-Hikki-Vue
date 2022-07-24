<template>
  <b-container>
    <div fluid class="card">
      <div class="card-body">
        <b-container>
          <b-row>
            <b-col>
              <img src="/notebook-sample.png" style="max-width: 650px" />
            </b-col>
            <b-col>
              <div class="card-title">
                <h3>About Jidou-Hikki</h3>
              </div>
              <div class="container">
                <div class="row">
                  <p>
                    Jidou-Hikki (literally translates to "automatic notes") is a
                    tool to help beginner Japanese learners read and collect
                    vocabularies.
                  </p>
                  <p>
                    It's especially usefull for learning song lyrics and reading
                    web novel. Just paste in the text and the app will
                    automatically take notes of the vocabularies as well as
                    adding toggleable furigana on the kanjis.
                  </p>
                </div>
                <div align="right">
                  <p>© 2022 Fariz Tumbuan</p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>
