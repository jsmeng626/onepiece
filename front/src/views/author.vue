<template>
  <div id="main">
    <Crumbs firstLevel="用户管理" secondLevel="权限管理"></Crumbs>
    <div class="content">
      <button class="add" @click="add">添加用户</button>

      <el-table
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        height="520"
        :data="userList"
      >
        <el-table-column
          v-for="item in authorTableTitle"
          :key="item.id"
          :prop="item.prop"
          :label="item.lable"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination @changePageNum="changePageNum"></Pagination>
      <MyDialog
        :showDown="showDown"
        @submit="submit"
        @closeDialog="closeDialog"
      >
        <template v-slot:content>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="网络状况">
              <el-select v-model="form.net" placeholder="请选择活动区域">
                <el-option label="wifi" value="wifi"></el-option>
                <el-option label="2G" value="2G"></el-option>
                <el-option label="3G" value="3G"></el-option>
                <el-option label="4G" value="4G"></el-option>
                <el-option label="5G" value="5G"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对外资源">
              <el-radio-group v-model="form.free">
                <el-radio :label="0">免费</el-radio>
                <el-radio :label="1">未开通</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否在线">
              <el-radio-group v-model="form.state">
                <el-radio :label="0">在线</el-radio>
                <el-radio :label="1">离线</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="在线时长(h)">
              <el-input type="number" v-model.number="form.timer"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </MyDialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Crumbs from '../components/crumbs.vue'
import Pagination from '../components/pagination.vue'
import MyDialog from '../components/myDialog.vue'
export default {
  name: 'userAuthor',
  components: {
    Crumbs,
    Pagination,
    MyDialog
  },
  data() {
    return {
      flag: 0,
      showDown: false,
      form: {
        name: '',
        email: '',
        net: '',
        free: '',
        state: '',
        timer: ''
      }
    }
  },
  created() {
    this.$store.commit('author/newUserList')
  },
  computed: {
    ...mapState('author', ['authorTableTitle', 'userList'])
  },
  methods: {
    add() {
      this.flag = 0
      this.form = {
        name: '',
        email: '',
        net: '',
        free: 0,
        state: 0,
        timer: ''
      }
      this.showDown = true
    },
    del(id) {
      this.$store.commit('author/del', { id })
    },
    edit(row) {
      this.flag = 1
      // 因为当前行的row拿到的是汉字，所以在展示当前行修改信息时，应该把汉字转化为数字，让我的单选框能够认识这个数字，并进行选中
      this.form = {
        id: row.id,
        level: 1,
        name: row.name,
        email: row.email,
        net: row.net,
        free: row.free === '免费' ? 0 : 1,
        state: row.state === '在线' ? 0 : 1,
        timer: row.timer
      }
      this.showDown = true
    },
    submit() {
      this.showDown = false
      if (this.flag === 0) {
        this.$store.commit('author/add', this.form)
      } else if (this.flag === 1) {
        this.$store.commit('author/edit', this.form)
      }
    },
    closeDialog() {
      this.showDown = false
    },
    changePageNum(pageNum) {}
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
#main {
  padding-top: (20 / @w);
  .content {
    padding: (20 / @w);
    .add {
      height: (35 / @w);
      padding: 0 10px;
      margin-bottom: (20 / @w);
      border: none;
      background-color: #67c23a;
      color: #fff;
      border-radius: (5 / @w);
      font-size: (12 / @w);
      &:hover {
        background-color: #5db631;
      }
    }
  }
}
</style>
