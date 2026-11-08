import * as migration_20261026_123405_initial from './20261026_123405_initial';
import * as migration_20261027_143157_autosave_off from './20261027_143157_autosave_off';
import * as migration_20261108_213113_project_location from './20261108_213113_project_location';
import * as migration_20261108_213211_territories_block from './20261108_213211_territories_block';
import * as migration_20261108_213755_project_index_display from './20261108_213755_project_index_display';

export const migrations = [
  {
    up: migration_20261026_123405_initial.up,
    down: migration_20261026_123405_initial.down,
    name: '20261026_123405_initial',
  },
  {
    up: migration_20261027_143157_autosave_off.up,
    down: migration_20261027_143157_autosave_off.down,
    name: '20261027_143157_autosave_off',
  },
  {
    up: migration_20261108_213113_project_location.up,
    down: migration_20261108_213113_project_location.down,
    name: '20261108_213113_project_location',
  },
  {
    up: migration_20261108_213211_territories_block.up,
    down: migration_20261108_213211_territories_block.down,
    name: '20261108_213211_territories_block',
  },
  {
    up: migration_20261108_213755_project_index_display.up,
    down: migration_20261108_213755_project_index_display.down,
    name: '20261108_213755_project_index_display'
  },
];
