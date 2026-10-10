import * as migration_20261005_171228_initial from './20261005_171228_initial';

export const migrations = [
  {
    up: migration_20261005_171228_initial.up,
    down: migration_20261005_171228_initial.down,
    name: '20261005_171228_initial'
  },
];
