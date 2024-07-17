import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Image } from 'expo-image';
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  usePathname,
} from 'expo-router';
import { useEffect, useState } from 'react';
import { getEpisodieInfo } from '@/service/api';
import { getfavorite, removefavorite, setfavorite } from '@/utils/asyncStorage';

interface character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: Array<string>;
}
interface episodie {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}
export default function characterInfo() {
  const navigation = useNavigation();
  const [episodeShow, setEpisodeShow] = useState<Array<episodie>>([]);
  const [login, setLogin] = useState(true);
  const [isFavoriteAdd, setIsFavoriteAdd] = useState<boolean>(false);

  const getEpisodiesInfo = async () => {
    const listEpisodie = await getEpisodieInfo(character.episode);
    if (listEpisodie instanceof Array) {
      setEpisodeShow(listEpisodie);
    }
    setLogin(false);
  };

  useEffect(() => {
    getEpisodiesInfo();
  }, []);
  const getFacorite = async () => {
    const favoriteList = (await getfavorite()).split(',');
    setIsFavoriteAdd(favoriteList.includes(JSON.stringify(character.id)));
    console.log(favoriteList.includes(JSON.stringify(character.id)));
  };
  useEffect(() => {
    getFacorite();
  }, []);

  const { characterInfo } = useLocalSearchParams<{
    characterInfo: string;
  }>();
  const character: character = JSON.parse(characterInfo || '');
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ width: '10%', marginRight: 10 }}>
          <Ionicons name='chevron-back' size={30} color='#fff' />
        </TouchableOpacity>
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
            {character?.name}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              if (isFavoriteAdd) {
                await removefavorite(character.id);
              } else {
                await setfavorite(character.id);
              }
              setIsFavoriteAdd(!isFavoriteAdd);
            }}>
            <Ionicons
              name={isFavoriteAdd ? 'star' : 'star-outline'}
              size={30}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Image
          source={character.image}
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
                {character.species}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Gender</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {character.gender}
              </Text>
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
                {character.type ? character.type : 'None'}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Status</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {character.status}
              </Text>
            </View>
          </View>
        </View>
        {!login ? (
          episodeShow?.map((episode) => (
            <View
              style={{
                marginVertical: 2,
                padding: 5,
                borderRadius: 5,
                borderBlockColor: '#000',
                borderWidth: 1,
                flexDirection: 'row',
                paddingVertical: 3,
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}
              key={episode.id}>
              <Text style={{ fontSize: 12, width: '30%' }}>
                {episode.episode}
              </Text>
              <Text style={{ fontSize: 12, width: '30%' }}>{episode.name}</Text>
              <Text style={{ fontSize: 12, width: '30%' }}>
                {episode.air_date}
              </Text>
            </View>
          ))
        ) : (
          <ActivityIndicator size='large' color='#aaa' />
        )}
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
