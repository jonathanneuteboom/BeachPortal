import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import LoginScreen from './Login/LoginScreen';
import {useStore} from './Context';
import MainNavigator from './Navigation/MainNavigator';
import {RootStackParamList} from './RootNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer: React.FC = () => {
  const {user} = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user.token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default observer(AppContainer);
