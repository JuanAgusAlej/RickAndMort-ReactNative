import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IPersonaje } from '@/assets/interface/Ipersonaje';

const styles = StyleSheet.create({
  conteiner: {
    marginVertical: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    width: '30%',
    fontSize: 12,
    color: '#fff',
  },
});

const InfoListCharacter = ({ personaje }: { personaje: IPersonaje }) => {
  return (
    <View style={styles.conteiner} key={personaje.id}>
      <Text style={styles.text}>{personaje.name}</Text>
      <Text style={styles.text}>{personaje.species}</Text>
      <Text style={styles.text}>{personaje.status}</Text>
    </View>
  );
};

export default InfoListCharacter;
