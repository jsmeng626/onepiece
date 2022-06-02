<template>
  <div>
    <MyToastr :toastr="toastr"></MyToastr>
    <div class="main">
      <Crumbs firstLevel="用户管理" secondLevel="编辑用户"></Crumbs>
      <div class="content">
        <button class="add" @click="add">添加用户</button>
        <MyTable :userList="userList" :isShowTip="isShowTip">
          <template #header>
            <tr>
              <th>序号</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>号码</th>
              <th>海贼团</th>
              <th>操作</th>
            </tr>
          </template>
          <template #content="scope">
            <td>{{ scope.row.Id }}</td>
            <td>{{ scope.row.name }}</td>
            <td>{{ scope.row.age }}</td>
            <td>{{ scope.row.gender }}</td>
            <td>{{ scope.row.phone }}</td>
            <td>{{ scope.row.club }}</td>
            <td>
              <button class="edit" @click="edit(scope.row)">编辑</button>
              <button class="del" @click="del(scope.row.Id)">删除</button>
            </td>
          </template>
        </MyTable>
        <Pagination @changePageNum="changePageNum"></Pagination>
        <MyDialog
          :showDown.sync="showDown"
          @closeDialog="closeDialog"
          @submit="submit"
        >
          <template #content>
            <p>
              <span>姓名</span
              ><input type="text" v-model.trim="userInfo.name" />
            </p>
            <p>
              <span>年龄</span
              ><input type="number" v-model.number="userInfo.age" />
            </p>
            <p>
              <span>性别</span
              ><input type="text" v-model.trim="userInfo.gender" />
            </p>
            <p>
              <span>号码</span
              ><input type="number" v-model.number="userInfo.phone" />
            </p>
            <p>
              <span>所属海贼团</span
              ><input type="text" v-model.trim="userInfo.club" />
            </p>
          </template>
        </MyDialog>
      </div>
    </div>
  </div>
</template>

<script>
import Crumbs from '../components/crumbs.vue'
import MyTable from '../components/myTable.vue'
import Pagination from '../components/pagination.vue'
import MyDialog from '../components/myDialog.vue'
export default {
  name: 'Adduser',
  components: {
    Crumbs,
    Pagination,
    MyTable,
    MyDialog
  },
  data() {
    return {
      toastr: [], // 消息弹框
      height: '', // 页面高度
      userList: [], // 用户列表
      pageNum: 1, // 页数
      showDown: false, // 对话框显示隐藏
      dialogFlag: 0, // 对话框标记，0代表添加，1代表修改
      // 对话框人物信息
      userInfo: {
        name: '',
        age: '',
        gender: '',
        phone: '',
        club: ''
      }
    }
  },
  computed: {
    // 表格是否提示无数据
    isShowTip() {
      return this.userList.length === 0
    }
  },
  created() {
    console.log('created')
    this.query()
  },
  activated() {
    console.log('activated被激活了')
  },
  deactivated() {
    console.log('失活了')
  },
  methods: {
    // 查询
    async query() {
      const { data: res } = await this.$axios.get('/queryUser', {
        params: { pageNum: this.pageNum }
      })
      if (res.status !== 200) {
        this.toastr = [true, res.msg, 2000, 'danger']
        return
      }
      this.userList = res.data
      // this.toastr = [true, res.msg, 2000, "success"];
    },
    // 添加按钮
    add() {
      this.showDown = true
      this.dialogFlag = 0
      for (const key in this.userInfo) {
        this.userInfo[key] = ''
      }
    },
    // 对话框提交按钮
    async submit() {
      this.showDown = false
      if (this.dialogFlag === 0) {
        const { data: res } = await this.$axios.post('/addUser', this.userInfo)
        if (res.status !== 200) {
          this.toastr = [true, res.msg, 2000, 'danger']
          return
        }
        this.query()
        this.toastr = [true, res.msg, 2000, 'success']
      } else if (this.dialogFlag === 1) {
        const { data: res } = await this.$axios.post(
          '/editUser',
          this.userInfo
        )
        if (res.status !== 200) {
          this.toastr = [true, res.msg, 2000, 'danger']
          return
        }
        this.query()
        this.toastr = [true, res.msg, 2000, 'success']
      }
    },
    // 对话框关闭按钮
    closeDialog() {
      this.showDown = false
    },
    // 修改按钮
    edit(row) {
      this.dialogFlag = 1
      this.showDown = true
      for (const key in row) {
        this.userInfo[key] = row[key]
      }
    },
    // 删除按钮
    async del(id) {
      if (!confirm('确定要删除吗')) return
      const { data: res } = await this.$axios.delete('/delUser', {
        params: { id }
      })
      if (res.status !== 200) {
        this.toastr = [true, res.msg, 2000, 'danger']
        return
      }
      this.query()
      this.toastr = [true, res.msg, 2000, 'success']
    },
    // 切换上下页
    changePageNum(pageNum) {
      this.pageNum = pageNum
      this.query()
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.main {
  padding-top: (20 / @w);
  font-size: (16 / @w);
  .content {
    padding: (20 / @w);
    .add {
      width: (80 / @w);
      height: (35 / @w);
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
