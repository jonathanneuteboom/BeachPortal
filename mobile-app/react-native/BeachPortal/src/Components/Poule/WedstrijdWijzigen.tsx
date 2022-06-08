import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import { Wedstrijd } from './Match'

type Props = {
  wedstrijd: Wedstrijd
  onPress: (wedstrijd: Wedstrijd) => void
}

const WedstrijdWijzigen: React.FC<Props> = ({ onPress, wedstrijd }) => {
  const [puntenTeam1, setPuntenTeam1] = useState(wedstrijd.puntenTeam1)
  const [puntenTeam2, setPuntenTeam2] = useState(wedstrijd.puntenTeam2)

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
        <Text>Uitslag invoeren</Text>
      </View>

      <View>
        <Text>{wedstrijd.team1.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={40}
            value={puntenTeam1}
            step={1}
            minimumTrackTintColor="#4287f5"
            maximumTrackTintColor="#000000"
            onValueChange={value => {
              setPuntenTeam1(value)
            }}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{puntenTeam1}</Text>
        </View>
      </View>

      <View style={{ height: 50 }} />

      <View>
        <Text>{wedstrijd.team2.name}</Text>
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
            onValueChange={value => setPuntenTeam2(value)}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>{puntenTeam2}</Text>
        </View>
      </View>

      <View>
        <Button
          title="Text"
          onPress={() => {
            wedstrijd.puntenTeam1 = puntenTeam1
            wedstrijd.puntenTeam2 = puntenTeam2

            onPress(wedstrijd)
          }}
        />
      </View>
    </View>
  )
}

export default WedstrijdWijzigen
