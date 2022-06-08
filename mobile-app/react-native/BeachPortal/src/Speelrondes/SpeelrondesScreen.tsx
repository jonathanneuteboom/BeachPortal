import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import PouleComponent from '../Components/Poule/PouleComponent'
import { useStore } from '../Context'

const mainBackground = require('./../images/mainBackground.jpg')

const SpeelrondesScreen: React.FC = () => {
  const beachStore = useStore()

  useEffect(() => beachStore.getAllSpeelronde(), [])

  const { allSpeelrondes } = beachStore

  const numberOfSpeelrondes = allSpeelrondes.length
  const currentSpeelronde =
    numberOfSpeelrondes >= 1 ? allSpeelrondes[numberOfSpeelrondes - 1] : null

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView>
          {currentSpeelronde != null && (
            <View>
              {currentSpeelronde.poules.map(poule => (
                <View key={poule.id} style={styles.pouleContainer}>
                  <PouleComponent poule={poule} />
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

export default observer(SpeelrondesScreen)
