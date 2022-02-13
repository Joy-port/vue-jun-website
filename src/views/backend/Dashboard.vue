<template>
  <div class="">
    <Alert v-if="!alert.hide" :title="alert.title" :msg="alert.msg" :status="alert.loginStatus" :leave="alert.leave"></Alert>
    <nav class="d-flex justify-content-between bg-success px-10 py-5">
      <div class="d-flex">
        <a href="#" class="d-flex text-white">
          <span class="material-icons me-3"> widgets </span>
          後台管理</a
        >
      </div>
      <div class="d-flex gap-4">
        <a href="#" class="d-flex text-white">
          <span class="material-icons me-3"> home </span>
          前往前台</a
        >
        <a href="#" class="d-flex text-white"  @click.prevent="logout">
          <span class="material-icons me-3"> logout </span>
          登出</a
        >
      </div>
    </nav>
    <div class="d-flex vh-100">
      <ul class="menu-list border-top border-2 border-teal">
        <li class=""><a href="#" class="menu-link">產品</a></li>
        <ul class="menu-child-list">
          <li class=""><router-link to="/dashboard">產品列表</router-link></li>
          <li class=""><a href="#" class="">新增產品</a></li>
        </ul>
        <li class=""><a href="#" class="menu-link">訂單</a></li>
        <ul class="menu-child-list">
          <li class=""><a href="#" class="">訂單列表</a></li>
        </ul>
        <li class=""><a href="#" class="menu-link">優惠券</a></li>
        <ul class="menu-child-list">
          <li class=""><a href="#" class="">優惠券列表</a></li>
          <li class=""><a href="#" class="">新增優惠券</a></li>
        </ul>
        <li class=""><a href="#" class="menu-link">文章</a></li>
        <ul class="menu-child-list">
          <li class=""><a href="#" class="">文章列表</a></li>
          <li class=""><a href="#" class="">新增文章</a></li>
        </ul>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'Dashboard',
  components: {
    Alert
  },
  data () {
    return {
      alert: {
        loginStatus: null,
        leave: false,
        hide: false,
        msg: '',
        title: ''
      },
      check: false,
      token: '',
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'joy-hex'
    }
  },
  methods: {
    alertMsgLeave (time) {
      setTimeout(() => {
        this.alert.leave = true
      }, time)
    },
    getTokenData () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = token
    },
    loginCheck () {
      const url = this.url
      this.getTokenData()
      this.axios
        .post(`${url}/api/user/check`)
        .then(() => {
          this.alert.loginStatus = true
          this.alert.title = '登入成功'
          this.getProduct()
        })
        .then(() => {
          this.alertMsgLeave(3000)
        })
        .catch((err) => {
          console.error(err.response)
          this.alert.loginStatus = false
          this.alert.title = '登入失敗'
          if (err.response.status === 403) {
            this.alert.msg = '登入已過時，請重新登入'
          } else {
            this.alert.msg = err.response.message
          }
          this.alertMsgLeave(500)
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        })
    },
    logout () {
      const url = this.url
      this.getTokenData()
      this.axios
        .post(`${url}/logout`)
        .then((res) => {
          this.$router.push('/login')
        })
        .catch((err) => {
          this.alert.hide = false
          this.alert.loginStatus = false
          this.alert.title = '登出失敗'
          this.alert.msg = err.response.data.message
          this.alertMsgLeave(1000)
        })
    }
  }
}
</script>
