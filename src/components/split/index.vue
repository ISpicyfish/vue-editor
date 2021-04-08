<template>
  <div ref="outerWrapper"  :class="wrapperClasses">
    <div class="split">
      <div :style="{right: `${anotherOffset}%`}" class="left-pane" :class="paneClasses">
        <slot name="left"/>
      </div>
      <div class="split-trigger-con" :style="{left: `${offset}%`}" @mousedown="handleMousedown">
        <div class="split-trigger">
          <div class="split-trigger-bar-con">
            <i class="split-trigger-bar" v-once v-for="i in 8" :key="`trigger-${i}`"></i>
          </div>
        </div>
      </div>
      <div :style="{left: `${offset}%`}" class="right-pane" :class="paneClasses">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import './index.css';
</style>
<script src="./index.js"></script>