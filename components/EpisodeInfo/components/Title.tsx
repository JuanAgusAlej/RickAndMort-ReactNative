import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  conteiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: '10%',
    marginRight: 10,
  },
  textConteiner: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

const Title = ({ name }: { name: string }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.conteiner}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <Ionicons name='chevron-back' size={30} color='#fff' />
      </TouchableOpacity>
      <View style={styles.textConteiner}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

export default Title;
