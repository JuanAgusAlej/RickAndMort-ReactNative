import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IEpisodie, IPersonaje } from '@/assets/interface/Ipersonaje';
import { Image } from 'expo-image';
import { getEpisodieInfo } from '@/service/api';
import CardInfo from './components/CardInfo';
import Title from './components/Title';
import InfoEpisodio from './components/InfoEpisodio';

const CharacterInfo = ({ character }: { character: IPersonaje }) => {
  const [episodeShow, setEpisodeShow] = useState<Array<IEpisodie>>([]);
  const [login, setLogin] = useState(true);

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
  return (
    <>
      <Title id={character.id} name={character.name} />

      <ScrollView>
        <Image
          source={character.image}
          style={styles.image}
          contentFit='cover'
        />

        <CardInfo
          gender={character.gender}
          species={character.species}
          status={character.status}
          type={character.type}
        />
        {!login ? (
          episodeShow?.map((episode) => (
            <InfoEpisodio
              air_date={episode.air_date}
              episode={episode.episode}
              id={episode.id}
              name={episode.name}
              key={episode.id}
            />
          ))
        ) : (
          <ActivityIndicator size='large' color='#aaa' />
        )}
      </ScrollView>
    </>
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  image: {
    marginVertical: 10,
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
