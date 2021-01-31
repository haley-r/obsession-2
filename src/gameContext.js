import React from 'react'

//create the context
const GameContext = React.createContext({})

//create a way to provide the context to components
export const GameContextProvider = GameContext.Provider

export default GameContext



// things to keep in store:
// player (client) status- in a room or nah?
// state of the game board (all the game boards?)