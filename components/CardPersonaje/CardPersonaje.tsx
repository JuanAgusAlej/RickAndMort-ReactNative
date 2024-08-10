import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { IPersonaje } from '@/assets/interface/Ipersonaje';

const CardPersonaje = ({
  item,
  pathname,
}: {
  item: IPersonaje;
  pathname: string;
}) => {
  const { conteniner, text, image, titel } = styles;

  return (
    <Link
      href={{
        pathname,
        params: {
          characterInfo: JSON.stringify(item),
        },
      }}
      style={{ width: '30%' }}
      key={item.id}>
      <View style={conteniner}>
        <Text style={titel} numberOfLines={1}>
          {item.name}
        </Text>

        <Image source={item.image} contentFit='contain' style={image} />
        <View style={{ alignContent: 'flex-start' }}>
          <Text style={text} numberOfLines={1}>
            Species: {item.species}
          </Text>
          <Text style={text} numberOfLines={1}>
            Status: {item.status}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default CardPersonaje;

const styles = StyleSheet.create({
  conteniner: {
    backgroundColor: '#9dded3',
    width: '100%',
    height: 200,
    borderRadius: 10,
    padding: 15,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginVertical: 15,
  },
  titel: {
    marginTop: 5,
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 14,
    width: 90,
  },
  text: {
    fontSize: 11,
    width: 90,
    flexShrink: 1,
    marginBottom: 4,
  },
});
