import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const tasks = [...Array(24)].map(() => ({
  id: faker.string.uuid(),
  title: faker.person.jobTitle(),
  description: faker.person.jobDescriptor(),
  date: faker.date.anytime().toString(),
  status: sample(['pending', 'done']),
}));
