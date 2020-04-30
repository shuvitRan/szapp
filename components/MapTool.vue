<template>
<div>



  <el-container>


    <LoadingCover :isloading='isMapLoading' />



          <MglMap
                id='maptool'
                :access-token="accessToken"
                :mapStyle="mapStyle"
                :attributionControl="false"
                :scrollZoom='enableScrollZoom'
                :maxBounds='mapBounds'

                @load="onMapLoaded"
                @mousemove="mapMouseMoved">

            <MglScaleControl position="bottom-right" />
          </MglMap>

  <div class="control-bar noselect">
    <div class="barButton"  @click="controlPanelisActive =! controlPanelisActive">
    <i :class="controlPanelisActive? 'el-icon-arrow-right': 'el-icon-arrow-left'"></i>
    <p> control </p>
  </div>


  <div class="bg-purple grid-content" :style='{"width": (controlPanelisActive? "30vw":"0px")}'>


  <!-- <div class="bg-purple grid-content" > -->


  <div class="contro-panel"  >
    <div class="contro-panel-header">
      <H1 >Map Setting</H1>
  </div>
  <transition name = "fade" mode="out-in">
   <div v-if="mapRadio=='green'"  key="1">

        <div >
          <span class="panelText" >Parks</span>
          <el-switch
              v-model="isParkShow"
              active-color="#13ce66"
              inactive-color="#959595">
          </el-switch>
        </div>
        <el-divider></el-divider>
        <div>
          <span class="panelText"> Grass and Wood</span>
          <el-switch
              v-model="isLandUseShow"
              active-color="#13ce66"
              inactive-color="#959595">
          </el-switch>
        </div>
        <el-divider></el-divider>
        <div>
          <span class="panelText">HillShade</span>
          <el-switch
              v-model="isHillShow"
              active-color="#13ce66"
              inactive-color="#959595">
          </el-switch>
        </div>
    </div>

   <div v-if="mapRadio=='hospital'" key="2" >

      <div>
        <b>Choose a Cluster to Display</b>
        <div>
              <el-radio v-model='hosSwitch' label="alllHos">All Hospitals</el-radio>
        </div>
        <div >
            <el-radio v-model='hosSwitch' label="emcOnly">Emergency Services</el-radio>
        </div>
          <div >
                <el-radio v-model='hosSwitch' label="lv3Only">Level 3 Only</el-radio>
          </div>
      </div>



      <el-divider></el-divider>

      <div>
        <b>Isochrone</b>
          <p>10 minutes driving reachable reagions <br>around hospitals.</p>
      <div>
      <span class="panelText">Opacity</span>

        <div class="customSlider" >
          <el-slider v-model="Hos10minOpacity"
                    :step='0.01'
                    :max='1' ></el-slider>
        </div>
      </div>
      </div>
    </div>

   <div v-if="mapRadio=='crime'" key="3">
    <div>
      <span class="panelText">Police Stations</span>
      <el-switch
          v-model="isSzpdShow"
          active-color="#13ce66"
          inactive-color="#959595">
      </el-switch>
    </div>

    <el-divider></el-divider>

    <div>
      <b>Isochrone</b>
        <p>5 minutes driving reachable reagions <br>around police stations.</p>
    <div>
    <span class="panelText">Opacity</span>

      <div class="customSlider"   >
        <el-slider v-model="szpd5minOpacity"
                  :step='0.01'
                  :max='1' ></el-slider>
      </div>
    </div>
    </div>

  </div>
