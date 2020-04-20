<template>
<div>

  <div id="map">
  </div>

</div>
</template>


<script>
import mapboxgl from 'mapbox-gl';

// import Mapbox from 'mapbox-gl-vue';
// import Mapbox from "mapbox-gl";
// import { MglMap } from "vue-mapbox";

export default {
  name: 'Map',

  data() {
    return {
      msg: 'my map box',
      layer: '',

      map: {},
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2pwaXdqeHU1MDBtNTNxdGU5bmthMGw0YyJ9.XUsxpyY7bNWN0XUzrpAtxg',
      mapStyle: 'mapbox://styles/randanfx/ck90oix3e059l1iqtdpli91s5'
    };
  },

  created() {
    // this.mapbox= Mapbox;

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
      scrollZoom: false
      // zoom:2,
      // accessToken:'
    })
    // let scroller = scrollama();
    let map = this.map;
    map.on('load', function() {
      // map.addSource('mapbox-terrain', {
      //   type: 'vector',
      //   url: 'mapbox://mapbox.mapbox-terrain-v2'
      // });
      // map.addLayer({
      //   'id': 'terrain-data',
      //   'type': 'line',
      //   'source': 'mapbox-terrain',
      //   'source-layer': 'contour',
      //   'layout': {
      //     'line-join': 'round',
      //     'line-cap': 'round',
      //     'visibility':'visible'
      //   },
      //   'paint': {
      //     'line-color': '#ff69b4',
      //     'line-width': 1
      //   }
      // });

      map.addSource('mapbox-sz1999', {
        type: 'raster',
        url: 'mapbox://randanfx.akhtcs05'
      });
      map.addLayer({
        'id': 'terrain-data',
        'type': 'raster',
        'source': 'mapbox-sz1999',
        'source-layer': 'sz1999',
        'layout': {
          // 'line-join': 'round',
          // 'line-cap': 'round',
          'visibility':'visible'
        },
        'paint': {
          // 'line-color': '#ff69b4',
          // 'line-width': 1
        }
      });

      var mapLayer = map.getLayer('HospitalDots');
      console.log(mapLayer)
      // map.setPaintProperty('HospitalDots', 'circle-opacity', 1);

        // scroller
        //        .setup({
        //          step: "#scrolly article .step",
        //          offset: 0.33,
        //          debug: true
        //        })
        //        .onStepEnter(handleStepEnter);



})

    // this.map.on('load', function() {
    //   this.map.addSource('sz1979', {
    //     type: 'vector',
    //     url: 'https://studio.mapbox.com/tilesets/randanfx.6gqree79/'
    //   });
    //   this.map.addLayer({
    //     'id': 'randanfx.6gqree79',
    //     'type': 'raster',
    //     'source': 'sz1979',
    //     'layout': {
    //       'visibility': 'visible'
    //     },
    //     // 'paint': {
    //     //   'circle-radius': 8,
    //     //   'circle-color': 'rgba(55,148,179,1)'
    //     // },
    //     'source-layer': 'museum-cusco'
    //   });
    // });


    // this.map.on('load', function(){
    //      // insert layers beneath any symbol layer
    //      self.layers = map.getStyle().layers;
    //
    //
    //
    //    })


    // this.createMap().setLayoutProperty('shenzhen1979', 'visibility', 'visible');
    // map.addLayer({
    //    'id': 'sate1991',
    //    'type': 'raster',
    //    'source': 'contours',
    //    'source-layer': 'shenzhen1979',
    //    'layout': {
    //    'visibility': 'visible',
    //    'line-join': 'round',
    //    'line-cap': 'round'
    //    },
    //    'paint': {
    //    'line-color': '#877b59',
    //    'line-width': 1
    //    }
    //    });


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





<style scoped>
#map {
  z-index: -1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;

}

</style>
