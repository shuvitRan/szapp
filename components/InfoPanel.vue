<template>
<el-container>
  <div class = "infoContainer" >
    <div :class="{'infoButton':infoPanelIsAcive, 'infoButtonOpen':!infoPanelIsAcive}"  @click ="infoPanelIsAcive =! infoPanelIsAcive">
      <p v-if="infoPanelIsAcive">info</p>
      <i :class="infoPanelIsAcive? 'el-icon-data-line': 'el-icon-close'"></i>
    </div>


    <!-- <div class="infoFrame" :style='{"width": (!infoPanelIsAcive? "50vw":"0px")}' > -->
    <div  :class="{'infoFrame':infoPanelIsAcive, 'infoFrameOpen':!infoPanelIsAcive}" >
      <transition name = "fade" mode="out-in">

        <div class='infoContent' v-if="mapRadio=='green'"  key="1">
          <H1>Green Coverage in Shenzhen</H1>

              <el-divider class="dividerLine"></el-divider>
              <div class = "p-description">
                    <p >The green infrastructure plays a vital role in cities' livability and sustainability. Many studies have shown the urban green space is correlated to the residents' well-being, happiness level, and sociality satisfaction level.  </p>

              </div>
              <div class="graphContainer">
              <lineGraphGreen />
              </div>

        </div>
        <div class='infoContent' v-if="mapRadio=='hospital'"  key="2">

            <H1>Hospital Accessibility in Shenzhen</H1>

                <el-divider class="dividerLine"></el-divider>
                <div class = "p-description">
                      <p >It is crucial that everyone, especially those people who are vulnerable, older, younger, or marginalized, has reasonable access to health services when they need it. </p>

                </div>
                <div class="graphContainer">
                  <lineGraphHospital />
                </div>
        </div>


        <div class='infoContent' v-if="mapRadio=='crime'"  key="3">

            <H1>Crime and Safety in Shenzhen</H1>

                <el-divider class="dividerLine"></el-divider>
                <div class = "p-description">
                      <p >Everyone has the universal right to live safely and away from harm. It is a basic factor when considering well-being.</p>

                      <!-- <p>As reported by the Luohu public security organ, the criminal cases on file each year were going up and down from 12,188 cases in 2008, to 7,926 cases in 2017, and the public security cases dropped from 92,120 to 9,505 cases. The overall crime rate per 100,000 residents dropped from <b>11,590 </b>in 2008 to<b> 1,743</b> in 2017.As a reference comparison, with 2 million populations in <b>Queens</b>, New York, the crime rate is <b>1559</b> per 100,000 residents in 2018. The neighbor Hong Kong, had the overall crime rate of 758 in 2017 and 787 in 2019. </p> -->

                </div>
                <div class="graphContainer">
                  <CrimeGraph />
                </div>

        </div>

      </transition>



      </div>



  </div>
</el-container>
</template>




<script>
import lineGraphGreen from '~/components/chart/lineGraphGreen';
import lineGraphHospital from '~/components/chart/lineGraphHospital';
import CrimeGraph from '~/components/chart/CrimeGraph'
export default{
  name:'InfoPanel',


components:{
  lineGraphGreen,lineGraphHospital,CrimeGraph
},

  props:{
    mapRadio:{
      type: String,
      require:true
    }


  },
  data(){
    return{
      infoPanelIsAcive : false,
      myfade:'fade'

    }
  },
  watch:{
    mapRadio(val,oldVal){
      if(val!=oldVal){
      this.infoPanelIsAcive=false;
      }


    }


  },
  methods:{


  }





}



</script>


<style scoped>
.fade-enter-active,
.fade-leave-active
{
    transition: opacity .5s;

}
.fade-enter,
.fade-leave-to
{
    opacity: 0;

}
.infoContainer{
  position: fixed;
  /* position: block; */
  left: 0;
  top:10vh;
  /* white-space: nowrap; */
  transition: 2s;
  transition-timing-function: ease-out;
  line-break: auto;

}

.infoContainerOpen{
  position: fixed;
  /* position: block; */
  left: 25%;
  top:20vh;
  white-space: nowrap;
  transition: 2s;
  transition-timing-function: ease-out;

}
.infoButton{
  width: 4rem;
  height: 8vh;
  bottom: 10vh;
  background: rgba(15, 15, 15, 0.5);
  color: white;
  display: flex;
  align-items: center;
  /* text-align: right; */
  justify-content: center;
  float: left;
  position: fixed;
  /* right:0; */
  cursor: pointer;
  transition: 2s;
  -webkit-transition:  2s;
  transition-timing-function: ease-out;
  border-radius:  0px 10px 10px 0px;
  /* animation: fadeButton 2s normal; */
}

.infoButton:hover{
  /* height: 60vh; */
  background: rgba(154, 154, 154, 0.55);
  color:black;
}
.infoButtonOpen {
  border-radius:  0px 10px 0px 0px;
  width: 4rem;
  height: 8vh;

  color: white;
  display: flex;
  align-items: center;
  /* text-align: right; */
  justify-content: center;
  float: right;
  right:4rem;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition:  2s;
  -webkit-transition:  2s;
  animation: fadeButton 2s normal;

}

.infoButtonOpen:hover{
  /* height: 60vh; */
  background: rgba(154, 154, 154, 0.55);
  color:black;
}
.infoButton p{
  font-size: 1rem;

}

@keyframes fadeButton {
  0% {
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


.infoFrame{

  /* display: inline-block; */
  width: 45vw;
  height: 80vh;
  /* right:140vw; */
  opacity: 0;
  visibility: hidden;
   /* overflow: hidden; */
  position: absolute;
  /* left: 0px; */
   /* text-align: center; */
    border-radius: 2px;

    -webkit-transform: translateX(-100%);
    /* transition: opacity 2s; */
     transition: 1s ;
    -webkit-transition:  1s;
    transition-timing-function: ease-out;




    background: rgba(15, 15, 15, 0.8);
    /* background: rgba(220, 220, 220, 0.9); */

}
.infoFrameOpen{

   /* display: inline-block; */
   opacity: 1;
   visibility: visible;
   overflow: hidden;
   width: 45vw;
   height: 80vh;
   /* left: 0px; */
   /* text-align: center; */
    border-radius: 2px;
    /* padding-right: 100px; */
    transition:  1s;
    -webkit-transition:  1s;
    transition-timing-function: ease-out;

    border-radius:  0px 10px 10px 0px;
    background: rgba(15, 15, 15, 0.8);
    /* background: rgba(220, 220, 220, 0.9); */

}

.infoContent{
  padding: 2vh;
  overflow: auto;
  height: 80vh;
  /* width: 500px; */
  color:white;


}

.infoContent h1{
  padding-right: 5rem;
    /* text-align: right; */
}

.dividerLine {
  height: 0.5px;
margin:10px 0px;
  background-color: rgba(80, 80, 80, 0.8);;

}

.p-description{
  position: static;
  white-space:normal;
  /* word-break: break-all; */
}

.graphContainer{
  display: inline-block;
  /* position: absolute; */


}

</style>
