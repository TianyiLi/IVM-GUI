<template>
  <div>
    <!-- <div class="pre-logo" :class="{on:prepare}">
      <h1>IVM</h1>
    </div> -->
    <template v-if="!prepare">
      <full></full>
      <standard></standard>
    </template>
    <div class="main-page">
      <!-- <numpad></numpad> -->
      <product-select></product-select>
      <product-board></product-board>
    </div>
  </div>
</template>

<script>
import ebus from './shared/ebus'
import full from './components/idle'
import standard from './components/standard'
import config from './shared/config.js'
import numpad from './components/numpad'
import productSelect from './components/product-select'
import productBoard from './components/payment'
export default {
  name: "app",
  async mounted() {
    ebus.once('ready', () => this.prepare = false)
    let _config;
    try {
      _config = await fetch('config.json').then(res => res.json())
    } catch (error) {
      console.log(error)
    }
    await config.setConfig(_config)
    ebus.connect()
  },
  data() {
    return {
      prepare: true
    };
  },
  components: {
    full,
    standard,
    numpad,
    productSelect,
    productBoard
  }
};
</script>

<style>
#app {
  top:0px;
  left: 0px;
  width: 1080px;
  height: 1920px;
  overflow: hidden;
}
.pre-logo {
  transition: 1s;
  width: 100%;
  height: 100%;
  z-index: 10000;
  margin: auto;
  text-align: center;
  justify-content: center;
}
.on {
  opacity: 0;
}
.main-page {
  position: absolute;
  text-align: center;
  justify-content: center;
  height: 1280px;
  width: 100%;
  top: 690px;
  left: 0px;
}
</style>
