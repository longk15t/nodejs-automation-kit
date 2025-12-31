import { faker } from '@faker-js/faker';
import { Order } from '../models/order';

export function generateOrderData(): Order {
  return {
    id: faker.number.int({ min: 100000, max: 999999 }),
    petId: faker.number.int({ min: 100000, max: 999999 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    shipDate: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']),
    complete: faker.datatype.boolean(),
  };
}
