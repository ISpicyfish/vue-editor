import runCode from './code/index.vue'
import runPreview from './preview/index.vue'
import split from './../split/index.vue'
import '@/js/codemirror.js'
export default {
  name: 'editor',
  components: {
    runCode,
    runPreview,
    split
  },
  data() {
    return {
      code: null,
      is_moving: false,
      leftStyle: {},
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        let localCode = window.localStorage.getItem("RUN_CODE")
        this.$refs.codePage.setValue(localCode || this.sample);
        this.run();
    }, 300);
    },
    run() {
      this.code = this.$refs.codePage.getValue();
      this.$refs.previewPage.renderCode();
    },
    copy() {
      this.handleCopy(this.$refs.codePage.getValue())
    },
    reset() {
      this.$refs.codePage.setValue(this.sample);
      this.run();
    },
    openMethodsModal() {
      this.$refs.methodsModal.open()
    },
    handleCopy(value) {
      let container = document.body
      let isRTL = document.documentElement.getAttribute('dir') == 'rtl'
      let fakeElem = document.createElement('textarea')
      fakeElem.style.border = '0'
      fakeElem.style.padding = '0'
      fakeElem.style.margin = '0'
      fakeElem.style.position = 'absolute'
      fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'
      let yPosition = window.pageYOffset || document.documentElement.scrollTop;
      fakeElem.style.top = `${yPosition}px`
      fakeElem.setAttribute('readonly', '')
      fakeElem.value = value
      container.appendChild(fakeElem)
      fakeElem.select()
      try {
        document.execCommand('copy')
      } catch (err) {
      }
    }
  }
}