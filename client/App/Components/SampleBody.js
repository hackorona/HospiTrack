import React from 'react'
import { Text, View, Image, Button } from 'react-native'
import { Helpers, Fonts, Images, Metrics } from '../Theme';

export default function GrantPermissionBody(props) {
  const { btnTitle, btnAction, helperText  } = props;
  
  return (
    <View
      style={[
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
          Scan Around!
        </Text>
        <Text style={[
          Fonts.h4,
          Helpers.textCenter,
          Metrics.horizontalPadding
        ]}>
          {
            helperText 
          }
        </Text>
      </View>
      <Button title={btnTitle} onPress={btnAction}></Button>
      <Image source={Images.NoLocationPermission}></Image>
    </View>
  );
}