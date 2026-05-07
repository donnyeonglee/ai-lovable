# 가계부 대시보드 (Vue3 + json-server)

## 기술 스택
- Vue 3 (Composition API, ESM/ES6)
- Pinia (`src/stores/transactions.js` - axios로 json-server 연결)
- Vue Router 4
- Bootstrap 5
- Google Charts (LineChart, PieChart)
- Font Awesome 6
- json-server (REST 백엔드)

## 실행 방법
```bash
npm install
npm start          # json-server(3001) + Vite(5173) 동시 실행
```

또는 따로:
```bash
npm run server     # json-server only (port 3001)
npm run dev        # Vite only (port 5173)
```

## 구조
```
src/
  stores/transactions.js   # Pinia + axios 연결부
  views/Dashboard.vue      # 대시보드 (통계 카드 + 차트)
  views/Transactions.vue   # 거래내역 CRUD
  components/StatCard.vue
  components/GChart.vue    # Google Charts 래퍼
  router/index.js
db.json                    # 100건의 샘플 거래 데이터
```

## API 엔드포인트
- `GET    /transactions`
- `POST   /transactions`
- `PATCH  /transactions/:id`
- `DELETE /transactions/:id`
