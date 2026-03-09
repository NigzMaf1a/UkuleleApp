import React from 'react';
import { View, Text } from 'react-native';

//components
import MyModal from '../components/MyModal';

// interface 
interface FancyLoadProps{
    onClose: ()=> void;
}

export default function FancyLoad({onClose}:FancyLoadProps) {
  return (
    <MyModal visible={true}
             onClose={onClose}
    >
        <View>
            <Text>Work on this</Text>
        </View>
    </MyModal>
  );
}