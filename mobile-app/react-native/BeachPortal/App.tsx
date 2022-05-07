import React from 'react';

import AppContainer from './src/AppContainer';
import BeachStore from './src/BeachStore';
import {StoreProvider} from './src/Context';

const beachStore = new BeachStore();

const App: React.FC = () => (
  <StoreProvider value={beachStore}>
    <AppContainer />
  </StoreProvider>
);

export default App;
