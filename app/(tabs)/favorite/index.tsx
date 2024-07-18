import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useCallback, useEffect, useState } from 'react';
import { getFavoriteApi } from '@/service/api';
import { getfavorite } from '@/utils/asyncStorage';
import CardPersonaje from '@/components/CardPersonaje/CardPersonaje';
import { IPersonaje } from '@/assets/interface/Ipersonaje';
import { useFocusEffect } from 'expo-router';
import EmptyCharacter from '@/components/EmptyCharacter';

export default function favorite() {
  const [loading, setLoading] = useState(true);
  const [characterInfo, setCharacterInfo] = useState<Array<IPersonaje>>([]);
  const getFavotire = async () => {
    const favoriteList = await getfavorite();
    getCharacters(favoriteList);
  };
  useFocusEffect(
    useCallback(() => {
      getFavotire();
      return () => {
        setCharacterInfo([]);
        setLoading(true);
      };
    }, [])
  );

  const getCharacters = async (listIdFavorite: string) => {
    const data = await getFavoriteApi(listIdFavorite);

    setCharacterInfo(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      <FlatList
        data={characterInfo}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          columnGap: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={
          !loading ? <EmptyCharacter text='No tenes favoritos' /> : <></>
        }
        renderItem={({ item }) => (
          <CardPersonaje
            item={item}
            pathname='/favorite/characterInfo'
            key={item.id}
          />
        )}
        ListFooterComponent={
          loading ? (
            <View>
              <ActivityIndicator size='large' color='#aaa' />
            </View>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#44a22c',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: '#000',
    padding: 10,
    fontSize: 20,
    marginVertical: 10,
  },
});
