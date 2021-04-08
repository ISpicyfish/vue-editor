<template>
  <div class="editor-preview">
    <component :is="componentName"  v-if="componentName" :err="err" :key="uuid"></component>
  </div>
</template>
<style scoped>
  @import './preview.css';
</style>
<script>
import runError from './error/index.vue'
import Vue from 'vue'
export default {
  name: 'editor-preview',
  components: {
    runError
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      componentName: null,
      err: null,
      uuid: null
    };
  },
  watch: {
    code: function () {
      this.destroyCode();
      this.renderCode();
    }
  },
  mounted() {
  },
  methods: {
    getSource: function (e, t) {
      if (e == null) return '';
      var n = new RegExp('<' + t + '[^>]*>');
      var r = e.match(n);
      return r
        ? ((r = r[0]),
          e.slice(e.indexOf(r) + r.length, e.lastIndexOf('</' + t + '>')))
        : '';
    },
    splitCode: function () {
      let js = this.getSource(this.code, 'script').replace(/new Vue/, 'return ');
      let html = '<div id="runAppShow">' + this.getSource(this.code, 'template') + '</div>';
      return {js, html};
    },
    genCss() {
      let css = this.getSource(this.code, 'style');
      if (this.css !== '') {
        let styleDom = document.getElementById('style_test')
        if (!styleDom) {
          styleDom = document.createElement('style');
          styleDom.rel = 'stylesheet/less';
          styleDom.type = 'text/css';
          styleDom.id = 'style_test';
          document.getElementsByTagName('head')[0].appendChild(styleDom);
        }
        styleDom.innerHTML = css;
        // 如若以后要添加less功能，则使用一下方法
        // Less.render(css, {
        //   globalVars: vars
        // }).then(output => {
        //   css = output.css;
        // });
      }
    },
    renderCode: function () {
      this.err = null;
      this.destroyCode();
      window.localStorage.setItem("RUN_CODE", this.code)
      let {html, js} = this.splitCode();
      var vueObj = {
        data: function () {
          return {};
        }
      };
      let tempJS = js.replace(/[\r\n]/g,"")
      if (tempJS) {
        try {
          vueObj = new Function(js)();
          delete vueObj.el
        } catch (error) {
          this.err = error
          this.componentName = 'run-error';
          return;
        }
      }
      vueObj.template = '<div></div>';
      if (html) {
        vueObj.template = html;
      }
      Vue.component('run-example', vueObj);
      this.componentName = 'run-example';
      this.uuid = this.getUuid()
      this.genCss();
    },
    destroyCode: function () {
      this.componentName = '';
    },
    getUuid: function () {
      return Math.floor(65536*(1 + Math.random())).toString(16)
    }
  }
}
</script>