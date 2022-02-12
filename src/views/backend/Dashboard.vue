<template>
  <div class="">
    <nav class="px-3">
      <div class="d-flex justify-content-between bg-success py-5">
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
          <a href="#" class="d-flex text-white">
            <span class="material-icons me-3"> logout </span>
            登出</a
          >
        </div>
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
export default {}
</script>
