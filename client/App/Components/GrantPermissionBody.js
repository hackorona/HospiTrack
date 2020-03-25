import React from 'react'
import { Text, View, Image } from 'react-native'
import { Helpers, Fonts, Images, Metrics } from '../Theme';

export default function GrantPermissionBody(props) {
  return (
    <View
        style={[
          {height: '90%'},
          Helpers.fillColCenter,
          Helpers.mainSpaceAround
        ]}
    >
      <View key="text-view"
        style={[
          Helpers.colCenter,
          Helpers.mainSpaceAround
        ]}
      >
        <Text style={[
          Fonts.h1,
          Metrics.bottomMargin
          ]}>
          Grant access
        </Text>
        <Text style={[
          Fonts.h4,
          Helpers.textCenter,
          Metrics.horizontalPadding
        ]}>
          Change permissions in your phone settings
          so we'll be able to track your route in the hospital!
        </Text>
      </View>
      <Image source={Images.NoLocationPermission}></Image>
    </View>
  );
}