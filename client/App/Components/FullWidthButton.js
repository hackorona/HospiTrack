import React from 'react'
import { View, Button } from 'react-native'
import { Helpers } from '../Theme';

export default function FullWidthButton(props) {
  return (
    <View style={Helpers.fill}>
      <Button {...props}>
      </Button>
    </View>
  );
}