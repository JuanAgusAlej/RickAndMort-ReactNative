import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  conteiner: {
    alignItems: 'center',
    rowGap: 5,
    backgroundColor: '#9dded3',
    borderRadius: 30,
    padding: 10,
  },
  text: { fontSize: 18 },
});

const InfoEpisodio = ({
  episode,
  air_date,
}: {
  episode: string;
  air_date: string;
}) => {
  const [episodioTemporada, setEpisodioTemporada] = useState({
    temporada: '',
    episodio: '',
  });
  useEffect(() => {
    setEpisodioTemporada({
      episodio: episode.split('E')[1],
      temporada: episode.split('E')[0].split('S')[1],
    });
  }, []);
  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>Temporada</Text>
      <Text style={styles.text}>{episodioTemporada.temporada}</Text>
      <Text style={styles.text}>Episodio</Text>
      <Text style={styles.text}>{episodioTemporada.episodio}</Text>
      <Text style={styles.text}>Emision</Text>
      <Text style={styles.text}>{air_date}</Text>
    </View>
  );
};

export default InfoEpisodio;
