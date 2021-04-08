<template>
  <div class="editor-error">
    <p>编译出现错误，请检查您的代码是否存在问题 </p>
  </div>
</template>
<script>
export default {
  name: 'run-error',
  props: {
    err: String
  },
  data() {
    return {
      sample: ''
    };
  },
  methods: {
  },
  computed: {

  }
}
</script>