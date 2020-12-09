import React from 'react'

//create the context
const GameContext = React.createContext({})

//create a way to provide the context to components
export const GameContextProvider = GameContext.Provider

export default GameContext