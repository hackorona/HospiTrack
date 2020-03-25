import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Helpers } from 'App/Theme'
import { AskPermissionsStep, IntroStep, VerificationStep, AuthStep } from '../../Components/WizardSteps'
import Step from './StepContainer'
import PropTypes from 'prop-types'
import NavigationService from '../../Services/NavigationService'

class WizardScreen extends Component {
  NUM_OF_STEPS = 4;

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    }
  }

  next = () => {
    this.setState((state) => {
      const { currentStep } = state;

      // Reached last step
      if (currentStep == this.NUM_OF_STEPS) {
        return {currentStep};
      }

      return {currentStep: currentStep + 1};
    })
  }

  prev = () => {
    this.setState((state) => {
      const { currentStep } = state;

      // Reached first step
      if (currentStep == 1) {
        return {currentStep};
      }

      return {currentStep: currentStep - 1};
    })
  }

  render() {
    const { currentStep } = this.state;

    return (
      <View style={Helpers.fill}>
        <Step step={1} currentStep={currentStep}>
          <IntroStep />
        </Step>
        <Step step={2} currentStep={currentStep}>
          <AskPermissionsStep />
        </Step>
        <Step step={3} currentStep={currentStep}>
          <AuthStep />
        </Step>
        <Step step={4} currentStep={currentStep}>
          <VerificationStep />
        </Step>
        <Button title="prev" onPress={this.prev}></Button>
        <Button title="next" onPress={this.next}></Button>
        <Button title="Exit" color="red" onPress={NavigationService.back}></Button>
      </View>
    )
  }
}

WizardScreen.propTypes = {
  startup: PropTypes.func,
}

export default WizardScreen;
