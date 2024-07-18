import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';

import { useEffect, useState } from 'react';
import { getCharacter } from '@/service/api';
import CardPersonaje from '@/components/CardPersonaje/CardPersonaje';
import EmptyCharacter from '@/components/EmptyCharacter';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [isSpecies, setIsSpecies] = useState<boolean>(false);
  const [status, setStatus] = useState<'alive' | 'dead' | 'unknown' | ''>('');
  const [sendText, setSendText] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [finsh, setFinsh] = useState<boolean>(false);
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
    const characters = await getCharacter(page, status, text, isSpecies);
    if (characters.status === 200) {
      if (page === 1) {
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
          setFinsh(false);
        } else {
          setFinsh(true);
        }
      }
    } else {
      setCharacterInfo([]);
      setPage(1);
      setFinsh(true);
    }
    setSendText(false);
  };

  useEffect(() => {
    getCharacters();
  }, [sendText, status, isSpecies]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Buscar por nombre'
        onPress={() => setSendText(false)}
        onChangeText={(newText) => {
          setPage(1);
          setText(newText);
        }}
        onBlur={() => {
          setSendText(true);
        }}
        defaultValue={text}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '5%',
        }}>
        <Text style={{ color: '#fff' }}>Buscar por Especie</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          ios_backgroundColor='#3e3e3e'
          onValueChange={() => setIsSpecies((previousState) => !previousState)}
          value={isSpecies}
        />
      </View>
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
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={
          finsh ? <EmptyCharacter text='No se encontro personaje' /> : <></>
        }
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
