import React from 'react'
import { View } from 'react-native'
import { Helpers } from 'App/Theme'
import GrantPermissionBody from '../../Components/GrantPermissionBody'
import GrantPermissionActions from '../../Components/GrantPermissionActions'

class NoPermissionsScreen extends React.Component {
  render() {
    return (
      <View
        style={[
          Helpers.fillColMain
        ]}
      >
        <GrantPermissionBody />
        <GrantPermissionActions />
      </View>
    )
  }
}

NoPermissionsScreen.propTypes = {
}

export default NoPermissionsScreen;
