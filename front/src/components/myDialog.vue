<template>
  <div class="bg" :class="{ down: showDown }">
    <div class="dialog">
      <slot name="content"></slot>
      <div class="button">
        <button @click="submit">确定</button>
        <button @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginMydialog',

  props: {
    showDown: {
      type: Boolean,
      required: true,
      default: true
    }
  },

  data() {
    return {}
  },

  methods: {
    // submit() {
    //   this.$emit('submit')
    // },
    // closeDialog() {
    //   this.$emit('closeDialog')
    // }
    submit() {
      this.$emit('update:showDown', false)
    },
    closeDialog() {
      this.$emit('update:showDown', false)
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transform: translateY(-100%);
  transition: all 0.01s linear;
  font-size: (16 / @w);
  .dialog {
    position: absolute;
    // width: (700 / @w);
    padding: (80 / @w) (120 / @w);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid rgb(231, 231, 231);
    border-radius: (20 / @w);
    box-shadow: (15 / @w) (15 / @w) (30 / @w) rgb(0 0 0 / 30%);
    background-color: #fff;
    p {
      display: flex;
      height: (50 / @w);
      margin-bottom: (35 / @w);
      color: #383737;
      span {
        width: (100 / @w);
        margin-right: (20 / @w);
        font-size: (20 / @w);
        font-weight: 600;
        color: #666363;
      }
      input {
        width: (300 / @w);
        height: 100%;
        padding: 0 (10 / @w);
        outline: none;
        font-size: (20 / @w);
        border: (1 / @w) solid #c4c6ca;
        border-radius: (10 / @w);
      }
    }
    .button {
      position: absolute;
      bottom: (50 / @w);
      right: (100 / @w);
      button {
        width: (55 / @w);
        height: (30 / @w);
        margin-right: (5 / @w);
        border-radius: (5 / @w);
        border: none;
        color: #fff;
        &:first-child {
          background-color: #1b8dff;
        }
        &:last-child {
          background-color: #909399;
        }
      }
    }
  }
}
.down {
  transform: translateY(0);
}
</style>
