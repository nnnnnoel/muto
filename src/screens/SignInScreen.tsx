import * as React from "react";
import {
  NavigationScreenOptions,
  SafeAreaView,
  ScrollView
} from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import {
  COLOR_PALE_GREY,
  COLOR_TWILIGHT_BLUE,
  COLOR_PLACEHOLDER,
  COLOR_WHITE
} from "../constants/color";
import { IMAGE_LOGO, IMAGE_EYE_SHOW, IMAGE_EYE_HIDE } from "../constants/image";
import { getHeight, getWidth } from "../constants/size";
import { useObservable } from "mobx-react-lite";
import fonts from "../constants/fonts";

interface SignInScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const SignInScreen = (props: SignInScreenProps) => {
  const [phone, setPhone] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pwSecure, setPwSecure] = React.useState(true);

  const { navigation } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR_PALE_GREY,
        alignItems: "center"
      }}
    >
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Image
            source={IMAGE_LOGO}
            style={{
              marginTop: getHeight(87),
              width: getWidth(150),
              height: getWidth(49.8)
            }}
            width={getWidth(150)}
            height={getWidth(49.8)}
          />
          <View
            style={{
              marginTop: getHeight(87.2),
              width: getWidth(280),
              height: getWidth(40),
              backgroundColor: COLOR_WHITE,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8
            }}
          >
            <TextInput
              value={phone}
              onChange={evt => setPhone(evt.nativeEvent.text)}
              style={[
                fonts.namoo,
                {
                  color: COLOR_TWILIGHT_BLUE,
                  fontSize: 18,
                  width: getWidth(232),
                  textAlign: "left"
                }
              ]}
              allowFontScaling={false}
              placeholder="전화번호"
              placeholderTextColor={COLOR_PLACEHOLDER}
            />
          </View>
          <View
            style={{
              marginTop: getHeight(23),
              width: getWidth(280),
              height: getWidth(40),
              backgroundColor: COLOR_WHITE,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8
            }}
          >
            <TextInput
              value={pw}
              onChange={evt => setPw(evt.nativeEvent.text)}
              style={[
                fonts.namoo,
                {
                  color: COLOR_TWILIGHT_BLUE,
                  fontSize: 18,
                  width: getWidth(212),
                  textAlign: "left"
                }
              ]}
              allowFontScaling={false}
              placeholder="비밀번호"
              placeholderTextColor={COLOR_PLACEHOLDER}
              secureTextEntry={pwSecure}
            />
            <TouchableOpacity onPress={() => setPwSecure(!pwSecure)}>
              <Image
                source={!pwSecure ? IMAGE_EYE_SHOW : IMAGE_EYE_HIDE}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: getHeight(69),
              width: getWidth(280),
              height: getWidth(40),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLOR_TWILIGHT_BLUE,
              shadowColor: "#400000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.35,
              shadowRadius: 2,
              elevation: 4,
              borderRadius: 8
            }}
            onPress={async () => {
              const response = await fetch(
                "https://hanseithon.curo.xyz/A/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    phone,
                    passwd: pw
                  })
                }
              );
              const json = await response.json();
              json.status === "200" && navigation.navigate("MainStack");
            }}
          >
            <Text
              style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
              allowFontScaling={false}
            >
              로그인
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    header: null
  };
};

export default SignInScreen;
