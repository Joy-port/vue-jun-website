<template>
  <div>
      <table class="table align-middle" v-if="!empty">
        <thead>
          <tr>
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否啟用</th>
            <th scope="col">查看細節</th>
            <th scope="col">編輯</th>
            <th scope="col">刪除</th>
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
                  @click.prevent="toggleModal('product-read')"
                  >查看細節</a
                >
              </td>
              <td><button type="button" class="btn btn-outline-success" @click.prevent="toggleModal('product-edit', product.id)">編輯</button></td>
              <td><button type="button" class="btn btn-outline-danger" @click.prevent="toggleModal('check-delete', product.id)" >刪除</button></td>
            </tr>
            <ProductModal v-if="productModal" :temp='product' :type="modalType.category" @toggle-modal="toggleModal" @delete-product="deleteProduct" @edit-product="editProduct"> </ProductModal>
            <CheckModal v-if="checkModalStatus" :title="check.title" :msg="check.msg" :action="check.action" :id="product.id" @toggle-modal="toggleModal" @delete-product="deleteProduct(product.id)"></CheckModal>
          </template>
        </tbody>
      </table>
      <p class="text-center" v-else> 沒有商品呦～趕快來新增吧
        <!-- router link to new product -->
        <button type="button">新增商品</button>
      </p>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import CheckModal from '@/components/CheckModal.vue'

export default {
  name: 'Admin',
  components: {
    ProductModal,
    CheckModal
  },
  data () {
    return {
      products: [],
      modalType: {
        type: '',
        category: ''
      },
      productModal: false,
      checkModalStatus: false,
      check: {
        title: '',
        msg: '',
        action: ''
      },
      token: '',
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'joy-hex',
      empty: true,
      id: ''
    }
  },
  methods: {
    getTokenData () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = token
    },
    getProduct () {
      const url = this.url
      const path = this.path
      this.axios.get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          console.log('success', res.data)
          this.products = res.data.products
          if (this.products.length === 0) {
            this.empty = true
          } else {
            this.empty = false
          }
        })
        .catch((err) => {
          console.error(err.response)
          this.loginCheck()
        })
    },
    addProduct () {
      console.log('success')
    },
    deleteProduct () {
      this.loginCheck()
      const url = this.url
      const path = this.path
      const id = this.id
      this.axios.delete(`${url}/api/${path}/admin/product/${id}`)
        .then(() => {
          this.checkModalStatus = !this.checkModalStatus
          this.getProduct()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    editProduct (product) {
      const url = this.url
      const path = this.path
      const id = this.id
      const editData = product
      console.log(product, id)
      this.axios
        .put(`${url}/api/${path}/admin/product/${id}`, { data: editData })
        .then(() => {
          this.productModal = !this.productModal
          this.getProduct()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getTokenData()
    this.getProduct()
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
    },
    checkModalStatus: {
      handler: function (n, o) {
        if (n) {
          this.inputModalData(this.modalType.category, this.id)
        }
      },
      deep: true
    }
  }
}
</script>
