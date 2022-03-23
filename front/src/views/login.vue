<template>
  <div>
    <MyToastr :toastr="toastr"></MyToastr>
    <div class="login-page" :style="{ height: height }">
      <div class="login-panel">
        <h1>海贼迷管理系统</h1>
        <p>
          <span>用户名</span
          ><input type="text" placeholder="用户名" v-model="username" />
        </p>
        <p>
          <span>密码</span
          ><input type="password" placeholder="密码" v-model="password" />
        </p>
        <div class="remember">
          <input type="checkbox" v-model="remember" /><span>记住密码</span>
        </div>
        <div class="buttonBox">
          <button v-on:click="login">{{ buttonTxt }}</button>
          <a href="#" v-on:click="toRegistor">{{ tipTxt }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginApp',

  data() {
    return {
      toastr: [], // 消息弹框
      height: '', // 页面高度
      username:
        JSON.parse(window.localStorage.getItem('remember') || '{}').username ||
        '',
      password:
        JSON.parse(window.localStorage.getItem('remember') || '{}').password ||
        '',
      buttonTxt: '登 录', // 按钮切换文本
      tipTxt: '没有账号?点击注册账号', // 提示信息切换文本
      remember:
        JSON.parse(window.localStorage.getItem('remember') || '{}').remember ||
        false,
      timer: null
    }
  },

  watch: {
    remember() {
      if (this.remember) {
        window.localStorage.setItem(
          'remember',
          JSON.stringify({
            remember: this.remember,
            username: this.username,
            password: this.password
          })
        )
      } else {
        window.localStorage.removeItem('remember')
      }
    }
  },

  created() {
    this.height = `${document.documentElement.clientHeight}px`
    this.resize()
  },

  methods: {
    resize() {
      window.onresize = function() {
        this.height = `${document.documentElement.clientHeight}px`
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    toRegistor() {
      this.username = ''
      this.password = ''
      if (this.buttonTxt === '登 录') {
        this.tipTxt = '返回登录'
        this.buttonTxt = '注 册'
      } else {
        this.buttonTxt = '登 录'
        this.tipTxt = '没有账号?点击注册账号'
      }
    },
    async login() {
      if (this.buttonTxt === '登 录') {
        const { data: res } = await this.$axios({
          method: 'post',
          url: '/login',
          data: {
            username: this.username,
            password: this.password
          }
        })
        if (res.status !== 200) {
          this.toastr = [true, res.msg, 2000, 'warning']
          return
        }
        this.toastr = [true, res.msg, 1500, 'success']
        setTimeout(() => {
          window.localStorage.setItem('token', res.token)
          this.$router.push('/home')
        }, 1500)
      } else {
        const { data: res } = await this.$axios({
          method: 'post',
          url: '/registor',
          data: {
            username: this.username,
            password: this.password
          }
        })
        if (res.status !== 200) {
          this.toastr = [true, res.msg, 2000, 'warning']
          return
        }
        this.toastr = [true, res.msg, 2000, 'success']
        this.buttonTxt = '登 录'
        this.tipTxt = '没有账号?点击注册账号'
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@w: 19.2vw;
.login-page {
  background: url("../assets/background.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  font-size: (16 / @w);
}
.login-panel {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-20%, -50%);
  width: (500 / @w);
  height: (500 / @w);
  padding: (50 / @w);
  border-radius: (20 / @w);
  background-color: #fff;
  border: (5 / @w) solid #b0c1c8;
  box-shadow: (10 / @w) (10 / @w) (10 / @w) rgba(0, 0, 0, 0.5);
}
h1 {
  margin-bottom: (60 / @w);
  color: #b29462;
}
.login-panel p {
  height: (50 / @w);
  margin-bottom: (50 / @w);
  padding-right: (20 / @w);
  font-size: (20 / @w);
  color: #19181d;
  display: flex;
}
.login-panel p:nth-of-type(2) {
  margin-bottom: 0;
}
.login-panel p span {
  width: (80 / @w);
}
.login-panel p input {
  flex: 1;
  padding: 0 (20 / @w);
  font-size: (20 / @w);
  color: #19181d;
  outline: none;
  border: (1 / @w) solid #dbdbdb;
  border-radius: (5 / @w);
}
.login-panel .remember {
  display: flex;
  align-items: center;
  margin-top: (10 / @w);
}
.login-panel .remember input {
  width: (20 / @w);
  height: (20 / @w);
  margin-right: (5 / @w);
}
.login-panel .remember span {
  font-size: (15 / @w);
  color: #19181d;
}
.buttonBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: (60 / @w);
  width: 60%;
}
.buttonBox button {
  width: 100%;
  height: (50 / @w);
  margin-bottom: (5 / @w);
  background-color: lightskyblue;
  border: none;
  font-size: (20 / @w);
  color: #fff;
  border-radius: (10 / @w);
}
.buttonBox button:hover {
  background-color: rgb(119, 200, 250);
}
</style>
