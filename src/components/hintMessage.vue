<template>
  <div class="container"></div>
</template>
<script>
import ebus from '../shared/ebus.js'
export default {
  mounted() {
    ebus.on('innerProcess', (act) => {
      try {
        this[act]()
      } catch (error) {
        console.log(error)
      }
    })
    ebus.on('payment/hint', )
  },
  data() {
    return {
      message:'',
      timer:'',
      _show:false
    }
  },
  methods: {
    midHandler() {

    },
    show(state){
      this._show = state
    }
  }
}
</script>
