<template>
<div  style="background:rgba(240, 240, 240,0.5)"ref="container">
  <div style="display:flex;margin:0;padding:0;">


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Public Green Spaces Rate" name="PerCapitaPublicGreenAreas_sqm">Per Capita Public Green Areas in m²</el-tab-pane>
      <el-tab-pane label="Public Green Spaces" name="PublicGreenAreas_hectare">Public Green Space in Hectare</el-tab-pane>
      <el-tab-pane label="Parks" name="NumberofParks_unit">Number of Parks(unit)</el-tab-pane>

    <el-tab-pane label="GDP per-Capita" name="GDPperCapita">USD($) exchange rates 1:7</el-tab-pane>
    <el-tab-pane label="GDP" name="GDP">Million USD($) exchange rates 1:7</el-tab-pane>
    <!-- <el-tab-pane label="pri" name="primary">10,000 CHY(￥)</el-tab-pane> -->
  </el-tabs>


    </div>


    <svg
      ref="viz"
      :viewBox="[0, 0, width, height]"
      :width="width"
      :height="height"
      >
      <g>

        <path fill='none'
              stroke='blue'
              stroke-width='1'
              :d= "lineGenerator(szDataset)" />

 <!-- <transition-group name="fade" mode="out-in"> -->
        <g
          v-for="({Year},i) in szDataset"
          :key="i"

        >
        <!-- <g
          v-for="({Year,activeName},i) in szDataset"
          :key="i"
        > -->
        <!-- <rect
          :x="xScale(Year)"
          :y="margin.top + (height - yScale(szDataset[i][activeName]) - margin.bottom)"
          :width="xScale.bandwidth() * 0.4"
          :height="yScale(szDataset[i][activeName]) - margin.top"
          :fill="'rgba(153, 79, 49, 1)'"
        /> -->
        <rect
          @mouseover="showTips"
          @mouseleave="selectedCircle='none'"
          :id="i"
          :x="xScale(Year)"
          :y="0"
          :width="xScale.bandwidth() * 0.8"
          :height="height"
          :fill="'rgba(0, 0, 0, 0)'"
        />
        <!-- reverse -->
        <!-- :cy= "margin.top + (height - yScale(PerCapitaPublicGreenAreas_sqm) - margin.bottom)" -->

         <!-- <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start"> -->
        <circle
        v-if="selectedCircle==i && (activeName=='GDP'|| activeName=='GDPperCapita')"
        r="4"
        fill="rgb(157, 53, 31)"
        :cx="xScale(Year)+(xScale.bandwidth())*0.4"
        :cy= "margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)"

        />
        <!-- <circle
        v-else-if="selectedCircle==i && activeName=='GDPperCapita'""
        r="4"
        fill="rgb(157, 53, 31)"
        :cx="xScale(Year)+(xScale.bandwidth())*0.4"
        :cy= "margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)"

        /> -->
        <circle
        v-else-if="selectedCircle==i"
        r="4"
        fill="rgb(97, 180, 32)"
        :cx="xScale(Year)+(xScale.bandwidth())*0.4"
        :cy= "margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)"

        />
        <circle
        v-else
        r="2"
        fill="rgb(76, 83, 69)"
        :cx="xScale(Year)+(xScale.bandwidth())*0.4"
        :cy= "margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)"

        />
        <text
        v-if="selectedCircle==i && activeName=='GDP'"
          :id="i"
          text-anchor="middle"
          :x="xScale(Year)+(xScale.bandwidth())*0.4"
          :y="margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)-30" fill="black">{{Math.round(szDataset[i][activeName]*0.01/7)}} M</text>

          <text
          v-else-if="selectedCircle==i && activeName=='GDPperCapita'""
            :id="i"
            text-anchor="middle"
            :x="xScale(Year)+(xScale.bandwidth())*0.4"
            :y="margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)-30" fill="black">{{Math.round(szDataset[i][activeName]/7)}} $</text>
            <text
            v-else-if="selectedCircle==i""
              :id="i"
              text-anchor="middle"
              :x="xScale(Year)+(xScale.bandwidth())*0.4"
              :y="margin.top + (yScale(szDataset[i][activeName]) - margin.bottom)-30" fill="black">{{szDataset[i][activeName]}} </text>


        </g>





 <!-- </transition-group> -->

      </g>

      <g>
        <!-- X AXIS -->
        <g
          v-for="({Year},i) in szDataset"
          :key="i"
          :transform="`translate(${xScale(Year)+(xScale.bandwidth())*0.4}, ${height-margin.bottom + 20})`"
        >
        <text
        v-if="selectedCircle==i "
          :key="i"
          font-size="1em"
          text-anchor="middle"
          transform="rotate(-45)"
        >{{Year}}</text>
        <text
        v-else
          :key="i"
          font-size="0.6em"
          text-anchor="middle"
          transform="rotate(-45)"
        >{{Year}}</text>
        </g>
      </g>

    </svg>

