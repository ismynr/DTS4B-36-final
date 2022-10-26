import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import useFeaturedStore, { selectFeatured, selectFetchFeatured } from '../store/featured';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Payung Teduh - Ruang Tunggu',
  'Payung Teduh - Mendengar Suara',
  'Payung Teduh - Dunia Batas',
  'Skastra - Minor 7',
  'Skastra - Persona',
  'Things I Could Never Say to You',
  'Mac Ayres - Drive Slow',
  'Boy Pablo - Roy Pablo'
];
const PRODUCT_COLOR = [];

// ----------------------------------------------------------------------

const albums = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    colors: PRODUCT_COLOR,
    link: `/${setIndex}`,
    status: sample(['new', '', '']),
  };
});

export default albums;
