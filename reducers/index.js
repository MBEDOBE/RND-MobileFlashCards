import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from "../actions"

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const { deck } = action
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck
        }
      }
    case REMOVE_DECK: {
      const newDecks = { ...state.decks }
      delete newDecks[action.id]
      return {
        ...state,
        decks: newDecks
        // const newState = Object.assign({}, state)
        // delete newState[action.id];
        // return newState;
      }
    }
    case ADD_CARD:
      const { card, title } = action.payload
      console.log('action', action.payload.card, action.title,)
      return {
        ...state,
        decks: {
          ...state.decks,
          [title]: {
            title: title,
            questions: [...state.decks[title].questions, card] //copy every question on that deck and then append the newly added card at the end.
          },
        }
      }
    default:
      return state;
  }
}

export default decks;