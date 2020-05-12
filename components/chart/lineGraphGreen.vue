<template>
<div >

<div  style="background:rgba(240, 240, 240,0); height:500; width:43vw"ref="container" >
  <!-- <div style="display:flex;margin:0;padding:0;"> -->

<div class="lineGraph">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="graphStyle" >
    <el-tab-pane label="Public Green Spaces" name="PublicGreenAreas_hectare">
      <!-- <p>In terms of trees and meadows, the green coverage rate in the city developed areas has maintained to be 45%, and the forest coverage rate is around 40% in the past decade.  As a new city benefiting from the top-down urban designs in the 1980s and 1990s, a network consisting of more than 900 city parks is produced. The urban green space development in Shenzhen is foresight. </p> -->
      <p>As a new city benefiting from the top-down urban designs in the 1980s and 1990s, the green coverage rate in the city developed areas has maintained to be  <b class='highlightTextGreen'>45%</b>, and the forest coverage rate is around <b class='highlightTextGreen'>40%</b> in the past decade.   </p>

    </el-tab-pane>
    <el-tab-pane label="Public Green Spaces Rate" name="PerCapitaPublicGreenAreas_sqm">
      <p>In the matter of Per individual Public Green Areas rate, the number of Shenzhen was going down from 2015's 16.9m² to<b class="highlightText"> 15.4m²</b> in 2018. 9m² per capita is the bottom line for public green spaces, and 50m² is ideal according to some earlier studies.</p>
    </el-tab-pane>

    <el-tab-pane label="Parks" name="NumberofParks_unit">
      <p>Shenzhen has a network consisting of more than  <b class='highlightTextGreen'>900</b> city parks, but they are unevenly distributed
</p>
    </el-tab-pane>



  <el-tab-pane label="GDP per-Capita" name="GDPperCapita"></el-tab-pane>
  <el-tab-pane label="GDP" name="GDP"></el-tab-pane>
  <!-- <el-tab-pane label="pri" name="primary">10,000 CHY(￥)</el-tab-pane> -->
  </el-tabs>

</div>



    <!-- </div> -->


    <svg
      ref="viz"
      :viewBox="[0, 0, width, height]"
      :width="width"
      :height="height"
      class="graphStyle"
      >
      <g>

        <!-- legend -->
        <g
          :transform="`translate(50, 70)`"
          fill="white"
          font-size="0.8em"
          font-style="bold"
          text-anchor="left"
        >
        <text>{{lengendInfo}}</text>
        </g>

        <g>
          <!-- X AXIS -->
          <!-- stroke-opacity="0.5"
          stroke-dasharray="1,1" -->
           <g v-axis:x="scale"
                :transform="`translate(${-(scale.x.bandwidth())*0.1},${height-margin.bottom-20})`"

                ></g>
          <g
            v-for="({Year},i) in szDataset"
            :key="i"

            :transform="`translate(${scale.x(Year)+(scale.x.bandwidth())*0.4}, ${height-margin.bottom })`"
          >
            <text
            v-if="selectedCircle==i "
              :key="i"
              class="textGraphStyle"
              font-size="1em"
              font-style="bold"
              text-anchor="middle"
              transform=" translate(-0,-22)"
            >{{Year}}</text>
            <text
            v-else
              :key="i"
              class="textGraphStyle"
              font-size="0.6em"
              text-anchor="middle"
              transform="rotate(-45)"
            >{{Year}}</text>
          </g>


        </g>

        <!-- Y axis -->
        <!-- stroke-dasharray="5,2"
        stroke-opacity="0.5" -->
         <g
          :transform="`translate(${scale.x(szDataset[0]['Year'])+(scale.x.bandwidth())*0.1}, 0)`"
          v-axis:y="scale"></g>

        <path fill='none'
              stroke='rgb(238, 177, 20)'
              stroke-width='1'
              :d= "lineGenerator(szDataset)" />

 <!-- <transition-group name="fade" mode="out-in"> -->
        <g
          v-for="({Year},i) in szDataset"
          :key="i"

        >

        <rect
          @mouseover="showTips"
          @mouseleave="selectedCircle='none'"
          :id="i"
          :x="scale.x(Year)"
          :y="0"
          :width="scale.x.bandwidth() * 0.8"
          :height="height"
          :fill="'rgba(0, 0, 0, 0)'"
        />
        <!-- reverse -->
        <!-- :cy= "margin.top + (height - scale.y(PerCapitaPublicGreenAreas_sqm) - margin.bottom)" -->

         <!-- <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start"> -->
        <circle
        v-if="selectedCircle==i && (activeName=='GDP'|| activeName=='GDPperCapita')"
        r="4"
        fill="rgb(157, 53, 31)"
        :cx="scale.x(Year)+(scale.x.bandwidth())*0.4"
        :cy= "margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)"

        />
        <!-- <circle
        v-else-if="selectedCircle==i && activeName=='GDPperCapita'""
        r="4"
        fill="rgb(157, 53, 31)"
        :cx="scale.x(Year)+(scale.x.bandwidth())*0.4"
        :cy= "margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)"

        /> -->
        <circle
        v-else-if="selectedCircle==i"
        r="4"
        fill="rgb(97, 180, 32)"
        :cx="scale.x(Year)+(scale.x.bandwidth())*0.4"
        :cy= "margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)"

        />
        <circle
        v-else
        r="2"
        fill="rgb(0, 140, 255)"
        :cx="scale.x(Year)+(scale.x.bandwidth())*0.4"
        :cy= "margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)"

        />

        <g  class="textGraphStyleSelect">
        <text
          v-if="selectedCircle==i && activeName=='GDP'"
          :id="i"
          :x="0"
          :y="margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)-10" >
          <tspan :x="scale.x(Year)+(scale.x.bandwidth())*0.4" dy="-1em">￥{{szDataset[i][activeName]}} M</tspan>
          <tspan :x="scale.x(Year)+(scale.x.bandwidth())*0.4" dy="-1em">${{Math.round(szDataset[i][activeName]*0.01/7)}} M </tspan>
        </text>

        <text
        v-else-if="selectedCircle==i && activeName=='GDPperCapita'""
          :id="i"
          :x="scale.x(Year)+(scale.x.bandwidth())*0.4"
          :y="margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)-10" >
          <tspan :x="scale.x(Year)+(scale.x.bandwidth())*0.4" dy="-1em">￥{{szDataset[i][activeName]}} </tspan>
          <tspan :x="scale.x(Year)+(scale.x.bandwidth())*0.4" dy="-1em"> ${{Math.round(szDataset[i][activeName]/7)}} </tspan>
        </text>

        <text
        v-else-if="selectedCircle==i""
          :id="i"

          :x="scale.x(Year)+(scale.x.bandwidth())*0.4"
          :y="margin.top + (scale.y(szDataset[i][activeName]) - margin.bottom)-10" >{{szDataset[i][activeName]}} </text>
        </g>

        </g>





 <!-- </transition-group> -->

      </g>



    </svg>
    <div class="graphStyle"  v-if="activeName == 'PublicGreenAreas_hectare'">
