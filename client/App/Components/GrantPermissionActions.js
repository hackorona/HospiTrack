import React from 'react'
import { View } from 'react-native'
import { Helpers } from '../Theme';
import FullWidthButton from './FullWidthButton';
import { AppState, Text } from 'react-native';

export default class GrantPermissionActions extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const { isBlocked, requestPermission } = this.props;

      // App has returned to the foreground!
      if (isBlocked) {
        // This case means user returned from settings.
        // Request permission to continue app flow for permission granted in settings!
        requestPermission();
      }
    }

    this.setState({appState: nextAppState});
  };

  render() {
    const { isBlocked, onExitClick, onSettingsClick, requestPermission } = this.props;

    return (
      <View
        style={[Helpers.row]}
      >
        {/* This might look oppsite in hebrew devices.. */}
        <FullWidthButton title="Exit" onPress={onExitClick} />
        { 
          isBlocked ?
          <FullWidthButton title="Settings..." onPress={onSettingsClick} /> :
          <FullWidthButton title="Ask Permissions..." onPress={requestPermission} />        
        }
      </View>
    );
  }
}