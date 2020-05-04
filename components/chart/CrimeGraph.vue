<template>
<div >

<div style="background:rgba(20, 20, 20,1); height:500; width:58vw"ref="container">
  <!-- <div style="display:flex;margin:0;padding:0;"> -->

<div class="lineGraph">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="graphStyle" >
    <el-tab-pane label="Luohu Crime Cases" name="total_cases">
      <p> In <b>{{szHosCaculate.year}}</b> there are <b class="highlightText">{{szHosCaculate.perCap}} doctors</b> per thounsands populations in Shenzhen. In China 2018, there are 2.59 licensed doctors per 1,000 people. In Beijing this number is 5.06, and Shanghai is 5.1.</p>
    </el-tab-pane>
    <el-tab-pane label="Luohu Public Safety Cases" name="Total">

    </el-tab-pane>


  <el-tab-pane label="Population" name="PermanentPopulation10k"></el-tab-pane>
  <el-tab-pane label="GDP per-Capita" name="GDPperCapita"></el-tab-pane>
  <el-tab-pane label="GDP" name="GDP"></el-tab-pane>

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
              transform=" translate(0,-22)"
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

<!-- line Graph path -->
        <path fill='none'
              stroke='rgb(195, 20, 238)'
              stroke-width='1'
              :d= "lineGenerator(szDataset)" />

<!-- stack graph path -->


<path fill='red'
      stroke='rgb(195, 20, 238)'
      stroke-width='1'
      :d= "stackCreator(szDataset)" />





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
        fill="rgb(202, 233, 51)"
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

        <g class="textGraphStyleSelect">
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


      </g>


    </svg>

  </div>

</div>
</template>



<script>
import * as d3 from 'd3'
// import lhCrime from '~/assets/dataset/szgreen.csv'

import lhCrime from "~/assets/dataset/luohucrime.json"
import lhZhian from "~/assets/dataset/罗湖治安.json"
import szGDPData from "~/assets/dataset/gdp.json"
import szPopulations from "~/assets/dataset/人口变化.json"


  export default{
    name:"CrimeGraph",

    components:{

    },

    props:{



    },

    data(){
      return{
        szDataset: lhCrime,
        selectedCircle:'',
        activeName:"total_cases",

        lhCrimeKeys:["homicide","violentCrime","robbery","rape","fraud","theft","other"],

        margin: {
        top: 50,
        left: 0,
        right: 0,
        bottom: 50
      },
        height: 500,
        width: 0,
        showTip:false,
        szHosCaculate:{
          year:'2018',
          perCap:'2.6'
        },
        lengendInfo:"The Criminal Cases in Shenzhen Luohu District",

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
      // console.log(lhCrime)

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

        if(this.activeName=="total_cases"){
          this.szDataset=lhCrime;
        } else if(this.activeName=="Total"){
            this.szDataset=lhZhian;
        }


      if (this.activeName=="GDPperCapita"|| this.activeName=="GDP") {
            this.szDataset=szGDPData;
              if(this.activeName=="GDPperCapita"){
                this.lengendInfo="CHY(￥)  | Mouse Over in USD($) exchange rates 1:7";
              }else if(this.activeName=="GDP"){
                this.lengendInfo="CHY(￥) in Million| Mouse Over in USD($) exchange rates 1:7";
              }
          }else if(this.activeName=="PermanentPopulation10k"){
            this.szDataset= szPopulations
            this.lengendInfo= "Year-End Permanent Populations in 10K"
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
        // if(this.activeName=="LicensedDoctors"||this.activeName=="HospitalBeds"){
          this.szHosCaculate.year = lhCrime[event.currentTarget.id]["Year"];
          this.szHosCaculate.perCap = Math.round(lhCrime[event.currentTarget.id][this.activeName]);

        // }

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
                  // .curve(d3.curveCatmullRom.alpha(0.5))
                  .curve(d3.curveLinear)
                  .x(d => this.scale.x(d["Year"])+(this.scale.x.bandwidth())*0.4)
                  .y(d => this.scale.y(d[this.activeName]))

      },
      stackCreator(){

        return  d3.stack().keys(this.lhCrimeKeys)
                  .order(d3.stackOrderNone)
              .offset(d3.stackOffsetNone);;

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
  font-size:0.9em;
  text-anchor:middle;
  /* font-weight: bold; */
}

.lineGraph .el-tabs__item{



    color:white;


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

.highlightText{
  font-size: 1.5rem;
  color: #F56C6C;


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
