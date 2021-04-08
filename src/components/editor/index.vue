<template>
  <div class="editor-region-layout">
    <div class="editor-region-north" :height="70">
      <!-- <aty-image src="images/logo.png" width="50px" class="banner_logo"></aty-image> -->
      <div class="editor-menu">
        <button class="editor-btn-primary" @click="run">运行Run</button>
        <button class="editor-btn-primary" @click="reset">重置Reset</button>
        <button class="editor-btn-primary" @click="copy">复制Copy</button>
      </div>
    </div>
    <div class="editor-region-center">
      <split>
        <run-code ref="codePage" slot="left"></run-code>
        <run-preview ref="previewPage" :code="code" slot="right"></run-preview>
      </split>
    </div>
  </div>
</template>
<style scoped>
@import './index.css';
</style>
<script src="./index.js"></script>