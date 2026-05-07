![header](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![tech stack](https://img.shields.io/badge/Pinia-FFC93F?style=flat-square&logo=pinia&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![json-server](https://img.shields.io/badge/json--server-003d82?style=flat-square&logo=json&logoColor=white)

# 💰 AI Lovable - 가계부 대시보드

> **Vue 3 + Pinia + Google Charts를 활용한 현대적인 개인 재정 관리 웹 애플리케이션**

친숙하고 사용하기 쉬운 인터페이스로 일상적인 수입과 지출을 효과적으로 관리할 수 있는 가계부 대시보드입니다. 실시간 통계와 시각적 차트를 통해 재정 상황을 한눈에 파악할 수 있습니다.
!!!
~~~!!!
---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📊 **대시보드** | 실시간 통계 카드와 구글 차트(Line/Pie)로 재정 현황 시각화 |
| 💳 **거래내역 관리** | CRUD 기능으로 수입/지출 항목 추가, 수정, 삭제 |
| 📈 **수입 추적** | 총 수입, 월별 수입 변화 분석 |
| 💸 **지출 분석** | 카테고리별 지출 분석 및 총 지출 통계 |
| 💰 **잔액 계산** | 실시간 자산 잔액 계산 |
| 🔄 **실시간 동기화** | REST API 기반의 실시간 데이터 동기화 |

---

## 🛠️ 기술 스택

### 프론트엔드
```
Vue 3                    - 모던 UI 프레임워크 (68.3%)
├─ Composition API       - 로직 재사용성 극대화
├─ Vue Router 4          - 페이지 라우팅
└─ Pinia                 - 상태 관리

Bootstrap 5              - UI 컴포넌트 라이브러리
Google Charts            - 데이터 시각화
├─ Line Chart           - 시계열 데이터 분석
└─ Pie Chart            - 카테고리별 분포도

Font Awesome 6           - 아이콘 라이브러리
Axios                    - HTTP 클라이언트
```

### 백엔드
```
json-server              - REST API 목 서버
Node.js                  - 런타임 환경
```

### 개발 도구
```
Vite                     - 번들러 & 개발 서버
npm                      - 패키지 관리자
```

### 언어 구성
- **Vue**: 68.3%
- **JavaScript**: 21.4%
- **CSS**: 7%
- **HTML**: 3.3%

---

## 📦 설치 및 실행

### 1️⃣ 프로젝트 클론
```bash
git clone https://github.com/donnyeonglee/ai-lovable.git
cd ai-lovable
```

### 2️⃣ 의존성 설치
```bash
npm install
```

### 3️⃣ 서버 실행

**한 번에 실행 (권장)**
```bash
npm start
# json-server (http://localhost:3001) + Vite (http://localhost:5173) 동시 실행
```

**개별 실행**
```bash
# 터미널 1: json-server (백엔드)
npm run server

# 터미널 2: Vite 개발 서버 (프론트엔드)
npm run dev
```

### 4️⃣ 브라우저에서 접속
```
http://localhost:5173
```

---

## 📂 프로젝트 구조

```
ai-lovable/
├── src/
│   ├── main.js                      # Vue 앱 진입점
│   ├── App.vue                      # 루트 컴포넌트 & 네비게이션
│   ├── style.css                    # 글로벌 스타일
│   │
│   ├── router/
│   │   └── index.js                 # Vue Router 설정
│   │
│   ├── stores/
│   │   └── transactions.js          # Pinia 스토어 (상태 관리 + API)
│   │
│   ├── components/
│   │   ├── StatCard.vue             # 통계 카드 컴포넌트
│   │   └── GChart.vue               # Google Charts 래퍼
│   │
│   └── views/
│       ├── Dashboard.vue            # 대시보드 페이지
│       └── Transactions.vue         # 거래내역 페이지
│
├── index.html                       # HTML 엔트리포인트
├── vite.config.js                   # Vite 설정
├── package.json                     # 프로젝트 메타데이터 & 스크립트
├── package-lock.json                # 의존성 락 파일
├── db.json                          # json-server 데이터 (100+ 샘플 거래)
│
└── node_modules/                    # 설치된 패키지들
```

---

## 🔌 API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/transactions` | 모든 거래 내역 조회 |
| `GET` | `/transactions/:id` | 특정 거래 내역 조회 |
| `POST` | `/transactions` | 새 거래 내역 생성 |
| `PATCH` | `/transactions/:id` | 거래 내역 수정 |
| `DELETE` | `/transactions/:id` | 거래 내역 삭제 |

### 요청/응답 예시

```javascript
// POST /transactions - 새 거래 추가
{
  "date": "2026-05-07",
  "description": "카페 오더",
  "category": "음식",
  "type": "expense",    // "income" 또는 "expense"
  "amount": 5500,
  "tags": ["카페"]
}

// 응답
{
  "id": 101,
  "date": "2026-05-07",
  "description": "카페 오더",
  "category": "음식",
  "type": "expense",
  "amount": 5500,
  "tags": ["카페"]
}
```

---

## 🎨 주요 컴포넌트 상세 분석

### App.vue - 레이아웃 & 네비게이션
```vue
<!-- 고정 네비게이션 바 -->
<nav class="navbar navbar-expand-lg navbar-dark bg-brand shadow-sm">
  <RouterLink to="/">My 가계부</RouterLink>
  <RouterLink to="/">대시보드</RouterLink>
  <RouterLink to="/transactions">거래내역</RouterLink>
</nav>

<!-- 라우터 뷰 영역 -->
<main class="container py-4">
  <RouterView />
</main>
```

### Pinia 스토어 (transactions.js)
```javascript
// 상태 관리 및 API 호출
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchTransactions() {
      // GET /transactions
    },
    async addTransaction(data) {
      // POST /transactions
    },
    async updateTransaction(id, data) {
      // PATCH /transactions/:id
    },
    async deleteTransaction(id) {
      // DELETE /transactions/:id
    }
  },
  
  getters: {
    totalIncome: (state) => {
      // 수입 합계 계산
    },
    totalExpense: (state) => {
      // 지출 합계 계산
    },
    balance: (state) => {
      // 잔액 계산
    }
  }
})
```

### 통계 카드 (StatCard.vue)
```vue
<template>
  <div class="card stat-card">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div>
        <p class="text-muted mb-1">{{ title }}</p>
        <h3 class="mb-0">{{ formattedAmount }}</h3>
      </div>
      <div :class="['stat-icon', iconClass]">
        <i :class="icon"></i>
      </div>
    </div>
  </div>
</template>
```

---

## 🖼️ 실행 화면 (스크린샷)

### 📊 대시보드 페이지
```
┌──────────────────────────────────────────────────────────┐
│  🎯 My 가계부      [대시보드]  [거래내역]                │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  💳 총 수입         💸 총 지출        💰 잔액             │
│  ₩2,500,000       ₩1,200,000       ₩1,300,000           │
│                                                           │
│  ┌────────────────────────┐  ┌──────────────────────┐  │
│  │   월별 수입/지출 추이   │  │   지출 카테고리분포   │  │
│  │   (Line Chart)         │  │   (Pie Chart)        │  │
│  │                        │  │                      │  │
│  │     📈                 │  │       🥧            │  │
│  │                        │  │                      │  │
│  └────────────────────────┘  └──────────────────────┘  │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### 📋 거래내역 페이지
```
┌──────────────────────────────────────────────────────────┐
│  🎯 My 가계부      [대시보드]  [거래내역]                │
├──────────────────────────────────────────────────────────┤
│  [+ 새 거래 추가]                                         │
├─────────┬──────────┬──────────┬─────────┬──────────┬─────┤
│   날짜  │   설명   │ 카테고리 │   유형  │   금액   │     │
├─────────┼──────────┼──────────┼─────────┼──────────┼─────┤
│ 2026.5.7│카페오더  │  음식    │ 지출 ▼ │ -₩5,500 │ ✎ ✕ │
│ 2026.5.6│월급      │  급여    │ 수입 ▲ │+₩2,000,0│ ✎ ✕ │
│ 2026.5.5│마트      │ 생활용품 │ 지출 ▼ │ -₩45,000│ ✎ ✕ │
│ 2026.5.4│택시비    │  교통    │ 지출 ▼ │ -₩8,000 │ ✎ ✕ │
├─────────┴──────────┴──────────┴─────────┴──────────┴─────┤
│  페이지: 1 | 2 | 3 ...                                   │
└──────────────────────────────────────────────────────────┘
```

---

## 💻 주요 코드 예제

### 1. 거래 내역 가져오기
```javascript
// stores/transactions.js
async fetchTransactions() {
  this.loading = true
  try {
    const response = await axios.get('http://localhost:3001/transactions')
    this.items = response.data
  } catch (error) {
    this.error = error.message
  } finally {
    this.loading = false
  }
}
```

### 2. 새 거래 추가
```javascript
async addTransaction(data) {
  const response = await axios.post(
    'http://localhost:3001/transactions',
    {
      ...data,
      id: Date.now()
    }
  )
  this.items.push(response.data)
  return response.data
}
```

### 3. 거래 내역 수정
```javascript
async updateTransaction(id, data) {
  const response = await axios.patch(
    `http://localhost:3001/transactions/${id}`,
    data
  )
  const index = this.items.findIndex(item => item.id === id)
  if (index !== -1) {
    this.items[index] = response.data
  }
}
```

### 4. 통계 계산 (Getter)
```javascript
getters: {
  totalIncome: (state) => {
    return state.items
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
  },
  
  totalExpense: (state) => {
    return state.items
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
  },
  
  balance: (state) => {
    return state.items
      .reduce((sum, item) => {
        return item.type === 'income' 
          ? sum + item.amount 
          : sum - item.amount
      }, 0)
  }
}
```

### 5. 데이터 시각화 (Google Charts)
```vue
<template>
  <GChart
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script setup>
import { computed } from 'vue'
import GChart from '@/components/GChart.vue'

const chartData = computed(() => {
  return [
    ['날짜', '수입', '지출'],
    ['1월', 2000000, 1500000],
    ['2월', 2500000, 1800000],
    ['3월', 3000000, 2200000]
  ]
})

const chartOptions = {
  title: '월별 수입 & 지출',
  curveType: 'function',
  legend: { position: 'bottom' },
  hAxis: { title: '월' },
  vAxis: { title: '금액 (₩)' }
}
</script>
```

---

## 🎯 사용 시나리오

### 시나리오 1: 월급 기록하기
```
1. "거래내역" 페이지 방문
2. "+ 새 거래 추가" 클릭
3. 다음 정보 입력:
   - 날짜: 2026-05-05
   - 설명: 5월 월급
   - 카테고리: 급여
   - 유형: 수입 ▲
   - 금액: 2,500,000
4. 저장
5. 대시보드에서 통계 업데이트 확인
```

### 시나리오 2: 카테고리별 지출 분석
```
1. 대시보드 페이지 방문
2. 파이 차트에서 카테고리별 지출 비율 확인
   - 음식: 35%
   - 교통: 20%
   - 생활용품: 30%
   - 기타: 15%
3. 가장 많이 지출하는 카테고리 파악
```

---

## 📊 데이터 샘플 (db.json)

프로젝트에는 **100+ 개의 샘플 거래 데이터**가 포함되어 있습니다.

```json
{
  "transactions": [
    {
      "id": 1,
      "date": "2026-01-15",
      "description": "월급",
      "category": "급여",
      "type": "income",
      "amount": 2500000
    },
    {
      "id": 2,
      "date": "2026-01-16",
      "description": "마트 장보기",
      "category": "생활용품",
      "type": "expense",
      "amount": 95000
    },
    {
      "id": 3,
      "date": "2026-01-17",
      "description": "택시비",
      "category": "교통",
      "type": "expense",
      "amount": 8000
    }
  ]
}
```

---

## 🚀 성능 최적화

- ✅ **Lazy Loading**: 라우트별 동적 임포트로 번들 크기 최소화
- ✅ **상태 관리**: Pinia를 통한 효율적인 리렌더링
- ✅ **API 캐싱**: 불필요한 API 호출 방지
- ✅ **이미지 최적화**: SVG 아이콘 활용

---

## 🛡️ 주의사항

- 🔴 **프로덕션 배포 전**: 백엔드 보안 설정 필요 (CORS, 인증)
- 🔴 **데이터 보존**: json-server는 재시작 시 메모리 초기화 (DB 연동 필요)
- 🔴 **금액 유효성 검증**: 음수 금액 입력 방지 로직 추가 권장

---

## 📝 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

## 👨‍💻 개발자

**donnyeonglee**
- GitHub: [@donnyeonglee](https://github.com/donnyeonglee)

---

## 💬 지원 및 피드백

버그 리포트나 기능 제안은 [Issues](https://github.com/donnyeonglee/ai-lovable/issues)를 통해 남겨주세요.

---

## 🙏 감사의 말

- **Vue.js** - 프론트엔드 프레임워크
- **Pinia** - 상태 관리 라이브러리
- **Google Charts** - 데이터 시각화
- **Bootstrap** - UI 컴포넌트
- **json-server** - Mock REST API

---

**Happy Budgeting! 💚** 재정 관리를 쉽고 즐겁게 해보세요!
