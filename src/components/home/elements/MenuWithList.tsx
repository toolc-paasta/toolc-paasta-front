import React, { useState } from "react";
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
type Props = {
   navigation: BottomTabNavigation;
   list: any;
};

const processText = (limit: number, text: string) =>
   text.length > limit ? text.slice(0, limit) + "..." : text;

export default function MenuWithList({ navigation, list }: Props) {
   const [date, setDate] = useState<any>(new Date());
   const makeTime = (t: Date) => {
      const Time2string = String(t).split("-");
      const Time2string2 = Time2string[2].split(":");
      const newTime = new Date(
         Number(Time2string[0]),
         Number(Time2string[1]) - 1,
         Number(Time2string2[0].substring(0, 2)),
         Number(Time2string2[0].substring(3, 5)),
         Number(Time2string2[1]),
         Number(Time2string2[2])
      );
      const sec = Math.floor(
         (date.getTime() - (newTime.getTime() + 1000 * 60 * 60 * 9)) / 1000
      );
      let temp = sec;
      let count = 0;
      const unit = ["초", "분", "시간", "일"];
      while (temp > 24) {
         if (count < 2 && temp > 60) temp = Math.floor(temp / 60);
         else if (count >= 2) temp = Math.floor(temp / 24);
         else return temp + unit[count] + " 전";
         count++;
      }
      return temp + unit[count] + " 전";
   };

   return (
      <View style={styles.container}>
         <Text style={styles.articleMainText}>최근 공지</Text>
         <ScrollView style={styles.listContainer}>
            {list == "" ? (
               <Text style={{ textAlign: "center", marginTop: 100 }}>
                  등록된 공지가 없습니다
               </Text>
            ) : (
               <>
                  {list &&
                     [...list]
                        .reverse()
                        .slice(0, 5)
                        .map((item: any, i: number) => (
                           <View key={i}>
                              {i < 5 && (
                                 <TouchableOpacity
                                    style={styles.list}
                                    key={i}
                                    onPress={() => {
                                       navigation.navigate("ListDetail", {
                                          data: item,
                                          header_title: "공지 모아보기",
                                       });
                                    }}>
                                    <View>
                                       <Text style={styles.mainText}>
                                          [{" "}
                                          {item.author ===
                                          item.center.director.name
                                             ? "전체 공지"
                                             : "반 공지"}{" "}
                                          ] {processText(15, item.title)}
                                       </Text>
                                       <Text style={styles.subText}>
                                          {processText(20, item.content)}
                                       </Text>
                                    </View>
                                    <Text style={styles.numText}>
                                       {makeTime(item.updatedAt)}
                                    </Text>
                                 </TouchableOpacity>
                              )}
                           </View>
                        ))}
               </>
            )}
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
      padding: 8,
   },
   listContainer: {},
   list: {
      alignItems: "center",
      height: 50,
      flexDirection: "row",
   },
   mainText: {
      fontSize: 12,
      paddingRight: 10,
      textAlign: "left",
      fontFamily: "Font",
   },
   subText: {
      width: 250,
      height: 14,
      color: "#666666",
      fontSize: 12,
      overflow: "hidden",
   },
   numText: {
      position: "absolute",
      right: 5,
      fontSize: 12,
      textAlign: "right",
      paddingTop: 1,
      width: 50,
      height: 20,
   },
   articleMainText: {
      fontSize: 20,
      paddingBottom: 5,
      fontFamily: "Font",
   },
});
