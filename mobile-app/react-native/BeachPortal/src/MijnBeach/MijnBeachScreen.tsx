import React from 'react';

import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Match} from '../Components/Poule/Match';
import Poule from '../Components/Poule/Poule';
import PouleComponent from '../Components/Poule/PouleComponent';
import {RankingItem} from '../Components/Poule/RankingItem';
import {Team} from '../Components/Poule/Team';

const mainBackground = require('./../images/mainBackground.jpg');

const MijnBeachScreen: React.FC = () => {
  const poule: Poule = new Poule(1, 'Poule Heren B', new Date());
  const team1 = new Team(1, 'Blue 16');
  const team2 = new Team(2, 'De twijfelachtige Gingers en overloper');
  const team3 = new Team(3, 'De verliezer moet harken');
  const team4 = new Team(4, 'Hansjon so hot irght now');

  poule.ranking = [
    new RankingItem(team1, 1, 29, 19, 1.526262626262),
    new RankingItem(team2, 0, 19, 29, 0.666),
    new RankingItem(team3, 0, 0, 0, 0),
    new RankingItem(team4, 0, 0, 0, 0),
  ];

  poule.matches = [
    new Match(1, team1, team2, 19, 29),
    new Match(2, team1, team3, 0, 0),
    new Match(3, team1, team4, 0, 0),
    new Match(4, team2, team3, 0, 0),
    new Match(5, team2, team4, 0, 0),
    new Match(6, team3, team4, 0, 0),
  ];
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Image.resolveAssetSource(mainBackground)}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.pouleContainer}>
          <PouleComponent poule={poule} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    flex: 1,
  },
  pouleContainer: {margin: 25},
});

export default MijnBeachScreen;
