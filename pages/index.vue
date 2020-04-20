<template>
  <div class="container">
    <!-- <client-only> -->
    <!-- <Map/> -->
  <!-- </client-only> -->
    <div>
      <h1 class="title">
        深圳 SHENZHEN
      </h1>
      <h2 class="subtitle">
        a story of grow and its livability in three aspects.
      </h2>


      <div class="links">

        <nuxt-link to="/shenzhenstory"
                  class="button--grey"
              >Start</nuxt-link>

        <a
          href="https://github.com/shuvitRan/msdv-thesis"
          target="_blank"
          class="button--grey"
        >
          Documentation
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Map from '~/components/Map'

export default {
  components: {
    Logo, Map
  }
}
</script>

<style>
/* nuxt-link{
  text-decoration: none;
} */
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
