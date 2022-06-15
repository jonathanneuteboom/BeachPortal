import React, { useState } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPen, faPlus, faPlusMinus, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

import Poule from './Poule'
import WedstrijdWijzigen from './WedstrijdWijzigen'
import { Wedstrijd } from './Match'
import { useStore } from '../../Context'

type Props = {
  poule: Poule
  onUpdate: () => void
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getTime = (date: Date): string => date.toLocaleTimeString().substring(0, 5)

const PouleComponent: React.FC<Props> = ({ poule, onUpdate }) => {
  const beachStore = useStore()
  const [wedstrijd, setWedstrijd] = useState<Wedstrijd>()

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!wedstrijd}
        onRequestClose={() => {
          setWedstrijd(undefined)
        }}
      >
        <BlurView style={styles.absolute} blurType="light" blurAmount={1} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <WedstrijdWijzigen
            wedstrijd={wedstrijd!}
            onSave={wedstrijd => {
              beachStore.updateWedstrijd(wedstrijd).then(() => {
                setWedstrijd(undefined)
                onUpdate()
              })
            }}
            onClose={() => setWedstrijd(undefined)}
          />
        </View>
      </Modal>

      <View style={styles.header}>
        <View>
          <Text style={styles.pouleText}>{poule.getFullName()}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>{getTime(poule.speeltijd)}</Text>
        </View>
      </View>
      <View style={styles.ranking}>
        <View style={styles.rankingHeader}>
          <View style={styles.flex5} />
          <View style={styles.flex1}>
            <FontAwesomeIcon icon={faTrophy as IconProp} />
          </View>
          <View style={styles.flex1}>
            <FontAwesomeIcon icon={faPlus as IconProp} />
          </View>
          <View style={styles.flex1}>
            <FontAwesomeIcon icon={faMinus as IconProp} />
          </View>
          <View style={styles.flex1}>
            <FontAwesomeIcon icon={faPlusMinus as IconProp} />
          </View>
        </View>
        {poule.stand.map(rankingItem => {
          return (
            <View key={rankingItem.team.id} style={styles.rankingItemContainer}>
              <View style={styles.flex5}>
                <Text style={{ color: 'white' }}>{rankingItem.team.name}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={{ color: 'white' }}>{rankingItem.gewonnenWedstrijden}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={{ color: 'white' }}>{rankingItem.puntenVoor}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={{ color: 'white' }}>{rankingItem.puntenTegen}</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={{ color: 'white' }}>{rankingItem.quotient.toFixed(2)}</Text>
              </View>
            </View>
          )
        })}
      </View>

      <View style={{ height: 20 }} />

      <View style={styles.matches}>
        {poule.wedstrijden.map(wedstrijd => {
          return (
            <View key={wedstrijd.id} style={styles.matchContainer}>
              <View style={styles.flex2}>
                <Text numberOfLines={1} style={{ color: 'white' }}>
                  {wedstrijd.team1}
                </Text>
              </View>
              <View style={{ ...styles.flex1, flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.scoreButton}
                  onPress={() => {
                    setWedstrijd(wedstrijd)
                  }}
                >
                  <View>
                    <Text style={{ color: 'white' }}>
                      {`${wedstrijd.puntenTeam1} - ${wedstrijd.puntenTeam2}`}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <FontAwesomeIcon
                      icon={faPen as IconProp}
                      size={10}
                      style={{ color: 'white' }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flex2}>
                <View style={{ flexDirection: 'row-reverse' }}>
                  <Text numberOfLines={1} style={{ color: 'white' }}>
                    {wedstrijd.team2}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(50, 82, 168,0.5)',
    padding: 20,
    borderRadius: 10,
  },
  pouleText: { color: 'white' },
  timeText: { color: 'rgb(200, 200, 200)' },
  header: { paddingBottom: 10 },
  ranking: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(256,256, 256, 0.3)',
  },
  rankingHeader: { flexDirection: 'row', height: 32 },
  rankingItemContainer: { flexDirection: 'row', height: 32 },
  matches: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(256,256, 256, 0.3)',
  },
  editIcon: { marginHorizontal: 30 },
  scoreButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(0, 123, 255)',
    borderWidth: 2,
    margin: 5,
    borderColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  flex5: { flex: 5, justifyContent: 'center' },
  flex3: { flex: 3, justifyContent: 'center' },
  flex2: { flex: 2, justifyContent: 'center' },
  flex1: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  matchContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default PouleComponent
