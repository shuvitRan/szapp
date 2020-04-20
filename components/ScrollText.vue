<template>
<div>


  <div class="intro">
    <p>SCROLL TO START</p>
  </div>


  <!-- <Scrollama
      :debug="true"
      :offset="0.5"
      @step-enter="({ element }) => (currStep = element.dataset.stepNo)"
      @step-exit="({ element }) => (currStep = null)"> -->
<Scrollama
          :debug="true"
          :offset="0.5"
          @step-enter="stepEnterHandler">
          <!-- @step-exit="({ element }) => (currStep = null)"> -->
    <div v-for="n in 4"
        :key="n"
        class="step"
        :data-step-no="n"
        :class="{ active: n == currStep }">
      step {{ n }}
    </div>
    <div class="graphic" slot="graphic"> hello {{ currStep }}</div>

    <div class = "step" data-step-no = "10">
      <p> shenzhen today  what about</p>
    </div>


     </Scrollama>

     <div class="outro">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, at velit
      sint facere ipsam doloremque placeat vel impedit sapiente alias.
    </div>

</div>
</template>


<script>
// import scrollama from "scrollama";
import 'intersection-observer' // for cross-browser support
import Scrollama from 'vue-scrollama'
export default {
  name: 'SrcollText',
  components: {
    Scrollama
  },
  data() {
    return {
      currStep: null
    };
  },

  computed:{




  },
  methods: {
    stepEnterHandler({
      element,
      index,
      // 'data-step-no',
      direction
    }) {

      this.currStep=element.dataset.stepNo;
      // handle the step-event as required here
      console.log(element, index, direction)
      console.log(element.dataset)
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css">
</style>
<style scoped>

/* .scrollama-container {
  display: flex;
  .scrollama-graphic {
    flex: 1;
    height: 80vh;
    top: 10vh;
  }
  .scrollama-steps {
    flex: 1;
  }
} */



.intro,
.outro {
  padding: 30vh;
  border: none;
  z-index: 10;
}
.graphic {
  height: 100vh;
  /* margin: 0 3rem; */
  border: 1px solid #ccc;
  /* background-color: #eee; */
  font-size: 10rem;
  display: flex;
  text-align: right;
  align-items: center;
  justify-content: center;
}

.step {
  padding: 40vh 0;
  width: 50%;
  /* margin: 0 auto 30vh; */
  margin:0 10vw;
  margin-bottom: 10vh;
  background-color: rgba(212, 111, 149,0.5);
  /* border: 1px solid #ccc; */
  border: none;
  display: flex;
  align-items: center;
  justify-content: right;
}

.step.active {
  background-color: rgba(212, 0, 149,0.5);
  color: white;
}
</style>
