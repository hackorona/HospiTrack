import React from 'react'
import { View } from 'react-native'
import { Helpers } from '../Theme';
import FullWidthButton from './FullWidthButton';
import { permissionsService } from '../Services/PermissionsService';

export default function GrantPermissionActions(props) {
  return (
    <View
      style={[Helpers.row]}
    >
      {/* This might look oppsite in hebrew devices.. */}
      <FullWidthButton title="Exit" onPress={permissionsService.exitApp} />
      {/* <FullWidthButton title="Try again" onPress={permissionsService.askPermissionsBlocked} /> */}
      <FullWidthButton title="Settings..." onPress={permissionsService.openSettings} />
    </View>
  );
}