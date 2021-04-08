<template>
  <div id="app">
    <editor></editor>  
  </div>
</template>

<script>
import editor from '@/components/editor/index.vue'
export default {
  name: 'app',
  components: { editor }
}
</script>
<style>
html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
