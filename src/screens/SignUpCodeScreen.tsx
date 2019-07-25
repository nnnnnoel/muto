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

interface SignUpCodeScreenProps {
  navigation: NavigationScreenProp<{}>;
  SignUpStore: SignUpStoreTypes;
}

const SignUpCodeScreen = (props: SignUpCodeScreenProps) => {
  const [code, setCode] = React.useState("");
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
          width: getWidth(180),
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
        인증번호를 입력해주세요.
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
          value={code}
          onChange={evt => setCode(evt.nativeEvent.text)}
          placeholder={"인증번호"}
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
          keyboardType="number-pad"
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: getHeight(110),
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            await fetch("https://hanseithon.curo.xyz/A/phone_check", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                phone: SignUpStore.phone
              })
            });
          }}
        >
          <Text
            style={[fonts.namoo, { color: COLOR_TWILIGHT_BLUE, fontSize: 14 }]}
            allowFontScaling={false}
          >
            인증번호가 오질 않아요
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: getWidth(280),
            height: getWidth(40),
            backgroundColor: COLOR_TWILIGHT_BLUE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginTop: getHeight(25)
          }}
          onPress={async () => {
            SignUpStore.code = code;
            const response = await fetch(
              "https://hanseithon.curo.xyz/A/auth_code",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  code: SignUpStore.code
                })
              }
            );
            const json = await response.json();
            json.status === "200" && navigation.navigate("SignUpPw");
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

SignUpCodeScreen.navigationOptions = ({
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

export default inject("SignUpStore")(observer(SignUpCodeScreen));
