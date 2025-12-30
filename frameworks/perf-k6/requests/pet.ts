import http, { RefinedResponse } from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config/config';

function getHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['api_key'] = token; // Petstore uses api_key header
    // or headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export function createPet(petData: any, token?: string): RefinedResponse<any> {
  const res = http.post(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: getHeaders(token),
    tags: { name: 'CreatePet' },
  });

  check(res, {
    'create pet status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  return res;
}

export function getPet(petId: number | string, token?: string): RefinedResponse<any> {
  const res = http.get(`${BASE_URL}/pet/${petId}`, {
    headers: getHeaders(token),
    tags: { name: 'GetPet' },
  });

  check(res, {
    'get pet status is 200': (r) => r.status === 200,
  });

  return res;
}

export function updatePet(petData: any, token?: string): RefinedResponse<any> {
  const res = http.put(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: getHeaders(token),
    tags: { name: 'UpdatePet' },
  });

  check(res, {
    'update pet status is 200': (r) => r.status === 200,
  });

  return res;
}

export function deletePet(petId: number | string, token?: string): RefinedResponse<any> {
  const res = http.del(`${BASE_URL}/pet/${petId}`, null, {
    headers: getHeaders(token),
    tags: { name: 'DeletePet' },
  });

  check(res, {
    'delete pet status is 200': (r) => r.status === 200,
  });

  return res;
}
