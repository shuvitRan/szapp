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

<div class="noselect">
  <div class="maplegend" v-if="mapRadio=='green'">
    <div class="lengendUnit">
      <span class="legend-square" style="background:#3cd361;"></span>
      <p>Grass & Wood</p>
    </div>
    <div class="lengendUnit">
      <span class="legend-square" style="background:#baf722;"></span>
      <p>Parks</p>
    </div>
  </div>

  <div class="maplegend" v-if="mapRadio=='hospital'">
    <div class="lengendUnit">
      <span class="legend-dot" style="background:#c3045d;"></span>
      <p>Level Three Hospital</p>
    </div>
    <div class="lengendUnit">
      <span class="legend-dot" style="background:#f8a516;"></span>
      <p>Emergency Services</p>
    </div>
    <div class="lengendUnit">
      <span class="legend-dot" style="background:hsl(6, 31%, 54%);"></span>
      <p>Other Hospital</p>
    </div>

      <div class="lengendUnit">
        <span class="legend-square" style="background:#4347b6;"></span>
        <p>10-Minute Driving Reachable Regions</p>
      </div>
  </div>

  <div class="maplegend" v-if="mapRadio=='crime'">
    <div class="lengendUnit">
      <span class="legend-dot" style="background:#1a88ff;"></span>
      <p>Police Station</p>
    </div>
    <div class="lengendUnit">
      <span class="legend-square" style="background:#853fca;"></span>
      <p>5-Minute Driving Reachable Reagions</p>
    </div>
  </div>
</div>




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
  .maplegend{
    display: flex;
    position: absolute;
    right: 1vw;
    top: 5vh;
    color:white;
    align-items: center;
    /* text-align: right; */
    justify-content: flex-end;
    flex-wrap: wrap;
    /* float: right; */
    font-size: 0.8rem;
    /* background: rgba(15, 15, 15, 0.8); */
    padding-left:10px;
      text-shadow: 0 0 10px rgb(0, 0, 0);
      width:40vw;

  }

  .maplegend p{
    display: inline-block;
    vertical-align: middle;
  }
  .lengendUnit{
      display: inline-block;
      padding-left: 1rem;
  }

  .legend-square{

    vertical-align: middle;
    height: 15px;
    width: 15px;
    opacity: 0.8;
    /* background-color: #bbb; */
    display: inline-block;

  }
  .legend-dot{
    border-radius: 50%;
    vertical-align: middle;
    height: 15px;
    width: 15px;
    opacity: 0.8;
    /* background-color: #bbb; */
    display: inline-block;

  }

  .mapSwitch{

    color: white;
    position: absolute;
    right: 1vw;
    bottom: 10vh;
  }

  .mapSwitch p{
    font-size: 1.5rem;
    text-align: right;
    padding-bottom:  0.1rem;
    font-weight: bold;

  }

</style>
