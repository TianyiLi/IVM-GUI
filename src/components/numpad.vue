<template>
  <div class="numpad-container">
    <div class="numpad">
      <button class="btn-sqr" @click.stop="onClick(1)">1</button>
      <button class="btn-sqr" @click.stop="onClick(2)">2</button>
      <button class="btn-sqr" @click.stop="onClick(3)">3</button>
      <button class="btn-sqr" @click.stop="onClick(4)">4</button>
      <button class="btn-sqr" @click.stop="onClick(5)">5</button>
      <button class="btn-sqr" @click.stop="onClick(6)">6</button>
      <button class="btn-sqr" @click.stop="onClick(7)">7</button>
      <button class="btn-sqr" @click.stop="onClick(8)">8</button>
      <button class="btn-sqr" @click.stop="onClick(9)">9</button> 
      <button class="btn-sqr" @click.stop="onClick(0)">0</button>
      <button class="btn-sqr delete">&larr;</button>
    </div>
    <div class="eng-numpad" v-if="englishPad">
      <button class="btn-sqr" @click.stop="onClick('A')">A</button>
      <button class="btn-sqr" @click.stop="onClick('B')">B</button>
      <button class="btn-sqr" @click.stop="onClick('C')">C</button>
      <button class="btn-sqr" @click.stop="onClick('D')">D</button>
      <button class="btn-sqr" @click.stop="onClick('E')">E</button>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    englishPad:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    getList() {
      return this.list
    },
    onClick(val){
      this.$emit('clicked', val)
    }
  }
}
</script>
<style scoped>
button {
  color: #fff;
  outline: none;
  /*float: right;*/
  border: 2px solid #fff;
  background: none;
  padding: 2px 40px 0 40px;
  margin-top: 10px;
  font-weight: 700;
  font-size: 35px;
  height: 70px;
}
button:active {
  color: #4990e2;
  background: white;
}
.numpad-container {
  position: absolute;
  top: 0px;
  left: 0px;
}

.numpad {
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: center;
  justify-content: center;
  margin-top: 50px;
  width: 400px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
.eng-numpad {
  position: absolute;
  width: 120px;
  left: 400px;
  top: 50px;
}
button.btn-sqr {
  margin: 0 0 10px 5px;
  border-radius: 2px;
}
button.btn-sqr:focus:active {
  color: #4990e2;
  background: white;
}
.numpad button.btn-sqr.delete {
  border-radius: 2px;
  width: 215px;
}
.numpad button.single {
  margin: 15px;
  width: 50px;
  height: 50px;
  padding: 0;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 5px;
}
</style>

