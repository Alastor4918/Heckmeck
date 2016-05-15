export const defaultState={
  endGame: false,
  numberOfPlayers: 2,
  playerTurn: 0,
  playerList: [
    {
      name: "Player 0",
      score: 0,
      isBot: false,
      stones: []
    },
    {
      name: "Bot",
      score: 0,
      isBot: true,
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