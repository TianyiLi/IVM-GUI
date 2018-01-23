<template>
  <transition name='fade' mode="out-in">
    <div class="page" v-if="product !== '' && paymentMethod !== []">
      <div class="container">
        <h2>
          <p>商品 ：{{ product.title }}</p>
          <p>
            支付项目 : {{paymentMethod.join(', ')}}
          </p>
          <p>价格:{{ price }}</p>
        </h2>
        <div class="live-view" v-if="liveView">
          <video class="webCam" width="400" height="300" :src="webstreamURL" autoplay></video>
        </div>
        <button class="cancel-btn" @click.stop="cancel()">x</button>
      </div>
    </div>
  </transition>
</template>
<script>
import Product from './store/product.js'
import ebus from '../shared/ebus.js'
import { open as liveViewOpen, close as liveViewClose } from './store/live-view.store.js'
export default {
  mounted() {
    ebus.on('order/after_ordered', ({ e, arg }) => {
      this.product = Product.getList()[arg.p_id]
    })
    ebus.on('payment/after_hint', (data) => {
      console.log(data)
      this.paymentMethod = Object.keys(data.arg.payment_method)
      this.price = data.arg.price
    })
    ebus.on('sys/after_hint', data => {
      let act;
      if (data.arg && data.arg.act) {
        act = data.arg.act
        if (act === 'liveview_ready') {
          this.liveViewStart()
        } else if (act === 'liveview_closed') {
          this.liveViewStop()
        }
      }
    })
    ebus.on('payment/after_cancelled', () => this.product = '')
  },
  data() {    return {
      paymentMethod: [],
      product: '',
      price: 0,
      liveView: false,
      webstreamURL: undefined
    }  },
  methods: {
    cancel() {
      ebus.send({ e: 'payment/cancelled' })
    },
    async liveViewStart() {
      let url = await liveViewOpen()
      this.webstreamURL = url
      this.liveView = true
    },
    liveViewStop() {
      liveViewClose()
      this.liveView = false
    }
  }
}
</script>
<style scoped>
.page {
  position: absolute;
  top: 0px;
  background: rgba(128, 128, 128, 0.616);
  width: 100%;
  height: 100%;
}
.cancel-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  width: 50px;
  border-radius: 4px;
  background: rgb(255, 81, 0);
  font-size: 25px;
}
.container {
  position: absolute;
  margin-top: 100px;
  margin-left: 100px;
  width: 80%;
  height: 50%;
  border: 2px solid;
  border-color: black;
  border-radius: 20px;
  opacity: 1;
  font-size: 25px;
  background: rgb(19, 163, 173);
}
.live-view {
  /* position: absolute; */
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-enter {
  opacity: 0;
  top: -640px;
}
.fade-leave-to {
  opacity: 0;
}
</style>
