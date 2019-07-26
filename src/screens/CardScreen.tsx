import * as React from "react";
import {
  NavigationScreenProp,
  SafeAreaView,
  ScrollView,
  FlatList
} from "react-navigation";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  Animated,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Platform
} from "react-native";
import { getWidth, width } from "../constants/size";
import { IMAGE_BACK, IMAGE_PENCIL_BLUE } from "../constants/image";
import fonts from "../constants/fonts";
import {
  COLOR_TWILIGHT_BLUE,
  COLOR_LIGHT_NAVY,
  COLOR_PLACEHOLDER,
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_ORANGE_YELLOW,
  COLOR_PALE_GREY,
  COLOR_MARIGOLD,
  COLOR_COOL_BLUE
} from "../constants/color";
import { action } from "mobx";
import produce from "immer";
import { observer } from "mobx-react-lite";
import { toAbsoluteTimeDot } from "../constants/func";

interface CardScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const CardScreen = (props: CardScreenProps) => {
  const { navigation } = props;

  const [cards, setCards] = React.useState([""]);

  const [categoryCards, setCategoryCards] = React.useState([
    "외주 위약금 1150찍힌 내인생이 레전드",
    "맥북 수리비도 220만원",
    "오늘의 교훈: 커피옆에 노트북은 두지 말자",
    "한강물 요즘 스근하니 좋던데",
    "다이빙 연습이나 하러갈까요"
  ]);

  const renderInputs = action(({ item }: { item: string }) => {
    return (
      <View
        style={{
          width: getWidth(182),
          height: getWidth(64),
          marginTop: getWidth(6),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLOR_WHITE,
          borderRadius: 4
        }}
      >
        <TextInput
          value={item}
          onChange={evt => (item = evt.nativeEvent.text)}
          placeholder="무엇이 문제인가요?"
          placeholderTextColor={COLOR_PLACEHOLDER}
          underlineColorAndroid="transparent"
          allowFontScaling={false}
          autoFocus
          style={[
            fonts.namoo,
            {
              color: COLOR_BLACK,
              fontSize: 14,
              width: getWidth(171),
              height: getWidth(50),
              textAlign: "left",
              textAlignVertical: "top"
            }
          ]}
          multiline
        />
      </View>
    );
  });
  const renderCards = action(({ item }: { item: string }) => {
    return (
      <View
        style={{
          width: getWidth(182),
          height: getWidth(64),
          marginTop: getWidth(6),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLOR_WHITE,
          borderRadius: 4
        }}
      >
        <Text
          allowFontScaling={false}
          style={[
            fonts.namoo,
            {
              color: COLOR_BLACK,
              fontSize: 14,
              width: getWidth(171),
              height: getWidth(50),
              textAlign: "left",
              textAlignVertical: "top"
            }
          ]}
        >
          {item}
        </Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_PALE_GREY }}>
      <View
        style={{
          backgroundColor: COLOR_WHITE,
          width: width,
          height: Platform.OS === "ios" ? 48 : 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
      <View
        style={{
          width: width,
          height: 56,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: COLOR_WHITE
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ marginLeft: getWidth(16) }}
        >
          <Image
            source={IMAGE_BACK}
            style={{ width: getWidth(24), height: getWidth(24) }}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[fonts.namoo, { color: COLOR_TWILIGHT_BLUE, fontSize: 20 }]}
            allowFontScaling={false}
          >
            {navigation.getParam("title")}
          </Text>
          <Text
            style={[fonts.namoo, { color: COLOR_LIGHT_NAVY, fontSize: 16 }]}
            allowFontScaling={false}
          >
            {toAbsoluteTimeDot(navigation.getParam("date"))}
          </Text>
        </View>
        <TouchableOpacity style={{ marginRight: getWidth(16) }}>
          <Image
            source={IMAGE_PENCIL_BLUE}
            style={{ width: getWidth(20), height: getWidth(20) }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginTop: 10 }}
        contentContainerStyle={{
          flexDirection: "row",
          paddingRight: getWidth(16)
        }}
        horizontal
      >
        <ScrollView
          style={{
            width: getWidth(208),
            marginLeft: getWidth(16)
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: getWidth(208),
              backgroundColor: COLOR_MARIGOLD,

              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4
            }}
          >
            <Text
              style={[
                fonts.namoo,
                {
                  color: COLOR_BLACK,
                  fontSize: 12,
                  width: getWidth(182),
                  textAlign: "left",
                  marginTop: getWidth(9)
                }
              ]}
              allowFontScaling={false}
            >
              카드 이름
            </Text>
            <FlatList
              data={cards}
              renderItem={renderInputs}
              keyExtractor={(_x, i) => `inputCard${i}`}
            />
            <TouchableOpacity
              onPress={() => {
                setCards(
                  produce(cards, draft => {
                    draft.push("");
                  })
                );
              }}
              style={{
                width: getWidth(182),
                height: getWidth(28),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={[fonts.namoo, { color: COLOR_BLACK, fontSize: 14 }]}
                allowFontScaling={false}
              >
                카드 추가
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          style={{
            width: getWidth(208),
            marginLeft: getWidth(16)
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: getWidth(208),
              backgroundColor: COLOR_COOL_BLUE,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              paddingBottom: getWidth(27)
            }}
          >
            <Text
              style={[
                fonts.namoo,
                {
                  color: COLOR_WHITE,
                  fontSize: 12,
                  width: getWidth(182),
                  textAlign: "left",
                  marginTop: getWidth(9)
                }
              ]}
              allowFontScaling={false}
            >
              카테고리
            </Text>
            <FlatList
              data={categoryCards}
              renderItem={renderCards}
              keyExtractor={(_x, i) => `categoryCard${i}`}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

CardScreen.navigationOptions = {
  header: null
};

export default observer(CardScreen);
