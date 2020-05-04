import React from 'react'
import { Text, View, Image } from 'react-native'
import Button from 'react-native-really-awesome-button/src/themes/rick';
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
          זהירות קורונה!
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
      <Button 
        width={150}
        onPress={btnAction}
      >
        {btnTitle}
      </Button>
      <Image source={Images.Location}></Image>
      <Text style={[
          Fonts.h4,
          Helpers.textCenter,
          Metrics.horizontalPadding
        ]}>
          {`תודה על שיתוף הפעולה.\nאם נתקלתם בבאגים או כל בעיה, אנא דווחו לצוות באומן`}
      </Text>
    </View>
  );
}