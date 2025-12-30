import { sleep } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
import { generatePetData } from '../utils/pet';
import { Rate } from 'k6/metrics';
import { createPet, getPet, updatePet, deletePet } from '../requests/pet';

// @ts-expect-error - jslib handles this at runtime
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
// @ts-expect-error: this is a necessary suppression
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-expect-error: this is a necessary suppression
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { Pet } from '../models/pet';
import { authenticate } from '../requests/auth';
import { STRESS_TEST } from '../config/profiles';

/**
 * DATA POOL
 * SharedArray is used to load data once and share it across all VUs.
 */
const petPool = new SharedArray('pet pool', function () {
  return papaparse.parse(open('../data/pets.csv'), { header: true }).data;
});
const lifecycleSuccess = new Rate('lifecycle_success');

export const options: Options = {
  ...STRESS_TEST,
  thresholds: {
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<700', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<700'], // Specific SLA for deletion
    http_req_tls_handshaking: ['p(95)<150'], // TLS handshake should be below 150ms
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
    // SLA for the entire business lifecycle
    lifecycle_success: ['rate>0.98'],
  },
};

export function setup(): { authToken: string } {
  console.log('[Setup] Starting performance test setup...');
  const token = authenticate();
  return { authToken: token };
}

export default function (data: { authToken: string }): void {
  const randomPet = petPool[Math.floor(Math.random() * petPool.length)] as any;
  const newPet: Pet = generatePetData();
  newPet.name = randomPet.name;
  newPet.status = randomPet.status;
  let success = true;

  try {
    // Execute Lifecycle steps (Checks are integrated into the functions)
    createPet(newPet, data.authToken);
    sleep(Math.random() * 2 + 1); // Think time: 1-3 seconds

    getPet(newPet.id, data.authToken);
    sleep(Math.random() * 1 + 0.5); // Think time: 0.5-1.5 seconds

    const updatedPet = generatePetData();
    updatedPet.id = newPet.id;
    updatePet(updatedPet, data.authToken);
    sleep(Math.random() * 2 + 1);

    deletePet(newPet.id, data.authToken);
  } catch (e) {
    success = false;
    console.error(`[Error] Lifecycle failed: ${e}`);
  } finally {
    // Track the overall business process success
    lifecycleSuccess.add(success);
  }
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