</div>
</template>



<script>
import * as d3 from 'd3'
// import szGreenData from '~/assets/dataset/szgreen.csv'

import szGreenData from "~/assets/dataset/szGreenSpace.json"
import szGDPData from "~/assets/dataset/gdp.json"

  export default{
    name:"lineGraphGDP",

    components:{

    },

    props:{



    },

    data(){
      return{
        szDataset: szGreenData,
        selectedCircle:'',
        activeName:"PerCapitaPublicGreenAreas_sqm",
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

      // this.width = this.$refs.container.offsetWidth - 40
      this.width = this.$refs.container.clientWidth - 40

        // this.width = 500
      // this.width= 1000;
      this.height = 500;
      console.log(this.szDataset)
      // console.log(d3.extent(this.szDataset, (d) => d[this.activeName]))
        console.log(d3.extent(this.szDataset, d => d[this.activeName]))

      // let svg = d3.select(this.$refs.viz)

      // this.xExtent = d3.extent(this.szDataset, d=>d["Year"])
      // this.yExtent = d3.extent(this.szDataset, d=>d["PerCapitaPublicGreenAreas_sqm"])
      window.addEventListener('resize', ()=>{
        // this.width = this.$refs.container.offsetWidth - 40
        // this.width = 500
        // this.height = this.$refs.container.offsetHeight
        // this.height = 500
  })

    },
    watch:{
      activeName(){

        if(this.activeName=="PerCapitaPublicGreenAreas_sqm"||this.activeName=="PublicGreenAreas_hectare"||this.activeName=="NumberofParks_unit"){
          this.szDataset=szGreenData;

        }else if (this.activeName=="GDPperCapita"|| this.activeName=="GDP") {
          this.szDataset=szGDPData;
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
      this.width = document.documentElement.clientWidth - 40
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

      xScale(){
      return d3
            .scaleBand()
            .domain(this.szDataset.map(d => d["Year"] ))
            .range([this.margin.left+40, this.width - this.margin.right-40])
      },
      yScale(){
        return d3
        .scaleLinear()
        // .domain(d3.extent(this.szDataset, (d) => d[this.activeName]))
        // .domain([600,189568])
        .domain(d3.extent(this.szDataset, (d) => d[this.activeName]))


        // .domain(d3.extent(this.szDataset, (d) => { return d["PerCapitaPublicGreenAreas_sqm"]}).reverse())
        // .domain([d3.min(this.szDataset, d=>d["RateofGreenAreasinDevelopedAreas"]),20])
        // .domain(this.szDataset.map(d => d["RateofGreenAreasinDevelopedAreas"] ))
        .nice()
        .range([this.height + this.margin.bottom-140, this.margin.top+40])
        // .range([0, 100])
        // .range([this.height - this.margin.bottom, this.margin.top])
      },
      lineGenerator(){


        return d3.line()
                  .curve(d3.curveNatural)
                  // .transition() // Call Transition Method
                  // .duration(4000) // Set Duration timing (ms)
                  // .ease(d3.easeLinear) // Set Easing option
                  .x(d => this.xScale(d["Year"])+(this.xScale.bandwidth())*0.4)
                  .y(d => this.yScale(d[this.activeName]))




      },
      lineCreate(){
        return  this.lineGenerator(this.szDataset)

      }




    }





  }

</script>

<style scoped>
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
  margin-top: 3rem;
  padding:0 20px;
}
</style>
