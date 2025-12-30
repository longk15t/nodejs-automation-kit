import http from 'k6/http';
import { BASE_URL } from '../src/config';

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

export function createPet(petData: any, token?: string): http.RefinedResponse<any> {
  return http.post(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: getHeaders(token),
    tags: { name: 'CreatePet' },
  });
}

export function getPet(petId: number | string, token?: string): http.RefinedResponse<any> {
  return http.get(`${BASE_URL}/pet/${petId}`, {
    headers: getHeaders(token),
    tags: { name: 'GetPet' },
  });
}

export function updatePet(petData: any, token?: string): http.RefinedResponse<any> {
  return http.put(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: getHeaders(token),
    tags: { name: 'UpdatePet' },
  });
}

export function deletePet(petId: number | string, token?: string): http.RefinedResponse<any> {
  return http.del(`${BASE_URL}/pet/${petId}`, null, {
    headers: getHeaders(token),
    tags: { name: 'DeletePet' },
  });
}
