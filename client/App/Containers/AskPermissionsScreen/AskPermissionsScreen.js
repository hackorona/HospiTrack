import React, { Component } from 'react'
import { View } from 'react-native'
import { Helpers } from 'App/Theme'

class AskPermissionsScreen extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <Text>AskPermission Screen</Text>
      </View>
    )
  }
}

AskPermissionsScreen.propTypes = {
}

export default AskPermissionsScreen;
