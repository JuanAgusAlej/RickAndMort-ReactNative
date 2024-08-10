import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useNavigation } from 'expo-router';

const InfoEpisodio = ({
  id,
  episode,
  name,
  air_date,
  pathname,
  listCharacter,
}: {
  id: number;
  episode: string;
  name: string;
  air_date: string;
  pathname: string;
  listCharacter: string;
}) => {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      <Link
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setWidth(Math.round(width));
        }}
        onPress={() => navigation.navigate}
        href={{
          pathname,
          params: {
            episodioInfo: JSON.stringify({
              id,
              episode,
              name,
              air_date,
              listCharacter,
            }),
          },
        }}
        key={id}>
        {width !== 0 && (
          <View
            style={{
              width,
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{episode}</Text>
            <Text style={styles.text} numberOfLines={1}>
              {name}
            </Text>
            <Text style={[styles.text, { textAlign: 'right' }]}>
              {air_date}
            </Text>
          </View>
        )}
      </Link>
    </View>
  );
};

export default InfoEpisodio;

const styles = StyleSheet.create({
  conteiner: {
    marginVertical: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 3,
  },
  text: {
    fontSize: 12,
    color: '#fff',
    width: '33%',
  },
});
