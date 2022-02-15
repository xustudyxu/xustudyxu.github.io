<template>
  <div class="qrcodeBtn" @mousedown.stop="showQrCode">
    <span class="labelText">{{ labelText || "Mobile Read" }}</span>
    <qrcode-vue
      id="qrcodeContainer"
      v-if="show"
      ref="qrcodeContainer"
      :value="qrcodeText"
      :size="qrSize"
      level="H"
    ></qrcode-vue>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { isRealNum } from "./util";
export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      show: false, //show or hide
      qrcodeText: "", // url
      qrSize: 100, //square size
      channelQR:''
    };
  },
  props: {
    labelText: {
      type: String,
      default: "",
    },
    size: {
      type: [String, Number],
      default: "",
    },
    channel: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // tranform size
    let newV = this.size;

    let realSize = "";
    switch (newV) {
      case "small":
        realSize = 100;
        break;
      case "medium":
        realSize = 150;
        break;
      case "big":
        realSize = 200;
        break;
      default:
        if (isRealNum(newV)) {
          const min = Math.min(window.innerHeight, window.innerWidth);
          newV = ~~newV;
          if (newV < 10) {
            realSize = 10;
          } else if (newV > min) {
            realSize = min;
          } else {
            realSize = newV;
          }
        } else {
          realSize = 100;
        }
        break;
    }
    this.qrSize = realSize;

    // handle channel 
    if(this.channel){
      this.channelQR = (location.href.indexOf('?') > -1 ? '&channel=qrcode' : '?channel=qrcode')
    }

    document.documentElement.addEventListener("mousedown", () => {
      this.show = false;
    });
  },
  methods: {
    showQrCode() {
      this.show = !this.show;

      if (this.show) {
        this.$nextTick(() => {
          this.qrcodeText = location.href + this.channelQR;
        });
      }
    },
  },
};
</script>

<style lang="stylus">
.qrcodeBtn {
  position: relative;
  user-select: none;

  &:hover {
    color: $accentColor;
    cursor: pointer;
  }

  #qrcodeContainer {
    position: absolute;
    right: 0;
    top: 50px;
  }
}
</style>
