const PICK_STONE = 'game/pickStone';
const ROLL_DICES = 'game/rollDices';
const PICK_DICE = 'game/pickDice';
const STEAL_STONE = 'game/stealStone';
const END_GAME = 'game/endGame';

const initialState = {
  endGame: false,
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
    case END_GAME:
      return {
        ...state,
        endGame: action.value
      };
    case PICK_STONE:
      return {
        ...state,
        playerTurn: (state.playerTurn+1) % state.numberOfPlayers,
        playerList: action.pList,
        grill: action.grill,
        dices: {
          remaining: 8,
          rolled: false,
          score: 0,
          alreadyTakenValues: [],
          values: action.dices
        }
      };
    case STEAL_STONE:
      return {
        ...state,
        playerTurn: (state.playerTurn+1) % state.numberOfPlayers,
        playerList: action.pList,
        dices: {
          remaining: 8,
          rolled: false,
          score: 0,
          alreadyTakenValues: [],
          values: action.dices
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

export function pickStone(pList, grill, dices) {
  return { type: PICK_STONE, pList, grill, dices };
}

export function rollDices(values) {
  return { type: ROLL_DICES, values};
}

export function pickDice(remaining, newScore, newDices, taken) {
  return { type: PICK_DICE, remaining, newScore, newDices, taken }
}

export function stealStone(pList, dices){
  return { type: STEAL_STONE, pList, dices };
}

export function endGame(value){
  return { type: END_GAME, value };
}