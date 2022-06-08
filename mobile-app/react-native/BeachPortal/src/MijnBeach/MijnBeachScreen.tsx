import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import PouleComponent from '../Components/Poule/PouleComponent'

import { useStore } from '../Context'

const mainBackground = require('./../images/mainBackground.jpg')

const MijnBeachScreen: React.FC = () => {
  const beachStore = useStore()
  const { myPoules } = beachStore

  useEffect(() => beachStore.getMyPoules(), [])

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView>
          {myPoules.map(poule => (
            <View key={poule.id} style={styles.pouleContainer}>
              <PouleComponent poule={poule} />
            </View>
          ))}

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
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  pouleContainer: { margin: 25 },
})

export default observer(MijnBeachScreen)
