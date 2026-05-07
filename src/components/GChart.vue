<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  type: { type: String, default: 'PieChart' },
  data: { type: Array, required: true },
  options: { type: Object, default: () => ({}) }
})

const el = ref(null)
let chart = null

const loadGoogleCharts = () => new Promise((resolve) => {
  if (window.google && window.google.charts) return resolve()
  const s = document.createElement('script')
  s.src = 'https://www.gstatic.com/charts/loader.js'
  s.onload = () => {
    window.google.charts.load('current', { packages: ['corechart'] })
    window.google.charts.setOnLoadCallback(resolve)
  }
  document.head.appendChild(s)
})

const draw = async () => {
  await loadGoogleCharts()
  if (!el.value) return
  const dt = window.google.visualization.arrayToDataTable(props.data)
  chart = new window.google.visualization[props.type](el.value)
  chart.draw(dt, props.options)
}

onMounted(draw)
watch(() => props.data, draw, { deep: true })
window.addEventListener('resize', () => chart && chart.draw(window.google.visualization.arrayToDataTable(props.data), props.options))
</script>

<template>
  <div ref="el" style="width:100%; height:320px;"></div>
</template>
