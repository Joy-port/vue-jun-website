<template>
  <!-- Modal -->
  <div class="backdrop">
    <div class="modalContent h-100">
      <div class="modal-content h-100">
        <div
          class="modal-header position-sticky top-0 border-0 bg-white"
          style="z-index: 1080"
        >
          <button type="button" class="btn-close invisible"></button>
          <h5 class="modal-title">{{ product.title }}</h5>
          <button
            type="button"
            class="btn-close"
            @click.prevent="$emit('toggleModal')"
          ></button>
        </div>
        <div class="modal-body text-break overflow-y-auto">
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
          <ul class="container mb-0">
            <li class="d-flex align-items-start mb-3">
              <span class="badge bg-warning fs-6 me-3">{{
                product.category
              }}</span>
              <p class="mb-0 pe-5">{{ product.description }}</p>
            </li>
            <li class="d-flex">
              <span class="material-icons-outlined me-3"> cake </span>
              <p>{{ product.content }}</p>
            </li>
            <li class="d-flex">
              <span class="material-icons-outlined me-3"> local_offer </span>
              <p class="">
                NT
                <span class="text-decoration-line-through"
                  >${{ product.origin_price }}</span
                >
                <span class="text-danger">${{ product.price }}</span> /
                {{ product.unit }}
              </p>
            </li>
            <li
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
            </li>
          </ul>
        </div>
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn btn-outline-primary"
            :data-id="product.id"
          >
            編輯
          </button>
          <button type="button" class="btn btn-outline-danger">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['temp'],
  data () {
    return {
      product: this.temp
    }
  },
  methods: {
    closeModal () {
      this.$emit('toggleModal')
    }
  }
}
</script>

<style lang="scss">
//modal
.backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
