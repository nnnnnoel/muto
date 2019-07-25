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
import { getWidth, getHeight, width } from "../constants/size";
import fonts from "../constants/fonts";
import { IMAGE_BACK } from "../constants/image";
import { inject } from "mobx-react";
import { useObserver, observer } from "mobx-react-lite";
import { SignUpStoreTypes } from "../stores/SignUpStore";

interface SignUpRPwScreenProps {
  navigation: NavigationScreenProp<{}>;
  SignUpStore: SignUpStoreTypes;
}

const SignUpRPwScreen = (props: SignUpRPwScreenProps) => {
  const [pwConfirm, setpwConfirm] = React.useState("");
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
          width: width,
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
        비밀번호를 다시 입력해주세요.
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
          value={pwConfirm}
          onChange={evt => setpwConfirm(evt.nativeEvent.text)}
          placeholder={"비밀번호"}
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
          bottom: getHeight(110),
          alignItems: "center"
        }}
      >
        <Text
          style={[
            fonts.namoo,
            { color: COLOR_BLACK, fontSize: 12, textAlign: "center" }
          ]}
          allowFontScaling={false}
        >
          회원 가입 시{" "}
          <Text style={{ color: COLOR_TWILIGHT_BLUE }}>서비스 이용 약관</Text>과
          {"\n"}
          <Text style={{ color: COLOR_TWILIGHT_BLUE }}>개인정보 처리 방침</Text>
          에 동의하는 것으로 간주합니다.
        </Text>
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
            SignUpStore.pwConfirm = pwConfirm;
            const response = await fetch(
              "https://hanseithon.curo.xyz/A/eq_passwd",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  passwd: SignUpStore.pw,
                  passwd_c: SignUpStore.pwConfirm
                })
              }
            );
            const json = await response.json();
            console.log(json);

            if (json.status === "200") {
              const register = await fetch(
                "https://hanseithon.curo.xyz/A/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    phone: SignUpStore.phone,
                    passwd: SignUpStore.pw
                  })
                }
              );
              const regres = await register.json();
              regres.status === "200" && navigation.navigate("SignIn");
            }
          }}
        >
          <Text
            style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
            allowFontScaling={false}
          >
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

SignUpRPwScreen.navigationOptions = ({
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

export default inject("SignUpStore")(observer(SignUpRPwScreen));
