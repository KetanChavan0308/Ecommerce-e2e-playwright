import { Faker } from "@faker-js/faker";

// ✅ Strong typing (PRO LEVEL)
export type UserData = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
};

// 🔥 Generate random users
export const generateRandomData = (faker: Faker, count: number): UserData[] => {
  const data: UserData[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),

      // ✅ Always unique email
      email: `test_${Date.now()}_${i}@mail.com`,

      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
    });
  }

  return data;
};
