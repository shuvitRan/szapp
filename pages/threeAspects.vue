<template >
  <div>

  <MapTool :enableScrollZoom='true' :mapStyle="'mapbox://styles/randanfx/ck90oix3e059l1iqtdpli91s5'"/>
  <!-- <ScrollText/> -->
  </div>
</template>


<script>
  import MapTool from '~/components/MapTool'

  export default {
    name:'threeAspects',
    components:{
      MapTool
    }


  }




</script>
