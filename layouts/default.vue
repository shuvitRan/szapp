<template>
  <div>
    <nuxt />
  </div>
</template>




<style>
html {
  font-family: 'Noto Sans JP', sans-serif;
  /* font-family: 'Helvetica Neue', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto,  Arial, sans-serif; */
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h1{
  /* font-family: 'Noto Serif JP', serif; */


}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}



.button--grey {
  font-size: 1.2rem;
  font-weight: 300;
  display: inline-block;
  border-radius: 4px;
  /* border: 1px solid black; */
  color:black;
  text-decoration: none;
  padding: 5px 40px;
  transition: 2s;

  margin-right: 2vw;
}

.button--grey:hover {
  color: white;
  /* background-color: rgba(10, 10, 10, 0.67); */

}

/* width */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb:vertical {
  /* width: 1px; */
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.9);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(41, 41, 41, 0.54);
  /* transition: 2s; */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: #ff0000; */
}
</style>
