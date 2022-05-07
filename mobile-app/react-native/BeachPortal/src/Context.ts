import React from 'react';

import BeachStore from './BeachStore';

const StoreContext = React.createContext<BeachStore>({} as BeachStore);
const StoreProvider = StoreContext.Provider;
const useStore = () => React.useContext(StoreContext);

export default StoreContext;
export {useStore, StoreProvider};
