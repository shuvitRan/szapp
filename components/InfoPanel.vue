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
                    <p >In the matter of Per individual Public Green Areas rate, the number from Shenzhen was going down from 2015's 16.9m² to 15.4m² in 2018. 9m² per capita is the bottom line for public green spaces, and 50m² is ideal according to some earlier studies.</p>
              </div>
              <div class="graphContainer">
              <lineGraphGDP />
              </div>



        </div>

      </transition>



      </div>



  </div>
</el-container>
</template>




<script>
import lineGraphGDP from '~/components/chart/lineGraphGDP';
export default{
  name:'InfoPanel',


components:{
  lineGraphGDP
},

  props:{
    mapRadio:{
      type: String,
      require:true
    }


  },
  data(){
    return{
      infoPanelIsAcive : true,
      myfade:'fade'

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
  /* background: rgba(15, 15, 15, 0.5); */
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
  width: 60vw;
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
   width: 60vw;
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
  word-break: break-all;
}

.graphContainer{
  display: inline-block;
  /* position: absolute; */


}

</style>
