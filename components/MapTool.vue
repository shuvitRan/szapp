<template>
<div>

  <el-container>

          <MglMap
                id='maptool'
                :access-token="accessToken"
                :mapStyle="mapStyle"
                :attributionControl="false"
                :scrollZoom='enableScrollZoom'
                @load="onMapLoaded"
                @mousemove="mapMouseMoved">

            <MglScaleControl position="bottom-right" />
          </MglMap>


<div class="control-bar">


  <div class="barButton" @click="controlPanelisActive =! controlPanelisActive">
        <!-- <el-button > toggle</el-button> -->
    <i :class="controlPanelisActive? 'el-icon-arrow-left': 'el-icon-arrow-right'"></i>
    <p> control </p>
    </div>

  <div class="bg-purple grid-content" :style='{"width": (controlPanelisActive? "0px":"40vw")}'>
  <!-- <div class="bg-purple grid-content" > -->
  <div class="contro-pannel">
    <H1>Green</H1>

    <el-switch
        v-model="isParkShow"
        @change='IsParkShow'
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Show Park">
    </el-switch>
    <el-switch
        v-model="isParkShow"
        @change='IsParkShow'
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Show Park">
    </el-switch>
  </div>
  </div>
</div>






  </el-container>





</div>
</template>



<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl
} from "vue-mapbox";

export default {

  name: 'vueMap',

  props: {
    currentTopic: {
      type: Number,
      require: false
    },
    mapStyle: {
      type: String,
      requre: true
    },
    enableScrollZoom: {
      type: Boolean,
      require: true

    }
  },



  components: {
    MglMap,
    MglAttributionControl,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl
  },
  data() {
    return {
      controlPanelisActive:false,
      isParkShow: true,
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2s5Z2t6ejhuMHAwZzNocXRic3Y3ZzczcyJ9.V0hw9NUKKXqgH-pLYROePA'
    }
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.map = Mapbox;
  },

  methods: {
    onMapLoaded(event) {
      this.map = event.map;


    },
    IsParkShow (){
      if(this.isParkShow == false){
        this.map.setPaintProperty('parks', 'fill-opacity', 0);
      } else{
        this.map.setPaintProperty('parks', 'fill-opacity', 0.6);
      }
    },

    mapMouseMoved(e) {
      // console.log('moved!')
      // console.log(e.mapboxEvent.point)
    }



  },
  watch: {

    async currentTopic(newVale, oldVal) {



    }











  },
  mounted() {

  }




}
</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>

<style scoped>
.el-aside{

  float: right;
}

  el-switch {
    color:white;

  }
.barButton {
  width: 2rem;
  height: 60vh;
  background: rgba(69, 194, 57, 0.55);
  display: flex;
  align-items: center;
  /* text-align: right; */
  justify-content: center;
  float: left;
  position: relative;
  cursor: pointer;
  transition: 2s;
    border-radius:  10px 0px 0px 10px;
}

.barButton:hover{
  height: 60vh;
  background: rgba(69, 0, 57, 0.55);
  color:white;
}
.el-icon-arrow-left{
   font-size: 1.5rem;
  color: black;
  position: fixed;
  padding-right: 20px;
}
.el-icon-arrow-right{

  color: white;
  position: fixed;
  padding-right: 20px;
}
.barButton p{
  transform: rotate(-90deg);
  padding: 0;
  margin: 0;
}

.bg-purple {
  background: rgba(20, 20, 20, 0.72);
}

.grid-content {
display: inline-block;
 /* overflow: hidden; */
/* position: absolute; */
  right: 0px;
 /* text-align: center; */
  border-radius: 2px;
/* float: right; */

  transition: width 2s;
  height: 60vh;
/* visibility:hidden; */
  /* display :none; */


}
.contro-pannel {
padding: 2vh;

}

.popupbutton{
/* float: right; */

padding: none;
display: inline-block;
right: 0;
position: relative;
}

.control-bar{
position: fixed;
/* position: block; */
right: 0;
top:20vh;
white-space: nowrap;
/* display: inline-block; */
/* position: relative */

}






#maptool {
  width: 100%;
  height: 100vh;
  z-index: 0;
  position: fixed;
  top: 0;

}
</style>
