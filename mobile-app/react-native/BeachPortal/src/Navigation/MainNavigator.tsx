import React from 'react';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDays,
  faInfo,
  faSliders,
  faVolleyball,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlgemeneInformatieScreen from '../AlgemeneInformatie/AlgemeneInformatieScreen';
import BeheerScreen from '../Beheer/BeheerScreen';
import MijnBeachScreen from '../MijnBeach/MijnBeachScreen';
import SpeelrondesScreen from '../Speelrondes/SpeelrondesScreen';

type MainNavigator = {
  MijnBeach: undefined;
  AlgemeneInformatie: undefined;
  Speelrondes: undefined;
  Beheer: undefined;
};

const getOptions = (name: string): any => {
  return {
    title: name,
    headerStyle: {
      backgroundColor: 'lightblue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const BottomTab = createBottomTabNavigator<MainNavigator>();

const MainNavigator: React.FC = () => (
  <BottomTab.Navigator
    screenOptions={options => ({
      tabBarIcon: () => {
        switch (options.route.name) {
          case 'MijnBeach':
            return <FontAwesomeIcon icon={faVolleyball as IconProp} />;
          case 'Speelrondes':
            return <FontAwesomeIcon icon={faCalendarDays as IconProp} />;
          case 'Beheer':
            return <FontAwesomeIcon icon={faSliders as IconProp} />;
        }
      },
    })}>
    <BottomTab.Screen
      name="MijnBeach"
      component={MijnBeachScreen}
      options={getOptions('Mijn Beach')}
    />
    <BottomTab.Screen
      name="Speelrondes"
      component={SpeelrondesScreen}
      options={getOptions('Speelrondes')}
    />
    <BottomTab.Screen
      name="Beheer"
      component={BeheerScreen}
      options={getOptions('Beheer')}
    />
  </BottomTab.Navigator>
);

export default MainNavigator;
