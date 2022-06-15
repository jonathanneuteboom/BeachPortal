import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { Wedstrijd } from './Match'

type Props = {
  wedstrijd: Wedstrijd
  onSave: (wedstrijd: Wedstrijd) => void
  onClose: () => void
}

const WedstrijdWijzigen: React.FC<Props> = ({ onSave, onClose, wedstrijd }) => {
  const [puntenTeam1, setPuntenTeam1] = useState(wedstrijd.puntenTeam1)
  const [puntenTeam2, setPuntenTeam2] = useState(wedstrijd.puntenTeam2)

  const [isSliding, setIsSliding] = useState(false)

  return (
    <View
      style={{
        margin: 40,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ position: 'absolute', right: 0, top: 0 }}
          onPress={() => onClose()}
        >
          <FontAwesomeIcon icon={faTimes as IconProp} size={20} />
        </TouchableOpacity>

        <Text>Uitslag invoeren</Text>
      </View>

      <View>
        <Text>{wedstrijd.team1}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View>
          <Slider
            style={{ width: 200, height: 40 }}
            maximumValue={40}
            value={puntenTeam1}
            step={1}
            minimumTrackTintColor="#4287f5"
            maximumTrackTintColor="#000000"
            onSlidingStart={() => setIsSliding(true)}
            onValueChange={value => {
              if (isSliding) setPuntenTeam1(value)
            }}
            onSlidingComplete={() => setIsSliding(false)}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{puntenTeam1}</Text>
        </View>
      </View>

      <View style={{ height: 50 }} />

      <View>
        <Text>{wedstrijd.team2}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={40}
            value={puntenTeam2}
            step={1}
            minimumTrackTintColor="#4287f5"
            maximumTrackTintColor="#000000"
            onSlidingStart={() => setIsSliding(true)}
            onValueChange={value => {
              if (isSliding) setPuntenTeam2(value)
            }}
            onSlidingComplete={() => setIsSliding(false)}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{puntenTeam2}</Text>
        </View>
      </View>

      <View>
        <Button
          title="Opslaan"
          onPress={() => {
            wedstrijd.puntenTeam1 = puntenTeam1
            wedstrijd.puntenTeam2 = puntenTeam2

            onSave(wedstrijd)
          }}
        />
      </View>
    </View>
  )
}

export default WedstrijdWijzigen
