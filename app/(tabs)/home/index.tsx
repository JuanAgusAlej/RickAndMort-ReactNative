import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useEffect, useState } from 'react';
import { getCharacter, getFilterCharacter } from '@/service/api';
import CardPersonaje from '@/components/CardPersonaje/CardPersonaje';
import { IReturnApid } from '@/assets/interface/returnApi';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'alive' | 'dead' | 'unknown' | ''>('');
  const [sendText, setSendText] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [finsh, setFinsh] = useState<boolean>(false);
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

  const getCharacters = async () => {
    const characters =
      text === ''
        ? await getCharacter(page, status)
        : await getFilterCharacter(text, status, page);
    if (characters.status === 200) {
      if (page === 1) {
        console.log('2222222222222222222222222222222222222222222222222222');
        console.log(characters.result);
        setCharacterInfo(characters.result);
        const firstList =
          characters.info.nextPage !== null
            ? characters.info.nextPage?.split('page=')
            : null;
        if (characters.info.nextPage !== null) {
          const count = page + 1;
          setPage(count);
        } else {
          setFinsh(true);
        }
      } else {
        const addInfo = characterInfo.concat(characters.result);
        setCharacterInfo(addInfo);
        if (characters.info.nextPage !== null) {
          const count = page + 1;
          setPage(count);
        } else {
          setFinsh(true);
        }
      }
      setLoading(false);
      setSendText(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [sendText]);
  useEffect(() => {
    console.log('ffffffffffffffffff');
    getCharacters();
  }, [status]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Nombre del personaje'
        onPress={() => setSendText(false)}
        onChangeText={(newText) => {
          setPage(1);
          console.log('ssssssssss');
          setText(newText);
        }}
        onBlur={() => {
          setSendText(true);
        }}
        defaultValue={text}
      />
      <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16 }}>
        Filtro de como se encuentra
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            setStatus('');
            setPage(1);
          }}
          style={[
            { padding: 10, borderRadius: 15 },
            status === ''
              ? { backgroundColor: '#ebeb1b' }
              : { backgroundColor: '#fff' },
          ]}>
          <Text>Ninguna</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStatus('alive');
            setPage(1);
          }}
          style={[
            { padding: 10, borderRadius: 15 },
            status === 'alive'
              ? { backgroundColor: '#ebeb1b' }
              : { backgroundColor: '#fff' },
          ]}>
          <Text>Vivo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStatus('dead');
            setPage(1);
          }}
          style={[
            { padding: 10, borderRadius: 15 },
            status === 'dead'
              ? { backgroundColor: '#ebeb1b' }
              : { backgroundColor: '#fff' },
          ]}>
          <Text>Muerto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStatus('unknown');
            setPage(1);
          }}
          style={[
            { padding: 10, borderRadius: 15 },
            status === 'unknown'
              ? { backgroundColor: '#ebeb1b' }
              : { backgroundColor: '#fff' },
          ]}>
          <Text>No se sabe</Text>
        </TouchableOpacity>
      </View>
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
          !finsh ? (
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
