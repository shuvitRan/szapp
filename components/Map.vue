<template>
<div>

  <div id="map"  >
  </div>

<!-- <div class="textCheck">
    <p>{{currentStep}}</p>
    <p>{{chapterData[1].location}}</p>
</div> -->


</div>
</template>


<script>
import mapboxgl from 'mapbox-gl';

// import Mapbox from 'mapbox-gl-vue';
// import Mapbox from "mapbox-gl";
// import { MglMap } from "vue-mapbox";

export default {
  name: 'Map',

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
      type: String,
      requre:false
    },
    mapStyle:{
      type: String,
      requre:true
    }
  },

  data() {
    return {
      msg: 'my map box',
      layer: '',
      showMap:'hidden',
      map: {},
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2pwaXdqeHU1MDBtNTNxdGU5bmthMGw0YyJ9.XUsxpyY7bNWN0XUzrpAtxg'
      // mapStyle: 'mapbox://styles/randanfx/ck98yu85q0dkn1jnr7zqwfbqd'
    };
  },

  created() {
    // this.mapbox= Mapbox;

  },

  watch: {

    currentStep(newVale, oldVal){

       // console.log('prop changed:',newVale,'|was',oldVal)
       if(this.currentStep==0){
         this.map.flyTo(this.chapterData[0].location)



       } else if(this.currentStep==1){
         this.map.flyTo(this.chapterData[1].location)
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhenDistrictsFills', 'fill-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 1);


       } else if(this.currentStep==2){

         this.map.flyTo(this.chapterData[2].location)

         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 0);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', 0);
         this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhenDistrictsFills', 'fill-opacity', 1);
       }else if(this.currentStep==3){
         this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', 1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', -1);
         this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', 0.5);
         this.map.flyTo(this.chapterData[3].location)
         this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
       } else if(this.currentStep==4){
         // this.map.setPaintProperty('shenzhen1979', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 0);
       }else if(this.currentStep==5){
         // this.map.setPaintProperty('shenzhen1988', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
       }else if(this.currentStep==6){
         // this.map.setPaintProperty('shenzhen1999', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 1);
         this.map.setPaintProperty('shenzhen2019', 'raster-opacity', 0);
       }else if(this.currentStep==7){
         // this.map.setPaintProperty('shenzhen2010', 'raster-opacity', 0);
         this.map.setPaintProperty('shenzhen2019', 'raster-opacity', 1);

       }


       // if(this.currentStep==2){
       //   this.map.setLayoutProperty('sz1999Data','visibility', 'none', );
       //
       // }else{
       //   this.map.setLayoutProperty('sz1999Data','visibility', 'visible');
       // }

    }


  },
  mounted() {
    //--------  this is the way to avoid mapbox erro if run this app in server side.
    // const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    // let self = this;
    // this.createMap();
    // let map = this.map;
    // console.log("hi")
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      scrollZoom: false,
      attributionControl: false,
      fadeDuration:1000
      // zoom:2,
      // accessToken:'
    })
    // let scroller = scrollama();
    let map = this.map;
    map.on('load', function() {

//souce examle
      // map.addSource('mapbox-sz1999', {
      //   type: 'raster',
      //   url: 'mapbox://randanfx.akhtcs05'
      // });
      // map.addLayer({
      //   'id': 'sz1999Data',
      //   'type': 'raster',
      //   'source': 'mapbox-sz1999',
      //   'source-layer': 'sz1999',
      //   'layout': {
      //     // 'line-join': 'round',
      //     // 'line-cap': 'round',
      //     'visibility':'visible'
      //   },
      //   'paint': {
      //     // 'line-color': '#ff69b4',
      //     // 'line-width': 1
      //   }
      // });

      var mapLayer = map.getLayer('HospitalDots');
      // console.log(mapLayer)
      // map.setPaintProperty('HospitalDots', 'circle-opacity', 1);

        // scroller
        //        .setup({
        //          step: "#scrolly article .step",
        //          offset: 0.33,
        //          debug: true
        //        })
        //        .onStepEnter(handleStepEnter);



    })




  },

  methods: {
    createMap() {
      mapboxgl.accessToken = this.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.mapStyle,
        // zoom:1
        // accessToken:'
      })

    }






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
#map {
  z-index: -1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;

}

</style>
