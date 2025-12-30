import { check } from 'k6';
import { Options } from 'k6/options';
import { generatePetData } from '../utils/pet';
import { createPet, getPet, updatePet, deletePet } from '../requests/pet';

// @ts-expect-error: this is a necessary suppression
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-expect-error: this is a necessary suppression
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { Pet } from '../models/pet';
import { authenticate } from '../requests/auth';

export const options: Options = {
  stages: [
    { duration: '30s', target: 1 }, // Load 1 VU in 30 seconds
    { duration: '1m', target: 5 }, // Load 4 more VUs (total 5) in 1 minute
    { duration: '3m', target: 5 }, // Stay at 5 VUs for 3 minutes
    { duration: '1m', target: 0 }, // Ramp down to 0 VUs in 1 minute
  ],
  thresholds: {
    http_reqs: ['count>2700'],
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<700', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<700'], // Specific SLA for deletion
    http_req_tls_handshaking: ['p(95)<150'], // TLS handshake should be below 150ms
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
  },
};

export function setup(): { authToken: string } {
  console.log('[Setup] Starting performance test setup...');
  const token = authenticate();
  return { authToken: token };
}

export default function (data: { authToken: string }): void {
  const newPet: Pet = generatePetData();

  // Step 1: Create a new pet
  const createResponse = createPet(newPet, data.authToken);
  check(createResponse, {
    'pet created successfully': (r) => r.status === 200 || r.status === 201,
  });

  // Step 2: Get the pet by ID
  const getResponse = getPet(newPet.id, data.authToken);
  check(getResponse, {
    'pet retrieved successfully': (r) => r.status === 200,
  });

  // Step 3: Update the pet information
  const updatedPet: Pet = generatePetData();
  updatedPet.id = newPet.id;

  const updateResponse = updatePet(updatedPet, data.authToken);
  check(updateResponse, {
    'pet updated successfully': (r) => r.status === 200,
  });

  // Step 4: Delete the pet
  const deleteResponse = deletePet(newPet.id, data.authToken);
  check(deleteResponse, {
    'pet deleted successfully': (r) => r.status === 200,
  });
}

export function teardown(data: { authToken: string }): void {
  console.log('[Teardown] Starting cleanup and final reporting...');
  console.log(`[Teardown] Token used during test: ${data.authToken}`);

  // Example: Clean up high-level test data
  // deletePet(SEED_DATA_ID, data.authToken);

  // Example: Simulation of sending results to qTest
  // http.post('https://qtest.example.com/api/v3/results', { status: 'COMPLETE' });

  console.log('[Teardown] Test execution finalized.');
}

export function handleSummary(data: any): any {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `reports/summary-${timestamp}.html`;

  return {
    [filename]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
