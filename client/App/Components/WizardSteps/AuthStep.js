import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'

class AuthStep extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <Text>Auth Screen</Text>
      </View>
    )
  }
}

AuthStep.propTypes = {
}

export default AuthStep;
