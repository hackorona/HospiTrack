import React from 'react'

class StepContainer extends React.Component {
  render() {
    if (this.props.currentStep !== this.props.step) {
      return null;
    }
    return (this.props.children);
 }
}

 export default StepContainer;