import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { getCharacter } from '@/service/api';
interface returnApid {
  status: number;
  info: {
    count: number;
    pagesTotal: number;
    nextPage: string | null;
    prevPage: string | null;
  };
  result: [
    {
      id: number;
      name: string;
      status: string;
      spicies: string;
      type: string;
      gender: string;
      image: string;
      episode: Array<String>;
    }
  ];
}
export default function HomeScreen() {
  const [text, setText] = useState('');
  const [sendText, setSendText] = useState(false);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [characterInfo, setCharacterInfo] = useState<
    Array<{
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      image: string;
      episode: Array<String>;
    }>
  >([]);
  const [characterInfoFilter, setCharacterInfoFilter] = useState<
    Array<{
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      image: string;
      episode: Array<String>;
    }>
  >([]);
  const [pageFilter, setPageFilter] = useState('');

  const filters = (characters: returnApid) => {
    if (text !== '') {
      setPageFilter(characters.info.nextPage);
      setCharacterInfoFilter(characters.result);
    } else {
      setPage(characters.info.nextPage);
      const addInfo = characterInfo.concat(characters.result);
      setCharacterInfo(addInfo);
    }
  };

  const getCharacters = async () => {
    if (page !== null) {
      const query = {
        name: text || '',
        status: '',
        species: '',
        type: '',
        gender: '',
      };
      const characters = await getCharacter(
        pageFilter === '' ? page : pageFilter,
        query
      );
      if (characters.status === 200) {
        filters(characters);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderRadius: 12,
          padding: 10,
          width: '95%',
          fontSize: 14,
          marginVertical: 10,
        }}
        placeholder='Nombre del personaje'
        onPress={() => setSendText(false)}
        onChangeText={(newText) => {
          setText(newText);
        }}
        onBlur={(newText) => setSendText(true)}
        defaultValue={text}
      />
      <FlatList
        data={characterInfo}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          columnGap: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}
        renderItem={({ item, index }) => (
          <Link
            href={{
              pathname: '/home/characterInfo',
              params: {
                characterInfo: JSON.stringify(item),
              },
            }}
            style={{ width: '30%' }}
            key={index}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                borderRadius: 10,
                padding: 15,
              }}>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  textAlign: 'center',
                  fontSize: 12,
                  width: 90,
                  minHeight: 'auto',
                }}>
                {item.name}
              </Text>

              <Image
                source={item.image}
                contentFit='contain'
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                  marginVertical: 15,
                }}
              />
              <View style={{ alignContent: 'flex-start' }}>
                <Text style={{ fontSize: 10, width: 90 }}>
                  Species: {item.species}
                </Text>
                <Text style={{ fontSize: 10, width: 90 }}>
                  Status: {item.status}
                </Text>
              </View>
            </View>
          </Link>
        )}
        ListFooterComponent={
          page !== null ? (
            <View>
              <ActivityIndicator size='large' color='#aaa' />
            </View>
          ) : (
            <View></View>
          )
        }
        onEndReached={getCharacters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#0ff',
    width: '100%',
  },
});
