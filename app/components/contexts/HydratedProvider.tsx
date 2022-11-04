/*
  This provider is responsible for letting consumers know whether or not a page is hydrated.
*/

import React from 'react'

export const HydratedProvider = React.createContext(false)

export const useIsHydrated = () => React.useContext(HydratedProvider)