</transition>


  <!-- Universal settings -->
  <el-divider></el-divider>

    <div>
      <b>Show More Points of Interest</b>
      <p>Some POI may need a closer zoom level.</p>
      <el-select
      v-model="showPOI"
      multiple

      size='mini'
      style="margin-left: 0px; width:200px;"
      placeholder="SELECT">
      <el-option
        v-for="item in poiListData"
        :key="item.list"
        :label="item.list"
        :value="item.list">
      </el-option>
    </el-select>
    </div>

    <el-divider></el-divider>
      <b>Satellite Map</b>
    <div>
      <span class="panelText">Opacity</span>

        <div class="customSlider"  >
          <el-slider v-model="sateOpacity"
                  :step='0.01'
                :max='1' ></el-slider>
        </div>
    </div>
    <div>
      <span class="panelText">Saturation</span>

        <div class="customSlider"   >
          <el-slider v-model="sateSaturation"
                  :step='0.01'
                :min='-1' :max='0.5' ></el-slider>
        </div>
    </div>
    <div>
      <span class="panelText">Brightness</span>

        <div class="customSlider">
          <el-slider v-model="sateBrightness"
                  :step='0.01'
                :max='1' ></el-slider>
        </div>
    </div>

    <el-divider></el-divider>
    <div>
      <span class="panelText">Road Opacity</span>

        <div class="customSlider"   >
          <el-slider v-model="roadOpacity"
                  :step='0.01'
                :max='1' ></el-slider>
        </div>
    </div>








  </div>




  </div>
</div>







  </el-container>





</div>
</template>



<script>
import LoadingCover from '~/components/LoadingCover';

import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl
} from "vue-mapbox";

import poilist from '~/assets/poiClassList.json'

