import { ApparatusInfo } from '../types';
import { Colors } from './colors';

export const APPARATUS_LIST: ApparatusInfo[] = [
  {
    id: 'vault',
    name: 'vault',
    displayName: 'Vault',
    color: Colors.vault,
    icon: 'arrow-up-circle',
    description: 'Gymnasts sprint down a runway, jump off a springboard, and push off a padded table to perform flips and twists in the air.',
  },
  {
    id: 'uneven_bars',
    name: 'uneven_bars',
    displayName: 'Uneven Bars',
    color: Colors.uneven_bars,
    icon: 'minus',
    description: 'Gymnasts swing and release between two bars set at different heights, performing releases, pirouettes, and connecting skills.',
  },
  {
    id: 'balance_beam',
    name: 'balance_beam',
    displayName: 'Balance Beam',
    color: Colors.balance_beam,
    icon: 'minus-circle',
    description: 'A 4-inch wide, 4-foot high beam where gymnasts perform tumbling, jumps, turns, and dance elements in a 70-90 second routine.',
  },
  {
    id: 'floor_exercise',
    name: 'floor_exercise',
    displayName: 'Floor Exercise',
    color: Colors.floor_exercise,
    icon: 'grid',
    description: 'A 40x40 foot spring floor where gymnasts combine tumbling passes, leaps, turns, and dance to music in a 70-90 second routine.',
  },
];

export const APPARATUS_MAP = APPARATUS_LIST.reduce((acc, a) => {
  acc[a.id] = a;
  return acc;
}, {} as Record<string, ApparatusInfo>);
