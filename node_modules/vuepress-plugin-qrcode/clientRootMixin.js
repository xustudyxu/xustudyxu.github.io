import QrCode from "./QrCode.vue";
import Vue from "vue";

export default {
  data() {
    return {
      qr: null,
    };
  },
  updated() {
    // get this.$localePath

    // Execute after waiting for dom to load
    const navlink = document.querySelector(".nav-links");
    const qrcodeBtn = document.querySelector(".qrcodeBtn");
    if (navlink != null && qrcodeBtn == null) {
      this.$nextTick(() => {
        const navItem = document.createElement("DIV");
        navItem.className += "nav-item";

        navItem.appendChild(this.qr.$el);
        navlink.appendChild(navItem);
      });
    } else if (qrcodeBtn != null) {
      this.transformLabel();
      this.qr.$el.querySelector('.labelText').innerText = this.currentLabel;
    }
  },
  mounted() {
    // Create qrcode component
    const C = Vue.extend(QrCode);
    const qr = new C();
    // The following are the props of the component and some private properties
    this.transformLabel();
    qr.labelText = this.currentLabel;
    qr.size = size;
    qr.channel = channel;
    qr.$mount();

    this.qr = qr;
  },
  methods: {
    transformLabel() {
      this.currentLabel = "Mobile Read";
      if (typeof labelText === "string") {
        this.currentLabel = labelText;
      } else if (typeof labelText === "object" && labelText != null) {
        if (!labelText.hasOwnProperty("/")) {
          console.error('Please provide at least "/" for the "labelText" ');
          return;
        }
        this.currentLabel = labelText[this.$localePath];
      }
    },
  },
};
