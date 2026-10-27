import * as migration_20261026_123405_initial from './20261026_123405_initial';
import * as migration_20261027_143157_autosave_off from './20261027_143157_autosave_off';

export const migrations = [
  {
    up: migration_20261026_123405_initial.up,
    down: migration_20261026_123405_initial.down,
    name: '20261026_123405_initial',
  },
  {
    up: migration_20261027_143157_autosave_off.up,
    down: migration_20261027_143157_autosave_off.down,
    name: '20261027_143157_autosave_off'
  },
];
