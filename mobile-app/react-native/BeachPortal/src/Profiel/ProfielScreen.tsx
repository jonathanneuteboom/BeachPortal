import React from 'react'

import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useStore } from '../Context'

const mainBackground = require('./../images/mainBackground.jpg')

const ProfielScreen: React.FC = () => {
  const beachStore = useStore()
  const { user } = beachStore

  const uitloggen = () => beachStore.logout()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {user && (
          <View>
            <View
              style={{
                margin: 40,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.username}>Hallo {user.username}</Text>
            </View>
            <View
              style={{
                margin: 40,
              }}
            >
              <Button title="Uitloggen" onPress={uitloggen} />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  username: {
    fontSize: 30,
  },
})
export default ProfielScreen
