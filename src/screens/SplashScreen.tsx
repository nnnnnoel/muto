import * as React from "react";
import { NavigationScreenOptions, SafeAreaView } from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import { View, Animated, Easing } from "react-native";
import fonts from "../constants/fonts";
import { COLOR_WHITE, COLOR_COOL_BLUE } from "../constants/color";
import { getWidth, getHeight } from "../constants/size";
import { IMAGE_LOGO } from "../constants/image";

interface SplashScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const SplashScreen = (props: SplashScreenProps) => {
  const imageY = new Animated.Value(0);
  const textSize = new Animated.Value(24);
  const textY = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  const { navigation } = props;

  React.useEffect(() => {
    setTimeout(
      () =>
        Animated.sequence([
          Animated.parallel([
            Animated.timing(imageY, {
              toValue: -53,
              duration: 1000,
              easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(textSize, {
              toValue: 18,
              duration: 1000,
              easing: Easing.inOut(Easing.quad)
            }),
            Animated.timing(textY, {
              toValue: -164.7,
              duration: 1000,
              easing: Easing.inOut(Easing.quad)
            })
          ]),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.quad)
          })
        ]).start(),
      500
    );
    setTimeout(() => {
      navigation.navigate("SignCheck");
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLOR_COOL_BLUE,
          opacity
        }}
      >
        <Animated.Image
          source={IMAGE_LOGO}
          style={{
            width: getWidth(200),
            height: getWidth(66.4),
            transform: [{ translateY: imageY }]
          }}
          width={getWidth(200)}
          height={getWidth(66.4)}
        />
        <Animated.Text
          style={[
            fonts.namoo,
            {
              color: COLOR_WHITE,
              textAlign: "center",
              fontSize: textSize,
              transform: [{ translateY: textY }]
            }
          ]}
        >
          회고를 더욱 쉽게,
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};

SplashScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    header: null
  };
};

export default SplashScreen;
