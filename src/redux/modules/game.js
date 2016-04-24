const FLIP_ICON = 'game/flipIcon';
const ROLL_DICES = 'game/rollDices';

const initialState = {
  numberOfPlayers: 2,
  playerTurn: 0,
  playerList: [
    {
      name: "Player 0",
      score: 0,
      stones: []
    },
    {
      name: "Player 1",
      score: 0,
      stones: []
    }
  ],
  grill: {
    21: {
      available: true,
      active: true,
      taken: false
    },
    22: {
      available: false,
      active: true,
      taken: false
    },
    23: {
      available: false,
      active: true,
      taken: false
    },
    24: {
      available: false,
      active: true,
      taken: false
    },
    25: {
      available: false,
      active: true,
      taken: false
    },
    26: {
      available: false,
      active: true,
      taken: false
    },
    27: {
      available: false,
      active: true,
      taken: false
    },
    28: {
      available: false,
      active: true,
      taken: false
    },
    29: {
      available: false,
      active: true,
      taken: false
    },
    30: {
      available: false,
      active: true,
      taken: false
    },
    31: {
      available: false,
      active: true,
      taken: false
    },
    32: {
      available: false,
      active: true,
      taken: false
    },
    33: {
      available: false,
      active: true,
      taken: false
    },
    34: {
      available: false,
      active: true,
      taken: false
    },
    35: {
      available: false,
      active: true,
      taken: false
    },
    36: {
      available: false,
      active: true,
      taken: false
    }
  },
  dices: {
    remaining: 8,
    rolled: false,
    values :[
      0,0,0,0,0,0,0,0
    ]
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FLIP_ICON:
      return {
        ...state,
        grill: {
          ...state.grill,
          [action.index]: {
            active: false,
            available: false,
            taken: !state.grill[action.index].taken
          }
        }
      };
    case ROLL_DICES:
      return {
        ...state,
        dices: {
          ...state.dices,
          rolled: true,
          values: action.values
        }
      };
    default:
      return state;
  }
}

export function flipIcon(index) {
  return { type: FLIP_ICON, index };
}

export function rollDices(values) {
  return { type: ROLL_DICES, values};
}