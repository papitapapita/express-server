import { faker } from '@faker-js/faker';
const products = [];

for (let i = 0; i < 100; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url()
  });
}

export default products;
