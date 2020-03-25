import React from 'react'
import { View } from 'react-native'
import { Helpers } from '../Theme';
import FullWidthButton from './FullWidthButton';
import RNExitApp from 'react-native-exit-app';
import OpenAppSettings from 'react-native-app-settings';

export default function GrantPermissionActions(props) {
  return (
    <View
      style={[Helpers.row]}
    >
      {/* This might look oppsite in hebrew devices.. */}
      <FullWidthButton title="Exit" onPress={RNExitApp.exitApp} />
      <FullWidthButton title="Settings..." onPress={OpenAppSettings} />
    </View>
  );
}