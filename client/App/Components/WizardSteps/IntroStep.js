import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types'

class IntroStep extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <Text>Intro Screen</Text>
      </View>
    )
  }
}

IntroStep.propTypes = {
}

export default IntroStep;
