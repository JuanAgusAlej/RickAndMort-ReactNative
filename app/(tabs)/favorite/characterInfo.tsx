import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { IPersonaje } from '@/assets/interface/Ipersonaje';
import CharacterInfo from '@/components/CharacterInfo/CharacterInfo';

export default function characterInfo() {
  const { characterInfo } = useLocalSearchParams<{
    characterInfo: string;
  }>();
  const character: IPersonaje = JSON.parse(characterInfo || '');
  return (
    <View style={styles.container}>
      <CharacterInfo character={character} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#44a22c',
    width: '100%',
  },
});
