import * as React from "react";
import { NavigationScreenOptions, SafeAreaView } from "react-navigation";
import { NavigationScreenProp } from "react-navigation";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import fonts from "../constants/fonts";
import {
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
import { NoteStoreTypes } from "../stores/NoteStore";

interface SignPhScreenProps {
  navigation: NavigationScreenProp<{}>;
  NoteStore: NoteStoreTypes;
}

const SignPhScreen = (props: SignPhScreenProps) => {
  const [name, setName] = React.useState("");
  const { navigation, NoteStore } = props;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR_PALE_GREY
      }}
    >
      <Text
        style={[
          fonts.namoo,
          {
            color: COLOR_TWILIGHT_BLUE,
            fontSize: 24,
            position: "absolute",
            top: getHeight(27),
            left: getWidth(16)
          }
        ]}
        allowFontScaling={false}
      >
        회고록 이름을 설정해주세요.
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
          value={name}
          onChange={evt => setName(evt.nativeEvent.text)}
          placeholder={"회고록 이름"}
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
          NoteStore.name = name;
          (name !== "" && navigation.navigate("CreateNoteDate")) ||
            Alert.alert("경고", "회고록 이름을 설정해주세요.", [
              { text: "확인" }
            ]);
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

export default inject("NoteStore")(observer(SignPhScreen));
