<template>
    <div>
      <Alert v-if="!alert.hide" :title="alert.title" :msg="alert.msg" :status="alert.loginStatus" :leave="alert.leave"></Alert>
      <header class="container d-flex align-items-center">
        <div class='btn btn-outline-white text-white'>兩字</div>
        <h1 class="text-center py-5 mx-auto">甜點商店後台</h1>
        <button type="button" class="btn btn-outline-primary ms-auto" @click="logout">登出</button>
      </header>
        <div class="container">
          <table class="table align-middle" v-if="!empty">
            <thead>
              <tr>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in products" :key="product.id">
                <tr :data-id="product.id">
                  <th scope="row">{{ product.title }}</th>
                  <td>NT ${{ product.origin_price }}</td>
                  <td>NT ${{ product.price }}</td>
                  <td>
                    <a href="#" class="btn" :class="{'btn-success': product.is_enabled, 'btn-light': !product.is_enabled }" @click.prevent="changeEnabled(product.id)"
                      >{{product.is_enabled ? '啟用':'不啟用'}}</a
                    >
                  </td>
                  <td>
                    <a
                      href="#"
                      class="btn btn-primary"
                      @click.prevent="toggleModal"
                      >查看細節</a
                    >
                  </td>
                </tr>
                <Modal v-if="showModal" :temp='product' @toggle-modal="toggleModal"> </Modal>
              </template>
            </tbody>
          </table>
          <p class="text-center" v-else> 沒有商品呦～趕快來新增吧</p>
        </div>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'Dashboard',
  components: {
    Modal,
    Alert
  },
  data () {
    return {
      products: [],
      showModal: false,
      token: '',
      alert: {
        loginStatus: null,
        leave: false,
        hide: false,
        msg: '',
        title: ''
      },
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'joy-hex',
      empty: true
    }
  },
  methods: {
    toggleModal () {
      this.showModal = !this.showModal
      console.log(this.showModal)
    },
    alertMsgLeave (time) {
      setTimeout(() => {
        this.alert.leave = true
      }, time)
    },
    changeEnabled (id) {
      this.products.forEach(item => {
        if (item.id === id) {
          item.is_enabled = !item.is_enabled
        }
      })
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
        .then((res) => {
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
    },
    getProduct () {
      const url = this.url
      const path = this.path
      this.axios.get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products
          if (this.products.length === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
        })
        .catch((err) => {
          console.error(err.response)
        })
    },
    deleteProduct (id) {
      const url = this.url
      const path = this.path
      alert('是否刪除？')
      this.axios.delete(`${url}/api/${path}/admin/product/${id}`)
        .then((res) => {
          this.products = res.data.products
          console.log(this.products)
          alert('成功刪除')
        })
        .catch((err) => {
          console.error(err.response)
        })
    }
  },
  mounted () {
    this.loginCheck()
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
