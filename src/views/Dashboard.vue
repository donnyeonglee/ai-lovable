<script setup>
import { onMounted, computed } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import StatCard from '../components/StatCard.vue'
import GChart from '../components/GChart.vue'

const store = useTransactionsStore()
onMounted(() => store.fetchAll())

const fmt = (n) => new Intl.NumberFormat('ko-KR').format(n) + '원'

const pieData = computed(() => {
  const rows = [['카테고리', '금액']]
  Object.entries(store.expenseByCategory).forEach(([k, v]) => rows.push([k, v]))
  return rows.length > 1 ? rows : [['카테고리', '금액'], ['데이터 없음', 1]]
})

const lineData = computed(() => {
  const rows = [['월', '수입', '지출']]
  store.monthlyTrend.forEach(([ym, v]) => rows.push([ym, v.income, v.expense]))
  return rows.length > 1 ? rows : [['월', '수입', '지출'], ['-', 0, 0]]
})

const pieOptions = {
  pieHole: 0.5,
  legend: { position: 'right' },
  chartArea: { width: '90%', height: '85%' },
  colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']
}
const lineOptions = {
  legend: { position: 'top' },
  curveType: 'function',
  chartArea: { width: '85%', height: '75%' },
  colors: ['#10b981', '#ef4444']
}
</script>

<template>
  <div v-if="store.loading" class="text-center py-5">
    <div class="spinner-border text-primary"></div>
  </div>
  <div v-else>
    <h3 class="mb-4"><i class="fa-solid fa-gauge-high me-2 text-primary"></i>대시보드</h3>

    <div class="row g-3 mb-4">
      <div class="col-md-3 col-sm-6">
        <StatCard title="총 수입" :value="store.totalIncome" icon="fa-solid fa-arrow-trend-up" variant="bg-income" />
      </div>
      <div class="col-md-3 col-sm-6">
        <StatCard title="총 지출" :value="store.totalExpense" icon="fa-solid fa-arrow-trend-down" variant="bg-expense" />
      </div>
      <div class="col-md-3 col-sm-6">
        <StatCard title="잔액" :value="store.balance" icon="fa-solid fa-piggy-bank" variant="bg-balance" />
      </div>
      <div class="col-md-3 col-sm-6">
        <StatCard title="거래 건수" :value="store.items.length" icon="fa-solid fa-receipt" variant="bg-brand" />
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-7">
        <div class="card chart-card">
          <div class="card-body">
            <h6 class="text-muted"><i class="fa-solid fa-chart-line me-2"></i>월별 수입/지출 추이</h6>
            <GChart type="LineChart" :data="lineData" :options="lineOptions" />
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card chart-card">
          <div class="card-body">
            <h6 class="text-muted"><i class="fa-solid fa-chart-pie me-2"></i>카테고리별 지출</h6>
            <GChart type="PieChart" :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>
    </div>

    <div class="card chart-card">
      <div class="card-body">
        <h6 class="text-muted mb-3"><i class="fa-solid fa-clock-rotate-left me-2"></i>최근 거래</h6>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead><tr><th>날짜</th><th>구분</th><th>카테고리</th><th>설명</th><th class="text-end">금액</th></tr></thead>
            <tbody>
              <tr v-for="t in store.recent" :key="t.id" class="tx-row">
                <td>{{ t.date }}</td>
                <td>
                  <span class="badge" :class="t.type === 'income' ? 'badge-income' : 'badge-expense'">
                    {{ t.type === 'income' ? '수입' : '지출' }}
                  </span>
                </td>
                <td>{{ t.category }}</td>
                <td>{{ t.description }}</td>
                <td class="text-end fw-bold" :style="{ color: t.type === 'income' ? '#10b981' : '#ef4444' }">
                  {{ t.type === 'income' ? '+' : '-' }}{{ fmt(t.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
