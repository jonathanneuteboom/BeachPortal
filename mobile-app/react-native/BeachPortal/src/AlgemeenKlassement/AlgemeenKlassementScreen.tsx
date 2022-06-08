import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useStore } from '../Context'
import colors from '../styles'

const mainBackground = require('./../images/mainBackground.jpg')

type categorie = 'dames' | 'heren' | 'mix'

const AlgemeenKlassementScreen: React.FC = () => {
  const [categorie, setCategorie] = useState<categorie>('dames')

  const beachStore = useStore()

  useEffect(() => beachStore.getAllemeenKlassement(), [])

  const { algemeenKlassement } = beachStore
  if (!algemeenKlassement) return null

  const aantalRonden = algemeenKlassement.dames[0].punten.length

  const getColor = (categorie: categorie) => {
    if (categorie === 'dames') return `${colors.red}50`
    if (categorie === 'heren') return `${colors.blue}50`
    return `${colors.green}50`
  }

  const backgroundColor = getColor(categorie)

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              margin: 20,
            }}
          >
            <View
              style={{
                backgroundColor: colors.red80,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.categorieButton}
                onPress={() => setCategorie('dames')}
              >
                <Text style={styles.categorieText}>Dames</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: colors.blue80,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.categorieButton}
                onPress={() => setCategorie('heren')}
              >
                <Text style={styles.categorieText}>Heren</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: colors.green80,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.categorieButton}
                onPress={() => setCategorie('mix')}
              >
                <Text style={styles.categorieText}>Mix</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              ...styles.ranking,
              backgroundColor,
            }}
          >
            <View style={styles.header}>
              <View style={styles.rank}>
                <Text style={styles.headerText}>#</Text>
              </View>
              <View style={styles.name}>
                <Text style={styles.headerText}>Team</Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.headerText}>Totaal</Text>
              </View>
              {[...Array(aantalRonden)].map((e, i) => (
                <View key={i} style={styles.punten}>
                  <Text style={styles.headerText}>{i + 1}</Text>
                </View>
              ))}
              <View style={styles.punten}></View>
            </View>
            {algemeenKlassement[categorie].map((rank, i) => (
              <View key={rank.team.id} style={styles.row}>
                <View style={styles.rank}>
                  <Text style={styles.rowText}>{i + 1}</Text>
                </View>
                <View style={styles.name}>
                  <Text style={styles.rowText}>{rank.team.name}</Text>
                </View>
                <View style={styles.total}>
                  <Text style={styles.rowText}>{rank.totaal}</Text>
                </View>
                {rank.punten.map(e => (
                  <View style={styles.punten}>
                    <Text style={styles.rowText}>{e}</Text>
                  </View>
                ))}
                <View style={styles.punten}></View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  ranking: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    color: 'white',
  },
  rank: {
    width: 20,
  },
  name: {
    width: '30%',
  },
  total: {
    width: 50,
  },
  punten: {
    width: '5%',
  },
  headerText: {
    color: 'gainsboro',
  },
  rowText: {
    color: 'white',
  },
  categorieText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categorieButton: {
    width: 100,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default observer(AlgemeenKlassementScreen)
