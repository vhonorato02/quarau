import * as migration_20261026_123405_initial from './20261026_123405_initial';

export const migrations = [
  {
    up: migration_20261026_123405_initial.up,
    down: migration_20261026_123405_initial.down,
    name: '20261026_123405_initial'
  },
];
