import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import EpisodeInfo from '@/components/EpisodeInfo/EpisodeInfo';
interface episodio {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  listCharacter: string;
}
const episodie = () => {
  const { episodioInfo } = useLocalSearchParams<{
    episodioInfo: string;
  }>();
  const episodio: episodio = JSON.parse(episodioInfo || '');

  return (
    <View style={styles.container}>
      <EpisodeInfo episodio={episodio} />
    </View>
  );
};

export default episodie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#44a22c',
    width: '100%',
  },
});
