import {
  StyleSheet,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useState } from 'react';
import { listPersonajes } from '@/utils/fakeData';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [text, setText] = useState('');

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
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <FlatList
        data={listPersonajes}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          columnGap: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}
        renderItem={({ item, index }) => (
          <Link href='/home/characterInfo' style={{ width: '30%' }} key={index}>
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
                  fontSize: 16,
                }}>
                {item.name}
              </Text>

              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  source={item.image}
                  contentFit='contain'
                  style={{ width: 90, height: 90, borderRadius: 50 }}
                />
                <View style={{ alignContent: 'flex-start' }}>
                  <Text style={{ fontSize: 12 }}>Species: {item.species}</Text>
                  <Text style={{ fontSize: 12 }}>Status: {item.status}</Text>
                </View>
              </View>
            </View>
          </Link>
        )}
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
