import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  number: index + 1,
  songTitle: faker.music.songName(),
  songDuration: faker.company.name(),
}));

export default users;
