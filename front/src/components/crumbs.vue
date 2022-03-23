<template>
  <div class="crumbs">
    <span>海米系统</span>&emsp;/&emsp;<span>{{ firstLevel }}</span
    >&emsp;/&emsp;<span>{{ secondLevel }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoginCrumbs',
  props: {
    firstLevel: {
      type: String,
      required: true,
      default: '一级菜单'
    },
    secondLevel: {
      type: String,
      required: true,
      default: '二级菜单'
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.crumbs {
  font-size: (16 / @w);
  height: (60 / @w);
  line-height: (60 / @w);
  padding-left: (20 / @w);
  background-color: #f5f5f5;
  color: #64b2fd;
}
</style>
