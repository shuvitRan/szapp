<template>
  <div >
    <MglMap
      id='maptool'
          :access-token="accessToken"
          :mapStyle="mapStyle"
          :attributionControl="false"
          :scrollZoom= 'enableScrollZoom'
          @load = "onMapLoaded"
          @mousemove="mapMouseMoved"
          >

     <MglScaleControl position ="bottom-right" />
   </MglMap>

   <div class="loadingmap">

   </div>
  </div>

</template>



<script>
import Mapbox from "mapbox-gl";
import { MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl } from "vue-mapbox";

export default {

  name:'vueMap',

  props: {
    currentTopic:{
      type: Number,
      require: false
    },
    mapStyle:{
      type: String,
      requre:true
    },
    enableScrollZoom:{
      type: Boolean,
      require:true

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
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2pwaXdqeHU1MDBtNTNxdGU5bmthMGw0YyJ9.XUsxpyY7bNWN0XUzrpAtxg'
    }
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.map = Mapbox;
  },

  methods: {
        onMapLoaded(event){
         this.map = event.map;


    },

    mapMouseMoved(e) {
    // console.log('moved!')
    // console.log(e.mapboxEvent.point)
  }



  },
  watch: {

    async currentTopic(newVale, oldVal){



    }
  },
  mounted(){

  }




}

</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>

<style scoped>

.textCheck{
position: fixed;
z-index: 1;
color:white;
}

#maptool {
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
  top: 0;

}

</style>
