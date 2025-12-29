/* eslint-disable @typescript-eslint/ban-ts-comment */
import http from 'k6/http';
import { check } from 'k6';
import { Options } from 'k6/options';
import { BASE_URL } from './config';

export const options: Options = {
  stages: [
    { duration: '30s', target: 5 }, // Ramp-up: Increase to 5 VUs over 30 seconds
    { duration: '1m', target: 10 }, // Peak ramp: Reach max 10 VUs over 1 minute
    { duration: '1m', target: 10 }, // Sustained load: Hold at 10 VUs for 1 minute
    { duration: '30s', target: 0 }, // Ramp-down: Gracefully decrease to 0 over 30 seconds
  ],
};

const statuses = ['available', 'pending', 'sold'];

export default function (): void {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const res = http.get(`${BASE_URL}/pet/findByStatus?status=${status}`);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

export function handleSummary(data: any): any {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `reports/summary-${timestamp}.html`;

  return {
    [filename]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
