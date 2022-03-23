<template>
  <div id="main">
    <Crumbs firstLevel="用户管理" secondLevel="权限管理"></Crumbs>
    <div class="content">
      <MyTable :userList="userList">
        <template #header>
          <tr>
            <th>序号</th>
            <th>用户名</th>
            <th>性别</th>
            <th>出生日期</th>
            <th>家庭住址</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </template>
        <template #content="scope">
          <td>{{ scope.row.id }}</td>
          <td>{{ scope.row.name }}</td>
          <td>{{ scope.row.gender }}</td>
          <td>{{ scope.row.date }}</td>
          <td>{{ scope.row.address }}</td>
          <td>{{ scope.row.mark }}</td>
          <td>
            <button class="warning">分配角色</button>
            <button class="edit">管理</button>
            <button class="del">删除</button>
          </td>
        </template>
      </MyTable>
      <Pagination @changePageNum="changePageNum"></Pagination>
      <MyDialog
        :showDown="showDown"
        @submit="submit"
        @closeDialog="closeDialog"
      ></MyDialog>
    </div>
  </div>
</template>

<script>
import Crumbs from '../components/crumbs.vue'
import MyTable from '../components/myTable.vue'
import Pagination from '../components/pagination.vue'
import MyDialog from '../components/myDialog.vue'
export default {
  name: 'userAuthor',
  components: {
    Crumbs,
    MyTable,
    Pagination,
    MyDialog
  },
  data() {
    return {
      showDown: false,
      userList: [
        {
          id: 1,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 2,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 3,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 4,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 5,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 6,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 7,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 8,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 9,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        },
        {
          id: 10,
          name: '路飞',
          gender: 18,
          date: new Date(),
          address: '北京市',
          mark: '暂无备注'
        }
      ]
    }
  },

  methods: {
    edit() {
      this.showDown = true
    },
    submit() {
      this.showDown = false
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
  }
}
</style>
