<template>
  <div class="page">
    <div class="select-tab">
      <div class="select-button" @click.stop="selectShow = true">{{selected === null ? '请选择' : products[selected].title}}</div>
      <br clear='all' />
      <select v-show="selectShow" v-model="selected" size="5" style="display:none">
        <option disabled value="null">请选择</option>
        <option v-if="product" :value="product.id" v-for="product in products" :key="product.id">{{product.title}}</option>
      </select>
      <button class="confirm" @click.stop="confirm">确认</button>
    </div>
    <div class="product-image" v-if="selected && selected !== null">
      <img :src="products[selected].img" alt="">
    </div>
  </div>
</template>
<script>
import product from './store/product.js'
import ebus from '../shared/ebus.js'
export default {
  async mounted() {
    await product.renewList()
    this.products = product.getList()
  },
  data() {
    return {
      products: [],
      selected: null,
      selectShow: false
    }
  },
  watch: {
    selected(value) {
      this.selectShow = false
    }
  },
  methods: {
    confirm() {
      ebus.send({ e: 'order/ordered', arg: { p_id: this.products[this.selected].id } })
    }
  }
}
</script>
<style scoped>
.select-tab {
  position: absolute;
  margin: 100px 250px 0px 0px;
  left: 50px;
  width: 30px;
  font-size: 30px;
  height: 500px;
}
.select-button {
  background: url("https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/down4-16.png")
    right center no-repeat;
  padding: 0 20px 0 10px;
  border: solid 1px #eee;
  width: 400px;
}
.select-tab > select {
  padding: 15px 20px;
  height: 300px;
  border-radius: 2px;
  font-size: inherit;
}
.select-tab > button {
  padding: 15px 20px;
  margin-top: 50px;
  height: 100px;
  width: 150px;
  font-size: 30px;
  border-radius: 2px;
}
.product-image {
  position: absolute;
  top: 150px;
  right: 400px;
}
.product-image > img {
  position: absolute;
  max-height: 400px;
  max-width: 400px;
}
.confirm {
  position: absolute;
  bottom: -250px;
}
</style>

