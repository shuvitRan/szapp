<template>
<div  style="background:rgba(240, 240, 240,0.5)"ref="container">
  <div style="display:flex;margin:0;padding:0;">


    <el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="Public Green Spaces Rate" name="PerCapitaPublicGreenAreas_sqm">m²</el-tab-pane>
    <el-tab-pane label="Public Green Spaces" name="PublicGreenAreas_hectare">hectare</el-tab-pane>
    <el-tab-pane label="Parks" name="NumberofParks_unit">Unit</el-tab-pane>

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
              stroke='black'
              stroke-width='1'
              :d= "lineGenerator(viz_data)" />

 <!-- <transition-group name="fade" mode="out-in"> -->
        <g
          v-for="({Year},i) in viz_data"
          :key="i"

        >
        <!-- <g
          v-for="({Year,activeName},i) in viz_data"
          :key="i"
        > -->
        <!-- <rect
          @mouseover="showTips"
          @mouseleave="selectedCircle='none'"
          :id="i"
          :x="xScale(Year)"
          :y="margin.top + (height - yScale(viz_data[i][activeName]) - margin.bottom)"
          :width="xScale.bandwidth() * 0.4"
          :height="yScale(viz_data[i][activeName]) - margin.top"
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
          :fill="'rgba(0, 0, 0, .5)'"
        />
        <!-- reverse -->
        <!-- :cy= "margin.top + (height - yScale(PerCapitaPublicGreenAreas_sqm) - margin.bottom)" -->

         <!-- <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start"> -->
        <circle
        r="5"
        fill="rgb(90, 157, 31)"
        :cx="xScale(Year)+(xScale.bandwidth())*0.4"
        :cy= "margin.top + (yScale(viz_data[i][activeName]) - margin.bottom)"


        />
        <text
        v-if="selectedCircle==i"
          :id="i"
          :x="xScale(Year)+(xScale.bandwidth())*0.4"
          :y="margin.top + (yScale(viz_data[i][activeName]) - margin.bottom)-20" fill="red">{{viz_data[i][activeName]}}</text>
      <!-- </el-tooltip> -->

        </g>





 <!-- </transition-group> -->

      </g>

      <g>
        <!-- X AXIS -->
        <g
          v-for="({Year},i) in viz_data"
          :key="i"
          :transform="`translate(${xScale(Year)+(xScale.bandwidth())*0.4}, ${height-margin.bottom + 20})`"
        >
        <text
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
import szGreenData from "~/assets/dataset/深圳绿地_2.csv"
import szGDPData from "~/assets/dataset/深圳GDP.csv"

  export default{
    name:"lineGraph",

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
      // console.log(d3.min(this.viz_data,d=> d["RateofGreenAreasinDevelopedAreas"]))
      // console.log(d3.keys(this.viz_data[0]))
      // let svg = d3.select(this.$refs.viz)

      // this.xExtent = d3.extent(this.viz_data, d=>d["Year"])
      // this.yExtent = d3.extent(this.viz_data, d=>d["PerCapitaPublicGreenAreas_sqm"])
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

        }else if (this.activeName=="GDPperCapita") {
          this.szDataset=szGDPData;
        }


      }


    },

    methods:{
      color(value){
            return d3.interpolateSpectral(0.2 + value / d3.max(this.viz_data, d=>d[this.activeName]))
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

    computed:{
      viz_data(){
      return d3.csvParse(this.szDataset)
      },
      xScale(){
      return d3
            .scaleBand()
            .domain(this.viz_data.map(d => d["Year"] ))
            .range([this.margin.left, this.width - this.margin.right])
      },
      yScale(){
        return d3
        .scaleLinear()
        .domain(d3.extent(this.viz_data, (d) => d[this.activeName]))
        // .domain(d3.extent(this.viz_data, (d) => { return d["PerCapitaPublicGreenAreas_sqm"]}).reverse())
        // .domain([d3.min(this.viz_data, d=>d["RateofGreenAreasinDevelopedAreas"]),20])
        // .domain(this.viz_data.map(d => d["RateofGreenAreasinDevelopedAreas"] ))
        .nice()
        .range([this.height - this.margin.bottom-40, this.margin.top+40])
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
        return  this.lineGenerator(this.viz_data)

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

div{
  margin-top: 3rem;
  padding:0 20px;
}
</style>
