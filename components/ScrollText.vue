<template>
<div>
  <!-- <Map :currentStep='currStep' :chapterData='chapters' :currentYear='chpYear' :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" /> -->
  <vueMap :currentStep='currStep' :chapterData='chapters' :currentYear='chpYear' :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" />
  <!-- <vueMap :mapStyle="'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'" /> -->
  <div class="intro">
<div class="intro-text">
<!-- <p> <b style="font-size:3rem; line-height: 0.7;">70%</b> of the world population will reside in cities by 2050. In the past decades, numerous special economic zones and free trade zones helped the tremendous growth in the developing world.</p> -->
<p> <b style="font-size:4rem; line-height: 0.7;">70%</b> of the world population will reside in cities by <b>2050</b>. </p>

</div>
<div class="peopleContainers">
  <div class="people-icons" v-for="index in 10" :key="index">
      <i v-if="index<8" style="color:rgba(212, 0, 149,0.5);" class="el-icon-user" ></i>
        <i v-else  style="color:rgba(218, 218, 218, 0.87)" class="el-icon-user" ></i>
  </div>
</div>


    <div class="intro-tip">
      <p class="fade-inNout">scroll</p>
      <i class="el-icon-bottom intro-tip-icon"></i>
    </div>

  </div>
  <!-- <Scrollama
      :debug="true"
      :offset="0.5"
      @step-enter="({ element }) => (currStep = element.dataset.stepNo)"
      @step-exit="({ element }) => (currStep = null)"> -->
  <Scrollama :debug="false" :offset="0.5" @step-enter="stepEnterHandler" @step-exit="stepExitHandler">
    <!-- @step-exit="({ element }) => (currStep = null)"> -->
    <div class="step" v-for="n in chapters" :key="n.chapter" :data-step-no="n.chapter" :data-cpt-year="n.year" :data-cpt-population="n.population" :data-cpt-gdp="n.GDP" :class="{ active: n.chapter == currStep }">



      <p class="step-text" v-html="n.description" v-if="n.chapter!=5&&n.chapter!=6&&n.chapter!=7"></p>

    </div>

    <!-- <transition name="fadeimg" mode="out-in"> -->

    <div class="ChpPicContainer" slot="graphic" v-if="currStep==3" :key="1">

      <img  class="ChpPic"  width="1000" height='auto' src="~/assets/img/sz1979.jpg" alt="Shenzhen 1981" >
      <!-- <p class="picText">《东门街景》1979年 作者：何煌友</p> -->
      <p class="picText">Shenzhen East Gate, 何煌友，1979 </p>
    </div>
    <div class="ChpPicContainer" slot="graphic" v-if="currStep==9" :key="2">

      <img  class="ChpPic"  style="max-width:90%"  src="~/assets/img/sztoday2.jpg" alt="Shenzhen 1981" >
      <!-- <p class="picText">《东门街景》1979年 作者：何煌友</p> -->
      <p class="picText">Shenzhen Futian District, 2019 </p>
    </div>

    <!-- <div class="ChpPicContainer" style="background-color:  rgba(1, 1, 1, 0.0);;align-items: flex-end; " slot="graphic" v-if="currStep==11" :key="3">

      <img  class="ChpPic"  style=" border-radius:1px;animation: 5s appear ;max-width:30%; margin-right:20vw; opacity:0.7;"  src="~/assets/img/tecent.jpg" alt="tencent" >

    </div> -->

  <!-- </transition> -->


    <div class="graphic" slot="graphic" v-if="chpYear!=undefined" >
      <!-- hello {{ currStep }}{{currentYear}} -->
      <div class="year"  >
        {{chpYear}}
      </div>
      <div class="otherIndex" v-if="chpGDP!=undefined">
        GDP: ${{Math.round(chpGDP/7)}} M
      </div>
      <div class="otherIndex" v-if="chpPop!=undefined">
        Permenent Population: {{chpPop*0.001}} M
      </div>
      <div class="otherIndex" v-if="chpGDPper!=undefined">
        GDP Per Capita: $ {{Math.round(chpGDPper/7)}}
      </div>
      <div class="otherIndex" v-if="chpWage!=undefined">
        Ave. Wage Per Year: $ {{Math.round(chpWage/7)}}
      </div>
      <div class="otherIndex" v-if="chpResi!=undefined">
        Ave. Residential Price: $ {{ Math.round(chpResi/7)}} per/m²
      </div>
    </div>



    <!-- <div class="graphic" slot="graphic"> hello {{ currStep }}</div> -->

  </Scrollama>



  <div class="outro">
    <p></p>
    <!-- <div class="links">


    </div>
    <nuxt-link to="/index" class="button--grey">Statistic </nuxt-link> -->
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
      chpPop: null,
      chpGDPper:null,
      chpWage:null,
      chpResi:null,
      chpPic:null

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

      // this.currStep = parseInt(element.dataset.stepNo);

      // handle the step-event as required here
      console.log(element, index, direction)
      console.log(index)
      // this.chpYear = element.dataset.cptYear;
      // this.chpGDP = element.dataset.cptGdp;
      // this.chpPop = element.dataset.cptPopulation;
      this.currStep= chapterdata[index].chapter;
      this.chpYear=chapterdata[index].year;
      this.chpGDP = chapterdata[index].GDP;
      this.chpPop =chapterdata[index].population;
      this.chpGDPper= chapterdata[index].GDPperCap;
      this.chpWage= chapterdata[index].wage;
      this.chpResi= chapterdata[index].ResiPrice;
      this.chpPic = chapterdata[index].pic;
      // this.chpResi= chapterdata[element.dataset.stepNo].ResiPrice;
      // console.log(element)
    },
    stepExitHandler(element){
      // if()
      // console.log(element.index.length);
      if(element.index=== 12){
          this.$router.push('/threeAspects');
      }
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css">
</style>

</style>
<style scoped>

.intro {
  /* display: inline-flex; */
  background-color: rgba(20, 20, 20, 0.95);
  pointer-events: none;
  padding-top: 45vh;
  padding-bottom: 50vh;
  font-size: 1rem;
  height: 100vh;
  /* text-align: left; */
  /* float: left; */
  /* border: 1px solid #ccc; */
  z-index: 1;
  color: white;

}
.intro-text{
  margin-left: 10vw;
  width:30vw;
}

.intro-tip{
  position: absolute;
  /* display: flex; */
  bottom: 5vh;
text-align: center;
  padding-left: 50%;

}
.fade-inNout{
  animation: fadeInnOut 3s infinite;

}

.intro-tip-icon{
  /* padding-left: 10px; */
}
@keyframes fadeInnOut {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }

}
.peopleContainers{
  display: flex;
  width: 40vw;
  height: 100px;
  left: 50%;
  top:40%;
  position: absolute;
  flex-wrap: wrap;

}

