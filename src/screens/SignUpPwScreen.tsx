import * as React from "react";
import { NavigationScreenOptions, SafeAreaView } from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import {
  COLOR_PALE_GREY,
  COLOR_TWILIGHT_BLUE,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_PLACEHOLDER
} from "../constants/color";
import { getWidth, getHeight } from "../constants/size";
import fonts from "../constants/fonts";
import { IMAGE_BACK } from "../constants/image";
import { inject } from "mobx-react";
import { useObserver, observer } from "mobx-react-lite";
import { SignUpStoreTypes } from "../stores/SignUpStore";

interface SignUpPwScreenProps {
  navigation: NavigationScreenProp<{}>;
  SignUpStore: SignUpStoreTypes;
}

const SignUpPwScreen = (props: SignUpPwScreenProps) => {
  const [pw, setPw] = React.useState("");
  const { navigation, SignUpStore } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR_PALE_GREY
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: getWidth(270),
          height: 5,
          backgroundColor: COLOR_TWILIGHT_BLUE
        }}
      />
      <Text
        style={[
          fonts.namoo,
          {
            color: COLOR_BLACK,
            fontSize: 24,
            position: "absolute",
            top: getHeight(27),
            left: getWidth(16)
          }
        ]}
        allowFontScaling={false}
      >
        비밀번호를 입력해주세요.
      </Text>
      <View
        style={{
          width: getWidth(280),
          height: getWidth(40),
          justifyContent: "center",
          backgroundColor: COLOR_WHITE,
          borderRadius: 8,
          marginBottom: getHeight(150)
        }}
      >
        <TextInput
          value={pw}
          onChange={evt => setPw(evt.nativeEvent.text)}
          placeholder={"숫자8자리 이상, 특수문자 포함"}
          placeholderTextColor={COLOR_PLACEHOLDER}
          underlineColorAndroid="transparent"
          style={[
            fonts.namoo,
            {
              color: COLOR_TWILIGHT_BLUE,
              fontSize: 18,
              marginLeft: getWidth(19)
            }
          ]}
          allowFontScaling={false}
          secureTextEntry
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: getHeight(110)
        }}
      >
        <TouchableOpacity
          style={{
            width: getWidth(280),
            height: getWidth(40),
            backgroundColor: COLOR_TWILIGHT_BLUE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8
          }}
          onPress={async () => {
            SignUpStore.pw = pw;
            const response = await fetch(
              "https://hanseithon.curo.xyz/A/passwdType",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  passwd: SignUpStore.pw
                })
              }
            );
            const json = await response.json();
            console.log(json);
            json.status === "200" && navigation.navigate("SignUpRPw");
          }}
        >
          <Text
            style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
            allowFontScaling={false}
          >
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

SignUpPwScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{ marginLeft: getWidth(16) }}
      >
        <Image
          source={IMAGE_BACK}
          style={{ width: getWidth(24), height: getWidth(24) }}
          width={getWidth(24)}
          height={getWidth(24)}
        />
      </TouchableOpacity>
    )
  };
};

export default inject("SignUpStore")(observer(SignUpPwScreen));
