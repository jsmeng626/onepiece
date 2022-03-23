<template>
  <div
    class="toastr"
    :class="{ active: isActive }"
    :style="{ backgroundColor: color }"
  >
    {{ toastrTxt }}
  </div>
</template>

<script>
export default {
  name: 'Mytoastr',
  props: {
    toastr: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      isActive: false,
      toastrTxt: '',
      color: '',
      timer: null
    }
  },
  watch: {
    toastr() {
      const color = this.toastr[3]
      if (color === 'success') {
        this.color = '#67C23A'
      } else if (color === 'warning') {
        this.color = '#E6A23C'
      } else if (color === 'danger') {
        this.color = '#F56C6C'
      } else if (color === 'info') {
        this.color = '#909399'
      } else {
        this.color = '#409eff'
      }
      this.toastrTxt = this.toastr[1]
      this.isActive = this.toastr[0]
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isActive = false
      }, this.toastr[2])
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.toastr {
  position: fixed;
  left: 50%;
  width: (250 / @w);
  height: (50 / @w);
  margin-left: (-125 / @w);
  line-height: (50 / @w);
  border-radius: (5 / @w);
  text-align: center;
  font-size: (18 / @w);
  color: #fff;
  transform: translateY(-100%);
  transition: all 0.8s linear;
  visibility: hidden;
  z-index: 999;
}
.active {
  visibility: visible;
  transform: translateY((10 / @w));
}
</style>
