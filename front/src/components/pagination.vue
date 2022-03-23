<template>
  <div class="pageNum">
    <div class="controller">
      <button :style="{ cursor: btn_prev }" @click="prev">&lt;</button>
      <span>{{ count }}</span>
      <button style="cursor: pointer" @click="next">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPagination',

  data() {
    return {
      count: 1,
      btn_prev: 'no-drop'
    }
  },
  watch: {
    count(newValue) {
      if (newValue === 1) {
        this.btn_prev = 'no-drop'
      } else {
        this.btn_prev = 'pointer'
      }
      this.$emit('changePageNum', this.count)
    }
  },
  methods: {
    prev() {
      if (this.count > 1) {
        this.count--
      }
    },
    next() {
      this.count++
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.pageNum {
  position: fixed;
  left: (350 / @w);
  right: 0;
  bottom: (10 / @w);
  width: 100%;
  height: (40 / @w);
  margin-top: (5 / @w);
  .controller {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -50%);
    width: (300 / @w);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: (16 / @w);
    button {
      width: (45 / @w);
      height: (30 / @w);
      padding: (3 / @w);
      background-color: #fff;
      border: none;
      border-radius: (3 / @w);
      font-size: (18 / @w);
      color: #ccc;
    }
    span {
      margin: 0 (10 / @w);
      color: #050505;
    }
  }
}
</style>
