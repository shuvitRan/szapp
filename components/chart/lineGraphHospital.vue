<template>
<div >

<div style="background:rgba(20, 20, 20,0); height:500; width:43vw"ref="container">
  <!-- <div style="display:flex;margin:0;padding:0;"> -->

<div class="lineGraph">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="graphStyle" >
    <el-tab-pane label="Licensed Doctors" name="LicensedDoctors">
      <p> In <b>{{szHosCaculate.year}}</b> there are <b class="highlightText">{{szHosCaculate.perCap}} doctors</b> per thounsands populations in Shenzhen. In China 2021, there are 3.04 licensed doctors per 1,000 people. In Beijing this number is 5.7, and Shanghai is 3.34.</p>
    </el-tab-pane>
    <el-tab-pane label="Hospital Beds" name="HospitalBeds">
      <p> In <b>{{szHosCaculate.year}}</b> there are <b class="highlightText">{{szHosCaculate.perCap}} Hospital Beds</b> per thounsands people in Shenzhen. In 2021, there are average 6.70 hospital beds per 1,000 people in China. In Shanghai, this number is 6.49. </p>
    </el-tab-pane>

    <el-tab-pane label="Hospital Unit" name="HospitalUnit">
<p>In 2021, with over 114 million patients visiting health services in Shenzhen, there were <b class="highlightText">5241</b> health care institutions, and 92% of them were private clinics. There were only 145 hospitals, and 78 of them are general hospitals.  Average of 33 hospitals were built per decade in the last thirty years. </p>
    </el-tab-pane>

      <el-tab-pane label="Population" name="PermanentPopulation10k"></el-tab-pane>




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
              stroke='rgb(195, 20, 238)'
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





 <!-- </transition-group> -->

      </g>


    </svg>

    <div class="graphStyle" >
<h1>Utilization Rates</h1>
  <p>The average utilization rates of beds were 75%% in Shenzhen in 2021, which means there is an average of 15,997 empty hospital beds in the city. The condition also varies from the locations and facilities. Luohu, which is one of the sub-regions in Shenzhen, holds 20% of the hospitals in Shenzhen. The average utilization rates of beds in the public hospital are all above 90% in the past decade. It was overloaded in 2010 to 105% and 2012 to 101%. On the other hand, in the Nanshan district, the utilization rates of hospital beds were 84.5% in 2017 and fell to 78% in 2018.
</p>
      </div>

</div>

</div>
</template>



<script>
import * as d3 from 'd3'
// import szHospitals from '~/assets/dataset/szgreen.csv'

import szHospitals from "~/assets/dataset/szHospital.json"
import szGDPData from "~/assets/dataset/gdp.json"
import szPopulations from "~/assets/dataset/人口变化.json"


  export default{
    name:"lineGraphHospital",

    components:{

    },

    props:{



    },

    data(){
      return{
        szDataset: szHospitals,
        selectedCircle:'',
        activeName:"LicensedDoctors",
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
        szHosCaculate:{
          year:'2018',
          perCap:'2.7'
        },
        lengendInfo:"Total Licensed Doctors in Shenzhen",

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
// console.log(szHospitals)

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

        if(this.activeName=="LicensedDoctors"||this.activeName=="HospitalUnit"||this.activeName=="HospitalBeds"){
          this.szDataset=szHospitals;
            if(this.activeName=="LicensedDoctors"){
              this.lengendInfo="Total Licensed Doctors in Shenzhen";
              this.szHosCaculate.year="2018"
              this.szHosCaculate.perCap="2.7"
            }else if(this.activeName=="HospitalUnit"){
              this.lengendInfo="Total Hospitals in Shenzhen";
            }else if(this.activeName=="HospitalBeds"){
              this.lengendInfo="Number of Hospital Beds in Shenzhen";
              this.szHosCaculate.year="2018"
              this.szHosCaculate.perCap="3.3"
            }

        }else if (this.activeName=="GDPperCapita"|| this.activeName=="GDP") {
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
        if(this.activeName=="LicensedDoctors"||this.activeName=="HospitalBeds"){
          this.szHosCaculate.year = szHospitals[event.currentTarget.id]["Year"];
          this.szHosCaculate.perCap = Math.round(szHospitals[event.currentTarget.id][this.activeName]/szPopulations[event.currentTarget.id]['PermanentPopulation10k'])/10;

        }

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

<style scoped>
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
