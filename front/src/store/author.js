export default {
  namespaced: true,
  state: () => ({
    authorTableTitle: [
      { id: 1, prop: 'id', lable: '序号', width: '100' },
      { id: 2, prop: 'name', lable: '姓名', width: '100' },
      { id: 3, prop: 'email', lable: '邮箱', width: '' },
      { id: 4, prop: 'net', lable: '网络状态', width: '100' },
      { id: 5, prop: 'level', lable: '账号等级', width: '100' },
      { id: 6, prop: 'free', lable: '资源免费', width: '100' },
      { id: 7, prop: 'state', lable: '是否在线', width: '100' },
      { id: 8, prop: 'timer', lable: '在线时长', width: '100' }
    ],
    userList: [{
      id: 1,
      name: '路飞',
      email: '2710099523@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 1,
      timer: 20
    },
    {
      id: 2,
      name: '索隆',
      email: '2509000835@qq.com',
      net: '2G',
      level: 1,
      free: 1,
      state: 1,
      timer: 20
    },
    {
      id: 3,
      name: '娜美',
      email: '2345685412@qq.com',
      net: '2G',
      level: 1,
      free: 1,
      state: 1,
      timer: 20
    },
    {
      id: 4,
      name: '山治',
      email: '2346574563@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 0,
      timer: 20
    },
    {
      id: 5,
      name: '乌索普',
      email: '3456457573@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 1,
      timer: 20
    },
    {
      id: 6,
      name: '乔巴',
      email: '4564374356@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 1,
      timer: 20
    },
    {
      id: 7,
      name: '弗兰奇',
      email: '3456783456@qq.com',
      net: '2G',
      level: 1,
      free: 1,
      state: 0,
      timer: 20
    },
    {
      id: 8,
      name: '罗宾',
      email: '2343567855@qq.com',
      net: '2G',
      level: 1,
      free: 1,
      state: 1,
      timer: 20
    },
    {
      id: 9,
      name: '布鲁克',
      email: '3423567853@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 0,
      timer: 20
    },
    {
      id: 10,
      name: '甚平',
      email: '2345434567@qq.com',
      net: '2G',
      level: 1,
      free: 0,
      state: 1,
      timer: 20
    }, {
      id: 11,
      name: '罗',
      email: '5674568634@qq.com',
      net: '2G',
      level: 1,
      free: 1,
      state: 1,
      timer: 20
    }]
  }),
  mutations: {
    newUserList(state) {
      state.userList.forEach(item => {
        item.free = item.free === 0 ? '免费' : '未开通'
        item.state = item.state === 0 ? '在线' : '离线'
      })
    },
    del(state, payload) {
      const index = state.userList.findIndex(item => item.id === payload.id)
      state.userList.splice(index, 1)
    },
    add(state, payload) {
      const id = state.userList.length > 0 ? state.userList[state.userList.length - 1].id + 1 : 1
      const { name, email, net, free, timer } = payload
      // 因为我在 newUserList 方法中将数据列表中的free和status转化为了汉字
      // 所以我在添加的时候，应该把我选中过状态转化为汉字，我算中的状态由label决定，我的label是数字0||1，所以选中后拿到的值也是0||1
      state.userList.push({
        id,
        level: 1,
        name,
        email,
        net,
        free: free === 0 ? '免费' : '未开通',
        state: payload.state === 0 ? '在线' : '离线',
        timer
      })
    },
    edit(state, payload) {
      const index = state.userList.findIndex(item => item.id === payload.id)
      const { id, name, email, net, free, timer } = payload
      // 同样修改后的值，也应该转化为汉字去进行渲染操作，因为我整个表格是渲染出来的，不支持数字的变化
      state.userList.splice(index, 1, {
        id,
        level: 1,
        name,
        email,
        net,
        free: free === 0 ? '免费' : '未开通',
        state: payload.state === 0 ? '在线' : '离线',
        timer
      })
    }
  },
  getters: {}
}
