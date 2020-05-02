<template>
<div>
  hello
</div>
</template>



<script>
import * as d3 from 'd3'
// import szGreenData from '~/assets/dataset/szgreen.csv'
import szGreenData from "~/assets/dataset/深圳绿地_2.csv"

  export default{
    name:"lineGraph",

    components:{

    },

    props:{



    },

    data(){
      return{
        data: szGreenData,
        lineGraph:'',
        dotGraph:''

      }
    },

    mounted(){
// console.log(szGreenData)
      console.log(this.viz_data)

    },
    methods:{




    },

    computed:{
      viz_data(){
      return d3.csvParse(szGreenData)
      }
    }





  }

</script>

<style scoped>

</style>
