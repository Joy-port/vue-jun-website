<template>
  <div>
    <div class="alert" :class="{ 'alert-success show': status === true, 'alert-danger show': status === false, 'hide': leave === true} " role="alert">
       <strong class="mb-2">{{title}}</strong>
        <p v-if="msg" class="mb-0">{{msg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['title', 'msg', 'status', 'leave'],
  data () {
    return {
      alertStatus: this.status
    }
  }
}
</script>

<style lang="scss">
.alert {
  position: absolute;
  top: 10px;
  right: -100px;
  transition: right .5s cubic-bezier(0.61, 0.11, 0, 1.61);
  width: 150px;
}
.show{
  right: 10px;
}
.hide {
  right: -250px;
  transition: right .3s;
}
</style>
