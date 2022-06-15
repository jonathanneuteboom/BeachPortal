import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Spinner: React.FC = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: 50,
    }}
  >
    <ActivityIndicator size={'large'} />
  </View>
)

export default Spinner
