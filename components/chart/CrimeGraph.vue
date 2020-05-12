<template>
<div >

<div style="background:rgba(20, 20, 20,0); height:600; width:43vw"ref="container">
  <!-- <div style="display:flex;margin:0;padding:0;"> -->

<div class="lineGraph">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="graphStyle" >
    <el-tab-pane label="Luohu Crime Cases" name="total_cases">

      <!-- <p>There is more than 1 million year-end permanent population living in Luohu, which covers 78 km². In <b>{{szSaftyCaculate.year}}</b> there are average <b class="highlightText">{{szSaftyCaculate.perCap}} criminal cases </b> happened every day in Shenzhen Luohu district. </p> -->
        <!-- <p>3 homicide cases were on file in Luohu in 2017, and the homicide rate per 100,000 people was 0.29, and it is lower than the national average. </p> -->

            <p> In <b>{{szSaftyCaculate.year}}</b> there were average <b class="highlightText">{{szSaftyCaculate.perCap}} criminal cases </b> happening every day in Shenzhen Luohu district. </p>


    </el-tab-pane>
    <el-tab-pane label="Luohu Public Safety Cases" name="Total">

    <p>In <b>{{szSaftyCaculate.year}}</b> there were average <b class="highlightText">{{szSaftyCaculate.perCap}} public securiy cases </b> happening every day in Shenzhen Luohu district. </p>


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
          :transform="`translate(50, 125)`"
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
            v-axis:y="scale">
          </g>

<!-- line Graph path -->
        <path fill='none'
              stroke='rgb(221, 238, 20)'
              stroke-width='1'
              :d= "lineGenerator(szDataset)" />

<!-- stack graph path -->



        <!-- <g
          v-for="({Year},i) in stackCreator.stackSeries(szDataset)"
          :key="i"
        > -->

      <g v-if="activeName == 'total_cases' ||activeName == 'Total'">
          <g v-for="(keyname,i) in lhCrimeKeys">
            <rect
            v-if="activeName == 'total_cases'"
                :id="i"
                :x="20+85*i"
                :y="40"
                width="10px"
                height="10px"
                :fill="stackColor(keyname)"
            />
            <text
            v-if="activeName == 'total_cases' "
              font-size="0.8em"
                class="textGraphStyle"
                :id="i"
                :x="20+85*i"
                :y="35"
                width="10px"
                height="10px"
                :fill="stackColor(keyname)"
            >{{keyname}}</text>

            <rect
            v-if="activeName == 'Total'"
                :id="i"
                :x=" i%2!=0? 20+110*i-110 : 20+110*i"
                :y="i%2!=0? 65 : 20"
                width="10px"
                height="10px"
                :fill="stackColor(keyname)"
            />
            <text
            v-if="activeName == 'Total' "
              font-size="0.8em"
              class="textGraphStyle"
                :id="i"
                :x=" i%2!=0? 35+110*i-110 : 35+110*i"
                :y="i%2!=0? 75 : 30"
                width="20px"
                height="20px"
                :fill="stackColor(keyname)"
            >{{LegendKeyName[i]}}</text>


            <path

                  :fill="stackColor(keyname)"
                  stroke='none'
                  stroke-width='1'
                  :d= "areaGenerator(stackCreator(szDataset)[i])" />
            </g>
      </g>


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
        fill="rgb(233, 57, 51)"
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
        v-else-if="selectedCircle==i && activeName=='GDPperCapita'"
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


          <g v-if="activeName == 'total_cases'">
              <g v-for="(keyname,a) in lhCrimeKeys">
                <text
                  v-if="selectedCircle==i""
                  font-size="0.8em"
                    :id="i"
                    :x="20+85*a"
                    :y="65"
                    text-anchor="start"
                    width="20px"
                    height="20px"
                    :fill="stackColor(keyname)"
                >{{szDataset[i][keyname]}}</text>
            </g>
          </g>


          <g v-if="activeName == 'Total'">
              <g v-for="(keyname,a) in lhCrimeKeys">
                <text
                  v-if="selectedCircle==i"
                  font-size="0.8em"
                    :id="i"
                    :x=" a%2!=0? 20+110*a-110 : 20+110*a"
                    :y=" a%2!=0? 90 : 45"
                    text-anchor="start"
                    width="20px"
                    height="20px"
                    :fill="stackColor(keyname)"
                > {{szDataset[i][keyname]}} </text>
            </g>
          </g>
        </g>

        </g>


      </g>
    </svg>
    <div class="graphStyle" v-if="activeName == 'total_cases'" >
