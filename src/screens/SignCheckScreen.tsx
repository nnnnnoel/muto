import * as React from "react";
import { NavigationScreenOptions } from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  COLOR_WHITE,
  COLOR_TWILIGHT_BLUE,
  COLOR_COOL_BLUE,
  COLOR_PALE_GREY
} from "../constants/color";
import fonts from "../constants/fonts";
import { IMAGE_CHECK_BACKGROUND, IMAGE_LOGO } from "../constants/image";
import { getWidth, getHeight, width } from "../constants/size";

interface SignCheckScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const SignCheckScreen = (props: SignCheckScreenProps) => {
  const { navigation } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_PALE_GREY,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { width: width, height: 48, backgroundColor: COLOR_COOL_BLUE }
        ]}
      />
      <Image
        source={IMAGE_CHECK_BACKGROUND}
        style={{
          ...StyleSheet.absoluteFillObject,
          top: Platform.OS === "ios" ? 48 : 0,
          width: width,
          height: getWidth(250)
        }}
        width={width}
        height={getWidth(250)}
      />
      <Text
        style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
        allowFontScaling={false}
      >
        회고를 더욱 쉽게
      </Text>

      <View
        style={{
          width: getWidth(200),
          height: getWidth(66.4),
          marginTop: getHeight(18),
          shadowColor: "#660000",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
          shadowOpacity: 0.5,
          elevation: 8,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={IMAGE_LOGO}
          style={{ width: getWidth(200), height: getWidth(66.4) }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLOR_TWILIGHT_BLUE,
          width: getWidth(180),
          height: getHeight(36),
          marginTop: getHeight(111.6),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4
        }}
        onPress={() => navigation.navigate("SignUpPh")}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          회원가입
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: COLOR_WHITE,
          width: getWidth(180),
          height: getHeight(36),
          marginTop: getHeight(27),
          alignItems: "center",
          justifyContent: "center",
          borderColor: COLOR_COOL_BLUE,
          borderWidth: 1,
          borderRadius: 4
        }}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_TWILIGHT_BLUE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          로그인
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

SignCheckScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    header: null
  };
};

export default SignCheckScreen;
