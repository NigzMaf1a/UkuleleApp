import React from 'react';
import { View } from 'react-native';

import { containerStyles } from '../styles/containerStyles';

interface FormStripProps {
  children: React.ReactNode;
}

export default function FormStrip({ children }: FormStripProps) {
  const childCount = React.Children.count(children);

  return (
    <View
      style={[
        containerStyles.formStrip,
        { justifyContent: childCount > 1 ? 'space-between' : 'center' }
      ]}
    >
      {children}
    </View>
  );
}