<h1>Overall Situation</h1>
<p>There are more than 1 million year-end permanent population living in Luohu, which covering 78 km². As reported by the Luohu public security organ, the overall crime rate per 100,000 residents dropped from <b>11,590 </b>in 2008 to<b> 1,743</b> in 2017.</p>
<p>As a reference comparison, with 2 million populations in <b>Queens</b>, New York, the crime rate is <b>1559</b> per 100,000 residents in 2018. Shenzhen's neighbor Hong Kong, had the overall crime rate of 758 in 2017 and 787 in 2019. </p>
<p>Due to the difference in the laws and crime definition in different political regions, measuring from different areas may not reflect the accurate crime situation. </p>
      </div>
    <div class="graphStyle" v-if="activeName == 'Total'" >

      <h1>What is Public Security Case?</h1>
      <p>According to Law of the People's Republic of China on Penalties for Administration of Public Security, if the violence or crime behavior is not dangerous enough for criminal punishment, the public security organ, normally is the police department, will impose on him/her penalties including warnings, detention of 1- 15 days and fine.</p>
    <p> In Luohu, 70.4% of the criminal cases in 2017 are either fraud or theft-related, and 2.36% are homicide, violent crime, rape, or robbery. However, 74.9% of the public security cases were categorized as <b>"Acts Infringing upon Rights of the Person and of Property"</b> in the 2017 Luohu annual statistic report, which includes various violent crimes. </p>

  </div>



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
        selectedCircle:0,
        activeName:"total_cases",

        lhCrimeKeys:["fraud","theft","homicide","violentCrime","robbery","rape","other"],
        LegendKeyName:["Disturb PublicOrder", "Impairment Of Public Security","Infringement of other Persons Rights","Disrupting Social Administration"],
        margin: {
        top: 50,
        left: 0,
        right: 0,
        bottom: 50
      },
        height: 600,
        width: 0,
        showTip:false,
        szSaftyCaculate:{
          year:'2017',
          perCap:'22'
        },

        lengendInfo:"The Criminal Cases in Shenzhen Luohu District",
        indexIterLegend:0,
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


      this.width = this.$refs.container.offsetWidth - 40
      // this.width = this.$refs.container.clientWidth-40

        // this.width = 500;
      // this.width= 1000;
      this.height = 600;
      // console.log(this.stackCreator(this.szDataset))


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
          this.lhCrimeKeys=["fraud","theft","homicide","violentCrime","robbery","rape","other"];
          this.lengendInfo= "The Criminal Cases in Shenzhen Luohu District"
          this.szSaftyCaculate.perCap='22'
          this.szSaftyCaculate.year='2017'
        } else if(this.activeName=="Total"){
            this.szDataset=lhZhian;
            this.lhCrimeKeys=["DisturbPublicOrder","ImpairmentOfPublicSecurity","infringementofotherPersonsRights","DisruptingTheSocialSdministration"];
            this.lengendInfo= "Public Security Cases in Shenzhen Luohu District"
            this.szSaftyCaculate.perCap='22'
            this.szSaftyCaculate.year='2017'
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
      color(){



            // return d3.interpolateSpectral(0.2 + value / d3.max(this.szDataset, d=>d[this.activeName]))
          },



      handleClick(tab, event) {

       // console.log(tab, event);
      },
      myResizeHandler(e) {

      this.width = this.$refs.container.clientWidth

      },
      showTips(event){
      // console.log(this.$el)
      // console.log(this)
        this.selectedCircle = event.currentTarget.id;
        if(this.activeName=="total_cases"|| this.activeName=="Total"){
          this.szSaftyCaculate.year = lhCrime[event.currentTarget.id]["Year"];
          this.szSaftyCaculate.perCap = Math.round(this.szDataset[event.currentTarget.id][this.activeName]/365);

          // console.log(this.selectedCircle)

        }

            // console.log(this.selectedCircle);
      // this.selectedCircle=index;

      }






    },

    computed:{

      scale() {
        const x = d3
              .scaleBand()
              .domain(this.szDataset.map(d => d["Year"] ))
              .range([this.margin.left+80, this.width - this.margin.right-40])
        const y = d3
          .scaleLinear()
          // .domain(d3.extent(this.szDataset, (d) => d[this.activeName]))
          .domain([0, d3.max(this.szDataset, (d) => d[this.activeName])])
          // .domain([0,30000])
          // .nice()
          .range([this.height + this.margin.bottom-140, this.margin.top+100])
        return { x, y };
      },

      stackColor(){
        return  d3.scaleOrdinal()
                  .domain(this.lhCrimeKeys)
                  // .domain(this.szDataset.columns.slice(2)))
                  .range(["#ffdb40","#0eafff","#88d229","#e90d48","#e50de9","#21817e","#2b37a3","#ff4040"])
                  // .range(d3.schemeTableau10)
                  .unknown("#ccc")


      },
      lineGenerator(){
        return d3.line()
                  // .curve(d3.curveCatmullRom.alpha(0.5))
                  .curve(d3.curveLinear)
                  .x(d => this.scale.x(d["Year"])+(this.scale.x.bandwidth())*0.4)
                  .y(d => this.scale.y(d[this.activeName]))

      },
      stackCreator(){

        return d3.stack().keys(this.lhCrimeKeys)
        // .map(d => (d.forEach(v => v.key = d.key), d))
                  // .order(d3.stackOrderNone)
              // .offset(d3.stackOffsetNone);

              // return {stackSeries}

      },
      areaGenerator(){
        // return 0;
        return d3.area()
                 .x((d,i)=> {

                   return this.scale.x(d.data["Year"])+(this.scale.x.bandwidth())*0.4 })

                   .y0((d,i) =>{
                     // console.log(d)
                     // console.log(this.scale.y(d[0]))
                    return this.scale.y(d[0])


                     })
                  .y1((d,i) => {
                    // console.log(this.scale.y(d[1]))
                    return this.scale.y(d[1])

                  })


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

<style >
.graphStyle{
  color:white;
  padding:0 20px;

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
  line-height: 0.7;


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
