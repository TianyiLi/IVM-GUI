<template>
  <div class="fullAd" v-show="show" @click.stop="toSESSION">
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
    ebus.send({ e: 'sess/goto_none' })
    ebus.send({ e: 'sess/start' })
    ebus.on("sess/enter_IDLE", () => (this.show = true))
    ebus.on("sess/enter_SESSION", () => (this.show = false))
  },
  data() {
    return {
      list: [],
      index: 0,
      timer: undefined,
      show: true
    }
  },
  props: {},
  methods: {
    getList: async function () {
      let list = await config.getAdList()
      this.list = list.filter(ele => ele.position === "full")
      setTimeout(() => {
        this.resume()
      }, 1000)
    },
    pause() {
      if (this.list[this.index].type === "video")
        this.$refs[`video${this.index}`][0].pause()
      else clearTimeout(this.timer)
    },
    next() {
      this.index = this.list.length <= this.index + 1 ? 0 : this.index + 1
      if (this.list[this.index].type === "image") {
        this.timer = setTimeout(
          () => this.next(),
          this.list[this.index].duration * 1000
        )
      } else {
        let refName = `video${this.index}`
        this.$refs[refName][0].play()
      }
    },
    resume() {
      if (this.list[this.index].type === "video") {
        let refName = `video${this.index}`
        this.$refs[refName][0].play()
      } else {
        this.timer = setTimeout(
          () => this.next(),
          this.list[this.index].duration
        )
      }
    },
    toSESSION() {
      ebus.send({ e: 'sess/session_begin' })
    }
  }
};
</script>
<style scoped>
.fullAd {
  position: absolute;
  left: 0px;
  top: 0px;
  margin: auto;
  width: 1080px;
  height: 1920px;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: center;
  background: rgb(48, 47, 47);
  z-index: 9999;
  transition: opacity 1s ease-in-out;
}
.ads > video {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1080px;
  height: 1920px;
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


