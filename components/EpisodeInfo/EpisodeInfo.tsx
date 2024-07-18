import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFavoriteApi } from '@/service/api';
import { IPersonaje } from '@/assets/interface/Ipersonaje';
import Title from './components/Title';
import InfoEpisodio from './components/InfoEpisodio';
import InfoListCharacter from './components/InfoListCharacter';
interface episodio {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  listCharacter: string;
}

const EpisodeInfo = ({ episodio }: { episodio: episodio }) => {
  const [loading, setLoading] = useState(true);
  const [characterInfo, setCharacterInfo] = useState<Array<IPersonaje>>([]);
  const getCharacters = async () => {
    const data = await getFavoriteApi(episodio.listCharacter);
    setCharacterInfo(data);
    setLoading(false);
  };
  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <>
      <Title name={episodio.name} />
      <ScrollView>
        <InfoEpisodio air_date={episodio.air_date} episode={episodio.episode} />
        <Text
          style={{
            color: '#fff',
            fontSize: 22,
            textAlign: 'center',
            margin: 20,
          }}>
          Personajes presentes
        </Text>
        {!loading ? (
          characterInfo.map((personaje, i) => (
            <InfoListCharacter personaje={personaje} key={i} />
          ))
        ) : (
          <ActivityIndicator size='large' color='#aaa' />
        )}
      </ScrollView>
    </>
  );
};

export default EpisodeInfo;

const styles = StyleSheet.create({});
