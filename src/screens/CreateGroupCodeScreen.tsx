import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";
import { SafeAreaView } from "react-navigation";
import {
  COLOR_PALE_GREY,
  COLOR_TWILIGHT_BLUE,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_PLACEHOLDER
} from "../constants/color";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Clipboard
} from "react-native";
import { getWidth, getHeight } from "../constants/size";
import fonts from "../constants/fonts";
import { IMAGE_LOGO, IMAGE_BACK } from "../constants/image";

interface CreateGroupCodeScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const CreateGroupCodeScreen = (props: CreateGroupCodeScreenProps) => {
  const { navigation } = props;
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
        초대 코드가 발급되었습니다.
      </Text>

      <View style={{ justifyContent: "flex-end" }}>
        <Image
          source={IMAGE_LOGO}
          style={{
            width: getWidth(120),
            height: getWidth(39.8),
            position: "absolute",
            top: getWidth(-30),
            right: getWidth(-165)
          }}
        />
      </View>
      <View
        style={{
          marginBottom: getHeight(150)
        }}
      >
        <View
          style={{
            width: getWidth(280),
            height: getWidth(40),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR_WHITE,
            borderRadius: 8
          }}
        >
          <Text
            style={[
              fonts.namoo,
              {
                color: COLOR_TWILIGHT_BLUE,
                fontSize: 18,
                marginLeft: getWidth(19)
              }
            ]}
            allowFontScaling={false}
          >
            {navigation.getParam("code")}
          </Text>
        </View>
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
          Clipboard.setString(navigation.getParam("code"));
        }}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          복사하기
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

CreateGroupCodeScreen.navigationOptions = ({
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

export default CreateGroupCodeScreen;
