<template>
  <div id="page">
    <my-toastr :toastr="toastr"></my-toastr>
    <div class="main" :style="{ height }">
      <Card
        v-for="(item, index) in imgList"
        :key="index"
        :item="item"
        @detail="detail"
      ></Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/personCard.vue'
export default {
  name: 'LoginPersonintro',
  components: {
    Card
  },
  data() {
    return {
      height: '',
      toastr: [], // 消息弹框
      imgList: [] // 图片列表
    }
  },
  created() {
    this.height = `${document.documentElement.clientHeight - 60}px`
    this.getImg()
  },

  methods: {
    async getImg() {
      const { data: res } = await this.$axios.get('/imgList')
      if (res.status !== 200) {
        this.toastr = [true, res.msg, 2000, 'danger']
        return
      }
      this.toastr = [true, res.msg, 2000]
      this.imgList = res.data
    },
    detail(id) {
      this.$router.push({
        name: 'personDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#page {
  width: 100%;
  background-color: #eeeff3;
}
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
}
</style>
