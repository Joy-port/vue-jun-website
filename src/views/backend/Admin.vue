<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-3">
    <h1 class="fw-normal text-dark-green">產品列表</h1>
            <!-- router link to new product -->
        <a href="/dashboard/newProduct" class="btn btn-success px-6 py-2">新增商品</a>
    </div>
      <table class="table align-middle text-dark-green fw-light" v-if="!empty">
        <thead>
          <tr class="text-center text-dark-green">
            <th scope="col">產品名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">編輯</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="product in products" :key="product.id">
            <tr :data-id="product.id">
              <th scope="row">{{ product.title }}</th>
              <td class="text-center">NT ${{ product.origin_price }}</td>
              <td class="text-center">NT ${{ product.price }}</td>
              <td class="text-center"><button type="button" class="btn btn-outline-success" @click.prevent="toggleModal('product-edit', product.id)">編輯</button></td>
              <td class="text-center"><button type="button" class="btn btn-outline-danger" @click.prevent="toggleModal('check-delete', product.id)" >刪除</button></td>
            </tr>
            <ProductModal v-if="productModal" :temp='product' :type="modalType.category" @toggle-modal="toggleModal" @delete-product="deleteProduct" @edit-product="editProduct"> </ProductModal>
            <CheckModal v-if="checkModalStatus" :title="check.title" :msg="check.msg" :action="check.action" :id="product.id" @toggle-modal="toggleModal" @delete-product="deleteProduct(product.id)"></CheckModal>
          </template>
        </tbody>
      </table>
      <p class="text-center" v-else> 沒有商品呦～趕快來新增吧</p>
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
    toggleModal (type, id = '') {
      this.modalType.type = type.split('-')[0]
      this.modalType.category = type.split('-')[1]
      if (!id && this.modalType.category === 'new') {
        this.productModal = !this.productModal
        this.addProduct()
      }
      this.id = id
      if (this.modalType.type === 'product') {
        this.productModal = !this.productModal
      } else if (this.modalType.type === 'check') {
        this.checkModalStatus = !this.checkModalStatus
      }
    },
    inputModalData (type) {
      if (type === 'delete') {
        this.check.title = '刪除商品'
        this.check.msg = '確認是否刪除該商品'
        this.check.action = '刪除'
      }
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
