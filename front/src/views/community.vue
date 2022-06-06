<template>
  <!-- 使用antd + vue -->
  <div>
    <!-- 搜索表单 -->
    <div class="add">
      <a-button style="margin: 10px 20px;" type="primary" size="large" @click="add">添加</a-button>
      <a-range-picker @change="dateChange" :locale="locale" />
      <a-button style="margin: 10px 20px;" type="primary">搜索</a-button>
    </div>
    <!-- 表格 -->
    <div class="table" style="padding: 10px 20px;">
      <a-table :columns="columns" :data-source="tableData" :rowKey="row => row.Id" :pagination="false">
        <a slot="name" slot-scope="text" @click="nameEvent(text)">{{ text }}</a>
        <a slot="age" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="action">
          <a-button style="margin-right: 5px;" type="primary" size="small" @click="edit(action)">修改</a-button>
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="delConfirm(action.Id)"
          >
            <a-button type="danger" size="small">删除</a-button>  
          </a-popconfirm>
        </span>
      </a-table>
      <a-pagination style="float: right; margin-top: 10px;" @change="pageNumChange" @showSizeChange="showSizeChange" size="small" :pageSize="10" :pageSizeOptions="['5','10','15','20']" :total="total" show-size-changer show-quick-jumper />
    </div>
    <!-- 对话框 -->
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="姓名">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="年龄">
          <a-input v-model="form.age" />
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-input v-model="form.gender" />
        </a-form-model-item>
        <a-form-model-item label="号码">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="所属海贼团">
          <a-input v-model="form.club" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "antd",

  data() {
    return {
      pageNum: 1, // 页数
      columns: [
        {
          title: "序号",
          dataIndex: 'Id',
          key: 'Id',
          width: 100
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
          scopedSlots: { customRender: "age" },
        },
        {
          title: "性别",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "手机号",
          dataIndex: "phone",
          key: "phone",
          ellipsis: true,
          width: 100
        },
        {
          title: "俱乐部",
          dataIndex: "club",
          key: "club",
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      tableData: [],
      total: 0,
      locale: {
        "lang": {
          "placeholder": "Select date",
          "rangePlaceholder": ["开始时间", "结束时间"],
          "today": "Today",
          "now": "Now",
          "backToToday": "Back to today",
          "ok": "Ok",
          "clear": "Clear",
          "month": "Month",
          "year": "Year",
          "timeSelect": "Select time",
          "dateSelect": "Select date",
          "monthSelect": "Choose a month",
          "yearSelect": "Choose a year",
          "decadeSelect": "Choose a decade",
          "yearFormat": "YYYY",
          "dateFormat": "M/D/YYYY",
          "dayFormat": "D",
          "dateTimeFormat": "M/D/YYYY HH:mm:ss",
          "monthFormat": "MMMM",
          "monthBeforeYear": true,
          "previousMonth": "Previous month (PageUp)",
          "nextMonth": "Next month (PageDown)",
          "previousYear": "Last year (Control + left)",
          "nextYear": "Next year (Control + right)",
          "previousDecade": "Last decade",
          "nextDecade": "Next decade",
          "previousCentury": "Last century",
          "nextCentury": "Next century"
        },
        "timePickerLocale": {
          "placeholder": "Select time"
        },
        "dateFormat": "YYYY-MM-DD",
        "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
        "weekFormat": "YYYY-wo",
        "monthFormat": "YYYY-MM"
      },
      visible: false,
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        name: '',
        age: '',
        gender: '',
        phone: '',
        club: ''
      },
      isEdit: false
    };
  },

  created() {
    this.query()
  },

  methods: {
     async query() {
      const { data: res } = await this.$axios.get('/queryUser', {
        params: { pageNum: this.pageNum }
      })
      if (res.status !== 200) {
        this.$message.error(res.msg);
        return
      }
      this.$message.success(res.msg);
      this.tableData = res.data
      this.total = res.total
     },
     // 名字插槽事件
     nameEvent(e) {
       console.log(e);
     },  
     // 事件选择器
     dateChange(e) {
       console.log(e[0]._d.toLocaleDateString(), e[1]._d.toLocaleDateString());
     },
     async delConfirm(id) {
       const { data: res } = await this.$axios.delete('/delUser', { params: { id } })
       if (res.status !== 200) {
         this.$message.warning(res.msg)
         return
       }
       this.query()
       this.$message.success(res.msg)
     },
     add() {
       this.form = {}
       this.isEdit = false
       this.visible = true
     },
     edit(row) {
       this.isEdit = true
       this.form = Object.assign({}, this.form, row)
       this.visible = true
     },
     handleOk() {
       this.confirmLoading = true
       setTimeout(async () => {
         this.confirmLoading = false
         if(this.isEdit) {
           const { data: res } = await this.$axios.post('/editUser', this.form)
           if (res.status !== 200) {
             this.$message.warning(res.msg)
             return
           }
           this.$message.success(res.msg)
         }else {
           const { data: res } = await this.$axios.post('/addUser', this.form)
           if (res.status !== 200) {
             this.$message.warning(res.msg)
             return
           }
           this.$message.success(res.msg)
         }
        this.query()
        this.visible = false
       }, 500)
     },
     handleCancel() {
       this.visible = false
     },
     pageNumChange(e) {
       this.pageNum = e
       this.query()
     },
     showSizeChange(current, size) {
       console.log(size);
     }
  },
};
</script>

<style scoped>
</style>
