import { ThemeProvider } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import PouleComponent from '../Components/Poule/PouleComponent'
import Speelronde from '../Components/Poule/Speelronde'
import Spinner from '../Components/Poule/Spinner'
import { useStore } from '../Context'

const mainBackground = require('./../images/mainBackground.jpg')

const SpeelrondesScreen: React.FC = () => {
  const beachStore = useStore()

  const [selectedSpeelronde, setSelectedSpeelronde] = useState(0)
  const [speelrondes, setSpeelrondes] = useState<Speelronde[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    beachStore
      .getAllSpeelronde()
      .then(speelrondes => {
        setSpeelrondes(speelrondes)
        setSelectedSpeelronde(speelrondes.length - 1)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {isLoading && <Spinner />}

        {speelrondes && (
          <>
            <View style={styles.buttonContainer}>
              {speelrondes.map((_, i) => (
                <TouchableOpacity
                  style={[
                    styles.button,
                    i === selectedSpeelronde ? styles.selectedButton : {},
                  ]}
                  key={i}
                  onPress={() => setSelectedSpeelronde(i)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      i === selectedSpeelronde ? styles.selectedButtonText : {},
                    ]}
                  >
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView>
              {speelrondes[selectedSpeelronde].poules.map(poule => (
                <View key={poule.id} style={styles.pouleContainer}>
                  <PouleComponent poule={poule} />
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  pouleContainer: {
    margin: 25,
  },
  buttonContainer: {
    margin: 25,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 10,
    backgroundColor: '#6c757d',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
})

export default observer(SpeelrondesScreen)
