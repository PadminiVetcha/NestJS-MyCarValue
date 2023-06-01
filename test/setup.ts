// file that defines the code that deletes the test database after every run of tests
// and creates a new test database.

import { rm } from 'fs/promises';
import { join } from 'path';

global.BeforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});
