<template>
  <!-- Modal -->
  <div class="backdrop">
    <div class="modalContent h-100">
      <div class="modal-content shadow-none h-100">
        <div
          class="modal-header position-sticky top-0 border-0 bg-white"
          style="z-index: 1080"
        >
          <button type="button" class="btn-close invisible"></button>
          <h5 class="modal-title">{{ product.title || '' }}</h5>
          <button
            type="button"
            class="btn-close"
            @click.prevent="$emit('toggle-modal', 'product')"
          ></button>
        </div>
        <div class="modal-body text-break overflow-y-auto">
          <div class="mb-5">
            <label for="title" class="form-label mb-3">產品名稱</label>
            <input type="text" class="form-control" v-model.lazy="product.title">
          </div>
          <div class="mb-5">
            <label for="title" class="form-label mb-3">產品原價</label>
            <input type="number" class="form-control" v-model.lazy.number="product.origin_price">
          </div>
          <div class="mb-5">
            <label for="title" class="form-label mb-3">產品售價</label>
            <input type="number" class="form-control" v-model.lazy.number="product.price">
          </div>
          <p class="mb-3">產品內容</p>
          <div class="form-floating mb-5">
            <textarea class="form-control" id="product-content" rows="5" v-model.lazy="product.content"></textarea>
            <label for="product-content">輸入產品資訊</label>
          </div>
          <p class="mb-3">產品描述</p>
          <div class="form-floating mb-5">
            <textarea class="form-control" id="product-description" rows="5" v-model="product.description"></textarea>
            <label for="product-content">描述此產品外觀、使用方式</label>
          </div>
          <div class="mb-5">
            <label class="mb-3">產品數量</label>
            <input type="number" class="form-control" v-model.lazy.number="product.number">
          </div>
          <div class="mb-5">
            <label class="me-3">產品啟用</label>
            <input type="checkbox" class="form-check-input" >
          </div>
          <div class="d-flex align-items-start mb-5">
            <div class="mb-5 w-50">
              <div class="mb-3">
                <label class="mb-3">封面圖片</label>
                <input type="text" class="form-control" v-model="imgUrl">
              </div>
              <label for="upload" class="btn btn-outline-primary rounded-sm" >
                <input type="file" id="img" name="upload" class="d-none" accept="image/*">
                <span class="material-icons text-base align-text-bottom"> file_upload </span>
                上傳圖片
              </label>
            </div>
            <div class="w-50 px-4">
              <img :src="product.imageUrl || imgUrl" alt="上傳的圖片" class="rounded-md">
            </div>
          </div>

<!--             <li
              class="d-flex"
              :class="{ 'text-danger': !product.is_enabled >= 1 }"
            >
              <span class="material-icons-outlined me-3"> shopping_cart </span>
              <p v-if="product.is_enabled">
                剩下 {{ product.is_enabled }} / {{ product.num }}
                {{ product.unit }} 可販售
              </p>
              <p v-else>
                沒有庫存囉！目前尚有 {{ product.num }} {{ product.unit }} 未出貨
              </p>
            </li> -->
          <!-- img -->
          <div class="row mb-4 h-60">
            <div class="col-9 h-100">
              <div class="ratio-1x1 h-100">
                <img :src="product.imageUrl" alt="cake img" class="img h-100" />
              </div>
            </div>
            <div class="col-3 my-auto h-100 overflow-y-auto">
              <div
                class="ratio-1x1 w-100"
                v-for="img in product.imagesUrl"
                :key="img"
              >
                <img :src="img" alt="cake img" class="img h-1 mb-2" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn btn-outline-secondary"
            :data-id="product.id"
          >
            還原編輯
          </button>
          <button type="button" class="btn btn-outline-success" @click.prevent="editProduct(product)" >儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['temp', 'type'],
  emits: ['toggle-modal'],
  data () {
    return {
      product: null,
      imgUrl: ''
    }
  },
  methods: {
    deleteProduct (id) {
      this.$emit('deleteProduct', id)
    },
    editProduct (product) {
      this.$emit('editProduct', product)
    }
  },
  created () {
    if (this.type === 'edit') {
      this.product = this.temp
    } else if (this.type === 'new') {
      this.product = {}
      console.log(this.type, this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
//modal
.backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
}
.modalContent {
  background: #fff;
  width: 80%;
  border-radius: 10px;
  margin: 5% auto;
  max-height: 90%;
}
.modal-content {
  border: 0px solid #000;
}
.img {
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
}
.h-1 {
  height: 150px;
}
.h-60 {
  height: 60%;
}
.disabled {
  pointer-events: none;
  color: lightgray;
}
.overflow-y-auto {
  overflow-y: auto;
}
</style>
