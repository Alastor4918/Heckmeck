const FLIP_ICON = 'game/flipIcon';
const ROLL_DICES = 'game/rollDices';
const PICK_DICE = 'game/pickDice';

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
      active: true,
      taken: false
    },
    22: {
      active: true,
      taken: false
    },
    23: {
      active: true,
      taken: false
    },
    24: {
      active: true,
      taken: false
    },
    25: {
      active: true,
      taken: false
    },
    26: {
      active: true,
      taken: false
    },
    27: {
      active: true,
      taken: false
    },
    28: {
      active: true,
      taken: false
    },
    29: {
      active: true,
      taken: false
    },
    30: {
      active: true,
      taken: false
    },
    31: {
      active: true,
      taken: false
    },
    32: {
      active: true,
      taken: false
    },
    33: {
      active: true,
      taken: false
    },
    34: {
      active: true,
      taken: false
    },
    35: {
      active: true,
      taken: false
    },
    36: {
      active: true,
      taken: false
    }
  },
  dices: {
    remaining: 8,
    rolled: false,
    score: 0,
    alreadyTakenValues: [],
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
    case PICK_DICE:
      return {
        ...state,
        dices: {
          remaining: action.remaining,
          rolled: false,
          score: action.newScore,
          alreadyTakenValues: action.taken,
          values : action.newDices
        }
      };
    case ROLL_DICES:
      return {
        ...state,
        dices:{
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

export function pickDice(remaining, newScore, newDices, taken) {
  return { type: PICK_DICE, remaining, newScore, newDices, taken }
}