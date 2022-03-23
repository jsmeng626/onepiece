<template>
  <div class="card">
    <div class="img">
      <img :src="item.url" alt="" />
    </div>
    <div class="bottom_panel">
      <p>{{ item.tickName }}&nbsp;{{ item.name }}</p>
      <a href="javaScript:void(0)" @click="detail(item.id)">人物详情</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPersoncard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  },
  methods: {
    detail(id) {
      this.$emit('detail', id)
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.card {
  position: relative;
  width: (200 / @w);
  height: (250 / @w);
  border: (10 / @w) solid #fff;
  margin-top: (20 / @w);
  background-color: #fff;
  box-shadow: (10 / @w) (10 / @w) (30 / @w) rgb(0 0 0 / 30%);
  border-radius: (10 / @w);
  overflow: hidden;
  transition: all 0.5s linear;
  font-size: (14 / @w);
  .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      height: 100%;
      transform: translateX((-110 / @w));
    }
  }
  .bottom_panel {
    position: absolute;
    left: 50%;
    bottom: (10 / @w);
    transform: translateX(-50%);
    width: (214 / @w);
    height: (80 / @w);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    transform: translate(-50%, (90 / @w));
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p {
      color: #fff;
    }
    a {
      text-decoration: none;
      color: #fff;
      font-size: (15 / @w);
      &:hover {
        color: #1aa6fd;
      }
    }
  }
  &:hover {
    transform: translateY((-5 / @w));
  }
  &:hover .bottom_panel {
    transform: translate(-50%, (10 / @w));
  }
}
</style>