.people-icons{
  display: inline-flex;
  margin: 0;
  padding: 0;

  /* position: relative; */

  font-size:  7rem;

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
  /* height: 10vh; */
  margin: 2rem 3rem;
  /* border: 1px solid #ccc; */
  /* background-color: rgba(1, 1, 1, 0.4); */

  border-radius: 10px;
  shadow: 0 0 10px rgb(0, 0, 0);
  padding: 1.2rem 1.2rem;
  position: float;
  color: rgba(255, 255, 255, 1);
  /* color: rgba(0, 0, 0, 1); */
  display: inline;
  text-align: left;
  float: right;

  /* align-items: center;
  justify-content: left; */
}

.year {
  display: block;
  /* font-weight: bolder; */
  font-size: 7rem;
line-height: 1.2;
  /* font-style:italic; */
  font-family: 'Noto Serif JP', serif;
    font-variant-numeric: oldstyle-nums;

}

.otherIndex {
  display: block;
  font-size: 1rem;
  font-weight: bolder;

}

.step {
  padding: 40vh 0;
  width: 30%;
  height: 30%;
  /* margin: 0 auto 30vh; */
  margin: 0 10vw;
  margin-bottom: 10vh;

  /* position: ; */
  /* border: 1px solid #ccc; */
  border: none;
  display: flex;
  align-items: center;
  justify-content: right;
  opacity: 0;
  transition: all 700ms;
  visibility: hidden;

  /* transform: scale(0.9); */

}

.step-text{
  background-color:  rgba(1, 1, 1, 0.7);
  border-radius: 10px;
  font-weight: 300;
display: block;
  /* text-align: center; */
  left: 50%;
  padding: 20px;
}
.step-text b{

  font-size: 10rem;
}
.steptextHighlight{

font-size: 1.5rem;
 color:red;


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
.ChpPicContainer{
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  /* margin-left: auto; */
  height:100vh;
  width: 100%;
  background: rgba(15, 15, 15, 0.7);
  /* display: inline; */

  /* text-align: right; */


  flex-direction: column;

  animation: 1s appear ;
  overflow-x: hidden ;
  /* transition: 2s; */
}
.ChpPic{
  /* z-index: 20; */
  position: relative;

  transition: 2s;



}
.ChpPic2{
  /* z-index: 20; */
  position: absolute;
  right:10vw;
  float:left;

  transition: 5s;



}
.picText{
  position: relative;
  display: inline-block;
  color: white;
  font-size: 0.7rem;

}


.fadeimg-enter-active,
.fadeimg-leave-active
{
    transition: opacity 1s;

}
.fadeimg-enter,
.fadeimg-leave-to
{
    opacity: 0;

}
</style>
