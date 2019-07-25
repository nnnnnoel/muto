import * as React from "react";
import { NavigationScreenOptions, SafeAreaView } from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import fonts from "../constants/fonts";
import {
  COLOR_BLACK,
  COLOR_PLACEHOLDER,
  COLOR_TWILIGHT_BLUE,
  COLOR_PALE_GREY,
  COLOR_WHITE
} from "../constants/color";
import { getWidth, getHeight } from "../constants/size";
import { IMAGE_BACK } from "../constants/image";
import { useObserver, observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import { SignUpStoreTypes } from "../stores/SignUpStore";

interface SignPhScreenProps {
  navigation: NavigationScreenProp<{}>;
  SignUpStore: SignUpStoreTypes;
}

const SignPhScreen = (props: SignPhScreenProps) => {
  const [phone, setPhone] = React.useState("");
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
          width: getWidth(90),
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
        전화번호를 입력해주세요.
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
          value={phone}
          onChange={evt => setPhone(evt.nativeEvent.text)}
          placeholder={"예. 01012345678"}
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
          autoCompleteType="tel"
          keyboardType="number-pad"
          maxLength={11}
        />
      </View>
      <TouchableOpacity
        style={{
          width: getWidth(280),
          height: getWidth(40),
          backgroundColor: COLOR_TWILIGHT_BLUE,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          position: "absolute",
          bottom: getHeight(110)
        }}
        onPress={async () => {
          SignUpStore.phone = phone;
          const response = await fetch(
            "https://hanseithon.curo.xyz/A/phone_check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                phone: SignUpStore.phone
              })
            }
          );
          const json = await response.json();
          (json.status === "200" && navigation.navigate("SignUpCode")) ||
            console.log(json);
        }}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          다음
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

SignPhScreen.navigationOptions = ({
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

export default inject("SignUpStore")(observer(SignPhScreen));