export default {

  name: 'vueMap',

  props: {
    mapRadio: {
      type: String,
      require:true
    },
    mapStyle: {
      type: String,
      require: true
    },
    enableScrollZoom: {
      type: Boolean,
      require: true

    }
  },



  components: {
    LoadingCover,
    MglMap,
    MglAttributionControl,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl
  },
  data() {
    return {

      isMapLoading: true,

      poiListData:poilist,
      Seen: 'EnvSection',

      controlPanelisActive:false,
      isParkShow: true,
      isLandUseShow: true,
      isHillShow:true,
      sateOpacity:0.4,
      sateSaturation:-1,
      sateBrightness:0.49,
      Hos10minOpacity:1,
      hosSwitch:'alllHos',
      szpd5minOpacity:1,
      isSzpdShow:true,
      roadOpacity:0.3,
      showPOI:[],
      mapBounds:[[113.26480,22.16109],[114.95236,23.23148]],
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

      this.isMapLoading = false;

    },

    POIfilter(poi, layer){

      if(poi===undefined ||poi.length == 0){
      this.map.setFilter(layer, ["all",["match",["get", "class"],['none'],true,false ]]);
                                    }
      else{
              this.map.setFilter(layer, [
                                                "all",
                                                [
                                                  "match",
                                                  ["get", "class"],
                                                  poi,
                                                  true,
                                                  false
                                                ]
                                              ]);
                                    }
    },

    isGreenSection(){
      this.map.setPaintProperty('parks', 'fill-opacity', 0.6);
      this.map.setLayoutProperty('mapbox-terrain-rgb', 'visibility', 'visible');
      this.map.setPaintProperty('landuse', 'fill-opacity', 0.6);
      this.isParkShow= true;
      this.isLandUseShow= true;
      this.isHillShow=true;


      // this.map.setPaintProperty('traffic', 'line-opacity', 0);
      this.map.setPaintProperty('HospitalDots', 'circle-opacity', 0);
      this.map.setPaintProperty('HospitalLabels', 'text-opacity', 0);
      this.map.setPaintProperty('hosAcess10min', 'fill-opacity', 0);

      this.map.setPaintProperty('szpd', 'circle-opacity', 0);
      this.map.setPaintProperty('szpd5min', 'fill-opacity', 0);
      this.map.setPaintProperty('shenzhenDistricts', 'line-opacity', 0);
    },
    isHospitalSection(){
      this.map.setPaintProperty('parks', 'fill-opacity', 0);
      this.map.setLayoutProperty('mapbox-terrain-rgb', 'visibility', 'none');
      this.map.setPaintProperty('landuse', 'fill-opacity', 0);

      // this.map.setPaintProperty('traffic', 'line-opacity', 1);
      this.map.setPaintProperty('HospitalDots', 'circle-opacity', 1);
      this.map.setPaintProperty('HospitalLabels', 'text-opacity', 1);
      this.map.setPaintProperty('hosAcess10min', 'fill-opacity', 1);


      this.map.setPaintProperty('szpd', 'circle-opacity', 0);
      this.map.setPaintProperty('szpd5min', 'fill-opacity', 0);

    },
    isCrimeSection(){
        this.map.setPaintProperty('parks', 'fill-opacity', 0);
        this.map.setLayoutProperty('mapbox-terrain-rgb', 'visibility', 'none');
        this.map.setPaintProperty('landuse', 'fill-opacity', 0);

        this.map.setPaintProperty('HospitalDots', 'circle-opacity', 0);
        this.map.setPaintProperty('HospitalLabels', 'text-opacity', 0);
        this.map.setPaintProperty('hosAcess10min', 'fill-opacity', 0);

        // this.map.setPaintProperty('traffic', 'line-opacity', 1);
        this.map.setPaintProperty('szpd', 'circle-opacity', 1);
        this.map.setPaintProperty('szpd5min', 'fill-opacity', 1);
        this.map.setPaintProperty('shenzhenDistricts', 'line-opacity', 1);

    },

    mapMouseMoved(e) {
      // console.log('moved!')
      // console.log(e.mapboxEvent.point)
    }



  },
  watch: {

    isParkShow (){
          if(!this.isParkShow){
            this.map.setPaintProperty('parks', 'fill-opacity', 0);
          } else{
            this.map.setPaintProperty('parks', 'fill-opacity', 0.6);
          }
    },
    isLandUseShow (){
          if(!this.isLandUseShow){
            this.map.setPaintProperty('landuse', 'fill-opacity', 0);
          } else{
            this.map.setPaintProperty('landuse', 'fill-opacity', 0.6);
          }
    },
    isHillShow (){
      if(!this.isHillShow){
      this.map.setLayoutProperty('mapbox-terrain-rgb', 'visibility', 'none');
      } else{
        this.map.setLayoutProperty('mapbox-terrain-rgb', 'visibility', 'visible');
      }
    },
    sateOpacity(newVale, oldVal){

      this.map.setPaintProperty('mapbox-satellite', 'raster-opacity', newVale);

    },
    sateBrightness(newVale){
      this.map.setPaintProperty('mapbox-satellite', 'raster-brightness-max', newVale);
    },
    Hos10minOpacity(newVale){
      this.map.setPaintProperty('hosAcess10min', 'fill-opacity', newVale);
    },
    hosSwitch(){
      if(this.hosSwitch=='alllHos'){
        this.map.setFilter('HospitalDots', undefined);
        this.map.setFilter('hosAcess10min', undefined);


         // TODO: turn if(EMC==true && ISLV3==false) into Mapbox expression
         // ['==',['get','EMC'],['get','ISLV3'],true, false],'#f8a516',


        this.map.setPaintProperty('HospitalDots', 'circle-color', ["case",
                                                                  ["==",["get", "ISLV3"],true],"#c3045d",
                                                                  ['==',['get','EMC'],true],'#f8a516',
                                                                  "hsl(6, 31%, 54%)"]
                                                                  );
      } else if(this.hosSwitch=='emcOnly'){
        this.map.setFilter('HospitalDots', ['==','EMC',true]);
        this.map.setFilter('hosAcess10min', ['==','emc', 'True']);
        this.map.setPaintProperty('HospitalDots', 'circle-color', ["case",['==',['get','EMC'],true],'#f8a516',"hsl(6, 31%, 54%)"]);
      }else if(this.hosSwitch=='lv3Only'){
        this.map.setFilter('HospitalDots', ['==','ISLV3',true]);
        this.map.setFilter('hosAcess10min', ['==','islv3', 'True']);
        this.map.setPaintProperty('HospitalDots', 'circle-color', ["case",['==',['get','ISLV3'],true],'#c3045d',"hsl(6, 31%, 54%)"]);
      }


    },
    isSzpdShow(){
      if(!this.isSzpdShow){
        this.map.setPaintProperty('szpd', 'circle-opacity', 0);
      } else{
        this.map.setPaintProperty('szpd', 'circle-opacity', 1);
      }
    },
    szpd5minOpacity(newVale){
      this.map.setPaintProperty('szpd5min', 'fill-opacity', newVale);
    },
    roadOpacity(newVale){
      this.map.setPaintProperty('road', 'line-opacity', newVale);
      this.map.setPaintProperty('traffic', 'line-opacity', newVale);
    },
    sateSaturation(newVale){
      this.map.setPaintProperty('mapbox-satellite', 'raster-saturation', newVale);
    },
    showPOI() {
      this.POIfilter(this.showPOI,'POIselect');
      this.POIfilter(this.showPOI,'POIselectCircle');


    },

     async mapRadio(){
        if(this.mapRadio == "green"){
          this.isGreenSection()
          this.map.flyTo(
            {
              "center": [114.167245, 22.650228],
              "zoom": 9.55,
              "pitch": 0.00,

              "speed":0.2
            }
          )

        } else if(this.mapRadio== "hospital"){
          this.isHospitalSection()

          this.map.flyTo(
            {
              "center": [114.167245, 22.650228],
              "zoom": 9.85,
              "pitch": 25.00,
              "bearing": 0.00,
              "speed":0.2
            }
          )

        } else if(this.mapRadio== "crime"){
          this.isCrimeSection()
          this.map.flyTo(
            {
              "center": [114.11075, 22.55859],
              "zoom": 12.44,
              "pitch": 10.50,
              "bearing": 0.00,
              "speed":0.2
            }
          )
        }
    }


  },
  mounted() {

  }




}
</script>

