import { sleep } from 'k6';
import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
import { Rate } from 'k6/metrics';
import { faker } from '@faker-js/faker';
import { generatePetData } from '../utils/pet';
import { createPet, getPet, updatePet, deletePet } from '../requests/pet';
import { authenticate } from '../requests/auth';
import * as Profiles from '../config/profiles';

// @ts-expect-error - jslib handles this at runtime
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
// @ts-expect-error - k6-reporter does not have official type definitions
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-expect-error - k6-summary does not have official type definitions
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

/**
 * CUSTOM METRICS
 */
const lifecycleSuccess = new Rate('lifecycle_success');

/**
 * DATA POOL
 */
const petPool = new SharedArray('pet pool', function () {
  return papaparse.parse(open('../data/pets.csv'), { header: true }).data;
});

/**
 * DYNAMIC OPTIONS CONFIGURATION
 * Switches profiles and enables cloud distribution based on environment variables
 */
const regions = [
  ['Ashburn', 'amazon:us:ashburn'],
  ['Dublin', 'amazon:ie:dublin'],
  ['Tokyo', 'amazon:jp:tokyo'],
  ['Singapore', 'amazon:sg:singapore'],
  ['Cape Town', 'amazon:sa:cape town'],
];
const randomRegion = faker.helpers.arrayElement(regions);

// 1. Select Profile (Default to AVERAGE_LOAD)
const profileName = (__ENV.PROFILE || 'AVERAGE_LOAD') as keyof typeof Profiles;
const baseOptions = Profiles[profileName] || Profiles.AVERAGE_LOAD;

// 2. Build Final Options
export const options: Options = {
  ...baseOptions,
  thresholds: {
    ...baseOptions.thresholds,
    http_req_tls_handshaking: ['p(95)<150'], // TLS handshake should be below 150ms
  },
  // Cloud configuration (Ignored by 'k6 run', used by 'k6 cloud')
  ext: {
    loadimpact: {
      projectID: 6248577,
      name: `Pet Lifecycle Performance Test`,
      distribution: {
        region: { loadZone: randomRegion[1], percent: 100 },
      },
    },
  },
};

export function setup(): { authToken: string } {
  console.log(`[Setup] Starting Pet Lifecycle ${profileName}...`);
  const token = authenticate();
  return { authToken: token };
}

export default function (data: { authToken: string }): void {
  const poolPet = petPool[Math.floor(Math.random() * petPool.length)] as any;
  const newPet = generatePetData();
  newPet.id = parseInt(poolPet.id);
  newPet.name = poolPet.name;
  newPet.status = poolPet.status;

  const token = data.authToken;
  let success = true;

  try {
    createPet(newPet, token);
    sleep(Math.random() * 2 + 1);

    getPet(newPet.id, token);
    sleep(Math.random() * 1 + 0.5);

    const updatedPet = generatePetData();
    updatedPet.id = newPet.id;
    updatePet(updatedPet, token);
    sleep(Math.random() * 2 + 1);

    deletePet(newPet.id, token);
  } catch (e) {
    success = false;
    console.error(`[Error] Lifecycle failed: ${e}`);
  } finally {
    lifecycleSuccess.add(success);
  }
}

export function teardown(data: { authToken: string }): void {
  console.log('[Teardown] Starting cleanup and final reporting...');
  console.log(`[Teardown] Token used during test: ${data.authToken}`);

  // Example: Simulation of sending results to qTest
  // http.post('https://qtest.example.com/api/v3/results', { status: 'COMPLETE' });

  console.log('[Teardown] Test execution finalized.');
}

export function handleSummary(data: Record<string, unknown>): Record<string, string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `reports/summary-${timestamp}.html`;

  // Only generate HTML report for local runs
  return {
    [filename]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