<h1>Environmental Aspects of Livability</h1>
  <p>Environment-related issues have become a more and more critical factor globally, considering development level, well-being, and liveability. It is a major dimension when the United Nations plans its Sustainable Development Goals for 2030. The late 1960s and 1970s was the start of environmental regulation. Due to the perfection in pollution regulation, safety laws, and wage equality in industrialized countries, many mass-production industries moved to the developing region. The myth of economic growth with the damaging of living environment is repeatedly happening since the Industrial Revolution.
</p>
      </div>

    <div class="graphStyle"  v-if="activeName == 'PerCapitaPublicGreenAreas_sqm'">
<h1>More Green is Needed</h1>
  <p>In 2016, Shenzhen became a pilot city for the “Sponge City” initiative, a Chinese national policy framework that utilizes a nature-based solution to manage stormwater. Due to the lack of vacant land within the city, the availability of empty rooftops on buildings is a largely untapped resource, making it a perfect location to install green infrastructure. If installed under “Sponge City” standards, green roofs can retain over 65% of rainwater that reaches their surfaces, creating a stormwater management system that can absorb, purify, store and reuse rainwater. Green roofs also help regulate room temperature within the building, reduce the urban heat island effect, improve air quality, and lower greenhouse gas emissions.
</p>
      </div>

</div>

</div>
</template>



<script>
import * as d3 from 'd3'
// import szGreenData from '~/assets/dataset/szgreen.csv'

