<template>
  <div >

      <LoadingCover :isloading='isMapLoading' />
    <MglMap
    id='vmap'
          container="vmap"
          :access-token="accessToken"
          :mapStyle="mapStyle"
          :attributionControl="false"
          :scrollZoom= "false"
          @load = "onMapLoaded"
          @mousemove="mapMouseMoved"
          >

     <!-- <MglScaleControl position ="bottom-right" /> -->
   </MglMap>

   <div class="loadingmap">

   </div>
  </div>

</template>



<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

import LoadingCover from '~/components/LoadingCover';

export default {

  name:'vueMap',

  props: {
    currentStep:{
      type: Number,
      require: false
    },
    chapterData:{
      type: Array,
      require:false
    },
    currentYear:{
      type: Number,
      require:false
    },
    mapStyle:{
      type: String,
      require:true
    },
    mouseCoordX:{
      type:Number,
      require:false
    },
    mouseCoordY:{
      type:Number,
      require:false
    }



    },



  components: {

    LoadingCover,
    MglMap

  },
  data() {
    return {
        isMapLoading: true,
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2s5Z2t6ejhuMHAwZzNocXRic3Y3ZzczcyJ9.V0hw9NUKKXqgH-pLYROePA'

      // map:{}

    }
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.map = Mapbox;
  },

  methods: {
        onMapLoaded(event){
         this.map = event.map;
        this.isMapLoading = false;
      // const asyncActions = event.component.actions
      //
      // const newParams = await asyncActions.flyTo(this.chapterData[1].location)
      // this.asyncAction = event.component.actions;
            // this.




    },

    mapMouseMoved(e) {
    // console.log('moved!')
    // console.log(e.mapboxEvent.point)
  }



  },
  watch: {

    async currentStep(newVale, oldVal){

       // console.log('prop changed:',newVale,'|was',oldVal)
       if(this.currentStep==0){
          this.map.flyTo(this.chapterData[0].location)
       } else if(this.currentStep==1){
         this.map.flyTo(this.chapterData[1].location)
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 1);
          this.map.setPaintProperty('shenzhenDistrictsFills', 'fill-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 1);
         this.map.setPaintProperty('cityShenzhenLabel', 'text-opacity', 1);
       }

       else if(this.currentStep==2){
         this.map.flyTo(this.chapterData[this.currentStep].location)
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', 0);

         this.map.setPaintProperty('shenzhenDistrictsFills', 'fill-opacity', 1);
       }
       else if(this.currentStep==3){
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', -1);
         this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 0);
         this.map.flyTo(this.chapterData[this.currentStep-1].location)
         // this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 1);
         // this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 0.5);
       }else if(this.currentStep==4){
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', -1);
         // this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 0.5);
         this.map.flyTo(this.chapterData[this.currentStep].location)
         this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
       } else if(this.currentStep==5){
         // this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 0);
       }else if(this.currentStep==6){
         // this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
       }else if(this.currentStep==7){
         // this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen2019', 'raster-opacity', 0);
       }else if(this.currentStep==8){
         // this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2019', 'raster-opacity', 1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', -1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 0.5);

       }else if(this.currentStep==9){
         // this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2019', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 0);
         this.map.setPaintProperty('cityShenzhenLabel', 'text-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 1);
         // this.map.flyTo(this.chapterData[this.currentStep].location)
          this.map.flyTo(this.chapterData[3].location)
       }
       else if(this.currentStep==10){
         // this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);

         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 1);
         this.map.flyTo(this.chapterData[this.currentStep].location)
       } else if(this.currentStep==11){

         this.map.flyTo(this.chapterData[this.currentStep].location)
          this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', 0);

       }else if(this.currentStep==12){

         this.map.flyTo(this.chapterData[this.currentStep].location)
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', -1);

       }

    },
  async  mouseCoordX(){

    if(!this.isMapLoading){
      this.map.setBearing(-this.mouseCoordX);
    }

    },
  async  mouseCoordY(){
    if(!this.isMapLoading){
      this.map.setPitch(this.mouseCoordY);
    }

    }


  },
  mounted(){

  }




};
</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>

<style scoped>

.textCheck{
position: fixed;
z-index: 1;
color:white;
}

#vmap {
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
  top: 0;

}

</style>
