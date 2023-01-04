import { check } from 'k6';
import http from 'k6/http';
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<2000'],
  },
};

export default function () {
  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.get('http://localhost:3000/healthcheck', { headers: headers });
  check(res, {
    is_status_200: r => r.status === 200,
  });
}
export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }

  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    '../result/junit.xml': jUnit(data),
    '../result/result.json': JSON.stringify(data),
  };
}
