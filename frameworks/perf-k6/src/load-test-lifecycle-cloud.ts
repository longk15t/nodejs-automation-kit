import { Options } from 'k6/options';
import { SharedArray } from 'k6/data';
import { generatePetData } from '../utils/pet';
import { createPet, getPet, updatePet, deletePet } from '../requests/pet';
import { faker } from '@faker-js/faker';

// @ts-expect-error - jslib handles this at runtime
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
// @ts-expect-error: this is a necessary suppression
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-expect-error: this is a necessary suppression
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { Pet } from '../models/pet';

const regions = [
  ['Ashburn', 'amazon:us:ashburn'],
  ['Dublin', 'amazon:ie:dublin'],
  ['Tokyo', 'amazon:jp:tokyo'],
  ['Singapore', 'amazon:sg:singapore'],
  ['Cape Town', 'amazon:sa:cape town'],
];
const randomRegion: string[] = faker.helpers.arrayElement(regions);

/**
 * DATA POOL
 * SharedArray is used to load data once and share it across all VUs.
 */
const petPool = new SharedArray('pet pool', function () {
  return papaparse.parse(open('../data/pets.csv'), { header: true }).data;
});

export const options: Options = {
  // Cloud-specific distribution
  cloud: {
    projectID: 6248577,
    name: `Pet Lifecycle Performance Test`,
    distribution: {
      region: { loadZone: randomRegion[1], percent: 100 },
    },
  },
  stages: [
    { duration: '10s', target: 1 },
    { duration: '1m', target: 5 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_reqs: ['count>1090'],
    http_req_failed: ['rate<0.01'], // Global error rate should be less than 1%
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% of global requests should be below 500ms, 99% of global requests should be below 1000ms
    'http_req_duration{name:CreatePet}': ['p(95)<800'], // Specific SLA for creation
    'http_req_duration{name:DeletePet}': ['p(95)<400'], // Specific SLA for deletion
    http_req_tls_handshaking: ['p(95)<150'], // TLS handshake should be below 150ms
    checks: ['rate>0.99'], // Global check rate should be greater than 99%
  },
};

export default function (): void {
  const randomPet = petPool[Math.floor(Math.random() * petPool.length)] as any;
  const newPet: Pet = generatePetData();
  newPet.name = randomPet.name;
  newPet.status = randomPet.status;

  // Execute Lifecycle steps (Checks are integrated into the functions)
  createPet(newPet);
  getPet(newPet.id);
  const updatedPet = generatePetData();
  updatedPet.id = newPet.id;
  updatePet(updatedPet);
  deletePet(newPet.id);
}

export function handleSummary(data: any): any {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `reports/summary-${timestamp}.html`;

  return {
    [filename]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
