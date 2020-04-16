import React from 'react'
import { Image, View } from 'react-native'
import styles from './SplashScreenStyle'
import { Helpers, Images } from '../../Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={[Helpers.fillRowCenter, styles.container]}>
        <View style={[Helpers.center, styles.logo]}>
          <Image
            style={Helpers.fullSize}
            source={Images.Logo}
            resizeMode="contain"
          />
        </View>
      </View>
    )
  }
}
