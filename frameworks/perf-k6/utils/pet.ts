import { faker } from '@faker-js/faker';
import { Pet } from '../models/pet';

export function generatePetData(): Pet {
  return {
    id: faker.number.int({ min: 100000, max: 999999 }),
    name: faker.animal.dog(),
    category: {
      id: faker.number.int({ min: 1, max: 10 }),
      name: faker.animal.type(),
    },
    photoUrls: [faker.image.url()],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.word.adjective(),
      },
    ],
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
  };
}
