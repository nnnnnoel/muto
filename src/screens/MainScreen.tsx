import * as React from "react";
import {
  NavigationScreenProp,
  NavigationScreenOptions,
  ScrollView,
  FlatList
} from "react-navigation";
import { View, TouchableOpacity, Image, Text, Platform } from "react-native";
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
  IMAGE_BORDER_OUTER
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
import { action } from "mobx";
import { string } from "prop-types";
import { toAbsoluteTime, toAbsoluteTimeWithoutYear } from "../constants/func";

interface MainScreenProps {
  navigation: NavigationScreenProp<{}>;
}

const MainScreen = (props: MainScreenProps) => {
  const [drawer, setDrawer] = React.useState(false);
  const { navigation } = props;

  const [groups, setGroups] = React.useState([]);

  const [cards, setCards] = React.useState([
    { title: "첫번째 회고", date: "2019-07-16" },
    { title: "두번째 회고", date: "2019-07-16" },
    { title: "세번째 회고", date: "2019-07-16" },
    { title: "육회고", date: "2019-07-16" },
    { title: "사시미회고", date: "2019-07-16" },
    { title: "학예회고", date: "2019-07-16" },
    { title: "체육대회고", date: "2019-07-16" },
    { title: "이번시간사회고", date: "2019-07-16" },
    { title: "그건오회고", date: "2019-07-16" },
    { title: "육회공", date: "2019-07-16" },
    { title: "학생회고", date: "2019-07-16" },
    { title: "사성회고", date: "2019-07-16" }
  ]);

  const getData = async () => {
    const response = await fetch("https://hanseithon.curo.xyz/R/groups");
    const json = await response.json();
    setGroups(json);
    console.log(json);
  };

  React.useEffect(() => {
    getData();
  });

  const renderCards = action(
    ({ item }: { item: { title: string; date: string } }) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLOR_WHITE,
            width: getWidth(308),
            height: getWidth(60),
            borderRadius: 4,
            marginTop: getHeight(15)
          }}
          onPress={() =>
            navigation.navigate("Card", {
              title: item.title,
              date: item.date
            })
          }
        >
          <View
            style={{
              backgroundColor: COLOR_COOL_BLUE,
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: getWidth(14.5)
            }}
          />
          <View style={{ marginLeft: getWidth(14.5) }}>
            <Text
              style={[
                fonts.namoo,
                { color: COLOR_BLACK, fontSize: 16, width: getWidth(100) }
              ]}
              allowFontScaling={false}
            >
              {item.title}
            </Text>
            <Text
              style={[
                fonts.namoo,
                {
                  color: COLOR_TWILIGHT_BLUE,
                  fontSize: 12,
                  width: getWidth(100),
                  marginTop: 8
                }
              ]}
              allowFontScaling={false}
            >
              {toAbsoluteTimeWithoutYear(item.date)}
            </Text>
          </View>
          <Image
            source={IMAGE_CHEVRON_RIGHT}
            style={{
              width: getWidth(24),
              height: getWidth(24),
              marginLeft: getWidth(132)
            }}
          />
        </TouchableOpacity>
      );
    }
  );

  const renderGroups = action(
    ({ item }: { item: { title: string; invite_code: string } }) => {
      return (
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
            {item.title}
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
            {item.invite_code}
          </Text>
        </TouchableOpacity>
      );
    }
  );

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
              <FlatList
                data={groups}
                keyExtractor={(_x, i) => `group${i}`}
                renderItem={renderGroups}
              />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: getWidth(308),
                  height: getWidth(70),
                  alignItems: "center"
                }}
              >
                <Image
                  source={IMAGE_BORDER_INNER}
                  style={{
                    width: getWidth(24),
                    height: getWidth(24),
                    marginLeft: getWidth(25)
                  }}
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
                  그룹 참가
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: getWidth(308),
                height: getWidth(56),
                justifyContent: "center",
                alignItems: "center",
                borderTopColor: COLOR_TWILIGHT_BLUE,
                borderTopWidth: 1
              }}
              onPress={() => {
                setDrawer(false);
                navigation.navigate("CreateGroup");
              }}
            >
              <Image
                source={IMAGE_BORDER_OUTER}
                style={{ width: getWidth(20), height: getWidth(20) }}
              />
              <Text
                style={[
                  fonts.namoo,
                  {
                    color: COLOR_TWILIGHT_BLUE,
                    fontSize: 20,
                    marginLeft: getWidth(5)
                  }
                ]}
                allowFontScaling={false}
              >
                그룹 생성
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => navigation.navigate("MainWeek")}>
              <Image
                source={IMAGE_VIEW_COLUMN}
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
        <Calendar
          style={{
            width: width,
            height: getWidth(290),
            backgroundColor: COLOR_WHITE
          }}
          headerStyle={{ width: 0, height: 0 }}
          dayComponent={({ date, state }) => {
            return (
              <TouchableOpacity
                style={{
                  width: getWidth(51.6),
                  height: getWidth(45),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={[
                    fonts.namoo,
                    {
                      color:
                        moment(date.dateString).date() === moment().date()
                          ? COLOR_ORANGE_YELLOW
                          : moment(date.dateString).weekday() % 7 === 0 ||
                            moment(date.dateString).weekday() % 7 === 6
                          ? COLOR_BLUE_GREY
                          : COLOR_COOL_BLUE,
                      fontSize: 16
                    }
                  ]}
                  allowFontScaling={false}
                >
                  {date.day}
                </Text>
              </TouchableOpacity>
            );
          }}
          hideExtraDays
          hideArrows
        />
        <ScrollView
          style={{ backgroundColor: COLOR_PALE_GREY }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text
            style={[
              fonts.namooBold,
              {
                color: COLOR_TWILIGHT_BLUE,
                fontSize: 18,
                width: getWidth(308),
                textAlign: "left",
                marginTop: getWidth(11),
                marginBottom: getWidth(12)
              }
            ]}
          >
            회고록
          </Text>
          <FlatList
            data={cards}
            renderItem={renderCards}
            keyExtractor={(_x, i) => `회고록${i}`}
          />
        </ScrollView>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: getWidth(16),
            right: getWidth(20)
          }}
          onPress={() => navigation.navigate("CreateNote")}
        >
          <Image
            source={IMAGE_ADD_FLOAT}
            style={{ width: getWidth(56), height: getWidth(56) }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<{}>;
}): NavigationScreenOptions => {
  return {
    header: null
  };
};

export default MainScreen;
