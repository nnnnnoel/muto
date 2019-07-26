import * as React from "react";
import {
  NavigationScreenProp,
  SafeAreaView,
  NavigationScreenOptions,
  FlatList
} from "react-navigation";
import { NoteStoreTypes } from "../stores/NoteStore";
import { inject } from "mobx-react";
import { observer, useObservable } from "mobx-react-lite";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent
} from "react-native";
import { getWidth, getHeight } from "../constants/size";
import { IMAGE_BACK } from "../constants/image";
import fonts from "../constants/fonts";
import {
  COLOR_TWILIGHT_BLUE,
  COLOR_PALE_GREY,
  COLOR_BLUE_GREY,
  COLOR_WHITE
} from "../constants/color";
import { action } from "mobx";
import moment from "moment";

interface CreateNoteDateScreenProps {
  navigation: NavigationScreenProp<{}>;
  NoteStore: NoteStoreTypes;
}

const CreateNoteDateScreen = (
  props: CreateNoteDateScreenProps
): JSX.Element => {
  const { navigation, NoteStore } = props;

  const years = useObservable(Array.from({ length: 5 }, (x, i) => i + 2017));
  const months = useObservable(Array.from({ length: 12 }, (x, i) => i + 1));
  const dates = useObservable(Array.from({ length: 31 }, (x, i) => i + 1));

  const yearRef = React.useRef<FlatList<number>>();
  const monthRef = React.useRef<FlatList<number>>();
  const dateRef = React.useRef<FlatList<number>>();

  const [currentYear, setCurrentYear] = React.useState(1);
  const [currentMonth, setCurrentMonth] = React.useState(1);
  const [currentDate, setCurrentDate] = React.useState(1);

  const onScrollEndDragYear = action(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(nativeEvent.contentOffset.y / 42);
      setCurrentYear(idx);
      yearRef.current &&
        yearRef.current.scrollToIndex({
          index: idx,
          animated: true
        });
    }
  );
  const onScrollEndDragMonth = action(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(nativeEvent.contentOffset.y / 42);
      setCurrentMonth(idx);
      monthRef.current &&
        monthRef.current.scrollToIndex({
          index: idx,
          animated: true
        });
    }
  );
  const onScrollEndDragDate = action(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(nativeEvent.contentOffset.y / 42);
      setCurrentDate(idx);
      dateRef.current &&
        dateRef.current.scrollToIndex({
          index: idx,
          animated: true
        });
    }
  );

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
        회고 날짜를 설정해주세요.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FlatList
          ref={yearRef}
          data={years}
          keyExtractor={(_x, i) => i.toString()}
          renderItem={({ item, index }: { item: number; index: number }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  height: 22,
                  width: getWidth(45),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  setCurrentYear(index);
                  yearRef.current &&
                    yearRef.current.scrollToIndex({
                      index: index > 0 ? index - 1 : index,
                      animated: true
                    });
                }}
              >
                <Text
                  style={[
                    index === currentYear ? fonts.namooBold : fonts.namoo,
                    {
                      color:
                        index === currentYear
                          ? COLOR_TWILIGHT_BLUE
                          : COLOR_BLUE_GREY,
                      fontSize: 18
                    }
                  ]}
                  allowFontScaling={false}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          onScrollEndDrag={onScrollEndDragYear}
          showsVerticalScrollIndicator={false}
          style={{ height: 126, width: getWidth(45) }}
          contentContainerStyle={{ alignItems: "center" }}
          extraData={currentYear}
        />
        <FlatList
          ref={monthRef}
          data={months}
          keyExtractor={(_x, i) => i.toString()}
          renderItem={({ item, index }: { item: number; index: number }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  height: 22,
                  width: getWidth(45),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  setCurrentMonth(index);
                  monthRef.current &&
                    monthRef.current.scrollToIndex({
                      index: index > 0 ? index - 1 : index,
                      animated: true
                    });
                }}
              >
                <Text
                  style={[
                    index === currentMonth ? fonts.namooBold : fonts.namoo,
                    {
                      color:
                        index === currentMonth
                          ? COLOR_TWILIGHT_BLUE
                          : COLOR_BLUE_GREY,
                      fontSize: 18
                    }
                  ]}
                  allowFontScaling={false}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          onScrollEndDrag={onScrollEndDragMonth}
          showsVerticalScrollIndicator={false}
          style={{ height: 126, width: getWidth(45) }}
          contentContainerStyle={{ alignItems: "center" }}
          extraData={currentMonth}
        />

        <FlatList
          ref={dateRef}
          data={dates}
          keyExtractor={(_x, i) => i.toString()}
          renderItem={({ item, index }: { item: number; index: number }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  height: 22,
                  width: getWidth(45),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  setCurrentDate(index);
                  dateRef.current &&
                    dateRef.current.scrollToIndex({
                      index: index > 0 ? index - 1 : index,
                      animated: true
                    });
                }}
              >
                <Text
                  style={[
                    index === currentDate ? fonts.namooBold : fonts.namoo,
                    {
                      color:
                        index === currentDate
                          ? COLOR_TWILIGHT_BLUE
                          : COLOR_BLUE_GREY,
                      fontSize: 18
                    }
                  ]}
                  allowFontScaling={false}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          onScrollEndDrag={onScrollEndDragDate}
          showsVerticalScrollIndicator={false}
          style={{ height: 126, width: getWidth(45) }}
          contentContainerStyle={{ alignItems: "center" }}
          extraData={currentDate}
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
          NoteStore.date = new Date(
            years[currentYear] +
              "-" +
              months[currentMonth] +
              "-" +
              dates[currentDate]
          );
          navigation.navigate("CreateNoteCategory");
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

CreateNoteDateScreen.navigationOptions = ({
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

export default inject("NoteStore")(observer(CreateNoteDateScreen));
