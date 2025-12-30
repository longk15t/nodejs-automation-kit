// import http from 'k6/http';
// import { BASE_URL } from '../src/config';
import { faker } from '@faker-js/faker';

/**
 * Simulates an authentication call to get a token.
 * In a real project, this would hit /login or /oauth/token.
 */
export function authenticate(): string {
  // For Petstore, we'll simulate a token.
  //   const res = http.get(`${BASE_URL}/user/login?username=${username}&password=${password}`);
  //   if (res.status !== 200) {
  //     console.error(`[Setup] Authentication failed with status: ${res.status}`);
  //     throw new Error('Authentication failed');
  //   }

  //   const payload: any = res.json();
  //   console.log(`[Setup] Authenticated successfully. Token: ${payload.token}`);
  //   return payload.token;

  return faker.string.uuid(); // Simulated token
}
