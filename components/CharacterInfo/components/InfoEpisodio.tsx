import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const InfoEpisodio = ({
  id,
  episode,
  name,
  air_date,
}: {
  id: number;
  episode: string;
  name: string;
  air_date: string;
}) => {
  return (
    <View style={styles.conteiner} key={id}>
      <Text style={styles.text}>{episode}</Text>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{air_date}</Text>
    </View>
  );
};

export default InfoEpisodio;

const styles = StyleSheet.create({
  conteiner: {
    marginVertical: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 3,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    width: '30%',
    color: '#fff',
  },
});
