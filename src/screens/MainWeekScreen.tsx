import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions,
  ScrollView,
  FlatList
} from "react-navigation";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Calendar, CalendarList } from "react-native-calendars";
import { width, getWidth, getHeight } from "../constants/size";
import {
  IMAGE_MAIN_DRAWER,
  IMAGE_PENCIL_WHITE,
  IMAGE_BORDER_INNER,
  IMAGE_MAIN_DRAWER_WHITE,
  IMAGE_CHEVRON_LEFT,
  IMAGE_CHEVRON_RIGHT,
  IMAGE_ADD_FLOAT,
  IMAGE_VIEW_COLUMN,
  IMAGE_VIEW_LIST,
  IMAGE_VIEW_CAROUSEL
} from "../constants/image";
import Modal from "react-native-modal";
import fonts from "../constants/fonts";
import {
  COLOR_WHITE,
  COLOR_TWILIGHT_BLUE,
  COLOR_COOL_BLUE,
  COLOR_PALE_GREY,
  COLOR_BLUE_GREY,
  COLOR_ORANGE_YELLOW,
  COLOR_BLACK
} from "../constants/color";
import { useObservable } from "mobx-react-lite";
import moment from "moment";

interface MainWeekScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const MainWeekScreen = (props: MainWeekScreenProps) => {
  const [drawer, setDrawer] = React.useState(false);
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        isVisible={drawer}
        style={{
          flex: 1,
          padding: 0,
          margin: 0,
          marginRight: getWidth(52),
          backgroundColor: COLOR_PALE_GREY
        }}
        onBackdropPress={() => setDrawer(false)}
        onBackButtonPress={() => setDrawer(false)}
        swipeDirection={"left"}
        onSwipeComplete={() => setDrawer(false)}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                width: getWidth(308),
                height: 56,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: COLOR_TWILIGHT_BLUE
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setDrawer(false);
                }}
                style={{
                  marginLeft: getWidth(16)
                }}
              >
                <Image
                  source={IMAGE_MAIN_DRAWER_WHITE}
                  style={{
                    width: getWidth(20),
                    height: getWidth(14)
                  }}
                />
              </TouchableOpacity>
              <Text
                style={[fonts.namoo, { color: COLOR_WHITE, fontSize: 18 }]}
                allowFontScaling={false}
              >
                나의 그룹
              </Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  marginRight: getWidth(16)
                }}
              >
                <Image
                  source={IMAGE_PENCIL_WHITE}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: getWidth(308),
                  height: 70,
                  marginTop: getWidth(15)
                }}
              >
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color: COLOR_TWILIGHT_BLUE,
                      fontSize: 20,
                      marginLeft: getWidth(25)
                    }
                  ]}
                  allowFontScaling={false}
                >
                  맥북에 커피쏟음
                </Text>
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color: COLOR_COOL_BLUE,
                      fontSize: 18,
                      marginLeft: getWidth(25)
                    }
                  ]}
                  allowFontScaling={false}
                >
                  asd1234
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  width: getWidth(308),
                  height: 70,
                  marginTop: getWidth(15)
                }}
              >
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color: COLOR_TWILIGHT_BLUE,
                      fontSize: 20,
                      marginLeft: getWidth(25)
                    }
                  ]}
                  allowFontScaling={false}
                >
                  우리 개발 망했음
                </Text>
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color: COLOR_COOL_BLUE,
                      fontSize: 18,
                      marginLeft: getWidth(25)
                    }
                  ]}
                  allowFontScaling={false}
                >
                  ggwp1234
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: getWidth(308),
                  height: 70,
                  marginTop: getWidth(15)
                }}
                onPress={() => {}}
              >
                <Image
                  source={IMAGE_BORDER_INNER}
                  style={{
                    width: 32.4,
                    height: 32.4,
                    marginLeft: getWidth(28.8)
                  }}
                />
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color: COLOR_TWILIGHT_BLUE,
                      fontSize: 18,
                      marginLeft: getWidth(22.8)
                    }
                  ]}
                  allowFontScaling={false}
                >
                  그룹 추가
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            width,
            height: 56,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setDrawer(true);
            }}
          >
            <Image
              source={IMAGE_MAIN_DRAWER}
              style={{
                marginLeft: getWidth(16),
                width: getWidth(20),
                height: getWidth(14)
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: getWidth(36)
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={IMAGE_CHEVRON_LEFT}
                style={{ width: getWidth(24), height: getWidth(24) }}
              />
            </TouchableOpacity>
            <Text
              style={[
                fonts.namoo,
                {
                  color: COLOR_TWILIGHT_BLUE,
                  fontSize: 20
                }
              ]}
              allowFontScaling={false}
            >
              2019년 7월
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={IMAGE_CHEVRON_RIGHT}
                style={{ width: getWidth(24), height: getWidth(24) }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: getWidth(17)
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <Image
                source={IMAGE_VIEW_CAROUSEL}
                style={{ width: getWidth(20), height: getWidth(16) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: getWidth(17) }}
              onPress={() => navigation.navigate("MainList")}
            >
              <Image
                source={IMAGE_VIEW_LIST}
                style={{ width: getWidth(18), height: getWidth(12) }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

MainWeekScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    header: null
  };
};

export default MainWeekScreen;
