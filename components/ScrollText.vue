<template>
<div>
  <!-- <Map :currentStep='currStep' :chapterData='chapters' :currentYear='chpYear' :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" /> -->
  <vueMap :currentStep='currStep' :chapterData='chapters' :currentYear='chpYear' :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" />
  <!-- <vueMap :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" /> -->
  <div class="intro">
    <p>scroll to view</p>
  </div>
  <!-- <Scrollama
      :debug="true"
      :offset="0.5"
      @step-enter="({ element }) => (currStep = element.dataset.stepNo)"
      @step-exit="({ element }) => (currStep = null)"> -->
  <Scrollama :debug="false" :offset="0.5" @step-enter="stepEnterHandler">
    <!-- @step-exit="({ element }) => (currStep = null)"> -->
    <div class="step" v-for="n in chapters" :key="n.chapter" :data-step-no="n.chapter" :data-cpt-year="n.year" :data-cpt-population="n.population" :data-cpt-gdp="n.GDP" :class="{ active: n.chapter == currStep }">
      {{ n.description}}
    </div>
    <!-- <div v-for="n in 4"
        :key="n"
        class="step"
        :data-step-no="n"
        :class="{ active: n == currStep }">
      step {{ n }}
    </div> -->
    <div class="graphic" slot="graphic" v-if="chpYear!=undefined">
      <!-- hello {{ currStep }}{{currentYear}} -->
      <div class="year">
        {{chpYear}}
      </div>
      <div class="otherIndex">
        GDP: ￥{{chpGDP}} million
      </div>
      <div class="otherIndex">
        Permenent Population: {{chpPop}} K
      </div>
    </div>
    <!-- <div class="graphic" slot="graphic"> hello {{ currStep }}</div> -->

  </Scrollama>

  <div class="outro">
    <p>Select a section</p>
    <div class="links">

      <!-- <nuxt-link to="/threeAspects" class="button--grey">Livability in Three Aspects</nuxt-link> -->
    </div>
    <nuxt-link to="/index" class="button--grey">Statistic </nuxt-link>
  </div>
</div>

</div>
</template>


<script>
// import Map from '~/components/Map'
import vueMap from '~/components/vueMap'
// import scrollama from "scrollama";
import 'intersection-observer' // for cross-browser support
import Scrollama from 'vue-scrollama'

import chapterdata from '~/assets/Chapters.json'



export default {
  name: 'SrcollText',
  components: {
    Scrollama,
    vueMap
  },
  data() {
    return {
      scrollState: false,
      currStep: null,
      chapters: chapterdata,
      chpYear: null,
      chpGDP: null,
      chpPop: null
    }
  },

  computed: {




  },
  methods: {
    stepEnterHandler({
      element,
      index,
      // 'data-step-no',
      direction
    }) {

      this.currStep = parseInt(element.dataset.stepNo);
      // handle the step-event as required here
      // console.log(element, index, direction)
      // console.log(element.dataset.cptYear)
      this.chpYear = element.dataset.cptYear;
      this.chpGDP = element.dataset.cptGdp;
      this.chpPop = element.dataset.cptPopulation;
      // console.log(this.currStep)
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css">
</style>

</style>
<style scoped>
/* .scrollama-container {
  display: flex;
  .scrollama-graphic {
    flex: 1;
    height: 80vh;
    top: 10vh;
  }
  .scrollama-steps {
    flex: 1;
  }
} */

.intro {
  background-color: rgba(20, 20, 20, 0.95);
  pointer-events: none;
  padding-left: 10vw;
  padding-top: 50vh;
  padding-bottom: 50vh;
  font-size: 1rem;
  /* text-align: left; */
  /* float: left; */
  /* border: 1px solid #ccc; */
  z-index: 10;
  color: white;

}


.outro {
  padding-left:  10vw;
  padding-top: 0vh;
  padding-bottom: 50vh;
  font-size: 1rem;
  /* text-align: center; */
  /* float: center; */
  /* border: 1px solid #ccc; */
  z-index: 10;
  color: white;

}

.outro p{

  font-weight: bolder;
  font-size: 3rem;

}


.graphic {
  height: 100vh;
  margin: 5rem 3rem;
  /* border: 1px solid #ccc; */
  /* background-color: #eee; */
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  text-align: left;
  float: right;
  /* align-items: center;
  justify-content: left; */
}

.year {
  display: block;
  font-weight: bolder;
  font-size: 7rem;
  /* font-style:italic; */

}

.otherIndex {
  display: block;
  font-size: 1rem;
  font-weight: bolder;

}

.step {
  padding: 40vh 0;
  width: 30%;
  /* margin: 0 auto 30vh; */
  margin: 0 10vw;
  margin-bottom: 10vh;
  /* background-color: rgba(212, 111, 149,0.5); */
  /* border: 1px solid #ccc; */
  border: none;
  display: flex;
  align-items: center;
  justify-content: right;
  opacity: 0;
  transition: all 700ms;
  visibility: hidden;
  font-weight: bold;

  /* transform: scale(0.9); */

}

.step.active {
  /* background-color: rgba(212, 0, 149,0.5); */

  visibility: visible;
  opacity: 1;
  text-shadow: 0px 0px 10px #000000;
  color: white;
  /* transform: translateX(200); */
}

.links {
  display: inline-block;
  padding-top: 15px;
}
</style>
