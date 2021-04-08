<template>
  <div class="editor-code">
    <textarea id="code" name="code"></textarea>
  </div>
</template>
<style>
  @import './code.css';
</style>
<script>
import { CodeMirror } from 'vue-codemirror'
export default {
  name: 'editor-code',
  data() {
    return {
      myCodeMirror: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.initCode();
    }, 100);
  },
  methods: {
    initCode() {
      var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: "htmlmixed",
        lineNumbers: true,
        theme: "dracula",
        scrollbarStyle: "simple",
        autoCloseBrackets: true,
        matchBrackets: true,
        autoCloseTags: true,
        tabSize: 2,
        styleActiveLine: true,
        foldGutter: true,
        matchTags: {bothTags: true},
        extraKeys: {"Ctrl-J": "toMatchingTag"},
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
      });
      this.myCodeMirror = myCodeMirror;
    },
    getValue() {
      return this.myCodeMirror ? this.myCodeMirror.getValue() : "";
    },
    setValue(value) {
      if (this.myCodeMirror) {
        this.myCodeMirror.setValue(value);
      }
    }
  }
}
</script>