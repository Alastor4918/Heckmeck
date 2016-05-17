const ADD_LOBBY = "lobby/addLobby";
const SELECT_LOBBY = "lobby/selectLobby";
const UPDATE_LOBBY_LIST = "lobby/updateLobbyList";
const UPDATE_LOBBY_ROOM = "lobby/pdateLobbyRoom";

const initialState = {
  lobbyList: [],
  selectedLobby: 0,
  lobbyRoom: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_LOBBY:
      return {
        ...state,
        lobbyList: state.lobbyList.push(action.data)
      };
    case SELECT_LOBBY:
      return {
        ...state,
        selectedLobby: action.index
      };
    case UPDATE_LOBBY_LIST:
      return {
        ...state,
        lobbyList: action.data
      };
    case UPDATE_LOBBY_ROOM:
      return {
        ...state,
        lobbyRoom: action.lobby
      };
    default:
      return state;
  }
}


export function addLobby(data) {
  return {type: ADD_LOBBY, data}
}

export function selectLobby(index){
  return {type: SELECT_LOBBY, index}
}

export function updateLobbyList(data){
  return {type: UPDATE_LOBBY_LIST, data}
}

export function joinLobby(lobby){
  return {type: UPDATE_LOBBY_ROOM, lobby}
}