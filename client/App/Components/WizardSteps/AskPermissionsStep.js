import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'

class AskPermissionsStep extends Component {
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

AskPermissionsStep.propTypes = {
}

export default AskPermissionsStep;
