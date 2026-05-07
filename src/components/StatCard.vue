<script setup>
defineProps({ title: String, value: Number, icon: String, variant: String })
const fmt = (n) => new Intl.NumberFormat('ko-KR').format(n) + '원'
</script>

<template>
  <div class="card stat-card h-100">
    <div class="card-body d-flex align-items-center">
      <div class="stat-icon me-3" :class="variant">
        <i :class="icon"></i>
      </div>
      <div>
        <div class="text-muted small">{{ title }}</div>
        <div class="fs-4 fw-bold">{{ fmt(value) }}</div>
      </div>
    </div>
  </div>
</template>
