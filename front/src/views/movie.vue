<template>
  <div>
    <MyToastr :toastr="toastr"></MyToastr>
    <div class="main">
      <Crumbs firstLevel="用户管理" secondLevel="在线影院"></Crumbs>
      <div class="content">
        <video controls :src="url"></video>
      </div>
    </div>
  </div>
</template>

<script>
import Crumbs from '../components/crumbs.vue'
export default {
  name: 'LoginMovie',
  components: {
    Crumbs
  },

  data() {
    return {
      url: '',
      toastr: []
    }
  },

  async created() {
    const { data: res } = await this.$axios.get('/movie')
    if (res.status !== 200) {
      this.toastr = [true, res.msg, 2000, 'warning']
      return
    }
    this.url = res.url
    this.toastr = [true, res.msg, 2000, 'success']
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.main {
  padding-top: (20 / @w);
  .content {
    padding: (20 / @w);
    video {
      width: 100%;
      height: (700 / @w);
      background-color: #000;
    }
  }
}
</style>
