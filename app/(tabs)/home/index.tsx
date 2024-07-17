import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';
import { getCharacter } from '@/service/api';
import CardPersonaje from '@/components/CardPersonaje/CardPersonaje';
import { IReturnApid } from '@/assets/interface/returnApi';

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

  const filters = (characters: IReturnApid) => {
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
        style={styles.textInput}
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
        renderItem={({ item }) => (
          <CardPersonaje
            item={item}
            pathname='/home/characterInfo'
            key={item.id}
          />
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
    backgroundColor: '#44a22c',
    width: '100%',
  },
  textInput: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 12,
    padding: 10,
    width: '95%',
    fontSize: 14,
    marginVertical: 10,
  },
});
