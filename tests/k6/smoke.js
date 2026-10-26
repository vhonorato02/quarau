// Basic load test: 20 virtual users browsing the main pages for 1 minute.
//   k6 run -e BASE_URL=http://localhost:3000 tests/k6/smoke.js
import { check, sleep } from 'k6'
import http from 'k6/http'

const BASE = __ENV.BASE_URL || 'http://localhost:3000'
const PAGES = [
  '/',
  '/projetos',
  '/projetos/projeto-quipa',
  '/projetos/projeto-ecoe-verde',
  '/sobre',
  '/contato',
  '/atuacao',
]

export const options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
}

export default function () {
  const path = PAGES[Math.floor(Math.random() * PAGES.length)]
  const res = http.get(`${BASE}${path}`, { headers: { 'Accept-Encoding': 'gzip, br' } })
  check(res, {
    'status 200': (r) => r.status === 200,
    'has brand': (r) => r.body.includes('Quarau'),
  })
  sleep(1)
}
