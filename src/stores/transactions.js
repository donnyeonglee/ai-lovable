// Pinia store - axios로 json-server 연결
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API = 'http://localhost:3001'

const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
})

export const useTransactionsStore = defineStore('transactions', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 전체 거래 조회
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/transactions')
      items.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // 거래 추가
  const addTransaction = async (tx) => {
    const { data } = await api.post('/transactions', tx)
    items.value.push(data)
    return data
  }

  // 거래 삭제
  const removeTransaction = async (id) => {
    await api.delete(`/transactions/${id}`)
    items.value = items.value.filter(t => t.id !== id)
  }

  // 거래 수정
  const updateTransaction = async (id, patch) => {
    const { data } = await api.patch(`/transactions/${id}`, patch)
    const idx = items.value.findIndex(t => t.id === id)
    if (idx !== -1) items.value[idx] = data
  }

  // computed
  const totalIncome = computed(() =>
    items.value.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  )
  const totalExpense = computed(() =>
    items.value.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  // 카테고리별 지출
  const expenseByCategory = computed(() => {
    const map = {}
    items.value.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return map
  })

  // 월별 수입/지출
  const monthlyTrend = computed(() => {
    const map = {}
    items.value.forEach(t => {
      const ym = t.date.slice(0, 7)
      if (!map[ym]) map[ym] = { income: 0, expense: 0 }
      map[ym][t.type] += t.amount
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  })

  // 최근 거래
  const recent = computed(() =>
    [...items.value].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
  )

  return {
    items, loading, error,
    fetchAll, addTransaction, removeTransaction, updateTransaction,
    totalIncome, totalExpense, balance,
    expenseByCategory, monthlyTrend, recent
  }
})
