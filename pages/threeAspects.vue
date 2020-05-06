<template >
  <div>

<Logo style="position:fixed; z-index:10;" />
  <MapTool
      :enableScrollZoom='true'
      :mapStyle="'mapbox://styles/randanfx/ck9hijte53wtd1imxjlntcr61'"
      :mapRadio='mapRadio'
      />
  <!-- switch -->
  <div class = 'mapSwitch noselect'>
    <p>Selecting a Map to Explore</p>
     <el-radio-group v-model="mapRadio" size="small" fill="rgba(54, 50, 59,0.7)">
       <el-radio-button label="green">Green Coverage</el-radio-button>
       <el-radio-button label="hospital">Hospital Accessbility</el-radio-button>
       <el-radio-button label="crime">Crime and Safety</el-radio-button>
     </el-radio-group>
   </div>

   <InfoPanel :mapRadio='mapRadio' />




  </div>
</template>


<script>
  import MapTool from '~/components/MapTool'
  import InfoPanel from '~/components/InfoPanel'
  import Logo from '~/components/Logo'

  export default {
    name:'threeAspects',
    components:{
      Logo,
      MapTool,
      InfoPanel
    },
    data(){
      return{
      mapRadio: 'green'

    }
    }


  }




</script>

<style scoped>

  .mapSwitch{

    color: white;
    position: absolute;
    right: 1vw;
    bottom: 8vh;
  }

  .mapSwitch p{
    font-size: 1.4rem;
    text-align: right;
    padding-bottom:  0.1rem;

  }

</style>
