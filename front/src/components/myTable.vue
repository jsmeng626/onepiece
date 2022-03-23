<template>
  <table>
    <thead>
      <slot name="header"></slot>
    </thead>
    <tbody>
      <tr v-for="item in userList" :key="item.id">
        <slot name="content" :row="item"></slot>
      </tr>
      <tr class="noneDataTip" v-show="isShowTip">
        <td colspan="7">后面没有数据啦~ ~ ~</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'LoginMytable',
  props: {
    userList: {
      type: Array,
      required: true
    },
    isShowTip: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
table {
  width: 100%;
  // height: (660 / @w);
  background-color: #fff;
  text-align: center;
  border-collapse: collapse;
  border-radius: (20 / @w);
  font-size: (16 / @w);
  tr {
    height: (60 / @w);
  }
  thead {
    tr {
      background-color: #f5f5f5;
    }
    th {
      color: #3f3c3c;
      font-size: (18 / @w);
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: #f8f7f7;
      }
      td {
        border: (1 / @w) solid #e9e7e7;
        border-top: (1 / @w) solid transparent;
        button {
          border: none;
          border-radius: (5 / @w);
          font-size: (12 / @w);
          color: #fff;
        }
        .edit {
          width: (60 / @w);
          height: (30 / @w);
          margin-right: (7 / @w);
          background-color: #409eff;
          &:hover {
            background-color: #1b8dff;
          }
        }
        .del {
          width: (60 / @w);
          height: (30 / @w);
          background-color: #f78989;
          &:hover {
            background-color: #ff6d6d;
          }
        }
        .warning {
          padding: 0 (10 / @w);
          height: (30 / @w);
          margin-right: (7 / @w);
          background-color: #ffc619;
          &:hover {
            background-color: #ffbf00;
          }
        }
      }
    }
    .noneDataTip {
      text-align: center;
      color: #3f3c3c;
    }
  }
}
</style>
