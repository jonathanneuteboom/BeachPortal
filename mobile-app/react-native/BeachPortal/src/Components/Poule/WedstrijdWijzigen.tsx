import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {Match} from './Match';

type Props = {
  match: Match;
  onPress: () => void;
};

const WedstrijdWijzigen: React.FC<Props> = ({onPress, match}) => {
  const [scoreTeam1, setScoreTeam1] = useState(match.scoreTeam1);
  const [scoreTeam2, setScoreTeam2] = useState(match.scoreTeam2);

  if (!match) {
    return null;
  }
  return (
    <View style={{margin: 40, padding: 20, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Uitslag invoeren</Text>
      </View>

      <View>
        <Text>{match.team1.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <View>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={40}
            value={scoreTeam1}
            step={1}
            minimumTrackTintColor="#4287f5"
            maximumTrackTintColor="#000000"
            onValueChange={value => {
              setScoreTeam1(value);
            }}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text>{scoreTeam1}</Text>
        </View>
      </View>

      <View style={{height: 50}} />

      <View>
        <Text>{match.team2.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <View>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={40}
            value={scoreTeam2}
            step={1}
            minimumTrackTintColor="#4287f5"
            maximumTrackTintColor="#000000"
            onValueChange={value => setScoreTeam2(value)}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text>{scoreTeam2}</Text>
        </View>
      </View>

      <View>
        <Button title="Text" onPress={onPress} />
      </View>
    </View>
  );
};

export default WedstrijdWijzigen;
