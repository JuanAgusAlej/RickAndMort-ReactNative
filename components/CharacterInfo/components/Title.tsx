import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { getfavorite, removefavorite, setfavorite } from '@/utils/asyncStorage';

const Title = ({ name = '', id }: { name?: string; id: number }) => {
  const navigation = useNavigation();
  const [isFavoriteAdd, setIsFavoriteAdd] = useState<boolean>(false);

  const getFacorite = async () => {
    const favoriteList = (await getfavorite()).split(',');
    setIsFavoriteAdd(favoriteList.includes(JSON.stringify(id)));
  };
  useEffect(() => {
    getFacorite();
  }, []);
  return (
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
          {name}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            if (isFavoriteAdd) {
              await removefavorite(id);
            } else {
              await setfavorite(id);
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
  );
};

export default Title;

const styles = StyleSheet.create({});
