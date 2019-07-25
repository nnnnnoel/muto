import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";
import { NoteStoreTypes } from "../stores/NoteStore";
import { SafeAreaView } from "react-navigation";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { TouchableOpacity, Image, Text } from "react-native";
import { IMAGE_BACK } from "../constants/image";
import { getWidth, getHeight } from "../constants/size";
import fonts from "../constants/fonts";
import { COLOR_TWILIGHT_BLUE, COLOR_WHITE } from "../constants/color";

interface CreateNoteCategoryScreenProps {
  navigation: NavigationScreenProp<{}>;
  NoteStore: NoteStoreTypes;
}

const CreateNoteCategoryScreen = (props: CreateNoteCategoryScreenProps) => {
  const { navigation, NoteStore } = props;
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
        카테고리를 만들어 주세요
      </Text>

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
          NoteStore.categories = categories;
          navigation.navigate("CreateNoteDate");
        }}
      >
        <Text
          style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
          allowFontScaling={false}
        >
          완료
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

CreateNoteCategoryScreen.navigationOptions = ({
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

export default inject("NoteStore")(observer(CreateNoteCategoryScreen));
