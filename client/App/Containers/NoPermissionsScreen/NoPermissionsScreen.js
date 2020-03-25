import React from 'react'
import { TouchableOpacity, Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import WifiActions from 'App/Stores/Wifi/Actions'
import { Helpers, Metrics } from 'App/Theme'

class NoPermissionsScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View
        style={[
          Helpers.fill,
          Helpers.rowMain,
          Metrics.mediumHorizontalMargin,
          Metrics.mediumVerticalMargin,
        ]}
      >
        {/* <NoPermissionMsg /> */}
        <Text>Now we cry!</Text>
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

NoPermissionsScreen.propTypes = {
}

export default NoPermissionsScreen;