<style src="mapbox-gl/dist/mapbox-gl.css">
</style>

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
/* always present */
.expand-transition {

  transition: all 1s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
/* .el-slider__Runway{
margin: 0px !important;

} */

.el-divider{
margin:10px 0px;
background-color: rgb(224, 222, 222);
}

.customSlider{
  width:155px;
  display: inline-block;
  vertical-align: middle
}

.control-bar{
position: fixed;
/* position: block; */
right: 0;
top:20vh;
white-space: nowrap;
transition: 2s;
transition-timing-function: ease-out;
/* display: inline-block; */
/* position: relative */

}

.panelText{
  display: inline-block;
  width: 160px;

}


  el-switch {
    color:white;

  }
.barButton {
  width: 2rem;
  height: 60vh;
  background: rgba(15, 15, 15, 0.5);
  color: white;
  display: flex;
  align-items: center;
  /* text-align: right; */
  justify-content: center;
  float: left;
  position: relative;
  cursor: pointer;

    border-radius:  10px 0px 0px 10px;
}

.barButton:hover{
  /* height: 60vh; */
  background: rgba(154, 154, 154, 0.55);
  color:black;
}
.el-icon-arrow-left{
   /* font-size: 1.5rem; */
  color: white;
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
  background: rgba(220, 220, 220, 0.9);
}

.grid-content {
display: inline-block;

 /* overflow: hidden; */
/* position: absolute; */
  right: 0px;
 /* text-align: center; */
  border-radius: 2px;
/* float: right; */

  transition: width 1.5s;
  height: 60vh;



}
.contro-panel {
padding: 2vh;

overflow: scroll;
  height: 60vh;

}
.contro-panel-header{
  padding-bottom:1rem;
}
.popupbutton{
/* float: right; */

padding: none;
display: inline-block;
right: 0;
position: relative;
}








#maptool {
  width: 100%;
  height: 100vh;
  z-index: 0;
  position: fixed;
  top: 0;

}
</style>
