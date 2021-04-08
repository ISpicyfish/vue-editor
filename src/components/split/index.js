import {on, off} from '@/js/utils/dom.js'
export default {
  name: 'split',
  data () {
    return {
      offset: 0,
      oldOffset: 0,
      isMoving: false,
      currentValue: 0.5,
      min: 0.1,
      max: 0.1
    }
  },
  computed: {
    wrapperClasses () {
      return [
        'split-wrapper',
        this.isMoving ? 'no-select' : ''
      ];
    },
    paneClasses () {
      return [
        'split-pane',
        {
          'split-pane-moving': this.isMoving
        }
      ];
    },
    anotherOffset () {
      return 100 - this.offset;
    },
  },
  methods: {
    getMax (value1, value2) {
      return Math.max(value1, value2);
    },
    handleMove (e) {
      let pageOffset = e.pageX;
      let offset = pageOffset - this.initOffset;
      let outerWidth = this.$refs.outerWrapper['offsetWidth'];
      let value = parseFloat(outerWidth * this.oldOffset + offset) / parseFloat(outerWidth)
      let anotherValue = 1 - value;
      if (parseFloat(value) <= parseFloat(this.min)) value = this.getMax(value, this.min);
      if (parseFloat(anotherValue) <= parseFloat(this.max)) value = 1 - this.getMax(anotherValue, this.max)
      e.atMin = this.currentValue === this.min;
      e.atMax = (1 - value).toFixed(5) === this.max.toFixed(5);
      this.currentValue = value
    },
    handleUp () {
      this.isMoving = false;
      off(document, 'mousemove', this.handleMove);
      off(document, 'mouseup', this.handleUp);
    },
    handleMousedown (e) {
      this.initOffset = e.pageX;
      this.oldOffset = this.currentValue;
      this.isMoving = true;
      on(document, 'mousemove', this.handleMove);
      on(document, 'mouseup', this.handleUp);
    },
    computeOffset(){
      this.offset = this.currentValue * 10000 / 100;
    }
  },
  watch: {
    currentValue () {
      this.computeOffset();
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.computeOffset();
  });
    window.addEventListener('resize', ()=>{
      this.computeOffset();
  });
  }
}