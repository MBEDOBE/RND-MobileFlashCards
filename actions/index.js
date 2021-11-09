import { getDecks } from "../utils/api"

export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const REMOVE_DECK = 'REMOVE_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(card, title) {
  return {
    type: ADD_CARD,
    payload: { card, title }
  }
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks({ decks }))
    })
  }
}
