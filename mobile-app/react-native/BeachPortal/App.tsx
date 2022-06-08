import React from 'react'
import { LogBox } from 'react-native'

import AppContainer from './src/AppContainer'
import BeachStore from './src/BeachStore'
import { StoreProvider } from './src/Context'

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
])

const beachStore = new BeachStore()

const App: React.FC = () => (
  <StoreProvider value={beachStore}>
    <AppContainer />
  </StoreProvider>
)

export default App
