import React from 'react'
import { View } from 'react-native'
import { Helpers } from '../Theme';
import FullWidthButton from './FullWidthButton';

export default function GrantPermissionActions(props) {
  const { isBlocked, onExitClick, onSettingsClick, onRequestClick } = props;

  return (
    <View
      style={[Helpers.row]}
    >
      {/* This might look oppsite in hebrew devices.. */}
      <FullWidthButton title="Exit" onPress={onExitClick} />
      { 
        isBlocked ?
        <FullWidthButton title="Settings..." onPress={onSettingsClick} /> :
        <FullWidthButton title="Ask Permissions..." onPress={onRequestClick} />        
      }
    </View>
  );
}