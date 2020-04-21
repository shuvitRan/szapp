<template>
<div >


  <Map mapStyle="mapbox://styles/randanfx/ck99glwc30uwk1ipbue3ie1hb" />
  <div class="container">
    <!-- <client-only> -->

  <!-- </client-only> -->
    <div>
      <div class ='titleContainer'>
        <h1 class="chtitle">
          深圳
        </h1>
        <h1 class="title">SHENZHEN</h1>
      </div>

      <h2 class="subtitle">
        the growth and livability of a mega city.
      </h2>


      <div class="links">

        <nuxt-link to="/shenzhenstory"
                  class="button--grey"
              >start</nuxt-link>

        <a
          href="https://github.com/shuvitRan/msdv-thesis"
          target="_blank"
          class="button--grey"
        >
          documentation
        </a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Map from '~/components/Map'

export default {
  components: {
    Map
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
.titleContainer{
  margin-bottom: -20px;
  padding-bottom: 0px;
}
.chtitle {
  font-family:  'Noto Serif JP','Ma Shan Zheng',serif;
  /* font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
  display:inline-block;
  font-weight: 700;
  font-size: 100px;
  color: #fcfcfc;
  letter-spacing: 10px;
  word-spacing: 10px;
}
.title {
  /* font-family: 'Helvetica Neue', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Arial, sans-serif; */
    font-family: 'Noto Sans JP', sans-serif;
  display:inline-block;
  font-weight: 400;
  font-size: 80px;
  color: #fcfcfc;
  letter-spacing: 5px;
}

.subtitle {

font-family: 'Noto Sans JP', sans-serif;
  font-weight: 200;
  font-size: 35px;
  color: #ececec;
  word-spacing: 10px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
