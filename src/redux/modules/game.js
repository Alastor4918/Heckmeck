const WAT = 'wat/wat';

const initialState = {
  numberOfPlayers: 2,
  playerTurn: 0,
  grill: {
    21: true,
    22: true,
    23: true,
    24: true,
    25: true,
    26: true,
    27: true,
    28: true,
    29: true,
    30: true,
    31: true,
    32: true,
    33: true,
    34: true,
    35: true,
    36: true
  },
  topStones:
    [
      null,
      null
    ],
  PlayerStones: {
    player1: [],
    player2: []
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case WAT:
      const {count} = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: WAT
  };
}