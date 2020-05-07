<template>
  <div class="menuContainer">

    <nuxt-link to="/"
          >
          <div class="szlogo">

          </div>
          <!-- <img class="szlogo" src="~/assets/img/logosm.svg" alt="logo"> -->
        </nuxt-link>


    <div class="links">

      <nuxt-link to="/shenzhenstory"
                v-if="currentRouteName == 'shenzhenstory'"
                  class="menubuttonOn"
            > | growth </nuxt-link>
      <nuxt-link to="/shenzhenstory"
                v-if="currentRouteName !== 'shenzhenstory'"
                class="menubutton"
            > | growth </nuxt-link>

            <nuxt-link to="/threeAspects"
                      class="menubuttonOn"
                        v-if="currentRouteName == 'threeAspects'"
                  > | livability </nuxt-link>

                  <nuxt-link to="/threeAspects"
                          v-if="currentRouteName !== 'threeAspects'"
                            class="menubutton"
                        > | livability </nuxt-link>


    </div>



</div>
</template>



<script>


export default{
name:"Logo",

computed: {
    currentRouteName() {
        return this.$route.name;
    }
}

}

</script>






<style scoped>
.menuContainer{
  /* background: grey;s */
  display: flex;
  align-items: center;
  position: absolute;

}
.szlogo{
  /* position: sticky; */
  width:80px;
  height: 80px;
  /* fill:black; */
  animation: 3s appear;
  margin: auto;
  /* padding: 1rem; */
  margin:0.5rem 1rem;
  transition: 1s;
  text-shadow: 0px 0px 3px #000000;
  shadow: 0px 0px 3px #000000;
  background-color: white;
  -webkit-mask: url('~assets/img/logosm.svg') no-repeat center;
  mask: url('~assets/img/logosm.svg') no-repeat center;

}

.szlogo:hover{
  width:100px;
  background-color: rgba(135, 136, 134, 0.9);
  /* height: 80px; */

}


@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
div.links{
  padding: 0;
}

.menubutton {
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  display: inline-block;
  border-radius: 4px;
  /* font-style: italic; */
  /* border: 1px solid black; */
  color:white;
  text-decoration: none;
  padding:0 1rem;
  /* margin:0 1rem; */
  transition: 2s;

  margin-right: 1vw;

}
.menubuttonOn {
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  display: inline-block;
  border-radius: 4px;
  /* font-style: italic; */
  /* border: 1px solid black; */
  color:rgb(251, 217, 176);
  text-decoration: none;
  padding:0 1rem;
  /* margin:0 1rem; */
  transition: 2s;

  margin-right: 1vw;
  /* text-shadow: 0px 0px 3px #000000; */
}

.menubutton:hover {
  color: rgba(135, 136, 134, 0.8);
  font-size: 1.2rem;

  /* background-color: rgba(10, 10, 10, 0.67); */

}

.menubuttonOn:hover{
  cursor: default;

}
</style>
