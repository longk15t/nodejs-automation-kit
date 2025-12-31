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

export function placeOrder(orderData: any, token?: string): RefinedResponse<any> {
  const res = http.post(`${BASE_URL}/store/order`, JSON.stringify(orderData), {
    headers: getHeaders(token),
    tags: { name: 'PlaceOrder' },
  });

  check(res, {
    'place order status is 200': (r) => r.status === 200,
  });

  return res;
}

export function findOrder(orderId: number | string, token?: string): RefinedResponse<any> {
  const res = http.get(`${BASE_URL}/store/order/${orderId}`, {
    headers: getHeaders(token),
    tags: { name: 'GetOrder' },
  });

  check(res, {
    'get order status is 200': (r) => r.status === 200,
  });

  return res;
}

export function deleteOrder(orderId: number | string, token?: string): RefinedResponse<any> {
  const res = http.del(`${BASE_URL}/store/order/${orderId}`, null, {
    headers: getHeaders(token),
    tags: { name: 'DeleteOrder' },
  });

  check(res, {
    'delete order status is 200': (r) => r.status === 200,
  });

  return res;
}
