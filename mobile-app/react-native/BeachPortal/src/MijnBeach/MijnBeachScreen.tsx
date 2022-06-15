import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Poule from '../Components/Poule/Poule'

import PouleComponent from '../Components/Poule/PouleComponent'
import Spinner from '../Components/Poule/Spinner'

import { useStore } from '../Context'

const mainBackground = require('./../images/mainBackground.jpg')

const MijnBeachScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [myPoules, setMyPoules] = useState<Poule[]>()

  const beachStore = useStore()

  useEffect(() => {
    setIsLoading(true)
    beachStore
      .getMyPoules()
      .then(poules => setMyPoules(poules))
      .catch(error => {
        const { response } = error
        if (response.status === 401) {
          beachStore.logout()
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const wedstrijdUpdated = () => {
    setIsLoading(true)
    beachStore
      .getMyPoules()
      .then(poules => setMyPoules(poules))
      .finally(() => setIsLoading(false))
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView>
          {isLoading && <Spinner />}

          {myPoules && (
            <View>
              {myPoules.length === 0 && (
                <View style={{ margin: 50 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    <View>
                      <Text>Je zit niet in een poule</Text>
                    </View>
                  </View>
                </View>
              )}

              {myPoules.map(poule => (
                <View key={poule.id} style={styles.pouleContainer}>
                  <PouleComponent poule={poule} onUpdate={wedstrijdUpdated} />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  pouleContainer: { margin: 25 },
})

export default observer(MijnBeachScreen)
