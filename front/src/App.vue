<template>
  <div>
    <!-- 这里使用keep-alive会影响我home页created中计算侧边栏显示状态 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {}
  }
}
</script>

<style scoped></style>
