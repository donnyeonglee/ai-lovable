<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTransactionsStore } from '../stores/transactions'

const store = useTransactionsStore()
onMounted(() => store.fetchAll())

const filter = ref('all')
const search = ref('')

const form = ref({ type: 'expense', category: '식비', description: '', amount: 0, date: new Date().toISOString().slice(0,10) })
const categories = ['식비','교통','쇼핑','문화','의료','주거','급여','용돈','투자','기타']

const filtered = computed(() => {
  return store.items
    .filter(t => filter.value === 'all' || t.type === filter.value)
    .filter(t => !search.value || t.description.includes(search.value) || t.category.includes(search.value))
    .sort((a,b) => b.date.localeCompare(a.date))
})

const fmt = (n) => new Intl.NumberFormat('ko-KR').format(n) + '원'

const submit = async () => {
  if (!form.value.amount || !form.value.description) return
  await store.addTransaction({ ...form.value, amount: Number(form.value.amount) })
  form.value = { type: 'expense', category: '식비', description: '', amount: 0, date: new Date().toISOString().slice(0,10) }
}

const remove = async (id) => {
  if (confirm('삭제하시겠습니까?')) await store.removeTransaction(id)
}
</script>

<template>
  <h3 class="mb-4"><i class="fa-solid fa-list me-2 text-primary"></i>거래 내역</h3>

  <div class="card chart-card mb-4">
    <div class="card-body">
      <h6 class="text-muted mb-3"><i class="fa-solid fa-plus me-2"></i>새 거래 추가</h6>
      <form @submit.prevent="submit" class="row g-2">
        <div class="col-md-2">
          <select class="form-select" v-model="form.type">
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="form.category">
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-3"><input class="form-control" v-model="form.description" placeholder="설명"></div>
        <div class="col-md-2"><input type="number" class="form-control" v-model="form.amount" placeholder="금액"></div>
        <div class="col-md-2"><input type="date" class="form-control" v-model="form.date"></div>
        <div class="col-md-1"><button class="btn btn-primary w-100"><i class="fa-solid fa-check"></i></button></div>
      </form>
    </div>
  </div>

  <div class="card chart-card">
    <div class="card-body">
      <div class="row g-2 mb-3">
        <div class="col-md-3">
          <select class="form-select" v-model="filter">
            <option value="all">전체</option>
            <option value="income">수입만</option>
            <option value="expense">지출만</option>
          </select>
        </div>
        <div class="col-md-9">
          <input class="form-control" v-model="search" placeholder="검색...">
        </div>
      </div>

      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr><th>날짜</th><th>구분</th><th>카테고리</th><th>설명</th><th class="text-end">금액</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id" class="tx-row">
              <td>{{ t.date }}</td>
              <td><span class="badge" :class="t.type==='income'?'badge-income':'badge-expense'">{{ t.type==='income'?'수입':'지출' }}</span></td>
              <td>{{ t.category }}</td>
              <td>{{ t.description }}</td>
              <td class="text-end fw-bold" :style="{color: t.type==='income'?'#10b981':'#ef4444'}">
                {{ t.type==='income'?'+':'-' }}{{ fmt(t.amount) }}
              </td>
              <td><button class="btn btn-sm btn-outline-danger" @click="remove(t.id)"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="6" class="text-center text-muted py-4">거래가 없습니다</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
