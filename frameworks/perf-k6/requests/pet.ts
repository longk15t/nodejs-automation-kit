import http from 'k6/http';
import { BASE_URL } from '../src/config';

export function createPet(petData: any): http.RefinedResponse<any> {
  return http.post(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getPet(petId: number | string): http.RefinedResponse<any> {
  return http.get(`${BASE_URL}/pet/${petId}`);
}

export function updatePet(petData: any): http.RefinedResponse<any> {
  return http.put(`${BASE_URL}/pet`, JSON.stringify(petData), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function deletePet(petId: number | string): http.RefinedResponse<any> {
  return http.del(`${BASE_URL}/pet/${petId}`);
}
