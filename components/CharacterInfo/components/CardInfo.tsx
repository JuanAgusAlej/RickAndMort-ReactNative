import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CardInfo = ({
  species,
  gender,
  type,
  status,
}: {
  species: string;
  gender: string;
  type: string;
  status: string;
}) => {
  return (
    <View style={styles.conteiner}>
      <View style={styles.row}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}>Species</Text>
          <Text style={styles.text}>{species}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}>Gender</Text>
          <Text style={styles.text}>{gender}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}>Type</Text>
          <Text style={styles.text}>{type ? type : 'None'}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}>Status</Text>
          <Text style={styles.text}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  conteiner: {
    marginVertical: 10,
    backgroundColor: '#9dded3',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  textTitle: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
