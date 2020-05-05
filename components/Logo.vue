<template>
  <div class="menuContainer">

    <nuxt-link to="/"
          >
          <img class="szlogo" src="~/assets/img/logosm.svg" alt="logo">
        </nuxt-link>


    <div class="links">

      <nuxt-link to="/shenzhenstory"
                class="menubutton"
            > | growth </nuxt-link>

            <nuxt-link to="/threeAspects"
                      class="menubutton"
                  > | livability </nuxt-link>


    </div>



</div>
</template>
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
  /* height: 80px; */
  animation: 1s appear;
  margin: auto;
  /* padding: 1rem; */
  margin:0.5rem 1rem;
  transition: 1s;
  text-shadow: 0px 0px 10px #000000;
  shadow: 0px 0px 10px #000000;

}

.szlogo:hover{
  width:140px;
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
  font-weight: 200;
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

.menubutton:hover {
  color: rgb(9, 9, 9);
  /* background-color: rgba(10, 10, 10, 0.67); */

}
</style>
