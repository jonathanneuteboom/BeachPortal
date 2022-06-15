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
import Spinner from '../Components/Poule/Spinner'
import { useStore } from '../Context'
import colors from '../styles'
import AlgemeenKlassement from './AlgemeenKlassement'

const mainBackground = require('./../images/mainBackground.jpg')

type categorie = 'dames' | 'heren' | 'mix'

const AlgemeenKlassementScreen: React.FC = () => {
  const [categorie, setCategorie] = useState<categorie>('dames')
  const [algemeenKlassement, setSlgemeenKlassement] = useState<AlgemeenKlassement>()
  const [isLoading, setIsLoading] = useState(false)

  const beachStore = useStore()

  useEffect(() => {
    setIsLoading(true)
    beachStore
      .getAlgemeenKlassement()
      .then(klassement => setSlgemeenKlassement(klassement))
      .finally(() => setIsLoading(false))
  }, [])

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
        {isLoading && <Spinner />}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 20,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => setCategorie('dames')}
          >
            <View style={[styles.categorieButton, { backgroundColor: colors.red80 }]}>
              <Text style={styles.categorieText}>Dames</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => setCategorie('heren')}
          >
            <View style={[styles.categorieButton, { backgroundColor: colors.blue80 }]}>
              <Text style={styles.categorieText}>Heren</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => setCategorie('mix')}
          >
            <View style={[styles.categorieButton, { backgroundColor: colors.green80 }]}>
              <Text style={styles.categorieText}>Mix</Text>
            </View>
          </TouchableOpacity>
        </View>
        {algemeenKlassement && (
          <ScrollView>
            <View style={[styles.ranking, { backgroundColor }]}>
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
                {[...Array(algemeenKlassement.dames[0].punten.length)].map((e, i) => (
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
                  {rank.punten.map((e, j) => (
                    <View key={j} style={styles.punten}>
                      <Text style={styles.rowText}>{e}</Text>
                    </View>
                  ))}
                  <View style={styles.punten}></View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
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
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 20,
  },
  categorieButton: {
    width: 100,
    height: 32,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default observer(AlgemeenKlassementScreen)
