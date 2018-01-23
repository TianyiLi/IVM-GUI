<template>
  <div class="standard" v-show="show">
    <template v-for="(ele, i) in list">
      <div class="ads" :key="i">
        <transition mode="out-in" name="fade">
          <video :src="ele.src" v-if="ele.type === 'video' " v-show="index === i " :ref="`video${i}`" @ended="next()"></video>
          <img :src="ele.src" v-if="ele.type === 'image'" v-show="index === i" />
        </transition>
      </div>
    </template>
  </div>
</template>
<script>
import config from "../shared/config"
import ebus from "../shared/ebus"
export default {
  mounted() {
    this.getList()
    ebus.on("sess/enter_IDLE", () => (this.show = false))
    ebus.on("sess/enter_SESSION", () => (this.show = true))
  },
  data() {
    return {
      list: [],
      index: 0,
      timer: undefined,
      show: false
    }
  },
  props: {},
  methods: {
    getList: async function () {
      let list = await config.getAdList()
      this.list = list.filter(ele => ele.position === "top")
      setTimeout(() => {
        this.resume()
      }, 1000)
      console.log(this.list)
    },
    pause() {
      if (this.list[this.index].type === "video")
        this.$refs[`video${this.index}`][0].pause()
      else clearTimeout(this.timer)
    },
    next() {
      this.index = this.list.length <= this.index + 1 ? 0 : this.index + 1
      console.log(this.list[this.index])
      if (this.list[this.index].type === "image") {
        this.timer = setTimeout(
          () => this.next(),
          this.list[this.index].duration * 1000
        )
      } else {
        let refName = `video${this.index}`
        console.log(this.$refs)
        this.$refs[refName][0].play()
      }
    },
    resume() {
      console.log(this.list[this.index].type)
      console.log(this.$refs)
      if (this.list[this.index].type === "video") {
        let refName = `video${this.index}`
        console.log(this.$refs[refName])
        this.$refs[refName][0].play()
      } else {
        this.timer = setTimeout(
          () => this.next(),
          this.list[this.index].duration
        )
      }
    }
  }
};
</script>
<style scoped>
.standard {
  position: absolute;
  left: 0px;
  top: 0px;
  margin: auto;
  width: 1080px;
  height: 590px;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.582);
  z-index: 9998;
  transition: opacity 1s ease-in-out;
}
.ads > video {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1080px;
  height: 590px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


