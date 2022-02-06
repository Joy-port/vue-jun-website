<template>
  <div
    class="backdrop"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modalContent">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">{{ title }}</h5>
        <button
          type="button"
          class="btn-close"
          @click.prevent="$emit('toggle-modal', 'check')"
        ></button>
      </div>
      <div class="modal-body">
        {{ msg }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click.prevent="$emit('toggle-modal', 'check')">取消</button>
        <button type="button" class="btn btn-danger" @click.prevent="$emit('delete-product', id)">
          {{ action }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckModal',
  props: ['title', 'msg', 'action', 'id'],
  data () {
    return {
    }
  },
  methods: {
    deleteProduct () {
      this.$emit('deleteProduct', this.id)
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
  width: 50%;
  border-radius: 10px;
  margin: 5% auto;
  max-height: 90%;
  padding: 0;
}
</style>
