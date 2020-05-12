<template >
  <div class="aboutPage">


      <Logo style="z-index:10;"/>

      <div class="szslider">
        <div class="sliderContain">


        <el-carousel width="" height="45vh"  indicator-position="outside" :interval="7000" :autoplay="true">
          <el-carousel-item :key="1" >

            <img class="sliderImg"src="~assets/img/szslide1.jpg" alt="">
            <p class="sliderText">Shenzhen Nanshan District</p>
          </el-carousel-item>
          <el-carousel-item :key="2">

            <img class="sliderImg" src="~assets/img/szslide2.jpg" alt="">
            <p class="sliderText">Shenzhen 2019</p>
          </el-carousel-item>

          <el-carousel-item :key="4">
          <img class="sliderImg" src="~assets/img/szslide3.jpg" alt="">
          <p class="sliderText">Shenzhen Futian District</p>
        </el-carousel-item>

          <el-carousel-item :key="3">
          <img class="sliderImg" src="~assets/img/sz1981.jpg" alt="">
          <p class="sliderText">何煌友, Shenzhen Futian District 1981</p>
        </el-carousel-item>
        <el-carousel-item :key="5">
        <img class="sliderImg" src="~assets/img/szslide41985.jpg" alt="">
        <p class="sliderText">何煌友, Shenzhen Futian District 1985</p>
      </el-carousel-item>

        </el-carousel>
            </div>
      </div>

      <div class="aboutContainer" >

      <div class="aboutText">


      <p>This is a project by <b>Dan Ran</b> in partial fulfillment of the requirements for the degree of Master of Science in Data Visualization, at Parsons School of Design. </p>

      <p>Advisor: Daniel Sauter <br>
      Special Counselor: The Nature Conservancy Shenzhen <br>
      Chinese Calligraphy Logo by: Yixiao Zhang <br>
      Special Thanks: Aaron Hill, Scarlett Li, Vivi</p>

      <el-divider></el-divider>
        <h2>Code</h2>
        <p>The web application was built with Nuxt.js, Mapbox GL JS & Studio, D3.js, and Baidu Map API. The vue-scrollama package was used for scroll events. The data was cleaned and managed by using Numpy and Pandas</p>

        <el-divider></el-divider>
        <h2>Data & Reference</h2>

        <p><a href="https://opendata.sz.gov.cn/">Shenzhen Government Open Data Platform(深圳市政府数据开放平台)</a>.</p>

        <p>Statistics Bureau of Shenzhen Municipality, Shenzhen Statistical Yearbook 2019(深圳统计年鉴2019), China Statistics Press, 2019.</p>
          <p>Statistics Bureau of Luohu Municipality, Shenzhen Luohu District Statistical Yearbook 2018(深圳市罗湖区统计年鉴2018), 2018.</p>

        <p> Xinhua <a href="https://www.chinadaily.com.cn/business/2010-06/02/content_9925392.htm">"China expands Shenzhen special economic zone"</a> 06.02.2010. Accessed 20 Mar. 2020.</p>
        <p> USA Today, "<a href=" https://www.usatoday.com/story/news/world/2019/07/11/the-50-most-densely-populated-cities-in-the-world/39664259/">The most densely populated cities the world- USATODAY.com."</a>  11 Jul. 2019,. Accessed 20 Mar. 2020.</p>
        <p>The World Bank,  "<a href="https://www.worldbank.org/en/country/china/overview">China Overview - World Bank Group."</a>  Accessed 21 Mar. 2020.</p>
        <p>Shenzhen News, “<a href=" https://www.sznews.com/news/content/2019-04/09/content_21611213.htm">Shenzhen Environmental Bulletin 2018(2018深圳环境公报)”</a> , Shenzhen News, 4.9.2019, Accessed 24. Mar.2020</p>
        <p>Hong Kong Police Force <a href="https://www.police.gov.hk/ppp_en/09_statistics/csc_2017_2018.html">"Crime Statistics Comparison | Hong Kong Police Force."</a> Accessed April 2, 2020. </p>
        <p>National Health Commission of the People's Republic of China (NHC),  <a href=" http://www.nhc.gov.cn/guihuaxxs/s10748/201905/9b8d52727cf346049de8acce25ffcbd0.shtml">"Statistical Communiqué of China's Health Care Development in 2018 (2018年我国卫生健康事业发展统计公报 - 国家卫生健康委员会)."</a> Accessed April 5, 2020. </p>
        <p>Congressional- <a href="https://www.cecc.gov/resources/legal-provisions/public-security-administration-punishment-law-chinese-text">Executive Commission on China "Public Security Administration Punishment Law of the ...."</a>. Accessed 31 Mar. 2020. The Central People’s Government of the PRC, 2005.</p>

        <el-divider></el-divider>
          <h2>Photos</h2>
        <p>摄图网 <a href="http://699pic.com/">Shenshen Modern Photos</a>.</p>
        <p> He, Huangyou(何煌友)，Shenzhen Old Photos, 1979-1985.</p>

      </div>


    </div>



</div>



</template>



<script>
  import Logo from '~/components/Logo'

  export default{

    components:{
      Logo,

    },

  }

</script>




<style scoped>
.szslider{
  position: absolute;
  /* display: inline-block; */
  right: 0;
  margin: 0 20px;
  width: 50%;
  height:auto;
  top:35vh;


  /* background: rgb(50, 177, 158); */
  /* z-index: 10; */
}
.sliderContain{
  /* position: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  text-align: center;

}
.sliderText{
  /* position: relative; */
  /* top:25vh; */

  /* position: absolute; */
  /* display: inline-block; */
  padding: 0;
  margin: 0;

}
.sliderImg{
  /* position: relative; */
  display: inline-block;
  max-height:90%;
  max-width: auto;

}
.el-carousel__item p {
  color: #c4c4c4;
  font-size: 11px;
    z-index: 10;

    /* overflow: visible; */
  /* opacity: 0.75; */
  /* line-height: 200px; */


}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n+1) {
  /* background-color: #d3dce6; */
}
.aboutPage{
  width: 100vw;
  /* max-width: 3000px; */
  height: 100vh;
background: url(~assets/img/sznight.jpg) no-repeat center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;


  background-color: #080808;
    /* filter: grayscale(100%); */


}
.el-divider{
margin:15px 0px;
background-color: rgba(215, 215, 215, 0.5);

}

.aboutContainer {
overflow: scroll;
  margin: 0 auto;
  height: 100vh;
  width:100vw;
  display: flex;
  padding-top: 15vh;
  padding-left: 10vh;
  /* right: 10vw; */
  /* top:10vh; */
  /* justify-content: flex-start; */
  /* justify-content: flex-start; */
  justify-content: flex-start;
  align-items: flex-start;
  text-align: right;
/* background: rgba(217, 207, 205, 0.7); */
  background: rgba(20, 20, 21, 0.5);
  scrollbar:hidden;
  position: fixed;

  color: rgb(237, 232, 232);
  flex-direction: column;
}
.example::-webkit-scrollbar {
  display: none;
}
.aboutText{

  /* font-family:  'Noto Serif JP','Ma Shan Zheng',serif; */
  text-align: left;
  max-width: 650px;
  /* width: 50vw; */
  width:45%;
  border-radius:10px;

  display: inline-block;
  /* padding:  130px; */


}
.aboutText p{
  padding: 8px 0px;
  font-size: 0.9rem;

}
.aboutText a{
  font-size: 0.8rem;
color:rgb(54, 142, 223) ;

text-decoration:none;

}

</style>
