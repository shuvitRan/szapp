<template >
  <div>
<Logo style="position:fixed; z-index:4;" />

  <!-- <Map/> -->
  <!-- <vMapbox/> -->
  <ScrollText/>

  </div>
</template>


<script>

import ScrollText from '~/components/ScrollText'
import Logo from '~/components/Logo'
  export default {

    components:{
       ScrollText, Logo
    }


  }


</script>



<style scoped>
  body {
    background-color: black;
  }
</style>
