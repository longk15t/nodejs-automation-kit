import { Options } from 'k6/options';

/**
 * Standardized Load Profiles
 * These can be imported into any test script to maintain
 * consistency across the whole team.
 */

export const AVERAGE_LOAD: Options = {
  stages: [
    { duration: '30s', target: 1 }, // Load 1 VU in 30 seconds
    { duration: '1m', target: 5 }, // Load 4 more VUs (total 5) in 1 minute
    { duration: '3m', target: 5 }, // Stay at 5 VUs for 3 minutes
    { duration: '1m', target: 0 }, // Ramp down to 0 VUs in 1 minute
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<400'], // Specific SLA for deletion
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
    // SLA for the entire business lifecycle
    lifecycle_success: ['rate>0.98'],
  },
};

export const STRESS_TEST: Options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '2m', target: 20 },
    { duration: '5m', target: 20 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<700', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<700'], // Specific SLA for deletion
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
    // SLA for the entire business lifecycle
    lifecycle_success: ['rate>0.98'],
  },
};

export const SOAK_TEST: Options = {
  stages: [
    { duration: '2m', target: 5 },
    { duration: '1h', target: 5 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<700', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<700'], // Specific SLA for deletion
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
    // SLA for the entire business lifecycle
    lifecycle_success: ['rate>0.98'],
  },
};

export const SPIKE_TEST: Options = {
  stages: [
    { duration: '20s', target: 5 }, // Baseline
    { duration: '10s', target: 50 }, // Sudden Spike!
    { duration: '30s', target: 50 }, // Stay at peak
    { duration: '10s', target: 5 }, // Quick recovery
    { duration: '20s', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<1000', 'p(99)<2000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<1000'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<1500'], // Specific SLA for deletion
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
    // SLA for the entire business lifecycle
    lifecycle_success: ['rate>0.8'],
  },
};
