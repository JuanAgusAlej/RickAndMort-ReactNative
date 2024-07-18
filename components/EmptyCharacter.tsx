import { Text } from 'react-native';
import React from 'react';

const EmptyCharacter = ({ text }: { text: string }) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 24,
        color: '#fff',
      }}>
      {text}
    </Text>
  );
};

export default EmptyCharacter;
