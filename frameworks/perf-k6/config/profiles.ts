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
};

export const STRESS_TEST: Options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '2m', target: 20 },
    { duration: '5m', target: 20 },
    { duration: '2m', target: 0 },
  ],
};

export const SOAK_TEST: Options = {
  stages: [
    { duration: '2m', target: 5 },
    { duration: '1h', target: 5 },
    { duration: '2m', target: 0 },
  ],
};
