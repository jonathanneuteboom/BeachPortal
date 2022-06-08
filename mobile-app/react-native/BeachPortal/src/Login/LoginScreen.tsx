import React from 'react'

import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import AppError from '../AppError'
import { useStore } from '../Context'
import { RootStackNavigationProp } from '../RootNavigation'

type Props = {
  navigation: RootStackNavigationProp<'Login'>
}

const loginBackground = require('../images/loginBackground.jpg')

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMesssage] = React.useState<string>()

  const beachStore = useStore()

  const Login = (): Promise<void> => {
    return beachStore
      .login(username, password)
      .then(() => {})
      .catch((error: AppError) => setErrorMesssage(error.message))
  }

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>
        <ImageBackground
          source={Image.resolveAssetSource(loginBackground)}
          resizeMode="cover"
          style={styles.flex1}
        >
          <View style={styles.loginContainer}>
            {errorMessage && (
              <View>
                <Text>{errorMessage}</Text>
              </View>
            )}
            <View>
              <View style={styles.loginBox}>
                <Text>Username/E-mail</Text>
                <TextInput
                  onChangeText={setUsername}
                  value={username}
                  placeholder="bv. rik@mom.nl"
                />

                <View>
                  <Text>Password </Text>
                  <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="******"
                    secureTextEntry={true}
                  />
                </View>
                <Button title="Login" onPress={Login} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  loginContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: 30,
    flex: 1,
  },
  loginBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
})

export default LoginScreen
