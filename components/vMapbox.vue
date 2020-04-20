<template>
  <MglMap id = 'vmap'
        :accessToken="accessToken"
        :mapStyle="mapStyle"


        />
</template>



<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoicmFuZGFuZngiLCJhIjoiY2pwaXdqeHU1MDBtNTNxdGU5bmthMGw0YyJ9.XUsxpyY7bNWN0XUzrpAtxg',
      mapStyle: 'mapbox://styles/randanfx/ck90oix3e059l1iqtdpli91s5'
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = null;
  },

  methods: {
     async onMapLoaded(event){
      this.map = event.map;
      // this.
    }



  }




};
</script>


<style scoped>

#vmap {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;

}


</style>
