import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'

class VerificationStep extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <Text>Verification Screen</Text>
      </View>
    )
  }
}

VerificationStep.propTypes = {
}

export default VerificationStep;
