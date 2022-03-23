<template>
  <div>
    <div class="main">
      <div class="aside" :style="{ height }">
        <h1>One Piece</h1>
        <div class="input">
          <input type="text" placeholder="搜索海米" />
        </div>
        <h3>导航提示</h3>
        <div class="nav">
          <div v-for="(item, index) in asideArr" :key="item.id">
            <p class="bg" :class="{ childBg: item.bg }" @click="toggle(index)">
              <i :class="item.iconfont"></i>{{ item.title }}
            </p>
            <div>
              <ul :style="{ height: item.height }">
                <li
                  v-for="(item2, index2) in item.children"
                  :key="item2.id"
                  :class="{ childBg: item2.childBg }"
                  @click="toggleChild(index, index2, item2.path)"
                >
                  <i :class="item2.iconfont"></i>{{ item2.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="nav">
          <button @click="exit">退出</button>
        </div>
        <!-- 子页面 -->
        <keep-alive exclude="Persondetail">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHome',

  data() {
    return {
      toastr: [], // 消息弹框
      height: '', // 页面高度
      asideArr: [
        {
          id: 1,
          title: '用户管理',
          height: '0px',
          iconfont: 'iconfont icon-yonghu',
          children: [
            {
              id: 1,
              title: '编辑用户',
              path: '/home/addUser',
              iconfont: 'iconfont icon-yingyongzhongxin'
            },
            {
              id: 2,
              title: '权限管理',
              path: '/home/author',
              iconfont: 'iconfont icon-yingyongzhongxin'
            },
            {
              id: 3,
              title: '用户配置',
              path: '/home/userConfig',
              iconfont: 'iconfont icon-yingyongzhongxin'
            }
          ]
        },
        {
          id: 2,
          title: '免费资源',
          height: '0px',
          iconfont: 'iconfont icon-ziyuan',
          children: [
            {
              id: 1,
              title: '人物介绍',
              path: '/home/personIntro',
              iconfont: 'iconfont icon-lifangtilitiduomiantifangkuai2'
            },
            {
              id: 2,
              title: '在线影院',
              path: '/home/movie',
              iconfont: 'iconfont icon-lifangtilitiduomiantifangkuai2'
            },
            {
              id: 3,
              title: '我的收藏',
              path: '/home/favorite',
              iconfont: 'iconfont icon-lifangtilitiduomiantifangkuai2'
            }
          ]
        },
        {
          id: 3,
          title: '海贼社团',
          height: '0px',
          iconfont: 'iconfont icon-tuandui',
          children: [
            {
              id: 1,
              title: '全部社区',
              path: '/home/community',
              iconfont: 'iconfont icon-wangluo'
            },
            {
              id: 2,
              title: '火热资讯',
              path: '/home/information',
              iconfont: 'iconfont icon-wangluo'
            },
            {
              id: 3,
              title: '我的社区',
              path: '/home/myUnity',
              iconfont: 'iconfont icon-wangluo'
            }
          ]
        },
        {
          id: 4,
          title: '系统设置',
          path: '/home/systemConfig',
          height: '0px',
          iconfont: 'iconfont icon-xitongshezhi',
          bg: false
        }
      ]
    }
  },

  created() {
    this.height = `${document.documentElement.clientHeight}px`
    // 刷新页面判断导航栏信息，应该展开并激活哪个
    const path = this.$router.app._route.path
    this.asideArr.forEach((item, index) => {
      if (item.path === path) {
        item.bg = true
      }
      if (item.children) {
        item.children.forEach((item2) => {
          if (item2.path === path) {
            item2.childBg = true
            this.asideArr[index].height = '120px'
          }
        })
      }
    })
  },

  methods: {
    // 控制伸缩
    toggle(index) {
      // 判断最后一项的跳转与样式
      if (this.asideArr[index].title === '系统设置') {
        this.asideArr[index].bg = true
        this.$router.push('/home/systemConfig')
        // 全部都不激活
        this.asideArr.forEach((item) => {
          if (item.children) {
            item.children.forEach((item2) => {
              item2.childBg = false
            })
          }
        })
      }
      // 排他伸缩
      this.asideArr.forEach((item) => {
        item.height = '0px'
      })
      this.asideArr[index].height = '120px'
    },
    // 控制单个颜色，并跳转路由
    toggleChild(index, index2, path) {
      /**
       * index是我初次渲染每个大ul块的时候给每个小li的点击事件中传入的索引，让我知道我点击的是哪个大ul
       * index2是我渲染每个小li的时候给每个li绑定的索引，让我知道我点击的是每个大ul下哪个小li
       */
      // 全部都不激活
      this.asideArr.forEach((item) => {
        item.bg = false
        if (item.children) {
          item.children.forEach((item2) => {
            item2.childBg = false
          })
        }
      })
      // 单个块不激活
      // this.asideArr[index].children.forEach((item) => {
      //   item.childBg = false;
      // });
      this.asideArr[index].children[index2].childBg = true
      this.$router.push(path)
    },
    exit() {
      if (confirm('您确定要退出吗')) {
        window.localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.main {
  display: flex;
  font-size: (16 / @w);
  .aside {
    width: (350 / @w);
    background-color: #2c2f3f;
    h1 {
      height: (100 / @w);
      line-height: (100 / @w);
      text-align: center;
      color: #1aa6fd;
      font-size: (40 / @w);
    }
    .input {
      padding-right: (40 / @w);
      height: (35 / @w);
      input {
        width: 100%;
        height: 100%;
        padding: (20 / @w);
        border: none;
        outline: none;
        background-color: #3b3e4d;
        color: #b3b6bb;
        font-size: (18 / @w);
        &::placeholder {
          color: #b3b6bb;
        }
      }
    }
    h3 {
      margin: (20 / @w) 0;
      padding-left: (5 / @w);
      font-size: (12 / @w);
      font-weight: normal;
      color: #e1e2e3;
    }
    .nav {
      padding-right: (40 / @w);
      div {
        cursor: pointer;
        p {
          height: (40 / @w);
          line-height: (40 / @w);
          padding-left: (20 / @w);
          color: #e1e2e3;
          transition: all 1s;
          i {
            width: (30 / @w);
            margin-right: (20 / @w);
            font-size: (18 / @w);
          }
        }
        div {
          overflow: hidden;
          ul {
            padding-left: (40 / @w);
            transition: all 1s;
            li {
              // 因为需要js操作，无法写活
              height: 40px;
              line-height: 40px;
              padding-left: (20 / @w);
              color: #e1e2e3;
              transition: all 0.5s;
              i {
                width: (30 / @w);
                margin-right: (30 / @w);
                font-size: (16 / @w);
              }
            }
          }
        }
        .bg {
          position: relative;
          background-color: #3c3f4e;
          &::before {
            content: "";
            position: absolute;
            left: (5 / @w);
            top: 0;
            width: (7 / @w);
            height: 100%;
            background-color: #5da6eb;
          }
        }
        .childBg {
          color: #1aa6fd;
        }
      }
    }
  }
  .content {
    flex: 1;
    .nav {
      position: relative;
      height: (60 / @w);
      background-color: #3d4a5d;
      button {
        position: absolute;
        top: 50%;
        right: (50 / @w);
        transform: translateY(-50%);
        width: (60 / @w);
        height: (35 / @w);
        border: none;
        border-radius: (5 / @w);
        background-color: #1aa6fd;
        color: #fff;
        font-size: (16 / @w);
        &:hover {
          background-color: #1195e7;
        }
      }
    }
  }
}
</style>
