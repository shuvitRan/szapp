<template>
  <div class="infoContainer" >
    <div class="infoButton" @click ="infoPanelIsAcive =! infoPanelIsAcive">
      <p>Information</p>
    </div>



  </div>
</template>




<script>

export default{
name:'InfoPanel',

  props:{
    mapRadio:{
      type: String,
      require:true
    }


  },
  data(){
    return{
      infoPanelIsAcive : true

    }
  },
  methods:{


  }





}



</script>


<style scoped>

.infoContainer{
  position: fixed;
  /* position: block; */
  left: 0;
  top:15vh;
  white-space: nowrap;
  transition: 2s;
  transition-timing-function: ease-out;

}
.infoButton{
  width: 8rem;
  height: 8vh;
  background: rgba(15, 15, 15, 0.5);
  color: white;
  display: flex;
  align-items: center;
  /* text-align: right; */
  justify-content: center;
  float: right;
  position: relative;
  cursor: pointer;

    border-radius:  0px 10px 10px 0px;

}


</style>
