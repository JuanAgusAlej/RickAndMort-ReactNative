import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { personaje } from '@/utils/fakeData';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

export default function characterInfo() {
  const {
    episode,
    gender,
    id,
    image,
    name,
    species,
    status,
    type,
    episodeDevolver,
  } = personaje;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Link
          href={{ pathname: 'home' }}
          style={{ width: '10%', marginRight: 10 }}>
          <Ionicons name='chevron-back' size={30} color='#fff' />
        </Link>
        <View
          style={{
            flexDirection: 'row',
            width: '85%',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 24,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            {name}
          </Text>
          <TouchableOpacity>
            <Ionicons name='star-outline' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Image
          source={image}
          style={{
            marginVertical: 10,
            width: 200,
            height: 200,
            borderRadius: 50,
            alignSelf: 'center',
          }}
          contentFit='cover'
        />

        <View
          style={{
            marginVertical: 10,
            backgroundColor: '#18C683',
            borderRadius: 15,
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              paddingVertical: 10,
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Species</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {species}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Gender</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{gender}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              paddingVertical: 10,
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Type</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {type ? type : 'None'}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Status</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{status}</Text>
            </View>
          </View>
        </View>
        {episodeDevolver.map((episode) => (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 3,
              justifyContent: 'space-between',
            }}
            key={episode.id}>
            <Text style={{ fontSize: 16 }}>{episode.episode}</Text>
            <Text style={{ fontSize: 16 }}>{episode.name}</Text>
            <Text style={{ fontSize: 16 }}>{episode.air_date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0ff',
    width: '100%',
  },
});
