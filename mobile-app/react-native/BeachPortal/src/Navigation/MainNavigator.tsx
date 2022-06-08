import React from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarDays,
  faInfo,
  faPerson,
  faSliders,
  faTrophy,
  faUser,
  faVolleyball,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AlgemeneInformatieScreen from '../AlgemeneInformatie/AlgemeneInformatieScreen'
import ProfielScreen from '../Profiel/ProfielScreen'
import MijnBeachScreen from '../MijnBeach/MijnBeachScreen'
import SpeelrondesScreen from '../Speelrondes/SpeelrondesScreen'
import AlgemeenKlassementScreen from '../AlgemeenKlassement/AlgemeenKlassementScreen'

type MainMenu = {
  MijnBeach: undefined
  Speelrondes: undefined
  AlgemeenKlassement: undefined
  Profiel: undefined
}

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
  }
}

const BottomTab = createBottomTabNavigator<MainMenu>()

const MainNavigator: React.FC = () => (
  <BottomTab.Navigator
    screenOptions={options => ({
      headerShown: false,
      tabBarIcon: () => {
        switch (options.route.name) {
          case 'MijnBeach':
            return <FontAwesomeIcon icon={faVolleyball as IconProp} />
          case 'Speelrondes':
            return <FontAwesomeIcon icon={faCalendarDays as IconProp} />
          case 'AlgemeenKlassement':
            return <FontAwesomeIcon icon={faTrophy as IconProp} />
          case 'Profiel':
            return <FontAwesomeIcon icon={faUser as IconProp} />
        }
      },
    })}
  >
    <BottomTab.Screen name="MijnBeach" component={MijnBeachScreen} />
    <BottomTab.Screen name="Speelrondes" component={SpeelrondesScreen} />
    <BottomTab.Screen
      name="AlgemeenKlassement"
      component={AlgemeenKlassementScreen}
    />
    <BottomTab.Screen name="Profiel" component={ProfielScreen} />
  </BottomTab.Navigator>
)

export default MainNavigator
