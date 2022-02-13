<template>
  <div>
    <div class="login vh-100" >
      <div
        class="login-block"
      >
      <div class="login-form">
        <h2 class="fs-3 mb-10 text-gray-800">歡迎登入</h2>
        <!-- login status -->
        <Alert v-if="!alert.hide" :title="alert.title" :msg="alert.msg" :status="alert.loginStatus" :leave="alert.leave"></Alert>
        <form
          action="/"
          method="post"
          class="text-center text-gray-800"
          @submit.prevent="getLoginData"
        >
          <div class="d-flex align-items-center gap-2 text-nowrap mb-3">
            <label for="username" class="">帳號</label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
              v-model="user.username"
            />
          </div>
          <div class="d-flex align-items-center gap-2 text-nowrap mb-10">
            <label for="password" class="">密碼</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              v-model="user.password"
            />
          </div>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="getLoginData"
          >
            登入
          </button>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'Login',
  components: {
    Alert
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'joy-hex',
      alert: {
        loginStatus: null,
        leave: false,
        hide: false,
        msg: '',
        title: ''
      }
    }
  },
  methods: {
    alertMsgLeave (time) {
      setTimeout(() => {
        this.alert.leave = true
      }, time)
    },
    getLoginData () {
      const user = this.user
      const url = this.url
      this.axios
        .post(`${url}/admin/signin`, user)
        .then((res) => {
          if (res.data.success) {
            this.alert.loginStatus = true
            this.alert.title = '登入成功'
            this.saveToken(res.data)
            this.$router.push('/dashboard')
          } else {
            this.alert.loginStatus = false
            this.alert.title = '登入失敗'
            console.error(res.status)
          }
        })
        .catch((err) => {
          this.alert.loginStatus = false
          this.alert.title = '登入失敗'
          this.alert.msg = '帳號或密碼錯誤，請重新填寫'
          console.dir(err)
        })
        .then(() => {
          setTimeout(() => {
            this.alert.leave = true
            this.user.username = ''
            this.user.password = ''
          }, 1000)
        })
    },
    saveToken (data) {
      const { token, expired } = data
      const path = this.path
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
      document.cookie = `apiPath=${path}; expires=${new Date(expired)}`
    },
    getTokenData () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = token
    },
    logoutCheck () {
      const url = this.url
      this.getTokenData()
      this.axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.alert.loginStatus = false
          this.alert.title = '請重新登出'
          this.saveToken(res.data)
          this.$router.push('/dashboard')
        })
        .then(() => {
          this.alertMsgLeave(3000)
        })
        .catch((err) => {
          this.alert.loginStatus = true
          this.alert.title = '成功登出'
          this.alert.msg = err.response.message
          this.alertMsgLeave(500)
        })
    }
  },
  mounted () {
    this.logoutCheck()
  },
  watch: {
    'alert.leave': {
      handler: function (n, o) {
        if (n) {
          setTimeout(() => {
            this.alert.hide = true
          }, 500)
        }
      },
      deep: true
    }
  }
}
</script>