import szGreenData from "~/assets/dataset/szGreenSpace.json"
import szGDPData from "~/assets/dataset/gdp.json"

  export default{
    name:"lineGraphGreen",

    components:{

    },

    props:{



    },

    data(){
      return{
        szDataset: szGreenData,
        selectedCircle:'',
        activeName:"PublicGreenAreas_hectare",
        lineGraph:'',
        dotGraph:'',
        margin: {
        top: 50,
        left: 0,
        right: 0,
        bottom: 50
      },
        height: 500,
        width: 0,
        showTip:false,
        lengendInfo:"Public Green Space in Hectare",
        yExtent: [],
        xExtent: []


      }
    },
    created() {
    window.addEventListener("resize", this.myResizeHandler);
    },
    destroyed() {
    window.removeEventListener("resize", this.myResizeHandler);
    },

    mounted(){
// console.log(szGreenData)

      this.width = this.$refs.container.offsetWidth - 40
      // this.width = this.$refs.container.clientWidth-40

        // this.width = 500;
      // this.width= 1000;
      this.height = 400;
      // console.log(this.szDataset)
      // console.log(d3.extent(this.szDataset, (d) => d[this.activeName]))
        // console.log(d3.extent(this.szDataset, d => d[this.activeName]))

      // let svg = d3.select(this.$refs.viz)

      // this.xExtent = d3.extent(this.szDataset, d=>d["Year"])
      // this.yExtent = d3.extent(this.szDataset, d=>d["PerCapitaPublicGreenAreas_sqm"])
      window.addEventListener('resize', ()=>{
        // this.width = this.$refs.container.offsetWidth - 40
        // this.width = 500
        // this.height = this.$refs.container.offsetHeight
        // this.height = 400
  })

    },
    watch:{
      activeName(){

        if(this.activeName=="PerCapitaPublicGreenAreas_sqm"||this.activeName=="PublicGreenAreas_hectare"||this.activeName=="NumberofParks_unit"){
          this.szDataset=szGreenData;
          if(this.activeName=="PerCapitaPublicGreenAreas_sqm"){
            this.lengendInfo="Shenzhen Public Green Areas Per Capita in m²";
          }else if(this.activeName=="PublicGreenAreas_hectare"){
            this.lengendInfo="Public Green Space in Hectare";
          }else if(this.activeName=="NumberofParks_unit"){
            this.lengendInfo="Number of Parks(unit)";
          }

        }else if (this.activeName=="GDPperCapita"|| this.activeName=="GDP") {
          this.szDataset=szGDPData;

          if(this.activeName=="GDPperCapita"){
            this.lengendInfo="CHY(￥)  | Mouse Over in USD($) exchange rates 1:7";
          }else if(this.activeName=="GDP"){
            this.lengendInfo="CHY(￥) in Million| Mouse Over in USD($) exchange rates 1:7";
          }
        }


      }


    },

    methods:{
      color(value){
            return d3.interpolateSpectral(0.2 + value / d3.max(this.szDataset, d=>d[this.activeName]))
          },

      handleClick(tab, event) {

       // console.log(tab, event);
      },
      myResizeHandler(e) {
    // your code for handling resize...
      // this.width = this.$refs.container.clientWidth-40
      this.width = this.$refs.container.clientWidth
      // this.height = this.$refs.container.clientHeight*0.4
      // console.log(document.documentElement.clientHeight)
      },
      showTips(event){
      // console.log(this.$el)
      // console.log(this)
        this.selectedCircle = event.currentTarget.id;
            // console.log(this.selectedCircle);
      // this.selectedCircle=index;

      }






    },
  //   asyncComputed: {
  //   myResolvedValue: {
  //     get () {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(() => resolve('*Fancy* Resolved Value!'), 1000)
  //       })
  //     },
  //     default: 'No fanciness'
  //   }
  // },

    computed:{

      scale() {
      const x = d3
            .scaleBand()
            .domain(this.szDataset.map(d => d["Year"] ))
            .range([this.margin.left+80, this.width - this.margin.right-40])
      const y = d3
        .scaleLinear()
        .domain(d3.extent(this.szDataset, (d) => d[this.activeName]))
        .nice()
        .range([this.height + this.margin.bottom-140, this.margin.top+40])
      return { x, y };
    },
      lineGenerator(){


        return d3.line()
                  .curve(d3.curveNatural)
                  // .transition() // Call Transition Method
                  // .duration(4000) // Set Duration timing (ms)
                  // .ease(d3.easeLinear) // Set Easing option
                  .x(d => this.scale.x(d["Year"])+(this.scale.x.bandwidth())*0.4)
                  .y(d => this.scale.y(d[this.activeName]))




      },
      lineCreate(){
        return  this.lineGenerator(this.szDataset)

      },

      axesGenerator(){
        return d3.axisLeft()

      }




    },
    directives: {
     axis(el, binding) {
       const axis = binding.arg;
       const axisMethod = { x: "axisBottom",y: "axisLeft" }[axis];
       const methodArg = binding.value[axis];

       var text=d3.select(el).call(d3[axisMethod](methodArg));
       if(axisMethod=="axisBottom"){
                text.selectAll("text").remove();
                // text.selectAll("text").attr("transform",'rotate(-45) translate(-10,0) ');
        }
   }
 }





  }

</script>

<style>

.graphStyle{
  color:white;

}
.textGraphStyle{
  fill:white;


}
.textGraphStyleSelect{
  fill:#409EFF;
  font-size:0.8em;
  text-anchor:middle;
  /* font-weight: bold; */
}

.lineGraph .el-tabs__item{



    color:white;


}

.highlightTextGreen{
  font-size: 1.5rem;
  color: #25dd59;
  line-height: 0.7;


}
.lineGraph .el-tabs__item.is-active{



    color:#409EFF;


}

.item{
  z-index: 10;
  position: absolute;
}
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
circle,path,text {
  transition:all 1500ms ease;
}

svg text{
  /* color:blue; */

}

div{
  /* margin-top: 3rem; */
  /* padding:0 20px; */
}
</style>
