<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-brand shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-wallet me-2"></i>My 가계부
      </RouterLink>
      <div class="d-flex gap-3">
        <RouterLink class="nav-link text-white" to="/">
          <i class="fa-solid fa-chart-line me-1"></i> 대시보드
        </RouterLink>
        <RouterLink class="nav-link text-white" to="/transactions">
          <i class="fa-solid fa-list me-1"></i> 거래내역
        </RouterLink>
      </div>
    </div>
  </nav>
  <main class="container py-4">
    <RouterView />
  </main>
</template>
