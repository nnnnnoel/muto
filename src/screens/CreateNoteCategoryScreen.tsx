import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions
} from "react-navigation";
import { NoteStoreTypes } from "../stores/NoteStore";
import { SafeAreaView } from "react-navigation";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { TouchableOpacity, Image, Text, TextInput, View } from "react-native";
import { IMAGE_BACK, IMAGE_BORDER_BOTTOM } from "../constants/image";
import { getWidth, getHeight } from "../constants/size";
import fonts from "../constants/fonts";
import _ from "lodash";
import produce from "immer";
import {
  COLOR_TWILIGHT_BLUE,
  COLOR_WHITE,
  COLOR_PLACEHOLDER
} from "../constants/color";

interface CreateNoteCategoryScreenProps {
  navigation: NavigationScreenProp<{}>;
  NoteStore: NoteStoreTypes;
}

const CreateNoteCategoryScreen = (props: CreateNoteCategoryScreenProps) => {
  const { navigation, NoteStore } = props;

  const [currentIndex, setIndex] = React.useState<number>(3);

  const [categories, setCategories] = React.useState<string[]>(
    new Array<string>(5).fill("")
  );
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

      {_.map(new Array(currentIndex), (_x, i) => {
        return (
          <View
            style={{
              width: getWidth(280),
              height: getWidth(40),
              borderRadius: 8,
              marginTop: 8,
              backgroundColor: COLOR_WHITE,
              alignItems: "center"
            }}
            key={`카테고리${i + 1}`}
          >
            <TextInput
              value={categories[i]}
              onChange={evt => {
                setCategories(
                  produce(categories, draft => {
                    draft[i] = evt.nativeEvent.text;
                  })
                );
              }}
              placeholder={`카테고리${i + 1}`}
              placeholderTextColor={COLOR_PLACEHOLDER}
              style={[
                fonts.namoo,
                {
                  color: COLOR_TWILIGHT_BLUE,
                  fontSize: 18,
                  marginLeft: getWidth(16)
                }
              ]}
              allowFontScaling={false}
            />
          </View>
        );
      })}
      {currentIndex < 5 && (
        <TouchableOpacity
          style={{
            width: getWidth(280),
            height: getWidth(40),
            borderRadius: 8,
            marginTop: 8,
            backgroundColor: COLOR_WHITE,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => setIndex(currentIndex + 1)}
        >
          <Image
            source={IMAGE_BORDER_BOTTOM}
            style={{ width: getWidth(20), height: getWidth(20) }}
          />
          <Text
            style={[
              fonts.namoo,
              {
                color: COLOR_TWILIGHT_BLUE,
                fontSize: 18,
                marginLeft: getWidth(9)
              }
            ]}
            allowFontScaling={false}
          >
            카테고리 추가
          </Text>
        </TouchableOpacity>
      )}

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
          const response = await fetch("https://hanseithon.curo.xyz/R/write", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: NoteStore.name,
              date: NoteStore.date,
              category: NoteStore.categories
            })
          });

          const json = await response.json();

          json.status === "200" && navigation.popToTop();
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
